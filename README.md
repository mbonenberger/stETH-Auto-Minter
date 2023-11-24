# stETH-Auto-Minter

# ETH-Auto-Minter

The `ETH-Auto-Minter` is a Node.js script designed to automatically interact with an Ethereum smart contract to mint tokens. It's configured to send a specified amount of ETH to a smart contract's mint function at regular intervals, adjusting the mint amount based on the account's balance, and ensuring a minimum balance is retained.

## Features

- Automatically mints tokens by sending ETH to a smart contract's mint function.
- Adjusts the minting amount based on the current balance of the sending account.
- Preserves a minimum balance in the sending account.
- Implements a retry mechanism with exponential backoff for handling transaction failures.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- A Web3 provider URL (e.g., Infura, Alchemy) to interact with the Ethereum network.
- An Ethereum account with a sufficient balance for minting and transaction fees.

## Setup

To run the `ETH-Auto-Minter`, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Update the `.env` file with your Ethereum account's private key and Web3 provider URL.
4. Modify the script as necessary to point to the correct smart contract and adjust the minting logic.

