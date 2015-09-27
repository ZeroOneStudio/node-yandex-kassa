## node-yandex-kassa
by [Zero One](http://www.zeroone.st)

Node.js utilities to integrate Yandex.Kassa with your app

Example usage in express route handler:

```javascript
import { buildResponse, checkMD5 } from 'node-yandex-kassa';
const { KASSA_SHOP_ID } = process.env; // ... if you store such things there

app.post('/payments/check', (req, res, next) => {
  const { body } = req;
  const { invoiceId, shopId, orderNumber, customerNumber } = body;

  if (!checkMD5(body, KASSA_SHOP_ID)) {
  	return res.status(400).send('Validation of MD5 failed');
  }

  // ...
  //
  // Here you might validate request, for example, for presence
  // of orderNumber of customerNumber in your DB, if these parameters
  // were passed to payment form
  //
  // ...

  res.set('Content-Type', 'text/xml');
  res.send(buildResponse('checkOrder', 0, shopId, invoiceId));
});

```

### More docs coming soon

For now, for more info on usage and itegration refer to [official integration guide](https://money.yandex.ru/doc.xml?id=527069) and [API spec](https://money.yandex.ru/doc.xml?id=527069).

## License

This project rocks and uses MIT License

Copyright (c) 2015 [Zero One](http://www.zeroone.st)
