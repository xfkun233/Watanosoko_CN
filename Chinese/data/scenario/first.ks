;一番最初に呼び出されるファイル

[title name="海之底，冲津神之　九段坂怪奇丛书"]

[stop_keyconfig]

;最初は右下のメニューボタンを非表示にする
@hidemenubutton

;ティラノスクリプトが標準で用意している便利なライブラリ群
;コンフィグ、CG、回想モードを使う場合は必須
@call storage="tyrano.ks"
@plugin name="emote"
@plugin name="theme_tyrano_05"
@plugin name="glyph"

;ゲームで必ず必要な初期化処理はこのファイルに記述するのがオススメ
@call storage="ws_macro.ks"
@glyph line="glyph.png" anime=rotateY width="20" height="20" cut="6"

;メッセージボックスは非表示
@layopt layer="message0" visible=false


@emote_logo

;タイトル画面へ移動
;@jump storage="ws_test.ks"
;@jump storage="ws_menu.ks"
@jump storage="title.ks"

[s]

