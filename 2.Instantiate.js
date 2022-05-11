import { MsgInstantiateContract, MnemonicKey, LCDClient, isTxError} from '@terra-money/terra.js';

// test1 key from localterra accounts
const mk = new MnemonicKey({
  mnemonic: 'permit evidence license pottery amateur cram runway hope project company soap husband outer sort eagle sad keep moral saddle script train equip topic brave'
})

// connect to localterra
const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12'
});
const wallet = terra.wallet(mk);

const instantiate = new MsgInstantiateContract(
  wallet.key.accAddress,
  "",
  70958,
  {
    count: 23,
  } // InitMsg
);

const instantiateTx = await wallet.createAndSignTx({
  msgs: [instantiate],
});
const instantiateTxResult = await terra.tx.broadcast(instantiateTx);

console.log(instantiateTxResult);

if (isTxError(instantiateTxResult)) {
  throw new Error(
    `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
  );
}

const {
  instantiate_contract: { contract_address },
} = instantiateTxResult.logs[0].eventsByType;