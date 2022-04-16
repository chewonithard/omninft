const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main() {
  // This will actually compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");

  // params passed to constructor: address _endpoint, uint256 startId, uint256 _max
  const omniChainNFT = await OmniChainNFT.deploy(
    // layerzero chain specific endpoint inserted here
    "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf",
    0,
    BigNumber.from("100")
  );
  //contract is officially mined and deployed
  await omniChainNFT.deployed();

  console.log(
    "Fantom testnet ----- omniChainNFT deployed to:",
    omniChainNFT.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
