// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.14;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract FurkaNFT is ERC721URIStorage, Ownable {

//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;

//     constructor() ERC721("FurkaNFT", "fNFT") {}

//     function totalSupply() public view returns (uint256) {
//         return _tokenIds.current();
//     }

//     function contractURI() public pure returns (string memory) {
//         return "https://gateway.pinata.cloud/ipfs/QmeCZByE4MJxF6Qm5RS2wA2gNP8PPkfHqVG5cfnn3QSS8F";
//     }

//     function mintItem(address minter, string memory tokenURI)
//          public payable returns (uint256) {

//              _tokenIds.increment();
//              uint256 newItemId = _tokenIds.current();
//              _mint(minter, newItemId);
//              _setTokenURI(newItemId, tokenURI);
//              return newItemId;
//     }
// }