const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    "0x63519878635D08259535AbF55352b2C7BBb528F5"
  );
  await omniChainNFT.crossChain(
    10009,
    "0xCA439a1eA4eaE743A31ae34487C2ec516feb3a45",
    ethers.BigNumber.from("1"),
    { value: ethers.utils.parseEther("5") }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
