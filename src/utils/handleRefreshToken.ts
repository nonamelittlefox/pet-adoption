export function isCheckTokenExp(exp: number) {
  const DATE = new Date();

  const TIME_NOW = DATE.getTime();
  const TIME_EXP = exp * 1000;

  const TIME_SUBTRACT = subtractTime(TIME_EXP, 180);

  return TIME_NOW > TIME_SUBTRACT;
}

function subtractTime(time: number, second: number) {
  if (time > 0 && second >= 0) {
    return time - 1000 * second;
  }

  return time;
}
