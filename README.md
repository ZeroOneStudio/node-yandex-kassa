#node-yandex-kassa
---
[![NPM Version](https://img.shields.io/npm/v/node-yandex-kassa.svg?style=flat)](https://www.npmjs.com/package/node-yandex-kassa)
[![Build Status](https://img.shields.io/travis/ZeroOneStudio/node-yandex-kassa/master.svg?style=flat)](https://travis-ci.org/ZeroOneStudio/node-yandex-kassa)

by [Zero One](http://www.zeroone.st)

JavaScript utilities to integrate [Yandex.Kassa](https://kassa.yandex.ru/) payment API with your app

## Installation

```
npm install --save node-yandex-kassa
```

## Usage

Example usage with Express in route handler:

```javascript
import { checkMD5, buildResponse } from 'node-yandex-kassa';
const { KASSA_SHOP_PASSWORD } = process.env; // ... if you store such things there

app.post('/payments/check_order', (req, res, next) => {
  const { body } = req;
  const { invoiceId, shopId } = body;

  if (!checkMD5(body, KASSA_SHOP_PASSWORD)) {
  	return res.status(400).send('Validation of MD5 failed');
  }

  // ...
  //
  // Here you might validate request params (orderNumber of customerNumber, for example)
  // if these parameters were passed to payment form
  // ...

  res.set('Content-Type', 'text/xml');
  res.send(buildResponse('checkOrder', 0, shopId, invoiceId));
});

```

# Functions

## checkMD5(requestBody, shopPassword)

Returns `boolean`.

Checks request body for valid `md5` param.

Requests are being made by Yandex.Kassa service and have standart format (with sample data):

| Key  | Value |
------ | ----- |
| requestDatetime | 2011-05-04T20:38:00.000+04:00 |
| action |	checkOrder|
| md5 |	8256D2A032A35709EAF156270C9EFE2E |
| shopId | 13 |
| shopArticleId | 456 |
| invoiceId | 1234567 |
| customerNumber | 8123294469 |
| orderCreatedDatetime | 2011-05-04T20:38:00.000+04:00 |
| orderSumAmount | 87.10 |
| orderSumCurrencyPaycash | 643 |
| orderSumBankPaycash | 1001 |
| shopSumAmount | 86.23 |
| shopSumCurrencyPaycash | 643 |
| shopSumBankPaycash | 1001 |
| paymentPayerCode | 42007148320 |
| paymentType | AC |


## buildResponse(action, statusCode, shopId, invoiceId, message = null)

Returns `string`.

Generates string with valid XML required by Yandex.Kassa API.

Example of successful response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<checkOrderResponse performedDatetime="2011-05-04T20:38:01.000+04:00"
code="0" invoiceId="1234567"
shopId="13"/>
```

Example of response with error:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<checkOrderResponse performedDatetime="2011-05-04T20:38:01.000+04:00"
code="100" invoiceId="1234567"
shopId="13"
message="Given customerNumber does not exist"
techMessage="Wrong phone number"/>
```

### More docs coming soon

For now, for more info on usage and itegration refer to [official integration guide](https://money.yandex.ru/doc.xml?id=527069) and [API spec](https://money.yandex.ru/doc.xml?id=527069).

## License

This project rocks and uses MIT License

Copyright (c) 2015 [Zero One](http://www.zeroone.st)
