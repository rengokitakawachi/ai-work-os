https://zenn.dev/yourstand_blog/articles/chatgpt-mcp-support

##  はじめに

ChatGPTの**開発者モードでMCPツールがフルサポート**された。これにより、これまで中心だった「読み取り」だけでなく、**「書き込み」系のアクションまで実行できる**ようになった。通常チャットでも自作のMCPサーバーを持ち込めるようになり、かなり自由な外部サービスとの連携が可能になった。

この新機能を試すために自作したツールを例に、以下を共有する。

  * 何が新しくできるようになったか
  * 最小の手順（接続 → 実行 → 承認フロー）と注意点
  * この機能がもたらす価値

なお、ChatGPTのConnectorに関する公式情報は「Connectors in ChatGPT」のヘルプページにまとまっている。Pro/Business/EnterpriseプランでCustom Connectorが利用可能だといった基本的な情報もここにある。

> 注意: この記事の内容は 2025年9月12日現在の情報である。ChatGPT の更新は頻繁であるため、最新情報は公式ページを参照してほしい。

##  作ったもの： マーメイド記法構文チェッカー

まず、今回試しに作ったもの, Mermaid記法の構文をチェックするシンプルなMCPサーバーを紹介する。

これを作ったきっかけはChatGPTそのもの、**ChatGPTが時々、構文の壊れたmermaid図を生成する**から。ならば、それをChatGPT自身にチェックさせてしまおう、ということ。

リポジトリを見ればわかるが、技術スタックは TypeScript + Bun である。デプロイ先は Cloudflare Workers とした。PoC としては典型的な選定である。ツールの中身は Mermaid の文字列を受け取り、構文チェックの結果を JSON で返すだけのシンプルなものだ。Cloudflare Workers は無料枠が大きく、今回のユースケースでは上限に達する心配はまずない。

##  セットアップから利用まで

ここからが本題。実際に私が試したChatGPTに自作ツールを接続し、利用するまでの一連の流れを紹介する。（手順は公式ページが正確で、OpenAI Developers の X のポストの動画も分かりやすい）

###  1\. 開発者モードを有効化

まず、Chat の `+` -> `さらに表示` と進み、`開発者モード`を選択する。

![](https://res.cloudinary.com/zenn/image/fetch/s--uteWH0-b--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/c9fe0099eeffc2bb6088775a.png%3Fsha%3D312ada344a19ceb1a67aad4426e85ed8e57ca5fa)

これを有効にすると、UIの枠が赤くなり、雰囲気が変わる。わかりやすい。**ここからは自己責任** ということ。

![](https://res.cloudinary.com/zenn/image/fetch/s--UXgusAfJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/1eb13864b2dd37036639bcc4.png%3Fsha%3D997449cb1e508a9e847e0b8f61b57353698a42cb)

###  2\. Custom Connectorを追加

次に、自作のMCPサーバーを接続する。  
`Connectors` → `Custom Connector` を選択し、デプロイしたMCPサーバーのURLを入力する。  
ツールが MCP サーバーとして正しいレスポンスを示していれば、しばらくすると接続が完了する。

> とりあえず動作を確認したかった私は、先に紹介したMCPサーバーを Vibes 高めで作ってしまった。ローカルでは動くが ChatGPT では繋がらないということが何度かあった。今度ちゃんと原因を調べたい。

![](https://res.cloudinary.com/zenn/image/fetch/s--y83ntMwR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/03529cdc8481dc036fcb5b15.png%3Fsha%3Da1ca2b48893a86b1d2656389cece37f216ae580d)

###  3\. 対話開始。ツールの検出と承認、そして実行

コネクターが有効になった状態で対話を開始する。  
URLを設定すると、ChatGPTがサーバーにアクセスし、利用可能なツールを検出する。  
チャットで「このmermaid図の構文を修正して」などと指示を出すと、ツール呼び出しの前に承認を求めるダイアログが表示される。

![](https://res.cloudinary.com/zenn/image/fetch/s--iAoczBhb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/756d782b8e8aba7e0ed07dee.png%3Fsha%3D2f952faa8d45a01a8c9695df7dd8859dbc06e367)

Claude Code や CodexCLI などの開発エージェントを使っている人ならお馴染み、確認と拒否。（OpenAIは承認ではなく「確認」という日本語訳になるのだな。Codex もそうだった。）  
ここで「**この会話の間だけ記憶する**」というオプションも提示される。毎回承認するか、スレッド内では承認を省略するかを選択できる。

承認するとツールが実行され、結果がチャットに返ってくる。これでMCPサーバーを繋いで利用するという一連の流れは完了だ。

![](https://res.cloudinary.com/zenn/image/fetch/s--xW7qsx80--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/e095b6081c218fc70c2c648a.png%3Fsha%3D713d1f380067e09dcaad0fb03116d8e0f2c986ff)

###  メモ：いくつか気付いた点

####  `search`/`fetch`は必須ではなかった

Chat用のConnectorとして使う場合、**ツール（副作用のある操作）のみの実装でも接続・実行できた**。従来の `search`や`fetch`といった読み取り系の実装がなくても動作することを確認できた。

ただし、公式ヘルプの FAQ には依然として「`search` と `fetch` が必須」という表記が残っている。単に更新が追いついていない可能性がある。カスタム Connector の設定画面でも非推奨である旨の文言が見られる。

![](https://res.cloudinary.com/zenn/image/fetch/s--yigrLXN2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/1fd0d62c487b0f85ef7fae07.png%3Fsha%3D0fb38eae74c77b6f523d74ed4fef576547e46521)

####  環境による差異

私の環境では、Web版のChatGPT Proプランで開発者モードが利用できた。一方で、Thinkingモデルの最上位`pro`モードやレガシーモデルでは、Chat で 開発者モードを有効化するトグル自体が表示されなかった。

##  大きな変化。「読み取り」から「実行」へ

今回のアップデートの核心は単なるツール機能の拡大以上の意味を持っている気がしている。

これまでは「安全な読み取り」中心だった。AIを社会実装する上で正しい進め方だった。しかし、今回「書き込み」系の **実行** が可能になったインパクトは大きい。  
OpenAIの発表でも 「write actions （not just search/fetch）」 と明言されている。  
理論上、**API で操作できるものはすべて ChatGPT から実行可能になった。** 承認 UI と OAuth を使った権限コントロールなどを用いれば、それなりに安全に運用できると考える。Cursor などの開発エージェントの承認と意味合いは等しいと言えるだろう。

ユースケースは無数にある。ホワイトカラーの多くの業務に ChatGPT を絡ませられるはずである。  
日時、週次、月次の作業の自動化、関連ファイルを読み取り、そこから必要なアクションを実行できる。メールやSlack の送信を任せてもいい。<s>私の発想力と表現力ではChatGPTに聞かないとこれ以上アイデアが浮かばんな</s>

そういえば、Claude がすでに対応しているじゃないか、という声が聞こえてきそうである。それはそうだ。MCP規格の生みの親でもあるのだから、これに関しては Claude が先行している。  
ただ、AIサービスのリーダー、ChatGPT がサポートしたというのは大きい。正直 GPT-5 は他社モデルに対して頭1つ抜けている（個人の感想）。これからさまざまなユースケースが出てくるだろう。非常に楽しみだ。

OpenAIはこの自由度の高いリモートMCPサーバー連携機能を開発者向けとして提供し、その利用状況を観察しから次の一手を伺っているのだろうか。更なるプラットフォームとしての機能進化が楽しみである。

##  まとめ

今回のMCPフルサポートで、ChatGPTのできることが増えた。副作用、かなり自由度高く外の世界へ影響を与えることができるようになったのだ。

##  参考リンク

  * カスタム Connector に関する公式ヘルプ: [Connectors in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt)
  * MCP の概要: [Model Context Protocol 公式サイト](https://modelcontextprotocol.io/)
  * OpenAI 側の MCP ガイド: [OpenAI Platform Docs - Connectors and MCP servers](https://platform.openai.com/docs/guides/tools-connectors-mcp)
  * 今回作成したリポジトリ: [kazuhideoki/mermaid-checker-mcp](https://github.com/kazuhideoki/mermaid-checker-mcp)
