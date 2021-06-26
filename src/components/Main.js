import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './App.css';


class Main extends Component {
    constructor() {
      super();
      this.state = {
        search: ''
      };
    }
  
    updateSearch(event) {
      this.setState({search: event.target.value.substr(0,20)});
    }
  
    render() {
      let filteredQuestions = this.props.questions.filter(
        (question) => {
          return question.qn.indexOf(this.state.search) !== -1;
        }
      );

      return (
        <div className="contain">
                <h1 align="center" style={{ marginTop: '100px' }} class="w3-tangerine">Blockseek</h1>

                <Card className="home-card">
                    <Card.Body>
                        <Card.Text>
                            Team coding samurai
                            <br />
                            Celo sponsor track
                        </Card.Text>
                    </Card.Body>
                </Card>

                <p align="center">Welcome {this.props.account}</p>

                <br/><br/>
                <input type="text" class="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <p>&nbsp;</p>
                { filteredQuestions.map((question, key) => {
                    return(
                        <Card key={key}>
                        <Card.Body>
                            <Card.Title>{question.qn}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Posted by: {question.author}</Card.Subtitle>
                            <br/>
                            <Card.Subtitle className="mb-2 text-muted">Reward: {window.web3.utils.fromWei(question.reward.toString(), 'Ether')} CELO</Card.Subtitle>
                            <Card.Text>
                                <br />
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const qnId = question.id
                                    const ans = this.ans.value
                                    this.props.postAnswer(qnId, ans)
                                }}>
                                    <h3>Enter your answer</h3>
                                    <textarea
                                        id="ans"
                                        rows={5}
                                        ref={(input) => { this.ans = input }}
                                        className="form-control"
                                        required
                                    />
                                    <br />
                                    <Button type="submit" variant="info">Submit answer</Button>
                                </form>
                                <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    )
                })}
        </div>
      );
    }
}

export default Main;