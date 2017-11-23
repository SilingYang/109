### 1.获取全部商品信息
**function loadAllItems()**
- output:Array [ {barcode:String, name:String, unit:String, price:Number} ,{ }...]

### 2.获取促销商品信息
**function loadPromotions()**
- output:Array [ {type:String, barcodes:[String,String...]} ]

### 3.将形如ITEM000003-2的输入格式转换为多个商品数组
**function changeBarcode()**
- input:String
- output:Array [String,String...]

### 4.将输入的商品条码转变成单个元素数组
**function inputGoodsListArr()**
- input:Array [String,String...]
- output:Array [String,String...]

### 5.根据条形码返回相应包含商品对象的数组
**function outputGoodsList()**
- input:Array [String,String...]
- output:Array [ {barcode:String, name:String, unit:String, price:Number} ,{ }...]

### 6.将商品归类形成对象数组
**function classifyGoodsList()**
- input:Array [String,String...]
- output:Array [ {name:String, count:Number, price:Number, subtotal:Number} ,{ }...]

### 7.将优惠商品形成对象数组
**function promotionGoodList()**
- input:Array [ {name:String, count:Number, price:Number, subtotal:Number} ,{ }...]
- output:Array [ {name:String, count:Number} ,{ }...]

### 8.将总计，节省形成对象数组
**function calculateAmount()**
- input:Array [ {name:String, count:Number, price:Number, subtotal:Number} ,{ }...]
- output:Array[{ total: total,promotionTotal: promotionTotal}]

### 9.强制保留两位小数的方法，单价，小计，总计，节省的数据输出需要,输出类型为字符串
**function toDecimal2()**
- input:Number
- output:String

### 10.对象变成变成标准字符串的方法
**function objToStr()**
- input:Object
- output:String

### 11.输出购物清单字符串
**function classifyGoodsStr(arr)**
- input:Array [String,String...]
- output:String

### 12.输出赠送商品字符串
- input:Array [String,String...]
- output:String

### 13.输出统计字符串
- input:Array [String,String...]
- output:String

### 14.总输出
- input:Array [String,String...]
- output:String
