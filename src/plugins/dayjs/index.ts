import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
export default function setupDayjs() {
  dayjs.extend(isLeapYear as any) // 使用插件
  dayjs.locale('zh-cn') // 使用本地化语言
}
