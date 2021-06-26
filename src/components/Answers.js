import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './App.css';

class Answers extends Component {
    render() {
        return (
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Answers received for your Questions</h1>
                        {this.props.myanswers.map((answer, key) => {
                            return (
                                <Card>
                                    <Card.Header>Answer for question {answer.qnId.toString()}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {answer.ans}
                                        </Card.Text>
                                        <Card.Text>
                                            Answered By: {answer.answeredBy} <br/><br/>
                                        </Card.Text>
                                        <Card.Subtitle>
                                        {window.web3.utils.fromWei(answer.reward.toString(), 'Ether')} CELO
                                        </Card.Subtitle>
                                        <Button
                                            variant="primary"
                                            name={answer.id}
                                            onClick={(event) => {
                                                this.props.sendReward(event.target.name)
                                            }}
                                        >
                                            Send Reward
                                    </Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </main>
                </div>
            </div>
        );
    }
}

export default Answers;