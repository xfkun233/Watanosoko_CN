;エンドロール
@sub_title storage="sub_title/ws_ED.jpg"
#
@mes_no
@image  storage=endroll00.jpg layer=1 left=-6720 visible=true name=endroll
@bg storage="black.jpg"
@playbgm storage=wts_m16.ogg loop=false
@anim name=endroll left=0 time=290000
@stop_keyconfig

@wait time=10000
@image storage="ED/ED_txt01.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt02.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt03.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000


@wait time=10000
@image storage="ED/ED_txt04.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt05.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt06.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt07.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt08.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt09.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wait time=10000
@image storage="ED/ED_txt10.png" layer=2 time=10000 visible=true
@freeimage layer=2 time=5000

@wa
@start_keyconfig
@layopt layer=1 visible=false

@bg storage="sub_title/ws_ED_2.jpg" time=5000

@p
#
[eval exp="sf.ws_END=1"][jump storage=title.ks ][s]



