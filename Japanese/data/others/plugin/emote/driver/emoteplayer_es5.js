"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmoteDevice = function () {
    function EmoteDevice() {
        _classCallCheck(this, EmoteDevice);

        if (this.initRenderCanvas() && this.initWebGL() && this.initGLEnv() && this.initRenderTexture() && this.initEmoteDevice() && this.initMembers()) this.initialized = true;else this.initialized = false;
    }

    _createClass(EmoteDevice, [{
        key: "initRenderCanvas",
        value: function initRenderCanvas() {
            this.renderCanvas = EmotePlayer.renderCanvas;
            if (this.renderCanvas == null) {
                alert("Unable to initialize Emote Device. Set render canvas first.");
                return false;
            }
            this.width = this.renderCanvas.width;
            this.height = this.renderCanvas.height;
            return true;
        }
    }, {
        key: "initWebGL",
        value: function initWebGL() {
            this.gl = null;
            try {
                GL.init();
                var contextAttributes = {
                    antialias: true,
                    alpha: true,
                    depth: false,
                    stencil: true
                };
                this.hgl = GL.createContext(this.renderCanvas, contextAttributes);
                GL.makeContextCurrent(this.hgl);
                this.gl = GL.contexts[this.hgl].GLctx;
            } catch (e) {}

            if (!this.gl) {
                alert("Unable to initialize WebGL. Your browser may not support it.");
                return false;
            }
            return true;
        }
    }, {
        key: "createMat4",
        value: function createMat4() {
            var out = new Float32Array(16);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
    }, {
        key: "initGLEnv",
        value: function initGLEnv() {
            if (!this.gl) return false;

            var vs_src = "\n        precision mediump float;\n        attribute vec4 a_pos;\n        attribute vec2 a_texCoord;\n        uniform vec2 u_scrSize;\n        uniform vec2 u_texSize;\n        uniform mat4 u_mvpMat;\n        varying vec2 v_texCoord;\n\n        void main()\n        {\n\t        vec4 tmp;\n\t        tmp = u_mvpMat * a_pos;\n\t        gl_Position.x = (tmp.x *  2.0) / u_scrSize.x;\n\t        gl_Position.y = (tmp.y * -2.0) / u_scrSize.y;\n\t        gl_Position.z = a_pos.z;\n\t        gl_Position.w = a_pos.w;\n\t        v_texCoord.x = a_texCoord.x / u_texSize.x;\n\t        v_texCoord.y = a_texCoord.y / u_texSize.y;\n        }";
            var fs_src = "\n        precision mediump float;\n        varying vec2 v_texCoord;\n        uniform sampler2D u_texUnitId;\n        uniform vec4 u_texColor;\n        \n        void main()\n        {\n\t        vec4 tmp;\n\t        tmp = texture2D(u_texUnitId, v_texCoord);\n            tmp *= u_texColor;\n            tmp.rgb *= tmp.a;\n            if (tmp.a <= 0.003) {\n                discard;\n            }\n\t        gl_FragColor = tmp;\n        }";
            var gl = this.gl;
            this.shader_program = gl.createProgram();
            var vs = gl.createShader(gl.VERTEX_SHADER);
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(vs, vs_src);
            gl.shaderSource(fs, fs_src);
            gl.compileShader(vs);
            gl.compileShader(fs);
            gl.attachShader(this.shader_program, vs);
            gl.attachShader(this.shader_program, fs);
            gl.linkProgram(this.shader_program);
            this.aLoc = [];
            this.uLoc = [];
            this.aLoc[0] = gl.getAttribLocation(this.shader_program, "a_pos");
            this.aLoc[1] = gl.getAttribLocation(this.shader_program, "a_texCoord");
            this.uLoc[0] = gl.getUniformLocation(this.shader_program, "u_scrSize");
            this.uLoc[1] = gl.getUniformLocation(this.shader_program, "u_texSize");
            this.uLoc[2] = gl.getUniformLocation(this.shader_program, "u_mvpMat");
            this.uLoc[3] = gl.getUniformLocation(this.shader_program, "u_texUnitId");
            this.uLoc[4] = gl.getUniformLocation(this.shader_program, "u_texColor");
            gl.enableVertexAttribArray(this.aLoc[0]);
            gl.enableVertexAttribArray(this.aLoc[1]);

            this.pMatrix = this.createMat4();
            this.vertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
            var data = [-(this.width / 2), -(this.height / 2), 0, this.width / 2, -(this.height / 2), 0, this.width / 2, this.height / 2, 0, -(this.width / 2), this.height / 2, 0];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.aLoc[0], 3, gl.FLOAT, false, 0, 0);

            this.coordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
            var textureCoords = [0, this.height, this.width, this.height, this.width, 0, 0, 0];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.aLoc[1], 2, gl.FLOAT, false, 0, 0);

            this.vertexIndexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
            var indices = [0, 1, 2, 0, 2, 3];
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
            gl.disable(gl.DEPTH_TEST); // Enable depth testing

            return true;
        }
    }, {
        key: "initRenderTexture",
        value: function initRenderTexture() {
            // レンダーテクスチャの設定
            var gl = this.gl;
            this.renderTexture = EmoteDevice_CreateEmoteTexture2(this.width, this.height);
            return true;
        }
    }, {
        key: "initEmoteDevice",
        value: function initEmoteDevice() {
            this.device = EmoteDevice_Initialize();
            EmoteDevice_ChangeFrameBufferSize(this.width, this.height);
            return true;
        }
    }, {
        key: "initMembers",
        value: function initMembers() {
            this.playerList = [];
            this.animating = false;
            this.date = new Date();
            return true;
        }
    }, {
        key: "invalidateAllPlayersPhysics",
        value: function invalidateAllPlayersPhysics() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.playerList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var player = _step.value;

                    player.invalidatePhysics();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "registerPlayer",
        value: function registerPlayer(player) {
            this.playerList.push(player);
            this.invalidateAnimation();
        }
    }, {
        key: "unregisterPlayer",
        value: function unregisterPlayer(player) {
            this.playerList.splice(this.playerList.indexOf(player), 1);
            this.checkCanvasHide(player.canvas);
            this.invalidateAnimation();
        }
    }, {
        key: "invalidateAnimation",
        value: function invalidateAnimation() {
            for (var i = 0; i < this.playerList.length; i++) {
                this.playerList[i].index = i;
            }this.playerList.sort(function (a, b) {
                if (a.canvas.id == null && b.canvas.id != null) return -1;
                if (a.canvas.id != null && b.canvas.id == null) return 1;
                if (a.canvas.id < b.canvas.id) return -1;
                if (a.canvas.id > b.canvas.id) return 1;
                if (a.zIndex < b.zIndex) return -1;
                if (a.zIndex > b.zIndex) return 1;
                return a.index - b.index;
            });
            this.kickAnimation();
        }
    }, {
        key: "checkAnimationRequired",
        value: function checkAnimationRequired() {
            return this.playerList.length > 0;
        }
    }, {
        key: "checkCanvasHide",
        value: function checkCanvasHide(canvas) {
            if (canvas == null) return;
            if (!this.playerList.some(function (player) {
                return player.canvas == canvas;
            })) {
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, {
        key: "kickAnimation",
        value: function kickAnimation() {
            if (this.animating && !this.checkAnimationRequired()) {
                this.animating = false;
                cancelAnimationFrame(this.requestId);
            } else if (!this.animating && this.checkAnimationRequired()) {
                this.animating = true;
                this.lastAnimationTime = null;
                this.requestId = requestAnimationFrame(this.drawAnimation.bind(this));
            }
        }
    }, {
        key: "drawAnimation",
        value: function drawAnimation(timeStamp) {
            var _this = this;

            if (this.lastAnimationTime === null) this.lastAnimationTime = timeStamp;

            var curAnimationTime = timeStamp;
            var diffTime = Math.min(100, curAnimationTime - this.lastAnimationTime);
            var frameCount = diffTime * EmotePlayer.MS2FRAME;
            this.lastAnimationTime = curAnimationTime;

            var gl = this.gl;
            var canvas = null;

            var beginScene = function beginScene() {
                if (canvas == null) return;
                gl.clearColor(0.0, 0.0, 0.0, 0.0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            };

            var endScene = function endScene(canvas) {
                if (canvas == null) return;
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(_this.renderCanvas, (canvas.width - _this.width) / 2, (canvas.height - _this.height) / 2);
            };

            EmoteDevice_SetMaskMode(EmotePlayer.maskMode);
            EmoteDevice_SetProtectTranslucentTextureColor(EmotePlayer.protectTranslucentTextureColor);
            EmoteDevice_SetMaskRegionClipping(EmotePlayer.maskRegionClipping);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.playerList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var player = _step2.value;

                    if (player.canvas !== canvas) {
                        endScene(canvas);
                        canvas = player.canvas;
                        beginScene(canvas);
                    }

                    player.onUpdate();
                    if (!player.stepUpdate && player.convolveCanvasMovementToPhysics) {
                        var curCanvasPosition = player.canvasPosition;
                        var prevCanvasPosition = player.prevCanvasPosition;
                        var scale = player.getState("scale");
                        var vec = [(curCanvasPosition.left - prevCanvasPosition.left) / scale * frameCount, (curCanvasPosition.top - prevCanvasPosition.top) / scale * frameCount];
                        EmotePlayer_SetOuterForce(player.playerId, "bust", vec[0], vec[1], 0, 0);
                        EmotePlayer_SetOuterForce(player.playerId, "parts", vec[0], vec[1], 0, 0);
                        EmotePlayer_SetOuterForce(player.playerId, "hair", vec[0], vec[1], 0, 0);
                    }
                    player.prevCanvasPosition = player.canvasPosition;
                    if (player.stepUpdate) {
                        if (player.modified) {
                            EmotePlayer_Step(player.playerId);
                            EmotePlayer_Update(player.playerId, 0);
                        }
                    } else {
                        EmotePlayer_Update(player.playerId, frameCount * player.speed);
                    }
                    player.modified = false;

                    if (player.canvas == null || player.hide || player.globalAlpha == 0) continue;

                    EmotePlayer_DrawToTexture2(player.playerId, this.renderTexture);

                    gl.useProgram(this.shader_program);

                    // 頂点バッファの登録
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
                    gl.vertexAttribPointer(this.aLoc[0], 3, gl.FLOAT, false, 0, 0);
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
                    gl.vertexAttribPointer(this.aLoc[1], 2, gl.FLOAT, false, 0, 0);

                    // uniform値の登録
                    gl.uniform2f(this.uLoc[0], this.width, this.height);
                    gl.uniform2f(this.uLoc[1], this.width, this.height);
                    gl.uniformMatrix4fv(this.uLoc[2], false, this.pMatrix);
                    gl.uniform1i(this.uLoc[3], 0);
                    gl.uniform4f(this.uLoc[4], EmotePlayer_GetVariable(player.playerId, "_globalR") / 255, EmotePlayer_GetVariable(player.playerId, "_globalG") / 255, EmotePlayer_GetVariable(player.playerId, "_globalB") / 255, EmotePlayer_GetVariable(player.playerId, "_globalA") / 255);

                    gl.activeTexture(gl.TEXTURE0);
                    var tex = EmoteDevice_GetEmoteTexture2Tex(this.renderTexture);
                    gl.bindTexture(gl.TEXTURE_2D, tex);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);

                    gl.blendEquation(gl.FUNC_ADD);
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                    gl.enable(gl.BLEND);

                    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            endScene(canvas);

            this.requestId = requestAnimationFrame(this.drawAnimation.bind(this));
        }
    }]);

    return EmoteDevice;
}();

;

var EmotePlayer = function () {
    function EmotePlayer() {
        var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, EmotePlayer);

        this._canvas = canvas;
        this.playerId = null;
        this.initialized = false;
        this.initMembers();
        EmotePlayer.requireDevice();
    }

    _createClass(EmotePlayer, [{
        key: "destroy",
        value: function destroy() {
            unloadData();
            EmotePlayer.releaseDevice();
        }
    }, {
        key: "initMembers",
        value: function initMembers() {
            this.initialized = false;
            this.registered = false;
            this.isCharaProfileAvailable = false;
            this.charaHeight = 0;
            this.charaProfile = {};
            this.charaBounds = {};
            this._meshDivisionRatio = 1;
            this._hairScale = 1;
            this._partsScale = 1;
            this._bustScale = 1;
            this._speed = 1;
            this._windSpeed = 0;
            this._windPowMin = 0;
            this._windPowMax = 2;
            this._coord = [0, 0];
            this._scale = 1;
            this._rot = 0;
            this._vertexR = this._vertexG = this._vertexB = 128;
            this._globalR = this._globalG = this._globalB = this._globalA = 255;
            this._grayscale = 0.0;
            this._zIndex = 0;
            this._hide = false;
            this._stepUpdate = false;
            this.modified = true;
            this._convolveCanvasMovementToPhysics = false;
            this.prevCanvasPosition = { left: 0, top: 0 };
            this._variableList = [];
            this._variableListLoaded = false;
            this._mainTimelineLabel = "";
            this._mainTimelineLabels = [];
            this._mainTimelineLabelsLoaded = false;
            this._diffTimelineSlot = ["", "", "", "", "", ""];
            this._diffTimelineFadeOutTime = 300;
            this._diffTimelineLabels = [];
            this._diffTimelineLabelsLoaded = false;
        }
    }, {
        key: "invalidateDrawing",
        value: function invalidateDrawing() {
            var needs = this.needsDrawing;
            if (this.registered != needs) {
                if (needs) {
                    EmotePlayer.device.registerPlayer(this);
                    this.onRegister();
                } else {
                    this.onUnregsiter();
                    EmotePlayer.device.unregisterPlayer(this);
                }
                this.registered = needs;
            }
        }
    }, {
        key: "invalidatePhysics",
        value: function invalidatePhysics() {
            if (!this.initialized) return;
            EmotePlayer_SetHairScale(this.playerId, this.hairScale * EmotePlayer.globalHairScale);
            EmotePlayer_SetPartsScale(this.playerId, this.partsScale * EmotePlayer.globalPartsScale);
            EmotePlayer_SetBustScale(this.playerId, this.bustScale * EmotePlayer.globalBustScale);
        }
    }, {
        key: "invalidateWind",
        value: function invalidateWind() {
            if (!this.initialized) return;
            if (this._windSpeed == 0) {
                EmotePlayer_StopWind(this.playerId);
            } else {
                var w = EmotePlayer.device.width / 2;
                EmotePlayer_StartWind(this.playerId, -w, w, this._windSpeed, this._windPowMin, this._windPowMax);
            }
        }
    }, {
        key: "colorStrToValue",
        value: function colorStrToValue(str) {
            if (str.substr(0, 1) == '#') str = str.substr(1);
            return { r: parseInt(str.substr(0, 2), 16),
                g: parseInt(str.substr(2, 2), 16),
                b: parseInt(str.substr(4, 2), 16) };
        }
    }, {
        key: "colorValueToStr",
        value: function colorValueToStr(r, g, b) {
            var toHex = function toHex(val) {
                return ('0' + val.toString(16).toUpperCase()).substr(-2);
            };
            return '#' + toHex(r) + toHex(g) + toHex(b);
        }
    }, {
        key: "getBinaryAsync",
        value: function getBinaryAsync(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = function () {
                    if (xhr.status === 200 || xhr.status === 0) resolve(new Uint8Array(xhr.response));else reject(new Error(xhr.statusText));
                };
                xhr.onerror = function () {
                    return reject(new Error(xhr.statusText));
                };
                xhr.send();
            });
        }
    }, {
        key: "promiseLoadDataFromURL",
        value: function promiseLoadDataFromURL() {
            var _this2 = this;

            for (var _len = arguments.length, urls = Array(_len), _key = 0; _key < _len; _key++) {
                urls[_key] = arguments[_key];
            }

            urls = Array.prototype.concat.apply([], urls);
            var tasks = urls.map(function (url) {
                return _this2.getBinaryAsync(url);
            });
            return Promise.all(tasks).then(this.loadData.bind(this));
        }
    }, {
        key: "loadDataFromURL",
        value: function loadDataFromURL() {
            this.promiseLoadDataFromURL.apply(this, arguments).catch(function (error) {
                return console.error(error);
            });
        }
    }, {
        key: "unloadData",
        value: function unloadData() {
            if (!this.initialized) return;
            EmotePlayer_Finish(this.playerId);
            this.playerId = null;
            this.initialized = false;
            this.clearVariableList();
            this.clearMainTimelineLabels();
            this.clearDiffTimelineLabels();
            this.clearCharaProfile();
            this.invalidateDrawing();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            for (var _len2 = arguments.length, files = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                files[_key2] = arguments[_key2];
            }

            files = Array.prototype.concat.apply([], files);
            this.unloadData();
            this.playerId = EmotePlayer_Initialize(files);
            this.initialized = true;
            this.modified = true;
            this.loadCharaProfile();
            EmotePlayer_SetMeshDivisionRatio(this.playerId, this.meshDivisionRatio * EmotePlayer.globalMeshDivisionRatio);
            EmotePlayer_SetCoord(this.playerId, this._coord[0], this._coord[1], 0, 0);
            EmotePlayer_SetScale(this.playerId, this._scale, 0, 0);
            EmotePlayer_SetRot(this.playerId, this._rot, 0, 0);
            EmotePlayer_SetVariable(this.playerId, "_globalR", this._globalR, 0, 0);
            EmotePlayer_SetVariable(this.playerId, "_globalG", this._globalG, 0, 0);
            EmotePlayer_SetVariable(this.playerId, "_globalB", this._globalB, 0, 0);
            EmotePlayer_SetVariable(this.playerId, "_globalA", this._globalA, 0, 0);
            EmotePlayer_SetGrayscale(this.playerId, this._grayscale, 0, 0);
            EmotePlayer_SetColor(this.playerId, this._vertexR / 255, this._vertexG / 255, this._vertexB / 255, 1, 0, 0);
            this.invalidateWind();
            this.invalidatePhysics();
            if (this._mainTimelineLabel != "") EmotePlayer_PlayTimeline(this.playerId, this._mainTimelineLabel, EmotePlayer.TimelinePlayFlags.PARALLEL);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._diffTimelineSlot[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var val = _step3.value;

                    if (val != "") EmotePlayer_PlayTimeline(this.playerId, val, EmotePlayer.TimelinePlayFlags.PARALLEL | EmotePlayer.TimelinePlayFlags.DIFFERENCE);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.prevCanvasPosition = this.canvasPosition;
            this.invalidateDrawing();
        }
    }, {
        key: "loadCharaProfile",
        value: function loadCharaProfile() {
            this.isCharaProfileAvailable = EmotePlayer_IsCharaProfileAvailable(this.playerId);
            if (this.isCharaProfileAvailable) {
                this.charaHeight = EmotePlayer_GetCharaHeight(this.playerId);
                this.charaProfile = {};
                var charaProflleCount = EmotePlayer_CountCharaProfiles(this.playerId);
                for (var i = 0; i < charaProflleCount; i++) {
                    var s = EmotePlayer_GetCharaProfileLabelAt(this.playerId, i);
                    var value = EmotePlayer_GetCharaProfile(this.playerId, s);
                    this.charaProfile[s] = value;
                }
                this.charaBounds = { left: this.charaProfile.boundsLeft,
                    top: this.charaProfile.boundsTop,
                    right: this.charaProfile.boundsRight,
                    bottom: this.charaProfile.boundsBottom };
                delete this.charaProfile.boundsLeft;
                delete this.charaProfile.boundsTop;
                delete this.charaProfile.boundsRight;
                delete this.charaProfile.boundsBottom;
            }
        }
    }, {
        key: "clearCharaProfile",
        value: function clearCharaProfile() {
            this.isCharaProfileAvailable = false;
            this.charaHeight = 0;
            this.charaProfile = {};
            this.charaBounds = {};
        }
    }, {
        key: "getState",
        value: function getState(label) {
            if (!this.initialized) return 0;
            return EmotePlayer_GetState(this.playerId, label);
        }
    }, {
        key: "getMarkerPosition",
        value: function getMarkerPosition(marker) {
            if (!this.initialized || this.canvas == null) return null;

            var markerCoord = [0, 0];
            if (marker in this.charaProfile) {
                var _x = this.getState("coordX");
                var _y = this.getState("coordY");
                var _scale = this.getState("scale");
                var _rot = this.getState("rot");
                var s = Math.sin(_rot);
                var c = Math.cos(_rot);
                var markerX = 0;
                var markerY = this.charaProfile[marker];
                markerCoord = [markerX * c * _scale + markerY * -s * _scale + _x, markerX * s * _scale + markerY * c * _scale + _y];
            }
            var w = this.canvas.width / 2;
            var h = this.canvas.height / 2;
            var rect = this.canvas.getBoundingClientRect();
            return { x: markerCoord[0],
                y: markerCoord[1],
                offsetX: markerCoord[0] + w,
                offsetY: markerCoord[1] + h,
                clientX: markerCoord[0] + w + rect.left,
                clientY: markerCoord[1] + h + rect.top };
        }
    }, {
        key: "setCoord",
        value: function setCoord(x, y) {
            var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            if (this._coord[0] == x && this._coord[1] == y) return;
            this._coord[0] = x;
            this._coord[1] = y;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetCoord(this.playerId, x, y, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "setScale",
        value: function setScale(scale) {
            var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (this._scale == scale) return;
            this._scale = scale;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetScale(this.playerId, scale, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "setRot",
        value: function setRot(rot) {
            var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (this._rot == rot) return;
            this._rot = rot;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetRot(this.playerId, rot, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "setVertexColor",
        value: function setVertexColor(color) {
            var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            color = this.colorStrToValue(color);
            if (this._vertexR == color.r && this._vertexG == color.g && this._vertexB == color.b) return;
            this._vertexR = color.r;
            this._vertexG = color.g;
            this._vertexB = color.b;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetColor(this.playerId, color.r / 255, color.g / 255, color.b / 255, 1, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "setGlobalColor",
        value: function setGlobalColor(color) {
            var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            color = this.colorStrToValue(color);
            if (this._globalR == color.r && this._globalG == color.g && this._globalB == color.b) return;
            this._globalR = color.r;
            this._globalG = color.g;
            this._globalB = color.b;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetVariable(this.playerId, "_globalR", color.r, ms * EmotePlayer.MS2FRAME, easing);
                EmotePlayer_SetVariable(this.playerId, "_globalG", color.g, ms * EmotePlayer.MS2FRAME, easing);
                EmotePlayer_SetVariable(this.playerId, "_globalB", color.b, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "setGlobalAlpha",
        value: function setGlobalAlpha(alpha) {
            var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            alpha *= 255;
            if (this._globalA == alpha) return;
            this._globalA = alpha;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetVariable(this.playerId, "_globalA", alpha, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "setGrayscale",
        value: function setGrayscale(grayscale) {
            var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (this._grayscale == grayscale) return;
            this._grayscale = grayscale;
            if (this.initialized) {
                this.modified = true;
                EmotePlayer_SetGrayscale(this.playerId, this._grayscale, ms * EmotePlayer.MS2FRAME, easing);
            }
        }
    }, {
        key: "isLoopTimeline",
        value: function isLoopTimeline(label) {
            if (!this.initialized) return false;
            return EmotePlayer_IsLoopTimeline(this.playerId, label);
        }
    }, {
        key: "getTimelineTotalMilliSeconds",
        value: function getTimelineTotalMilliSeconds(label) {
            if (!this.initialized) return false;
            return EmotePlayer_GetTimelineTotalFrameCount(this.playerId, label) * EmotePlayer.FRAME2MS;
        }
    }, {
        key: "playTimeline",
        value: function playTimeline(label) {
            var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_PlayTimeline(this.playerId, label, flags);
        }
    }, {
        key: "stopTimeline",
        value: function stopTimeline() {
            var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_StopTimeline(this.playerId, label);
        }
    }, {
        key: "isTimelinePlaying",
        value: function isTimelinePlaying() {
            var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            if (!this.initialized) return false;
            return EmotePlayer_IsTimelinePlaying(this.playerId, label);
        }
    }, {
        key: "setTimelineBlendRatio",
        value: function setTimelineBlendRatio(label, value) {
            var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var stopWhenBlendDone = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_SetTimelineBlendRatio(this.playerId, label, value, ms * EmotePlayer.MS2FRAME, easing, stopWhenBlendDone);
        }
    }, {
        key: "getTimelineBlendRatio",
        value: function getTimelineBlendRatio(label) {
            if (!this.initialized) return 0;
            return EmotePlayer_GetTimelineTotalFrameCount(this.playerId, label);
        }
    }, {
        key: "fadeInTimeline",
        value: function fadeInTimeline(label, ms) {
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_FadeInTimeline(this.playerId, label, ms * EmotePlayer.MS2FRAME, easing);
        }
    }, {
        key: "fadeOutTimeline",
        value: function fadeOutTimeline(label, ms) {
            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_FadeOutTimeline(this.playerId, label, ms * EmotePlayer.MS2FRAME, easing);
        }
    }, {
        key: "clearVariableList",
        value: function clearVariableList() {
            this._variableList = [];
            this._variableListLoaded = false;
        }
    }, {
        key: "touchVariableList",
        value: function touchVariableList() {
            if (this._variableListLoaded || !this.initialized) return;
            var variableCount = EmotePlayer_CountVariables(this.playerId);
            for (var i = 0; i < variableCount; i++) {
                var variable = { label: "", frameList: [], minValue: Number.MAX_VALUE, maxValue: Number.MIN_VALUE };
                variable.label = EmotePlayer_GetVariableLabelAt(this.playerId, i);
                var frameCount = EmotePlayer_CountVariableFrameAt(this.playerId, i);
                if (frameCount == 0) continue;
                for (var j = 0; j < frameCount; j++) {
                    var frame = { label: "", value: 0 };
                    frame.label = EmotePlayer_GetVariableFrameLabelAt(this.playerId, i, j);
                    frame.value = EmotePlayer_GetVariableFrameValueAt(this.playerId, i, j);
                    variable.minValue = Math.min(variable.minValue, frame.value);
                    variable.maxValue = Math.max(variable.maxValue, frame.value);
                    variable.frameList.push(frame);
                }
                this._variableList.push(variable);
            }
            this._variableListLoaded = true;
        }
    }, {
        key: "clearMainTimelineLabels",
        value: function clearMainTimelineLabels() {
            this._mainTimelineLabels = [];
            this._mainTimelineLabelsLoaded = false;
        }
    }, {
        key: "touchMainTimelineLabels",
        value: function touchMainTimelineLabels() {
            if (this._mainTimelineLabelsLoaded || !this.initialized) return;
            var timelineCount = EmotePlayer_CountMainTimelines(this.playerId);
            if (timelineCount > 0) {
                for (var i = 0; i < timelineCount; i++) {
                    this._mainTimelineLabels.push(EmotePlayer_GetMainTimelineLabelAt(this.playerId, i));
                }
            }
            this._mainTimelineLabelsLoaded = true;
        }
    }, {
        key: "clearDiffTimelineLabels",
        value: function clearDiffTimelineLabels() {
            this._diffTimelineLabels = [];
            this._diffTimelineLabelsLoaded = false;
        }
    }, {
        key: "touchDiffTimelineLabels",
        value: function touchDiffTimelineLabels() {
            if (this._diffTimelineLabelsLoaded || !this.initialized) return;
            var timelineCount = EmotePlayer_CountDiffTimelines(this.playerId);
            if (timelineCount > 0) {
                for (var i = 0; i < timelineCount; i++) {
                    this._diffTimelineLabels.push(EmotePlayer_GetDiffTimelineLabelAt(this.playerId, i));
                }
            }
            this._diffTimelineLabelsLoaded = true;
        }
    }, {
        key: "setDiffTimelineLabel",
        value: function setDiffTimelineLabel(index, val, fadeoutMs) {
            if (this._diffTimelineSlot[index] == val) return;
            if (!this.initialized) {
                this._diffTimelineSlot[index] = val;
                return;
            }
            if (this._diffTimelineSlot[index] != "") EmotePlayer_FadeOutTimeline(this.playerId, this._diffTimelineSlot[index], fadeoutMs * EmotePlayer.MS2FRAME, 0);
            this._diffTimelineSlot[index] = val;
            if (this._diffTimelineSlot[index] != "") EmotePlayer_PlayTimeline(this.playerId, this._diffTimelineSlot[index], EmotePlayer.TimelinePlayFlags.PARALLEL | EmotePlayer.TimelinePlayFlags.DIFFERENCE);
            this.modified = true;
        }
    }, {
        key: "getDiffTimelineLabel",
        value: function getDiffTimelineLabel(index) {
            this.touchDiffTimelineLabels();
            return this._diffTimelineSlot[index];
        }
    }, {
        key: "skip",
        value: function skip() {
            if (this.initialized) {
                EmotePlayer_Skip(this.playerId);
                this.prevCanvasPosition = this.canvasPosition;
            }
        }
    }, {
        key: "pass",
        value: function pass() {
            if (this.initialized) {
                EmotePlayer_Pass(this.playerId);
                this.prevCanvasPosition = this.canvasPosition;
            }
        }
    }, {
        key: "setVariable",
        value: function setVariable(label, value) {
            var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_SetVariable(this.playerId, label, value, ms * EmotePlayer.MS2FRAME, easing);
        }
    }, {
        key: "getVariable",
        value: function getVariable(label) {
            if (!this.initialized) return 0;
            return EmotePlayer_GetVariable(this.playerId, label);
        }
    }, {
        key: "setVariableDiff",
        value: function setVariableDiff(module, label, value) {
            var ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            if (!this.initialized) return;
            this.modified = true;
            EmotePlayer_SetVariableDiff(this.playerId, module, label, value, ms * EmotePlayer.MS2FRAME, easing);
        }
    }, {
        key: "getVariableDiff",
        value: function getVariableDiff(module, label) {
            if (!this.initialized) return 0;
            return EmotePlayer_GetVariableDiff(this.playerId, module, label);
        }
    }, {
        key: "onRegister",
        value: function onRegister() {}
    }, {
        key: "onUnregsiter",
        value: function onUnregsiter() {}
    }, {
        key: "onUpdate",
        value: function onUpdate() {}
    }, {
        key: "needsDrawing",
        get: function get() {
            return this.initialized;
        }
    }, {
        key: "meshDivisionRatio",
        get: function get() {
            return this._meshDivisionRatio;
        },
        set: function set(val) {
            if (this._meshDivisionRatio == val) return;
            this._meshDivisionRatio = val;
        }
    }, {
        key: "hairScale",
        get: function get() {
            return this._hairScale;
        },
        set: function set(val) {
            if (this._hairScale == val) return;
            this._hairScale = val;
            this.invalidatePhysics();
        }
    }, {
        key: "partsScale",
        get: function get() {
            return this._partsScale;
        },
        set: function set(val) {
            if (this._partsScale == val) return;
            this._partsScale = val;
            this.invalidatePhysics();
        }
    }, {
        key: "bustScale",
        get: function get() {
            return this._bustScale;
        },
        set: function set(val) {
            if (this._bustScale == val) return;b;
            this._bustScale = val;
            this.invalidatePhysics();
        }
    }, {
        key: "windSpeed",
        get: function get() {
            return this._windSpeed;
        },
        set: function set(val) {
            if (this._windSpeed == val) return;
            this._windSpeed = val;
            this.invalidateWind();
        }
    }, {
        key: "windPowMin",
        get: function get() {
            return this._windPowMin;
        },
        set: function set(val) {
            if (this._windPowMin == val) return;
            this._windPowMin = val;
            this.invalidateWind();
        }
    }, {
        key: "windPowMax",
        get: function get() {
            return this._windPowMax;
        },
        set: function set(val) {
            if (this._windPowMax == val) return;
            this._windPowMax = val;
            this.invalidateWind();
        }
    }, {
        key: "zIndex",
        get: function get() {
            return this._zIndex;
        },
        set: function set(val) {
            this._zIndex = val;
            EmotePlayer.device.invalidateAnimation();
        }
    }, {
        key: "hide",
        get: function get() {
            return this._hide;
        },
        set: function set(val) {
            if (this._hide == val) return;
            this._hide = val;
        }
    }, {
        key: "canvas",
        get: function get() {
            return this._canvas;
        },
        set: function set(val) {
            if (this._canvas === val) return;
            var prevCanvas = this._canvas;
            this._canvas = val;
            EmotePlayer.device.checkCanvasHide(prevCanvas);
            EmotePlayer.device.invalidateAnimation();
            this.prevCanvasPosition = this.canvasPosition;
        }
    }, {
        key: "speed",
        get: function get() {
            return this._speed;
        },
        set: function set(val) {
            this._speed = val;
        }
    }, {
        key: "coord",
        get: function get() {
            return [].concat(this._coord);
        },
        set: function set(val) {
            this.setCoord(val[0], val[1]);
        }
    }, {
        key: "scale",
        get: function get() {
            return this._scale;
        },
        set: function set(val) {
            this.setScale(val);
        }
    }, {
        key: "rot",
        get: function get() {
            return this._rot;
        },
        set: function set(val) {
            this.setRot(val);
        }
    }, {
        key: "vertexColor",
        get: function get() {
            return this.colorValueToStr(this._vertexR, this._vertexG, this._vertexB);
        },
        set: function set(val) {
            this.setVertexColor(val);
        }
    }, {
        key: "globalColor",
        get: function get() {
            return this.colorValueToStr(this._globalR, this._globalG, this._globalB);
        },
        set: function set(val) {
            this.setGlobalColor(val);
        }
    }, {
        key: "globalAlpha",
        get: function get() {
            return this._a / 255;
        },
        set: function set(val) {
            this.setGlobalAlpha(val);
        }
    }, {
        key: "grayscale",
        get: function get() {
            return this._grayscale;
        },
        set: function set(val) {
            this.setGrayscale(val);
        }
    }, {
        key: "canvasPosition",
        get: function get() {
            if (this.canvas == null) return this.prevCanvasPosition;else {
                var rect = this.canvas.getBoundingClientRect();
                return { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
            }
        }
    }, {
        key: "convolveCanvasMovementToPhysics",
        get: function get() {
            return this._convolveCanvasMovementToPhysics;
        },
        set: function set(val) {
            if (val == this._convolveCanvasMovementToPhysics) return;
            this._convolveCanvasMovementToPhysics = val;
            if (this.initialized && !val) {
                EmotePlayer_SetOuterForce(this.playerId, "bust", 0, 0, 0, 0);
                EmotePlayer_SetOuterForce(this.playerId, "parts", 0, 0, 0, 0);
                EmotePlayer_SetOuterForce(this.playerId, "hair", 0, 0, 0, 0);
            }
        }
    }, {
        key: "variableList",
        get: function get() {
            this.touchVariableList();
            return this._variableList;
        }
    }, {
        key: "mainTimelineLabels",
        get: function get() {
            this.touchMainTimelineLabels();
            return this._mainTimelineLabels;
        }
    }, {
        key: "mainTimelineLabel",
        set: function set(val) {
            if (this._mainTimelineLabel == val) {
                return;
            }
            if (!this.initialized) {
                this._mainTimelineLabel = val;
                return;
            }
            if (this._mainTimelineLabel != "") EmotePlayer_StopTimeline(this.playerId, this._mainTimelineLabel);
            this._mainTimelineLabel = val;
            if (this._mainTimelineLabel != "") EmotePlayer_PlayTimeline(this.playerId, this._mainTimelineLabel, EmotePlayer.TimelinePlayFlags.PARALLEL);
            this.modified = true;
        },
        get: function get() {
            return this._mainTimelineLabel;
        }
    }, {
        key: "diffTimelineLabels",
        get: function get() {
            this.touchDiffTimelineLabels();
            return this._diffTimelineLabels;
        }
    }, {
        key: "diffTimelineFadeoutTime",
        set: function set(val) {
            this._diffTimelineFadeOutTime = val;
        },
        get: function get() {
            return this._diffTimelineFadeOutTime;
        }
    }, {
        key: "diffTimelineSlot1",
        set: function set(val) {
            this.setDiffTimelineLabel(0, val, this._diffTimelineFadeOutTime);
        },
        get: function get() {
            return this.getDiffTimelineLabel(0);
        }
    }, {
        key: "diffTimelineSlot2",
        set: function set(val) {
            this.setDiffTimelineLabel(1, val, this._diffTimelineFadeOutTime);
        },
        get: function get() {
            return this.getDiffTimelineLabel(1);
        }
    }, {
        key: "diffTimelineSlot3",
        set: function set(val) {
            this.setDiffTimelineLabel(2, val, this._diffTimelineFadeOutTime);
        },
        get: function get() {
            return this.getDiffTimelineLabel(2);
        }
    }, {
        key: "diffTimelineSlot4",
        set: function set(val) {
            this.setDiffTimelineLabel(3, val, this._diffTimelineFadeOutTime);
        },
        get: function get() {
            return this.getDiffTimelineLabel(3);
        }
    }, {
        key: "diffTimelineSlot5",
        set: function set(val) {
            this.setDiffTimelineLabel(4, val, this._diffTimelineFadeOutTime);
        },
        get: function get() {
            return this.getDiffTimelineLabel(4);
        }
    }, {
        key: "diffTimelineSlot6",
        set: function set(val) {
            this.setDiffTimelineLabel(5, val, this._diffTimelineFadeOutTime);
        },
        get: function get() {
            return this.getDiffTimelineLabel(5);
        }
    }, {
        key: "playingTimelineInfoList",
        get: function get() {
            var result = [];
            if (!this.initialized) return result;
            var count = EmotePlayer_CountPlayingTimelines(this.playerId);
            for (var i = 0; i < count; i++) {
                var info = {
                    label: EmotePlayer_GetPlayingTimelineLabelAt(this.playerId, i),
                    flags: EmotePlayer_GetPlayingTimelineFlagsAt(this.playerId, i)
                };
                result.push(info);
            }
            return result;
        }
    }, {
        key: "animating",
        get: function get() {
            if (!this.initialized) return false;
            return EmotePlayer_IsAnimating(this.playerId);
        }
    }, {
        key: "stepUpdate",
        get: function get() {
            return this._stepUpdate;
        },
        set: function set(val) {
            if (this._stepUpdate == val) return;
            this._stepUpdate = val;
            this.modified = true;
        }
    }]);

    return EmotePlayer;
}();

;

EmotePlayer.TimelinePlayFlags = {
    PARALLEL: 1 << 0,
    DIFFERENCE: 1 << 1
};

EmotePlayer.MaskMode = {
    STENCIL: 0,
    ALPHA: 1
};

EmotePlayer.MS2FRAME = 1 * 60 / 1000;
EmotePlayer.FRAME2MS = 1 * 1000 / 60;
EmotePlayer.deviceRefCount = 0;
EmotePlayer.device = null;
EmotePlayer.renderCanvas = null;
EmotePlayer.maskMode = EmotePlayer.MaskMode.ALPHA;
EmotePlayer.protectTranslucentTextureColor = true;
EmotePlayer.maskRegionClipping = true;
EmotePlayer.globalMeshDivisionRatio = 1.0;

var _arr = ['hairScale', 'partsScale', 'bustScale'];

var _loop = function _loop() {
    var label = _arr[_i];

    var propLabel = 'global' + label.charAt(0).toUpperCase() + label.slice(1);
    var varLabel = "_" + propLabel;
    EmotePlayer[varLabel] = 1;
    EmotePlayer.__defineGetter__(propLabel, function () {
        return EmotePlayer[varLabel];
    });
    EmotePlayer.__defineSetter__(propLabel, function (val) {
        if (EmotePlayer[varLabel] == val) return;
        EmotePlayer[varLabel] = val;
        if (EmotePlayer.device) EmotePlayer.device.invalidateAllPlayersPhysics();
    });
};

for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
}

EmotePlayer.setRenderCanvas = function (canvas) {
    EmotePlayer.renderCanvas = canvas;
};

EmotePlayer.createRenderCanvas = function (width, height) {
    var body = document.getElementsByTagName("body")[0];
    if (body == null) alert("can't state body element on DOM.");

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "none";
    canvas.style.backgroundColor = "transparent";
    canvas.style.position = "absolute";

    body.appendChild(canvas);

    EmotePlayer.renderCanvas = canvas;
};

EmotePlayer.requireDevice = function () {
    if (EmotePlayer.deviceRefCount++ <= 0) EmotePlayer.device = new EmoteDevice();
};

EmotePlayer.releaseDevice = function () {
    if (--sEmotePlayer.deviceRefCount <= 0) {
        EmotePlayer.device.destroy();
        EmotePlayer.device = null;
    }
};

