/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-19 12:47:19 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-20 15:32:28
 * calc.js
 * 用于计算的js库
 * 
 * based on Shunting-yard_algorithm
 * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 */

var expExample = ['3', '+', '2', '-', '5', '/', '5', '+', 'sin(' , '50' , ')']

var b = "3+2-5/5"
var c = "1-(9-7)/2"
var k = b.split('');
console.log('k', k);



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
    console.log('calcStack', _tem.calcStack);

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
                let _l = this.calcStack.length;
                _temArray = this.calcStack.splice(_l - _getMu[item]);
                // _temArray.unshift(this.calcStack.pop());//拿到数字堆栈 最后两数
                // _temArray.unshift(this.calcStack.pop());//拿到数字堆栈 最后两数
                console.log('----', this.calcStack);
                console.log('----', this.calcStack);
                var _temNum = _Math[item](_temArray);
                console.log('-------------', this.calcStack);


                this.calcStack.push(_temNum);
            }




        }, this);
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

                    // this._monocary(item);//

                    if (item == "sin(") {
                        // this.numberStack.push('sin');//先放入
                        console.log('sin',this.numberStack)
                        this.symbolStack.push('sin');
                        this.bracketNum.push(this.symbolStack.length - 1);//记录下位置
                        return false;
                    }


                    if (item == ")" && this.bracketNum.length > 0) {
                        // console.log(this.bracketNum);
                        let _tem = this.bracketNum.pop();
                        // console.log('_TEM',_tem);
                        console.log('这个时候1', this.symbolStack);

                        let _tem2 = this.symbolStack.splice(_tem);
                        console.log('_tem2', _tem2);
                        if(_tem2[0]=='('){
                        _tem2.shift();
                        }
                        //    this.symbolStack.pop();//拿掉 (
                        console.log('这个时候', this.symbolStack);
                        this.numberStack = this.numberStack.concat(_tem2);
                        console.log("找到右边括号后", this.numberStack);
                        console.log("找到右边括号后", this.symbolStack);
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

                    // console.log('symbolStack', this.symbolStack);
                    if (item == "(") {
                        this.bracketNum.push(this.symbolStack.length - 1);
                    }
                }

            }
        }, this);


        this.numberStack = this.numberStack.concat(this.symbolStack.reverse());
    },
    _monocary(item) {
        /**
         * 所有的单目运算 都在等待一个 ) 也就是 一旦有单目符号 便要压入栈中 
           然后 brackNum 计数
           在遇到 括) 之后 弹出 并且将 所有与之相关的符号都弹出 而这个 也放在 所有符号的后面
           然后单目运算它
       
           单目运算符 优先级非常高
         */

        if (item == "sin(") {
            // this.numberStack.push('sin');//先放入
            this.symbolStack.push('sin');
            this.bracketNum.push(this.symbolStack.length - 1);//记录下位置
        }

    }
}


var _getMu = {// 参与运算的运算因子 数目
    "+": 2,
    "-": 2,
    "*": 2,
    "/": 2,
    "sin": 1,
    "cos": 1,
}



var _Math = { // 具体的算术运算符
    "+": function (a) {
        return Number(a[0]) + Number(a[1]);
    },
    "-": function (a) {
        return Number(a[0]) - Number(a[1]);
    },
    "*": function (a) {
        return Number(a[0]) * Number(a[1]);
    },
    "/": function (a) {
        return Number(a[0]) / Number(a[1]);
    },
    "sin": function (a) {
        console.log("计算sin",a)
        return Math.sin(Number(a[0]));
    }
}

var _Phase = function () {
    /**
     * 解析算式用的函数
     */
}











Calc(expExample);