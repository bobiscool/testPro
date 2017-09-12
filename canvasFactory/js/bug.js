function A(a,b){
   this.a = a;
   this.b = b;
}


A.prototype = {
    get(){
        return this.a;
    },
    put(){
        console.log(this.a+this.b);
    }
}


var b = new A(2,5);

b.put();