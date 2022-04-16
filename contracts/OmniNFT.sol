//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/ILayerZeroEndpoint.sol";
import "../interfaces/ILayerZeroReceiver.sol";

contract OmniChainNFT is Ownable, ERC721, ILayerZeroReceiver {

    using Strings for uint256;

    mapping (uint256 => string) private _tokenURIs;

    string private _baseURIextended;

    uint256 counter = 0;
    uint256 nextId = 0;
    uint256 MAX = 100;
    uint256 gas = 350000;

    ILayerZeroEndpoint public endpoint;

    event ReceiveNFT(
        uint16 _srcChainId,
        address _from,
        uint256 _tokenId,
        uint256 counter
    );

    event Minted(uint256 tokenId);

    constructor(
        address _endpoint,
        uint256 startId,
        uint256 _max
    ) ERC721("OmniChainNFT", "OOCCNFT") {
        endpoint = ILayerZeroEndpoint(_endpoint);
        nextId = startId;
        MAX = _max;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }
    ///////////////////////////////////////////////////////////////////////////////

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(svg));
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "OmniNFT", "description": "An omnichain NFT project", "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function mint() external payable {
        require(nextId + 1 <= MAX, "Exceeds supply");
        nextId += 1;

        string memory svg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>1</text></svg>";
        string memory imageURI_ = svgToImageURI(svg);
        string memory tokenURI_ = formatTokenURI(imageURI_);

        _safeMint(msg.sender, nextId);
        _setTokenURI(nextId, tokenURI_);
        counter += 1;

        emit Minted(nextId);
    }

    function crossChain(
        uint16 _dstChainId,
        bytes calldata _destination,
        uint256 tokenId
    ) public payable {
        require(msg.sender == ownerOf(tokenId), "Not the owner");
        // burn NFT
        _burn(tokenId);
        counter -= 1;
        bytes memory payload = abi.encode(msg.sender, tokenId);
        // encode adapterParams to specify more gas for the destination
        uint16 version = 1;
        bytes memory adapterParams = abi.encodePacked(version, gas);
        (uint256 messageFee, ) = endpoint.estimateFees(
            _dstChainId,
            address(this),
            payload,
            false,
            adapterParams
        );
        require(
            msg.value >= messageFee,
            "Must send enough value to cover messageFee"
        );
        endpoint.send{value: msg.value}(
            _dstChainId,
            _destination,
            payload,
            payable(msg.sender),
            address(0x0),
            adapterParams
        );
    }
    function lzReceive(
        uint16 _srcChainId,
        bytes memory _from,
        uint64,
        bytes memory _payload
    ) external override {
        require(msg.sender == address(endpoint));
        address from;
        assembly {
            from := mload(add(_from, 20))
        }
        (address toAddress, uint256 tokenId) = abi.decode(
            _payload,
            (address, uint256)
        );
        // mint the tokens
        _safeMint(toAddress, tokenId);
        counter += 1;
        emit ReceiveNFT(_srcChainId, toAddress, tokenId, counter);
    }
    // Endpoint.sol estimateFees() returns the fees for the message
    function estimateFees(
        uint16 _dstChainId,
        address _userApplication,
        bytes calldata _payload,
        bool _payInZRO,
        bytes calldata _adapterParams
    ) external view returns (uint256 nativeFee, uint256 zroFee) {
        return
            endpoint.estimateFees(
                _dstChainId,
                _userApplication,
                _payload,
                _payInZRO,
                _adapterParams
            );
    }
}
