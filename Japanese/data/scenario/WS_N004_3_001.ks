@sub_title storage="sub_title/WS_N004_3_001.jpg"
@bg storage=black.jpg time=100
@mes_normal


#
一直線に神社へと僕を導いたいそらは、[l][r]
無論、許可を取る訳も無く、一気に中へと僕を連れ込んだ。[l][r]
銛矢さんがいるなら、事情は僕から説明出来るけど……。[wsp]

@bg storage=jinja_naibu_0.jpg time=100
@ws_e_new name=isora

#
#山彦
「明かりは点いている……[l]銛矢さんか、家族の人は居るのかな……[l]うおっ」[wsp]

#
お、[l]驚いた、[l]死ぬほど驚いた。[l][r]
突然僕の視界に入ったのは、[wsp]

@bg storage=vis028_line00.jpg time=100

#
#山彦
「お、[l]御頭様か」[wsp]

#
鹿黒家で見たものと殆ど同じ、ヒトの頭を模した像だった。[wsp]

#
ヒトの首の形をしたものを捧げる、そんな伝承は資料に無かった。[l][r]
モノの力を守るために、秘して語られずにいた事とは何なんだ？[wsp]

@bg storage=jinja_naibu_0.jpg time=100
@ws_e_show name=isora
@ws_e_motion name="isora" motion="平常"
#
#いそら
「くる。[l]し。[l]くる。[l]し。[l]にげ。[l]にげ。[l]にげえ」[wsp]
@emote_motion name="isora" motion=stop
#
#山彦
「いそら？[l]　大丈夫か？！」[wsp]

@ws_e_motion name="isora" motion="平常"
#
#いそら
「くる。[l]し。[l]くる。[l]し」[wsp]
@emote_motion name="isora" motion=stop
#
#山彦
「いそら！！」[wsp]

#
僕は彼女の肩を掴んで揺らした。[l][r]
……しかし、[l]苦しいという言葉とは裏腹に、[l]いそらは平然としている。[l][r]
それどころか、[wsp]

@ws_e_motion name="isora" motion="sample_03"
#
#いそら
「そら。[l]くる。[l]にげ。[l]さもなくばし。[l]さもなくばし」[wsp]
@emote_motion name="isora" motion=stop
#
と、僕の手を再び引っ張る。[wsp]

#
#山彦
「だ、大丈夫なのか？[l]　ちょ、どこに行くんだ」[wsp]

@ws_e_hide name=isora


#
今井浜さんが大井宿の浴室に迷いなく向かったように、[l][r]
この神社の構造を知っているが如く、いそらはある一点目指して僕を連れて行く。[wsp]

#
#山彦
「しかももう何を言ってるのか解読不能だ、[l]まるで磯前さん……」[wsp]

#
そうだ、彼女はいったい？[l][r]
もし御頭様絡みの行動なら、ここに来ていてもおかしくはないが──[wsp]

#
#山彦
「──って、[l]なんだこれ……」[wsp]

#
いそらは、どこかの部屋へ僕を連れて行き、[l]
突然床を跳ね上げたのだった。[wsp]


@bg storage=black.jpg time=100

#
跳ね上げた──というより、[l][r]
そこに地下への入り口が設えてあり、その扉を開けた、[l]というのが正しい。[l][r]
まあ一般家庭でも、[l]台所に地下倉庫みたいなものはある。[l][r]
が、目の前のこれは──[wsp]

#
#山彦
「人の手で掘られたのか、天然洞窟なのか、[l]島の地下にこんなものが──」[wsp]

#
いそらは何も言わず、中に降りていく。[l][r]
流石に手は離してくれたが、僕が続けて降りるとすぐさま手を繋ぎ直し、[l][r]
足早に奥へといざなう。[wsp]



[wsp]
[wsp]
[wsp]
@bg storage=doukutsu_3.jpg time=500

#
轟音が響く。[l][r]
反響しまくっていて雨の音か波の音かは分からない。[l][r]
神社の屋内から直接来られるようになっていると言う事は、[l][r]
『その意味のある場所』なのだろう。[wsp]

#
──いやが上にも緊張は高まる。[l][r]
どう考えても、もう『この先』はない。[l][r]
いそらが連れて来ようとしたのは『ここ』なのだ。[wsp]

#
いそらが何故ここに僕を連れて来たのか、[l][r]
磯前さんの行方は、銛矢さんの安否は、[l][r]
そしてアリエは──[wsp]

#
#山彦
「…[l]…[l]…[l]…[l]あれは」[wsp]

#
突然、[l]視界が開けた。[wsp]

@bg storage=black.jpg time=100
@emote_delete name=isora

;▲▼
[eval exp="sf.WS_N004_3_001=1"][jump storage=ws_E000_007.ks ][s]
