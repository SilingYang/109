'use strict';

var outputGoodsList = require('../spec/test.js');

describe('outputGoodsList', function () {

var inputs =  [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];

 var inputsResult = [ { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3 },
  { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3 },
  { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3 },
  { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3 },
  { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3 },
  { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5 },
  { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5 },
  { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5 } ]

  it('根据输入的条形码返回相应的商品对象', function() {

    var result = outputGoodsList(inputs);
    expect(result).toEqual(inputsResult);
  });
});