const hre = require("hardhat");
// const { ethers } = require("ethers");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0xE5d54cA63c5EF79ad3313E77E9A9da0b66F32ed0"
  );
  const after = await omniChainNFT.balanceOf(account);
  console.log("Fnatom NFT balance: ", after.toString());

  const tokenUri = await omniChainNFT.tokenURI(1);
  console.log("Fantom NFT balance: ", tokenUri.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
