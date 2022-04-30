const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0xE5d54cA63c5EF79ad3313E77E9A9da0b66F32ed0"
  );
  await omniChainNFT.crossChain(
    10006,
    "0x764c369910AC7432363b3D7a710c70A7Bcc082a2",
    ethers.BigNumber.from("1"),
    ethers.BigNumber.from("1"),
    { value: ethers.utils.parseEther("5") }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
