// Fix Results Function to have a Number with only 4 decimals
function FixResult(result: number) {
  return Number.parseFloat(Math.sqrt(result).toFixed(4));
}
// Get Optimal Production Lot Size Function
export function GetOptimalProductionLotSizeQ(
  a: number,
  k: number,
  h: number,
  r: number,
  u: number
) {
  const FIRST_PART = (2 * a * k) / h;
  const SECOND_PART = 1 / (1 - a / r);
  const THIRD_PART = (h + u) / u;
  const RESULT = FIRST_PART * SECOND_PART * THIRD_PART;
  return FixResult(RESULT)
}
// Get Time Between Two Production Runs function
export function GetTimeBetweenTwoProductionRunsT(Q: number, a: number) {
  const RESULT = (Q / a) * 24;
  return FixResult(RESULT)
}
// Get Frequency Between Two Production Runs
export function GetFrequencyBetweenTwoProductionRunsf(T: number) {
  const RESULT = (1 / T) * 24;
  return FixResult(RESULT)
}
// Get Maximum Deficit
export function GetMaxDeficit(
  a: number,
  h: number,
  k: number,
  r: number,
  u: number
) {
  const FIRST_PART = 2 * a * h * k;
  const SECOND_PART = 1 - a / r;
  const THIRD_PART = u * (h + u);
  const RESULT = (FIRST_PART * SECOND_PART) / THIRD_PART;
  return FixResult(Math.sqrt(RESULT))
}
// Get Second Time Interval
export function GetSecondTimeIntervalt2(
  u: number,
  k: number,
  a: number,
  r: number,
  h: number,
  P: number
) {
  const FIRST_PART = 2 * u * k;
  const SECOND_PART = 1 - a / r;
  const THIRD_PART = a * h;
  const FOURTH_PART = h + u;
  const RESULT = ((FIRST_PART * SECOND_PART) / (THIRD_PART * FOURTH_PART)) * P;
  return Number.parseFloat(Math.sqrt(RESULT).toFixed(4));
}
// Get Max Inventory Level
export function GetMaxInventoryLevelS(a: number, t2: number) {
  const RESULT = a * t2;
  return Number.parseFloat(RESULT.toFixed(4));
}
// Get First Time Interval
export function GetFirstTimeIntervalt1(
  S: number,
  r: number,
  a: number,
  P: number
) {
  const RESULT = (S / (r - a)) * P;
  return Number.parseFloat(RESULT.toFixed(4));
}
// Get Third Time Interval
export function GetThirdTimeIntervalt3(
  h: number,
  k: number,
  a: number,
  r: number,
  u: number,
  P: number
) {
  const FIRST_PART = 2 * h * k;
  const SECOND_PART = 1 - a / r;
  const THIRD_PART = a * u;
  const FOURTH_PART = h + u;
  const RESULT = ((FIRST_PART * SECOND_PART) / (THIRD_PART * FOURTH_PART)) * P;
  return Number.parseFloat(Math.sqrt(RESULT).toFixed(4));
}
// Get Fourth Time Interval
export function GetFourthTimeIntervalt4(
  d: number,
  r: number,
  a: number,
  P: number
) {
  const RESULT = (d / (r - a)) * P;
  return Number.parseFloat(Math.sqrt(RESULT).toFixed(4));
}
