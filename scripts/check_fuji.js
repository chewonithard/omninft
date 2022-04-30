const hre = require("hardhat");
// const { ethers } = require("ethers");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0x19821491f7d886fd3E4905C62a739048A3f16847"
  );
  const after = await omniChainNFT.balanceOf(account);
  console.log("Fuji NFT balance: ", after.toString());

  const tokenofownerbyindex = await omniChainNFT.tokenOfOwnerByIndex(
    account,
    0
  );
  console.log(tokenofownerbyindex.toNumber())

  const result = await omniChainNFT.tokensOfOwner(account);
  console.log("tokens of owner", result);

  const uri_result = await omniChainNFT.tokenURI(1)
  console.log("URI of token 1", uri_result)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
