[iscript]
EmoteModule = {memoryInitializerPrefixURL:"./data/others/plugin/emote/driver/"};
[endscript]

;emote webGLプラグイン
[loadjs storage="plugin/emote/driver/emotedriver.js"]
[loadjs storage="plugin/emote/driver/emoteplayer_es5.js"]

;emote ティラノプラグイン
[loadjs storage="plugin/emote/tyrano_emote.js"]

[macro name=emote_logo]
[bg storage="../others/plugin/emote/media/emote_logo_bg.png" time=%time|500]
[iscript]

if(typeof mp.size == "undefined"){
    mp.size = "small";
}

tf.logo_file = "emote_logo/emote_logo_d2.emtbytes";

if(mp.size=="middle"){
    tf.logo_file = "emote_logo/emote_logo_d4.emtbytes";
}else if(mp.size=="large"){
    tf.logo_file = "emote_logo/emote_logo_d5.emtbytes";
}

[endscript]
[emote_new name="emote_logo" storage="&tf.logo_file" scale=1]

[emote_show name="emote_logo" left=0 top=0 ]

[wait time=500]
[emote_delete name="emote_logo" ]

[endmacro]
