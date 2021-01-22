function Calculator(base) {
  this.base = base;

  this.add = function (val) {
    return (this.base += val);
  };

  this.mult = function (val) {
    return (this.base *= val);
  };

  this.sub = function (val) {
    return (this.base -= val);
  };

  this.div = function (val) {
    return (this.base /= val);
  };

  this.set = function (val) {
    this.base = val;
  };

  this.get = function () {
    return this.base;
  };
}

const calc = new Calculator(10);

calc.add(5); /// 15
calc.mult(10); // 150
calc.sub(40); // 110
calc.div(10); // 11
calc.set(100); //

calc.base;


alert(calc.add(5));
alert(calc.mult(10));
alert(calc.sub(40));
alert(calc.div(10));