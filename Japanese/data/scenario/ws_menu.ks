;メニュー画面
*start
;メッセージレイアクリア
[cm]
;固定レイヤークリア
[clearfix]
;キーボード有効化
[start_keyconfig]

@mes_no
@bg storage="ingamijima_0.jpg" time="100"
;レイヤを指定してフィルター効果
@filter layer=base sepia=100
[if exp="sf.ws_E000_001==1"][button x=60 y=20 target=*s01  graphic="menu/menu_subt_01.png"  enterimg="menu/menu_subt_on_01.png" ][endif]
[if exp="sf.WS_N001_002==1"][button x=60 y=80 target=*s02  graphic="menu/menu_subt_02.png"  enterimg="menu/menu_subt_on_02.png"][endif]
[if exp="sf.ws_E000_002==1"][button x=60 y=140 target=*s03  graphic="menu/menu_subt_03.png"  enterimg="menu/menu_subt_on_03.png"][endif]
[if exp="sf.ws_N001_004==1"][button x=60 y=200 target=*s04  graphic="menu/menu_subt_04.png"  enterimg="menu/menu_subt_on_04.png"][endif]
[if exp="sf.ws_E000_003==1"][button x=60 y=260 target=*s05  graphic="menu/menu_subt_05.png"  enterimg="menu/menu_subt_on_05.png"][endif]
[if exp="sf.ws_N001_005==1"][button x=60 y=320 target=*s06  graphic="menu/menu_subt_06.png"  enterimg="menu/menu_subt_on_06.png"][endif]
[if exp="sf.ws_E000_006==1"][button x=60 y=380 target=*s07  graphic="menu/menu_subt_07.png"  enterimg="menu/menu_subt_on_07.png"][endif]
[if exp="sf.WS_N002==1"][button x=60 y=440 target=*s08  graphic="menu/menu_subt_08.png"  enterimg="menu/menu_subt_on_08.png"][endif]
[if exp="sf.ws_E000_005==1"][button x=60 y=500 target=*s09  graphic="menu/menu_subt_09.png"  enterimg="menu/menu_subt_on_09.png"][endif]
[if exp="sf.WS_N003==1"][button x=60 y=560 target=*s10  graphic="menu/menu_subt_10.png"  enterimg="menu/menu_subt_on_10.png"][endif]
[if exp="sf.ws_E000_004==1"][button x=510 y=20 target=*s11  graphic="menu/menu_subt2_01.png"  enterimg="menu/menu_subt2_on_01.png"][endif]
[if exp="sf.WS_N004_1==1"][button x=510 y=80 target=*s12  graphic="menu/menu_subt2_02.png"  enterimg="menu/menu_subt2_on_02.png"][endif]
[if exp="sf.ws_E000_008==1"][button x=510 y=140 target=*s13  graphic="menu/menu_subt2_03.png"  enterimg="menu/menu_subt2_on_03.png"][endif]
[if exp="sf.WS_N004_3_001==1"][button x=510 y=200 target=*s14  graphic="menu/menu_subt2_04.png"  enterimg="menu/menu_subt2_on_04.png"][endif]
[if exp="sf.ws_E000_007==1"][button x=510 y=260 target=*s15  graphic="menu/menu_subt2_05.png"  enterimg="menu/menu_subt2_on_05.png"][endif]
[if exp="sf.WS_N004_3_002==1"][button x=510 y=320 target=*s16  graphic="menu/menu_subt2_06.png"  enterimg="menu/menu_subt2_on_06.png"][endif]
[if exp="sf.ws_E000_009==1"][button x=510 y=380 target=*s17  graphic="menu/menu_subt2_07.png"  enterimg="menu/menu_subt2_on_07.png"][endif]
[if exp="sf.WS_N004_3_003==1"][button x=510 y=440 target=*s18  graphic="menu/menu_subt2_08.png"  enterimg="menu/menu_subt2_on_08.png"][endif]
[if exp="sf.ws_E000_010==1"][button x=510 y=500 target=*s19  graphic="menu/menu_subt2_09.png"  enterimg="menu/menu_subt2_on_09.png"][endif]
[button x=510 y=580 target=*s20  graphic="menu/menu_back.png"  enterimg="menu/menu_back_on.png"]
[s]

*s01
[jump storage=ws_E000_001.ks ][s]
*s02
[jump storage=ws_N001_002.ks ][s]
*s03
[jump storage=ws_E000_002.ks ][s]
*s04
[jump storage=ws_N001_004.ks ][s]
*s05
[jump storage=ws_E000_003.ks ][s]
*s06
[jump storage=ws_N001_005.ks ][s]
*s07
[jump storage=ws_E000_006.ks ][s]
*s08
[jump storage=WS_N002.ks ][s]
*s09
[jump storage=ws_E000_005.ks ][s]
*s10
[jump storage=WS_N003.ks ][s]
*s11
[jump storage=ws_E000_004.ks ][s]
*s12
[jump storage=WS_N004_1.ks ][s]
*s13
[jump storage=ws_E000_008.ks ][s]
*s14
[jump storage=WS_N004_3_001.ks ][s]
*s15
[jump storage=ws_E000_007.ks ][s]
*s16
[jump storage=WS_N004_3_002.ks ][s]
*s17
[jump storage=ws_E000_009.ks ][s]
*s18
[jump storage=WS_N004_3_003.ks ][s]
*s19
[jump storage=ws_E000_010.ks ][s]


*s20
;戻るボタン
[jump storage=title.ks][s]

[s]



