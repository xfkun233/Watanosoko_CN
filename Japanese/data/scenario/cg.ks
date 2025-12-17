; CG モード　画面作成
;=========================================

*cg_top
@layopt layer=message0 visible=false
@clearfix
@hidemenubutton
@cm
@bg storage=black.jpg time=100

[button x=70 y=30  target=*cg_01  graphic="cg_ss/vis000_line03.jpg  " enterimg=cg_s/vis000_line03.jpg" ]
[button x=365 y=30  target=*cg_02  graphic="cg_ss/vis004_line02.jpg  " enterimg=cg_s/vis004_line02.jpg" ]
[button x=660 y=30  target=*cg_03  graphic="cg_ss/vis001_line01.jpg  " enterimg=cg_s/vis001_line01.jpg" ]
[button x=70 y=210  target=*cg_04  graphic="cg_ss/vis002_line01.jpg  " enterimg=cg_s/vis002_line01.jpg" ]
[button x=365 y=210  target=*cg_05  graphic="cg_ss/vis006_line01.jpg  " enterimg=cg_s/vis006_line01.jpg" ]
[button x=660 y=210  target=*cg_06  graphic="cg_ss/vis007_line01.jpg  " enterimg=cg_s/vis007_line01.jpg" ]
[button x=70 y=390  target=*cg_07  graphic="cg_ss/vis003_line02.jpg  " enterimg=cg_s/vis003_line02.jpg" ]
[button x=365 y=390  target=*cg_08  graphic="cg_ss/vis013_line01.jpg  " enterimg=cg_s/vis013_line01.jpg" ]
[button x=660 y=390  target=*cg_09  graphic="cg_ss/vis012_line01.jpg  " enterimg=cg_s/vis012_line01.jpg" ]

;[glink  x=50 y=580 color=white font_color=0x000000 storage=cg.ks text="前のページ" size=20 width=150]
[glink  x=350 y=580 color=white font_color=0x000000 storage=title.ks text="タイトルへ戻る" size=20 width=150]
[glink  x=680 y=580 color=white font_color=0x000000 storage=cg2.ks text="次のページ" size=20 width=150]

[s]

*cg_01
[ct][cm][bg storage="vis000_line03.jpg" time=1000][p][jump target=*cg_top][s]
*cg_02
[ct][cm][bg storage="vis004_line02.jpg" time=1000][p][jump target=*cg_top][s]
*cg_03
[ct][cm][bg storage="vis001_line01.jpg" time=1000][p][jump target=*cg_top][s]
*cg_04
[ct][cm][bg storage="vis002_line01.jpg" time=1000][p][jump target=*cg_top][s]
*cg_05
[ct][cm][bg storage="vis006_line01.jpg" time=1000][p][jump target=*cg_top][s]
*cg_06
[ct][cm][bg storage="vis007_line01.jpg" time=1000][p][jump target=*cg_top][s]
*cg_07
[ct][cm][bg storage="vis003_line02.jpg" time=1000][p][jump target=*cg_top][s]
*cg_08
[ct][cm][bg storage="vis013_line01.jpg" time=1000][p][jump target=*cg_top][s]
*cg_09
[ct][cm][bg storage="vis012_line01.jpg" time=1000][p][jump target=*cg_top][s]



