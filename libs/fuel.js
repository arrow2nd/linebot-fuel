import { fuelMessage, helpMessage, errorMessage } from './message.js'

/**
 * 燃費計算
 * @param  {String} text テキスト
 * @return {Object} flexMessage
 */
export function calcFuel(text) {
  const lines = text.split('\n')

  // 行数が足りない
  if (lines.length <= 1) {
    return helpMessage()
  }

  // 走行距離・給油量
  const mileage = parseFloat(lines[0])
  const refillQuantity = parseFloat(lines[1])

  // 数値ではない
  if (isNaN(mileage) || isNaN(refillQuantity)) {
    return errorMessage('数値エラー', '半角数字を入力してください')
  }

  // 数値が1以下
  if (mileage <= 0 || refillQuantity <= 0) {
    return errorMessage('計算エラー', '1以上の数値を入力してください')
  }

  return fuelMessage(mileage, refillQuantity)
}
