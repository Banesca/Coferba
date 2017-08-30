
AdfAutoDismissalManager.prototype._dismissOnMouseOver= function(x53)
{
 var x54=this._componentStack;
for(var x55=x54.length - 1;x55>=0;x55--)
{
 var x56=x54[x55];
 if((x56.type==AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT||
x56.type==AdfDhtmlPopupWindow.HINT_AUTODISMISS_TIMEOUT)&&
 !this._cancelDismissal(x53,x56))
{
 var x57=x56.dismissalBehavior;
AdfAssert.assertFunction(x57);
x57(x55);
}
}
}
AdfAutoDismissalManager.prototype._undismissDueToActiveIframe= function(x58)
{
 var x59=this._componentStack;
for(var x60=x59.length - 1;x60>=0;x60--)
{
 var x61=x59[x60];
 var x62=AdfPage.PAGE;
 if (x61.type==AdfDhtmlPopupWindow.HINT_AUTODISMISS_INACTIVATE)
{
 var x63=x61["id"];
 var x64=x62.findComponent(x63);
 var x65=x64.getPeer();
x65.bind(x64);
 var x66=x65.getAllPopups(x64);
 if (x66!=null)
{
 var x67=x66[x63];
 var x68=x67.getElement();
 if (AdfDomUtils.isAncestor(x68,x58))
{
x67.handleActivate(false); return;
}
}
}
 else
 {
this.dismiss(x58);
}
}
}
AdfAutoDismissalManager.prototype._cancelDismissal= function(x69,x70)
{
 var x71=x70["id"];
 var x72=x70[AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT_ID];
 var x73=x70[AdfRichPopup.HINT_LAUNCH_ID];
 var x74=AdfPage.PAGE.findComponent(x71);
 var x75=x74.getPeer();
x75.bind(x74);
 var x76=x75.getAllPopups(x74);
 if (x76==null)
 return false;
 var x77=
this._isTargetInPopup(x69,x76)||
this._popupUnderneathGlassPane(x76);
 var x78;
switch(x70["type"])
{
 case AdfDhtmlPopupWindow.HINT_AUTODISMISS_ALWAYS:
x78=x77;
 if(!x78&&x73
&&AdfDomUtils.isAncestorOrSelf(AdfAgent.AGENT.getElementById(x73),x69))
{
x78=true;
}
break;
 case AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU:
x78=x77||this._isTargetInOwner(x69,x74);
break;
 case AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT:
 if(x72)
{
x78=x77||AdfDomUtils.isAncestorOrSelf(
AdfAgent.AGENT.getElementById(x72),x69);
}
 else
 x78=x77||this._isTargetInOwner(x69,x74);
break;
 case AdfDhtmlPopupWindow.HINT_AUTODISMISS_INACTIVATE:
x78=x77;
break;
 case AdfDhtmlPopupWindow.HINT_AUTODISMISS_TIMEOUT:
x78= !this._isTargetInPopup(x69,x76);
break;
}
 return x78;
}
AdfAutoDismissalManager.prototype._isTargetInPopup= function(x79,x80)
{
 var x81=null;
for(var x82 in x80)
{
 var x83=x80[x82];
 var x84=x83.getElement();
 if (AdfDomUtils.isAncestor(x84,x79))
{
 return true;
}
 if (x81==null)
{
x81=this._getContainingComponent(x79);
}
 if (x82&&this._isComponentAncestor(x82,x81))
{
 return true;
}
}
 return false;
}
AdfAutoDismissalManager.prototype._getContainingComponent= function(x85)
{
 var x86=AdfPage.PAGE;
while(x85)
{
 var x87=x85.id;
 var x88=(x87)?x86.findComponent(x87):null;
 if (x88)
{
 return x88;
}
x85=x85.parentNode;
}
 return null;
}
AdfAutoDismissalManager.prototype._isComponentAncestor= function(x89,x90)
{
while(x90)
{
 if (x89==x90.getClientId())
{
 return true;
}
x90=x90.getParent();
}
 return false;
}
AdfAutoDismissalManager.prototype._popupUnderneathGlassPane= function(x91)
{
for(var x92 in x91)
{
 var x93=x91[x92];
 var x94=x93.getElement();
 var x95=AdfPage.PAGE.getModalityManager();
 if (x95.isGlassPaneVisible())
{
 if (!x95.isAboveTopGlassPane(x94))
 return true;
}
}
 return false;
}
AdfAutoDismissalManager.prototype._isTargetInOwner= function(x96,x97)
{
 var x98=x97.getPeer();
x98.bind(x97);
 var x99=x98.getDomElement();
 return AdfDomUtils.isAncestorOrSelf(x99,x96);
}
AdfAutoDismissalManager.prototype._inactivateDismissalBehavior= function(x100)
{
AdfAssert.assertNumber(x100);
 var x101=this._componentStack;
 var x102=x101[x100];
 var x103=x102["id"];
 var x104=AdfPage.PAGE.findComponent(x103);
 var x105=x104.getPeer().getPopupWindow(x104,x103);
 if (x105&&x105 instanceof AdfDhtmlSimpleFloat)
{
 var x106=AdfDhtmlDialogManager.getInstance();
 if (x106.getActiveDialog()==x105)
{
x106.deactivateCurrentDialog();
}
}
}
AdfAutoDismissalManager.prototype._hideDismissalBehavior= function(x107)
{
AdfAssert.assertNumber(x107);
 var x108=AdfPage.PAGE;
 var x109=this._componentStack;
 var x110=x109[x107];
 var x111=x110["id"];
 var x112=x108.findComponent(x111);
this._hideComponentPopups(x112);
}
AdfAutoDismissalManager.prototype._cancelTimeoutDismissalBehavior= function(x113)
{
AdfAssert.assertNumber(x113);
 var x114=AdfPage.PAGE;
 var x115=this._componentStack;
 var x116=x115[x113];
 var x117=x116["timer"];
AdfAssert.assertNumber(x117);
x114.cancelTimer(x117);
x116["type"]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
x116.dismissalBehavior=this.createCallback(this._hideDismissalBehavior);
 delete x116["timer"];
}
AdfAutoDismissalManager._timeoutDismissalBehavior= function(x118)
{
 var x119=x118.stackObj;
 var x120=x119["type"];
 if (x120!=AdfDhtmlPopupWindow.HINT_AUTODISMISS_TIMEOUT)
 return;
 var x121=x118.myself;
 var x122=x119["id"];
 var x123=AdfPage.PAGE.findComponent(x122);
x121._hideComponentPopups(x123);
}
AdfAutoDismissalManager.prototype._hideComponentPopups= function(x124)
{
 var x125=x124.getPeer();
 if (x124 instanceof AdfRichMenu)
{
x125.cancelPopup();
}
 else
 {
x125.cancelAllPopups(x124);
}
}
AdfAutoDismissalManager.prototype._registerEventHandlers= function()
{
 var x126=AdfAgent.AGENT,x127=(x126.getPlatform()==AdfAgent.IE_PLATFORM);
 var x128=x126.getDomDocument();
 var x129=this._keyupCallback=this.createCallback(this._handleKeyDown);
x126.addBubbleEventListener(x128,"keyDown",x129);
 var x130=this._mousedownCallback=this.createCallback(this._handleMouseDown);
x126.addBubbleEventListener(x128.body,"mousedown",x130);
 if(x127)
{
 var x131=this._focusinCallback=this.createCallback(this._handleFocusIn);
x126.addBubbleEventListener(x128,"focusin",x131);
}
 else
 {
 var x132=this._blurCallback=this.createCallback(this._handleBlur);
x126.addBubbleEventListener(x128,"blur",x132);
}
 var x133=this._mouseoverCallback=this.createCallback(this._handleMouseOver);
x126.addBubbleEventListener(x128,"mouseover",x133);
}
AdfAutoDismissalManager.prototype._unregisterEventHandlers= function()
{
 var x134=AdfAgent.AGENT,x135=(x134.getPlatform()==AdfAgent.IE_PLATFORM);
 var x136=x134.getDomDocument();
 var x137=this._keyupCallback;
 if (x137)
{
x134.removeBubbleEventListener(x136,"keyDown",x137);
 delete this._keyupCallback;
}
 var x138=this._mousedownCallback;
 if (x138)
{
x134.removeBubbleEventListener(x136.body,"mousedown",x138);
 delete this._mousedownCallback;
}
 if(x135)
{
 var x139=this._focusinCallback;
 if (x139)
{
x134.removeBubbleEventListener(x136,"focusin",x139);
 delete this._focusinCallback;
}
}
 else
 {
 var x140=this._blurCallback;
 if (x140)
{
x134.removeBubbleEventListener(x136,"blur",x140);
 delete this._blurCallback;
}
}
 var x141=this._mouseoverCallback;
 if (x141)
{
x134.removeBubbleEventListener(x136,"mouseover",x141);
 delete this._mouseoverCallback;
}
}
AdfAutoDismissalManager.prototype._handleFocusIn= function(x142)
{
 var x143=AdfAgent.AGENT.getEventTarget(x142);
 if (x143&&x143.tagName=="IFRAME")
{
this.dismiss(x143);
}
}
AdfAutoDismissalManager.prototype._handleMouseDown= function(x144)
{
this.dismiss(AdfAgent.AGENT.getEventTarget(x144));
}
AdfAutoDismissalManager.prototype._handleKeyDown= function(x145)
{
 var x146=x145.keyCode||x145.which;
 if (x146==AdfKeyStroke.TAB_KEY)
{
this.dismiss(AdfAgent.AGENT.getEventTarget(x145));
}
}
AdfAutoDismissalManager.prototype._handleBlur= function(x147)
{
 var x148=this._handleBlurTimeout;
 if (!x148&&(x147.target instanceof HTMLDocument))
{
 var x149={myself:this,blurringElement:x147.target};
 var x150=AdfPage.PAGE;
this._handleBlurTimeout=x150.scheduleTimer(this,AdfAutoDismissalManager._dismissBlurringElement,x149,100);
}
}
AdfAutoDismissalManager._dismissBlurringElement= function(x151)
{
 var x152;
 var x153=AdfAgent.AGENT.getDomDocument();
 var x154=x153.activeElement;
 if (x154){
try
{
x152=x154.tagName;
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsInfo(e,"unable to detect the activeElement");
}
}
 var x155=x151.myself;
 if (x152=="IFRAME"||x152=="BODY")
{
x155._undismissDueToActiveIframe(x154);
}
 delete this._handleBlurTimeout;
}
AdfAutoDismissalManager.prototype.cancelBlurTimeout= function()
{
 var x156=this._handleBlurTimeout;
 if (x156)
{
 var x157=AdfPage.PAGE;
x157.cancelTimer(x156);
 delete this._handleBlurTimeout;
}
}
AdfAutoDismissalManager.prototype._handleMouseOver= function(x158)
{
 var x159=AdfPage.PAGE;
 var x160=this._moTimeout;
 if (x160)
{
x159.cancelTimer(x160);
 delete this._moTimeout;
}
 var x161={myself:this,lastMOTarget:AdfAgent.AGENT.getEventTarget(x158)};
this._moTimeout=x159.scheduleTimer(this,AdfAutoDismissalManager._handleMouseOverTimeout,x161,300);
}
AdfAutoDismissalManager._handleMouseOverTimeout= function(x162)
{
 var x163=x162.myself;
 var x164=x162.lastMOTarget;
x163._dismissOnMouseOver(x164);
 delete this._moTimeout;
}

function AdfClientBehavior()
{
}
AdfObject.createSubclass(AdfClientBehavior);
AdfClientBehavior.prototype.initialize= function(x0)
{
AdfAssert.failedInAbstractFunction();
}

function AdfJsfAjaxRequestEvent(x0,x1,x2)
{
 var x3;
 if (typeof x0=="string")
{
x3=document.getElementById(x0);
}
 else
 {
x3=x0;
}
AdfAssert.assertDomElement(x3);
 var x4=AdfDomUtils.getFormElement(x3);
 var x5=AdfRichUIPeer.getFirstAncestorComponent(x3);
this._sourceElement=x3;
this._event=x1;
this._options=x2;
this.Init(x5);
 var x6={
"javax.faces.source":(typeof x0=="string")?
x0:x3.id,
"javax.faces.partial.ajax":"true"
};
 if (x1)
{
x6["javax.faces.partial.event"]=x1.type;
}
 if (x2.execute)
{
 var x7=x2.execute;
 if (x7.indexOf("@none")<0)
{
 if (x7.indexOf("@all")<0)
{
x7=x7.replace("@this",x6["javax.faces.source"])
.replace("@form",x4.id);
 if (AdfCollections.indexOf(x7.split(" "))<0)
{
x7+=" " + (x3.name||x3.id);
}
}
 else
 {
x7="@all";
}
x6["javax.faces.partial.execute"]=x7;
}
}
 if (x2.render!=null)
{
 var x8=x2.render;
 if (x8.indexOf("@none")<0)
{
 if (x8.indexOf("@all"<0))
{
x8=x8.replace("@this",x6["javax.faces.source"])
.replace("@form",x4.id);
}
 else
 {
x8="@all";
}
x6["javax.faces.partial.render"]=x8;
}
}
for(var x9 in x2)
{
switch(x9)
{
 case "execute":
 case "render":
 case "onerror":
 case "onevent":
break;
default:
x6[x9]=x2[x9];
break;
}
}
AdfDhtmlPage.__addServerParamsToEvent(this,x6);
}
AdfObject.createSubclass(AdfJsfAjaxRequestEvent,AdfComponentEvent);
AdfJsfAjaxRequestEvent.REQUEST_EVENT_TYPE="jsfrequest";
AdfJsfAjaxRequestEvent.prototype.Init= function(x0)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfJsfAjaxRequestEvent.superclass.Init.call(this,x0,AdfJsfAjaxRequestEvent.REQUEST_EVENT_TYPE);
}
AdfJsfAjaxRequestEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfJsfAjaxRequestEvent.prototype.IsDeleveryDiscrete= function()
{
 return true;
}
AdfJsfAjaxRequestEvent.queue= function(x1,x2,x3)
{
 new AdfJsfAjaxRequestEvent(x1,x2,x3).queue(true);
}
var AdfCollections= new Object();
AdfCollections.EMPTY_ARRAY= new Array();
AdfCollections.isArray= function(
x0)
{
 if (x0)
{
 return Array.prototype.isPrototypeOf(x0);
}
 return false;
}
AdfCollections.clear= function(
x1
)
{
 if (!x1)
 return;
for(var x2 in x1)
{
 delete x1[x2];
}
}
AdfCollections.isEmpty= function(x3)
{
 var x4=true;
for(var x5 in x3)
{
x4=false;
break;
}
 return x4;
}
AdfCollections.clearArray= function(
x6
)
{
x6.length=0;
}
AdfCollections.cloneArray= function(x7)
{
 if (!x7)
 return null;
 var x8= new Array(x7.length);
 return AdfCollections.copyInto(x8,x7);
}
AdfCollections.copyInto= function(
x9,
x10,
x11)
{
 if (x9&&x10&&(x9!==x10))
{
for(var x12 in x10)
{
 var x13;
 if (x11)
{
x13=x11(x12);
}
 else
 {
x13=x12;
}
try
{
x9[x13]=x10[x12];
}
catch(e)
{
}
}
}
 return x9;
}
AdfCollections.copyProperties= function(
x14,
x15,
x16,
x17
)
{
 if (!x14|| !x15|| !x16||(x14===x15))
 return;
 var x18=x16.length;
for(var x19=0;x19<x18;x19++)
{
 var x20=x16[x19];
 var x21=x15[x20];
 if (x21)
{
 var x22;
 if (x17)
{
x22=x17(x20);
}
 else
 {
x22=x20;
}
try
{
x14[x22]=x21;
}
catch(e)
{
}
}
}
 return x14;
}
AdfCollections.removeAll= function(
x23,
x24,
x25
)
{
 if (x25)
{
 if (x25!==x23)
{
x25.clear();
}
}
 else
 {
x25= new Object();
}
 if (!x23)
{
 return x25;
}
AdfCollections.copyInto(x25,x23);
 if (x24)
{
for(var x26 in x24)
{
 delete x25[x26];
}
}
 return x25;
}
AdfCollections.union= function(
x27,
x28,
x29
)
{
 if ((x27==null)||(x28==null))
{
 var x30=(x27==null)
?x28
:x27;
 if (x29)
{
AdfCollections.clear(x29);
AdfCollections.copyInto(x29,x30);
}
 return x30;
}
 if (!x29)
{
x29= new Object();
}
 else
 {
 if ((x29!==x27)&&(x29!==x28))
{
AdfCollections.clear(x29);
}
}
AdfCollections.copyInto(x29,x27);
AdfCollections.copyInto(x29,x28);
 return x29;
}
AdfCollections.getKeyOf= function(
x31,
x32
)
{
 if (x31)
{
for(var x33 in x31)
{
 if (x31[x33]===x32)
{
 return x33;
}
}
}
}
AdfCollections.removeValue= function(
x34,
x35
)
{
 var x36=AdfCollections.getKeyOf(x34,x35);
 if (x36)
{
 delete x34[x36];
}
 return x36;
}
AdfCollections.removeArrayValue= function(
x37,
x38
)
{
 if (x37)
{
AdfAssert.assertArray(x37);
 var x39=x37.length;
for(var x40=0;x40<x39;x40++)
{
 if (x37[x40]==x38)
{
x37.splice(x40,1);
 return x40;
}
}
}
 return -1;
}
AdfCollections.removeArrayKey= function(
x41,
x42
)
{
 var x43=parseInt(x42);
 if (isNaN(x43))
{
 delete x41[x42];
}
 else
 {
x41.splice(x43,1);
}
}
AdfCollections.addArrayKey= function(
x44,
x45,
x46
)
{
 var x47=parseInt(x45);
 if (isNaN(x47))
{
x44[x45]=x46;
}
 else
 {
x44.splice(x47,0,x46);
}
}
AdfCollections.indexOf= function(
x48,
x49
)
{
AdfAssert.assertArrayOrNull(x48);
 if (!x48)
 return -1;
 var x50= -1;
 var x51=x48.length;
for(var x52=0;x52<x51;x52++)
{
 if (x48[x52]==x49)
{
x50=x52;
break;
}
}
 return x50;
}

function AdfMarshalingService()
{
this.Init();
}
AdfObject.createSubclass(AdfMarshalingService);
AdfMarshalingService.prototype.Init= function()
{
AdfMarshalingService.superclass.Init.call(this);
this._typeMap= new Object();
this._nameMap= new Object();
}
AdfMarshalingService.prototype.registerEncoder= function(x0)
{
 var x1=x0.getNamespace();
 var x2=x0.getTypeMap();
 var x3=this._typeMap;
for(var x4 in x2)
{
 var x5=x2[x4];
x3[x4]={"name":x5,"encoder":x0};
}
}
AdfMarshalingService.prototype.marshal= function(x6,x7,x8)
{
 var x9=this._getEncoderEntryByType(x7.constructor);
 if (x9==null)
x9=this._getEncoderEntryByType(Object);
 if (x8==null)
x8= new AdfMarshalingService._ObjectStack();
 else if (x8.isParent(x7))
 return null;
x8.push(x7);
 var x10=x9.encoder;
 var x11=x9.name;
 var x12=AdfMarshalingService._createElementNS(x6.ownerDocument,
x10.getNamespace(),
x11);
x6.appendChild(x12);
x10.encode(x12,x7,x8,this);
x8.pop(x7);
 return x12;
}
AdfMarshalingService.getDefault= function()
{
 var x13=AdfMarshalingService._defaultService;
 if (!x13)
{
x13= new AdfMarshalingService();
 var x14= new AdfMarshalingService._DE();
x13.registerEncoder(x14);
AdfMarshalingService._defaultService=x13;
}
 return x13;
}
AdfMarshalingService.prototype._getEncoderEntryByType= function(x15)
{
 var x16;
 if (x15===String)
x16="String";
 else if (x15===Boolean)
x16="Boolean";
 else if (x15===Number)
x16="Number";
 else if (x15===Array)
x16="Array";
 else if (x15===Date)
x16="Date";
 else if (AdfUIComponent.prototype.isPrototypeOf(x15.prototype))
{
x16="AdfUIComponent";
}
 else if (AdfKeyStroke===x15)
{
x16="AdfKeyStroke";
}
 else
 x16="Object";
 return this._typeMap[x16];
}
AdfMarshalingService._createElementNS= function(x17,x18,x19)
{
 if(AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM)
 return x17.createNode(1,x19,x18);
 else
 return x17.createElementNS(x18,x19);
}
AdfMarshalingService._ObjectStack= function()
{
this.stack= new Array();
}
AdfMarshalingService._ObjectStack.prototype.push= function(x20)
{
this.stack.push(x20);
}
AdfMarshalingService._ObjectStack.prototype.pop= function()
{
 return this.stack.pop();
}
AdfMarshalingService._ObjectStack.prototype.isParent= function(x21)
{
 var x22=this.stack;
 var x23=x22.length;
for(var x24=0;x24<x23;x24++)
{
 var x25=x22[x24];
 if (x25===x21)
{
 var x26=x21.constructor;
 var x27=x25.constructor;
 if (x26===x27)
 return true;
}
}
 return false;
}
AdfMarshalingService._DE= function()
{
 var x28={};
x28["Number"]=AdfMarshalingService._DE.NUMBER;
x28["Boolean"]=AdfMarshalingService._DE.BOOLEAN;
x28["String"]=AdfMarshalingService._DE.STRING;
x28["Date"]=AdfMarshalingService._DE.DATE;
x28["Array"]=AdfMarshalingService._DE.ARRAY;
x28["Object"]=AdfMarshalingService._DE.MAP;
x28["AdfUIComponent"]=AdfMarshalingService._DE.ADFUICOMPONENT;
x28["AdfKeyStroke"]=AdfMarshalingService._DE.ADFKEYSTROKE;
this._typeMap=x28;
}
AdfMarshalingService._DE.ARRAY_NULL_ELEM="o";
AdfMarshalingService._DE.KEY_ELEM="k";
AdfMarshalingService._DE.VALUE_ATTR="v";
AdfMarshalingService._DE.COUNT_ATTR="n";
AdfMarshalingService._DE.NUMBER="n";
AdfMarshalingService._DE.BOOLEAN="b";
AdfMarshalingService._DE.STRING="s";
AdfMarshalingService._DE.DATE="d";
AdfMarshalingService._DE.ARRAY="a";
AdfMarshalingService._DE.MAP="m";
AdfMarshalingService._DE.ADFUICOMPONENT="AdfUIComponent";
AdfMarshalingService._DE.ADFKEYSTROKE="AdfKeyStroke";
AdfMarshalingService._DE.prototype.getNamespace= function()
{
 return "http://oracle.com/richClient/comm";
}
AdfMarshalingService._DE.prototype.getTypeMap= function()
{
 return this._typeMap;
}
AdfMarshalingService._DE.prototype.encode= function(x29,x30,x31,x32)
{
 var x33=null;
 var x34=x29.ownerDocument;
 var x35=x30.constructor;
 if (x35==String||x35==Number)
x33=x30;
 else if (x35==Boolean)
x33=(x30?"1":"0");
 else if (x35==Date)
x33=x30.getTime();
 else if (x35==Array)
{
for(var x36=0;x36<x30.length;x36++)
{
 var x37=null;
 if (x30[x36]!=null)
x37=x32.marshal(x29,x30[x36],x31);
 if (x37==null)
x29.appendChild(AdfMarshalingService._createElementNS(
x34,
this.getNamespace(),
AdfMarshalingService._DE.ARRAY_NULL_ELEM));
}
x29.setAttribute(AdfMarshalingService._DE.COUNT_ATTR,x30.length);
}
 else if (x35==Object)
{
for(var x38 in x30)
{
 var x39=AdfMarshalingService._createElementNS(
x34,
this.getNamespace(),
AdfMarshalingService._DE.KEY_ELEM);
x39.setAttribute(AdfMarshalingService._DE.VALUE_ATTR,x38);
x29.appendChild(x39);
 if (x30[x38]!=null)
x32.marshal(x39,x30[x38],x31);
}
}
 else
 {
 if (AdfUIComponent.prototype.isPrototypeOf(x30))
{
x33=x30.getClientId();
}
 else if (AdfKeyStroke.prototype.isPrototypeOf(x30))
{
x33=x30.toMarshalledString();
}
 else
 {
for(var x40 in x30)
{
try
{
 var x41=x30[x40];
 if (x41!=null&& typeof(x41)!="function")
{
 var x42=AdfMarshalingService._createElementNS(
x34,
this.getNamespace(),
AdfMarshalingService._DE.KEY_ELEM);
x42.setAttribute(AdfMarshalingService._DE.VALUE_ATTR,x40);
x29.appendChild(x42);
x32.marshal(x42,x41,x31);
}
}
catch(exp)
{
AdfLogger.LOGGER.logError(exp,AdfLogger.WARNING,"Error in marshaling object");
}
}
}
}
 if (x33!=null)
x29.appendChild(x34.createTextNode(x33.toString()));
}

function AdfDataTransferRequestEvent(
x0,
x1,
x2
)
{
this.Init(x0,x1,x2);
}
AdfDataTransferRequestEvent.STATUS_QUEUED=1;
AdfDataTransferRequestEvent.STATUS_SEND_BEFORE=2;
AdfDataTransferRequestEvent.STATUS_SEND_AFTER=3;
AdfDataTransferRequestEvent.STATUS_COMPLETE=4;
AdfObject.createSubclass(AdfDataTransferRequestEvent);
AdfDataTransferRequestEvent.prototype.Init= function(
x0,
x1,
x2
)
{
AdfDataTransferRequestEvent.superclass.Init.call(this);
this._status=x0;
this._context=x1;
this._request=x2;
}
AdfDataTransferRequestEvent.prototype.getStatus= function()
{
 return this._status;
}
AdfDataTransferRequestEvent.prototype.getContext= function()
{
 return this._context;
}
AdfDataTransferRequestEvent.prototype.getResponseXML= function()
{
AdfAssert.assert(this._status==AdfDataTransferRequestEvent.STATUS_COMPLETE,
"invalid call to getResponseXML, request is not complete");
 return this._request.getResponseXML();
}
AdfDataTransferRequestEvent.prototype.toDebugString= function()
{
 var x3=AdfDataTransferRequestEvent.superclass.toDebugString.call(this);
x3+=", status=" + this._status;
x3+=", context=" + this._context;
x3+=", request=" + this._request;
 return x3;
}
AdfDataTransferRequestEvent.prototype._isResponseValidXML= function()
{
 var x4=this._request.getResponseXML();
 return (x4!=null&&
x4.documentElement!=null&&
AdfAgent.AGENT.getNodeName(x4.documentElement)!="parsererror");
}
AdfDataTransferRequestEvent.prototype.getResponseText= function()
{
AdfAssert.assert(this._status==AdfDataTransferRequestEvent.STATUS_COMPLETE,
"invalid call to getResponseText, request is not complete");
 return this._request.getResponseText();
}
AdfDataTransferRequestEvent.prototype.getResponseStatusCode= function()
{
AdfAssert.assert(this._status==AdfDataTransferRequestEvent.STATUS_COMPLETE,
"invalid call to getResponseStatusCode, request is not complete");
 var x5=0;
try
{
x5=this._request.getStatus();
}
catch(e)
{
}
 return x5;
}
AdfDataTransferRequestEvent.prototype._getAllResponseHeaders= function()
{
AdfAssert.assert(this._status==AdfDataTransferRequestEvent.STATUS_COMPLETE,
"invalid call to getAllResponseHeaders, request is not complete");
 return this._request.getAllResponseHeaders();
}
AdfDataTransferRequestEvent.prototype.getResponseHeader= function(
x6
)
{
AdfAssert.assert(this._status==AdfDataTransferRequestEvent.STATUS_COMPLETE,
"invalid call to getResponseHeader, request is not complete");
 var x7=this._request.getAllResponseHeaders();
 return (x7.indexOf(x6)!= -1)?
this._request.getResponseHeader(x6)
:null;
}
AdfDataTransferRequestEvent.prototype.isRichResponse= function()
{
AdfAssert.assert(this._status==AdfDataTransferRequestEvent.STATUS_COMPLETE,
"invalid call to isRichResponse, request is not complete");
 return this._isResponseValidXML();
}
AdfDataTransferRequestEvent.prototype.getResponseContentType= function()
{
this.getResponseHeader("Content-Type");
}
function AdfIFrameDataTransferRequestEvent(
x0,
x1
)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfIFrameDataTransferRequestEvent);
AdfIFrameDataTransferRequestEvent.prototype.Init= function(
x0,
x1
)
{
this._iframeDoc=x0;
this._context=x1;
}
AdfIFrameDataTransferRequestEvent.prototype.getStatus= function()
{
 return AdfDataTransferRequestEvent.STATUS_COMPLETE;
}
AdfIFrameDataTransferRequestEvent.prototype.getContext= function()
{
 return this._context;
}
AdfIFrameDataTransferRequestEvent.prototype.getResponseXML= function()
{
 var x2=AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM;
 var x3=this._iframeDoc;
 if(x2&&x3.XMLDocument)
 return x3.XMLDocument;
 else
 return x3;
}
AdfIFrameDataTransferRequestEvent.prototype.getResponseText= function()
{
 var x4=AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM;
 var x5=this._iframeDoc,x6=null;
 if(x4&&x5.XMLDocument)
x6=x5.XMLDocument;
 else if(window.XMLDocument&&(x5 instanceof XMLDocument))
x6=x5;
 if(x6)
 return AdfAgent.AGENT.getNodeXml(x6);
 else
 return x5.documentElement.innerHTML;
}
AdfIFrameDataTransferRequestEvent.prototype._isResponseValidXML= function()
{
 var x7=AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM;
 var x8=this._iframeDoc;
 if(x7&&x8.XMLDocument)
 return true;
 else if(window.XMLDocument&&(x8 instanceof XMLDocument))
 return true;
 else
 return false;
}
AdfIFrameDataTransferRequestEvent.prototype.getResponseStatusCode= function()
{
 return 200;
}
AdfIFrameDataTransferRequestEvent.prototype.isRichResponse= function()
{
 var x9=AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM;
 var x10=this._iframeDoc;
 var x11=false;
 if(x9&&x10.XMLDocument)
{
 var x12=x10.XMLDocument,x13=x12.childNodes;
 if(x13.length>=2&&x13[1].nodeName=="partial-response")
x11=true;
}
 else
 {
 if(x10.firstChild&&x10.firstChild.nodeName=="partial-response")
x11=true;
}
 return x11;
}
AdfIFrameDataTransferRequestEvent.prototype.getResponseContentType= function()
{
 if(this._isResponseValidXML())
 return "text/xml";
 return "text/html";
}
function AdfDataTransferService(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfDataTransferService);
AdfDataTransferService.InitClass= function()
{
this.STATE_READY=0;
this.TRANSFER_COMPLETE=1;
this.STATE_BUSY=2;
this._MULTIPART_FRAME="_afrDTSFrame";
this._ADF_STREAMING_IFRAME_ID="_adfStreamingIframe";
this._XMLHTTP_TYPE=0;
this._MULTIPART_TYPE=1;
this._STREAMING_TYPE=2;
this._POLLING_TYPE=3;
}
AdfDataTransferService.prototype.Init= function(x0)
{
AdfDataTransferService.superclass.Init.call(this);
this._state=AdfDataTransferService.STATE_READY;
this._requestQueue= new Array();
this._stateChangeListeners=null;
this._window=x0;
this._streamingCount=0;
this._reqCount=0;
}
AdfDataTransferService.prototype.dispose= function()
{
this._requestQueue=null;
this._stateChangeListeners=null;
this._window=null;
}
AdfDataTransferService.prototype.pageUnloading= function()
{
this._pageUnloading=true;
}
AdfDataTransferService._DataTransferRequest= function(
x1,
x2,
x3,
x4,
x5,
x6
)
{
this._type=x1;
this._context=x2;
this._actionURL=x3;
this._headerParams=x4;
this._content=x5;
this._listeners=x6;
}
AdfDataTransferService.prototype._broadcastRequestStatusChanged= function(x7,x8)
{
 var x9=(x7)
?x7.length
:0;
for(var x10=0;x10<x9;x10++)
{
 var x11=x7[x10];
 if (x11.requestStatusChanged)
{
try
{
x11.requestStatusChanged(x8);
}
catch(e)
{
AdfLogger.LOGGER.logError(e,
AdfLogger.WARNING,
"Error delivering Datatransfer request status changed to:",
x11);
}
}
}
}
AdfDataTransferService.prototype._addRequestToQueue= function(
x12,
x13,
x14,
x15,
x16,
x17,
x18
)
{
 var x19= new AdfDataTransferService._DataTransferRequest(
x12,x13,x14,x15,x16,x17);
this._requestQueue.push(x19);
try
{
 var x20= new AdfDataTransferRequestEvent(
AdfDataTransferRequestEvent.STATUS_QUEUED,
x13,
null);
this._broadcastRequestStatusChanged(x17,x20);
}
catch(e)
{
AdfLogger.LOGGER.severe("Error on listener callback invocation - STATUS_QUEUED\n");
}
 if (this._state<=x18&&this._requestQueue.length==1)
{
this._broadcastStateChangeEvent(AdfDataTransferService.STATE_BUSY);
this._doTransfer();
}
}
AdfDataTransferService.prototype.sendRequest= function(
x21,
x22,
x23,
x24,
x25
)
{
this._addRequestToQueue(AdfDataTransferService._XMLHTTP_TYPE,x21,x22,x23,
x24,x25,AdfDataTransferService.STATE_READY);
}
AdfDataTransferService.prototype.sendPollingRequest= function(
x26,
x27
)
{
this._addRequestToQueue(AdfDataTransferService._POLLING_TYPE,null,x26,null,
null,x27,AdfDataTransferService.STATE_READY);
}
AdfDataTransferService.prototype.sendMultiPartRequest= function(
x28,
x29,
x30,
x31,
x32
)
{
 if(x28==null)
{
x28={"_htmlForm":x30,"_params":x31};
}
 else
 {
x28._htmlForm=x30;
x28._params=x31;
}
this._addRequestToQueue(AdfDataTransferService._MULTIPART_TYPE,x28,x29,null,
null,x32,AdfDataTransferService.STATE_READY);
}
AdfDataTransferService.prototype.sendStreamingRequest= function(
x33,
x34
)
{
 if (x33.indexOf('?')== -1)
x33+='?';
 else
 x33+='&';
x33+="Adf-Rich-Message=true&unique=";
x33+= new Date().getTime();
for(var x35 in x34)
{
x33+=("&" + x35 + "=" + x34[x35]);
}
 var x36=AdfAgent.AGENT;
 if (x36.getPlatform()==AdfAgent.IE_PLATFORM&&x36.getVersion()<9)
x33+="&oracle.adf.view.rich.forceHTML=true";
this._addRequestToQueue(AdfDataTransferService._STREAMING_TYPE,null,x33,null,
null,null,AdfDataTransferService.TRANSFER_COMPLETE);
}
AdfDataTransferService.prototype.streamingResponsesOutstanding= function()
{
 return this._streamingCount>0;
}
AdfDataTransferService.prototype.processStreamingResponse= function(x37)
{
 if (this._reqCount>1)
{
 if (!this._streamingMsgQueue)
{
this._streamingMsgQueue= new Array();
}
this._streamingMsgQueue.push(x37);
}
 else
 {
AdfAgent.AGENT.execScript(this._streamingFrame.contentWindow,x37);
}
}
AdfDataTransferService.prototype._processedQueuedStreamingMessages= function()
{
 if (this._streamingMsgQueue)
{
 var x38=AdfAgent.AGENT;
for(var x39=0;x39<this._streamingMsgQueue.length;x39++)
{
x38.execScript(this._streamingFrame.contentWindow,this._streamingMsgQueue[x39]);
}
this._streamingMsgQueue=null;
}
}
AdfDataTransferService.prototype.notifyStreamingRequestComplete= function()
{
 var x40=this._streamingFrame.contentWindow.document;
x40.removeChild(x40.documentElement);
this._streamingFrame=null;
this._streamingCount--;
AdfAssert.assert(this._streamingCount>=0,"Streaming request underflow");
this._requestDone();
}
AdfDataTransferService.prototype._doTransfer= function()
{
 var x41=this._requestQueue.shift();
AdfLogger.LOGGER.fine("Transfer start:",x41);
this._reqCount++;
AdfAssert.assert(this._reqCount<=2,"Request count overflow");
switch(x41._type)
{
 case AdfDataTransferService._XMLHTTP_TYPE:
this._doXmlHttpTransfer(x41);
break;
 case AdfDataTransferService._POLLING_TYPE:
this._doXmlHttpTransfer(x41,AdfDhtmlActiveDataSupport._requestCallback);
break;
 case AdfDataTransferService._MULTIPART_TYPE:
this._doTransferThroughIframe(x41);
break;
 case AdfDataTransferService._STREAMING_TYPE:
 var x42=AdfAgent.AGENT;
 var x43=x42.getDomWindow();
this._streamingCount++;
 if (x42.getPlatform()==AdfAgent.GECKO_PLATFORM&&(x43!=x43.top))
{
page.scheduleTimer(this,this._doStreamingTransfer,x41,0);
}
 else
 {
this._doStreamingTransfer(x41);
}
break;
default:
AdfAssert.assert(false,"Unknown transfer type");
this._reqCount--;
}
}
AdfDataTransferService.prototype._doXmlHttpTransfer= function(x44,x45)
{
 var x46= new AdfXMLRequest();
x46.__dtsRequestContext=x44._context;
x46.__dtsRequestListeners=x44._listeners;
 if(x45!==undefined)
{
x46.setCallback(x45);
}
 else
 {
x46.setCallback(AdfDataTransferService._requestCallback);
}
x46.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
 var x47=x44._headerParams;
 if (x47!=null)
{
for(var x48 in x47)
{
 var x49=x47[x48];
 if (AdfCollections.isArray(x49))
x49=x49.join(',')
x46.setRequestHeader(x48,x49);
}
}
 var x50=this._window;
 var x51=x44._actionURL;
 if (!x51)
x51="" + x50.document.location.href;
 var x52=AdfDataTransferService._WINDOW_PARAM + "=";
 var x53=x52 + x50.name;
 if (x51.indexOf(x52)== -1)
{
x51+=(x51.indexOf('?')== -1)?"?":"&";
x51+=x53;
}
 else
 {
x51=x51.replace(/adf-window-id=[^&#]*/,x53);
}
AdfPage.PAGE.__perfTimings(false,false,true,"Request sent to server: ",x51);
x46.send(x51,x44._content);
}
AdfDataTransferService.prototype._doTransferThroughIframe= function(x54)
{
 var x55=x54._context._htmlForm;
 var x56=x54._actionURL;
 var x57=x54._context._params;
AdfAssert.assert(x55.action,"form action cannot be null for multiform post");
 var x58=AdfDataTransferService._MULTIPART_FRAME;
 var x59=AdfAgent.AGENT;
 var x60=this._getDomDocument();
 var x61=x60.getElementById(x58),x62;
 var x63=x59.getPlatform()==AdfAgent.IE_PLATFORM;
 if(this._iframeLoadCallback==null)
this._iframeLoadCallback=this.createCallback(this._handleIFrameLoad);
 if(!x61)
{
x61=x60.createElement('iframe');
x61.name=x58;
x61.id=x58;
 var x64=x61.style;
x64.top=x64.left='0px';
x64.width=x64.height='1px'
x64.position='absolute';
x64.visibility="hidden";
x60.body.appendChild(x61);
x61.onload=this._iframeLoadCallback;
}
 if (x63)
{
x61=x60.frames[x58];
x61.name=x58;
x62=x61.document;
}
 else
 {
x62=x61.contentDocument;
}
 if(x62.firstChild)
x62.removeChild(x62.firstChild);
this._dtsContext=x54._context;
this._dtsRequestlisteners=x54._listeners;
this._htmlForm=x55;
this._savedActionUrl=x55.action;
this._savedTarget=x55.target;
x55.method="POST";
x55.action=x56;
x55.target=x58;
this._appendParamNode(x60,x55,"Adf-Rich-Message","true");
this._appendParamNode(x60,x55,"partial","true");
this._appendParamNode(x60,
x55,
AdfDataTransferService._WINDOW_PARAM,
this._window.name);
 if (x57)
{
for(var x65 in x57)
{
this._appendParamNode(x60,x55,x65,x57[x65]);
}
}
AdfAgent.AGENT.autoCompleteForm(x55);
try
{
x55.submit();
 if (x63)
this._window.setTimeout(this._iframeLoadCallback,50);
}
catch(e)
{
AdfInputFileUtils.addUploadErrorMessage();
this._requestDone();
}
}
AdfDataTransferService.prototype._appendParamNode= function(x66,x67,x68,x69)
{
AdfAssert.assert(x67!=null);
 var x70=this._paramNodes;
 if(!x70)
{
x70= new Array();
this._paramNodes=x70;
}
 var x71=x66.createElement("input");
x71.type="hidden";
x71.name=x68;
x71.value=x69;
x70.push(x71);
x67.appendChild(x71);
}
AdfDataTransferService.prototype._clearParamNodes= function()
{
 var x72=this._paramNodes;
 if(x72)
{
 var x73=x72[0].parentNode;
 var x74=x72.length;
for(var x75=0;x75<x74;x75++)
{
 if(x73)
x73.removeChild(x72[x75]);
}
 delete this._paramNodes;
}
}
AdfDataTransferService.prototype._doStreamingTransfer= function(x76)
{
this._streamingMsgQueue=null;
 var x77=this._getDomDocument();
 var x78=x77.getElementById(AdfDataTransferService._ADF_STREAMING_IFRAME_ID);
 if (!x78)
{
x78=x77.createElement("DIV");
x78.id=AdfDataTransferService._ADF_STREAMING_IFRAME_ID;
x78.style.display="none";
x77.body.appendChild(x78);
}
 var x79=x76._actionURL + "&" + AdfDataTransferService._WINDOW_PARAM + "=" +
 this._window.name;
x78.innerHTML="<IFRAME src=\"" + x79 +
 "\" onload=\"AdfPage.PAGE.getDataTransferService().processStreamingResponse("
 + "'parent.AdfPage.PAGE.streamingResponseComplete();');\"></IFRAME>";
this._streamingFrame=x78.firstChild;
AdfAssert.assertDomElement(this._streamingFrame);
AdfAssert.assert(this._streamingFrame.tagName=="IFRAME");
}
AdfDataTransferService.prototype._handleIFrameLoad= function()
{
 var x80=this._getDomDocument();
 var x81=AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM;
 var x82=AdfDataTransferService._MULTIPART_FRAME;
 var x83,x84;
 if (x81)
{
x83=x80.frames[x82];
 var x84=x83.document;
}
 else
 {
x83=x80.getElementById(x82);
x84=x83.contentDocument;
}
try
{
 if(!x84.documentElement|| !x84.documentElement.firstChild
||(x81&&x84.readyState!="complete"))
{
this._window.setTimeout(this._iframeLoadCallback,50);
}
 else
 {
this._onIFrameLoadComplete(x84,this._dtsContext,
this._dtsRequestlisteners);
}
}
catch(e)
{
 if (this._window&& !this._pageUnloading)
{
AdfDataTransferService._alertError("unknown");
AdfLogger.LOGGER.logErrorAsSevere(e,
"Error (" + e.message +
 ") while performing Data Transfer request");
}
this._htmlForm.action=this._savedActionUrl;
this._htmlForm.target=this._savedTarget;
}
}
AdfDataTransferService.prototype._onIFrameLoadComplete= function(
x85,
x86,
x87)
{
try
{
 var x88= new AdfIFrameDataTransferRequestEvent(
x85,
x86);
this._broadcastRequestStatusChanged(x87,x88);
}
finally
{
 if(x85.firstChild)
x85.removeChild(x85.firstChild);
this._htmlForm.action=this._savedActionUrl;
this._htmlForm.target=this._savedTarget;
this._clearParamNodes();
this._requestDone();
}
}
AdfDataTransferService.prototype._handleRequestCallback= function(
x89
)
{
 var x90=x89.getCompletionState();
 if(x90!=AdfXMLRequest.COMPLETED)
 return;
 var x91=0;
try
{
x91=x89.getStatus();
}
catch(e)
{
}
try
{
 if ((x91!=200)&&(x91!=302)&&(x91!=0))
{
 if (this._window&& !this._pageUnloading)
{
AdfDataTransferService._alertError(x91);
AdfLogger.LOGGER.severe("Error StatusCode(",
x91,
") while performing Data Transfer request\n");
}
}
 else
 {
this._broadcastStateChangeEvent(AdfDataTransferService.TRANSFER_COMPLETE);
 var x92= new AdfDataTransferRequestEvent(
AdfDataTransferRequestEvent.STATUS_COMPLETE,
x89.__dtsRequestContext,
x89);
this._broadcastRequestStatusChanged(x89.__dtsRequestListeners,x92);
}
}
finally
{
try
{
this._setResponseIdentifierFromResponseHeader(x89);
}
catch(e)
{
 var x93="Not able to retrieve response id from header.";
x93+="Error (";
x93+=e.message;
x93+="). The response id in page object will not be up-to-date.";
AdfLogger.LOGGER.warning(x93);
}
x89.cleanup();
 delete x89;
x89=null;this._requestDone();
}
}
AdfDataTransferService.prototype._setResponseIdentifierFromResponseHeader= function(x94)
{
 if(AdfPage.PAGE.getResponseIdentifier()==null)
 return;
 if(x94.getResponseHeader)
{
 var x95=x94.getResponseHeader("Adf-Context-Id");
 if (!x95)
x95=x94.getResponseHeader("X-ORACLE-DMS-ECID");
 if (x95)
AdfPage.PAGE.__setResponseIdentifier(x95);
}
}
AdfDataTransferService.prototype._requestDone= function()
{
 if (!this._requestQueue)
 return;
this._reqCount--;
AdfAssert.assert(this._reqCount>=0,"Request count underflow");
 if (this._reqCount==1&&this._streamingCount==1)
{
this._processedQueuedStreamingMessages();
}
 if (this._reqCount>0)
 return;
 if(this._requestQueue.length>0)
{
this._doTransfer();
}
 else
 {
 if (this._state!=AdfDataTransferService.TRANSFER_COMPLETE)
{
this._broadcastStateChangeEvent(AdfDataTransferService.TRANSFER_COMPLETE);
}
this._broadcastStateChangeEvent(AdfDataTransferService.STATE_READY);
}
}
AdfDataTransferService._requestCallback= function(
x96
)
{
AdfLogger.LOGGER.finer("Request complete:",x96);
 var x97=AdfPage.PAGE.getDataTransferService(true);
 if (x97)
x97._handleRequestCallback(x96);
}
AdfDataTransferService.prototype.addStateChangeListener= function(x98,x99)
{
AdfAssert.assertFunction(x98);
AdfAssert.assertObjectOrNull(x99);
 var x100=this._stateChangeListeners;
 if (!x100)
{
x100= new Array();
this._stateChangeListeners=x100;
}
x100.push(x98);
x100.push(x99);
}
AdfDataTransferService.prototype.removeStateChangeListener= function(x101,x102)
{
AdfAssert.assertFunction(x101);
AdfAssert.assertObjectOrNull(x102);
 var x103=this._stateChangeListeners;
AdfAssert.assert(x103,"stateChangeListeners must exist");
 var x104=x103.length;
for(var x105=0;x105<x104;x105++)
{
 var x106=x103[x105];
x105++;
 if (x106==x101)
{
 var x107=x103[x105];
 if (x107===x102)
{
x103.splice(x105 - 1,2);
}
}
}
 if (x103.length==0)
{
this._stateChangeListeners=null;
}
}
AdfDataTransferService.prototype.getDTSState= function()
{
 return this._state;
}
AdfDataTransferService.prototype._broadcastStateChangeEvent= function(x108)
{
this._state=x108;
 var x109=this._stateChangeListeners;
 if (x109)
{
 var x110=x109.length;
for(var x111=0;x111<x110;x111++)
{
try
{
 var x112=x109[x111];
x111++;
 var x113=x109[x111];
 var x114;
 if (x113!=null)
x114=x112.call(x113,x108);
 else
 x114=x112(x108);
 if(false==x114)
{
break;}
}
catch(e)
{
AdfLogger.LOGGER.logError(e,AdfLogger.WARNING,"Error on DTS State Change Listener");
}
}
}
}
AdfDataTransferService.prototype._getDomDocument= function()
{
 return this._window.document;
}
AdfDataTransferService._alertError= function(x115)
{
 var x116=AdfPage.PAGE.getFailedConnectionText();
 if (!x116)
{
 var x117=AdfPage.PAGE.getLookAndFeel();
x116=x117.getTranslatedString(
"af_document.MSG_FAILED_CONNECTION");
}
 if (x116!=null)
{
 var x118=x116;
x118+=" (status=";
x118+=x115;
 var x119=AdfPage.PAGE.getResponseIdentifier();
 if (x119)
{
x118+=",ecid=";
x118+=x119;
}
x118+=")";
alert(x118);
}
}
AdfDataTransferService.getInstance= function()
{
 return AdfPage.PAGE.getDataTransferService();
}
AdfDataTransferService._WINDOW_PARAM="Adf-Window-Id";
function AdfCustomEvent(x0,x1,x2,x3)
{
 if (arguments.length)
{
this.Init(x0,x1,x2,x3);
}
}
AdfObject.createSubclass(AdfCustomEvent,AdfComponentEvent);
AdfCustomEvent.prototype.Init= function(x0,x1,x2,x3)
{
AdfAssert.assertString(x1);
 if (x3===undefined)
x3=true;
AdfCustomEvent.superclass.Init.call(this,x0,x1);
this.setPartial(true);
this._params=x2;
this._immediate=x3;
this.setRoot(x0);
}
AdfCustomEvent.prototype.GetParams= function()
{
 return this._params;
}
AdfCustomEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfCustomEvent.prototype.isImmediate= function()
{
 return this._immediate;
}
AdfCustomEvent.prototype.AddMarshalledProperties= function(
x4)
{
x4["_custom"]=true;
 if (this._params)
AdfCollections.copyInto(x4,this._params);
 if (this.isImmediate())
x4.immediate=true;
}
AdfCustomEvent.prototype.toDebugString= function()
{
 var x5=AdfCustomEvent.superclass.toDebugString.call(this);
 return x5.substring(0,x5.length - 1) +
 AdfUIUtils.getPropertiesAsString(this._params,undefined,false,false) +
 "]";
}
AdfCustomEvent.queue= function(x6,x7,x8,x9)
{
 new AdfCustomEvent(x6,x7,x8,x9).queue();
}

function AdfRowKeySetChangeEvent(
x0,
x1,
x2,
x3
)
{
 if (arguments.length)
{
this.Init(x0,x1,x2,x3);
}
}
AdfObject.createSubclass(AdfRowKeySetChangeEvent,AdfComponentEvent);
AdfRowKeySetChangeEvent.createRowKeySetChangeEvent= function(
x0,
x1,
x2,
x3)
{
 var x4=null;
 var x5=null;
 if (x2)
{
 if (x3)
{
for(var x6 in x2)
{
 if (!x3[x6])
{
 if (!x5)
x5= new Object();
x5[x6]=true;
}
}
}
 else
 {
x5= new Object();
AdfCollections.copyInto(x5,x2);
}
}
 if (x3)
{
 if (x2)
{
for(var x6 in x3)
{
 if (!x2[x6])
{
 if (!x4)
x4= new Object();
x4[x6]=true;
}
}
}
 else
 {
x4= new Object();
AdfCollections.copyInto(x4,x3);
}
}
 if (x4||x5)
{
 var x7=null;
switch(x1)
{
default:
break;
 case AdfRowDisclosureEvent.ROW_DISCLOSURE_EVENT_TYPE:
{
x7= new AdfRowDisclosureEvent(x0,x5,x4);
break;
}
 case AdfSelectionEvent.SELECTION_EVENT_TYPE:
{
x7= new AdfSelectionEvent(x0,x5,x4);
break;
}
}
 return x7;
}
 else
 {
 return null;
}
}
AdfRowKeySetChangeEvent.createOrderedRowKeySetChangeEvent= function(
x8,
x9,
x10,
x11)
{
 var x12=null;
 var x13=null;
 if (x10&& !x10.length)
x10=null;
 if (x11&& !x11.length)
x11=null;
 if (x10)
{
AdfAssert.assertArray(x10);
 if (x11)
{
 var x14=x10.length;
for(var x15=0;x15<x14;x15++)
{
 var x16=x10[x15];
 if (!x11[x16])
{
 if (!x13)
x13= new Array();
x13[x16]=x13.length;
x13.push(x16);
}
}
}
 else
 {
x13=AdfCollections.cloneArray(x10);
}
}
 if (x11)
{
AdfAssert.assertArray(x11);
 if (x10)
{
 var x14=x11.length;
for(var x15=0;x15<x14;x15++)
{
 var x17=x11[x15];
 if (!x10[x17])
{
 if (!x12)
x12= new Array();
x12[x17]=x12.length;
x12.push(x17);
}
}
}
 else
 {
x12=AdfCollections.cloneArray(x11);
}
}
 if (x12||x13)
{
 var x18=null;
switch(x9)
{
default:
break;
 case AdfRowDisclosureEvent.ROW_DISCLOSURE_EVENT_TYPE:
{
x18= new AdfRowDisclosureEvent(x8,x13,x12);
break;
}
 case AdfSelectionEvent.SELECTION_EVENT_TYPE:
{
x18= new AdfSelectionEvent(x8,x13,x12);
break;
}
}
 return x18;
}
 else
 {
 return null;
}
}
AdfRowKeySetChangeEvent.prototype.getRemovedSet= function()
{
 return this._removedSet;
}
AdfRowKeySetChangeEvent.prototype.getAddedSet= function()
{
 return this._addedSet;
}
AdfRowKeySetChangeEvent.prototype.toDebugString= function()
{
 var x19=AdfRowKeySetChangeEvent.superclass.toDebugString.call(this);
 return x19.substring(0,x19.length - 1) +
 ", removed=" + this._removedSet +
 ", added=" + this._addedSet +
 "]";
}
AdfRowKeySetChangeEvent.prototype.Init= function(
x20,
x21,
x22,
x23)
{
AdfRowKeySetChangeEvent.superclass.Init.call(this,x20,x21);
this._removedSet=x22;
this._addedSet=x23;
this.setPartial(true);
}
AdfRowKeySetChangeEvent.prototype.propagatesToServer= function()
{
 return true;
}

function AdfFocusEvent(x0,x1)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfFocusEvent,AdfComponentEvent);
AdfFocusEvent.FOCUS_EVENT_TYPE="focus";
AdfFocusEvent.prototype.Init= function(x0,x1)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
this._rowKey=x1;
AdfFocusEvent.superclass.Init.call(this,x0,AdfFocusEvent.FOCUS_EVENT_TYPE);
this.setPartial(true);
this.setRoot(x0);
}
AdfFocusEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfFocusEvent.prototype.AddMarshalledProperties= function(
x2)
{
x2.rowKey=this._rowKey?this._rowKey:"_afrTreeRoot";
}
AdfFocusEvent.queue= function(x3,x4)
{
 new AdfFocusEvent(x3,x4).queue();
}
AdfFocusEvent.prototype.isValidationNeeded= function()
{
 return true;
}
AdfFocusEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}

function AdfSelectionEvent(
x0,
x1,
x2
)
{
 if (arguments.length)
{
this.Init(x0,x1,x2);
}
}
AdfObject.createSubclass(AdfSelectionEvent,AdfRowKeySetChangeEvent);
AdfSelectionEvent.SELECTION_EVENT_TYPE="selection";
AdfSelectionEvent.prototype.Init= function(
x0,
x1,
x2)
{
AdfSelectionEvent.superclass.Init.call(this,x0,
AdfSelectionEvent.SELECTION_EVENT_TYPE,x1,x2);
this.setRoot(x0);
}
AdfSelectionEvent.prototype.setSelectionRange= function(x3,x4)
{
 if (x3!=null)
{
this._selectKeyRange={start:x3,end:x4};
}
 else
 {
 delete this._selectKeyRange;
}
}
AdfSelectionEvent.prototype.propagatesToServer= function()
{
 return (this.getSource().getProperty(AdfUITable.SELECTION_LISTENER_KEY)!=null||
this._selectKeyRange!=null);
}
AdfSelectionEvent.prototype.AddMarshalledProperties= function(
x5)
{
AdfSelectionEvent.superclass.AddMarshalledProperties.call(this,x5);
 if (this._selectKeyRange)
{
x5['startRowKey']=this._selectKeyRange.start;
x5['endRowKey']=this._selectKeyRange.end;
}
}

function AdfColumnSelectionEvent(
x0,
x1,
x2
)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfColumnSelectionEvent,AdfComponentEvent);
AdfColumnSelectionEvent.EVENT_TYPE="columnSelection";
AdfColumnSelectionEvent.prototype.Init= function(x0,x1,x2)
{
this._addedColumns=x1;
this._removedColumns=x2;
AdfColumnSelectionEvent.superclass.Init.call(this,x0,AdfColumnSelectionEvent.EVENT_TYPE);
}
AdfColumnSelectionEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfColumnSelectionEvent.prototype.AddMarshalledProperties= function(x3)
{
x3.addedColumns=this._addedColumns;
x3.removedColumns=this._removedColumns;
}
AdfColumnSelectionEvent.queue= function(x4,x5,x6)
{
 new AdfColumnSelectionEvent(x4,x5,x6).queue(true);
}
AdfColumnSelectionEvent.prototype.getAddedColumns= function()
{
 return AdfCollections.cloneArray(this._addedColumns);
}
AdfColumnSelectionEvent.prototype.getRemovedColumns= function()
{
 return AdfCollections.cloneArray(this._removedColumns);
}

function AdfRowDisclosureEvent(
x0,
x1,
x2
)
{
 if (arguments.length)
{
this.Init(x0,x1,x2);
}
}
AdfObject.createSubclass(AdfRowDisclosureEvent,AdfRowKeySetChangeEvent);
AdfRowDisclosureEvent.ROW_DISCLOSURE_EVENT_TYPE="rowDisclosure";
AdfRowDisclosureEvent.prototype.Init= function(
x0,
x1,
x2)
{
AdfRowDisclosureEvent.superclass.Init.call(this,x0,
AdfRowDisclosureEvent.ROW_DISCLOSURE_EVENT_TYPE,x1,x2);
this.setRoot(x0);
}
AdfRowDisclosureEvent.prototype.propagatesToServer= function()
{
 if (AdfPage.PAGE.isScreenReaderMode())
 return true;
 var x3=(AdfPage.PAGE.getDomWindow().AdfUITree)?
this.getSource().getProperty(AdfUITree.DISCLOSURE_LISTENER_KEY)!=null:true;
 return (x3);
}
AdfRowDisclosureEvent.prototype.isValidationNeeded= function()
{
 return true;
}
AdfRowDisclosureEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}

function AdfDropEvent(x0,x1,x2,x3,x4,x5,
x6,x7,x8)
{
 if (arguments.length)
{
 if (!x6)
x6=AdfDropEvent.DROP_ORIENTATION_ON;
 if (x7===undefined)
x7=null;
 if (x8===undefined)
x8= -1;
this.Init(x0,x1,x2,x3,x4,x5,
x6,x7,x8);
}
}
AdfObject.createSubclass(AdfDropEvent,AdfCustomEvent);
AdfDropEvent.DROP_EVENT_TYPE="drop";
AdfDropEvent.DROP_ORIENTATION_ON="ON";
AdfDropEvent.DROP_ORIENTATION_INSIDE="INSIDE";
AdfDropEvent.DROP_ORIENTATION_BEFORE="BEFORE";
AdfDropEvent.DROP_ORIENTATION_AFTER="AFTER";
AdfDropEvent.prototype.Init= function(
x0,x1,x2,x3,x4,x5,
x6,x7,x8)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfAssert.assertPrototype(x1,AdfDragSource);
AdfAssert.assertPrototype(x2,AdfTransferable);
AdfAssert.assertNumber(x3);
AdfAssert.assertNumber(x4);
AdfAssert.assertNumber(x5);
AdfAssert.assertString(x6);
AdfAssert.assertNumber(x8);
 var x9= new Object();
x9.dragSource=x1.getComponent().getClientId();
x9.dropX=x4;
x9.dropY=x5;
x9.dropOrientation=x6;
x9.dropSite=x7;
x9.dropSiteIndex=x8;
 var x10=null;
switch(x3)
{
 case AdfDnDContext.ACTION_COPY:
x10="COPY";
break;
 case AdfDnDContext.ACTION_MOVE:
x10="MOVE";
break;
 case AdfDnDContext.ACTION_LINK:
x10="LINK";
break;
default:
 throw new Error("Unknown drag action:" + x3);
}
x9.proposedAction=x10;
 var x11=x2.getTransferDataFlavors();
 var x12=x11.length;
 var x13= new Array(x12*2);
 var x14=0;
for(var x15=0;x15<x12;x15++)
{
 var x16=x11[x15];
x13[x14]=x16.getStringForm();
x14++;
 var x17=x2.getTransferData(x16);
 if ((x17.length==1)&& !AdfDataFlavor.isRowKeyDataFlavor(x16))
x17=x17[0];
x13[x14]=x17;
x14++;
}
x9.transferable=x13;
AdfDropEvent.superclass.Init.call(this,
x0,
AdfDropEvent.DROP_EVENT_TYPE,
x9,
true);
}

function AdfMissingConverter()
{
this._class="AdfMissingConverter";
}
AdfMissingConverter.prototype= new TrConverter();
AdfMissingConverter.prototype.getAsString= function(
x0,
x1
)
{
 return undefined;
}
AdfMissingConverter.prototype.getAsObject= function(
x2,
x3
)
{
 return undefined;
}
AdfMissingConverter.MISSING_CONVERTER= new AdfMissingConverter();

function AdfAutoSubmitEvent(
x0
)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfAutoSubmitEvent,AdfComponentEvent);
AdfAutoSubmitEvent.AUTO_SUBMIT_TYPE="autoSubmit";
AdfAutoSubmitEvent.queue= function(x0)
{
 var x1= new AdfAutoSubmitEvent(x0);
x1.setPartial(true);
x0.queueEvent(x1);
}
AdfAutoSubmitEvent.prototype.isValidationNeeded= function()
{
 return false;
}
AdfAutoSubmitEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
AdfAutoSubmitEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfAutoSubmitEvent.prototype.Init= function(
x2)
{
AdfAutoSubmitEvent.superclass.Init.call(this,
x2,
AdfAutoSubmitEvent.AUTO_SUBMIT_TYPE);
this.setRoot(x2);
}
AdfAutoSubmitEvent.prototype.getShowMessages= function()
{
 return AdfPage.PAGE.isScreenReaderMode();
}
AdfRedirectEvent.REDIRECT_EVENT_TYPE="redirect";
function AdfRedirectEvent(x0,x1,x2)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfRedirectEvent,AdfComponentEvent);
AdfRedirectEvent.prototype.Init= function(x0,x1,x2)
{
AdfAssert.assertString(x1);
AdfAssert.assertPrototype(x0,AdfUIComponent);
this._url=x1;
this._noNavigation=x2;
AdfRedirectEvent.superclass.Init.call(this,x0,AdfRedirectEvent.REDIRECT_EVENT_TYPE);
}
AdfRedirectEvent.prototype.getURL= function()
{
 return this._url;
}
AdfRedirectEvent.prototype.getNavigationSuppressed= function()
{
 return this._noNavigation;
}
var AdfUIUtils= new Object();
AdfUIUtils.dumpHtmlDom= function(
x0,
x1
)
{
AdfUIUtils.dump(x0,x1,{innerText:1,outerText:1,outerHTML:1,innerHTML:1});
}
AdfUIUtils.dump= function(
x2,
x3,
x4
)
{
 var x5="";
 if (x2)
{
 var x6= typeof x2;
 var x7=(x6=="object");
 var x8=(x6=="function");
 if (!x7&&!x8)
{
x5=x6 + ":" + x2.valueOf();
}
 else
 {
 if (x8)
{
x5=x6 + ":" + x2.valueOf();
}
 else
 {
 if (AdfCollections.isArray(x2))
{
x5="Array length=" + x2.length + " contents=[" + x2.valueOf() + "] ";
}
}
 if (!x3)
{
try
{
x3=x2["name"];
}
catch(e)
{
}
}
 var x9=0;
 var x10= new Array();
try
{
for(var x11 in x2)
{
 if((!x4|| !x4[x11])&&
 !x11.match(/DOM/))
{
x10[x9]=x11;
x9++;
}
}
}
catch(e)
{
 return "Unable to retrieve iterator on " + x3 + ":" + e;
}
x10.sort();
 var x12=x10.length;
 var x13=Math.ceil(x12/AdfUIUtils._MAX_ALERT_ROWS);
for(var x14=0;x14<x12;x14++)
{
 var x15="";
x15=AdfUIUtils._getKeyValueString(x2,x10[x14]);
x15+=AdfUIUtils.getTabbedSpacer(x14,x13);
x5+=x15;
}
 if (!x3)
{
x3="" + x2;
}
}
}
 else
 {
 if (!x3)
{
x3="(Undefined)";
}
}
 if (x5=="")
{
x5="No properties";
}
alert("Dump of " + x3 + ":\n" + x5);
}
AdfUIUtils._getKeyValueString= function(
x16,
x17)
{
 var x18;
try
{
x18=x16[x17];
}
catch(e)
{
x18=e;
}
 if(typeof(x18)=="function")
{
x18="[function]";
}
 return x17 + ':' + x18;
}
AdfUIUtils.getTabbedSpacer= function(
x19,
x20
)
{
 if (!x20)
x20=3;
 var x21=(AdfAgent.AGENT.isGecko)
?((x19+1)%x20==0)
?'\n'
:'    '
:'\t';
 return x21;
}
AdfUIUtils.getSingleSpacer= function()
{
 return " ";
}
AdfUIUtils.getCommaSpacer= function()
{
 return ",";
}
AdfUIUtils.getPropertiesAsString= function(
x22,
x23,
x24,x25)
{
 if (!x22)
 return "No target";
 var x26="";
 if (x24==null)
x24=true;
 if (x25==null)
x25=true;
 var x27= typeof x22;
 var x28=x27=="object";
 var x29=(x27=="function");
 if (!x28&& !x29)
{
x26=x27 + ":" + x22.valueOf();
}
 else
 {
 if (x29)
{
x26=x27 + ":" + x22.valueOf();
}
 else if (AdfCollections.isArray(x22))
{
x26="Array length=" + x22.length + " contents=[" + x22.valueOf() + "] ";
}
 if (x23==undefined)
x23=AdfUIUtils.getTabbedSpacer;
 var x30=0;
for(var x31 in x22)
{
 var x32="";
 if (!x25)
{
 if (x31==x31.toUpperCase())
{
continue;
}
}
try
{
 var x33=x22[x31];
 if (typeof(x33)=="function")
{
 if (!x24)
{
continue;
}
x33="[function]";
}
x32=x31 + ":" + x33;
 if (x23)
{
x32+=x23(x30++);
}
}
catch(e)
{
}
x26+=x32;
}
 if (!x26.length)
{
x26="Unknown:" + x22.valueOf();
}
}
 return x26;
}
AdfUIUtils.compareArrays= function(
x34,
x35
)
{
AdfAssert.assert(Array.prototype.isPrototypeOf(x34));
AdfAssert.assert(Array.prototype.isPrototypeOf(x35));
 if (x34.length==x35.length)
{
for(var x36 in x34)
{
 var x37=x34[x36];
 var x38=x35[x36];
 if (!AdfUIUtils.compareValues(x37,x38))
 return false;
}
 return true;
}
 else
 {
 return false;
}
}
AdfUIUtils.compareObjects= function(
x39,
x40
)
{
AdfAssert.assert(Object.prototype.isPrototypeOf(x39));
AdfAssert.assert(Object.prototype.isPrototypeOf(x40));
 var x41=x39["equals"];
 if (x41&& typeof(x41)=="function")
{
 return x41.call(x39,x40);
}
for(var x42 in x39)
{
 var x43=x39[x42];
 var x44=x40[x42];
 if (!AdfUIUtils.compareValues(x43,x44))
{
 return false;
}
}
for(var x42 in x40)
{
 var x43=x39[x42];
 var x44=x40[x42];
 if (!AdfUIUtils.compareValues(x44,x43))
{
 return false;
}
}
 return true;
}
AdfUIUtils.compareValues= function(
x45,
x46
)
{
 var x47=(x45===x46);
 if (!x47&&(x45!=null)&&(x46!=null))
{
 if (Array.prototype.isPrototypeOf(x45)&&
Array.prototype.isPrototypeOf(x46))
{
x47=AdfUIUtils.compareArrays(x45,x46);
}
 else if (AdfObject.prototype.isPrototypeOf(x45)&&
AdfObject.prototype.isPrototypeOf(x46))
{
x47=x45.equals(x46);
}
 else if (Object.prototype.isPrototypeOf(x45)&&
Object.prototype.isPrototypeOf(x46))
{
x47=AdfUIUtils.compareObjects(x45,x46);
}
}
 return x47;
}
AdfUIUtils.trim= function(
x48)
{
 if (x48!=null&&(typeof x48)=='string')
 return x48.replace(AdfUIUtils._TRIM_ALL_RE,'');
 return x48;
}
AdfUIUtils.trimLeading= function(
x49)
{
 if (x49!=null&&(typeof x49)=='string')
 return x49.replace(AdfUIUtils._TRIM_BEGINNING_RE,'');
 return x49;
}
AdfUIUtils.trimTrailing= function(
x50)
{
 if (x50!=null&&(typeof x50)=='string')
 return x50.replace(AdfUIUtils._TRIM_ENDING_RE,'');
 return x50;
}
AdfUIUtils._MAX_ALERT_ROWS=28;
AdfUIUtils._TRIM_ALL_RE=/^\s*|\s*$/g;
AdfUIUtils._TRIM_BEGINNING_RE=/^\s*/g;
AdfUIUtils._TRIM_END_RE=/\s*$/g;

var AdfShuttleUtils= new Object();
AdfShuttleUtils.getLastSelectionChange= function(
x0,
x1
)
{
 var x2=x0.getSelection();
 if(x1===undefined)
{
 return x2[0];
}
 else
 {
 var x3=AdfCollections.cloneArray(x1);
 var x4=AdfCollections.cloneArray(x2);
 var x5=0;
for(i=0;i<x3.length;i++)
{
 var x6=x3[i];
 if (AdfCollections.removeArrayValue(x4,x6)!= -1)
x5++;
}
 if (x4.length>0)
 return x4[0];
 else if (x3.length==x5)
 return null;
 else
 {
x4=AdfCollections.cloneArray(x2);
for(i=0;i<x4.length;i++)
{
 var x6=x4[i];
AdfCollections.removeArrayValue(x3,x6);
}
 return x3[0];
}
}
}
AdfShuttleUtils.isSelected= function(
x7,
x8
)
{
 var x9=x7.getSelection();
 return (AdfCollections.indexOf(x9,x8)>=0);
}
AdfShuttleUtils.isLeading= function(
x10,
x11
)
{
 var x12=x10.getValue();
 return AdfCollections.indexOf(x12,x11)<0;
}
AdfShuttleUtils.getLeadSelection= function(
x13
)
{
 var x14= new Array();
 var x15=x13.getSelection();
 if(!x15)
 return x14;
for(i=0;i<x15.length;i++)
{
 if(AdfShuttleUtils.isLeading(x13,x15[i]))
{
x14.push(x15[i]);
}
}
 return x14;
}
AdfShuttleUtils.getTrailSelection= function(
x16
)
{
 var x17= new Array();
 var x18=x16.getSelection();
 if(!x18)
 return x17;
for(i=0;i<x18.length;i++)
{
 if(AdfShuttleUtils.getSide(x16,x18[i])==AdfShuttleUtils.TRAILING)
{
x17.push(x18[i]);
}
}
 return x17;
}
function AdfTransferable()
{
}
AdfObject.createSubclass(AdfTransferable);
AdfTransferable.prototype.Init= function()
{
AdfTransferable.superclass.Init.call(this);
}
AdfTransferable.prototype.getTransferData= function(x0)
{
 return null;
}
AdfTransferable.prototype.getTransferDataFlavors= function()
{
 return null;
}
AdfTransferable.prototype.isDataFlavorSupported= function(x1)
{
 return (this.getTransferData(x1)!=null);
}

function AdfObjectTransferable(
x0,x1,x2,x3)
{
this.Init(x0,x1,x2,x3);
}
AdfObject.createSubclass(AdfObjectTransferable,AdfTransferable);
AdfObjectTransferable.createSingleObjectTransferable= function(x0,x1)
{
AdfAssert.assert(x0);
AdfAssert.assertPrototypeOrNull(x1,AdfDataFlavor);
 var x2;
 if (x1)
{
AdfAssert.assertPrototype(x1,AdfDataFlavor);
x2=[x1];
}
 return new AdfObjectTransferable([[x0]],x2);
}
AdfObjectTransferable.createMultiObjectTransferable= function(x3,x4)
{
AdfAssert.assertArray(x3);
AdfAssert.assertPrototype(x4,AdfDataFlavor);
 return new AdfObjectTransferable([x3],[x4]);
}
AdfObjectTransferable.prototype.Init= function(
x5,
x6,
x7,
x8)
{
AdfObjectTransferable.superclass.Init.call(this);
AdfAssert.assertArrayOrNull(x5);
AdfAssert.assertArrayOrNull(x6);
AdfAssert.assertArrayOrNull(x7);
AdfAssert.assertArrayOrNull(x8);
AdfAssert.assert((x5!=null)||
((x7!=null)&&(x8!=null)&&(x6!=null)),
"Either the objects for the AdfTransferable have to be specified, or base objects and converters must be specified");
AdfAssert.assert(!x6||(x5.length==x6.length),
"data Objects and AdfDataFlavor arrays lengths must be identical:" +
 "data objects:[" + x5 +
 "] data flavors:[" + x6 + "]");
this._baseObjects=x7;
this._converters=x8;
this._dataFlavors=AdfObjectTransferable._createDataFlavors(x5,
x6);
AdfLogger.LOGGER.fine("data flavors for:",x5,"=",this._dataFlavors);
 if (x5==null)
x5= new Array();
this._objectsForFlavors=x5;
}
AdfObjectTransferable.prototype.getTransferData= function(x9)
{
 var x10=this._dataFlavors[x9.getStringForm()];
 if ((x10===undefined)&&(x9===AdfDataFlavor.ANY_FLAVOR))
x10=0;
 if (x10!=undefined)
{
 var x11=this._objectsForFlavors[x10];
 if (x11==null)
{
 var x12=this._baseObjects;
 if (x12!=null)
{
 var x13=this._converters[x10];
 var x14=x12.length;
x11= new Array(x14);
for(var x15=0;x15<x14;x15++)
{
x11[x15]=x13(x12[x15]);
}
this._objectsForFlavors[x10]=x11;
}
}
 return x11;
}
 else
 {
 return undefined;
}
}
AdfObjectTransferable.prototype.getTransferDataFlavors= function()
{
 return this._dataFlavors;
}
AdfObjectTransferable.prototype.isDataFlavorSupported= function(x16)
{
 if (x16===AdfDataFlavor.ANY_FLAVOR)
 return true;
 else
 return x16.getStringForm() in this._dataFlavors;
}
AdfObjectTransferable.prototype.toDebugString= function()
{
 return AdfObjectTransferable.superclass.toDebugString.call(this) + "[" +
 " dataObjects:" + this._objectsForFlavors +
 " dataFlavors:" + this._dataFlavors + "]";
}
AdfObjectTransferable._createDataFlavors= function(x17,x18)
{
 var x19=x17.length;
 var x20= new Array();
for(var x21=0;x21<x19;x21++)
{
 var x22=x17[x21];
AdfAssert.assertArray(x22);
 var x23=(x18)
?x18[x21]
:null;
 if (!x23)
x23=AdfDataFlavor.getObjectFlavor(x22[0]);
AdfAssert.assertPrototype(x23,AdfDataFlavor);
AdfObjectTransferable._addSuperclassFlavors(x23,x20,x21);
}
 return x20;
}
AdfObjectTransferable._addSuperclassFlavors= function(
x24,
x25,
x26)
{
AdfObjectTransferable._addFlavorIfNecessary(x24,x25,x26);
 if (x24===AdfDataFlavor.ANY_FLAVOR)
 return;
 var x27=x24.getStringForm();
 var x28=AdfDataFlavor._JSOBJECT_PREFIX_STRING;
 if (!x27.indexOf(x28))
{
 var x29=AdfDataFlavor.OBJECT_FLAVOR;
 var x30=x27.substr(x28.length)
 var x31=window[x30];
 if (x31)
{
 if (AdfObject.prototype.isPrototypeOf(x31))
{
x31=x31.superclass;
while(x31)
{
 var x32=AdfDataFlavor.getDataFlavorForClass(x31);
AdfObjectTransferable._addFlavorIfNecessary(x32,
x25,
x26);
x31=x31.superclass;
}
}
}
AdfObjectTransferable._addFlavorIfNecessary(x29,x25,x26);
}
}
AdfObjectTransferable._addFlavorIfNecessary= function(
x33,x34,x35)
{
 var x36=x33.getStringForm();
 if (!(x36 in x34))
{
x34.push(x33);
x34[x36]=x35;
}
}

function AdfBusyStateEvent(
x0,
x1)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfBusyStateEvent,AdfBaseEvent);
AdfBusyStateEvent.BUSY_STATE_TYPE="busyState";
AdfBusyStateEvent.prototype.isBusy= function()
{
 return this._busy;
}
AdfBusyStateEvent.prototype.isCancelable= function()
{
 return false;
}
AdfBusyStateEvent.prototype.toDebugString= function()
{
 var x0=AdfBusyStateEvent.superclass.toDebugString.call(this);
 return x0.substring(0,x0.length - 1) +
 ", busy=" + this._busy +
 "]";
}
AdfBusyStateEvent.prototype.Init= function(
x1,
x2)
{
AdfBusyStateEvent.superclass.Init.call(
this,
x1,
AdfBusyStateEvent.BUSY_STATE_TYPE);
this._busy=x2;
}
function AdfPropertyChangeEvent(
x0,
x1,
x2,
x3
)
{
this.Init(x0,x1,x2,x3);
}
AdfObject.createSubclass(AdfPropertyChangeEvent,AdfBaseEvent);
AdfPropertyChangeEvent.PROPERTY_CHANGE_TYPE="propertyChange";
AdfPropertyChangeEvent.prototype.getPropertyName= function()
{
 return this._propertyName;
}
AdfPropertyChangeEvent.prototype.getOldValue= function()
{
 return this._oldValue;
}
AdfPropertyChangeEvent.prototype.getNewValue= function()
{
 return this._newValue;
}
AdfPropertyChangeEvent.prototype.isCancelable= function()
{
 return false;
}
AdfPropertyChangeEvent.prototype.toDebugString= function()
{
 var x0=AdfPropertyChangeEvent.superclass.toDebugString.call(this);
 return x0.substring(0,x0.length - 1) +
 ", propertyName=" + this._propertyName +
 ", oldValue=" + this._oldValue +
 ", newValue=" + this._newValue +
 "]";
}
AdfPropertyChangeEvent.prototype.Init= function(
x1,
x2,
x3,
x4)
{
AdfPropertyChangeEvent.superclass.Init.call(this,
x1,
AdfPropertyChangeEvent.PROPERTY_CHANGE_TYPE);
AdfAssert.assert(x2,"propertyName must be specified");
this._propertyName=x2;
this._oldValue=x3;
this._newValue=x4;
}
function AdfUIComponent(
x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfUIComponent);
AdfUIComponent._COMPONENT_FACTORY= new Object();
AdfUIComponent.USAGE_PRIVATE_CHILD=1;
AdfUIComponent.STATE_LOADING=1;
AdfUIComponent.STATE_COMPLETE=4;
AdfUIComponent.createComponent= function(
x0)
{
AdfAssert.assert(x0,"component type  required when creating components");
 var x1=AdfUIComponent._COMPONENT_FACTORY[x0];
 if (!x1)
{
AdfLogger.LOGGER.warning("No component for:",x0);
 return null;
}
 else
 {
 return new x1();
}
}
AdfUIComponent.registerComponent= function(
x2,
x3)
{
AdfAssert.assert(x3,
"constructor required when registering components for " +
 x2);
AdfAssert.assert(x2,
"componentType required when registering " +
 x3);
AdfUIComponent._COMPONENT_FACTORY[x2]=x3;
}
AdfUIComponent.prototype.addEventListener= function(
x4,
x5,
x6)
{
AdfAssert.assertFunction(x5);
AdfAssert.assert(typeof x6!="function");
 var x7=this._getClientListeners();
 if (!x7)
{
x7= new Object();
}
 var x8=x7[x4];
 if ((x8!=null)||(x6!=null))
{
 var x9;
 if (AdfCollections.isArray(x8))
x9=x8;
 else
 {
x9= new Array();
 if (x8)
x9.push(x8);
}
AdfAssert.assertArray(x9);
 if (x6!=null)
x9.push(x6);
x9.push(x5);
x7[x4]=x9;
}
 else
 {
x7[x4]=x5;
}
this.setProperty("clientListeners",x7);
}
AdfUIComponent.prototype.removeEventListener= function(
x10,
x11,
x12)
{
AdfAssert.assertFunction(x11);
AdfAssert.assert(typeof x12!="function");
 var x13=this._getClientListeners();
 if (x13!=null)
{
 var x14=x13[x10];
 if (x14!=null)
{
 if (!AdfCollections.isArray(x14))
{
 if (x14==x11)
x13[x10]=null;
}
 else
 {
AdfAssert.assertArray(x14);
 var x15=x14.length;
for(var x16=0;x16<x15;x16++)
{
 var x17=x14[x16];
 if (typeof x17!="function")
{
 if ((x17==x12)&&(x14[x16+1]==x11))
{
x14.splice(x16,2);
break;
}
x16++;
}
 else
 {
 if ((x17==x11)&&(x12==null))
{
x14.splice(x16,1);
break;
}
}
}
 var x18=x14.length;
 if (x18==1)
x13[x10]=x14[0];
 else if (x18==0)
x13[x10]=null;
}
}
this.setProperty("clientListeners",x13);
}
}
AdfUIComponent.prototype.getProperty= function(x19)
{
 var x20=this._props[x19];
 if (x20===undefined)
{
 var x21=this._peer;
 if (x21!=null)
x20=x21.getComponentProperty(this,x19);
 if (x20===undefined)
{
 var x22=this.getPropertyKeys()[x19];
 if (x22!=null)
{
 var x23=x22[AdfUIComponent.PROPERTY_KEY_DEFAULT];
x20=x23;
 if (x23===undefined)
x23=AdfUIComponent._DEFAULT_VALUE_UNDEFINED;
this._props[x19]=x23;
}
}
}
 else if (x20===AdfUIComponent._DEFAULT_VALUE_UNDEFINED)
{
x20=undefined;
}
 return x20;
}
AdfUIComponent.prototype.getPropertyValue= function(
x24)
{
 return this.getProperty(x24);
}
AdfUIComponent.prototype.getPropertyKeys= function()
{
 return this.constructor[AdfUIComponent._CLASS_PROPERTY_KEYS];
}
AdfUIComponent.prototype.getComponentType= function()
{
 return this._componentType;
}
AdfUIComponent.prototype.satisfiesUsage= function(x25)
{
AdfAssert.assertNumber(x25);
 var x26=this._componentUsageFlags;
 return (x25&x26)!=0;
}
AdfUIComponent.prototype.dontPropagateDescendantMessageChanges= function()
{
 return false;
}
AdfUIComponent.prototype.initializeProperty= function(
x27,
x28)
{
 if (AdfAssert.DEBUG)
{
AdfAssert.assert(this._props[x27]===undefined,
"Property '"+ x27+ "' is already defined as " + this._props[x27]);
}
this._props[x27]=x28;
}
AdfUIComponent.prototype.setProperty= function(
x29,
x30,
x31,
x32)
{
AdfAssert.assertString(x29);
 var x33=this.getProperty(x29);
 var x34=this.getPropertyKeys()[x29];
 var x35=false;
 if (x34)
{
x35= !x34[AdfUIComponent.PROPERTY_DISCONNECTED];
 if (x35)
x35=x34[AdfUIComponent.PROPERTY_KEY_SECURED];
 if (x35)
{
 var x36=this.getProperty('unsecure');
x35=(x36==null||
 !(x29 in x36))
}
 if (x35)
{
AdfLogger.LOGGER.severe("Ignoring attempt to set secured property[" +
 x29 + "] to:" + x30);
 return x33;
}
}
 if (x33===x30)
 return x33;
 var x37=(x33==null)|| !this.ComparePropertyValues(x29,x33,x30);
 if (!x37)
 return x33;
this._props[x29]=x30;
 if (((x32!=AdfUIComponent.PROPAGATE_NEVER)&&
(x32!=AdfUIComponent.PROPAGATE_LOCALLY))&&
(x34
? !x34[AdfUIComponent.PROPERTY_DISCONNECTED]
:x32==AdfUIComponent.PROPAGATE_ALWAYS))
{
AdfPage.PAGE.addChangedComponent(this);
 var x38=this._propChanges;
 if (x38==undefined)
{
x38= new Object();
this._propChanges=x38;
}
 var x39=x29 + AdfUIComponent._FLAG_PERSISTENCE;
 if(x31)
{
x38[x39]=true;
 if(x38[x29])
x38[x29]=false;
}
 else
 {
x38[x29]=true;
 if(x38[x39])
x38[x39]=false;
}
}
this.SetPropertyImpl(x29,x33,x30);
 if (x32!=AdfUIComponent.PROPAGATE_NEVER)
{
 var x40=this._peer!=null;
 var x41=this._getClientListeners();
 var x42=(x41)?x41["propertyChange"]:null;
 if (x40||x42)
{
 var x43= new AdfPropertyChangeEvent(this,x29,x33,x30);
 if (x40)
{
try
{
this._peer.ComponentPropertyChanged(x43);
}
catch(e)
{
AdfLogger.LOGGER.logError(e,AdfLogger.WARNING,"Error delivering property changed event:" + x43);
 throw e;
}
}
 if (x42)
this._deliverEventToListeners(x43,x42);
}
this.DeliverDerivedPropertyEvents(x29,x33,x30);
}
 return x33;
}
AdfUIComponent.prototype.setInlineStyleProperty= function(
x44,
x45)
{
this.getPeer().setInlineStyleProperty(this,x44,x45);
}
AdfUIComponent.prototype.getInlineStyleProperty= function(x46)
{
 return this.getPeer().getInlineStyleProperty(this,x46);
}
AdfUIComponent.prototype.getReadyState= function()
{
 return this.getPeer().getReadyState(this);
}
AdfUIComponent.prototype.getClientId= function()
{
 return this._clientId;
}
AdfUIComponent.prototype.getAbsoluteId= function()
{
 var x47=this._absoluteId;
 if (x47==null)
{
x47=this._peer.getAbsoluteId(this,this._clientId);
this._absoluteId=x47;
}
 return x47;
}
AdfUIComponent.prototype.getAbsoluteLocator= function()
{
 var x48=this._absoluteLocator;
 if (x48==null)
{
x48=this._peer.getAbsoluteLocator(this,this._clientId);
this._absoluteLocator=x48;
}
 return x48;
}
AdfUIComponent.prototype.getAccessibleName= function()
{
 var x49=this.getPeer();
 var x50=null;
 if (x49)
{
x50=x49.getAccessibleName(this);
}
 return x50;
}
AdfUIComponent.prototype.findComponent= function(x51,x52)
{
 return AdfUIComponent.__findComponent(x51,this,x52);
}
AdfUIComponent.__findComponent= function(x53,x54,x55)
{
AdfAssert.assertNonEmptyString(x53);
 var x56=x53.match(/^:+/);
 if (x56!=null)
{
x56=x56[0];
}
 var x57=0;
 var x58=false;
 var x59=x53;
 if (x56!=null)
{
 var x60=x56.length;
 if (x53.length<=x60)
{
AdfLogger.LOGGER.severe(
"Error - Illegal argument - invalid expression = \"",
x53,
"\"; the expression must be more than just leading qualifiers.");
 return undefined;
}
 if (x60==1)
{
x59=x53.substring(1);
}
 else
 {
x57=x60;
x58=true;
x59=x53.substring(x60);
}
}
 else
 {
x58=true;
x57=1;
}
 var x61;
 var x62;
 var x63;
 var x64;
 if (x58)
{
x64=AdfUIComponent.__isNamingContainer(x54.constructor);
 var x65=AdfUIComponent._findRelativeComponent(
x54.getClientId(),
x64,
(x57>0)?x57 - 1:0,
x59,
":",
x53,
x55);
 if (x65)
 return x65;
 if (x64)
x57--;
x62=x54.getAbsoluteId();
x61=x59;
x63=AdfUIComponent._trimAbsoluteScopedId(x62,x57);
x59=x63 + x61;
}
x65=AdfUIComponent._findAbsoluteComponent(x59);
 if (!x65&&x58)
{
 if (!x55)
{
 var x66=x57;
 if (x64)
{
x66++;
}
 else
 {
x66--;
}
x63=AdfUIComponent._trimAbsoluteScopedId(x62,x66);
x59=x63 + x61;
x65=AdfUIComponent._findAbsoluteComponent(x59);
 if (x65)
{
AdfLogger.LOGGER.warning("Use of deprecated findComponent search string:",
x53,
" on ",
x54);
}
}
 if (!x65)
{
 var x67=x62.split(":");
 var x68=x57;
 var x69=x67.length - 1;
while(!x65&&x69&&x68)
{
 var x70=x67[x69];
 if (!isNaN(x70))
{
x67.splice(x69,1);
x68--;
x63=AdfUIComponent._trimAbsoluteScopedId(x67.join(":"),x57);
x59=x63 + x61;
x65=AdfUIComponent._findAbsoluteComponent(x59);
}
x69--;
}
}
}
 return x65;
}
AdfUIComponent._findRelativeComponent= function(
x71,
x72,
x73,
x74,
x75,
x76,
x77)
{
 var x78=0;
 var x79,x80;
 var x81=x71;
 var x82=0;
 var x83=null;
 var x84=false;
 if (!x72)
{
x80=x81.lastIndexOf(x75);
 if (x80== -1)
{
 return AdfPage.PAGE.findComponent(x74);
}
x81=x81.substring(0,x80);
}
while(x78<=x73)
{
 if (x82>=x73)
{
x79=AdfPage.PAGE.findComponent(x81 + x75 + x74);
 if (x79!=null)
{
 return x79;
}
x84=true;
}
x80=x81.lastIndexOf(x75);
 if (x80== -1)
{
x79=AdfPage.PAGE.findComponent(x74);
 if (x79==null)
{
x83=x81;
x81=null;
break;
}
 return x79;
}
x79=AdfPage.PAGE.findComponent(x81);
 if (x79!=null&&AdfUIComponent.__isNamingContainer(x79.constructor))
{
 ++x78;
}
x83=x81;
x81=x81.substring(0,x80);
 ++x82;
}
 if (!x77)
{
 if (!x72&&x73>0&&x83!=null&& !x84)
{
x79=AdfPage.PAGE.findComponent(x83 + x75 + x74);
 if (x79!=null)
{
AdfLogger.LOGGER.warning(
"Component found using deprecated relative find of excessive number colons. " +
 "Search string: " + x76);
 return x79;
}
}
 if (x73==0&&x72)
{
x80=x71.lastIndexOf(x75);
x79=(x80== -1)?AdfPage.PAGE.findComponent(x74):
AdfPage.PAGE.findComponent(x71.substring(0,x80) + x75 + x74);
 if (x79!=null)
{
AdfLogger.LOGGER.warning(
"Component found using deprecated relative find using the parent component. " +
 "Search string: " + x76);
 return x79;
}
}
}
 return null;
}
AdfUIComponent._trimAbsoluteScopedId= function(x85,x86)
{
 if (x85&& !x86)
 return x85 + ":";
 var x87=x85.length;
while(x86--)
{
x87=x85.lastIndexOf(":",x87 - 1);
 if (x87== -1)
{
 if (x86)
{
AdfLogger.LOGGER.warning("Insufficient naming containers for expression:",
x85);
}
 return "";
}
}
 return x85.substring(0,x87 + 1);}
AdfUIComponent._findAbsoluteComponent= function(x88)
{
 var x89=AdfPage.PAGE;
 var x90=x89.findComponent(x88);
 if (x90)
 return x90;
 var x91={matchScopedId:x88,matchComponent:null};
 var x92=x88;
 var x93=x92.lastIndexOf(":");
while(x93!= -1)
{
x92=x92.substring(0,x93);
x90=x89.findComponent(x92);
 if (x90)
{
x90.visitChildren(AdfUIComponent._matchAbsoluteIdCallback,x91,false);
 return x91.matchComponent;
}
x93=x92.lastIndexOf(":");
}
 return null;
}
AdfUIComponent.prototype.findComponentByLocator= function(x94)
{
 return AdfUIComponent.__findComponentByLocator(x94,this);
}
AdfUIComponent.__findComponentByLocator= function(x95,x96)
{
AdfAssert.assertNonEmptyString(x95);
 var x97=AdfPage.PAGE;
 return x97.findComponentByAbsoluteLocator(x95);
}
AdfUIComponent._matchAbsoluteIdCallback= function(x98)
{
 if (this.matchScopedId==x98.getAbsoluteId())
{
this.matchComponent=x98;
 return 2;
}
 else
 {
 return 0;
}
}
AdfUIComponent.prototype.isShowing= function()
{
 var x99=this.getParent();
 var x100=(x99)
?x99.isShowing()
:true;
 return x100&&this.getVisible();
}
AdfUIComponent.prototype.isEventRoot= function()
{
 return false;
}
AdfUIComponent.prototype.queueEvent= function(x101)
{
AdfAssert.assertPrototype(x101,AdfBaseEvent);
AdfPage.PAGE.queueEvent(x101);
}
AdfUIComponent.prototype.broadcast= function(x102)
{
AdfAssert.assertPrototype(x102,AdfBaseEvent);
 var x103=x102.getSource();
 if (x103==this)
{
 if (x102.getDoesBubbles())
{
 if (x102.getEventPhase()==AdfBaseEvent.CAPTURING_PHASE)
{
x102.nextEventPhase();
}
 if (x102.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
x102.setCurrentTarget(x103);
this._deliverEvent(x102);
x102.nextEventPhase();
}
 if (x102.getEventPhase()==AdfBaseEvent.BUBBLING_PHASE)
{
this._bubbleEvent(x102);
}
}
 else
 {
this._deliverEvent(x102);
}
 if (!x102.isCanceled())
{
this.HandleEvent(x102);
}
}
 else
 {
 var x104=x102.getEventPhase();
AdfAssert.assert((x104==AdfBaseEvent.BUBBLING_PHASE),"invalid event phase");
 if (x104==AdfBaseEvent.BUBBLING_PHASE)
{
this.HandleBubbledEvent(x102);
this._bubbleEvent(x102);
}
}
}
AdfUIComponent.prototype.processPushData= function(x105,x106)
{
AdfAssert.assert(x105!==undefined);
AdfAssert.assertNumber(x106);
 return this.getPeer().processPushData(this,x105,x106);
}
AdfUIComponent.prototype.clone= function()
{
 var x107=AdfUIComponent.superclass.clone.call(this);
x107._peer=null;x107._source=undefined;
x107._parent=undefined;
x107._propChanges=undefined;
x107._propListeners=null;
 var x108= new Object();
AdfCollections.copyInto(x108,this._props);
x107._props=x108;
 return x107;
}
AdfUIComponent.prototype.resizeNotify= function(
x109,
x110,
x111,
x112
)
{
 var x113=this.getPeer();
 if (x113)
{
x113.resizeNotify(this,x109,x110,x111,x112);
}
}
AdfUIComponent.prototype.scrollIntoView= function(x114,x115)
{
 var x116=this.getPeer();
 if (x116)
{
x116.scrollIntoView(this,x114,x115);
}
}
AdfUIComponent.prototype._deliverEvent= function(
x117)
{
AdfAssert.assertPrototype(x117,AdfBaseEvent);
 var x118=this.getPeer();
 if (x118)
{
x118.DispatchComponentEvent(x117);
}
 var x119=this._getClientListeners();
 if (x119)
{
 var x120=x119[x117.getType()];
 if (x120)
{
this._deliverEventToListeners(x117,x120);
}
}
}
AdfUIComponent.prototype._deliverEventToListeners= function(x121,x122)
{
AdfAssert.assertPrototype(x121,AdfBaseEvent);
 if (x122)
{
 if (AdfCollections.isArray(x122))
{
 var x123=x122.length;
for(var x124=0;x124<x123;x124++)
{
 var x125=x122[x124];
 var x126;
 var x127;
 if (typeof x125=="function")
x127=x125;
 else
 {
x126=x125;
x124++;
x127=x122[x124];
}
this._deliverEventToListener(x121,x126,x127);
}
}
 else
 {
this._deliverEventToListener(x121,null,x122);
}
}
}
AdfUIComponent.prototype._deliverEventToListener= function(x128,x129,x130)
{
AdfAssert.assertPrototype(x128,AdfBaseEvent);
AdfAssert.assertObjectOrNull(x129);
AdfAssert.assertFunction(x130);
try
{
 if (x129==null)
{
x130(x128);
}
 else
 {
x130.call(x129,x128);
}
}
catch(e)
{
AdfLogger.LOGGER.logError(e,
AdfLogger.WARNING,
"Error delivering event:" + x128 +
 " to " + x130 +
 " on instance " +
 x129);
}
}
AdfUIComponent.prototype._getClientListeners= function()
{
 return this._props["clientListeners"];
}
AdfUIComponent.prototype.HandleEvent= function(x131)
{
AdfAssert.assert(!x131.isCanceled());
 if (x131.propagatesToServer())
{
AdfPage.PAGE.queueEventToServer(x131);
}
}
AdfUIComponent.prototype.HandleBubbledEvent= function(x132)
{
 if ((x132.getRoot()===undefined)&&this.isEventRoot())
{
x132.setRoot(this);
}
 var x133=this.getPeer();
 if (x133)
{
x133.DispatchComponentEvent(x132);
}
}
AdfUIComponent._initAccessors= function(
x134,
x135,
x136,
x137,
x138)
{
 if (!x135)
 return;
 var x139=AdfUIComponent._CONSTANT_CACHE;
 var x140=AdfUIComponent._ACCESSOR_NAME_CACHE;
 var x141=AdfUIComponent._ACCESSOR_CACHE;
 var x142=AdfUIComponent._MUTATOR_NAME_CACHE;
 var x143=AdfUIComponent._MUTATOR_CACHE;
 var x144=x134.prototype;
for(var x145 in x135)
{
 var x146=(x136)
?x145 + x136
:x145;
 var x147=x139[x146];
 if (!x147)
{
x147=AdfStrings.createConstantName(x146);
x139[x146]=x147;
}
x144[x147]=x145;
x134[x147]=x145;
 var x148=x140[x146];
 var x149;
 if (!x148)
{
x148=AdfUIComponent._createAccessorName(x145);
x140[x146]=x148;
 var x150=x137 + "(this." + x147 + ");";
x149= new Function(x150);
x141[x146]=x149;
}
 else
 {
x149=x141[x146];
AdfAssert.assertFunction(x149);
}
x144[x148]=x149;
 var x151=x135[x145];
 if (!x151[AdfUIComponent.PROPERTY_KEY_SECURED])
{
 var x152=x142[x146];
 var x153;
 if (!x152)
{
x152=AdfUIComponent._createMutatorName(x145);
x142[x146]=x152;
 var x154=x138 + "(this." + x147 + ",v);";
x153= new Function("v",x154);
x143[x146]=x153;
}
 else
 {
x153=x143[x146];
AdfAssert.assertFunction(x153);
}
x144[x152]=x153;
}
}}
AdfUIComponent.InitClass= function()
{
AdfUIComponent.PROPERTY_KEY_DEFAULT="default";
AdfUIComponent.PROPERTY_KEY_SECURED="secured";
AdfUIComponent.PROPERTY_DISCONNECTED="disconnected";
AdfUIComponent.PROPAGATE_IF_KNOWN_PROPERTY=0;
AdfUIComponent.PROPAGATE_ALWAYS=1;
AdfUIComponent.PROPAGATE_NEVER=2;
AdfUIComponent.PROPAGATE_LOCALLY=3;
 var x155=this.GetSubclassPropertyKeys();
 var x156=this.superclass.constructor;
 var x157=x156[AdfUIComponent._CLASS_PROPERTY_KEYS];
 if (x155)
{
AdfUIComponent._initAccessors(this,
x155,
null,
"return this.getPropertyValue",
"return this.setProperty");
x157=(x157)
?AdfCollections.union(x157,x155)
:x155;
}
this[AdfUIComponent._CLASS_PROPERTY_KEYS]=x157;
 var x158=this["InitSubclass"];
 if (x158!=null)
{
x158.call(this);
}
}
AdfUIComponent.SetDisconnectedProperty= function(
x159,
x160)
{
AdfUIComponent._setPropertyInfo(x159,
x160,
AdfUIComponent.PROPERTY_DISCONNECTED,
true);
}
AdfUIComponent.SetPropertyType= function(
x161,
x162,
x163)
{
AdfUIComponent._setPropertyInfo(x161,x162,"type",x163);
}
AdfUIComponent._setPropertyInfo= function(
x164,
x165,
x166,
x167)
{
 if (x165)
{
 var x168=x164[AdfUIComponent._CLASS_PROPERTY_KEYS];
 var x169=x168[x165];
 if (x169)
{
 var x170=x164.superclass;
 if (x170&&(x168===x170[AdfUIComponent._CLASS_PROPERTY_KEYS]))
{
 var x171={};
for(var x172 in x168)
{
x171[x172]=x168[x172];
}
x164[AdfUIComponent._CLASS_PROPERTY_KEYS]=x171;
x168=x171;
}
 if (x167!=x169[x166])
{
 var x173=AdfCollections.copyInto({},x169);
x173[x166]=x167;
x168[x165]=x173;
}
}
}
}
AdfUIComponent.prototype.Init= function(
x174,
x175,
x176,
x177)
{
AdfAssert.assertStringOrNull(x174);
AdfAssert.assertStringOrNull(x175);
AdfAssert.assertObjectOrNull(x176);
AdfAssert.assertNumberOrNull(x177);
AdfUIComponent.superclass.Init.call(this);
 if (x174!=undefined)
this._componentType=x174;
this._clientId=x175;
 var x178;
 if (x176!=null)
{
x178=x176[AdfUIComponent._BEHAVIORS_KEY];
}
 else
 {
x176={}
}
this._props=x176;
 if (x178)
this._initBehaviors(x178);
 if (x177)
this._componentUsageFlags=x177;
}
AdfUIComponent.prototype.SetPropertyImpl= function(
x179,
x180,
x181)
{
}
AdfUIComponent.prototype.DeliverDerivedPropertyEvents= function(
x182,
x183,
x184)
{
}
AdfUIComponent.GetSubclassPropertyKeys= function()
{
 return {"id":{"name":"id","type":"string","default":null,"secured":true,"disconnected":true},
"visible":{"name":"visible","type":"boolean","default":true},
"styleClass":{"name":"styleClass","type":"string","default":null},
"inlineStyle":{"name":"inlineStyle","type":"string","default":null}};
}
AdfUIComponent.prototype.GetChanges= function()
{
 var x185=this._propChanges;
 var x186=this._props;
 var x187= new Object();
 var x188=AdfUIComponent._DEFAULT_VALUE_UNDEFINED;
for(var x189 in x185)
{
 if(x185[x189])
{
 var x190=AdfUIComponent._removePersistedFlag(x189);
 var x191=x186[x190];
 if (x191===x188)
x191=undefined;
x187[x189]=x191;
}
}
 return x187;
}
AdfUIComponent.prototype.clearChanges= function()
{
this._propChanges=undefined;
}
AdfUIComponent.prototype.AddNotify= function()
{
 if (!this._peer)
{
 var x192=AdfPage.PAGE;
 if (this._dropTarget)
{
x192.getDnDContext().__addComponentTarget(this);
}
 var x193=x192.getLookAndFeel().getPeer(this);
this._peer=x193;
x193.initialize(this);
 if (x193.needsResizeNotify(this))
x192.registerResizeNotifyComponent(this);
}
}
AdfUIComponent.prototype.RemoveNotify= function()
{
 var x194=AdfPage.PAGE;
x194.removeChangedComponent(this);
 var x195=this.getClientId();
x194.clearMessages(x195);
 var x196=x194.getActiveComponentId();
 if (x195==x196)
x194._setActiveComponentId(null);
 var x197=this._peer;
 if (x197)
{
 if (this._dropTarget)
{
x194.getDnDContext().__removeComponentTarget(this);
}
 if(this._dragSource)
{
x194.getDnDContext().__removeDragSource(this);
this._dragSource.__setComponent(null);
}
 if (x197.needsResizeNotify(this))
x194.unregisterResizeNotifyComponent(this);
x197.componentRemoved(this);
this._peer=null;
}
 if (AdfAssert.DEBUG)
{
this._dead=true;
}
}
AdfUIComponent.prototype._bubbleEvent= function(x198)
{
 if (x198.isBubblingStopped())
 return;
 var x199=x198.getCurrentTarget();
 var x200=x199.getParent();
 if (x200)
{
x198.setCurrentTarget(x200);
x200.broadcast(x198);
}
}
AdfUIComponent.prototype._setSource= function(x201)
{
this._source=x201;
}
AdfUIComponent.prototype.getParent= function()
{
 var x202=this._parent;
 if (x202===undefined)
{
 var x203=this._peer;
 if (x203!=null)
{
x202=x203.getComponentParent(this);
this._parent=x202;
}
}
 return x202;
}
AdfUIComponent.prototype.getDescendantComponents= function(x204)
{
 return this.getPeer().getDescendantComponents(this,x204);
}
AdfUIComponent.prototype.visitChildren= function(
x205,
x206,
x207)
{
 var x208=this._peer;
 if (x208!=null)
{
x208.visitChildren(this,x205,x206,x207);
}
 return 0;
}
AdfUIComponent.prototype.__setParent= function(
x209)
{
this._parent=x209;
}
AdfUIComponent.prototype.isDescendant= function(
x210)
{
 if (x210)
{
 var x211=this.getParent();
while(x211)
{
 if (x211==x210)
 return true;
x211=x211.getParent();
}
}
 return false;
}
AdfUIComponent.prototype.focus= function()
{
 var x212=this._peer;
 if (x212!=null)
{
x212.focus(this);
}
}
AdfUIComponent.prototype.getDragSource= function()
{
 return this._dragSource;
}
AdfUIComponent.prototype.setDragSource= function(x213)
{
AdfAssert.assertPrototypeOrNull(x213,AdfDragSource);
 var x214=this._dragSource;
 if (x214)
{
x214.__setComponent(null);
}
this._dragSource=x213;
 if (x213)
{
x213.__setComponent(this);
}
}
AdfUIComponent.prototype.getDropTarget= function()
{
 return this._dropTarget;
}
AdfUIComponent.prototype.setDropTarget= function(x215)
{
AdfAssert.assertPrototypeOrNull(x215,AdfDropTarget);
 var x216=this._dropTarget;
 if (x215!=x216)
{
 var x217=AdfPage.PAGE.getDnDContext();
 if (x216)
{
x216.__setComponent(null);
 if (this._peer)
{
x217.__removeComponentTarget(this);
}
}
this._dropTarget=x215;
 if (x215)
{
x215.__setComponent(this);
 if (this._peer)
{
x217.__addComponentTarget(this);
}
}
}
}
AdfUIComponent.prototype.toDebugString= function()
{
 var x218=this.getTypeName() +
 " [" +
 this.getComponentType() +
 "]";
 var x219=this.getClientId();
 if (x219)
{
x218+=" id=" + x219;
}
 if (AdfAssert.DEBUG)
{
 if (this._dead)
{
x218+=" , DEAD!";
}
}
 return x218;
}
AdfUIComponent.prototype.getPeer= function()
{
 return this._peer;
}
AdfUIComponent.prototype.ComparePropertyValues= function (
x220,
x221,
x222)
{
 var x223=(x222===x221);
 if (!x223&&x222!=null&&x221!=null)
{
 var x224=this.getPropertyKeys();
 var x225=x224[x220];
 if (x225!=null)
{
 var x226=x225.type;
 if (x226=="Array")
{
x223=AdfUIUtils.compareArrays(x221,x222);
}
 else if (AdfObject.prototype.isPrototypeOf(x221)&&
AdfObject.prototype.isPrototypeOf(x222))
{
x223=x222.equals(x221);
}
 else if (x226=="Object")
{
 if (Object.prototype.isPrototypeOf(x221)&&
Object.prototype.isPrototypeOf(x222))
{
x223=AdfUIUtils.compareObjects(x221,x222);
}
}
 else if (x226=="Date")
{
x223=x221.getTime()==x222.getTime();
}
}
}
 return x223;
}
AdfUIComponent.prototype._initBehaviors= function(x227)
{
AdfAssert.assert(x227!=null);
 if (AdfCollections.isArray(x227))
{
 var x228=x227.length;
for(var x229=0;x229<x228;x229++)
{
 var x230=x227[x229];
AdfAssert.assertFunction(x230.initialize,"Missing client behvavior initialize()");
x230.initialize(this);
}
}
 else
 {
AdfAssert.assertFunction(x227.initialize,"Missing client behvavior initialize()");
x227.initialize(this);
}
}
AdfUIComponent._createAccessorName= function(
x231)
{
 return "get" + AdfStrings.initUpperCase(x231);
}
AdfUIComponent._createMutatorName= function(
x232,
x233)
{
 return "set" + AdfStrings.initUpperCase(x232);
}
AdfUIComponent._removePersistedFlag= function(
x234)
{
 var x235=x234.length - 2;
 if(x234.lastIndexOf(
AdfUIComponent._FLAG_PERSISTENCE)==x235)
 return x234.substr(0,x235);
 return x234
}
AdfUIComponent.__isNamingContainer= function(x236)
{
 return (true===x236._namingContainer);
}
AdfUIComponent.__setNamingContainer= function(x237,x238)
{
x237._namingContainer=x238;
}
AdfUIComponent._DEFAULT_VALUE_UNDEFINED= new Object();
AdfUIComponent._CLASS_PROPERTY_KEYS="_propertyKeys";
AdfUIComponent._FLAG_PERSISTENCE="|p";
AdfUIComponent._CONSTANT_CACHE= new Object();
AdfUIComponent._ACCESSOR_CACHE= new Object();
AdfUIComponent._MUTATOR_CACHE= new Object();
AdfUIComponent._ADD_LISTENER_CACHE= new Object();
AdfUIComponent._REMOVE_LISTENER_CACHE= new Object();
AdfUIComponent._ACCESSOR_NAME_CACHE= new Object();
AdfUIComponent._MUTATOR_NAME_CACHE= new Object();
AdfUIComponent._ADD_LISTENER_NAME_CACHE= new Object();
AdfUIComponent._REMOVE_LISTENER_NAME_CACHE= new Object();
AdfUIComponent._BEHAVIORS_KEY="behaviors";

var AdfUIComponents= new Object();
AdfUIComponents.CreateArrayToObjectFunction= function(
x0)
{
 var x1="return {'";
 var x2=x0.join("':1,'");
x1+=x2 + "':1};";
 return new Function(x1);
}
AdfUIComponents.CreatePropertiesFunction= function(
x3)
{
 var x4={};
for(var x5=0;x5<x3.length;x5++)
{
 var x6=x3[x5];
 if (typeof(x6)=="string")
x6={"name":x6};
 else
 {
AdfAssert.assertObject(x6);
}
 if (!x6["type"])
x6.type="Object";
 var x7=AdfUIComponents._PROPERTY_DEFAULT_VALUES;
 if (x6["default"]===undefined)
{
 var x8=x7[x6.type];
 if (x8===undefined)
x8=null;
x6["default"]=x8;
}
x4[x6.name]=x6;
}
 return function(){ return x4;};
}
AdfUIComponents._nullFunction= function(){return null;};
AdfUIComponents.createComponentClass= function(
x9,
x10)
{
 var x11="this.Init(" +
 x9 +
 "._COMPONENT_TYPE, i, p, u);"
 var x12= new Function(AdfUIComponents._ID_PARAM_NAME,
AdfUIComponents._PROPERTIES_PARAM_NAME,
AdfUIComponents._USAGE_PARAM_NAME,
x11);
 var x13=x10["componentType"];
x12._COMPONENT_TYPE=x13;
 var x14=x10["superclass"];
 if (!x14)
x14=AdfUIComponent;
AdfObject.createSubclass(x12,x14,x9);
 if (x9)
{
window[x9]=x12;
}
 var x15=AdfUIComponents._nullFunction;
 var x16=x10["propertyKeys"];
 if (x16&&x16.length)
{
x15=AdfUIComponents.CreatePropertiesFunction(x16);
}
 var x17=x10["namingContainer"];
 if (x17||AdfUIComponent.__isNamingContainer(x14))
AdfUIComponent.__setNamingContainer(x12,true);
x12.GetSubclassPropertyKeys=x15;
x12.InitClass=AdfUIComponent.InitClass;
AdfUIComponent.registerComponent(x13,x12);
 return x12;
}
AdfUIComponents._PROPERTIES_PARAM_NAME="p";
AdfUIComponents._ID_PARAM_NAME="i";
AdfUIComponents._USAGE_PARAM_NAME="u";
AdfUIComponents._PROPERTY_DEFAULT_VALUES={"boolean":false,
"int":0,
"float":0.0};

AdfUIComponents.createComponentClass("AdfUIPopup",
{
componentType:"oracle.adf.Popup"
});

AdfUIPopup.prototype.isEventRoot= function()
{
 return true;
}
AdfUIPopup.prototype.dontPropagateDescendantMessageChanges= function()
{
 return true;
}

AdfUIComponents.createComponentClass("AdfRichPopup",
{
componentType:"oracle.adf.RichPopup",
propertyKeys:[{name:"contentDelivery",type:"String","default":"lazy"}
,{name:"animate",type:"String","default":"default"}
,{name:"eventContext",type:"String","default":"self",secured:true}
,{name:"launcherVar",type:"String",secured:true}
,"popupFetchListener"
,"popupCanceledListener"
,{name:"visible",type:"Boolean","default":true,secured:true}
,{name:"autoCancel",type:"String","default":"enabled"}
,{name:"childCreation",type:"String","default":"immediate"}
,{name:"resetEditableValues",type:"String","default":"never"}
],
eventNames:["popupFetch","popupCanceled"],
superclass:AdfUIPopup
});

AdfRichPopup.CONTENT_DELIVERY_IMMEDIATE="immediate";
AdfRichPopup.CONTENT_DELIVERY_LAZY="lazy";
AdfRichPopup.CONTENT_DELIVERY_LAZY_UNCACHED="lazyUncached";
AdfRichPopup.HINT_LAUNCH_ID="launchId";
AdfRichPopup.HINT_ALIGN="align";
AdfRichPopup.ALIGN_AFTER_START="after_start";
AdfRichPopup.ALIGN_AFTER_END="after_end";
AdfRichPopup.ALIGN_BEFORE_START="before_start";
AdfRichPopup.ALIGN_BEFORE_END="before_end";
AdfRichPopup.ALIGN_END_AFTER="end_after";
AdfRichPopup.ALIGN_END_BEFORE="end_before";
AdfRichPopup.ALIGN_START_AFTER="start_after";
AdfRichPopup.ALIGN_START_BEFORE="start_before";
AdfRichPopup.ALIGN_OVERLAP="overlap";
AdfRichPopup.ALIGN_BEFORE_AFTER="before_after";
AdfRichPopup.HINT_ALIGN_ID="alignId";
AdfRichPopup.AUTO_CANCEL_DISABLED="disabled";
AdfRichPopup.AUTO_CANCEL_ENABLED="enabled";
AdfRichPopup.ANIMATE_DEFAULT="default";
AdfRichPopup.RESET_EDITABLE_VALUES_WHEN_CANCELED="whenCanceled";
AdfRichPopup.prototype.show= function(x0)
{
AdfAssert.assertObjectOrNull(x0);
this.getPeer().show(this,x0);
}
AdfRichPopup.prototype.hide= function()
{
 var x1=this.getPeer();
 if (x1.fetchCanceled(this))
{
AdfLogger.LOGGER.finest("Lazy popup content fetch cancled for popupId ",
this.getClientId(),", because popup hide was called.");
 return;
}
 if (!this.isPopupVisible())
{
AdfLogger.LOGGER.finest("Popup hide request ignored for popupId ",
this.getClientId(),", because popup is not visible.");
 return;
}
 var x2=this._getFirstMenuPeer(this);
 if (x2)
{
x2.hidePopup();
}
 else
 x1.hide(this);
}
AdfRichPopup.prototype.cancel= function()
{
 var x3=this.getPeer();
 if (x3.fetchCanceled(this))
{
AdfLogger.LOGGER.finest("Lazy popup content fetch cancled for popupId ",
this.getClientId(),", because popup cancel was called.");
 return;
}
 if (!this.isPopupVisible())
{
AdfLogger.LOGGER.finest("Popup cancel request ignored for popupId ",
this.getClientId(),", because popup is not visible.");
 return;
}
 var x4=this._getFirstMenuPeer(this);
 if (x4)
{
x4.cancelPopup();
}
 else
 x3.cancel(this);
}
AdfRichPopup.prototype.isPopupVisible= function()
{
 var x5=this._getFirstMenuPeer(this);
 if (x5)
 return x5.isPopupVisible(x5.getComponent(),x5.getComponent().getClientId());
 else
 return this.getPeer().isVisible(this);
}
AdfRichPopup.prototype._getFirstMenuPeer= function(x6)
{
 var x7=null;
x6.visitChildren(this._visitChildrenForMenu,this,true);
 if(this._firstMenuChild)
{
x7=this._firstMenuChild.getPeer();
 delete this._firstMenuChild;
}
 return x7;
}
AdfRichPopup.prototype._visitChildrenForMenu= function(x8)
{
 if(x8 instanceof AdfRichMenu)
this._firstMenuChild=x8;
 return 2;
}

AdfUIComponents.createComponentClass("AdfUIValue",
{
componentType:"org.apache.myfaces.trinidad.Value",
propertyKeys:["value"
,{name:"converter",type:"Object",secured:true}
]
});

AdfUIValue.prototype.isConvertible= function()
{
 if (this._failedConversion)
{
AdfLogger.LOGGER.info("AdfUIValue.isConvertible: false");
 return false;
}
 return true;
}
AdfUIValue.prototype.getValue= function()
{
 if ( !this.isConvertible())
{
AdfLogger.LOGGER.info("AdfUIValue.getValue: last attempt to convert failed, returning undefined ",this);
 return undefined;
}
 else
 {
 return AdfUIValue.superclass.getValue.call(this);
}
}
AdfUIValue.prototype.GetConvertedValue= function(
x0)
{
AdfLogger.LOGGER.fine("Converting: ",x0);
 var x1=this.getPeer().getConvertedValue(this,x0);
 if (x1===undefined)
this._failedConversion=true;
 else
 this._failedConversion=false;
 return x1;
}
AdfUIValue.prototype.SetPropertyImpl= function(
x2,
x3,
x4)
{
 if (x2==AdfUIValue.VALUE)
{
this._failedConversion=false;
}
AdfUIValue.superclass.SetPropertyImpl.call(this,x2,x3,x4);
}
AdfUIValue.prototype.GetChanges= function()
{
 var x5=AdfUIValue.superclass.GetChanges.call(this);
 var x6=x5[AdfUIValue.VALUE];
 if ( !(x6===undefined))
{
 delete x5[AdfUIValue.VALUE];
 if (x6!=null)
{
 var x7=this.getConverter();
 if (x7!=null)
{
x6=x7.getAsString(x6);
 if (x6===undefined)
{
 return x5;
}
}
}
x5["_unconvertedValue"]=x6;
}
 return x5;
}

AdfUIComponents.createComponentClass("AdfUIEditableValue",
{
componentType:"org.apache.myfaces.trinidad.EditableValue",
propertyKeys:[{name:"immediate",type:"Boolean","default":false,secured:true}
,{name:"valid",type:"Boolean","default":true,secured:true}
,{name:"required",type:"Boolean","default":false,secured:true}
,{name:"localValueSet",type:"Boolean",secured:true}
,{name:"submittedValue",type:"Object",secured:true}
,{name:"requiredMessageDetail",type:"String",secured:true}
],
eventNames:["valueChange"],
superclass:AdfUIValue
});

AdfUIEditableValue.InitSubclass= function()
{
AdfUIComponent.SetDisconnectedProperty(this,AdfUIValue.VALUE);
AdfUIComponent.SetDisconnectedProperty(this,AdfUIEditableValue.SUBMITTED_VALUE);
AdfUIComponent.SetDisconnectedProperty(this,AdfUIEditableValue.VALID);
}
AdfUIEditableValue.prototype.isEventRoot= function()
{
 return true;
}
AdfUIEditableValue.prototype.resetValue= function()
{
this.setProperty("submittedValue",undefined);
this.setProperty("value",null);
this.setProperty("valid",true);
AdfPage.PAGE.clearMessages(this.getClientId());
}
AdfUIEditableValue.prototype.validate= function(x0)
{
 if (x0==null)
{
x0=this.getSubmittedValue();
 if (x0==null)
 return;
}
this.setProperty("valid",true);
 if (AdfPage.PAGE.shouldInterpretEmptyStringSubmittedValuesAsNull()&&this._isEmptyString(x0))
{
x0=null;
}
 var x1=null;
try{
x1=this.GetConvertedValue(x0);
}
catch(e)
{
this._addFacesMessage(e.getFacesMessage(),this.getLabel());
this.setProperty("valid",false);
}
 if (x1===undefined)
{
AdfLogger.LOGGER.info("AdfUIEditableValue.validate: converter not able to do conversion");
 if (this.getRequired()&&
this.getPeer().isEmpty&&this.getPeer().isEmpty(x0))
{
this._addRequiredFacesMessage();
this.setProperty("valid",false);
 return;
}
 if (this.getAutoSubmit()&&this.getPeer().autoSubmit)
this.getPeer().autoSubmit(this);
}
 else
 {
this.ValidateValue(x1);
 if (this.getValid())
{
 var x2=this.getProperty(AdfUIValue.VALUE);
 if (!(this.IsEmpty(x2)&&this.IsEmpty(x1)))
{
this.setProperty(AdfUIValue.VALUE,x1);
}
}
}
}
AdfUIEditableValue.prototype.getValue= function()
{
 if (!this.getValid())
{
AdfLogger.LOGGER.info("AdfUIEditableValue.getValue: valid is false, undefined will be returned for component ",this);
 return null;
}
 else
 {
 return AdfUIEditableValue.superclass.getValue.call(this);
}
}
AdfUIEditableValue.prototype.setValue= function(x3)
{
 var x4=this.getReadOnly();
 var x5=this.getDisabled();
 if (x4||x5)
AdfLogger.LOGGER.warning("AdfUIEditableValue.setValue called when readOnly or disabled true. New value ignored.");
 else
 {
this.setProperty("valid",true);
AdfUIEditableValue.superclass.setValue.call(this,x3);
}
}
AdfUIEditableValue.prototype.getValidators= function()
{
 return this.getProperty("validators");
}
AdfUIEditableValue.prototype.addValidator= function(x6)
{
AdfAssert.assertObject(x6);
 var x7=this.getValidators();
 if(x7===undefined)
x7= new Array();
x7.push(x6);
this.setProperty("validators",x7,false);
}
AdfUIEditableValue.prototype.DeliverDerivedPropertyEvents= function(x8,x9,x10)
{
 if (x8==AdfUIValue.VALUE)
{
 var x11=this.getAutoSubmit();
AdfValueChangeEvent.queue(this,x9,x10,x11);
}
AdfUIEditableValue.superclass.DeliverDerivedPropertyEvents.call(this,x8,
x9,x10);
}
AdfUIEditableValue.prototype.SetPropertyImpl= function(x12,x13,x14)
{
 if (x12==AdfUIEditableValue.SUBMITTED_VALUE&&
x14!=undefined)
{
AdfLogger.LOGGER.severe("AdfUIEditableValue: do not set the submittedValue property. The submittedValue property should come from the dom.");
}
AdfUIEditableValue.superclass.SetPropertyImpl.call(this,x12,x13,x14);
}
AdfUIEditableValue.prototype.ValidateValue= function(x15)
{
 if (!this.getValid())
 return;
 var x16=this.IsEmpty(x15);
 if (x16&&this.getRequired())
{
this._addRequiredFacesMessage();
this.setProperty("valid",false);
}
 if (!x16||AdfPage.PAGE.shouldValidateEmptyFields())
{
 var x17=this.getValidators();
 if (x17!=null)
{
for(var x18=0;x18<x17.length;x18++)
{
 var x19=x17[x18];
try{
x19.validate(x15,this.getProperty("label"),this.getConverter());
}
catch(e)
{
this._addFacesMessage(e.getFacesMessage(),this.getLabel());
this.setProperty("valid",false);
}
}
}
}
}
AdfUIEditableValue.prototype.IsEmpty= function(x20)
{
 if (x20==null)
 return true;
x20=AdfUIUtils.trim(x20);
 return (x20.length==0);
}
AdfUIEditableValue.prototype.GetRequiredKey= function()
{
 return "org.apache.myfaces.trinidad.UIXEditableValue.REQUIRED";
}
AdfUIEditableValue.prototype._isEmptyString= function(x21)
{
 return (x21.length==0);
}
AdfUIEditableValue.prototype._addRequiredFacesMessage= function()
{
 var x22=this.GetRequiredKey();
 var x23=this.getRequiredMessageDetail();
 var x24=this.getLabel();
 var x25=TrMessageFactory.createFacesMessage(x22,x23,x24);
this._addFacesMessage(x25,x24);
}
AdfUIEditableValue.prototype._addFacesMessage= function(x26,x27)
{
 var x28=this.getClientId();
 var x29=AdfPage.PAGE;
x29.addMessage(x28,x26,x27);
}

AdfUIComponents.createComponentClass("AdfUIForm",
{
componentType:"org.apache.myfaces.trinidad.Form",
propertyKeys:[]
});

AdfUIComponents.createComponentClass("AdfRichForm",
{
componentType:"oracle.adf.RichForm",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"usesUpload",type:"Boolean","default":false,secured:true}
,{name:"defaultCommand",type:"String"}
],
superclass:AdfUIForm
});

AdfUIComponents.createComponentClass("AdfUISubform",
{
componentType:"org.apache.myfaces.trinidad.Subform",
propertyKeys:[{name:"default",type:"Boolean","default":false,secured:true}
],
namingContainer:true
});

AdfUIComponents.createComponentClass("AdfRichSubform",
{
componentType:"oracle.adf.RichSubform",
propertyKeys:[{name:"defaultCommand",type:"String"}
],
namingContainer:true,
superclass:AdfUISubform
});

AdfUIComponents.createComponentClass("AdfUIMessage",
{
componentType:"org.apache.myfaces.trinidad.Message",
propertyKeys:[{name:"for",type:"String",secured:true}
]
});

AdfUIComponents.createComponentClass("AdfRichMessage",
{
componentType:"oracle.adf.RichMessage",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"message",type:"String"}
,{name:"messageType",type:"String","default":"none"}
],
superclass:AdfUIMessage
});

AdfUIComponents.createComponentClass("AdfUIDocument",
{
componentType:"org.apache.myfaces.trinidad.Document"
});

AdfUIComponents.createComponentClass("AdfRichDocument",
{
componentType:"oracle.adf.RichDocument",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"theme",type:"String"}
,{name:"title",type:"String"}
,{name:"stateSaving",type:"String","default":"default"}
,{name:"initialFocusId",type:"String",secured:true}
,{name:"failedConnectionText",type:"String",secured:true}
,{name:"maximized",type:"Boolean","default":true}
,{name:"uncommittedDataWarning",type:"String","default":"off"}
,{name:"smallIconSource",type:"String",secured:true}
,{name:"largeIconSource",type:"String",secured:true}
],
superclass:AdfUIDocument
});

AdfUIComponents.createComponentClass("AdfUIPanel",
{
componentType:"org.apache.myfaces.trinidad.Panel"
});

AdfUIComponents.createComponentClass("AdfRichMenu",
{
componentType:"oracle.adf.RichMenu",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"contentDelivery",type:"String","default":"immediate"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"text",type:"String"}
,{name:"accessKey",type:"String"}
,{name:"detachable",type:"Boolean","default":false}
,{name:"icon",type:"String"}
],
superclass:AdfUIPanel
});

function AdfActionEvent(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfActionEvent,AdfComponentEvent);
AdfActionEvent.ACTION_EVENT_TYPE="action";
AdfActionEvent.prototype.Init= function(x0)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfActionEvent.superclass.Init.call(this,x0,AdfActionEvent.ACTION_EVENT_TYPE);
}
AdfActionEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfActionEvent.prototype.isValidationNeeded= function()
{
 return true;
}
AdfActionEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
AdfActionEvent.queue= function(x1,x2)
{
 new AdfActionEvent(x1).queue(x2);
}

function AdfDisclosureEvent(
x0,
x1,
x2,
x3
)
{
this.Init(x0,x1,x2,x3);
}
AdfObject.createSubclass(AdfDisclosureEvent,AdfComponentEvent);
AdfDisclosureEvent.EVENT_TYPE="disclosure";
AdfDisclosureEvent.prototype.Init= function(
x0,
x1,
x2,
x3)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfAssert.assertBoolean(x1);
this._propagatesToServer=x3!==false;
this._isExpanded=x1;
this._disclosureCounterpart=x2;
AdfDisclosureEvent.superclass.Init.call(this,x0,AdfDisclosureEvent.EVENT_TYPE);
this.setRoot(x0);
}
AdfDisclosureEvent.prototype.isExpanded= function()
{
 return this._isExpanded;
}
AdfDisclosureEvent.prototype.getDisclosureCounterpart= function()
{
 return this._disclosureCounterpart;
}
AdfDisclosureEvent.prototype.AddMarshalledProperties= function(
x4)
{
x4.expand=this._isExpanded;
}
AdfDisclosureEvent.prototype.propagatesToServer= function()
{
 if ((this._isExpanded==false)&&(this._disclosureCounterpart!=null))
{
 return false;
}
 return this._propagatesToServer;
}
AdfDisclosureEvent.prototype.isValidationNeeded= function()
{
 if (this.isExpanded())
 return false;
 return true;
}
AdfDisclosureEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
function AdfDialogEvent(
x0,
x1
)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfDialogEvent,AdfComponentEvent);
AdfDialogEvent.EVENT_TYPE="dialog";
AdfDialogEvent.OUTCOME_OK="ok";
AdfDialogEvent.OUTCOME_YES="yes";
AdfDialogEvent.OUTCOME_NO="no";
AdfDialogEvent.OUTCOME_CANCEL="cancel";
AdfDialogEvent.prototype.Init= function(
x0,
x1
)
{
AdfDialogEvent.superclass.Init.call(this,x0,AdfDialogEvent.EVENT_TYPE);
this._outcome=x1;
this.setPartial(true);
}
AdfDialogEvent.prototype.getOutcome= function()
{
 return this._outcome;
}
AdfDialogEvent.prototype.AddMarshalledProperties= function(
x2)
{
x2.outcome=this._outcome;
}
AdfDialogEvent.prototype.propagatesToServer= function()
{
 return (this.getOutcome()!=AdfDialogEvent.OUTCOME_CANCEL);
}
AdfDialogEvent.prototype.isValidationNeeded=AdfDialogEvent.prototype.propagatesToServer;

function AdfLaunchPopupEvent(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfLaunchPopupEvent,AdfComponentEvent);
AdfLaunchPopupEvent.LAUNCH_EVENT_TYPE="launchPopup";
AdfLaunchPopupEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfLaunchPopupEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
AdfLaunchPopupEvent.prototype.Init= function(x0)
{
AdfLaunchPopupEvent.superclass.Init.call(this,x0,AdfLaunchPopupEvent.LAUNCH_EVENT_TYPE);
this.setRoot(x0);
}
AdfLaunchPopupEvent.queue= function(x1,x2)
{
 new AdfLaunchPopupEvent(x1).queue(x2);
}

function AdfReturnPopupDataEvent(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfReturnPopupDataEvent,AdfComponentEvent);
AdfReturnPopupDataEvent.LAUNCH_EVENT_TYPE="returnPopupData";
AdfReturnPopupDataEvent.prototype.Init= function(x0)
{
AdfReturnPopupDataEvent.superclass.Init.call(this,x0,AdfReturnPopupDataEvent.LAUNCH_EVENT_TYPE);
this.setRoot(x0);
}
AdfReturnPopupDataEvent.prototype.propagatesToServer= function()
{
 return false;
}
AdfReturnPopupDataEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
AdfReturnPopupDataEvent.queue= function(x1,x2)
{
 new AdfReturnPopupDataEvent(x1).queue(x2);
}

function AdfPollEvent(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfPollEvent,AdfComponentEvent);
AdfPollEvent.POLL_EVENT_TYPE="poll";
AdfPollEvent.prototype.Init= function(x0)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfPollEvent.superclass.Init.call(this,x0,AdfPollEvent.POLL_EVENT_TYPE);
this.setPartial(true);
 if (x0.getImmediate&&x0.getImmediate())
this.setRoot(x0);
}
AdfPollEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfPollEvent.queue= function(x1)
{
 new AdfPollEvent(x1).queue();
}
AdfPollEvent.prototype.getClearMessages= function()
{
 var x2=this.getSource();
 if (x2.getImmediate&&x2.getImmediate())
 return false;
 return AdfPollEvent.superclass.getClearMessages.call(this);
}
AdfPollEvent.prototype.isResponseAnnounced= function()
{
 return false;
}

function AdfPopupCanceledEvent(
x0,x1
)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfPopupCanceledEvent,AdfComponentEvent);
AdfPopupCanceledEvent.POPUP_CANCELED_EVENT_TYPE="popupCanceled";
AdfPopupCanceledEvent._OPTIMIZED_PROPAGATION_PROPERTY="_hasPopupCanceledListeners";
AdfPopupCanceledEvent.prototype.Init= function(
x0,x1
)
{
AdfPopupCanceledEvent.superclass.Init.call(this,x0,
AdfPopupCanceledEvent.POPUP_CANCELED_EVENT_TYPE);
this._resetEditableValues=x1;
this.setRoot(x0);
}
AdfPopupCanceledEvent.prototype.isResetEditableValues= function()
{
 return this._resetEditableValues?true:false;
}
AdfPopupCanceledEvent.prototype.propagatesToServer= function()
{
 var x2=this._propagatesToServer;
 if (!x2)
{
 var x3=AdfPopupCanceledEvent._OPTIMIZED_PROPAGATION_PROPERTY;
 var x4=this.getSource();
this._propagatesToServer=x2=(x4.getProperty(x3)?true:false);
}
 return (x2||this._resetEditableValues);
}
AdfPopupCanceledEvent.prototype.IsDeleveryDiscrete= function()
{
 return true;
}
AdfPopupCanceledEvent.prototype.isImmediate= function()
{
 return true;
}
AdfPopupCanceledEvent.prototype.AddMarshalledProperties= function(
x5)
{
AdfPopupCanceledEvent.superclass.AddMarshalledProperties.call(this,x5);
 if (this._resetEditableValues)
x5.resetEditableValues=true;
}
AdfPopupCanceledEvent.prototype.getClearMessages= function()
{
 return false;
}

function AdfPopupClosedEvent(
x0
)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfPopupClosedEvent,AdfComponentEvent);
AdfPopupClosedEvent.POPUP_CLOSED_EVENT_TYPE="popupClosed";
AdfPopupClosedEvent.prototype.Init= function(
x0
)
{
AdfPopupClosedEvent.superclass.Init.call(this,x0,
AdfPopupClosedEvent.POPUP_CLOSED_EVENT_TYPE);
}
AdfPopupClosedEvent.prototype.isCancelable= function()
{
 return false;
}

function AdfPopupOpeningEvent(
x0,
x1
)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfPopupOpeningEvent,AdfComponentEvent);
AdfPopupOpeningEvent.POPUP_OPENING_EVENT_TYPE="popupOpening";
AdfPopupOpeningEvent.prototype.Init= function(
x0,
x1
)
{
AdfPopupOpeningEvent.superclass.Init.call(this,x0,
AdfPopupOpeningEvent.POPUP_OPENING_EVENT_TYPE);
this._hints=x1;
}
AdfPopupOpeningEvent.prototype.getHints= function()
{
 return this._hints;
}

function AdfPopupOpenedEvent(
x0
)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfPopupOpenedEvent,AdfComponentEvent);
AdfPopupOpenedEvent.POPUP_OPENED_EVENT_TYPE="popupOpened";
AdfPopupOpenedEvent.prototype.Init= function(
x0
)
{
AdfPopupOpenedEvent.superclass.Init.call(this,x0,
AdfPopupOpenedEvent.POPUP_OPENED_EVENT_TYPE);
}
AdfPopupOpenedEvent.prototype.isCancelable= function()
{
 return false;
}

function AdfQueryEvent(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfQueryEvent,AdfComponentEvent);
AdfQueryEvent.EVENT_TYPE="query";
AdfQueryEvent.prototype.Init= function(x0)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfQueryEvent.superclass.Init.call(this,x0,AdfQueryEvent.EVENT_TYPE);
this.setPartial(true);
this.setRoot(x0);
}
AdfQueryEvent.prototype.setClearAll= function(x1)
{
this._clearAll=x1;
}
AdfQueryEvent.prototype.isClearAll= function()
{
 return this._clearAll;
}
AdfQueryEvent.prototype.AddMarshalledProperties= function(x2)
{
x2.clearAll=this._clearAll;
}
AdfQueryEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfQueryEvent.queue= function(x3,x4)
{
 new AdfQueryEvent(x3).queue(x4);
}
function AdfQueryOperationEvent(
x0,
x1,
x2)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfQueryOperationEvent,AdfComponentEvent);
AdfQueryOperationEvent.EVENT_TYPE="queryOperation";
AdfQueryOperationEvent.OPERATION_CREATE="CREATE";
AdfQueryOperationEvent.OPERATION_DELETE="DELETE";
AdfQueryOperationEvent.OPERATION_DUPLICATE="DUPLICATE";
AdfQueryOperationEvent.OPERATION_MODE_CHANGE="MODE_CHANGE";
AdfQueryOperationEvent.OPERATION_RESET="RESET";
AdfQueryOperationEvent.OPERATION_SELECT="SELECT";
AdfQueryOperationEvent.OPERATION_UPDATE="UPDATE";
AdfQueryOperationEvent.OPERATION_OVERRIDE="OVERRIDE";
AdfQueryOperationEvent.prototype.Init= function(x0,x1,x2)
{
AdfAssert.assertPrototype(x0,AdfUIComponent);
AdfQueryOperationEvent.superclass.Init.call(this,
x0,
AdfQueryOperationEvent.EVENT_TYPE);
this._operation=x1;
this._value=x2;
this.setPartial(true);
this.setRoot(x0);
}
AdfQueryOperationEvent.prototype.getOperation= function()
{
 return this._operation;
}
AdfQueryOperationEvent.prototype.getValue= function()
{
 return this._value;
}
AdfQueryOperationEvent.prototype.AddMarshalledProperties= function(
x3)
{
x3.operation=this._operation;
 if (this._value!=null&&this._value!="")
{
x3.value=this._value;
}
}
AdfQueryOperationEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfQueryOperationEvent.queue= function(x4,x5,x6,x7)
{
 new AdfQueryOperationEvent(x4,x5,x6).queue(x7);
}
function AdfReturnEvent(
x0
)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfReturnEvent,AdfComponentEvent);
AdfReturnEvent.RETURN_EVENT_TYPE="return";
AdfReturnEvent.prototype.Init= function(
x0
)
{
AdfReturnEvent.superclass.Init.call(this,x0,AdfReturnEvent.RETURN_EVENT_TYPE);
this.setPartial(true);
this.setRoot(x0);
}
AdfReturnEvent.prototype.propagatesToServer= function()
{
 return true;
}

function AdfReturnPopupEvent(
x0,
x1)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfReturnPopupEvent,AdfComponentEvent);
AdfReturnPopupEvent.RETURN_POPUP_TYPE="returnPopup";
AdfReturnPopupEvent.prototype.Init= function(
x0,
x1)
{
AdfReturnPopupEvent.superclass.Init.call(this,
x0,
AdfReturnPopupEvent.RETURN_POPUP_TYPE);
this._value=x1;
this.setRoot(x0);
this.setPartial(true);
}
AdfReturnPopupEvent.prototype.getValue= function()
{
 return this._value;
}
AdfReturnPopupEvent.prototype.toDebugString= function()
{
 var x2=AdfReturnPopupEvent.superclass.toDebugString.call(this);
 return x2.substring(0,x2.length - 1) +
 ", value=" + this._value + "]";
}
AdfReturnPopupEvent.prototype.AddMarshalledProperties= function(
x3)
{
x3.value=this._value;
}
AdfReturnPopupEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfReturnPopupEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
AdfReturnPopupEvent.queue= function(x4,x5,x6)
{
 new AdfReturnPopupEvent(x4,x5).queue(x6);
}

function AdfValueChangeEvent(
x0,
x1,
x2,
x3
)
{
this.Init(x0,x1,x2,x3);
}
AdfObject.createSubclass(AdfValueChangeEvent,AdfComponentEvent);
AdfValueChangeEvent.VALUE_CHANGE_TYPE="valueChange";
AdfValueChangeEvent.prototype.getOldValue= function()
{
 return this._oldValue;
}
AdfValueChangeEvent.prototype.getNewValue= function()
{
 return this._newValue;
}
AdfValueChangeEvent.prototype.isValidationNeeded= function()
{
 return this._autoSubmit==true;
}
AdfValueChangeEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}
AdfValueChangeEvent.prototype.toDebugString= function()
{
 var x0=AdfValueChangeEvent.superclass.toDebugString.call(this);
 return x0.substring(0,x0.length - 1) +
 ", oldValue=" + this._oldValue +
 ", newValue=" + this._newValue +
 "]";
}
AdfValueChangeEvent.prototype.Init= function(
x1,
x2,
x3,
x4)
{
AdfValueChangeEvent.superclass.Init.call(this,
x1,
AdfValueChangeEvent.VALUE_CHANGE_TYPE);
this._oldValue=x2;
this._newValue=x3;
this._autoSubmit=x4;
this.setRoot(x1);
}
AdfValueChangeEvent.prototype.propagatesToServer= function()
{
 return this._autoSubmit==true;
}
AdfValueChangeEvent.queue= function(x5,x6,x7,x8)
{
 new AdfValueChangeEvent(x5,x6,x7,x8).queue(true);
}
AdfValueChangeEvent.prototype.getShowMessages= function()
{
 return AdfPage.PAGE.isScreenReaderMode();
}
AdfValueChangeEvent.prototype.AddMarshalledProperties= function(
x9)
{
AdfValueChangeEvent.superclass.AddMarshalledProperties.call(this,x9);
 if (this._autoSubmit==true)
x9['autoSubmit']=true;
}
function AdfSortEvent(
x0,
x1,
x2
)
{
this.Init(x0,null,x1,x2);
}
AdfObject.createSubclass(AdfSortEvent,AdfComponentEvent);
AdfSortEvent.SORT_EVENT_TYPE="sort";
AdfSortEvent.prototype.Init= function(
x0,
x1,
x2,
x3
)
{
AdfSortEvent.superclass.Init.call(this,x0,AdfSortEvent.SORT_EVENT_TYPE);
this.setPartial(true);
 if(!(x2 instanceof Array))
{
this._properties=[x2];
this._orders=[x3];
}
 else
 {
this._properties=x2;
this._orders=x3;
}
this.setRoot(x0);
}
AdfSortEvent.prototype.getProperty= function(x4)
{
 var x5=this._properties,x6=null;
 if(!x4)
x6=x5[0];
 else if(x4>0&&x4<x5.length)
x6=x5[x4];
 return x6;
}
AdfSortEvent.prototype.setProperty= function(
x7,x8)
{
 if(!x8)
this._properties[0]=x7;
 else
 this._properties[x8]=x7;
}
AdfSortEvent.prototype.getCriteriaCount= function()
{
 return this._properties.length;
}
AdfSortEvent.prototype.getOrder= function(x9)
{
 var x10=this._orders,x11=null;
 if(!x9)
x11=x10[0];
 else if(x9>0&&x9<x10.length)
x11=x10[x9];
 return x11;
}
AdfSortEvent.prototype.setOrder= function(x12,x13)
{
 if(!x13)
this._orders[0]=x12;
 else
 this._orders[x13]=x12;
}
AdfSortEvent.prototype.AddMarshalledProperties= function(
x14)
{
x14.orders=this._orders;
x14.properties=this._properties;
}
AdfSortEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfSortEvent.prototype.isValidationNeeded= function()
{
 return true;
}
AdfSortEvent.prototype.isImmediate= function()
{
 return this.getSource().getImmediate();
}

function AdfDomUIInputEvent(
x0,
x1,
x2
)
{
 if (arguments.length)
{
this.Init(x0,x1,x2);
}
}
AdfObject.createSubclass(AdfDomUIInputEvent,AdfUIInputEvent);
AdfDomUIInputEvent.prototype.getDoesBubbles= function()
{
 return (this.getType()!=AdfUIInputEvent.MOUSE_MOVE_EVENT_TYPE);
}
AdfDomUIInputEvent.prototype.getOffsetX= function()
{
 return this.Event.clientX;
}
AdfDomUIInputEvent.prototype.getOffsetY= function()
{
 return this.Event.clientY;
}
AdfDomUIInputEvent.prototype.getClientX= function()
{
 return this.Event.clientX;
}
AdfDomUIInputEvent.prototype.getClientY= function()
{
 return this.Event.clientY;
}
AdfDomUIInputEvent.prototype.getPageX= function()
{
 return this.Event.clientX;
}
AdfDomUIInputEvent.prototype.getPageY= function()
{
 return this.Event.clientY;
}
AdfDomUIInputEvent.prototype.getScreenX= function()
{
 return this.Event.screenX;
}
AdfDomUIInputEvent.prototype.getScreenY= function()
{
 return this.Event.screenY;
}
AdfDomUIInputEvent.prototype.getButtons= function()
{
 var x0=this.Event.button;
switch(x0)
{
 case 0: return AdfUIInputEvent.LEFT_BUTTON_FLAG;
 case 1: return AdfUIInputEvent.MIDDLE_BUTTON_FLAG;
 case 2: return AdfUIInputEvent.RIGHT_BUTTON_FLAG;
default: return 0;
}
}
AdfDomUIInputEvent.prototype.getKeyCode= function()
{
 return this.Event.keyCode;
}
AdfDomUIInputEvent.prototype.getKeyModifiers= function()
{
 var x1=this.Event;
 var x2=(x1.shiftKey*AdfKeyStroke.SHIFT_MASK)|
(x1.ctrlKey*AdfKeyStroke.CTRL_MASK)|
(x1.altKey*AdfKeyStroke.ALT_MASK);
 if (x1.metaKey)
x2|=AdfKeyStroke.META_MASK;
 return x2;
}
AdfDomUIInputEvent.prototype.getNativeEvent= function()
{
 return this.Event;
}
AdfDomUIInputEvent.prototype.getNativeEventTarget= function()
{
 var x3=this.Event;
 if (x3)
{
 return AdfAgent.AGENT.getEventTarget(x3);
}
 else
 {
 return null;
}
}
AdfDomUIInputEvent.prototype.clone= function()
{
 var x4=AdfAgent.AGENT.cloneEvent(this.Event);
 return new this.constructor(this.getSource(),this.getType(),x4);
}
AdfDomUIInputEvent.prototype.cancel= function()
{
AdfDomUIInputEvent.superclass.cancel.call(this);
AdfAgent.AGENT.preventDefault(this.Event);
}
AdfDomUIInputEvent.prototype.toDebugString= function()
{
 var x5=AdfDomUIInputEvent.superclass.toDebugString.call(this);
 return x5.substring(0,x5.length - 1) +
 ", nativeEvent=" +
 this.getNativeEvent() +
 ", native target=" + this.getNativeEventTarget() +
 "]";
}
AdfDomUIInputEvent.prototype.Init= function(
x6,
x7,
x8)
{
AdfAssert.assert(x8,"Native event must be specified");
AdfDomUIInputEvent.superclass.Init.call(this,x6,x7);
this.Event=x8;
}
AdfDomUIInputEvent.prototype.GetSourceDomElement= function()
{
 return AdfRichUIPeer.getDomElementForComponent(this.getSource());
}

function AdfItemEvent(x0,x1)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfItemEvent,AdfComponentEvent);
AdfItemEvent.ITEM_EVENT_TYPE="item";
AdfItemEvent.ITEM_ACTION_REMOVE="remove";
AdfItemEvent.prototype.Init= function(x0,x1)
{
AdfItemEvent.superclass.Init.call(this,x0,AdfItemEvent.ITEM_EVENT_TYPE);
AdfAssert.assert(x1,"itemAction must be specified");
this._itemAction=x1;
}
AdfItemEvent.prototype.getItemAction= function()
{
 return this._itemAction;
}
AdfItemEvent.prototype.AddMarshalledProperties= function(x2)
{
x2.itemAction=this._itemAction;
}
AdfItemEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfItemEvent.prototype.isCancelable= function()
{
 return true;
}
AdfItemEvent.queueItemRemoveEvent= function(x3)
{
 var x4= new AdfItemEvent(x3,AdfItemEvent.ITEM_ACTION_REMOVE);
x4.queue(true);
}

function AdfSafariUIInputEvent(
x0,
x1,
x2)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfSafariUIInputEvent,AdfDomUIInputEvent);
AdfSafariUIInputEvent.prototype.clone= function()
{
 var x0=AdfSafariUIInputEvent.superclass.clone.call(this);
 var x1=x0.Event;
 if(x1&& !x1.target&&this.Event.target)
x0._target=this.Event.target;
 return x0;
}
AdfSafariUIInputEvent.prototype.getNativeEventTarget= function()
{
 return AdfSafariUIInputEvent.superclass.getNativeEventTarget.call(this)||this._target;
}
AdfSafariUIInputEvent.prototype.getOffsetX= function()
{
 var x2=this.getNativeEventTarget();
 return this.Event.clientX - AdfAgent.AGENT.getElementLeft(x2);
}
AdfSafariUIInputEvent.prototype.getOffsetY= function()
{
 var x3=this.getNativeEventTarget();
 return this.Event.clientY - AdfAgent.AGENT.getElementTop(x3);
}
function AdfDragSource(x0,x1)
{
 if (arguments.length)
{
this.Init(x0,x1);
}
}
AdfObject.createSubclass(AdfDragSource);
AdfDragSource.prototype.Init= function(x0,x1)
{
AdfDragSource.superclass.Init.call(this);
 if (x0==undefined)
{
x0=x1;
 if (x0==undefined)
x0=AdfDnDContext.ACTION_COPY;
}
AdfAssert.assertNumeric(x0);
AdfAssert.assert(x0!=AdfDnDContext.ACTION_NONE,
"allowed actions must be specified");
AdfAssert.assert((x0& ~AdfDnDContext.ACTIONS_ALL)==0,
"invalid allowedActions:" + x0);
 if (x1==undefined)
{
x1=(x0&AdfDnDContext.ACTION_COPY)
?AdfDnDContext.ACTION_COPY
:(x0&AdfDnDContext.ACTION_MOVE)
?AdfDnDContext.ACTION_MOVE
:AdfDnDContext.ACTION_LINK;
}
AdfAssert.assert((x0&x1)!=0,"Default action not an allowed action");
this._allowedActions=x0;
this._defaultAction=x1;
this._dragRecognizer=this.CreateDragRecognizer();
this._component=null;
}
AdfDragSource.prototype.initiateDrag= function(x2,x3)
{
AdfAssert.assertPrototype(x2,AdfDnDContext);
AdfAssert.assertPrototype(x3,AdfUIInputEvent);
 var x4=this.GetDragTransferable(x3);
 if (x4)
{
AdfAssert.assertPrototype(x4,AdfTransferable);
 var x5=this.GetDragOffset(x3);
x2.startDrag(x3,
x4,
this.getAllowedActions(),
this.getDefaultAction(),
this.GetDragOverFeedback(x3),
x5.x,
x5.y,
this.GetDefaultDragCursor());
this._component.getPeer().initiateDrag(x2,x3);
}
}
AdfDragSource.prototype.getDragRecognizer= function()
{
 if (!this._dragRecognizer)
{
 var x6=this._component;
AdfAssert.assert(x6!=null,"Unexpected null component for drag recognizer.");
 var x7=x6.getPeer();
AdfAssert.assert(x7!=null,"Unexpected null peer for drag recognizer.");
this._dragRecognizer=x7.getDefaultDragRecognizer(x6);
}
 return this._dragRecognizer;
}
AdfDragSource.prototype.getComponent= function()
{
 return this._component;
}
AdfDragSource.prototype.isAvailable= function(x8)
{
 return (this.GetDragTransferable(x8)!=null);
}
AdfDragSource.prototype.dragDropEnd= function(x9,x10)
{
AdfLogger.LOGGER.finer("dragDropEnd:",this," action:",x10);
}
AdfDragSource.prototype.dragEnter= function(x11)
{
AdfLogger.LOGGER.finer("dragEnter:",this);
}
AdfDragSource.prototype.dragExit= function(x12)
{
AdfLogger.LOGGER.finer("dragExit:",this);
}
AdfDragSource.prototype.dragOver= function(x13)
{
AdfLogger.LOGGER.finest("dragOver:",this);
}
AdfDragSource.prototype.dropActionChanged= function(x14)
{
AdfLogger.LOGGER.finer("dropActionChanged:",this);
}
AdfDragSource.prototype.toDebugString= function()
{
 return AdfDragSource.superclass.toDebugString.call(this) + "[" +
 "sourceComponent:" + this._component + "]";
}
AdfDragSource.prototype.GetDragTransferable= function(x15)
{
 var x16=this._component;
 return x16.getPeer().getDragTransferable(x16,x15);
}
AdfDragSource.prototype.GetDefaultDragCursor= function()
{
 return "auto";
}
AdfDragSource.prototype.getAllowedActions= function()
{
 return this._allowedActions;
}
AdfDragSource.prototype.getDefaultAction= function()
{
 return this._defaultAction;
}
AdfDragSource.prototype.GetDragOverFeedback= function(x17)
{
 var x18=this._component;
 return x18.getPeer().getDragOverFeedback(x18,x17);
}
AdfDragSource.prototype.CreateDragRecognizer= function()
{
 return null;
}
AdfDragSource.prototype.GetDragOffset= function(x19)
{
 return {x:x19.getOffsetX(),y:x19.getOffsetY()};
}
AdfDragSource.prototype.__setComponent= function(x20)
{
this._component=x20;
}

function AdfDropTarget()
{
this.Init();
}
AdfObject.createSubclass(AdfDropTarget);
AdfDropTarget.prototype.Init= function()
{
AdfDropTarget.superclass.Init.call(this);
this._component=null;
}
AdfDropTarget.prototype.getComponent= function()
{
 return this._component;
}
AdfDropTarget.prototype.toDebugString= function()
{
 return AdfDropTarget.superclass.toDebugString.call(this) +
 "[source component:" + this._component + "]";
}
AdfDropTarget.prototype.acceptDragEnter= function(
x0,x1,x2,x3)
{
AdfLogger.LOGGER.finer("dragEnter:",this);
 var x4=this._acceptDrag(x0,x1,x2,x3);
 if (x4!=AdfDnDContext.ACTION_NONE)
{
this.AcceptedDragEnter(x0,x4,x2,x3);
}
 return x4;
}
AdfDropTarget.prototype.dragExit= function(x5)
{
AdfLogger.LOGGER.finer("dragExit:",this);
}
AdfDropTarget.prototype.acceptDragOver= function(
x6,x7,x8,x9)
{
AdfLogger.LOGGER.finest("dragOver:",this);
 return this._acceptDrag(x6,x7,x8,x9);
}
AdfDropTarget.prototype.drop= function(x10,x11,x12,x13)
{
AdfAssert.assert(x11!=AdfDnDContext.ACTION_NONE);
AdfLogger.LOGGER.finer("drop:",this);
 var x14=this._component;
 var x15=x14.getPeer().getPagePosition(x14);
 var x16=x12 - x15.x;
 var x17=x13 - x15.y;
 var x18= new AdfDropEvent(x14,
x10.getDragSource(),
x10.getTransferable(),
x11,
x16,
x17);
x18.queue();
 return AdfDnDContext.ACTION_NONE;
}
AdfDropTarget.prototype.acceptDropActionChanged= function(
x19,x20,x21,x22)
{
AdfLogger.LOGGER.finest("dropActionChanged:",this," proposed:",x20);
 return this._acceptDrag(x19,x20,x21,x22);
}
AdfDropTarget.prototype.AcceptDrag= function(
x23,x24,x25,x26,x27)
{
 var x28=x23.getDropTargetProperty("DropTarget:flavorAcceptance");
 if (x28==null)
{
x28=this.CalculateFlavorAcceptance(x23);
x23.setDropTargetProperty("DropTarget:flavorAcceptance",x28);
}
AdfAssert.assertBoolean(x28);
 if (!x28)
 return AdfDnDContext.ACTION_NONE;
 else
 {
 if (x25&x24)
{
 return x25;
}
 else
 {
 if (x24&AdfDnDContext.ACTION_MOVE)
 return AdfDnDContext.ACTION_MOVE;
 else if (x24&AdfDnDContext.ACTION_COPY)
 return AdfDnDContext.ACTION_COPY;
 else if (x24&AdfDnDContext.ACTION_LINK)
 return AdfDnDContext.ACTION_LINK;
 else
 return AdfDnDContext.ACTION_NONE;
}
}
}
AdfDropTarget.prototype.CalculateFlavorAcceptance= function(x29)
{
 var x30=this.GetAllowedFlavors(x29);
AdfAssert.assertArrayOrNull(x30);
 var x31=(x30)
?x30.length
:0;
 var x32=x29.getTransferable();
for(var x33=0;x33<x31;x33++)
{
 var x34=x30[x33];
 if (x32.isDataFlavorSupported(x34))
{
 return true;
}
}
 return false;
}
AdfDropTarget.prototype.AcceptedDragEnter= function(
x35,x36,x37,x38)
{
}
AdfDropTarget.prototype.GetAllowedActions= function(x39)
{
 return AdfDnDContext.ACTIONS_ALL;
}
AdfDropTarget.prototype.GetAllowedFlavors= function(x40)
{
 return null;
}
AdfDropTarget.prototype.__setComponent= function(x41)
{
this._component=x41;
}
AdfDropTarget.prototype._acceptDrag= function(
x42,x43,x44,x45)
{
AdfAssert.assertNumber(x44);
AdfAssert.assertNumber(x45);
 var x46=this.GetAllowedActions()&x42.getSourceActions();
 if (x46)
{
 return this.AcceptDrag(x42,x46,x43,x44,x45);
}
 else
 {
 return AdfDnDContext.ACTION_NONE;
}
}

function AdfDragRecognizer()
{
 if (this!=window)
this.Init();
}
AdfObject.createSubclass(AdfDragRecognizer);
AdfDragRecognizer.prototype.prepDrag= function(x0,x1,x2)
{
AdfAssert.assertPrototype(x1,AdfDragSource);
AdfAssert.assertPrototype(x2,AdfUIInputEvent);
 if (x2.getType()!=AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE)
 return null;
 if (!x1.isAvailable(x0,x2))
 return null;
AdfLogger.LOGGER.finer("prep drag[ source:",x1," event:",x2,"]");
 var x3= new Object();
x3.triggerEvent=x2.clone();
x3.startPageX=x2.getPageX();
x3.startPageY=x2.getPageY();
 return x3;
}
AdfDragRecognizer.prototype.abortPrep= function(x4,x5)
{
AdfAssert.assertPrototype(x5,AdfUIInputEvent);
 return x5.getType()==AdfUIInputEvent.MOUSE_UP_EVENT_TYPE;
}
AdfDragRecognizer.prototype.recognizeDrag= function(x6,x7)
{
 if (x7.getType()==AdfUIInputEvent.MOUSE_MOVE_EVENT_TYPE)
{
 var x8=x7.getPageX();
 var x9=x7.getPageY();
AdfLogger.LOGGER.finer("recognizeDrag curr:",
x8,",",x9," ",
x6.startPageX,",",x6.startPageY);
 if ((Math.abs(x6.startPageX - x8)>3)||
(Math.abs(x6.startPageY - x9)>3))
{
AdfLogger.LOGGER.fine("Drag recognized for:",x7);
 return x6.triggerEvent;
}
}
 return null;
}

function AdfUIPeer()
{
}
AdfObject.createSubclass(AdfUIPeer);
AdfUIPeer.createPeerClass= function(
x0,
x1)
{
 var x2= new Function("c","if(arguments.length)this.Init(c);");
AdfObject.createSubclass(x2,x0,x1);
 if (x1)
{
window[x1]=x2;
}
 return x2;
}
AdfUIPeer.InitClass= function()
{
this._DRAG_RECOGNIZER= new AdfDragRecognizer();
}
AdfUIPeer.prototype.initialize= function(x3)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.componentRemoved= function(x4)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getComponentParent= function(x5)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getDescendantComponents= function(x6,x7)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getComponentProperty= function(x8,x9)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getInlineStyleProperty= function(
x10,
x11)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.setInlineStyleProperty= function(
x12,
x13,
x14)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getComponent= function()
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getReadyState= function(x15)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getParentPeer= function()
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getAbsoluteId= function(x16,x17)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getAbsoluteLocator= function(x18,x19)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.convertLocatorToClientId= function(x20,x21)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.isVisible= function()
{
 return this.getComponent().getPropertyValue(AdfUIComponent.VISIBLE);
}
AdfUIPeer.prototype.needsResizeNotify= function(x22)
{
 return false;
}
AdfUIPeer.prototype.resizeNotify= function(
x23,
x24,
x25,
x26,
x27)
{
}
AdfUIPeer.prototype.messageNotify= function(x28,x29,x30)
{
}
AdfUIPeer.prototype.messageShow= function(x31,x32,x33)
{
}
AdfUIPeer.prototype.focus= function(x34)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.initiateDrag= function(x35,x36)
{
AdfAssert.assertPrototype(x35,AdfDnDContext);
AdfAssert.assertPrototype(x36,AdfUIInputEvent);
}
AdfUIPeer.prototype.processPushData= function(x37,x38,x39)
{
AdfAssert.assertPrototype(x37,AdfUIComponent);
AdfAssert.assert(x38!==undefined);
AdfAssert.assertBoolean(x39);
 return false;
}
AdfUIPeer.prototype.Init= function(x40)
{
AdfAssert.assertPrototypeOrNull(x40,AdfUIComponent);
AdfUIPeer.superclass.Init.call(this);
}
AdfUIPeer.prototype.ComponentPropertyChanged= function(
x41
)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.DispatchComponentEvent= function(x42)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.visitChildren= function(
x43,
x44,
x45,
x46)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getPagePosition= function(x47)
{
AdfAssert.failedInAbstractFunction();
}
AdfUIPeer.prototype.getDefaultDragRecognizer= function(x48)
{
 return AdfUIPeer._DRAG_RECOGNIZER;
}
AdfUIPeer.prototype.getDragOverFeedback= function(x49,x50)
{
AdfAssert.failedInAbstractFunction();
 return null;
}
AdfUIPeer.prototype.getDragTransferable= function(x51,x52)
{
AdfAssert.failedInAbstractFunction();
 return null;
}

function AdfFacesMessage(x0,x1,x2)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfFacesMessage);
AdfFacesMessage.TYPE_INFO=1;
AdfFacesMessage.TYPE_CONFIRMATION=2;
AdfFacesMessage.TYPE_WARNING=3;
AdfFacesMessage.TYPE_ERROR=4;
AdfFacesMessage.TYPE_FATAL=5;
AdfFacesMessage.getType= function(x0)
{
switch(x0)
{
 case TrFacesMessage.SEVERITY_WARNING:
 return AdfFacesMessage.TYPE_WARNING;
 case TrFacesMessage.SEVERITY_ERROR:
 return AdfFacesMessage.TYPE_ERROR;
 case TrFacesMessage.SEVERITY_FATAL:
 return AdfFacesMessage.TYPE_FATAL;
 case TrFacesMessage.SEVERITY_INFO:
default:
 return AdfFacesMessage.TYPE_INFO;
}
}
AdfFacesMessage.getSeverity= function(x1)
{
switch(x1)
{
 case AdfFacesMessage.TYPE_WARNING:
 return TrFacesMessage.SEVERITY_WARNING;
 case AdfFacesMessage.TYPE_ERROR:
 return TrFacesMessage.SEVERITY_ERROR;
 case AdfFacesMessage.TYPE_FATAL:
 return TrFacesMessage.SEVERITY_FATAL;
 case AdfFacesMessage.TYPE_INFO:
 case AdfFacesMessage.TYPE_CONFIRMATION:
default:
 return TrFacesMessage.SEVERITY_INFO;
}
}
AdfFacesMessage.getTypeFromMessage= function(x2)
{
 if(x2["getMessageType"]!=null)
{
 return x2.getMessageType();
}
 else
 {
 return AdfFacesMessage.getType(x2.getSeverity());
}
}
AdfFacesMessage.prototype.getDetail= function()
{
 var x3=this._detail;
 if (!x3||AdfUIUtils.trim(x3).length<1)
{
 return this._summary;
}
 else
 {
 return x3;
}
}
AdfFacesMessage.prototype.getSummary= function()
{
 return this._summary;
}
AdfFacesMessage.prototype.getMessageType= function()
{
 return this._messageType
}
AdfFacesMessage.prototype.getSeverity= function()
{
 return AdfFacesMessage.getSeverity(this._messageType);
}
AdfFacesMessage.prototype.setDetail= function(x4)
{
this._detail=x4;
}
AdfFacesMessage.prototype.setSummary= function(x5)
{
this._summary=x5;
}
AdfFacesMessage.prototype.setMessageType= function(x6)
{
this._type=x6;
}
AdfFacesMessage.prototype.setSeverity= function(x7)
{
this._messageType=AdfFacesMessage.getType(x7);
}
AdfFacesMessage.prototype.Init= function(x8,x9,x10)
{
AdfFacesMessage.superclass.Init.call(this,x8,x9,x10);
this._messageType=x8;
this._summary=x9;
this._detail=x10;
}
var AdfFocusUtils= new Object();
AdfFocusUtils.containsFocus= function(x0)
{
 var x1=AdfPage.PAGE.getActiveDomElement();
while(x1!=null)
{
 if (x1==x0)
 return true;
x1=x1.parentNode;
}
 return false;
}
AdfFocusUtils.focusElement= function(x2)
{
AdfAssert.assertDomElement(x2);
AdfPopupScopingUtils.scope(x2);
 if (AdfPage.PAGE.isScreenReaderMode())
AdfFocusUtils.focusElementDelayed(x2,1);
 else
 AdfFocusUtils._focusElementImpl(x2);
}
AdfFocusUtils.isFocusChangePending= function()
{
 return (AdfFocusUtils._delayFocusTimerId!=null)
}
AdfFocusUtils.focusFirstDocumentTabStop= function()
{
 var x3=AdfPage.PAGE.getDocument().body;
 var x4=AdfFocusUtils.getFirstTabStop(x3,true);
 if (x4!=null&&x4.offsetTop<0)
{
x4=AdfFocusUtils.getNextTabStop(x4);
}
 if (x4!=null)
{
AdfFocusUtils.focusElement(x4);
}
 return x4;
}
AdfFocusUtils.focusFirstTabStop= function(x5)
{
AdfAssert.assertDomElement(x5);
 var x6=AdfFocusUtils.getFirstTabStop(x5);
 if (x6!=null)
AdfFocusUtils.focusElement(x6);
 return x6;
}
AdfFocusUtils.focusLastTabStop= function(x7)
{
AdfAssert.assertDomElement(x7);
 var x8=AdfFocusUtils.getLastTabStop(x7);
 if (x8!=null)
AdfFocusUtils.focusElement(x8);
 return x8;
}
AdfFocusUtils.focusNextTabStop= function(x9,x10,x11)
{
 var x12=AdfFocusUtils.getNextTabStop(x9,x10,x11);
 if (!x12)
{
 if (!x10)
x10=x9.ownerDocument;
x12=AdfFocusUtils.getFirstTabStop(x10);
}
 if (x12)
AdfFocusUtils.focusElement(x12);
 return x12;
}
AdfFocusUtils.focusPreviousTabStop= function(x13,x14,x15)
{
 var x16=AdfFocusUtils.getPreviousTabStop(x13,x14,x15);
 if (!x16)
{
 if (!x14)
x14=x13.ownerDocument;
x16=AdfFocusUtils.getLastTabStop(x14);
}
 if (x16)
AdfFocusUtils.focusElement(x16);
 return x16;
}
AdfFocusUtils.getFirstTabStop= function(x17,x18)
{
 return AdfDomUtils.getFirstElementMatch(x17,
x18,
AdfFocusUtils.isTabStop);
}
AdfFocusUtils.getLastTabStop= function(x19,x20)
{
 return AdfDomUtils.getLastElementMatch(x19,
x20,
AdfFocusUtils.isTabStop);
}
AdfFocusUtils.getNextTabStop= function(x21,x22,x23)
{
 return AdfDomUtils.getNextElementMatch(x21,
x22,
x23,
AdfFocusUtils.isTabStop);
}
AdfFocusUtils.getPreviousTabStop= function(x24,x25)
{
 return AdfDomUtils.getPreviousElementMatch(x24,
x25,
AdfFocusUtils.isTabStop);
}
AdfFocusUtils.isTabStop= function(x26)
{
 return ((x26!=null)&&(x26.tabIndex> -1)&&AdfFocusUtils.isFocusable(x26));
}
AdfFocusUtils.isFocusable= function(x27,x28)
{
 if ((x27==null)||(x27.nodeType!=1))
 return false;
 if (x27.disabled)
 return false;
 var x29=AdfDomUtils.getTabIndex(x27);
 if (x29< -1)
 return false;
 var x30=true;
switch(x27.nodeName.toLowerCase())
{
 case "a":
 if ( !x27.href&&x29==undefined)
x30=false;
break;
 case "input":
 if (x27.type=="hidden"&&x27.isContentEditable!=true)
x30=false;
break;
 case "area":
 case "body":
 case "button":
 case "frame":
 case "iframe":
 case "isindex":
 case "object":
 case "select":
 case "textarea":
x30=true;
break;
default:
 if (x29>= -1)
x30=true;
 else
 x30=false;
}
 if (!x30)
 return false;
AdfFocusUtils._setupContext(x28);
 return AdfFocusUtils.isConnectedAndVisible(x27,x28);
}
AdfFocusUtils._setupContext= function(x31)
{
 if (!x31)
 return;
 if (!x31.positiveValue)
{
 var x32=(new Date()).getTime();
x31.positiveValue="y"+x32;
x31.negativeValue="n"+x32;
}
}
AdfFocusUtils.calculateCachedValue= function(x33,x34,x35)
{
 if (!x34|| !x33|| !x35)
 return undefined;
 var x36=AdfAgent.AGENT;
 var x37=x36.getAttribute(x33,x35);
 if (x37==x34.positiveValue)
{
 return true;
}
 else if (x37==x34.negativeValue)
{
 return false;
}
 return undefined;
}
AdfFocusUtils.setCacheValue= function(x38,x39,x40,x41)
{
 if (!x39|| !x38|| !x40||x41==undefined)
 return;
 var x42=AdfAgent.AGENT;
 var x43=x41?x39.positiveValue:x39.negativeValue;
x42.setAttribute(x38,x40,x43);
}
AdfFocusUtils.isConnectedAndVisible= function(x44,x45)
{
AdfAssert.assertDomElement(x44);
 var x46=AdfAgent.AGENT;
 var x47=x46.getDomDocument().documentElement;
 var x48=AdfFocusUtils.calculateCachedValue(x44,x45,"_afrFoc");
 if (x48!=undefined)
 return x48;
 if (!AdfFocusUtils._isVisible(x44))
{
AdfFocusUtils.setCacheValue(x44,x45,"_afrFoc",false);
 return false;
}
 if (x44==x47)
{
AdfFocusUtils.setCacheValue(x44,x45,"_afrFoc",true);
 return true;
}
 else
 {
 var x49;
 if (x44.parentNode==null||x44.parentNode.nodeType!=1)
x49=false;
 else
 x49=AdfFocusUtils.isConnectedAndVisible(x44.parentNode,x45);
AdfFocusUtils.setCacheValue(x44,x45,"_afrFoc",x49);
 return x49;
}
}
AdfFocusUtils._isVisible= function(x50)
{
 var x51=AdfAgent.AGENT;
 var x52=x51.getComputedStyle(x50);
 if (x52.display=="none")
{
 if ((x50.style.display=="none")||
 !AdfPopupScopingUtils.isScopingContainer(x50)||
 !AdfPopupScopingUtils.isOutOfScope(x50))
 return false;
}
 if (x52.visibility=="hidden")
{
 return false;
}
 return true;
}
AdfFocusUtils.focusElementDelayed= function(x53,x54)
{
AdfAssert.assertDomElement(x53);
AdfAssert.assertNumber(x54);
 var x55=AdfPage.PAGE;
 var x56=AdfFocusUtils._delayFocusTimerId;
 if (x56)
x55.cancelTimer(x56);
AdfFocusUtils._delayFocusTimerId=x55.scheduleTimer(null,
AdfFocusUtils._focusElementDelayedCallback,
x53,
x54);
}
AdfFocusUtils._focusElementDelayedCallback= function(x57)
{
AdfFocusUtils._delayFocusTimerId=null;
AdfFocusUtils._focusElementImpl(x57);
}
AdfFocusUtils._focusElementImpl= function(x58)
{
try
{
 if(x58.setActive)
x58.setActive();
x58.focus();
}
catch(e)
{
}
}

var AdfDomUtils= new Object();
AdfDomUtils.isVisible= function(x0)
{
 if (x0==null)
 return false;
 return (x0.style.display!="none");
}
AdfDomUtils.isInVisibleSubtree= function(x1)
{
 if (x1==null)
 return false;
while(x1!=null)
{
 if (x1.style&&x1.style.display=="none")
 return false;
x1=x1.parentNode;
}
 return true;
}
AdfDomUtils.stripScripts= function(x2)
{
 var x3=x2.childNodes;
 if (x3!=null)
{
 var x4=null;
for(var x5=(x3.length - 1);x5> -1;x5--)
{
x4=x3[x5];
 if (x4.nodeType==1&&x4.tagName=="SCRIPT")x2.removeChild(x4);
}
}
}
AdfDomUtils.setVisible= function(x6,x7)
{
AdfAssert.assert(x6!=null);
x6.style.display=(x7?"":"none");
}
AdfDomUtils.isNodeInDocumentHierarchy= function(x8,x9)
{
AdfAssert.assertDomNode(x8);
AdfAssert.assertDomNode(x9);
 if (x9==x8)
 return true;
 if (x8==x9.ownerDocument)
{
while(x9!=null)
{
x9=x9.parentNode;
 if (x9==x8)
 return true;
}
}
 return false;
}
AdfDomUtils.isAncestor= function(x10,x11)
{
 var x12=x11.parentNode;
while(x12)
{
 if (x12==x10)
 return true;
x12=x12.parentNode;
}
 return false;
}
AdfDomUtils.isAncestorOrSelf= function(x13,x14)
{
 return (x14==x13)?
true:
AdfDomUtils.isAncestor(x13,x14);
}
AdfDomUtils.getNodeDistance= function(x15,x16)
{
 if (x15==x16)
{
 return 0;
}
 var x17=0;
 var x18;
 if (AdfDomUtils.isAncestor(x15,x16))
{
x18=x16.parentNode;
while(x18)
{
x17++;
 if (x18==x15)
 return x17;
x18=x18.parentNode;
}
}
 else if (AdfDomUtils.isAncestor(x16,x15))
{
x18=x15.parentNode;
while(x18)
{
x17++;
 if (x18==x16)
 return x17;
x18=x18.parentNode;
}
}
 var x19=AdfDomUtils.getCommonAncestor(x15,x16);
 if (x19)
{
 return AdfDomUtils.getNodeDistance(x19,x15) +
 AdfDomUtils.getNodeDistance(x19,x16);
}
 return Number.POSITIVE_INFINITY;
}
AdfDomUtils.getCommonAncestor= function(x20,x21)
{
 if (x20==x21)
{
 return x20;
}
 var x22=x20;
while(x22)
{
 if (AdfDomUtils.isAncestor(x22,x21))
 return x22;
x22=x22.parentNode;
}
 return null;
}
AdfDomUtils.getFormElement= function(x23)
{
AdfAssert.assertDomNode(x23);
 var x24=x23.ownerDocument;
 var x25=AdfAgent.AGENT;
while(x23!=x24)
{
 if (x25.getNodeName(x23)=="FORM")
{
 return x23;
}
x23=x23.parentNode;
AdfAssert.assert(x23,"Should never get this far with disconnected DOM");
}
 return null;
}
AdfDomUtils.getMultiPartForm= function(x26)
{
 var x27=x26.getElementsByTagName("input"),
x28=x27.length,x29=null;
for(var x30=0;x30<x28; ++x30)
{
 var x31=x27[x30];
 if (x31.type=="file"&&x31.value)
{
x29=x26;
break;
}
}
 return x29;
}
AdfDomUtils.getFormElementValue= function(x32,x33)
{
 var x34=[];
 var x35=x32.elements;
for(var x36=0,x37=x35.length;x36<x37; ++x36)
{
 if (x35[x36].getAttribute('name')==x33)
{
x34.push(x35[x36]);
}
}
 if (x34.length==0)
{
 return null;
}
 var x38=x34[0];
switch(x38.tagName)
{
 case 'TEXTAREA':
 return x38.value;
 case 'INPUT':
 var x39=x38.getAttribute('type');
switch(x39)
{
 case 'radio':
for(x36=0,x37=x34.length;x36<x37; ++x36)
{
 if (x34[x36].checked)
{
 return x34[x36].value;
}
}
 return null;
 case 'checkbox':
 if (x34.length==1)
{
 return x38.checked?x38.value:null;
}
value=[];
for(x36=0,x37=x34.length;x36<x37; ++x36)
{
 if (x34[x36].checked)
{
value.push(x34[x36].value);
}
}
 return value;
 case 'text':
default:
 return x38.value;
}
 case 'SELECT':
 if (x38.multiple==true)
{
 var x40=[];
 var x41=x38.options;
for(x36=0,x37=x41.length;x36<x37; ++x36)
{
 if (x41[x36].selected)
{
x40.push(x41[x36].value);
}
}
 return x40.length==0?null:x40;
}
 return x38.value;
default:
 return null;
}
}
AdfDomUtils.getFirstElementByTagName= function(x42,x43)
{
 if (x42==null)
 return null;
 var x44=x42.getElementsByTagName(x43);
 return x44.length?x44[0]:null;
}
AdfDomUtils.getFirstDescendentElement= function(x45,x46)
{
 return AdfDomUtils.getDescendentElement(x45,x46,0);
}
AdfDomUtils.getDescendentElement= function(x47,x48,x49)
{
AdfAssert.assertDomElement(x47);
AdfAssert.assertString(x48);
AdfAssert.assertNumber(x49);
 var x50=x47.getElementsByTagName(x48);
AdfAssert.assert(x50);
 var x51=x50.length;
 if (x51>x49)
{
 var x52=x50[0];
 if ((x52==x47)&&(x51>x49 + 1))
{
x49++;
}
 return x50[x49];
}
 return null;
}
AdfDomUtils.getFirstChildElement= function(x53)
{
 return AdfDomUtils.getFirstChildNodeByType(x53,1);
}
AdfDomUtils.getChildElements= function(x54)
{
 var x55=x54.childNodes;
 var x56=[];
 if (x55)
{
 var x57=x55.length;
for(var x58=0;x58<x57;x58++)
{
 var x59=x55[x58];
 if (x59.nodeType==1)
x56.push(x59);
}
}
 return x56;
}
AdfDomUtils.getLastChildElement= function(x60)
{
 var x61=x60.childNodes;
 if (x61)
{
 var x62=x61.length;
for(var x63=x62-1;x63>=0;x63--)
{
 var x64=x61[x63];
 if (x64.nodeType==1)
 return x64;
}
}
 return null;
}
AdfDomUtils.getNonWhitespaceChildCount= function(x65)
{
 var x66=0;
 var x67=x65.childNodes;
 if (x67)
{
 var x68=x67.length;
for(var x69=0;x69<x68;x69++)
{
 var x70=x67[x69];
 var x71=x70.nodeType;
 if (x71==8)
continue;
 if (x71==3)
{
 var x72=x70.data.replace(/\s*/,"");
 if (x72.length==0)
{
continue;
}
 ++x66;
}
 else if (x71==1)
{
 if ((x70.style==null)||(x70.style.display!="none"))
{
 ++x66;
}
}
}
}
 return x66;
}
AdfDomUtils.getOnlyChildElement= function(x73)
{
 var x74=null;
 var x75=x73.childNodes;
 if (x75)
{
 var x76=x75.length;
for(var x77=0;x77<x76;x77++)
{
childNode=x75[x77];
 var x78=childNode.nodeType;
 if (x78==8)
continue;
 if (x78==3)
{
 var x79=childNode.data.replace(/\s*/,"");
 if (x79.length>0)
{
 return null;
}
}
 else if (x78==1)
{
 if ((childNode.style==null)||(childNode.style.display!="none"))
{
 if (x74)
{
 return null;
}
x74=childNode;
}
}
 else
 {
 return null;
}
}
}
 return x74;
}
AdfDomUtils.getNextElement= function(x80)
{
 if (x80)
{
 var x81=x80.nextSibling;
while(x81)
{
 if (x81.nodeType==1)
 return x81;
x81=x81.nextSibling;
}
}
}
AdfDomUtils.getPreviousElement= function(x82)
{
 if (x82)
{
 var x83=x82.previousSibling;
while(x83)
{
 if (x83.nodeType==1)
 return x83;
x83=x83.previousSibling;
}
}
}
AdfDomUtils.getFirstChildNodeByType= function(x84,x85)
{
 var x86=x84.childNodes;
 if (x86)
{
 var x87=x86.length;
for(var x88=0;x88<x87;x88++)
{
 var x89=x86[x88];
 if (x89.nodeType==x85)
 return x89;
}
}
 return null;
}
AdfDomUtils.getElementPosition= function(x90)
{
 var x91= -1;
 if (x90)
{
 var x92=x90;
 var x93=x90.nodeType;
while(x92)
{
 if (x92.nodeType==x93)
x91++;
x92=x92.previousSibling;
}
}
 return x91;
}
AdfDomUtils.getChildElementByPosition= function(x94,x95,x96)
{
 var x97=null;
 if (x94)
{
 var x98= -1;
x97=x94.firstChild;
while(x97&&x98<x96)
{
 if (x97.nodeType==x95)
x98++;
 if (x98!=x96)
x97=x97.nextSibling;
}
}
 return x97;
}
AdfDomUtils.getElementDepth= function(x99)
{
AdfAssert.assertDomElement(x99);
 var x100= -1;
do
{
x100++;
x99=x99.parentNode;
}
while(x99);
 return x100;
}
AdfDomUtils.getElementAtPoint= function(x101,x102,x103,x104)
{
 var x105=AdfAgent.AGENT;
 var x106=(x101.offsetHeight==0);
 if (x106||x105.pointInElementBounds(x101,x102,x103))
{
 if (!x106)
{
x104=x101;
}
 var x107=x101.firstChild;
while(x107)
{
 if (x107.nodeType==1)
{
 var x108=x105.getComputedStyle(x107);
 if (!x108||
(x108.visibility!="hidden"&&x108.display!="none"))
{
 var x109=AdfDomUtils.getElementAtPoint(x107,x102,x103,x104);
 if (x109!=x104)
{
 return x109;
}
}
}
x107=x107.nextSibling;
}
}
 return x104;
}
AdfDomUtils.canScroll= function(x110,x111,x112)
{
 return ((x110.scrollWidth!=x111)||
(x110.scrollHeight!=x112));
}
AdfDomUtils.getAutoScrollDeltas= function(
x113,
x114,
x115)
{
 var x116=x113.clientWidth;
 var x117=x113.clientHeight;
 var x118=0;
 var x119=0;
 var x120=x113.scrollTop;
 var x121=x113.scrollLeft;
 var x122=x114 - x121;
 var x123=x115 - x120;
 if (x121&&(x122<5))
{
x118= -Math.min(x121,10);
}
 else if ((x116 - x122)<5)
{
 var x124=x113.scrollWidth - x116;
x118=Math.min(x124,10);
}
 if (x120&&(x123<5))
{
x119= -Math.min(x120,10);
}
 else if ((x117 - x123)<5)
{
 var x125=x113.scrollHeight - x117;
x119=Math.min(x125,10);
}
 if (x118||x119)
{
 return {x:x118,y:x119};
}
 else
 {
 return null;
}
}
AdfDomUtils.removeAllNodes= function(x126)
{
 var x127=x126.childNodes;
for(var x128=x127.length-1;x128>=0;x128--)
{
x126.removeChild(x127[x128]);
}
}
AdfDomUtils.scrollRightBy= function(x129,x130)
{
AdfDomUtils.setScrollLeft(x129,x129.scrollLeft + x130)
}
AdfDomUtils.setScrollLeft= function(x131,x132)
{
x132=Math.max(x132,0);
 var x133=x131.scrollWidth - x131.clientWidth;
x131.scrollLeft=Math.min(x132,x133);
}
AdfDomUtils.scrollDownBy= function(x134,x135)
{
AdfDomUtils.setScrollTop(x134,x134.scrollTop + x135)
}
AdfDomUtils.setScrollTop= function(x136,x137)
{
x137=Math.max(x137,0);
 var x138=x136.scrollHeight - x136.clientHeight;
x136.scrollTop=Math.min(x137,x138);
}
AdfDomUtils.scrollChildIntoViewY= function(x139)
{
 var x140=x139.offsetTop;
 var x141=x139.offsetHeight;
 var x142=x139.offsetParent;
 var x143=x139.parentNode;
while(x143&&(x143.scrollHeight<=x143.offsetHeight))
{
 if (x143.offsetParent!=x142)
{
x140+=x143.offsetTop;
x142=x143.offsetParent;
}
x143=x143.parentNode;
}
 if (x143!=null)
{
 if (x140<x143.scrollTop)
{
x143.scrollTop=x140;
}
 else if ((x140+x141)>(x143.scrollTop+x143.clientHeight))
{
x143.scrollTop=x140+x141 - x143.clientHeight;
}
}
}
AdfDomUtils.getNodeInfo= function(x144)
{
 var x145="";
 if (x144)
{
x145+=x144.nodeName;
 if (x144.id)
{
x145+=" id=" + x144.id;
}
 if (x144._afrpeerid)
{
x145+=" peer id=" + x144._afrpeerid;
}
 if (x144.className)
{
x145+=" class=" + x144.className;
}
}
 return x145;
}
AdfDomUtils.suppressActionLinkBrowserContextMenu= function(x146)
{
 var x147=AdfAgent.AGENT;
 var x148=x146.getNativeEvent();
 var x149=x147.getEventTarget(x148);
 var x150=x149.getAttribute("href",2);
 if (x150==null||x150=="")
{
 var x151=x149.parentNode;
 if (x151!=null)
{
x150=x151.getAttribute("href",2);
}
}
 if (x150!=null){
 if (x150=="#"||x150.indexOf("javascript:")==0)
{
x147.preventDefault(x148);
}
}
}
AdfDomUtils.swapIcon= function(x152,x153)
{
 var x154=AdfPage.PAGE.getLookAndFeel();
 var x155=x154.getRawIcon(x153);
 var x156=AdfAgent.AGENT;
 if (x155!=null&& !x156.isEqualIcon(x152,x155))
{
 if (x156.getPlatform()==AdfAgent.IE_PLATFORM
&&x152.tagName==x155.tagName
&&x155.tagName=="IMG")
{
x152.src=x155.src;
x152.alt=x155.alt;
x152.border=x155.border;
}
 else
 {
 var x157=x155.cloneNode(true);
x156.replaceNode(x157,x152);
}
}
}
AdfDomUtils._getCSSClassNameIndex= function(x158,x159)
{
 if(!x158)
 return -1;
 else
 {
 if (x159===x158)
 return 0;
 else
 {
 var x160=x159.length;
 var x161=x158.length;
 var x162=x158.indexOf(x159);
 if (x162>=0)
{
 var x163=(x162==0)||(x158.charAt(x162 - 1)==" ");
 var x164=x162 + x160;
 var x165=(x164==x161)||(x158.charAt(x164)==" ");
 if (x163&&x165)
 return x162;
 else
 {
 var x166=x158.lastIndexOf(x159);
 if (x166!=x162)
{
x163=x158.charAt(x166 - 1);
x164=x166 + x160;
x165=(x164==x161)||(x158.charAt(x164)==" ");
 if (x163&&x165)
 return x166;
 else
 {
 return x158.indexOf(" " + x159 + " ");
}
}
}
}
 return -1;
}
}
}
AdfDomUtils.addCSSClassName= function(x167,x168)
{
AdfAssert.assertDomElement(x167);
 var x169=false;
 if (x168!=null)
{
AdfAssert.assertString(x168);
 var x170=x167.className;
 var x171=AdfDomUtils._getCSSClassNameIndex(x170,x168);
 if (x171== -1)
{
 var x172=(x170)
?x168 + " " + x170
:x168;
x167.className=x172;
x169=true;
}
}
 return x169;
}
AdfDomUtils.removeCSSClassName= function(x173,x174)
{
AdfAssert.assertDomElement(x173);
 var x175=false;
 if (x174!=null)
{
 var x176=x173.className;
 var x177=AdfDomUtils._getCSSClassNameIndex(x176,x174);
 if (x177!= -1)
{
 var x178=x177 + x174.length;
 var x179=(x177==0)
?null
:x176.substring(0,x177);
 var x180=(x178==x176.length)
?null
:x176.substring(x178 + 1);
 var x181;
 if (x179==null)
{
 if (x180==null)
{
x181="";
}
 else
 {
x181=x180;
}
}
 else
 {
 if (x180==null)
{
x181=x179;
}
 else
 {
x181=x179 + x180;
}
}
x173.className=x181;
x175=true;
}
}
 return x175;
}
AdfDomUtils.addOrRemoveCSSClassName= function(
x182,
x183,
x184)
{
 var x185=(x182)
?AdfDomUtils.addCSSClassName
:AdfDomUtils.removeCSSClassName;
 return x185(x183,x184);
}
AdfDomUtils.containsCSSClassName= function(x186,x187)
{
 if (x187!=null)
{
 return AdfDomUtils._getCSSClassNameIndex(x186.className,x187)!= -1;
}
 else
 {
 return false;
}
}
AdfDomUtils.addInlineStyle= function(
x188,
x189,
x190)
{
 if (x189==null)
{
 return;}
 var x191=x188.style.cssText;
 if (x191==null||x191=="")
{
x188.style.cssText=x189;
}
 else
 {
 if (x190==true)
{
x188.style.cssText=x191 + ";" + x189;
}
 else
 {
x188.style.cssText=x189 + ";" + x191;
}
}
}
AdfDomUtils.fillEmptyCell= function(x192)
{
AdfAssert.assertDomElement(x192,"TD");
 if (x192.firstChild==null)
{
 var x193=x192.ownerDocument.createElement("div");
x192.appendChild(x193);
}
}
AdfDomUtils.getElementsByClassName= function(x194,x195)
{
 if (x194==null)
x194=AdfAgent.AGENT.getDomDocument().documentElement;
 var x196=x194.getElementsByTagName("*");
 var x197=x196.length;
 var x198=[];
for(var x199=0;x199<x197;x199++)
{
element=x196[x199];
 if (AdfDomUtils.containsCSSClassName(element,x195))
x198.push(element);
}
 return x198;
}
AdfDomUtils.setAccessibleState= function (x200,x201)
{
 var x202=AdfAgent.AGENT;
 var x203=AdfRichUIPeer.CreateSubId(x200.getClientId(),"state");
 var x204=x202.getElementById(x203);
AdfAssert.assertDomNode(x204);
 if(x201!=null)
{
x202.setTextContent(x204," "+x201+" ");
}
 else
 {
x202.setTextContent(x204,"");
}
}
AdfDomUtils.getFirstElementMatch= function(x205,x206,x207,x208)
{
AdfAssert.assertFunction(x207);
AdfAssert.assertDomElement(x205);
 if (!x206&&x207(x205,x208))
 return x205;
 if (x205.getElementsByTagName)
{
 var x209=x205.getElementsByTagName('*');
 var x210=x209.length;
for(var x211=0;x211<x210;x211++)
{
 var x212=x209[x211];
 if (x207(x212,x208))
 return x212;
}
}
 return null;
}
AdfDomUtils.getNextElementMatch= function(x213,x214,
x215,x216,x217)
{
AdfAssert.assertFunction(x216);
AdfAssert.assertDomElement(x213);
AdfAssert.assertDomElementOrNull(x214);
 var x218=null;
 if (!x215)
{
x218=AdfDomUtils.getFirstElementMatch(x213,true,x216,x217);
 if (x218!=null)
 return x218;
}
while(x213&&(x213!=x214))
{
 if (x213.nextSibling)
{
x213=x213.nextSibling;
 if(x213.nodeType==1)
{
x218=AdfDomUtils.getFirstElementMatch(x213,false,x216,x217);
 if (x218!=null)
 return x218;
}
}
 else
 {
x213=x213.parentNode;
}
}
 return null;
}
AdfDomUtils.getLastElementMatch= function(x219,x220,x221,x222)
{
AdfAssert.assertFunction(x221);
AdfAssert.assertDomElement(x219);
 if (x219.getElementsByTagName)
{
 var x223=x219.getElementsByTagName('*');
for(var x224=x223.length - 1;x224>=0;x224--)
{
 var x225=x223[x224];
 if (x221(x225,x222))
 return x225;
}
}
 if (!x220&&x221(x219,x222))
 return x219;
 return null;
}
AdfDomUtils.getPreviousElementMatch= function(x226,x227,x228,x229)
{
AdfAssert.assertFunction(x228);
AdfAssert.assertDomElement(x226);
AdfAssert.assertDomElementOrNull(x227);
while(x226&&(x226!=x227))
{
 var x230=x226.previousSibling;
while(x230&&x230.nodeType!=1)
{
x230=x230.previousSibling;
}
 if (x230)
{
matchElement=AdfDomUtils.getLastElementMatch(x230,false,x228,x229);
 if (matchElement!=null)
 return matchElement;
x226=x230;
}
 else
 {
 var x231=x226.parentNode;
 if (x228(x231,x229))
 return x231;
x226=x231;
}
}
 return null;
}
AdfDomUtils.getTabIndex= function(
x232
)
{
AdfAssert.assertDomElement(x232);
 var x233=x232.getAttributeNode("tabIndex");
 return (x233==null|| !x233.specified)?undefined:x233.nodeValue;
}
AdfDomUtils.cleanHtml= function(
x234,
x235)
{
 var x236=x234.createElement("span");
x236.innerHTML=x235;
 if (x235&&(x235.indexOf("<")>=0))
{
AdfDomUtils._cleanElementHtml(x236);
}
 return x236;
}
AdfDomUtils._cleanElementHtml= function(
x237)
{
 var x238=x237.childNodes;
 var x239=x238.length - 1;
while(x239>=0)
{
 var x240=x238.item(x239);
 if (x240.nodeType==1)
{
 if (AdfDomUtils._LEGAL_ELEMENTS[x240.nodeName])
{
 var x241=x240.attributes;
for(var x242=x241.length - 1;x242>=0;x242--)
{
 var x243=x241[x242];
 if (x243.specified)
{
 if (!AdfDomUtils._LEGAL_ATTRIBUTES[x243.nodeName])
{
x240.removeAttribute(x243.nodeName);
}
}
}
AdfDomUtils._cleanElementHtml(x240);
}
 else
 {
x237.removeChild(x240);
}
}
x239--;
}
}
AdfDomUtils.findAccessKeyDom= function(x244,x245)
{
 if (x245==null)
{
 return null;
}
 var x246=x244.childNodes;
for(var x247=0;x247<x246.length; ++x247)
{
 if (AdfAgent.AGENT.getTextContent(x246[x247])==x245)
{
 return x246[x247];
}
}
 return null;
}
AdfDomUtils.handleTextChangeWithAccessKey= function(
x248,
x249,
x250)
{
 if (x249==null)
{
 return false;
}
 var x251=x248.getPropertyValue("accessKey");
 var x252=AdfDomUtils.findAccessKeyDom(x249,x251);
 if (x251!=null){
 var x253=x248.getPeer().getDomDocument();
 if (x252!=null)
{
 var x254=x250.indexOf(x251);
 if (x254== -1)
{
AdfDomUtils._removeAccessKeyElement(x249,x252);
AdfDomUtils._setTextContent(x249,x250);
}
 else
 {
AdfDomUtils._removeSiblings(x252);
 if (x254>0)
{
x249.insertBefore(x253.createTextNode(x250.substring(0,x254)),x252);
}
AdfDomUtils._setTextContent(x252,x251);
 if (x254 + 1<x250.length)
{
x249.appendChild(x253.createTextNode(x250.substr(x254 + 1)));
}
}
 return true;
}
 else {
 return AdfDomUtils._setTextAndAccessKeySpan(x248,
x249,x251,x252,x250);
}
}
 else {
 if (x252!=null)
{
AdfDomUtils._removeAccessKeyElement(x252);
}
AdfDomUtils._setTextContent(x249,x250);
 return true;
}
 return false;
}
AdfDomUtils.launchHelpWindow= function(x255)
{
 var x256=AdfDomUtils._getHelpWindowName();
 if (x256==null)
{
x256='RCFHelpWindow';
AdfDomUtils._setHelpWindowName(x256);
}
 var x257=window.open(x255,x256,'width=650,height=450,resizable=yes,scrollbars=yes,alwaysRaised');
x257.focus();
}
AdfDomUtils._getHelpWindowName= function ()
{
 var x258=AdfDomUtils._HELP_WINDOW_NAME_COOKIE + "=";
 var x259=document.cookie.split(';');
 var x260=x259.length;
for(var x261=0;x261<x260;x261++)
{
 var x262=x259[x261];
 var x263=0;
while(x262.charAt(x263)==' ')
x263++;
x262=x262.substring(x263,x262.length);
 if (x262.indexOf(x258)==0)
{
 return x262.substring(x258.length,x262.length);
}
}
 return null;
}
AdfDomUtils._setHelpWindowName= function (x264)
{
document.cookie=AdfDomUtils._HELP_WINDOW_NAME_COOKIE + "=" + x264 + "; ; path=/";
}
AdfDomUtils._setTextAndAccessKeySpan= function(
x265,
x266,
x267,
x268,
x269)
{
 var x270=AdfAgent.AGENT.getExpandoProperty(x266,
"_adfAccessKeyStyleClass",null);
 if (x270==null)
{
AdfDomUtils._setTextContent(x266,x269);
}
 else
 {
 var x271=x269.indexOf(x267);
 if (x271>=0)
{
 if (x271>0)
{
AdfAgent.AGENT.setTextContent(x266,x269.substring(0,x271));
}
 else
 {
while(x266.lastChild!=null)
{
x266.removeChild(x266.lastChild);
}
}
 var x272=x265.getPeer().getDomDocument();
x268=x272.createElement("SPAN");
x268.className=x270;
AdfAgent.AGENT.setTextContent(x268,x267);
x266.appendChild(x268);
 if (x271 + 1<x269.length)
{
x266.appendChild(x272.createTextNode(x269.substr(x271 + 1)));
}
}
 else
 {
AdfAgent.AGENT.setTextContent(x266,x269);
}
}
 return true;
}
AdfDomUtils._removeSiblings= function(
x273)
{
 var x274;
 var x275=x273.parentNode;
while((x274=x273.previousSibling)!=null)
{
x275.removeChild(x274);
}
while((x274=x273.nextSibling)!=null)
{
x275.removeChild(x274);
}
}
AdfDomUtils._setTextContent= function(
x276,
x277)
{
 if (x276.tagName=="BUTTON")
{
AdfAgent.AGENT.setButtonTextContent(x276,x277);
}
 else
 {
AdfAgent.AGENT.setTextContent(x276,x277);
}
}
AdfDomUtils._removeAccessKeyElement= function(
x278,
x279)
{
AdfAgent.AGENT.setExpandoProperty(x278,"_adfAccessKeyStyleClass",
x279.className);
x279.parentNode.removeChild(x279);
}
AdfDomUtils.__componentTextChanged= function(
x280,
x281,
x282,
x283)
{
 if (x283!=null)
{
 var x284=AdfDomUtils.getFirstDescendentElement(x281,"SPAN");
 var x285=x280.getPropertyValue("accessKey");
 var x286=x285==null?null:
AdfDomUtils.findAccessKeyDom(x281,x285);
 var x287=x284&&x284!=x286?x284:x281;
 return AdfDomUtils.handleTextChangeWithAccessKey(x280,x287,
x282);
}
 return false;
}
AdfDomUtils._LEGAL_ELEMENTS=
{SPAN:1,B:1,A:1,I:1,EM:1,BR:1,HR:1,LI:1,OL:1,UL:1,P:1,TT:1,
BIG:1,SMALL:1,PRE:1};
AdfDomUtils._LEGAL_ATTRIBUTES={"class":1,style:1,href:1};
AdfDomUtils._HELP_WINDOW_NAME_COOKIE="ORA_ADF_HELPWINDOWNAME";

var AdfEventUtils= new Object();
AdfEventUtils.addListener= function(x0,x1,x2)
{
AdfAssert.assertArrayOrNull(x0);
AdfAssert.assertFunction(x2);
 if (x0==null)
x0= new Array();
x0.push(x1);
x0.push(x2);
 return x0;
}
AdfEventUtils.removeListener= function(x3,x4,x5)
{
AdfAssert.assertArray(x3);
 var x6=x3.length;
for(var x7=1;x7<x6;x7+=2)
{
 if (x3[x7]==x4&&x3[x7-1]==x5)
{
 if (x6==2)
{
 return null;
}
 else
 {
x3.splice(x7 - 1,2);
break;
}
}
}
 return x3;
}
AdfEventUtils.firePropertyChangeEvent= function(x8,x9,
x10,x11,x12)
{
AdfAssert.assertArrayOrNull(x8);
AdfAssert.assert(x9!=null);
AdfAssert.assertString(x10);
 if (x8&&(x11!==x12))
{
AdfEventUtils.deliverEventToListeners(x8,
 new AdfPropertyChangeEvent(x9,x10,x11,x12));
}
}
AdfEventUtils.deliverEventToListeners= function(x13,x14)
{
AdfAssert.assertArray(x13);
AdfAssert.assertPrototype(x14,AdfBaseEvent);
 var x15=x13.length;
for(var x16=0;x16<x15;x16+=2)
{
 var x17=x13[x16];
 var x18=x13[x16 + 1];
try
{
 if (x17!=null)
x18.call(x17,x14);
 else
 x18(x14);
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,
" delivering event:" + x14 + " to listener:" + x18);
}
}
}

var AdfStyleUtils= new Object();
AdfStyleUtils.convertToValidStyleClass= function(
x0)
{
 if (x0==null) return null;
x0=x0.replace("|","_");
 return x0.replace(/::/g,"_");
}
function AdfMessageUtils()
{
this.Init();
}
AdfObject.createSubclass(AdfMessageUtils);
AdfMessageUtils.getInstance= function()
{
 if (AdfMessageUtils._instance==null)
AdfMessageUtils._instance= new AdfMessageUtils();
 return AdfMessageUtils._instance;
}
AdfMessageUtils.hasMessages= function(x0,x1,x2)
{
 var x3=x0.getClientIdsWithMessages().length;
 if ((x3==0&&x1==0)||
(x2&&x1==0))
 return false;
 return true;
}
AdfMessageUtils.isPageLevelBoxNeeded= function(
x4,
x5,
x6)
{
 var x7=x4.getClientIdsWithMessages().length;
 var x8=0;
 if (x5!=null)
{
x8=x5.length;
}
 var x9=1;
 if (x4.isScreenReaderMode())
x9=0;
 if ((x8==0)&&
(x6||(x7<=x9)))
{
 return false;
}
 return true;
}
AdfMessageUtils.getCombinedMessagesDom= function(
x10,
x11,
x12)
{
AdfMessageUtils._globalOnly=x12;
 var x13=AdfPage.PAGE;
 var x14=x13.getAllMessages();
 var x15=x14[x10];
 var x16=x13.getClientIdsWithMessages();
 var x17=false;
 if (x16.length==1)
{
 var x18=x13.getMessages(x16[0]).length;
 if (x18<=1)
{
x17=true;
}
}
 else if (x12)
{
x17=(x15.length<=1);
}
 var x19=x13.getDocument();
 var x20;
 if (x15!=null)
{
x20=x19.createElement("table");
x20.cellSpacing=0;
x20.cellPadding=0;
x20.summary="";
AdfMessageUtils._addMessageWrapper(x19,x20,null,x15,null,x17);
}
 var x21;
 if (!x12)
{
for(var x22 in x14)
{
 if (x22!=x10)
{
 var x23=x14[x22];
 if (x23!=null)
{
 if (x21==null)
{
x21=x19.createElement("table");
x21.summary="";
}
 var x24=x23["title"];
AdfMessageUtils._addMessageWrapper(x19,x21,x22,x23,x24);
}
}
}
}
 var x25=x13.getLookAndFeel();
 var x26=x19.createElement("div");
AdfDomUtils.addCSSClassName(x26,
x25.getStyleClass(AdfMessageUtils._MESSAGES_INTRO_STYLE_CLASS));
 if (x11==null)
{
 if(!x17)
{
x26.appendChild(x19.createTextNode(
x25.getTranslatedString(AdfMessageUtils._COMBINED_MESSAGES_INTRO_LABEL)));
}
}
 else
 {
x26.appendChild(x19.createTextNode(x11));
}
 var x27=x19.createElement("div");
x27.appendChild(x26);
 if (x20!=null)
{
x27.appendChild(x20);
}
 if ((x20!=null)&&(x21!=null))
{
 var x28=x19.createElement("hr");
AdfDomUtils.addCSSClassName(x28,
x25.getStyleClass(AdfMessageUtils._MESSAGE_GROUP_TYPE_SEPARATOR_STYLE_CLASS));
x27.appendChild(x28);
}
 if (x21!=null)
{
x27.appendChild(x21);
}
 return x27;
}
AdfMessageUtils.appendComponentMessageInlineDom= function(
x29,
x30)
{
 if (x30!=null)
{
 var x31=x29;
 var x32=x30.length;
 var x33=(x32>1);
 if (x33)
{
 var x34=AdfPage.PAGE;
 var x35=x34.getDocument();
 var x36=AdfAgent.AGENT;
 var x37=x35.createElement("table");
x37.summary="";
x29.appendChild(x37);
 var x38=x37.insertRow(-1);
 var x39=x38.insertCell(-1);
 var x40=null;
for(var x41=0;x41<x32;x41++)
{
 var x42=AdfFacesMessage.getTypeFromMessage(x30[x41]);
 if ((x40==null)||(x42>x40))
{
x40=x42;
}
}
 var x43=AdfMessageUtils.getIcon(x40,false);
x39.appendChild(x43);
x39=x38.insertCell(-1);
 var x44=x34.getLookAndFeel();
AdfDomUtils.addCSSClassName(x39,x44.getStyleClass(AdfMessageUtils._TYPE_STYLE_CLASS));
 var x45=AdfMessageUtils.getString(x40,false);
x36.setTextContent(x39,x45);
x38=x37.insertRow(-1);
x39=x38.insertCell(-1);
x39.colSpan=2;
AdfDomUtils.addCSSClassName(x39,x44.getStyleClass(AdfMessageUtils._INTRO_STYLE_CLASS));
 var x46=x44.getTranslatedString(AdfMessageUtils._COMPONENT_MESSAGES_INTRO_LABEL);
x36.setTextContent(x39,x46);
x38=x37.insertRow(-1);
x39=x38.insertCell(-1);
x36.setTextContent(x39," ");
x31=x38.insertCell(-1);
}
for(var x47=AdfFacesMessage.TYPE_FATAL;x47>=AdfFacesMessage.TYPE_INFO;x47--)
{
 var x48=x30.sorted[x47];
 if (x48)
{
 var x49=x48.length;
for(var x50=0;x50<x49;x50++)
{
x31.appendChild(AdfMessageUtils._getMessageDom(x48[x50],x33,false));
}
}
}
}
}
AdfMessageUtils.hasMessagePopupContent= function(x51)
{
 var x52=AdfPage.PAGE;
 var x53=x52.getMessages(x51);
 if ((x53!=null)&&(x53["overridden"]!=true))
{
 return true;
}
 return false;
}
AdfMessageUtils.getComponentMessagePopupDom= function(x54)
{
 var x55=AdfPage.PAGE;
 var x56=x55.getMessages(x54);
 var x57=x55.getDocument();
 var x58=AdfAgent.AGENT;
 var x59=x55.getLookAndFeel();
 var x60=x57.createElement("div");
 var x61=x57.createElement("div");
AdfDomUtils.addCSSClassName(x61,AdfMessageUtils._CONTENT_STYLE_CLASS);
x60.appendChild(x61);
 var x62=x57.createElement("div");
x61.appendChild(x62);
AdfMessageUtils.appendComponentMessageInlineDom(x62,x56);
 return x60;
}
AdfMessageUtils.getComponentMessagePopupFooterDom= function(x63)
{
 var x64=AdfPage.PAGE;
 var x65=x64.getDocument();
 var x66=AdfAgent.AGENT;
 var x67=x64.getLookAndFeel();
 var x68=null;
 var x69=x64.getDefaultMessageHandlerComponentId();
 var x70=x64.findComponent(x69);
 var x71=x70.getPeer();
x71.bind(x70);
 var x72=x71.isMessagesDialogShowable();
 if (AdfMessageUtils._globalOnly==true)
{
x72=false;
}
 var x73=x64.getAllMessages();
 var x74=[];
 var x75= -1;
for(var x76 in x73)
{
 var x77=x73[x76];
 if ((x77!=null)&&(x77["compId"]!=null))
{
 if (x76==x63)
{
x75=x74.length;
}
 if (x76!=x69)
{
 var x78=x64.getMessages(x76);
 if ((x78!=null)&&(x78["overridden"]!=true))
{
x74.push(x76);
}
}
}
}
 var x79=x74.length;
 if (x72||(x79>1))
{
x68=x65.createElement("div");
 var x80=x65.createElement("div");
AdfDomUtils.addCSSClassName(x80,AdfMessageUtils._FOOTER_STYLE_CLASS);
x68.appendChild(x80);
table=x65.createElement("table");
table.summary="";
x80.appendChild(table);
table.cellPadding=0;
table.cellSpacing=0;
table.style.width="100%";
row=table.insertRow(-1);
cell=row.insertCell(-1);
AdfDomUtils.addCSSClassName(cell,AdfMessageUtils._FOOTER_START_STYLE_CLASS);
cell=row.insertCell(-1);
AdfDomUtils.addCSSClassName(cell,AdfMessageUtils._FOOTER_END_STYLE_CLASS);
 var x81=x65.createElement("table");
x81.summary="";
cell.appendChild(x81);
x81.cellPadding=0;
x81.cellSpacing=0;
AdfDomUtils.addCSSClassName(x81,AdfMessageUtils._NAVIGATOR_STYLE_CLASS);
row=x81.insertRow(-1);
 if (x79>1)
{
cell=row.insertCell(-1);
 var x82=x65.createElement("a");
x82.title=x67.getTranslatedString(AdfMessageUtils._PREVIOUS_MESSAGE);
 var x83=x75 - 1;
 if (x83== -1)
{
x83=x79 - 1;
}
x82.name=x74[x83];
AdfDomUtils.addCSSClassName(x82,AdfMessageUtils._PREVIOUS_LINK_STYLE_CLASS);
 if (x75==0)
{
AdfDomUtils.addCSSClassName(x82,
AdfMessageUtils._DISABLED_STYLE_CLASS);
}
 else
 {
x82.href="javascript:;";
x66.addBubbleEventListener(
x82,"click",AdfMessageUtils.getInstance()._jumpToMessageHandlerStub);
AdfDomUtils.removeCSSClassName(x82,AdfMessageUtils._DISABLED_STYLE_CLASS);
}
cell.appendChild(x82);
}
cell=row.insertCell(-1);
 var x84=x65.createElement("a");
AdfDomUtils.addCSSClassName(x84,AdfMessageUtils._ALL_LINK_STYLE_CLASS);
x84.title=x67.getTranslatedString(AdfMessageUtils._SHOW_ALL_MESSAGES_TIP);
x84.href="javascript:;";
x84.name=x63;
x66.addBubbleEventListener(
x84,"click",AdfMessageUtils.getInstance()._jumpToAllMessagesHandlerStub);
x84.appendChild(x65.createTextNode(
x67.getTranslatedString(AdfMessageUtils._SHOW_ALL_MESSAGES)));
cell.appendChild(x84);
 if (x79>1)
{
cell=row.insertCell(-1);
 var x85=x65.createElement("a");
x85.title=x67.getTranslatedString(AdfMessageUtils._NEXT_MESSAGE);
 var x86=x75 + 1;
 if (x86==x79)
{
x86=0;
}
x85.name=x74[x86];
AdfDomUtils.addCSSClassName(x85,AdfMessageUtils._NEXT_LINK_STYLE_CLASS);
 if (x75 + 1==x79)
{
AdfDomUtils.addCSSClassName(x85,AdfMessageUtils._DISABLED_STYLE_CLASS);
}
 else
 {
x85.href="javascript:;";
x66.addBubbleEventListener(
x85,"click",AdfMessageUtils.getInstance()._jumpToMessageHandlerStub);
AdfDomUtils.removeCSSClassName(x85,AdfMessageUtils._DISABLED_STYLE_CLASS);
}
cell.appendChild(x85);
}
}
 return x68;
}
AdfMessageUtils.removeCSSClassName= function(x87,x88)
{
AdfAssert.assert(x87!=null);
AdfAssert.assert(x88!=null);
 var x89=AdfMessageUtils._getStyleProperty(x88);
 if (x89!=null)
{
AdfDomUtils.removeCSSClassName(x87,x89);
}
}
AdfMessageUtils.addCSSClassName= function(x90,x91)
{
AdfAssert.assert(x90!=null);
AdfAssert.assert(x91!=null);
 var x92=AdfMessageUtils._getStyleProperty(x91);
 if (x92!=null)
{
AdfDomUtils.addCSSClassName(x90,x92);
}
}
AdfMessageUtils.switchCSSClassName= function(x93,x94,x95)
{
AdfAssert.assert(x93!=null);
 if (x94!=null)
{
AdfMessageUtils.removeCSSClassName(x93,x94);
}
 if (x95!=null)
{
AdfMessageUtils.addCSSClassName(x93,x95);
}
}
AdfMessageUtils.switchIcon= function(x96,x97,x98)
{
 var x99=AdfMessageUtils._getIconKey(x97,x98);
AdfDomUtils.swapIcon(x96,x99)
}
AdfMessageUtils.getIcon= function(x100,x101)
{
 var x102=AdfMessageUtils._getIconKey(x100,x101);
 return AdfPage.PAGE.getLookAndFeel().getIcon(x102);
}
AdfMessageUtils.getString= function(x103,x104)
{
 var x105=AdfPage.PAGE.getLookAndFeel();
 var x106=x104?AdfMessageUtils._MESSAGES_TYPE_STRING[x103]:
AdfMessageUtils._TYPE_STRING[x103]
 return x105.getTranslatedString(x106);
}
AdfMessageUtils.messageGroupFocus= function(
x107)
{
 var x108=AdfPage.PAGE;
 var x109=x108.findComponent(x107);
 if (x109!=null)
{
x109.focus();
AdfMessageUtils.HideMessagesDialog();
x108.showMessages(x109.getClientId());
}
}
AdfMessageUtils.HideMessagesDialog= function()
{
 var x110=AdfPage.PAGE;
 var x111=x110.getDefaultMessageHandlerComponentId();
 var x112=x110.findComponent(x111);
 if (x112)
{
 var x113=x112.getPeer();
x113.bind(x112);
x113.setMessagesDialogShown(false);
}
}
AdfMessageUtils.prototype.Init= function()
{
AdfMessageUtils.superclass.Init.call(this);
this._jumpToMessageHandlerStub=this.createCallback(this._jumpToMessageHandler);
this._jumpToAllMessagesHandlerStub=this.createCallback(this._jumpToAllMessagesHandler);
this._messageCloseHandlerStub=this.createCallback(this._messageCloseHandler);
}
AdfMessageUtils.prototype._jumpToMessageHandler= function(x114)
{
 var x115=AdfAgent.AGENT;
x115.preventDefault(x114);
 var x116=x115.getEventTarget(x114);
 var x117=x116.name;
AdfMessageUtils.messageGroupFocus(x117);
}
AdfMessageUtils.prototype._jumpToAllMessagesHandler= function(x118)
{
AdfAgent.AGENT.preventDefault(x118);
AdfMessageUtils.getInstance()._messageCloseHandler(x118);
 var x119=AdfPage.PAGE;
x119.showMessages();
}
AdfMessageUtils.prototype._messageCloseHandler= function(x120)
{
 var x121=AdfAgent.AGENT.getEventTarget(x120);
 var x122=x121.name;
 var x123=AdfPage.PAGE.findComponent(x122);
 var x124=x123.getPeer();
x124.bind(x123);
 if (x124.HideNoteWindow!=null)
{
x124.HideNoteWindow();
}
}
AdfMessageUtils._addMessageWrapper= function(
x125,
x126,
x127,
x128,
x129,
x130)
{
 var x131=x126.insertRow(-1);
 var x132=x131.insertCell(-1);
 if (x127!=null)
{
 var x133=AdfPage.PAGE.getLookAndFeel();
AdfDomUtils.addCSSClassName(x132,
x133.getStyleClass(AdfMessageUtils._MESSAGE_GROUP_TITLE_STYLE_CLASS));
 var x134=AdfPage.PAGE;
 var x135=x134.findComponent(x127);
 var x136=x129;
 if (x136==null)
{
 if (x135!=null)
{
 if (x135.getLabel!=null)
{
x136=x135.getLabel();
}
 else if (x135.getText!=null)
{
x136=x135.getText();
}
 if ((x136==null)||(x136.length==0))
{
 var x137=null;
 var x138=x135;
while(x138&& !x137)
{
x138=x138.getParent();
 if (x138&&
x138 instanceof AdfRichDocument)
{
x137=x138;
}
}
 if (x137)
{
 var x139= new Object();
x139.id=x127;
x137.visitChildren(AdfMessageUtils._checkCompWithFor,x139,false);
x136=x139.label;
}
}
}
 if ((x136==null)||(x136.length==0))
{
x136=x133.getTranslatedString(AdfMessageUtils._COMPONENT_LEVEL_MESSAGE_LABEL);
}
}
 var x140=x125.createTextNode(x136);
 var x141=x140;
 if (x135!=null)
{
x141=x125.createElement("a");
AdfDomUtils.addCSSClassName(x141,
x133.getStyleClass(AdfMessageUtils._COMPONENT_MESSAGE_LINK_STYLE_CLASS));
 var x142=x133.getTranslatedString(AdfMessageUtils._SET_FOCUS_ON_COMPONENT,x136);
x141.title=x142;
x141.href="javascript:;";
x141.name=x127;
AdfAgent.AGENT.addBubbleEventListener(
x141,"click",AdfMessageUtils.getInstance()._jumpToMessageHandlerStub);
x141.appendChild(x140);
}
x132.appendChild(x141);
x132=x131.insertCell(-1);
}
 var x143=x125.createElement("table");
 if (x130)
{
x143.cellSpacing=0;
x143.cellPadding=0;
}
x143.summary="";
x132.appendChild(x143);
for(var x144=AdfFacesMessage.TYPE_FATAL;x144>=AdfFacesMessage.TYPE_INFO;x144--)
{
 var x145=x128.sorted[x144];
 if (x145)
{
 var x146=x145.length;
for(var x147=0;x147<x146;x147++)
{
AdfMessageUtils._addMessageDomToTable(x143,x145[x147],true,true,x130);
}
}
}
}
AdfMessageUtils._checkCompWithFor= function(x148)
{
 if(x148.getFor!=null&& !(x148 instanceof AdfRichMessage))
{
 var x149=x148.getFor();
 if (x149!=null&&x149==this.id)
{
 if (x148.getLabel)
{
this.label=x148.getLabel();
}
 else if (x148.getValue)
{
 var x150=x148.getValue();
 if (x148.getConverter)
{
 var x151=x148.getConverter();
 if (x151)
{
x150=x151.getAsString(x150);
}
}
this.label=x150;
}
 return 2;
}
}
}
AdfMessageUtils._getTextDom= function(x152)
{
 var x153=AdfPage.PAGE.getDocument();
 var x154;
 if ((x152.indexOf("<html>")==0)&&(x152.lastIndexOf("</html>")==(x152.length - 7)))
{
x154=x153.createElement("div");
x154.appendChild(
AdfDomUtils.cleanHtml(x153,x152.substring(6,x152.length - 7)));
}
 else
 {
x154=x153.createElement("div");
AdfAgent.AGENT.setTextContent(x154,x152);
}
 return x154;
}
AdfMessageUtils._getStyleProperty= function(x155)
{
 return AdfMessageUtils._STYLE_PROP[x155];
}
AdfMessageUtils._getIconKey= function(x156,x157)
{
 var x158=x157?AdfMessageUtils._MESSAGES_ICON[x156]:
AdfMessageUtils._MESSAGE_ICON[x156];
 if (x158==null)
{
x158=x157?AdfMessageUtils._MESSAGES_ICON[AdfFacesMessage.TYPE_INFO]:
AdfMessageUtils._MESSAGE_ICON[AdfFacesMessage.TYPE_INFO];
}
 return x158;
}
AdfMessageUtils._getMessageDom= function(x159,x160)
{
 var x161=AdfPage.PAGE.getDocument();
 var x162=x161.createElement("table");
x162.summary="";
AdfMessageUtils._addMessageDomToTable(x162,x159,x160);
 return x162;
}
AdfMessageUtils._addMessageDomToTable= function(
x163,x164,x165,x166,x167)
{
 var x168=AdfPage.PAGE;
 var x169=x168.getDocument();
 var x170=x168.getLookAndFeel();
 var x171=AdfAgent.AGENT;
 var x172=AdfFacesMessage.getTypeFromMessage(x164);
AdfAssert.assertDomElement(x163,"TABLE");
 var x173;
 var x174;
 if (x165)
{
x174=x163.insertRow(-1);
x173=x174.insertCell(-1);
x173.vAlign="top";
 if (!x167)
{
 var x175=AdfMessageUtils.getIcon(x172,x166);
x173.appendChild(x175);
}
x173=x174.insertCell(-1);
}
 else
 {
x174=x163.insertRow(-1);
x173=x174.insertCell(-1);
 var x175=AdfMessageUtils.getIcon(x172,x166);
x173.appendChild(x175);
x173=x174.insertCell(-1);
AdfDomUtils.addCSSClassName(x173,x170.getStyleClass(AdfMessageUtils._TYPE_STYLE_CLASS));
 var x176=AdfMessageUtils.getString(x172,x166);
 var x177=x164.getSummary();
 if (x177!=null)
{
 var x178=x170.getTranslatedString(AdfMessageUtils._COMPACT_TYPE_SUMMARY);
x176=TrFastMessageFormatUtils.format(x178,x176,x177);
}
x171.setTextContent(x173,x176);
x174=x163.insertRow(-1);
x173=x174.insertCell(-1);
x171.setTextContent(x173," ");
x173=x174.insertCell(-1);
}
 var x179=x164.getDetail();
 if (x179!=null)
{
 var x180=AdfMessageUtils._getTextDom(x179);
 var x181=x166?AdfMessageUtils._MESSAGES_DETAIL_STYLE_CLASS:
AdfMessageUtils._DETAIL_STYLE_CLASS;
AdfDomUtils.addCSSClassName(x180,x170.getStyleClass(x181));
x173.appendChild(x180);
}
}
AdfMessageUtils._STYLE_PROP=Array();
AdfMessageUtils._STYLE_PROP[AdfFacesMessage.TYPE_FATAL]="p_AFFatal";
AdfMessageUtils._STYLE_PROP[AdfFacesMessage.TYPE_ERROR]="p_AFError";
AdfMessageUtils._STYLE_PROP[AdfFacesMessage.TYPE_WARNING]="p_AFWarning";
AdfMessageUtils._STYLE_PROP[AdfFacesMessage.TYPE_CONFIRMATION]="p_AFConfirmation";
AdfMessageUtils._STYLE_PROP[AdfFacesMessage.TYPE_INFO]="p_AFInfo";
AdfMessageUtils._TYPE_STRING=Array();
AdfMessageUtils._TYPE_STRING[AdfFacesMessage.TYPE_FATAL]="af_message.TIP_FATAL";
AdfMessageUtils._TYPE_STRING[AdfFacesMessage.TYPE_ERROR]="af_message.TIP_ERROR";
AdfMessageUtils._TYPE_STRING[AdfFacesMessage.TYPE_WARNING]="af_message.TIP_WARNING";
AdfMessageUtils._TYPE_STRING[AdfFacesMessage.TYPE_CONFIRMATION]="af_message.TIP_CONFIRMATION";
AdfMessageUtils._TYPE_STRING[AdfFacesMessage.TYPE_INFO]="af_message.TIP_INFO";
AdfMessageUtils._COMPONENT_MESSAGES_INTRO_LABEL="af_message.LABEL_COMPONENT_MESSAGES_INTRO";
AdfMessageUtils._COMPACT_TYPE_SUMMARY="af_message.LABEL_COMPACT_TYPE_SUMMARY";
AdfMessageUtils._MESSAGE_ICON=Array();
AdfMessageUtils._MESSAGE_ICON[AdfFacesMessage.TYPE_FATAL]="af|message::fatal-icon";
AdfMessageUtils._MESSAGE_ICON[AdfFacesMessage.TYPE_ERROR]="af|message::error-icon";
AdfMessageUtils._MESSAGE_ICON[AdfFacesMessage.TYPE_WARNING]="af|message::warning-icon";
AdfMessageUtils._MESSAGE_ICON[AdfFacesMessage.TYPE_CONFIRMATION]="af|message::confirmation-icon";
AdfMessageUtils._MESSAGE_ICON[AdfFacesMessage.TYPE_INFO]="af|message::info-icon";
AdfMessageUtils._MESSAGES_ICON=Array();
AdfMessageUtils._MESSAGES_ICON[AdfFacesMessage.TYPE_FATAL]="af|messages::fatal-icon";
AdfMessageUtils._MESSAGES_ICON[AdfFacesMessage.TYPE_ERROR]="af|messages::error-icon";
AdfMessageUtils._MESSAGES_ICON[AdfFacesMessage.TYPE_WARNING]="af|messages::warning-icon";
AdfMessageUtils._MESSAGES_ICON[AdfFacesMessage.TYPE_CONFIRMATION]="af|messages::confirmation-icon";
AdfMessageUtils._MESSAGES_ICON[AdfFacesMessage.TYPE_INFO]="af|messages::info-icon";
AdfMessageUtils._SUMMARY_STYLE_CLASS="af|message::summary";
AdfMessageUtils._DETAIL_STYLE_CLASS="af|message::detail";
AdfMessageUtils._TYPE_STYLE_CLASS="af|message::type";
AdfMessageUtils._INTRO_STYLE_CLASS="af|message::intro";
AdfMessageUtils._MESSAGES_SUMMARY_STYLE_CLASS="af|messages::summary";
AdfMessageUtils._MESSAGES_DETAIL_STYLE_CLASS="af|messages::detail";
AdfMessageUtils._COMBINED_MESSAGES_INTRO_LABEL="af_messages.LABEL_COMBINED_MESSAGES_INTRO";
AdfMessageUtils._COMPONENT_LEVEL_MESSAGE_LABEL="af_messages.LABEL_COMPONENT_LEVEL_MESSAGE";
AdfMessageUtils._SET_FOCUS_ON_COMPONENT="af_messages.LABEL_SET_FOCUS_ON_COMPONENT";
AdfMessageUtils._MESSAGES_TYPE_STRING=Array();
AdfMessageUtils._MESSAGES_TYPE_STRING[AdfFacesMessage.TYPE_FATAL]="af_messages.TIP_FATAL";
AdfMessageUtils._MESSAGES_TYPE_STRING[AdfFacesMessage.TYPE_ERROR]="af_messages.TIP_ERROR";
AdfMessageUtils._MESSAGES_TYPE_STRING[AdfFacesMessage.TYPE_WARNING]="af_messages.TIP_WARNING";
AdfMessageUtils._MESSAGES_TYPE_STRING[AdfFacesMessage.TYPE_CONFIRMATION]="af_messages.TIP_CONFIRMATION";
AdfMessageUtils._MESSAGES_TYPE_STRING[AdfFacesMessage.TYPE_INFO]="af_messages.TIP_INFO";
AdfMessageUtils._MESSAGES_INTRO_STYLE_CLASS="af|messages::intro";
AdfMessageUtils._MESSAGE_GROUP_TITLE_STYLE_CLASS="af|messages::message-group-title";
AdfMessageUtils._MESSAGE_GROUP_TYPE_SEPARATOR_STYLE_CLASS=
"af|messages::message-group-type-separator";
AdfMessageUtils._COMPONENT_MESSAGE_LINK_STYLE_CLASS="af|messages::component-link";
AdfMessageUtils._SHOW_ALL_MESSAGES_TIP="af_message.TIP_SHOW_ALL_MESSAGES";
AdfMessageUtils._SHOW_ALL_MESSAGES="af_message.LABEL_SHOW_ALL_MESSAGES";
AdfMessageUtils._PREVIOUS_MESSAGE="af_message.TIP_PREVIOUS_MESSAGE";
AdfMessageUtils._NEXT_MESSAGE="af_message.TIP_NEXT_MESSAGE";
AdfMessageUtils._CONTENT_STYLE_CLASS="AFNoteWindowContent";
AdfMessageUtils._FOOTER_STYLE_CLASS="AFNoteWindowFooter";
AdfMessageUtils._FOOTER_START_STYLE_CLASS="AFNoteWindowFooterStart";
AdfMessageUtils._FOOTER_END_STYLE_CLASS="AFNoteWindowFooterEnd";
AdfMessageUtils._NAVIGATOR_STYLE_CLASS="AFNoteWindowNavigator";
AdfMessageUtils._PREVIOUS_LINK_STYLE_CLASS="AFNoteWindowPreviousLink";
AdfMessageUtils._NEXT_LINK_STYLE_CLASS="AFNoteWindowNextLink";
AdfMessageUtils._DISABLED_STYLE_CLASS="p_AFDisabled";
AdfMessageUtils._ALL_LINK_STYLE_CLASS="AFNoteWindowAllButton";

function AdfOverflowSupport(x0,x1,x2,x3,x4)
{
this.Init(x0,x1,x2,x3,x4);
}
AdfObject.createSubclass(AdfOverflowSupport);
AdfOverflowSupport.InitClass= function()
{
this._POPUP_ID_START="_afrOfwSrt";
this._POPUP_ID_END="_afrOfwEnd";
this._DEPRESSED_STYLE_CLASS="p_AFDepressed";
}
AdfOverflowSupport.prototype.Init= function(x0,x1,x2,x3,x4)
{
AdfOverflowSupport.superclass.Init.call(this);
this._peer=x1;
this._type=x2||"end";
this._position=x3||"after";
this._orientation=x4||"horizontal";
this._element=AdfAgent.AGENT.getElementById(x0);
 if (this._supportsStartOverflow())
{
this._startIndicator=this._getElement(x0,"soi");
this._startIndicator.tabIndex=0;
this._startContainer=this._getElement(x0,"soc");
this._initStartButtonEventHandling();
}
 if (this._supportsEndOverflow())
{
this._endIndicator=this._getElement(x0,"eoi");
 if (this._endIndicator!=null){
this._endIndicator.tabIndex=0;
this._endContainer=this._getElement(x0,"eoc");
this._initEndButtonEventHandling();
}
}
this._steps=[];
this._firstVisibleStep=0;
this._lastVisibleStep= -1;
}
AdfOverflowSupport.needsOverflow= function(x5)
{
 if(AdfPage.PAGE.isScreenReaderMode())
{
 return false;
}
 var x6=AdfAgent.AGENT.getElementById(x5);
 var x7=Math.max(x6.firstChild.offsetWidth,x6.scrollWidth);
 if (x7>x6.offsetWidth)
{
 return true;
}
 var x8=Math.max(x6.firstChild.offsetHeight,x6.scrollHeight);
 if (x8>x6.offsetHeight)
{
 return true;
}
 return false;
}
AdfOverflowSupport.getOverflowChildComponents= function(x9,x10)
{
 if (!x10)
{
x10= new Array();
}
 var x11=AdfAgent.AGENT;
 var x12=x9.getClientId();
 var x13=AdfRichUIPeer.createSubId(x12,"eoc");
 var x14=AdfRichUIPeer.createSubId(x12,"soc");
 var x15=x11.getElementById(x13);
 if (x15)
{
x11.getDescendantComponentsForNode(x15,x10);
}
 var x16=x11.getElementById(x14);
 if (x16)
{
x11.getDescendantComponentsForNode(x16,x10);
}
 return x10;
}
AdfOverflowSupport.prototype.removeOverflowSupport= function()
{
 if (this._startContainer)
AdfPage.PAGE.removeComponentsInSubtree(this._startContainer);
 if (this._endContainer)
AdfPage.PAGE.removeComponentsInSubtree(this._endContainer);
 delete this._peer;
 delete this._element;
 if (this._supportsStartOverflow())
{
this._removeStartButtonCallbacks();
 delete this._startIndicator;
 delete this._startContainer;
 delete this._startHints;
}
 if (this._supportsEndOverflow())
{
this._removeEndButtonCallbacks();
 delete this._endIndicator;
 delete this._endContainer;
 delete this._endHints;
}
this._removeSteps();
}
AdfOverflowSupport.prototype.createStep= function()
{
 var x17={elements:[],
overflowElements:[],
swapElements:[]};
this._steps.push(x17);
this._lastVisibleStep++;
}
AdfOverflowSupport.prototype.addElement= function(x18)
{
 var x19=this._steps.length - 1;
this._steps[x19].elements.push(x18);
}
AdfOverflowSupport.prototype.addOverflowElement= function(x20)
{
this._steps[this._steps.length - 1].overflowElements.push(x20);
}
AdfOverflowSupport.prototype.createSwapPosition= function(x21)
{
 var x22=this._steps.length - 1;
 var x23=x21.ownerDocument;
 var x24=x23.createElement("a");
x24.style.display="none";
 var x25=x23.createElement("a");
x25.style.display="none";
x21.parentNode.insertBefore(x25,x21);
this._steps[x22].swapElements.push([x21,x25,x24]);
 return x24;
}
AdfOverflowSupport.prototype.handleResize= function()
{
 var x26=3;
 var x27=this._element.offsetWidth + x26;
 var x28=this._element.offsetHeight + x26;
 if (this._type=="both")
{
this._handleResizeTypeBoth(x27,x28);
 return;
}
 var x29;
 var x30=this._steps.length;
 var x31=this._numberOfVisibleSteps();
 if (x31==x30)
{
this._hideOverflowButtons();
x29=this._hasAvailableSpace(x27,x28);
 if (x29)
{
 return;
}
}
this._showOverflowButtons(true);
 if ((this._orientation=="horizontal"&&x27<=50)||
(this._orientation=="vertical"&&x28<=50))
{
this._hideAllSteps();
x29=this._hasAvailableSpace(x27,x28);
}
 else
 {
 if (x29==null)
{
x29=this._hasAvailableSpace(x27,x28);
}
 var x32=(x29)?x31:0;
 var x33=(x29)?x30:x31;
x29=this._binarySearchAdjustSteps(x29,x27,x28,x32,x33);
}
x29=this._showSteps(x27,x28,x29);
 if (this._numberOfVisibleSteps()==x30)
{
 if (x29)
{
this._hideOverflowButtons();
this._closeOverflowPopups();
 return;
}
 else
 {
this._hideOverflowButtons();
x29=this._hasAvailableSpace(x27,x28);
 if (x29)
{
this._closeOverflowPopups();
 return;
}
this._showOverflowButtons(true);
}
}
this._hideSteps(x27,x28,x29);
}
AdfOverflowSupport.prototype.removeAllItemsFromOverflow= function()
{
this._hideOverflowButtons();
this._showAllSteps();
this._closeOverflowPopups();
}
AdfOverflowSupport.prototype._closeOverflowPopups= function()
{
 var x34=this._peer;
 var x35=x34.getComponent();
 if(x34.isPopupVisible(x35,AdfOverflowSupport._POPUP_ID_START))
{
x34.hidePopup(x35,AdfOverflowSupport._POPUP_ID_START);
}
 if(x34.isPopupVisible(x35,AdfOverflowSupport._POPUP_ID_END))
{
x34.hidePopup(x35,AdfOverflowSupport._POPUP_ID_END);
}
}
AdfOverflowSupport.prototype._supportsStartOverflow= function(x36)
{
 return (this._type=="start")||(this._type=="both");
}
AdfOverflowSupport.prototype._supportsEndOverflow= function(x37)
{
 return (this._type=="end")||(this._type=="both");
}
AdfOverflowSupport.prototype._getElement= function(x38,x39)
{
 var x40=AdfRichUIPeer.CreateSubId(x38,x39);
 return AdfAgent.AGENT.getElementById(x40);
}
AdfOverflowSupport.prototype._initStartButtonEventHandling= function()
{
 var x41=AdfAgent.AGENT;
 var x42=this._startIndicator;
 var x43=this._createOverflowPopupHints();
x43[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=x42;
x43[AdfRichPopup.HINT_ALIGN]=(this._position=="before")?
AdfRichPopup["ALIGN_BEFORE_START"]:
AdfRichPopup["ALIGN_AFTER_START"];
this._startHints=x43;
this._startShowCall=this.createCallback(this._startOverflowButtonPressed);
 var x44=this._startShowCall;
x41.addBubbleEventListener(x42,"mousedown",x44);
x41.addBubbleEventListener(x42,"keydown",x44);
this._startButtonMouseUpCall=this.createCallback(this._startOverflowButtonMouseUp);
x41.addBubbleEventListener(x42,"mouseup",this._startButtonMouseUpCall);
this._startButtonMouseOutCall=this.createCallback(this._startOverflowButtonMouseOut);
x41.addBubbleEventListener(x42,"mouseout",this._startButtonMouseOutCall);
}
AdfOverflowSupport.prototype._initEndButtonEventHandling= function()
{
 var x45=AdfAgent.AGENT;
 var x46=this._endIndicator;
 var x47=this._createOverflowPopupHints();
x47[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=this._endIndicator;
x47[AdfRichPopup.HINT_ALIGN]=(this._position=="before")?
AdfRichPopup["ALIGN_BEFORE_END"]:
AdfRichPopup["ALIGN_AFTER_END"];
this._endHints=x47;
this._endShowCall=this.createCallback(this._endOverflowButtonPressed);
 var x48=this._endShowCall;
x45.addBubbleEventListener(x46,"mousedown",x48);
x45.addBubbleEventListener(x46,"keydown",x48);
this._endButtonMouseUpCall=this.createCallback(this._endOverflowButtonMouseUp);
x45.addBubbleEventListener(x46,"mouseup",this._endButtonMouseUpCall);
this._endButtonMouseOutCall=this.createCallback(this._endOverflowButtonMouseOut);
x45.addBubbleEventListener(x46,"mouseout",this._endButtonMouseOutCall);
}
AdfOverflowSupport.prototype._createOverflowPopupHints= function()
{
 var x49= new Object();
x49[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_ALWAYS;
x49[AdfDhtmlPopupWindow.HINT_FOCUS]=true;
x49[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x49[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE]=true;
 return x49;
}
AdfOverflowSupport.prototype._startOverflowButtonPressed= function(x50)
{
 var x51=AdfAgent.AGENT;
 var x52=x50.type;
 var x53=x50.keyCode;
 if (x52=="keydown"&&(x53!=AdfKeyStroke.ENTER_KEY&&
x53!=AdfKeyStroke.ARROWDOWN_KEY))
{
 return;
}
 else if (x52=="mousedown"&&x50.button&&
x50.button!=AdfUIInputEvent.LEFT_BUTTON_FLAG)
{
x51.eatEvent(x50);
 return;
}
 if(this._hideStartContainerCallback==null)
{
this._hideStartContainerCallback=this.createCallback(this._hideStartContainer);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
this._startHints[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER]=this._hideStartContainerCallback;
this._startContainerParent=this._startContainer.parentNode;
}
this._overflowButtonPressed(AdfOverflowSupport._POPUP_ID_START,this._startContainer,this._startHints);
 if (x52=="mousedown")
{
 var x54=x51.getEventTarget(x50);
this._setDepressedStyle(x54,true);
}
x51.eatEvent(x50);
}
AdfOverflowSupport.prototype._startOverflowButtonMouseUp= function(x55)
{
 var x56=AdfAgent.AGENT.getEventTarget(x55);
this._setDepressedStyle(x56,false);
}
AdfOverflowSupport.prototype._startOverflowButtonMouseOut= function(x57)
{
 var x58=AdfAgent.AGENT.getEventTarget(x57);
this._setDepressedStyle(x58,false);
}
AdfOverflowSupport.prototype._endOverflowButtonPressed= function(x59)
{
 var x60=AdfAgent.AGENT;
 var x61=x59.type;
 var x62=x59.keyCode;
 if (x61=="keydown"&&(x62!=AdfKeyStroke.ENTER_KEY&&
x62!=AdfKeyStroke.ARROWDOWN_KEY))
{
 return;
}
 else if (x61=="mousedown"&&x59.button&&
x59.button!=AdfUIInputEvent.LEFT_BUTTON_FLAG)
{
x60.eatEvent(x59);
 return;
}
 if(this._hideEndContainerCallback==null)
{
this._hideEndContainerCallback=this.createCallback(this._hideEndContainer);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
this._endHints[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER]=this._hideEndContainerCallback;
this._endContainerParent=this._endContainer.parentNode;
}
this._overflowButtonPressed(AdfOverflowSupport._POPUP_ID_END,this._endContainer,this._endHints);
 if (x61=="mousedown")
{
 var x63=x60.getEventTarget(x59);
this._setDepressedStyle(x63,true);
}
x60.eatEvent(x59);
}
AdfOverflowSupport.prototype._endOverflowButtonMouseUp= function(x64)
{
 var x65=AdfAgent.AGENT.getEventTarget(x64);
this._setDepressedStyle(x65,false);
}
AdfOverflowSupport.prototype._endOverflowButtonMouseOut= function(x66)
{
 var x67=AdfAgent.AGENT.getEventTarget(x66);
this._setDepressedStyle(x67,false);
}
AdfOverflowSupport.prototype._setDepressedStyle= function(x68,x69)
{
 var x70=AdfOverflowSupport._DEPRESSED_STYLE_CLASS;
 if (x69)
AdfDomUtils.addCSSClassName(x68,x70);
 else
 AdfDomUtils.removeCSSClassName(x68,x70);
}
AdfOverflowSupport.prototype._overflowButtonPressed= function(x71,x72,x73)
{
 var x74=this._peer;
 var x75=this._peer.getComponent();
 if (x74.isPopupVisible(x75,x71))
{
this._peer.hidePopup(x75,x71);
}
 else
 {
this._peer.showPopup(x75,x72,x73,x71);
}
}
AdfOverflowSupport.prototype._hideStartContainer= function()
{
 if (this._startContainer)
{
this._startContainerParent.appendChild(this._startContainer);
}
}
AdfOverflowSupport.prototype._hideEndContainer= function()
{
 if (this._endContainer)
{
this._endContainerParent.appendChild(this._endContainer);
}
}
AdfOverflowSupport.prototype._handleResizeTypeBoth= function(x76,x77)
{
this._hideOverflowButtons();
this._setActiveStep();
 var x78=this._hasAvailableSpace(x76,x77);
x78=this._showSteps(x76,x77,x78);
this._showOverflowButtons();
x78=this._hasAvailableSpace(x76,x77);
while(this._hideSteps(x76,x77,x78))
{
this._showOverflowButtons();
x78=this._hasAvailableSpace(x76,x77);
}
 if (this._numberOfVisibleSteps()==this._steps.length)
{
this._closeOverflowPopups();
}
}
AdfOverflowSupport.prototype._setActiveStep= function()
{
 var x79=this._steps;
for(var x80=0;x80<x79.length;x80++)
{
 var x81=x79[x80];
for(var x82=0;x82<x81.overflowElements.length;x82++)
{
 var x83=x81.overflowElements[x82];
 if (AdfDomUtils.containsCSSClassName(x83.firstChild,"p_AFSelected"))
{
this._activeStep=x80;
 return;
}
}
for(var x84=0;x84<x81.elements.length;x84++)
{
 var x85=x81.elements[x84];
 if (AdfDomUtils.containsCSSClassName(x85,"p_AFSelected"))
{
this._activeStep=x80;
 return;
}
}
}
}
AdfOverflowSupport.prototype._binarySearchAdjustSteps= function(x86,x87,
x88,x89,x90)
{
 var x91=x90 - x89;
 if (x91<=2)
{
 return x86;
}
 var x92=Math.ceil(x91/2);
for(var x93=0;x93<x92;x93++)
{
 if (x86)
{
this._showOneStep();
}
 else
 {
this._hideOneStep();
}
}
x86=this._hasAvailableSpace(x87,x88);
 if (x86)
{
x89=x89 + x92;
}
 else
 {
x90=x90 - x92;
}
 return this._binarySearchAdjustSteps(x86,x87,x88,x89,x90);
}
AdfOverflowSupport.prototype._showSteps= function(x94,x95,x96)
{
while((this._numberOfVisibleSteps()<this._steps.length)&&
(x96||this._isActiveStepInOverflow()))
{
switch(this._type)
{
 case "end":
this._showEndStep();
break;
 case "start":
this._showStartStep();
break;
 case "both":
 var x97=this._activeStep - this._firstVisibleStep;
 var x98=this._numberOfVisibleSteps() - x97 - 1;
 var x99=this._steps.length - 1;
 if ((x97<x98&&this._firstVisibleStep!=0)||(this._lastVisibleStep==x99))
{
this._showStartStep();
}
 else
 {
this._showEndStep();
}
}
x96=this._hasAvailableSpace(x94,x95);
}
 return x96;
}
AdfOverflowSupport.prototype._showAllSteps= function()
{
while(this._numberOfVisibleSteps()<this._steps.length)
{
switch(this._type)
{
 case "end":
this._showEndStep();
break;
 case "start":
this._showStartStep();
break;
 case "both":
 if (this._firstVisibleStep!=0)
{
this._showStartStep();
}
 else
 {
this._showEndStep();
}
}
}
}
AdfOverflowSupport.prototype._hideAllSteps= function()
{
while(this._numberOfVisibleSteps()>0)
{
switch(this._type)
{
 case "end":
this._hideEndStep();
break;
 case "start":
 case "both":
this._hideStartStep();
break;
}
}
}
AdfOverflowSupport.prototype._hideSteps= function(x100,x101,x102)
{
 var x103=false;
while( !x102&&(this._numberOfVisibleSteps()>0))
{
switch(this._type)
{
 case "end":
this._hideEndStep();
break;
 case "start":
this._hideStartStep();
break;
 case "both":
 var x104=this._activeStep - this._firstVisibleStep;
 var x105=this._numberOfVisibleSteps() - x104 - 1;
 if ((x104>=x105)||this._firstVisibleStep== -1)
this._hideStartStep();
 else
 this._hideEndStep();
}
x103=true;
x102=this._hasAvailableSpace(x100,x101);
}
 return x103;
}
AdfOverflowSupport.prototype._isActiveStepInOverflow= function()
{
 var x106=this._type;
 if (x106=="both")
{
 return (this._activeStep<this._firstVisibleStep)||(this._activeStep>this._lastVisibleStep);
}
 else
 {
 return false;
}
}
AdfOverflowSupport.prototype._hasAvailableSpace= function(x107,x108)
{
 var x109=Math.max(this._element.firstChild.offsetWidth,this._element.scrollWidth);
 var x110=AdfAgent.getAgent();
 if (AdfPage.PAGE.getLocaleContext().isRightToLeft()&&
(x110.getPlatform()==AdfAgent.IE_PLATFORM&&x110.getVersion()<8))
{
x109=this._element.scrollWidth;
}
 var x111=Math.max(this._element.firstChild.offsetHeight,this._element.scrollHeight);
 var x112=x109<=x107;
 var x113=x111<=x108;
 return x112&&x113;
}
AdfOverflowSupport.prototype._showOneStep= function()
{
 if (this._type=="end")
{
this._showEndStep();
}
 else if (this._type=="start")
{
this._showStartStep();
}
}
AdfOverflowSupport.prototype._showStartStep= function()
{
 var x114=this._steps[this._firstVisibleStep - 1];
this._showStep(x114,true);
this._firstVisibleStep--;
}
AdfOverflowSupport.prototype._showEndStep= function()
{
 var x115=this._steps[this._lastVisibleStep + 1];
this._showStep(x115);
this._lastVisibleStep++;
}
AdfOverflowSupport.prototype._hideOneStep= function()
{
 if (this._type=="end")
{
this._hideEndStep();
}
 else if (this._type=="start")
{
this._hideStartStep();
}
}
AdfOverflowSupport.prototype._hideStartStep= function()
{
 var x116=this._steps[this._firstVisibleStep];
this._hideStep(x116,true);
this._firstVisibleStep++;
}
AdfOverflowSupport.prototype._hideEndStep= function()
{
 var x117=this._steps[this._lastVisibleStep];
this._hideStep(x117);
this._lastVisibleStep--;
}
AdfOverflowSupport.prototype._showStep= function(x118,x119)
{
this._showElements(x118.elements);
this._hideOverflowElements(x118.overflowElements,x119);
this._swapElements(x118.swapElements,true);
}
AdfOverflowSupport.prototype._hideStep= function(x120,x121)
{
this._hideElements(x120.elements);
this._showOverflowElements(x120.overflowElements,x121);
this._swapElements(x120.swapElements);
}
AdfOverflowSupport.prototype._hideElements= function(x122)
{
 var x123=x122.length;
for(var x124=0;x124<x123;x124++)
{
 var x125=x122[x124];
x125._display=x125.style.display;
x125.style.display="none";
}
}
AdfOverflowSupport.prototype._showElements= function(x126)
{
 var x127=x126.length;
for(var x128=0;x128<x127;x128++)
{
 var x129=x126[x128];
x129.style.display=x129._display||"";
}
}
AdfOverflowSupport.prototype._hideOverflowElements= function(x130,x131)
{
 var x132=x130.length;
for(var x133=0;x133<x132;x133++)
{
 var x134=x130[x133];
x134.parentNode.removeChild(x134);
}
}
AdfOverflowSupport.prototype._showOverflowElements= function(x135,x136)
{
 var x137=x135.length;
 var x138=x136?this._startContainer:this._endContainer;
for(var x139=0;x139<x137;x139++)
{
 var x140=x135[x139];
 if (this._position=="before"||(x136&&(this._orientation=="vertical")))
{
x138.appendChild(x140);
}
 else
 {
x138.insertBefore(x140,x138.firstChild);
}
}
}
AdfOverflowSupport.prototype._swapElements= function(x141,x142)
{
 var x143=x141.length;
for(var x144=0;x144<x143;x144++)
{
 var x145=x141[x144];
 var x146=x145[0];
 var x147=x145[x142?1:2];
x147.parentNode.insertBefore(x146,x147);
}
}
AdfOverflowSupport.prototype._removeStartButtonCallbacks= function()
{
 var x148=AdfAgent.AGENT;
 var x149=this._startIndicator;
x148.removeBubbleEventListener(x149,"mousedown",this._startShowCall);
x148.removeBubbleEventListener(x149,"keydown",this._startShowCall);
x148.removeBubbleEventListener(x149,"mouseup",this._startButtonMouseUpCall);
x148.removeBubbleEventListener(x149,"mouseout",this._startButtonMouseOutCall);
}
AdfOverflowSupport.prototype._removeEndButtonCallbacks= function()
{
 var x150=AdfAgent.AGENT;
 var x151=this._endIndicator;
x150.removeBubbleEventListener(x151,"mousedown",this._endShowCall);
x150.removeBubbleEventListener(x151,"keydown",this._endShowCall);
x150.removeBubbleEventListener(x151,"mouseup",this._endButtonMouseUpCall);
x150.removeBubbleEventListener(x151,"mouseout",this._endButtonMouseOutCall);
}
AdfOverflowSupport.prototype._removeSteps= function()
{
 var x152=this._steps;
while(x152.length>0)
{
 var x153=x152.pop();
AdfCollections.clear(x153.elements);
AdfCollections.clear(x153.overflowElements);
 var x154=x153.swapElements;
while(x154.length>0)
{
 var x155=x154.pop();
AdfCollections.clear(x155);
}
}
}
AdfOverflowSupport.prototype._numberOfVisibleSteps= function()
{
 var x156=this._steps.length;
 var x157=this._firstVisibleStep;
 var x158=x156 - 1;
 var x159=x158 - this._lastVisibleStep
 return x156 - x157 - x159;
}
AdfOverflowSupport.prototype._hideOverflowButtons= function()
{
switch(this._type)
{
 case "end":
AdfDomUtils.removeCSSClassName(this._element,"p_AFEndOverflow");
break;
 case "start":
AdfDomUtils.removeCSSClassName(this._element,"p_AFStartOverflow");
break;
 case "both":
AdfDomUtils.removeCSSClassName(this._element,"p_AFEndOverflow");
AdfDomUtils.removeCSSClassName(this._element,"p_AFStartOverflow");
}
}
AdfOverflowSupport.prototype._showOverflowButtons= function(x160)
{
 if (x160)
{
switch(this._type)
{
 case "end":
AdfDomUtils.addCSSClassName(this._element,"p_AFEndOverflow");
break;
 case "start":
AdfDomUtils.addCSSClassName(this._element,"p_AFStartOverflow");
break;
 case "both":
AdfDomUtils.addCSSClassName(this._element,"p_AFEndOverflow");
AdfDomUtils.addCSSClassName(this._element,"p_AFStartOverflow");
}
 return;
}
 if (this._firstVisibleStep>0&&this._startContainer.childNodes.length>0)
{
AdfDomUtils.addCSSClassName(this._element,"p_AFStartOverflow");
}
 var x161=this._steps.length - 1;
 if (this._lastVisibleStep<x161&&this._endContainer.childNodes.length>0)
{
AdfDomUtils.addCSSClassName(this._element,"p_AFEndOverflow");
}
}

function AdfDhtmlShadowDecorator()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlShadowDecorator);
AdfDhtmlShadowDecorator.prototype.Init= function()
{
AdfDhtmlShadowDecorator.superclass.Init.call(this);
}
AdfDhtmlShadowDecorator.getShadowSize= function()
{
 var x0=AdfDhtmlShadowDecorator._SHADOW_PIXEL_SIZE;
 if (x0==null)
{
 var x1=AdfPage.PAGE.getLookAndFeel();
 var x2=parseInt(x1.getSkinProperty("af|popup-tr-shadow-pixel-size"));
x0=(isNaN(x2))?0:x2;
AdfDhtmlShadowDecorator._SHADOW_PIXEL_SIZE=x0;
}
 return x0;
}
AdfDhtmlShadowDecorator.prototype._create= function(
x3,x4,x5,x6,x7,x8)
{
 if (x5==null)
{
x5=3;}
this._shadowOffsetTop=x5;
 if (x6==null)
{
x6=3;}
this._shadowOffsetLeft=x6;
 if (x8==null)
{
x8=100;}
this._isRelative=x7;
 var x9=AdfDhtmlShadowDecorator.getShadowSize();
 var x10=x9*2;
 var x11=AdfPage.PAGE;
 var x12=AdfAgent.AGENT;
 if (!this._maskFrame)
{
this._maskFrame=x11.createMaskingFrame(x3);
}
 if (!AdfDhtmlShadowDecorator._usesNativeShadows()&& !this._shadeElements)
{
 var x13=x12.getComputedStyle(x3);
this._shadeElements= new Array(x10);
 if ((x13.zIndex==undefined)||
(parseInt(x13.zIndex)<=2))
{
x3.style.zIndex=3;
}
 var x14=x3.ownerDocument;
 var x15=x11.getLocaleContext().isRightToLeft();
 var x16=x7?{x:0,y:0}:x12.getElementPosition(x3);
 var x17=x16.y + x5;
 var x18;
 if (x15)
{
x18=x16.x - (x6 + x9);
}
 else
 {
x18=x16.x + x6;
}
 var x19=x3.offsetWidth,x20=x3.offsetHeight;
 var x21=x4?x4:x14.body;
this._anchorBox={x:x16.x,y:x16.y,offsetWidth:x19,offsetHeight:x20};
 var x22=x14.createElement("div");
AdfDomUtils.addCSSClassName(x22,AdfDhtmlShadowDecorator._SHADOW_STYLE_CLASS);
 var x23=x22.style;
x23.zIndex=parseInt(x13.zIndex) - 1;
x23.position="absolute";
x23.left=x18 + "px";
x23.top=x17 + "px";
x23.width=(x19 + x9) + "px";
x23.height=(x20 + x9) + "px";
x17=0;
x18=(x15)?(x9 + x6):0;
 var x24=(x19 - x6) + "px",
x25=(x20 - x5) + "px";
for(var x26=0;x26<x10;x26++)
{
 var x27=x14.createElement('div');
x23=x27.style;
x23.position="absolute";
x23.left=x18 + "px";
x23.top=x17 + "px";
 if (x26%2==0)
{
 if (x15)
x18--;
 else
 x18++;
}
 else
 {
x17++;
}
x23.width=x24;
x23.height=x25;
x23.backgroundColor="#000000";
x12.setOpacity(x27,Math.floor(x8/(2*x26+4)));
x22.appendChild(x27);
this._shadeElements[x26]=x27;
}
x21.appendChild(x22);
this._shadeContainer=x22;
}
x12.setExpandoProperty(x3,
AdfDhtmlShadowDecorator.SHADOW_ANCHOR_ATTRIBUTE,"true");
}
AdfDhtmlShadowDecorator.prototype._move= function(
x28)
{
 var x29=AdfAgent.AGENT;
 var x30=AdfPage.PAGE;
 var x31=this._maskFrame;
 if (x31)
{
x30.moveMaskingFrame(x28,x31);
}
 if (this._shadeElements)
{
 var x32=this._anchorBox;
 var x33=x28.offsetWidth,x34=x28.offsetHeight;
 var x35=this._isRelative?{x:0,y:0}:x29.getElementPosition(x28);
 if (x32.x==x35.x
&&x32.y==x35.y
&&x32.offsetWidth==x33
&&x32.offsetHeight==x34)
{
 return;
}
this._anchorBox={x:x35.x,y:x35.y,offsetWidth:x33,offsetHeight:x34};
 var x36=x29.getComputedStyle(x28).zIndex - 1;
 var x37=this._shadowOffsetTop,x38=this._shadowOffsetLeft;
 var x39=AdfPage.PAGE.getLocaleContext().isRightToLeft();
 var x40=this._shadeContainer;
 var x41=x40.style;
x41.zIndex=x36;
 var x42=AdfDhtmlShadowDecorator.getShadowSize();
 var x43=x42*2;
 var x44;
 if (x39)
{
x44=x35.x - (x38 + x42);
}
 else
 {
x44=x35.x + x38;
}
x41.left=x44 + "px";
x41.top=(x35.y + x37) + "px";
x41.width=(x33 + x42) + "px";
x41.height=(x34 + x42) + "px";
AdfAssert.assert(((x33 - x38)>0),"Computed shadow width is less than one");
AdfAssert.assert(((x34 - x37)>0),"Computed shadow height is less than one");
 var x45=(x33 - x38) + "px";
 var x46=(x34 - x37)+ "px";
for(var x47=0;x47<x43;x47++)
{
 var x48=this._shadeElements[x47];
x41=x48.style;
x41.width=x45;
x41.height=x46;
}
}
}
AdfDhtmlShadowDecorator.prototype._show= function(
x49,
x50)
{
 if (this._maskFrame)
{
this._maskFrame.style.visibility=x50?"visible":"hidden";
}
 if (this._shadeElements)
{
this._shadeContainer.style.display=x50?"block":"none";
}
}
AdfDhtmlShadowDecorator.prototype._remove= function(
x51)
{
 var x52=this._maskFrame;
 if (x52)
{
AdfPage.PAGE.removeMaskingFrame(x52);
 delete this._maskFrame;
}
 var x53=this._shadeElements;
 if (x53)
{
this._shadeContainer.parentNode.removeChild(this._shadeContainer);
 delete this._shadeElements;
 delete this._shadeContainer;
}
}
AdfDhtmlShadowDecorator.createShadowDecorator= function(x54,x55,x56)
{
 var x57=AdfAgent.AGENT;
 var x58=AdfDhtmlShadowDecorator._getShadowDecorator(x54);
 if (!x58)
{
x58= new AdfDhtmlShadowDecorator();
 var x59=AdfDhtmlShadowDecorator._getShadowOffset();
 var x60=AdfDhtmlShadowDecorator._getShadowStartingBlackPercent();
x58._create(x54,x55,x59,x59,x56,
x60);
x57.setExpandoProperty(x54,
AdfDhtmlShadowDecorator._SHADOW_DECORATOR_ATTRIBUTE,
x58);
}
 return x58;
}
AdfDhtmlShadowDecorator._usesNativeShadows= function()
{
 var x61=AdfAgent.AGENT;
 var x62=(x61.getPlatform()==AdfAgent.WEBKIT_PLATFORM);
 return x62;
}
AdfDhtmlShadowDecorator.moveShadowDecorator= function(
x63)
{
 var x64=AdfDhtmlShadowDecorator._getShadowDecorator(x63);
 if (x64)
{
x64._move(x63);
}
}
AdfDhtmlShadowDecorator.removeShadowDecorator= function(
x65)
{
 var x66=AdfDhtmlShadowDecorator._getShadowDecorator(x65);
 if (x66)
{
x66._remove(x65);
AdfAgent.AGENT.setExpandoProperty(x65,
AdfDhtmlShadowDecorator._SHADOW_DECORATOR_ATTRIBUTE,
undefined);
}
}
AdfDhtmlShadowDecorator.showShadowDecorator= function(
x67,x68)
{
 var x69=AdfDhtmlShadowDecorator._getShadowDecorator(x67);
 if (x69)
{
x69._show(x67,x68);
}
}
AdfDhtmlShadowDecorator.hasShadowDecorator= function(
x70)
{
 var x71=AdfDhtmlShadowDecorator._getShadowDecorator(x70);
 return (undefined!=x71)
}
AdfDhtmlShadowDecorator._getShadowDecorator= function(x72)
{
 return AdfAgent.AGENT.getExpandoProperty(x72,
AdfDhtmlShadowDecorator._SHADOW_DECORATOR_ATTRIBUTE);
}
AdfDhtmlShadowDecorator._getShadowOffset= function()
{
 var x73=AdfDhtmlShadowDecorator._SHADOW_OFFSET;
 if (x73==null)
{
 var x74=AdfPage.PAGE.getLookAndFeel();
 var x75=parseInt(x74.getSkinProperty("af|popup-tr-shadow-offset"));
x73=(isNaN(x75))?3:x75;
AdfDhtmlShadowDecorator._SHADOW_OFFSET=x73;
}
 return x73;
}
AdfDhtmlShadowDecorator._getShadowStartingBlackPercent= function()
{
 var x76=AdfDhtmlShadowDecorator._SHADOW_STARTING_BLACK_PERCENT;
 if (x76==null)
{
 var x77=AdfPage.PAGE.getLookAndFeel();
 var x78=parseInt(x77.getSkinProperty("af|popup-tr-shadow-starting-black-percent"));
x76=(isNaN(x78))?3:x78;
AdfDhtmlShadowDecorator._SHADOW_STARTING_BLACK_PERCENT=x76;
}
 return x76;
}
AdfDhtmlShadowDecorator.setRelative= function(x79,x80)
{
 var x81=AdfDhtmlShadowDecorator._getShadowDecorator(x79);
 if (x81&&x80)
{
x81._isRelative=true;
}
}
AdfDhtmlShadowDecorator.SHADOW_ANCHOR_ATTRIBUTE="_afrShadAnc";
AdfDhtmlShadowDecorator._SHADOW_DECORATOR_ATTRIBUTE="_afrShadDec";

function AdfDhtmlZOrderLayer(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfDhtmlZOrderLayer);
AdfDhtmlZOrderLayer.prototype.Init= function(x0)
{
AdfDhtmlZOrderLayer.superclass.Init.call(this);
this._containerElement=x0;
this._elements= new Array();
this._elementsCount=0;
this.MINIMAL_Z_INDEX=20;
}
AdfDhtmlZOrderLayer.prototype.getContainerElement= function()
{
 return this._containerElement;
}
AdfDhtmlZOrderLayer.prototype.getContainerElementCount= function()
{
 return this._elementsCount;
}
AdfDhtmlZOrderLayer.prototype.getId= function()
{
 return this._containerElement.getAttribute("id");
}
AdfDhtmlZOrderLayer.prototype.addElement= function(x1,x2)
{
this._elementsCount++;
 var x3=this._elements;
 var x4=0;
 if (x2)
{
x4=AdfCollections.indexOf(x3,x2);
 if (x4> -1){
x3.splice(x4,0,x1);
}
 else
 {
x3.push(x1);
x4=x3.length - 1;
}
}
 else
 {
x3.push(x1);
x4=x3.length - 1;
}
for(var x5=x4;x5<x3.length;x5++ )
{
 if (!(x5 in x3))
{
continue;
}
this._updateElement(x5);
}
this._containerElement.appendChild(x1);
}
AdfDhtmlZOrderLayer.prototype.removeElement= function(x6)
{
 var x7=this._elementsCount--;
 var x8=this._elements;
 var x9=AdfCollections.indexOf(x8,x6);
 if (x9> -1)
{
 delete x8[x9];
}
this._containerElement.removeChild(x6);
 if (x7==0)
{
this._elements= new Array();
}
}
AdfDhtmlZOrderLayer.prototype.raiseToFront= function(x10)
{
 var x11=this._elements;
 var x12=AdfCollections.indexOf(x11,x10);
 if (x12> -1)
{
 delete x11[x12];
x11.push(x10);
this._updateElement(x11.length - 1);
}
}
AdfDhtmlZOrderLayer.prototype._updateElement= function(x13)
{
 var x14=this._elements[x13];
 var x15=(x13*2) + this.MINIMAL_Z_INDEX;
x14.style.zIndex=x15;
}
AdfDhtmlZOrderLayer.prototype.visitElements= function(x16)
{
AdfAssert.assertFunction(x16,"no visitor callback");
 var x17=this._elements;
for(var x18=0;x18<x17.length;x18++ )
{
 if (!(x18 in x17))
{
continue;
}
 if (x16(this,x17[x18]))
{
break;
}
}
}

function AdfDhtmlModalityManager()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlModalityManager);
AdfDhtmlModalityManager.prototype.Init= function()
{
AdfDhtmlModalityManager.superclass.Init.call(this);
this._modalElementStack=[];
this._glassPaneStack=[];
}
AdfDhtmlModalityManager.prototype.getElementCount= function()
{
 return this._modalElementStack.length;
}
AdfDhtmlModalityManager.prototype.dispose= function()
{
this._modalElementStack=null;
this._glassPaneStack=null;
}
AdfDhtmlModalityManager.prototype.pushModal= function(x0)
{
AdfAssert.assertDomElement(x0);
 var x1=x0.ownerDocument;
 if (this.isGlassPaneVisible())
{
 var x2=this._glassPaneStack[this._glassPaneStack.length - 1];
x2.style.display="none";
}
 else
 {
 var x3=AdfAgent.AGENT;
 var x4=x3.getDomWindow();
this._setupEventHandler(x3,"_handleResize","resize",true,x4);
}
AdfAssert.assertDomElement(x0.parentNode);
 var x5=x0.parentNode;
 var x6=x5.getAttribute("id");
AdfAssert.assertString(x6);
 var x7=this._createGlassPane();
AdfPage.PAGE.getZOrderManager().addElementToLayer(x7,x6,x0);
AdfPopupScopingUtils.markAsScopingContainer(x7);
this._modalElementStack.push(x0);
this._glassPaneStack.push(x7);
}
AdfDhtmlModalityManager.prototype.popModal= function()
{
 var x8=this._modalElementStack.pop();
 var x9=this._glassPaneStack.pop();
x9.style.width="1px";
x9.style.height="1px";
AdfPage.PAGE.getZOrderManager().removeElement(x9);
 if (this._modalElementStack.length>0)
{
 var x10=this._glassPaneStack[this._glassPaneStack.length - 1];
x10.style.display="block";
}
 else
 {
 var x11=AdfAgent.AGENT;
 var x12=x11.getDomDocument();
 var x13=x11.getDomWindow();
this._setupEventHandler(x11,"_handleResize","resize",false,x13);
}
}
AdfDhtmlModalityManager.prototype._createGlassPane= function()
{
 var x14=AdfAgent.AGENT;
 var x15=AdfPage.PAGE.getDomDocument();
 var x16=x15.createElement("div");
 var x17=x16.style;
 var x18=x14.getDomWindow();
x16.className="AFModalGlassPane";
x17.width=x14.getWindowScrollWidth(x18) + "px";
x17.height=x14.getWindowScrollHeight(x18) + "px";
x14.disableUserSelect(x16);
x16.onkeydown=AdfAgent.eatEventCallback;
x16.onkeyup=AdfAgent.eatEventCallback;
x16.onkeypress=AdfAgent.eatEventCallback;
 return x16;
}
AdfDhtmlModalityManager.prototype._handleResize= function()
{
 var x19=AdfAgent.AGENT;
 var x20=x19.getDomWindow();
for(var x21=0;x21<this._glassPaneStack.length;x21++)
{
 var x22=this._glassPaneStack[x21];
x22.style.width=x19.getWindowScrollWidth(x20) + "px";
x22.style.height=x19.getWindowScrollHeight(x20) + "px";
}
}
AdfDhtmlModalityManager.prototype.getTopGlassPane= function()
{
 if (this.isGlassPaneVisible())
 return this._glassPaneStack[this._glassPaneStack.length - 1];
}
AdfDhtmlModalityManager.prototype._setupEventHandler= function(
x23,
x24,
x25,
x26,
x27)
{
 var x28=x24 + "Stub";
 if(this[x28]==null)
this[x28]=this.createCallback(this[x24]);
 if(x26)
x23.addBubbleEventListener(x27,x25,this[x28]);
 else
 x23.removeBubbleEventListener(x27,x25,this[x28]);
}
AdfDhtmlModalityManager.prototype.isAboveTopGlassPane= function(x29)
{
 var x30= function(x31)
{
 return x29==x31;
}
 return this._traverseAhead(this.getTopGlassPane(),true,x30);
}
AdfDhtmlModalityManager.prototype._traverseAhead= function(x32,x33,x34)
{
 var x35=false;
 if (x32)
{
x35=x35||x34(x32);
x35=x35||this._traverseAhead(x32.firstChild,false,x34);
x35=x35||this._traverseAhead(x32.nextSibling,false,x34);
 if (!x35)
{
 if (x33)
for(var x36=x32.parentNode;x36;x36=x36.parentNode)
{
x35=this._traverseAhead(x36.nextSibling,false,x34);
 if (x35)
{
break;
}
}
}
}
 return x35;
}
AdfDhtmlModalityManager.prototype.isGlassPaneVisible= function()
{
 return (this._glassPaneStack.length>0);
}

function AdfAbstractFloatingElement(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfAbstractFloatingElement);
AdfAbstractFloatingElement.prototype.Init= function(x0)
{
AdfAbstractFloatingElement.superclass.Init.call(this);
this._floatingType=x0;
this._alignElement=null;
this._rootElement=null;
this._shadowAnchor=null;
this._alignPosition=null;
}
AdfAbstractFloatingElement.prototype.setElement= function(x1)
{
this._rootElement=x1;
this.setShadowAnchor(x1);
 var x2=x1.style;
x2.position="absolute";
x2.zIndex=2;AdfPage.PAGE.getZOrderManager().addElementToLayer(x1,this._floatingType);
}
AdfAbstractFloatingElement.prototype.getElement= function()
{
 return this._rootElement;
}
AdfAbstractFloatingElement.prototype.setAlignElement= function(x3)
{
 if (x3&&x3.id)
{
this._alignElementId=x3.id;
 delete this._alignElement;
}
 else
 {
this._alignElement=x3;
 delete this._alignElementId;
}
}
AdfAbstractFloatingElement.prototype.setAlignPosition= function(x4)
{
this._alignPosition=x4;
 delete this._alignElement;
 delete this._alignElementId;
}
AdfAbstractFloatingElement.prototype.getAlignPosition= function()
{
 return this._alignPosition;
}
AdfAbstractFloatingElement.prototype.getAlignElement= function()
{
 var x5=this._alignElementId;
 var x6=this._alignElement;
 if (x5&& !x6)
{
 var x7=AdfAgent.AGENT;
x6=x7.getElementById(x5);
}
 return x6;
}
AdfAbstractFloatingElement.prototype.show= function()
{
this._rootElement.style.display="";
}
AdfAbstractFloatingElement.prototype.hide= function()
{
this._rootElement.style.display="none";
}
AdfAbstractFloatingElement.prototype.cancel= function()
{
this.hide();
}
AdfAbstractFloatingElement.prototype.destroy= function()
{
AdfPage.PAGE.getZOrderManager().removeElement(this._rootElement);
}
AdfAbstractFloatingElement.prototype.getWidth= function()
{
 return this.getElement().offsetWidth;
}
AdfAbstractFloatingElement.prototype.getHeight= function()
{
 return this.getElement().offsetHeight;
}
AdfAbstractFloatingElement.prototype.setShadowAnchor= function(x8)
{
this._shadowAnchor=x8;
}
AdfAbstractFloatingElement.prototype.getShadowAnchor= function()
{
 return this._shadowAnchor;
}
AdfAbstractFloatingElement.prototype.setTop= function(x9)
{
 if (!isNaN(x9))
x9+="px";
this._rootElement.style.top=x9;
 if(AdfDhtmlShadowDecorator.hasShadowDecorator(this.getShadowAnchor()))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(this.getShadowAnchor());
}
}
AdfAbstractFloatingElement.prototype.getTop= function()
{
 return parseInt(this._rootElement.style.top);
}
AdfAbstractFloatingElement.prototype.setLeft= function(x10)
{
 if (!isNaN(x10))
x10+="px";
this._rootElement.style.left=x10;
 if(AdfDhtmlShadowDecorator.hasShadowDecorator(this.getShadowAnchor()))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(this.getShadowAnchor());
}
}
AdfAbstractFloatingElement.prototype.getLeft= function()
{
 return parseInt(this._rootElement.style.left);
}
AdfAbstractFloatingElement.prototype.setPosition= function(x11,x12)
{
 if (!isNaN(x11))
x11+="px";
 if (!isNaN(x12))
x12+="px";
this._rootElement.style.left=x12;
this._rootElement.style.top=x11;
 if(AdfDhtmlShadowDecorator.hasShadowDecorator(this.getShadowAnchor()))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(this.getShadowAnchor());
}
}
AdfAbstractFloatingElement.prototype.raiseToFront= function()
{
AdfPage.PAGE.getZOrderManager().raiseToFront(this._rootElement);
}
AdfAbstractFloatingElement.prototype.CreateTable= function(x13,x14)
{
 var x15=AdfPage.PAGE.getDomDocument();
 var x16=x15.createElement("table");
for(var x17=0;x17<x13;x17++)
{
 var x18=x16.insertRow(x17);
for(var x19=0;x19<x14;x19++)
x18.insertCell(x19);
}
x16.cellPadding=0;
x16.cellSpacing=0;
 return x16;
}
AdfAbstractFloatingElement.prototype.GetFloatingType= function()
{
 return this._floatingType;
}
function AdfRepositionable(x0,x1)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfRepositionable);
AdfRepositionable.InitClass= function()
{
 var x0=this.prototype;
x0.NORMAL=0;
x0.START_DRAGGING=1;
x0.DRAGGING=2;
}
AdfRepositionable.prototype.Init= function(x1,x2)
{
AdfRepositionable.superclass.Init.call(this);
this._floatingElement=x1;
this._handle=x2;
 var x3=AdfAgent.AGENT;
this._mousedownStub=this.createCallback(this._mouseDownHandler);
this._mousemoveStub=this.createCallback(this._mouseMoveHandler);
this._mouseupStub=this.createCallback(this._stopDragging);
x3.addBubbleEventListener(this._handle,'mousedown',this._mousedownStub);
x3.disableUserSelect(x2);
this._originalTopPosition=null;
this._originalLeftPosition=null;
this._mouseStartX=null;
this._mouseStartY=null;
this._state=this.NORMAL;
}
AdfRepositionable.prototype.destroy= function()
{
 var x4=AdfAgent.AGENT;
 var x5=x4.getDomDocument();
x4.removeBubbleEventListener(this._handle,'mousedown',this._mousedownStub);
 if (this._state!=this.NORMAL)
{
x4.removeBubbleEventListener(x5,'mousemove',this._mousemoveStub);
x4.removeBubbleEventListener(x5,'mouseup',this._mouseupStub);
x4.enableUserSelect(x5.body);
 if (x5.body.releaseCapture)
x5.body.releaseCapture();
}
}
AdfRepositionable.prototype.getElement= function()
{
 return this._floatingElement.getElement();
}
AdfRepositionable.prototype._dragStartHandler= function()
{
for(el=AdfAgent.AGENT.getEventTarget(event);el.parentNode;el=el.parentNode)
{
 if(el==this._handle)
{
this._mouseDownHandler();
event.cancelBubble=true;
event.returnValue=false;
}
}
}
AdfRepositionable.prototype._mouseDownHandler= function(x6)
{
 var x7=AdfAgent.AGENT;
x6=x6||x7.getDomWindow().event;
 var x8=x7.getDomDocument();
 if (!x7.isLeftButton(x6))
 return;
this._state=this.START_DRAGGING;
x7.addBubbleEventListener(x8,'mousemove',this._mousemoveStub);
x7.addBubbleEventListener(x8,'mouseup',this._mouseupStub);
x7.preventDefault(x6);
x7.disableUserSelect(x8.body);
 if (x8.body.setCapture)
x8.body.setCapture();
}
AdfRepositionable.prototype._mouseMoveHandler= function(x9)
{
 var x10=AdfAgent.AGENT;
x9=x9||x10.getDomWindow().event;
 if (this._state==this.START_DRAGGING)
{
this._onDragStart.apply(this._floatingElement);
this._state=this.DRAGGING;
this._mouseStartX=x9.clientX;this._mouseStartY=x9.clientY;
this._originalLeftPosition=parseInt(this._floatingElement.getLeft());
this._originalTopPosition=parseInt(this._floatingElement.getTop());
 if(!this._originalLeftPosition)
this._originalLeftPosition=0;
 if(!this._originalTopPosition)
this._originalTopPosition=0;
}
 if (this._state==this.DRAGGING)
{
 var x11=x9.clientX - this._mouseStartX;
 var x12=x9.clientY - this._mouseStartY;
this._move(x11,x12);
}
}
AdfRepositionable.prototype._stopDragging= function()
{
this._originalLeftPosition=null;
this._originalTopPosition=null;
this._mouseStartX=null;
this._mouseStartY=null;
 var x13=AdfAgent.AGENT;
 var x14=x13.getDomDocument();
x13.enableUserSelect(x14.body);
x13.removeBubbleEventListener(x14,'mousemove',this._mousemoveStub);
x13.removeBubbleEventListener(x14,'mouseup',this._mouseupStub);
 if (x14.body.releaseCapture)
x14.body.releaseCapture();
 if (this._state==this.DRAGGING)
{
this._onDragEnd.apply(this._floatingElement);
}
this._state=this.NORMAL;
}
AdfRepositionable.prototype._move= function(x15,x16)
{
 var x17=this._originalLeftPosition + x15;
 var x18=this._originalTopPosition + x16;
 var x19=AdfAgent.AGENT;
 var x20=AdfPage.PAGE.getDomDocument();
 var x21=x20.body;
 var x22=x20.documentElement;
 var x23=(x19.getPlatform()==AdfAgent.IE_PLATFORM);
 var x24=AdfPage.PAGE.getLocaleContext().isRightToLeft();
 var x25=this.getElement();
 var x26=x22.scrollWidth;
 var x27=x22.scrollHeight;
 if(x27==0)
x27=x21.scrollHeight;
 var x28=AdfDhtmlShadowDecorator.getShadowSize();
 var x29=x24?x28:0;
 if(x23&&x24)
{
 var x30=(x22.scrollWidth - x22.clientWidth);
x29-=x30;
x26-=x30;
}
 if(x17>x29)
{
x17=Math.min(x17,x26 - x25.offsetWidth - 2*x28);
}
 else
 {
x17=x29;
}
 if(x18>0)
{
x18=Math.min(x18,x27 - x25.offsetHeight - 2*x28);
}
 else
 {
x18=0;
}
this._floatingElement.setPosition(x18,x17);
this._onDrag();
}
AdfRepositionable.prototype.setDragStartHandler= function(x31)
{
this._onDragStart=x31;
}
AdfRepositionable.prototype.setDragEndHandler= function(x32)
{
this._onDragEnd=x32;
}
AdfRepositionable.prototype.setDragHandler= function(x33)
{
this._onDrag=x33;
}
AdfRepositionable.prototype._onDragStart= function()
{
}
AdfRepositionable.prototype._onDragEnd= function()
{
}
AdfRepositionable.prototype._onDrag= function()
{
}

function AdfDhtmlDialogManager()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlDialogManager);
AdfDhtmlDialogManager.prototype.Init= function()
{
AdfDhtmlDialogManager.superclass.Init.call(this);
this._dialogs=[];
this._activationChain=[];
this._activeDialog=null;
 var x0=AdfAgent.AGENT;
 var x1=x0.getDomDocument(),x2=x1.documentElement;
 var x3=x0.getDomWindow();
this._lastScrollLeft=x2.scrollLeft;
this._lastScrollTop=x2.scrollTop;
this._primaryWindow= new Object();
this._primaryWindow.activate= function()
{
 var x4=this._prevDomElement;
 if (x4)
{
AdfFocusUtils.focusElement(x4);
}
 else
 {
 var x5=AdfDomUtils.getFirstChildElement(AdfAgent.AGENT.getDomDocument());
 var x6=AdfDomUtils.getFirstDescendentElement(x5,"div");
AdfFocusUtils.focusFirstTabStop(x6);
}
}
this._primaryWindow.showAsInActive= function(){};
this._primaryWindow.showAsActive= function(){};
}
AdfDhtmlDialogManager.prototype.getElementCount= function()
{
 return this._dialogs.length;
}
AdfDhtmlDialogManager.prototype.registerDialog= function(x7)
{
this._dialogs[this._dialogs.length]=x7;
 delete this._topDialogNavigation;
}
AdfDhtmlDialogManager.prototype._getTopDialogNavigation= function()
{
 var x8= -1;
 var x9=this._activeDialog;
 var x10=this._topDialogNavigation;
 if (x10)
{
 if (x9){
x8=AdfCollections.indexOf(x10,x9);
}
 return x8;
}
x10=[];
 var x11=this._dialogs;
 var x12=false;
for(var x13=x11.length - 1;x13> -1;x13--)
{
 var x14=x11[x13];
 if (x14.getModal())
{
x12=true;
}
 if (x8== -1&&x9)
{
 if (x14==x9)
{
x8=x10.length;
}
}
x10[x10.length]=x14;
 if (x12)
{
break;
}
}
x10.reverse();
 if (x8> -1)
{
x8=(x10.length - 1) - x8;
}
 if (!x12)
{
x10[x10.length]=this._primaryWindow;
}
this._topDialogNavigation=x10;
 return x8;
}
AdfDhtmlDialogManager.prototype.focusNextModelessDialog= function(x15)
{
 if (x15){
this._primaryWindow._prevDomElement=x15;
}
 var x16=this._getTopDialogNavigation();
 var x17=this._topDialogNavigation;
 var x18=0;
 if (!(x17)||x17.length<=1)
{
 return;
}
 if (x16== -1||(x16 + 1)==x17.length)
{
x18=0;
}
 else
 {
x18=x16 + 1;
}
 var x19=x17[x18];
 if (x19)
{
this.activateDialog(x19);
x19.activate();
}
}
AdfDhtmlDialogManager.prototype.unregisterDialog= function(x20)
{
 var x21=this._activationChain;
 var x22=this._dialogs;
this._getTopDialogNavigation();
AdfCollections.removeArrayValue(x22,x20);
AdfCollections.removeArrayValue(x21,x20);
 if (x20.getModal())
{
 var x23=AdfPage.PAGE;
 var x24=this._topDialogNavigation;
for(var x25=x24.length - 1;x25>0;x25--)
{
 var x26=x24[x25];
 if (x26!=this._primaryWindow)
{
 var x27=x26.getContainedComponentClientId();
 var x28=x23.findComponent(x27);
 if (x28&&(x28 instanceof AdfRichDialog))
{
 var x29=x28.getParent();
 if(x29&&(x29 instanceof AdfRichDocument))
{
 if(x29.getPeer().getMessageDialogId()==x27)
continue;
}
 var x30=x28.getPeer();
x30.bind(x28);
x30.fireCancel();
}
 else
 {
 var x31=x26.getPopupClientId();
 var x32=x23.findComponent(x31);
 if (x32&&x32 instanceof AdfRichPopup)
{
x32.cancel();
}
}
AdfCollections.removeArrayValue(x22,x26);
AdfCollections.removeArrayValue(x21,x26);
}
}
}
 delete this._topDialogNavigation;
 if (this._activeDialog==x20)
{
this._activeDialog=null;
 var x33=x21.length;
 if (x33>=1)
{
 var x34=this._activeDialog=x21[x33-1];
x34.activate();
}
}
}
AdfDhtmlDialogManager.prototype.activateDialog= function(x35)
{
 var x36=this._activeDialog;
 if (x36==x35)
{
 return false;
}
this._getTopDialogNavigation();
 var x37=this._topDialogNavigation;
 if (x37)
{
 var x38=AdfCollections.indexOf(x37,x35);
 if (x38<0)
{
 return false;}
}
 if (x36)
{
this.deactivateCurrentDialog();
}
 if (x35==this._primaryWindow)
{
 return false;
}
this._activeDialog=x35;
 var x39=this._activationChain;
AdfCollections.removeArrayValue(x39,x35);
x39.push(x35);
x35.showAsActive();
 return true;
}
AdfDhtmlDialogManager.prototype.deactivateCurrentDialog= function()
{
 if (!this._activeDialog)
 return;
this._activeDialog.showAsInActive();
this._activeDialog=null;
}
AdfDhtmlDialogManager.getInstance= function()
{
 if(this._theInstance==null)
this._theInstance= new AdfDhtmlDialogManager();
 return this._theInstance;
}
AdfDhtmlDialogManager.prototype.getActiveDialog= function()
{
 return this._activeDialog;
}
function AdfDhtmlPositionManager()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlPositionManager);
AdfDhtmlPositionManager.InitClass= function()
{
this.TOP=0;
this.MIDDLE=1;
this.BOTTOM=2;
this.LEFT=3;
this.CENTER=4;
this.RIGHT=5;
this.MIN_WIDTH=32;
}
AdfDhtmlPositionManager.prototype.Init= function()
{
AdfDhtmlPositionManager.superclass.Init.call(this);
 var x0=AdfLogger.LOGGER;
 if (x0.getLevel(AdfLogger.FINEST))
{
this._logger=x0;
}
this._elements= new Array();
this._isRTL=AdfPage.PAGE.getLocaleContext().isRightToLeft();
}
AdfDhtmlPositionManager.prototype._registerEventHanders= function(){
 var x1=AdfAgent.AGENT;
 var x2=x1.getDomWindow(),x3=x1.getDomDocument();
 var x4=this._repostionOnScrollCallback;
 if (!x4)
{
x4=this._repostionOnScrollCallback=this.createCallback(this._repostionOnScroll);
}
 var x5=x1.getPlatform();
 var x6=(x5==AdfAgent.IE_PLATFORM);
 if (x1.isInlineDialogRepositioningOnScroll())
{
x1.addBubbleEventListener(x3,'mousewheel',x4);
x1.addBubbleEventListener(x2,'scroll',x4);
 if(!x6)
{
x1.addBubbleEventListener(x3,"DOMMouseScroll",x4);
}
}
x1.addBubbleEventListener(x2,'resize',x4);
}
AdfDhtmlPositionManager.prototype._unregisterEventHanders= function()
{
 var x7=AdfAgent.AGENT;
 var x8=x7.getDomWindow(),x9=x7.getDomDocument();
 var x10=this._repostionOnScrollCallback;
 if (!x10)
{
 return;
}
x7.removeBubbleEventListener(x9,'mousewheel',x10);
x7.removeBubbleEventListener(x8,'scroll',x10);
x7.removeBubbleEventListener(x9,"DOMMouseScroll",x10);
x7.removeBubbleEventListener(x8,'resize',x10);
}
AdfDhtmlPositionManager.prototype.getElementCount= function()
{
 var x11=0;
 var x12=this._elements;
for(var x13 in x12)
{
 if (x13)
{
x11++;
}
}
 return x11;
}
AdfDhtmlPositionManager.prototype.dispose= function()
{
this._elements=null;
}
AdfDhtmlPositionManager.prototype.addFloatingElement= function(x14,x15)
{
 if (!(x14.getAlignPosition()))
AdfAssert.assertDomElement(x14.getAlignElement());
 return this._addFloatingElement(x14,x15);
}
AdfDhtmlPositionManager.prototype.addFloatingElementByPosition= function(x16,x17)
{
x16.setAlignPosition(x17);
 var x18=AdfRichPopup.ALIGN_AFTER_START;
 return this._addFloatingElement(x16,x18);
}
AdfDhtmlPositionManager.prototype.calculatePlacementPosition= function(
x19,
x20,
x21,
x22,
x23)
{
 var x24=this._getHintBehavior(x21);
 var x25=x24.horizontalBehavior;
 var x26=x24.verticalBehavior;
 var x27=x24.ignoreShadow;
 var x28={top:0,
right:x20,
bottom:x19,
left:0,
width:x20,
height:x19}
 var x29=this._getAlignBox(x22,x23,x27);
 var x30=this._selectBehavior(x25,x28,x29);
 var x31=this._selectBehavior(x26,x28,x29);
 return this._getNewPosition(x30,x31,x28,x29);
}
AdfDhtmlPositionManager.prototype._addFloatingElement= function(x32,x33)
{
AdfAssert.assertDomElement(x32.getElement());
 if (this.getElementCount()<1)
{
this._registerEventHanders();
}
 var x34=this._getHintBehavior(x33);
 var x35=this._addElement(x32,
x34.verticalBehavior,
x34.horizontalBehavior,
x34.ignoreShadow);
 return x35;
}
AdfDhtmlPositionManager.prototype._getHintBehavior= function(x36)
{
 var x37=AdfDhtmlPositionManager.BOTTOM;
 var x38=AdfDhtmlPositionManager.TOP;
 var x39=this._convertHorizontal("start");
 var x40=this._convertHorizontal("end");
 var x41=false;
 var x42;
 var x43;
switch(x36)
{
 case AdfRichPopup.ALIGN_AFTER_START:x43=[x37,x38];
x42=[x39,x39];
break;
 case AdfRichPopup.ALIGN_AFTER_END:x43=[x37,x38];
x42=[x40,x40];
break;
 case AdfRichPopup.ALIGN_BEFORE_START:x43=[x38,x37];
x42=[x39,x39];
break;
 case AdfRichPopup.ALIGN_BEFORE_END:x43=[x38,x37];
x42=[x40,x40];
break;
 case AdfRichPopup.ALIGN_END_AFTER:x43=[x37,x37];
x42=[x40,x39];
break;
 case AdfRichPopup.ALIGN_END_BEFORE:x43=[x38,x38];
x42=[x40,x39];
break;
 case AdfRichPopup.ALIGN_START_AFTER:x43=[x37,x37];
x42=[x39,x40];
break;
 case AdfRichPopup.ALIGN_START_BEFORE:x43=[x38,x38];
x42=[x39,x40];
break;
 case AdfRichPopup.ALIGN_OVERLAP:
x43=[x38,x38];
x42=[x39,x39];
break;
 case AdfRichPopup.ALIGN_BEFORE_AFTER:
x43=[x38,x37,x38,x37];
x42=[x40,x40,x40,x39];
break;
default:
AdfAssert.assert(false,"Invalid alignmentHint provided");
break;
}
 return {horizontalBehavior:this._getBehavior(x42),
verticalBehavior:this._getBehavior(x43),
ignoreShadow:x41}
}
AdfDhtmlPositionManager.prototype._inversePosition= function(x44)
{
switch(x44)
{
 case AdfDhtmlPositionManager.TOP:
 return AdfDhtmlPositionManager.BOTTOM;
 case AdfDhtmlPositionManager.BOTTOM:
 return AdfDhtmlPositionManager.TOP;
 case AdfDhtmlPositionManager.LEFT:
 return AdfDhtmlPositionManager.RIGHT;
 case AdfDhtmlPositionManager.RIGHT:
 return AdfDhtmlPositionManager.LEFT;
}
}
AdfDhtmlPositionManager.prototype._positionToString= function(x45)
{
switch(x45)
{
 case AdfDhtmlPositionManager.TOP:
 return "Top";
 case AdfDhtmlPositionManager.BOTTOM:
 return "Bottom";
 case AdfDhtmlPositionManager.LEFT:
 return "Left";
 case AdfDhtmlPositionManager.RIGHT:
 return "Right";
}
}
AdfDhtmlPositionManager.prototype._getBehavior= function(x46)
{
 var x47= new Array();
for(var x48=0;x48<x46.length;x48=x48 + 2)
{
 var x49="_prefer"
 + this._positionToString(x46[x48])
 + this._positionToString(x46[x48 + 1])
 + "Condition";
 var x50=this[x49];
 var x51="_prefer"
 + this._positionToString(this._inversePosition(x46[x48]))
 + this._positionToString(this._inversePosition(x46[x48+ 1]))
 + "Condition";
 var x52=this[x51];
x47.splice(0,0,
{
alignElementAnchor:x46[x48],
floatingElementAnchor:x46[x48 + 1],
condition:x52
},
{
alignElementAnchor:this._inversePosition(x46[x48]),
floatingElementAnchor:this._inversePosition(x46[x48 + 1]),
condition:x50
});
}
 return x47;
}
AdfDhtmlPositionManager.prototype._getBox= function(x53,x54)
{
 var x55=AdfAgent.AGENT;
 var x56=x53.getElement();
 var x57=x56.offsetWidth;
 var x58=x56.offsetHeight;
 var x59=x55.getElementPosition(x56);
 var x60=x59.y;
 var x61=x59.x;
 if (x57==0)
{
 var x62=x56.firstChild;
 if (x62)
{
x57=x62.offsetWidth;
x58=x62.offsetHeight;
}
}
 if(!x54)
{
 var x63=AdfDhtmlShadowDecorator.getShadowSize();
x58+=x63;
 if(!this._isRTL)
{
x57+=x63;
}
}
 var x64=
{
top:x60,
right:x61 + x57,
bottom:x60 + x58,
left:x61,
width:x57,
height:x58
}
 return x64;
}
AdfDhtmlPositionManager.prototype._getAlignBox= function(x65,x66,x67)
{
 var x68=AdfAgent.AGENT;
 var x69=AdfDhtmlShadowDecorator.getShadowSize();
 var x70,x71,x72,x73,x74,x75;
 if (x65)
{
 var x76=x68.getElementPosition(x65);
x70=x76.y;
x71=x76.x;
x74=x65.offsetWidth;
x75=x65.offsetHeight;
x72=x70 + x75;
x73=x71 + x74;
 if (!x67&&this._isRTL)
{
x71+=x69;
}
}
 else
 {
x74=0;
x75=0;
 if (x66==null)
{
x72=x70=0;
x73=x71=0;
}
 else
 {
x72=x70=x66.y;
x73=x71=x66.x;
}
}
 var x77=
{
top:x70,
bottom:x72,
left:x71,
right:x73,
width:x74,
height:x75
}
 return x77;
}
AdfDhtmlPositionManager.prototype._preferTopTopCondition=
 function(x78,x79,x80)
{
 var x81=AdfAgent.AGENT;
 var x82=x81.getWindowHeight();
 var x83=x81.getBrowserViewportScrollTop();
 var x84;
 var x85=x79.top + x78.height>x82 + x83;
 var x86=x79.bottom - x78.height<x83;
 var x87= !x85&& !x86;
 if (x80)
{
x84=(!x85&&x86)||x87;
}
 else
 {
x84=(x85&& !x86)||x87;
}
 var x88=this._logger;
 if (x88)
{
x88.logMessage(AdfLogger.FINEST,(x80?"_preferBottomBottomCondition":"_preferTopTopCondition")
 + " belowViewPort=" + x85
 + " aboveViewPort=" + x86
 + " withinViewPort=" + x87
 + " return=" + x84
 + " usedBy=" + (x80?"end_before, start_before, overlap":"end_after, start_after"));
}
 return x84;
}
AdfDhtmlPositionManager.prototype._preferBottomBottomCondition=
 function(x89,x90)
{
 return this._preferTopTopCondition(x89,x90,true);
}
AdfDhtmlPositionManager.prototype._preferBottomTopCondition=
 function(x91,x92,x93)
{
 var x94=AdfAgent.AGENT;
 var x95=x94.getWindowHeight();
 var x96=x94.getBrowserViewportScrollTop();
 var x97;
 var x98=x92.top - x91.height<x96;
 var x99=x92.bottom + x91.height>x95 + x96;
 var x100= !x98&& !x99;
 if (x93)
{
x97=(!x99&&x98)||x100;
}
 else
 {
x97=(x99&& !x98)||x100;
}
 var x101=this._logger;
 if (x101)
{
x101.logMessage(AdfLogger.FINEST,(x93?"_preferTopBottomCondition":"_preferBottomTopCondition")
 + " aboveViewPort=" + x98
 + " belowViewPort=" + x99
 + " withinViewPort=" + x100
 + " return=" + x97
 + " usedBy=" + (x93?"after_start, after_end":"before_start, before_end, before_after"));
}
 return x97;
}
AdfDhtmlPositionManager.prototype._preferTopBottomCondition=
 function(x102,x103)
{
 return this._preferBottomTopCondition(x102,x103,true);
}
AdfDhtmlPositionManager.prototype._preferLeftLeftCondition=
 function(x104,x105,x106)
{
 var x107=AdfAgent.AGENT;
 var x108=x107.getWindowWidth();
 var x109;
 var x110=x107.getBrowserViewportScrollLeft();
 var x111=x105.left + x104.width>x108 + x110;
 var x112=x105.right - x104.width<x110;
 var x113= !x111&& !x112;
 if (x106)
{
x109=(!x111&&x112)||x113;
}
 else
 {
x109=(x111&& !x112)||x113;
}
 var x114=this._logger;
 if (x114)
{
x114.logMessage(AdfLogger.FINEST,(x106?"_preferRightRightCondition":"_preferLeftLeftCondition")
 + " rightOfViewPort=" + x111
 + " leftOfViewPort=" + x112
 + " withinViewPort=" + x113
 + " return=" + x109
 + " usedBy=" + (x106?"after_start, before_start, overlap":"after_end, before_end, before_after"));
}
 return x109;
}
AdfDhtmlPositionManager.prototype._preferRightRightCondition=
 function(x115,x116)
{
 return this._preferLeftLeftCondition(x115,x116,true);
}
AdfDhtmlPositionManager.prototype._preferRightLeftCondition=
 function(x117,x118,x119)
{
 var x120=AdfAgent.AGENT;
 var x121=x120.getWindowWidth();
 var x122;
 var x123=x120.getBrowserViewportScrollLeft();
 var x124=x118.left - x117.width<x123;
 var x125=x118.right + x117.width>=x121 + x123;
 var x126= !x124&& !x125;
 if (x119)
{
x122=(!x125&&x124)||x126;
}
 else
 {
x122=(x125&& !x124)||x126;
}
 var x127=this._logger;
 if (x127)
{
x127.logMessage(AdfLogger.FINEST,(x119?"_preferLeftRightCondition":"_preferRightLeftCondition")
 + " leftOfViewPort=" + x124
 + " rightOfViewPort=" + x125
 + " withinViewPort=" + x126
 + " return=" + x122
 + " usedBy=" + (x119?"end_before, before_after":"start_after, start_before"));
}
 return x122;
}
AdfDhtmlPositionManager.prototype._preferLeftRightCondition=
 function(x128,x129)
{
 return this._preferRightLeftCondition(x128,x129,true);
}
AdfDhtmlPositionManager.prototype._convertHorizontal= function(x130)
{
 if ((x130=="start"&&this._isRTL)
||(x130=="end"&& !this._isRTL))
{
 return AdfDhtmlPositionManager.RIGHT;
}
 else
 {
 return AdfDhtmlPositionManager.LEFT;
}
}
AdfDhtmlPositionManager.prototype._addElement= function(
x131,
x132,
x133,
x134)
{
 var x135=x131.getAlignElement();
 var x136=x135?this.managesElement(x135):false;
 var x137=
{
element:x131,
verticalBehaviors:x132,
horizontalBehaviors:x133,
alignElementIsManaged:x136,
ignoreShadow:x134
};
this._elements.push(x137);
 return this._elements.length - 1;
}
AdfDhtmlPositionManager.prototype.removeElement= function(x138)
{
 delete this._elements[x138];
 if (this.getElementCount()<1)
{
this._unregisterEventHanders();
}
}
AdfDhtmlPositionManager.prototype.managesElement= function(x139)
{
 return AdfPage.PAGE.getZOrderManager().containsElement(x139);
}
AdfDhtmlPositionManager.prototype.validatePosition= function(x140)
{
 var x141=AdfPage.PAGE;
 var x142=x141.getDnDContext();
 if (x142&&x142.isDragging())
{
 return;
}
 var x143=this._elements[x140];
 if(x143!=null)
{
 var x144=x143.element;
 var x145=x144.getAlignElement();
 var x146=x144.getAlignPosition();
 var x147=x143.ignoreShadow;
 var x148=AdfAgent.AGENT,x149=(x148.getPlatform()==AdfAgent.IE_PLATFORM);
 var x150=this._getBox(x144,x147);
 var x151=this._getAlignBox(x145,x146,x147);
 var x152=this._selectBehavior(x143.verticalBehaviors,x150,x151);
 var x153=this._selectBehavior(x143.horizontalBehaviors,x150,x151);
x143._computedBehavior= new Object();
x143._computedBehavior.verticalBehavior=x152;
x143._computedBehavior.horizontalBehavior=x153;
this._positionElement(x144,x143._computedBehavior,x143.alignElementIsManaged,
x150,x151);
}
}
AdfDhtmlPositionManager.prototype._selectBehavior= function(x154,x155,x156)
{
 var x157;
for(var x158=0; !x157&&x158<x154.length;x158++)
{
 if (x154[x158].condition.call(this,x155,x156))
{
x157=x154[x158];
}
}
 if (!x157)
{
x157=x154[0];
}
 return x157;
}
AdfDhtmlPositionManager.prototype.getComputedBehavior= function(x159)
{
 var x160=this._elements[x159];
 if (x160!=null)
 return x160._computedBehavior;
}
AdfDhtmlPositionManager.prototype._positionElement= function(
x161,
x162,
x163,
x164,
x165)
{
 var x166=x162.horizontalBehavior;
 var x167=x162.verticalBehavior;
 var x168=this._getNewPosition(x166,x167,x164,x165);
x161.setPosition(x168.y,x168.x);
}
AdfDhtmlPositionManager.prototype._getNewPosition= function(
x169,
x170,
x171,
x172)
{
 var x173;
 var x174;
switch(x170.alignElementAnchor)
{
 case AdfDhtmlPositionManager.TOP:
x173=x172.top;
break;
 case AdfDhtmlPositionManager.BOTTOM:
x173=x172.bottom;
break;
default:
AdfAssert.assert(false,"Invalid alignElementAnchor for verticalBehavior provided");
break;
}
switch(x169.alignElementAnchor)
{
 case AdfDhtmlPositionManager.LEFT:
x174=x172.left;
break;
 case AdfDhtmlPositionManager.RIGHT:
x174=x172.right;
break;
default:
AdfAssert.assert(false,"Invalid alignElementAnchor for horizontalBehavior provided");
break;
}
 var x175;
 var x176;
switch(x170.floatingElementAnchor)
{
 case AdfDhtmlPositionManager.TOP:
x175=x173;
break;
 case AdfDhtmlPositionManager.BOTTOM:
x175=x173 - x171.height;
break;
default:
AdfAssert.assert(false,"Invalid floatingElementAnchor for verticalBehavior provided");
break;
}
switch(x169.floatingElementAnchor)
{
 case AdfDhtmlPositionManager.LEFT:
x176=x174;
break;
 case AdfDhtmlPositionManager.RIGHT:
x176=x174 - x171.width;
break;
default:
AdfAssert.assert(false,"Invalid floatingElementAnchor for horizontalBehavior provided");
break;
}
 if (AdfPage.PAGE.isPortlet())
{
 var x177=AdfAgent.AGENT;
 var x178=x177.getBrowserViewportScrollTop();
 var x179=x177.getBrowserViewportScrollLeft();
 var x180=x177.getWindowWidth();
 var x181=x177.getWindowHeight();
x175=Math.max(0,x175);
 var x182=(x181 + x178) - (x175 + x171.height);
 if (x182<0)
{
x175=Math.max(x178,x175 + x182);
}
x176=Math.max(0,x176);
 var x183=(x180 + x179) - (x176 + x171.width);
 if (x183<0)
{
x176=Math.max(x179,x176 + x183);
}
}
 return {x:x176,y:x175};
}
AdfDhtmlPositionManager.prototype._repostionOnScroll= function(x184)
{
 var x185=AdfAgent.AGENT
 var x186=x185.getDomWindow();
 if(this._repostionCallback==null)
{
this._repostionCallback=this.createCallback(this._repostionOnScrollTimeout);
}
 if(this._repostionTimeout)
{
x186.clearTimeout(this._repostionTimeout);
}
this._repostionTimeout=x186.setTimeout(this._repostionCallback,200);
}
AdfDhtmlPositionManager.prototype._repostionOnScrollTimeout= function()
{
 delete this._repostionTimeout;
 var x187=this._elements,x188=x187.length;
for(var x189=x188 - 1;x189> -1;x189--)
{
 var x190=x187[x189];
 if(x190!=null)
{
 var x191=x187[x189].element,x192=x191.getAlignElement();
 if(x191.isAnimating())
continue;
 if(x192)
{
 if(this._isOutsideScrollView(x192))
{
 if (x191.ShouldHideOnClip())
{
x191.cancel();
}
}
 else
 this.validatePosition(x189);
}
 else
 {
 var x193=x191.getAlignPosition();
 if (x193&& !this._isFloatingElementGreaterThanWindow(x191))
{
this.validatePosition(x189);
}
}
}
}
}
AdfDhtmlPositionManager.prototype._isFloatingElementGreaterThanWindow= function(x194)
{
 var x195=AdfAgent.AGENT;
 var x196=x194.getWidth();
 var x197=x194.getHeight();
 var x198=x195.getWindowWidth();
 var x199=x195.getWindowHeight();
 return (x196>x198||x197>x199);
}
AdfDhtmlPositionManager.prototype._isOutsideScrollView= function(x200)
{
 var x201=AdfAgent.AGENT;
 var x202=x201.getDomDocument(),x203=x202.body;
 var x204=x200.offsetParent;
 var x205=x200.offsetLeft,x206=x200.offsetTop;
 var x207=x200.offsetWidth,x208=x200.offsetHeight;
 var x209=AdfAgent.getCSSLengthAsInt;
 var x210=(x201.getPlatform()==AdfAgent.IE_PLATFORM);
while(x204&&(x204!=x203))
{
 if(x204.clientHeight>0&&x204.clientWidth>0)
{
 if ((x205<x204.scrollLeft)||
((x205 + x207)>(x204.scrollLeft + x204.clientWidth))||
(x206<x204.scrollTop)||
((x206 + x208)>(x204.scrollTop + x204.clientHeight)))
{
 return true;
}
}
 var x211=x201.getComputedStyle(x204);
x206+=x209(x211.borderTopWidth);
x205+=x209(x211.borderLeftWidth);
 if(!x210)
{
x206+=x209(x211.paddingTop);
x205+=x209(x211.paddingLeft);
}
x205+=x204.offsetLeft - x204.scrollLeft;
x206+=x204.offsetTop - x204.scrollTop;
x204=x204.offsetParent;
}
 return false;
}
AdfDhtmlPositionManager.prototype.resizeFloatingElement= function(x212)
{
 var x213=this.findFloatingElement(x212);
 if (x213&&
 !(x213 instanceof AdfDhtmlTooltip))
{
 var x214=x213.getElement();
 if (AdfDomUtils.isAncestorOrSelf(x214,x212))
{
x213.autoSize();
 return true;
}
}
 return false;
}
AdfDhtmlPositionManager.prototype.findFloatingElement= function(x215)
{
 var x216=this._elements;
for(var x217=0;x217<x216.length;x217++)
{
 if (!(x217 in x216))
{
continue;
}
 var x218=x216[x217];
 if (x218)
{
 var x219=x218.element;
 if (x219)
{
 var x220=x219.getElement();
 if (AdfDomUtils.isAncestorOrSelf(x220,x215))
{
 return x219;
}
}
}
}
 return null;
}

function AdfDhtmlPopupWindowFactory()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlPopupWindowFactory);
AdfDhtmlPopupWindowFactory.createPopup= function(x0)
{
AdfAssert.assert(x0,"Cannot create a new popup element without hints");
 var x1;
 if (x0[AdfDhtmlPopupWindow.HINT_TYPE]==AdfDhtmlPopupWindow.HINT_TYPE_MENU)
x1= new AdfDhtmlPopupMenu();
 else if (x0[AdfDhtmlPopupWindow.HINT_TYPE]==AdfDhtmlPopupWindow.HINT_TYPE_NOTEWINDOW)
x1= new AdfDhtmlNoteWindowPopupSelector(x0[AdfDhtmlPopupWindow.HINT_AUTODISMISS]);
 else if (x0[AdfDhtmlPopupWindow.HINT_TYPE]==AdfDhtmlPopupWindow.HINT_TYPE_DIALOG)
x1= new AdfDhtmlSimpleFloat();
 else if (x0[AdfDhtmlPopupWindow.HINT_TYPE]==AdfDhtmlPopupWindow.HINT_TYPE_INLINESELECTOR)
x1= new AdfDhtmlPopupSelector();
 else if (x0[AdfDhtmlPopupWindow.HINT_TYPE]==AdfDhtmlPopupWindow.HINT_TYPE_LOVCOMBOBOX)
x1= new AdfInputComboboxListOfValuesWindow();
 else if(x0[AdfDhtmlPopupWindow.HINT_AUTODISMISS])x1= new AdfDhtmlPopupSelector();
 else x1= new AdfDhtmlSimpleFloat();
 return x1;
}

function AdfDhtmlPopupWindow()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlPopupWindow,AdfAbstractFloatingElement);
AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT="alignElement";
AdfDhtmlPopupWindow.HINT_MOUSEPOSITION="mousePosition";
AdfDhtmlPopupWindow.HINT_TYPE="type";
AdfDhtmlPopupWindow.HINT_TYPE_MENU="menu";
AdfDhtmlPopupWindow.HINT_TYPE_NOTEWINDOW="noteWindow";
AdfDhtmlPopupWindow.HINT_TYPE_DIALOG="dialogWindow";
AdfDhtmlPopupWindow.HINT_TYPE_INLINESELECTOR="inlineSelector";
AdfDhtmlPopupWindow.HINT_TYPE_LOVCOMBOBOX="lovCombobox";
AdfDhtmlPopupWindow.HINT_TITLE="title";
AdfDhtmlPopupWindow.HINT_FOCUS="focus";
AdfDhtmlPopupWindow.HINT_AUTODISMISS="autodismiss";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_NEVER="autodismissNever";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_ALWAYS="autodismissAlways";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_TIMEOUT="autodismissTimeout";
AdfDhtmlPopupWindow.HINT_LAUNCH_SOURCE_ID="launchId";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU="autodismissMenu";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT="autodismissMouseOut";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT_ID="autodismissMouseOut";
AdfDhtmlPopupWindow.HINT_AUTODISMISS_INACTIVATE="autodismissInactivate";
AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE="closeOnEscape";
AdfDhtmlPopupWindow.HINT_MAX_WIDTH="maxWidth";
AdfDhtmlPopupWindow.HINT_OPENED_HANDLER="openedHandler";
AdfDhtmlPopupWindow.HINT_OPENED_HANDLER_PARAM="openedHandlerParam";
AdfDhtmlPopupWindow.HINT_ALIGN="align";
AdfDhtmlPopupWindow.HINT_MODAL="modal";
AdfDhtmlPopupWindow.HINT_CONTENT="content";
AdfDhtmlPopupWindow.HINT_DRAG_ELEMENT="dragElement";
AdfDhtmlPopupWindow.HINT_LEFT_POSITION="leftPosition";
AdfDhtmlPopupWindow.HINT_TOP_POSITION="topPosition";
AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER="closeHandler";
AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER_PARAM="closeHandlerParam";
AdfDhtmlPopupWindow.HINT_DETACH_DRAG_START_HANDLER="detachDragStartHandler";
AdfDhtmlPopupWindow.HINT_DETACH_DRAG_END_HANDLER="detachDragEndHandler";
AdfDhtmlPopupWindow.HINT_COMPONENT_CLIENT_ID="componentId";
AdfDhtmlPopupWindow.HINT_ANIMATE="animate";
AdfDhtmlPopupWindow.HINT_RESTORE_IMMEDIATE="restoreImmediate"
AdfDhtmlPopupWindow.__CANCELED_EXPANDO="_isCanceled";
AdfDhtmlPopupWindow.__REPLACEDOM_EXPANDO="_isReplaceDom"
AdfDhtmlPopupWindow.InitClass= function()
{
this._SCROLL_POSITION="_afrSclPtn";
}
AdfDhtmlPopupWindow.prototype.Init= function()
{
AdfDhtmlPopupWindow.superclass.Init.call(this,AdfDhtmlZOrderManager.FLOATINGTYPE_WINDOW);
 var x0=this.CreateDomElement();
this.setElement(x0);
x0.style.display="none";
AdfPopupScopingUtils.markAsScopingContainer(x0);
}
AdfDhtmlPopupWindow.prototype.CreateDomElement= function()
{
AdfAssert.failedInAbstractFunction();
}
AdfDhtmlPopupWindow.prototype.ShouldHideOnClip= function()
{
 return true;
}
AdfDhtmlPopupWindow.prototype.show= function(x1)
{
AdfAssert.assertObject(x1,"Cannot show a popup element without hints");
AdfPage.PAGE.__perfTimings(true,true,true,"popup show called");
 var x2=x1[AdfDhtmlPopupWindow.HINT_COMPONENT_CLIENT_ID];
this._componentId=x2;
 var x3=x1[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT];
this.setAlignElement(x3);
 var x4=x1[AdfRichPopup.HINT_ALIGN];
 var x5=x1[AdfDhtmlPopupWindow.HINT_RESTORE_IMMEDIATE];
this._isOpening=true;
this._openedHandler=x1[AdfDhtmlPopupWindow.HINT_OPENED_HANDLER];
this._openedHandlerParam=x1[AdfDhtmlPopupWindow.HINT_OPENED_HANDLER_PARAM];
 var x6=x1[AdfDhtmlPopupWindow.HINT_MOUSEPOSITION];
 var x7=x1[AdfDhtmlPopupWindow.HINT_AUTODISMISS];
 if (x7===true)
x1[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_ALWAYS;
 var x8=x1[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE];
 if (x8==null)
{
x8=true;
}
this._closeOnEscape=x8;
this._launchSourceId=x1[AdfRichPopup.HINT_LAUNCH_ID];
 var x9=x1[AdfDhtmlPopupWindow.HINT_MAX_WIDTH];
 if (x9)
{
AdfAssert.assertNumeric(x9,"AdfDhtmlPopupWindow.HINT_MAX_WIDTH");
this._maxWidth=x9;
}
 var x10=AdfPage.PAGE;
 var x11=x10.findComponent(x2);
 var x12=x10.isScreenReaderMode();
AdfAssert.assert(x11!=null,"Cannot show a popup element without a valid component");
 var x13=x1[AdfDhtmlPopupWindow.HINT_FOCUS];
 if (x13==null)
x13=true;
x13=x13||x12;
 if (x5)
x13=false;
 if(x13)
{
 var x14=x10.getActiveDomElement();
 if(x14)
{
 var x15=x14.id;
 if(!x15)
x15=x14.id=(new Date()).getTime();
this._restoreFocusId=x15;
}
}
this.SetFocusOnOpen(x13);
 var x16=x1[AdfDhtmlPopupWindow.HINT_CONTENT];
 if (x16)
{
 if (this._maxWidth)
{
x16.style.maxWidth=this._maxWidth +"px";
}
x16=x1[AdfDhtmlPopupWindow.HINT_CONTENT]=
this.WrapContent(x1,x16,x12);
this.setContent(x16);
}
 var x17=false;
 if(x10.isAnimationEnabled()&&x1[AdfDhtmlPopupWindow.HINT_ANIMATE])
{
x17=true;
 var x18=this.GetAnimationDurationSkinProperty();
 if(x18)
{
 var x19=parseInt(x10.getLookAndFeel().getSkinProperty(x18));
 if (x19>0)
{
this._animationDuration=x19;
}
}
}
this.setCloseHandler(x1[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER]);
this.setCloseHandlerParam(x1[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER_PARAM]);
this.getElement().style.visibility="hidden";
 if (x4)
{
this.Position(x4);
}
 else if(x6)
{
this._positionAtMousePointer(x6);
}
this._announce("af_popup.STATUS_ENTERING_POPUP");
this.DoShow(x1);
try
{
this.DoResizeNotifyDom(x16);
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e," calling resize notify before popup shown");
}
x10.getAutoDismissalManager().addBehavior(x11,x1);
 var x20=x10.getDomWindow();
 var x21=AdfDhtmlPopupWindow._createFocusPagePropertyKey(x2);
 if (!x5)
{
this._sizeTimeout=x20.setTimeout(this.createCallback(this._size),50);
}
 else
 {
this._sizeTimeout=0;
this._size();
 var x22=x10.getPageProperty(x21);
 if (x22)
{
 var x23=AdfAgent.AGENT.getElementById(x22);
 if (x23&&
AdfDomUtils.isAncestor(x16,x23)&&
AdfFocusUtils.isFocusable(x23))
AdfFocusUtils.focusElement(x23);
}
}
x10.setPageProperty(x21,null);
}
AdfDhtmlPopupWindow.prototype.getPopupClientId= function()
{
 return this._componentId;
}
AdfDhtmlPopupWindow.prototype.OpenedPopup= function()
{
 if (!this._isOpening)
 return;
 delete this._isOpening;
this._registerEventHandlers();
this.FocusOnFirstElement();
 if(!(this._openedHandler))
{
AdfPage.PAGE.__perfTimings(false,false,true,"popup opened; no handler present");
 return;
}
this._openedHandler(this._openedHandlerParam);
 delete this._openedHandler;
 delete this._openedHandlerParam;
AdfPage.PAGE.__perfTimings(false,false,true,"popup opened; handler present");
}
AdfDhtmlPopupWindow.prototype.WrapContent= function(x24,x25,x26)
{
 var x27=AdfPage.PAGE;
 var x28=x27.getDomDocument();
 var x29=x28.createElement("table");
this._resizeAnchorId=x29.id=AdfRichUIPeer.CreateSubId(this._componentId,"" + (new Date()).getTime());
AdfAgent.AGENT.elementsAdded(x29);
x29.cellPadding=x29.cellSpacing=0;
x29.insertRow(0).insertCell(0).appendChild(x25);
x29.style.position="relative";
 if(x26)
{
 var x30=x27.getLookAndFeel();
 var x31=AdfAgent.AGENT;
x29.setAttribute("role","presentation");
x29.setAttribute("datatable","0");
 var x32=x28.createElement("div");
x32.setAttribute("role","dialog");
 var x33=x28.createElement("div");
x33.setAttribute("role","document");
 var x34=this._closeOnEscape;
 var x35=x24[AdfDhtmlPopupWindow.HINT_TYPE]==AdfDhtmlPopupWindow.HINT_TYPE_MENU;
 var x36=x28.createElement("h1");
 var x37=AdfRichUIPeer.CreateSubId(this._componentId,"_lbl");
x32.setAttribute("aria-labelledby",x37);
x36.id=x37;
 var x38=x28.createElement("div");
 var x39=AdfRichUIPeer.CreateSubId(this._componentId,"_dsc");
x32.setAttribute("aria-describedby",x39);
x38.id=x39;
x36.style.cssText="font-size:small";
x38.style.cssText="margin-top: 6px";
 var x40,x41;
 if (x35)
{
 var x42=x24[AdfDhtmlPopupWindow.HINT_TITLE];
 var x43=(x42==null)?"":x42;
x40=x30.getTranslatedString("af_popup.TIP_START_OF_MENU",x43);
x41=(x34?x30.getTranslatedString("af_popup.TIP_END_OF_MENU"):
x30.getTranslatedString("af_popup.TIP_END_OF_MENU_DISABLE_CLOSE_ON_ESCAPE"));
}
 else
 {
x40=x30.getTranslatedString("af_popup.TIP_START_OF_POPUP");
x41=(x34?x30.getTranslatedString("af_popup.TIP_END_OF_POPUP"):
x30.getTranslatedString("af_popup.TIP_END_OF_POPUP_DISABLE_CLOSE_ON_ESCAPE"));
}
x31.setTextContent(x36,x40);
x31.setTextContent(x38,x41);
x32.appendChild(x33);
x33.appendChild(x36);
x33.appendChild(x29);
x33.appendChild(x38);
 return x32;
}
 else
 {
 return x29;
}
}
AdfDhtmlPopupWindow.prototype._registerEventHandlers= function()
{
 var x44=AdfPage.PAGE;
 var x45=x44.getDomDocument();
 var x46=AdfAgent.AGENT;
 var x47=this._keyUpCallback=this.createCallback(this._handleKeyUp);
x46.addBubbleEventListener(x45,"keyup",x47);
 var x48=this._keyDownCallback=this.createCallback(this._handleKeyDown);
x46.addBubbleEventListener(x45,"keydown",x48);
 var x49=this.getElement().firstChild;
 var x50=this._resizeCallback=this.createCallback(this._handleResize);
x46.addResizeListener(this._resizeAnchorId,x50);
}
AdfDhtmlPopupWindow.prototype._handleResize= function()
{
this.autoSize();
 var x51=this.getContent();
this.DoResizeNotifyDom(x51);
 if(this._positionManagerIndex!=null)
AdfPage.PAGE.getPositionManager().validatePosition(this._positionManagerIndex);
}
AdfDhtmlPopupWindow.prototype._unregisterEventHandlers= function()
{
 var x52=AdfPage.PAGE;
 var x53=x52.getDomDocument();
 var x54=AdfAgent.AGENT;
 var x55=this._keyUpCallback;
 if (x55)
{
x54.removeBubbleEventListener(x53,"keyup",x55);
 delete this._keyUpCallback;
}
 var x56=this._keyDownCallback;
 if (x56)
{
x54.removeBubbleEventListener(x53,"keydown",x56);
 delete this._keyDownCallback;
}
 var x57=this._resizeCallback;
 if (x57)
{
 var x58=this.getElement().firstChild;
x54.removeResizeListener(this._resizeAnchorId);
 delete this._resizeAnchorId;
 delete this._resizeCallback;
}
}
AdfDhtmlPopupWindow.prototype._toggleOffAnimating= function(){
 delete this._animating;
}
AdfDhtmlPopupWindow.prototype.hide= function()
{
 if (this._isHiding)
{
 return;
}
this._announce("af_popup.STATUS_EXITING_POPUP");
this._isHiding=true;
 if (this._animating)
{
this._toggleOffAnimating();
 var x59=this.getElement().parentNode;
 if (x59.id!=this.GetFloatingType())
AdfDhtmlPopupWindow._restoreRootPostAnimation(x59);
}
 var x60=AdfPage.PAGE;
 var x61=x60.findComponent(this._componentId);
x60.getAutoDismissalManager().removeBehavior(x61);
 var x62=this._isRestoring(x61);
 if (!x62&&
AdfFocusUtils.containsFocus(this.getElement())&&
 !AdfFocusUtils.isFocusChangePending())
{
this._restoreFocus();
}
 var x63=this._closeHandler;
 if (x63)
{
 delete this._closeHandler;
x63(this._closeHandlerParam);
 delete this._closeHandlerParam;
}
this.destroy();
 delete this._isHiding;
x60.__perfTimings(true,false,true,"popup hidden");
}
AdfDhtmlPopupWindow.prototype._isRestoring= function(x64)
{
 var x65=false;
 if (x64 instanceof AdfRichPopup&&
x64.getAutoCancel()==AdfRichPopup.AUTO_CANCEL_DISABLED)
{
 var x66=AdfDhtmlPopupWindow._createFocusPagePropertyKey(x64.getClientId());
 var x67=page.getPageProperty(x66);
x65=(x67?true:false);
}
 return x65;
}
AdfDhtmlPopupWindow.prototype.cancel= function(x68)
{
 var x69=AdfAgent.AGENT;
 var x70=this._closeHandlerParam;
 var x71=x70.contentDom;
x69.setExpandoProperty(x71,AdfDhtmlPopupWindow.__CANCELED_EXPANDO,true);
x69.setExpandoProperty(x71,AdfDhtmlPopupWindow.__REPLACEDOM_EXPANDO,(x68?true:false));
 if (x68&&
AdfFocusUtils.containsFocus(this.getElement()))
{
 var x72=this.getPopupClientId();
 var x73=AdfDhtmlPopupWindow._createFocusPagePropertyKey(x72);
 var x74=AdfPage.PAGE;
 var x75=x74.getActiveDomElement();
 if (x75&&x75.id)
x74.setPageProperty(x73,x75.id);
}
AdfDhtmlPopupWindow.superclass.cancel.call(this);
}
AdfDhtmlPopupWindow._createFocusPagePropertyKey= function(x76)
{
AdfAssert.assertString(x76);
 var x77=x76.split(":");
 return x77.join("$") + "$restoreFocus";
}
AdfDhtmlPopupWindow.prototype._restoreFocus= function()
{
 var x78=((AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM&&
(this.getElement().getElementsByTagName("textarea").length>0))||
AdfPage.PAGE.isScreenReaderMode());
 var x79= new Object();
 var x80=this.getAlignElement();
 if (AdfFocusUtils.isFocusable(x80,x79))
{
 if (x78)
{
AdfFocusUtils.focusElementDelayed(x80,1000);
}
 else
 {
AdfFocusUtils.focusElement(x80);
}
 return;
}
 var x81=AdfPage.PAGE.getDocument();
 var x82=x81.getElementById(this._restoreFocusId);
 if (x82&&AdfFocusUtils.isFocusable(x82,x79))
{
 if (x78)
{
AdfFocusUtils.focusElementDelayed(x82,1000);
}
 else
 {
AdfFocusUtils.focusElement(x82);
}
 return;
}
 else
 {
x82=this.GetLaunchSourceElement();
 if (x82)
{
 if (AdfFocusUtils.isFocusable(x82,x79))
{
 if (x78)
{
AdfFocusUtils.focusElementDelayed(x82,1000);
}
 else
 {
AdfFocusUtils.focusElement(x82);
}
 return;
}
 else
 {
AdfFocusUtils.focusNextTabStop(x82);
 return;
}
}
}
AdfFocusUtils.focusFirstDocumentTabStop();
}
AdfDhtmlPopupWindow.prototype.GetLaunchSourceElement= function()
{
 var x83=this._launchSourceId;
 return (x83)?AdfAgent.AGENT.getElementById(x83):null;
}
AdfDhtmlPopupWindow.prototype.setContent= function(x84)
{
 var x85=this.GetContentParent();
 if (x85.firstChild)
x85.removeChild(x85.firstChild);
x85.appendChild(x84);
}
AdfDhtmlPopupWindow.prototype.getContent= function()
{
 return this.GetContentParent().firstChild;
}
AdfDhtmlPopupWindow.prototype.GetContentParent= function()
{
AdfAssert.failedInAbstractFunction();
}
AdfDhtmlPopupWindow.prototype.setCloseHandler= function(x86)
{
this._closeHandler=x86;
}
AdfDhtmlPopupWindow.prototype.setCloseHandlerParam= function(x87)
{
this._closeHandlerParam=x87;
}
AdfDhtmlPopupWindow.prototype.isVisible= function()
{
 return this.getElement().style.display!="none";
}
AdfDhtmlPopupWindow.prototype.DoShow= function(x88)
{
AdfDhtmlPopupWindow.superclass.show.call(this);
this.raiseToFront();
 if(this._positionManagerIndex!=null)
AdfPage.PAGE.getPositionManager().validatePosition(this._positionManagerIndex);
}
AdfDhtmlPopupWindow.prototype.CreateShadow= function(x89)
{
 if(!this._animationDuration||x89)
{
AdfDhtmlShadowDecorator.createShadowDecorator(this.getShadowAnchor(),this.getElement().parentNode);
}
}
AdfDhtmlPopupWindow.prototype.destroy= function()
{
 var x90=AdfAgent.AGENT;
 var x91=AdfPage.PAGE;
 var x92=x90.getDomWindow();
this._unregisterEventHandlers();
x90.elementsRemoved(this.getElement());
this._restoreFocusElement=null;
 if(this._sizeTimeout!=null)
{
x92.clearTimeout(this._sizeTimeout);
 delete this._sizeTimeout;
}
 var x93=this.getShadowAnchor();
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x93))
{
AdfDhtmlShadowDecorator.removeShadowDecorator(x93);
}
 if(this._positionManagerIndex!=null)
x91.getPositionManager().removeElement(this._positionManagerIndex);
this.setAlignElement(null);
AdfDhtmlPopupWindow.superclass.destroy.call(this);
}
AdfDhtmlPopupWindow.prototype.isAnimating= function()
{
 return this._animating||this._isOpening
}
AdfDhtmlPopupWindow.prototype.GetPositionManagerIndex= function()
{
 return this._positionManagerIndex;
}
AdfDhtmlPopupWindow.prototype._handleKeyDown= function(x94)
{
 var x95=AdfAgent.AGENT;
 if (x94.keyCode==AdfKeyStroke.TAB_KEY)
{
 var x96=AdfPage.PAGE.getDomDocument();
 var x97=this.getContent();
 var x98=AdfFocusUtils.getFirstTabStop(x97);
 var x99=AdfFocusUtils.getLastTabStop(x97);
 var x100=x95.getEventTarget(x94);
 if (x94.shiftKey)
{
 if (x100==x98)
{
AdfFocusUtils.focusPreviousTabStop(x100,x97);
x95.eatEvent(x94);
}
}
 else
 {
 if (x99==x100)
{
AdfFocusUtils.focusNextTabStop(x100,x97);
x95.eatEvent(x94);
}
}
}
}
AdfDhtmlPopupWindow.prototype._handleKeyUp= function(x101)
{
 var x102=AdfAgent.AGENT;
 var x103=x102.getKeyCode(x101);
 var x104=x102.getEventTarget(x101);
 if (x103==AdfKeyStroke.ESC_KEY)
{
 if(this._closeOnEscape)
{
 var x105=false;
 var x106=this._launchSourceId;
 if (AdfDomUtils.isAncestorOrSelf(this.getElement(),x104))
{
x105=true;
}
 else if (x106)
{
 var x107=x102.getElementById(x106);
 if (x107&&AdfDomUtils.isAncestorOrSelf(x107,x104))
{
x105=true;
}
}
 if (x105)
{
this.HandleEscapeKey(x101);
}
}
}
 if ((x101.ctrlKey)&&(x101.altKey)&&(x103==AdfKeyStroke.W_KEY))
{
 if (AdfDomUtils.isAncestorOrSelf(this.getElement(),x104))
{
this.HandleKeyNavigation(x101);
}
}
}
AdfDhtmlPopupWindow.prototype.HandleEscapeKey= function(x108)
{
this.cancel();
AdfAgent.AGENT.eatEvent(x108);
}
AdfDhtmlPopupWindow.prototype.HandleKeyNavigation= function(x109)
{
}
AdfDhtmlPopupWindow.prototype._size= function()
{
 if(this._sizeTimeout==null)
 return;
 delete this._sizeTimeout;
 var x110=this.getElement(),x111=x110.style;
 var x112=this._maxWidth;
 if (x112)
{
x111.width=Math.min(x110.offsetWidth,x112) +"px";
}
 else
 {
x111.width=x110.offsetWidth +"px";
}
 if(this._positionManagerIndex!=null)
{
AdfPage.PAGE.getPositionManager().validatePosition(this._positionManagerIndex);
}
 var x113=this._animationDuration;
 if(x113>0)
{
this.AnimateOpening(x113);
}
 else
 {
x111.visibility="";
this.CreateShadow();
this.OpenedPopup();
}
}
AdfDhtmlPopupWindow.prototype.AnimateOpening= function(x114)
{
 var x115=this._launchSourceId;
this._animating=true;
 var x116=false,x117=false;
 var x118=this.GetPositionManagerIndex();
 if(x118>=0)
{
 var x119=AdfPage.PAGE.getPositionManager().getComputedBehavior(x118);
 if(x119)
{
x116=(x119.horizontalBehavior.floatingElementAnchor==
AdfDhtmlPositionManager.RIGHT);
x117=(x119.verticalBehavior.floatingElementAnchor==
AdfDhtmlPositionManager.BOTTOM);
}
}
this._animateUsingWrapper(x114,x116,x117);
}
AdfDhtmlPopupWindow.prototype._animateUsingWrapper= function(
x120,
x121,
x122)
{
 var x123=this.getElement();
 var x124=x123.ownerDocument;
 var x125=x124.createElement("div");
 var x126=x125.style;
 var x127=x123.style;
 var x128=x123.offsetHeight;
 var x129=x123.offsetWidth;
 var x130=parseInt(x127.left);
 var x131=parseInt(x127.top);
 if(x121)
x126.left=(x130 + x129 -1) +"px"
 else
 x126.left=x127.left;
 if(x122)
x126.top=(x131 + x128 +1) +"px"
 else
 x126.top=x127.top;
x126.overflow="hidden";
x126.position="absolute";
x126.height="1px";
x126.width="1px";
x127.left=x127.top="0px";
x126.zIndex=x127.zIndex;
x123.parentNode.replaceChild(x125,x123);
x125.appendChild(x123);
x127.visibility="";
 var x132={"height":x128,
"width":x129};
 if(x122)
x132.top=x131;
 if(x121)
x132.left=x130;
AdfPage.PAGE.prepareMaskingFrame();
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_CONSTANT_SPEED,
x120,
[
{
"element":x125,
"properties":x132
}
],
null,
AdfDhtmlPopupWindow._animationComplete,
{wrapper:x125,myself:this});
}
AdfDhtmlPopupWindow._restoreRootPostAnimation= function(x133)
{
 var x134=x133.style;
 var x135=x133.firstChild;
 var x136=x135.style;
x136.left=x134.left;
x136.top=x134.top;
x133.parentNode.replaceChild(x135,x133);
}
AdfDhtmlPopupWindow._animationComplete= function(x137)
{
 var x138=x137.wrapper;
 var x139=x137.myself;
 if(!x139._animating)
 return;
AdfDhtmlPopupWindow._restoreRootPostAnimation(x138);
x139.CreateShadow(true);
x139.OpenedPopup();
 if (AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM)
AdfPage.PAGE.scheduleTimer(x139,x139.createCallback(x139._toggleOffAnimating),null,1);
 else
 x139._toggleOffAnimating();
}
AdfDhtmlPopupWindow.prototype.GetAnimationDuration= function()
{
 return this._animationDuration;
}
AdfDhtmlPopupWindow.prototype.GetAnimationDurationSkinProperty= function()
{
 return null;
}
AdfDhtmlPopupWindow.prototype.autoSize= function()
{
 var x140=this._isOpening;
 if (!this.isVisible()||x140)
{
 return;
}
 var x141=this.getElement(),x142=x141.style;
x142.visibility="hidden";
x142.width="auto";
x142.visibility="visible";
 var x143=this._maxWidth;
 if (x143)
{
x142.width=Math.min(x141.offsetWidth,x143) +"px";
}
 else
 {
x142.width=x141.offsetWidth +"px";
}
 var x144=this.getShadowAnchor();
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x144))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(x144);
AdfDhtmlShadowDecorator.showShadowDecorator(x144,true);
}
}
AdfDhtmlPopupWindow.prototype.FocusOnFirstElement= function()
{
 var x145=this.GetFocusOnOpen();
 if (!(x145))
{
 return;
}
 var x146=this.GetFocusContent();
 var x147=AdfFocusUtils.getFirstTabStop(x146);
 if (!(x147))
{
 var x148=this.getElement();
 if (x148!=x146){
x147=AdfFocusUtils.getFirstTabStop(x148);
}
 if (!(x147))
{
x146.tabIndex=0;
x147=x146;
}
}
 if (x147)
{
 if (!AdfPage.PAGE.isScreenReaderMode())
AdfFocusUtils.focusElement(x147);
 else
 AdfFocusUtils.focusElementDelayed(x147,1000);
}
}
AdfDhtmlPopupWindow.prototype.GetFocusContent= function()
{
 var x149=this.getElement();
 return x149;
}
AdfDhtmlPopupWindow.prototype.Position= function(x150)
{
 var x151=AdfPage.PAGE;
 var x152=x151.getPositionManager();
 var x153=this._positionManagerIndex;
 if (x153)
{
x152.removeElement(x153);
 delete this._positionManagerIndex;
}
this._positionManagerIndex=x152.addFloatingElement(this,x150);
}
AdfDhtmlPopupWindow.prototype._positionAtMousePointer= function(x154)
{
this._positionManagerIndex=
AdfPage.PAGE.getPositionManager().addFloatingElementByPosition(this,x154);
}
AdfDhtmlPopupWindow.prototype.DoResizeNotifyDom= function(x155)
{
AdfPage.PAGE.doResizeNotifyDom(x155,false);
}
AdfDhtmlPopupWindow.prototype.SaveScrollValues= function(x156)
{
 var x157=x156.getElementsByTagName("div");
 var x158=x157.length;
for(var x159=0;x159<x158;x159++)
{
 var x160=x157[x159];
 var x161=x160.scrollTop;
 if (x161>0)
{
x160.setAttribute(AdfDhtmlPopupWindow._SCROLL_POSITION,x161);
}
}
}
AdfDhtmlPopupWindow.prototype.RestoreScrollValues= function(x162)
{
 var x163=x162.getElementsByTagName("div");
 var x164=x163.length;
for(var x165=0;x165<x164;x165++)
{
 var x166=x163[x165];
 var x167=x166.getAttribute(AdfDhtmlPopupWindow._SCROLL_POSITION);
AdfDomUtils.setScrollTop(x166,x167);
}
}
AdfDhtmlPopupWindow.prototype.getLaunchSourceId= function()
{
 return this._launchSourceId;
}
AdfDhtmlPopupWindow.prototype.GetFocusOnOpen= function()
{
 return (this._focusHint?true:false);
}
AdfDhtmlPopupWindow.prototype.SetFocusOnOpen= function(x168)
{
this._focusHint=x168;
}
AdfDhtmlPopupWindow.prototype._announce= function(x169){
 var x170=AdfPage.PAGE;
 var x171=x170.getLookAndFeel().getTranslatedString(x169);
x170.announceToAssistiveTechnology(x171);
}
AdfDhtmlPopupWindow.prototype.GetMaxWidth= function()
{
 return this._maxWidth;
}

function AdfDhtmlSimpleFloat()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlSimpleFloat,AdfDhtmlPopupWindow);
AdfDhtmlSimpleFloat.InitClass= function()
{
this._DRAG_STYLECLASS="p_AFDrag";
this._INACTIVE_STYLECLASS="p_AFInactive";
this._CONTENT_ID="contentContainer";
}
AdfDhtmlSimpleFloat.prototype.Init= function()
{
AdfDhtmlSimpleFloat.superclass.Init.call(this);
}
AdfDhtmlSimpleFloat.prototype.getContainedComponentClientId= function()
{
 return this._containedComponentId;
}
AdfDhtmlSimpleFloat.prototype.GetFocusContent= function()
{
 var x0=this._getContainedComponentPeer();
 var x1=AdfRichUIPeer.CreateSubId(x0.getComponent().getClientId(),AdfDhtmlSimpleFloat._CONTENT_ID);
 var x2=AdfAgent.AGENT.getElementById(x1);
 if (x2&&AdfAgent.AGENT.getPlatform()==AdfAgent.GECKO_PLATFORM)
{
x2.tabIndex= -1;
}
 if (AdfPage.PAGE.isScreenReaderMode())
{
 return AdfDhtmlSimpleFloat.superclass.GetFocusContent.call(this);
}
 if (x2)
{
x2=AdfFocusUtils.getFirstTabStop(x2);
}
 if (!(x2))
{
 if (x0 instanceof AdfDhtmlDialogPeer)
{
x2=x0.getDefaultButtonDom(this.getContainedComponentClientId());
}
 if (!x2)
{
x2=x0.getDomElement();
}
}
 return x2;
}
AdfDhtmlSimpleFloat.prototype.setContent= function(x3)
{
AdfDhtmlSimpleFloat.superclass.setContent.call(this,x3);
 var x4=this._getMainElement(x3);
this.setShadowAnchor(x4);
 var x5=AdfRichUIPeer.getFirstAncestorComponent(x4);
this._containedComponentId=x5.getClientId();
}
AdfDhtmlSimpleFloat.prototype._getMainElement= function(x6)
{
 var x7=x6.getElementsByTagName("table");
 var x8=x7[AdfPage.PAGE.isScreenReaderMode()?1:0];
AdfAssert.assert(x8,"Main Element of floating window must be a table");
 return x8;
}
AdfDhtmlSimpleFloat.prototype.setDragElement= function(x9)
{
this._dragElement=x9;
}
AdfDhtmlSimpleFloat.prototype.getModal= function(x10)
{
 return this._modal;
}
AdfDhtmlSimpleFloat.prototype.setModal= function(x11)
{
this._modal=x11;
}
AdfDhtmlSimpleFloat.prototype.activate= function()
{
this.raiseToFront();
this.showAsActive();
 var x12=this.getShadowAnchor();
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x12))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(x12);
}
 if (AdfPage.PAGE.isScreenReaderMode())
{
this.autoSize();
}
 if (!AdfFocusUtils.containsFocus(this.GetFocusContent())&& !AdfFocusUtils.isFocusChangePending())
{
this.FocusOnFirstElement();
}
}
AdfDhtmlSimpleFloat.prototype.showAsActive= function()
{
 var x13=this._getContainedComponentDomElement();
 var x14=x13.childNodes,x15=x14.length;
for(var x16=0;x16<x15;x16++)
{
 var x17=x14[x16];
 var x18=x17.style;
 if(x17.getAttribute("_afrPanelWindowBackground")!=null)
{
x18.display="none";
}
}
AdfDomUtils.removeCSSClassName(x13,AdfDhtmlSimpleFloat._INACTIVE_STYLECLASS);
this.raiseToFront();
 var x19=this.getShadowAnchor();
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x19))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(x19);
AdfDhtmlShadowDecorator.showShadowDecorator(x19,true);
}
}
AdfDhtmlSimpleFloat.prototype.showAsInActive= function()
{
 var x20=AdfAgent.AGENT;
 var x21=this.getElement();
 var x22=x21.style;
 var x23=x22.zIndex;
 var x24=2;
 var x25=this._getContainedComponentDomElement();
 var x26=x25.offsetWidth;
 var x27=x25.offsetHeight;
 var x28=x25.childNodes,x29=x28.length;
for(var x30=0,x31=0;x30<x29;x30++)
{
 var x32=x28[x30];
 var x33=x32.style;
 if(x32.getAttribute("_afrPanelWindowBackground")!=null)
{
x33.zIndex=x23 - 1;
x33.marginLeft=x31 + "px";
x33.marginTop=3 - x31 + "px";
x33.width=Math.max(0,(x26 - x24) - (2*x31)) + "px";
x33.height=Math.max(0,(x27 - x24) - (2*(3 - x31))) + "px";
x33.display="block";
x31++;
}
 else
 {
x33.zIndex=x23;
}
}
AdfDomUtils.addCSSClassName(x25,AdfDhtmlSimpleFloat._INACTIVE_STYLECLASS);
 var x34=this.getShadowAnchor();
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x34))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(x34);
AdfDhtmlShadowDecorator.showShadowDecorator(x34,true);
}
}
AdfDhtmlSimpleFloat.prototype.CreateDomElement= function()
{
 return AdfPage.PAGE.getDomDocument().createElement("div");
}
AdfDhtmlSimpleFloat.prototype.GetContentParent= function()
{
 return this.getElement();
}
AdfDhtmlSimpleFloat.prototype.GetAnimationDurationSkinProperty= function()
{
 var x35=this._getContainedComponentPeer();
AdfAssert.assertPrototype(x35,AdfRichUIPeer);
 return x35.getAnimationDurationSkinProperty();
}
AdfDhtmlSimpleFloat.prototype.ShouldHideOnClip= function()
{
 return false;
}
AdfDhtmlSimpleFloat.prototype.handleComponentRemoved= function()
{
AdfDhtmlShadowDecorator.removeShadowDecorator(this.getShadowAnchor());
 if (this._repositionable)
{
this._repositionable.destroy();
 delete this._repositionable;
}
}
AdfDhtmlSimpleFloat.prototype.handleBindToComponent= function()
{
 if (this._repositionable)
{
 return;
}
this.setShadowAnchor(this._getMainElement(this.getContent()));
 var x36= !this.isAnimating();
 if (x36)
{
this.CreateShadow(x36);
}
 var x37=AdfPage.PAGE.findComponent(this._containedComponentId);
 if (x37)
{
 var x38=x37.getPeer();
this.setDragElement(x38.getDragElement());
this.initializeRepositionable();
}
}
AdfDhtmlSimpleFloat.prototype.initializeRepositionable= function()
{
 var x39=this._repositionable=
 new AdfRepositionable(this,this._dragElement);
x39.setDragStartHandler(this._dragStartHandler);
x39.setDragEndHandler(this._dragEndHandler);
}
AdfDhtmlSimpleFloat.prototype.HandleEscapeKey= function(x40)
{
 var x41=this._getContainedComponentPeer();
 if(x41&&x41.handleEscapeKey)
{
x41.handleEscapeKey(x40);
}
 else
 {
AdfDhtmlSimpleFloat.superclass.HandleEscapeKey.call(this.event);
}
}
AdfDhtmlSimpleFloat.prototype.DoShow= function(x42)
{
this.setDragElement(x42[AdfDhtmlPopupWindow.HINT_DRAG_ELEMENT]);
this.setModal(x42[AdfDhtmlPopupWindow.HINT_MODAL]);
 var x43=AdfDhtmlDialogManager.getInstance();
x43.registerDialog(this);
 var x44=x42[AdfDhtmlPopupWindow.HINT_LEFT_POSITION];
 if (x44&&isNaN(x44))
x44=parseFloat(x44);
this._leftPercentage=x44;
 var x45=x42[AdfDhtmlPopupWindow.HINT_TOP_POSITION];
 if (x45&&isNaN(x45))
x45=parseFloat(x45);
this._topPercentage=x45;
AdfDhtmlSimpleFloat.superclass.DoShow.call(this,x42);
 if (this._dragElement)
{
this.initializeRepositionable();
}
 if (this._modal)
AdfPage.PAGE.getModalityManager().pushModal(this.getElement());
x43.activateDialog(this);
}
AdfDhtmlSimpleFloat.prototype.destroy= function()
{
AdfDhtmlDialogManager.getInstance().unregisterDialog(this);
 var x46=AdfPage.PAGE;
 if (this._modal)
x46.getModalityManager().popModal(this.getElement());
 if (this._repositionable)
this._repositionable.destroy();
AdfDhtmlSimpleFloat.superclass.destroy.call(this);
}
AdfDhtmlSimpleFloat.prototype._getContainedComponentPeer= function()
{
 var x47=null;
 if (this._containedComponentId!=null)
{
 var x48=AdfPage.PAGE.findComponent(this._containedComponentId);
 if(x48!=null)
{
x47=x48.getPeer();
x47.bind(x48);
}
}
 return x47;
}
AdfDhtmlSimpleFloat.prototype._getContainedComponentDomElement= function()
{
 var x49=this._getContainedComponentPeer();
 if (x49!=null)
{
 return x49.getDomElement();
}
 return null;
}
AdfDhtmlSimpleFloat.prototype._dragStartHandler= function()
{
 var x50=this._getContainedComponentDomElement();
AdfDomUtils.addCSSClassName(x50,
AdfDhtmlSimpleFloat._DRAG_STYLECLASS);
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(this.getShadowAnchor()))
{
AdfDhtmlShadowDecorator.showShadowDecorator(this.getShadowAnchor(),false);
}
this._isDragging=true;
 if (this.getAlignElement())
{
this.setAlignElement(null);
this.Position(AdfRichPopup.ALIGN_OVERLAP);
}
}
AdfDhtmlSimpleFloat.prototype._dragEndHandler= function()
{
 var x51=this._getContainedComponentDomElement();
AdfDomUtils.removeCSSClassName(x51,
AdfDhtmlSimpleFloat._DRAG_STYLECLASS);
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(this.getShadowAnchor()))
{
AdfDhtmlShadowDecorator.showShadowDecorator(this.getShadowAnchor(),true);
}
 delete this._isDragging;
this.setPosition(this.getTop(),this.getLeft());
}
AdfDhtmlSimpleFloat.prototype.handleActivate= function(x52)
{
 var x53=AdfDhtmlDialogManager.getInstance();
 if (x53.getActiveDialog()==this)
{
 return false;
}
 if (x53.activateDialog(this))
{
 if (x52)
{
this.FocusOnFirstElement();
 return true;
}
 return true;
}
 return false;
}
AdfDhtmlSimpleFloat.prototype.isAnimating= function()
{
 if (this._isDragging)
 return true;
 else
 return AdfDhtmlSimpleFloat.superclass.isAnimating.call(this);
}
AdfDhtmlSimpleFloat.prototype.setDragging= function(x54)
{
this._isDragging=x54;
}
AdfDhtmlSimpleFloat.prototype.setShadowVisibility= function(x55)
{
 var x56=this.getShadowAnchor();
 if (x55)
{
 if (!AdfDhtmlShadowDecorator.hasShadowDecorator(x56))
{
AdfDhtmlShadowDecorator.createShadowDecorator(x56,this.getElement().parentNode);
}
}
 else
 {
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x56))
{
AdfDhtmlShadowDecorator.removeShadowDecorator(this.getShadowAnchor());
}
}
}
AdfDhtmlSimpleFloat.prototype.getAlignPosition= function()
{
 if (this.getAlignElement())
 return null;
 var x57=AdfAgent.AGENT;
 var x58=AdfPage.PAGE.getLocaleContext().isRightToLeft();
 var x59=x57.getWindowHeight();
 var x60=x57.getWindowWidth();
 var x61=x57.getBrowserViewportScrollTop();
 var x62=x57.getBrowserViewportScrollLeft();
 if (x61>0&&x57.getPlatform()==AdfAgent.GECKO_PLATFORM)
{
x59=Math.min(x59,x57.getDomDocument().body.clientHeight);
}
 var x63=this.getWidth();
 var x64=this.getHeight();
 var x65=this._topPercentage;
 var x66=this._leftPercentage;
 if (!x66)
x66=0.5;
 if (!x65)
x65=0.5;
 var x67=x58? -1:1;
 var x68=Math.max(0,Math.round((x59*x65) - (x64/2))) + x61;
 var x69=Math.max(0,Math.round((x60*x66) - (x67*(x63/2)))) + (x67*x62);
 var x70=(x59 + x61) - (x68 + x64);
 if (x70<0)
{
x68=Math.max(x61,x68 + x70);
}
 var x71=(x60 + x62) - (x69 + x63);
 if (x71<0)
{
x69=Math.max(x62,x69 + x71);
}
 var x72={y:x68,x:x69};
this.setAlignPosition(x72);
 return x72;
}
AdfDhtmlSimpleFloat.prototype.setPosition= function(x73,x74)
{
 if (this.getAlignElement())
{
AdfDhtmlSimpleFloat.superclass.setPosition.call(this,x73,x74);
 return;
}
 if (!this.isAnimating())
{
 var x75=this.getPopupClientId();
AdfAssert.assertString(x75);
 var x76=AdfPage.PAGE.findComponent(x75);
 if (x76&&x76 instanceof AdfRichPopup)
{
 var x77={};
x77[AdfDhtmlPopupWindow.HINT_LEFT_POSITION]=this._leftPercentage;
x77[AdfDhtmlPopupWindow.HINT_TOP_POSITION]=this._topPercentage;
x77[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_OVERLAP;
x77[AdfRichPopup.HINT_ALIGN_ID]="";
x76.getPeer().syncPrivateProperties(x76,x77);
}
AdfDhtmlSimpleFloat.superclass.setPosition.call(this,x73,x74);
 return;
}
 var x78=AdfAgent.AGENT;
 var x79=x78.getWindowHeight();
 var x80=x78.getWindowWidth();
 var x81=x78.getBrowserViewportScrollTop();
 var x82=x78.getBrowserViewportScrollLeft();
 if (x81>0&&x78.getPlatform()==AdfAgent.GECKO_PLATFORM)
{
x79=Math.min(x79,x78.getDomDocument().body.clientHeight);
}
 var x83=this.getHeight();
 var x84=this.getWidth();
 var x85=0;
 if (x79>x83)
{
x85=(x73 + (x83/2))/(x79 + x81);
}
 var x86=0;
 if (x80>x84)
{
x86=(x74 + (x84/2))/(x80 + x82);
}
 if (!isNaN(x85)&& !isNaN(x86)&&x85<1&&x86<1)
{
 var x87=(x85==0?x81:x73);
 var x88=(x86==0?x82:x74);
this._topPercentage=x85;
this._leftPercentage=x86;
AdfDhtmlSimpleFloat.superclass.setPosition.call(this,x87,x88);
}
}

function AdfDhtmlPopupSelector()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlPopupSelector,AdfDhtmlPopupWindow);
AdfDhtmlPopupSelector.InitClass= function()
{
this._STYLECLASS="AFPopupSelector";
this._HEADER_STYLECLASS="AFPopupSelectorHeader";
this._HEADER_START_STYLECLASS="AFPopupSelectorHeaderStart";
this._HEADER_END_STYLECLASS="AFPopupSelectorHeaderEnd";
this._CONTENT_STYLECLASS="AFPopupSelectorContent";
this._CONTENT_START_STYLECLASS="AFPopupSelectorContentStart";
this._CONTENT_END_STYLECLASS="AFPopupSelectorContentEnd";
this._FOOTER_STYLECLASS="AFPopupSelectorFooter";
this._FOOTER_START_STYLECLASS="AFPopupSelectorFooterStart";
this._FOOTER_END_STYLECLASS="AFPopupSelectorFooterEnd";
}
AdfDhtmlPopupSelector.prototype.Init= function()
{
AdfDhtmlPopupSelector.superclass.Init.call(this);
}
AdfDhtmlPopupSelector.prototype.CreateDomElement= function()
{
 var x0=AdfPage.PAGE;
 var x1=x0.getDomDocument();
 var x2=x1.createElement("div");
 var x3=x0.getLookAndFeel();
 var x4=this.CreateTable(3,3);
x4.cellPadding=0;
x4.cellSpacing=0;
x2.appendChild(x4);
 var x5=x4.getElementsByTagName("td");
x5[1].innerHTML="&#160;";
 if (this.NeedsCloseLink())
{
 var x6=x3.getTranslatedString("af_panelWindow.TIP_CLOSE");
x5[1].innerHTML=
"<a href=\"javascript:;\" style=\"font-size: 11px;\" onclick=\"AdfPage.PAGE.getAutoDismissalManager().dismiss(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)\">" +
 x6 +
 "</a>";
}
x5[3].innerHTML="&#160;";
x5[5].innerHTML="&#160;";
x5[7].innerHTML="&#160;";
this.SetContentParent(x5[4]);
 var x7=AdfDhtmlPopupSelector;
 var x8=AdfDhtmlPopupSelector;
AdfDomUtils.addCSSClassName(x2,x3.getStyleClass(x7._STYLECLASS));
AdfDomUtils.addCSSClassName(x5[0],x3.getStyleClass(x8._HEADER_START_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[1],x3.getStyleClass(x8._HEADER_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[2],x3.getStyleClass(x8._HEADER_END_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[3],x3.getStyleClass(x8._CONTENT_START_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[4],x3.getStyleClass(x8._CONTENT_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[5],x3.getStyleClass(x8._CONTENT_END_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[6],x3.getStyleClass(x8._FOOTER_START_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[7],x3.getStyleClass(x8._FOOTER_STYLECLASS));
AdfDomUtils.addCSSClassName(x5[8],x3.getStyleClass(x8._FOOTER_END_STYLECLASS));
 return x2;
}
AdfDhtmlPopupSelector.prototype.NeedsCloseLink= function()
{
 var x9=navigator.userAgent.toLowerCase();
 return (x9.indexOf("webkit")!= -1&&x9.indexOf("mobile")!= -1);
}
AdfDhtmlPopupSelector.prototype.SetContentParent= function(
x10)
{
this._contentElement=x10;
}
AdfDhtmlPopupSelector.prototype.GetContentParent= function()
{
 return this._contentElement;
}
AdfDhtmlPopupSelector.prototype.GetAnimationDurationSkinProperty= function()
{
 return ".AFPopupSelector-tr-open-animation-duration";
}
AdfDhtmlPopupSelector.prototype.show= function(x11)
{
 if (x11&&x11[AdfDhtmlPopupWindow.HINT_ALIGN]&& !x11[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT])
{
 var x12=x11[AdfRichPopup.HINT_LAUNCH_ID];
 if (x12)
{
x11[AdfRichPopup.HINT_ALIGN_ID]=x12;
x11[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=AdfAgent.AGENT.getElementById(x12);
}
}
 if (x11&&x11[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]&& !x11[AdfDhtmlPopupWindow.HINT_ALIGN])
{
x11[AdfDhtmlPopupWindow.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START;
}
AdfDhtmlPopupSelector.superclass.show.call(this,x11);
}

function AdfInputComboboxListOfValuesWindow()
{
this.Init();
}
AdfObject.createSubclass(AdfInputComboboxListOfValuesWindow,AdfDhtmlPopupSelector);
AdfInputComboboxListOfValuesWindow.InitClass= function()
{
this._STYLECLASS="af|inputComboboxListOfValues::dropdown-popup";
this._CONTENT_STYLECLASS="af|inputComboboxListOfValues::dropdown-popup-content";
this._DROPDOWN_CONTENT_ID="_afrDropDownContent";
this._POPUP_SEARCH_SUBID="_afrPopupSearch";
this._STRETCH_DROPDOWN_TABLE="af|inputComboboxListOfValues-tr-stretch-dropdown-table";
}
AdfInputComboboxListOfValuesWindow.prototype.CreateDomElement= function()
{
 var x0=AdfPage.PAGE;
 var x1=x0.getLookAndFeel();
 var x2=x0.getDomDocument();
 var x3=x2.createElement("div");
AdfDomUtils.addCSSClassName(x3,x1.getStyleClass(AdfInputComboboxListOfValuesWindow._STYLECLASS));
 var x4=x2.createElement("div");
AdfDomUtils.addCSSClassName(x4,x1.getStyleClass(AdfInputComboboxListOfValuesWindow._CONTENT_STYLECLASS));
x3.appendChild(x4);
this.SetContentParent(x4);
 return x3;
}
AdfInputComboboxListOfValuesWindow.prototype.DoShow= function(x5)
{
AdfInputComboboxListOfValuesWindow.superclass.DoShow.call(this,x5);
 var x6=AdfAgent.AGENT;
 var x7;
 var x8=x7=x5[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT];
AdfAssert.assertDomNode(x8,"input combobox list of values popup alignment element");
 if (x8.tagName=="INPUT")
{
x7=x8.parentNode;
}
AdfAssert.assertDomElement(x7,"SPAN");
 var x9=Math.max(100,x7.offsetWidth - 2);
 var x10=this.getPopupClientId();
AdfAssert.assertString(x10,"input combobox list of values popup client id");
 var x11=AdfRichUIPeer.CreateSubId(x10,AdfInputComboboxListOfValuesWindow._DROPDOWN_CONTENT_ID);
 var x12=AdfPage.PAGE.findComponent(x11);
 if (x12)
{
 var x13=
AdfPage.PAGE.getLookAndFeel().getSkinProperty(
AdfInputComboboxListOfValuesWindow._STRETCH_DROPDOWN_TABLE);
AdfAssert.assertPrototype(x12,AdfUIComponent); if (x13&&"true"==x13)
x12.getPeer().setInlineStyleProperty(x12,"min-width",x9 + "px");
 else
 x12.getPeer().setInlineStyleProperty(x12,"width",x9 + "px");
}
 else
 {
 var x14=AdfRichUIPeer.CreateSubId(x10,AdfInputComboboxListOfValuesWindow._POPUP_SEARCH_SUBID);
 var x15=AdfPage.PAGE.findComponent(x14);
 if (x15)
{
AdfAssert.assertPrototype(x15,AdfUIComponent);x15.getPeer().setInlineStyleProperty(x15,"width",x9 + "px");
}
}
}
AdfInputComboboxListOfValuesWindow.prototype.ShouldHideOnClip= function()
{
 return false;
}
function AdfDhtmlNoteWindowPopupSelector(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfDhtmlNoteWindowPopupSelector,
AdfDhtmlPopupSelector);
AdfDhtmlNoteWindowPopupSelector.InitClass= function()
{
this._STYLE_CLASS="AFNoteWindow";
this._RIGHT_STYLE_CLASS="AFNoteWindowRight";
this._CONE_STYLE_CLASS="AFNoteWindowCone";
this._CONE_STYLE_CLASS_TR="AFNoteWindowConeTR";
this._CONE_STYLE_CLASS_BR="AFNoteWindowConeBR";
this._CONE_STYLE_CLASS_BL="AFNoteWindowConeBL";
this._CONE_BORDER_STYLE_CLASS="AFNoteWindowConeBorder";
this._CONE_BORDER_RIGHT_STYLE_CLASS="AFNoteWindowConeBorderRight";
this._CONTENT_STYLE_CLASS="AFNoteWindowContent";
}
AdfDhtmlNoteWindowPopupSelector.prototype.Init= function(x0)
{
AdfDhtmlNoteWindowPopupSelector.superclass.Init.call(this);
this._autoDismissType=x0;
this.setShadowAnchor(this.GetContentParent());
}
AdfDhtmlNoteWindowPopupSelector.prototype.show= function(x1)
{
 if (x1&& !x1[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT])
{
 var x2=x1[AdfRichPopup.HINT_LAUNCH_ID];
 if (x2)
{
x1[AdfRichPopup.HINT_ALIGN_ID]=x2;
x1[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=AdfAgent.AGENT.getElementById(x2);
}
}
AdfDhtmlNoteWindowPopupSelector.superclass.show.call(this,x1);
}
AdfDhtmlNoteWindowPopupSelector.createTextDom= function(
x3)
{
 var x4=null;
 if ((x3.indexOf("<html>")==0)&&
(x3.lastIndexOf("</html>")==(x3.length - 7)))
{
x4=AdfDomUtils.cleanHtml(
AdfPage.PAGE.getDocument(),x3.substring(6,x3.length - 7));
}
 else
 {
x4=AdfPage.PAGE.getDocument().createElement("div");
AdfAgent.AGENT.setTextContent(x4,x3);
}
 return x4;
}
AdfDhtmlNoteWindowPopupSelector.prototype.CreateDomElement= function()
{
 var x5=AdfPage.PAGE.getDomDocument();
 var x6=x5.createElement("div");
 var x7=this.CreateTable(1,3);
x6.appendChild(x7);
 var x8=x7.rows[0].cells,x9=x8[0],x10=x8[2];
x9.onclick=x10.onclick=this.createCallback(this._onClickConeCell);
 if(this._autoDismissType==AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT)
{
x9.onmouseover=x10.onmouseover=this.createCallback(this._onMouseOverConeCell);
x9.onmouseout=x10.onmouseout=this.createCallback(this._onMouseOutConeCell);
}
 var x11=x8[1];
 if (this.NeedsCloseLink())
{
 var x12=x5.createElement("div");
x8[1].appendChild(x12);
 var x13=page.getLookAndFeel();
 var x14=x13.getTranslatedString("af_panelWindow.TIP_CLOSE");
x12.innerHTML=
"<a href=\"javascript:;\" style=\"font-size: 11px;\" onclick=\"AdfPage.PAGE.getAutoDismissalManager().dismiss(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)\">" +
 x14 +
 "</a>";
x12=x5.createElement("div");
x8[1].appendChild(x12);
x11=x12;}
x8[1].className=AdfDhtmlNoteWindowPopupSelector._STYLE_CLASS;
this._coneElement=x5.createElement("div");
this.SetContentParent(x11);
 return x6;
}
AdfDhtmlNoteWindowPopupSelector.prototype.GetAnimationDurationSkinProperty= function()
{
 return ".AFNoteWindow-tr-open-animation-duration";
}
AdfDhtmlNoteWindowPopupSelector.prototype.setPosition= function(x15,x16)
{
 var x17=this.GetPositionManagerIndex();
 if(x17>=0)
{
 var x18=AdfPage.PAGE.getPositionManager().getComputedBehavior(x17);
 if(x18)
{
 var x19=x18.verticalBehavior.floatingElementAnchor;
 var x20=x18.horizontalBehavior.floatingElementAnchor;
 var x21=this.GetContentParent();
 var x22=x21.parentNode.parentNode.parentNode;
 if (x22.tagName=="TABLE")
{
x22=x22.rows[0].cells;
}
 else
 {
x22=x22.parentNode.rows[0].cells;
}
 var x23=x22[1];
 var x24=x20==AdfDhtmlPositionManager.RIGHT,
x25=x19==AdfDhtmlPositionManager.BOTTOM;
 var x26=0,x27=2;
 if(!AdfPage.PAGE.getLocaleContext().isRightToLeft())
{
x26=x22[0];
x27=x22[2];
}
 else
 {
x26=x22[2];
x27=x22[0];
}
 if(x24)
{
x26.className="";
x26.innerHTML="&#160;";
x23.className=AdfDhtmlNoteWindowPopupSelector._RIGHT_STYLE_CLASS;
x27.className=AdfDhtmlNoteWindowPopupSelector._CONE_BORDER_RIGHT_STYLE_CLASS;
x27.style.verticalAlign=x25?"bottom":"top";
this._coneElement.className=x25?
AdfDhtmlNoteWindowPopupSelector._CONE_STYLE_CLASS_BR:
AdfDhtmlNoteWindowPopupSelector._CONE_STYLE_CLASS_TR;
x27.appendChild(this._coneElement);
}
 else
 {
x27.className="";
x27.innerHTML="&#160;";
x23.className=AdfDhtmlNoteWindowPopupSelector._STYLE_CLASS;
x26.className=AdfDhtmlNoteWindowPopupSelector._CONE_BORDER_STYLE_CLASS;
x26.style.verticalAlign=x25?"bottom":"top";
this._coneElement.className=x25?
AdfDhtmlNoteWindowPopupSelector._CONE_STYLE_CLASS_BL:
AdfDhtmlNoteWindowPopupSelector._CONE_STYLE_CLASS;
x26.appendChild(this._coneElement);
}
}
}
AdfDhtmlNoteWindowPopupSelector.superclass.setPosition.call(this,x15,x16);
}
AdfDhtmlNoteWindowPopupSelector.prototype._onClickConeCell= function(x28)
{
 var x29=AdfAgent.AGENT;
x28=x28||x29.getDomWindow().event;
 var x30=x29.getMousePosition(x28);
AdfPage.PAGE.getAutoDismissalManager().dismiss(
this.getElement().parentNode);
 var x31=x29.elementFromPagePoint(x30.x,x30.y);
 if(x31)
{
 var x32=x29.copyEvent(x28);
x29.dispatchEvent(x31,x32);
 if(x31.focus!=null)
AdfFocusUtils.focusElement(x31);
x29.eatEvent(x28);
}
}
AdfDhtmlNoteWindowPopupSelector.prototype._onMouseOverConeCell= function(x33)
{
 if(!this._onMOConeCellTimeoutCallback)
this._onMOConeCellTimeoutCallback=this.createCallback(this._onMOConeCellTimeout);
 var x34=AdfPage.PAGE.getDomWindow();
 if(this._mouseOverTimeout)
x34.clearTimeout(this._mouseOverTimeout);
this._mouseOverTimeout=x34.setTimeout(this._onMOConeCellTimeoutCallback,500);
}
AdfDhtmlNoteWindowPopupSelector.prototype._onMOConeCellTimeout= function()
{
 delete this._mouseOverTimeout;
AdfPage.PAGE.getAutoDismissalManager().dismiss(this.getElement().parentNode);
}
AdfDhtmlNoteWindowPopupSelector.prototype._onMouseOutConeCell= function(x35)
{
 var x36=AdfPage.PAGE.getDomWindow();
 if(this._mouseOverTimeout)
{
x36.clearTimeout(this._mouseOverTimeout);
 delete this._mouseOverTimeout;
}
}
AdfDhtmlNoteWindowPopupSelector.prototype.activate= function()
{
 var x37=this.GetFocusOnOpen();
this.SetFocusOnOpen(true);
this.FocusOnFirstElement();
this.SetFocusOnOpen(x37);
}
AdfDhtmlNoteWindowPopupSelector.prototype.HandleKeyNavigation= function(x38)
{
 var x39=this.getLaunchSourceId();
 if (x39)
{
 var x40=AdfAgent.AGENT;
 var x41=AdfPage.PAGE;
 var x42=x41.findComponent(x39);
 if (x42)
{
x42.focus();
x40.eatEvent(x38);
}
}
}
AdfDhtmlNoteWindowPopupSelector.prototype.autoSize= function()
{
AdfDhtmlNoteWindowPopupSelector.superclass.autoSize.call(this);
 var x43=this.GetMaxWidth();
 if (x43&&this.getWidth()>=x43)
{
 var x44=this.getContent();
 var x45=AdfDomUtils.getFirstElementMatch(x44,false,AdfDhtmlNoteWindowPopupSelector._match);
 if (x45)
{
 var x46=x45.style;
x46.overflow="hidden";
 var x47=AdfAgent.AGENT;
 var x48=this._coneElement;
 if (x47.getPlatform()==AdfAgent.IE_PLATFORM&&x48)
{
 var x49=x43 - x48.offsetWidth;
x46.width=x49 + "px";
}
}
}
}
AdfDhtmlNoteWindowPopupSelector._match= function(x50)
{
 var x51=x50.tagName;
 if (x51=="DIV"&&
AdfDomUtils.containsCSSClassName(x50,AdfDhtmlNoteWindowPopupSelector._CONTENT_STYLE_CLASS))
 return true;
 return false;
}

function AdfDhtmlPopupMenu()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlPopupMenu,AdfDhtmlPopupWindow);
AdfDhtmlPopupMenu.InitClass= function()
{
AdfDhtmlPopupMenu._POPUP_STYLE_CLASS="AFPopupMenuPopup";
AdfDhtmlPopupMenu._CONTENT_STYLE_CLASS="AFPopupMenuContent";
}
AdfDhtmlPopupMenu.prototype.Init= function()
{
AdfDhtmlPopupMenu.superclass.Init.call(this);
this.setShadowAnchor(this._mainElement);
}
AdfDhtmlPopupMenu.prototype.CreateDomElement= function()
{
 var x0=AdfPage.PAGE.getDomDocument();
 var x1=x0.createElement("div");
 var x2=x0.createElement("div");
 var x3=x0.createElement("div");
AdfDomUtils.addCSSClassName(x2,AdfDhtmlPopupMenu._POPUP_STYLE_CLASS);
AdfDomUtils.addCSSClassName(x3,AdfDhtmlPopupMenu._CONTENT_STYLE_CLASS);
x1.appendChild(x2);
x2.appendChild(x3);
this._mainElement=x2;
this._contentElement=x3;
 return x1;
}
AdfDhtmlPopupMenu.prototype.GetContentParent= function()
{
 return this._contentElement;
}
AdfDhtmlPopupMenu.prototype.CreateShadow= function(x4)
{
 if(!this.GetAnimationDuration()||x4)
{
AdfDhtmlShadowDecorator.createShadowDecorator(this.getShadowAnchor(),this.getElement(),true);
}
}
AdfDhtmlPopupMenu.prototype.DoResizeNotifyDom= function(x5)
{
}
AdfDhtmlPopupMenu.prototype.SaveScrollValues= function(x6)
{
}
AdfDhtmlPopupMenu.prototype.RestoreScrollValues= function(x7)
{
}
AdfDhtmlPopupMenu.prototype.GetAnimationDurationSkinProperty= function()
{
 return "af|menu-tr-open-animation-duration";
}
AdfDhtmlPopupMenu.prototype.GetLaunchSourceElement= function()
{
 var x8=AdfMenuUtils.GetLastOpenedRootMenuId();
 return (x8)?AdfAgent.AGENT.getElementById(x8):null;
}
AdfDhtmlPopupMenu.prototype.GetFocusContent= function()
{
 var x9=this._componentId;
 if (x9)
{
 var x10=AdfPage.PAGE.findComponent(x9);
 if (x10&&(x10 instanceof AdfRichMenu))
{
 var x11=this._getFirstMenuItem(x10);
 if (x11)
{
 return AdfRichUIPeer.getDomElementForComponent(x11);
}
 else
 {
 return AdfRichUIPeer.getDomElementForComponent(x10);
}
}
}
 return this.getElement();
}
AdfDhtmlPopupMenu.prototype.ShouldHideOnClip= function()
{
 return false;
}
AdfDhtmlPopupMenu.prototype._getFirstMenuItem= function(x12)
{
x12.visitChildren(this._visitChildrenForMenu,this,true);
 var x13=this._firstMenuChild;
 if(x13)
{
 delete this._firstMenuChild;
}
 return x13;
}
AdfDhtmlPopupMenu.prototype._visitChildrenForMenu= function(x14)
{
 if(x14 instanceof AdfRichCommandMenuItem||x14 instanceof AdfRichMenu||
x14 instanceof AdfRichGoMenuItem){
this._firstMenuChild=x14;
 return 2;
}
 return 1;
}
AdfDhtmlPopupMenu.prototype.activate= function()
{
this.FocusOnFirstElement();
}

function AdfDhtmlTooltipManager()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlTooltipManager);
AdfDhtmlTooltipManager.prototype.Init= function()
{
AdfDhtmlTooltipManager.superclass.Init.call(this);
}
AdfDhtmlTooltipManager._handleMouseMove= function(x0)
{
 var x1=AdfDhtmlTooltipManager._theInstance;
 if (x1._rollOverBoundsChecker)
{
 var x2=AdfAgent.AGENT.getMousePosition(x0);
x1._checkMouseExit(x2.x,x2.y,x1._rollOverBoundsChecker);
}
}
AdfDhtmlTooltipManager.prototype.showRollOverLabel= function(x3)
{
AdfAssert.assertDomElement(x3);
 if (x3==this._currRollOverTarget)
 return;
this._currRollOverTarget=x3;
 var x4=AdfAgent.AGENT;
 var x5=x4.getDomDocument();
x4.addBubbleEventListener(x5,"mousemove",AdfDhtmlTooltipManager._handleMouseMove);
 var x6=x4.getElementPosition(x3);
 var x7=x6.y;
 var x8=x6.x;
 if(this._offsetLeft!=null)
{
x7-=this._offsetTop;
x8-=this._offsetLeft;
}
 var x9=this._getRollOverWindow();
 var x10=x3.cloneNode(true);
x4.modifyIdsInDomSubTree(x10,false,"_afrtt");
x9.setContent(x10);
x9.show(x7,x8);
 if(this._offsetLeft==null)
{
 var x11=x4.getComputedStyle(x9.getElement());
 var x12,x13;
x12=this._offsetLeft=AdfAgent.getCSSLengthAsInt(x11.borderLeftWidth) +
 AdfAgent.getCSSLengthAsInt(x11.paddingLeft);
x13=this._offsetTop=AdfAgent.getCSSLengthAsInt(x11.borderTopWidth) +
 AdfAgent.getCSSLengthAsInt(x11.paddingTop);
x7-=x13;
x8-=x12;
x9.setPosition(x7,x8);
}
 var x14=x4.getElementPageBounds(x3);
x14.notify=this._hideRollOverCallback;
this._rollOverBoundsChecker=x14;
}
AdfDhtmlTooltipManager.prototype.hideRollOverLabel= function()
{
 var x15=this._getRollOverWindow();
x15.hide();
this._currRollOverTarget=null;
this._rollOverBoundsChecker=null;
 var x16=AdfAgent.AGENT;
 var x17=x16.getDomDocument();
x16.removeBubbleEventListener(x17,"mousemove",AdfDhtmlTooltipManager._handleMouseMove);
}
AdfDhtmlTooltipManager.prototype._getRollOverWindow= function()
{
 var x18=this._rollOverWindow;
 var x19=AdfAgent.getAgent();
 if (x18)
{
 var x20=x19.getDomDocument();
 var x21=x18.getElement();
 if (!AdfDomUtils.isAncestor(x20,x21))
{
x18.hide();x18=null;}
}
 if (!x18)
{
x18= new AdfDhtmlTooltip();
 var x22=this.createCallback(this._redistributeRollOverCallback);
 var x23=x18.getElement();
x23.onmousedown=x22;
x23.onmouseup=x22;
x23.onclick=x22;
x23.ondblclick=x22;
x23.oncontextmenu=x22;
x19.disableUserSelect(x23);
this._rollOverWindow=x18;
}
 return x18;
}
AdfDhtmlTooltipManager.prototype._hideRollOverCallback= function(x24)
{
AdfDhtmlTooltipManager.getInstance().hideRollOverLabel();
}
AdfDhtmlTooltipManager.prototype._redistributeRollOverCallback= function(x25)
{
 if (!x25)
x25=window.event;
 var x26=this._currRollOverTarget;
 if (x26)
{
 var x27=AdfAgent.AGENT;
 var x28=this._findDispatchEventTarget(x25);
 if(x28)
{
 var x29=x27.copyEvent(x25);
 var x30=(x25.type=="click"&&
x27.getNodeName(x28)=='A'&&
x28.href&&x28.href!="");
 if(x30)
{
 var x31=x28.href;
 if(x31.charAt(x31.length -1)=="#"&&x31.indexOf(x27.getDomWindow().location.pathname)!= -1)
x30=false;
}
 if(!x30)
x27.eatEvent(x25);
x27.dispatchEvent(x28,x29);
}
 return true;
}
}
AdfDhtmlTooltipManager.prototype._findDispatchEventTarget= function(x32)
{
 var x33=AdfAgent.getAgent();
 var x34=x33.getEventTarget(x32);
 var x35=x34.id;
 var x36=this._currRollOverTarget;
 var x37=x36;
 if (x36)
{
 var x38=this._rollOverWindow.getElement();
while(x34!=x38&&(x35==null||x35==""))
{
 var x39=x34.parentNode;
 if (x39==null)
{
break;
}
x34=x39;
x35=x34.id;
}
 if (x35!=null&&x35!="")
{
 var x40=x35.replace(/::_afrtt/,"");
x37=x33.getElementById(x40);
}
}
 return x37;
}
AdfDhtmlTooltipManager.prototype._checkMouseExit= function(
x41,
x42,
x43)
{
 if ((x41<x43.left)||(x41>x43.right)||
(x42<x43.top)||(x42>x43.bottom))
{
x43.notify();
}
}
AdfDhtmlTooltipManager.getInstance= function()
{
 if(this._theInstance==null)
this._theInstance= new AdfDhtmlTooltipManager();
 return this._theInstance;
}

function AdfDhtmlTooltip()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlTooltip,AdfAbstractFloatingElement);
AdfDhtmlTooltip.prototype.Init= function()
{
AdfDhtmlTooltip.superclass.Init.call(this,AdfDhtmlZOrderManager.FLOATINGTYPE_TOOLTIP);
this.setElement(this._createHtml());
this.hide();
}
AdfDhtmlTooltip.prototype._createHtml= function()
{
 var x0=document.createElement("div");
x0.className="AFTooltip";
this._contentElement=x0;
 return x0;
}
AdfDhtmlTooltip.prototype.setContent= function(x1)
{
 var x2=this._contentElement;
 if(x2.firstChild)
x2.removeChild(x2.firstChild);
x2.appendChild(x1);
 var x3=x1.style;
x3.textDecoration="none";
x3.display="block";
 if(x3.width)
x3.width="";
}
AdfDhtmlTooltip.prototype.show= function(x4,x5)
{
AdfDhtmlTooltip.superclass.show.call(this);
this.setPosition(x4,x5);
this.raiseToFront();
 var x6=this.getElement();
 if(AdfDhtmlShadowDecorator.hasShadowDecorator(x6))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(x6);
AdfDhtmlShadowDecorator.showShadowDecorator(x6,true);
}
 else
 {
AdfDhtmlShadowDecorator.createShadowDecorator(x6,x6.parentNode);
}
}
AdfDhtmlTooltip.prototype.hide= function()
{
AdfDhtmlTooltip.superclass.hide.call(this);
AdfDhtmlShadowDecorator.showShadowDecorator(this.getElement(),false);
}
var AdfPopupScopingUtils= new Object();
AdfPopupScopingUtils.markAsScopingContainer= function(x0)
{
AdfAssert.assertDomElement(x0);
}
AdfPopupScopingUtils.scope= function(x1)
{
AdfAssert.assertDomElement(x1);
}
AdfPopupScopingUtils.unscope= function(x2)
{
AdfAssert.assertDomElement(x2);
}
AdfPopupScopingUtils.isScopingContainer= function(x3)
{
AdfAssert.assertDomElement(x3);
 return false;
}
AdfPopupScopingUtils.isOutOfScope= function(x4)
{
AdfAssert.assertDomElement(x4);
 return false;
}

function AdfDhtmlElementAnimator(
x0,
x1,
x2,
x3,
x4,
x5,
x6)
{
this.Init(x0,x1,x2,x3,
x4,x5,x6);
}
AdfObject.createSubclass(AdfDhtmlElementAnimator);
AdfDhtmlElementAnimator.prototype.Init= function(
x0,
x1,
x2,
x3,
x4,
x5,
x6)
{
AdfDhtmlElementAnimator.superclass.Init.call(this);
this._itemState=x0;
this._duringAnimate=x1;
this._afterAnimate=x2;
this._callbackParameters=x3;
this._component=x4;
this._startTime=(new Date()).getTime();
this._frameMethod=x5;
this._frameCount=x6;
}
AdfDhtmlElementAnimator.prototype.stop= function()
{
this._stopped=true;
window.clearInterval(this._intervalID);
 var x7=this._callbackParameters;
this._destroy();
 return x7;
}
AdfDhtmlElementAnimator.animate= function(
x8,
x9,
x10,
x11,
x12,
x13,
x14)
{
 var x15=AdfAgent.AGENT;
 var x16=x10.length;
 var x17= new Array(x16);
for(var x18=0;x18<x16;x18++)
{
 var x19=x10[x18];
 var x20=x19["properties"];
 var x21=x19["element"];
 var x22={};
AdfDhtmlElementAnimator._gatherSizeState(
x22,
x20,
x21,
"width",
"offsetWidth",
"borderLeftWidth",
"borderRightWidth");
AdfDhtmlElementAnimator._gatherSizeState(
x22,
x20,
x21,
"height",
"offsetHeight",
"borderTopWidth",
"borderBottomWidth");
 var x23=x20["alpha"];
 if ((x23!=null)&& !isNaN(x23))
{
 var x24=x21.style.opacity;
 if (x21.ownerDocument.all&&(x24==null))
{
try
{
x24=x21.filters.alpha.opacity/100;
}
catch(problem){}
}
 if ((x24==null)||((""+x24)==""))
{
x24=1;}
x22["opacity"]=[x24,x23/100,true];
}
 var x25=x20["zIndex"];
 if ((x25!=null)&& !isNaN(x25))
{
x22["zIndex"]=[AdfDhtmlElementAnimator._getElementZIndex(x15,x21),x25,true];
}
 var x26=x20["top"];
 if ((x26!=null)&& !isNaN(x26))
{
 var x27=x21.style.top;
 var x28=(x27&&x27!="auto")?parseInt(x27):x15.getElementTop(x21);
x22["top"]=[x28,x26];
}
 var x29=x20["left"];
 if ((x29!=null)&& !isNaN(x29))
{
 var x30=x21.style.left;
 var x31=(x30&&x30!="auto")?parseInt(x30):
x15.getElementLeft(x21);
x22["left"]=[x31,x29];
}
 var x32=x20["offsetTop"];
 if ((x32!=null)&& !isNaN(x32))
{
x22["offsetTop"]=[x21.offsetTop,x32];
}
 var x33=x20["offsetLeft"];
 if ((x33!=null)&& !isNaN(x33))
{
x22["offsetLeft"]=[x21.offsetLeft,x33];
}
 var x34=x20["scrollLeft"];
 if ((x34!=null)&& !isNaN(x34))
{
x22["scrollLeft"]=[x21.scrollLeft,x34,true];
}
 var x35=x20["scrollTop"];
 if ((x35!=null)&& !isNaN(x35))
{
x22["scrollTop"]=[x21.scrollTop,x35,true];
}
x17[x18]=
{
"element":x21,
"state":x22
};
}
 var x36=
Math.max(1,Math.round(x9*AdfDhtmlElementAnimator._FRAMES_PER_MILLISECOND)); if (!AdfPage.PAGE.isAnimationEnabled())
{
x36=1;
}
 return (new AdfDhtmlElementAnimator(
x17,
x11,
x12,
x13,
x14,
x8,
x36))._start();
}
AdfDhtmlElementAnimator._getElementZIndex= function(x37,x38)
{
 var x39=x37.getComputedStyle(x38);
 if (x39)
{
 var x40=x39.zIndex;
 if (!isNaN(x40))
{
 return x40;
}
}
 return 0;
}
AdfDhtmlElementAnimator._gatherSizeState= function(
x41,
x42,
x43,
x44,
x45,
x46,
x47)
{
 var x48=x42[x44];
 if ((x48!=null)&& !isNaN(x48))
{
 var x49=x43[x45];
 if (x43.style!=null)
{
x49=
AdfDhtmlElementAnimator._subtractBorderSize(x49,x43.style[x46]);
x49=
AdfDhtmlElementAnimator._subtractBorderSize(x49,x43.style[x47]);
}
x41[x44]=[x49,x48];
}
}
AdfDhtmlElementAnimator.prototype._start= function()
{
this._animationStepCallback=this.createCallback(this._animationStep);
 var x50=Math.floor(1/AdfDhtmlElementAnimator._FRAMES_PER_MILLISECOND);
this._intervalID=self.setInterval(this._animationStepCallback,x50);
 return this;
}
AdfDhtmlElementAnimator.prototype._destroy= function()
{
 delete this._itemState;
 delete this._duringAnimate;
 delete this._afterAnimate;
 delete this._callbackParameters;
 delete this._component;
 delete this._startTime;
 delete this._intervalID;
 delete this._animationStepCallback;
 delete this._stopped;
}
AdfDhtmlElementAnimator.prototype._animationStep= function()
{
 if (this._stopped||this._intervalID==null)
{
 return;
}
 if (this._performAfterAnimate)
{
window.clearInterval(this._intervalID);
 if (this._afterAnimate!=null)
{
this._afterAnimate(this._callbackParameters);
}
 if (this._component)
{
 var x51=this._component;
 if (!x51.getPeer())
{
 var x52=this._component.getClientId();
x51=AdfPage.PAGE.findComponent(x52);
}
 if (x51)
{
AdfPage.PAGE.__queueDescendantResizeNotifySource(x51);
AdfPage.PAGE.__doDescendantResizeNotify();
}
}
this._destroy();
 return;
}
 var x53=(new Date()).getTime();
 var x54=x53 - this._startTime;
 var x55=this._itemState;
 var x56=x55.length;
 var x57=Math.round(AdfDhtmlElementAnimator._FRAMES_PER_MILLISECOND*x54);
 var x58=this._frameCount;
 var x59=this._frameMethod;
 var x60=false;
 if (x57>=x58 - 1)
{
x60=true
this._performAfterAnimate=true;
}
for(var x61=0;x61<x56;x61++)
{
 var x62=x55[x61];
 var x63=x62["element"];
 var x64=x62["state"];
 var x65;
for(var x66 in x64)
{
x65=x60?x64[x66][1]:AdfDhtmlElementAnimator._computeFrameProperty(
x57,
parseFloat(x64[x66][0]),
parseFloat(x64[x66][1]),
x59,
x58);
 if (!x64[x66][2])
{
x65+="px";
}
AdfDhtmlElementAnimator._renderFrameProperty(x63,x65,x66);
}
}
 var x67=this._duringAnimate;
 if (x67!=null)
{
x67(this._callbackParameters);
}
}
AdfDhtmlElementAnimator._renderFrameProperty= function(x68,x69,x70)
{
 if ((x70=="opacity")&&(AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM))
{
 var x71=x69*100;
 if (x71==1)
{
x68.style.filter="";
}
 else
 {
x68.style.filter="alpha(opacity=" + x71 + ")";
}
}
 else if (x70=="offsetLeft")
{
x68.style.left=x69;
}
 else if (x70=="offsetTop")
{
x68.style.top=x69;
}
 else if (x70=="scrollLeft")
{
AdfAgent.AGENT.scrollToPos(x68,x69,null);
}
 else if (x70=="scrollTop")
{
AdfAgent.AGENT.scrollToPos(x68,null,x69);
}
 else
 {
x68.style[x70]=x69;
}
}
AdfDhtmlElementAnimator._computeFrameProperty= function(
x72,
x73,
x74,
x75,
x76)
{
 var x77=x72/x76; var x78;switch(x75)
{
 case AdfDhtmlElementAnimator.FRAME_METHOD_CONSTANT_SPEED:
x78=x77;
break;
 case AdfDhtmlElementAnimator.FRAME_METHOD_ACCELERATING:
x78=Math.pow(x77,2);
break;
 case AdfDhtmlElementAnimator.FRAME_METHOD_DECELERATING:
x78=1 - Math.pow((x77 - 1),2);
break;
 case AdfDhtmlElementAnimator.FRAME_METHOD_SLOW_FAST_SLOW:
x78=(Math.cos(x77*Math.PI + Math.PI) + 1)/2;
break;
default:
AdfLogger.LOGGER.severe("Invalid AdfDhtmlElementAnimator framing method: " + x75);
x78=1;}
 var x79=x74 - x73;
 return x73 + x78*x79;
}
AdfDhtmlElementAnimator._subtractBorderSize= function(x80,x81)
{
 if ((x81!=null)&&(x81!=""))
{
x80-=parseInt(x81);
}
 return x80;
}
AdfDhtmlElementAnimator._FRAMES_PER_MILLISECOND=0.06;
AdfDhtmlElementAnimator.FRAME_METHOD_CONSTANT_SPEED=0;
AdfDhtmlElementAnimator.FRAME_METHOD_ACCELERATING=1;
AdfDhtmlElementAnimator.FRAME_METHOD_DECELERATING=2;
AdfDhtmlElementAnimator.FRAME_METHOD_SLOW_FAST_SLOW=3;

AdfUIPeer.createPeerClass(AdfUIPeer,"AdfRichUIPeer");
AdfRichUIPeer.createPeerClass= function(
x0,
x1,
x2)
{
 var x3=AdfUIPeer.createPeerClass(x0,x1);
x3.InitClass=AdfRichUIPeer.DefaultInitClass;
x3.STATELESS=(x2!=false);
 return x3;
}
AdfRichUIPeer.prototype.getDomDocument= function()
{
 return AdfPage.PAGE.getDomDocument();
}
AdfRichUIPeer.prototype.getComponentParent= function(x4)
{
this.bind(x4);
 var x5=AdfRichUIPeer.getFirstAncestorComponent(this.getDomNode().parentNode);
 if (x5)
{
 var x6=x4.getClientId();
 var x7=x6.lastIndexOf(":");
 if (x7!= -1)
{
 var x8=x6.substring(0,x7);
 if (!AdfAgent.AGENT.getElementById(x8))
{
 var x9=AdfPage.PAGE.findComponent(x8);
 if (x9)
{
 var x10=x9.getParent();
while(x10)
{
 if (x10===x5)
{
x5=x9;
break;
}
x10=x10.getParent();
}
}
}
}
}
 return x5;
}
AdfRichUIPeer.prototype._truncateClientId= function(
x11,
x12,
x13,
x14)
{
this.TruncateClientId(x11,x12,x13,x14);
 var x15=this.getComponentParent(x11);
 if (x15!=null)
{
x15.getPeer()._truncateClientId(x15,
x12,
x13,
x14);
}
}
AdfRichUIPeer.prototype.TruncateClientId= function(
x16,
x17,
x18,
x19)
{
}
AdfRichUIPeer.TruncateClientIdOnceImpl= function(
x20,
x21,
x22,
x23)
{
 var x24=x20.getClientId();
 var x25=AdfStrings.count(x24,":");
x23.push(x25 + 1);
}
AdfRichUIPeer.prototype.getAbsoluteId= function(x26,x27)
{
 var x28=[];
this._truncateClientId(x26,x26,x27,x28);
 var x29=x28.length;
 if (x29>0)
{
 var x30=x27.split(":");
 var x31=x30.length;
 if (x31==1)
{
 return x27;
}
 var x32= new Array(x31 - x29);
 var x33=0;
 var x34=x29 - 1;
 var x35=x28[x34];
for(var x36=0;x36<x31;x36++)
{
 if (x36!=x35)
{
x32[x33++]=x30[x36];
}
 else
 {
x35=(x34>0)
?x28[--x34]
: -1;
}
}
 return x32.join(":");
}
 else
 {
 return x27;
}
}
AdfRichUIPeer.prototype.getAbsoluteLocator= function(x37,x38)
{
 var x39=[];
this._fixClientId(x37,x37,x38,x39);
 var x40=x39.length;
 if (x40>0)
{
 var x41=x38.split(":");
 var x42=x41.length;
 var x43= new Array(x42 - x40);
 var x44=0;
 var x45=x40 - 1;
 var x46=x39[x45][0];
for(var x47=0;x47<x42;x47++)
{
 if(x47==x46)
{
 var x48=x39[x45][1];
 if(x48!=null)
{
 var x49=(x44>0)
?x44-1
:0;
x43[x49]=x43[x49] + "[" +
 x39[x45][1] + "]";
}
x46=(x45>0)
?x39[--x45][0]
: -1;
}
 else
 {
x43[x44++]=x41[x47];
}
}
 return x43.join(":");
}
 else
 {
 return x38;
}
}
AdfRichUIPeer.prototype.convertLocatorToClientId= function(x50,x51)
{
AdfAssert.assert(false,"Incorrect use of [] locator notation for component :" + x50);
}
AdfRichUIPeer.getLocatorByDomElement= function (x52)
{
AdfAssert.assertDomElement(x52);
 var x53;
 var x54=0;
 var x55=AdfPage.PAGE;
for(var x56=x52;x56&& !x53;x56=x56.parentNode)
{
x54++;
 var x57=x56.id;
 if (x57)
{
x53=x55.findComponent(x57);
}
}
 if (x53)
{
 var x58=x53.getPeer();
 if (x58)
{
x58.bind(x53);
 var x59=x58._getBestMatchSubId(x52,x54);
 var x60=x53.getAbsoluteLocator();
 if (x59)
{
 return x60 + "#" + x59;
}
 else
 {
 return x60;
}
}
}
 return null;
}
AdfRichUIPeer.prototype._getBestMatchSubId= function(x61,x62)
{
AdfAssert.assertDomElement(x61);
 var x63=this.getDomElement();
 if(!x62)
{
x62=0;
 var x64=x61;
while(x64&&(x64!=x63))
{
x62++;
x64=x64.parentNode;
}
 if(!x64)
{
 return null;
}
}
 var x65=this.getClass()._SUB_ID_MAP;
 if (x65)
{
 var x66=x62;
 var x67;
for( var x68 in x65)
{
 var x69=this.GetSubIdDomElement(x68);
 if(x69)
{
 var x70=x61;
for(var x71=0;x71<x66;x71++ )
{
 if (x70==x69)
{
x66=x71;
x67=x68;
break;
}
x70=x70.parentNode;
}
}
 if(x66==0)
{
break;
}
}
 return x67;
}
 return null;
}
AdfRichUIPeer.prototype._fixClientId= function(
x72,
x73,
x74,
x75)
{
this.ConvertClientIdToLocator(x72,x73,x74,x75);
 var x76=this.getComponentParent(x72);
 if (x76!=null)
{
x76.getPeer()._fixClientId(x76,
x72,
x74,
x75);
}
}
AdfRichUIPeer.prototype.ConvertClientIdToLocator= function(
x77,
x78,
x79,
x80)
{
}
AdfRichUIPeer.prototype.getDescendantComponents= function(x81,x82)
{
 var x83;
 if (x81 instanceof AdfRichPopup)
{
x83=AdfDhtmlPopupPeer.getContentDom(x81);
}
 else
 {
x83=AdfRichUIPeer.getDomElementForComponent(x81);
}
AdfAssert.assertDomElement(x83);
 return AdfAgent.AGENT.getDescendantComponentsForNode(x83,x82);
}
AdfRichUIPeer.prototype.getComponentProperty= function(x84,x85)
{
 var x86=this.constructor._componentPropertyGetters[x85];
 if (x86)
{
this.bind(x84);
 return x86.call(this,x84,this.getDomElement());
}
}
AdfRichUIPeer.prototype.getReadyState= function(x87)
{
this.bind(x87);
 return this.GetReadyState();
}
AdfRichUIPeer.prototype.GetReadyState= function()
{
 return AdfUIComponent.STATE_COMPLETE;
}
AdfRichUIPeer.prototype.getInlineEditor= function(x88,x89)
{
this.bind(x88);
 return this.GetInlineEditor(x89);
}
AdfRichUIPeer.prototype.GetInlineEditor= function(x90)
{
 return null;
}
AdfRichUIPeer.prototype.getDragTransferable= function(x91,x92)
{
this.bind(x91);
 return this.GetDragTransferable(x92);
}
AdfRichUIPeer.prototype.GetDragTransferable= function(x93)
{
 return null;
}
AdfRichUIPeer.prototype.getDragOverFeedback= function(x94,x95)
{
this.bind(x94);
 return this.GetDragOverFeedback(x95);
}
AdfRichUIPeer.prototype.GetDragOverFeedback= function(x96)
{
 return AdfRichUIPeer.CreateDraggableNode(this.getDomElement());
}
AdfRichUIPeer.CreateDraggableNode= function(x97)
{
 var x98=AdfAgent.AGENT;
 var x99=x98.cloneNode(x97);
 if (x99.nodeType==1)
x98.clearSubtreeIds(x99);
x98.copyStyle(x97,x99);
 if (x99.nodeType==1)
{
 var x100=x97.ownerDocument;
 var x101;
 var x102;
 if ((x99.nodeName=="TD")||(x99.nodeName=="TH"))
{
x101=x97.parentNode.parentNode.parentNode;x102=x100.createElement("TR");
x102.appendChild(x99);
x99=x102;
}
 if (x99.nodeName=="TR")
{
 if (x97.nodeName=="TR")
{
x101=x97.parentNode.parentNode;
 var x103=x98.getTableRowCells(x97);
 var x104=x98.getTableRowCells(x99);
 var x105=x103.length;
 var x106=x98.getPlatform()==AdfAgent.IE_PLATFORM;
for(var x107=0;x107<x105;x107++)
{
 if (x106)
{
x104[x107].width=x103[x107].offsetWidth;
}
 else
 {
x104[x107].style.width=x98.getComputedStyle(x103[x107]).width;
}
x104[x107].noWrap=true;
}
}
x102=x100.createElement("TBODY");
x102.appendChild(x99);
x99=x102;
}
 if ((x99.nodeName=="TBODY")||
(x99.nodeName=="THEAD")||
(x99.nodeName=="TFOOT"))
{
 if (!x101)
x101=x97.parentNode;
x102=x100.createElement("TABLE");
x102.cellSpacing=x101.cellSpacing;
x102.cellPadding=x101.cellPadding;
x102.border=x101.border;
x98.copyStyle(x101,x102);
x102.appendChild(x99);
x99=x102;
}
}
AdfRichUIPeer._copyDragSize(x97,x99);
 return x99;
}
AdfRichUIPeer._copyDragSize= function(x108,x109)
{
 var x110=x109.style;
x110.position="absolute";x110.width=x108.offsetWidth + "px";x110.height=x108.offsetHeight + "px";x110.top="auto";x110.left="auto";x110.right="auto";x110.bottom="auto";
 if(x110.margin=="auto")
x110.margin="";
}
AdfRichUIPeer.prototype.replaceDomElement= function(x111,x112,x113)
{
this.bind(x111);
this.ReplaceDomElement(x112,x113);
}
AdfRichUIPeer.prototype.ReplaceDomElement= function(x114,x115)
{
AdfPage.PAGE.__replaceDomElement(x114,x115);
}
AdfRichUIPeer.prototype.domReplaceNotify= function(x116,x117)
{
this.bind(x116);
 return this.DomReplaceNotify(x117);
}
AdfRichUIPeer.prototype.DomReplaceNotify= function(x118)
{
 return x118;
}
AdfRichUIPeer.createSubId= function(
x119,
x120)
{
 var x121=AdfRichUIPeer._CREATE_SUB_ID_ARRAY;
x121[0]=x119;
x121[2]=x120;
 return x121.join("");
}
AdfRichUIPeer.CreateSubId= function(
x122,
x123)
{
 return AdfRichUIPeer.createSubId(x122,x123);
}
AdfRichUIPeer._sliceArgumentsArray= function(x124,x125)
{
 var x126=x124.length;
 var x127=x126 - x125;
 if (x127>0)
{
 var x128= new Array(x127);
 var x129=x125;
for(var x130=0;x130<x127;x129++,x130++)
{
x128[x130]=x124[x129];
}
 return x128;
}
 else
 {
 return null;
}
}
AdfRichUIPeer.addSuppressedPPRAttributes= function(
x131,
x132)
{
AdfAssert.assertFunction(x131);
 var x133=x131.prototype;
 var x134=x131._pprSuppressedProperties;
 if (x134==null)
{
x134= new Object();
x131._pprSuppressedProperties=x134;
 if (x131!=AdfRichUIPeer)
{
 var x135=x131.superclass.constructor._pprSuppressedProperties;
for(var x136 in x135)
{
x134[x136]=true;
}
}
}
 var x137=arguments.length;
 if (x137>1)
{
for(var x138=1;x138<x137;x138++)
{
 var x139=arguments[x138];
AdfAssert.assertString(x139);
x134[x139]=true;
}
}
}
AdfRichUIPeer.addComponentPropertyGetters= function(
x140,
x141)
{
AdfRichUIPeer._initializeCallbacks(x140,
"_componentPropertyGetters",
AdfRichUIPeer._GET_COMPONENT_FORMAT,
null,
AdfRichUIPeer._sliceArgumentsArray(arguments,1));
}
AdfRichUIPeer.addDomEventHandlers= function(
x142,
x143)
{
AdfRichUIPeer._initializeCallbacks(x142,
"_domEventHandlers",
AdfRichUIPeer._HANDLE_DOM_EVENT_FORMAT,
AdfDhtmlLookAndFeel.EVENT_TYPE_TO_CAMEL_CASE_MAP,
AdfRichUIPeer._sliceArgumentsArray(arguments,1));
}
AdfRichUIPeer.addComponentEventHandlers= function(
x144,
x145)
{
AdfRichUIPeer._initializeCallbacks(x144,
"_componentEventHandlers",
AdfRichUIPeer._HANDLE_COMPONENT_EVENT_FORMAT,
null,
AdfRichUIPeer._sliceArgumentsArray(arguments,1));
}
AdfRichUIPeer.addComponentPropertyChanges= function(
x146,
x147)
{
AdfRichUIPeer._initializeCallbacks(x146,
"_componentPropertyChanges",
AdfRichUIPeer._PROPETY_CHANGED_FORMAT,
null,
AdfRichUIPeer._sliceArgumentsArray(arguments,1));
}
AdfRichUIPeer._initializeCallbacks= function(
x148,
x149,
x150,
x151,
x152)
{
AdfAssert.assertFunction(x148);
AdfAssert.assertString(x149);
AdfAssert.assertArray(x150);
AdfAssert.assertObjectOrNull(x151);
AdfAssert.assertArrayOrNull(x152);
 var x153=x148.prototype;
 var x154;
 var x155=x148[x149];
 if (x155==null)
{
x155= new Object();
x148[x149]=x155;
 if (x148!=AdfRichUIPeer)
{
 var x156=x148.superclass.constructor[x149];
for(var x157 in x156)
{
x154=(x151!=null)
?x151[x157]
:x157;
x150[1]=AdfStrings.initUpperCase(x154);
x155[x157]=x153[x150.join("")];
}
}
}
 if (x152!=null)
{
 var x158=x152.length;
for(var x159=0;x159<x158;x159++)
{
 var x157=x152[x159];
x154=(x151!=null)
?x151[x157]
:x157;
x150[1]=AdfStrings.initUpperCase(x154);
 var x160=x150.join("");
 var x161=x153[x160];
 if (AdfAssert.DEBUG)
{
AdfAssert.assert(x161,"No callback for:" + x160 + " on " + AdfObject.getTypeName(x148));
}
x155[x157]=x161;
}
}
}
AdfRichUIPeer.prototype.ComponentPropertyChanged= function(
x162)
{
 var x163=x162.getPropertyName();
 var x164=x162.getSource();
 var x165=this.constructor;
 var x166=x165._componentPropertyChanges[x163];
 var x167=false;
 if (x166)
{
this.bind(x164);
x167=x166.call(this,
x164,
this.getDomElement(),
x162.getNewValue(),
x162.getOldValue());
 if (x167===undefined)
x167=true;
}
 if (x167)
{
AdfPage.PAGE.__queueDescendantResizeNotifySource(x164);
}
 else
 {
 if (!(x163 in x165._pprSuppressedProperties))
{
 var x168=x164.getPropertyKeys()[x163];
 if (x168!=null&& !x168[AdfUIComponent.PROPERTY_DISCONNECTED])
{
AdfPage.PAGE.addPartialTargets(x164);
}
}
}
}
AdfRichUIPeer.prototype.ComponentVisibleChanged= function(
x169,
x170,
x171,
x172)
{
AdfAssert.assertBoolean(x171);
 var x173=false;
 var x174=x169.getParent();
 if (x174)
{
 var x175=x174.getPeer();
 if (x175&&x175.needsChildVisibilityChanges())
{
x175.bind(x174);
x173=x175.ChildVisibilityChanged(x169,x170,x171);
}
}
 if (!x173)
{
AdfDomUtils.setVisible(x170,x171);
 if (x171)
AdfPage.PAGE.doResizeNotifyDom(x170,false);
}
}
AdfRichUIPeer.prototype.GetComponentVisible= function(
x176,
x177)
{
 return AdfDomUtils.isVisible(x177);
}
AdfRichUIPeer.prototype.GetComponentId= function(x178,x179)
{
 var x180=x178.getClientId();
 var x181=x180.lastIndexOf(":");
 return x180.substr(x181 + 1);
}
AdfRichUIPeer.prototype.ComponentInlineStyleChanged= function(
x182,
x183,
x184,
x185)
{
AdfAssert.assertStringOrNull(x184);
 if (x184==null)
x184="";
 var x186=x183.style.cssText;
 if (x186!=null)
{
 if (x185==null)
{
 if (x186[x186.length - 1]!=';')
x186=x186 + ';';
x184=x186 + x184;
}
 else
 {
x185=x185.replace(/\s*:\s*/g,":");
x186=x186.replace(/\s*:\s*/g,":");
 if (x185.length<x186.length)
{
 var x187=x186.indexOf(x185);
 if (x187==0)
{
x185=x186.substring(x185.length);
 if (x185[x185.length - 1]!=';')
x185=x185 + ';';
x184=x185+ x184;
}
 else if (x187>0)
{
x184=x186.substring(0,x187) + x184;
}
}
}
}
x183.style.cssText=x184;
}
AdfRichUIPeer.prototype.ComponentStyleClassChanged= function(
x188,
x189,
x190,
x191)
{
AdfAssert.assertStringOrNull(x190);
 if (x191!=null)
{
AdfDomUtils.removeCSSClassName(x189,x191)
}
AdfDomUtils.addCSSClassName(x189,x190);
}
AdfRichUIPeer.prototype.getInlineStyleProperty= function(
x192,
x193)
{
AdfAssert.assertPrototype(x192,AdfUIComponent);
 var x194=AdfRichUIPeer.getDomElementForComponent(x192);
 var x195=x194.style;
 var x196=AdfAgent.AGENT.getDomForCSSPropertyName(x193);
 return x195[x196];
}
AdfRichUIPeer.prototype.setInlineStyleProperty= function(
x197,
x198,
x199)
{
AdfAssert.assertPrototype(x197,AdfUIComponent);
 var x200=AdfRichUIPeer.getDomElementForComponent(x197);
 var x201=x200.style;
 var x202=AdfAgent.AGENT.getDomForCSSPropertyName(x198);
x201[x202]=x199;
}
AdfRichUIPeer.prototype.setBusy= function(
x203,
x204)
{
AdfAssert.assertPrototype(x203,AdfUIComponent);
AdfAssert.assertBoolean(x204);
 var x205=AdfRichUIPeer.getDomContentElementForComponent(x203);
 if (x205==null)
{
 return;
}
 if (AdfDomUtils.addOrRemoveCSSClassName(x204,x205,AdfRichUIPeer.BUSY_STYLECLASS))
{
this.bind(x203);
this.SetBusy(x204);
}
}
AdfRichUIPeer.prototype.SetBusy= function(
x206)
{
AdfAssert.assertBoolean(x206);
}
AdfRichUIPeer.registerKeyStroke= function(x207,x208,x209)
{
AdfAssert.assertPrototype(x207,AdfUIComponent);
AdfAssert.assertPrototype(x208,AdfKeyStroke);
AdfAssert.assertFunction(x209);
AdfPage.PAGE.registerKeyStroke(x208,
AdfRichUIPeer._keystrokeCallback,
{clientId:x207.getClientId(),callback:x209});
}
AdfRichUIPeer.unregisterKeyStroke= function(x210,x211)
{
AdfAssert.assertPrototype(x210,AdfUIComponent);
AdfAssert.assertPrototype(x211,AdfKeyStroke);
AdfPage.PAGE.unregisterKeyStroke(x211,x210.getClientId());
}
AdfRichUIPeer._keystrokeCallback= function(x212)
{
AdfAssert.assertPrototype(x212,AdfKeyStroke);
 var x213=AdfPage.PAGE.findComponent(this.clientId);
 if (x213==null)
 return false;
 var x214=x213.getPeer();
x214.bind(x213);
 return this.callback.call(x214,x212);
}
AdfRichUIPeer.getDomElementForComponent= function(x215)
{
AdfAssert.assertObject(x215);
 return AdfAgent.AGENT.getElementById(x215.getClientId());
}
AdfRichUIPeer.getDomNodeForComponent= function(x216)
{
 var x217=AdfAgent.AGENT.getElementById(x216.getClientId());
 if (!x217)
{
 var x218=x216.getPeer();
 if (x218)
{
x217=x218.getDomNode();
}
 if (!x217)
{
x217=AdfRichUIPeer.GetDomNodeForCommentComponent(x216);
}
}
AdfAssert.assert(x217!=null,
"DOM node for the Id " + x216.getClientId() + " is not found. This indicates a serious problem during rendering. " +
 "Inspect your DOM tree and try to determine why the client component is present, while its DOM node is not");
 return x217;
}
AdfRichUIPeer.GetDomNodeForCommentComponent= function(x219)
{
 var x220=x219.getProperty("_parentId");
 var x221="compS|" + x219.getClientId();
 var x222=AdfAgent.AGENT.getElementById(x220);
 if (x222)
{
 var x223=x222.firstChild;
 if (x223)
 return AdfRichUIPeer._getCommentNodeForComponent(x223,x221);
}
 var x224=AdfPage.PAGE.getDomDocument().body;
 var x225=AdfRichUIPeer._findCommentNodeWithContent(x224,x221);
 if (x225!=null)
{
 return x225;
}
 return null;
}
AdfRichUIPeer._findCommentNodeWithContent= function(x226,x227)
{
AdfAssert.assertDomNode(x226);
 var x228=x226.nodeType;
 if (x228==8){
 if (x227==x226.nodeValue)
 return x226;
}
 else if (x228==1){
 var x229=x226.childNodes;
 var x230=x229.length;
 var x231=0;
for(x231=0;x231<x230;x231++)
{
 var x232=x229[x231];
 var x233=AdfRichUIPeer._findCommentNodeWithContent(x232,x227);
 if (x233!=null)
 return x233;
}
}
 return null;
}
AdfRichUIPeer.getDomContentElementForComponent= function(x234)
{
 var x235=AdfRichUIPeer.getDomNodeForComponent(x234);
 if (x235==null)
 return null;
 return this.GetDomContentElementForNode(x235);
}
AdfRichUIPeer.GetDomContentElementForNode= function(x236)
{
AdfAssert.assertDomNode(x236);
 if (x236.nodeType==8){
x236=x236.nextSibling;
while(x236&&(x236.nodeType!=1))
x236=x236.nextSibling;
}
AdfAssert.assertDomElement(x236);
 return x236;
}
AdfRichUIPeer._getCommentNodeForComponent= function(x237,x238)
{
 var x239=x237;
while(x239)
{
 var x240=x239.nodeType;
 if (x240==8)
{
 if (x238==x239.nodeValue)
 return x239;
}
 else if (x240==1)
{
 var x241=x239.id;
 if (!(x241&&AdfPage.PAGE.findComponent(x241)))
{
 var x242=x239.firstChild;
 if (x242)
{
 var x243=AdfRichUIPeer._getCommentNodeForComponent(x242,x238);
 if (x243)
 return x243;
}
}
}
x239=x239.nextSibling;
}
 return null;
}
AdfRichUIPeer.prototype.getDomElement= function()
{
 return this._domNode;
}
AdfRichUIPeer.prototype.getDomNode= function()
{
 return this._domNode;
}
AdfRichUIPeer.getDomContentElement= function()
{
 return this._domNode;
}
AdfRichUIPeer.prototype.Init= function(x244)
{
AdfRichUIPeer.superclass.Init.call(this,x244);
}
AdfRichUIPeer.prototype.initialize= function(x245)
{
AdfAssert.assertPrototype(x245,AdfUIComponent);
AdfPage.PAGE.mapComponent(x245.getClientId(),x245);
 var x246=AdfRichUIPeer.getDomNodeForComponent(x245);
 if (x246)
{
AdfAssert.assertDomNode(x246);
this.InitDomElement(x245,x246);
 if (!this.constructor.STATELESS)
{
this.BindToComponent(x245,x246);
}
}
}
AdfRichUIPeer.prototype.componentRemoved= function(x247)
{
AdfAssert.assertPrototype(x247,AdfUIComponent);
AdfAssert.assertDomNode(AdfRichUIPeer.getDomNodeForComponent(x247));
this.cancelAllPopups(x247,true);
this.ComponentRemoved(x247);
 if (this._component===x247)
{
this.UnbindFromComponent();
}
AdfPage.PAGE.unmapComponent(x247.getClientId());
}
AdfRichUIPeer.InitClass= function()
{
this._PROPETY_CHANGED_FORMAT= new Array("Component",null,"Changed");
this._GET_COMPONENT_FORMAT= new Array("GetComponent",null);
this._HANDLE_DOM_EVENT_FORMAT= new Array("HandleDom",null);
this._HANDLE_COMPONENT_EVENT_FORMAT= new Array("HandleComponent",null);
this._CREATE_SUB_ID_ARRAY= new Array(null,"::",null);
this.addComponentPropertyChanges(this,AdfUIComponent.VISIBLE,
AdfUIComponent.INLINE_STYLE,
AdfUIComponent.STYLE_CLASS);
this.addComponentPropertyGetters(this,AdfUIComponent.VISIBLE,AdfUIComponent.ID);
}
AdfRichUIPeer.DefaultInitClass= function()
{
AdfRichUIPeer.addComponentPropertyChanges(this);
AdfRichUIPeer.addComponentPropertyGetters(this);
AdfRichUIPeer.addComponentEventHandlers(this);
AdfRichUIPeer.addDomEventHandlers(this);
AdfRichUIPeer.addSuppressedPPRAttributes(this);
 if (this.InitSubclass!=null)
{
this.InitSubclass();
}
}
AdfRichUIPeer.prototype.InitDomElement= function(x248,x249)
{
}
AdfRichUIPeer.prototype.ComponentRemoved= function(x250)
{
}
AdfRichUIPeer.prototype.BindToComponent= function(x251,x252)
{
AdfAssert.assertDomNode(x252);
this._component=x251
this._domNode=x252;
}
AdfRichUIPeer.prototype.UnbindFromComponent= function()
{
this._component=null;
this._domNode=null;
}
AdfRichUIPeer.prototype.bind= function(x253)
{
AdfAssert.assertPrototype(x253,AdfUIComponent);
 if (x253!==this._component)
{
 if (this.constructor.STATELESS)
{
this.UnbindFromComponent();
 var x254=AdfRichUIPeer.getDomElementForComponent(x253);
this.BindToComponent(x253,x254);
}
}
}
AdfRichUIPeer.prototype.focus= function(x255)
{
this.bind(x255);
this.Focus();
}
AdfRichUIPeer.prototype.Focus= function()
{
 var x256=this.getDomElement();
AdfFocusUtils.focusFirstTabStop(x256);
}
AdfRichUIPeer.prototype.processPushData= function(x257,x258,x259)
{
this.bind(x257);
 return this.ProcessPushData(x258,x259);
}
AdfRichUIPeer.prototype.ProcessPushData= function(x260,x261)
{
 var x262=this.getComponent();
 var x263=false;
for(key in x260)
{
 var x264=x260[key];
AdfLogger.LOGGER.fine("On ",x262," set ",key," to ",x264);
 var x265=x262.setProperty(key,x264,false,AdfUIComponent.PROPAGATE_LOCALLY);
 if (!x263&&(x264!==x265))
{
x263=true;
 var x266=this.getDomElement();
 var x267=AdfRichUIPeer._TWINKLE_TIMER_ID_ATTR;
 var x268=x266.getAttribute(x267);
 var x269=AdfPage.PAGE;
 if (x268)
{
x269.rescheduleTimer(x268,1000);
}
 else
 {
AdfDomUtils.addCSSClassName(x266,AdfRichUIPeer._TWINKLE_ON_STYLECLASS);
x268=x269.scheduleTimer(null,
AdfRichUIPeer._removeTwinkleCallback,
x266.id,1000);
x266.setAttribute(x267,x268);
}
}
}
 return true;
}
AdfRichUIPeer.prototype.getComponent= function()
{
 return this._component
}
AdfRichUIPeer.GetComponent= function(x270)
{
AdfAssert.assertDomElement(x270);
 var x271=x270.id;
 return (x271)
?AdfPage.PAGE.findComponent(x271)
:null;
}
AdfRichUIPeer.getFirstAncestorComponent= function(x272)
{
AdfAssert.assertDomNode(x272);
 var x273=AdfPage.PAGE;
 var x274;
while(x272)
{
 var x275=x272.nodeType;
 if (x275==1)
{
 var x276=x272.id;
 if (x276)
{
x274=x273.findComponent(x276);
 if (x274)
{
 return x274;
}
}
 var x277=x272.previousSibling;
 if (x277&&(x277.nodeType==8))
{
x274=x273._getComponentFromComment(x277);
 if (x274)
{
 return x274;
}
}
}
x272=x272.parentNode;
}
 return null;
}
AdfRichUIPeer.prototype.visitChildren= function(
x278,
x279,
x280,
x281)
{
AdfAssert.assertPrototype(x278,AdfUIComponent);
AdfAssert.assertFunction(x279);
AdfAssert.assertObjectOrNull(x280);
 var x282=AdfRichUIPeer.getDomElementForComponent(x278);
 var x283=this._visitChildren(x278,x282,x279,x280,x281);
 if (x283!=2)
{
 var x284=this.getAllPopups(x278)
 if (x284!=null)
{
for(var x285 in x284)
{
x282=x284[x285].getElement();
 if (x282)
{
x283=this._visitChildren(x278,x282,x279,x280,x281);
 if(x283==2)
break;
}
}
}
}
 return x283;
}
AdfRichUIPeer.prototype.getPagePosition= function(x286)
{
this.bind(x286);
 return AdfAgent.AGENT.getElementPosition(this._domNode);
}
AdfRichUIPeer.prototype._visitChildren= function(
x287,
x288,
x289,
x290,
x291)
{
 var x292=x288.firstChild;
 if (!x292)
 return 0;
 var x293=AdfDomUtils.isVisible;
 var x294=AdfAgent.AGENT.isElementHTML;
 var x295=AdfPage.PAGE;
while(x292)
{
 if (x292.nodeType==1)
{
 if (x294(x292)&&
(!x291||x293(x292)))
{
 var x296=0;
 var x297=null;
 var x298=x292.id;
 if (x298)
x297=x295.findComponent(x298);
 if (x297&&(x297!=x287))
{
x296=x289.call(x290,x297);
 if (!x296)
x296=x297.visitChildren(x289,
x290,
x291);
}
 else
 {
x296=this._visitChildren(x287,x292,x289,x290,x291);
}
 if (x296==2)
 return 2;
}
}
x292=x292.nextSibling;
}
 return 0;
}
AdfRichUIPeer.prototype.__CreateComponentEvent= function(x299,x300,x301)
{
 var x302=AdfAgent.AGENT;
this._dispatchDomEvent(x302,x299,x300);
 return x302.getComponentEvent(x299,x300,x301);
}
AdfRichUIPeer.prototype._dispatchDomEvent= function(x303,x304,x305)
{
AdfAssert.assertObject(x305);
 var x306=this.constructor._domEventHandlers[x305.type];
 if (x306)
{
this.bind(x304);
x306.call(this,x304,x305);
}
}
AdfRichUIPeer.prototype.DispatchComponentEvent= function(x307)
{
{
}
 var x308=this.constructor._componentEventHandlers;
 if (x308)
{
 var x309=x308[x307.getType()];
 if (x309)
{
 var x310=x307.getCurrentTarget();
this.bind(x310,AdfRichUIPeer.getDomElementForComponent(x310));
x309.call(this,x307);
}
}
}
AdfRichUIPeer.addEventHandlerToDomInstance= function(x311,x312,x313)
{
AdfAssert.assertFunction(x311);
AdfAssert.assertDomElement(x312);
AdfAssert.assertString(x313);
 var x314=AdfDhtmlLookAndFeel.EVENT_TYPE_TO_ATTRIBUTE_MAP[x313];
AdfAssert.assertString(x314);
AdfRichUIPeer.addDomEventHandlers(x311,x313);
x312[x314]=AdfRichUIPeer._defaultInstanceEventHandler;
}
AdfRichUIPeer._defaultInstanceEventHandler= function(x315)
{
 if (x315==null)
x315=AdfPage.PAGE.getDomWindow().event;
 var x316=AdfRichUIPeer.getFirstAncestorComponent(this);
 if (x316)
{
x316.getPeer()._dispatchDomEvent(AdfAgent.AGENT,x316,x315);
}
}
AdfRichUIPeer.prototype.isActive= function()
{
 return this.getComponent().getClientId()==AdfPage.PAGE.getActiveComponentId();
}
AdfRichUIPeer.prototype.getAccessibleName= function(x317)
{
this.bind(x317);
 return this.GetAccessibleName();
}
AdfRichUIPeer.prototype.GetAccessibleName= function()
{
}
AdfRichUIPeer.prototype.isInActiveHeirarchy= function()
{
 var x318=AdfPage.PAGE.getActiveComponentId();
 if(x318!=null)
{
 var x319=AdfPage.PAGE.findComponent(x318);
 var x320=this.getComponent();
do
{
 if(x320==x319)
 return true;
x319=x319.getParent();
}
while(x319!=null);
}
 return false;
}
AdfRichUIPeer.prototype.needsFocusTargetStyleClass= function()
{
 return false;
}
AdfRichUIPeer.prototype.needsChildVisibilityChanges= function(x321)
{
 return false;
}
AdfRichUIPeer.prototype.ChildVisibilityChanged= function(
x322,
x323,
x324)
{
 return false;
}
AdfRichUIPeer.prototype.resizeNotify= function(
x325,
x326,
x327,
x328,
x329)
{
this.bind(x325);
this.ResizeNotify(x326,x327,x328,x329);
}
AdfRichUIPeer.prototype.ResizeNotify= function(
x330,
x331,
x332,
x333)
{
}
AdfRichUIPeer.prototype.descendantMessageChanged= function(x334)
{
this.bind(x334);
this.DescendantMessageChanged();
}
AdfRichUIPeer.prototype.messageNotify= function(
x335,
x336,
x337)
{
AdfAssert.assertNumberOrNull(x336);
AdfAssert.assertArrayOrNull(x337);
this.bind(x335);
this.MessageNotify(x336,x337);
}
AdfRichUIPeer.prototype.messageShow= function(
x338,
x339,
x340)
{
AdfAssert.assertNumberOrNull(x339);
AdfAssert.assertArrayOrNull(x340);
this.bind(x338);
this.MessageShow(x339,x340);
}
AdfRichUIPeer.prototype.DescendantMessageChanged= function()
{
}
AdfRichUIPeer.prototype.MessageNotify= function(x341,x342)
{
 var x343=this.getDomElement();
 var x344=AdfAgent.AGENT.getExpandoProperty(x343,AdfRichUIPeer.__TYPE_ATTR);
 if(x344!=x341)
{
AdfMessageUtils.switchCSSClassName(x343,x344,x341);
AdfAgent.AGENT.setExpandoProperty(x343,AdfRichUIPeer.__TYPE_ATTR,x341);
}
}
AdfRichUIPeer.prototype.MessageShow= function(x345,x346)
{
}
AdfRichUIPeer.prototype.showContextMenu= function(
x347,
x348,
x349,
x350,
x351,
x352)
{
 if (x348)
{
 var x353;
 if(x349)
x353=x349.findComponent(x348);
 else
 x353=AdfPage.PAGE.findComponent(x348);
 if (x353)
{
AdfAssert.assert(x353 instanceof AdfRichPopup,"Invalid popup component for context menu.");
AdfAgent.AGENT.preventDefault(x347);
 var x354={};
x354[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x354[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
x354[AdfDhtmlPopupWindow.HINT_FOCUS]=true;
 if(x352)
x354[AdfRichPopup.HINT_LAUNCH_ID]=x352;
 if(x350!=null)
{
x354[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=x350;
x354[AdfRichPopup.HINT_ALIGN]=x351?x351:AdfRichPopup.ALIGN_AFTER_START;
}
 else
 {
 var x355=AdfAgent.AGENT.getMousePosition(x347);
x354[AdfDhtmlPopupWindow.HINT_MOUSEPOSITION]=x355;
}
x353.show(x354);
}
 else
 {
 if (x349)
AdfLogger.LOGGER.severe("Could not find popup for context menu ",
x348,
" from component ",
x349);
 else
 AdfLogger.LOGGER.severe("Could not find popup for context menu ",
x348);
}
}
}
AdfRichUIPeer.prototype.showPopup= function(
x356,
x357,
x358,
x359)
{
 var x360=x356[AdfRichUIPeer._POPUP_LIST];
 if(x360==null)
x356[AdfRichUIPeer._POPUP_LIST]=x360={};
 var x361={};
x361[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_ALWAYS;
x361[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_INLINESELECTOR;
x361[AdfDhtmlPopupWindow.HINT_FOCUS]=true;
x361[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE]=true;
 if (x356._childHints)
AdfCollections.copyInto(x361,x356._childHints);
AdfCollections.copyInto(x361,x358);
 if(x359==null)
x359=AdfRichUIPeer._POPUP_ID_DEFAULT;
 var x362=x360[x359];
 if (!x362)
{
x362=AdfDhtmlPopupWindowFactory.createPopup(x361);
x360[x359]=x362;
 var x363=x357.id;
 var x364=false;
 if (x363&& !AdfPage.PAGE.findComponent(x363))
{
AdfPage.PAGE.mapComponent(x363,x356);
x364=true;
}
}
x361[AdfDhtmlPopupWindow.HINT_CONTENT]=x357;
x361[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER]=this.createCallback(this._popupClosedHandler);
x361[AdfDhtmlPopupWindow.HINT_COMPONENT_CLIENT_ID]=x356.getClientId();
 var x365=
{"component":x356,"contentDom":x357,"unmap":x364,"popupId":x359};
 var x366=x358?x358[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER]:null;
 if (x366)
{
x365["otherClosedHandler"]=x366;
x365["otherClosedHandlerParams"]=
x358[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER_PARAM];
}
x361[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER_PARAM]=x365;
 var x367=x358?x358[AdfRichPopup.HINT_ALIGN_ID]:null;
 if (x367)
{
 var x368=AdfAgent.AGENT.getElementById(x367);
 if (x368)
x361[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=x368;
x361[AdfRichPopup.HINT_ALIGN_ID]=null;
}
x362.show(x361);
}
AdfRichUIPeer.prototype.isPopupVisible= function(x369,x370)
{
 var x371=this.getPopupWindow(x369,x370);
 if (x371)
 return true;
 return false;
}
AdfRichUIPeer.prototype.hidePopup= function(x372,x373)
{
 var x374=this.getPopupWindow(x372,x373);
 if (x374)
{
x374.hide();
}
}
AdfRichUIPeer.prototype.hideAllPopups= function(x375)
{
 var x376=x375[AdfRichUIPeer._POPUP_LIST];
 if(x376!=null)
{
for(var x377 in x376)
{
 var x378=x376[x377];
 if (x378)
{
x378.hide();
}
}
}
}
AdfRichUIPeer.prototype.cancelPopup= function(x379,x380)
{
 var x381=this.getPopupWindow(x379,x380);
 if (x381)
{
x381.cancel();
}
}
AdfRichUIPeer.prototype.cancelAllPopups= function(x382,x383)
{
 var x384=x382[AdfRichUIPeer._POPUP_LIST];
 if(x384!=null)
{
for(var x385 in x384)
{
 var x386=x384[x385];
 if (x386)
{
x386.cancel(x383);
}
}
}
}
AdfRichUIPeer.prototype.getPopupWindow= function(x387,x388)
{
 var x389=null;
 var x390=x387[AdfRichUIPeer._POPUP_LIST];
 if(x390!=null)
{
 if(x388==null)
x388=AdfRichUIPeer._POPUP_ID_DEFAULT;
x389=x390[x388];
}
 return x389;
}
AdfRichUIPeer.prototype.getAllPopups= function(x391)
{
 return x391[AdfRichUIPeer._POPUP_LIST];
}
AdfRichUIPeer._removeTwinkleCallback= function(x392)
{
 var x393=AdfAgent.AGENT.getElementById(x392);
 if (x393!=null)
{
x393.removeAttribute(AdfRichUIPeer._TWINKLE_TIMER_ID_ATTR);
AdfDomUtils.removeCSSClassName(x393,AdfRichUIPeer._TWINKLE_ON_STYLECLASS);
}
}
AdfRichUIPeer.prototype._popupClosedHandler= function(x394)
{
 var x395=x394.component;
 var x396=x395[AdfRichUIPeer._POPUP_LIST];
 if(x396==null)
 return;
 var x397=x396[x394.popupId];
 if (!x397)
 return;
 var x398=x394.contentDom;
 var x399=x394.popupId;
 delete x396[x399];
 if (x394.unmap)
{
AdfPage.PAGE.unmapComponent(x398.id);
}
this.bind(x395);
this.PopupClosed(x395,x398,x399);
 var x400=x394.otherClosedHandler;
 if (x400)
{
 var x401=x394.otherClosedHandlerParams;
x400(x401);
}
}
AdfRichUIPeer.prototype.PopupClosed= function(x402,x403,x404)
{
}
AdfRichUIPeer.prototype.GetRichResourceURL= function(x405)
{
 return AdfPage.PAGE.getResourceURL("/afr" + x405);
}
AdfRichUIPeer.prototype.scrollIntoView= function(x406,x407,x408)
{
this.bind(x406);
this.ScrollIntoView(x406,x407,x408);
}
AdfRichUIPeer.prototype.ScrollIntoView= function(x409,x410,x411)
{
 var x412=this.getDomElement();
x412.scrollIntoView();
 var x413=null;
 if(x411!=null)
{
x413=AdfAgent.AGENT.getElementById(
AdfRichUIPeer.CreateSubId(x409.getClientId(),x411));
 if(x413)
x413.scrollIntoView();
 else
 AdfLogger.LOGGER.warning("Invalid subTargetId specified:" + x411);
}
 if(x410)
{
 if(x413)
AdfFocusUtils.focusElement(x413);
 else
 {
 var x414=AdfFocusUtils.getFirstTabStop(x412);
 if(x414)
{
AdfFocusUtils.focusElement(x414);
}
}
}
}
AdfRichUIPeer.prototype.getSubIdDomElement= function (x415,x416)
{
this.bind(x415);
 return this.GetSubIdDomElement(x416);
}
AdfRichUIPeer.prototype.GetSubIdDomElement= function (x417)
{
AdfLogger.LOGGER.warning("Unknown subId:",x417," for component ",this.getComponent());
 return null;
}
AdfRichUIPeer.DISABLED_STYLECLASS='p_AFDisabled';
AdfRichUIPeer.READONLY_STYLECLASS='p_AFReadOnly';
AdfRichUIPeer.DROP_TARGET_STYLECLASS='p_AFDropTarget';
AdfRichUIPeer.DRAG_SOURCE_STYLECLASS='p_AFDragSource';
AdfRichUIPeer.BUSY_STYLECLASS='p_AFBusy';
AdfRichUIPeer.HOVER_TARGET_STYLECLASS='p_AFHoverTarget';
AdfRichUIPeer.FOCUS_TARGET_STYLECLASS='p_AFFocusTarget';
AdfRichUIPeer.__TYPE_ATTR="__adfPeerMsgType";
AdfRichUIPeer._POPUP_ID_DEFAULT="__afrPeerPPDefault";
AdfRichUIPeer._POPUP_LIST="__afrPeerPPList";
AdfRichUIPeer._TWINKLE_TIMER_ID_ATTR="__afrTwinkleTimer";
AdfRichUIPeer._TWINKLE_ON_STYLECLASS="p_AFTwinkleOn";

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlShowDisclosurePeer");
AdfDhtmlShowDisclosurePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyChanges(this,
AdfUIShowDetail.DISCLOSED);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfValueChangeEvent.VALUE_CHANGE_TYPE,
AdfDisclosureEvent.EVENT_TYPE);
}
AdfDhtmlShowDisclosurePeer.prototype.BindToComponent= function(
x0,
x1)
{
AdfDhtmlShowDisclosurePeer.superclass.BindToComponent.call(
this,x0,x1);
this.InitDirtyTracking(x0,x1);
}
AdfDhtmlShowDisclosurePeer.prototype.ComponentRemoved= function(
x2)
{
AdfDhtmlShowDisclosurePeer.superclass.ComponentRemoved.call(this,x2);
 var x3=this.getDomElement();
 if (x3)
{
this.RemoveDirtyTracking(x2,x3);
}
}
AdfDhtmlShowDisclosurePeer.prototype.InitDirtyTracking= function(
x4,
x5)
{
 var x6=this.HandleClientSideDisclosure!=null;
 if (!x6||x4.getProperty("handleDisclosure")!="client")
{
 return;
}
this._disclosureHandledClientSide=true;
AdfAgent.AGENT.beginDirtyStateTracking(x4,x5);
}
AdfDhtmlShowDisclosurePeer.prototype.RemoveDirtyTracking= function(
x7,
x8)
{
 if (this._disclosureHandledClientSide!=true)
{
 return;
}
 delete this._disclosureHandledClientSide;
AdfAgent.AGENT.endDirtyStateTracking(x7,x8);
}
AdfDhtmlShowDisclosurePeer.prototype.ComponentDisclosedChanged= function(
x9,
x10,
x11,
x12)
{
 if (this._inHandleDisclosure)
{
 return;
}
this.queueDisclosureEvent(x11,true);
 return true;
}
AdfDhtmlShowDisclosurePeer.prototype.HandleComponentDisclosure= function (
x13)
{
 if (x13.isCanceled()||x13.propagatesToServer()||
x13.getDisclosureCounterpart()!=null||
this._disclosureHandledClientSide!=true||
x13.getSource()!=this.getComponent())
{
 return;
}
this._inHandleDisclosure=true;
try
{
 var x14=this.getComponent();
 var x15=x14.getDisclosed();
this.getComponent().setDisclosed(!x15);
 if (this.HandleClientSideDisclosure(!x15))
{
x13.cancel();
 return true;
}
 return false;
}
finally
{
 delete this._inHandleDisclosure;
}
}
AdfDhtmlShowDisclosurePeer.prototype.HandleComponentValueChange= function (
x16)
{
 if (x16.isCanceled())
{
 return;
}
AdfAgent.AGENT.setDirty(this.getComponent(),null,true);
}
AdfDhtmlShowDisclosurePeer.prototype.queueDisclosureEvent= function(
x17,
x18,
x19)
{
 var x20=this.getComponent();
 var x21=this._disclosureHandledClientSide&&AdfAgent.AGENT.isDirty(x20);
 new AdfDisclosureEvent(x20,x17,x19,
this.DisclosurePropagatesToServer(x17,x21)).queue(x18);
}
AdfDhtmlShowDisclosurePeer.prototype.DisclosurePropagatesToServer= function (
x22,
x23)
{
 if (this._disclosureHandledClientSide!=true||x23==true)
{
 return true;
}
AdfAgent.AGENT.setDirty(this.getComponent(),null,false);
 return false;
}
var AdfDhtmlInputChooseBindingUtils= new Object();
AdfDhtmlInputChooseBindingUtils.registerBinding= function(
x0,
x1,
x2)
{
AdfAssert.assertString(x1);
AdfAssert.assertString(x2);
 var x3=this._getList();
 if ((x3[x1]==null)||(x0))
{
x3[x1]=x2;
this._saveList(x3);
}
 return;
}
AdfDhtmlInputChooseBindingUtils.returnToInputComponent= function(
x4,x5)
{
 var x6=this.getInputComponent(x4.getClientId());
 if(x6!=null)
{
x6.getPeer().handleReturnFromChooseComponent(x6,x5);
}
}
AdfDhtmlInputChooseBindingUtils.updateChooseComponentProperty= function(
x7,
x8,
x9,
x10)
{
 if(x8!=null)
{
 var x11=AdfPage.PAGE.findComponent(x8);
 if(x11!=null)
{
 var x12=x7.getProperty(x9);
 var x13=x11.getPeer();
x13.handleUpdateFromInputComponent(x11,x10,
x12);
}
}
}
AdfDhtmlInputChooseBindingUtils.updateInputComponentProperty= function(
x14,
x15,
x16,
x17)
{
 var x18=this.getInputComponent(x14.getClientId());
 if(x18!=null)
{
 if(x17===undefined)
{
x17=x14.getProperty(x15);
}
 var x19=x18.getPeer();
x19.handleUpdateFromChooseComponent(x18,x16,
x17);
}
}
AdfDhtmlInputChooseBindingUtils.getInputComponent= function(x20)
{
 var x21=this._getList();
 if (x21==null)
 return null;
 var x22=x21[x20];
 if(x22!=null)
{
 return AdfPage.PAGE.findComponent(x22);
}
 return null;
}
AdfDhtmlInputChooseBindingUtils.getChooseId= function(x23)
{
 var x24=x23.getChooseId();
 if(x24!=null)
{
 var x25=x23.findComponent(x24);
 if (x25)
{
 return x25.getClientId();
}
 else
 {
AdfLogger.LOGGER.warning("For the component with the id '" +
 x23.getClientId() +
 "', no component with the choose id '" + x24 +
 "' was found");
}
}
 return null;
}
AdfDhtmlInputChooseBindingUtils._getList= function()
{
 var x26=AdfPage.PAGE;
 var x27=x26.getPageProperty(AdfDhtmlInputChooseBindingUtils._PROPERTY_NAME);
 if (x27==null)
{
x27= new Object();
}
 return x27;
}
AdfDhtmlInputChooseBindingUtils._saveList= function(x28)
{
 var x29=AdfPage.PAGE;
x29.setPageProperty(AdfDhtmlInputChooseBindingUtils._PROPERTY_NAME,x28);
}
AdfDhtmlInputChooseBindingUtils._PROPERTY_NAME=
"AdfDhtmlInputChooseBindingUtils.binding";

function AdfContentFetchEvent(
x0,
x1,
x2
)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfContentFetchEvent,AdfComponentEvent);
AdfContentFetchEvent.FETCH_EVENT_TYPE="fetch";
AdfContentFetchEvent.LOADED_EVENT_TYPE="contentLoaded";
AdfContentFetchEvent.SYNC_EVENT_TYPE="syncProps";
AdfContentFetchEvent.prototype.Init= function(
x0,x1,x2
)
{
this._params=x2;
AdfContentFetchEvent.superclass.Init.call(this,x0,x1);
this.setPartial(true);
this.setRoot(x0);
}
AdfContentFetchEvent.prototype.IsDeleveryDiscrete= function()
{
 return (this.getType()==AdfContentFetchEvent.SYNC_EVENT_TYPE);
}
AdfContentFetchEvent.prototype.propagatesToServer= function()
{
 return (this.getType()==AdfContentFetchEvent.FETCH_EVENT_TYPE||
this.getType()==AdfContentFetchEvent.SYNC_EVENT_TYPE);
}
AdfContentFetchEvent.prototype.getClearMessages= function()
{
 return false;
}
AdfContentFetchEvent.prototype.AddMarshalledProperties= function(
x3)
{
AdfContentFetchEvent.superclass.AddMarshalledProperties.call(this,x3);
 if (this._params)
{
for(var x4 in this._params)
{
x3[x4]=this._params[x4];
}
}
}

function AdfInitializationBehavior(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfInitializationBehavior,AdfClientBehavior);
AdfInitializationBehavior.prototype.initialize= function(component)
{
try
{
eval(this._js);
}
catch(e)
{
 if (AdfLogger.LOGGER.getLevel()>=AdfLogger.WARNING)
{
AdfLogger.LOGGER.logErrorAsWarning(e," initializing " + this + " on " + component);
}
}
}
AdfInitializationBehavior.prototype.Init= function(x0)
{
AdfInitializationBehavior.superclass.Init.call(this);
AdfAssert.assertString(x0);
this._js=x0;
}
function AdfSelectItem(
x0,
x1,
x2
)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfSelectItem);
AdfSelectItem.prototype.Init= function(
x0,
x1,
x2)
{
AdfSelectItem.superclass.Init.call(this);
AdfAssert.assertStringOrNull(x0);
AdfAssert.assertStringOrNull(x1);
 if (x2)
{
AdfAssert.assertBoolean(x2);
this._disabled=x2;
}
 if (x0!=null)
this._value=x0;
 if (x1!=null)
this._label=x1;
}
AdfSelectItem.InitClass= function()
{
 var x3=this.prototype;
x3._value=null;
x3._label=null;
x3._disabled=false;
}
AdfSelectItem.prototype.getValue= function()
{
 return this._value;
}
AdfSelectItem.prototype.getLabel= function()
{
 return this._label;
}
AdfSelectItem.prototype.isDisabled= function()
{
 return this._disabled;
}
AdfSelectItem.prototype.setValue= function(x4)
{
AdfAssert.assertStringOrNull(x4);
this._value=x4;
}
AdfSelectItem.prototype.setLabel= function(x5)
{
AdfAssert.assertStringOrNull(x5);
this._label=x5;
}
AdfSelectItem.prototype.setDisabled= function(x6)
{
AdfAssert.assertBoolean(x6);
this._disabled=x6;
}

function AdfRangeValue(
x0,
x1
)
{
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfRangeValue);
AdfRangeValue.prototype.equals= function(x0)
{
 if (this._minimum==x0._minimum&&this._maximum==x0._maximum)
{
 return true;
}
 return false;
}
AdfRangeValue.prototype.getMinimum= function()
{
 return this._minimum;
}
AdfRangeValue.prototype.getMaximum= function()
{
 return this._maximum;
}
AdfRangeValue.prototype.setMinimum= function(x1)
{
AdfAssert.assertNumberOrNull(x1);
this._minimum=x1;
}
AdfRangeValue.prototype.setMaximum= function(x2)
{
AdfAssert.assertNumberOrNull(x2);
this._maximum=x2;
}
AdfRangeValue.prototype.toString= function()
{
 return this._minimum + "," + this._maximum;
}
AdfRangeValue.InitClass= function()
{
 var x3=this.prototype;
x3._minimum=null;
x3._maximum=null;
}
AdfRangeValue.prototype.Init= function(
x4,
x5
)
{
AdfRangeValue.superclass.Init.call(this);
AdfAssert.assertNumberOrNull(x4);
AdfAssert.assertNumberOrNull(x5);
 if (x4>x5)
{
 var x6=x4;
x4=x5;
x5=x6;
}
 if (x4!=null)
this._minimum=x4;
 if (x5!=null)
this._maximum=x5;
}
AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlInlineFramePeer");
AdfDhtmlInlineFramePeer.InitSubclass= function()
{
 var x0=[];
x0._fastPoll=false;
x0._timerId=undefined;
this._iframeIds=x0;
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichInlineFrame.SOURCE);
this._LOAD_EVENT_TYPE="inlineFrameLoad";
}
AdfDhtmlInlineFramePeer.prototype.InitDomElement= function(x1,x2)
{
AdfDhtmlInlineFramePeer.superclass.InitDomElement.call(this,x1,x2);
 var x3=this.__getIframe(x2);
 var x4=x3.getAttribute("_src");
 if (x4!=null)
{
AdfPage.PAGE.__perfTimings(false,false,true
,"GET request sent for iFrame. Source is: "
,x4
);
x3.setAttribute("src",x4);
x3.removeAttribute("_src");
}
}
AdfDhtmlInlineFramePeer.prototype.ComponentSourceChanged= function(
x5,
x6,
x7,
x8)
{
 var x9=x6;
 if (x9.tagName!="IFRAME")
{
x9=AdfDomUtils.getFirstChildElement(x6);
}
 if (!x9||x9.tagName!="IFRAME")
{
 return false;
}
x9.src=x7;
 return true;
}
AdfDhtmlInlineFramePeer.prototype.BindToComponent= function(x10,x11)
{
AdfDhtmlInlineFramePeer.superclass.BindToComponent.call(this,x10,x11);
 var x12=x11;
 if (x12.tagName!="IFRAME")
{
x12=AdfDomUtils.getFirstChildElement(x11);
}
 var x13=x10.getSizing();
 if ((x13==="preferred")&&(x12.getAttribute("_adfLoaded")==="1"))
{
AdfDhtmlInlineFramePeer._registerIFrameForSizing(x12);
}
}
AdfDhtmlInlineFramePeer.prototype.ComponentRemoved= function(x14)
{
 var x15=x14.getSizing();
 if (x15==="preferred")
{
 var x16=AdfDhtmlInlineFramePeer._iframeIds;
AdfCollections.removeArrayValue(x16,x14.getClientId());
 if (x16.length==0)
{
AdfPage.PAGE.getDomWindow().clearInterval(x16._timerId);
x16._timerId=undefined;
}
}
AdfDhtmlInlineFramePeer.superclass.ComponentRemoved.call(this,x14);
}
AdfDhtmlInlineFramePeer.prototype.ScrollIntoView= function(x17,x18,x19)
{
 var x20=this.getDomElement();
 if (x20.tagName!="IFRAME")
{
x20=AdfDomUtils.getFirstChildElement(x20);
}
x20.scrollIntoView();
 var x21=x20.contentWindow.document;
 var x22=null;
 if(x19!=null)
{
x22=x21.getElementById(x19);
 if(x22)
x22.scrollIntoView();
}
 if(x18)
{
 if(x22)
AdfFocusUtils.focusElement(x22);
 else
 {
AdfFocusUtils.focusElement(x20);
}
}
}
AdfDhtmlInlineFramePeer.__iframeLoadHandler= function(x23)
{
AdfPage.PAGE.__perfTimings(false,false,false,"iFrame load handler called.");
 var x24=AdfAgent.AGENT;
 var x25=AdfPage.PAGE;
 var x26=x23;
 if (x24.getPlatform()==AdfAgent.IE_PLATFORM)
{
 if (!x26)
x26=x25.getDomWindow().event;
x26=x24.cloneEvent(x26);
}
 else if (x24.getPlatform()==AdfAgent.WEBKIT_PLATFORM)
{
x26=x24.cloneEvent(x26);
}
 var x27=x24.getEventTarget(x26);
 if (x27==null)
x27=x26.currentTarget;
 if (x27.getAttribute("_adfLoaded")==="1")
{
AdfPage.PAGE.__perfTimings(false,false,true
,"GET response received for iFrame. Source is: "
,x27.getAttribute("src")
);
}
 var x28=x27.getAttribute("id");
 var x29=x28.indexOf("::f");
 if (x29!= -1&&x29==x28.length - 3)
x28=x27.parentNode.getAttribute("id");
AdfAssert.assertString(x28,"clientId");
 var x30=x25.findComponent(x28);
 if (x30)
{
AdfDhtmlInlineFramePeer._removeLoadingStatus(x27,x28);
 new AdfDomComponentEvent(x30,AdfDhtmlInlineFramePeer._LOAD_EVENT_TYPE,x26).queue(true);
 var x31=x30.getSizing();
 if (x31==="preferred")
{
 if (!AdfDhtmlInlineFramePeer._isIframeSizingAllowed(x27))
{
AdfPage.PAGE.__perfTimings(true,false,true
,"Response processig done for iFrame. Source is: "
,x27.getAttribute("src")
);
 return;
}
 if (x27.getAttribute("_adfLoaded")==="1")
{
x27.style.minWidth="0px";
x27.style.minHeight="0px";
AdfPage.PAGE.__perfTimings(false,false,false,"Immediately resizing iFrame.");
AdfDhtmlInlineFramePeer._resizeIframeToPreferred(x27);
AdfPage.PAGE.__perfTimings(true,false,true
,"Response processig done for iFrame. Source is: "
,x27.getAttribute("src")
);
}
 else
 {
AdfPage.PAGE.__perfTimings(false,false,false,"Registering iFrame for resizing.");
AdfDhtmlInlineFramePeer._registerIFrameForSizing(x27);
}
}
 else
 {
AdfPage.PAGE.__perfTimings(true,false,true
,"Response processig done for iFrame. Source is: "
,x27.getAttribute("src")
);
}
}
 else
 {
x27.setAttribute("_adfLoaded","1");
}
}
AdfDhtmlInlineFramePeer._removeLoadingStatus= function(x32,x33)
{
 var x34=x32.getAttribute("_src");
 if (x34!=null)
{
 return;
}
 var x35=AdfDomUtils.containsCSSClassName(x32,"p_AFFlow");
 if (x35)
{
AdfDomUtils.removeCSSClassName(x32,"p_AFBusy");
AdfLogger.LOGGER.fine("Removed busy from iframe: ",x33);
}
 else
 {
 var x36=x32.parentNode;
AdfDomUtils.removeCSSClassName(x36,"p_AFBusy");
AdfLogger.LOGGER.fine("Removed busy from iframe's parentNode: ",x33);
}
}
AdfDhtmlInlineFramePeer._registerIFrameForSizing= function(x37)
{
AdfAssert.assertDomElement(x37);
 if (!AdfDhtmlInlineFramePeer._isIframeSizingAllowed(x37))
{
 return;
}
 var x38=AdfDhtmlInlineFramePeer._iframeIds;
 var x39=x37.id;
 if (AdfCollections.indexOf(x38,x39)> -1)
{
x38.push(x39);
}
AdfDhtmlInlineFramePeer._resizeIframeToPreferred(x37);
AdfPage.PAGE.__perfTimings(true,false,true
,"Response processig done for iFrame. Source is: "
,x37.getAttribute("src")
);
 if (x38.length==1)
{
x38._timerId=AdfPage.PAGE.getDomWindow().setInterval(
AdfDhtmlInlineFramePeer._minSizeResizeListener,1000);
}
}
AdfDhtmlInlineFramePeer._isIframeSizingAllowed= function(x40)
{
try
{
 var x41=x40.contentWindow;
 var x42=AdfAgent.AGENT.getWindowScrollWidth(x41);
 return true;
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,"Error sizing iframe. This could occur if the iframe's " +
 "sizing is set to preferred and the iframe's source is not from the same domain as the page. " +
 "iframe id: " + x40.id + ", iframe source: " + x40.src + ", page location: " +
 window.location + ".");
 return false;
}
}
AdfDhtmlInlineFramePeer._resizeIframeToPreferred= function(x43)
{
 if (!AdfDhtmlInlineFramePeer._isIframeSizingAllowed(x43))
{
 return false;
}
 var x44=false;
 var x45=AdfPage.PAGE.getLookAndFeel();
 if (AdfDomUtils.containsCSSClassName(x43,x45.getStyleClass("AFStretchWidth"))||
AdfDomUtils.containsCSSClassName(x43,x45.getStyleClass("AFAuxiliaryStretchWidth")))
{
x44=true;
}
 var x46=AdfAgent.AGENT;
 var x47=x43.contentWindow;
 var x48=0;
 if (!x44)
{
x48=x46.getWindowScrollWidth(x47) -
 x46.getWindowClientWidth(x47);
}
 var x49=x46.getWindowScrollHeight(x47) -
 x46.getWindowClientHeight(x47);
 var x50=false;
 var x51=x43.style;
 if (x48>0)
{
x51.minWidth=(x43.offsetWidth + x48) + "px";
x50=true;
}
 var x52=AdfDhtmlInlineFramePeer._iframeIds;
 var x53=x43.id;
 if (x49>0)
{
x51.minHeight=(x43.offsetHeight + x49 + 1) + "px";
x50=true;
x52[x53]=x43.clientWidth;
}
 else
 {
 var x54=x52[x53];
 if ((x54!==undefined)&&(x43.clientWidth>x54))
{
x51.minHeight="0px"
x50=true;
}
}
 return x50;
}
AdfDhtmlInlineFramePeer._minSizeResizeListener= function()
{
 var x55=AdfDhtmlInlineFramePeer._iframeIds;
 if (x55.length==0)
 return;
 var x56=false;
 var x57=document;
 var x58=x55.length;
 var x59=AdfDhtmlInlineFramePeer._resizeIframeToPreferred;
for(var x60=0;x60<x58;x60++)
{
 var x61=x55[x60];
 var x62=x57.getElementById(x61);
x56|=x59(x62);
}
 if (x56^x55._fastPoll)
{
 var x63=AdfPage.PAGE.getDomWindow();
 if (x55._timerId!==undefined)
x63.clearInterval(x55._timerId);
 var x64=(x56)?100:1000;
x55._timerId=x63.setInterval(AdfDhtmlInlineFramePeer._minSizeResizeListener,
x64);
x55._fastPoll=x56;
}
}
AdfDhtmlInlineFramePeer.prototype.__getIframe= function (x65)
{
 var x66=(x65?x65:this.getDomElement());
 if (x66.tagName!="IFRAME")
{
x66=AdfDomUtils.getFirstChildElement(x66);
}
AdfAssert.assertDomElement(x66,"IFRAME");
 return x66;
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlValuePeer");
AdfDhtmlValuePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,AdfUIValue.VALUE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfUIValue.VALUE);
}
AdfDhtmlValuePeer.prototype.getConvertedValue= function(
x0,
x1)
{
 var x2=x1;
 if (x0==null)
x0=this.getComponent();
 if (x0.getConverter)
{
 var x3=x0.getConverter();
 if (x3!=null)
{
x2=x3.getAsObject(x1,
x0.getProperty("label"));
}
}
 return x2;
}
AdfDhtmlValuePeer.prototype.getFormatHint= function(x4)
{
 if (x4.getConverter)
{
 var x5=x4.getConverter();
 if (x5&&x5.getFormatHint)
{
 return x5.getFormatHint();
}
 else
 return null;
}
 return null;
}
AdfDhtmlValuePeer.prototype.getConvertedObject= function(
x6,
x7)
{
 if (x7!=null)
{
 var x8=x7;
 if (x6==null)
x6=this.getComponent();
 if (x6.getConverter!=undefined)
{
 var x9=x6.getConverter();
 if (x9!=null)
{
x8=x9.getAsString(x7,x6.getProperty("label"));
}
}
 return x8;
}
 return null;
}
AdfDhtmlValuePeer.prototype.isEmpty= function(
x10)
{
 if (x10==null)
 return true;
x10=AdfUIUtils.trim(x10);
 return (x10.length==0);
}
AdfDhtmlValuePeer.prototype.GetDisplayValue= function(
x11,
x12,
x13)
{
AdfAssert.failedInAbstractFunction();
}
AdfDhtmlValuePeer.prototype.SetDisplayValue= function(
x14,
x15,
x16)
{
AdfAssert.failedInAbstractFunction();
}
AdfDhtmlValuePeer.prototype.GetComponentValue= function(
x17,
x18)
{
 var x19=this.GetDisplayValue(x17,x18,true);
 if (!this.isEmpty(x19))
{
try
{
 var x20=this.getConvertedValue(x17,x19);
 return x20;
}
catch(e)
{
 return null;
}
}
 return null;
}
AdfDhtmlValuePeer.prototype.ComponentValueChanged= function(
x21,
x22,
x23,
x24)
{
 if(x23==null)
{
x23=this.GetNullDefault();
}
 else
 {
 var x25=this.getConvertedObject(x21,x23);
 if (x25===undefined)
{
AdfLogger.LOGGER.warning("The new value '",x23,"' could not be converted for display.");
 return;
}
x23=x25;
}
 return this.SetDisplayValue(x21,x22,x23);
}
AdfDhtmlValuePeer.prototype.GetNullDefault= function()
{
 return "";
}

AdfRichUIPeer.createPeerClass(AdfDhtmlValuePeer,"AdfDhtmlEditableValuePeer");
AdfDhtmlEditableValuePeer.InitSubclass= function()
{
this._CONTENT_ID="content";
this._CONTENT_ID_ATTR_NAME="__afrEditableValueContentId";
this._NOTE_WINDOW_POPUP_ID="_afNoteWindowPopup";
this._INSTRUCTIONS_TEXT="_afrInstructionsText";
this._HELPICON_ID="_afrHelpIcon";
this._INITIALIZED="_adfInitialized";
this._NOTE_WINDOW_SEPARATOR_STYLE_CLASS="AFNoteWindowSeparator";
this._NOTE_WINDOW_HINT_TEXT_STYLE_CLASS="AFNoteWindowHintText";
this._NOTE_WINDOW_INSTRUCTIONS_STYLE_CLASS="AFNoteWindowInstructions";
this._NOTE_WINDOW_SHORT_DESC_STYLE_CLASS="AFNoteWindowShortDesc";
this._NOTE_WINDOW_FOOTER_STYLE_CLASS="AFNoteWindowFooter";
this._NOTE_WINDOW_MAX_WIDTH=340;
this._OLD_VALUE_EXPANDO="_afOV";
this._SCREEN_READER_NOTE_WINDOW_LAUNCH_ID="nwl";
this._SCREEN_READER_LAUNCH_ID_EXPANDO="_afrLaunchId";
this._SCREEN_READER_NOTE_WINDOW_STATIC_EXPANDO="_afrStatic";
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIValue.VALUE);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE);
}
AdfDhtmlEditableValuePeer.prototype.InitDomElement= function(x0,x1)
{
AdfDhtmlEditableValuePeer.superclass.InitDomElement.call(this,x0,x1);
 if (AdfPage.PAGE.isScreenReaderMode())
{
this._initializeScreenReader(x0,x1);
}
}
AdfDhtmlEditableValuePeer.prototype.autoSubmit= function(x2)
{
AdfAutoSubmitEvent.queue(x2);
}
AdfDhtmlEditableValuePeer.prototype.disableBrowserAutoComplete= function(x3)
{
 var x4=AdfDhtmlEditableValuePeer.GetContentNode(x3);
 if (x4&&
x4.tagName=='INPUT'&&
x4.getAttribute("type")=='text')
{
x4.setAttribute("AUTOCOMPLETE","off");
}
}
AdfDhtmlEditableValuePeer.prototype.BindToComponent= function(x5,x6)
{
AdfDhtmlEditableValuePeer.superclass.BindToComponent.call(this,x5,x6);
 var x7=this.IsInitialized(x5,x6);
 if (!x7)
{
this.LazyInitialize(x5,x6);
 var x8=AdfAgent.AGENT;
x8.setExpandoProperty(x6,AdfDhtmlEditableValuePeer._INITIALIZED,"init");
}
}
AdfDhtmlEditableValuePeer.prototype.IsInitialized= function(x9,x10)
{
 var x11=AdfAgent.AGENT;
 var x12=x11.getExpandoProperty(x10,AdfDhtmlEditableValuePeer._INITIALIZED);
 if (!x12)
{
 return false;
}
 return true;
}
AdfDhtmlEditableValuePeer.prototype.Validate= function(x13,x14)
{
AdfPage.PAGE.clearMessages(x13.getClientId());
x13.validate(x14);
}
AdfDhtmlEditableValuePeer.prototype.GetValidatorHints= function(x15)
{
 if (x15.getValidators)
{
 var x16=x15.getValidators();
 if (x16!=null)
{
 var x17= new Array();
 var x18=x15.getConverter();
for(var x19=0;x19<x16.length;x19++)
{
 var x20=x16[x19];
 if(x20.getHints)
{
 var x21=x20.getHints(x18);
 if(x21)
{
for(var x22=0;x22<x21.length;x22++)
{
x17.push(x21[x22]);
}
}
}
}
 if(x17.length==0)
{
x17=null;
}
 return x17;
}
}
 return null;
}
AdfDhtmlEditableValuePeer.GetContentNodeId= function(x23,x24)
{
AdfAssert.assert(x23!=null);
 if (!x24)
{
x24=AdfRichUIPeer.getDomElementForComponent(x23);
}
AdfAssert.assert(x24!=null);
 var x25=AdfAgent.AGENT.getExpandoProperty(x24,
AdfDhtmlEditableValuePeer._CONTENT_ID_ATTR_NAME);
 if (x25==null)
{
 var x26=AdfRichUIPeer.CreateSubId(x23.getClientId(),
AdfDhtmlEditableValuePeer._CONTENT_ID);
 var x27=AdfAgent.AGENT.getElementById(x26);
 if(!x27||x27.id==null)
{
x27=x24;
}
 var x28=x27.id;
AdfAssert.assert(x28!=null);
AdfAgent.AGENT.setExpandoProperty(x24,
AdfDhtmlEditableValuePeer._CONTENT_ID_ATTR_NAME,
x28);
 return x28
}
 return x25;
}
AdfDhtmlEditableValuePeer.GetContentNode= function(x29,x30)
{
AdfAssert.assert(x29!=null);
 var x31=AdfDhtmlEditableValuePeer.GetContentNodeId(x29,x30);
 if (x31)
{
 var x32=AdfAgent.AGENT.getElementById(x31);
 if (x32)
{
 return x32;
}
}
 return x30;
}
AdfDhtmlEditableValuePeer.prototype.ShowNoteWindowMouseOver= function(x33)
{
 var x34=AdfPage.PAGE;
 if(this.IsNoteWindowVisible()||x34.isScreenReaderMode())
 return;
 var x35=this.getComponent();
 var x36=x35.getClientId();
 if (this._noteCompMouseId&&
this._noteCompMouseId!=x36)
{
this._killNoteWindowMouseTimeout();
}
 var x37=AdfDomUtils.isAncestorOrSelf(
AdfDhtmlEditableValuePeer.GetContentNode(x35),
x33.getNativeEventTarget());
 if(this._noteWindowFocusTimeout==null&&this._noteWindowMouseTimeout==null
&&x37)
{
this._noteCompMouseId=x36;
this._noteWindowMouseTimeout=x34.scheduleTimer(
this,this._onMouseOverTimeout,x35.getClientId(),500);
}
 else if(this._noteWindowMouseTimeout!=null&&
this._noteWindowFocusTimeout==null&& !x37)
{
this._killNoteWindowMouseTimeout();
}
}
AdfDhtmlEditableValuePeer.prototype.HandleComponentClick= function(x38)
{
 if(x38.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x39=this.getComponent();
 if (AdfPage.PAGE.isScreenReaderMode())
{
 if (x38.isLeftButtonPressed())
{
 var x40=x38.getNativeEventTarget();
 var x41=AdfAgent.AGENT.getExpandoProperty(this.getDomElement(),
AdfDhtmlEditableValuePeer._SCREEN_READER_LAUNCH_ID_EXPANDO);
 if (x40.id==x41||x40.parentNode.id==x41)
{
this.ShowNoteWindow(x39,false);
}
}
}
}
}
AdfDhtmlEditableValuePeer.prototype.HandleComponentFocus= function(x42)
{
 var x43=x42.getEventPhase();
 var x44=this.getComponent();
 if(x43==AdfBaseEvent.AT_TARGET_PHASE||
(x43==AdfBaseEvent.BUBBLING_PHASE&&
x44==this._getPublicComponentOrAncestor(x42.getSource())))
{
 var x45=AdfPage.PAGE;
 if (x45.isScreenReaderMode())
{
 var x46=x45.getActiveDomElement();
 if ( !AdfDomUtils.isVisible(x46))
{
AdfLogger.LOGGER.fine("Attempt to focus on element that's not visible, moving focus to next tab stop.");
AdfFocusUtils.focusNextTabStop(x46);
}
 return;
}
 if (this._noteCompFocusId&&this._noteCompFocusId!=x44.getClientId())
{
this._killNoteWindowTimeout();
}
 if(this.IsNoteWindowVisible())
{
this.ShowNoteWindow();
}
 else
 {
 if(this._noteWindowFocusTimeout==null)
{
this._killNoteWindowMouseTimeout();
this._noteCompFocusId=x44.getClientId();
this._noteWindowFocusTimeout=x45.scheduleTimer(
this,this._onFocusTimeout,x44.getClientId(),400);
}
}
}
}
AdfDhtmlEditableValuePeer.prototype.ComponentChanged= function(x47)
{
 if (!x47.getPreviousComponent)
 return;
 var x48=x47.getPreviousComponent();
 var x49=x47.getNextComponent();
 if (!x48)
 return x49!=null;
 if (!x49)
 return true;
 return x48.getClientId()!=x49.getClientId();
}
AdfDhtmlEditableValuePeer.prototype.VetoShowNoteWindow= function(x50)
{
 return false;
}
AdfDhtmlEditableValuePeer.prototype.HandleComponentKeyUp= function(x51)
{
 if(x51.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 if (!x51.isCanceled())
{
 var x52=x51.getNativeEvent();
 var x53=x51.getKeyCode();
 if ((x52.ctrlKey)&&(x52.altKey)&&(x53==AdfKeyStroke.W_KEY)){
 var x54=this.getComponent();
 var x55=this.getPopupWindow(x54,AdfDhtmlEditableValuePeer._NOTE_WINDOW_POPUP_ID);
 if (x55)
{
x55.activate();
x51.cancel();
x51.stopBubbling();
}
}
}
}
}
AdfDhtmlEditableValuePeer.prototype.ShowNoteWindow= function(x56,x57)
{
this._killNoteWindowTimeout();
 if (!x56)
x56=this.getComponent();
 if (!this.IsNoteWindowVisible(x56))
{
 if (!x56.getDisabled()&& !x56.getReadOnly()&& !this.VetoShowNoteWindow(x56))
{
 var x58=AdfRichUIPeer.getDomElementForComponent(x56);
 if (x58)
{
 var x59=AdfAgent.AGENT;
 var x60=x56.getClientId();
 var x61=AdfPage.PAGE;
 var x62=x61.getDomDocument();
 var x63=[];
 var x64=null;
 var x65=null;
 if (this.ShouldShowHint(x56,x58)==true)
{
x64=this.getFormatHint(x56);
x65=this.GetValidatorHints(x56);
}
 var x66=AdfMessageUtils.hasMessagePopupContent(x60);
 if (x66)
{
 var x67=AdfMessageUtils.getComponentMessagePopupDom(x60);
x63.push(x67);
}
 if ((x64!=null)||(x65!=null))
{
 var x68=x62.createElement("div");
AdfDomUtils.addCSSClassName(x68,AdfDhtmlEditableValuePeer._NOTE_WINDOW_HINT_TEXT_STYLE_CLASS);
 if (x64!=null)
x68.appendChild(AdfDhtmlNoteWindowPopupSelector.createTextDom(x64));
 if (x65!=null)
{
for(var x69=0;x69<x65.length;x69++)
x68.appendChild(AdfDhtmlNoteWindowPopupSelector.createTextDom(x65[x69]));
}
x63.push(x68);
}
 var x70=x58.getAttribute(AdfDhtmlEditableValuePeer._INSTRUCTIONS_TEXT);
 if (x70!=null)
{
 var x71=x62.createElement("div");
AdfDomUtils.addCSSClassName(
x71,
AdfDhtmlEditableValuePeer._NOTE_WINDOW_INSTRUCTIONS_STYLE_CLASS);
x71.appendChild(AdfDhtmlNoteWindowPopupSelector.createTextDom(x70));
x63.push(x71);
}
 var x72=x56.getShortDesc();
 if (x72!=null&&AdfUIUtils.trim(x72).length>0)
{
 var x73=x62.createElement("div");
AdfDomUtils.addCSSClassName(
x73,
AdfDhtmlEditableValuePeer._NOTE_WINDOW_SHORT_DESC_STYLE_CLASS);
x59.setTextContent(x73,x72);
x63.push(x73);
}
 if (x66&& !x61.isScreenReaderMode())
{
 var x74=AdfMessageUtils.getComponentMessagePopupFooterDom(x60);
 if (x74)
{
 var x75=x62.createElement("div");
AdfDomUtils.addCSSClassName(
x75,
AdfDhtmlEditableValuePeer._NOTE_WINDOW_FOOTER_STYLE_CLASS);
 var x76=x63.pop();
x75.appendChild(x76);
x75.appendChild(x74);
x63.push(x75);
}
}
 if (!AdfCollections.isEmpty(x63))
{
 var x77={};
x77[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_NOTEWINDOW;
x77[AdfRichPopup.HINT_ALIGN]=this.GetNoteWindowAlignmentHint();
 var x78;
 var x79=this.GetNoteWindowAlignmentNode(x56);
 if (x79!=null)
{
 var x80=x59.getComputedStyle(x79);
 if ((x80.display!="none")&&(x80.visibility!="hidden"))
{
x78=x79.id;
 if (x78!=null)
{
x77[AdfRichPopup.HINT_ALIGN_ID]=x78;
}
}
}
 if ((x78==null)||(x78==""))
{
x79=AdfRichUIPeer.getDomElementForComponent(x56);
x78=x79.id;
 if ((x78==null)||(x78==""))
{
AdfLogger.LOGGER.warning(
"No popup alignment node ID could be found for the component with client ID = ",x60);
}
 else
 {
x77[AdfRichPopup.HINT_ALIGN_ID]=x78;
}
}
 var x81;
 if (AdfCollections.isArray(x63))
{
 var x82=x62.createElement("div");
for(var x69=0;x69<x63.length;x69++)
{
 if (x69>0)
{
 var x83=x62.createElement("hr");
AdfDomUtils.addCSSClassName(x83,AdfDhtmlEditableValuePeer._NOTE_WINDOW_SEPARATOR_STYLE_CLASS);
x82.appendChild(x83);
}
 if ((typeof x63[x69])=="string")
{
x82.appendChild(AdfDhtmlNoteWindowPopupSelector.createTextDom(x63[x69]));
}
 else
 {
AdfAssert.assertDomElement(x63[x69]);
x82.appendChild(x63[x69]);
}
}
x81=x82;
}
 else if ((typeof x63)=="string")
{
x81=AdfDhtmlNoteWindowPopupSelector.createTextDom(x63);
}
x77[AdfRichPopup.HINT_LAUNCH_ID]=x60;
x77[AdfDhtmlPopupWindow.HINT_FOCUS]=false;
x77[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=x57?
AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT:AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
 if(x57)
x77[AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT_ID]=x79.id;
x77[AdfDhtmlPopupWindow.HINT_MAX_WIDTH]=AdfDhtmlEditableValuePeer._NOTE_WINDOW_MAX_WIDTH;
this.showPopup(x56,x81,x77,
AdfDhtmlEditableValuePeer._NOTE_WINDOW_POPUP_ID);
}
}
}
}
 else
 {
 if(!x57)
{
 var x84={};
x84[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
AdfPage.PAGE.getAutoDismissalManager().changeBehavior(x56,x84);
}
}
}
AdfDhtmlEditableValuePeer.prototype.HideNoteWindow= function(x85)
{
 if (!x85)
x85=this.getComponent();
this._killNoteWindowTimeout();
this.hidePopup(x85,AdfDhtmlEditableValuePeer._NOTE_WINDOW_POPUP_ID);
}
AdfDhtmlEditableValuePeer.prototype.IsNoteWindowVisible= function(x86)
{
 if (!x86)
x86=this.getComponent();
 if(this.isPopupVisible(x86,AdfDhtmlEditableValuePeer._NOTE_WINDOW_POPUP_ID))
 return true;
 return false;
}
AdfDhtmlEditableValuePeer.prototype.GetNoteWindowAlignmentHint= function()
{
 return AdfRichPopup.ALIGN_BEFORE_AFTER;
}
AdfDhtmlEditableValuePeer.prototype.GetNoteWindowAlignmentNode= function(x87,x88)
{
 return AdfDhtmlEditableValuePeer.GetContentNode(x87,x88);
}
AdfDhtmlEditableValuePeer.prototype.GetComponentValue= function(
x89,
x90)
{
 var x91=x89.getValid();
 if (x91==true)
{
 return AdfDhtmlEditableValuePeer.superclass.GetComponentValue.call(
this,x89,x90);
}
 return null;
}
AdfDhtmlEditableValuePeer.prototype.ComponentSubmittedValueChanged= function(
x92,
x93,
x94,
x95)
{
 if(x94==null)
{
x94=this.GetNullDefault();
}
this.SetDisplayValue(x92,x93,x94);
}
AdfDhtmlEditableValuePeer.prototype.GetComponentLabel= function(
x96,
x97)
{
 var x98=x97.getElementsByTagName("LABEL");
 var x99=(x98.length)?x98[0]:null;
 if (x99!=null)
{
 return AdfAgent.AGENT.getTextContent(x99);
}
 else
 {
 return null;
}
}
AdfDhtmlEditableValuePeer.__componentLabelChanged= function(
x100,
x101,
x102,
x103)
{
 if (x103!=null)
{
 var x104=AdfDomUtils.getFirstDescendentElement(x101,"LABEL");
 if (x104)
{
 return AdfDomUtils.handleTextChangeWithAccessKey(x100,x104,
x102);
}
}
 return false;
}
AdfDhtmlEditableValuePeer.prototype.ComponentLabelChanged=
AdfDhtmlEditableValuePeer.__componentLabelChanged;
AdfDhtmlEditableValuePeer.prototype.GetDisplayValue= function(
x105,
x106,
x107)
{
 if (x107)
{
 return this.GetSubmittedValue(x105,x106);
}
 return this.GetComponentSubmittedValue(x105,x106);
}
AdfDhtmlEditableValuePeer.prototype.GetComponentSubmittedValue= function(
x108,
x109)
{
 if(!this.WasSubmitted(x108))
{
 return null;
}
 else
 {
 return this.GetSubmittedValue(x108,x109);
}
}
AdfDhtmlEditableValuePeer.prototype.WasSubmitted= function(
x110)
{
 return !((x110.getDisabled&&x110.getDisabled())||(x110.getReadOnly&&x110.getReadOnly()));
}
AdfDhtmlEditableValuePeer.prototype.GetSubmittedValue= function(
x111,
x112)
{
AdfAssert.failedInAbstractFunction();
}
AdfDhtmlEditableValuePeer.prototype.MessageNotify= function(x113,x114)
{
AdfDhtmlEditableValuePeer.superclass.MessageNotify.call(this,x113,x114);
 if (this.IsNoteWindowVisible())
{
this.HideNoteWindow();
}
 var x115=AdfPage.PAGE;
 if (x115.isScreenReaderMode())
{
this._messageNotifyScreenReader(x113,x114);
}
 else
 {
 var x116=this.getComponent();
 if (x116)
{
x115.scheduleTimer(this,this._addMessageTimeout,x116.getClientId(),50);
}
}
}
AdfDhtmlEditableValuePeer.prototype.MessageShow= function(x117,x118)
{
AdfDhtmlEditableValuePeer.superclass.MessageShow.call(this,x117,x118);
this.getComponent().focus();
}
AdfDhtmlEditableValuePeer.prototype.ShouldShowHint= function(x119,x120)
{
 return false;
}
AdfDhtmlEditableValuePeer.prototype.Focus= function()
{
 var x121=this.getDomElement();
 var x122=this.getComponent();
 var x123=this.GetNoteWindowAlignmentNode(x122,x121);
 var x124=AdfFocusUtils.getFirstTabStop(x123);
 if (x124!=null)
{
AdfFocusUtils.focusElement(x124);
}
}
AdfDhtmlEditableValuePeer.prototype.LazyInitialize= function(x125,x126)
{
 var x127=this.GetComponentValue(x125,x126);
x125.initializeProperty(AdfUIValue.VALUE,x127);
}
AdfDhtmlEditableValuePeer.prototype.StashOldValue= function(x128,x129)
{
 if (!x128.getReadOnly())
{
 var x130=AdfDhtmlEditableValuePeer.GetContentNode(x128,x129);
 var x131=this.GetSubmittedValue(x128,x129);
 if (x130.getAttribute(AdfDhtmlEditableValuePeer._OLD_VALUE_EXPANDO)==null)
x130.setAttribute(AdfDhtmlEditableValuePeer._OLD_VALUE_EXPANDO,""+x131);
}
}
AdfDhtmlEditableValuePeer.prototype.ValidateIfStashedOldValue= function(x132,x133)
{
 var x134=AdfDhtmlEditableValuePeer.GetContentNode(x132,x133);
 var x135=x134.getAttribute(AdfDhtmlEditableValuePeer._OLD_VALUE_EXPANDO);
 if (x135!=null)
{
x134.removeAttribute(AdfDhtmlEditableValuePeer._OLD_VALUE_EXPANDO);
 var x136=this.GetSubmittedValue(x132,x133);
 if (x136!=x135)
this.Validate(x132,x136);
}
}
AdfDhtmlEditableValuePeer.prototype.ValidateAndStashNewValue= function(x137,x138)
{
 var x139=AdfDhtmlEditableValuePeer.GetContentNode(x137,x138);
 var x140=x139.getAttribute(AdfDhtmlEditableValuePeer._OLD_VALUE_EXPANDO);
 if (x140!=null)
{
 var x141=this.GetSubmittedValue(x137,x138);
 if (x141!=x140)
{
x139.setAttribute(AdfDhtmlEditableValuePeer._OLD_VALUE_EXPANDO,""+x141);
this.Validate(x137,x141);
}
}
}
AdfDhtmlEditableValuePeer.prototype._initializeScreenReader= function(x142,x143)
{
 var x144=AdfAgent.AGENT;
 var x145=AdfRichUIPeer.CreateSubId(x142.getClientId(),
AdfDhtmlEditableValuePeer._SCREEN_READER_NOTE_WINDOW_LAUNCH_ID);
x144.setExpandoProperty(x143,
AdfDhtmlEditableValuePeer._SCREEN_READER_LAUNCH_ID_EXPANDO,
x145);
 var x146=x144.getElementById(x145);
 if (x146!=null)
{
x146.href="#";
x146.setAttribute("onclick","return false;");
 var x147=false;
 if(x142.getShortDesc())
{
x147=true;
}
 else if (x143.getAttribute(AdfDhtmlEditableValuePeer._INSTRUCTIONS_TEXT))
{
x147=true;
}
 else
 {
 if (this.ShouldShowHint(x142,x143)==true)
{
 var x148=this.getFormatHint(x142);
 var x149=this.GetValidatorHints(x142);
 if (x148||x149)
x147=true;
}
}
 if (x147)
{
x144.setExpandoProperty(x146,
AdfDhtmlEditableValuePeer._SCREEN_READER_NOTE_WINDOW_STATIC_EXPANDO,
true);
}
 else
 {
AdfDomUtils.setVisible(x146,false);
x144.setExpandoProperty(x146,
AdfDhtmlEditableValuePeer._SCREEN_READER_NOTE_WINDOW_STATIC_EXPANDO,
false);
}
 var x150=AdfMessageUtils.getIcon(AdfFacesMessage.TYPE_INFO,false);
x146.appendChild(x150);
}
 else if (!x142.getDisabled()&& !x142.getReadOnly())
{
AdfLogger.LOGGER.severe("The screen reader note window launch icon is null (and shouldn't be) for component with id: ",x142.getClientId());
}
}
AdfDhtmlEditableValuePeer.prototype._messageNotifyScreenReader= function(x151,x152)
{
 var x153=this.getComponent();
 var x154=AdfAgent.AGENT;
 var x155=x154.getExpandoProperty(this.getDomElement(),
AdfDhtmlEditableValuePeer._SCREEN_READER_LAUNCH_ID_EXPANDO);
 var x156=x154.getElementById(x155);
 if (x156!=null)
{
 var x157=AdfDomUtils.getFirstChildElement(x156);
 if (!x152)
{
 var x158=x154.getExpandoProperty(x156,
AdfDhtmlEditableValuePeer._SCREEN_READER_NOTE_WINDOW_STATIC_EXPANDO);
AdfMessageUtils.switchIcon(x157,AdfFacesMessage.TYPE_INFO,false);
 if (!x158)
{
AdfDomUtils.setVisible(x156,false);
}
}
 else
 {
AdfDomUtils.setVisible(x156,true);
 if (x151==null)
x151=AdfFacesMessage.TYPE_INFO;
AdfMessageUtils.switchIcon(x157,x151,false);
 if (AdfPage.PAGE.getActiveComponent()==x153&&x151>=AdfFacesMessage.TYPE_WARNING)
{
AdfLogger.LOGGER.fine("Messages added while component has focus, moving focus to the screen reader note window launch icon.");
AdfFocusUtils.focusElement(x156);
}
}
}
}
AdfDhtmlEditableValuePeer.prototype._killNoteWindowTimeout= function()
{
this._killNoteWindowMouseTimeout();
this._killNoteWindowFocusTimeout();
}
AdfDhtmlEditableValuePeer.prototype._killNoteWindowMouseTimeout= function()
{
 if(this._noteWindowMouseTimeout)
{
AdfPage.PAGE.cancelTimer(this._noteWindowMouseTimeout);
 delete this._noteWindowMouseTimeout;
}
 delete this._noteCompMouseId;
}
AdfDhtmlEditableValuePeer.prototype._killNoteWindowFocusTimeout= function()
{
 if(this._noteWindowFocusTimeout)
{
AdfPage.PAGE.cancelTimer(this._noteWindowFocusTimeout);
 delete this._noteWindowFocusTimeout;
}
 delete this._noteCompFocusId;
}
AdfDhtmlEditableValuePeer.prototype._onMouseOverTimeout= function(x159)
{
this._killNoteWindowFocusTimeout();
 delete this._noteWindowMouseTimeout;
 delete this._noteCompMouseId;
 var x160=AdfPage.PAGE.findComponent(x159);
 if (x160)
{
this.bind(x160);
 if(!this.IsNoteWindowVisible(x160))
{
this.ShowNoteWindow(x160,true);
}
}
}
AdfDhtmlEditableValuePeer.prototype._onFocusTimeout= function(x161)
{
this._killNoteWindowMouseTimeout();
 delete this._noteWindowFocusTimeout;
 delete this._noteCompFocusId;
 var x162=AdfPage.PAGE;
 if (x161==x162.getActiveComponentId())
{
 var x163=x162.findComponent(x161);
 if (x163)
{
this.bind(x163);
 if (this._returnedFromChooseComponent!=null)
{
 delete this._returnedFromChooseComponent;
}
 else if (!this.IsNoteWindowVisible(x163))
{
this.ShowNoteWindow(x163,false);
}
}
}
 else if (this._returnedFromChooseComponent!=null)
{
 delete this._returnedFromChooseComponent;
}
}
AdfDhtmlEditableValuePeer.prototype._addMessageTimeout= function(x164)
{
 var x165=AdfPage.PAGE;
 if (x164==x165.getActiveComponentId())
{
 var x166=AdfPage.PAGE.findComponent(x164);
 if (x166)
{
this.bind(x166);
this.ShowNoteWindow();
}
}
}
AdfDhtmlEditableValuePeer.prototype._getPublicComponentOrAncestor= function(x167)
{
 var x168=x167;
while(x168&&x168.satisfiesUsage(AdfUIComponent.USAGE_PRIVATE_CHILD))
{
x168=x168.getParent();
}
 return x168;
}

AdfUIComponents.createComponentClass("AdfUICollection",
{
componentType:"org.apache.myfaces.trinidad.CollectionBase",
propertyKeys:[],
namingContainer:true
});

AdfUIComponents.createComponentClass("AdfUICommand",
{
componentType:"org.apache.myfaces.trinidad.Command",
propertyKeys:[{name:"actionExpression",type:"Object",secured:true}
,{name:"returnListener",type:"Object",secured:true}
,{name:"launchListener",type:"Object",secured:true}
,{name:"immediate",type:"Boolean","default":false,secured:true}
],
eventNames:["action","return","launch"]
});

AdfUIComponents.createComponentClass("AdfRichCommandLink",
{
componentType:"oracle.adf.RichCommandLink",
propertyKeys:[{name:"accessKey",type:"String"}
,{name:"blocking",type:"Boolean","default":false,secured:true}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"partialSubmit",type:"Boolean","default":false,secured:true}
,{name:"text",type:"String"}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"useWindow",type:"Boolean","default":false}
,{name:"windowModalityType",type:"String","default":"modeless"}
,{name:"windowEmbedStyle",type:"String","default":"window"}
,{name:"windowHeight",type:"Number"}
,{name:"windowWidth",type:"Number"}
],
superclass:AdfUICommand
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlCommandLinkPeer");
AdfDhtmlCommandLinkPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichCommandLink);
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichCommandLink.TEXT);
this._COMMAND_LINK_CONTEXT_KEY="_adfClc";
}
AdfDhtmlCommandLinkPeer.prototype.HandleComponentClick= function(x0)
{
 var x1=true;
 if(x0.getEventPhase()!=AdfBaseEvent.AT_TARGET_PHASE)
{
 var x2=x0.getNativeEventTarget();
 var x3=this._getParentWithAttr(this.getDomElement(),x2,
AdfDhtmlCommandLinkPeer._COMMAND_LINK_CONTEXT_KEY);
 if (x3)
x1=false;
}
 if (x1)
{
 var x4=this.getComponent();
 if (!x4.getDisabled()&&x0.isLeftButtonPressed())
{
 var x5= new AdfActionEvent(x4);
 var x6=x4.getProperty("_F_PARAMS");
 if (x6)
AdfDhtmlPage.__addServerParamsToEvent(x5,x6);
x5.queue(x4.getPartialSubmit());
}
}
}
AdfDhtmlCommandLinkPeer.prototype.GetAccessibleName= function()
{
 var x7=this.getComponent();
 return x7.getText();
}
AdfDhtmlCommandLinkPeer.prototype.GetInlineEditor= function(x8)
{
 return AdfDhtmlSimpleTextEditor.getInlineEditor();
}
AdfDhtmlCommandLinkPeer.prototype.ComponentTextChanged=
AdfDomUtils.__componentTextChanged;
AdfDhtmlCommandLinkPeer.prototype._getParentWithAttr= function (x9,x10,x11)
{
 var x12=x10;
while(x12&&
(x12!=x9))
{
 if (x12.nodeType==1&&AdfAgent.AGENT.getAttribute(x12,x11))
{
 return x12;
}
 else
 {
x12=x12.parentNode;
}
}
 return null;
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlSubformPeer");
AdfDhtmlSubformPeer.InitSubclass= function()
{
AdfRichUIPeer.addSuppressedPPRAttributes(this,"defaultCommand");
}
AdfDhtmlSubformPeer.prototype.initialize= function(x0)
{
 var x1=x0.getClientId();
AdfPage.PAGE.mapComponent(x1,x0);
}
AdfDhtmlSubformPeer.getDefaultCommandSubform= function(x2)
{
 var x3=x2.lastIndexOf(":");
 var x4;
while(x3>0&& !x4)
{
x2=x2.substring(0,x3);
 var x5=AdfPage.PAGE.findComponent(x2);
 if (x5&&
x5 instanceof AdfRichSubform&&
x5.getDefaultCommand()!=null)
{
x4=x5;
}
x3=x2.lastIndexOf(":")
}
 return x4;
}
AdfDhtmlSubformPeer.prototype.componentRemoved= function(x6)
{
AdfAssert.assertPrototype(x6,AdfUIComponent);
 if (this._component===x6)
{
this.UnbindFromComponent();
}
AdfPage.PAGE.unmapComponent(x6.getClientId());
}
AdfDhtmlSubformPeer.prototype.getComponentParent= function(x7)
{
 return null;
}
AdfDhtmlSubformPeer.prototype.visitChildren= function(
x8,
x9,
x10,
x11)
{
AdfLogger.LOGGER.severe("AdfDhtmlSubformPeer.visitChildren: visitChildren not supported in a subform");
 return 2;
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlFormPeer");
AdfDhtmlFormPeer.InitSubclass= function()
{
AdfRichUIPeer.addSuppressedPPRAttributes(this,"defaultCommand");
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE);
}
AdfDhtmlFormPeer.prototype.InitDomElement= function(
x0,
x1)
{
AdfDhtmlFormPeer.superclass.InitDomElement.call(this,x0,x1);
 var x2=AdfPage.PAGE;
 var x3=x2.getDomWindow();
 var x4= new Function("return true;");
x3["_" + x0.getClientId() + "Validator"]=x4;
}
AdfDhtmlFormPeer.prototype.HandleComponentKeyPress= function(x5)
{
 if (x5.getKeyCode()==AdfKeyStroke.ENTER_KEY)
{
 var x6=AdfDhtmlFormPeer.__GetDefaultCommandTriggerId(x5,true);
 if (x6==null)
 return;
 var x7=AdfDhtmlSubformPeer.getDefaultCommandSubform(x6);
 var x8;
 if (x7)
{
x8=x7.getDefaultCommand();
}
 else
 {
x7=this.getComponent();
x8=x7.getDefaultCommand();
}
 if (x8)
{
 var x9=x7.findComponent(x8);
 if (x9)
{
AdfActionEvent.queue(x9,x9.getPartialSubmit());
}
 else
 {
AdfLogger.LOGGER.warning("DefaultCommand with the ID of '" + x8 +
 "' is not found for component: " + x7);
}
}
}
}
AdfDhtmlFormPeer.__GetDefaultCommandTriggerId= function(x10,x11)
{
 var x12=x10.getNativeEventTarget();
 if (x12)
{
 var x13=x12.tagName;
 if ((x13=='A')||
(x13=='BUTTON')||
(x13=='TEXTAREA')||
((x13=='INPUT')&&
((x12.type=='submit')||
(x12.type=='reset'))))
{
 return null;
}
 if (x13!="SELECT"&&x11)
{
x10.cancel();
}
 var x14=x12;
 var x15=x14.id;
while(!x15)
{
x14=x14.parentNode;
x15=x14.id;
}
 return x15;
}
 return null;
}
AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlPopupPeer",true);
AdfDhtmlPopupPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichPopup);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
this._SHOWN="_shown";
this._DIRTY_STATE_TRACKING_EXPANDO="_dst";
this._SYNC_HINTS_LIST=[AdfRichPopup.HINT_ALIGN_ID,
AdfRichPopup.HINT_ALIGN,
AdfDhtmlPopupWindow.HINT_LEFT_POSITION,
AdfDhtmlPopupWindow.HINT_TOP_POSITION,
AdfRichPopup.HINT_LAUNCH_ID,
AdfDhtmlPopupWindow.HINT_MOUSEPOSITION];
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE,
AdfValueChangeEvent.VALUE_CHANGE_TYPE);
}
AdfDhtmlPopupPeer.prototype.HandleComponentKeyPress= function(x0)
{
 if (x0.getKeyCode()==AdfKeyStroke.ENTER_KEY)
{
x0.stopBubbling();
 var x1=AdfDhtmlFormPeer.__GetDefaultCommandTriggerId(x0,true);
 if (x1!=null)
{
 var x2=AdfDhtmlSubformPeer.getDefaultCommandSubform(x1);
 if (x2)
{
 var x3=x2.getClientId();
 var x4=this.getComponent().getClientId();
 if (x4.indexOf(x3 + ':')!=0)
{
 var x5=x2.getDefaultCommand();
 var x6=x2.findComponent(x5);
 if (x6)
{
AdfActionEvent.queue(x6,x6.getPartialSubmit());
}
 else
 {
AdfLogger.LOGGER.warning("DefaultCommand with the ID of '" + x5 +
 "' is not found for component: " + x2);
}
}
}
}
}
}
AdfDhtmlPopupPeer.prototype.fetchCanceled= function(x7)
{
 if (x7._isFetching)
{
x7._isFetchCanceled=true;
 return true;
}
 return false;
}
AdfDhtmlPopupPeer.prototype.show= function(x8,x9)
{
AdfAssert.assertPrototype(x8,AdfUIComponent);
AdfAssert.assertObjectOrNull(x9);
 var x10=this.isVisible(x8);
 if (x10)
{
 return;
}
 if (AdfPage.PAGE.isScreenReaderMode()&& !x10)
{
 var x11=this.getPopupWindow(x8,x8.getClientId());
 if (x11&&x11.activate)
{
x11.activate();
 return;
}
}
 var x12=x8.getContentDelivery();
 var x13=(x12==AdfRichPopup.CONTENT_DELIVERY_LAZY),
x14=(x12==AdfRichPopup.CONTENT_DELIVERY_LAZY_UNCACHED);
 var x15=null;
 if (x9)
x15=x9[AdfRichPopup.HINT_LAUNCH_ID];
 if (x13||x14)
{
 var x16=x8._isFetching;
 if (x16)
{
AdfLogger.LOGGER.warning("Waiting on popup content delivery: " + x8.getClientId());
 return;
}
 if (!x8._hasContent)
{
 var x17=AdfPage.PAGE;
 var x18=AdfDhtmlPopupPeer._createPagePropertyKey(x8.getClientId());
x17.setPageProperty(x18,x9);
 var x19;
 if (x15!=null)
{
x19= new Object();
x19.launchId=x15;
}
this.syncPrivateProperties(x8,x9,true);
x8._isFetching=true;
 new AdfContentFetchEvent(x8,AdfContentFetchEvent.FETCH_EVENT_TYPE,x19).queue();
 return;
}
}
 if (x14)
{
 delete x8._hasContent;
}
 if (x8._isFetchCanceled)
{
 delete x8._isFetchCanceled;
this._setShown(x8,false);
 return;
}
 var x20= new AdfPopupOpeningEvent(x8,x9);
x8.broadcast(x20);
 if (!x20.isCanceled())
{
 if (AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled(x8))
{
 var x21=AdfDhtmlPopupPeer.getContentDom(x8);
 if (x21)
AdfAgent.AGENT.setDirty(x8,x21,false);
}
 if (!(x9))
{
x9= new Object();
}
 var x22=x9[AdfDhtmlPopupWindow.HINT_RESTORE_IMMEDIATE]?true:false;
x9[AdfDhtmlPopupWindow.HINT_OPENED_HANDLER]=this.createCallback(this.PopupOpened);
x9[AdfDhtmlPopupWindow.HINT_OPENED_HANDLER_PARAM]=x8;
 if (x9[AdfDhtmlPopupWindow.HINT_ANIMATE]!=false)
x9[AdfDhtmlPopupWindow.HINT_ANIMATE]=(x8.getAnimate()==AdfRichPopup.ANIMATE_DEFAULT);
 if (!x14&& !x22)
this.syncPrivateProperties(x8,x9);
this._setShown(x8,true,(x14||x22));
this._showPopup(x8,x9);
}
 else
 {
this._setShown(x8,false);
}
}
AdfDhtmlPopupPeer.prototype._setShown= function(x23,x24,x25)
{
 delete this._isPropSyncNeeded;
x23.setProperty(AdfDhtmlPopupPeer._SHOWN,
x24?x23.getClientId():"",false,true);
 if (!x25&&this._isPropSyncNeeded&& !AdfDhtmlPopupPeer._isAutoCancel(x23))
 new AdfContentFetchEvent(x23,AdfContentFetchEvent.SYNC_EVENT_TYPE).queue();
 delete this._isPropSyncNeeded;
}
AdfDhtmlPopupPeer._initPrivateProperties= function(x26)
{
AdfAssert.assertPrototype(x26,AdfRichPopup);
 if (AdfDhtmlPopupPeer._isAutoCancel(x26))
 return;
for(var x27=0;x27<AdfDhtmlPopupPeer._SYNC_HINTS_LIST.length;x27++)
{
 var x28=AdfDhtmlPopupPeer._SYNC_HINTS_LIST[x27];
 var x29="_" + x28;
x26.setProperty(x29,"",false,true);
}
}
AdfDhtmlPopupPeer.prototype.syncPrivateProperties= function(x30,x31,x32)
{
AdfAssert.assertPrototype(x30,AdfRichPopup);
 if (!x31)
 return;
 if (AdfDhtmlPopupPeer._isAutoCancel(x30))
 return;
 delete this._isPropSyncNeeded;
 var x33;
for(key in x31)
{
 if (AdfCollections.indexOf(AdfDhtmlPopupPeer._SYNC_HINTS_LIST,key)> -1)
{
x33="_" + key;
 var x34;
 if (key==AdfDhtmlPopupWindow.HINT_MOUSEPOSITION)
{
AdfAssert.assertNumber(x31[key].x,"AdfDhtmlPopupWindow.HINT_MOUSEPOSITION.x");
AdfAssert.assertNumber(x31[key].y,"AdfDhtmlPopupWindow.HINT_MOUSEPOSITION.y");
x34="x:" + x31[key].x + ",y:" + x31[key].y;
}
 else
 x34=x31[key];
x30.setProperty(x33,x34,false,true);
}
}
 if (!x32&&this._isPropSyncNeeded)
 new AdfContentFetchEvent(x30,AdfContentFetchEvent.SYNC_EVENT_TYPE).queue();
 delete this._isPropSyncNeeded;
}
AdfDhtmlPopupPeer.prototype.ComponentPropertyChanged= function(x35)
{
 if (!AdfDhtmlPopupPeer._isAutoCancel(x35.getSource()))
{
 var x36=x35.getPropertyName();
 if (x36==AdfDhtmlPopupPeer._SHOWN)
{
this._isPropSyncNeeded=true;
}
 else
 {
for(var x37=0;x37<AdfDhtmlPopupPeer._SYNC_HINTS_LIST.length;x37++)
{
 var x38=AdfDhtmlPopupPeer._SYNC_HINTS_LIST[x37];
 var x39="_" + x38;
 if (x36==x39)
{
this._isPropSyncNeeded=true;
break;
}
}
}
}
}
AdfDhtmlPopupPeer.prototype.hide= function(x40)
{
 if (!this.isVisible(x40))
 return;
this._resetContentDelivery(x40);
this.hidePopup(x40,x40.getClientId());
}
AdfDhtmlPopupPeer.prototype._resetContentDelivery= function(x41)
{
 if(x41.getContentDelivery()==AdfRichPopup.CONTENT_DELIVERY_LAZY_UNCACHED)
{
 delete x41._hasContent;
}
}
AdfDhtmlPopupPeer.prototype.cancel= function(x42)
{
 if (!this.isVisible(x42))
 return;
this._resetContentDelivery(x42);
this.cancelPopup(x42,x42.getClientId());
}
AdfDhtmlPopupPeer.prototype.isVisible= function(x43)
{
 if (AdfPage.PAGE.isScreenReaderMode())
{
 var x44=AdfDhtmlPopupPeer.getContentDom(x43);
 if (x44&&AdfPopupScopingUtils.isOutOfScope(x44))
{
 return false;
}
}
 return this.isPopupVisible(x43,x43.getClientId());
}
AdfDhtmlPopupPeer._createPagePropertyKey= function(x45)
{
AdfAssert.assertString(x45);
 var x46=x45.split(":");
 return x46.join("$") + "$key";
}
AdfDhtmlPopupPeer.prototype.DispatchComponentEvent= function(x47)
{
 if (x47.getType()==AdfContentFetchEvent.LOADED_EVENT_TYPE)
{
 var x48=x47.getSource();
this._restorePopup(x48);
x47.stopBubbling();
x47.cancel();
}
 else
 {
AdfDhtmlPopupPeer.superclass.DispatchComponentEvent.call(
this,x47);
}
}
AdfDhtmlPopupPeer.prototype._restorePopup= function(x49)
{
x49._hasContent=true;
 var x50=AdfPage.PAGE;
 var x51=AdfDhtmlPopupPeer._createPagePropertyKey(x49.getClientId());
 var x52=x50.getPageProperty(x51);
x50.setPageProperty(x51,null);
AdfAssert.assertObjectOrNull(x52);
 delete x49._isFetching;
this.show(x49,x52);
}
AdfDhtmlPopupPeer.prototype.fireContentDeliveryNotify= function(x53)
{
 var x54=this.getComponent();
 if (x53)
{
 var x55=AdfPage.PAGE;
 var x56=AdfDhtmlPopupPeer._createPagePropertyKey(x54.getClientId());
 var x57=x55.getPageProperty(x56);
 if (x57)
AdfCollections.copyInto(x53,x57);
x55.setPageProperty(x56,x53);
}
 if (x53&&x53[AdfDhtmlPopupWindow.HINT_RESTORE_IMMEDIATE])
this._restorePopup(x54);
 else
 new AdfContentFetchEvent(x54,AdfContentFetchEvent.LOADED_EVENT_TYPE).queue();
}
AdfDhtmlPopupPeer.prototype.ComponentRemoved= function(x58)
{
 var x59=AdfDhtmlPopupPeer.getContentDom(x58);
 if (x59)
{
 if (AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled(x58))
{
 var x60=x59.getAttribute(AdfDhtmlPopupPeer._DIRTY_STATE_TRACKING_EXPANDO);
 if (x60)
AdfAgent.AGENT.endDirtyStateTracking(x58,x59);
}
AdfPage.PAGE.removeComponentsInSubtree(x59);
}
}
AdfDhtmlPopupPeer.getContentDom= function(x61)
{
 var x62=AdfRichUIPeer.CreateSubId(x61.getClientId(),"content");
 return AdfAgent.AGENT.getElementById(x62);
}
AdfDhtmlPopupPeer.prototype._showPopup= function(x63,x64)
{
 var x65=AdfDhtmlPopupPeer.getContentDom(x63);
 var x66={};
 if (x63._childHints)
AdfCollections.copyInto(x66,x63._childHints)
 if (x64)
AdfCollections.copyInto(x66,x64);
 var x67=this._getFirstMenuPeer(x63,x66);
 if(x67!=null)
x67.show(x66);
 else
 this.showPopup(x63,x65,x66,x63.getClientId());
}
AdfDhtmlPopupPeer.prototype._getFirstMenuPeer= function(x68,x69)
{
 var x70=null;
 var x71=x69[AdfDhtmlPopupWindow.HINT_TYPE];
 if(x71==null||(x71==AdfDhtmlPopupWindow.HINT_TYPE_MENU))
{
x68.visitChildren(this._visitChildrenForMenu,this,true);
 if(this._firstMenuChild)
{
x70=this._firstMenuChild.getPeer();
 delete this._firstMenuChild;
}
}
 return x70;
}
AdfDhtmlPopupPeer.prototype._visitChildrenForMenu= function(x72)
{
 var x73=AdfPage.PAGE.getDomWindow();
 if (x73.AdfRichRegion&&x72 instanceof AdfRichRegion)
 return 0;
 if(x73.AdfRichMenu&&x72 instanceof AdfRichMenu)
this._firstMenuChild=x72;
 return 2;
}
AdfDhtmlPopupPeer.prototype.PopupClosed= function(x74,x75)
{
 if (x75)
{
 var x76=AdfAgent.AGENT;
 var x77=AdfDhtmlPopupPeer._isRestoreEnabled(x74,x75);
 if (!x77)
{
AdfDhtmlPopupPeer._initPrivateProperties(x74);
 var x78=AdfDhtmlPopupPeer.__handlePopupCanceled(x74,x75);
this._setShown(x74,false,x78);
}
 var x79=x76.getElementById(x74.getClientId());
x79.appendChild(x75);
 if (!x77)
{
 new AdfPopupClosedEvent(x74).queue();
}
}
 else
 {
AdfDhtmlPopupPeer._initPrivateProperties(x74);
this._setShown(x74,false);
 new AdfPopupClosedEvent(x74).queue();
}
}
AdfDhtmlPopupPeer.__handlePopupCanceled= function(x80,x81)
{
AdfAssert.assertPrototype(x80,AdfRichPopup);
AdfAssert.assertDomElement(x81);
 var x82=AdfAgent.AGENT;
 var x83=(x82.getExpandoProperty(x81,AdfDhtmlPopupWindow.__CANCELED_EXPANDO)==true);
x82.setExpandoProperty(x81,AdfDhtmlPopupWindow.__CANCELED_EXPANDO,false);
 var x84=false;
 if (x83)
{
 var x85=(AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled(x80)&&
x82.isDirty(x80,x81));
 var x86= new AdfPopupCanceledEvent(x80,x85);
 if (x85)
AdfAgent.AGENT.setDirty(x80,x81,false);
x84=x86.propagatesToServer();
x86.queue(true);
}
 return x84;
}
AdfDhtmlPopupPeer._isAutoCancel= function(x87)
{
AdfAssert.assertPrototype(x87,AdfRichPopup);
 var x88=x87.getAutoCancel();
 if (x88==AdfRichPopup.AUTO_CANCEL_ENABLED)
{
 return true;
}
 return false
}
AdfDhtmlPopupPeer._isRestoreEnabled= function(x89,x90)
{
AdfAssert.assertPrototype(x89,AdfRichPopup);
AdfAssert.assertDomElement(x90);
 var x91=AdfAgent.AGENT
 var x92=(!AdfDhtmlPopupPeer._isAutoCancel(x89)&&
(x91.getExpandoProperty(x90,AdfDhtmlPopupWindow.__REPLACEDOM_EXPANDO)==true));
x91.setExpandoProperty(x90,AdfDhtmlPopupWindow.__REPLACEDOM_EXPANDO,false);
 return x92;
}
AdfDhtmlPopupPeer.prototype.PopupOpened= function(x93)
{
 new AdfPopupOpenedEvent(x93).queue();
}
AdfDhtmlPopupPeer.setChildHints= function(x94,x95)
{
x94._childHints=x95;
}
AdfDhtmlPopupPeer.prototype.BindToComponent= function(x96,x97)
{
AdfDhtmlPopupPeer.superclass.BindToComponent.call(
this,x96,x97);
 if (AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled(x96))
{
 var x98=AdfDhtmlPopupPeer.getContentDom(x96);
 if (x98)
{
AdfAgent.AGENT.beginDirtyStateTracking(x96,x98);
x98.setAttribute(AdfDhtmlPopupPeer._DIRTY_STATE_TRACKING_EXPANDO,true);
}
}
}
AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled= function(x99)
{
AdfAssert.assertPrototype(x99,AdfRichPopup);
 return (x99.getResetEditableValues()==AdfRichPopup.RESET_EDITABLE_VALUES_WHEN_CANCELED)||
(x99.getProperty(AdfPopupCanceledEvent._OPTIMIZED_PROPAGATION_PROPERTY)?true:false)
}
AdfDhtmlPopupPeer.prototype.HandleComponentValueChange= function (x100)
{
 if (x100.isCanceled())
 return;
 var x101=this.getComponent();
 if (AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled(x101))
{
 var x102=AdfDhtmlPopupPeer.getContentDom(x101);
 if (x102)
AdfAgent.AGENT.setDirty(x101,x102,true);
}
}
AdfDhtmlPopupPeer.prototype.ReplaceDomElement= function(x103,x104)
{
 var x105=this.getComponent();
AdfDhtmlPopupPeer.superclass.ReplaceDomElement.call(this,x103,x104);
 if (AdfDhtmlPopupPeer._isResetEditableValuesWhenCanceled(x105))
{
 var x106=AdfRichUIPeer.CreateSubId(x105.getClientId(),"content");
 if (x106==x103.id)
{
 var x107=AdfAgent.AGENT;
x107.endDirtyStateTracking(x105,x104);
x107.beginDirtyStateTracking(x105,x103);
x103.setAttribute(AdfDhtmlPopupPeer._DIRTY_STATE_TRACKING_EXPANDO,true);
}
}
}

AdfUIComponents.createComponentClass("AdfUIGo",
{
componentType:"org.apache.myfaces.trinidad.Go",
propertyKeys:[{name:"destination",type:"String"}
]
});

AdfUIComponents.createComponentClass("AdfUIInput",
{
componentType:"org.apache.myfaces.trinidad.Input",
superclass:AdfUIEditableValue
});

AdfRichUIPeer.createPeerClass(AdfDhtmlEditableValuePeer,"AdfDhtmlInputBasePeer");
AdfDhtmlInputBasePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE);
this._LAST_VALUE="_afrLastValue";
}
AdfDhtmlInputBasePeer.prototype.needsFocusTargetStyleClass= function()
{
 return true;
}
AdfDhtmlInputBasePeer.prototype.HandleComponentFocus= function(x0)
{
 if(x0.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
AdfDhtmlInputBasePeer.superclass.HandleComponentFocus.call(this,x0);
 var x1=x0.getNativeEventTarget();
 if ( !this.VetoBlurValidation())
{
 var x2=this.getComponent();
 var x3=AdfDhtmlEditableValuePeer.GetContentNode(x2);
 if (x1==x3)
{
AdfAgent.AGENT.setExpandoProperty(x3,AdfDhtmlInputBasePeer._LAST_VALUE,
x3.value);
}
}
}
}
AdfDhtmlInputBasePeer.prototype.HandleComponentBlur= function(x4)
{
 if(x4.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x5=this.getComponent();
 var x6=x4.getNativeEventTarget();
 if ( !this.VetoBlurValidation())
this.RunValidation(x5,x6,true);
}
}
AdfDhtmlInputBasePeer.prototype.__simulateBlur= function(x7)
{
 if (!this.VetoBlurValidation())
{
this.RunValidation(x7,AdfDhtmlEditableValuePeer.GetContentNode(x7),true);
}
}
AdfDhtmlInputBasePeer.prototype.RunValidation= function(x8,x9,x10)
{
 if (this.WasSubmitted(x8))
{
 var x11=AdfDhtmlEditableValuePeer.GetContentNode(x8);
 if (x9==x11)
{
 var x12=AdfAgent.AGENT;
 var x13=x12.getExpandoProperty(x11,AdfDhtmlInputBasePeer._LAST_VALUE);
 var x14=x11.value;
 if (!x10||x14!=x13)
{
x12.setExpandoProperty(x11,AdfDhtmlInputBasePeer._LAST_VALUE,x14);
this.Validate(x8,x14);
}
}
}
}
AdfDhtmlInputBasePeer.prototype.VetoBlurValidation= function()
{
 return false;
}
AdfDhtmlInputBasePeer.prototype.GetSubmittedValue= function(
x15,
x16)
{
 var x17=AdfDhtmlEditableValuePeer.GetContentNode(x15,x16);
 if (x15.getReadOnly())
{
 return AdfAgent.AGENT.getTextContent(x17);
}
 return x17.value;
}
AdfDhtmlInputBasePeer.prototype.ShouldShowHint= function(x18,x19)
{
 return true;
}

AdfUIComponents.createComponentClass("AdfUIDialog",
{
componentType:"oracle.adf.Dialog",
propertyKeys:[{name:"dialogListener",type:"Object",secured:true}
],
eventNames:["dialog"]
});

AdfUIDialog.prototype.HandleEvent= function(x0)
{
 if ((x0.getType()==AdfDialogEvent.EVENT_TYPE)&&
 !x0.propagatesToServer())
{
 var x1=this.getParent();
 if (x1 instanceof AdfRichPopup)
{
x1.cancel();
}
 else
 {
x1.getPeer().cancelPopup(x1);
}
}
AdfUIDialog.superclass.HandleEvent.call(this,x0);
}

AdfUIComponents.createComponentClass("AdfRichPanelWindow",
{
componentType:"oracle.adf.RichPanelWindow",
propertyKeys:[{name:"modal",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true,secured:true}
,{name:"title",type:"String"}
,{name:"titleIconSource",type:"String"}
,{name:"closeIconVisible",type:"Boolean","default":true}
,{name:"helpTopicId",type:"String"}
,{name:"contentHeight",type:"Number"}
,{name:"contentWidth",type:"Number"}
,{name:"stretchChildren",type:"String","default":"none"}
,{name:"resize",type:"String","default":"off"}
],
superclass:AdfUIPanel
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlPanelWindowPeer");
AdfDhtmlPanelWindowPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(
this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE
);
AdfObject.ensureClassInitialization(AdfRichPanelWindow);
AdfRichUIPeer.addComponentPropertyChanges(this,
AdfRichPanelWindow.TITLE_ICON_SOURCE,
AdfRichPanelWindow.TITLE,
AdfRichPanelWindow.CONTENT_HEIGHT,
AdfRichPanelWindow.CONTENT_WIDTH);
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfRichPanelWindow.CONTENT_HEIGHT,
AdfRichPanelWindow.CONTENT_WIDTH);
AdfRichUIPeer.addSuppressedPPRAttributes(this,
AdfRichPanelWindow.TITLE,
AdfRichPanelWindow.CONTENT_HEIGHT,
AdfRichPanelWindow.CONTENT_WIDTH);
this._HEADER_START_EDGE_SUBID="_hse";
this._HEADER_CENTER_EDGE_SUBID="_hce";
this._HEADER_END_EDGE_SUBID="_hee";
this._CONTENT_START_EDGE_SUBID="_cse";
this._CONTENT_END_EDGE_SUBID="_cee";
this._FOOTER_START_EDGE_SUBID="_fse";
this._FOOTER_CENTER_EDGE_SUBID="_fce";
this._FOOTER_END_EDGE_SUBID="_fee";
this._FOOTER_RESIZE_END_ICON_SUBID="_ree";
this._FOOTER_RESIZE_START_ICON_SUBID="_rse";
this._RESIZE_DRAG_SOURCE_SUBIDS=[this._HEADER_START_EDGE_SUBID,this._HEADER_CENTER_EDGE_SUBID,
this._HEADER_END_EDGE_SUBID,this._CONTENT_START_EDGE_SUBID,
this._CONTENT_END_EDGE_SUBID,this._FOOTER_START_EDGE_SUBID,
this._FOOTER_CENTER_EDGE_SUBID,this._FOOTER_END_EDGE_SUBID,
this._FOOTER_RESIZE_END_ICON_SUBID,this._FOOTER_RESIZE_START_ICON_SUBID];
this._FOOTER_CENTER_CONTENT_SUBID="_fcc";
this._CONTENT_SUBID="contentContainer";
this._CONTENT_CENTER_SUBID="_ccntr";
this._CONTENT_SIZED_FOR_MINIMUMS_EXPANDO="_csfm";
this._HEADER_TITLE_BAR_SUBID="tb";
this._CONTENT_RESIZED_INDICATOR_EXPANDO="_cri";
this._PANEL_WINDOW_RESIZE_GHOST_CLASS="af|panelWindow::resize-ghost";
this._RESIZE_ON="on";
this._STRETCH_CHILDREN_FIRST="first";
this._ANIMATION_DURATION_SKIN_PROPERTY="af|panelWindow-tr-open-animation-duration";
}
AdfDhtmlPanelWindowPeer.prototype.handleEscapeKey= function(x0)
{
this.Cancel();
AdfAgent.AGENT.eatEvent(x0);
}
AdfDhtmlPanelWindowPeer.prototype.HandleComponentKeyDown= function(x1)
{
}
AdfDhtmlPanelWindowPeer.prototype.HandleComponentKeyPress= function(x2)
{
 if (!x2.isCanceled())
{
 var x3=x2.getNativeEvent();
 var x4=x2.getKeyCode();
 if (x4==AdfKeyStroke.ENTER_KEY)
{
 if (this.IsClose(x2))
{
x2.cancel();
x2.stopBubbling();
this.Cancel();
}
}
}
}
AdfDhtmlPanelWindowPeer.prototype.HandleComponentKeyUp= function(x5)
{
 if (!x5.isCanceled())
{
 var x6=x5.getNativeEvent();
 var x7=x5.getKeyCode();
 if (x7==AdfKeyStroke.SPACE_KEY)
{
 if (this.IsClose(x5))
{
this.Cancel();
x5.cancel();
x5.stopBubbling();
}
}
 else if (x6.ctrlKey&&x6.altKey)
{
 if (x7==AdfKeyStroke.W_KEY&& !this.getComponent().getModal())
{
 var x8=AdfDhtmlDialogManager.getInstance();
x8.focusNextModelessDialog();
x5.cancel();
x5.stopBubbling();
}
}
}
}
AdfDhtmlPanelWindowPeer.prototype.HandleComponentFocus= function(x9)
{
 if (x9 instanceof AdfDomComponentFocusEvent)
this._handleActivate(x9,false);
}
AdfDhtmlPanelWindowPeer.prototype._handleActivate= function(x10,x11)
{
 if (!x10.isCanceled())
{
 var x12=this.getComponent();
 var x13=this.getDomElement();
 var x14=x10.getNativeEventTarget();
 if (AdfDomUtils.isAncestorOrSelf(x13,x14))
{
 var x15=this._getPopupWindow(x12);
 if (x15)
{
 if (x15.handleActivate(x11))
{
x10.cancel();
x10.stopBubbling();
}
}
}
}
}
AdfDhtmlPanelWindowPeer.prototype.HandleComponentMouseDown= function(x16)
{
this._handleActivate(x16,true);
 var x17=this.getComponent();
 if (AdfPage.PAGE.isScreenReaderMode()
||x17!=x16.getSource()
||x17.getProperty("resize")!=AdfDhtmlPanelWindowPeer._RESIZE_ON)
{
 return;
}
 var x18=x16.getNativeEvent();
 var x19=AdfAgent.AGENT;
 var x20=x19.getEventTarget(x18);
 var x21=x20.id;
 if (x21)
{
 var x22=x21.split("::");
 if (x22.length>1)
{
 var x23=x22[x22.length - 1];
 if (AdfCollections.indexOf(AdfDhtmlPanelWindowPeer._RESIZE_DRAG_SOURCE_SUBIDS,x23)> -1)
{
 var x24=this._getPopupWindow(x17);
 if (x24&& !x24.isAnimating()
&&AdfDomUtils.isAncestorOrSelf(x24.getContent(),x20))
{
this._startResizeDrag(x24,x18,x23);
x16.cancel();
}
}
}
}
}
AdfDhtmlPanelWindowPeer.prototype.HandleComponentClick= function(x25)
{
 if (x25.isLeftButtonPressed())
{
 if (this.IsClose(x25))
{
this.Cancel();
}
}
}
AdfDhtmlPanelWindowPeer.prototype.IsClose= function(x26)
{
 var x27=x26.getNativeEventTarget();
 var x28=this.getComponent();
 var x29=AdfRichUIPeer.CreateSubId(x28.getClientId(),"close");
 if (x27.id==x29)
 return true;
 return (x27.parentNode.id==x29);
}
AdfDhtmlPanelWindowPeer.prototype.Hide= function(x30)
{
 var x31=this.getComponent().getParent();
 if (x31 instanceof AdfRichPopup)
x31.hide();
 else
 {
this.hideAllPopups(x31);
}
}
AdfDhtmlPanelWindowPeer.prototype.Cancel= function(x32)
{
 var x33=this.getComponent().getParent();
 if (x33 instanceof AdfRichPopup)
x33.cancel();
 else
 {
this.cancelAllPopups(x33);
}
}
AdfDhtmlPanelWindowPeer.prototype.Init= function(x34,x35)
{
AdfDhtmlPanelWindowPeer.superclass.Init.call(this,x34,x35);
this._onResizeDrag=this.createCallback(this._handleResizeDrag);
this._onResizeDrop=this.createCallback(this._handleResizeDrop);
this._onAbortDrop=this.createCallback(this._handleResizeAbort);
}
AdfDhtmlPanelWindowPeer.prototype.InitDomElement= function(x36,x37)
{
 var x38=x36.getParent();
 if (x38==null)
{
x38=x36;
}
 var x39= new Object();
x39[AdfDhtmlPopupWindow.HINT_MODAL]=x36.getModal();
x39[AdfDhtmlPopupWindow.HINT_DRAG_ELEMENT]=this.getDragElement();
x39[AdfDhtmlPopupWindow.HINT_FOCUS]=true;
x39[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_INACTIVATE;
x39[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_DIALOG;
x39[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_OVERLAP;
AdfDhtmlPopupPeer.setChildHints(x38,x39);
}
AdfDhtmlPanelWindowPeer.prototype.getDragElement= function()
{
 var x40=AdfRichUIPeer.CreateSubId(this.getComponent().getClientId(),
AdfDhtmlPanelWindowPeer._HEADER_TITLE_BAR_SUBID);
 return AdfAgent.AGENT.getElementById(x40);
}
AdfDhtmlPanelWindowPeer.prototype.ComponentTitleChanged= function(
x41,
x42,
x43,
x44)
{
 var x45=AdfAgent.AGENT;
 var x46=AdfRichUIPeer.CreateSubId(x41.getClientId(),"_ttxt");
 var x47=x45.getElementById(x46);
x45.setTextContent(x47,x43);
 return true;
}
AdfDhtmlPanelWindowPeer.prototype.ComponentTitleIconSourceChanged= function(
x48,
x49,
x50,
x51)
{
 var x52=AdfAgent.AGENT;
 var x53=AdfRichUIPeer.CreateSubId(x48.getClientId(),"_ticn")
 var x54=x52.getElementById(x53);
 var x55=x52.getDomDocument().createElement("img");
x55.alt="";
x52.setImageSource(x55,x50);
 if(x50)
{
 if (x54.hasChildNodes())
{
x54.replaceChild(x55,x54.firstChild);
}
 else
 {
x54.appendChild(x55);
}
AdfDomUtils.setVisible(x54,true);
}
 else
 {
AdfDomUtils.setVisible(x54,false);
}
}
AdfDhtmlPanelWindowPeer.prototype.ComponentContentWidthChanged= function(
x56,
x57,
x58,
x59)
{
 var x60=AdfDhtmlPanelWindowPeer._getResizableContentDom(x56);
x60.style.width=x58 + "px";
AdfAgent.AGENT.setExpandoProperty(x57,AdfDhtmlPanelWindowPeer._CONTENT_RESIZED_INDICATOR_EXPANDO,"1");
 return true;
}
AdfDhtmlPanelWindowPeer.prototype.ComponentContentHeightChanged= function(
x61,
x62,
x63,
x64)
{
 var x65=AdfDhtmlPanelWindowPeer._getResizableContentDom(x61);
x65.style.height=x63 + "px";
AdfAgent.AGENT.setExpandoProperty(x62,AdfDhtmlPanelWindowPeer._CONTENT_RESIZED_INDICATOR_EXPANDO,"1");
 return true;
}
AdfDhtmlPanelWindowPeer.prototype.GetComponentContentWidth= function(
x66,
x67)
{
 var x68=AdfDhtmlPanelWindowPeer._getResizableContentDom(x66);
 var x69=x68.style;
 if (x69.width)
 return AdfAgent.getCSSLengthAsInt(x69.width);
 return x68.offsetWidth;
}
AdfDhtmlPanelWindowPeer.prototype.GetComponentContentHeight= function(
x70,
x71)
{
 var x72=AdfDhtmlPanelWindowPeer._getResizableContentDom(x70);
 var x73=x72.style;
 if (x73.height)
 return AdfAgent.getCSSLengthAsInt(x73.height);
 return x72.offsetHeight;
}
AdfDhtmlPanelWindowPeer._getResizableContentDom= function(x74)
{
 var x75=x74.getClientId();
 var x76=null;
 var x77=null;
 if (x74.getProperty("resize")==AdfDhtmlPanelWindowPeer._RESIZE_ON
||x74.getProperty("stretchChildren")==AdfDhtmlPanelWindowPeer._STRETCH_CHILDREN_FIRST)
{
x76=AdfRichUIPeer.createSubId(x75,AdfDhtmlPanelWindowPeer._CONTENT_CENTER_SUBID);
x77=AdfAgent.AGENT.getElementById(x76);
AdfAssert.assertDomElement(x77,"DIV");
}
 else
 {
x76=AdfRichUIPeer.createSubId(x75,AdfDhtmlPanelWindowPeer._CONTENT_SUBID);
x77=AdfAgent.AGENT.getElementById(x76);
AdfAssert.assertDomElement(x77,"TD");
}
 return x77;
}
AdfDhtmlPanelWindowPeer.prototype._getPopupWindow= function(x78)
{
 var x79=null;
 var x80=x78.getParent();
 if (x80&&x80 instanceof AdfRichPopup)
{
 var x81=x80.getPeer();
x81.bind(x80);
x79=x81.getPopupWindow(x80,x80.getClientId());
}
 else
 {
 var x82=x78.getPeer();
 if (this.getComponent()==null||(x82!=this&&x78!=this.getComponent())){
x82.bind(x78);
}
 var x83=x82.getDomElement();
AdfAssert.assertDomElement(x83,"DIV"); var x84=AdfPage.PAGE.getPositionManager();
 if (x84)
{
x79=x84.findFloatingElement(x83);
}
}
 if (x79)
{
AdfAssert.assertPrototype(x79,AdfDhtmlSimpleFloat);
}
 return x79;
}
AdfDhtmlPanelWindowPeer.prototype.BindToComponent= function(x85,x86)
{
AdfDhtmlPanelWindowPeer.superclass.BindToComponent.call(this,x85,x86);
 var x87=this._getPopupWindow(x85);
 if (x87)
{
x87.handleBindToComponent();
}
}
AdfDhtmlPanelWindowPeer.prototype.ComponentRemoved= function(x88)
{
 var x89=this._getPopupWindow(x88);
 if (x89)
{
x89.handleComponentRemoved();
}
}
AdfDhtmlPanelWindowPeer.prototype.calculateMinimumContentSize= function()
{
 var x90=this.getComponent();
 var x91=x90.getClientId();
 var x92=AdfAgent.AGENT;
 var x93=AdfRichUIPeer.createSubId(x91,AdfDhtmlPanelWindowPeer._CONTENT_CENTER_SUBID);
 var x94=x92.getElementById(x93);
AdfAssert.assertDomElement(x94,"DIV");
 if (x92.getExpandoProperty(x94,AdfDhtmlPanelWindowPeer._CONTENT_SIZED_FOR_MINIMUMS_EXPANDO))
{
 return;
}
 var x95=AdfRichUIPeer.createSubId(x91,AdfDhtmlPanelWindowPeer._HEADER_CENTER_EDGE_SUBID);
 var x96=x92.getElementById(x95);
AdfAssert.assertDomElement(x96,"TD");
 var x97=Math.max(1,x96.offsetWidth);
 var x98=AdfRichUIPeer.createSubId(x91,AdfDhtmlPanelWindowPeer._HEADER_TITLE_BAR_SUBID);
 var x99=x96.getElementsByTagName("TD");
 var x100=0;
for(var x101=0;x101<x99.length;x101++)
{
 var x102=x99[x101];
 if (x102.id&&x102.id==x98)
{
x102.style.width="auto";
}
 var x103=AdfDomUtils.getChildElements(x102);
for(var x104=0;x104<x103.length;x104++)
{
 var x105=x103[x104];
x100+=x92.getOuterWidth(x105,x105.offsetWidth);
}
 if (x102.id&&x102.id==x98)
{
x102.style.width="100%";
}
}
 var x106=AdfAgent.getCSSLengthAsInt(x94.style.minWidth);
x106=Math.max(x106,x100);
x94.style.minWidth=x106 + "px";
 var x107=AdfAgent.getCSSLengthAsInt(x94.style.minHeight);
 var x108=Math.max(1,x94.offsetHeight);
 var x109=Math.round((x100/x97)*x108);
x107=Math.max(x107,x109);
x94.style.minHeight=x107 + "px";
x92.setExpandoProperty(x94,AdfDhtmlPanelWindowPeer._CONTENT_SIZED_FOR_MINIMUMS_EXPANDO,"1");
}
AdfDhtmlPanelWindowPeer.prototype.GetResizeGhostSelector= function()
{
 return AdfDhtmlPanelWindowPeer._PANEL_WINDOW_RESIZE_GHOST_CLASS;
}
AdfDhtmlPanelWindowPeer.prototype._startResizeDrag= function(x110,x111,x112)
{
 var x113=AdfPage.PAGE;
 var x114=AdfAgent.AGENT;
 var x115=x114.getEventTarget(x111);
 var x116=x115.style;
AdfAssert.assertString(x112);
this._eventTargetSubId=x112;
 var x117=x110.getContainedComponentClientId();
AdfAssert.assertString(x117);
this._popupWindow=x110;
AdfAssert.assertPrototype(x110,AdfDhtmlSimpleFloat);
this.calculateMinimumContentSize();
 var x118=AdfRichUIPeer.createSubId(x117,AdfDhtmlPanelWindowPeer._CONTENT_CENTER_SUBID);
 var x119=this._resizableContentDom=x114.getElementById(x118);
AdfAssert.assertDomElement(x119,"DIV");
 var x120=x119.style;
 var x121=AdfAgent.getCSSLengthAsInt(x120.width);
 var x122=AdfAgent.getCSSLengthAsInt(x120.height);
 var x123=AdfAgent.getCSSLengthAsInt(x120.minWidth);
 var x124=AdfAgent.getCSSLengthAsInt(x120.minHeight);
this._initContentWidth=x121=(x121>0?x121:x119.offsetWidth);
this._initContentHeight=x122=(x122>0?x122:x119.offsetHeight);
x120.height=x122 + "px";
x120.width=x121 + "px";
 var x125=x119.ownerDocument;
 var x126=this._ghost=x125.createElement("div");
 var x127=x113.getLookAndFeel().getStyleClass(this.GetResizeGhostSelector());
AdfDomUtils.addCSSClassName(x126,x127);
 var x128=1; var x129=x110.getWidth() - (x128*2);
 var x130=x110.getHeight() - (x128*2);
 var x131=this._contentToChromeDeltaX=x129 - x121;
 var x132=this._contentToChromeDeltaY=x130 - x122;
x113.getZOrderManager().addElementToLayer(x126,AdfDhtmlZOrderManager.FLOATINGTYPE_WINDOW);
 var x133=x126.style;
x133.cursor=x116.cursor;
x133.top=x110.getTop() + "px";
x133.left=x110.getLeft() + "px";
x133.width=x129 + "px";
x133.height=x130 + "px";
x133.minWidth=(x123 + x131) + "px";
x133.minHeight=(x124 + x132) + "px";
x110.setDragging(true);
x110.setShadowVisibility(false);
AdfPage.PAGE.startDrag(x111,
this._onResizeDrag,
this._onResizeDrop,
this._onResizeAbort,
true);
}
AdfDhtmlPanelWindowPeer.prototype._handleResizeDrag= function(x134,x135,x136)
{
 var x137=AdfAgent.AGENT;
 var x138=x137.getBrowserViewportScrollTop();
 var x139=x137.getBrowserViewportScrollLeft();
 var x140=x137.getWindowWidth();
 var x141=x137.getWindowHeight();
 var x142=this._eventTargetSubId;
AdfAssert.assertString(x142);
 var x143=this._ghost;
AdfAssert.assertDomElement(x143,"DIV");
 var x144=x143.style;
 var x145=AdfAgent.getCSSLengthAsInt(x144.width);
 var x146=AdfAgent.getCSSLengthAsInt(x144.height);
 var x147=x137.getMousePosition(x134);
 if (x147.x<x139||x147.x>(x140 + x139)
||x147.y<x138||x147.y>(x141 + x138))
{
 return;
}
 var x148=AdfAgent.getCSSLengthAsInt(x144.minWidth);
 var x149=AdfAgent.getCSSLengthAsInt(x144.minHeight);
 var x150=AdfAgent.getCSSLengthAsInt(x144.top);
 var x151=AdfAgent.getCSSLengthAsInt(x144.left);
 var x152=x150;
 var x153=x151;
 var x154=x145;
 var x155=x146;
switch(x142)
{
 case AdfDhtmlPanelWindowPeer._HEADER_START_EDGE_SUBID:
x150=x147.y;
x146+=x152 - x147.y;
x151=x147.x;
x145+=x153 - x147.x;
 if (x146<x149)
{
x150=x152;
x146=x155;
}
 if (x145<x148)
{
x151=x153;
x145=x154;
}
break;
 case AdfDhtmlPanelWindowPeer._HEADER_CENTER_EDGE_SUBID:
x150=x147.y;
x146+=x152 - x147.y;
 if (x146<x149)
{
x150=x152;
x146=x155;
}
break;
 case AdfDhtmlPanelWindowPeer._HEADER_END_EDGE_SUBID:
x150=x147.y;
x146+=x152 - x147.y;
x145=x147.x - x153;
 if (x146<x149)
{
x150=x152;
x146=x155;
}
 if (x145<x148)
{
x145=x154;
}
break;
 case AdfDhtmlPanelWindowPeer._CONTENT_START_EDGE_SUBID:
x151=x147.x;
x145+=x153 - x147.x;
 if (x145<x148)
{
x151=x153;
x145=x154;
}
break;
 case AdfDhtmlPanelWindowPeer._CONTENT_END_EDGE_SUBID:
x145=x147.x - x153;
 if (x145<x148)
{
x145=x154;
}
break;
 case AdfDhtmlPanelWindowPeer._FOOTER_RESIZE_START_ICON_SUBID:
 case AdfDhtmlPanelWindowPeer._FOOTER_START_EDGE_SUBID:
x151=x147.x;
x145+=x153 - x147.x;
x146=x147.y - x152;
 if (x145<x148)
{
x151=x153;
x145=x154;
}
 if (x146<x149)
{
x146=x155;
}
break;
 case AdfDhtmlPanelWindowPeer._FOOTER_CENTER_EDGE_SUBID:
x146=x147.y - x152;
 if (x146<x149)
{
x146=x155;
}
break;
 case AdfDhtmlPanelWindowPeer._FOOTER_RESIZE_END_ICON_SUBID:
 case AdfDhtmlPanelWindowPeer._FOOTER_END_EDGE_SUBID:
x146=x147.y - x152;
x145=x147.x - x153;
 if (x146<x149)
{
x146=x155;
}
 if (x145<x148)
{
x145=x154;
}
break;
}
 if (x152!=x150)
{
x144.top=x150 + "px";
}
 if (x153!=x151)
{
x144.left=x151 + "px";
}
 if (x155!=x146)
{
x144.height=x146 + "px";
}
 if (x154!=x145)
{
x144.width=x145 + "px";
}
}
AdfDhtmlPanelWindowPeer.prototype._handleResizeDrop= function(x156,x157,x158)
{
 var x159=AdfPage.PAGE;
 var x160=this._ghost;
AdfAssert.assertDomElement(x160,"DIV");
 var x161=x160.style;
 var x162=this._popupWindow;
AdfAssert.assertPrototype(x162,AdfDhtmlSimpleFloat);
 var x163=x162.getContainedComponentClientId();
AdfAssert.assertString(x163);
 var x164=this._initContentWidth;
AdfAssert.assertNumeric(x164);
 var x165=this._initContentHeight;
AdfAssert.assertNumeric(x165);
 var x166=this._resizableContentDom;
AdfAssert.assertDomElement(x166,"DIV");
 var x167=this._contentToChromeDeltaX;
AdfAssert.assertNumeric(x167);
 var x168=this._contentToChromeDeltaY;
AdfAssert.assertNumeric(x168);
 delete this._eventTargetSubId;
 delete this._popupWindow;
 delete this._initContentWidth;
 delete this._initContentHeight;
 delete this._resizableContentDom;
 delete this._contentToChromeDeltaX;
 delete this._contentToChromeDeltaY;
 delete this._ghost;
 var x169=AdfAgent.getCSSLengthAsInt(x161.top);
 var x170=AdfAgent.getCSSLengthAsInt(x161.left);
 var x171=AdfAgent.getCSSLengthAsInt(x161.width) - x167;
 var x172=AdfAgent.getCSSLengthAsInt(x161.height) - x168;
 var x173=x159.findComponent(x163);
 if (x173&&x173.getContentWidth&&x173.getContentHeight)
{
 var x174=x173.getPeer();
x174.bind(x173);
 if (x171!=x164)
{
x173.setProperty(AdfRichPanelWindow.CONTENT_WIDTH,x171,true,true);
}
 if (x172!=x165)
{
x173.setProperty(AdfRichPanelWindow.CONTENT_HEIGHT,x172,true,true);
}
}
x159.getZOrderManager().removeElement(x160);
x162.autoSize();
x159.doResizeNotifyDom(x166,false);
x162.setDragging(false);
x162.setShadowVisibility(true);
x162.setPosition(x169,x170);
}
AdfDhtmlPanelWindowPeer.prototype._handleResizeAbort= function()
{
 var x175=this._ghost;
AdfAssert.assertDomElement(x175,"DIV");
 delete this._eventTargetSubId;
 delete this._popupWindow;
 delete this._initContentWidth;
 delete this._initContentHeight;
 delete this._resizableContentDom;
 delete this._contentToChromeDeltaX;
 delete this._contentToChromeDeltaY;
 delete this._ghost;
AdfPage.PAGE.getZOrderManager().removeElement(x175);
}
AdfDhtmlPanelWindowPeer.prototype.isContentResized= function(x176)
{
 var x177=x176.getPeer();
x177.bind(x176);
 var x178=x177.getDomElement();
 var x179=AdfAgent.AGENT.getExpandoProperty(x178,AdfDhtmlPanelWindowPeer._CONTENT_RESIZED_INDICATOR_EXPANDO);
 return (x179&&x179=="1");
}
AdfDhtmlPanelWindowPeer.prototype.getAnimationDurationSkinProperty= function()
{
 return AdfDhtmlPanelWindowPeer._ANIMATION_DURATION_SKIN_PROPERTY;
}

AdfUIComponents.createComponentClass("AdfRichDialog",
{
componentType:"oracle.adf.RichDialog",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true,secured:true}
,{name:"title",type:"String"}
,{name:"titleIconSource",type:"String"}
,{name:"closeIconVisible",type:"Boolean","default":true}
,{name:"helpTopicId",type:"String"}
,{name:"contentHeight",type:"Number"}
,{name:"contentWidth",type:"Number"}
,{name:"stretchChildren",type:"String","default":"none"}
,{name:"resize",type:"String","default":"off"}
,{name:"affirmativeTextAndAccessKey",type:"String"}
,{name:"cancelTextAndAccessKey",type:"String"}
,{name:"noTextAndAccessKey",type:"String"}
,{name:"type",type:"String","default":"okCancel"}
,{name:"modal",type:"Boolean","default":true}
,{name:"okVisible",type:"Boolean","default":true}
,{name:"cancelVisible",type:"Boolean","default":true}
],
superclass:AdfUIDialog
});

AdfRichUIPeer.createPeerClass(AdfDhtmlPanelWindowPeer,"AdfDhtmlDialogPeer");
AdfDhtmlDialogPeer.InitSubclass= function()
{
this._OK_ID="ok";
this._CANCEL_ID="cancel";
this._YES_ID="yes";
this._NO_ID="no";
this._OUTCOME_ATTR_NAME="_afrPdO";
this._BUTTON_IDS=[
AdfDhtmlDialogPeer._OK_ID,
AdfDhtmlDialogPeer._YES_ID,
AdfDhtmlDialogPeer._NO_ID,
AdfDhtmlDialogPeer._CANCEL_ID];
this._BUTTON_OUTCOMES=[
AdfDialogEvent.OUTCOME_OK,
AdfDialogEvent.OUTCOME_YES,
AdfDialogEvent.OUTCOME_NO,
AdfDialogEvent.OUTCOME_CANCEL];
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE);
this._DIALOG_RESIZE_GHOST_CLASS="af|dialog::resize-ghost";
this._ANIMATION_DURATION_SKIN_PROPERTY="af|dialog-tr-open-animation-duration";
}
AdfDhtmlDialogPeer.prototype.Init= function(x0,x1)
{
AdfDhtmlDialogPeer.superclass.Init.call(this,x0,x1);
}
AdfDhtmlDialogPeer.prototype.InitDomElement= function(x2,x3)
{
AdfDhtmlDialogPeer.superclass.InitDomElement.call(this,x2,x3);
 var x4=x2.getClientId();
AdfDhtmlDialogPeer._setOutcomeExpandos(x4);
}
AdfDhtmlDialogPeer.hideDialogIfNoMessages= function(x5)
{
 var x6=AdfPage.PAGE.findComponent(x5);
 if ((x6==null)|| !(x6 instanceof AdfRichDialog))
{
 return;
}
 var x7=AdfPage.PAGE;
 var x8=x7.getAllMessages();
 var x9=x7.getDefaultMessageHandlerComponentId();
for(var x10 in x8)
{
 var x11=(x10==x9);
 var x12=false;
 if (!x11)
{
 var x13=x7.findComponent(x10);
 if(x13!=null)
x12=x13.isDescendant(x6);
}
 if(x11||x12)
{
 var x14=x8[x10];
for(var x15=0;x15<x14.length;x15++)
{
 var x16=x14[x15];
 if (x16.getSeverity()>=TrFacesMessage.SEVERITY_ERROR)
{
 return;
}
}
}
}
 var x17=x6.getParent();
 if (x17 instanceof AdfRichPopup)
{
x17.hide();
}
 else
 {
x6.setVisible(false);
}
}
AdfDhtmlDialogPeer.prototype.fireCancel= function()
{
 var x18=this.getComponent();
 var x19= new AdfDialogEvent(x18,AdfDialogEvent.OUTCOME_CANCEL);
x18.broadcast(x19);
}
AdfDhtmlDialogPeer.prototype.HandleComponentClick= function(x20)
{
 var x21=this.getComponent();
 if (this.IsBusy(x21.getClientId()))
{
x20.cancel();
x20.stopBubbling();
}
 if (!x20.isCanceled())
{
 if (x20.isLeftButtonPressed())
{
 if (this._queueDialogOutcome(x21,x20,false))
{
 return;
}
}
}
}
AdfDhtmlDialogPeer.prototype.handleEscapeKey= function(x22)
{
 var x23=this.getComponent();
 new AdfDialogEvent(x23,AdfDialogEvent.OUTCOME_CANCEL).queue();
AdfAgent.AGENT.eatEvent(x22);
}
AdfDhtmlDialogPeer.prototype.HandleComponentKeyDown= function(x24)
{
 var x25=this.getComponent();
 if (this.IsBusy(x25.getClientId()))
{
x24.cancel();
x24.stopBubbling();
}
 if (!x24.isCanceled())
{
 var x26=x24.getKeyCode();
 if (x26==AdfKeyStroke.ENTER_KEY)
{
 if (this._queueDialogOutcome(x25,x24,true))
{
 return;
}
 var x27=x24.getNativeEventTarget();
 var x28=x27.tagName;
 var x29;
 var x30=x25.getClientId();
 if (AdfDhtmlDialogPeer._isOKPresent(x30))
{
x29=AdfDialogEvent.OUTCOME_OK;
}
 else if (AdfDhtmlDialogPeer._isYesPresent(x30))
{
x29=AdfDialogEvent.OUTCOME_YES;
}
 if (x28=="A"||
x28=="BUTTON"||
x28=="TEXTAREA")
{
x29=null;
}
 else if (x28=="INPUT")
{
 var x31=x27.type;
 if (x31=="button"||
x31=="submit"||
x31=="reset")
{
x29=null;
}
}
 if (x29)
{
x24.cancel();
x24.stopBubbling();
 new AdfDialogEvent(x25,x29).queue();
 return;
}
}
}
AdfDhtmlDialogPeer.superclass.HandleComponentKeyDown.call(this,x24);
}
AdfDhtmlDialogPeer.prototype.HandleComponentKeyUp= function(x32)
{
 if (!x32.isCanceled())
{
 var x33=x32.getKeyCode();
 var x34=this.getComponent();
 if (x33==AdfKeyStroke.SPACE_KEY)
{
 if (this._queueDialogOutcome(x34,x32,false))
{
 return;
}
}
}
AdfDhtmlDialogPeer.superclass.HandleComponentKeyUp.call(this,x32);
}
AdfDhtmlDialogPeer.prototype.HandleComponentKeyPress= function(x35)
{
 if (!x35.isCanceled())
{
 var x36=x35.getKeyCode();
 if (x36==AdfKeyStroke.ENTER_KEY)
{
 var x37=x35.getNativeEventTarget();
 var x38=x37.getAttribute(AdfDhtmlDialogPeer._OUTCOME_ATTR_NAME);
 if (x38==AdfDialogEvent.OUTCOME_CANCEL)
{
x35.cancel();
x35.stopBubbling();
 var x39=this.getComponent();
 new AdfDialogEvent(x39,x38).queue();
 return;
}
}
}
AdfDhtmlDialogPeer.superclass.HandleComponentKeyPress.call(this,x35);
}
AdfDhtmlDialogPeer.prototype._queueDialogOutcome= function(
x40,
x41,
x42)
{
 var x43;
 if (this.IsClose(x41))
{
x43=AdfDialogEvent.OUTCOME_CANCEL;
}
 else
 {
 var x44=x41.getNativeEventTarget();
 if (x44.tagName=="SPAN"&&x44.parentNode.tagName=="BUTTON")
x44=x44.parentNode;
x43=x44.getAttribute(AdfDhtmlDialogPeer._OUTCOME_ATTR_NAME);
 if (x43&&(x44.disabled||AdfDomUtils.containsCSSClassName(x44,AdfRichUIPeer.DISABLED_STYLECLASS)))
x43=null;
}
 if (x42&&x43==AdfDialogEvent.OUTCOME_CANCEL)
{
x43=false;
}
 else if (x43)
{
x41.cancel();
x41.stopBubbling();
 new AdfDialogEvent(x40,x43).queue();
}
 return x43;
}
AdfDhtmlDialogPeer._isOKPresent= function(x45)
{
 return (AdfDhtmlDialogPeer._getButtonDom(x45,AdfDhtmlDialogPeer._OK_ID)!=null);
}
AdfDhtmlDialogPeer._isYesPresent= function(x46)
{
 return (AdfDhtmlDialogPeer._getButtonDom(x46,AdfDhtmlDialogPeer._YES_ID)!=null);
}
AdfDhtmlDialogPeer._getButtonDom= function(x47,x48)
{
 return AdfAgent.AGENT.getElementById(AdfRichUIPeer.CreateSubId(x47,x48));
}
AdfDhtmlDialogPeer._setOutcomeExpandos= function(x49)
{
 var x50=AdfDhtmlDialogPeer._BUTTON_IDS;
 var x51=AdfDhtmlDialogPeer._BUTTON_OUTCOMES;
 var x52=x50.length;
for(var x53=0;x53<x52;x53++)
{
 var x54=AdfDhtmlDialogPeer._getButtonDom(x49,x50[x53]);
 if (x54)
x54.setAttribute(AdfDhtmlDialogPeer._OUTCOME_ATTR_NAME,x51[x53]);
}
}
AdfDhtmlDialogPeer._setButtonDisableState= function(x55,x56)
{
AdfAssert.assertString(x55);
AdfAssert.assertBoolean(x56);
 var x57=AdfDhtmlDialogPeer._BUTTON_IDS;
 var x58=x57.length;
for(var x59=0;x59<x58;x59++)
{
 var x60=AdfDhtmlDialogPeer._getButtonDom(x55,x57[x59]);
 if (x60)
AdfDhtmlButtonPeer.__setDisabled(x60,x56);
}
}
AdfDhtmlDialogPeer.prototype.IsBusy= function(x61)
{
 var x62=AdfDhtmlDialogPeer._BUTTON_IDS;
 var x63=x62.length;
 var x64=0;
 var x65=0;
for(var x66=0;x66<x63;x66++)
{
 var x67=AdfDhtmlDialogPeer._getButtonDom(x61,x62[x66]);
 if (x67)
{
x64++;
 if (AdfDomUtils.containsCSSClassName(x67,AdfRichUIPeer.DISABLED_STYLECLASS))
{
x65++;
}
}
}
 return (x64>0&&x64==x65);
}
AdfDhtmlDialogPeer.prototype.SetBusy= function(
x68)
{
AdfDhtmlDialogPeer._setButtonDisableState(this.getComponent().getClientId(),x68);
}
AdfDhtmlDialogPeer.prototype.getDefaultButtonDom= function(x69)
{
 var x70=AdfDhtmlDialogPeer._BUTTON_IDS;
 var x71=x70.length;
for(var x72=0;x72<x71;x72++)
{
 var x73=AdfDhtmlDialogPeer._getButtonDom(x69,x70[x72]);
 if (x73)
{
 return x73;
}
}
 return null;
}
AdfDhtmlDialogPeer.prototype.GetResizeGhostSelector= function()
{
 return AdfDhtmlDialogPeer._DIALOG_RESIZE_GHOST_CLASS;
}
AdfDhtmlDialogPeer.prototype.getAnimationDurationSkinProperty= function()
{
 return AdfDhtmlDialogPeer._ANIMATION_DURATION_SKIN_PROPERTY;
}

AdfUIComponents.createComponentClass("AdfUISelectInput",
{
componentType:"org.apache.myfaces.trinidad.SelectInput",
propertyKeys:[{name:"actionExpression",type:"Object",secured:true}
,{name:"returnListener",type:"Object",secured:true}
],
eventNames:["action","return"],
superclass:AdfUIEditableValue
});

AdfUIComponents.createComponentClass("AdfUIChoose",
{
componentType:"org.apache.myfaces.trinidad.Choose"
});

AdfUIComponents.createComponentClass("AdfUIShowDetail",
{
componentType:"org.apache.myfaces.trinidad.ShowDetail",
propertyKeys:[{name:"disclosed",type:"Boolean","default":false}
,{name:"disclosedTransient",type:"Boolean","default":false,secured:true}
,{name:"immediate",type:"Boolean","default":false,secured:true}
,{name:"disclosureListener",type:"Object",secured:true}
],
eventNames:["disclosure"]
});

AdfUIShowDetail.InitClass= function()
{
AdfUIComponent.InitClass.call(this);
AdfUIComponent.SetDisconnectedProperty(AdfUIShowDetail,"disclosed");
}
AdfUIShowDetail.prototype.HandleEvent= function(x0)
{
 if ((x0.getType()==AdfDisclosureEvent.EVENT_TYPE)&&
 !x0.isExpanded()&&
 !x0.propagatesToServer())
{
 var x1=x0.getDisclosureCounterpart();
 if (x1!=null)
{
 var x2= new AdfDisclosureEvent(x1,true);
x2.setPartial(x0.isPartial());
x2.setRoot(x1.getParent());
x2.queue();
}
}
AdfUIDialog.superclass.HandleEvent.call(this,x0);
}
AdfUIComponents.createComponentClass("AdfUISelectBoolean",
{
componentType:"org.apache.myfaces.trinidad.SelectBoolean",
propertyKeys:[{name:"selected",type:"Boolean","default":false,secured:true}
],
superclass:AdfUIEditableValue
});

AdfUIComponents.createComponentClass("AdfUISelectMany",
{
componentType:"org.apache.myfaces.trinidad.SelectMany",
superclass:AdfUIEditableValue
});

AdfUISelectMany.InitSubclass= function()
{
this.SELECT_ITEMS="selectItems";
}
AdfUISelectMany.prototype.getSelectItems= function()
{
 return this.getPropertyValue(AdfUISelectMany.SELECT_ITEMS);
}
AdfUISelectMany.prototype.GetRequiredKey= function()
{
 return "org.apache.myfaces.trinidad.UIXSelectMany.REQUIRED";
}
AdfRichUIPeer.createPeerClass(AdfDhtmlEditableValuePeer,"AdfDhtmlSelectManyPeer");
AdfDhtmlSelectManyPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.MOUSE_IN_EVENT_TYPE);
this._SELECT_ALL_ID="saId";
this._ITEM_VALUE_EXPANDO="_adfIV";
}
AdfDhtmlSelectManyPeer.prototype.HandleComponentMouseOver= function(x0)
{
this.ShowNoteWindowMouseOver(x0);
}
AdfDhtmlSelectManyPeer.prototype.GetComponentLabel= function(
x1,
x2)
{
 var x3=x2.getElementsByTagName("LABEL");
 var x4=(x3.length)?x3[0]:null;
 if (x4!=null)
{
 var x5=AdfDhtmlEditableValuePeer.GetContentNode(x1,x2);
 var x6=x4.parentNode;
while(x6&&x6!=x2)
{
 if (x6==x5)
 return null;
x6=x6.parentNode;
}
 return AdfAgent.AGENT.getTextContent(x4);
}
 else
 {
 return null;
}
}
AdfDhtmlSelectManyPeer.prototype.getConvertedValue= function(
x7,
x8)
{
 var x9=x8;
 if (x7.getConverter!=undefined)
{
 var x10=x7.getConverter();
 if (x10!=null)
{
x9= new Array();
for( var x11=0;x11<x8.length;x11++)
{
x9[x11]=x10.getAsObject(x8[x11],
x7.getProperty("label"));
 if (x9[x11]===undefined)
 return undefined;
}
}
}
 return x9;
}
AdfDhtmlSelectManyPeer.prototype.getConvertedObject= function(
x12,
x13)
{
 if (x13!=null)
{
 var x14=x13;
 if (x12==null)
x12=this.getComponent();
 var x15=x12.getConverter();
 if (x15!=null)
{
x14= new Array();
for(var x16=0;x16<x13.length;x16++ )
{
x14[x16]=x15.getAsString(x13[x16],x12.getProperty("label"));
 if (x14[x16]===undefined)
 return undefined;
}
}
 return x14;
}
 return null;
}
AdfDhtmlSelectManyPeer.prototype.IsCheckbox= function(x17)
{
 if(x17!=null)
 return (AdfAgent.AGENT.getNodeName(x17)=='INPUT'&&x17.type=="checkbox");
 else
 return false;
}
AdfDhtmlSelectManyPeer.prototype.GetCheckboxByEventTarget= function(x18,x19)
{
 var x20=AdfAgent.AGENT;
 if (x18&&x20.getNodeName(x18)!='INPUT')
{
 var x21=x18.getElementsByTagName("input")[0];
 if (x21&&this.IsCheckbox(x21))
{
 if (!x21.disabled)
{
 var x22=x20.getComputedStyle(x21);
 var x23=x20.getPlatform()==AdfAgent.IE_PLATFORM;
 var x24=x20.getPlatform()==AdfAgent.GECKO_PLATFORM;
 var x25=x19.getNativeEvent();
 if (x20.getNodeName(x18)!='LABEL'||
(x23&&x22.display=="none")||
(x24&&x25.ctrlKey))
{
 if (x22.display!="none")
x21.focus();
x21.checked= !x21.checked;
}
}
 return x21;
}
}
 return x18;
}
AdfDhtmlSelectManyPeer.prototype.GetNullDefault= function()
{
 return AdfCollections.EMPTY_ARRAY;
}
AdfDhtmlSelectManyPeer.prototype.GetSubmittedValue= function(
component,
domElement)
{
AdfAssert.assertDomElement(domElement);
 var readOnly=component.getReadOnly();
 if (readOnly)
{
 var domNode=AdfDhtmlEditableValuePeer.GetContentNode(component,domElement);
 var itemValues=domNode.getAttribute(AdfDhtmlSelectManyPeer._ITEM_VALUE_EXPANDO);
 return eval(itemValues);
}
 else
 {
 var boxes=this.GetCheckboxes(component,domElement);
 var values= new Array();
 if (boxes)
{
for(var i=0;i<boxes.length;i++)
{
 var cb=boxes[i];
 if (cb.checked)
values.push(cb.value);
}
}
 return values;
}
}
AdfDhtmlSelectManyPeer.prototype.GetCheckboxes= function(x26,x27,x28)
{
AdfAssert.assertDomElement(x27);
 var x29=AdfDomUtils.getFormElement(x27);
 var x30=x26.getClientId();
 var x31=x29.elements[x30];
 if (x31)
{
 if (x31.length)
 return x31;
 var x32= new Array();
x32.push(x31);
 return x32;
}
 return null;
}
AdfDhtmlSelectManyPeer.prototype.GetComponentSelectItems= function(
x33,
x34)
{
AdfAssert.assertDomElement(x34);
 var x35= new Array();
 var x36=this.GetCheckboxes(x33,x34);
 if (x36)
{
for(i=0;i<x36.length;i++)
{
x35[i]= new AdfSelectItem();
x35[i].setValue(x36[i].value);
 var x37=this.GetLabelValue(x36[i]);
 if (x37)
x35[i].setLabel(x37);
x35[i].setDisabled(x36[i].disabled);
}
}
 return x35;
}
AdfDhtmlSelectManyPeer.prototype.GetLabelValue= function(
x38)
{
 if(x38.nextSibling)
 return x38.nextSibling.nodeValue;
 else
 return null;
}
AdfDhtmlSelectManyPeer.prototype.GetSelectAllCheckbox= function(x39)
{
 var x40=AdfRichUIPeer.CreateSubId(x39.getClientId(),
AdfDhtmlSelectManyPeer._SELECT_ALL_ID);
 return AdfAgent.AGENT.getElementById(x40);
}
AdfDhtmlSelectManyPeer.prototype.GetPreviousItem= function(x41,x42,x43,x44,x45)
{
AdfAssert.assertDomElement(x42);
 var x46=this.GetCheckboxes(x41,x42,x45);
 if (x46)
{
 var x47=null;
 if (!x44)
x47=this.GetSelectAllCheckbox(x41);
 if (x44||x43!=x47)
{
for(var x48=0;x48<x46.length;x48++)
{
 var x49=x46[x48];
 if (x49==x43)
break;
 if (!x49.disabled)
x47=x49;
}
 if (x47)
x43=x47;
}
}
 return x43;
}
AdfDhtmlSelectManyPeer.prototype.GetNextItem= function(x50,x51,x52,x53)
{
AdfAssert.assertDomElement(x51);
 var x54=this.GetCheckboxes(x50,x51,x53);
 if (x54)
{
 var x55=null;
for(var x56=x54.length-1;x56>=0;x56--)
{
 var x57=x54[x56];
 if (x57==x52)
break;
 if (!x57.disabled)
x55=x57;
}
 if (x55)
x52=x55;
}
 return x52;
}
AdfDhtmlSelectManyPeer.prototype.SelectRange= function(x58,x59,x60,x61,x62)
{
 var x63=this.GetCheckboxes(x58,x59,x62);
 if (x63)
{
 var x64=this.GetSelectAllCheckbox(x58);
 var x65=null;
 var x66=false;
 var x67;
 if (x60==x64)
{
x66=true;
x67=x61
}
 else if (x61==x64)
{
x66=true;
x67=x60
}
for(var x68=0;x68<x63.length;x68++)
{
 var x69=x63[x68];
 if (!x66)
 if (x69==x60)
{
x66=true;
x67=x61
}
 else if (x69==x61)
{
x66=true;
x67=x60
}
 if (x66)
{
 if (!x69.disabled)
{
x69.checked=true;
this.UpdateSelectedStyle(x69);
}
 if (x69==x67)
break;
}
}
}
}
AdfDhtmlSelectManyPeer.prototype.UpdateAll= function(
x70,
x71,
x72,
x73)
{
 var x74=this.GetCheckboxes(x70,x71);
 if (x74)
{
for(var x75=0;x75<x74.length;x75++)
{
 var x76=x74[x75];
 if (!x76.disabled)
x76.checked=x72;
}
 if (x73)
{
 var x77=this.GetSubmittedValue(x70,x71);
this.Validate(x70,x77);
}
}
}
AdfDhtmlSelectManyPeer.prototype.UpdateSelectedStyle= function(x78)
{
 if (x78)
 if (x78.checked)
{
 if (!AdfDomUtils.containsCSSClassName(x78.parentNode.parentNode,AdfDhtmlSelectManyPeer.SELECTED_STYLE))
AdfDomUtils.addCSSClassName(x78.parentNode.parentNode,AdfDhtmlSelectManyPeer.SELECTED_STYLE);
}
 else
 {
 if (AdfDomUtils.containsCSSClassName(x78.parentNode.parentNode,AdfDhtmlSelectManyPeer.SELECTED_STYLE))
AdfDomUtils.removeCSSClassName(x78.parentNode.parentNode,AdfDhtmlSelectManyPeer.SELECTED_STYLE);
}
}
AdfDhtmlSelectManyPeer.prototype.GetSelectItemsParentDomElement= function(x79)
{
 return AdfDhtmlEditableValuePeer.GetContentNode(x79);
}
AdfDhtmlSelectManyPeer.HIGHLIGHTED_STYLE="p_AFHighlighted";
AdfDhtmlSelectManyPeer.SELECTED_STYLE="p_AFSelected";

AdfUIComponents.createComponentClass("AdfUISelectOne",
{
componentType:"org.apache.myfaces.trinidad.SelectOne",
superclass:AdfUIEditableValue
});

AdfUISelectOne.InitSubclass= function()
{
this.SELECT_ITEMS="selectItems";
}
AdfUISelectOne.prototype.getSelectItems= function()
{
 return this.getPropertyValue(AdfUISelectOne.SELECT_ITEMS);
}
AdfUISelectOne.prototype.GetRequiredKey= function()
{
 return "org.apache.myfaces.trinidad.UIXSelectOne.REQUIRED";
}
AdfRichUIPeer.createPeerClass(AdfDhtmlEditableValuePeer,"AdfDhtmlSelectOnePeer");
AdfDhtmlSelectOnePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.MOUSE_IN_EVENT_TYPE);
}
AdfDhtmlSelectOnePeer.prototype.HandleComponentMouseOver= function(x0)
{
this.ShowNoteWindowMouseOver(x0);
}

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectOnePeer,"AdfDhtmlSelectOneListbasePeer");
AdfDhtmlSelectOneListbasePeer.InitSubclass= function()
{
this._ITEM_VALUE_EXPANDO="_adfIV";
this._DISABLED_STYLE_CLASS="p_AFDisabled";
this._SELECTED_STYLE_CLASS="p_AFSelected";
}
AdfDhtmlSelectOneListbasePeer.prototype.GetSubmittedValue= function(
x0,
x1)
{
 var x2=AdfDhtmlEditableValuePeer.GetContentNode(x0,x1);
 var x3=x0.getReadOnly();
 if (x3)
 return x2.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 else
 return x2.value;
}
AdfDhtmlSelectOneListbasePeer.prototype.IsItemEnabled= function(x4)
{
 return (x4.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO)!=null&&
 !AdfDomUtils.containsCSSClassName(x4,AdfDhtmlSelectOneListbasePeer._DISABLED_STYLE_CLASS))
}
AdfDhtmlSelectOneListbasePeer.prototype.FindItemElementWithValue= function(
x5,
x6)
{
 var x7=this.GetItemElements(x5);
 var x8=x7.length;
 var x9=null;
for(var x10=0;x10<x8;x10++)
{
x9=x7[x10];
 var x11=x9.getAttribute(
AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 if(x11==x6)
 return x9;
}
 return null;
}
AdfDhtmlSelectOneListbasePeer.prototype.GetItemElements= function(
x12)
{
 var x13= new Array();
 var x14=null;
 var x15=this.GetItemElementsParent(x12);
 var x16=AdfDomUtils.getFirstChildElement(x15);
 var x17=0;
while(x16)
{
itemValue=x16.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 if(itemValue!=null)
{
x13[x17++]=x16;
}
x16=AdfDomUtils.getNextElement(x16);
}
 return x13;
}
AdfDhtmlSelectOneListbasePeer.prototype.SelectItemElement= function(
x18,x19,x20)
{
 if(x20!=null)
{
 if (x20!=x19)
AdfDomUtils.removeCSSClassName(x20,AdfDhtmlSelectOneListbasePeer._SELECTED_STYLE_CLASS);
}
 if(x19!=null&&x19!=x20)
{
AdfDomUtils.addCSSClassName(x19,AdfDhtmlSelectOneListbasePeer._SELECTED_STYLE_CLASS);
AdfDomUtils.scrollChildIntoViewY(x19);
}
}
AdfDhtmlSelectOneListbasePeer.prototype.GetFirstEnabledItem= function(x21)
{
 var x22=this.GetItemElementsParent(x21);
 var x23=AdfDomUtils.getFirstChildElement(x22);
 if (this.IsItemEnabled(x23))
 return x23;
 else
 return this.GetNextEnabledItem(x23);
}
AdfDhtmlSelectOneListbasePeer.prototype.GetPreviousEnabledItem= function(x24)
{
 if (x24)
{
 var x25=AdfDomUtils.getPreviousElement(x24);
while(x25)
{
 if(this.IsItemEnabled(x25))
{
 return x25;
}
x25=AdfDomUtils.getPreviousElement(x25);
}
}
 return x24;}
AdfDhtmlSelectOneListbasePeer.prototype.GetNextEnabledItem= function(x26)
{
 if (x26)
{
 var x27=AdfDomUtils.getNextElement(x26);
while(x27)
{
 if(this.IsItemEnabled(x27))
{
 return x27;
}
x27=AdfDomUtils.getNextElement(x27);
}
}
 return x26;}
AdfDhtmlSelectOneListbasePeer.prototype.GetComponentSelectItems= function(
x28,
x29)
{
 var x30= new Array();
 var x31;
 var x32=this.GetItemElements(x28);
 var x33=x32.length;
 var x34=null;
 var x35=null;
 var x36=null;
for(x31=0;x31<x33;x31++)
{
x34=x32[x31];
x30[x31]= new AdfSelectItem();
x36=x34.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
x30[x31].setValue(x36);
x30[x31].setLabel(x34.firstChild.nodeValue);
x35=AdfDomUtils.containsCSSClassName(x34,AdfDhtmlSelectOneListbasePeer._DISABLED_STYLE_CLASS);
 if(x35==true)
x30[x31].setDisabled(true);
 else
 x30[x31].setDisabled(false);
}
 return x30;
}
AdfDhtmlSelectOneListbasePeer.prototype.GetItemElementsParent= function(x37)
{
AdfAssert.failedInAbstractFunction();
}

AdfUIComponents.createComponentClass("AdfUIObject",
{
componentType:"org.apache.myfaces.trinidad.Object"
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlDocumentPeer",false);
AdfDhtmlDocumentPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,
AdfComponentEvent.BLUR_EVENT_TYPE,
AdfComponentEvent.FOCUS_EVENT_TYPE,
AdfDialogEvent.EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.CONTEXT_MENU_EVENT_TYPE,
AdfRedirectEvent.REDIRECT_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(
this,
AdfRichDocument.SHORT_DESC,
AdfRichDocument.TITLE);
this._ICON_CONTAINER_ID="iconC";
this._MESSAGE_DIALOG_ID="msgDlg";
this._MESSAGE_DIALOG_CONTAINER_ID="msgCtr";
this._SKIP_LINK_ID="skip";
this._INACTIVE_STYLECLASS="p_AFInactive";this._ALERT_CONFIRM_DIALOG_CONTAINER_ID="afr::UtilPopupCtnr";this._ALERT_CONFIRM_POPUP_ID_EXPANDO="_pid";this._ALERT_CONFIRM_DIALOG_ID_EXPANDO="_did";this._DIALOG_CONTENT_SUBID="contentContainer";this._DIALOG_CANCEL_ID_SUBID="cancel";this._ALERT_CONFIRM_DIALOG_MAX_WIDTH_EXPANDO="_dmw";}
AdfDhtmlDocumentPeer.prototype.Init= function(x0)
{
 var x1=AdfPage.PAGE;
x1.setDocumentClientId(x0.getClientId());
AdfDhtmlDocumentPeer.superclass.Init.call(this,x0);
}
AdfDhtmlDocumentPeer.prototype.ComponentShortDescChanged= function(
x2,
x3,
x4,
x5)
{
AdfAssert.assertStringOrNull(x4);
document.body.title=x4;
 return true;
}
AdfDhtmlDocumentPeer.prototype.ComponentTitleChanged= function(
x6,
x7,
x8,
x9)
{
AdfAssert.assertStringOrNull(x8);
document.title=x8;
 return true;
}
AdfDhtmlDocumentPeer.prototype.isMessagesDialogShowable= function()
{
 var x10=AdfPage.PAGE;
 var x11=x10.getAllMessages();
 var x12=this.getComponent();
 var x13=x12.getClientId();
 var x14=x11[x13];
 var x15=this._getSlaveComponent();
 var x16=false;
 if (x15!=null)
{
x16=x15.getGlobalOnly();
}
 return AdfMessageUtils.isPageLevelBoxNeeded(x10,x14,x16);
}
AdfDhtmlDocumentPeer.prototype.getMessageDialogId= function()
{
 var x17=this.getComponent().getClientId();
 return AdfRichUIPeer.CreateSubId(x17,AdfDhtmlDocumentPeer._MESSAGE_DIALOG_ID);
}
AdfDhtmlDocumentPeer.prototype.setMessagesDialogShown= function(x18)
{
 if (x18)
{
this.messageShow();
}
 else
 {
this._hideMessagePopup();
}
}
AdfDhtmlDocumentPeer.prototype.HandleComponentFocus= function(x19)
{
 if (x19.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x20=this._getSkipLinkElement(this.getComponent());
 if (x19.getNativeEventTarget()==x20)
x20.style.top="0px";
}
}
AdfDhtmlDocumentPeer.prototype.HandleComponentBlur= function(x21)
{
 if (x21.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x22=this._getSkipLinkElement(this.getComponent());
 if (x21.getNativeEventTarget()==x22)
x22.style.top="";
}
}
AdfDhtmlDocumentPeer.prototype.HandleComponentClick= function(x23)
{
 if (x23.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x24=this._getSkipLinkElement(this.getComponent());
 if (x23.getNativeEventTarget()==x24)
{
this._skipToContent();
x23.cancel();
}
}
}
AdfDhtmlDocumentPeer.prototype.HandleComponentContextMenu= function(x25)
{
 if (AdfDhtmlDocumentPeer.__ACTION_LINK_BROWSER_CONTEXT_SUPPRESSION_OFF)
 return;
AdfDomUtils.suppressActionLinkBrowserContextMenu(x25);
}
AdfDhtmlDocumentPeer.prototype.HandleComponentKeyUp= function(x26)
{
 if ((!x26.isCanceled())&&
(AdfPage.PAGE.getDefaultMessageHandlerComponentId()==this.getComponent().getClientId()))
{
 var x27=x26.getKeyCode();
 if ((x26.ctrlKey)&&(x26.altKey))
{
 if (x27==79){
this.setMessagesDialogShown(false);
x26.cancel();
}
}
 else if ((x26.ctrlKey)&&(x26.shiftKey))
{
 if (x27==87){
this.setMessagesDialogShown(true);
x26.cancel();
}
}
}
 if (!x26.isCanceled())
{
 var x28=x26.getNativeEvent();
 var x27=x26.getKeyCode();
 if ((x28.ctrlKey)&&(x28.altKey)&&(x27==87)){
 var x29=AdfDhtmlDialogManager.getInstance();
x29.focusNextModelessDialog(x26.getNativeEventTarget());
}
}
}
AdfDhtmlDocumentPeer.prototype.HandleComponentDialog= function(x30)
{
 var x31=x30.getSource().getClientId();
 var x32=this.getComponent().getClientId();
 var x33=AdfRichUIPeer.CreateSubId(x32,
AdfDhtmlDocumentPeer._MESSAGE_DIALOG_ID);
 if (x31==x33)
{
 var x34=x30.getOutcome();
x30.cancel();
this.hidePopup(this.getComponent());
 if (x34==AdfDialogEvent.OUTCOME_OK)
{
 var x35=AdfPage.PAGE;
 var x36=this._getSlaveComponent();
 var x37=false;
 if (x36!=null)
{
x37=x36.getGlobalOnly();
}
 if (!x37)
{
 var x38;
 var x39=x35.getAllMessages();
for(var x40 in x39)
{
 if (x40!=x32)
{
 var x41=x39[x40];
 if ((x41!=null)&&(x41["compId"]!=null))
{
x38=x40;
break;
}
}
}
 if (x38!=null)
{
AdfMessageUtils.messageGroupFocus(x38);
}
}
}
}
}
AdfDhtmlDocumentPeer.prototype.HandleComponentRedirect= function(x42)
{
 var x43=x42.getURL();
 var x44=AdfPage.PAGE;
x44.doRedirect(x43,x42.getNavigationSuppressed());
}
AdfDhtmlDocumentPeer.prototype.PopupClosed= function(x45,x46)
{
AdfDhtmlDocumentPeer.superclass.PopupClosed.call(this,x45,x46);
AdfDomUtils.removeCSSClassName(x46,AdfRichUIPeer.HOVER_TARGET_STYLECLASS);
AdfDomUtils.removeCSSClassName(x46,AdfDhtmlDocumentPeer._INACTIVE_STYLECLASS);
 var x47=x45.getClientId();
 var x48=AdfRichUIPeer.CreateSubId(x47,
AdfDhtmlDocumentPeer._MESSAGE_DIALOG_CONTAINER_ID);
 var x49=AdfAgent.AGENT.getElementById(x48);
 if (x49)
{
x49.appendChild(x46);
}
}
AdfDhtmlDocumentPeer.prototype.InitDomElement= function(x50,x51)
{
 var x52=AdfPage.PAGE;
AdfDhtmlDocumentPeer.superclass.InitDomElement.call(this,x50,x51);
 var x53= new AdfComponentEvent(x50,"load");
 if (x52.isPageOnloadCalled())
{
x53.queue();
}
 else
 {
 var x54=x53.createCallback(x53.queue);
x52.setOnLoadCallback(x54);
}
 if (!x52.isScreenReaderMode())
{
 var x55=x50.getInitialFocusId();
 if (x55)
{
this._activateFocusCallback=this.createCallback(this._activateFocus);
this._focusTimerId=window.setTimeout(this._activateFocusCallback,50);
}
}
this._globalMessageCount=0;
this._initSkipLink(x50);
this._setDocumentTitle(x50);
this._setUncommittedDataWarning(x50);
}
AdfDhtmlDocumentPeer.prototype.ReplaceDomElement=
 function(x56,x57)
{
 var x58=this.getComponent().getClientId();
 var x59=AdfRichUIPeer.CreateSubId(
x58,AdfDhtmlDocumentPeer._ICON_CONTAINER_ID);
 if (x56.id==x59)
{
 var x60=AdfAgent.AGENT;
 var x61=x56.firstChild;
while(x61)
{
 var x62=x61.nextSibling;
 if (x61.nodeType==1)
{
 var x63=x61.id;
 if (x63&& !x60.getElementById(x63))
{
x57.appendChild(x61);
x60.elementsAdded(x61);
}
}
x61=x62;
}
}
 else
 {
AdfDhtmlDocumentPeer.superclass.ReplaceDomElement.call(
this,x56,x57);
}
}
AdfDhtmlDocumentPeer.prototype.MessageShow= function(x64,x65)
{
this._messageUpdate(x64,x65,true)
}
AdfDhtmlDocumentPeer.prototype.MessageNotify= function(x66,x67)
{
this._messageUpdate(x66,x67,false)
}
AdfDhtmlDocumentPeer.prototype._messageUpdate= function(x68,x69,x70)
{
 var x71=AdfPage.PAGE;
 var x72=this._getSlaveComponent();
 var x73=false;
 if (x72!=null)
{
x73=x72.getGlobalOnly();
}
 var x74=this.getComponent();
 var x75=x74.getClientId();
 var x76=x71.getAllMessages();
 var x77=x76[x75];
 var x78=0;
 if (x77!=null)
{
x78=x77.length;
}
 var x79=x71.getClientIdsWithMessages().length;
 if (!x70&& !AdfMessageUtils.hasMessages(x71,x78,x73))
{
AdfMessageUtils.HideMessagesDialog();
}
 else if (x70&& !AdfMessageUtils.isPageLevelBoxNeeded(x71,x77,x73))
{
AdfMessageUtils.HideMessagesDialog();
for(var x75 in x76)
{
 var x80=x76[x75];
 if ((x80!=null)&&(x80["compId"]!=null))
{
AdfMessageUtils.messageGroupFocus(x75);
}
}
}
 else if (x70||
this.isPopupVisible(x74)||
this._globalMessageCount<x78)
{
 var x81=AdfAgent.AGENT;
 var x82=null;
 var x83=null;
 var x84=null;
 if (x72!=null)
{
x82=x72.getMessage();
x83=x72.getText();
x84=x72.getShortDesc();
}
 var x85=AdfRichUIPeer.CreateSubId(x75,AdfDhtmlDocumentPeer._MESSAGE_DIALOG_ID);
 var x86=x71.findComponent(x85);
 var x87=this.getDomElement();
 var x88;
 var x89=0;
 if (x68!=null)
x89=x68;
 if (x73)
{
x89=x77["maxType"];
}
 else
 {
for(var x90 in x76)
{
 var x91=x76[x90]["maxType"];
 if (x91>x89)
x89=x91;
}
}
 var x92=x81.getExpandoProperty(x87,AdfRichUIPeer.__TYPE_ATTR);
 if (x92!=x89)
{
x81.setExpandoProperty(x87,AdfRichUIPeer.__TYPE_ATTR,x89);
 var x93=AdfMessageUtils.getIcon(x89,true);
x86.setTitleIconSource(x93.src);
 if(!x83)
{
x86.setTitle(AdfMessageUtils.getString(x89));
}
 else
 {
x86.setTitle(x83);
}
}
 var x94=AdfRichUIPeer.CreateSubId(x85,"_cnt");
x88=x81.getElementById(x94);
 if (x88)
{
 var x95=AdfMessageUtils.getCombinedMessagesDom(x75,x82,x73);
 if (x84!=null)
{
x95.title=x84;
}
 if (x88.hasChildNodes())
{
x88.replaceChild(x95,x88.firstChild);
}
 else
 {
x88.appendChild(x95);
}
}
 var x96=AdfRichUIPeer.CreateSubId(x75,
AdfDhtmlDocumentPeer._MESSAGE_DIALOG_CONTAINER_ID);
 var x97=x81.getElementById(x85);
 if (x97&&x97.parentNode.id==x96)
{
 var x98={};
x98[AdfDhtmlPopupWindow.HINT_TOP_POSITION]=0.25;
this.showPopup(x74,x97,x98);
}
}
this._globalMessageCount=x78;
}
AdfDhtmlDocumentPeer.prototype._getSlaveComponent= function()
{
 var x99=AdfPage.PAGE;
 var x100=x99.getMessageHandlerSlaveComponentId();
 if (x100!=null)
{
 return x99.findComponent(x100);
}
 return null;
}
AdfDhtmlDocumentPeer.prototype._hideMessagePopup= function()
{
 var x101=this.getComponent();
this.hidePopup(x101);
}
AdfDhtmlDocumentPeer.prototype._activateFocus= function()
{
 var x102=this.getComponent().getInitialFocusId();
 if (x102)
{
 var x103=AdfPage.PAGE.findComponentByAbsoluteId(x102);
 if (x103)
{
x103.focus();
}
 else
 {
AdfLogger.LOGGER.warning("Invalid component id referenced by document initialFocusId: " + x102 +
 ". You may need to set clientComponent to true for the desired focus component.");
}
}
window.clearTimeout(this._focusTimerId);
this._activateFocusCallback=null;
this._focusTimerId=null;
}
AdfDhtmlDocumentPeer.prototype._getSkipLinkElement= function(x104)
{
AdfAssert.assert(x104);
 var x105=x104.getClientId();
 var x106=AdfRichUIPeer.CreateSubId(x105,AdfDhtmlDocumentPeer._SKIP_LINK_ID);
 return AdfAgent.AGENT.getElementById(x106);
}
AdfDhtmlDocumentPeer._getSkipLinkTargetId= function(x107)
{
 return x107.getProperty("_afrSkpLnk");
}
AdfDhtmlDocumentPeer.prototype._initSkipLink= function(x108)
{
 var x109=false;
 var x110=AdfDhtmlDocumentPeer._getSkipLinkTargetId(x108);
 if (!x110)
{
x109=true;
}
 else
 {
 if (AdfAgent.AGENT.getElementById(x110)==null)
{
x109=true;
AdfLogger.LOGGER.warning("Unable to locate skip link target: " +
 x110 +
 ".  Make sure that af:skipLinkTarget is contained within " +
 "a parent that generates content (and an id).");
}
}
 if (x109)
{
 var x111=this._getSkipLinkElement(x108);
x111.style.display="none";
}
}
AdfDhtmlDocumentPeer.prototype._skipToContent= function()
{
 var x112=AdfPage.PAGE;
 var x113=AdfDhtmlDocumentPeer._getSkipLinkTargetId(this.getComponent());
 var x114=AdfAgent.AGENT.getElementById(x113);
AdfAssert.assertDomElement(x114);
 var x115=(x112.isScreenReaderMode())?
AdfDhtmlDocumentPeer._isPotentiallyFocusable:
AdfFocusUtils.isTabStop;
 var x116=AdfDomUtils.getNextElementMatch(x114,null,false,x115);
AdfAssert.assertDomElement(x116);
 if (x116)
{
 if (!AdfFocusUtils.isFocusable(x116))
x116.tabIndex= -1;
AdfFocusUtils.focusElement(x116);
}
}
AdfDhtmlDocumentPeer._isPotentiallyFocusable= function(x117)
{
 if (AdfFocusUtils.isFocusable(x117))
 return true;
 var x118=false;
 var x119=x117.nodeName.toLowerCase();
switch(x119)
{
 case "div":
 case "span":
 case "h1":
 case "h2":
 case "h3":
 case "h4":
 case "h5":
 case "h6":
x118=true;
break;
}
 return (x118)?
AdfFocusUtils.isConnectedAndVisible(x117):
false;
}
AdfDhtmlDocumentPeer.prototype._setDocumentTitle= function(x120)
{
 var x121=x120.getTitle();
 if (x121)
{
 var x122=this.getDomDocument();
 if (x122.title!=x121)
{
 var x123=this.createCallback(this._delayedSetDocumentTitle);
setTimeout(x123,0);
}
}
}
AdfDhtmlDocumentPeer.prototype._delayedSetDocumentTitle= function()
{
 var x124=this.getDomDocument();
 var x125=this.getComponent();
 if (x125)
{
x124.title=x125.getTitle();
}
}
AdfDhtmlDocumentPeer.prototype._setUncommittedDataWarning= function(x126)
{
 var x127=x126.getUncommittedDataWarning();
 var x128=(x127&&x127.toLowerCase()=="on");
AdfPage.PAGE.__initUncommittedDataWarningForDocument(x128);
}
AdfDhtmlDocumentPeer.prototype.__showAlertConfirm= function(x129,x130,x131,x132,x133)
{
AdfAssert.assertString(x130,"confirm title");
AdfAssert.assertString(x131,"confirm message");
AdfAssert.assertFunction(x132,"confirm callback");
 if (x133)
AdfAssert.assertNumber(x133,"confirm timeout");
 var x134=AdfAgent.AGENT;
 var x135=AdfPage.PAGE;
 var x136=x134.getElementById(AdfDhtmlDocumentPeer._ALERT_CONFIRM_DIALOG_CONTAINER_ID);
AdfAssert.assertDomElement(x136,"DIV");
 var x137=x136.getAttribute(AdfDhtmlDocumentPeer._ALERT_CONFIRM_DIALOG_ID_EXPANDO);
AdfAssert.assertString(x137,"alert/confirm dialog id");
 var x138=x135.findComponent(x137);
AdfAssert.assertPrototype(x138,AdfRichDialog);
 var x139=AdfAgent.getCSSLengthAsInt(x136.getAttribute(AdfDhtmlDocumentPeer._ALERT_CONFIRM_DIALOG_MAX_WIDTH_EXPANDO));
AdfAssert.assertNumeric(x139,"maximum width of the message dialog");
 var x140=x138.getParent();
AdfAssert.assertPrototype(x140,AdfRichPopup);
 if (x140.isPopupVisible())
 return false;
x138.setTitle(x130);
AdfDhtmlDocumentPeer._setAlertConfirmMessage(x137,x131);
 var x141=AdfRichUIPeer.createSubId(x137,AdfDhtmlDocumentPeer._DIALOG_CANCEL_ID_SUBID);
 var x142=x134.getElementById(x141);
AdfAssert.assertDomElement(x142,"BUTTON");
AdfDomUtils.setVisible(x142, !x129);
x138.addEventListener(AdfDialogEvent.EVENT_TYPE,
AdfDhtmlDocumentPeer._alertConfirmCallback);
 var x143={callback:x132,dialogId:x137};
 if (x133)
x143.timerId=x135.scheduleTimer(this,AdfDhtmlDocumentPeer._alertConfirmTimeoutCallback,x137,x133);
x135.setPageProperty(x137,x143);
 var x144= new Object();
x144[AdfDhtmlPopupWindow.HINT_MAX_WIDTH]=x139;
x140.show(x144);
 return true;
}
AdfDhtmlDocumentPeer._alertConfirmTimeoutCallback= function(x145)
{
 var x146=AdfPage.PAGE.findComponent(x145);
 var x147=x146.getPeer();
x147.bind(x146);
x147.fireCancel();
}
AdfDhtmlDocumentPeer._alertConfirmCallback= function(x148){
x148.cancel(); var x149=x148.getSource();
 var x150=x149.getClientId();
 var x151=x149.getParent();
AdfAssert.assertPrototype(x151,AdfRichPopup);
x151.cancel();
 var x152=AdfPage.PAGE;
 var x153=x152.getPageProperty(x150);
AdfAssert.assertObject(x153,"alert/confirm state token invalid");
x152.setPageProperty(x150,null);
 if (x153.timerId)
x152.cancelTimer(x153.timerId);
 var x154=x153.callback;
try
{
x154(x148);
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,"exception caught calling alert/confirm dialog event callback");
}
x149.setTitle("");
AdfDhtmlDocumentPeer._setAlertConfirmMessage(x150,"");
x149.removeEventListener(AdfDialogEvent.EVENT_TYPE,
AdfDhtmlDocumentPeer._alertConfirmCallback);
}
AdfDhtmlDocumentPeer._setAlertConfirmMessage= function(x155,x156)
{
 var x157=AdfAgent.AGENT;
 var x158=AdfRichUIPeer.createSubId(x155,AdfDhtmlDocumentPeer._DIALOG_CONTENT_SUBID);
 var x159=x157.getElementById(x158);
AdfAssert.assertDomElement(x159,"TD");
x157.setTextContent(x159,x156);
}

AdfUIComponents.createComponentClass("AdfUIOutput",
{
componentType:"org.apache.myfaces.trinidad.Output",
superclass:AdfUIValue
});

function AdfCheckUncommittedDataBehavior()
{
this.Init();
}
AdfObject.createSubclass(AdfCheckUncommittedDataBehavior,AdfClientBehavior);
AdfCheckUncommittedDataBehavior.prototype.initialize= function(x0)
{
x0.addEventListener("action",this.fire,this);
}
AdfCheckUncommittedDataBehavior.prototype.fire= function(x1)
{
 if (!AdfPage.PAGE.checkUncommittedData())
{
x1.cancel();
}
}
function AdfDialogServicePopupContainerRemoveEvent(x0,x1,x2,x3)
{
this.Init(x0,x1,x2,x3);
}
AdfObject.createSubclass(AdfDialogServicePopupContainerRemoveEvent,AdfComponentEvent);
AdfDialogServicePopupContainerRemoveEvent.REMOVE_EVENT_TYPE="popupRemove";
AdfDialogServicePopupContainerRemoveEvent.prototype.Init= function(x0,x1,x2,x3)
{
this._popupId=x1;
this._contentWidth=x2;
this._contentHeight=x3;
AdfDialogServicePopupContainerRemoveEvent.superclass.Init.call(this,x0,
AdfDialogServicePopupContainerRemoveEvent.REMOVE_EVENT_TYPE);
this.setRoot(x0);
}
AdfDialogServicePopupContainerRemoveEvent.prototype.isCancelable= function()
{
 return false;
}
AdfDialogServicePopupContainerRemoveEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfDialogServicePopupContainerRemoveEvent.prototype.AddMarshalledProperties= function(
x4)
{
x4.popupId=this._popupId;
 var x5=this._contentWidth;
 if (x5)
{
x4.contentWidth=x5;
}
 var x6=this._contentHeight;
 if (x6)
{
x4.contentHeight=x6;
}
}
AdfDialogServicePopupContainerRemoveEvent.prototype.IsDeleveryDiscrete= function()
{
 return true;
}
AdfDialogServicePopupContainerRemoveEvent.prototype.getPopupId= function()
{
 return this._popupId;
}
AdfDialogServicePopupContainerRemoveEvent.queue= function(x7,x8,x9,x10)
{
AdfAssert.assertPrototype(x7,AdfUIComponent);
AdfAssert.assertString(x8);
 new AdfDialogServicePopupContainerRemoveEvent(x7,x8,x9,x10).queue(true);
}
AdfDialogServicePopupContainerRemoveEvent.prototype.getClearMessages= function()
{
 return false;
}

AdfUIComponents.createComponentClass(
"AdfDialogServicePopupContainer",
{
componentType:"oracle.adfinternal.DialogServicePopupContainer",
superclass:AdfUIObject
}
);

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlDialogServicePopupContainerPeer",true);
AdfDhtmlDialogServicePopupContainerPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,AdfPopupClosedEvent.POPUP_CLOSED_EVENT_TYPE);
this._SELECTED_RTN_ID_EXPANDO="srid";
}
AdfDhtmlDialogServicePopupContainerPeer.prototype.ReplaceDomElement= function(x0,x1)
{
 var x2=AdfAgent.AGENT;
 var x3=this.getComponent();
 var x4=AdfRichUIPeer.CreateSubId(x3.getClientId(),"content");
 if (x4==x0.id)
{
 var x5=x0.childNodes;
for(var x6=x5.length - 1;x6> -1;x6--)
{
 var x7=x5[x6];
x0.removeChild(x7)
x1.appendChild(x7);
x2.elementsAdded(x7);
}
}
 else
 {
AdfDhtmlDialogServicePopupContainerPeer.superclass.ReplaceDomElement.call(this,x0,x1);
}
}
AdfDhtmlDialogServicePopupContainerPeer.prototype.HandleComponentPopupClosed= function(x8)
{
x8.cancel();
 var x9=x8.getSource();
 var x10=x9.getClientId();
 var x11=x9.getPeer();
x11.bind(x9);
 var x12=x11.getDomElement();
 var x13=x9.getProperty("_panelWindowId");
 var x14=AdfPage.PAGE.findComponent(x13);
AdfAssert.assertPrototype(x14,AdfRichPanelWindow);
 var x15=null;
 var x16=null;
 if (x14.getPeer().isContentResized(x14))
{
x15=x14.getContentWidth();
x16=x14.getContentHeight();
}
 var x17=this.getComponent();
AdfDialogServicePopupContainerRemoveEvent.queue(x17,x10,x15,x16);
AdfPage.PAGE.removeComponentsInSubtree(x12);
x12.parentNode.removeChild(x12);
}
AdfDhtmlDialogServicePopupContainerPeer.prototype._getStateLast= function(x18)
{
 if (x18&&x18.rtnId)
{
this._selectedState=x18;
}
}
AdfDhtmlDialogServicePopupContainerPeer.prototype._getState= function(x19)
{
 if (x19&&x19.rtnId&&x19.rtnId==this._selectedRtnId)
{
this._selectedState=x19;
}
}
AdfDhtmlDialogServicePopupContainerPeer.prototype._getAllIds= function(x20)
{
 if (x20&&x20.rtnId)
{
this._ids.push(x20.rtnId);
}
}
AdfDhtmlDialogServicePopupContainerPeer.prototype.getStateLast= function()
{
 var x21=this.createCallback(this._getStateLast);
AdfDhtmlRichDialogService.getInstance().__visitWindows(x21);
 var x22=this._selectedState;
 delete this._selectedState;
 if (x22)
{
 var x23=this.getDomElement();
 var x24=x22.rtnId;
AdfAgent.AGENT.setExpandoProperty(x23,AdfDhtmlDialogServicePopupContainerPeer._SELECTED_RTN_ID_EXPANDO,x24);
}
 return x22;
}
AdfDhtmlDialogServicePopupContainerPeer.prototype.getState= function(x25)
{
 var x26=this.createCallback(this._getState);
this._selectedRtnId=x25;
AdfDhtmlRichDialogService.getInstance().__visitWindows(x26);
 var x27=this._selectedState;
 delete this._selectedState;
 delete this._selectedRtnId;
 if (x27)
{
 var x28=this.getDomElement();
AdfAgent.AGENT.setExpandoProperty(x28,AdfDhtmlDialogServicePopupContainerPeer._SELECTED_RTN_ID_EXPANDO,x25);
}
 return x27;
}
AdfDhtmlDialogServicePopupContainerPeer.prototype.getAllIds= function()
{
 var x29=this.createCallback(this._getAllIds);
this._ids=[];
AdfDhtmlRichDialogService.getInstance().__visitWindows(x29);
 var x30=this._ids;
 delete this._ids;
 return x30;
}
AdfDhtmlDialogServicePopupContainerPeer.prototype.GetSubIdDomElement= function(x31)
{
AdfAssert.assertNonEmptyString(x31);
 var x32;
 var x33=x31;
 var x34;
 var x35=x31.indexOf("#");
 if (x35> -1)
{
x33=x31.substring(0,x35);
AdfAssert.assertNonEmptyString(x33);
x34=x31.substring(x35 + 1);
}
 var x36=AdfPage.PAGE.findComponent(x33);
 if (x36)
{
 var x37=x36.getPeer();
 if (x34)
{
x32=x37.getSubIdDomElement(x36,x34);
}
 else
 {
x37.bind(x36);
x32=x37.getDomElement();
}
}
 if (!x32)
AdfLogger.LOGGER.warning("Sub Id doesn't exist for this component:",x31);
 return x32;
}
AdfPage.PAGE.getLookAndFeel().registerPeerConstructor("oracle.adfinternal.DialogServicePopupContainer","AdfDhtmlDialogServicePopupContainerPeer");
function AdfJsfClientBehavior(x0,x1,x2)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfJsfClientBehavior,AdfClientBehavior);
AdfJsfClientBehavior.prototype.initialize= function(x0)
{
x0.addEventListener(this._eventType,this._invokeBehavior,this);
}
AdfJsfClientBehavior.prototype._invokeBehavior= function(x1)
{
 if (x1.isCanceled())
{
 return;
}
 var x2=x1 instanceof AdfDomComponentEvent?x1.getNativeEvent():
AdfPage.PAGE.__getLastDomEvent();
 var x3=this._behavior(x2,x1);
 if (x3==false||(this._submitting&&this._eventType=="action"))
{
x1.cancel();
}
}
AdfJsfClientBehavior.prototype.Init= function(x4,x5,x6)
{
AdfJsfClientBehavior.superclass.Init.call(this);
AdfAssert.assert(x5!=null);
this._eventType=x4;
this._behavior= new Function("event","componentEvent",x5);
this._submitting=x6;
}

AdfUIComponents.createComponentClass("AdfRichCommandButton",
{
componentType:"oracle.adf.RichCommandButton",
propertyKeys:[{name:"text",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"accessKey",type:"String"}
,{name:"partialSubmit",type:"Boolean","default":false,secured:true}
,{name:"blocking",type:"Boolean","default":false,secured:true}
,{name:"icon",type:"String"}
,{name:"iconPosition",type:"String","default":"leading"}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"useWindow",type:"Boolean","default":false}
,{name:"windowModalityType",type:"String","default":"modeless"}
,{name:"windowEmbedStyle",type:"String","default":"window"}
,{name:"windowHeight",type:"Number"}
,{name:"windowWidth",type:"Number"}
],
superclass:AdfUICommand
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlButtonPeer",true);
AdfDhtmlButtonPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichCommandButton.TEXT);
this._BUSY='_busy';
}
AdfDhtmlButtonPeer.prototype.HandleComponentClick= function(x0)
{
 var x1=this.getComponent();
 var x2=x1.getProperty(AdfDhtmlButtonPeer._BUSY);
 if (!x1.getDisabled()&&x0.isLeftButtonPressed()&& !x2)
{
AdfActionEvent.queue(x1,x1.getPartialSubmit());
}
 var x3=navigator.userAgent.toLowerCase();
 if (x3.indexOf("webkit")!= -1&&x3.indexOf("mobile")!= -1)
{
x0.cancel();
}
 else
 {
 var x4=x0.getNativeEvent();
AdfAgent.AGENT.eatEvent(x4);
}
}
AdfDhtmlButtonPeer.prototype.GetAccessibleName= function()
{
 var x5=this.getComponent();
 return x5.getText();
}
AdfDhtmlButtonPeer.prototype.GetInlineEditor= function(x6)
{
 return AdfDhtmlButtonTextEditor.getInlineEditor();
}
AdfDhtmlButtonPeer.__setDisabled= function(x7,x8)
{
AdfAssert.assertDomElement(x7,"BUTTON");
AdfAssert.assertBoolean(x8);
AdfDomUtils.addOrRemoveCSSClassName(x8,x7,AdfRichUIPeer.DISABLED_STYLECLASS);
}
AdfDhtmlButtonPeer.prototype.SetBusy= function(
x9)
{
 var x10=this.getComponent();
 var x11=this.getDomElement();
 var x12=this._isMultipart(AdfDomUtils.getFormElement(x11));
 if (!x10.getDisabled()&& !x12)
{
AdfDhtmlButtonPeer.__setDisabled(x11,x9);
x10.setProperty(AdfDhtmlButtonPeer._BUSY,x9,false,AdfUIComponent.PROPAGATE_NEVER);
}
}
AdfDhtmlButtonPeer.prototype._isMultipart= function(
x13)
{
 var x14=AdfDomUtils.getMultiPartForm(x13);
 return (x14!=null);
}
AdfDhtmlButtonPeer.prototype.ComponentTextChanged= function(
x15,
x16,
x17,
x18)
{
 var x19=AdfDhtmlButtonPeer.getInlineEditableTextElement(x15,x16);
 if (x19)
{
 return AdfDomUtils.handleTextChangeWithAccessKey(x15,x19,x17);
}
 return false;
}
AdfDhtmlButtonPeer.getInlineEditableTextElement= function(
x20,
x21)
{
 var x22=AdfDomUtils.getChildElements(x21);
 var x23=x22.length;
 if (x23==0)
{
 return x21;
}
 else if (x23==1)
{
 var x24=x22[0];
 if (x24.tagName=="IMG")
{
 var x25=AdfAgent.AGENT.getDomDocument();
 var x26=x25.createElement("SPAN");
x26.appendChild(x25.createTextNode(""));
 var x27=x26.style;x27.padding="3px";
x27.whiteSpace="nowrap";
 var x28=x20.getIconPosition&&x20.getIconPosition()!="leading";
 if (x28)
{
x21.insertBefore(x26,x24);
}
 else
 {
x21.appendChild(x26);
}
 return x26;
}
 else
 {
 return x21;
}
}
 else if (x23==2)
{
 var x29=x22[0];
 var x30=x22[1];
 if (x29.tagName=="IMG")
{
 return x30;
}
 else if (x30.tagName=="IMG")
{
 return x29;
}
 else
 {
AdfLogger.LOGGER.severe(
"Unexpected DOM structure 2 elements neither is an IMG in AdfDhtmlButtonPeer.getInlineEditableTextElement (1 = " +
 x29 +
 ", 2 = " +
 x30 +
 ").");
 return null;
}
}
 else
 {
AdfLogger.LOGGER.severe(
"Unexpected number of child elements in AdfDhtmlButtonPeer.getInlineEditableTextElement (" +
 x23 +
 "): " +
 x22);
 return null;
}
}
AdfDhtmlButtonPeer.stopInlineEditableTextElement= function(
x31,
x32)
{
 var x33=AdfDomUtils.getChildElements(x32);
 var x34=x33.length;
 if (x34==2)
{
 var x35=x33[0];
 var x36=x33[1];
 var x37=null;
 if (x35.tagName=="IMG")
{
 if (x36.tagName=="SPAN")
{
x37=x36;
}
}
 else if (x36.tagName=="IMG")
{
 if (x35.tagName=="SPAN")
{
x37=x35;
}
}
 if (x37!=null)
{
 if (x37.innerHTML=="")
{
x37.parentNode.removeChild(x37);
}
}
}
}
function AdfShowPopupBehavior(x0,x1,x2,x3)
{
this.Init(x0,x1,x2,x3);
}
AdfObject.createSubclass(AdfShowPopupBehavior,AdfClientBehavior);
AdfShowPopupBehavior.prototype.initialize= function(x0)
{
 var x1=this._type;
 if (!x1)
{
x1=AdfActionEvent.ACTION_EVENT_TYPE
}
 else if (x1=="mouseHover")
{
x1=AdfUIInputEvent.MOUSE_IN_EVENT_TYPE;
}
x0.addEventListener(x1,this.fire,this);
}
AdfShowPopupBehavior.prototype._fireCancel= function(x2)
{
 var x3=AdfPage.PAGE;
 var x4=this._popupId;
 var x5=x2.getSource();
 var x6=x5.getClientId();
 var x7=x5.findComponent(x4);
 var x8=x7._delayedActivationState;
 if (x8)
{
 if (x8.launchSourceId==x6)
{
x3.cancelTimer(x8.timerId);
 delete x7._delayedActivationState;
x5.removeEventListener(AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,this._fireCancel,this);
x2.cancel();
}
}
}
AdfShowPopupBehavior.prototype.fire= function(x9)
{
x9.cancel();
 var x10=AdfPage.PAGE;
 var x11=this._type;
 var x12=x9.getSource();
 var x13=x12.getClientId();
 var x14=this._popupId;
 var x15=x12.findComponent(x14);
 if (AdfPage.PAGE.isScreenReaderMode())
{
 if (x11=="mouseHover"||x11=="mouseMove"||x11=="mouseOver"||x11=="mouseOut")
{
AdfLogger.LOGGER.fine("showPopupBehavior trigger type " + x11 + " suppressed in screen reader mode for launch source id: " + x13);
 return;
}
}
 if (!x15)
{
AdfLogger.LOGGER.severe("Could not find popup ",this._popupId," from component ",x12);
 return;
}
 var x16=x15._delayedActivationState;
 if (x16)
{
 if (x16.launchSourceId==x13)
{
 return;
}
 else
 {
x10.cancelTimer(x16.timerId);
 delete x15._delayedActivationState;
}
}
 if (x15.isPopupVisible())
{
 var x17=this._getPopupWindow(x15);
 if (x17==null)
{
 return;
}
 var x18=this._isInlinePopupSelector(x17);
 var x19=this._wasOpendedFromSameSource(x17,x13);
 var x20=(x11=="mouseHover"||x11=="mouseMove"||x11=="mouseOver"||
x11=="mouseOut");
 if (x18&& !x20)
{
x15.hide();
 if (x19)
{
 return;
}
}
 else
 {
 if (!x19)
{
x15.hide();
}
}
}
 var x21=this._align;
 var x22=this._alignId;
 var x23={};
x23[AdfRichPopup.HINT_LAUNCH_ID]=x13;
 var x24=(this._type==AdfUIInputEvent.CONTEXT_MENU_EVENT_TYPE);
 if (x22||x21||x24)
{
 if (x21)
{
x23[AdfRichPopup.HINT_ALIGN]=x21;
 if (!x22)
{
x22=x12.getClientId();
 var x25=x22.lastIndexOf(":");
 if(x25!= -1)
x22=x22.substring(x25+1);
}
}
 if (x22)
{
 var x26=x12.findComponent(x22);
 if (x26)
x23[AdfRichPopup.HINT_ALIGN_ID]=x26.getClientId();
 else
 AdfLogger.LOGGER.warning("Unable to find align component: ",x22);
}
 if (x24)
{
x23[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x23[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
 if (!x22)
{
 var x27=AdfAgent.AGENT.getMousePosition(x9.getNativeEvent());
x23[AdfDhtmlPopupWindow.HINT_MOUSEPOSITION]=x27;
}
}
 if (x11=="mouseHover")
{
x23[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT;
 var x28=x23[AdfRichPopup.HINT_ALIGN_ID]
?x23[AdfRichPopup.HINT_ALIGN_ID]
:x23[AdfRichPopup.HINT_LAUNCH_ID];
x23[AdfDhtmlPopupWindow.HINT_AUTODISMISS_MOUSEOUT_ID]=x28;
}
}
 if (x9.getType()==AdfUIInputEvent.MOUSE_IN_EVENT_TYPE)
{
 var x29={hints:x23,popup:x15,source:x12};
 var x30=x10.scheduleTimer(this,this._onMouseOverTimeout,x29,500);
x15._delayedActivationState={timerId:x30,launchSourceId:x13};
x12.addEventListener(AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,this._fireCancel,this);
}
 else
 {
x15.show(x23);
}
}
AdfShowPopupBehavior.prototype._onMouseOverTimeout= function(x31)
{
 var x32=x31.popup;
 var x33=x31.hints;
 var x34=x31.source;
 if (!x32.isPopupVisible())
{
x32.show(x33);
}
x34.removeEventListener(AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,this._fireCancel,this);
 delete x32._delayedActivationState;
}
AdfShowPopupBehavior.prototype._isInlinePopupSelector= function(x35)
{
 if (x35&&(x35 instanceof AdfDhtmlPopupSelector)
&& !(x35 instanceof AdfDhtmlNoteWindowPopupSelector))
{
 return true;
}
 return false;
}
AdfShowPopupBehavior.prototype._getPopupWindow= function(x36)
{
 var x37=x36.getClientId();
 var x38=x36.getPeer();
x38.bind(x36);
 var x39=x38.getAllPopups(x36);
 if (x39==null)
{
 return null;
}
 var x40=x39[x37];
 return x40;
}
AdfShowPopupBehavior.prototype._wasOpendedFromSameSource= function(x41,x42)
{
 var x43=x41.getLaunchSourceId();
 if (x43&&x43==x42)
{
 return true;
}
 return false;
}
AdfShowPopupBehavior.prototype.Init= function(x44,x45,x46,x47)
{
AdfShowPopupBehavior.superclass.Init.call(this);
AdfAssert.assert(x44!=null);
this._popupId=x44;
this._align=x45;
this._alignId=x46;
this._type=x47;
}
