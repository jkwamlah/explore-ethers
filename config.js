import {ethers} from 'ethers'
import Ganache from "ganache-core"

const {utils, Wallet} = ethers

const INITIAL_BALANCE = utils.parseEther('20.0');

const PRIVATE_KEY_0 = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const PRIVATE_KEY_1 = "0x4f39d7a86f79964a7129aba81d3c8fdfec6d2e0e33b3d1cc20bbc3c02c1f2b28";
const PRIVATE_KEY_2 = "0xc5ab4681481e4b4b805beea8378e59ebbd241f264c536acd64c0a3b22fa77a76"
const PRIVATE_KEY_3 = "0x4a39a4e5b8ea60b094f5e2417c05a95e579c32e783b432f52c0e53e7ee6d7e81"
const PRIVATE_KEY_4 = "0x8b23e7f85d7f49b0cc8d794cc1f1c13a9a1980a81a78d6a74cf4a59a0760d833"
const PRIVATE_KEY_5 = "0x63e9d741e13e9a60ecf55d3b302692977d5fb418f8b2e2e6148835e07f0843e9"
const PRIVATE_KEY_6 = "0x29b74e4b6ff2c9f01949ea8b9e17b5f2c6dbf27f64ea75a2027a92e12ce659bf"
const PRIVATE_KEY_7 = "0x7a97e14bfa037a1e9ebe85e4b0f78d9f32cdd3b950f179d335c826a93b8bb6af"

const SEED_PHRASE_8 = "carbon subway wet hard weapon minimum satisfy cheese spoon jar gym ensure"
const SEED_PHRASE_9 = "radar blur cabbage chef fix engine embark joy scheme fiction master release"

const wallet8 = Wallet.fromMnemonic(SEED_PHRASE_8)
const wallet9 = Wallet.fromMnemonic(SEED_PHRASE_9)


// create our test account from the private key, initialize it with 20 ether
const accounts = [].concat([{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_0,
}, {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_1,
}, {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_2,
}
]);

const ganacheProvider = Ganache.provider({accounts});

export {
    INITIAL_BALANCE,
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
}