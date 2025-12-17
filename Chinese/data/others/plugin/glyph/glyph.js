/* ﻿【glyphプラグイン】 　　　　　　　　*/
/*　http://hororo.wp.xdomain.jp/100/   */

tyrano.plugin.kag.ftag.showNextImg=function(){
	//グリフが指定されている場合はこちらを適用
	
	if (this.kag.stat.flag_glyph == "false") {
		$(".img_next").remove();
		var jtext = this.kag.getMessageInnerLayer()
		
		jtext.find("p").append(this.kag.tmp.glyph);
		//jtext.find("p").append("<img class='img_next' src='./tyrano/images/system/nextpage.gif' />");

	} else {
		$(".glyph_image").show();
	}
};

	
tyrano.plugin.kag.tag.glyph.start = function(pm) {
	
	// ◆パラメーター追加
	pm.line = (!pm.line) ? './tyrano/images/system/nextpage.gif' : './data/image/' + pm.line;
	if(!pm.anime) pm.anime = "false"; //flash/updown/rotateY/rotateX/rotate/sprite
	if(!pm.bottom) pm.bottom = "";
	if(!pm.right) pm.right = "";
	if(!pm.width) pm.width = "";
	if(!pm.height) pm.height = "";
	if(!pm.cut) pm.cut = "";
	if(!pm.sec) pm.sec = 1;
	if(!pm.alt) pm.alt = "false";
	if(!pm.leng) pm.leng = "false";
	if(!pm.layer_in) pm.layer_in = "true";
	// ◆パラメーター追加

	var that = this;
	$(".glyph_image").remove();

	var j_layer = this.kag.layer.getLayer(pm.layer);
	// ◆レイヤー
	if(pm.layer_in=="true") j_layer = j_layer.find(".message_outer");
	
	// ◆スプライトアニメ
	if (pm.anime=="sprite" && pm.line!="nextpage.gif") {	//アニメ有効の場合
		if(pm.width=="" || pm.height=="" || pm.cut=="" ){
			var width = (pm.width=="") ? "「width」" : "" ;
			var height = (pm.height=="") ? "「height」" : "" ;
			var cut = (pm.cut=="") ? "「cut」" : "" ;
			alert('glyphタグにパラメーター'+width+height+cut+'が指定されていません。');
		}else{
			var alt = (pm.alt=="true") ? "alternate " : "";	//往復設定
			var xy = (pm.leng=="true") ? '0 -' + ((pm.cut-1) * pm.height) + 'px' : '-' + ((pm.cut-1) * pm.width) + 'px 0';//縦移動か横移動か
			
			var j_next = $("<span class='img_next'></span>");
			j_next.css("background","url(" + pm.line + ") no-repeat");
			j_next.css("width",pm.width + "px");
			j_next.css("height",pm.height + "px");
			j_next.css("display","inline-block");
			j_next.css("animation","glyph " + pm.sec + "s steps(" + (pm.cut-1) +") " + alt + " infinite");
			j_next.append('<style>@-webkit-keyframes glyph{to{background-position:' + xy + ';}}@keyframes glyph{to{background-position:' + xy + ';}}</style>');
		}
	} else {
		var j_next = $("<img class='img_next' />");
		j_next.attr("src", pm.line);
		if(pm.anime!="false"){
			j_next.addClass(pm.anime);
			j_next.css("-webkit-animation-duration",pm.sec + "s");
			j_next.css("animation-duration",pm.sec + "s");
		}
	}
	
	// ◆fix=true
	if (pm.fix=="true") {
		that.kag.stat.flag_glyph = "true";
		j_next.removeClass("img_next");
		j_next.addClass("glyph_image");
		j_next.css("position", "absolute");
		j_next.css("z-index", 99999);
		if(pm.top=="middle" || pm.bottom=="middle") j_next.addClass("middle");
		else if(!pm.bottom) j_next.css("top", pm.top + "px");
		j_next.css("bottom", pm.bottom + "px");
		if(pm.left=="center" || pm.right=="center") j_next.addClass("center");
		else if(!pm.right)j_next.css("left", pm.left + "px");
		j_next.css("right", pm.right + "px");
		j_layer.append(j_next);
	} else {
		this.kag.tmp.glyph = j_next;
		this.kag.stat.flag_glyph = "false";
	}
		
	//that.kag.stat.flag_glyph = "true";
	that.kag.ftag.nextOrder();

};
