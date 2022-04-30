const hre = require("hardhat");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    // "0xCA439a1eA4eaE743A31ae34487C2ec516feb3a45"
    "0xE5d54cA63c5EF79ad3313E77E9A9da0b66F32ed0" // mumbai deployed address
  );
  await omniChainNFT.mint();
  const balance = await omniChainNFT.balanceOf(account);
  console.log("Mumbai NFT balance: ", balance.toString());
  const owner = await omniChainNFT.ownerOf(201);
  console.log("Token 201 owner: ", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
