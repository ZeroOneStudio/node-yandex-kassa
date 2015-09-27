import test from 'tape';

import { checkMD5, generateHash } from '../src/kassa';

test('generateHash', assert => {
  const validHash = '1B35ABE38AA54F2931B0C58646FD1321';
  const shopPassword = 's<kY23653f,{9fcnshwq';

  const request = {
    action: 'checkOrder',
    orderSumAmount: '87.10',
    orderSumCurrencyPaycash: '643',
    orderSumBankPaycash: '1001',
    shopId: '13',
    invoiceId: '55',
    customerNumber: '8123294469',
    md5: validHash
  };

  assert.equal(generateHash(request, shopPassword), validHash, 'Should return valid hash');
  assert.end();
});

test('CheckMD5', assert => {
  const validHash = '1B35ABE38AA54F2931B0C58646FD1321';
  const shopPassword = 's<kY23653f,{9fcnshwq';

  const validRequest = {
    action: 'checkOrder',
    orderSumAmount: '87.10',
    orderSumCurrencyPaycash: '643',
    orderSumBankPaycash: '1001',
    shopId: '13',
    invoiceId: '55',
    customerNumber: '8123294469',
    md5: validHash
  };
  const invalidRequest = Object.assign({}, validRequest, { md5: 'blablabla'});

  assert.ok(checkMD5(validRequest, shopPassword), 'Should check for valid md5 request param');
  assert.notOk(checkMD5(invalidRequest, shopPassword), 'Should be falsy if md5 does not match valid hash');
  assert.end();
});

