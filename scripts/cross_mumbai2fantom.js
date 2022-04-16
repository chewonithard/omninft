const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    //Return an instance of a Contract attached to address
    "0xCA439a1eA4eaE743A31ae34487C2ec516feb3a45"
  );
  await omniChainNFT.crossChain(
    10012,
    "0x81Df0cBb990592395DAB29F17674BB339F3124C7",
    ethers.BigNumber.from("201"),
    { value: ethers.utils.parseEther("1") }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
