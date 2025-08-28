import type { Elips } from "../data/types";

export const createElipses = (height: number): Elips[] => {
  const elCount = Math.floor(height / 200);

  const topR = 100;
  const topL = Math.max(height * 0.1, 650);
  const topM = height * 0.2;
  const topIncrement = 0.2 * height;
  const topMIncrement = 0.3 * height;

  const elipses = Array.from({ length: elCount }, (_, index) => {
    const n = index % 3;
    const k = Math.floor(index / 3);

    if (n === 0) {
      return {
        top: topR + topIncrement * k + "px",
        left: "80%",
      };
    }
    if (n === 1) {
      return {
        top: topL + topIncrement * k + "px",
        left: "1%",
      };
    } else {
      return {
        top: topM + topMIncrement * k + "px",
        left: "18%",
      };
    }
  });

  return elipses;
};
