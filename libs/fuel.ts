import { FlexMessage } from "bot-sdk";
import { createFuelMessage, createHelpMessage, createErrorMessage } from "./message.ts";

/**
 * 燃費計算
 * @param text テキスト
 * @return Flexメッセージ
 */
export function calcFuel(text: string): FlexMessage {
  const lines = text.split("\n");

  // 行数が足りない
  if (lines.length <= 1) {
    return createHelpMessage
  }

  // 走行距離・給油量
  const mileage = parseFloat(lines[0]);
  const refillQuantity = parseFloat(lines[1]);

  // 数値ではない
  if (isNaN(mileage) || isNaN(refillQuantity)) {
    return createErrorMessage("数値エラー", "半角数字を入力してください");
  }

  // 数値が1以下
  if (mileage <= 0 || refillQuantity <= 0) {
    return createErrorMessage("計算エラー", "1以上の数値を入力してください");
  }

  return createFuelMessage(mileage, refillQuantity);
}
