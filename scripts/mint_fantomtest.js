const hre = require("hardhat");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    // "0x81Df0cBb990592395DAB29F17674BB339F3124C7"
    "0xE5d54cA63c5EF79ad3313E77E9A9da0b66F32ed0"
  );
  await omniChainNFT.mint();
  const balance = await omniChainNFT.balanceOf(account);
  console.log("Fantom NFT balance: ", balance.toString());
  const owner = await omniChainNFT.ownerOf(1);
  console.log("Token 1 owner: ", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
