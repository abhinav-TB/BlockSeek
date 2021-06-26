import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import './App.css';
import Web3 from 'web3';
import Blockseek from '../abis/Blockseek.json';
import pic from '../logo.png';
import Main from './Main';
import Post from './Post';
import Answers from './Answers';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.celo) {
      await window.celo.enable()
      window.web3 = new Web3(window.celo)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Use the Celo Extension Wallet!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Blockseek.networks[networkId]
    if (networkData) {
      const blockseek = new web3.eth.Contract(Blockseek.abi, networkData.address)
      this.setState({ blockseek })
      const qCount = await blockseek.methods.qCount.call()
      const aCount = await blockseek.methods.aCount.call()

      for (let i = 1; i <= qCount; i++) {
        const question = await blockseek.methods.questions(i).call()
        if (question.answered == false) {
          this.setState({
            questions: [...this.state.questions, question]
          })
        }
      }

      for (let i = 1; i <= aCount; i++) {
        const answer = await blockseek.methods.answers(i).call()
        if (answer.postedBy === this.state.account) {
          this.setState({
            myanswers: [...this.state.myanswers, answer]
          })
        }
      }
      this.setState({ loading: false })
    } else {
      window.alert('Contract could not be deployed to the network.')
    }
  }

  postQuestion(reward, qn) {
    this.setState({ loading: true })
    this.state.blockseek.methods.postQuestion(window.web3.utils.toWei(reward.toString(), 'ether'), qn).send({ from: this.state.account })
      .once('confirmation', (n, receipt) => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  postAnswer(qnId, ans) {
    this.setState({ loading: true })
    this.state.blockseek.methods.postAnswer(qnId, ans).send({ from: this.state.account })
      .once('confirmation', (n, receipt) => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  sendReward(ansId) {
    this.setState({ loading: true })
    this.state.blockseek.methods.postAnswer(ansId).send({ from: this.state.account })
      .once('confirmation', (n, receipt) => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      blockseek: null,
      questions: [],
      myanswers: [],
      loading: true
    }
  }

  render() {
    return (
      <div style={{ height: 800 }}>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            src={pic}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/post">Post Question</Nav.Link>
            <Nav.Link href="/answers">My Answers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <center><br/><br/><br/><br/><br/><br/><div class="loader"></div></center>
                  : <Main account={this.state.account} questions={this.state.questions} postAnswer={this.postAnswer}/>
              }
            </React.Fragment>
          )} />
          <Route exact path="/post" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <center><br/><br/><br/><br/><br/><br/><div class="loader"></div></center>
                  : <Post postQuestion={this.postQuestion}/>
              }
            </React.Fragment>
          )} />
          <Route exact path="/answers" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <center><br/><br/><br/><br/><br/><br/><div class="loader"></div></center>
                  : <Answers myanswers={this.state.myanswers} sendReward={this.sendReward}/>
              }
            </React.Fragment>
          )} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;