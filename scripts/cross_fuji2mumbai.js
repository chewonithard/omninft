const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0xE1Ee12994d455da28470946f89A4f8089BF4a976" //fuji deployed add
  );
  await omniChainNFT.crossChain(
    10009,
    "0xE5d54cA63c5EF79ad3313E77E9A9da0b66F32ed0", //mumbai
    ethers.BigNumber.from("102"),
    ethers.BigNumber.from("35"),
    { value: ethers.utils.parseEther("5") }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
