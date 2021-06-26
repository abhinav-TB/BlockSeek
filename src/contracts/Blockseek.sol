pragma solidity >=0.5.0;

contract Blockseek {
  
  uint public qCount = 0;
  uint public aCount = 0;

  mapping(uint => Question) public questions;
  mapping(uint => Answer) public answers;

  
  struct Question {
    uint id;
    uint256 reward;
    string qn;
    address author;
    bool answered;
  }
 

  struct Answer {
    uint id;
    string qn;
    address payable answeredBy;
    address postedBy;
  }

}