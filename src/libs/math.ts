// Fix Results Function to have a Number with only 4 decimals
function FixResult(result: number) {
  return Number.parseFloat(result.toFixed(4));
}
// Get Optimal Production Lot Size Function
export function GetOptimalProductionLotSizeQ(
  model: string,
  a: number,
  k: number,
  h: number,
  r: number,
  u: number
) {
  const FIRST_PART = (2 * a * k) / h;
  let result = FIRST_PART;
  // If it is the EPQ Model, add Constant Production Ratio to the result formula
  if (model.startsWith("epq")) {
    const SECOND_PART = 1 / (1 - a / r);
    result = result * SECOND_PART;
  }
  // If it is a Deficit Model, add deficit cost to the result formula
  if (model.endsWith("w-d")) {
    const THIRD_PART = (h + u) / u;
    result = result * THIRD_PART;
  }
  return FixResult(Math.sqrt(result));
}
// Get Time Between Two Production Runs function
export function GetTimeBetweenTwoProductionRunsT(Q: number, a: number) {
  const RESULT = Q / a;
  return FixResult(RESULT);
}
// Get Frequency Between Two Production Runs
export function GetFrequencyBetweenTwoProductionRunsf(T: number) {
  const RESULT = 1 / T;
  return FixResult(RESULT);
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
  return FixResult(Math.sqrt(RESULT));
}
// Get Second Time Interval
export function GetSecondTimeIntervalt2(
  model: string,
  u: number,
  k: number,
  a: number,
  r: number,
  h: number
) {
  let firstPart = 2 * k;
  const SECOND_PART = 1 - a / r;
  let thirdPart = a * h;
  // If the model is EPQ with Deficit, add deficit to formula
  if (model === "epq-w-d") {
    firstPart = firstPart * u;
    thirdPart = thirdPart * (h + u);
  }
  const RESULT = (firstPart * SECOND_PART) / thirdPart;
  return FixResult(Math.sqrt(RESULT));
}
// Get Max Inventory Level
export function GetMaxInventoryLevelS(a: number, t2: number) {
  const RESULT = a * t2;
  return Number.parseFloat(RESULT.toFixed(4));
}
// Get First Time Interval
export function GetFirstTimeIntervalt1(S: number, r: number, a: number) {
  const RESULT = S / (r - a);
  return Number.parseFloat(RESULT.toFixed(4));
}
// Get Third Time Interval
export function GetThirdTimeIntervalt3(
  h: number,
  k: number,
  a: number,
  r: number,
  u: number
) {
  const FIRST_PART = 2 * h * k;
  const SECOND_PART = 1 - a / r;
  const THIRD_PART = a * u;
  const FOURTH_PART = h + u;
  const RESULT = (FIRST_PART * SECOND_PART) / (THIRD_PART * FOURTH_PART);
  return Number.parseFloat(Math.sqrt(RESULT).toFixed(4));
}
// Get Fourth Time Interval
export function GetFourthTimeIntervalt4(d: number, r: number, a: number) {
  const RESULT = d / (r - a);
  return Number.parseFloat(RESULT.toFixed(4));
}
// Get Total Inventary Maintenance Costs
export function GetTotalInventoryMaintenanceCost(
  h: number,
  S: number,
  t1: number,
  t2: number
) {
  const FIRST_PART = h * S;
  const SECOND_PART = t1 + t2;
  const RESULT = (FIRST_PART * SECOND_PART) / 2;
  return FixResult(RESULT);
}
// Get Total Deficit Cost
export function GetTotalDeficitCost(
  u: number,
  d: number,
  t3: number,
  t4: number
) {
  const FIRST_PART = u * d;
  const SECOND_PART = t3 + t4;
  const RESULT = (FIRST_PART * SECOND_PART) / 2;
  return FixResult(RESULT);
}
// Get Total Production Cost
export function GetTotalProductionCost(k: number, f: number) {
  const RESULT = k * f;
  return FixResult(RESULT);
}
// Get Total Unit Cost
export function GetTotalUnitCost(a: number, c: number) {
  const RESULT = a * c;
  return FixResult(RESULT);
}
