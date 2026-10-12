// Cho phép res.json() trả BigInt (số tiền VND) dưới dạng number.
declare global {
  interface BigInt {
    toJSON(): number;
  }
}

(BigInt.prototype as unknown as { toJSON: () => number }).toJSON = function (this: bigint) {
  return Number(this);
};

export {};
