const { EAC, Util } = require('@ethereum-alarm-clock/lib');
const moment = require('moment');

const web3 = Util.getWeb3FromProviderUrl('ws://localhost:8545');

const eac = new EAC(web3);

async function scheduleTransaction() {
    const receipt = await eac.schedule({
        toAddress: '0xe87529A6123a74320e13A6Dabf3606630683C029',
        windowStart: moment().add('1', 'day').unix() // 1 day from now
    });

    console.log(receipt);
}

scheduleTransaction();