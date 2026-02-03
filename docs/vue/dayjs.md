# vue3整合dayjs

**“一个文件、可直接拷贝用、项目级通用”** 的版本，把**初始化 + 常见封装**全部放在一起，不拆、不绕。

## 安装

```
pnpm add dayjs
```



------

## ✅ `src/utils/dayjs.ts`（统一一个文件）

```ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-cn'

/* ======================
 * dayjs 全局初始化
 * ====================== */
dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(weekday)
dayjs.locale('zh-cn')

export default dayjs

/* ======================
 * 常用时间工具封装
 * ====================== */

/** xxx 时间之前 */
export const formatFromNow = (time: string | number | Date) => {
  if (!time) return ''
  const d = dayjs(time)
  return d.isValid() ? d.fromNow() : ''
}

/** 时间格式化 */
export const formatTime = (
  time: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!time) return ''
  const d = dayjs(time)
  return d.isValid() ? d.format(format) : ''
}

/** 智能时间（微博 / IM 风格） */
export const formatSmartTime = (time: string | number | Date) => {
  if (!time) return ''
  const d = dayjs(time)
  if (!d.isValid()) return ''

  if (d.isToday()) {
    return d.fromNow() // 今天：x 小时前
  }

  if (d.isYesterday()) {
    return `昨天 ${d.format('HH:mm')}`
  }

  if (d.year() === dayjs().year()) {
    return d.format('MM-DD HH:mm')
  }

  return d.format('YYYY-MM-DD HH:mm')
}

/** 是否在 N 天内 */
export const isWithinDays = (
  time: string | number | Date,
  days = 7
) => {
  if (!time) return false
  return dayjs().diff(dayjs(time), 'day') <= days
}

/** 剩余时间（倒计时文案） */
export const formatRemainTime = (endTime: string | number | Date) => {
  const diff = dayjs(endTime).diff(dayjs(), 'second')
  if (diff <= 0) return '已结束'

  const day = Math.floor(diff / 86400)
  const hour = Math.floor((diff % 86400) / 3600)
  const minute = Math.floor((diff % 3600) / 60)

  if (day > 0) return `${day} 天 ${hour} 小时`
  if (hour > 0) return `${hour} 小时 ${minute} 分钟`
  return `${minute} 分钟`
}

/** 是否已过期 */
export const isExpired = (time: string | number | Date) => {
  if (!time) return false
  return dayjs().isAfter(dayjs(time))
}
```

------

## ✅ 使用方式（统一入口）

```ts
import dayjs, {
  formatFromNow,
  formatTime,
  formatSmartTime,
  isExpired
} from '@/utils/dayjs'
<template>
  <div>{{ formatFromNow(item.createTime) }}</div>
  <div>{{ formatSmartTime(item.createTime) }}</div>
  <div v-if="isExpired(item.endTime)">已过期</div>
</template>
```

------

## 🧠 为什么这种写法是「项目级最佳实践」

- ✔ 插件只初始化一次
- ✔ 所有时间规则集中管理
- ✔ 以后改格式 / 改文案只动一个文件
- ✔ 不污染全局，但又足够统一

