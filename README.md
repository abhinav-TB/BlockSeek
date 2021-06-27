# BlockSeek
BlockSeek provides a blockchain-based forum where any users can seek answers to questions of any kind. They can post the question on this forum and also offer a small reward in crypto to the most satisfactory answer obtained for that question.

## Steps to run

### Install Dependencies

Node JS - [node](https://nodejs.org/en/download/)

Celo Extension Wallet and set Alfajores Test Network.

### Clone the repo
```
$ git clone https://github.com/abhinav-TB/BlockSeek.git
$ cd BlockSeek
```

### Install Truffle and other dependencies
```
$ npm install -g truffle@5.1.44
$ npm install
```

- Create a .secret file in the root directory of the repo and enter your Celo account private key.

### Migrate and Run the DApp
```
$ truffle migrate --reset --network alfajores
$ npm start
```

- Visit localhost:3000 and connect your Celo extension wallet account.
