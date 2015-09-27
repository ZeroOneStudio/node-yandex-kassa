'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.generateHash = generateHash;
exports.checkMD5 = checkMD5;
exports.buildResponse = buildResponse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectToXml = require('object-to-xml');

var _objectToXml2 = _interopRequireDefault(_objectToXml);

var _md5 = require('md5');

var _md52 = _interopRequireDefault(_md5);

//
// MD5 response hashing
//

function generateHash(request, shopPassword) {
  var action = request.action;
  var orderSumAmount = request.orderSumAmount;
  var orderSumCurrencyPaycash = request.orderSumCurrencyPaycash;
  var orderSumBankPaycash = request.orderSumBankPaycash;
  var shopId = request.shopId;
  var invoiceId = request.invoiceId;
  var customerNumber = request.customerNumber;

  return _md52['default']([action, orderSumAmount, orderSumCurrencyPaycash, orderSumBankPaycash, shopId, invoiceId, customerNumber, shopPassword].join(';')).toUpperCase();
}

//
// Validate request
//

function checkMD5(request, shopPassword) {
  var originalHash = request.md5;

  var resultHash = generateHash(request, shopPassword);

  return resultHash === originalHash;
}

//
// XML response template
//
function toXML(body) {
  return _objectToXml2['default'](_extends({
    '?xml version="1.0" encoding="UTF-8"?': null
  }, body));
}

//
// Build XML response
//

function buildResponse(action, resultCode, shopId, invoiceId, message) {
  var _toXML;

  var performedDatetime = new Date().toISOString();

  return toXML((_toXML = {}, _toXML[action + 'Response'] = {
    '@': {
      performedDatetime: performedDatetime,
      code: resultCode,
      invoiceId: invoiceId,
      shopId: shopId,
      message: message
    }
  }, _toXML));
}