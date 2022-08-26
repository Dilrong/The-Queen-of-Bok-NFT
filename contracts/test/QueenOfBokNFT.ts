import { expect } from "chai";
import { ethers } from "hardhat";

describe("QueenOfBokNFT", function () {
  it("safeMint", async function () {
    const QueenOfBokNFT = await ethers.getContractFactory('QueenOfBokNFT');

    const hardhatQueenOfBokNFT = await QueenOfBokNFT.deploy();

    await expect(await hardhatQueenOfBokNFT.mintNFT({ value: ethers.utils.parseEther("1"), })).to.emit(hardhatQueenOfBokNFT, "NewNFTMinted");
  });

});