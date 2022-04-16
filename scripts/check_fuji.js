const hre = require("hardhat");
// const { ethers } = require("ethers");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0x63519878635D08259535AbF55352b2C7BBb528F5"
  );
  const after = await omniChainNFT.balanceOf(account);
  console.log("Fuji NFT balance: ", after.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
