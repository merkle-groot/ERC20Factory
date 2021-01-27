// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;


/** 
 * @title QuadVotingFactory Contract
 * @dev Contract for creating child contracts
*/
contract ERC20Factory{
    address [] public listOfERC20s;
    
    event ContractCreated(address contractAddress);
    
    /** 
    * @dev Function which creates child contracts
    * @param _initialSupply No of initial tokens supplied by Factory Contract
    * @param _symbol Ticker symbol for the token
    * @param _name Name of the token
    */
    function createChildContract(string memory _name, string memory _symbol, uint256 _initialSupply) public{
        address newContract = address(new ERC20(_name, _symbol, _initialSupply, msg.sender));
        
        listOfERC20s.push(newContract);
        emit ContractCreated(newContract);
    }
    
    /**
    * @dev Function which returns all the created child contracts
    * @return This returns the entire array of deployed contract addresses
    */
    function getDeployedChildContract() external view returns (address[] memory){
        return listOfERC20s;
    }
}


/*
 * @title QuadVoting Contract1
 * @dev Contains ERC-20 functions and functions to create and vote in polls
*/
contract ERC20 {
    
    /////////////////// ERC20 related variables ///////////////////
    string  public name;
    string  public symbol;
    uint256 public totalSupply;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    ////////////////////////////////////////////////////////////////
    

    /////////////////// constructor ////////////////////////////////
    /**
    @dev Set the initial supply and token per person
    @param _initialSupply No of initial tokens supplied by Factory Contract
    @param _symbol Ticker symbol for the token
    @param _name Name of the token
    */
    constructor(string memory _name, string memory _symbol, uint256  _initialSupply, address _msgSender) public{
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply;
        balanceOf[_msgSender] = _initialSupply;
    }
    /////////////////////////////////////////////////////////////
    
    
    /////////////////// ERC20 related functions ////////////////
    
    /**
    @dev Standard ERC-20 function to transfer tokens
    @param _to Address to which to transfer
    @param _value No of tokens to transfer
     */
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value,"You don't have enough balance for this transaction");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
    
    /**
    @dev Additional function to transger from the contract to the approved address
    @param _to Address to which to transfer tokens
    @param _value No of tokens to be transferred
    */
    function transferFromContract(address _to, uint256 _value) private returns (bool success) {
        require(balanceOf[address(this)] >= _value,"Not enough balance for this transaction");

        balanceOf[address(this)] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(address(this), _to, _value);

        return true;
    }

    /**
    @dev Standard ERC-20 function to approve spending by another address
    @param _spender The address which the person approves the fund
    @param _value No of tokens approved
    */
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    /**
    @dev Standard ERC-20 function to spend tokens from approved addresses
    @param _from The address of the sender
    @param _to  The address of the receiver
    @param _value No of tokens to be transferred
    */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from],"The sender does not have enough balance for this transaction");
        require(_value <= allowance[_from][msg.sender],"Not authorized by the sender");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
    ///////////////////////////////////////////////////////////////
}
