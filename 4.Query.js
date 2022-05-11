import {LCDClient} from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12'
});


async function test() {

  try {
    const result = await terra.wasm.contractQuery('terra133eznz37g4cfpts4fzjqm7n7wx8sphj4ueqky6', { get_count : {} });
    console.log( "Query Counter ",result);
  
  } catch (error) {
    console.log(error);
  }
  
}

test()

