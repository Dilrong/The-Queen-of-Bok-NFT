// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract QueenOfBokNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("QueenOfBokNFT", "QOB") {}

    event NewNFTMinted(address sender, uint256 tokenId);

    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, "https://res.cloudinary.com/wet932/raw/upload/v1659372878/QueenOfBok/Round1/metadata.json");

        _tokenIds.increment();

        emit NewNFTMinted(msg.sender, newItemId);
    }

    // function mintNFT(address recipient, string memory tokenURI)
    //     public onlyOwner
    //     returns (uint256)
    // {
    //     _tokenIds.increment();

    //     uint256 newItemId = _tokenIds.current();
    //     _mint(recipient, newItemId);
    //     _setTokenURI(newItemId, tokenURI);

    //     return newItemId;
    // }
}
