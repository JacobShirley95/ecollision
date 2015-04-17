function SimulationEngine(a,d,h){function g(){this.time=0;this.particle2=this.particle=null}function k(b,m){var a=new PVector(b.xVel,b.yVel),e=Math.PI/2;0!==b.xVel&&(e=Math.atan(b.yVel/b.xVel));var k=(b.xVel*Math.cos(-e)-b.yVel*Math.sin(-e))*b.cOR,f=b.x-m.x,c=b.y-m.y,d=0,d=0!==f?Math.atan(c/f):Math.atan(c/(f-1E-5));a.x=k*Math.cos(d-e);a.y=k*Math.sin(d-e);return a}this.width=a;this.height=d;var c=[];this.setBounds=function(b,m){this.width=b;this.height=m};this.reset=function(){c=[]};this.addParticle=
function(b){if(c.length<h.maxParticles)b.index=c.length,c.push(b);else throw"ERROR: Number of particles exceeds the maximum value set.";};this.removeParticle=function(b){c.splice(b,1)};this.getParticle=function(b){return c[b]};this.numOfParticles=function(){return c.length};this.edgeCollision=function(b,m){var a=b.cOR;b.x+b.radius>=this.width?m?(b.xVel*=-a,b.yVel*=a):b.x=this.width-b.radius:0>=b.x-b.radius&&(m?(b.xVel*=-a,b.yVel*=a):b.x=b.radius);b.y+b.radius>=this.height?m?(b.xVel*=a,b.yVel*=-a):
b.y=this.height-b.radius:0>=b.y-b.radius&&(m?(b.xVel*=a,b.yVel*=-a):b.y=b.radius)};this.collide=function(b,a,k){var e=a.x-b.x,c=a.y-b.y,f=a.radius+b.radius;return e*e+c*c<f*f?(e=new PVector(b.x-a.x,b.y-a.y),a=new PVector(b.xVel-a.xVel,b.yVel-a.yVel),b=a.dotProduct(a),a=-2*a.dotProduct(e),f=e.dotProduct(e)-f*f,f=a*a-4*b*f,c=e=0,0<=f&&(e=(-a-Math.sqrt(f))/(2*b),c=(-a+Math.sqrt(f))/(2*b)),k.time=0<e&&1>=e?e:0<c&&1>=c?c:1,!0):!1};this.handleCollision=function(b){var a=b.particle,c=b.particle2,e=k(a,c),
d=k(c,a),f=(e.x*(a.mass-c.mass)+2*c.mass*d.x)/(a.mass+c.mass),h=(d.x*(c.mass-a.mass)+2*a.mass*e.x)/(a.mass+c.mass),g=Math.atan((a.y-c.y)/(a.x-c.x)),q=Math.cos(g),r=Math.sin(g),g=f*q+e.y*r,e=f*r-e.y*q,f=h*q+d.y*r,d=h*r-d.y*q;this.seperateObjects(b,a,c);a.xVel=g;a.yVel=e;c.xVel=f;c.yVel=d};this.seperateObjects=function(b,a,c){b=b.time+.001*b.time;if(1>b)a.x-=a.xVel*h.speedConst*b,a.y-=a.yVel*h.speedConst*b,c.x-=c.xVel*h.speedConst*b,c.y-=c.yVel*h.speedConst*b;else{b=c.x-a.x;var e=c.y-a.y;b=c.radius-
Math.abs(Math.sqrt(b*b+e*e)-a.radius)+.1;var e=(new PVector(a.xVel,a.yVel)).getMagnitudeNS()+1E-4,k=(new PVector(c.xVel,c.yVel)).getMagnitudeNS()+1E-4,e=e/(e+k);ang=Math.atan2(a.y-c.y,a.x-c.x);a.x+=b*Math.cos(ang)*e;a.y+=b*Math.sin(ang)*e;e=1-e;c.x-=b*Math.cos(ang)*e;c.y-=b*Math.sin(ang)*e}};this.update=function(){for(var b=0;b<c.length;b++){var a=c[b];this.edgeCollision(a,!0);a.update()}for(var k=[],b=0;b<c.length;b++)for(var a=c[b],e=b+1;e<c.length;e++){var d=c[e],f=new g;this.collide(a,d,f)&&(f.particle=
a,f.particle2=d,k.push(f))}k.sort(function(a,b){return a.time<b.time});for(b=0;b<k.length;b++)f=k[b],this.handleCollision(f);for(b=0;b<c.length;b++)a=c[b],this.edgeCollision(a,!1)}};function Point2D(a,d){this.x=a;this.y=d};function PVector(a,d){this.x=a;this.y=d;this.getMagnitude=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};this.getMagnitudeNS=function(){return this.x*this.x+this.y*this.y};this.dotProduct=function(a){return this.x*a.x+this.y*a.y};this.getNormal=function(){return new PVector(-this.y,this.x)};this.rotate=function(a){var d=this.x,k=this.y;this.x=d*Math.cos(a)-k*Math.sin(a);this.y=d*Math.sin(a)+k*Math.cos(a)}};function Particle(a,d,h,g,k){PhysicsObject.call(this,a,d,10);this.radius=h;this.style=g;this.cOR=1;this.selected=!1;var c=[],b=0;this.draw=function(a,d){this.displayObj.x=a;this.displayObj.y=d;var e=this.displayObj.graphics;e.clear();if(this.selected){for(var h=c.length,f=1;f<h;f++){var g=c[(f+b)%h],u=g.x-a,g=g.y-d;e.beginStroke("rgba(100, 100, 100, "+f/h+")").drawCircle(u,g,this.radius).endStroke()}e.beginStroke("red").setStrokeStyle(3).drawCircle(0,0,this.radius).endStroke()}e.beginFill(this.style).drawCircle(0,
0,this.radius).endFill();(this.selected||k.showVelocities)&&e.beginStroke("red").setStrokeStyle(3).moveTo(0,0).lineTo(this.xVel*k.updateRate,this.yVel*k.updateRate).endStroke()};this.select=function(){this.selected=!0};this.deselect=function(){this.selected=!1;c=[]};this.update=function(){this.x+=this.xVel*k.speedConst;this.y+=this.yVel*k.speedConst;var a=c.length;this.selected&&(b++,b%=k.maxTraceLength,a<k.maxTraceLength?c.push(new Point2D(this.x,this.y)):c[b]=new Point2D(this.x,this.y))};this.copy=
function(){var a=new Particle(this.x,this.y,this.radius,this.style,k);a.index=this.index;a.cOR=this.cOR;a.mass=this.mass;a.xVel=this.xVel;a.yVel=this.yVel;return a}}Particle.prototype=new PhysicsObject;function PhysicsObject(a,d,h){this.x=a;this.y=d;this.lastX=this.x;this.lastY=this.y;this.yVel=this.xVel=0;this.mass=h;this.displayObj=new createjs.Shape;this.displayObj.x=this.x;this.displayObj.y=this.y;this.capture=function(){this.lastX=this.x;this.lastY=this.y};this.update=function(){this.x+=this.xVel*speedConst;this.y+=this.yVel*speedConst};this.addEventHandler=function(a,d){this.displayObj.addEventListener(a,d)};this.getEnergy=function(){return.5*this.mass*(this.xVel*this.xVel+this.yVel*this.yVel)};
this.draw=function(a,d){this.displayObj.x=a;this.displayObj.y=d}};function Graph(a,d,h,g,k){Widget.call(this,a);this.scaleX=h;this.scaleY=g;this.y=this.x=0;this.engine=d;var c=new createjs.Shape,b=0,m=0,p=0,e=[],n=0,f=150,v=!1,u=0,q=0,r=0;this.init=function(){var a=new createjs.Shape,b=new createjs.Shape;a.graphics.beginStroke("red").moveTo(this.x,this.height).lineTo(this.width,this.height);b.graphics.beginStroke("red").moveTo(this.x,this.y).lineTo(this.x,this.height);this.stage.addChild(a);this.stage.addChild(b);this.stage.addChild(c);this.updateData()};this.draw=
function(a){if(null!=this.engine){a=c.graphics;a.clear();for(var d=e.length-1,f=0,l=0;l<d-1;l++){if(v){v=!1;return}var f=f+e[l].y,h=(n+l)%d,g=(n+l+1)%d,y=e[h].x*this.scaleX-b;y>this.width&&(b+=y-this.width);var y=e[h].x*this.scaleX-b,h=e[h].y*this.scaleY+m+p,B=e[g].x*this.scaleX-b,g=e[g].y*this.scaleY+m+p;a.beginStroke("red").moveTo(this.x+y,this.y+this.height-h).lineTo(this.x+B,this.y+this.height-g)}this.paused||(u+=1E3/k.updateRate,q=this.getEnergy(),this.addData(u,q));m=this.height/2-f/e.length*
this.scaleY;this.stage.update()}};this.restart=function(){e=[];b=m=u=q=n=0;v=!0};this.calibrate=function(){p=0};this.zoomIn=function(){if(r<k.graphMaxZoomIndex)this.scaleX*=k.graphZoomFactor,this.scaleY*=k.graphZoomFactor,b*=this.scaleX,m*=this.scaleY,this.updateData(),r++;else throw"ERROR: Maximum zoom reached";};this.zoomOut=function(){if(r>-k.graphMinZoomIndex)this.scaleX/=k.graphZoomFactor,this.scaleY/=k.graphZoomFactor,b*=this.scaleX,m*=this.scaleY,this.updateData(),r--;else throw"ERROR: Minimum zoom reached";
};this.moveUp=function(){p-=5};this.moveDown=function(){p+=5};this.addData=function(a,b){if(e.length>f){var c=n;n=(n+1)%f;e[c]=new Point2D(a,b)}else e.push(new Point2D(a,b))};this.updateData=function(){var a=[];f=Math.round(this.width/(1E3/k.updateRate*this.scaleX))+5;var b=e.length-1,c=0;for(b>f&&(c=b-f);c<b;c++)a.push(e[(n+c)%b]);v=!0;n=0;e=a};this.getEnergy=function(){for(var a=0,b=0;b<this.engine.numOfParticles();b++)a+=this.engine.getParticle(b).getEnergy();return Math.round(a/1E3)}}
Graph.prototype=new Widget;function Overlay(a,d,h){function g(a,b){return b?g(b,a%b):a}function k(){if(1==b){var a=d.addParticle(z,A,l.mass,l.radius,l.style);a.xVel=l.xVel;a.yVel=l.yVel;t.removeChild(l.displayObj);l=null;c=2}else t.stage.removeChild(e),c=0}Widget.call(this,a);this.hide();var c=0,b=-1,m=crossX=this.width/2,p=crossY=this.height/2,e=new createjs.Shape,n=new createjs.Text("","bold 15px Arial"),f=new createjs.Text("","bold 15px Arial","red"),v=0,u=!1,q=new createjs.Text("","bold 15px Arial");q.x=this.width/2-40;
q.y=10;var r=!1,w=!1,z=0,A=0,l=null,x=g(this.width,this.height),t=this;this.canvas.mousewheel(function(a){0>a.deltaY?l.radius>h.minRadius&&--l.radius:l.radius<h.maxRadius&&(l.radius+=1)});this.resize=function(a,b){x=g(this.width,this.height)};$(document).keydown(function(a){r=a.ctrlKey;w=a.shiftKey});$(document).keyup(function(a){w=r=!1});this.canvas.bind("contextmenu",function(a){return!1});this.init=function(){this.stage.removeAllChildren();m=crossX=this.width/2;p=crossY=this.height/2;this.stage.addChild(q)};
this.stage.addEventListener("stagemousemove",function(a){m=crossX=a.stageX;p=crossY=a.stageY;if(!r){a=Math.round(m/x);var b=Math.round(p/x);crossX=a*x;crossY=b*x}switch(c){case 0:e.x=crossX;e.y=crossY;null!=l&&(l.x=crossX,l.y=crossY);n.x=crossX-50;n.y=crossY-50;break;case 1:var f=e.graphics;a=crossX-e.x;b=crossY-e.y;n.x=e.x+a/2;n.y=e.y+b/2;n.text=Math.round(Math.sqrt(a*a+b*b))+" px/s";l.xVel=a/h.updateRate;l.yVel=b/h.updateRate;f.clear().beginStroke("red").setStrokeStyle(3).moveTo(0,0).lineTo(a,b);
break;case 2:for(f=0;f<d.engine.numOfParticles();f++){var k=d.engine.getParticle(f);a=k.x-m;b=k.y-p;a*a+b*b<=k.radius*k.radius?(k.select(),l=k):k.deselect()}}});this.canvas.mousedown(function(a){if(2==a.button&&2!=c)switch(c){case 0:t.end();k();break;case 1:k()}else switch(c){case 0:e.graphics.clear();t.stage.addChild(e);t.stage.addChild(n);c=1;break;case 1:try{var g=d.addParticle(l.x,l.y,l.mass,l.radius,l.style);g.xVel=l.xVel;g.yVel=l.yVel;g.cOR=l.cOR;t.stage.removeChild(e);t.stage.removeChild(n);
l.xVel=l.yVel=0;1!=b||w?c=0:(c=2,t.stage.removeChild(l.displayObj))}catch(m){f.text=m,f.x=t.width-f.getMeasuredWidth()-10,f.y=t.height/2,t.stage.addChild(f),v=h.errorTime,u=!0}break;case 2:l.displayObj.dispatchEvent("click"),2==a.button?d.removeSelected():(g=l,l=g.copy(),z=g.x,A=g.y,t.stage.addChild(l.displayObj),w||d.removeSelected(),c=0)}a.stopPropagation()});this.draw=function(a){this.hidden||(null!=l&&l.draw(l.x,l.y),u&&(v-=1E3/h.updateRate,0>=v&&(u=!1,this.stage.removeChild(f))),this.stage.update())};
this.beginAdd=function(a,f,e){this.show();this.init();l=new Particle(crossX,crossY,25,e,h);l.mass=a;l.cOR=f;n.x=m;n.y=p;this.stage.addChild(l.displayObj);q.text="Mode: Add";b=c=0};this.beginEdit=function(){this.show();this.init();q.text="Mode: Edit";c=2;b=1};this.end=function(){this.hide();this.stage.removeAllChildren();null!=l&&(l=null);b=-1;w=r=!1};this.getCurrentParticle=function(){return l};this.getMode=function(){return b}}Overlay.prototype=new Widget;function Simulation(a,d,h){Widget.call(this,a);this.engine=d;this.engine.width=this.width;this.engine.height=this.height;var g=-1;this.resize=function(a,c){this.engine.setBounds(a,c)};this.addParticle=function(a,c,b,d,p){a=new Particle(a,c,d,p,h);a.mass=b;var e=this.engine,n=this;a.addEventHandler("click",function(a){var b=e.getParticle(g);-1!=g&&(b.deselect(),n.onDeselect(b));for(var c=0;c<e.numOfParticles();c++)if(b=e.getParticle(c),b.displayObj==a.target){c!=g?(n.onSelect(b),g=c,b.selected=!0):
g=-1;break}});this.stage.addChild(a.displayObj);this.engine.addParticle(a);return a};this.onSelect=function(a){};this.onDeselect=function(a){};this.removeParticle=function(a){this.stage.removeChild(this.engine.getParticle(a).displayObj);this.engine.removeParticle(a)};this.loadParticles=function(a){this.restart();for(var c=0;c<a.length;c++){var b=a[c],d=this.addParticle(b.x,b.y,b.mass,b.radius,b.style);d.xVel=b.xVel;d.yVel=b.yVel;d.cOR=b.cOR}};this.saveParticles=function(a){for(var c=0;c<this.engine.numOfParticles();c++){var b=
this.engine.getParticle(c);a.push(b.copy())}};this.removeSelected=function(){-1!=g&&(this.removeParticle(g),g=-1)};this.getSelected=function(){var a=null;-1!=g&&(a=this.engine.getParticle(g));return a};this.getSelectedID=function(){return g};this.restart=function(){this.stage.removeAllChildren();g=-1;this.engine.reset()};this.draw=function(a){for(var c=0;c<this.engine.numOfParticles();c++){var b=this.engine.getParticle(c),d=b.x,g=b.y;h.enableInterpolation&&(g=b.y-b.lastY,d=b.lastX+a*(b.x-b.lastX),
g=b.lastY+a*g);b.draw(d,g)}this.stage.update()}}Simulation.prototype=new Widget;function Widget(a){this.hidden=!1;this.canvasName=a;this.canvas=$("#"+a);this.width=this.canvas.width();this.height=this.canvas.height();this.stage=new createjs.Stage(a);this.canvas.attr("width",this.width);this.canvas.attr("height",this.height);this.init=function(){};this.addEventListener=function(a,h){this.stage.addEventListener(a,h)};this.draw=function(a){};this.restart=function(){};this.stop=function(){};this.resume=function(){this.paused=!1};this.pause=function(){this.paused=!0};this.resize=
function(a,h){};this.show=function(){this.hidden=!1;this.canvas.fadeIn(200)};this.hide=function(){this.hidden=!0;this.canvas.fadeOut(200)}};function ECollision(a){this.settings=a;this.paused=!1;this.engine=new SimulationEngine(a.simulationWidth,a.simulationHeight,this.settings);this.simulationUI=new Simulation(a.simulationCanvas,this.engine,this.settings);this.graphUI=new Graph(a.graphCanvas,this.engine,.02,5,this.settings);this.overlayUI=new Overlay(a.overlayCanvas,this.simulationUI,this.settings);this.fps=0;var d=[this.simulationUI,this.graphUI,this.overlayUI],h=0,g=0,k=timeStamp=curTime=0,c=a.updateRate,b=1E3/c,m=1E3/a.refreshRate,
p=0,e=-1,n=this;this.start=function(){for(var b=0;b<d.length;b++)d[b].init();e=setInterval(this.tick,1E3/a.refreshRate)};this.restart=function(){for(var a=0;a<d.length;a++)d[a].restart()};this.resume=function(){this.paused=!1;for(var a=0;a<d.length;a++)d[a].resume()};this.pause=function(){this.paused=!0;for(var a=0;a<d.length;a++)d[a].pause()};this.stop=function(){-1!=e&&(clearInterval(e),e=-1)};this.getUpdateRate=function(){return c};this.getUpdateTime=function(){return b};this.setUpdateRate=function(a){c=
a;b=1E3/c};this.setSpeedConst=function(a){this.engine.speedConst=a};this.onTick=function(){};this.update=function(){curTime+=m;if(k+b<curTime){timeStamp=curTime;if(a.enableInterpolation)for(var c=0;c<this.engine.numOfParticles();c++)this.engine.getParticle(c).capture();for(;k+b<curTime;)this.engine.update(),k+=b}p=Math.min(1,(curTime-timeStamp)/b)};this.tick=function(){n.paused||n.update();var a=(new Date).getTime();h++;1E3<=a-g&&(n.fps=h,h=0,g=a);for(a=0;a<d.length;a++)d[a].draw(p);n.onTick()}};var eCollisionSettings={simulationWidth:1E3,simulationHeight:1E3,simulationCanvas:"simulation-canvas",graphCanvas:"graph-canvas",overlayCanvas:"overlay-canvas",refreshRate:60,updateRate:60,showVelocities:!1,enableInterpolation:!0,maxTraceLength:30,graphScaleX:.02,graphScaleY:5,graphZoomFactor:1.25,graphMinZoomIndex:5,graphMaxZoomIndex:5,speedConst:1,maxParticles:100,minRadius:5,maxRadius:30,errorTime:5E3};$.widget("custom.sliderEx",$.ui.slider,{_unit:"",_amount:null,_formatVal:function(a){.09<a&&1>a&&(a=a.toPrecision(2));return a+" "+this._unit},_slide:function(){this._superApply(arguments);this._amount.text(this._formatVal(this.options.value));var a=this.handle.position();this._amount.width();this._amount.css("left",a.left+"px")},_start:function(){this._superApply(arguments);var a=this.handle.css("left");this._amount.css("visibility","visible").hide().fadeIn("fast").css("left",a)},_stop:function(){this._superApply(arguments);
this._amount.fadeOut("fast")},_create:function(){var a=parseFloat(this.element.attr("min")),d=parseFloat(this.element.attr("max"));this.options.min=a;this.options.max=d;this.options.step=parseFloat(this.element.attr("step"))||1;this.options.value=parseFloat(this.element.attr("value"))||a+d/2;this._unit=this.element.attr("unit")||"";this._amount=$('<div class="slider-amount">'+this._formatVal(this.options.value)+"</div>");this.element.append(this._amount).mousedown(function(a){a.stopPropagation()});
this._super()}});function getRandomColor(){for(var a="0123456789ABCDEF".split(""),d="#",h=0;6>h;h++)d+=a[Math.floor(16*Math.random())];return d}function toDegrees(a){a=a/Math.PI*180+90;0>a?a+=360:360<a&&(a-=360);return a}function setCol(a,d){return(""+a).fontcolor(d)}function setColGreen(a){return setCol(a,"green")}function dbgBool(a){return a?setCol(""+a,"green"):setCol(""+a,"red")}function log(a){console.log(a)}
$("#slider-mass").sliderEx({slide:function(a,d){var h=ecollision.overlayUI.getCurrentParticle()||ecollision.simulationUI.getSelected();null!=h&&(h.mass=d.value)}});$("#slider-cor").sliderEx({slide:function(a,d){var h=ecollision.overlayUI.getCurrentParticle()||ecollision.simulationUI.getSelected();null!=h&&(h.cOR=d.value)}});
function openAdd(){if(0==ecollision.overlayUI.getMode())ecollision.overlayUI.end();else{var a=$("#slider-mass").sliderEx("value"),d=$("#slider-cor").sliderEx("value");ecollision.overlayUI.beginAdd(a,d,currentColor)}}function openEdit(){1==ecollision.overlayUI.getMode()?ecollision.overlayUI.end():ecollision.overlayUI.beginEdit()}$(document).keypress(function(a){97==a.charCode?openAdd():101==a.charCode&&openEdit()});$("#add-particle").click(function(){openAdd()});$("#remove-particle").click(function(){openEdit()});
var currentColor=getRandomColor();$("#generate-colour").click(function(){var a=ecollision.overlayUI.getCurrentParticle()||ecollision.simulationUI.getSelected();null!=a&&(currentColor=getRandomColor(),a.style=currentColor)});$("#calibrate").click(function(){ecollision.graphUI.calibrate()});$("#zoom-in").click(function(){ecollision.graphUI.zoomIn()});$("#zoom-out").click(function(){ecollision.graphUI.zoomOut()});$("#move-up").click(function(){ecollision.graphUI.moveUp()});$("#move-down").click(function(){ecollision.graphUI.moveDown()});
$("#btn-sim-data").click(function(){eCollisionSettings.showVelocities=!eCollisionSettings.showVelocities});$("#btn-run-pause").click(function(){ecollision.paused?ecollision.resume():ecollision.pause();changeRunPauseBtn()});function changeRunPauseBtn(){ecollision.paused?$("#btn-run-pause").removeClass("icon-pause").addClass("icon-playback-play").text("RUN"):$("#btn-run-pause").removeClass("icon-playback-play").addClass("icon-pause").text("PAUSE")}$("#btn-next").click(function(){ecollision.update()});
var savedState=[];$("#btn-save").click(function(){savedState=[];ecollision.simulationUI.saveParticles(savedState)});$("#btn-load").click(function(){ecollision.simulationUI.loadParticles(savedState)});$("#btn-reset").click(function(){ecollision.restart()});$("#sim-speed-slider").sliderEx({slide:function(a,d){eCollisionSettings.speedConst=parseFloat(d.value)}});var ecollision=new ECollision(eCollisionSettings),fpsDiv=$("#fps-div"),particleInfo=$("#particle-info-box");
ecollision.simulationUI.onSelect=function(a){$("#slider-mass").sliderEx("value",a.mass);$("#slider-cor").sliderEx("value",a.cOR)};
ecollision.onTick=function(){(new Date).getTime();if(eCollisionSettings.showVelocities){var a="",a=24>ecollision.fps?setCol(ecollision.fps,"red"):setCol(ecollision.fps,"green");debugStr="Frame rate: "+a+" Hz<br /> Update rate: "+setColGreen(ecollision.getUpdateRate())+" Hz<br /> Energy in system: "+setColGreen(ecollision.graphUI.getEnergy())+" kJ<br /> Number of particles: "+setColGreen(ecollision.engine.numOfParticles());fpsDiv.html(debugStr)}else fpsDiv.html("");a=ecollision.simulationUI.getSelected();
if(null!=a){var d="<b>XVel:</b> "+Math.round(a.xVel*eCollisionSettings.updateRate)+" px/s<br /> <b>YVel:</b> "+Math.round(a.yVel*eCollisionSettings.updateRate)+" px/s<br /> <b>Direction:</b> "+Math.round(toDegrees(Math.atan2(a.yVel,a.xVel)))+" degrees<br /> <b>Mass:</b> "+a.mass+" kg<br /> <b>CoR:</b> "+a.cOR+"<br /> <b>Radius:</b> "+a.radius+" px";"<br /> <b>Energy:</b> "+Math.round(a.getEnergy())+" J";particleInfo.html(d)}else particleInfo.html("")};ecollision.start();