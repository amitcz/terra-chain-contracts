import { LCDClient, MsgStoreCode, MnemonicKey, isTxError } from '@terra-money/terra.js';
import * as fs from 'fs';

// test1 key from localterra accounts
const mk = new MnemonicKey({
  mnemonic: 'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius'
})

// connect to localterra
const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12'
});


const wallet = terra.wallet(mk);
console.log("Wallet Address :::::", wallet.key.accAddress);

const storeCode = new MsgStoreCode(
  wallet.key.accAddress,
  fs.readFileSync('counter.wasm').toString('base64')
);
const storeCodeTx = await wallet.createAndSignTx({
  msgs: [storeCode],
});
const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);

console.log(storeCodeTxResult);

if (isTxError(storeCodeTxResult)) {
  throw new Error(
    `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
  );
}

const {
  store_code: { code_id },
} = storeCodeTxResult.logs[0].eventsByType;
