; CG モード　画面作成
;=========================================

*cg_top
@layopt layer=message0 visible=false
@clearfix
@hidemenubutton
@cm
@bg storage=black.jpg time=100

[button x=70 y=30  target=*cg_01  graphic="cg_ss/vis022_line00.jpg  " enterimg=cg_s/vis022_line00.jpg" ]
[button x=365 y=30  target=*cg_02  graphic="cg_ss/vis023_line00.jpg  " enterimg=cg_s/vis023_line00.jpg" ]
[button x=660 y=30  target=*cg_03  graphic="cg_ss/vis027_line00.jpg  " enterimg=cg_s/vis027_line00.jpg" ]
[button x=70 y=210  target=*cg_04  graphic="cg_ss/vis028_line00.jpg  " enterimg=cg_s/vis028_line00.jpg" ]
[button x=365 y=210  target=*cg_05  graphic="cg_ss/vis029_line00.jpg  " enterimg=cg_s/vis029_line00.jpg" ]
[button x=660 y=210  target=*cg_06  graphic="cg_ss/vis030_line00.jpg  " enterimg=cg_s/vis030_line00.jpg" ]
[button x=70 y=390  target=*cg_07  graphic="cg_ss/vis031_line00.jpg  " enterimg=cg_s/vis031_line00.jpg" ]
[button x=365 y=390  target=*cg_08  graphic="cg_ss/vis033_line00.jpg  " enterimg=cg_s/vis033_line00.jpg" ]
[button x=660 y=390  target=*cg_09  graphic="cg_ss/vis032_line00.jpg  " enterimg=cg_s/vis032_line00.jpg" ]



[glink  x=50 y=580 color=white font_color=0x000000 storage=cg2.ks text="前のページ" size=20 width=150]
[glink  x=350 y=580 color=white font_color=0x000000 storage=title.ks text="タイトルへ戻る" size=20 width=150]
[glink  x=680 y=580 color=white font_color=0x000000 storage=cg4.ks text="次のページ" size=20 width=150]

[s]

*cg_01
[ct][cm][bg storage="vis022_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_02
[ct][cm][bg storage="vis023_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_03
[ct][cm][bg storage="vis027_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_04
[ct][cm][bg storage="vis028_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_05
[ct][cm][bg storage="vis029_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_06
[ct][cm][bg storage="vis030_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_07
[ct][cm][bg storage="vis031_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_08
[ct][cm][bg storage="vis033_line00.jpg" time=1000][p][jump target=*cg_top][s]
*cg_09
[ct][cm][bg storage="vis032_line00.jpg" time=1000][p][jump target=*cg_top][s]



