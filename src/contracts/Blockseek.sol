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
    uint qnId;
    uint256 reward;
    string ans;
    address payable answeredBy;
    address postedBy;
  }

  function postQuestion(uint256 _reward, string memory _qn) public {
    qCount++;
    questions[qCount] = Question(qCount, _reward, _qn, msg.sender, false);
  }

  function postAnswer(uint _qnId, string memory _ans) public {
    Question memory question = questions[_qnId];
    aCount++;
    answers[aCount] = Answer(aCount, _qnId, question.reward, _ans, msg.sender, question.author);
  }

  function sendReward(uint _ansId) public payable{
    Answer memory answer = answers[_ansId];
    Question memory question = questions[answer.qnId];
    answer.answeredBy.transfer(msg.value);
    question.answered = true;
    questions[answer.qnId] = question;
  }
}
