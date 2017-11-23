//获取全部的商品
function loadAllItems() {
    return [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}


//获取促销信息
function loadPromotions() {
    return [{
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
        ]
    }];
}


//将含有"-"的清单转换为单个商品数组
function changeBarcode(str) {
    let res = [];
    let quantity = Number(str.charAt(str.length - 1));
    for (let i = 0; i < quantity; i++) {
        res.push(str.substr(0, str.length - 2));
    }
    return res;
}


//将输入的商品条码转变成单个元素数组，去掉“-”后面的数字。
function inputGoodsListArr(arr)
{
    let res = [];
    arr.forEach(function(item, index, array){
        if (item.substr(item.length - 2, 1) === "-")
        {
            changeBarcode(item).forEach(function(item, index, array){
                res.push(item);
            });
        }
        res.push(item);
    });
    return res;
}


//根据条形码返回相应包含商品对象的数组
function outputGoodsList(arr)//输入参数为清单数组
{
    let outputList = [];
    let stdGoodsList=inputGoodsListArr(arr);//将清单转化为单个物品号的数组，每个元素为商品号
    stdGoodsList.forEach(function(item, index, array){
        for (let i = 0; i < loadAllItems().length; i++){
            if (item === loadAllItems()[i].barcode){
                outputList.push(loadAllItems()[i]);
            }
        }
    });
    return outputList;
}


//将商品归类形成对象数组
function classifyGoodsList(arr)
{
    let result = [];
    let lastResultArr = [];
    let nameArr = [];
    let promotion = loadPromotions()[0].barcodes;
    let temp = arr[0].name;
    nameArr.push(temp);
    arr.forEach(function(item, index, array){
        if (temp != item.name)
        {
            temp = item.name;
            nameArr.push(temp);
        }
    });
    for (let i = 0; i < nameArr.length; i++)
    {
        let filterName = arr.filter(function(item, index, array) {
            return (item.name === nameArr[i]);//将此优惠商品放入filterName数组中，若该商品出现了多次，元素个数为此优惠商品的个数
        });
        result.push({
            barcode: filterName[0].barcode,
            name: filterName[0].name,
            count: filterName.length,//此优惠商品的个数
            unit: filterName[0].unit,
            price: filterName[0].price,
            subtotal: filterName[0].price * filterName.length//应该减去的价格
        });
    }
// 处理优惠的商品
    result.forEach(function(item, index, array) {
        for (let i = 0; i < promotion.length; i++) {
            if (item.barcode === promotion[i]) {
                item.subtotal -= item.price;
            }
        }
    });
    return result;
}

//列出优惠商品形成对象数组
function promotionGoodList(arr) {
    let result = [];
    let promotion = loadPromotions()[0].barcodes;
    for (let i = 0; i < promotion.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if ((promotion[i] === arr[j].barcode) && (arr[j].count >= 2)) {
                result.push({//当商品属于促销商品且数量大于等于2时，得到赠送的此商品一件
                    name: arr[j].name,
                    count: 1,
                    unit: arr[j].unit,
                    price: arr[j].price
                });
            }
        }
    }
    return result;
}


//列出总计，节省形成对象数组
function calculateAmount(arr) {
    let result = [];
    let save = [];
    let promotionTotalArr = [];
    
    arr.forEach(function(item, index, array){
        save.push(item.subtotal);
    });

    //求促销商品数组中节省的总金额
    let total = save.reduce(function(prev, cur, index, array){
        return prev + cur;
    });
    //促销商品的单项价格存入promotionTotalArr数组中
    promotionGoodList(arr).forEach(function(item, index, array){
        promotionTotalArr.push(item.price);
    });
    //求促销商品数组中节省的总金额
    let promotionTotal = promotionTotalArr.reduce(function(prev, cur, index, array) {
        return prev + cur;
    });
    result.push({
        total: total,
        promotionTotal: promotionTotal
    });
    return result;
}

//强制保留两位小数,输出类型为字符串
function toDecimal2(num) {
    let floatNum = parseFloat(num);
    /*if (isNaN(floatNum)) {
        return false;
    }*/
    floatNum = Math.round(num * 100) / 100;//
    let str = floatNum.toString();
    let resultStr = str.indexOf('.');
    if (resultStr < 0)
    {
        resultStr = str.length;
        str += '.';
    }
    while (str.length <= resultStr + 2)
    {
        str += '0';
    }
    return str;
}

// 对象变成变成标准字符串的方法
function objToStr(obj) {
    let str = JSON.stringify(obj);
    str = str.substring(1, str.length - 1);
    str = str.replace(/\"/g, "");
    str = str.replace(/\:/g,"：");
    str = str.replace(/\,/g,"，")
    return str + "\n";
}

// 输出购物清单字符串
function classifyGoodsStr(arr) {
    let outputArr = outputGoodsList(arr);
    let classifyArr = classifyGoodsList(outputArr);
    let classifyStr = [];
    classifyArr.forEach(function(item, indx, array) {
        classifyStr.push({
            名称: item.name,
            数量: item.count + item.unit,
            单价: toDecimal2(item.price) + "(元)",
            小计: toDecimal2(item.subtotal) + "(元)"
        });
    });
    let classifyStrResult = classifyStr.map(function(item, index, array) {
        return objToStr(item);
    });
    return classifyStrResult.join("");
}

//输出赠送商品字符串
function promotionGoodsStr(arr) {
    let outputArr = outputGoodsList(arr);
    let classifyArr = classifyGoodsList(outputArr);
    let promotionArr = promotionGoodList(classifyArr);
    let promotionStr = [];
    promotionArr.forEach(function(item, index, array) {
        promotionStr.push({
            名称: item.name,
            数量: item.count + item.unit,
        })
    });
    let promotionStrResult = promotionStr.map(function(item, index, array) {
        return objToStr(item);
    });
    return promotionStrResult.join("");
}

// 输出统计字符串
function calculateAmountStr(arr) {
    let outputArr = outputGoodsList(arr);
    let classifyArr = classifyGoodsList(outputArr);
    let promotionArr = promotionGoodList(classifyArr);
    let calculateArr = calculateAmount(classifyArr);
    let calculateStr = [];
    calculateArr.forEach(function(item, index, array) {
        calculateStr.push({
            总计: toDecimal2(item.total) + "(元)"
        });
        calculateStr.push({
            节省: toDecimal2(item.promotionTotal) + "(元)"
        })
    });
    let calculateStrResult = calculateStr.map(function(item, index, array) {
        return objToStr(item);
    });
    return calculateStrResult.join("");

}


// 总输出
module.exports = function printInventory(arr) {
    let str = 
        '***<没钱赚商店>购物清单***\n' +
            classifyGoodsStr(arr) +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            promotionGoodsStr(arr) +
            '----------------------\n' +
            calculateAmountStr(arr) +
            '**********************';
    console.log(str);
    return str;
}
