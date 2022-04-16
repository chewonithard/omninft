const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0x81Df0cBb990592395DAB29F17674BB339F3124C7"
  );
  await omniChainNFT.crossChain(
    10006,
    "0x63519878635D08259535AbF55352b2C7BBb528F5",
    ethers.BigNumber.from("3"),
    { value: ethers.utils.parseEther("5") }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
