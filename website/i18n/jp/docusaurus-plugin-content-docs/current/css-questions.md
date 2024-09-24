---
title: CSS に関する質問
---

[Front-end Job Interview Questions - CSS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md) の回答集です。提案や訂正のプルリクエストは大歓迎です！

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

### CSS セレクターの詳細度とは何ですか？それはどのようにはたらきますか？

ブラウザは CSS ルールの詳細度に応じて要素に表示するスタイルを決定します。ブラウザは特定の要素に一致するルールをすでに決定していると仮定します。マッチングルールの中で、詳細度は以下に基づいてルールごとに 4 つのカンマ区切り値 `a, b, c, d` が計算されます。

1. `a` は、インラインスタイルが使用されているかどうかです。プロパティの宣言が要素のインラインスタイルの場合、`a` は 1、そうでない場合は 0 になります。
2. `b` は ID セレクタの数です。
3. `c` はクラス、属性、擬似クラスセレクタの数です。
4. `d` はタグおよび擬似要素セレクタの数です。

得られる詳細度はスコアではなく、列ごとに値を比較できる行列です。セレクターを比較して詳細度が最も高いものを判断するときは、左から右に向かって見て、各列の最高値を比較してください。したがって、`b` 列の値は、`c` 列と `d` 列の値を上書きします。従って、`0, 1, 0, 0` の詳細度は、`0, 0, 10, 10` より上です。

等しい詳細度の場合：最後に与えられたルールが適用されます。（内部または外部に関係なく）スタイルシートに同じルールを 2 回書いた場合、スタイルシートのより下部に書かれたルールがより詳細度が高いとみなされ適用されます。

私は低詳細度の CSS ルールを作成して、必要に応じて簡単に上書きできるようにしています。CSS の UI コンポーネントライブラリのコードを記述する際には、詳細度が低いことが重要です。詳細度を上げるためだけに複雑すぎる CSS ルールを使用したり、`!important` を利用させることは避けるべきなのです。

###### 参考

- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

### "リセット" と "ノーマライズ" CSS の違いは何ですか？あなたはどちらを使いますか？そしてそれはなぜですか？

- **リセット** - リセットとは、要素のすべてのデフォルトブラウザスタイルを削除することを意味します。例えば、`margin`、`padding`、`font-size` は全て同じ要素にリセットされます。一般的なタイポグラフィー要素のためにスタイリングを再宣言しなければなりません。
- **ノーマライズ** - ノーマライズでは、すべてのスタイルを削除するのではなく、有用なデフォルトスタイルは保持します。合わせて、一般的なブラウザの依存関係のバグを修正します。

私は非常にカスタマイズされた、または一般的ではないデザインのサイトを作成する際にはリセットを選択します。これらの場合、自分のスタイリングをたくさん行う必要があり、デフォルトのスタイリングを保存する必要がないためです。

###### 参考

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

### `float` とは何ですか？どのようにはたらきますか？

Float は CSS の位置決めプロパティです。フロート要素はページの流れの一部として残り、ページのフローから削除される `position: absolute` 要素とは異なり、他の要素（たとえば、フロート要素の周りを流れるテキスト）の配置に影響します。

CSS の `clear` プロパティは、`left`/`right`/`both` フロート要素の下に配置するために使用できます。

親要素にフロート要素だけが含まれている場合、その高さは何も折りたたまれません。これは、フロートの後のフロートをコンテナの中で、コンテナが閉じる前にクリアすることで修正できます。

`.clearfix` ハックは、巧妙な CSS 疑似セレクタ（`:after`）を使ってフロートをクリアします。親にオーバーフローを設定するのではなく、クラス `clearfix` を追加します。次に、この CSS を適用します：

```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

あるいは、親要素に `overflow: auto` または `overflow: hidden` プロパティを与えると、子要素の中に新しいブロック書式設定コンテキストが確立され、子要素を含むように展開されます。

###### 参考

- https://css-tricks.com/all-about-floats/

### `z-index` とは何かと、スタックコンテキスト(スタック文脈)がどのように作られるのかを教えてください。

CSS の `z-index` プロパティは、重なっている要素の垂直方向の積み重ね順序を制御します。`z-index` は `static` ではない `position` 値を持つ要素にのみ影響します。

`z-index` 値がなければ、要素は DOM に現れる順番でスタックされます（同じ階層レベルの下位のものが一番上に表示されます）。静的でない位置付けの要素（およびそれらの子要素）は、HTML 階層に関係なく、常にデフォルトの静的配置を持つ要素の上に表示されます。

スタックコンテキスト(スタック文脈)は、一連のレイヤーを含む要素です。ローカルスタッキングコンテキストでは、その子の `z-index` 値はドキュメントルートではなく、その要素に相対して設定されます。そのコンテキスト外のレイヤー、つまりローカルスタッキングコンテキストの兄弟要素は、レイヤー内にレイヤーを置くことはできません。要素 B が要素 A の上に座っている場合、要素 C の子要素は要素 B よりも高くなることはありません。

各スタッキングコンテキストは自己完結型です。要素の内容が積み重ねられた後、要素全体が親スタッキングコンテキストの積み重ね順に考慮されます。いくつかの CSS プロパティは、1 未満の `opacity`、`none` ではない `filter`、`none` でない `transform` のような新しいスタッキングコンテキストを引き起こします。

###### 参考

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context (英語)
- https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context (日本語)

### ブロック整形文脈（Block Formatting Context: BFC）とその仕組みを教えてください。

ブロック整形文脈（Block Formatting Context: BFC）は、ブロックボックスが配置された Web ページのビジュアル CSS レンダリングの一部です。フロート、絶対配置要素、`inline-blocks`、`table-cells`、`table-caption`、`visible` 以外の `overflow` を持つ要素（その値がビューポートに伝播された時を除く）書式設定コンテキストをブロックします。

BFC は、以下の条件の少なくとも 1 つを満たす HTML ボックスです。

- `float` の値は `none` ではありません。
- `position` の値は `static` でも `relative` でもありません。
- `display` の値は `table-cell`、`table-caption`、`inline-block`、`flex`、`inline-flex` です。
- `overflow` の値は `visible` ではありません。

BFC では、各ボックスの左端が包含ブロックの左端に接します（右から左への書式設定、右端からのタッチ）。

BFC が崩壊したときに隣接するブロックレベルボックス間の垂直マージンです。詳しくは [collapsing margins](https://www.sitepoint.com/web-foundations/collapsing-margins/) を読んでください。

###### 参考

- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context (英語)
- https://developer.mozilla.org/ja/docs/Web/CSS/Block_formatting_context (日本語)
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

### clear を行う手法にはどのようなものがあり、それぞれどのような状況に適していますか？

- 空の `div` メソッド - `<div style="clear:both;"></div>`
- Clearfix メソッド - 上記の `.clearfix` クラスを参照してください。
- `overflow: auto` または `overflow: hidden` メソッド - 親は新しいブロック書式設定コンテキストを確立し、float された子を含むように展開します。

大規模なプロジェクトでは、ユーティリティ `.clearfix` クラスを作成し、必要な場所で使用します。子供が親よりも背が高く、それほど理想的でない場合、`overflow: hidden` は子供をクリップするかもしれません。

### CSS スプライトとは何ですか？ページやサイトに実装する方法も合わせて説明してください。

CSS スプライトは、複数のイメージを 1 つの大きなイメージに結合します。これは一般的にアイコン用の技術です（Gmail が使用しています）。それを実装する方法：

1. スプライトジェネレータを使用して、複数の画像を 1 つにまとめ、適切な CSS を生成します。
1. それぞれのイメージは、`background-image`、`background-position` と `background-size` プロパティが定義された、対応する CSS クラスを持ちます。
1. そのイメージを使用するには、対応するクラスを要素に追加します。

**利点:**

- 複数のイメージに対する HTTP リクエストの数を減らす（スプライトシートごとに 1 回のリクエストが 1 回だけ必要）。しかし、HTTP2 では複数のイメージを読み込むことはもはや大きな問題にはなりません。
- 必要なまでダウンロードされないアセットの事前ダウンロード。例えば、`:hover` 疑似ステートにのみ現れるイメージ。点滅は見られない。

###### 参考

- https://css-tricks.com/css-sprites/

### ブラウザ固有のスタイリングに関する問題を解決するにはどうすればいいですか？

- 問題を特定して問題のブラウザを特定したら、その特定のブラウザが使用されているときにのみロードする別のスタイルシートを使用します。この手法では、サーバー側のレンダリングが必要です。
- これらのスタイリングの問題を既に処理している Bootstrap のようなライブラリを使用してください。
- ベンダープレフィックスをコードに自動的に追加するには、`autoprefixer` を使用します。
- Reset CSS または Normalize.css を使用してください。

### 機能の少ないブラウザに対しては、どのようにページを提供しますか？どのようなテクニック/プロセスを使用しますか？

- グレースフル・デグラデーション（Graceful degradation） - 最新のブラウザー用のアプリケーションを構築し、古いブラウザーでは機能し続けることを保証する習慣。
- プログレッシブ・エンハンス（Progressive Enhancement） - 基本レベルのユーザーエクスペリエンスのためのアプリケーションを構築するが、ブラウザーがそれをサポートするときに機能拡張を追加するプラクティス。
- 機能のサポートを確認するには、[caniuse.com](https://caniuse.com/) を使用してください。
- 自動ベンダー接頭辞挿入のための\*オートプレフィクサー。
- [Modernizr](https://modernizr.com/) を使った機能の検出

### コンテンツを視覚的に隠す（スクリーンリーダーのみ利用可能にする）方法にはどのようなものがありますか？いくつか教えてください。

これらの技術はアクセシビリティ（a11y）に関連しています。

- `width: 0; height: 0`： 要素が画面上のスペースを全く占めないようにして、それを表示しないようにします。
- `position: absolute; left: -99999px`： 画面の外側に配置します。
- `text-indent: -9999px`： これは `block` 要素内のテキストに対してのみ機能します。
- メタデータ： たとえば、Schema.org、RDF、JSON-LD を使用します。
- WAI-ARIA： Web ページのアクセシビリティを向上させる方法を指定する W3C の技術仕様。

WAI-ARIA が理想的な解決策かもしれませんが、私は `absolute` による位置決定手法を採用しています。注意すべきことが少なく、ほとんどの要素に対応している簡単な手法だからです。

###### 参考

- https://www.w3.org/TR/wai-aria-1.1/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA (英語)
- https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA (日本語)
- http://a11yproject.com/

### グリッドシステムを使用したことがありますか？使ったことがあるなら、あなたはどのグリッドシステムが好きですか？

私は `float` ベースのグリッドシステムが好きです。なぜなら、既存の代替システム（フレックス、グリッド）の中でも最も多くのブラウザをサポートしているからです。ブートストラップで長年使用されており、動作することが証明されています。

### メディアクエリやモバイル固有のレイアウト/CSS を使用したり実装したことはありますか？

はい。一例は、ピル型ナビゲーションを、特定のブレークポイントを越えた固定底のタブ型ナビゲーションに変換することである。

### SVG のスタイリングについては詳しいですか？

いいえ...悲しいことに。

### `screen` 以外の @media プロパティの例を挙げられますか？

はい、@media プロパティには `screen` も含めて４つの種類があります。:

- `all` - 全てのデバイス
- `print` - プリンター
- `speech` - ページを読み上げるスクリーンリーダー
- `screen` - コンピュータスクリーンやタブレット、スマートフォンなど

`print` メディアタイプの使い方の例:

```css
@media print {
  body {
    color: black;
  }
}
```

### 効率的な CSS を書くにために避けるべき "落とし穴" にはどんなものがありますか？

まず、ブラウザがセレクタを右端（キーセレクタ）から左に一致させることを理解してください。ブラウザはキーセレクタに従って DOM 内の要素をフィルタリングし、親要素を走査して一致を判定します。セレクターチェーンの長さが短いほど、ブラウザーはそのエレメントがセレクターと一致するかどうかを判別することができます。したがって、タグセレクタとユニバーサルセレクタであるキーセレクタは避けてください。それらは多数の要素にマッチし、ブラウザは親がマッチするかどうかを判断するために多くの作業をする必要があります。

[BEM (Block Element Modifier)](https://bem.info/)の方法論では、すべてが単一のクラスを持ち、階層が必要な場合はクラス名にも焼き付けられることが推奨されています。セレクタは効率的かつ簡単にオーバーライドできます。

どの CSS プロパティがリフロー、再描画、および合成をトリガするかに注意してください。可能であれば、レイアウト（トリガーリフロー）を変更するスタイルを書くのは避けてください。

###### 参考

- https://developers.google.com/web/fundamentals/performance/rendering/
- https://csstriggers.com/

### CSS プリプロセッサを使用するメリットとデメリットには何がありますか？

**メリット:**

- CSS のメンテナンス性が向上しました。
- ネストされたセレクタを書きやすい。
- 一貫したテーマ設定のための変数。異なるプロジェクト間でテーマファイルを共有できます。
- ミックスインは繰り返し CSS を生成します。
- あなたのコードを複数のファイルに分割する。CSS ファイルも分割することができますが、そのためには各 CSS ファイルをダウンロードするための HTTP リクエストが必要です。

**デメリット:**

- 前処理のためのツールが必要です。再コンパイル時間が遅くなることがあります。

### 使用したことのある CSS プリプロセッサについて好きなものと嫌いなものを教えてください。

**好きなもの:**

- 主に上記の利点。
- Less は JavaScript で書かれており、Node でうまくいきます。

**嫌いなもの:**

- C++ で書かれた LibSass のバインディングである `node-sass` を使って Sass を使用します。ノードのバージョンを切り替えるときに、頻繁に再コンパイルする必要があります。
- Less では、変数名の先頭に `@` が付いています。これは `@media`、`@import`、`@font-face` ルールなどのネイティブ CSS キーワードと混同することがあります。

### 非標準フォントを使用する Web サイトを実装するにはどのようにしますか？

`font-face` を使って `font-weight` の `font-family` を定義してください。

### CSS セレクタにマッチする要素がどれなのか、ブラウザがどのように決定しているかを説明してください。

この部分は上記の効率的な CSS の記述に関するものです。ブラウザはセレクタを右端（キーセレクタ）から左に一致させます。ブラウザはキーセレクタに従って DOM 内の要素をフィルタリングし、親要素を走査して一致を判定します。セレクタチェーンの長さが短ければ短いほど、ブラウザがその要素がセレクタに一致するかどうかを判断することができます。

たとえば、このセレクタ `p span` では、ブラウザはまずすべての `<span>` 要素を見つけ、その親をルートまですべてトラバースして `<p>` 要素を探します。特定の `<span>` については、`<p>` が見つかると直ちに `<span>` がマッチし、マッチングを止めることができます。

###### 参考

- https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

### 疑似要素について説明し、それらがなんのために使われているかを詳しく話してください。

CSS 疑似要素はセレクタに追加されたキーワードで、選択した要素の特定の部分をスタイルすることができます。マークアップ(`:before`, `:after`)を変更しなくても、マークアップ(combined with `content: ...`)への要素の追加やデコレーション(`:first-line`, `:first-letter`) に使用できます。

- `:first-line` と `:first-letter` を使ってテキストを装飾することができます。
- 上記の `.clearfix` ハックで、`clear:both` でゼロスペースの要素を追加するために使用されます。
- ツールチップの三角形の矢印は `:before` と `:after` を使います。三角形は実際には DOM ではなくスタイリングの一部とみなされるため、懸念の分離を促します。追加の HTML 要素を使用せずに CSS スタイルだけで三角形を描画することは、実際には不可能です。

###### 参考

- https://css-tricks.com/almanac/pseudo-selectors/b/after-and-before/

### ボックスモデルがなんであるかのあなたの理解と、異なるボックスモデルでレイアウトをレンダリングするために CSS でブラウザに指示する方法を説明してください。

CSS ボックスモデルは、ドキュメントツリー内の要素に対して生成され、視覚的な書式設定モデルに従ってレイアウトされた長方形のボックスを記述します。各ボックスは、内容領域（例えば、テキスト、画像など）および任意の周囲の「パディング」、「ボーダー」および「マージン」領域を有する。

CSS ボックスモデルは、次の計算を行います。

- ブロック要素がどれくらいのスペースを占めるか。
- 枠線や余白が重なるかどうか、または折りたたむかどうか。
- ボックスの寸法。

ボックスモデルには次の規則があります。

- ブロック要素の大きさは、`width`、`height`、`padding`、`border` および `margin` によって計算されます。
- `height` が指定されていない場合、ブロック要素は含まれている内容と同じくらい高くなります（フロートがない限り、以下参照）。
- `width` が指定されていない場合、フロートのブロック要素は、その親の幅から `padding` の幅に収まるように展開されます。
- 要素の `height` は内容の `height` によって計算されます。
- 要素の `width` は内容の `width` によって計算されます。
- デフォルトでは、`padding` と `border` は要素の `width` と `height` の一部ではありません。

###### 参考

- https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model

### `* { box-sizing: border-box; }` によって何が起きますか？その利点は何ですか？

- デフォルトでは、要素には `box-sizing: content-box` が適用され、コンテンツサイズのみが考慮されます。
- `box-sizing：border-box` は、要素の `width` と `height` がどのように計算されるかを変更し、`border` と `padding` も計算に含めます。
- 要素の `height` は、コンテンツの `height` + 垂直 `padding` + 垂直 `border` 幅によって計算されます。
- 要素の `width` は、コンテンツの `width` + 水平 `padding` + 水平 `border` 幅によって計算されます。

### CSS の `display` プロパティとは何ですか？その使い方の例をいくつか挙げることができますか？

- `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`

TODO

### `inline` と `inline-block` の違いは何ですか？

比較のために `block` も並べます。

|  | `block` | `inline-block` | `inline` |
| --- | --- | --- | --- |
| サイズ | 親要素の幅と同じになる。 | 要素によって変わる。 | 要素によって変わる。 |
| ポジショニング | 新しい行から始まり、隣に要素を並べられない。(`float`を使う場合を除く) | 他の要素とフローし、隣に要素を並べることができる。 | 他の要素とフローし、隣に要素を並べることができる。 |
| `width` と `height` の指定ができるか | はい | はい | いいえ、設定をしても無視される。 |
| `vertical-align` を指定できるか | いいえ | はい | はい |
| マージンとパディング | 上下左右に指定できる。 | 上下左右に指定できる。 | 左右のみ指定可能。上下に指定をしてもレイアウトに影響はない。 `border` と `padding` が要素の周りに視覚的に現れていても、上下のスペースは `line-height` によって決まる。 |
| フロート | - | - | 上下の `margins` と `paddings` を設定できる `block` 要素のようになる。 |

### `position` が `relative`、`fixed`、`absolute`、`static` の要素の違いは何ですか？

配置された要素は、計算された `position` プロパティが `relative`、`absolute`、`fixed` または `sticky` のいずれかである要素です。

- `static` - デフォルトの位置です。要素は通常どおりページに流れます。`top`、`right`、`bottom`、`left`、`z-index` プロパティは適用されません。
- `relative` - 要素の位置は、レイアウトを変更することなく、それ自体に対して相対的に調整されます（したがって、配置されていなかった要素の隙間を残します）。
- `absolute` - 要素は、ページのフローから削除され、もしあれば、最も近い位置にある祖先に対して指定された位置に置かれます。絶対配置されたボックスは余白を持つことができ、他の余白と一緒に折り畳まれることはありません。これらの要素は他の要素の位置に影響しません。
- `fixed` - 要素は、ページのフローから削除され、ビューポートに対して指定された位置に配置され、スクロールすると移動しません。
- `sticky` - スティッキーポジショニングは、相対位置と固定位置のハイブリッドです。要素は、指定されたしきい値を超えるまで、相対的な位置として扱われます。その時点で、`fixed` の位置として扱われます。

###### 参考

- https://developer.mozilla.org/en/docs/Web/CSS/position (英語)
- https://developer.mozilla.org/ja/docs/Web/CSS/position (日本語)

### ローカルや本番環境で、どの既存の CSS フレームワークを使用していますか？また、どのように変更/改善していますか？

- **BootStrap** - 緩やかなリリースサイクル。BootStrap4 は、ほぼ 2 年間アルファになっています。広く使用されているように、スピナーボタンコンポーネントを追加します。
- **Semantic UI** - ソースコード構造により、テーマのカスタマイズが非常に難しくなります。慣習的でないテーマ設定システムでカスタマイズするのは面倒です。ベンダライブラリ内のハードコードされた設定パス。BootStrap とは違って、変数をオーバーライドするためにうまく設計されていません。
- **Bulma** - 非セマンティックで余計なクラスやマークアップが必要です。下位互換性がありません。バージョンをアップグレードすると、微妙な方法でアプリが壊れてしまいます。

### CSS の Flexbox や Grid の仕様で遊んだことはありますか？

はい。Flexbox は主に 1 次元レイアウトを意味し、Grid は 2 次元レイアウトを意味します。

Flexbox は、コンテナ内の要素の垂直方向のセンタリング、スティッキーフッターなど、CSS の多くの一般的な問題を解決します。ブートストラップと Bulma は Flexbox をベースにしています。Flexbox を試してみましたが、`flex-grow` を使っていくつかのブラウザの非互換性問題（Safari）に遭遇しました。そして `inline-blocks` と % で幅を計算するコードを書き直さなければなりませんでした。

グリッドは、グリッドベースのレイアウトを作成するための最も直観的なアプローチです（より良い！）が、ブラウザのサポートは現時点では広くはありません。

###### 参考

- https://philipwalton.github.io/solved-by-flexbox/

### ウェブサイトをレスポンシブでコーディングすることとモバイルファーストでコーディングすることの違いを説明できますか？

TODO

### レスポンシブデザインはアダプティブデザインと何が違いますか？

応答性と適応性の両方の設計では、さまざまなデバイス間でユーザーエクスペリエンスを最適化し、異なるビューポートサイズ、解像度、使用状況、制御メカニズムなどを調整します。

レスポンシブなデザインは、柔軟性の原則 - すべてのデバイスで見た目がよくなる単一の流体ウェブサイト - で動作します。レスポンシブなウェブサイトは、メディアクエリ、フレキシブルグリッド、および反応性の高いイメージを使用して、多数の要因に基づいて柔軟に変化するユーザーエクスペリエンスを作り出します。1 つのボールが成長したり、収縮して複数の異なるフープに収まるようにします。

アダプティブ・デザインは、プログレッシブ・エンハンスメントの現代的定義にもっと似ています柔軟なデザインではなく、デバイスやその他の機能を検出し、あらかじめ定義された一連のビューポートサイズやその他の特性に基づいて適切な機能とレイアウトを提供します。サイトは使用されているデバイスのタイプを検出し、そのデバイスのプリセットレイアウトを配信します。1 つのボールがいくつかの異なるサイズのフープを通過する代わりに、フープサイズに応じていくつかの異なるボールを使用できます。

###### 参考

(英語)

- https://developer.mozilla.org/ja/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design (日本語)
- http://mediumwell.com/responsive-adaptive-mobile/
- https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

### Retina 対応を行ったことはありますか？もしあるなら、いつどのようなテクニックを使いましたか？

私は Retina ディスプレイを扱うために高解像度のグラフィックス（ディスプレイサイズの 2 倍）を使用する傾向があります。より良い方法は `@media only screen and (min-device-pixel-ratio: 2) { ... }` のようなメディアクエリを使用し、`background-image` を変更することです。

アイコンについては、解像度に関係なく非常に鮮明に表示されるため、可能であれば svgs とアイコンフォントを使用することを選択します。

もう一つの方法は JavaScript を使って、`<img>` `src` 属性を `window.devicePixelRatio` 値をチェックした後、より高解像度のバージョンに置き換えることです。

###### 参考

- https://www.sitepoint.com/css-techniques-for-retina-displays/

### `position: absolute` の代わりに `translate()` を使用するべき場合はありますか？その逆の場合もありますか？理由も合わせて教えてください。

`translate()` は CSS の `transform` の値です。`transform` や `opacity` を変更しても、ブラウザのリフローや再描画は行われず、コンポジションのみがトリガされます。`transform` はブラウザに要素の GPU 層を作成させますが、絶対配置プロパティを変更すると CPU を使用します。したがって、`translate()` はより効率的であり、より滑らかなアニメーションのためのペイント時間を短縮します。

`translate()` を使用すると、要素は絶対位置を変更するのとは異なり、元のスペースを使います（`position: relative` のようなもの）。

###### 参考

- https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

### 他の方の回答集

- https://neal.codes/blog/front-end-interview-css-questions
- https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/