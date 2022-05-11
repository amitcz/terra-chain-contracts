import { MsgExecuteContract, MnemonicKey, LCDClient } from '@terra-money/terra.js';

const mk = new MnemonicKey({
  mnemonic: 'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius'
})

// connect to localterra
const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12'
});


const wallet = terra.wallet(mk);


const execute = new MsgExecuteContract(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v', // sender
  'terra133eznz37g4cfpts4fzjqm7n7wx8sphj4ueqky6', // contract account address
  { increment : {} }, // handle msg
  { uluna: 100000 } // coins
);


async function testIncrement(){
  const executeTx = await wallet.createAndSignTx({
    msgs: [execute]
  });
  
  const executeTxResult = await terra.tx.broadcast(executeTx);

  console.log("Tx Result :",executeTx);

}

testIncrement();

