# linebot-fuel

⛽️ 走行距離と給油量から燃費計算するLINEBot

[![Deno](https://shields.io/badge/deno-%5E1.28-green?logo=deno&style=flat)](https://deno.land)

## 友だち登録

![QRコード](https://user-images.githubusercontent.com/44780846/103730839-1b7c2700-5027-11eb-8015-60b7036d40ae.png)

<a href="https://lin.ee/7nQzjx2"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"></a>

## 使い方

**1 行目に走行距離**、**2 行目に給油量**を入力して送信すると、結果を返信します。

![基本の使い方](https://user-images.githubusercontent.com/44780846/103732273-63e91400-502a-11eb-96d0-afcbd6dc405b.png)

また、なにか適当なメッセージを送ると使い方を返信します。

![ヘルプ](https://user-images.githubusercontent.com/44780846/103732271-63507d80-502a-11eb-8c70-374aa49a0d1a.png)

## プライバシーポリシー

[こちら](https://arrow2nd.github.io/linebot-fuel/) をご覧ください。

## 開発

### 1. `.env`を作成

```
PORT=8080
ACCESS_TOKEN=hoge
SECRET_KEY=fuga
```

### 2. Dockerイメージをビルド&実行

```
deno task docker:build
deno task docker:run
```
