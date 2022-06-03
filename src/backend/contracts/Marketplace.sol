//SPDX-license-identifier : MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard{
    //state

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;
    struct Item{
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }
    mapping(uint => Item) public items;

    event Offered(
        uint itemId, address indexed nft, uint tokenId, uint price, address indexed seller
    );

    event Bought(
        uint itemId, 
        address indexed nft, 
        uint tokenId, 
        uint price, 
        address indexed seller, 
        address indexed buyer
    );
    constructor(uint _feePercent){
        feePercent=_feePercent;
        feeAccount=payable(msg.sender);
    }

    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant{
        require(_price>0, "Price can not be <= zero");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[itemCount]=Item(
            itemCount, _nft, _tokenId, _price, payable(msg.sender), false
        );
        emit Offered(itemCount, address(_nft),_tokenId,_price,msg.sender );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant{
        uint totalPrice = getItemPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId<itemCount && _itemId>=0, "Wrong Item index");
        require(totalPrice>0,"Price can not be negative");
        require(msg.value>=totalPrice, "Not enough balance");
        require(!item.sold, "Item is already sold");

        item.seller.transfer(item.price);
        feeAccount.transfer(totalPrice-item.price);

        item.sold=true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Bought(_itemId, address(item.nft),item.tokenId,item.price,item.seller,msg.sender);

    }

    function getItemPrice(uint _itemId) view public returns(uint){
        return items[_itemId].price*(100+feePercent)/100;
    }
}