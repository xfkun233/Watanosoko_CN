; BGMモード
;=========================================

*bgm_top
@layopt layer=message0 visible=false
@clearfix
@hidemenubutton
@cm
@bg storage=black.jpg time=100
[glink  x=50 y=50 color=gray font_color=0x000000 target=*cg_01 text="０１：コエナクシテナク（Short ver.）" size=15 width=350]
[glink  x=50 y=100 color=gray font_color=0x000000 target=*cg_02 text="０２：九段坂怪奇叢書" size=15 width=350]
[glink  x=50 y=150 color=gray font_color=0x000000 target=*cg_03 text="０３：あの日の日常" size=15 width=350]
[glink  x=50 y=200 color=gray font_color=0x000000 target=*cg_04 text="０４：心身に生じるひずみ" size=15 width=350]
[glink  x=50 y=250 color=gray font_color=0x000000 target=*cg_05 text="０５：ふさぐ" size=15 width=350]
[glink  x=50 y=300 color=gray font_color=0x000000 target=*cg_06 text="０６：うきウキの予感" size=15 width=350]
[glink  x=50 y=350 color=gray font_color=0x000000 target=*cg_07 text="０７：×【かける】" size=15 width=350]
[glink  x=50 y=400 color=gray font_color=0x000000 target=*cg_08 text="０８：シイなる伝え" size=15 width=350]
[glink  x=50 y=450 color=gray font_color=0x000000 target=*cg_09 text="０９：善の意にして背徳" size=15 width=350]

[glink  x=500 y=50 color=gray font_color=0x000000 target=*cg_10 text="１０：悪の意にして純粋" size=15 width=350]
[glink  x=500 y=100 color=gray font_color=0x000000 target=*cg_11 text="１１：迷走" size=15 width=350]
[glink  x=500 y=150 color=gray font_color=0x000000 target=*cg_12 text="１２：不都合の暴露(劇中未使用)" size=15 width=350]
[glink  x=500 y=200 color=gray font_color=0x000000 target=*cg_13 text="１３：アポカリプス" size=15 width=350]
[glink  x=500 y=250 color=gray font_color=0x000000 target=*cg_14 text="１４：余韻或いは蛇足" size=15 width=350]
[glink  x=500 y=300 color=gray font_color=0x000000 target=*cg_15 text="１５：純粋にして背徳" size=15 width=350]
[glink  x=500 y=350 color=gray font_color=0x000000 target=*cg_16 text="１６：コエナクシテナク（Full ver.）" size=15 width=350]
[glink  x=500 y=400 color=gray font_color=0x000000 target=*cg_17 text="１７：コエナクシテナク（Karaoke ver.）" size=15 width=350]

[glink  x=500 y=480 color=blue font_color=0x000000 target=*cg_stop text="再生停止" size=15 width=350]

[glink  x=350 y=580 color=white font_color=0x000000 storage=title.ks text="タイトルへ戻る" size=20 width=150]

[s]

*cg_01
[playbgm storage=wts_m01.ogg][jump target=*bgm_top][s]
*cg_02
[playbgm storage=wts_m02.ogg][jump target=*bgm_top][s]
*cg_03
[playbgm storage=wts_m03.ogg][jump target=*bgm_top][s]
*cg_04
[playbgm storage=wts_m04.ogg][jump target=*bgm_top][s]
*cg_05
[playbgm storage=wts_m05.ogg][jump target=*bgm_top][s]
*cg_06
[playbgm storage=wts_m06.ogg][jump target=*bgm_top][s]
*cg_07
[playbgm storage=wts_m07.ogg][jump target=*bgm_top][s]
*cg_08
[playbgm storage=wts_m08.ogg][jump target=*bgm_top][s]
*cg_09
[playbgm storage=wts_m09.ogg][jump target=*bgm_top][s]
*cg_10
[playbgm storage=wts_m10.ogg][jump target=*bgm_top][s]
*cg_11
[playbgm storage=wts_m11.ogg][jump target=*bgm_top][s]
*cg_12
[playbgm storage=wts_m12.ogg][jump target=*bgm_top][s]
*cg_13
[playbgm storage=wts_m13.ogg][jump target=*bgm_top][s]
*cg_14
[playbgm storage=wts_m14.ogg][jump target=*bgm_top][s]
*cg_15
[playbgm storage=wts_m15.ogg][jump target=*bgm_top][s]
*cg_16
[playbgm storage=wts_m16.ogg][jump target=*bgm_top][s]
*cg_17
[playbgm storage=wts_m17.ogg][jump target=*bgm_top][s]

*cg_stop
[stopbgm][jump target=*bgm_top][s]



