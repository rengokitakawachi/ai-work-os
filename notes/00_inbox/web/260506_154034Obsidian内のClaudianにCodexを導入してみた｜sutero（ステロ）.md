https://note.com/sutero/n/n41b7a6035a34?external_type=smart_news&external_position=original_link&rt=external&sub_rt=smart_news

![見出し画像](https://assets.st-note.com/production/uploads/images/272948183/rectangle_large_type_2_8d4e9f2fe9aee072ae2122c5d5e36edb.png?width=1280)

以前、Obsidian内でClaudeCodeが使えるプラグイン「Claudian」を導入して、メモ環境がかなり快適になった、という投稿をした。

その時点では、Claudianはほぼ、ClaudeCodeをObsidianに埋め込むためのものとして使っていた。

Obsidianの画面内にClaudeCodeのチャット欄があり、Vault内のファイルを読んだり、作ったり、編集したりしてくれるのが、とにかく便利だった。

それだけでも十分に「これでいいじゃん」と思っていたのだけれど、最近のClaudianはCodexにも対応している。

ということで、Obsidian内のClaudianでCodexも使えるようにしてみた。

## ClaudianがCodexにも対応

Claudianは、もともとObsidian内でClaudeCodeを使うために生まれたプラグイン。

ところが、アップデートで、現在はClaude Codeだけではなく、Codexも含めたAIコーディングエージェントをVault内に組み込むプラグインへと、進化している。

ClaudeCodeにCodex、OpenCodeが現時点では使える。

自分の使い方としては、ObsidianのVaultを普通のメモ置き場として使いつつ、そこにエージェントが入ってきて、ノートを読んだり書いたり整理したりする、というのが一番ありがたい。

ClaudeCodeで出来ていたことがCodexでも出来るなら試すしかない、と。

## 先にCodex CLIを入れておく

ClaudianでCodexを使うには、Obsidianのプラグインを入れるだけではなく、PC側にCodex CLIが入っている必要がある。

ClaudianはObsidian内にAIチャット欄を出してくれるけれど、実際にCodexとして動く部分はローカルに入れたCodex CLIを呼び出す形になる。

なので、まずはターミナルやPowerShell等で`codex`コマンドが使える状態にしておく。

### Codex CLIのインストール手順

  * インストールコマンド。
    
    
    npm install -g @openai/codex
    
    すでに入っている場合でも、最新版にしておくなら同じくnpmで更新するか、Codex CLI側の`codex --upgrade`を使う。
    
      * アップデートコマンド
    
    
    npm install -g @openai/codex
    
    または、
    
    インストールできたら、まずは普通にターミナルで起動確認する。
    
      * ヴァージョン情報確認コマンド
    
    ### Codex CLIにログイン
    
      * 起動コマンド
    
    初回起動時にログイン確認が出るので、そこでChatGPTアカウントでサインインする。
    
    今のCodex CLIは、APIキーを自分で環境変数に設定する方法だけではなく、ChatGPTアカウントでサインインする流れが用意されている。
    
    もしログインだけを明示的にやり直したい場合は`codex login`も使える。
    
    ### Plusプランが1か月無料
    
    無料のアカウントでも試せるが、基本的にCodexは、ChatGPTの有料プランであるPlusやProなどで使うに越したことはない。
    
    期間限定でFreeやGoでも使える案内はあるものの、継続的にちゃんと使う前提なら、Plus以上のプランで考えるのが分かりやすい。
    
    Plus以上のプランで使うと**GPT-5.5が使える**というのが大きい。
    
    ClaudeCodeも結局は有料プランで使うものなので、すでにClaudeCodeを使っている人にとっては、Codexも同じように「有料のAIコーディングエージェント」として比較しやすい。
    
    しかも、現在は対象アカウント向けにChatGPT Plusを1か月無料で試せるキャンペーンをやっている。
    
    つまり、ClaudeCodeを使っている人でも、Plusの無料期間が出ているなら、追加でいきなり課金せずにひと月はCodexを試せる。
    
    Claudian内でClaudeCodeとCodexを並べて使ってみるには、かなり丁度良いタイミング。
    
    ## CodexをObsidianでClaudeCode並みに使えるようにする
    
    ここから、Obsidian内の設定メモを元にざっくり整理。
    
    * * *
    
    ### Claudian側でCodexを有効にする
    
    ここまで出来て、ターミナル上で`codex`が普通に起動する状態になってから、Obsidian内のClaudian設定画面を開く。
    
    上部にCodexのタブがあるので選択し、タブ内最上部の`Enable Codex Provider`をオンにする。
    
    これでClaudian内でCodexを選べるようになる。
    
    Claudian側でCodex CLIが見つからない場合は、CLI pathやEnvironment設定を確認する。
    
    Windowsなら`where.exe codex`で場所を確認できるが、ここは環境ごとの差が大きいので、細かい説明は公式ドキュメントを見るのが早い。
    
    前述の[claudianのGitHub](https://github.com/YishenTu/claudian)を参照頂きたい。
    
    ### AGENTS.mdを用意する
    
    ClaudeCodeでは`CLAUDE.md`にVault内の運用ルールが書かれている。
    
    Codexの場合は、`AGENTS.md`がその役割になる。
    
    自分のVaultでは、まず`.claude/CLAUDE.md`を確認し、そこに書いてあるルールをベースにして、`.codex/AGENTS.md`を作成した。
    
    内容としては、ノート作成・編集は日本語で行うこと、既存のフォルダ構造を守ること、新規ノートにはfrontmatterを付けること、wikilinkを優先すること、勝手に`.obsidian/`やテンプレート周りを編集しないこと、みたいなもの。
    
    ClaudeCodeで育ててきたルールを、Codex側にも読める形で持っていく作業。
    
    これは、codexに「CLAUDE.mdの内容を確認し、同じ内容をAGENTS.mdに最適化して作って」と頼めば良い。
    
    ### skillsもコピーして調整する
    
    ClaudeCode側では、`.claude/skills`に、obsidian-skillsをはじめとした、スキルを置いていた。
    
    確認したものは、`defuddle`、`json-canvas`、`obsidian-bases`、`obsidian-cli`、`obsidian-markdown`、`summarize`あたり。
    
    これを`.codex/skills`にコピーして、Codexでも使いやすい形に調整。
    
    ただし、ClaudeCodeで使えているものをそのままCodexに持ってくれば全部動く、というほど単純ではないということ。
    
    とはいえ、安心して欲しい。
    
    codexに「`.claude/skills`内のファイルをcodexでも動くように最適化したものを新規で作って」といえば`.codex/skills`フォルダを作成して、その中に作ってくれる。
    
    * * *
    
    参照メモからの記述ここまで。
    
    ## ClaudeCodeの続きをCodexで
    
    もうひとつ気になっていたのが、ClaudeCodeからCodexへの作業引き継ぎ機能。
    
    Codex側の設定で`external_migration`を有効にすると、ClaudeCodeで進めていた会話や作業履歴を検出して、Codex側に取り込めるようになる、というもの。
    
    設定としては、`~/.codex/config.toml`に以下を追加する。
    
    
    [features]
    external_migration = true
    
    無ければ、新規に作れば良い。
    
    これを入れておくと、新しい作業ディレクトリでCodexを起動した時に、ClaudeCode側の履歴を確実ではないにせよ取り込みやすくなる。
    
    すでにCodexで確認済みのディレクトリだと案内が出ない場合があるようで、試すなら新規の空ディレクトリでやるほうが分かりやすい。
    
    この機能は、Obsidian内のClaudianだけに限った話ではないけれど、ClaudeCodeとCodexを併用する流れとしては実用的ではある。
    
    ClaudeCodeで要件やメモの整理をして、Codexで実装やレビュー等の細かい編集を続ける、という使い分けがしやすくなる。
    
    ## 実際に使ってみて
    
    Obsidian内でCodexが使えるようになると、ClaudeCodeとは別のエージェントを同じVaultに置ける感じになる。
    
    同じメモ群を読ませて、同じルールに従わせつつ、別のAIに作業させる。
    
    これが思っていた以上にシームレスに可能となった。
    
    ### 比較するつもりが
    
    最初は、ClaudeCodeとCodexを比較して、どちらが何に強い、みたいな話を書こうと思っていた。
    
    文章の整理はClaudeCodeが得意で、ファイル操作や実装寄りはCodexが得意、みたいに分けられるのではないかと考えていた。
    
    ただ、Obsidian内で使うという前提だと、実際にはそこまで大きな差を感じないというのが事実。
    
    少なくとも、Vault内のMarkdownを読ませて、メモを作ったり、既存ノートを整理したり、設定ファイルを確認したりする範囲では、どちらもほぼ遜色なく使える。
    
    これは少し意外だった。
    
    AIとしての性格の違いはあるにしても、Claudianを通してObsidian内で使う場合、重要なのは「Vaultの文脈を読めること」と「こちらが書いたルールに従ってくれること」。
    
    その点では、ClaudeCodeもCodexもかなり近い感覚で使えた。
    
    例えば、ClaudeCodeで日々のメモを作ったり、リンクを整えたりして、Codexには設定ファイルやskillの整合性を確認させる。
    
    あるいは、ClaudeCodeでざっくり記事構成を作り、Codexでファイル名やfrontmatterや文体ルールのチェックをする。
    
    Obsidianを中心にしていると、エージェントの違いよりも「**Vault内の文脈を読んで作業してくれるかどうか**」のほうが重要になってくる。
    
    その点で、Claudian内にCodexが入ってくることに違和感は無い。
    
    ### トークン消費とGPT-5.5
    
    一方で、トークン消費の観点ではCodexのほうが余裕を持って使える安心感がある。
    
    Obsidian内で使っていると、どうしても複数のノートを読ませたり、長めのログを参照させたり、過去の設定メモまで見に行ってもらうことが増える。
    
    その時に、トークンの残量や消費を気にしすぎずに投げられる感覚があるのは、Codexを併用する大きな理由になる。
    
    要は、ClaudeCodeとCodexを勝ち負けで比べるというより、Obsidian内ではどちらも普通に使える。
    
    最近登場したGPT-5.5がかなり優秀なため、ぶっちゃけると、obsidian内で使うAIエージェントはCodexオンリーでも大丈夫な気もする。
    
    ## 設定ログがそのまま資産になる
    
    前回のClaudian導入時にも思ったけれど、Obsidianの良さは試行錯誤がそのままメモとして残るところにある。
    
    今回も、`AGENTS.md`をどう作ったか、skillsをどうコピーしたか、どこがClaudeCode前提で、どこをCodex向けに直したか、というログが残っている。
    
    後から見返すと、単なる設定手順ではなく、自分がどういう運用にしたいのかが見える。
    
    AIエージェントを使う場合、この「自分の運用方針が残っている」ことがかなり大事だと思う。
    
    なぜなら、エージェントはルールを書けば従ってくれるけれど、そのルールが今の自分の使い方とズレていると、当然ズレた作業をするから。
    
    ClaudeCode用の`CLAUDE.md`をそのままCodex用の`AGENTS.md`にコピーするだけではなく、Codexの環境で見えているツールに合わせて書き換える必要がある。
    
    この調整をしたことで、Obsidian内でAIを使う環境が少しだけ道具っぽくなった。
    
    ## まだ完全に同じではない
    
    もちろん、ClaudeCodeとCodexが完全に同じように使えるわけではない。
    
    Claudian側でも、ClaudeCodeが先に成熟していて、Codexは追加されたばかりの機能という印象を受けるのも事実。
    
    MCPの扱いだったり、skillの読み方だったり、履歴の持ち方だったり、細かい部分では違いがある。
    
    だから、「ClaudeCodeの代わりにCodexへ完全移行する」というよりは、「Obsidian内で使えるエージェントの選択肢が増えた」と考えるほうが近い。
    
    自分の場合は、ClaudeCodeでメモや文章の流れを作り、Codexで設定やファイル操作寄りの確認をする、という使い分けが今のところしっくり来ている。
    
    が、トークン消費によって、偏った使い方になったとしても、全然普通に使えているというのも事実ではある。
    
    ## Obsidian一択感がさらに強くなる
    
    Obsidianは、ただのMarkdownファイル置き場でありつつ、プラグイン次第でかなり色々出来る。
    
    そこにClaudianでClaudeCodeが入り、さらにCodexも使えるようになると、もうメモアプリというより、自分用の作業環境に近い。
    
    ブラウザのAIチャットに貼り付けて相談するのとは違い、最初からVaultの中で会話して、必要ならファイルを読んで、更新して、関連ノートまで見に行ける。
    
    この差はかなり大きい。
    
    しかも、今回みたいに設定や試行錯誤のログをObsidian内に残しておけば、そのログ自体をまたClaudeCodeやCodexが読める。
    
    使えば使うほど、次の作業が少し楽になる。
    
    まだ細かい調整は必要だけれど、ClaudianにCodexが入ってきたことで、Obsidianを中心にしたAI作業環境はまた一段便利になった。
    
    以前は「Obsidian内でClaudeCodeが使えるだけで快適」と思っていた。
    
    今はそこにCodexも並べられるようになって、Obsidianを開いておけばだいたい何とかなる感がさらに増している。
    
    * * *
    
    
    
    
    
