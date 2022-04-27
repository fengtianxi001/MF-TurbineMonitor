import { pinyin } from "pinyin-pro";

export function createSequence(sequence: number) {
  return sequence <= 9 ? `0${sequence}` : `${sequence}`;
}

export function createPinyin(str: string) {
  return pinyin(str, { toneType: "none" }) ?? "";
}

export function bigCamelCase(str: string, separator: string = "") {
  const cache = str.toLocaleLowerCase().split(separator) as string[];
  return cache.reduce((prev, cur) => {
    return prev + capitalize(cur);
  }, "");
}

export function capitalize(str: string = "") {
  const callback = (prev: unknown, cur: any, index: any) =>
    prev + (index === 0 ? cur.toUpperCase() : cur);
  return Array.prototype.reduce.call(str, callback, "");
}

export function createEnTitleByCn(cn: string = "") {
  const en = createPinyin(cn);
  return bigCamelCase(en, " ");
}
