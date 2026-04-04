https://dev.classmethod.jp/articles/todoist-mcp-obsidian-ai-fork/

![コードを一行も書かずにtodoist mcp serverをobsidian smart composer用にforkした](https://images.ctfassets.net/ct0aopd36mqt/1Gr5gevTqdlnXj10qiGvyd/fc94353bfe9f13a39977dea367c9ec08/cursor.png?w=3840&fm=webp)

こんにちは、せーのです。  
今日は[ObsidianのSmart composer](https://github.com/glowingjade/obsidian-smart-composer?utm_source=chatgpt.com)というプラグインを使って[todoistのmcpサーバー](https://github.com/koki-develop/todoist-mcp-server)を使えるように改変してみましたので、共有します。

##  やりたかったこと

私は普段のタスク管理に[todoist](https://todoist.com/)を使っています。  
そして日々の予定や考えをまとめるのにObsidianを使っているため、Obsidianとtodoistを連携したく、smart composerというプラグインを入れました。  
これでデイリーノートを作成する際に[todoistのMCPサーバー](https://github.com/koki-develop/todoist-mcp-server)よりtodoistのタスクを拾ってきて、デイリーノートに反映させてくれる、というものを期待していました。

##  問題の発見

ですが、実際に呼び出してみたところ、エラーが発生しました。

具体的にはSmart Composerから`get_projects`を呼び出した際、以下のエラーが発生しました：
    
    
    MCP error -32602: Invalid arguments for tool get_projects: [
      {
        "code": "invalid_type",
        "expected": "object",
        "received": "undefined",
        "path": [],
        "message": "Required"
      }
    ]
    
    
    これはエラーメッセージから、Smart Composerがパラメータを何も渡さない場合にundefinedを送信しているのに対し、todoist-mcp-serverがundefinedを受け付けていないことが原因だと推測できます。
    
    
    
    
    ##  どっちを直す
    
    
    
    
    ここで考えられる選択肢は２つ
    
    
    
    
    
    
      * smart composerを直してundefinedを渡さないようなプラグインを作る
    
    
      * todoist mcp serverを直してundefinedでも受け取れるようなmcpサーバーを作る
    
    
    
    
    しかし、Smart Composerは更新頻度が少なく、最新のMCPのJSON形式にも対応していないため、目的以外にも修正箇所がたくさんあるかもしれません。  
    
    なので、Smart Composer側を修正するのではなく、todoist-mcp-serverをforkして修正することにしました。
    
    
    
    
    ##  やってみた
    
    
    
    
    まずは目的のリポジトリをローカルにCloneし、Cursorで開きます。
    
    
    
    
    ![fork_todoist_mcp1.png](https://devio2024-2-media.developers.io/upload/6qFEGfYozVPLIouEGRoD4s/2026-01-06/yBCfJ77NZGJQ.png)
    
    
    
    
    ここからは実際のコードを参照しながらご覧ください。
    
    
    
    
    [GitHub - koki-develop/todoist-mcp-server: ✅ MCP server for Todoist integration with AI assistants](https://github.com/koki-develop/todoist-mcp-server)
    
    
    
    
    ##  原因の特定（Debugモードでの調査）
    
    
    
    
    CursorのDebugモードを使って、問題の根本原因を特定しました。
    
    
    
    
    ![fork_todoist_mcp4.png](https://devio2024-2-media.developers.io/upload/6qFEGfYozVPLIouEGRoD4s/2026-01-06/mNq1NrxeGBUw.png)
    
    
    
    
    MCP SDKのソースコードを調査した結果、以下の動作が判明しました：
    
    
    
    
    
    if (tool.inputSchema) {
        const parseResult = await tool.inputSchema.safeParseAsync(request.params.arguments);
        // 検証処理
    } else {
        // 検証をスキップして直接コールバックを呼び出す
        const cb = tool.callback;
        result = await Promise.resolve(cb(extra));
    }
    
    
    MCP SDKはtool.inputSchemaが存在する場合のみ検証を行い、存在しない場合は検証をスキップすることがわかりました。
    
    
    
    
    つまり、このMCPの基本ライブラリとなるMCP SDKの動きとしては
    
    
    
    
    
    
      * クライアントからリクエストされる
    
    
      * inputSchemeがある場合は検証、なければ検証をスキップしてコールバック関数を呼ぶ
    
    
      * コールバック関数内でAPIなどを叩いて情報を得る。その際の引数としてinputSchemeを使う
    
    
      * API先からレスポンスが返ってくる。情報をまとめてクライアントにわたす
    
    
    
    
    というものです。
    
    
    
    
    今回問題になっているget_projectsは「todoistのプロジェクト全てを取ってくる」という処理なので、プロジェクトIDなどの引数がそもそもありません。  
    
    引数のない場合の処理として
    
    
    
    
    MCP SDK => 空のオブジェクトを渡す想定  
    
    Smart Composer => undefinedを渡している
    
    
    
    
    そのため、スキーマのチェックの段階で何かしらのメソッドをオブジェクトから呼び出してしまってエラーになっているっぽいです。
    
    
    
    
    ##  解決策の探索
    
    
    
    
    ここからはAIの試行錯誤を追っていくことにしましょう。
    
    
    
    
    ###  試行1: Zodスキーマのoptional化
    
    
    
    
    まず、Zodスキーマをz.object({}).optional().default({})に変更することを試みました：
    
    
    
    
    
    export const getProjectsParamsSchema = z.object({}).optional().default({});
    
    
    つまり
    
    
    
    
    
    
      * .optional(): undefinedを許容
    
    
      * .default({}): undefinedの場合は空オブジェクト{}にフォールバック
    
    
    
    
    ということですね。
    
    
    
    
    しかし、MCP SDKが.shapeプロパティを期待しているため、この方法では.shapeが正しく動作しないことが判明しました。
    
    
    
    
    つまり  
    
    z.object({}).optional().default({})の.default({})は実行時の値変換になるのでスキーマの型構造が変わらず、.shapeプロパティはないまま、というわけです。  
    
    正確には型はZodObject型ではなく、ZodOptionalをラップしたZodDefault型となるため、.shapeが直接アクセスできないんですね。
    
    
    
    
    ###  試行2: unwrap()メソッドの使用
    
    
    
    
    次にAIが考えたのは.unwrap()メソッドです。
    
    
    
    
    .unwrap()メソッドを使って内部スキーマにアクセスしようとしましたが、Zodのoptionalスキーマにはunwrap()メソッドが存在しないことが判明しました。ラップした型に.shapeプロパティがないのでラップを外そうとした、という感じですね。ここではunwrap()メソッドが存在しないことで失敗していますが、あったとしても結局undefinedが出てくるだけなので、多分失敗したでしょう。
    
    
    
    
    ###  迷走するAI
    
    
    
    
    ここでAIが迷走しだします。試行1と試行2をひたすら繰り返すようになりました。何かすごく近視眼的な印象を受けます。どうしよう。
    
    
    
    
    ここであるモードに気が付きました。
    
    
    
    
    ![fork_todoist_mcp3.png](https://devio2024-2-media.developers.io/upload/6qFEGfYozVPLIouEGRoD4s/2026-01-06/CNILpRyQvOaP.png)
    
    
    
    
    Autoモード。
    
    
    
    
    つまり、使うAIモデルをCursorが自動で決めている、ということです。  
    
    ここを賢いモデルに決め打ちしてあげれば別のアイデアが浮かんでくるかもしれません。
    
    
    
    
    つい先月出たばかりの[Claude 4.5 Opus]を指定して、同じ内容を回してみました。
    
    
    
    
    ###  最終的な解決策: input schemaの削除
    
    
    
    
    そうすると、なんということでしょう。Opusが新たなアイデアを出してくれました。
    
    
    
    
    **解決策**: get_projects、get_labels、get_tasksのinput schemaを削除し、MCP SDKの検証をスキップすることで、undefined引数を許容するようにしました。
    
    
    
    
    ###  修正前
    
    
    
    
    
    server.tool(
      "get_projects",
      "Retrieve all Todoist projects...",
      getProjectsParamsSchema.shape,
      async (params) => {
        const projects = await client.getProjects();
        // ...
      },
    );
    
    
    ###  修正後
    
    
    
    
    
    server.tool(
      "get_projects",
      "Retrieve all Todoist projects...",
      // No input schema - skip validation to allow undefined arguments
      async () => {
        const projects = await client.getProjects();
        // ...
      },
    );
    
    
    つまり、引数を使用せず、SDK内でも検証をスキップするのであれば、そもそもinput Schemeを定義しない、という選択肢です。
    
    
    
    
    ##  改善。そして新たな問題
    
    
    
    
    テストしてみたところ、無事MCPが通りました！
    
    
    
    
    ![fork_todoist_mcp2.png](https://devio2024-2-media.developers.io/upload/6qFEGfYozVPLIouEGRoD4s/2026-01-06/JWQHwfqxFclR.png)
    
    
    
    
    、、、がレスポンスがおかしいです。
    
    
    
    
    どうやら、具体的なtodoistのプロジェクトが出ているのではなく、プロジェクト数のみが出ているようです。
    
    
    
    
    しかし、私たちには賢いClaude 4.5 Opusがついています。早速Debugモードで見てみましょう。
    
    
    
    
    ##  レスポンス形式の改善
    
    
    
    
    コードを読んでみると、レスポンスは2つのcontentに分かれ、１つ目にプロジェクト数、2つめにその詳細が書かれているようでした。  
    
    Smart Composerは複数のcontentを返すと最初のメッセージのみを表示する問題があったため、全てのツールでレスポンス形式を改善しました。
    
    
    
    
    ###  レスポンス形式の修正前
    
    
    
    
    
    return {
      content: [
        {
          type: "text",
          text: `Retrieved ${projects.length} project(s)`,
        },
        {
          type: "text",
          text: JSON.stringify(projects, null, 2),
        },
      ],
    };
    
    
    ###  レスポンス形式の修正後
    
    
    
    
    
    return {
      content: [
        {
          type: "text",
          text: `Retrieved ${projects.length} project(s)\n\n${JSON.stringify(projects, null, 2)}`,
        },
      ],
    };
    
    
    ##  実装とテスト
    
    
    
    
    ###  ローカルでのDockerテスト
    
    
    
    
    修正後、ローカルでDockerを立ててテストを行いました。
    
    
    
    
    ここでCursor豆知識を。ローカルのDockerイメージの再ビルドは、DebugモードではなくAgentモードで指示する必要があるようです。
    
    
    
    
    ###  修正されたファイル
    
    
    
    
    以下のファイルを修正しました：
    
    
    
    
    
    
      1. 
    
    
    **src/mcp/tools/projects.ts**
    
    
    
        
            * get_projects: input schemaを削除
        
        
            * create_project, update_project, get_project: レスポンスを1つのメッセージに統合
        
        
    
    
    
      2. 
    
    
    **src/mcp/tools/labels.ts**
    
    
    
        
            * get_labels: input schemaを削除
        
        
            * create_label, update_label, get_label: レスポンスを1つのメッセージに統合
        
        
    
    
    
      3. 
    
    
    **src/mcp/tools/tasks.ts**
    
    
    
        
            * get_tasks: input schemaを削除
        
        
            * その他のタスク関連ツール: レスポンスを1つのメッセージに統合
        
        
    
    
    
      4. 
    
    
    **src/mcp/tools/sections.ts**
    
    
    
        
            * 全てのセクション関連ツール: レスポンスを1つのメッセージに統合
        
        
    
    
    
      5. 
    
    
    **src/mcp/tools/comments.ts**
    
    
    
        
            * 全てのコメント関連ツール: レスポンスを1つのメッセージに統合
        
        
    
    
    
    
    
    ###  テスト結果
    
    
    
    
    Smart Composerで以下のツールが正常に動作することを確認しました：
    
    
    
    
    
    
      * ✅ get_projects（引数なし）
    
    
      * ✅ get_labels（引数なし）
    
    
      * ✅ get_tasks（引数なし）
    
    
    
    
    これで修正完了です！
    
    
    
    
    ちなみに修正したコードをこちらに置いておきます。
    
    
    
    
    [GitHub - seino-tsuyoshi/todoist-mcp-server: ✅ MCP server for Todoist integration with AI assistants](https://github.com/seino-tsuyoshi/todoist-mcp-server)
    
    
    
    
    ##  まとめ
    
    
    
    
    ###  Autoモードの限界
    
    
    
    
    最初はAutoモードで修正を試みましたが、同じようなエラーを何度も繰り返し、うまく修正してくれませんでした。
    
    
    
    
    ###  Claude 4.5 Opusへの切り替え
    
    
    
    
    Autoモードをやめ、Claude 4.5 Opusに固定したところ、問題が解決しました。この経験から、複雑な問題解決には特定のモデルに固定することが有効だと学びました。
    
    
    
    
    ###  Debugモードの活用
    
    
    
    
    Debugモードを使って原因を特定することで、MCP SDKの内部動作を理解し、適切な解決策を見つけることができました。
    
    
    
    
    そして、、、
    
    
    
    
    ###  コードに関する基礎知識はまだまだ必要
    
    
    
    
    Opusに変更してから少しディスカッションしながらコードを修正してもらいました。ここでつまずいているから、このアイデアだとここをこうすることを気をつければいいと思う、みたいな感じで少し方向性を整えてやるとスムーズに直し始めました。
    
    
    
    
    ここら辺の当たりどころにはプログラミングの経験が必要かな、と思いました。ただライブラリの知識は素晴らしいので、事前に一回考えるようにしてあげるのがいいと思います。
    
    
    
    
    ##  AIに実は内緒にしていること
    
    
    
    
    一応これで動いたのでAIには特に何も言っていないのですが、このMCPで使われているMCP SDKは  
    
    @modelcontextprotocol/sdkのバージョン1.12.1を使用しています。  
    
    そして現在MCP SDKは1.25.1が最新で、1.23あたりからinput schemeのjson形式がアップデートされています。
    
    
    
    
    [Releases · modelcontextprotocol/typescript-sdk · GitHub](https://github.com/modelcontextprotocol/typescript-sdk/releases?utm_source=chatgpt.com)
    
    
    
    
    本来であれば
    
    
    
    
    
    
      * MCP SDKを最新にアップデートする
    
    
      * input schemeを外しても問題ないかチェックする
    
    
      * 問題ある場合はsmart composerプラグイン側のforkも検討する
    
    
    
    
    というのが筋としては正しいかと思います。
    
    
    
    
    ですが、単純に私が個人的に使いたいだけの機能にそこまで手間をかけるのも何かと思い、今は言っていないです。今年のうちには言ってみようかな、とも思っています。
    
    
    
    
    ##  参考資料
    
    
    
    
    
    
      * [MCP SDK ソースコード](https://github.com/modelcontextprotocol/typescript-sdk)
    
    
      * [Smart Composer](https://www.smartcomposer.ai/)
    
    
      * [Todoist API ドキュメント](https://developer.todoist.com/)
    
    
      * [Pull Request](https://github.com/seino-tsuyoshi/todoist-mcp-server/pull/1)
    
    
    
    
    
    
    
    
