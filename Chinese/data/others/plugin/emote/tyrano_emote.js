var map_emote_player = {};

EmotePlayer.createRenderCanvas(TYRANO.kag.config.scWidth, TYRANO.kag.config.scHeight);



/*
 #[emote_new]
 :group
 E-mote
 :title
 E-moteモデルの作成
 :exp
 E-moteモデルを定義します。実行時点ではまだモデルは表示されません。
 その後 [emote_show]タグで表示されます。
 :sample
 [emote_new name="emoko" left=100 top=200 ]
 :param
 name=モデル名を指定します,
 storage=ロードするモデルデータ(emtbytes)を指定します。データはプラグインフォルダ内のmodelフォルダ以下に配置してください。,
 layer=モデルを表示するレイヤを指定できます。デフォルトは0,
 page=backかforeを指定できます。デフォルトはfore,
 scale=モデルを表示する時のスケールを指定できます。デフォルトは１。例えば、1.5を指定すると1.5倍の大きさに拡大されます,
 left=モデルのヨコ、立ち位置を指定します。注意点として画面中央が 0 となり、ティラノの他の指定とは異なりますのでご注意ください。デフォルトは0,
 top=モデルのタテ、立ち位置を指定します。注意点として画面中央が 0 となり、ティラノの他の指定とは異なりますのでご注意ください。デフォルトは0,
 physics=物理演算の有効（true）、無効（false）を指定できます。デフォルトはtrue,
 motion=モデルのメインモーションを指定できます。,
 motion_1〜6=差分モーションを指定できます。motion1〜motion6まで設定することが可能 
 #[end]
 */
 
TYRANO.kag.ftag.master_tag.emote_new = {
    
    kag: TYRANO.kag,
	vital : ["storage"],
    	
    pm : {
        name:"",
        storage : "",
        width:"",
        height:"",
        scale:"1",
        left:"",
        top:"",
        x:"",
        y:"",
        physics:"false",
        opacity:"0",
        motion:"",
        
        layer:"0",
        page:"fore",
        
        motion_1:"",
        motion_2:"",
        motion_3:"",
        motion_4:"",
        motion_5:"",
        motion_6:"",
        
        next:"true"
    },

    start : function(pm) {
        
        var that = this;
        
        if (!EmoteDriver_Initialized) {
            setTimeout(function(){that.start(pm)}, 100);
            return;
        }
        
        var j_canvas = $('<canvas class="'+pm.name+' emote_model" id="emote_canvas_'+pm.name+'"></canvas>');
        j_canvas.css("position","absolute");
        j_canvas.css("opacity",parseInt(pm.opacity));
        
        if(pm.width==""){
            pm.width = TYRANO.kag.config.scWidth;
        }
        
        if(pm.height==""){
            pm.height = TYRANO.kag.config.scHeight;
        }
        
        j_canvas.attr("width",pm.width);
        j_canvas.attr("height",pm.height);
        
        /*
        if(pm.left!=""){
            j_canvas.css("left",parseInt(pm.left));
        }
        
        if(pm.top!=""){
            j_canvas.css("top",parseInt(pm.top));
        }
        */
        
        var player = new EmotePlayer(j_canvas.get(0));
        
        if(pm.physics=="true"){
            player.convolveCanvasMovementToPhysics=true;
        }
        
        if(pm.motion!=""){
            player.mainTimelineLabel = pm.motion;
        }
        
        for(var i=1;i<7;i++){
            
            if(pm["motion_"+i] != ""){
                player["diffTimelineSlot"+i ] = pm["motion_"+i];
            }
        
        }
        
        if(pm.x!="") pm.left = pm.x;
        if(pm.y!="") pm.top = pm.y;
       
        
        var left = 0;
        var top = 0;
        
        if(pm.left!=""){
            left = parseInt(pm.left);
        }
        
        if(pm.top!=""){
            top = parseInt(pm.top);
        }

        player.setCoord(left, top, 1, -1);
                
        map_emote_player[pm.name] = {};
        map_emote_player[pm.name]["player"] = player
        map_emote_player[pm.name]["canvas"] = j_canvas;
        
        //ステータスにモデル情報を配置する。
        if(!TYRANO.kag.stat.emote_models){
            TYRANO.kag.stat.emote_models={};
        }
        
        TYRANO.kag.stat.emote_models[pm.name] = pm;
        
        
        var target_layer = TYRANO.kag.layer.getLayer(pm.layer,pm.page);
        target_layer.show();
        target_layer.append(j_canvas);
        
        pm.storage = pm.storage.replace(".emtbytes","");
        
        player.loadDataFromURL("./data/others/plugin/emote/model/"+pm.storage+".emtbytes");
        // set chara scale
        player.scale = parseFloat(pm.scale);
        // play test timeline
        //player.mainTimelineLabel = 'sample_全自動_test';
        if(pm.next=="true"){
            TYRANO.kag.ftag.nextOrder();
        }
        
    }
        
};


/*
 #[emote_show]
 :group
 E-mote
 :title
 E-moteモデルの表示
 :exp
 E-moteモデルをゲーム画面に表示します。
 表示するためには予め[emote_new]タグでモデルを読み込んでおく必要があります。
 :sample
 [emote_new name="emoko"  ]
 [emote_show name="emoko" left=100 top=200 ]
 :param
 name=モデル名を指定します,
 scale=モデルを表示する時のスケールを指定できます。デフォルトは１。例えば、1.5を指定すると1.5倍の大きさに拡大されます,
 left=モデルのヨコ、立ち位置を指定します。注意点として画面中央が 0 となり、ティラノの他の指定とは異なりますのでご注意ください。デフォルトは0,
 top=モデルのタテ、立ち位置を指定します。注意点として画面中央が 0 となり、ティラノの他の指定とは異なりますのでご注意ください。デフォルトは0,
 time=モデルがフェードインで表示される時間をミリ秒で指定できます。デフォルトは1000
 #[end]
*/


TYRANO.kag.ftag.master_tag.emote_show = {
    
    kag: TYRANO.kag,
	vital : ["name"],
    pm:{
        name:"",
        left:"0",
        top:"0",
        x:"",
        y:"",
        scale:"",
        time:"1000"
        
    },

    start : function(pm) {
        
        var that = this;
        
        var j_canvas = map_emote_player[pm.name]["canvas"];
        var player = map_emote_player[pm.name]["player"];
        
        //プレイヤーの初期化が完了するまで待つ
        if (!player.initialized) {
            setTimeout(function(){that.start(pm)}, 100);
            return;
        }
        
        if(pm.x!="") pm.left = pm.x;
        if(pm.y!="") pm.top = pm.y;
       
        
        //位置情報の確認。
        var left = 0;
        var top = 0;
        if(pm.left!=""){
            left = parseInt(pm.left);
        }
        
        if(pm.top!=""){
            top = parseInt(pm.top);
        }

        player.setCoord(left, top, 1, -1);

        
        TYRANO.kag.stat.emote_models[pm.name]["left"] = pm.left;
        TYRANO.kag.stat.emote_models[pm.name]["top"] = pm.top;
        
        
        if(pm.scale!=""){
            player.scale = parseFloat(pm.scale);
            TYRANO.kag.stat.emote_models[pm.name]["scale"] = pm.scale;
        }
        
        TYRANO.kag.stat.emote_models[pm.name]["opacity"] = "1";
        
        
        j_canvas.animate(
            {
                "opacity":1
            },
            parseInt(pm.time),
            function(){
                TYRANO.kag.ftag.nextOrder();
            }
        );
        
        //canvas.style.opacity = 1;  
        
        
    }
        
};

/*
 #[emote_hide]
 :group
 E-mote
 :title
 E-moteモデルの非表示
 :exp
 E-moteモデルをゲーム画面から非表示にします。
 このタグや画面から非表示にするだけで、メモリ上には残ります。
 完全に使用しなくなったモデルは[emote_delete]タグで削除してください。
 :sample
 ;モデルの宣言
 [emote_new name="emoko"  ]
 ;モデルの表示
 [emote_show name="emoko" left=100 top=200 ]
 ;モデルの非表示
 [emote_hide name="emoko" time=2000]
 ;モデルの削除
 [emote_delete name="emoko"]
 :param
 name=モデル名を指定します,
 time=モデルがフェードアウトされる時間をミリ秒で指定できます。デフォルトは1000
 #[end]
*/


TYRANO.kag.ftag.master_tag.emote_hide = {
    
    kag: TYRANO.kag,
	vital : ["name"],
    pm:{
        name:"",
        time:"1000"
    },

    start : function(pm) {
        
        var j_canvas = map_emote_player[pm.name]["canvas"];
        
        TYRANO.kag.stat.emote_models[pm.name]["opacity"] = "0";
        
        j_canvas.animate(
            {
                "opacity":0
            },
            parseInt(pm.time),
            function(){
                TYRANO.kag.ftag.nextOrder();
            }
        );
        
        //canvas.style.opacity = 1;  
        
    }
        
};

/*
 #[emote_motion]
 :group
 E-mote
 :title
 E-moteモデルにモーションを設定する
 :exp
 E-moteモデルのモーションを再生します。
 予め[emote_new]タグでモデルを読み込んでおく必要があります。
 :sample
 [emote_new name="emoko"  ]
 [emote_show name="emoko" left=100 top=200 ]
 
 ;モーションの再生
 [emote_motion name="emote1" motion="sample_00" ]

 :param
 name=モデル名を指定します,
 motion=再生するモーション名を指定してください,
 slot=モーションのスロットを1-6の範囲で指定できます。差分モーションを設定する場合は数値を入れてください。デフォルトはメインモーション（main）,
 wait=モーションの再生が完了するまで待つか否かを指定できます。true or false 。デフォルトはfalse です。
 #[end]
*/


TYRANO.kag.ftag.master_tag.emote_motion = {
    
    kag: TYRANO.kag,
	vital : ["name","motion"],
    pm:{
        name:"",
        motion:"",
        slot:"main",
        wait:"false"
    },

    start : function(pm) {
        
        var j_canvas = map_emote_player[pm.name]["canvas"];
        var player = map_emote_player[pm.name]["player"];
        
        if(pm.slot=="main"){
            player.mainTimelineLabel = pm.motion ;
            TYRANO.kag.stat.emote_models[pm.name]["motion"] = pm.motion;
        }else{
            //player.diffTimelineFadeoutTime = fadeoutTime;
            player["diffTimelineSlot"+pm.slot] = pm.motion;
            TYRANO.kag.stat.emote_models[pm.name]["motion_"+pm.slot] = pm.motion;
        
        }
        
        
        if(pm.wait=="true"){
            
            if(!player.isLoopTimeline(pm.motion)){
                this.waitOrder(player,pm);
            }else{
                TYRANO.kag.ftag.nextOrder();
            }
            
        }else{
            TYRANO.kag.ftag.nextOrder();
        }
    },
    
    waitOrder:function(player,pm){
        
        var that = this;
        
        //モーションの再生完了を待つ
        if(player.isTimelinePlaying(pm.motion)){
            
            setTimeout(function(){
                that.waitOrder(player,pm);
            },100);
            
        }else{
                
            TYRANO.kag.ftag.nextOrder();
        }
    }
        
};

/*
 #[emote_delete]
 :group
 E-mote
 :title
 E-moteモデルを削除
 :exp
 E-moteモデルを完全に削除します。
 メモリ上からも排除されるため、不要になったモデルはこまめにdeleteしておきましょう。
 削除したモデルを再度、表示したい場合はもう一度[emote_new]タグから行います。
 :sample
 [emote_new name="emoko"  ]
 [emote_show name="emoko" left=100 top=200 ]
 [emote_hide name="emoko" ]
 
 ;完全に削除
 [emote_delete name="emoko" ]
 
 :param
 name=削除するモデル名を指定します
 #[end]
*/

TYRANO.kag.ftag.master_tag.emote_delete = {
    
    kag: TYRANO.kag,
	vital : ["name"],
    pm:{
        name:"",
        next:"true"
    },

    start : function(pm) {
        
        if(map_emote_player[pm.name]){
            
            var j_canvas = map_emote_player[pm.name]["canvas"];
            var player = map_emote_player[pm.name]["player"];
            
            player.unloadData();
            j_canvas.remove();
            
            delete map_emote_player[pm.name];
            delete TYRANO.kag.stat.emote_models[pm.name];
            
        }
        
        if(pm.next=="true"){
            //falseの時はロード時の前処理だから、以下の削除は不要
            TYRANO.kag.ftag.nextOrder();
        }
    }
        
};

/*
 #[emote_trans]
 :group
 E-mote
 :title
 E-moteモデルの変形、変更
 :exp
 E-moteモデルの位置や大きさを変更できます。
 :sample
 立ち位置変更[p]
 [emote_trans name="emote1" time=500 left=200]
 [emote_trans name="emote1" time=500 left=-200]

 :param
 name=モデル名を指定します,
 time=モデルがアニメーションする時間をミリ秒で指定できます。デフォルトは1000,
 scale=モデルのスケールを指定できます。デフォルトは１。例えば、1.5を指定すると1.5倍の大きさに拡大されます,
 left=モデルのヨコ、立ち位置を指定します。注意点として画面中央が 0 となり、ティラノの他の指定とは異なりますのでご注意ください。デフォルトは0,
 top=モデルのタテ、立ち位置を指定します。注意点として画面中央が 0 となり、ティラノの他の指定とは異なりますのでご注意ください。デフォルトは0,
 wait="trueを指定すると、アニメーションの完了を待ちます。デフォルトはtrue です。"
 
 #[end]
*/


TYRANO.kag.ftag.master_tag.emote_trans = {
    
    kag: TYRANO.kag,
	vital : ["name"],
    pm:{
        name:"",
        left:"0",
        top:"0",
        x:"",
        y:"",
        scale:"",
        time:"1000",
        easing:"-1",
        wait:"true"
        
    },

    start : function(pm) {
        
        var j_canvas = map_emote_player[pm.name]["canvas"];
        var player = map_emote_player[pm.name]["player"];
        
        var coord = player.coord;
        
        var xofs = 0;
        var yofs = 0;
        
        if(pm.x!="") pm.left = pm.x;
        if(pm.y!="") pm.top = pm.y;
        
        
        if(pm.left!="0"){
            xofs = parseInt(pm.left)
            TYRANO.kag.stat.emote_models[pm.name]["left"] = pm.left;
        }
        
        if(pm.top!="0"){
            yofs = parseInt(pm.top);
            TYRANO.kag.stat.emote_models[pm.name]["top"] = pm.top;
        }
        
        if(pm.left!="0" || pm.top!="0"){
            player.setCoord(xofs, yofs, parseInt(pm.time), parseInt(pm.easing));
        }
        
        if(pm.scale!=""){
            player.setScale(parseFloat(pm.scale), parseInt(pm.time), parseInt(pm.easing));
            TYRANO.kag.stat.emote_models[pm.name]["scale"] = pm.scale;
        }
        
        if(pm.wait=="true"){
        
            setTimeout(function(){
                TYRANO.kag.ftag.nextOrder();
            },parseInt(pm.time));
        
        }else{
            
            TYRANO.kag.ftag.nextOrder();
            
        }
        //canvas.style.opacity = 1;  
        
        
    }
        
};


TYRANO.kag.ftag.master_tag.emote_restore = {
    
    kag: TYRANO.kag,
	vital : [],
    pm:{
        
    },

    start : function(pm) {
        
        //emote 復活
        models = TYRANO.kag.stat.emote_models;
        
        for(key in models){

            var pm = models[key];
            
            TYRANO.kag.ftag.startTag("emote_delete",{name:pm.name, next:"false"});
        
            pm.next="false";
            TYRANO.kag.ftag.startTag("emote_new",pm);
        
        }
        
        TYRANO.kag.ftag.nextOrder();
        
    }
        
};


