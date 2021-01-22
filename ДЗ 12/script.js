function isArgumentValid(num) {
  return !isNaN(num)
}
function createCalculator(num) {
  return {
    sum: (arg) => (isArgumentValid(arg) ? (num += arg) :null),
    mult: (arg) => (isArgumentValid(arg) ? (num *= arg) : null),
    sub: (arg) => (isArgumentValid(arg) ? (num -= arg) : null),
    div: (arg) => (isArgumentValid(arg) ? (num /= arg) : null),

    set: (arg) => (isArgumentValid(arg) ? (num = arg) : null),
  };
}

const calc = createCalculator(10);

calc.sum(5); /// 15
calc.mult(10); // 150
calc.sub(40); // 110
calc.div(10); // 11
calc.set(100); //
calc.base();