import o2x from 'object-to-xml';
import md5 from 'md5';

//
// MD5 response hashing
//
export function generateHash(request, shopPassword) {
  const {
    action,
    orderSumAmount,
    orderSumCurrencyPaycash,
    orderSumBankPaycash,
    shopId,
    invoiceId,
    customerNumber
  } = request;

  return (
    md5([
      action,
      orderSumAmount,
      orderSumCurrencyPaycash,
      orderSumBankPaycash,
      shopId,
      invoiceId,
      customerNumber,
      shopPassword
    ].join(';'))
    .toUpperCase()
  );
}


//
// Validate request
//
export function checkMD5(request, shopPassword) {
  const { md5: originalHash } = request;
  const resultHash = generateHash(request, shopPassword);

  return resultHash === originalHash;
}

//
// XML response template
//
function toXML(body) {
  return o2x({
    '?xml version="1.0" encoding="UTF-8"?': null,
    ...body
  });
}

//
// Build XML response
//
export function buildResponse(action, resultCode, shopId, invoiceId, message) {
  const performedDatetime = new Date().toISOString();

  return toXML({
    [`${action}Response`]: {
      '@': {
        performedDatetime,
        code: resultCode,
        invoiceId,
        shopId,
        message
      }
    }
  });
}

