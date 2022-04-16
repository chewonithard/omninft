const hre = require("hardhat");
// const { ethers } = require("ethers");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0xCA439a1eA4eaE743A31ae34487C2ec516feb3a45"
  );
  const after = await omniChainNFT.balanceOf(account);
  console.log("Mumbai NFT balance: ", after.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
