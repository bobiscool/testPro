/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-19 12:47:19 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-19 17:03:01
 * calc.js
 * 用于计算的js库
 */

var expExample = ['1', '+', '2', '+', "sin(", '3', ')']

var b = "1+2+(4-5)/6"
var k = b.split('');
console.log(k);

var expRank = {
    ")": 0,
    "/": 1,
    "*": 1,
    "+": 2,
    "-": 2,
    "(":3
}


function Calc(exp) {
    var _tem = new _Calc(exp);

    _tem._genSubfix();

    console.log(_tem.numberStack);
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
        this.numberStack.forEach(function (item) {

            if (!isNaN(Number(item))) {
                this.calcStack.push(item);
            } else {
                //是符号的时候

            }




        });
    },
    _genSubfix: function () {
        this.exp.forEach(function (item) {

            if (!isNaN(Number(item))) {
                this.numberStack.push(item);
            } else {
                if (this.symbolStack.length > 0) {
                    let oldSymbol = this.symbolStack[this.symbolStack.length - 1];

                    //外加一个限制 如果是 ( 那那就需要等)
                    if (item == ")"&&this.bracketNum.length>0) {
                       let _tem = this.bracketNum.pop();
                       console.log(_tem);
                        this.numberStack.concat(this.symbolStack.splice(_tem));
                        
                        return false;
                    }

                    // 如果当前遇到的符号 优先级 大于 前面的 那就直接 压入栈

                    if (expRank[item] > expRank[oldSymbol]) {
                        this.symbolStack.push(item);
                    } else {
                        // 如果当前遇到的符号 优先级 小于 等于 前面的 那就直接 弹出栈
                        this.numberStack.push(this.symbolStack.pop())
                    }
                } else {

                    this.symbolStack.push(item);
                    console.log(this.symbolStack);
                    if (item == "(") {
                      this.bracketNum.push(this.symbolStack.length-1);
                    }
                }

            }
        }, this);
    }
}


Calc(k);