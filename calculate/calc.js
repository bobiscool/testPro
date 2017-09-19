/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-19 12:47:19 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-20 00:00:53
 * calc.js
 * 用于计算的js库
 */

var expExample = ['1', '+', '2', '+', "sin(", '3', ')']

var b = "1+2+(4-5)/6+12*23+(9-8)/2"
var k = b.split('');
// console.log(k);



var expRank = {
    ")": 0,
    "/": 1,
    "*": 1,
    "+": 2,
    "-": 2
}


function Calc(exp) {
    var _tem = new _Calc(exp);

    _tem._genSubfix();
    console.log('numberStack', _tem.numberStack);

    _tem._calculate();
    console.log('numberStack', _tem.calcStack);
}



function _Calc(exp) {
    // Calc 随身携带的包
    this.exp = exp;
    // 由于有 sin cos 这些特殊的函数 我建议 传入的exp 最好不要是字符串 就是一个数组
    //    this.expList = exp.split('');
    this.symbolStack = [];
    //左右两边的栈
    this.numberStack = [];
    this.bracketNum = [];

    // 计算用的栈
    this.calcStack = [];
}


_Calc.prototype = {
    _init: function (exp) {
        //初始化解析

    },
    _calculate: function () {
        console.log(this.numberStack);
        this.numberStack.forEach(function (item) {

            if (!isNaN(Number(item))) {
                this.calcStack.push(item);
            } else {
                //是符号的时候
                let _temArray = [];
              _temArray.unshift(this.calcStack.pop());//拿到数字堆栈 最后两数
              _temArray.unshift(this.calcStack.pop());//拿到数字堆栈 最后两数
                  console.log('----',this.calcStack);
                  console.log('----',this.calcStack);
                var _temNum = _Math[item](_temArray[0],_temArray[1]);
                  console.log('-------------',this.calcStack);
                

                this.calcStack.push(_temNum);
            }




        },this);
    },
    _genSubfix: function () {
        this.exp.forEach(function (item) {

            // console.log('item', item);
            // console.log('numberStack', this.numberStack);
            if (!isNaN(Number(item))) {
                this.numberStack.push(item);
                /**
                 * 0 1
                 * 3 2
                 */
            } else {
                if (this.symbolStack.length > 0) {
                    // 我就必须做判断

                    let oldSymbol = this.symbolStack[this.symbolStack.length - 1];//拿到老的
                    // console.log('oldSym', oldSymbol);
                    console.log('bracketNum', this.bracketNum.length);
                    //外加一个限制 如果是 ( 那那就需要等)
                    if (item == ")" && this.bracketNum.length > 0) {
                        // console.log(this.bracketNum);
                        let _tem = this.bracketNum.pop();
                        // console.log('_TEM',_tem);
                        let _tem2 = this.symbolStack.splice(_tem);
                        // console.log('_tem2',_tem2);
                        _tem2.unshift();//拿掉 (
                        this.numberStack = this.numberStack.concat(_tem2);
                        return false;
                    }


                    if (item == "(") {
                        this.symbolStack.push(item);
                        this.bracketNum.push(this.symbolStack.length - 1);

                        return false;
                    }

                    // 如果当前遇到的符号 优先级 大于 前面的 那就直接 压入栈

                    if (oldSymbol !== "(") {
                        if (expRank[item] < expRank[oldSymbol]) {
                            // console.log('弹入符号');
                            this.symbolStack.push(item);
                        } else {
                            // 如果当前遇到的符号 优先级 小于 等于 前面的 那就直接 弹出栈
                            console.log('弹出');
                            console.log('原', this.symbolStack)
                            this.numberStack.push(this.symbolStack.pop());
                            this.symbolStack.push(item);
                            console.log('后', this.symbolStack)

                        }
                    } else {
                        this.symbolStack.push(item);
                        // console.log('((((((', this.symbolStack)                                               
                    }

                } else {

                    this.symbolStack.push(item);
                    /**
                     * 1 +
                     * 4 +
                     */

                    // console.log('symbolStack', this.symbolStack);
                    if (item == "(") {
                        this.bracketNum.push(this.symbolStack.length - 1);
                    }
                }

            }
        }, this);
    }
}


var _Math = {
    "+":function(a, b) {
        return Number(a) + Number(b);
    },
    "-":function(a, b) {
       return Number(a) - Number(b);
    },
    "*":function(a, b) {
        return Number(a) * Number(b);
    },
    "/":function(a, b) {
        return Number(a) / Number(b);
    }
}



Calc(k);