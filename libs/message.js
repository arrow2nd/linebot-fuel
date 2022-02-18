import moment from 'moment-timezone'

/**
 * 燃費の計算結果メッセージ
 * @param {Number} mileage 走行距離
 * @param {Number} refillQuantity 給油量
 * @returns flexMessage
 */
export function fuelMessage(mileage, refillQuantity) {
  const date = moment().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm')

  // 満タン法で計算した燃費
  const fuelConsumption = Math.round((mileage / refillQuantity) * 100) / 100

  return {
    type: 'flex',
    altText: `燃費は ${fuelConsumption}km/L です`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            weight: 'bold',
            size: 'sm',
            text: '燃費計算',
            color: '#878787'
          },
          {
            type: 'text',
            text: 'Results',
            weight: 'bold',
            size: 'xxl',
            margin: 'md'
          },
          {
            type: 'text',
            text: '満タン法による計算結果',
            size: 'xs',
            color: '#aaaaaa',
            wrap: true
          },
          {
            type: 'separator',
            margin: 'lg'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'xs',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    size: 'sm',
                    color: '#555555',
                    text: '走行距離'
                  },
                  {
                    type: 'text',
                    text: `${mileage}km`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end'
                  }
                ]
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '給油量',
                    size: 'sm',
                    color: '#555555'
                  },
                  {
                    type: 'text',
                    text: `${refillQuantity}L`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end'
                  }
                ]
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '燃費',
                    size: 'md',
                    weight: 'bold',
                    color: '#ff5452'
                  },
                  {
                    type: 'text',
                    text: `${fuelConsumption}km/L`,
                    wrap: true,
                    align: 'end',
                    size: 'md',
                    weight: 'bold',
                    color: '#ff5452'
                  }
                ],
                spacing: 'none',
                margin: 'lg'
              },
              {
                type: 'separator',
                margin: 'lg'
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: date,
                    size: 'xs',
                    color: '#aaaaaa',
                    align: 'end'
                  }
                ],
                margin: 'md'
              }
            ]
          }
        ]
      },
      styles: {
        footer: {
          separator: false
        }
      }
    }
  }
}

/**
 * ヘルプメッセージ
 * @return {Object} flexMessage
 */
export function helpMessage() {
  return {
    type: 'flex',
    altText: 'ヘルプ',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            weight: 'bold',
            size: 'sm',
            text: '燃費計算',
            color: '#878787'
          },
          {
            type: 'text',
            text: 'Help',
            weight: 'bold',
            size: 'xxl',
            margin: 'md'
          },
          {
            type: 'text',
            text: '使い方',
            size: 'xs',
            color: '#aaaaaa',
            wrap: true
          },
          {
            type: 'separator',
            margin: 'lg'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                text: '1行目に 走行距離(km)',
                wrap: true
              },
              {
                type: 'text',
                text: '2行目に 給油量(L)'
              },
              {
                type: 'text',
                text: '※数値のみを入力してください',
                margin: 'md',
                size: 'sm',
                color: '#878787'
              }
            ]
          }
        ]
      },
      styles: {
        footer: {
          separator: true
        }
      }
    }
  }
}

/**
 * エラーメッセージ
 * @param  {String} sub  サブタイトル
 * @param  {String} text エラーメッセージ
 * @return {Object} flexMessage
 */
export function errorMessage(sub, text) {
  return {
    type: 'flex',
    altText: 'エラー',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            weight: 'bold',
            size: 'sm',
            text: '燃費計算',
            color: '#878787'
          },
          {
            type: 'text',
            text: 'Error',
            weight: 'bold',
            size: 'xxl',
            margin: 'md'
          },
          {
            type: 'text',
            text: sub,
            size: 'xs',
            color: '#aaaaaa',
            wrap: true
          },
          {
            type: 'separator',
            margin: 'lg'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'xs',
            contents: [
              {
                type: 'text',
                wrap: true,
                text: text
              }
            ]
          }
        ]
      },
      styles: {
        footer: {
          separator: true
        }
      }
    }
  }
}
