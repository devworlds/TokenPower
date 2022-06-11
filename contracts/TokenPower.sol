//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC20 {

    //Implementado (mais ou menos)
    function totalSupply() external view returns(uint256);
    function balanceOf(address account) external view returns(uint256);
    function transfer(address recipient, uint256 amount) external returns(bool);

    //Não implementados (ainda)
    //function allowence(address owner, address spender) external view returns(uint256);
    //function approve(address spender, uint256 amount) external returns(bool);
    //function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);

    //Implementado
    event Transfer(address from, address to, uint256 value);

    //Não está implementado (ainda)
    //event Approval(address owner, address spender, uint256 value);

}

contract TokenPower is IERC20 {

    //Properties
    string public constant name = "CryptoToken";
    string public constant symbol = "CRY";
    uint8 public constant decimals = 3;  //Default dos exemplos é sempre 18
    uint256 private totalsupply;
    uint256 private burnValue = 70;
    uint256 minSupplyToken;
    Status statusTransfer;
    address public owner;
    mapping(address => uint256) private addressToBalance;


    //enum
    enum Status {TRANSFER_DISABLED, TRANSFER_ENBABLED}

    // Events
    //event Transfer(address sender, address receiver, uint256 amount);
 
    //Constructor
    constructor(uint256 total) {
        totalsupply = total;
        minSupplyToken = totalsupply/3;
        addressToBalance[msg.sender] = totalsupply;
        statusTransfer = Status.TRANSFER_ENBABLED;
    }

    //Public Functions
    function totalSupply() public override view returns(uint256) {
        return totalsupply;
    }

    function balanceOf(address tokenOwner) public override view returns(uint256) {
        return addressToBalance[tokenOwner];
    }

    //FIX: Ta feio, podemos melhorar
    function transfer(address receiver, uint256 quantity) public override returns(bool) {
        require(statusTransfer == Status.TRANSFER_ENBABLED, "Can't transfer, Transfer Status is Disabled!");
        require(quantity <= addressToBalance[msg.sender], "Insufficient Balance to Transfer");
        addressToBalance[msg.sender] = addressToBalance[msg.sender] - quantity;
        addressToBalance[receiver] = addressToBalance[receiver] + quantity;
        totalsupply -= burnTransfer(quantity);
        mintToken();
        emit Transfer(msg.sender, receiver, quantity);
        return true;
    }

    // Função para mintar caso o valor chegue em 1/3 do token que é o limite do burn;
    function mintToken() private {

        if(totalsupply < minSupplyToken){
            while(totalsupply < minSupplyToken){
                totalsupply++;
            }
            // 1000 minToken = 333, amountSupply = 333  
        }
    }
    
    // Função pra dar burn no TotalSupply baseado na % descontada de cada transação
    function burnTransfer(uint256 amountToTransfer) private view returns(uint256){
       uint256 totalToBurn = (amountToTransfer*burnValue)/100;
       return totalToBurn;
    }

    function setTransferEnable() public {
        statusTransfer = Status.TRANSFER_ENBABLED;
    }

    function setTransferDisable() public{
        statusTransfer = Status.TRANSFER_DISABLED;
    }

    function getStatusTransfer() public view returns(string memory Return){
        

        if(statusTransfer == Status.TRANSFER_DISABLED){
            Return = "TRANSFER_DISABLED";
            return Return;
        }
        if(statusTransfer == Status.TRANSFER_ENBABLED){
            Return = "TRANSFER_ENABLED";
            return Return;
        }
        
    }
}