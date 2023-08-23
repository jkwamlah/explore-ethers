import {ethers} from 'ethers'
import {PRIVATE_KEY_0, PRIVATE_KEY_1, PRIVATE_KEY_2, PRIVATE_KEY_3, PRIVATE_KEY_4, PRIVATE_KEY_5, PRIVATE_KEY_6, PRIVATE_KEY_7, wallet8, wallet9, ganacheProvider
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

async function payroll(amount, sender, employees) {
    const GAS = 50 // in WEI
    // check that amount is greater than zero *
    // check that employees list has atleast one employee *
    // check that sender has enough balance ?
    // loop through employees
    // call send transaction for each employee with the amount
    if(amount <= 0 || employees.length==0) return
    const senderBalance = await sender.getBalance()
    const amountInWei = utils.parseUnits(amount.toString(), 18)
    // console.log('amountInWei', amountInWei)
    // parseEther === parseUnit( 18)
    if( senderBalance >= ((employees.length * amountInWei) + GAS)) {
        // challenge: fix the nonce error when the promises "resolve" at the same time

        // await Promise.all(employees.map((employeeAddress) => {
        //     return sender.sendTransaction({
        //         value: amountInWei,
        //         to: employeeAddress,
        //     })
        // }))

        for(let i=0; i<employees.length; i++) {
            await sender.sendTransaction({
                value: amountInWei,
                to: employees[i],
            })
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

(async () => {
    await wallet1.sendTransaction({value: utils.parseEther("0.1"), to: wallet0.address})
    await wallet1.sendTransaction({value: utils.parseEther("0.2"), to: wallet1.address})
    await wallet1.sendTransaction({value: utils.parseEther("0.3"), to: wallet2.address})
    await wallet1.sendTransaction({value: utils.parseEther("0.4"), to: wallet3.address})
    await wallet1.sendTransaction({value: utils.parseEther("0.5"), to: wallet4.address})

    await wallet2.sendTransaction({value: utils.parseEther("0.1"), to: wallet5.address})
    await wallet2.sendTransaction({value: utils.parseEther("0.2"), to: wallet6.address})
    await wallet2.sendTransaction({value: utils.parseEther("0.3"), to: wallet7.address})
    await wallet2.sendTransaction({value: utils.parseEther("0.4"), to: wallet8.address})
    await wallet2.sendTransaction({value: utils.parseEther("0.5"), to: wallet9.address})


    const {address} = wallet2
    const allTransactionAddresses = await findRecipientAddresses(address);
    console.log(`Wallet Transactions: `, allTransactionAddresses.length ? allTransactionAddresses : ` No transactions found`);
})();












