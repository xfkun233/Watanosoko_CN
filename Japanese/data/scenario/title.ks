;タイトル画面
*start 

@cm
@ct
@free_filter 
@clearstack
@bg storage ="main_title.jpg" time=100
@playbgm storage=wts_m02.ogg
@wait time = 200

[button x=300 y=430  target="gamestart"  graphic="menu/menu_title_01.png"  enterimg="menu/menu_title_on_01.png" ]
[button x=300 y=470  role="load" graphic="menu/menu_title_02.png"  enterimg="menu/menu_title_on_02.png" ]
[if exp="sf.ws_E000_001==1"][button x=300 y=510 storage="ws_menu.ks"  graphic="menu/menu_title_03.png"  enterimg="menu/menu_title_on_03.png" ][endif]
[if exp="sf.ws_END==1"]
[button x=300 y=550 storage="cg.ks"  graphic="menu/menu_title_04.png"  enterimg="menu/menu_title_on_04.png" ]
[button x=300 y=590 storage="ws_bgm.ks"  graphic="menu/menu_title_05.png"  enterimg="menu/menu_title_on_05.png" ]
[endif]
[s]

*gamestart
@jump storage="ws_E000_001.ks"
@s
