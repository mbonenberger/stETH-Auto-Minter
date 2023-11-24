import Web3 from 'web3';

// Initialize web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider('YOUR_RPC_PROVIDER_URL'));

// The ABI for the contract including the mint function
const contractABI = [
  {"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},
  {"stateMutability":"payable","type":"receive"}
];

// The contract address
const contractAddress = '0xDdD81c0F3Efc825f43aa6907A2b82d9CbF171f0e';

// The contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Account private key
const privateKeyString = '0x...'; // Replace with the actual private key
const account = web3.eth.accounts.privateKeyToAccount(privateKeyString);

// Initial delay
let delay = 30000; // 30 seconds

async function mintToken() {
  console.log(`${new Date().toISOString()} - Attempting to mint.`);

  // Check the balance of the account
  const balanceWei = await web3.eth.getBalance(account.address);
  const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
  console.log(`${new Date().toISOString()} - Current balance: ${balanceEth} ETH`);

  // If balance is less than or equal to 1 ETH, stop the loop
  if (Number(balanceWei) <= web3.utils.toWei('1', 'ether')) {
    console.error(`${new Date().toISOString()} - Balance is at or below 1 ETH. Stopping the minting process.`);
    return;
  }

  // Determine minting amount: either 100 ETH or the balance minus 1 ETH if balance is less than 100 ETH
  let mintAmountWei = web3.utils.toWei('100', 'ether');
  if (Number(balanceWei) < Number(mintAmountWei)) {
    mintAmountWei = (BigInt(balanceWei) - BigInt(web3.utils.toWei('1', 'ether'))).toString();
  }

  // Transaction object
  const tx = {
    from: account.address,
    to: contractAddress,
    data: contract.methods.mint().encodeABI(),
    value: mintAmountWei,
    gas: '300000', // This is an estimate. You may want to dynamically estimate this
  };

  // Get current gas price from the network and calculate EIP-1559 gas fields
  const gasPrice = await web3.eth.getGasPrice();
  const maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei');
  const maxFeePerGas = (BigInt(gasPrice) + BigInt(maxPriorityFeePerGas)).toString();

  tx.maxPriorityFeePerGas = maxPriorityFeePerGas;
  tx.maxFeePerGas = maxFeePerGas;

  // Sign and send the transaction
  try {
    const signedTx = await account.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Deconstruct the receipt to exclude the `logs` field
    const { logs, ...receiptWithoutLogs } = receipt;
    console.log(`${new Date().toISOString()} - Transaction successful. Receipt:`, receiptWithoutLogs);

    // Reset delay after a successful transaction
    delay = 30000;
  } catch (error) {
    console.error(`${new Date().toISOString()} - Error sending transaction:`, error);
    // Apply exponential backoff on failure
    delay = Math.min(delay * 2, 300000); // Cap at 5 minutes
  }

  // Schedule the next attempt
  console.log(`${new Date().toISOString()} - Waiting ${delay / 1000} seconds before the next attempt.`);
  setTimeout(mintToken, delay);
}

// Start the minting process without an initial delay
mintToken();
