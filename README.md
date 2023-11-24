# stETH-Auto-Minter for Goerli

The `stETH-Auto-Minter` is a Node.js script designed to automatically interact with the StEthMinter smart contract to mint stETH from Lido's implementation on Goerli. It's configured to send a specified amount of goETH to the StEthMinter's mint function at regular intervals, adjusting the mint amount based on the account's balance, and ensuring a minimum balance is retained.

## Features

- Automatically mints stETH by sending goETH to the mint function of the StEthMinter smart contract.
- Adjusts the minting amount based on the current balance of the sending account.
- Preserves a minimum balance in the sending account.
- Implements a retry mechanism with exponential backoff for handling transaction failures.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- A Web3 provider URL (e.g., Infura, Alchemy) to interact with Goerli.
- A Goerli account with a sufficient balance for minting and transaction fees.

## Setup

To run the `stETH-Auto-Minter`, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Update the script with your Goerli account's private key and Web3 provider URL.
4. Modify the script to adjust the amount and minting logic.
