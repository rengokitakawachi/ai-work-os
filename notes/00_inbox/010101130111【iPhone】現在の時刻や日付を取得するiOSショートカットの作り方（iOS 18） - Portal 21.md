iOSショートカットで現在の時刻や日付を取得する方法を解説。まず「日付」アクションを追加し、次に「日付をフォーマット」アクションでカスタム書式を設定、Unicode形式（yyyy・MM・dd・EEE・HH・mmなど）で必要な情報を取得する。IF条件やリマインダー用に使用する場合は、数値化するなら「数字」アクション、文字列は「テキスト」アクションを利用。完成したら右下の▶で動作確認が可能。

https://portal-21.jp/ios-sc-make-time/

![](https://portal-21.jp/wp-content/uploads/2022/04/alarm-im.jpg)

iOSショートカットを自分で作りたい人におすすめ。現在の時刻や日付を取得するiOSショートカット。

このショートカット単体で何ができるわけではありませんが、IF条件に使用したり、リマインダー関連のショートカットで時刻を取得するのに使ったり、ショートカットを土台にしていろいろ応用できます。

この記事では、現在の時刻や日付を取得するiOSショートカットの作り方を解説します。

関連記事

**[【iPhoneの裏技】iOSショートカットのレシピ一覧集](https://portal-21.jp/ios-shortcut-recipes/)**

## 現在の時刻や日付を取得するiOSショートカットの作り方（iOS 18.3時点）

### 完成図

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-11.jpg)

iPhoneショートカットには、現在の日付（時間を含む）を取得するアクションの提供あり。

時間、日付、曜日、年度までもろもろ取得できます。

### ショートカットの作り方

新規ショートカットの作成画面を開き、まずは「**日付**」アクションを追加します。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-1.jpg)

これは現在の日付（年月日、曜日、現在の時刻など）をもろもろ取得できる便利アクション。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-2.jpg)

画面右下の「▶」をタップすればショートカットがお試し起動できます

次に「**日付をフォーマット**」アクションを追加。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-3.jpg)

「**日付をフォーマット**」アクションの詳細画面を開き、「**日付の書式**」を「**カスタム**」に変更します。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-4.jpg) ![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-5.jpg) ![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-6.jpg)

「文字列をフォーマット」から取得したい文字列フォーマット（Unicodeの日時フォーマット）を入力します。

初期状態だと以下のようなデータが取得できます。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-7.jpg)

主なUnicodeの日時フォーマット。

書式
出力内容
出力例

yyyy
西暦4桁
2025

MM
月
03（3月）

dd
日
26

EEE
曜日
水

HH
24時間時刻
10時

mm
分数
44分

なにかしら文字列フォーマットを指定してショートカットは完成。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-8.jpg)

これで日付データは取得できます。

ただ、あくまで日付データなので、IF条件式などで使う場合は数値型の変数に落とし込む必要あり。

「**数字**」アクションを追加し、日付データと紐づけます。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-9.jpg) ![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-10.jpg)

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-11.jpg)

取得したい日付が文字（曜日など）の場合は「**テキスト**」アクションを使います。

![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-12.jpg) ![](https://portal-21.jp/wp-content/uploads/2025/03/ios-sc-date-13.jpg)

これで完成。

画面右下の「▶」をタップするとショートカットがお試し起動します。意図した日付情報が取得できてるか確認あれ。

## 関連記事

    

##### [iPhoneショートカットのおすすめレシピまとめ（2026年最新版）

続きを見る

](https://portal-21.jp/ios-shortcut-recipes/)

    

##### [iOSショートカットおすすめレシピを厳選紹介

続きを見る

](https://portal-21.jp/ios-sc-lineup/)

▶ **[iOSショートカット関連の記事をすべて見る](https://portal-21.jp/category/gadget/smartphone/iphone/ios-shortcut/)**
