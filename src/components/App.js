import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Web3 from 'web3';
import Blockseek from '../abis/Blockseek.json';
import './App.css';

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
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <h1>Blockseek</h1>
        </nav>
      </div>
    );
  }
}

export default App;