import {ethers} from 'ethers'
import {
    PRIVATE_KEY_0,
    PRIVATE_KEY_1,
    PRIVATE_KEY_2,
    PRIVATE_KEY_3,
    PRIVATE_KEY_4,
    PRIVATE_KEY_5,
    PRIVATE_KEY_6,
    PRIVATE_KEY_7,
    wallet8,
    wallet9,
    ganacheProvider
} from './config.js'

const {utils, providers, Wallet} = ethers
const provider = new providers.Web3Provider(ganacheProvider)
const wallet0 = new Wallet(PRIVATE_KEY_0, provider);
const wallet1 = new Wallet(PRIVATE_KEY_1, provider);
const wallet2 = new Wallet(PRIVATE_KEY_2, provider);
const wallet3 = new Wallet(PRIVATE_KEY_3, provider);
const wallet4 = new Wallet(PRIVATE_KEY_4, provider);
const wallet5 = new Wallet(PRIVATE_KEY_5, provider);
const wallet6 = new Wallet(PRIVATE_KEY_6, provider);
const wallet7 = new Wallet(PRIVATE_KEY_7, provider);

(async () => {
    console.log("balance wallet0: ", utils.formatEther(await wallet0.getBalance()))
    console.log("balance wallet1: ", utils.formatEther(await wallet1.getBalance()))
    console.log("balance wallet2: ", utils.formatEther(await wallet2.getBalance()))
    console.log("balance wallet3: ", utils.formatEther(await wallet3.getBalance()))
    console.log("balance wallet4: ", utils.formatEther(await wallet4.getBalance()))

    // Transfer funds from wallet1 to other wallets
    await payroll(1.0, wallet1, [wallet2.address, wallet3.address, wallet4.address, wallet5.address, wallet6.address]);
    // Transfer funds from wallet2 to other wallets
    await payroll(2.0, wallet2, [wallet0.address, wallet4.address, wallet5.address, wallet6.address, wallet7.address]);

    console.log("balance after wallet0: ", utils.formatEther(await wallet0.getBalance()))
    console.log("balance after wallet1: ", utils.formatEther(await wallet1.getBalance()))
    console.log("balance after wallet2: ", utils.formatEther(await wallet2.getBalance()))
    console.log("balance after wallet3: ", utils.formatEther(await wallet3.getBalance()))
    console.log("balance after wallet4: ", utils.formatEther(await wallet4.getBalance()))

    const wallet1Addresses = await findRecipientAddresses(wallet1.address)
    const emptyWalletAddresses = "No data found"
    console.log("addresses for wallet 1: ", wallet1Addresses.length ? wallet1Addresses : emptyWalletAddresses)

    const wallet2Addresses = await findRecipientAddresses(wallet2.address)
    console.log("addresses for wallet 2: ", wallet2Addresses.length ? wallet2Addresses : emptyWalletAddresses)

    const wallet3Addresses = await findRecipientAddresses(wallet3.address)
    console.log("addresses for wallet 3: ", wallet3Addresses.length ? wallet3Addresses : emptyWalletAddresses)
})();

async function payroll(amount, sender, employees) {
    const GAS = 50 // in WEI
    if (amount <= 0 || employees.length == 0) return
    const senderBalance = await sender.getBalance()
    const amountInWei = utils.parseUnits(amount.toString(), 18)

    if (senderBalance >= ((employees.length * amountInWei) + GAS)) {
        for (let i = 0; i < employees.length; i++) {
            await sender.sendTransaction({value: amountInWei, to: employees[i]})
        }
    } else {
        console.log('it didnt work...')
    }
}

async function findRecipientAddresses(address) {
    const latestBlockNumber = await provider.getBlockNumber();
    const addresses = [];

    for (let blockNumber = 0; blockNumber <= latestBlockNumber; blockNumber++) {
        const block = await provider.getBlockWithTransactions(blockNumber);
        const filteredTransactionAddress = block.transactions.filter(
            transaction => transaction.from === address
        );
        addresses.push(...filteredTransactionAddress.map(transaction => transaction.to));
    }
    return addresses;
}












