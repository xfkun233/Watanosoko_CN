;わたのそこ　マクロ設定
;このゲームで登場するキャラクターを宣言
@chara_new name="ajiro_c" storage="chara/ajiro_00.png" jname="網代"
@chara_new name="arie_c" storage="chara/arie_00.png" jname="アリエ"
@chara_new name="arumi_c" storage="chara/arumi_00.png" jname="アルミ"
@chara_new name="isora_c" storage="chara/isora_01.png" jname="いそら"
@chara_new name="jihei_c" storage="chara/jihei_00.png" jname="地平"
@chara_new name="kizashi_c" storage="chara/kizashi_01.png" jname="キザシ"
@chara_new name="moriya_c" storage="chara/moriya_00.png" jname="銛矢"
@chara_new name="raia_c" storage="chara/raia_00.png" jname="ライア"
@chara_new name="shiro_c" storage="chara/shiro_00.png" jname="士朗"
@chara_new name="sonoko_c" storage="chara/sonoko_01.png" jname="ソノコ"

;キャラクターの名前が表示される文字領域
@free name="chara_name_area" layer="message0"
@ptext name="chara_name_area" layer="message0" color="white" size=24 x=50 y=455
@chara_config ptext="chara_name_area"

;-----------------------------------------------------------------------------------
;サブタイトル
[macro name=sub_title]
@stopbgm
@hidemenubutton
@cm
@mes_no
@clearfix
@free_filter
@start_keyconfig
@bg storage=%storage time=2000
@p
[endmacro]
;-----------------------------------------------------------------------------------
[macro name=lr]
[l][r]
[endmacro]
;改行アイコン表示用
[macro name=wsp]
[graph storage="glyph3.png"][p]
[endmacro]
;-----------------------------------------------------------------------------------
;メッセージ非表示
[macro name=mes_no]
@cm
@clearfix
@layopt layer=message1 visible=false
@layopt layer=message0 visible=false
[endmacro]
;-----------------------------------------------------------------------------------
;メッセージを全画面に切り替え
[macro name=mes_all]
@cm
@ct
@clearfix
@add_theme_button
@position layer="message0" left=0 top=0 width=960 height=640 page=fore visible=true
@position layer="message0" marginl=15 marginr=15 margint=15 marginb=15
@layopt layer=message0 visible=true
@layopt layer=message1 visible=false
@current  layer=message0
[endmacro]
;-----------------------------------------------------------------------------------
;メッセージを通常に切り替え
[macro name=mes_normal]
@cm
@ct
@add_theme_button
;メッセージウィンドウの設定
@position layer="message0" frame="frame.png" left=0 top=440 width=960 height=210 page=fore visible=true
;文字が表示される領域を調整
@position layer=message0 page=fore margint=40 marginl=40 marginr=40 marginb=45
;メッセージウィンドウ非表示
@layopt layer=message1 visible=false
@layopt layer=message0 visible=true
@current  layer=message0
[endmacro]
;-----------------------------------------------------------------------------------
;Emote表示テスト用のマクロの設定
;Emote初期化
[macro name=ws_e_new]
[if exp="mp.name=='ajiro'"][emote_new name=%name jname="網代" storage=ajiro_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='arie'"][emote_new name=%name jname="アリエ" storage=arie_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='arumi'"][emote_new name=%name jname="アルミ" storage=arumi_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='isora'"][emote_new name=%name jname="いそら" storage=isora_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='jihei'"][emote_new name=%name jname="地平" storage=jihei_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='kizashi'"][emote_new name=%name jname="キザシ" storage=kizashi_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='moriya'"][emote_new name=%name jname="銛矢" storage=moriya_emote_01.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='raia'"][emote_new name=%name jname="ライア" storage=raia_emote_01.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='shiro'"][emote_new name=%name jname="士朗" storage=shiro_emote_00.emtbytes scale=0.5 layer=2][endif]
[if exp="mp.name=='sonoko'"][emote_new name=%name jname="ソノコ" storage=sonoko_emote_02.emtbytes scale=0.5 layer=2][endif]
[endmacro]
;-----------------------------------------------------------------------------------
;Emoteキャラクター登場
[macro name=ws_e_show]
@image layer=1 storage="black.jpg"
@layopt layer=1 visible=true
@layopt layer=1 opacity=100
@layopt layer=2 visible=true
;@emote_show name=%name left=%left|-200 top=%top|100
@emote_show name=%name left=%left|0 top=%top|100
[endmacro]
;-----------------------------------------------------------------------------------
;Emoteキャラクター非表示
[macro name=ws_e_hide]
@layopt layer=1 visible=false
@layopt layer=2 visible=false
@emote_hide name=%name
[endmacro]
;-----------------------------------------------------------------------------------
;Emoteモーション設定
[macro name=ws_e_motion]
@emote_motion name=%name motion=%motion  wait=true
@emote_motion name=%name motion=kuchipaku
[endmacro]
;-----------------------------------------------------------------------------------

[return]
