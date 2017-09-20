/*
 * @Author: Thunderball.Wu 
 * @Date: 2017-09-19 12:47:19 
 * @Last Modified by: Thunderball.Wu
 * @Last Modified time: 2017-09-21 00:01:43
 * calc.js
 * 用于计算的js库
 * 
 * based on Shunting-yard_algorithm
 * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 */

var expExample = ['3', '+', '2', '-', '5', '/', '5', '+', 'sin(', '50', "-", "5", ')']
var expExample = ['3', '^', '2', '-', '5', '/', '5', '+', 'sin(', '50', "-", "5", ')']
var expExample2 = ["1", "+", 'sin(', '50', "-", "5", "+", "60", "/", "(", '2', '-', '5', ")", ')']
var expExample3 = ["tan(", "1", ")", "+", 'sin(', '50', "-", "cos(", "5", ")", "+", "60", "/", "(", '2', '-', '5', ")", ')']

console.log(expExample3.join(''));

var b = "3+2-5/5"
var c = "1-(9-7)/2"
var k = b.split('');
console.log('k', k);



var expRank = {
    "^": 7,
    "/": 6,
    "*": 6,
    "+": 5,
    "-": 5,
}

var whetherHas = {
    "^": 1,
    ")": 1,
    "/": 1,
    "*": 1,
    "+": 1,
    "-": 1,
    "a": 2,
    "s": 2,
    "c": 2,
    "t": 2,
    "m": 2,
}


function Calc(exp) {
    var _tem = new _Calc(exp);

    _tem._genSubfix();
    console.log('numberStack', _tem.numberStack);

    _tem._calculate();
    return _tem.calcStack[0];
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
                console.log(item);
                var _temNum = _Math[item](_temArray);
                console.log('-------------', this.calcStack);


                this.calcStack.push(_temNum);
            }




        }, this);
    },
    _genSubfix: function () {
        this.exp.forEach(function (item) {

            console.log('item', item);
            console.log('isNAN', !isNaN(Number(item)));
            // console.log('numberStack', this.numberStack);
            if (!isNaN(Number(item))) {
                // 如果是 数字先塞进去
                this.numberStack.push(item);
                /**
                 * 0 1
                 * 3 2
                 */
            } else {
                // 如果有 symbolStack
                if (this.symbolStack.length > 0) {

                    let oldSymbol = this.symbolStack[this.symbolStack.length - 1];//拿到老的
                    //外加一个限制 如果是 ( 那那就需要等)

                    // this._monocary(item);//

                    if (_Short[item]) { //所有的有括号的特殊运算
                        console.log('_Short', _Short[item])
                        this.symbolStack.push(_Short[item]);
                        this.bracketNum.push(this.symbolStack.length - 1);//记录下位置
                        return false;
                    }


                    if (item == ")" && this.bracketNum.length > 0) {
                        // console.log(this.bracketNum);
                        let _tem = this.bracketNum.pop();
                        // 拿到最近 的那个 括号
                        console.log('这个时候1', this.symbolStack);

                        let _tem2 = this.symbolStack.splice(_tem);
                        console.log('_tem2', _tem2);
                        if (_tem2[0] == '(') {
                            _tem2.shift();
                        }
                        //    this.symbolStack.pop();//拿掉 (
                        console.log('这个时候', this.symbolStack);
                        this.numberStack = this.numberStack.concat(_tem2.reverse());
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

                    if (oldSymbol !== "(" && oldSymbol !== "sin") {
                        if (expRank[item] > expRank[oldSymbol]) {
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





                    // 如果没有symbol
                } else {

                    if (_Short[item]) { //所有的有括号的特殊运算
                        console.log('_Short', _Short[item])
                        this.symbolStack.push(_Short[item]);
                        this.bracketNum.push(this.symbolStack.length - 1);//记录下位置
                        return false;
                    }

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
    "^": 2,
    "+": 2,
    "-": 2,
    "*": 2,
    "/": 2,
    "sin": 1,
    "cos": 1,
    "sin": 1,
    "max": 2,
    "cos": 1,
    "tan": 1,
    "arcsin": 1,
    "arccos": 1,
    "arctan": 1,
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
    "^": function (a) {
        return Math.pow(Number(a[0]), Number(a[1]));
    },
    "sin": function (a) {
        return Math.sin(Number(a[0]));
    },
    "cos": function (a) {
        return Math.cos(Number(a[0]));
    },
    "tan": function (a) {
        return Math.tan(Number(a[0]));
    }
}

var _Phase = function (expr) {
    /**
     * 解析算式用的函数
     */
    this.expr = expr;
    this._index = 0;
    this._c = "";
    this._comment = "";
    this.expA = [];
    this._sym2 = false;
}

_Phase.prototype = {
    _parse: function () {
        this._c = this.expr[0];
        if (!isNaN(Number(this._c))) {
            //是一个数字 那就继续看看还是不是数组
            this._comment = this._c;

            this._genComp();
        }

    },
    _next: function () {
        this._index++;
        this._c = this.expr[this._index];
    },
    _genComp: function () {
        this._next();
        if (!isNaN(Number(this._c))) {
            console.log('数字', this._c)
            if (this._sym2) {
                //如果是 true 说明 前面存在一个符号
                this.expA.push(this._comment);
                this._comment = "";
                this._sym2 = false;
            }

            this._comment = this._comment + this._c;
            this._genComp();
        } else {
            // 如果是 符号 
            if (whetherHas[this._c] == 1 && !this._sym2) {
                // 如果是 第一种 符号  并且不是在第二种搜集模式里面
                if(this._comment){
                this.expA.push(this._comment);//右括号 与其他双目符号相遇
                }                
                this.expA.push(this._c);
                this._comment = "";
            }


            if (whetherHas[this._c] == 2 && !this._sym2) {
                //如果是第二种符号 那就得 开启 第二种符号 收集模式
                this._sym2 = true;// 开启搜集模式
            }

            if (this._sym2) {
                console.log('符号模式', this._c);
                this._comment = this._comment + this._c;
            }






            if (this._index < (this.expr.length - 1)) {
                this._genComp();
            } else {
                console.log('终止')

                if(this._comment){
                this.expA.push(this._comment);
                }
                return false;
            }
        }
    }
}


var _Short = {
    "sin(": "sin",
    "max(": "max",
    "cos(": "cos",
    "tan(": "tan",
    "arcsin(": "arcsin",
    "arccos(": "arccos",
    "arctan(": "arctan",
}









var T = new _Phase('13+sin(2)-cos(5/5/5^6)');
T._parse();
console.log(T.expA);


// console.log(Calc(expExample3));