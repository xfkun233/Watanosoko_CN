; CG モード　画面作成
;=========================================

*cg_top
@layopt layer=message0 visible=false
@clearfix
@hidemenubutton
@cm
@bg storage=black.jpg time=100

[button x=70 y=30  target=*cg_01  graphic="cg_ss/gyohan_0.jpg  " enterimg=cg_s/gyohan_0.jpg" ]
[button x=365 y=30  target=*cg_02  graphic="cg_ss/vis021_line02.jpg  " enterimg=cg_s/vis021_line02.jpg" ]

[glink  x=50 y=580 color=white font_color=0x000000 storage=cg3.ks text="前のページ" size=20 width=150]
[glink  x=350 y=580 color=white font_color=0x000000 storage=title.ks text="タイトルへ戻る" size=20 width=150]
;[glink  x=680 y=580 color=white font_color=0x000000 storage=cg4.ks text="次のページ" size=20 width=150]

[s]

*cg_01
[ct][cm][bg storage="gyohan_0.jpg" time=1000][p][jump target=*cg_top][s]
*cg_02
[ct][cm]
@mes_no
@image  storage=vis021_line01.jpg layer=2 left=-960 visible=true name=ningyo
@anim name=ningyo left=0 time=10000
@wa
@bg storage=vis021_line02.jpg time=100
@layopt layer=2 visible=false
[p][jump target=*cg_top][s]

