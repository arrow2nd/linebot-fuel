'use strict';
const moment = require('moment-timezone');

/**
 * 燃費計算
 * 
 * @param  {String} text テキスト
 * @return {Object}      flexMessage
 */
function Calc(text) {
    const date = moment().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
    const lines = text.split('\n');

    // 行数が少ない
    if (lines.length <= 1) return HelpMsg();

    // 走行距離・給油量
    const mileage = parseFloat(lines[0]);
    const refillQuantity = parseFloat(lines[1]);

    // 数値かチェック
    if (isNaN(mileage) || isNaN(refillQuantity)) return errorMsg('数値エラー', '半角数字を入力してください');

    // 1以上かチェック
    if (mileage <= 0 || refillQuantity <= 0) return errorMsg('計算エラー', '1以上の数値を入力してください');

    // 燃費
    const fuelConsumption = Math.round(mileage / refillQuantity * 100) / 100;

    // flexMessage
    const object = {
        'type': 'flex',
        'altText': `燃費は ${fuelConsumption}km/L です`,
        'contents': {
            'type': 'bubble',
            'body': {
                'type': 'box',
                'layout': 'vertical',
                'contents': [
                    {
                        'type': 'text',
                        'weight': 'bold',
                        'size': 'sm',
                        'text': '燃費計算',
                        'color': '#878787'
                    },
                    {
                        'type': 'text',
                        'text': 'Results',
                        'weight': 'bold',
                        'size': 'xxl',
                        'margin': 'md'
                    },
                    {
                        'type': 'text',
                        'text': '満タン法による計算結果',
                        'size': 'xs',
                        'color': '#aaaaaa',
                        'wrap': true
                    },
                    {
                        'type': 'separator',
                        'margin': 'lg'
                    },
                    {
                        'type': 'box',
                        'layout': 'vertical',
                        'margin': 'lg',
                        'spacing': 'xs',
                        'contents': [
                            {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [
                                    {
                                        'type': 'text',
                                        'size': 'sm',
                                        'color': '#555555',
                                        'text': '走行距離'
                                    },
                                    {
                                        'type': 'text',
                                        'text': `${mileage}km`,
                                        'size': 'sm',
                                        'color': '#111111',
                                        'align': 'end'
                                    }
                                ]
                            },
                            {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [
                                    {
                                        'type': 'text',
                                        'text': '給油量',
                                        'size': 'sm',
                                        'color': '#555555'
                                    },
                                    {
                                        'type': 'text',
                                        'text': `${refillQuantity}L`,
                                        'size': 'sm',
                                        'color': '#111111',
                                        'align': 'end'
                                    }
                                ]
                            },
                            {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [
                                    {
                                        'type': 'text',
                                        'text': '燃費',
                                        'size': 'md',
                                        'weight': 'bold',
                                        'color': '#ff5452'
                                    },
                                    {
                                        'type': 'text',
                                        'text': `${fuelConsumption}km/L`,
                                        'wrap': true,
                                        'align': 'end',
                                        'size': 'md',
                                        'weight': 'bold',
                                        'color': '#ff5452'
                                    }
                                ],
                                'spacing': 'none',
                                'margin': 'lg'
                            },
                            {
                                'type': 'separator',
                                'margin': 'lg'
                            },
                            {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [{
                                    'type': 'text',
                                    'text': date,
                                    'size': 'xs',
                                    'color': '#aaaaaa',
                                    'align': 'end'
                                }],
                                'margin': 'md'
                            }
                        ]
                    }
                ]
            },
            'styles': {
                'footer': {
                    'separator': false
                }
            }
        }
    }

    return object;
}

/**
 * ヘルプメッセージ
 * 
 * @return {Object} flexMessage
 */
function HelpMsg() {
    const msg = {
        'type': 'flex',
        'altText': 'ヘルプ',
        'contents':{
            'type': 'bubble',
            'body': {
                'type': 'box',
                'layout': 'vertical',
                'contents': [
                    {
                        'type': 'text',
                        'weight': 'bold',
                        'size': 'sm',
                        'text': '燃費計算',
                        'color': '#878787'
                    },
                    {
                        'type': 'text',
                        'text': 'Help',
                        'weight': 'bold',
                        'size': 'xxl',
                        'margin': 'md'
                    },
                    {
                        'type': 'text',
                        'text': '使い方',
                        'size': 'xs',
                        'color': '#aaaaaa',
                        'wrap': true
                    },
                    {
                        'type': 'separator',
                        'margin': 'lg'
                    },
                    {
                        'type': 'box',
                        'layout': 'vertical',
                        'margin': 'lg',
                        'spacing': 'xs',
                        'contents': [
                            {
                                'type': 'text',
                                'text': '1行目に 走行距離(km)',
                                'wrap': true
                            },
                            {
                                'type': 'text',
                                'text': '2行目に 給油量(L)'
                            },
                            {
                                'type': 'text',
                                'text': '※数値のみを入力してください',
                                'margin': 'md',
                                'size': 'sm',
                                'color': '#878787'
                            }
                        ]
                    }
                ]
            },
            'styles': {
                'footer': {
                    'separator': true
                }
            }
        }
    }
    return msg;
}

/**
 * エラーメッセージ
 * 
 * @param  {String} sub  サブタイトル
 * @param  {String} text エラーメッセージ
 * @return {Object}      flexMessage
 */
function errorMsg(sub, text) {
    return {
        'type': 'flex',
        'altText': 'エラー',
        'contents':{
            'type': 'bubble',
            'body': {
                'type': 'box',
                'layout': 'vertical',
                'contents': [
                {
                    'type': 'text',
                    'weight': 'bold',
                    'size': 'sm',
                    'text': '燃費計算',
                    'color': '#878787'
                },
                {
                    'type': 'text',
                    'text': 'Error',
                    'weight': 'bold',
                    'size': 'xxl',
                    'margin': 'md'
                },
                {
                    'type': 'text',
                    'text': sub,
                    'size': 'xs',
                    'color': '#aaaaaa',
                    'wrap': true
                },
                {
                    'type': 'separator',
                    'margin': 'lg'
                },
                {
                    'type': 'box',
                    'layout': 'vertical',
                    'margin': 'lg',
                    'spacing': 'xs',
                    'contents': [
                    {
                        'type': 'text',
                        'wrap': true,
                        'text': text
                    }
                    ]
                }
                ]
            },
            'styles': {
                'footer': {
                'separator': true
                }
            }
        }
    }
}

module.exports = {
    Calc,
    HelpMsg
};
