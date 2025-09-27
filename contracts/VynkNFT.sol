// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VynkNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    // Struct to store NFT metadata
    struct NFTData {
        string prompt;
        uint256 creativity;
        uint256 promptAdherence;
        uint256 artisticQuality;
        uint256 overall;
        string feedback;
        uint256 timestamp;
    }
    
    // Mapping from token ID to NFT data
    mapping(uint256 => NFTData) public nftData;
    
    // Events
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed to,
        string prompt,
        uint256 creativity,
        uint256 promptAdherence,
        uint256 artisticQuality,
        uint256 overall
    );
    
    constructor() ERC721("Vynk NFT", "VYNK") Ownable(msg.sender) {}
    
    // Mint function for the contract owner (the app)
    function mintNFT(
        address to,
        string memory _tokenURI,
        string memory prompt,
        uint256 creativity,
        uint256 promptAdherence,
        uint256 artisticQuality,
        uint256 overall,
        string memory feedback
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        // Store the NFT data
        nftData[tokenId] = NFTData({
            prompt: prompt,
            creativity: creativity,
            promptAdherence: promptAdherence,
            artisticQuality: artisticQuality,
            overall: overall,
            feedback: feedback,
            timestamp: block.timestamp
        });
        
        emit NFTMinted(tokenId, to, prompt, creativity, promptAdherence, artisticQuality, overall);
        
        return tokenId;
    }
    
    // Public mint function (users can mint directly)
    function publicMint(
        string memory _tokenURI,
        string memory prompt,
        uint256 creativity,
        uint256 promptAdherence,
        uint256 artisticQuality,
        uint256 overall,
        string memory feedback
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        // Store the NFT data
        nftData[tokenId] = NFTData({
            prompt: prompt,
            creativity: creativity,
            promptAdherence: promptAdherence,
            artisticQuality: artisticQuality,
            overall: overall,
            feedback: feedback,
            timestamp: block.timestamp
        });
        
        emit NFTMinted(tokenId, msg.sender, prompt, creativity, promptAdherence, artisticQuality, overall);
        
        return tokenId;
    }
    
    // Get NFT data
    function getNFTData(uint256 tokenId) public view returns (NFTData memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return nftData[tokenId];
    }
    
    // Get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
