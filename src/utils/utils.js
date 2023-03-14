export function randInt(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

export function randEle(arr) {
  const index = randInt(0, arr.length - 1);
  return arr[index];
}