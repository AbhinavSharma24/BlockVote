# BlockVote 🗳️

A decentralized voting system based on Ethereum blockchain technology.

## Requirements

- [Node.js](https://nodejs.org)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://github.com/trufflesuite/ganache-cli)
- [Metamask](https://metamask.io/)

## Setting up the development environment

### Getting the requirements

1. Download and install NodeJS

   > node.js `v14.15.4`

   Download NodeJS from [here](https://nodejs.org/en/download/ "Go to official NodeJS download page.").

1. Install truffle and ganache-cli

   > truffle `v5.2.4`  
   > ganache-cli `v6.12.2`

   ```shell
   npm install -g truffle
   npm install -g ganache-cli
   ```

1. Install metamask browser extension

   Download and install metamask from [here](https://metamask.io/download "Go to official metamask download page.").

### Configuring the project for development

1. Clone this repository

   ```shell
   git clone https://github.com/AbhinavSharma24/BlockVote.git
   cd BlockVote
   ```

1. Run local Ethereum blockchain

   ```shell
   ganache-cli
   ```

   > Note: Do not close `ganache-cli` (the blockchain network needs to be running all the time)

1. Configure metamask on the browser with following details

   New RPC URL: `http://localhost:8545`  
   Chain ID: `1337`

1. Import accounts using private keys from ganache-cli to the metamask extension on the browser
1. Deploy smart contract to the (local) blockchain

   ```shell
   # on the dVoting directory
   truffle migrate
   ```

   > Note: Use `truffle migrate --reset` for redeployments

1. Launch the development server (fronted)

   ```shell
   cd client
   npm install
   npm start
   ```

---
