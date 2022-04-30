const hre = require("hardhat");

async function main() {
  const account = "0xDdcDA6F7592D23c56b4058F65E6e98f02cD6D2a7";
  const OmniChainNFT = await hre.ethers.getContractFactory("OmniChainNFT");
  const omniChainNFT = await OmniChainNFT.attach(
    // "0x63519878635D08259535AbF55352b2C7BBb528F5"
    "0x19821491f7d886fd3E4905C62a739048A3f16847" //fuji deployed address
  );
  await omniChainNFT.mint();
  const balance = await omniChainNFT.balanceOf(account);
  console.log("Fuji NFT balance: ", balance.toString());
  const owner = await omniChainNFT.ownerOf(1);
  console.log("Token 1 owner: ", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
