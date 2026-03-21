https://gigazine.net/news/20260317-manus-my-computer/

![](https://i.gzn.jp/img/2026/03/17/manus-my-computer/00_m.png)

2026年1月に**[Metaに買収](https://gigazine.net/news/20260105-meta-buys-ai-startup-manus/)**されたAIスタートアップのManusが、AIエージェント「Manus」をデスクトップアプリとしてリリースすることを発表しました。Manus Desktopの中核機能である「**My Computer**」により、Manusをデスクトップ上で動作させることでローカルファイルやアプリケーションと連携させることができます。  
  
**Introducing My Computer: When Manus Meets Your Desktop**  
**<https://manus.im/blog/manus-my-computer-desktop>**

**![](https://i.gzn.jp/img/2026/03/17/manus-my-computer/001_m.png)**

****   
**[Manus(Meta)がローカルで動作するAIエージェント「My Computer」をリリース - YouTube](https://www.youtube.com/watch?v=gxxhDfdxUp8)**

![](https://img.youtube.com/vi/gxxhDfdxUp8/maxresdefault.jpg)

Manusは従来クラウド上で動作するAIエージェントで、隔離された安全なサンドボックスでネットワーキング、コマンドライン、ファイルシステム、ブラウザ操作などAIエージェントのスタンダードなスキルを活用してきました。Manusのスキルをローカルなファイルや開発環境などにも広げるため、新しいManus Desktopアプリケーションの中核機能として発表されたのがMy Computerです。  
  
My Computerは、Manus Desktopアプリを通じてコンピュータのターミナルでコマンドラインインターフェース(CLI)を実行します。これにより、ローカルファイルの読み取り、分析、編集、さらにはローカルアプリケーションの起動と制御が可能になります。ブログではMy Computerを活用する一例として、フォルダ内にバラバラに入った数千枚の写真をスキャンして画像の内容を識別し、カテゴリ別のサブフォルダに仕分けする様子が説明されています。Manusは「一見すると単純なファイル管理タスクですが、実際には面倒で繰り返しの作業を自動化することで大きな違いが生まれます。コマンドラインの力は膨大な範囲の自動化アクションを可能にします」と述べています。 

![](https://i.gzn.jp/img/2026/03/17/manus-my-computer/002_m.png)

また、My ComputerはManusがPythonやNode.js、SwiftやXcodeなどコンピュータ上のすべてのコマンドラインツールを活用できるようにします。これにより、複雑な自動化や開発の可能性が飛躍的に広がります。コマンドライン指示による開発を通じてMacアプリ、Pythonスクリプト、ウェブサイトなどを構築し、Manusがコーディングからデバッグまでの全工程を処理してくれるとのこと。  
  
また、外出中にスマートフォンから指示を送ることで、自宅のPCに搭載しているManusを遠隔から動かすこともできます。My Computerはローカルなファイルやアプリのほか、Google カレンダーやGmailなどのサードパーティサービスとも統合されているため、「遠隔から自宅のPCに指示をして必要なファイルを見つけ出した後、Gmailを通じてメールで送信」といったことも可能です。さらに、ユーザーのPCに搭載されているGPUの余剰リソースを活用し、機械学習モデルのトレーニングをバックグラウンドで行うといった高度なコンピューティングタスクにも対応しています。 

![](https://i.gzn.jp/img/2026/03/17/manus-my-computer/003_m.png)

PCに常駐させるAIエージェントは便利な一方で、ローカルなファイルやデータにアクセスできるためセキュリティ上の懸念があります。My Computerはユーザーがコントロールできるように設計されており、すべてのターミナルコマンドは実行前に明示的な承認が必要で、信頼できるタスクのワークフローを簡素化するために「常に許可」を選択することも、各操作を個別に確認するために「一度だけ許可」を選択することもできます。  
  
PC上にセルフホスト可能なパーソナルAIアシスタントを常駐させてさまざまなタスクを自動化できる**[OpenClaw](https://gigazine.net/news/20260207-openclaw/)**の**[大ヒット](https://gigazine.net/news/20260224-claw-ai-agent-layer/)**を受け、OpenClawライクなAIエージェントが2026年2月から3月にかけて続々と登場しています。Anthropicは2026年2月26日にコンピューターを操作するAIエージェントを手がけているAIスタートアップ・**[Verceptを買収](https://gigazine.net/news/20260226-anthropic-acquires-vercept/)**すると発表しているほか、コーディングAI「Claude Code」の**[リモートコントロール機能](https://gigazine.net/news/20260225-claude-code-remote-control/)**やPC操作AI「**[Cowork](https://gigazine.net/news/20260113-claude-cowork-pc-using-ai-anthropic/)**」をリリースしています。2026年3月にはPerplexityがPC上で24時間動作してPC作業をサポートするAIエージェント「**[Personal Computer](https://gigazine.net/news/20260312-perplexity-personal-computer/)**」を発表していたり、NVIDIAからAIがユーザーのデバイス上で自律的にタスクを実行するためのプラットフォーム「**[NemoClaw](https://gigazine.net/news/20260310-nvidia-nemoclaw/)**」がリリースされると報じられたりと、 OpenClawに近いアプローチのサービスが次々に登場しています。そのような中でも、My Computerは従来の自動化ツールを覆す可能性があると業界関係者が指摘しています。 

> Four companies launched OpenClaw competitors in three weeks. Manus may have just just dropped the most interesting one.  
  
"My Computer" can now access your local files, run terminal commands, build native apps, train ML models on your idle GPU, and operate your machine remotely… <https://t.co/Msbt9FCBq3> [pic.twitter.com/Ac5jd4prgH](https://t.co/Ac5jd4prgH)
> 
> — Josh Kale (@JoshKale) [2026年3月16日](https://twitter.com/JoshKale/status/2033584031120392264)

My Computerは2026年3月16日からすべてのmacOSおよびWindowsユーザーが利用可能です。Manusは「私たちは常に、AIエージェントは単なるチャットアシスタントではなく、アクションエンジンであるべきだと信じてきました。クラウドサンドボックスはManusに独自の作業スペースを提供しました。My ComputerはManusをあなたの作業環境に持ち込みます。あなたのアイデア、Manusの実行、コンピュータ上のすべてのリソースを合わせてあなたがこれで何を作り出すのか、私たちはとても楽しみにしています」と語っています。  
  
**Download desktop app - Manus**  
**[https://manus.im/desktop](https://manus.im/desktop?ref=testingcatalog.com)**
