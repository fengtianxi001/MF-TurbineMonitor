import { pinyin } from 'pinyin-pro'
import lodash from 'lodash-es'

/**
 * @description:序号转换函数
 * @param {number} sequence 序号
 * @param {number} place 序号位数
 * @return {string}
 */
export function convertSequence(sequence: number, place: number = 2) {
  const flag = Math.pow(10, place - 1)
  const seamTimes = (flag / place).toFixed(0).length
  const seam = new Array(seamTimes).fill(0).reduce((prev) => (prev += '0'), '')
  return seam + sequence
}

/**
 * @description: 中文转拼音
 * @param {string} cn 字符
 * @param {*} format 转化格式
 * @return {*}
 */
export function convertCnToEn(cn: string, format: 'camelCase' | 'kebabCase' | 'startCase' | 'snakeCase' = 'camelCase') {
  const cache = pinyin(cn, { toneType: 'none' })
  const formatter = lodash[format]
  if (!lodash.isFunction(formatter)) return cache
  return formatter(cache ?? '')
}

/**
 * @description: 创建一个用于便利的数组
 * @return {*}
 */
export function createTraversedArray(times: number): Array<undefined> {
  return new Array(times).fill(void 0)
}
