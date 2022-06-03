//SPDX-license-identifier : MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage{

    uint public tokenCount; //Default 0

    constructor() ERC721("Verbwire NFT","VNFT"){

    }

    // Function to mint NFT
    function nft(string memory _tokenURI) external returns (uint){
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}