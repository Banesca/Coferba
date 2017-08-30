function AdfDhtmlDnDContext()
{
this.Init();
}
AdfObject.createSubclass(AdfDhtmlDnDContext,AdfDnDContext);
AdfDhtmlDnDContext.prototype.Init= function()
{
AdfDhtmlDnDContext.superclass.Init.call(this);
this._clearDrag();
this._dropTargetComponents= new Array();
}
AdfDhtmlDnDContext.InitClass= function()
{
 var x0=AdfAgent.AGENT;
this._NOT_ALLOWED_CURSOR=x0.getCursor("not-allowed");
this._LINK_CURSOR=x0.getCursor("alias");
this._COPY_CURSOR=x0.getCursor("copy");
this._MOVE_CURSOR=x0.getCursor("default");
this._INHERIT_CURSOR=x0.getCursor("inherit");
}
AdfDhtmlDnDContext.prototype.__addComponentTarget= function(x1)
{
AdfAssert.assertPrototype(x1,AdfUIComponent);
AdfAssert.assertPrototype(x1.getDropTarget(),AdfDropTarget);
this._dropTargetComponents.push(x1);
AdfLogger.LOGGER.finer("Add drop component",x1,
" New count:",
this._dropTargetComponents.length);
}
AdfDhtmlDnDContext.prototype.__removeComponentTarget= function(x2)
{
AdfAssert.assertPrototype(x2,AdfUIComponent);
 var x3=AdfCollections.removeArrayValue(this._dropTargetComponents,
x2);
AdfLogger.LOGGER.finer("Remove drop component",x2,
" New count:",
this._dropTargetComponents.length);
AdfAssert.assert(x3!= -1,
"Could not find component in components array");
 var x4=this._lastDropTarget;
 if (x4&&(x4.getComponent()===x2))
this._lastDropTarget=null;
}
AdfDhtmlDnDContext.prototype.__removeDragSource= function(x5)
{
AdfAssert.assertPrototype(x5,AdfUIComponent);
 var x6=this._dragSource;
 if(x6)
{
 var x7=x6.getComponent();
 if(x7==x5)
{
this._dragSource=null;
}
}
}
AdfDhtmlDnDContext.prototype.isDragging= function()
{
 return (this._draggingContext!=null);
}
AdfDhtmlDnDContext.prototype.getDragSource= function()
{
 return this._dragSource;
}
AdfDhtmlDnDContext.prototype.getTransferable= function()
{
 var x8=this._draggingContext;
 if (x8)
{
 return x8._transferable;
}
 else
 {
 return null;
}
}
AdfDhtmlDnDContext.prototype.getSourceActions= function()
{
 var x9=this._draggingContext;
 if (x9)
{
 return x9._sourceActions;
}
 else
 {
 return AdfDnDContext.ACTION_NONE;
}
}
AdfDhtmlDnDContext.prototype.getUserAction= function()
{
 var x10=this._draggingContext;
 if (x10)
{
 return x10._userAction;
}
 else
 {
 return AdfDnDContext.ACTION_NONE;
}
}
AdfDhtmlDnDContext.prototype.setDropTargetProperty= function(x11,x12)
{
AdfAssert.assertString(x11);
 var x13=this._draggingContext;
AdfAssert.assert(x13,
"setDropTargetProperty only allowed when dragging");
AdfAssert.assertString(x11);
 var x14=x13._currDropProperties;
AdfAssert.assert(x14,
"setAdfDropTargetProperty only allowed when we have a possible DropTarget");
x14[x11]=x12;
}
AdfDhtmlDnDContext.prototype.getDropTargetProperty= function(x15)
{
AdfAssert.assertString(x15);
 var x16=this._draggingContext;
AdfAssert.assert(x16,
"getDropTargetProperty only allowed when dragging");
 var x17=x16._currDropProperties;
AdfAssert.assert(x17,
"getAdfDropTargetProperty only allowed when we have a possible DropTarget");
 return x17[x15];
}
AdfDhtmlDnDContext.prototype.getTriggerEvent= function()
{
 var x18=this._draggingContext;
 if (x18)
{
 return x18._triggerEvent;
}
 else
 {
 return null;
}
}
AdfDhtmlDnDContext.prototype.startDrag= function(
x19,
x20,
x21,
x22,
x23,
x24,
x25,
x26)
{
AdfAssert.assertPrototype(x19,AdfDomUIInputEvent);
AdfAssert.assertPrototype(x20,AdfTransferable);
AdfAssert.assert(this._draggingContext==null,"Already dragging");
AdfAssert.assertNumeric(x21);
AdfAssert.assert(x21!=AdfDnDContext.ACTION_NONE,
"At least one action must be allowed");
AdfAssert.assert((x21& ~AdfDnDContext.ACTIONS_ALL)==0,
"allowedActions includes an undefined action flag");
 var x27=this._dragSource.getComponent();
 var x28=x27.getPeer();
x28.bind(x27);
AdfDomUtils.addCSSClassName(x28.getDomElement(),AdfRichUIPeer.DRAG_SOURCE_STYLECLASS);
 if (x22==undefined)
x22=(x21&AdfDnDContext.ACTION_MOVE)
?AdfDnDContext.ACTION_MOVE
:(x21&AdfDnDContext.ACTION_COPY)
?AdfDnDContext.ACTION_COPY
:AdfDnDContext.ACTION_LINK;
AdfAssert.assert((x22==AdfDnDContext.ACTION_MOVE)||
(x22==AdfDnDContext.ACTION_COPY)||
(x22==AdfDnDContext.ACTION_LINK),
"defaultAction contains an invalid value");
AdfAssert.assert((x21&x22)!=0,"Default action not an allowed action");
AdfAssert.assertNumeric(x24);
AdfAssert.assertNumeric(x25);
 if (x26=="auto")
x26=null;
 var x29= new Object();
x29._triggerEvent=x19;
x29._transferable=x20;
x29._sourceActions=x21;
x29._cursor=x26;x29._userAction=AdfDnDContext.ACTION_NONE;
x29._defaultAction=x22;
x29._autoscrollTimerID=null;x29._dropTarget=null;
x29._lastDropTarget=null;
x29._dropProperties= new Object();
x29._currDropProperties=null;
x29._lastMousePage=null;
this._draggingContext=x29;
AdfAssert.assert(!this._pendingMouseUp);
this._pendingMouseUp=false;
AdfLogger.LOGGER.finer("start drag: transferable:",x20);
 if (x23)
{
 var x30=this._getDragDiv();
 var x31=AdfPage.PAGE;
 if (!x23.dir&&x31.getLocaleContext().isRightToLeft())
x23.dir="rtl";
AdfAgent.AGENT.setOpacity(x23,75);
x31.showFloatingDiv(x30,x23);
 var x32=x23.offsetWidth;
 var x33=x23.offsetHeight;;
x29._dragWidth=x32;
x29._dragHeight=x33;
x29._originX=(x24<0)
?0
:(x32<x24)
?x32
:x24;
x29._originY=(x25<0)
?0
:(x33<x25)
?x33
:x25;
}
 else
 {
x30=null;
x29._dragWidth=0;
x29._dragHeight=0;
x29._originX=0;
x29._originY=0;
}
x29._dragger=x30;
AdfPage.PAGE.showGlassPane(AdfDhtmlDnDContext._CAPTURE_MAP,"no-drop");
}
AdfDhtmlDnDContext.prototype._abortDrag= function()
{
AdfAssert.assert(this._dragSource,
"Aborting drag from an invalid drag state");
AdfLogger.LOGGER.fine("Abort drag of:",this._dragSource);
 var x34=this._draggingContext;
 if (x34)
{
x34._userAction=AdfDnDContext.ACTION_NONE;
 var x35=x34._dropTarget;
 if (x35)
{
try
{
x35.dragExit(this);
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,"DropTarget.dragExit() failed");
}
this._changeActiveDropCSSClass(x35,false);
}
this._dragComplete(false);
}
 else if (this._prepContext)
{
this._clearDrag()
}
}
AdfDhtmlDnDContext.prototype.__handleInputEvent= function(x36)
{
AdfAssert.assertPrototype(x36,AdfUIInputEvent);
 var x37=true;
 var x38=AdfLogger.LOGGER;
 var x39=this._draggingContext;
 if (!x39)
{
 var x40=this._dragSource;
 if (x40)
{
 var x41=x40.getDragRecognizer();
prepContext=this._prepContext;
 if (prepContext)
{
AdfPage.PAGE.getGlassPane();
 var x42=true;
try
{
x42=x41.abortPrep(prepContext,x36);
}
catch(e)
{
x38.logErrorAsWarning(e,"Recognizer abort prep failed");
}
 if (x42)
{
this._abortDrag();
 var x43=prepContext.triggerEvent;
 var x44=x43.getNativeEventTarget();
 if (AdfFocusUtils.isFocusable(x44)&& !AdfFocusUtils.containsFocus())
AdfFocusUtils.focusElement(x44);
}
 else
 {
x38.finest("recognize drag for ",prepContext," ",x36);
 var x45=null;
try
{
x45=x41.recognizeDrag(prepContext,x36);
}
catch(e)
{
x38.logErrorAsWarning(e,"Drag recognition failed");
}
 if (x45)
{
this._prepContext=null;
x38.fine("initiate drag of ",x40," for event:",x45);
try
{
x40.initiateDrag(this,x45);
}
catch(e)
{
x38.logErrorAsWarning(e,"Drag initiation failed");
 throw e;
}
 if (this._draggingContext!=null)
{
this._trackDrag(x36.getNativeEvent());
}
}}} else
 {
 var x46=null;
try
{
x46=x41.prepDrag(this,x40,x36);
}
catch(e)
{
x38.logErrorAsWarning(e,"Drag prep failed");
}
 if (x46)
{
x38.finer("drag prep context:",x46);
this._prepContext=x46;
x37=false;
}
}}
 if (!this._draggingContext&&
 !x46&&
(x36.getType()==AdfUIInputEvent.MOUSE_MOVE_EVENT_TYPE))
{
this._findDragSource(x36);
}
}
 return x37;
}
AdfDhtmlDnDContext.prototype._setCursor= function(x47)
{
AdfAssert.assertString(x47);
AdfLogger.LOGGER.finer("Set cursor to:",x47);
AdfAgent.AGENT.setCursor(AdfPage.PAGE.getGlassPane(),x47);
}
AdfDhtmlDnDContext.prototype._findDragSource= function(x48)
{
AdfAssert.assertPrototype(x48,AdfUIInputEvent);
 var x49=this._findContainingDragSource(x48);
AdfAssert.assertPrototypeOrNull(x49,AdfDragSource);
 var x50=this._dragSource;
AdfAssert.assertPrototypeOrNull(x49,AdfDragSource);
 if (x49!=x50)
{
this._dragSource=x49;
AdfLogger.LOGGER.finest("Change drag source from:",
x50," to ",x49);
}
}
AdfDhtmlDnDContext.prototype._findContainingDragSource= function(x51)
{
AdfAssert.assertPrototype(x51,AdfUIInputEvent);
 var x52=x51.getSource();
AdfAssert.assertPrototype(x52,AdfUIComponent);
 var x53="oracle.adf.RichPopup";
while((x52!=null)&&(x53!==x52.getComponentType()))
{
 var x54=x52.getDragSource();
 if (x54)
{
try
{
 if (x54.isAvailable(this,x51))
{
 return x54;
}
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,"dragSource.isAvailable() failed");
}
}
x52=x52.getParent();
}
 return null;
}
AdfDhtmlDnDContext.prototype._findDropTarget= function(x55,x56,x57)
{
 var x58=this._dropTargetComponents;
 var x59=x58.length;
for(var x60=x59 - 1;x60>=0;x60--)
{
 var x61=x58[x60];
 if (AdfDhtmlDnDContext._pointInDropTarget(x61,x56,x57))
 return x61.getDropTarget();
}
 return null;
}
AdfDhtmlDnDContext._pointInDropTarget= function(x62,x63,x64)
{
 var x65=AdfRichUIPeer.getDomElementForComponent(x62);
 return (x65)
?AdfAgent.AGENT.pointInElementOrChildBounds(x65,x63,x64)
:false;
}
AdfDhtmlDnDContext.prototype._getDragDiv= function()
{
 if (!this._dragDiv)
{
 var x66=AdfPage.PAGE;
 var x67=AdfDhtmlZOrderManager.getMaxZIndex();
this._dragDiv=x66.createFloatingDiv(x66.getDocument().body,
x67,
"DragContent");
this._dragDiv.dir="ltr";
}
 return this._dragDiv;
}
AdfDhtmlDnDContext.prototype._clearDrag= function()
{
this._dragSource=null;this._prepContext=null;this._draggingContext=null;}
AdfDhtmlDnDContext.prototype.toDebugString= function()
{
 return AdfDhtmlDnDContext.superclass.toDebugString.call(this) + "[" +
 " dragSource:" + this._dragSource +
 " prepContext:" + this._prepContext +
 " drag context:" + this._draggingContext +
 " drag div:" + this._dragDiv + "]";
}
AdfDhtmlDnDContext.prototype._trackDrag= function(x68)
{
 if (this._pendingMouseUp)
 return;
 var x69=this._draggingContext;
AdfAssert.assert(x69,"Not in dragging state");
 var x70=AdfAgent.AGENT;
 var x71=x70.getMousePosition(x68);
x69._lastMousePage=x71;
 var x72=x69._dropTarget;
 var x73=this._lastDropTarget;
 var x74=(x72)
?x72
:x73
?x73
:null;
 var x75=this._findDropTarget(x74,
x71.x,
x71.y);
AdfAssert.assertPrototypeOrNull(x75,AdfDropTarget);
 var x76=this._dragSource;
 var x77=AdfLogger.LOGGER;
 if (x75!=x72)
{
x77.finest("Attempt to change drop target changed from:",
x72," to ",x75);
 if (x72)
{
this._setUserAction(AdfDnDContext.ACTION_NONE,false);
}
 if (x75)
{
this._lastDropTarget=x75;
 var x78=x75.getComponent().getClientId();
 var x79=x69._dropProperties;
 var x80=x79[x78];
 if (!x80)
{
x80= new Object();
x79[x78]=x80;
}
x69._currDropProperties=x80;
this._acceptDrag(x75,x68,"acceptDragEnter",x71);
 if (x69._userAction!=AdfDnDContext.ACTION_NONE)
{
 if (AdfAssert.DEBUG)x77.finest("New drop target:",x75);
x69._dropTarget=x75;
this._changeActiveDropCSSClass(x75,true);
try
{
x76.dragEnter(this);
}
catch(e)
{
x77.logErrorAsWarning(e,"dragSource.isAvailable() failed");
}
}}} else
 {
 if (x75)
{
this._acceptDrag(x75,x68,"acceptDragOver",x71);
 if (x69._userAction!=AdfDnDContext.ACTION_NONE)
{
try
{
x76.dragOver(this);
}
catch(e)
{
x77.logErrorAsWarning(e,"dragSource.dragOver() failed");
}
}
}}
 var x81=x71.x - x69._originX;
 if (x81<0)
x81=0;
 var x82=x71.y - x69._originY;
 if (x82<0)
x82=0;
 if (x69._dragger)
{
 var x83=x69._dragger.style;
 var x84=x81 + x69._dragWidth;
 var x85=x82 + x69._dragHeight;
 var x86=x70.getDomWindow();
x84-=x70.getWindowScrollWidth(x86);
x85-=x70.getWindowScrollHeight(x86);
 if (x84>0)
x81-=x84;
 if (x85>0)
x82-=x85;
x83.left=x81 + "px";
x83.top=x82 + "px";
}
x69._dragPageX=x81;
x69._dragPageY=x82;
}
AdfDhtmlDnDContext.prototype._acceptDrag= function(
x87,
x88,
x89,
x90)
{
AdfAssert.assertPrototype(x87,AdfDropTarget);
 if (x90==null)
{
x90=AdfAgent.AGENT.getMousePosition(x88);
}
 var x91=AdfDnDContext.ACTION_NONE;
 var x92=this._draggingContext;
AdfAssert.assert(x92,"No dragging context");
 if (x88.ctrlKey&&x88.shiftKey)
{
x91=AdfDnDContext.ACTION_LINK;
}
 else if (x88.ctrlKey)
{
x91=AdfDnDContext.ACTION_COPY;
}
 else if (x88.shiftKey)
{
x91=AdfDnDContext.ACTION_MOVE;
}
x91&=x92._sourceActions;
 if (x91==AdfDnDContext.ACTION_NONE)
x91=x92._defaultAction;
 var x93=AdfLogger.LOGGER;
x93.finest("Initial Proposed action:",x91);
 var x94=AdfDnDContext.ACTION_NONE;
try
{
x94=x87[x89](this,
x91,
x90.x,
x90.y);
 if (AdfAssert.DEBUG)AdfDnDContext.assertUserAction(x94);
}
catch(e)
{
x93.logErrorAsWarning(e,"DropTarget." + x89 + "() failed");
}
x93.finest("User action:",x94);
this._setUserAction(x94,
"acceptDropActionChanged"==x89);
}
AdfDhtmlDnDContext.prototype._setUserAction= function(
x95,
x96)
{
 if (AdfAssert.DEBUG)AdfDnDContext.assertUserAction(x95);
 var x97=this._draggingContext;
 var x98=x97._userAction;
 if (x95!=x98)
{
 var x99=AdfLogger.LOGGER;
x97._userAction=x95;
 var x100="auto";
switch(x95)
{
 case AdfDnDContext.ACTION_NONE:x100=AdfDhtmlDnDContext._NOT_ALLOWED_CURSOR;break;
 case AdfDnDContext.ACTION_LINK:x100=AdfDhtmlDnDContext._LINK_CURSOR;break;
 case AdfDnDContext.ACTION_COPY:x100=AdfDhtmlDnDContext._COPY_CURSOR;break;
 case AdfDnDContext.ACTION_MOVE:x100=AdfDhtmlDnDContext._MOVE_CURSOR;break;
}
x99.finer("New cursor:",x100);
this._setCursor(x100);
 if (x95!=AdfDnDContext.ACTION_NONE)
{
 if (x96)
{
try
{
this._dragSource.dropActionChanged(this);
}
catch(e)
{
x99.logErrorAsWarning(e,"dragSource.dropActionChanged() failed");
}
}
} else
 {
 if (x98!=AdfDnDContext.ACTION_NONE)
{
try
{
this._dragSource.dragExit(this);
}
catch(e)
{
x99.logErrorAsWarning(e,"dragSource.dragExit() failed");
}
 var x101=x97._dropTarget;
AdfAssert.assert(x101,
"Must have drop target if had user action");
try
{
x101.dragExit(this);
}
catch(e)
{
x99.logErrorAsWarning(e,"dropTarget.dragExit() failed");
}
x99.finer("Clear out old dropTarget:",x101);
this._changeActiveDropCSSClass(x101,false);
x97._dropTarget=null;
x97._currDropProperties=null;
}}}}
AdfDhtmlDnDContext.prototype._changeActiveDropCSSClass= function(x102,x103)
{
AdfAssert.assertPrototype(x102,AdfDropTarget);
 var x104=x102.getComponent();
 var x105=x104.getPeer();
 if (x105!=null)
{
x105.bind(x104);
 var x106=(x103)
?AdfDomUtils.addCSSClassName
:AdfDomUtils.removeCSSClassName;
x106(x105.getDomElement(),AdfRichUIPeer.DROP_TARGET_STYLECLASS);
}
 else
 {
AdfAssert.assert(x103===false,"Orphanned component when adding CSS style");
}
}
AdfDhtmlDnDContext.prototype._doDrop= function(x107)
{
 if (this._pendingMouseUp)
{
AdfPage.PAGE.hideGlassPane(AdfDhtmlDnDContext._CAPTURE_MAP);
this._pendingMouseUp=false;
 return;
}
 var x108=this._draggingContext;
AdfAssert.assert(x108,"Not in dragging state");
 if (x108._userAction!=AdfDnDContext.ACTION_NONE)
{
 var x109=x108._dropTarget;
AdfAssert.assert(x109,"Must have a valid drop target to drop");
 var x110=AdfAgent.AGENT.getMousePosition(x107);
 var x111=AdfDnDContext.ACTION_NONE;
try
{
x111=x109.drop(this,
x108._userAction,
x110.x,
x110.y);
this._changeActiveDropCSSClass(x109,false);
 if (AdfAssert.DEBUG)AdfDnDContext.assertUserAction(x111);
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,"dropTarget.drop() failed");
}
this._setUserAction(x111,false);
}
this._dragComplete(true);
}
AdfDhtmlDnDContext.prototype._dragComplete= function(x112)
{
AdfAssert.assert(this._draggingContext,"Not in dragging state");
 var x113=this._dragSource;
 var x114=x113.getComponent();
 var x115=x114.getPeer();
x115.bind(x114);
AdfDomUtils.removeCSSClassName(x115.getDomElement(),AdfRichUIPeer.DRAG_SOURCE_STYLECLASS);
try
{
x113.dragDropEnd(this,this.getUserAction());
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsWarning(e,"dragSource.dragDropEnd() failed");
}
 var x116=AdfAgent.AGENT;
 var x117=AdfPage.PAGE;
x117.hideFloatingDiv(this._getDragDiv());
this._clearDrag()
 if ((x116.getPlatform()==AdfAgent.IE_PLATFORM)&& !x112)
{
this._pendingMouseUp=true;
}
 else
 {
x117.hideGlassPane(AdfDhtmlDnDContext._CAPTURE_MAP);
}
}
AdfDhtmlDnDContext.prototype._abortEvent= function(x118)
{
 if (this._pendingMouseUp)
 return;
this._abortDrag();
AdfAgent.eatEventCallback(x118);
}
AdfDhtmlDnDContext.prototype._checkAbort= function(x119)
{
 if (this._pendingMouseUp)
 return;
AdfAssert.assert(this._draggingContext,"Not in dragging state");
 if (x119.keyCode==27)
{
this._abortEvent(x119);
}
 else
 {
 var x120=this._draggingContext;
 var x121=x120._dropTarget;
 if (x121)
{
this._acceptDrag(x121,
x119,
"acceptDropActionChanged",
x120._lastMousePage);
}
}
}
AdfDhtmlDnDContext._trackDragCallback= function(x122)
{
AdfPage.PAGE.getDnDContext()._trackDrag(x122);
AdfAgent.eatEventCallback(x122);
 return false;
}
AdfDhtmlDnDContext._doDropCallback= function(x123)
{
AdfPage.PAGE.getDnDContext()._doDrop(x123);
AdfAgent.eatEventCallback(x123);
 return false;
}
AdfDhtmlDnDContext._checkAbortCallback= function(x124)
{
 return AdfPage.PAGE.getDnDContext()._checkAbort(x124);
}
AdfDhtmlDnDContext._updateDragOptionsCallback= function(x125)
{
 var x126=AdfPage.PAGE.getDnDContext();
 var x127=x126._dropTarget;
 if (x127)
{
x126._acceptDrag(x127,
x125,
"acceptDropActionChanged",
this._lastMousePage);
}
}
AdfDhtmlDnDContext._autoscrollCallback= function()
{
AdfPage.PAGE.getDnDContext()._autoscroll();
}
AdfDhtmlDnDContext._abortIfOutsideWindowCallback= function(x128)
{
 if (x128.pageX===undefined)
 return true;
 var x129=document.documentElement;
 if (x129.offsetHeight==0)
x129=document.body; if (!AdfAgent.AGENT.pointInElementBounds(x129,x128.clientX,x128.clientY))
{
AdfPage.PAGE.getDnDContext()._abortEvent(x128);
 return false;
}
 else
 {
 return true;
}
}
AdfDhtmlDnDContext._CAPTURE_MAP=
{
mouseout:AdfDhtmlDnDContext._abortIfOutsideWindowCallback,
mousemove:AdfDhtmlDnDContext._trackDragCallback,
mouseup:AdfDhtmlDnDContext._doDropCallback,
keydown:AdfDhtmlDnDContext._checkAbortCallback,
keyup:AdfDhtmlDnDContext._updateDragOptionsCallback
};
AdfPage.PAGE.__clearDnDContext();

function AdfAttributeDragSource(x0)
{
this.Init(x0,AdfDnDContext.ACTION_COPY,AdfDnDContext.ACTION_COPY);
}
AdfObject.createSubclass(AdfAttributeDragSource,AdfDragSource);
AdfAttributeDragSource.prototype.Init= function(
x0,x1,x2)
{
AdfAttributeDragSource.superclass.Init.call(this,x1,x2);
AdfAssert.assertString(x0);
this._propertyName=x0;
this._checkIfNeedsValidate=("value"==x0);
}
AdfAttributeDragSource.prototype.toDebugString= function()
{
 return AdfAttributeDragSource.superclass.toDebugString.call(this) +
 " propertyName:" + this._propertyName;
}
AdfAttributeDragSource.prototype.isAvailable= function(
x3,
x4)
{
AdfAssert.assertPrototype(x3,AdfDnDContext);
AdfAssert.assertPrototype(x4,AdfUIInputEvent);
 var x5=this.getComponent();
 if (x5)
{
 var x6=x5.getProperty(this._propertyName);
 return (x6!=null);
}
 else
 {
 return false;
}
}
AdfAttributeDragSource.prototype.GetDragTransferable= function(x7)
{
 var x8=null;
 var x9=this.getComponent();
 if (x9)
{
 if (this._checkIfNeedsValidate&&AdfUIEditableValue.prototype.isPrototypeOf(x9))
{
x9.validate();
}
 var x10=x9.getProperty(this._propertyName);
 if (x10!=null)
{
AdfLogger.LOGGER.finer("Create Transferable for AdfAttributeDragSource with attr=",
this._propertyName,
", value=",
x10);
x8=AdfObjectTransferable.createSingleObjectTransferable(x10);
}
}
 return x8;
}

function AdfAttributeDropTarget(x0)
{
this.Init(x0,AdfDnDContext.ACTION_COPY);
}
AdfObject.createSubclass(AdfAttributeDropTarget,AdfDropTarget);
AdfAttributeDropTarget.prototype.Init= function(
x0,x1,x2)
{
AdfAttributeDropTarget.superclass.Init.call(this,x1,x2);
AdfAssert.assertString(x0);
this._propertyName=x0;
this._checkIfNeedsValidate=("value"==x0);
}
AdfAttributeDropTarget.prototype.toDebugString= function()
{
 return AdfAttributeDropTarget.superclass.toDebugString.call(this) +
 " propertyName:" + this._propertyName;
}
AdfAttributeDropTarget.prototype.drop= function(x3,x4,x5,x6)
{
AdfAssert.assert(x4==AdfDnDContext.ACTION_COPY);
AdfLogger.LOGGER.finer("drop:",this);
 var x7=x3.getTransferable().getTransferData(this._getTargetFlavor());
 if ((x7!=null)&&(x7.length==1))
{
 var x8=this.getComponent();
 if (this._checkIfNeedsValidate&&AdfUIEditableValue.prototype.isPrototypeOf(x8))
{
x8.validate();
}
 var x9=x7[0];
 var x10=this._propertyName;
AdfLogger.LOGGER.finer("drop type:", typeof x9);
AdfLogger.LOGGER.finer("drop: on ",x8," set property '",x10,"' to '",
x9,"'");
try
{
x8.setProperty(x10,x9);
 return AdfDnDContext.ACTION_COPY;
}
catch(e)
{
AdfLogger.LOGGER.info("drop failed with:",e);
}
}
 return AdfDnDContext.ACTION_NONE;
}
AdfAttributeDropTarget.prototype.GetAllowedActions= function(x11)
{
 return AdfDnDContext.ACTION_COPY;
}
AdfAttributeDropTarget.prototype.GetAllowedFlavors= function(x12)
{
 var x13=this._getTargetFlavor();
 if (x13!=null)
{
 return [x13];
}
 else
 {
 return null;
}
}
AdfAttributeDropTarget.prototype._getTargetFlavor= function()
{
 var x14=this.getComponent();
 var x15=this._propertyName;
 var x16=x14.getPropertyKeys()[x15];
 if (x16)
{
 return AdfDataFlavor.getDataFlavorForClassName(x16.type);
}
 else
 {
 var x17=x14.getProperty(x15);
 if (x17!=null)
{
 return AdfDataFlavor.getObjectFlavor(x17);
}
 else
 {
 return AdfDataFlavor.ANY_FLAVOR;
}
}
}
AdfUIComponents.createComponentClass("AdfUIIterator",
{
componentType:"org.apache.myfaces.trinidad.Iterator",
propertyKeys:["value"
,{name:"rows",type:"Number","default":25}
,{name:"first",type:"Number","default":0}
],
superclass:AdfUICollection
});

AdfUIComponents.createComponentClass("AdfUITable",
{
componentType:"org.apache.myfaces.trinidad.Table",
propertyKeys:[{name:"rowDisclosureListener",type:"Object",secured:true}
,"disclosedRowKeys"
,{name:"selectionListener",type:"Object",secured:true}
,"selectedRowKeys"
,{name:"immediate",type:"Boolean","default":false,secured:true}
,{name:"sortListener",type:"Object",secured:true}
,{name:"rangeChangeListener",type:"Object",secured:true}
,{name:"showAll",type:"Boolean","default":false,secured:true}
],
eventNames:["rowDisclosure","selection","rangeChange","sort"],
superclass:AdfUIIterator
});

AdfUITable.SELECTION_LISTENER_KEY="afrSelListener";
AdfUITable.prototype.findComponent= function(x0,x1)
{
 if (x1!=undefined)
{
 var x2=this.getClientId();
x0=x2 + ":" + x1 + ":" + x0;
 return AdfPage.PAGE.findComponent(x0);
}
 return AdfUITable.superclass.findComponent.call(this,x0);
}
AdfUITable.prototype.Init= function(
x3,
x4,
x5,
x6,
x7)
{
AdfUITable.superclass.Init.call(this,x3,x4,
x5,x6,x7);
}
AdfUITable.prototype.GetChanges= function()
{
 var x8=AdfUITable.superclass.GetChanges.call(this);
 var x9=x8[AdfUITable.DISCLOSED_ROW_KEYS];
 if (x9)
{
 var x10=[];
 var x11=0;
for(var x12 in x9)
{
x10[x11++]=x12;
}
x8[AdfUITable.DISCLOSED_ROW_KEYS]=x10.join("$afr$");
}
 var x13=x8[AdfUITable.SELECTED_ROW_KEYS];
 if (x13)
{
 var x10=[];
for(var x14 in x13)
{
x10.push(x14);
}
x8[AdfUITable.SELECTED_ROW_KEYS]=x10.join("$afr$");
}
 return x8;
}
AdfUITable.prototype.DeliverDerivedPropertyEvents= function(
x15,
x16,
x17)
{
 if (x15==AdfUITable.SELECTED_ROW_KEYS)
{
 var x18=this.getPeer();
 if(x18&&x18.canDeliverSelectionEvent&&x18.canDeliverSelectionEvent())
{
 var x19=AdfRowKeySetChangeEvent.createRowKeySetChangeEvent(
this,
AdfSelectionEvent.SELECTION_EVENT_TYPE,
x16,
x17);
 if (x19)
{
x19.queue();
}
}
}
}
AdfUITable.prototype.setDisclosedRowKey= function(x20,x21)
{
AdfAssert.assertString(x20);
AdfAssert.assertBoolean(x21);
 if (x21==this.isDisclosed(x20))
 return false;
 var x22=this.getPeer();
 if (x22&&x22.isDisclosureFetchPending())
 return false;
 var x23=this.getDisclosedRowKeys();
 var x24={};
AdfCollections.copyInto(x24,x23);
 if(x21)
{
x24[x20]=true;
}
 else
 {
 delete x24[x20];
}
 var x25=AdfRowKeySetChangeEvent.createRowKeySetChangeEvent(
this,AdfRowDisclosureEvent.ROW_DISCLOSURE_EVENT_TYPE,
x23,x24);
 if (x25)
x25.queue();
 if (x25.isCanceled())
 return false;
this.setDisclosedRowKeys(x24);
 return true;
}
AdfUITable.prototype.isDisclosed= function(x26)
{
 var x27=this.getDisclosedRowKeys();
 if(x27)
 return x27[x26];
 return false;
}
AdfUITable.prototype.getSelectedColumns= function()
{
 var x28=[];
 var x29=this.getPeer();
 if (x29)
{
 var x30=x29.__getSelectedColumns();
for(var x31=0;x31<x30.length;x31++)
{
x28.push(x30[x31].getClientId());
}
}
 return x28;
}

AdfUIComponents.createComponentClass("AdfUITable2",
{
componentType:"oracle.adf.Table",
propertyKeys:[{name:"filterModel",type:"Object",secured:true}
,{name:"queryListener",type:"Object",secured:true}
],
eventNames:["query"],
superclass:AdfUITable
});

AdfUIComponents.createComponentClass("AdfUIMenuBar",
{
componentType:"oracle.adf.MenuBar",
propertyKeys:[{name:"value",type:"Object",secured:true}
],
superclass:AdfUIPanel
});

AdfUIComponents.createComponentClass("AdfRichCommandNavigationItem",
{
componentType:"oracle.adf.RichCommandNavigationItem",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"useWindow",type:"Boolean","default":false}
,{name:"windowModalityType",type:"String","default":"modeless"}
,{name:"windowEmbedStyle",type:"String","default":"window"}
,{name:"windowHeight",type:"Number"}
,{name:"windowWidth",type:"Number"}
,{name:"accessKey",type:"String"}
,{name:"destination",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"icon",type:"String"}
,{name:"messageType",type:"String","default":"none"}
,{name:"partialSubmit",type:"Boolean","default":false,secured:true}
,{name:"selected",type:"Boolean","default":false}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"targetFrame",type:"String"}
,{name:"text",type:"String"}
,{name:"visited",type:"Boolean","default":false}
,"itemListener"
,{name:"remove",type:"String","default":"inherit"}
],
eventNames:["item"],
superclass:AdfUICommand
});

AdfRichUIPeer.createPeerClass(AdfDhtmlCommandLinkPeer,"AdfDhtmlCommandNavigationItemPeer");
AdfDhtmlCommandNavigationItemPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(
this,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE);
this._REMOVE_ICON_ID="rmAbv";
}
AdfDhtmlCommandNavigationItemPeer.prototype.InitDomElement= function(x0,x1)
{
AdfDhtmlCommandNavigationItemPeer.superclass.InitDomElement.call(this,x0,x1);
}
AdfDhtmlCommandNavigationItemPeer.prototype.HandleComponentKeyUp= function(x2)
{
 var x3=x2.getNativeEvent();
 var x4=x2.getKeyCode();
 if (x3.ctrlKey&&x3.altKey&&x4==AdfKeyStroke.F4_KEY)
{
 var x5=this.getComponent();
 if(x5.getDisabled())
{
 return;
}
 if (this._canRemove())
{
AdfItemEvent.queueItemRemoveEvent(x5);
}
}
}
AdfDhtmlCommandNavigationItemPeer.prototype.HandleComponentClick= function(x6)
{
 var x7=this.getComponent();
 if(x6.getSource()==x7)
{
 if(this._isDisabled())
{
x6.stopBubbling();
 return;
}
 if (!x6.isLeftButtonPressed())
{
 return;
}
 if (this._isOnRemoveButton(x6))
{
 if (this._canRemove())
{
AdfItemEvent.queueItemRemoveEvent(x7);
}
 return;
}
 var x8=AdfRichUIPeer.getDomElementForComponent(x7);
 var x9=x8.href;
 if(x9==undefined)
x9=x8.getAttribute('href');
 var x10=AdfAgent.AGENT.getDomDocument();
 var x11=x10.location.href;
 var x12=x11.indexOf('#');
 var x13=(x12== -1)?x11:
x11.substring(0,x12);
 if(x9&&((x9.indexOf(x13)== -1)||
(x9.substring(x9.indexOf('#')).length>1)))
{
AdfPage.PAGE.__perfTimings(true,true,true,"User click Command Navigation , GET request");
 var x14=x8.getAttribute("target");
 var x15=x8.attributes['href'].nodeValue;
AdfPage.PAGE._handleNavigation(x15,x14);
x6.cancel();
}
 else {
AdfActionEvent.queue(x7,x7.getPartialSubmit());
}
}
}
AdfDhtmlCommandNavigationItemPeer.prototype.HandleComponentFocus= function(x16)
{
 if(this._isDisabled())
{
x16.stopBubbling();
 return;
}
}
AdfDhtmlCommandNavigationItemPeer.prototype.HandleComponentMouseOver= function(x17)
{
 if(this._isDisabled())
{
x17.stopBubbling();
 return;
}
}
AdfDhtmlCommandNavigationItemPeer.prototype.GetInlineEditor= function(x18)
{
 return AdfDhtmlNavigationItemTextEditor.getInlineEditor();
}
AdfDhtmlCommandNavigationItemPeer.prototype.ComponentTextChanged= function(
x19,
x20,
x21,
x22)
{
 if (x22!=null)
{
 var x23=
AdfDhtmlCommandNavigationItemPeer.getInlineEditableTextElement(x19,x20);
 if (x23)
{
 return AdfDomUtils.handleTextChangeWithAccessKey(x19,x23,
x21);
}
}
 return false;
}
AdfDhtmlCommandNavigationItemPeer.getInlineEditableTextElement= function(
x24,
x25)
{
AdfAssert.assert(x24.getProperty("text")!=null);
 var x26=AdfDomUtils.getFirstDescendentElement(x25,"a");
 if (!x26)
{
 if (AdfAgent.AGENT.getNodeName(x25).toLowerCase()=="a")
x26=x25;
}
 if (x26)
{
 if (!AdfDomUtils.getFirstDescendentElement(x26,"img"))
{
 return x26;
}
 else
 {
 var x27=AdfDomUtils.getLastChildElement(x26);
 if (x27.tagName=="SPAN")
{
 return x27;
}
}
}
 return null;
}
AdfDhtmlCommandNavigationItemPeer.prototype._isOnRemoveButton= function(x28)
{
 var x29=this.getComponent();
 var x30=x29.getClientId();
 var x31=AdfRichUIPeer.createSubId(x30,AdfDhtmlCommandNavigationItemPeer._REMOVE_ICON_ID);
 var x32=x28.getNativeEventTarget();
 if (x32.id==x31)
{
 return true;
}
 var x33=x32.parentNode.id;
 return (x33==x31)
}
AdfDhtmlCommandNavigationItemPeer.prototype._canRemove= function()
{
 var x34=this.getComponent();
 if (x34.getRemove)
{
 var x35=x34.getRemove();
 if (x35&&(x35=="no"||x35=="disabled"))
{
 return false;
}
}
 var x36=x34.getParent();
 if (x36.getItemRemoval==null)
{
 return false;
}
 var x37=x36.getItemRemoval();
 var x38=x34.getDisabled();
 if (x38||x37==null||x37=="none")
{
 return false;
}
 if (x37=="all")
{
 return true;
}
 if (x37=="allExceptLast")
{
 var x39=x34.getClientId();
 var x40=AdfRichUIPeer.createSubId(x39,AdfDhtmlCommandNavigationItemPeer._REMOVE_ICON_ID);
 var x41=AdfAgent.getAgent().getElementById(x40);
 return (x41!=null);
}
}
AdfDhtmlCommandNavigationItemPeer.prototype._isDisabled= function()
{
 var x42=this.getDomElement();
 return (x42.disabled||AdfDomUtils.containsCSSClassName(x42,AdfRichUIPeer.DISABLED_STYLECLASS));
}

AdfUIComponents.createComponentClass("AdfRichMenuBar",
{
componentType:"oracle.adf.RichMenuBar",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"flex",type:"Number","default":0}
,{name:"stretchId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
],
superclass:AdfUIMenuBar
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlMenuBarPeer",false);
AdfDhtmlMenuBarPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfToolbarUtils);
AdfObject.ensureClassInitialization(AdfMenuUtils);
this._sOpenedPopups=[];
AdfRichUIPeer.addComponentEventHandlers(
this,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE
);
}
AdfDhtmlMenuBarPeer.prototype.InitDomElement= function(x0,x1)
{
AdfDhtmlMenuBarPeer.superclass.InitDomElement.call(this,x0,x1);
 var x2=x0.getClientId();
 var x3=AdfRichUIPeer.CreateSubId(x2,"eoc");
 var x4=AdfAgent.AGENT;
this._overflowContainer=x4.getElementById(x3);
this._isOverflowSupported=(this._overflowContainer)?true:false;
 if (this._isOverflowSupported==true)
{
x3=AdfRichUIPeer.CreateSubId(x2,"eoi");
this._overflowIndicator=x4.getElementById(x3);
AdfPage.PAGE.__registerDescendantResizeNotifyComponent(x0);
}
 var x5=x1.getElementsByTagName("table")[0];
this._childContainers=x4.getTableRowCells(x4.getTableRow(x5,0));
}
AdfDhtmlMenuBarPeer.prototype.needsChildVisibilityChanges= function(x6)
{
 return true;
}
AdfDhtmlMenuBarPeer.prototype.needsResizeNotify= function(x7)
{
 return true;
}
AdfDhtmlMenuBarPeer.prototype.getDescendantComponents= function(x8,x9)
{
 if (!x9)
{
x9= new Array();
}
AdfDhtmlMenuBarPeer.superclass.getDescendantComponents.call(this,x8,x9);
 if (this._isOverflowSupported==true)
{
AdfOverflowSupport.getOverflowChildComponents(x8,x9);
}
 return x9;
}
AdfDhtmlMenuBarPeer.prototype.updateScrollIconsState= function()
{
}
AdfDhtmlMenuBarPeer.prototype.ResizeNotify= function(
x10,
x11,
x12,
x13)
{
 var x14=this.getDomElement();
 var x15=this.getComponent();
 var x16=x15.getClientId();
 if (this._isOverflowSupported==false&& !x15.getStretchId())
{
 return;
}
this._unStretch();
 if (this._isOverflowSupported==true)
{
 if (!this._overflowSupport)
{
this._overflowSupport= new AdfOverflowSupport(x16,this,"end");
 var x17=x14.getElementsByTagName("table")[0];
 var x18=AdfAgent.AGENT;
 var x19=x18.getTableRowCells(x18.getTableRow(x17,0));
 var x20=0;
 var x21=x19[0];
while(x21)
{
this._overflowSupport.createStep();
this._overflowSupport.addElement(x21);
 var x22=AdfDomUtils.getFirstChildElement(x21);
 if (AdfToolbarUtils.isValidOverflowElement(x22))
{
 var x23=this._createOverflowElement(x22);
this._overflowSupport.addOverflowElement(x23);
}
x20++;
x21=x19[x20];
}
}
this._overflowSupport.handleResize();
}
this._reStretch();
}
AdfDhtmlMenuBarPeer.prototype.ChildVisibilityChanged= function(
x24,
x25,
x26)
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return false;
}
AdfDhtmlMenuBarPeer.prototype.GetPreferredWidth= function()
{
 if (!this._preferredWidth)
{
 var x27=this.getDomElement();
 var x28=x27.firstChild;
this._unStretch();
 if (this._overflowSupport)
{
this._overflowSupport.removeAllItemsFromOverflow();
}
this._preferredWidth=x28.offsetWidth;
this._reStretch();
}
 return this._preferredWidth;
}
AdfDhtmlMenuBarPeer.prototype.GetMinimumWidth= function()
{
 if (!this._minimumWidth)
{
 if (this._isOverflowSupported==false)
{
this._minimumWidth=this.GetPreferredWidth();
}
 else if (this._childContainers&&this._childContainers.length>0)
{
 var x29=this._overflowIndicator.style.display;
this._overflowIndicator.style.display="block";
this._minimumWidth=this._overflowIndicator.offsetWidth;
this._overflowIndicator.style.display=x29;
 var x30=this.GetPreferredWidth();
 if (this._minimumWidth>x30)
{
this._minimumWidth=x30;
}
}
 else
 {
this._minimumWidth=0;
}
}
 return this._minimumWidth;
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentKeyDown= function(x31)
{
 if (x31.isCanceled())
{
 return;
}
 var x32=AdfAgent.AGENT;
 var x33=x31.getKeyCode();
 var x34=x31.getSource();
 var x35=x34.getClientId();
 if((x34 instanceof AdfRichCommandNavigationItem))
{
 if(x33==AdfKeyStroke.ESC_KEY)
{
 if(x34.getParent() instanceof AdfRichCommandNavigationItem)
{
 var x36=x32.getElementById(x34.getParent().getClientId());
AdfFocusUtils.focusFirstTabStop(x36);
AdfDhtmlMenuBarPeer.superclass.cancelAllPopups.call(this,x34);
AdfDhtmlMenuBarPeer.superclass.cancelAllPopups.call(this,x34.getParent());
x31.cancel();
}
}
this._handleArrowKeysForMenuModel(x33,x31);
}
 else
 {
 if (x32.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_DOWN_EVENT_TYPE)
{
this._handleArrowKeys(x33,x31);
}
}
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentKeyPress= function(x37)
{
 if (x37.isCanceled())
{
 return;
}
 var x38=AdfAgent.AGENT;
 if (x38.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_PRESS_EVENT_TYPE)
{
 var x39=x37.getKeyCode();
this._handleArrowKeys(x39,x37);
}
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentKeyUp= function(x40)
{
 var x41=this.getComponent();
 if (x40.isCanceled()||x41.getDisabled())
{
 return;
}
 var x42=x40.getSource();
 var x43=x40.getKeyCode();
 if((x42 instanceof AdfRichCommandNavigationItem))
{
 if(x43==AdfKeyStroke.ENTER_KEY)
{
 var x44=AdfAgent.AGENT;
 var x45=x44.getElementById(x42.getClientId())
 var x46=x45.getAttribute('href');
 var x47=x44.getDomDocument();
 var x48=x47.location.href;
 var x49=x48.indexOf('#');
 var x50=(x49== - 1)?x48:x48.substring(0,x49);
 if (x46&&((x46.indexOf(x50)== - 1)||(x46.substring(x46.indexOf('#')).length>1)))
{
AdfPage.PAGE.__perfTimings(true,true,true,"User click Command Navigation , GET request");
 var x51=x45.getAttribute("target");
 if (x51!=null&&x51.length>0)
{
window.open(x46,x51);
}
 else
 {
self.location=x46;
}
x40.cancel();
}
 else {
AdfActionEvent.queue(x42,x42.getPartialSubmit());
}
}
}
AdfDhtmlMenuBarPeer._handleMenuBarItemAccessKeys(x41,x40);
}
AdfDhtmlMenuBarPeer.prototype.ComponentRemoved= function(x52)
{
 if (this._overflowSupport)
{
this._overflowSupport.removeOverflowSupport();
 delete this._overflowSupport;
}
 delete this._overflowContainer;
 delete this._overflowIndicator;
 delete this._childContainers;
AdfPage.PAGE.__unregisterDescendantResizeNotifyComponent(x52);
AdfDhtmlMenuBarPeer.superclass.ComponentRemoved.call(this,x52);
}
AdfDhtmlMenuBarPeer._handleMenuBarItemAccessKeys= function(x53,x54)
{
 var x55=x54.getKeyStroke();
 var x56=x55.getModifiers();
 if (x56&AdfKeyStroke.CTRL_MASK||x56&AdfKeyStroke.ALT_MASK||
x56&AdfKeyStroke.META_MASK)
{
 return;
}
 if (x56&AdfKeyStroke.SHIFT_MASK)
{
x56=x56>>AdfKeyStroke.SHIFT_MASK;
x55=AdfKeyStroke.getKeyStroke(x55.getKeyCode(),x56);
}
 var x57=x55.toMarshalledString().toUpperCase();
 var x58=x53.getClientId();
 var x59=AdfAgent.AGENT.getElementById(x58);
 var x60=x59.getElementsByTagName("A");
 var x61=x60.length;
for(var x62=0;x62<x61;x62++)
{
 var x63=x60[x62];
 if (x63&&(x63.nodeType==1))
{
 var x64=x63.id;
 var x65=x63.getAttribute("accessKey");
 if (x65)
{
 if (x57==x65.toUpperCase())
{
AdfFocusUtils.focusElement(x63);
x54.cancel();
 return;
}
}
}
}
}
AdfDhtmlMenuBarPeer.prototype._handleArrowKeys= function(x66,x67)
{
 var x68=x67.getNativeEvent();
 var x69=AdfAgent.AGENT.getEventTarget(x68);
 if (AdfMenuUtils.isInOverflow(x69.parentNode))
{
 return;
}
switch(x66)
{
 case AdfKeyStroke.ARROWLEFT_KEY:
this._moveHighlightToPreviousBarItem(x67);
x67.cancel();
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
this._moveHighlightToNextBarItem(x67);
x67.cancel();
break;
default:
}
}
AdfDhtmlMenuBarPeer.prototype._moveHighlightToPreviousBarItem= function(x70)
{
 var x71=x70.getNativeEvent();
 var x72=AdfAgent.AGENT.getEventTarget(x71);
 var x73=this.getDomElement();
AdfFocusUtils.focusPreviousTabStop(x72,x73);
}
AdfDhtmlMenuBarPeer.prototype._moveHighlightToNextBarItem= function(x74)
{
 var x75=x74.getNativeEvent();
 var x76=AdfAgent.AGENT.getEventTarget(x75);
 var x77=this.getDomElement();
AdfFocusUtils.focusNextTabStop(x76,x77,true);
}
AdfDhtmlMenuBarPeer.prototype._unStretch= function()
{
 var x78=this._getStretchElement();
 if (x78)
{
x78.parentNode.style.width="";
}
}
AdfDhtmlMenuBarPeer.prototype._reStretch= function()
{
 var x79=this._getStretchElement();
 if (x79)
{
 if (AdfMenuUtils.isInOverflow(x79))
{
x79.parentNode.style.width="100%";
}
 else
 {
 var x80=AdfAgent.AGENT.getWindowWidth() + "px";
x79.parentNode.style.width=x80;
}
}
}
AdfDhtmlMenuBarPeer.prototype._createOverflowElement= function(x81)
{
 var x82=x81.ownerDocument;
 var x83=x82.createElement("table");
x83.cellPadding=0;
x83.cellSpacing=0;
x83.style.width="100%";
 var x84=x83.insertRow(-1);
 var x85=x84.insertCell(-1);
x85.style.width="100%";
x85.setAttribute(AdfMenuUtils.OVERFLOW_KEY,"true");
 var x86=this._overflowSupport.createSwapPosition(x81);
x85.appendChild(x86);
 return x83;
}
AdfDhtmlMenuBarPeer.prototype._getStretchElement= function()
{
 var x87=this.getComponent();
 var x88=x87.getStretchId();
 if (x88)
{
 var x89=x87.findComponent(x88);
 if (x89)
{
 var x90=x89.getClientId();
 return AdfAgent.AGENT.getElementById(x90);
}
 else
 {
AdfLogger.LOGGER.warning("Unable to find client component for stretch id " + x88);
}
}
 return null;
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentMouseOut= function(x91)
{
 var x92=x91.getSource();
 if (x92 instanceof AdfRichCommandNavigationItem)
{
 if(x92.getParent() instanceof AdfRichCommandNavigationItem)
{
x92.getPeer().getDomElement().blur();
}
}
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentMouseOver= function (x93)
{
 var x94=x93.getSource();
 if (x94 instanceof AdfRichCommandNavigationItem)
{
x94.getPeer().focus(x94);
 if (!AdfPage.PAGE.isScreenReaderMode())
{
this._showPopup(x93,null);
}
}
 else
 {
x93.cancel();
}
 if (x93.isCanceled())
{
 return;
}
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentClick= function(x95)
{
 var x96=x95.getSource();
 if (x96 instanceof AdfRichCommandNavigationItem)
{
this._closeAllPopups();
}
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentFocus= function(x97)
{
 var x98=x97.getSource();
 var x99=AdfAgent.AGENT.getElementById(x98.getClientId());
 if (x98 instanceof AdfRichCommandNavigationItem)
{
AdfDomUtils.addCSSClassName(x99,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 else
 {
x97.cancel();
}
 if (x97.isCanceled())
{
 return;
}
}
AdfDhtmlMenuBarPeer.prototype.HandleComponentBlur= function(x100)
{
 var x101=x100.getSource();
 if (x101 instanceof AdfRichCommandNavigationItem)
{
 var x102=AdfAgent.AGENT.getElementById(x101.getClientId());
AdfDomUtils.removeCSSClassName(x102,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 else
 {
x100.cancel();
}
 if (x100.isCanceled())
{
 return;
}
}
AdfDhtmlMenuBarPeer.prototype.PopupClosed= function(x103,x104,x105)
{
 if (x103 instanceof AdfRichCommandNavigationItem)
{
 var x106=AdfAgent.AGENT;
 var x107=x106.getElementById(x103.getClientId());
 var x108=x107;
x108=this._getPopupContainerElement(x103);
 if (x103.getParent() instanceof AdfRichMenuBar)
{
AdfDomUtils.removeCSSClassName(x107,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
x104.style.display="none";
AdfCollections.removeArrayValue(AdfDhtmlMenuBarPeer._sOpenedPopups,x103.getClientId());
AdfDhtmlMenuBarPeer.superclass.PopupClosed.call(this,x103,x104);
x108.appendChild(x104);
}
 else
 {
AdfDhtmlMenuBarPeer.superclass.PopupClosed.call(this,x103,x104);
}
}
AdfDhtmlMenuBarPeer.prototype._getPopupElement= function (x109)
{
 var x110=x109.getSource();
 var x111=null;
 if(this._getPopupContainerElement(x110))
{
x111=this._getPopupContainerElement(x110).lastChild;
}
 return x111;
}
AdfDhtmlMenuBarPeer.prototype._createPopupHints= function(x112,x113,x114)
{
 var x115= new Object();
 var x116=AdfPage.PAGE;
 var x117=AdfAgent.AGENT.getElementById(x113.getClientId());
x115[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x115[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
x115[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=x112;
x115[AdfDhtmlPopupWindow.HINT_FOCUS]=(x114)?true:false;
 if (x116.isScreenReaderMode())
{
x115[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE]=true;
}
 else
 {
x115[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE]=false;
}
 if (((x113.getParent()) instanceof AdfRichCommandNavigationItem)||AdfMenuUtils.isInOverflow(x117))
{
x115[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_END_BEFORE;
}
 else
 {
x115[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START;
}
 return x115;
}
AdfDhtmlMenuBarPeer.prototype._dismissPopups= function(x118)
{
 var x119=AdfDhtmlMenuBarPeer._sOpenedPopups;
 if (!x119||x119.length==0)
{
 return;
}
for(var x120=x119.length - 1;x120>=0;x120--)
{
 var x121=x119[x120];
 var x122=AdfPage.PAGE.findComponent(x121);
 if(!this._isInOpenedTree(x122,x118))
{
AdfDhtmlMenuBarPeer.superclass.hidePopup.call(this,x122,x121);
}
}
}
AdfDhtmlMenuBarPeer.prototype._isInOpenedTree= function(x123,x124)
{
 var x125=x124;
while(!(x125 instanceof AdfRichMenuBar))
{
 if(x123.getClientId()==x125.getClientId())
{
 return true;
}
x125=x125.getParent();
}
 return false
}
AdfDhtmlMenuBarPeer.prototype._showPopup= function (x126,x127)
{
 var x128=x126.getSource();
 var x129=x128.getClientId();
 var x130=AdfAgent.AGENT;
 if (this._isPopupOpen(x129))
{
x126.cancel();
}
 else
 {
 var x131=this._getPopupElement(x126);
 if (x131)
{
 var x132=x130.getElementById(x128.getClientId());
 if(x128.getParent() instanceof AdfRichMenuBar)
{
AdfDomUtils.addCSSClassName(x132,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
 var x133=this._createPopupHints(x132,x128,x127);
x131.style.display="block";
AdfDhtmlMenuBarPeer._sOpenedPopups.push(x129);
AdfDhtmlMenuBarPeer.superclass.showPopup.call(this,x128,x131,x133,x129);
}
x126.cancel();
this._dismissPopups(x128);
}
}
AdfDhtmlMenuBarPeer.prototype._handleArrowKeysForMenuModel= function(x134,x135)
{
 var x136=AdfAgent.AGENT;
 var x137=x135.getSource();
 var x138=x137.getClientId();
 var x139=x136.getElementById(x138);
 var x140=AdfRichUIPeer.CreateSubId(x138,"menu");
 var x141=x136.getElementById(x140);
 var x142=x137.getParent(); var x143=x142.getClientId();
 var x144=x136.getElementById(x143);
 var x145=AdfRichUIPeer.CreateSubId(x143,"menu");
 var x146=x136.getElementById(x145);
 var x147;
 if(x142 instanceof AdfRichMenuBar)
{
switch(x134)
{
 case AdfKeyStroke.ARROWDOWN_KEY:
 if(this._isPopupOpen(x138))
{
AdfFocusUtils.focusFirstTabStop(x141);
x135.cancel();
}
 else
 {
this._showPopup(x135,true);
x135.cancel();
}
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
AdfFocusUtils.focusNextTabStop(x139,x144);
x135.cancel();
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
AdfFocusUtils.focusPreviousTabStop(x139,x144);
x135.cancel();
break;
default:
}
}
 else
 {
switch(x134)
{
 case AdfKeyStroke.ARROWDOWN_KEY:
AdfFocusUtils.focusNextTabStop(x139,x146);
x135.cancel();
break;
 case AdfKeyStroke.ARROWUP_KEY:
AdfFocusUtils.focusPreviousTabStop(x139,x146);
x135.cancel();
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if(this._isPopupOpen(x138))
{
AdfFocusUtils.focusFirstTabStop(x141);
x135.cancel();
}
 else
 {
 if (this._getPopupElement(x135))
{
this._showPopup(x135,true);
x135.cancel();
}
 else
 {
 var x148=x137;
while(!((x148.getParent()) instanceof AdfRichMenuBar))
{
x148=x148.getParent();
}
 var x149=x136.getElementById(x148.getClientId());
x147=x136.getElementById(x148.getParent().getClientId());
AdfFocusUtils.focusNextTabStop(x149,x147);
this._closeAllPopups();
x135.cancel();
}
}
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
 if (x142.getParent() instanceof AdfRichMenuBar)
{
x147=x136.getElementById(x142.getParent().getClientId());
AdfFocusUtils.focusPreviousTabStop(x144,x147);
this._closeAllPopups();
x135.cancel();
}
 else
 {
AdfFocusUtils.focusFirstTabStop(x144);
AdfDhtmlMenuBarPeer.superclass.cancelAllPopups.call(this,x142);
x135.cancel();
}
break;
default:
}
}
}
AdfDhtmlMenuBarPeer.prototype._isPopupOpen= function(x150)
{
 return (AdfCollections.indexOf(AdfDhtmlMenuBarPeer._sOpenedPopups,x150)>=0)?true:false;
}
AdfDhtmlMenuBarPeer.prototype._getPopupContainerElement= function (x151)
{
 var x152=AdfAgent.AGENT;
 var x153=x152.getElementById(x151.getClientId());
 var x154=x153;
 var x155=null;
 if(x151.getParent() instanceof AdfRichMenuBar)
{
 var x156=x154.childNodes;
for(i=0;i<x156.length;i++)
{
 if(x152.getNodeName(x156[i])=="TABLE")
{
x154=x156[i];
}
}
while(x152.getNodeName(x154)!="TR")
{ if(x154.nodeType==8)
{
x154=x154.nextSibling;
}
 else
 {
x154=x154.firstChild;
}
}
}
 var x157=x154.childNodes;
for(i=0;i<x157.length;i++)
{
 var x158=x157[i];
 if(x152.getNodeName(x158)!="TD")
{
continue;
}
 else
 {
 if((x158.getAttribute("_afrClNm")=="popupContainer"))
{
x155=x158;
}
}
}
 return x155;
}
AdfDhtmlMenuBarPeer.prototype._closeAllPopups= function ()
{
 var x159=AdfDhtmlMenuBarPeer._sOpenedPopups;
 if (!x159||x159.length==0)
{
 return;
}
for(var x160=x159.length - 1;x160>=0;x160--)
{
 var x161=x159[x160];
 var x162=AdfPage.PAGE.findComponent(x161);
AdfDhtmlMenuBarPeer.superclass.hidePopup.call(this,x162,x161);
}
}

function AdfToolbarUtils()
{
}
AdfObject.createSubclass(AdfToolbarUtils);
AdfToolbarUtils.InitClass= function()
{
this.OVERFLOW_KEY="_afrOflw";
}
AdfToolbarUtils.isValidOverflowElement= function(x0)
{
 if (x0==null)
{
 return false;
}
 var x1=AdfPage.PAGE.findComponent(x0.id);
 var x2=(window["AdfRichSpacer"]!=undefined);
 if (x2&&(x1 instanceof AdfRichSpacer))
{
 return false;
}
 var x3=(window["AdfRichImage"]!=undefined);
 if (x3&&(x1 instanceof AdfRichImage))
{
 return false;
}
 return true;
}
AdfToolbarUtils.isInOverflow= function(x4)
{
 var x5=x4.parentNode.getAttribute(AdfToolbarUtils.OVERFLOW_KEY);
 return (x5=="true");
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlMenuPeer",false);
AdfDhtmlMenuPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfMenuUtils);
AdfRichUIPeer.addComponentEventHandlers(
this,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE
);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichMenu.DISABLED,AdfRichMenu.TEXT);
this._sBarMenus=[];
this._sDetachedMenus=[];
this._SCROLL_DELTA=3;
this._JUMP_SCROLL_DELTA=15;
this._OPEN_CLOSE_DELAY=300;
 var x0=AdfKeyStroke.M_KEY;
 var x1=AdfKeyStroke.SHIFT_MASK|AdfKeyStroke.CTRL_MASK;
this._menuBarKeyStroke=AdfKeyStroke.getKeyStroke(x0,x1);
x0=AdfKeyStroke.W_KEY;
x1=AdfKeyStroke.SHIFT_MASK|AdfKeyStroke.CTRL_MASK;
this._focusDetachedMenuKeyStroke=AdfKeyStroke.getKeyStroke(x0,x1);
}
AdfDhtmlMenuPeer.prototype.Init= function(x2)
{
x2.getParent();
AdfDhtmlMenuPeer.superclass.Init.call(this,x2);
 var x3=AdfPage.PAGE.getLookAndFeel();
 var x4=parseInt(x3.getSkinProperty("af|menu-tr-visible-items"));
this._maxDisplayItems=(isNaN(x4))?14:x4;
this._isDetached=false;
this._enterKeyDown=false;
}
AdfDhtmlMenuPeer.prototype.InitDomElement= function(x5,x6)
{
 if(x6.getAttribute(AdfMenuUtils.MENU_DEPTH_KEY)=="1")
{
 var x7=x5.getClientId();
AdfDhtmlMenuPeer._addBarMenu(x7);
}
}
AdfDhtmlMenuPeer.cancelShowing= function()
{
 if (AdfDhtmlMenuPeer._popupShowingHandle)
{
window.clearTimeout(AdfDhtmlMenuPeer._popupShowingHandle);
 delete AdfDhtmlMenuPeer._popupShowingHandle;
 delete AdfDhtmlMenuPeer._popupPeerWaitingForShow;
}
}
AdfDhtmlMenuPeer.prototype.show= function(x8,x9)
{
 var x10=this.getDomElement();
 var x11=this.getComponent();
 var x12=x11.getClientId();
AdfDomUtils.addCSSClassName(x10,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
 if (!this.isContextMenu()&&this.isRootMenu())
{
AdfMenuUtils.setLastOpenedRootMenuId(x12);
}
 if (x9==null)
{
 var x13=x8[AdfDhtmlPopupWindow.HINT_FOCUS];
 if (x13!=null)
{
x9=x13;
}
 else
 {
x9=(this.isContextMenu())?true:false;
}
}
this._reattachMenu();
 if (this._getLazyState()=="noContent")
{
this._setLazyState("fetching");
 var x14= new Object();
x14.menuDepth=this._getDepth();
this._lazyFetchPopupHints=x8;
this._lazyFetchFocusOnFirstElement=x9;
 new AdfContentFetchEvent(x11,AdfContentFetchEvent.FETCH_EVENT_TYPE,x14).queue();
this._showFetchingDataPopup();
 return;
}
 else if (this._getLazyState()=="fetching")
{
AdfLogger.LOGGER.info("Currently waiting on menu content fetch: " + x11.getClientId());
 return;
}
 var x15=this._getMenuElement();
 if (x15.style.display=="block")
{
 if (x9)
{
AdfFocusUtils.focusFirstTabStop(x15);
}
 return;
}
 var x16=this._createMenuPopupHints(x8,x9);
x15.style.display="block";
 var x17=this._elemsInitialized;
 if(!x17)x15.style.visibility="hidden";
this.showPopup(x11,x15,x16,x12);
 if(!x17)
{
this._initElements(x11,x12,x15);
x15.style.visibility="";
this._elemsInitialized=true;
 if(this._areScrollButtonsDisplayed)
{
this._moveShadow(true);
}
}
 if(this._areScrollButtonsDisplayed)
{
this.updateScrollIconsState();
}
 if (this._isDetachable())
{
this._createDetachableWindow();
}
}
AdfDhtmlMenuPeer.prototype.showPopup= function(x18,x19,x20,x21)
{
AdfMenuUtils.addOpenMenu(x21);
AdfDhtmlMenuPeer.superclass.showPopup.call(this,x18,x19,x20,x21);
}
AdfDhtmlMenuPeer.prototype.hidePopup= function()
{
 var x22=this.getComponent();
 var x23=x22.getClientId();
 if (x23==AdfDhtmlMenuPeer._reattachedMenuId)
{
AdfDhtmlMenuPeer._redetachMenu();
}
 if (!this.isDetached())
{
this._handleHideRequest(x22,x23);
AdfDhtmlMenuPeer.superclass.hidePopup.call(this,x22,x23);
}
}
AdfDhtmlMenuPeer.prototype.cancelPopup= function()
{
AdfDhtmlMenuPeer._redetachMenu();
 if (!this.isDetached())
{
 var x24=this.getComponent();
 var x25=x24.getClientId();
this._handleHideRequest(x24,x25);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to cancel popup event");
AdfMenuUtils.setMenuBarAutoOpenMode(false);
AdfDhtmlMenuPeer.superclass.cancelPopup.call(this,x24,x25);
}
}
AdfDhtmlMenuPeer.prototype.close= function(x26,x27)
{
 var x28=this.getComponent();
 if (this.isDetached())
{
AdfDomUtils.addCSSClassName(this._getMenuElement(),AdfMenuUtils.DETACHED_STYLE_CLASS);
 if (this._detachedMenuLeft&&this._detachedMenuTop)
{
 var x29=this._detachableWindow.getElement();
x29.style.left=this._detachedMenuLeft;
x29.style.top=this._detachedMenuTop;
}
 if (!x27)
this._deselectElement();
 var x30=x28.getClientId();
AdfDhtmlMenuPeer._removeFromDetachedMenus(x30);
AdfDhtmlMenuPeer.superclass.hidePopup.call(this,x28,x30);
 return;
}
 if (this.isContextMenu())
{
 var x31=x28.getParent();
x31.hide();
}
 else
 {
 if(x26)
this.hidePopup();
 else
 this._delayPopupHiding(); if (!x27)
this._deselectElement();
}
}
AdfDhtmlMenuPeer.prototype.isDetached= function()
{
 return this._isDetached;
}
AdfDhtmlMenuPeer.prototype.isContextMenu= function()
{
 var x32=this.getComponent();
 return (x32.getParent() instanceof AdfRichPopup);
}
AdfDhtmlMenuPeer.prototype.isRootMenu= function()
{
 return this._getDepth()==1;
}
AdfDhtmlMenuPeer.prototype.updateScrollIconsState= function()
{
 if (this._areScrollButtonsDisplayed)
{
 var x33=this._scrollBoxElement.scrollTop;
 var x34=this._scrollContentElement.offsetHeight - this._scrollBoxElement.offsetHeight;
 if (x33<=0)
{
AdfDomUtils.addCSSClassName(this._scrollUpElement,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.addCSSClassName(this._scrollUpBackgroundElement,AdfRichUIPeer.DISABLED_STYLECLASS);
}
 else
 {
AdfDomUtils.removeCSSClassName(this._scrollUpElement,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.removeCSSClassName(this._scrollUpBackgroundElement,AdfRichUIPeer.DISABLED_STYLECLASS);
}
 if (x33>=x34)
{
AdfDomUtils.addCSSClassName(this._scrollDownElement,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.addCSSClassName(this._scrollDownBackgroundElement,AdfRichUIPeer.DISABLED_STYLECLASS);
}
 else
 {
AdfDomUtils.removeCSSClassName(this._scrollDownElement,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.removeCSSClassName(this._scrollDownBackgroundElement,AdfRichUIPeer.DISABLED_STYLECLASS);
}
}
}
AdfDhtmlMenuPeer.prototype.ReplaceDomElement= function(x35,x36)
{
 if (this._getLazyState()!="fetching")
{
AdfDhtmlMenuPeer.superclass.ReplaceDomElement.call(this,x35,x36);
 return;
}
 var x37=AdfDomUtils.getFirstChildElement(x35);
 if (x37==null)
{
AdfLogger.LOGGER.warning("Unexpected element received by AdfDhtmlMenuPeer.prototype.ReplaceDomElement");
AdfDhtmlMenuPeer.superclass.ReplaceDomElement.call(this,x35,x36);
 return;
}
 var x38=this.getDomElement();
x38.appendChild(x37);
 var x39=AdfAgent.AGENT;
x39.elementsAdded(x37);
this._setLazyState("contentLoaded");
this._hideFetchingDataPopup();
this.show(this._lazyFetchPopupHints,this._lazyFetchFocusOnFirstElement);
}
AdfDhtmlMenuPeer.prototype.PopupClosed= function(x40,x41,x42)
{
 var x43=this.getDomElement();
AdfMenuUtils.dismiss(x43,true,false);
x41.style.display="none";
AdfDhtmlMenuPeer.superclass.PopupClosed.call(this,x40,x41);
x43.appendChild(x41);
 if (this.isContextMenu())
{
 var x44=x40.getParent();
AdfDhtmlPopupPeer.__handlePopupCanceled(x44,x41);
x44.getPeer().PopupClosed(x44,null);
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentMouseOut= function(x45)
{
AdfMenuUtils.unhighlightRootMenuItem();
 if(this._isSubMenu()&& !this._isMenuVisible())
{
 if(AdfDhtmlMenuPeer._popupPeerWaitingForShow==this)
{
AdfDhtmlMenuPeer.cancelShowing();
}
 var x46=this.getDomElement();
AdfDomUtils.removeCSSClassName(x46,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfDomUtils.removeCSSClassName(x46,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentKeyUp= function(x47)
{
 if (x47.isCanceled()||this._isDisabled())
{
 return;
}
 var x48=this.getDomElement();
 var x49=x47.getKeyCode();
 var x50=this._isSubMenu();
 var x51=this.getComponent();
switch(x49)
{
 case AdfKeyStroke.HOME_KEY:
AdfFocusUtils.focusFirstTabStop(x48.parentNode);
x47.cancel();
 return;
 case AdfKeyStroke.END_KEY:
AdfFocusUtils.focusLastTabStop(x48.parentNode);
x47.cancel();
 return;
 case AdfKeyStroke.SPACE_KEY:
AdfDomUtils.addCSSClassName(x48,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
this.show(null,true);
x47.cancel();
 return;
 case AdfKeyStroke.ENTER_KEY:
 if (this._enterKeyDown)
{
AdfDomUtils.addCSSClassName(x48,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
this.show(null,true);
}
this._enterKeyDown=false;
x47.cancel();
 return;
 case AdfKeyStroke.ESC_KEY:
 if (AdfPage.PAGE.isScreenReaderMode())
{
 return;
}
 if (this.isDetached())
{
this._closeDetachedMenu();
x47.cancel();
}
 else if (x50)
{
 if (x48!=AdfPage.PAGE.getActiveDomElement())
{
this.focus(x51);
this.close(true,true);
x47.cancel();
}
}
 else if (this.isContextMenu()){
AdfMenuUtils.closeAllMenus();
x48.blur();
this.focus(x51);
 var x52=x51.getParent();
x52.getPeer().hide(x52);
x47.cancel();
}
 else {
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to escape pressed while on a root menu");
AdfMenuUtils.setMenuBarAutoOpenMode(false);
AdfMenuUtils.closeAllMenus(true);
}
 return;
default:
break;
}
 var x53=this._isMenuVisible();
 var x54=this.isRootMenu();
 var x55=(x47.getSource()==x51);
 if ((x53&&x54)|| !x55)
{
 var x56=this._scrollContentElement||this._getMenuElement();
AdfDhtmlMenuPeer._handleMenuItemAccessKeys(x56,x47);
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentKeyDown= function(x57)
{
 if (x57.isCanceled()||this._isDisabled())
{
 return;
}
 var x58=x57.getKeyCode();
 var x59=AdfAgent.AGENT;
 if (x58==AdfKeyStroke.ENTER_KEY)
{
this._enterKeyDown=true;
x57.cancel();
x57.stopBubbling();
 return;
}
 if (x59.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_DOWN_EVENT_TYPE)
{
this._handleArrowKeys(x58,x57);
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentKeyPress= function(x60)
{
 if (!x60.isCanceled()&&
 !this._isDisabled()&&
AdfAgent.AGENT.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_PRESS_EVENT_TYPE)
{
 var x61=x60.getKeyCode();
this._handleArrowKeys(x61,x60);
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentFocus= function(x62)
{
 if (x62.isCanceled()||this._isDisabled())
{
 return;
}
x62.cancel();
 var x63=this.getDomElement();
 if (this._isSubMenu())
{
AdfDomUtils.addCSSClassName(x63,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 else {
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&& !AdfPage.PAGE.isScreenReaderMode())
{
AdfMenuUtils.dismiss(x63,true);
AdfDomUtils.addCSSClassName(x63,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
this.show(null,false);
}
 else
 {
AdfMenuUtils.highlightRootMenuItem(x63);
}
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentMouseOver= function(x64)
{
this._cancelHiding();
 if (this._isDisabled())
{
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&&this.isRootMenu())
{
AdfMenuUtils.closeAllMenus(false);
}
 return;
}
 if (x64.isCanceled())
{
 return;
}
 var x65=AdfAgent.AGENT;
 var x66=x64.getNativeEvent();
 var x67=this.getDomElement();
 if (!x65.isEventInElement(x66,x67))
{
 return;
}
x64.cancel();
 if(this.isContextMenu())
{
 return;
}
 var x68=this.getComponent();
 if (this._isSubMenu())
{
AdfDomUtils.addCSSClassName(x67,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfMenuUtils.dismiss(x67,false);
 if (!AdfPage.PAGE.isScreenReaderMode())
{
this._delayShow();
}
 if (!AdfFocusUtils.containsFocus(x67))
{
this.focus(x68);
}
}
 else {
 if (!this._isMenuVisible()&& !AdfMenuUtils.isMenuBarAutoOpenMode())
{
AdfMenuUtils.highlightRootMenuItem(x67);
}
 else {
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&& !AdfPage.PAGE.isScreenReaderMode())
{
AdfMenuUtils.dismiss(x67,true);
AdfDomUtils.addCSSClassName(x67,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
this.show(null,false);
}
 if (!AdfFocusUtils.containsFocus(x67))
{
this.focus(x68);
}
}
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentClick= function(x69)
{
 if (!AdfPage.PAGE.isScreenReaderMode()||
x69.isCanceled()||
this._isDisabled()||
x69.getEventPhase()!=AdfBaseEvent.AT_TARGET_PHASE)
{
 return;
}
 if (!this._isMenuVisible())
{
 var x70=this.getDomElement();
AdfDomUtils.addCSSClassName(x70,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
this.show(null,true);
x69.cancel();
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentMouseDown= function(x71)
{
 if (this._isDisabled()|| !x71.isLeftButtonPressed())
{
 return;
}
 var x72=AdfAgent.AGENT;
 var x73=x71.getNativeEvent();
 var x74=this.getDomElement();
 var x75=(this._scrollUpElement&&x72.isEventInElement(x73,this._scrollUpElement));
 var x76=(this._scrollDownElement&&x72.isEventInElement(x73,this._scrollDownElement));
 if (x75||x76)
{
 if (x72.getPlatform()==AdfAgent.IE_PLATFORM)
{
 var x77=x75?this._scrollUpElement:this._scrollDownElement;
 if (x77!=AdfPage.PAGE.getActiveDomElement())
{
x77.tabIndex=0;
x77.focus();
x77.tabIndex= -1;
}
}
this._startScroll(x76);
}
 else if (x72.isEventInElement(x73,x74))
{
x72.eatEvent(x73);
AdfDomUtils.addCSSClassName(x74,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
 if (this.isContextMenu())
{
 return;
}
 if (this._isSubMenu())
{
this.show(null,false);
}
 else {
 if (this._isMenuVisible())
{
this.close(true,true);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to menu clicked while menu IS visible");
AdfMenuUtils.setMenuBarAutoOpenMode(false);
}
 else
 {
this.show(null,false);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to ON due to menu clicked while menu IS NOT visible");
AdfMenuUtils.setMenuBarAutoOpenMode(true);
}
}
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentMouseUp= function(x78)
{
 if (this._isDisabled()|| !x78.isLeftButtonPressed())
 return;
 var x79=AdfAgent.AGENT;
 var x80=x78.getNativeEvent();
 if (this._handleElement)
AdfDomUtils.removeCSSClassName(this._handleElement,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
 var x81=(this._scrollUpElement&&x79.isEventInElement(x80,this._scrollUpElement));
 var x82=(this._scrollDownElement&&x79.isEventInElement(x80,this._scrollDownElement));
 if (x81||x82)
{
 var x83=navigator.userAgent.toLowerCase();
 if (x83.indexOf("webkit")!= -1&&x83.indexOf("mobile")!= -1)
{
this._startScroll(x82,true);
}
 else
 {
this._endScroll();
}
}
}
AdfDhtmlMenuPeer.prototype.HandleComponentBlur= function(x84)
{
 var x85=this.getDomElement();
 var x86= !this._isSubMenu();
 var x87=this._isSubMenu()&& !this._isMenuVisible();
 var x88=this._isSubMenu()&&this._isMenuVisible()&&this.isDetached();
 if (x86||x87||x88)
{
AdfDomUtils.removeCSSClassName(x85,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 if (this.isDetached()|| !this._isMenuVisible())
{
AdfDomUtils.removeCSSClassName(x85,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
}
AdfDhtmlMenuPeer.prototype.ComponentRemoved= function(x89)
{
 var x90=x89.getClientId();
 if (AdfMenuUtils.isMenuOpen(x90))
{
this.hidePopup();
}
 else if (this.isDetached())
{
this._closeDetachedMenu();
}
 if (this._isDetachable())
{
 var x91=AdfAgent.AGENT;
 var x92=this._closeDetachedMenuCallback;
 if (x92)
x91.removeBubbleEventListener(this._closeElement,"click",x92);
 delete this._closeElement;
 delete this._closeDetachedMenuCallback;
 var x93=this._stopCallback;
 if (x93)
x91.removeBubbleEventListener(this._handleElement,"mousedown",x93);
 delete this._handleElement;
 delete this._stopCallback;
}
 if (!this._isSubMenu())
{
AdfDhtmlMenuPeer._removeBarMenu(x90);
}
 delete this._menuElement;
 delete this._scrollUpElement;
 delete this._scrollDownElement;
 delete this._scrollUpBackgroundElement;
 delete this._scrollDownBackgroundElement;
 delete this._scrollBoxElement;
 delete this._scrollContentElement;
AdfDhtmlMenuPeer.superclass.ComponentRemoved.call(this,x89);
}
AdfDhtmlMenuPeer.prototype.ComponentDisabledChanged= function(
x94,
x95,
x96,
x97)
{
 var x98=AdfPage.PAGE.isScreenReaderMode();
 if (x96==true)
{
AdfDomUtils.addCSSClassName(x95,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x98)
{
 var x99=AdfDomUtils.getFirstChildElement(x95);
x99.setAttribute("aria-disabled","true");
x99.removeAttribute("href");
}
 else
 {
 var x100=(this._isSubMenu())?x95:
AdfDomUtils.getFirstChildElement(x95);
x100.removeAttribute("tabIndex");
}
}
 else {
AdfDomUtils.removeCSSClassName(x95,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x98)
{
 var x101=AdfDomUtils.getFirstChildElement(x95);
x101.removeAttribute("aria-disabled");
x101.setAttribute("href","#");
}
 else
 {
 var x102=(this._isSubMenu())?x95:
AdfDomUtils.getFirstChildElement(x95);
x102.setAttribute("tabIndex","0");
}
}
}
AdfDhtmlMenuPeer.prototype.ComponentTextChanged= function(
x103,
x104,
x105,
x106)
{
 if (x106!=null)
{
 var x107=AdfDomUtils.getFirstDescendentElement(x104,"A");
 if (x107)
{
 return AdfDomUtils.handleTextChangeWithAccessKey(x103,x107,
x105);
}
}
 return false;
}
AdfDhtmlMenuPeer.prototype.GetInlineEditor= function(x108)
{
 return AdfDhtmlSimpleTextEditor.getAnchorInlineEditor();
}
AdfDhtmlMenuPeer.prototype.setVisibleItems= function(x109)
{
this._maxDisplayItems=x109;
}
AdfDhtmlMenuPeer._redetachMenu= function()
{
 var x110=AdfDhtmlMenuPeer._reattachedMenuId;
 if (x110==null)
{
 return;
}
 var x111=AdfPage.PAGE.findComponent(x110);
 if (x111)
{
 var x112=x111.getPeer();
 if (x112&&x112 instanceof AdfDhtmlMenuPeer)
{
 var x113=x112._detachableWindow.getElement();
x113.style.left=x112._detachedMenuLeft;
x113.style.top=x112._detachedMenuTop;
 var x114={y:x112._detachedMenuTop,x:x112._detachedMenuLeft};
 var x115=x112._getMenuPopup();
 if (x115)
{
x115.setAlignPosition(x114);
}
x112._makeDetached();
}
}
AdfDhtmlMenuPeer._reattachedMenuId=null;
}
AdfDhtmlMenuPeer._focusNextDetachedMenuKeyHandler= function()
{
 if (AdfCollections.isEmpty(AdfDhtmlMenuPeer._sDetachedMenus))
{
 return;
}
 var x116;
 var x117=AdfDhtmlMenuPeer._lastSelectedDetachableMenuId;
 if (x117==null)
{
x116=AdfDhtmlMenuPeer._sDetachedMenus[0];
}
 else
 {
 var x118=AdfDhtmlMenuPeer._sDetachedMenus.length;
 if (x118==1)
{
x116=AdfDhtmlMenuPeer._sDetachedMenus[0];
}
 else
 {
 var x119=AdfCollections.indexOf(AdfDhtmlMenuPeer._sDetachedMenus,x117);
x116=(x119>=(x118 -1))?AdfDhtmlMenuPeer._sDetachedMenus[0]:
AdfDhtmlMenuPeer._sDetachedMenus[x119 + 1];
}
}
 var x120=AdfPage.PAGE.findComponent(x116);
 if (x120)
{
 var x121=x120.getPeer();
 var x122=x121._getMenuElement().getElementsByTagName("tbody")[0];
AdfFocusUtils.focusFirstTabStop(x122);
AdfDhtmlMenuPeer._lastSelectedDetachableMenuId=x116;
}
 else
 {
AdfDhtmlMenuPeer._removeFromDetachedMenus(x116);
AdfDhtmlMenuPeer._focusNextDetachedMenuKeyHandler();
}
}
AdfDhtmlMenuPeer._addToDetachedMenus= function(x123)
{
 var x124=AdfAgent.AGENT;
 if (AdfCollections.isEmpty(AdfDhtmlMenuPeer._sDetachedMenus))
{
 var x125=(x124.getPlatform()==AdfAgent.GECKO_PLATFORM);
 if (x125)
{
 var x126=AdfPage.PAGE.getDomDocument();
x124.addBubbleEventListener(x126,"keypress",AdfDhtmlMenuPeer._cancelKeyPress);
}
AdfPage.PAGE.registerKeyStroke(AdfDhtmlMenuPeer._focusDetachedMenuKeyStroke,
AdfDhtmlMenuPeer._focusNextDetachedMenuKeyHandler);
}
 var x127=AdfCollections.indexOf(AdfDhtmlMenuPeer._sDetachedMenus,x123);
 if (x127<0)
{
AdfDhtmlMenuPeer._lastSelectedDetachableMenuId=x123;
AdfDhtmlMenuPeer._sDetachedMenus.push(x123);
}
}
AdfDhtmlMenuPeer._removeFromDetachedMenus= function(x128)
{
AdfCollections.removeArrayValue(AdfDhtmlMenuPeer._sDetachedMenus,x128);
 var x129=AdfCollections.isEmpty(AdfDhtmlMenuPeer._sDetachedMenus);
 if (x129||x128==AdfDhtmlMenuPeer._lastSelectedDetachableMenuId)
{
AdfDhtmlMenuPeer._lastSelectedDetachableMenuId=null;
}
 if (x129)
{
AdfPage.PAGE.unregisterKeyStroke(AdfDhtmlMenuPeer._focusDetachedMenuKeyStroke);
 var x130=AdfAgent.AGENT;
 var x131=(x130.getPlatform()==AdfAgent.GECKO_PLATFORM);
 if (x131)
{
 var x132=AdfPage.PAGE.getDomDocument();
x130.removeBubbleEventListener(x132,"keypress",AdfDhtmlMenuPeer._cancelKeyPress);
}
}
}
AdfDhtmlMenuPeer._cancelKeyPress= function(x133)
{
 var x134=AdfAgent.AGENT.getKeyCode(x133);
 if (x133.ctrlKey&&x133.shiftKey&&(x134==AdfKeyStroke.W_KEY))
AdfAgent.AGENT.eatEvent(x133);
}
AdfDhtmlMenuPeer._menuBarKeyHandler= function(x135)
{
AdfDhtmlMenuPeer._focusFirstElementInMenuBar();
}
AdfDhtmlMenuPeer._addBarMenu= function(x136)
{
 var x137=AdfDhtmlMenuPeer._sBarMenus;
 if (x137.length==0)
{
AdfPage.PAGE.registerKeyStroke(AdfDhtmlMenuPeer._menuBarKeyStroke,
AdfDhtmlMenuPeer._menuBarKeyHandler);
}
x137.push(x136);
}
AdfDhtmlMenuPeer._removeBarMenu= function(x138)
{
 var x139=AdfDhtmlMenuPeer._sBarMenus;
AdfCollections.removeArrayValue(x139,x138);
 if (x139.length==0)
{
AdfPage.PAGE.unregisterKeyStroke(AdfDhtmlMenuPeer._menuBarKeyStroke);
}
}
AdfDhtmlMenuPeer._focusFirstElementInMenuBar= function()
{
 var x140=AdfDhtmlMenuPeer._sBarMenus;
AdfAssert.assert(x140.length>1);
 var x141=x140[0];
 var x142=AdfPage.PAGE.findComponent(x141);
 var x143=x142.getParent();
AdfAssert.assert(!(x143 instanceof AdfRichMenu));
 var x144=x142.getPeer();
 var x145=x144._getParentId();
 var x146=AdfAgent.AGENT.getElementById(x145);
AdfFocusUtils.focusFirstTabStop(x146);
}
AdfDhtmlMenuPeer._handleMenuItemAccessKeys= function(x147,x148)
{
 var x149=x148.getKeyStroke();
 var x150=x149.getModifiers();
 if (x150&AdfKeyStroke.CTRL_MASK||x150&AdfKeyStroke.ALT_MASK||
x150&AdfKeyStroke.META_MASK)
{
 return;
}
 if (x150&AdfKeyStroke.SHIFT_MASK)
{
x150=x150>>AdfKeyStroke.SHIFT_MASK;
x149=AdfKeyStroke.getKeyStroke(x149.getKeyCode(),x150);
}
 var x151=x149.toMarshalledString().toUpperCase();
 var x152=x147.getElementsByTagName("tr");
 var x153=x152.length;
for(var x154=0;x154<x153;x154++)
{
 var x155=x152[x154];
 if (x155&&(x155.nodeType==1))
{
 var x156=x155.id;
 var x157=x155.getAttribute("accessKey");
 if (x157)
{
 if (x151==x157.toUpperCase())
{
AdfFocusUtils.focusElement(x155);
x148.cancel();
 return;
}
}
}
}
}
AdfDhtmlMenuPeer.prototype._handleArrowKeys= function(x158,x159)
{
 var x160=x159.getNativeEvent();
 if (x160.ctrlKey)
{
 if (this.isDetached()||(this._detachableWindow&&this._isMenuVisible()))
{
 var x161=AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM;
 var x162=x161?(x158==187):(x158==61);
 if (x160.altKey&&x162){
this._moveDetachable(0,0);
x159.cancel();
}
 else
 {
 var x163=true;
switch(x158)
{
 case AdfKeyStroke.ARROWUP_KEY:
this._moveDetachable(0, -20);
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
this._moveDetachable(0,20);
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
this._moveDetachable(-20,0);
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
this._moveDetachable(20,0);
break;
default:
x163=false;
}
 if (x163)
x159.cancel();
}
}
 return;
}
 var x164=this.getDomElement();
 var x165=this.getComponent();
AdfMenuUtils.handleArrowKeys(x159,x164,x165);
}
AdfDhtmlMenuPeer.prototype._onHandleClick= function(x166)
{
AdfAgent.AGENT.eatEvent(x166);
AdfDomUtils.addCSSClassName(this._handleElement,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlMenuPeer.prototype._initElements= function(x167,x168,x169)
{
 var x170=AdfAgent.AGENT;
 if (this._isDetachable())
{
 var x171=AdfRichUIPeer.CreateSubId(x168,"close");
this._closeElement=x170.getElementById(x171);
this._closeDetachedMenuCallback=this.createCallback(this._closeDetachedMenu);
x170.addBubbleEventListener(this._closeElement,"click",this._closeDetachedMenuCallback);
 var x172=AdfRichUIPeer.CreateSubId(x168,"handle");
this._handleElement=x170.getElementById(x172);
this._stopCallback=this.createCallback(this._onHandleClick);
x170.addBubbleEventListener(this._handleElement,"mousedown",this._stopCallback);
}
 if (AdfPage.PAGE.isScreenReaderMode())
{
this._areScrollButtonsDisplayed=false;
 return;
}
 var x173=AdfRichUIPeer.CreateSubId(x168,"ScrollContent");
this._scrollContentElement=x170.getElementById(x173);
 var x174=this._scrollContentElement.rows;
 if (x174.length<this._maxDisplayItems)
{
this._areScrollButtonsDisplayed=false;
 return;
}
 var x175= new Array();
for(i=0;i<x174.length;i++)
{
 var x176=x174[i];
 if (x176.style.display!="none")
{
x175.push(x176);
}
}
this._areScrollButtonsDisplayed=x175.length>this._maxDisplayItems;
 if (this._areScrollButtonsDisplayed)
{
 var x177=AdfRichUIPeer.CreateSubId(x168,"ScrollUp");
this._scrollUpElement=x170.getElementById(x177);
this._scrollUpElement.style.display="block";
 var x178=AdfRichUIPeer.CreateSubId(x168,"sUpBg");
this._scrollUpBackgroundElement=x170.getElementById(x178);
 var x179=AdfRichUIPeer.CreateSubId(x168,"ScrollDown");
this._scrollDownElement=x170.getElementById(x179);
this._scrollDownElement.style.display="block";
 var x180=AdfRichUIPeer.CreateSubId(x168,"sDwnBg");
this._scrollDownBackgroundElement=x170.getElementById(x180);
 var x181=AdfRichUIPeer.CreateSubId(x168,"ScrollBox");
this._scrollBoxElement=x170.getElementById(x181);
 var x182=x175[0].offsetTop;
 var x183=x175[this._maxDisplayItems].offsetTop;
 var x184=x183 - x182;
this._scrollBoxElement.style.height=x184 + "px";
}
}
AdfDhtmlMenuPeer.prototype._createMenuPopupHints= function(x185,x186)
{
 var x187= new Object();
 var x188=this.getDomElement();
 var x189=this.getComponent();
x187[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x187[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
x187[AdfDhtmlPopupWindow.HINT_ALIGN_ELEMENT]=x188;
x187[AdfDhtmlPopupWindow.HINT_FOCUS]=(x186)?true:false;
x187[AdfDhtmlPopupWindow.HINT_TITLE]=x189.getText();
x187[AdfDhtmlPopupWindow.HINT_ANIMATE]=true;
 if (AdfPage.PAGE.isScreenReaderMode())
{
x187[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE]=true;
x187[AdfDhtmlPopupWindow.HINT_CLOSE_HANDLER]=this.createCallback(this._clearHighlight);
}
 else
 {
x187[AdfDhtmlPopupWindow.HINT_CLOSE_ON_ESCAPE]=false;
}
 if(x185==null||x185[AdfDhtmlPopupWindow.HINT_MOUSEPOSITION]==null)
{
 if (this._isSubMenu()||AdfMenuUtils.isInOverflow(x188))
{
x187[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_END_BEFORE;
}
 else
 {
x187[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START;
}
}
AdfCollections.copyInto(x187,x185);
 return x187;
}
AdfDhtmlMenuPeer.prototype._showFetchingDataPopup= function()
{
 var x190=AdfAgent.AGENT;
 var x191=this.getComponent();
 var x192=this.getDomElement();
 var x193=x192.getAttribute("id");
 var x194=AdfRichUIPeer.CreateSubId(x193,"lazy-fetch-message");
 var x195=x190.getElementById(x194);
 var x196=AdfDomUtils.getFirstChildElement(x195);
 var x197=this._createMenuPopupHints(null,false);
x197[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_INLINESELECTOR;
AdfDomUtils.setVisible(x196,true);
AdfDhtmlMenuPeer.superclass.showPopup.call(this,x191,x196,x197,x194);
}
AdfDhtmlMenuPeer.prototype._hideFetchingDataPopup= function()
{
 var x198=this.getComponent();
 var x199=this.getDomElement();
 var x200=x199.getAttribute("id");
 var x201=AdfRichUIPeer.CreateSubId(x200,"lazy-fetch-message");
AdfDhtmlMenuPeer.superclass.hidePopup.call(this,x198,x201);
}
AdfDhtmlMenuPeer.prototype._reattachMenu= function()
{
 if (!this.isDetached())
{
 return;
}
 var x202=this.getComponent();
 var x203=x202.getClientId();
AdfDhtmlMenuPeer._reattachedMenuId=x203;
AdfMenuUtils.addOpenMenu(x203);
AdfDhtmlMenuPeer._removeFromDetachedMenus(x203);
this._showShadow(false);
 var x204=this._calculateReattachPosition();
this._isDetached=false;
 if(AdfPage.PAGE.isAnimationEnabled())
{
 var x205={"left":x204.x,"top":x204.y};
this._animateReattach(x205);
}
 else {
this._moveShadow(true);
 var x206=this._getMenuPopup();
 if (x206)
{
x206.setAlignPosition(x204);
}
AdfDomUtils.removeCSSClassName(this._getMenuElement(),AdfMenuUtils.DETACHED_STYLE_CLASS);
}
}
AdfDhtmlMenuPeer.prototype._animateReattach= function(x207)
{
AdfDomUtils.removeCSSClassName(this._getMenuElement(),AdfMenuUtils.DETACHED_STYLE_CLASS);
 var x208=this._detachableWindow.getElement();
 var x209=x207.y;
 var x210=x207.x;
 var x211=300;
 var x212=[{"element":x208,"properties":x207}];
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_SLOW_FAST_SLOW,
x211,
x212,
null,AdfDhtmlMenuPeer._animateReattachComplete,[this,x209,x210]);}
AdfDhtmlMenuPeer._animateReattachComplete= function(x213)
{
 var x214=x213[0];
 var x215=x213[1];
 var x216=x213[2];
x214._moveShadow(true);
 var x217={y:x215,x:x216};
 var x218=x214._getMenuPopup();
 if (x218)
{
x218.setAlignPosition(x217);
}
}
AdfDhtmlMenuPeer.prototype._calculateReattachPosition= function()
{
 var x219=AdfPage.PAGE.getPositionManager();
 var x220=this.getDomElement();
 var x221=this._getMenuElement();
 var x222=AdfRichPopup.ALIGN_END_BEFORE;
 var x223=x221.clientHeight - 4;
 var x224=x221.clientWidth + AdfDhtmlShadowDecorator.getShadowSize();
 return x219.calculatePlacementPosition(x223,x224,x222,x220,null);
}
AdfDhtmlMenuPeer.prototype._contains= function(x225)
{
 var x226=this.getDomElement();
 var x227=AdfDomUtils.isAncestorOrSelf(x226,x225);
 if (this._getLazyState()=="noContent")
{
 return x227;
}
 var x228=AdfDomUtils.isAncestor(this._getMenuElement(),x225)
 return x227||x228;
}
AdfDhtmlMenuPeer.prototype._getParentId= function()
{
 if (!this._parentId)
{
 var x229=this.getDomElement().parentNode;
do
{
 var x230=x229.getAttribute("id");
x229=x229.parentNode;
}
while(!x230&&x229);
 if (x230)
this._parentId=x230;
}
 return this._parentId;
}
AdfDhtmlMenuPeer.prototype._getDepth= function()
{
 if (!this._depth)
{
 var x231=this.getDomElement();
this._depth=parseInt(x231.getAttribute(AdfMenuUtils.MENU_DEPTH_KEY));
}
 return this._depth;
}
AdfDhtmlMenuPeer.prototype._isSubMenu= function()
{
 return this._getDepth()>1;
}
AdfDhtmlMenuPeer.prototype._isDisabled= function()
{
 var x232=this.getDomElement();
 return (x232.disabled||AdfDomUtils.containsCSSClassName(x232,AdfRichUIPeer.DISABLED_STYLECLASS));
}
AdfDhtmlMenuPeer.prototype._isDetachable= function()
{
 var x233=navigator.userAgent.toLowerCase();
 if ((x233.indexOf("webkit")!= -1&&x233.indexOf("mobile")!= -1)||
AdfPage.PAGE.isScreenReaderMode())
{
 return false;
}
 var x234=this.getComponent();
 return x234.getDetachable();
}
AdfDhtmlMenuPeer.prototype._handleHideRequest= function(x235,x236)
{
AdfAssert.assert(!this.isDetached(),"this method is not intended for detached menus");
 if (this.isRootMenu())
{
 var x237=this.getDomElement();
AdfDomUtils.removeCSSClassName(x237,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
AdfDomUtils.removeCSSClassName(x237,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 if (AdfDhtmlMenuPeer._popupPeerWaitingForShow)
{
 var x238=AdfDhtmlMenuPeer._popupPeerWaitingForShow;
 if (this._contains(x238.getDomElement()))
{
AdfDhtmlMenuPeer.cancelShowing();
}
}
 if (this._scrollBoxElement)
{
this._scrollBoxElement.scrollTop=0;
}
AdfMenuUtils.removeOpenMenu(x236);
}
AdfDhtmlMenuPeer.prototype._createDetachableWindow= function()
{
 if(this._isMenuVisible())
{
this._detachableWindow= new AdfRepositionable(this._getMenuPopup(),this._handleElement);
this._detachableWindow.setDragStartHandler(this.createCallback(this._dragStart));
this._detachableWindow.setDragEndHandler(this.createCallback(this._dragEnd));
}
}
AdfDhtmlMenuPeer.prototype._dragStart= function()
{
this._deselectElement();
this._showShadow(false);
 var x239=this.getDomElement();
AdfMenuUtils.dismiss(x239,true);
 var x240=this._detachableWindow.getElement();
this._detachedMenuLeft=x240.style.left;
this._detachedMenuTop=x240.style.top;
 var x241=this.getComponent().getClientId();
AdfMenuUtils.removeOpenMenu(x241);
AdfDhtmlMenuPeer._addToDetachedMenus(x241);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to menu first becoming detached");
AdfMenuUtils.setMenuBarAutoOpenMode(false);
}
AdfDhtmlMenuPeer.prototype._dragEnd= function()
{
 var x242=this._getMenuPopup();
AdfAssert.assert(x242!=null,"menuPopup should not disappear during a drag.");
 if (!x242)
 return;
x242.setAlignElement(null);
 var x243={y:x242.getTop(),x:x242.getLeft()};
x242.setAlignPosition(x243);
this._makeDetached();
this._moveShadow(true);
x242.activate();
AdfMenuUtils.closeAllMenus();
}
AdfDhtmlMenuPeer.prototype._delayPopupHiding= function(x244)
{
 if (this._popupHidingHandle)
{
this._cancelHiding();
}
this._popupHidingHandle=AdfPage.PAGE.getDomWindow().setTimeout(
this.createCallback(this._delayPopupHidingCallback),
AdfDhtmlMenuPeer._OPEN_CLOSE_DELAY - x244
);
}
AdfDhtmlMenuPeer.prototype._delayPopupHidingCallback= function()
{
 var x245=this.getComponent();
 if(this.isPopupVisible(x245,x245.getClientId()))
{
this.hidePopup();
}
}
AdfDhtmlMenuPeer.prototype._delayShow= function()
{
AdfAssert.assert(!AdfPage.PAGE.isScreenReaderMode(),"do not call _delayShow in screen reader mode!")
AdfDhtmlMenuPeer.cancelShowing();
AdfDhtmlMenuPeer._popupShowingHandle=AdfPage.PAGE.getDomWindow().setTimeout(
this.createCallback(this._delayShowCallback),
AdfDhtmlMenuPeer._OPEN_CLOSE_DELAY
);
AdfDhtmlMenuPeer._popupPeerWaitingForShow=this;
}
AdfDhtmlMenuPeer.prototype._delayShowCallback= function()
{
 var x246=this.getComponent();
 if (!this.isPopupVisible(x246,x246.getClientId()))
{
 delete AdfDhtmlMenuPeer._popupPeerWaitingForShow;
 delete AdfDhtmlMenuPeer._popupShowingHandle;
this.show(null,false);
}
 else
 {
this._reattachMenu();
}
}
AdfDhtmlMenuPeer.prototype._cancelHiding= function()
{
 if (this._popupHidingHandle)
{
window.clearTimeout(this._popupHidingHandle);
 delete this._popupHidingHandle;
 var x247=AdfDhtmlMenuPeer._popupPeerWaitingForShow;
 if (x247)
{
 if(x247._getDepth()<=this._getDepth())
AdfDhtmlMenuPeer.cancelShowing();
}
}
}
AdfDhtmlMenuPeer.prototype._makeDetached= function()
{
AdfDomUtils.removeCSSClassName(this._handleElement,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
 var x248=this._detachableWindow.getElement();
this._isDetached=true;
this._detachedMenuLeft=x248.style.left;
this._detachedMenuTop=x248.style.top;
AdfDomUtils.addCSSClassName(this._getMenuElement(),AdfMenuUtils.DETACHED_STYLE_CLASS);
AdfMenuUtils.dismiss(this.getDomElement().parentNode,true,true);
}
AdfDhtmlMenuPeer.prototype._deselectElement= function()
{
 var x249=this.getDomElement();
AdfDomUtils.removeCSSClassName(x249,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfDomUtils.removeCSSClassName(x249,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlMenuPeer.prototype._closeDetachedMenu= function(x250)
{
 var x251=this.getComponent();
 var x252=x251.getClientId();
AdfDomUtils.removeCSSClassName(this._getMenuElement(),AdfMenuUtils.DETACHED_STYLE_CLASS);
this._isDetached=false;
 var x253=this.getDomElement();
AdfDomUtils.removeCSSClassName(x253,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfDhtmlMenuPeer._removeFromDetachedMenus(x252);
AdfDhtmlMenuPeer.superclass.hidePopup.call(this,x251,x252);
AdfMenuUtils.closeAllMenus();
AdfMenuUtils.restoreFocusToLastOpenedRootMenu();
}
AdfDhtmlMenuPeer.prototype._moveDetachable= function(x254,x255)
{
this._dragStart();
 var x256=this._detachableWindow.getElement();
x256.style.left=x256.offsetLeft + x254 + "px";
x256.style.top=x256.offsetTop + x255 + "px";
this._dragEnd();
}
AdfDhtmlMenuPeer.prototype._getShadowAnchor= function()
{
 var x257=this._getMenuPopup();
 if ((x257!=null)&&(x257.getShadowAnchor()!=null))
{
 return x257.getShadowAnchor();
}
}
AdfDhtmlMenuPeer.prototype._showShadow= function(x258)
{
 var x259=this._getShadowAnchor();
 if (AdfDhtmlShadowDecorator.hasShadowDecorator(x259))
{
AdfDhtmlShadowDecorator.showShadowDecorator(x259,x258);
}
}
AdfDhtmlMenuPeer.prototype._moveShadow= function(x260)
{
 var x261=this._getShadowAnchor();
 if ((x261!=null)&&(AdfDhtmlShadowDecorator.hasShadowDecorator(x261)))
{
AdfDhtmlShadowDecorator.moveShadowDecorator(x261);
AdfDhtmlShadowDecorator.showShadowDecorator(x261,x260);
}
}
AdfDhtmlMenuPeer.prototype._startScroll= function(x262,x263)
{
this._scrollDelta=AdfDhtmlMenuPeer._SCROLL_DELTA;
 if (x263)
{
this._scrollDelta=AdfDhtmlMenuPeer._JUMP_SCROLL_DELTA;
}
 if (!x262)
this._scrollDelta*= -1;
 if (x263)
{
this._scroll();
}
 else
 {
 var x264=this.createCallback(this._scroll);
this._scrollTimer=setInterval(x264,1);
}
}
AdfDhtmlMenuPeer.prototype._endScroll= function()
{
 if (this._scrollTimer)
clearInterval(this._scrollTimer);
this._scrollTimer=null;
 var x265=this._getMenuItemHeight();
 var x266=this._scrollBoxElement.scrollTop;
 var x267=x266%x265;
 if (x267==0)
{
 return;
}
 if (this._scrollDelta<0)
{
this._scrollBoxElement.scrollTop-=x267;
}
 else if (this._scrollDelta>0)
{
this._scrollBoxElement.scrollTop+=(x265 - x267);
}
}
AdfDhtmlMenuPeer.prototype._getMenuItemHeight= function()
{
 if (this._menuItemHeight!=null)
 return this._menuItemHeight;
 var x268=AdfDomUtils.getFirstChildElement(this._scrollContentElement);
 var x269=AdfDomUtils.getFirstChildElement(x268);
this._menuItemHeight=x269.clientHeight;
 if (this._menuItemHeight==0)
{
this._menuItemHeight=x269.scrollHeight;
}
 return this._menuItemHeight;
}
AdfDhtmlMenuPeer.prototype._scroll= function()
{
this._scrollBoxElement.scrollTop+=this._scrollDelta;
 var x270=this._scrollBoxElement.scrollTop;
 var x271=this._scrollContentElement.offsetHeight - this._scrollBoxElement.offsetHeight;
 if (x270<=0||x270>=x271)
{
this._endScroll();
}
this.updateScrollIconsState();
}
AdfDhtmlMenuPeer.prototype._getMenuElement= function()
{
 if (this._menuElement===undefined)
{
 var x272=this.getDomElement();
 var x273=x272.getAttribute("id");
 var x274=AdfRichUIPeer.CreateSubId(x273,"menu");
this._menuElement=AdfAgent.AGENT.getElementById(x274);
}
 return this._menuElement;
}
AdfDhtmlMenuPeer.prototype._getMenuPopup= function()
{
 var x275=this.getComponent();
 var x276=x275.getClientId();
 return this.getPopupWindow(x275,x276);
}
AdfDhtmlMenuPeer.prototype._isMenuVisible= function()
{
 return (this._getMenuPopup())?true:false;
}
AdfDhtmlMenuPeer.prototype._clearHighlight= function()
{
 if (this._getLazyState()!="contentLoaded")
{
 return;
}
 var x277=this._scrollContentElement||this._getMenuElement();
 var x278=x277.children[0].childNodes;
 var x279=x278.length;
for(var x280=0;x280<x279;x280++)
{
 var x281=x278[x280];
 if (x281&&(x281.nodeType==1))
{
AdfDomUtils.removeCSSClassName(x281,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfDomUtils.removeCSSClassName(x281,AdfMenuUtils.FOCUSED_STYLE_CLASS);
}
}
}
AdfDhtmlMenuPeer.prototype._getLazyState= function()
{
 if (this._lazyState==null)
{
 if (this.isContextMenu())
{
this._lazyState="contentLoaded";
}
 else
 {
 var x282=this.getComponent();
 var x283=x282.getContentDelivery();
this._lazyState=("lazy"==x283)?"noContent":"contentLoaded";
}
}
 return this._lazyState;
}
AdfDhtmlMenuPeer.prototype._setLazyState= function(x284)
{
this._lazyState=x284;
}

function AdfMenuUtils()
{
}
AdfObject.createSubclass(AdfMenuUtils);
AdfMenuUtils.InitClass= function()
{
this.SELECTED_STYLE_CLASS="p_AFSelected";
this.HIGHLIGHTED_STYLE_CLASS="p_AFHighlighted";
this.FOCUSED_STYLE_CLASS="p_AFFocused";
this.DEPRESSED_STYLE_CLASS="p_AFDepressed";
this.DETACHED_STYLE_CLASS="p_AFDetached";
this.MENU_DEPTH_KEY="_afrDth";
this.OVERFLOW_KEY="_afrOflw";
this.AFR_TARGETROWCURRENCY="_afrTargetRowCurrency";
this.AFR_TARGETCOMPONENTID="_afrTargetComponentId";
this._sOpenedMenus=[];
}
AdfMenuUtils.isOnMenuBar= function(x0)
{
 var x1=x0.getParent();
 return (x1&&x1 instanceof AdfRichMenuBar);
}
AdfMenuUtils.isInOverflow= function(x2)
{
 var x3=x2.parentNode.getAttribute(AdfMenuUtils.OVERFLOW_KEY);
 return (x3=="true");
}
AdfMenuUtils.isInMenu= function(x4)
{
 var x5=x4.getParent();
 return (x5&&x5 instanceof AdfRichMenu);
}
AdfMenuUtils.closeAllMenus= function(x6)
{
 var x7=this._sOpenedMenus;
 if (x7&&x7.length>0)
{
for(var x8=x7.length-1;x8>=0;x8--)
{
 var x9=x7[x8];
 var x10=AdfPage.PAGE.findComponent(x9);
 if(x10)
{
 var x11=x10.getPeer();
x11.hidePopup();
}
 else
 {
 delete x7[x8];
}
}
}
 if (x6)
{
AdfMenuUtils.restoreFocusToLastOpenedRootMenu()
}
}
AdfMenuUtils.GetLastOpenedRootMenuId= function()
{
 return AdfMenuUtils._sLastOpenedRootMenuId;
}
AdfMenuUtils.setLastOpenedRootMenuId= function(x12)
{
AdfMenuUtils._sLastOpenedRootMenuId=x12;
}
AdfMenuUtils.isMenuBarAutoOpenMode= function()
{
 return AdfMenuUtils._menuBarAutoOpenMode;
}
AdfMenuUtils.setMenuBarAutoOpenMode= function(x13)
{
 if (!AdfPage.PAGE.isScreenReaderMode())
{
AdfLogger.LOGGER.finest("menuBar auto open mode: " + AdfMenuUtils._menuBarAutoOpenMode + " -> " + x13);
AdfMenuUtils._menuBarAutoOpenMode=x13;
}
}
AdfMenuUtils.restoreFocusToLastOpenedRootMenu= function()
{
 var x14=AdfMenuUtils._sLastOpenedRootMenuId;
 if (x14)
{
 var x15=AdfPage.PAGE.findComponent(x14);
 if (x15!=null)
{
 var x16=x15.getPeer();
 var x17=x16.getDomElement();
x16.focus(x15);
AdfMenuUtils.highlightRootMenuItem(x17);
}
}
}
AdfMenuUtils.highlightRootMenuItem= function(x18)
{
 var x19=x18.getAttribute("id");
 var x20=AdfMenuUtils._highlightedRootMenuItemId;
 if (x20&&x20!=x19)
{
AdfMenuUtils.unhighlightRootMenuItem();
}
AdfDomUtils.addCSSClassName(x18,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfMenuUtils._highlightedRootMenuItemId=x19;
}
AdfMenuUtils.unhighlightRootMenuItem= function()
{
 var x21=AdfAgent.AGENT.getElementById(AdfMenuUtils._highlightedRootMenuItemId);
 if (x21)
{
AdfDomUtils.removeCSSClassName(x21,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
AdfMenuUtils._highlightedRootMenuItemId=null;
}
AdfMenuUtils.dismiss= function(x22,x23,x24)
{
 var x25=this._sOpenedMenus;
 if (!x25||x25.length==0)
{
 return;
}
for(var x26=x25.length - 1;x26>=0;x26--)
{
 var x27=x25[x26];
 var x28=AdfPage.PAGE.findComponent(x27);
 if(!x28){
 delete x25[x26];
continue;
}
 var x29=x28.getPeer();
 if (x29._contains(x22))
{
break;
}
 if (x24)
{
x25.pop();
}
 else
 {
x29._deselectElement(); if (x23)
x29.hidePopup();
 else
 x29._delayPopupHiding(x26);
}
}
}
AdfMenuUtils.areMenusOpened= function()
{
 return this._sOpenedMenus&&this._sOpenedMenus.length>0;
}
AdfMenuUtils.isMenuOpen= function(x30)
{
 return AdfCollections.indexOf(this._sOpenedMenus,x30)>=0;
}
AdfMenuUtils.addOpenMenu= function(x31)
{
 if (!this.isMenuOpen(x31))
{
this._sOpenedMenus.push(x31);
}
}
AdfMenuUtils.removeOpenMenu= function(x32)
{
AdfCollections.removeArrayValue(this._sOpenedMenus,x32);
}
AdfMenuUtils.getContextMenuItemTargetAttrs= function(x33)
{
 var x34=null;
 var x35=x33.getParent();
while(x35!=null&&((x35 instanceof AdfRichMenu)||x35 instanceof AdfRichPopup))
{
 var x36;
 if((x36=x35[this.AFR_TARGETROWCURRENCY])!=null)
{
x34={targetRowCurrency:x36,
targetComponentId:x35[this.AFR_TARGETCOMPONENTID]};
break;
}
x35=x35.getParent();
}
 return x34;
}
AdfMenuUtils.setContextMenuItemTargetAttrs= function(x37,x38)
{
 var x39=x37.getPropertyKeys();
 var x40=this.AFR_TARGETROWCURRENCY;
 var x41=this.AFR_TARGETCOMPONENTID;
 if(x39[x40]==null)
{
x39[x40]=x39[x41]={type:"String"};
AdfRichUIPeer.addSuppressedPPRAttributes(this,x40,x41);
}
x37.setProperty(x41,null);
x37.setProperty(x40,null);
x37.setProperty(x41,x38.targetComponentId);
x37.setProperty(x40,x38.targetRowCurrency);
}
AdfMenuUtils.handleArrowKeys= function(x42,x43,x44)
{
 var x45=x42.getNativeEvent();
 if (x45.ctrlKey)
{
 return;
}
 if (this.isInOverflow(x43))
{
this._handleInMenuBarOverflowArrowKeys(x42,x43,x44);
}
 else if (this.isOnMenuBar(x44))
{
this._handleInMenuBarArrowKeys(x42,x43,x44);
}
 else if (this.isInMenu(x44))
{
this._handleInMenuArrowKeys(x42,x43,x44);
}
}
AdfMenuUtils._handleInMenuBarArrowKeys= function(x46,x47,x48)
{
 var x49=AdfAgent.AGENT;
 var x50=x46.getNativeEvent();
 var x51=x49.getKeyCode(x50);
switch(x51)
{
 case AdfKeyStroke.ARROWDOWN_KEY:
 if (x48 instanceof AdfRichMenu)
{
AdfDomUtils.addCSSClassName(x47,this.DEPRESSED_STYLE_CLASS);
 var x52=x48.getPeer();
x52.show(null,true);
x46.cancel();
}
break;
default:
}
}
AdfMenuUtils._handleInMenuBarOverflowArrowKeys= function(x53,x54,x55)
{
 var x56=AdfAgent.AGENT;
 var x57=x53.getNativeEvent();
 var x58=x56.getKeyCode(x57);
switch(x58)
{
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if (x55 instanceof AdfRichMenu)
{
 var x59=x55.getPeer();
x59.show(null,true);
}
x53.cancel();
break;
default:
}
}
AdfMenuUtils._handleInMenuArrowKeys= function(x60,x61,x62)
{
 var x63=AdfAgent.AGENT;
 var x64=x60.getNativeEvent();
 var x65=x63.getKeyCode(x64);
 var x66=x62.getParent();
switch(x65)
{
 case AdfKeyStroke.ARROWUP_KEY:
AdfMenuUtils._moveHighlightToPreviousMenuItem(x61,x62);
x60.cancel();
x66.getPeer().updateScrollIconsState();
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
AdfMenuUtils._moveHighlightToNextMenuItem(x61,x62);
x60.cancel();
x66.getPeer().updateScrollIconsState();
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
this._handleMenuItemLeftArrowKey(x66);
x60.cancel();
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if (x62 instanceof AdfRichMenu)
{
 var x67=x62.getPeer();
x67.show(null,true);
x60.cancel();
}
 else
 {
this._handleMenuItemRightArrowKey(x66);
x60.cancel();
}
break;
default:
}
}
AdfMenuUtils._handleMenuItemLeftArrowKey= function(x68)
{
 var x69=x68.getPeer();
 if (this.isOnMenuBar(x68))
{
x69.focus(x68);
x69.close(true,true);
this.MenuBarAutoOpenMode=false;
 var x70=x68.getParent();
 var x71=x70.getPeer();
 var x72=x71.getDomElement();
 var x73=x69.getDomElement();
AdfFocusUtils.focusPreviousTabStop(x73,x72);
}
 else if (!x69.isDetached()&& !x69.isContextMenu())
{
x69.focus(x68);
x69.close(true,true);
}
}
AdfMenuUtils._handleMenuItemRightArrowKey= function(x74)
{
 if (!(x74 instanceof AdfRichMenu))
{
 return;
}
 var x75=x74.getPeer();
 if (x75.isDetached()||x75.isContextMenu())
{
 return;
}
 if (this.isOnMenuBar(x74))
{
x75.focus(x74);
x75.close(true,true);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to right arrow key pressed on root menu item");
this.setMenuBarAutoOpenMode(false);
 var x76=x74.getParent();
 var x77=x76.getPeer();
 var x78=x77.getDomElement();
 var x79=x75.getDomElement();
AdfFocusUtils.focusNextTabStop(x79,x78,true);
 return;
}
this._handleMenuItemRightArrowKey(x74.getParent());
}
AdfMenuUtils._moveHighlightToPreviousMenuItem= function(x80,x81)
{
AdfFocusUtils.focusPreviousTabStop(x80,x80.parentNode);
 var x82=x81.getParent();
 if (x82&&x82 instanceof AdfRichMenu)
{
x82.getPeer().updateScrollIconsState();
}
}
AdfMenuUtils._moveHighlightToNextMenuItem= function(x83,x84)
{
AdfFocusUtils.focusNextTabStop(x83,x83.parentNode,true);
 var x85=x84.getParent();
 if (x85&&x85 instanceof AdfRichMenu)
{
x85.getPeer().updateScrollIconsState();
}
}

AdfUIComponents.createComponentClass("AdfRichCommandMenuItem",
{
componentType:"oracle.adf.RichCommandMenuItem",
propertyKeys:[{name:"text",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"accessKey",type:"String"}
,{name:"partialSubmit",type:"Boolean","default":true}
,{name:"icon",type:"String"}
,{name:"selected",type:"Boolean","default":false}
,{name:"selectedText",type:"String"}
,{name:"type",type:"String"}
,"accelerator"
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

AdfRichCommandMenuItem.prototype.GetChanges= function()
{
 var x0=AdfRichCommandMenuItem.superclass.GetChanges.call(this);
 var x1=x0[AdfRichCommandMenuItem.ACCELERATOR];
 if (x1)
x0[AdfRichCommandMenuItem.ACCELERATOR]=x1.toMarshalledString();
 return x0;
}
function AdfMenuUtils()
{
}
AdfObject.createSubclass(AdfMenuUtils);
AdfMenuUtils.InitClass= function()
{
this.SELECTED_STYLE_CLASS="p_AFSelected";
this.HIGHLIGHTED_STYLE_CLASS="p_AFHighlighted";
this.FOCUSED_STYLE_CLASS="p_AFFocused";
this.DEPRESSED_STYLE_CLASS="p_AFDepressed";
this.DETACHED_STYLE_CLASS="p_AFDetached";
this.MENU_DEPTH_KEY="_afrDth";
this.OVERFLOW_KEY="_afrOflw";
this.AFR_TARGETROWCURRENCY="_afrTargetRowCurrency";
this.AFR_TARGETCOMPONENTID="_afrTargetComponentId";
this._sOpenedMenus=[];
}
AdfMenuUtils.isOnMenuBar= function(x0)
{
 var x1=x0.getParent();
 return (x1&&x1 instanceof AdfRichMenuBar);
}
AdfMenuUtils.isInOverflow= function(x2)
{
 var x3=x2.parentNode.getAttribute(AdfMenuUtils.OVERFLOW_KEY);
 return (x3=="true");
}
AdfMenuUtils.isInMenu= function(x4)
{
 var x5=x4.getParent();
 return (x5&&x5 instanceof AdfRichMenu);
}
AdfMenuUtils.closeAllMenus= function(x6)
{
 var x7=this._sOpenedMenus;
 if (x7&&x7.length>0)
{
for(var x8=x7.length-1;x8>=0;x8--)
{
 var x9=x7[x8];
 var x10=AdfPage.PAGE.findComponent(x9);
 if(x10)
{
 var x11=x10.getPeer();
x11.hidePopup();
}
 else
 {
 delete x7[x8];
}
}
}
 if (x6)
{
AdfMenuUtils.restoreFocusToLastOpenedRootMenu()
}
}
AdfMenuUtils.GetLastOpenedRootMenuId= function()
{
 return AdfMenuUtils._sLastOpenedRootMenuId;
}
AdfMenuUtils.setLastOpenedRootMenuId= function(x12)
{
AdfMenuUtils._sLastOpenedRootMenuId=x12;
}
AdfMenuUtils.isMenuBarAutoOpenMode= function()
{
 return AdfMenuUtils._menuBarAutoOpenMode;
}
AdfMenuUtils.setMenuBarAutoOpenMode= function(x13)
{
 if (!AdfPage.PAGE.isScreenReaderMode())
{
AdfLogger.LOGGER.finest("menuBar auto open mode: " + AdfMenuUtils._menuBarAutoOpenMode + " -> " + x13);
AdfMenuUtils._menuBarAutoOpenMode=x13;
}
}
AdfMenuUtils.restoreFocusToLastOpenedRootMenu= function()
{
 var x14=AdfMenuUtils._sLastOpenedRootMenuId;
 if (x14)
{
 var x15=AdfPage.PAGE.findComponent(x14);
 if (x15!=null)
{
 var x16=x15.getPeer();
 var x17=x16.getDomElement();
x16.focus(x15);
AdfMenuUtils.highlightRootMenuItem(x17);
}
}
}
AdfMenuUtils.highlightRootMenuItem= function(x18)
{
 var x19=x18.getAttribute("id");
 var x20=AdfMenuUtils._highlightedRootMenuItemId;
 if (x20&&x20!=x19)
{
AdfMenuUtils.unhighlightRootMenuItem();
}
AdfDomUtils.addCSSClassName(x18,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfMenuUtils._highlightedRootMenuItemId=x19;
}
AdfMenuUtils.unhighlightRootMenuItem= function()
{
 var x21=AdfAgent.AGENT.getElementById(AdfMenuUtils._highlightedRootMenuItemId);
 if (x21)
{
AdfDomUtils.removeCSSClassName(x21,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
AdfMenuUtils._highlightedRootMenuItemId=null;
}
AdfMenuUtils.dismiss= function(x22,x23,x24)
{
 var x25=this._sOpenedMenus;
 if (!x25||x25.length==0)
{
 return;
}
for(var x26=x25.length - 1;x26>=0;x26--)
{
 var x27=x25[x26];
 var x28=AdfPage.PAGE.findComponent(x27);
 if(!x28){
 delete x25[x26];
continue;
}
 var x29=x28.getPeer();
 if (x29._contains(x22))
{
break;
}
 if (x24)
{
x25.pop();
}
 else
 {
x29._deselectElement(); if (x23)
x29.hidePopup();
 else
 x29._delayPopupHiding(x26);
}
}
}
AdfMenuUtils.areMenusOpened= function()
{
 return this._sOpenedMenus&&this._sOpenedMenus.length>0;
}
AdfMenuUtils.isMenuOpen= function(x30)
{
 return AdfCollections.indexOf(this._sOpenedMenus,x30)>=0;
}
AdfMenuUtils.addOpenMenu= function(x31)
{
 if (!this.isMenuOpen(x31))
{
this._sOpenedMenus.push(x31);
}
}
AdfMenuUtils.removeOpenMenu= function(x32)
{
AdfCollections.removeArrayValue(this._sOpenedMenus,x32);
}
AdfMenuUtils.getContextMenuItemTargetAttrs= function(x33)
{
 var x34=null;
 var x35=x33.getParent();
while(x35!=null&&((x35 instanceof AdfRichMenu)||x35 instanceof AdfRichPopup))
{
 var x36;
 if((x36=x35[this.AFR_TARGETROWCURRENCY])!=null)
{
x34={targetRowCurrency:x36,
targetComponentId:x35[this.AFR_TARGETCOMPONENTID]};
break;
}
x35=x35.getParent();
}
 return x34;
}
AdfMenuUtils.setContextMenuItemTargetAttrs= function(x37,x38)
{
 var x39=x37.getPropertyKeys();
 var x40=this.AFR_TARGETROWCURRENCY;
 var x41=this.AFR_TARGETCOMPONENTID;
 if(x39[x40]==null)
{
x39[x40]=x39[x41]={type:"String"};
AdfRichUIPeer.addSuppressedPPRAttributes(this,x40,x41);
}
x37.setProperty(x41,null);
x37.setProperty(x40,null);
x37.setProperty(x41,x38.targetComponentId);
x37.setProperty(x40,x38.targetRowCurrency);
}
AdfMenuUtils.handleArrowKeys= function(x42,x43,x44)
{
 var x45=x42.getNativeEvent();
 if (x45.ctrlKey)
{
 return;
}
 if (this.isInOverflow(x43))
{
this._handleInMenuBarOverflowArrowKeys(x42,x43,x44);
}
 else if (this.isOnMenuBar(x44))
{
this._handleInMenuBarArrowKeys(x42,x43,x44);
}
 else if (this.isInMenu(x44))
{
this._handleInMenuArrowKeys(x42,x43,x44);
}
}
AdfMenuUtils._handleInMenuBarArrowKeys= function(x46,x47,x48)
{
 var x49=AdfAgent.AGENT;
 var x50=x46.getNativeEvent();
 var x51=x49.getKeyCode(x50);
switch(x51)
{
 case AdfKeyStroke.ARROWDOWN_KEY:
 if (x48 instanceof AdfRichMenu)
{
AdfDomUtils.addCSSClassName(x47,this.DEPRESSED_STYLE_CLASS);
 var x52=x48.getPeer();
x52.show(null,true);
x46.cancel();
}
break;
default:
}
}
AdfMenuUtils._handleInMenuBarOverflowArrowKeys= function(x53,x54,x55)
{
 var x56=AdfAgent.AGENT;
 var x57=x53.getNativeEvent();
 var x58=x56.getKeyCode(x57);
switch(x58)
{
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if (x55 instanceof AdfRichMenu)
{
 var x59=x55.getPeer();
x59.show(null,true);
}
x53.cancel();
break;
default:
}
}
AdfMenuUtils._handleInMenuArrowKeys= function(x60,x61,x62)
{
 var x63=AdfAgent.AGENT;
 var x64=x60.getNativeEvent();
 var x65=x63.getKeyCode(x64);
 var x66=x62.getParent();
switch(x65)
{
 case AdfKeyStroke.ARROWUP_KEY:
AdfMenuUtils._moveHighlightToPreviousMenuItem(x61,x62);
x60.cancel();
x66.getPeer().updateScrollIconsState();
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
AdfMenuUtils._moveHighlightToNextMenuItem(x61,x62);
x60.cancel();
x66.getPeer().updateScrollIconsState();
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
this._handleMenuItemLeftArrowKey(x66);
x60.cancel();
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if (x62 instanceof AdfRichMenu)
{
 var x67=x62.getPeer();
x67.show(null,true);
x60.cancel();
}
 else
 {
this._handleMenuItemRightArrowKey(x66);
x60.cancel();
}
break;
default:
}
}
AdfMenuUtils._handleMenuItemLeftArrowKey= function(x68)
{
 var x69=x68.getPeer();
 if (this.isOnMenuBar(x68))
{
x69.focus(x68);
x69.close(true,true);
this.MenuBarAutoOpenMode=false;
 var x70=x68.getParent();
 var x71=x70.getPeer();
 var x72=x71.getDomElement();
 var x73=x69.getDomElement();
AdfFocusUtils.focusPreviousTabStop(x73,x72);
}
 else if (!x69.isDetached()&& !x69.isContextMenu())
{
x69.focus(x68);
x69.close(true,true);
}
}
AdfMenuUtils._handleMenuItemRightArrowKey= function(x74)
{
 if (!(x74 instanceof AdfRichMenu))
{
 return;
}
 var x75=x74.getPeer();
 if (x75.isDetached()||x75.isContextMenu())
{
 return;
}
 if (this.isOnMenuBar(x74))
{
x75.focus(x74);
x75.close(true,true);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to right arrow key pressed on root menu item");
this.setMenuBarAutoOpenMode(false);
 var x76=x74.getParent();
 var x77=x76.getPeer();
 var x78=x77.getDomElement();
 var x79=x75.getDomElement();
AdfFocusUtils.focusNextTabStop(x79,x78,true);
 return;
}
this._handleMenuItemRightArrowKey(x74.getParent());
}
AdfMenuUtils._moveHighlightToPreviousMenuItem= function(x80,x81)
{
AdfFocusUtils.focusPreviousTabStop(x80,x80.parentNode);
 var x82=x81.getParent();
 if (x82&&x82 instanceof AdfRichMenu)
{
x82.getPeer().updateScrollIconsState();
}
}
AdfMenuUtils._moveHighlightToNextMenuItem= function(x83,x84)
{
AdfFocusUtils.focusNextTabStop(x83,x83.parentNode,true);
 var x85=x84.getParent();
 if (x85&&x85 instanceof AdfRichMenu)
{
x85.getPeer().updateScrollIconsState();
}
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlCommandMenuItemPeer");
AdfDhtmlCommandMenuItemPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichCommandMenuItem);
AdfObject.ensureClassInitialization(AdfMenuUtils);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE
);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichCommandMenuItem.DISABLED,
AdfRichCommandMenuItem.SELECTED);
this._AFR_GROUPID="_afrGrp";
}
AdfDhtmlCommandMenuItemPeer.prototype.Init= function(x0)
{
x0.getParent();
AdfDhtmlCommandMenuItemPeer.superclass.Init.call(this,x0);
}
AdfDhtmlCommandMenuItemPeer.prototype.InitDomElement= function(x1,x2)
{
AdfDhtmlCommandMenuItemPeer.superclass.InitDomElement.call(this,x1,x2);
 var x3=x1.getAccelerator();
 if (x3!=null)
{
AdfRichUIPeer.registerKeyStroke(x1,x3,this._execute);
}
}
AdfDhtmlCommandMenuItemPeer.prototype.ComponentRemoved= function(x4)
{
 var x5=x4.getAccelerator();
 if (x5!=null)
{
AdfRichUIPeer.unregisterKeyStroke(x4,x5);
}
AdfDhtmlCommandMenuItemPeer.superclass.ComponentRemoved.call(this,x4);
}
AdfDhtmlCommandMenuItemPeer.prototype.GetAccessibleName= function()
{
 var x6=this.getComponent();
 return x6.getText();
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentKeyUp= function(x7)
{
 var x8=x7.getNativeEvent();
 if (x8.ctrlKey)
 return;
 var x9=AdfAgent.AGENT;
 var x10=x9.getKeyCode(x8);
 var x11=this.getDomElement();
 var x12;
switch(x10)
{
 case AdfKeyStroke.SPACE_KEY:
 case AdfKeyStroke.ENTER_KEY:
this._execute();
x12=true;
break;
 case AdfKeyStroke.HOME_KEY:
AdfFocusUtils.focusFirstTabStop(x11.parentNode);
x12=true;
break;
 case AdfKeyStroke.END_KEY:
AdfFocusUtils.focusLastTabStop(x11.parentNode);
x12=true;
break;
default:
 return;
}
 if(x12)
{
x7.cancel();
}
 var x13=this.getComponent();
 var x14=x13.getParent();
 if (x14&&x14 instanceof AdfRichMenu)
{
x14.getPeer().updateScrollIconsState();
}
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentKeyDown= function(x15)
{
 if (x15.isCanceled()||this._isDisabled())
{
 return;
}
 var x16=x15.getKeyCode();
 var x17=AdfAgent.AGENT;
 if (x16==AdfKeyStroke.ENTER_KEY)
{
x15.cancel();
x15.stopBubbling();
 return;
}
 if (x17.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_DOWN_EVENT_TYPE)
{
 var x18=this.getDomElement();
 var x19=this.getComponent();
AdfMenuUtils.handleArrowKeys(x15,x18,x19);
}
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentKeyPress= function(x20)
{
 if (!x20.isCanceled()&&
 !this._isDisabled()&&
AdfAgent.AGENT.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_PRESS_EVENT_TYPE)
{
 var x21=this.getDomElement();
 var x22=this.getComponent();
AdfMenuUtils.handleArrowKeys(x20,x21,x22);
}
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentFocus= function(x23)
{
 if (this._isDisabled())
{
 return;
}
x23.cancel();
 var x24=this.getDomElement();
AdfDhtmlMenuPeer.cancelShowing();
 var x25=this.getComponent();
 if (AdfMenuUtils.isInMenu(x25))
{
AdfDomUtils.addCSSClassName(x24,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 else {
 if (AdfMenuUtils.isMenuBarAutoOpenMode())
{
AdfMenuUtils.closeAllMenus(false);
}
AdfMenuUtils.highlightRootMenuItem(x24);
}
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentMouseDown= function(x26)
{
 if (this._isDisabled()|| !x26.isLeftButtonPressed())
{
 return;
}
 var x27=this.getDomElement();
AdfDomUtils.addCSSClassName(x27,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentMouseUp= function(x28)
{
 if (this._isDisabled()|| !x28.isLeftButtonPressed())
{
 return;
}
 var x29=this.getDomElement();
AdfDomUtils.removeCSSClassName(x29,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentMouseOver= function(x30)
{
 var x31=this.getComponent();
 if (this._isDisabled())
{
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&&AdfMenuUtils.isOnMenuBar(x31))
{
AdfMenuUtils.closeAllMenus(false);
}
 return;
}
x30.cancel();
 var x32=this.getDomElement();
 var x33=AdfFocusUtils.containsFocus(x32);
 if (AdfMenuUtils.isInMenu(x31))
{
AdfDomUtils.addCSSClassName(x32,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfMenuUtils.dismiss(x32,false);
 if (!x33)
{
this.focus(x31);
}
}
 else {
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&& !x33)
{
this.focus(x31);
}
 else
 {
AdfMenuUtils.highlightRootMenuItem(x32);
}
}
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentMouseOut= function(x34)
{
x34.cancel();
AdfMenuUtils.unhighlightRootMenuItem();
 if (this._isDisabled())
{
 return;
}
 var x35=this.getComponent();
 if (AdfMenuUtils.isInMenu(x35))
{
this._deselectElement();
}
 var x36=this.getDomElement();
AdfDomUtils.removeCSSClassName(x36,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentBlur= function(x37)
{
this._deselectElement();
}
AdfDhtmlCommandMenuItemPeer.prototype.HandleComponentClick= function(x38)
{
 if (!this._isDisabled()&&x38.isLeftButtonPressed())
{
this._execute();
}
x38.cancel();
}
AdfDhtmlCommandMenuItemPeer.prototype.ComponentDisabledChanged= function(
x39,
x40,
x41,
x42)
{
 var x43=page.isScreenReaderMode();
 if (x41==true)
{
AdfDomUtils.addCSSClassName(x40,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x43)
{
 var x44=AdfDomUtils.getFirstChildElement(x40);
x44.setAttribute("aria-disabled","true");
x44.removeAttribute("href");
}
 else
 {
 var x45=(AdfMenuUtils.isInMenu(x39))?x40:
AdfDomUtils.getFirstChildElement(x40);
x45.removeAttribute("tabIndex");
}
}
 else {
AdfDomUtils.removeCSSClassName(x40,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x43)
{
 var x46=AdfDomUtils.getFirstChildElement(x40);
x46.removeAttribute("aria-disabled");
x46.setAttribute("href","#");
}
 else
 {
 var x47=(AdfMenuUtils.isInMenu(x39))?x40:
AdfDomUtils.getFirstChildElement(x40);
x47.setAttribute("tabIndex","0");
}
}
}
AdfDhtmlCommandMenuItemPeer.prototype.ComponentSelectedChanged= function(
x48,
x49,
x50,
x51)
{
 var x52=AdfPage.PAGE.isScreenReaderMode();
 var x53=x48.getType();
 if (x50)
{
AdfDomUtils.addCSSClassName(x49,AdfMenuUtils.SELECTED_STYLE_CLASS);
 if (x52&&(x53=="check"||x53=="radio"))
{
 var x54=AdfDomUtils.getFirstChildElement(x49);
x54.setAttribute("aria-checked","true");
}
 if (x53=="radio")
{
this._toggleRadioGroupItems();
}
}
 else
 {
AdfDomUtils.removeCSSClassName(x49,AdfMenuUtils.SELECTED_STYLE_CLASS);
 if (x52&&(x53=="check"||x53=="radio"))
{
 var x55=AdfDomUtils.getFirstChildElement(x49);
x55.removeAttribute("aria-checked");
}
}
}
AdfDhtmlCommandMenuItemPeer.prototype._execute= function()
{
 if (this._isDisabled())
{
 return;
}
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to commandMenuItem execute");
AdfMenuUtils.setMenuBarAutoOpenMode(false);
 var x56=this.getComponent();
 var x57=x56.getParent();
while(x57 instanceof AdfRichMenu)
{
x57=x57.getParent();
}
 if (x57 instanceof AdfRichPopup){
AdfMenuUtils.closeAllMenus(false);
x57.getPeer().hide(x57);
}
 else
 {
 var x58=AdfMenuUtils.isInMenu(x56);
AdfMenuUtils.closeAllMenus(x58);
}
 var x59=AdfMenuUtils.getContextMenuItemTargetAttrs(x56);
 if(x59!=null)
{
AdfMenuUtils.setContextMenuItemTargetAttrs(x56,x59);
}
 var x60= new AdfActionEvent(x56);
x60.queue(x56.getPartialSubmit());
 if(!x60.isCanceled())
{
 var x61=x56.getType();
 if (x61=="check"||x61=="antonym")
{
x56.setSelected(!x56.getSelected());
}
 else if (x61=="radio")
{
this._toggleRadioGroupItems();
}
}
}
AdfDhtmlCommandMenuItemPeer.prototype._toggleRadioGroupItems= function()
{
 var x62=this.getComponent();
 var x63=this.getDomElement();
 var x64=this._getGroupId(x63);
 if (x64==null)
{
AdfLogger.LOGGER.warning("Unexpected to have commandMenuItem without a group Id.");
x62.setSelected(!x62.getSelected());
 return;
}
 if (AdfMenuUtils.isInMenu(x62))
{
this._toggleMenuRadioGroupItems(x64);
}
 else if (AdfMenuUtils.isOnMenuBar(x62))
{
this._toggleMenuBarRadioGroupItems(x64);
}
x62.setSelected(true);
}
AdfDhtmlCommandMenuItemPeer.prototype._toggleMenuRadioGroupItems= function(x65)
{
 var x66=this.getComponent();
 var x67=this.getDomElement();
 var x68=x67.parentNode.childNodes;
for(var x69=0;x69<x68.length;x69++)
{
 var x70=x68[x69];
 var x71=this._getGroupId(x70);
 if (x65==x71)
{
 var x72=x70.id;
 if (x72)
{
 var x73=AdfPage.PAGE.findComponent(x72);
 if ((x73!=x66)&&x73.getType&&(x73.getType()=="radio"))
{
x73.setSelected(false);
}
}
}
}
}
AdfDhtmlCommandMenuItemPeer.prototype._toggleMenuBarRadioGroupItems= function(x74)
{
 var x75=this.getComponent();
 var x76=x75.getParent();
 var x77=x76.getPeer().getDescendantComponents(x76);
for(var x78=0;x78<x77.length;x78++)
{
 var x79=x77[x78];
 var x80=x79.getPeer();
 if (x80==null)
{
continue;
}
 var x81=x80.getDomElement();
 var x82=this._getGroupId(x81);
 if (x74==x82)
{
 if ((x79!=x75)&&x79.getType&&(x79.getType()=="radio"))
{
x79.setSelected(false);
}
}
}
}
AdfDhtmlCommandMenuItemPeer.prototype._getGroupId= function(x83)
{
 if (x83.getAttribute)
{
 return x83.getAttribute(AdfDhtmlCommandMenuItemPeer._AFR_GROUPID)
}
 else
 {
 return null;
}
}
AdfDhtmlCommandMenuItemPeer.prototype._deselectElement= function()
{
 var x84=this.getDomElement();
AdfDomUtils.removeCSSClassName(x84,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
AdfDhtmlCommandMenuItemPeer.prototype._isDisabled= function()
{
 var x85=this.getDomElement();
 return (x85.disabled||AdfDomUtils.containsCSSClassName(x85,AdfRichUIPeer.DISABLED_STYLECLASS));
}

AdfUIComponents.createComponentClass("AdfRichGoMenuItem",
{
componentType:"oracle.adf.RichGoMenuItem",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,"accelerator"
,{name:"accessKey",type:"String"}
,{name:"icon",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"targetFrame",type:"String"}
,{name:"text",type:"String"}
],
superclass:AdfUIGo
});

AdfRichGoMenuItem.prototype.GetChanges= function()
{
 var x0=AdfRichGoMenuItem.superclass.GetChanges.call(this);
 var x1=x0[AdfRichGoMenuItem.ACCELERATOR];
 if (x1)
x0[AdfRichGoMenuItem.ACCELERATOR]=x1.toMarshalledString();
 return x0;
}
function AdfMenuUtils()
{
}
AdfObject.createSubclass(AdfMenuUtils);
AdfMenuUtils.InitClass= function()
{
this.SELECTED_STYLE_CLASS="p_AFSelected";
this.HIGHLIGHTED_STYLE_CLASS="p_AFHighlighted";
this.FOCUSED_STYLE_CLASS="p_AFFocused";
this.DEPRESSED_STYLE_CLASS="p_AFDepressed";
this.DETACHED_STYLE_CLASS="p_AFDetached";
this.MENU_DEPTH_KEY="_afrDth";
this.OVERFLOW_KEY="_afrOflw";
this.AFR_TARGETROWCURRENCY="_afrTargetRowCurrency";
this.AFR_TARGETCOMPONENTID="_afrTargetComponentId";
this._sOpenedMenus=[];
}
AdfMenuUtils.isOnMenuBar= function(x0)
{
 var x1=x0.getParent();
 return (x1&&x1 instanceof AdfRichMenuBar);
}
AdfMenuUtils.isInOverflow= function(x2)
{
 var x3=x2.parentNode.getAttribute(AdfMenuUtils.OVERFLOW_KEY);
 return (x3=="true");
}
AdfMenuUtils.isInMenu= function(x4)
{
 var x5=x4.getParent();
 return (x5&&x5 instanceof AdfRichMenu);
}
AdfMenuUtils.closeAllMenus= function(x6)
{
 var x7=this._sOpenedMenus;
 if (x7&&x7.length>0)
{
for(var x8=x7.length-1;x8>=0;x8--)
{
 var x9=x7[x8];
 var x10=AdfPage.PAGE.findComponent(x9);
 if(x10)
{
 var x11=x10.getPeer();
x11.hidePopup();
}
 else
 {
 delete x7[x8];
}
}
}
 if (x6)
{
AdfMenuUtils.restoreFocusToLastOpenedRootMenu()
}
}
AdfMenuUtils.GetLastOpenedRootMenuId= function()
{
 return AdfMenuUtils._sLastOpenedRootMenuId;
}
AdfMenuUtils.setLastOpenedRootMenuId= function(x12)
{
AdfMenuUtils._sLastOpenedRootMenuId=x12;
}
AdfMenuUtils.isMenuBarAutoOpenMode= function()
{
 return AdfMenuUtils._menuBarAutoOpenMode;
}
AdfMenuUtils.setMenuBarAutoOpenMode= function(x13)
{
 if (!AdfPage.PAGE.isScreenReaderMode())
{
AdfLogger.LOGGER.finest("menuBar auto open mode: " + AdfMenuUtils._menuBarAutoOpenMode + " -> " + x13);
AdfMenuUtils._menuBarAutoOpenMode=x13;
}
}
AdfMenuUtils.restoreFocusToLastOpenedRootMenu= function()
{
 var x14=AdfMenuUtils._sLastOpenedRootMenuId;
 if (x14)
{
 var x15=AdfPage.PAGE.findComponent(x14);
 if (x15!=null)
{
 var x16=x15.getPeer();
 var x17=x16.getDomElement();
x16.focus(x15);
AdfMenuUtils.highlightRootMenuItem(x17);
}
}
}
AdfMenuUtils.highlightRootMenuItem= function(x18)
{
 var x19=x18.getAttribute("id");
 var x20=AdfMenuUtils._highlightedRootMenuItemId;
 if (x20&&x20!=x19)
{
AdfMenuUtils.unhighlightRootMenuItem();
}
AdfDomUtils.addCSSClassName(x18,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfMenuUtils._highlightedRootMenuItemId=x19;
}
AdfMenuUtils.unhighlightRootMenuItem= function()
{
 var x21=AdfAgent.AGENT.getElementById(AdfMenuUtils._highlightedRootMenuItemId);
 if (x21)
{
AdfDomUtils.removeCSSClassName(x21,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
AdfMenuUtils._highlightedRootMenuItemId=null;
}
AdfMenuUtils.dismiss= function(x22,x23,x24)
{
 var x25=this._sOpenedMenus;
 if (!x25||x25.length==0)
{
 return;
}
for(var x26=x25.length - 1;x26>=0;x26--)
{
 var x27=x25[x26];
 var x28=AdfPage.PAGE.findComponent(x27);
 if(!x28){
 delete x25[x26];
continue;
}
 var x29=x28.getPeer();
 if (x29._contains(x22))
{
break;
}
 if (x24)
{
x25.pop();
}
 else
 {
x29._deselectElement(); if (x23)
x29.hidePopup();
 else
 x29._delayPopupHiding(x26);
}
}
}
AdfMenuUtils.areMenusOpened= function()
{
 return this._sOpenedMenus&&this._sOpenedMenus.length>0;
}
AdfMenuUtils.isMenuOpen= function(x30)
{
 return AdfCollections.indexOf(this._sOpenedMenus,x30)>=0;
}
AdfMenuUtils.addOpenMenu= function(x31)
{
 if (!this.isMenuOpen(x31))
{
this._sOpenedMenus.push(x31);
}
}
AdfMenuUtils.removeOpenMenu= function(x32)
{
AdfCollections.removeArrayValue(this._sOpenedMenus,x32);
}
AdfMenuUtils.getContextMenuItemTargetAttrs= function(x33)
{
 var x34=null;
 var x35=x33.getParent();
while(x35!=null&&((x35 instanceof AdfRichMenu)||x35 instanceof AdfRichPopup))
{
 var x36;
 if((x36=x35[this.AFR_TARGETROWCURRENCY])!=null)
{
x34={targetRowCurrency:x36,
targetComponentId:x35[this.AFR_TARGETCOMPONENTID]};
break;
}
x35=x35.getParent();
}
 return x34;
}
AdfMenuUtils.setContextMenuItemTargetAttrs= function(x37,x38)
{
 var x39=x37.getPropertyKeys();
 var x40=this.AFR_TARGETROWCURRENCY;
 var x41=this.AFR_TARGETCOMPONENTID;
 if(x39[x40]==null)
{
x39[x40]=x39[x41]={type:"String"};
AdfRichUIPeer.addSuppressedPPRAttributes(this,x40,x41);
}
x37.setProperty(x41,null);
x37.setProperty(x40,null);
x37.setProperty(x41,x38.targetComponentId);
x37.setProperty(x40,x38.targetRowCurrency);
}
AdfMenuUtils.handleArrowKeys= function(x42,x43,x44)
{
 var x45=x42.getNativeEvent();
 if (x45.ctrlKey)
{
 return;
}
 if (this.isInOverflow(x43))
{
this._handleInMenuBarOverflowArrowKeys(x42,x43,x44);
}
 else if (this.isOnMenuBar(x44))
{
this._handleInMenuBarArrowKeys(x42,x43,x44);
}
 else if (this.isInMenu(x44))
{
this._handleInMenuArrowKeys(x42,x43,x44);
}
}
AdfMenuUtils._handleInMenuBarArrowKeys= function(x46,x47,x48)
{
 var x49=AdfAgent.AGENT;
 var x50=x46.getNativeEvent();
 var x51=x49.getKeyCode(x50);
switch(x51)
{
 case AdfKeyStroke.ARROWDOWN_KEY:
 if (x48 instanceof AdfRichMenu)
{
AdfDomUtils.addCSSClassName(x47,this.DEPRESSED_STYLE_CLASS);
 var x52=x48.getPeer();
x52.show(null,true);
x46.cancel();
}
break;
default:
}
}
AdfMenuUtils._handleInMenuBarOverflowArrowKeys= function(x53,x54,x55)
{
 var x56=AdfAgent.AGENT;
 var x57=x53.getNativeEvent();
 var x58=x56.getKeyCode(x57);
switch(x58)
{
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if (x55 instanceof AdfRichMenu)
{
 var x59=x55.getPeer();
x59.show(null,true);
}
x53.cancel();
break;
default:
}
}
AdfMenuUtils._handleInMenuArrowKeys= function(x60,x61,x62)
{
 var x63=AdfAgent.AGENT;
 var x64=x60.getNativeEvent();
 var x65=x63.getKeyCode(x64);
 var x66=x62.getParent();
switch(x65)
{
 case AdfKeyStroke.ARROWUP_KEY:
AdfMenuUtils._moveHighlightToPreviousMenuItem(x61,x62);
x60.cancel();
x66.getPeer().updateScrollIconsState();
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
AdfMenuUtils._moveHighlightToNextMenuItem(x61,x62);
x60.cancel();
x66.getPeer().updateScrollIconsState();
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
this._handleMenuItemLeftArrowKey(x66);
x60.cancel();
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
 if (x62 instanceof AdfRichMenu)
{
 var x67=x62.getPeer();
x67.show(null,true);
x60.cancel();
}
 else
 {
this._handleMenuItemRightArrowKey(x66);
x60.cancel();
}
break;
default:
}
}
AdfMenuUtils._handleMenuItemLeftArrowKey= function(x68)
{
 var x69=x68.getPeer();
 if (this.isOnMenuBar(x68))
{
x69.focus(x68);
x69.close(true,true);
this.MenuBarAutoOpenMode=false;
 var x70=x68.getParent();
 var x71=x70.getPeer();
 var x72=x71.getDomElement();
 var x73=x69.getDomElement();
AdfFocusUtils.focusPreviousTabStop(x73,x72);
}
 else if (!x69.isDetached()&& !x69.isContextMenu())
{
x69.focus(x68);
x69.close(true,true);
}
}
AdfMenuUtils._handleMenuItemRightArrowKey= function(x74)
{
 if (!(x74 instanceof AdfRichMenu))
{
 return;
}
 var x75=x74.getPeer();
 if (x75.isDetached()||x75.isContextMenu())
{
 return;
}
 if (this.isOnMenuBar(x74))
{
x75.focus(x74);
x75.close(true,true);
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to right arrow key pressed on root menu item");
this.setMenuBarAutoOpenMode(false);
 var x76=x74.getParent();
 var x77=x76.getPeer();
 var x78=x77.getDomElement();
 var x79=x75.getDomElement();
AdfFocusUtils.focusNextTabStop(x79,x78,true);
 return;
}
this._handleMenuItemRightArrowKey(x74.getParent());
}
AdfMenuUtils._moveHighlightToPreviousMenuItem= function(x80,x81)
{
AdfFocusUtils.focusPreviousTabStop(x80,x80.parentNode);
 var x82=x81.getParent();
 if (x82&&x82 instanceof AdfRichMenu)
{
x82.getPeer().updateScrollIconsState();
}
}
AdfMenuUtils._moveHighlightToNextMenuItem= function(x83,x84)
{
AdfFocusUtils.focusNextTabStop(x83,x83.parentNode,true);
 var x85=x84.getParent();
 if (x85&&x85 instanceof AdfRichMenu)
{
x85.getPeer().updateScrollIconsState();
}
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlGoMenuItemPeer",false);
AdfDhtmlGoMenuItemPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichGoMenuItem);
AdfObject.ensureClassInitialization(AdfMenuUtils);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE
);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichGoMenuItem.DISABLED);
}
AdfDhtmlGoMenuItemPeer.prototype.Init= function(x0)
{
x0.getParent();
AdfDhtmlGoMenuItemPeer.superclass.Init.call(this,x0);
}
AdfDhtmlGoMenuItemPeer.prototype.InitDomElement= function(x1,x2)
{
AdfDhtmlGoMenuItemPeer.superclass.InitDomElement.call(this,x1,x2);
 var x3=x1.getAccelerator();
 if (x3!=null)
{
AdfRichUIPeer.registerKeyStroke(x1,x3,this._execute);
}
}
AdfDhtmlGoMenuItemPeer.prototype.ComponentRemoved= function(x4)
{
 var x5=x4.getAccelerator();
 if (x5!=null)
{
AdfRichUIPeer.unregisterKeyStroke(x4,x5);
}
AdfDhtmlGoMenuItemPeer.superclass.ComponentRemoved.call(this,x4);
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentKeyUp= function(x6)
{
 var x7=x6.getNativeEvent();
 if (x7.ctrlKey)
 return;
 var x8=AdfAgent.AGENT;
 var x9=x8.getKeyCode(x7);
 var x10=this.getDomElement();
 var x11;
switch(x9)
{
 case AdfKeyStroke.SPACE_KEY:
 case AdfKeyStroke.ENTER_KEY:
this._execute();
x11=true;
break;
 case AdfKeyStroke.HOME_KEY:
AdfFocusUtils.focusFirstTabStop(x10.parentNode);
x11=true;
break;
 case AdfKeyStroke.END_KEY:
AdfFocusUtils.focusLastTabStop(x10.parentNode);
x11=true;
break;
default:
 return;
}
 if(x11)
{
x6.cancel();
}
 var x12=this.getComponent();
 var x13=x12.getParent();
 if (x13&&x13 instanceof AdfRichMenu)
{
x13.getPeer().updateScrollIconsState();
}
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentKeyDown= function(x14)
{
 if (x14.isCanceled()||this._isDisabled())
{
 return;
}
 var x15=x14.getKeyCode();
 var x16=AdfAgent.AGENT;
 if (x15==AdfKeyStroke.ENTER_KEY)
{
x14.cancel();
x14.stopBubbling();
 return;
}
 if (x16.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_DOWN_EVENT_TYPE)
{
 var x17=this.getDomElement();
 var x18=this.getComponent();
AdfMenuUtils.handleArrowKeys(x14,x17,x18);
}
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentKeyPress= function(x19)
{
 if (!x19.isCanceled()&& !this._isDisabled()&&
AdfAgent.AGENT.getPreferredKeyEventForRepetition()==AdfUIInputEvent.KEY_PRESS_EVENT_TYPE)
{
 var x20=this.getDomElement();
 var x21=this.getComponent();
AdfMenuUtils.handleArrowKeys(x19,x20,x21);
}
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentFocus= function(x22)
{
 if (this._isDisabled())
{
 return;
}
x22.cancel();
 var x23=this.getDomElement();
AdfDhtmlMenuPeer.cancelShowing();
 var x24=this.getComponent();
 if (AdfMenuUtils.isInMenu(x24))
{
AdfDomUtils.addCSSClassName(x23,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
 else {
 if (AdfMenuUtils.isMenuBarAutoOpenMode())
{
AdfMenuUtils.closeAllMenus(false);
}
AdfMenuUtils.highlightRootMenuItem(x23);
}
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentMouseDown= function(x25)
{
 if (this._isDisabled()|| !x25.isLeftButtonPressed())
{
 return;
}
 var x26=this.getDomElement();
AdfDomUtils.addCSSClassName(x26,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentMouseUp= function(x27)
{
 if (this._isDisabled()|| !x27.isLeftButtonPressed())
{
 return;
}
 var x28=this.getDomElement();
AdfDomUtils.removeCSSClassName(x28,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentMouseOver= function(x29)
{
 var x30=this.getComponent();
 if (this._isDisabled())
{
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&&AdfMenuUtils.isOnMenuBar(x30))
{
AdfMenuUtils.closeAllMenus(false);
}
 return;
}
x29.cancel();
 var x31=this.getDomElement();
 var x32=AdfFocusUtils.containsFocus(x31);
 if (AdfMenuUtils.isInMenu(x30))
{
AdfDomUtils.addCSSClassName(x31,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
AdfMenuUtils.dismiss(x31,false);
 if (!x32)
{
this.focus(x30);
}
}
 else {
 if (AdfMenuUtils.isMenuBarAutoOpenMode()&& !x32)
{
this.focus(x30);
}
 else
 {
AdfMenuUtils.highlightRootMenuItem(x31);
}
}
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentMouseOut= function(x33)
{
x33.cancel();
AdfMenuUtils.unhighlightRootMenuItem();
 if (this._isDisabled())
{
 return;
}
 var x34=this.getComponent();
 if (AdfMenuUtils.isInMenu(x34))
{
this._deselectElement();
}
 var x35=this.getDomElement();
AdfDomUtils.removeCSSClassName(x35,AdfMenuUtils.DEPRESSED_STYLE_CLASS);
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentBlur= function(x36)
{
this._deselectElement();
}
AdfDhtmlGoMenuItemPeer.prototype.HandleComponentClick= function(x37)
{
 if (!this._isDisabled()&&x37.isLeftButtonPressed())
{
this._execute();
}
x37.cancel();
}
AdfDhtmlGoMenuItemPeer.prototype.ComponentDisabledChanged= function(
x38,
x39,
x40,
x41)
{
 var x42=page.isScreenReaderMode();
 if (x40==true)
{
AdfDomUtils.addCSSClassName(x39,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x42)
{
 var x43=AdfDomUtils.getFirstChildElement(x39);
x43.setAttribute("aria-disabled","true");
x43.removeAttribute("href");
}
 else
 {
 var x44=(AdfMenuUtils.isInMenu(x38))?x39:
AdfDomUtils.getFirstChildElement(x39);
x44.removeAttribute("tabIndex");
}
}
 else {
AdfDomUtils.removeCSSClassName(x39,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x42)
{
 var x45=AdfDomUtils.getFirstChildElement(x39);
x45.removeAttribute("aria-disabled");
x45.setAttribute("href","#");
}
 else
 {
 var x46=(AdfMenuUtils.isInMenu(x38))?x39:
AdfDomUtils.getFirstChildElement(x39);
x46.setAttribute("tabIndex","0");
}
}
}
AdfDhtmlGoMenuItemPeer.prototype._execute= function()
{
 if (this._isDisabled())
{
 return;
}
AdfLogger.LOGGER.finest("menuBar auto open mode, set to OFF due to goMenuItem execute");
AdfMenuUtils.setMenuBarAutoOpenMode(false);
 var x47=this.getComponent();
 var x48=AdfMenuUtils.getContextMenuItemTargetAttrs(x47);
 if(x48!=null)
{
AdfMenuUtils.setContextMenuItemTargetAttrs(x47,x48);
}
 var x49=x47.getDestination();
 if (x49==null)
{
 var x50=AdfMenuUtils.isInMenu(x47);
AdfMenuUtils.closeAllMenus(x50);
 return;
}
 var x51=x47.getTargetFrame();
 var x52=AdfAgent.AGENT;
 if (x51!=null&&x51.toLowerCase()=="_blank"&&
x52.getPlatform()==AdfAgent.IE_PLATFORM&&x52.getVersion()<8)
{
AdfMenuUtils.closeAllMenus(false);
AdfPage.PAGE._handleNavigation(x49,x51);
}
 else
 {
AdfPage.PAGE._handleNavigation(x49,x51);
AdfMenuUtils.closeAllMenus(false);
}
}
AdfDhtmlGoMenuItemPeer.prototype._deselectElement= function()
{
 var x53=this.getDomElement();
AdfDomUtils.removeCSSClassName(x53,AdfMenuUtils.HIGHLIGHTED_STYLE_CLASS);
}
AdfDhtmlGoMenuItemPeer.prototype._isDisabled= function()
{
 var x54=this.getDomElement();
 return (x54.disabled||AdfDomUtils.containsCSSClassName(x54,AdfRichUIPeer.DISABLED_STYLECLASS));
}

AdfUIComponents.createComponentClass("AdfUIColumn",
{
componentType:"org.apache.myfaces.trinidad.Column",
propertyKeys:[{name:"sortProperty",type:"String",secured:true}
]
});

AdfUIComponents.createComponentClass("AdfRichColumn",
{
componentType:"oracle.adf.RichColumn",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"persist",type:"Array"}
,{name:"dontPersist",type:"Array"}
,{name:"align",type:"String"}
,{name:"headerClass",type:"String"}
,{name:"footerClass",type:"String"}
,{name:"width",type:"String","default":"100"}
,{name:"minimumWidth",type:"String","default":"12"}
,{name:"headerText",type:"String"}
,{name:"noWrap",type:"Boolean","default":true}
,{name:"headerNoWrap",type:"Boolean","default":false}
,{name:"sortable",type:"Boolean","default":false}
,{name:"filterable",type:"Boolean","default":false}
,{name:"separateRows",type:"Boolean","default":false}
,{name:"rowHeader",type:"String","default":"false"}
,{name:"selected",type:"Boolean","default":false}
,{name:"displayIndex",type:"Number","default":-1}
,{name:"frozen",type:"Boolean","default":false}
,{name:"helpTopicId",type:"String"}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"visible",type:"Boolean","default":true}
],
superclass:AdfUIColumn
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,
"AdfDhtmlColumnPeer",
false);
AdfDhtmlColumnPeer.InitSubclass= function()
{
AdfRichUIPeer.addSuppressedPPRAttributes(
this,
AdfRichColumn.WIDTH,
AdfRichColumn.MINIMUM_WIDTH,
AdfRichColumn.SELECTED);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichColumn.WIDTH);
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfRichColumn.DISPLAY_INDEX);
}
AdfDhtmlColumnPeer.prototype.GetComponentDisplayIndex= function(
x0,
x1)
{
 return AdfAgent.AGENT.getIntAttribute(x1,"_d_index", -1);
}
AdfDhtmlColumnPeer.prototype.ComponentWidthChanged= function(
x2,
x3,
x4,
x5)
{
 var x6=x2.getParent();
while(x6&& !(x6 instanceof AdfUICollection))
x6=x6.getParent();
 if(x6!=null)
{
x6.getPeer().resizeColumn(x2,x4,x5);
}
}
AdfDhtmlColumnPeer.prototype.ScrollIntoView= function(x7,x8,x9)
{
 var x10=x7.getParent();
while(x10&& !(x10 instanceof AdfUICollection))
x10=x10.getParent();
 if(x10!=null)
{
x10.getPeer().scrollColumnIntoView(null,this.getDomElement());
}
 if(x9!=null)
AdfLogger.LOGGER.warning("subTargetId not supported for column ScrollIntoView");
 if(x8)
AdfLogger.LOGGER.warning("Focus not supported for column ScrollIntoView");
}

function AdfTableDataFetchEvent(
x0,
x1,
x2,
x3,
x4
)
{
this.Init(x0,x1,x2,x3,x4);
}
AdfObject.createSubclass(AdfTableDataFetchEvent,AdfComponentEvent);
AdfTableDataFetchEvent.FETCH_EVENT_TYPE="fetch";
AdfTableDataFetchEvent.prototype.Init= function(
x0,
x1,
x2,
x3,
x4
)
{
AdfTableDataFetchEvent.superclass.Init.call(this,x0,AdfTableDataFetchEvent.FETCH_EVENT_TYPE);
this._id=x1;
this._index=x3;
this._clientKey=x4;
this._subtype=x2;
this._renderOnly=false;
this.setRoot(x0);
}
AdfTableDataFetchEvent.prototype.setClientTokens= function(x5)
{
this._clientTokens=x5;
}
AdfTableDataFetchEvent.prototype.setOldClientKey= function(x6)
{
this._oldClientKey=x6;
}
AdfTableDataFetchEvent.prototype.setColumnClientId= function(x7)
{
this._columnClientId=x7;
}
AdfTableDataFetchEvent.prototype.setOldColumnClientId= function(x8)
{
this._oldColumnClientId=x8;
}
AdfTableDataFetchEvent.prototype.setFillRows= function(x9)
{
this._fillRows=x9;
}
AdfTableDataFetchEvent.prototype.setLastClientKey= function(x10)
{
this._lastClientKey=x10;
}
AdfTableDataFetchEvent.prototype.setActivatePreviousCell= function()
{
this._activatePreviousCell=true;
}
AdfTableDataFetchEvent.prototype.setRenderOnly= function(x11)
{
this._renderOnly=x11;
}
AdfTableDataFetchEvent.prototype.AddMarshalledProperties= function(
x12)
{
AdfTableDataFetchEvent.superclass.AddMarshalledProperties.call(this,x12);
x12['id']=this._id;
x12['subtype']=this._subtype;
 if (this._index!=undefined)
x12['index']=this._index;
 if (this._clientKey)
x12['clientKey']=this._clientKey;
 if (this._clientTokens)
x12['clientTokens']=this._clientTokens;
 if(this._oldClientKey)
x12['oldClientKey']=this._oldClientKey;
 if (this._renderOnly)
x12['renderOnly']=true;
 if (this._fillRows)
x12['fillRows']=this._fillRows;
 if (this._lastClientKey)
x12['lastClientKey']=this._lastClientKey;
 if(this._columnClientId)
x12['columnClientId']=this._columnClientId;
 if(this._oldColumnClientId)
x12['oldColumnClientId']=this._oldColumnClientId;
 if(this._activatePreviousCell)
x12['activatePreviousCell']=this._activatePreviousCell;
}
AdfTableDataFetchEvent.prototype.getClearMessages= function()
{
 return false;
}
AdfTableDataFetchEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfTableDataFetchEvent.prototype.isValidationNeeded= function()
{
 if (this._subtype==AdfTableDataFetchEvent.INITIAL_SUBTYPE||
this._subtype==AdfTableDataFetchEvent.EXPAND_SUBTYPE||
this._subtype==AdfTableDataFetchEvent.COLLAPSE_SUBTYPE)
{
 return false;
}
 return true;
}
AdfTableDataFetchEvent.INITIAL_SUBTYPE=0;
AdfTableDataFetchEvent.BEFORE_KEY_SUBTYPE=1;
AdfTableDataFetchEvent.AFTER_KEY_SUBTYPE=2;
AdfTableDataFetchEvent.FROM_INDEX_SUBTYPE=3;
AdfTableDataFetchEvent.UP_TO_INDEX_SUBTYPE=4;
AdfTableDataFetchEvent.EXPAND_SUBTYPE=5;
AdfTableDataFetchEvent.COLLAPSE_SUBTYPE=6;
AdfTableDataFetchEvent.CLICK_EDIT_ACTIVE_ROW=7;
AdfTableDataFetchEvent.AUTO_PPR=8;

function AdfTableShowColumnsEvent(
x0,
x1,
x2
)
{
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfTableShowColumnsEvent,AdfComponentEvent);
AdfTableShowColumnsEvent.SHOW_COLUMN_EVENT_TYPE="showColumns";
AdfTableShowColumnsEvent.prototype.Init= function(
x0,
x1,
x2
)
{
AdfTableShowColumnsEvent.superclass.Init.call(this,x0,
AdfTableShowColumnsEvent.SHOW_COLUMN_EVENT_TYPE);
this._columnIds=x1;
this._showType=x2;
this.setPartial(true);
this.setRoot(x0);
}
AdfTableShowColumnsEvent.prototype.getShowType= function()
{
 return this._showType;
}
AdfTableShowColumnsEvent.prototype.setTargetColumnId= function(x3)
{
this._targetColumnId=x3;
}
AdfTableShowColumnsEvent.prototype.setAfterTarget= function(x4)
{
this._afterTarget=x4;
}
AdfTableShowColumnsEvent.prototype.AddMarshalledProperties= function(
x5)
{
AdfTableShowColumnsEvent.superclass.AddMarshalledProperties.call(this,x5);
 if(this._columnIds)
x5['columnIds']=this._columnIds;
x5['showType']=this._showType;
 if(this._targetColumnId)
x5['targetColumnId']=this._targetColumnId;
 if(this._afterTarget)
x5['afterTarget']=this._afterTarget;
}
AdfTableShowColumnsEvent.prototype.propagatesToServer= function()
{
 return true;
}
AdfTableShowColumnsEvent.prototype.isValidationNeeded= function()
{
 return true;
}
AdfUIComponents.createComponentClass("AdfRichTable",
{
componentType:"oracle.adf.RichTable",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"bodyContextMenuId",type:"String"}
,{name:"columnSelection",type:"String","default":"none"}
,{name:"columnStretching",type:"String","default":"none"}
,{name:"columnResizing",type:"String","default":"enabled"}
,{name:"contextMenuId",type:"String"}
,{name:"disableColumnReordering",type:"Boolean","default":false}
,{name:"horizontalGridVisible",type:"Boolean","default":true}
,{name:"verticalGridVisible",type:"Boolean","default":true}
,{name:"emptyText",type:"String","default":"No data to display."}
,{name:"columnBandingInterval",type:"Number","default":0}
,{name:"rowBandingInterval",type:"Number","default":1}
,{name:"rowSelection",type:"String","default":"none"}
,{name:"width",type:"String"}
,{name:"summary",type:"String"}
,{name:"fetchSize",type:"Number","default":25}
,{name:"displayRow",type:"String","default":"first"}
,"displayRowKey"
,"activeRowKey"
,{name:"contextMenuSelect",type:"Boolean","default":true}
,{name:"editingMode",type:"String","default":"editAll"}
,{name:"scrollTop",type:"Number","default":0}
,{name:"scrollLeft",type:"Number","default":0}
,"scrollTopRowKey"
,{name:"contentDelivery",type:"String","default":"whenAvailable"}
,{name:"clearTokenCacheOnPPR",type:"Boolean","default":true}
,{name:"autoHeightRows",type:"Number","default":-1}
,{name:"persist",type:"Array"}
,{name:"dontPersist",type:"Array"}
,{name:"allDetailsEnabled",type:"Boolean","default":false}
,{name:"filterVisible",type:"Boolean","default":false}
,"columnSelectionListener"
,{name:"rows",type:"Number","default":25}
,{name:"first",type:"Number","default":0}
],
eventNames:["columnSelection"],
namingContainer:true,
superclass:AdfUITable2
});

AdfRichTable.prototype.getAccessibleName= function()
{
 return this.getShortDesc();
}
AdfRichTable.prototype.scrollColumnIntoView= function(x0)
{
this.getPeer().scrollColumnIntoView(x0);
}
AdfRichTable.prototype.getRowIndex= function(x1)
{
 return this.getPeer().getRowIndex(x1);
}
AdfRichTable.prototype.getRowKey= function(x2)
{
 return this.getPeer().getRowKey(x2);
}

function AdfTableUtils()
{
this.Init();
}
AdfObject.createSubclass(AdfTableUtils);
AdfTableUtils.InitClass= function()
{
}
AdfTableUtils.prototype.Init= function()
{
AdfTableUtils.superclass.Init.call();
}
AdfTableUtils.queueColumnSelectionEvent= function(x0,x1,x2)
{
 var x3=AdfTableUtils.processColumnSelectionEventChangedSets(x1,x2);
 var x4=[];
 var x5=[];
 var x6=0;
for(var x7 in x3[0])
x4[x6++]=x7;
x6=0;
for(var x7 in x3[1])
x5[x6++]=x7;
AdfColumnSelectionEvent.queue(x0,x4,x5);
}
AdfTableUtils.processColumnSelectionEventChangedSets= function(x8,x9)
{
 var x10=null;
 var x11=null;
 if (x9)
{
 if (x8)
{
for(var x12 in x9)
{
 if (!x8[x12])
{
 if (!x10)
x10= new Object();
x10[x12]=true;
}
}
}
 else
 {
x10= new Object();
AdfCollections.copyInto(x10,x9);
}
}
 if (x8)
{
 if (x9)
{
for(var x12 in x8)
{
 if (!x9[x12])
{
 if (!x11)
x11= new Object();
x11[x12]=true;
}
}
}
 else
 {
x11= new Object();
AdfCollections.copyInto(x11,x8);
}
}
 return [x11==null?{}:x11,x10==null?{}:x10];
}
AdfTableUtils.queueSortEvent= function(x13,x14,x15)
{
x13.setProperty("scrollTopRowKey",null,true,AdfUIComponent.PROPAGATE_ALWAYS);
 var x16=x13.getPeer();
 if (x16)
{
 var x17=x16.GetAssociatedComponent();
 if (x17!=null)
{
x17.setProperty("scrollTopRowKey",null,true,AdfUIComponent.PROPAGATE_ALWAYS);
}
}
 new AdfSortEvent(x13,x14,x15).queue();
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,
"AdfDhtmlTablePeer",
false);
AdfDhtmlTablePeer.InitSubclass= function()
{
AdfRichUIPeer.addDomEventHandlers(this,
AdfDhtmlLookAndFeel.SCROLL_EVENT_TYPE,
AdfDhtmlLookAndFeel.KEY_DOWN_EVENT_TYPE,
AdfDhtmlLookAndFeel.MOUSE_MOVE_EVENT_TYPE);
 var x0=[
this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfComponentEvent.FOCUS_EVENT_TYPE,
AdfComponentEvent.BLUR_EVENT_TYPE,
AdfUIInputEvent.DOUBLE_CLICK_EVENT_TYPE,
AdfUIInputEvent.CONTEXT_MENU_EVENT_TYPE,
AdfValueChangeEvent.VALUE_CHANGE_TYPE];
 if (typeof(window["AdfSafariMobileAgent"])=="undefined"||
 !(AdfAgent.AGENT instanceof AdfSafariMobileAgent))
{
x0=x0.concat(AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE);
}
AdfRichUIPeer.addComponentEventHandlers.apply(AdfRichUIPeer.addComponentEventHandlers,x0);
AdfRichUIPeer.addComponentPropertyChanges(this,"selectedRowKeys","disclosedRowKeys","scrollTop","scrollLeft","activeRowKey");
AdfRichUIPeer.addSuppressedPPRAttributes(this,"first");
AdfRichUIPeer.addSuppressedPPRAttributes(this,"rows");
AdfRichUIPeer.addSuppressedPPRAttributes(this,"scrollTop");
AdfRichUIPeer.addSuppressedPPRAttributes(this,"scrollLeft");
AdfRichUIPeer.addSuppressedPPRAttributes(this,"scrollTopRowKey");
AdfRichUIPeer.addSuppressedPPRAttributes(this,"activeRowKey");
this._SEL_UPDATE_ALL_SELECT=0;
this._SEL_UPDATE_ALL_UNSELECT=1;
this._SEL_UPDATE_ALL_UPDATE=2;
this.AUTO_PPR_UPDATE_BLOCK=0;
this.AUTO_PPR_INSERT_BEFORE_BLOCK=1;
this.AUTO_PPR_INSERT_AFTER_BLOCK=2
this.AUTO_PPR_REMOVE_BLOCK=3;
this.AUTO_PPR_FETCH_ID= -99;
this.MISSING_AFTER=1;
this.MISSING_BEFORE=2;
this.NO_BLOCKS=4;
this.VIEWPORT_SATISFIED=0;
this.DW_SUB_ID="dataW";
this._ROW_KEY="_afrRK";
this._ROW_HEADER="_afrRH";
this._LEAF_COLUMN="_afrLeaf";
this._ROOT_COLUMN="_afrRoot";
this._FILTER_COLUMN="_afrFilterCol";
this._PANEL_COLLECTION_ID="_afrPCId";
this._SELECT_ALL="_afrSelAll";
this._COL_COUNT="_afrColCount";
this._FILTERABLE="_afrFilterable";
this.__SORT_INDICATOR="afrSI";
this._SORT_ASCENDING="_afrSortAsc";
this._SORT_DESCENDING="_afrSortDesc";
this._SORTED_TYPE="_afrSorted";
this._SORTED_ASCENDING="1";
this._SORTED_DESCENDING="2";
this._SUPPORTS_HOVER="_afrHoverable";
this.SELECTALL_KEY_PROPERTY="afrSelectAll";
this._SELECTED_CLASS="p_AFSelected";
this._INACTIVE_CLASS="p_AFInactive";
this._DROP_TARGET_CLASS="p_AFDropTarget";
this._HIGHLIGHTED_CLASS="p_AFHighlighted";
this._FOCUSED_CLASS="p_AFFocused";
this._AUTOSCROLL_MARGIN=40;
this._HSCROLLER=0;
this._VSCROLLER=1;
this._SELECTION_SINGLE="single";
this._SELECTION_MULTIPLE="multiple";
this._SELECTION_MULTIPLE_NOSELECTALL="multipleNoSelectAll";
this._SELECTION_NONE="none";
this._EDIT_MODE_CLICKTOEDIT="clickToEdit";
this.COLUMN_RESIZE_MARGIN=3;
this._MAXIMUM_ROW_REVEAL=8;
this._SELECT_PAGE_UP=1;
this._SELECT_PAGE_DOWN=2;
this._SELECT_ARROW_UP=3;
this._SELECT_ARROW_DOWN=4;
this._FOCUS_RH_ARROW_UP=5;
this._FOCUS_RH_ARROW_DOWN=6;
this._FOCUS_ROW_ARROW_UP=7;
this._FOCUS_ROW_ARROW_DOWN=8;
this._ROW_HEADER_FOCUS_TYPE=0;
this._COLUMN_HEADER_FOCUS_TYPE=1;
this._TABLE_BODY_FOCUS_TYPE=2;
this._SELECT_ALL_FOCUS_TYPE=3;
this._FETCH_MORE_CANVAS_SPACE=25;
this._INPUT_REGEXP=/^INPUT|SELECT|OPTION|BUTTON|^A\b|TEXTAREA/;
this._TWINKLE_ON_STYLE_CLASS="p_AFTwinkleOn";
this._TWINKLE_OFF_STYLE_CLASS="p_AFTwinkleOff";
AdfDhtmlTablePeer._TWINKLE_TIMER_ID_ATTR="__afrTwinkleTimer";
this._ICON_STYLE_EXPANDED="af|table::disclosed-icon-style";
this._ICON_STYLE_COLLAPSED="af|table::undisclosed-icon-style";
this._ICON_EXPANDED="af|table::disclosed-icon";
this._ICON_COLLAPSED="af|table::undisclosed-icon";
this._EXPANDED_NODE_KEY="af_table.TIP_EXPANDED_NODE";
this._COLLAPSED_NODE_KEY="af_table.TIP_COLLAPSED_NODE";
this._DETAIL_COLUMN_MARKER="_afrDetCol";
this._DETAIL_ROW_MARKER="_afrDetRow";
this._HAS_DETAIL_MARKER="_hasDetail";
this.NEEDS_REFRESH_ATTRIBUTE="_afrNdsRfr";
this.UNDO_FETCH_ATTRIBUTE="_afrUndFch";
this.NO_RESIZE_MARKER="_noRsz";
this._AUTO_HEIGHT_ROWS="_afrAutoHR";
}
AdfDhtmlTablePeer.prototype.InitDomElement= function(x1,x2)
{
 var x3=AdfPage.PAGE;
 var x4=AdfAgent.AGENT;
AdfDhtmlTablePeer.superclass.InitDomElement.call(this,x1,x2);
AdfRichUIPeer.addEventHandlerToDomInstance(AdfDhtmlTablePeer,x2,
AdfDhtmlLookAndFeel.MOUSE_MOVE_EVENT_TYPE);
AdfRichUIPeer.addEventHandlerToDomInstance(AdfDhtmlTablePeer,x2,
AdfDhtmlLookAndFeel.KEY_DOWN_EVENT_TYPE);
this._autoHeightRows=x4.getIntAttribute(x2,
AdfDhtmlTablePeer._AUTO_HEIGHT_ROWS,0);
 var x5=this.GetDatabody(x2);
this._colCount=(x5)?
x4.getIntAttribute(x5,AdfDhtmlTablePeer._COL_COUNT,0):0;
this._colSelEventSelectedColIds={};
this._colSelEventUnselectedColIds={};
this._supportsFocusRowNavigation=this.SupportsFocusRowNavigation(x1);
this._contextMenuSelect=x1.getContextMenuSelect();
 if (!x1.getColumnResizing||x1.getColumnResizing()=="enabled")
{
this._colResizeDragCallback=this.createCallback(this._handleColResizeDrag);
this._colResizeDropCallback=this.createCallback(this._handleColResizeDrop);
}
 if (x1.getColumnStretching)
{
 var x6=x1.getColumnStretching();
this._columnStretching=x6;
 if (x6=="blank")
{
this._stretchedColumnId="_afrBlankColumn";
}
 else if (x6.indexOf("column:")==0)
{
this._stretchedColumnId=x6.substring(7);
}
 else if (x6=="multiple")
{
}
}
this._cellNavMode=true;
this._editableTableReadOnlyMode=false;
this._hoverHighlightRow=this._isRowSelectionEnabled(x1)&&
(x3.getLookAndFeel().
getSkinProperty("af|table-tr-hover-highlight-row")!="false");
this._activeDataCount= -1;
this._fetchId=0;
this._unavailableRowIndex= -1;
this._lastColWidthOverride= -1;
this._lastColWidth= -1;
this._associatedId=x1.getProperty("_afrMasterId");
 if(this._associatedId==null)
this._associatedId=x1.getProperty("_afrSlaveId");
this._focusManager={};
this._streamingDisabled=x3.isStreamingDisabled();
}
AdfDhtmlTablePeer.prototype.TruncateClientId= function(
x7,
x8,
x9,
x10)
{
 var x11=x9.split(":");
 var x12=x7.getClientId();
 var x13=AdfStrings.count(x12,":") + 1;
 var x14=x11[x13];
 if (x14)
{
 if (!isNaN(x14))
{
x10.push(x13);
}
}
}
AdfDhtmlTablePeer.prototype.ComponentRemoved= function(x15)
{
 if (this._touchMoveManager)
{
this._touchMoveManager.unregister();
}
AdfDhtmlTablePeer.superclass.ComponentRemoved.call(this,x15);
}
AdfDhtmlTablePeer.prototype.needsChildVisibilityChanges= function(x16)
{
 return true;
}
AdfDhtmlTablePeer.prototype.ChildVisibilityChanged= function(
x17,
x18,
x19)
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return true;
}
AdfDhtmlTablePeer.prototype.SupportsFocusRowNavigation= function()
{
 return false;
}
AdfDhtmlTablePeer.prototype.needsResizeNotify= function(x20)
{
 return true;
}
AdfDhtmlTablePeer.prototype.GetPanelCollectionPeer= function(x21)
{
 if(!this._pcPeer)
{
 var x22=this.getDomElement();
 var x23=null;
 var x24=x22.getAttribute(AdfDhtmlTablePeer._PANEL_COLLECTION_ID);
 if(x24!=null)
{
x23=AdfPage.PAGE.findComponent(x24);
 if(x23)
this._pcPeer=x23.getPeer();
}
}
 return this._pcPeer;
}
AdfDhtmlTablePeer.prototype.GetPanelCollectionComponent= function()
{
 if(!this._pcComponent)
{
 var x25=this.getDomElement();
 var x26=x25.getAttribute(AdfDhtmlTablePeer._PANEL_COLLECTION_ID);
 if(x26!=null)
{
this._pcComponent=AdfPage.PAGE.findComponent(x26);
}
}
 return this._pcComponent;
}
AdfDhtmlTablePeer.prototype._allRowsAvailableOnClient= function(x27,x28)
{
 var x29=false;
 if (x28>0)
{
 var x30=x27[0];
 var x31=x27[x28-1];
 var x32=x31.startRow + x31.numRows;
 var x33=this.GetRowCount();
x29=x33>0&&x30.startRow==0&&x32==x33;
}
 return x29;
}
AdfDhtmlTablePeer.prototype.ResizeNotify= function(
x34,
x35,
x36,
x37
)
{
 delete this._cachedFirstVisibleRowKeyAndRow;
 if (this._virtInitialized)
{
 var x38=AdfAgent.AGENT;
 var x39=this.GetDatabody();
this._setScrollerHeight(x37,this._cachedCHHeight,this._cachedCFHeight);
this._setScrollerWidth(x36,this._frozenWidth);
this.SizeDatabody(x39,x36,x37);
 var x40=this._getScrollLeft();
 var x41=this._getScrollTop();
 if((this._currentScrollTop!=x41)||(this._currentScrollLeft!=x40))
{
this.scrollToPos(this._currentScrollLeft,this._currentScrollTop);
}
this._stretchTheColumns();
this._syncDataBodyHeights();
 if(this._rowCount== -1&&this._canvasHeight<(x37 - this._cachedCHHeight - this._cachedCFHeight))
{
this._canvasHeight=x37 - this._cachedCHHeight - this._cachedCFHeight +
 AdfDhtmlTablePeer._FETCH_MORE_CANVAS_SPACE;
this._setFakeCanvasHeight(this._canvasHeight);
}
this._fillViewPort(x39,x39.offsetHeight,false);
}
 else if (this._isImmediateContentDelivery(this.getComponent())||this._isInlineDataAvailable(this.getComponent()))
{
 var x39=this.GetDatabody();
 var x42=null;
 if (x39)
{
this._unavailableRowIndex=this._getUnavailableRowIndex(x39);
 var x43=x39.childNodes;
for(var x44=x43.length-1;x44>=0;x44--)
{
 if ("TABLE"==x43[x44].tagName)
{
x42=x43[x44];
break;
}
}
}
this._fixOuterHeight();
this._initColumnHeader();
this._initColumnFooter();
 if(x42!=null&&x42.rows.length>0)
{
this._initVirtualization(x42,true);
this._processClickToEditRequestTimerId=
AdfPage.PAGE.scheduleTimer(this,this._processClickToEditRequest,false,10);
}
 else
 {
this.IsEmpty=true;
this.getDomElement().style.overflow="auto";
this.AdjustAutoHeight();
this._updatePCState();
}
this._stretchTheColumns();
 if(this.IsEmpty)
{
 var x45=this._getColumnHeader();
 if(x45)
{
 var x46=this.getDomElement();
x45.style.border="0px";
 var x47=x45.offsetWidth;
 if(x47<=x46.clientWidth)
{
x46.style.overflow="hidden";
}
}
 var x48=this._getColumnFooter();
 if (x48)
{
 var x46=this.getDomElement();
x48.style.border="0px";
 var x49=x48.offsetWidth;
 if (x49<=x46.clientWidth)
{
x46.style.overflow="hidden";
}
}
 if (x45||x48)
{
this.AdjustAutoHeight()
}
}
}
 else if (!this._firstBlockRequested)
{
 var x38=AdfAgent.getAgent();
 var x50=this.getDomElement();
 var x51=x38.getAttribute(x50,"_afrEmpty",false);
this.IsEmpty=x51;
 if (!x51)
{
this._firstBlockRequested=true;
 var x52=this.getComponent();
 if (this._streamingDisabled|| !AdfPage.PAGE.isStreamingRequestPending(x52.getClientId()))
{
this._queueFetchEvent(true,AdfTableDataFetchEvent.INITIAL_SUBTYPE, -1);
}
AdfDhtmlTablePeer.SetCursor(this.GetDatabody(),"wait");
}
this._initColumnHeader();
this._initColumnFooter();
 if (!x51)
{
 var x53=AdfPage.PAGE.getLookAndFeel().getTranslatedString("af_table.LABEL_FETCHING");
this.DisplayStatus(x53,true);
}
 if (x51)
{
this.getDomElement().style.overflow="auto";
this._stretchTheColumns();
 var x45=this._getColumnHeader();
 if(x45)
{
 var x46=this.getDomElement();
x45.style.border="0px";
 var x47=x45.offsetWidth;
 if(x47<=x46.clientWidth)
x46.style.overflow="hidden";
}
}
}
 else
 {
 if (!this._headerless&&this.IsEmpty)
this._stretchTheColumns();
 if (this.IsEmpty&&this._autoHeightRows>0&& !this._footerless)
{
this.AdjustAutoHeight();
}
}
}
AdfDhtmlTablePeer.prototype._initColumnHeader= function()
{
 var x54=AdfAgent.getAgent();
 var x55=x54.getIntAttribute(this.getDomElement(),"_lastFrozen", -1);
this._lastFrozen=x55;
 var x56=this._getColumnHeader();
 if (x56)
{
 if (this._autoHeightRows>0&&this._lastFrozen>=0&& !this._columnHeaderUnwrapped)
{
 var x57=AdfDhtmlTablePeer.FindFirstChildByTagName(x56,"TABLE");
 var x58=x57.rows[0];
 var x59=AdfDhtmlTablePeer.FindFirstChildByTagName(x58.cells[0],"TABLE");
 var x60=AdfDhtmlTablePeer.FindFirstChildByTagName(x58.cells[1],"DIV");
x59.parentNode.removeChild(x59);
x60.parentNode.removeChild(x60);
x56.removeChild(x57);
x56.appendChild(x59);
 var x61=x59.style.width;
 var x62="left:";
 if (AdfDhtmlTablePeer._isRTL())
x62="right:";
x60.style.cssText="overflow:hidden;position:absolute;top:0px;" + x62 + x61;
x56.appendChild(x60);
this._columnHeaderUnwrapped=true;
}
this._synchronizeColumnRowHeights(x56,"t","d2","t2");
this._cachedCHHeight=x56.offsetHeight;
 if (AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM&&AdfAgent.AGENT.getVersion()<8)
{
 var x57=AdfDhtmlTablePeer._getChildBySubId(x56,'t');
 if (x57&&x57.rows.length)
{
x57.rows[0].style.position='absolute';
}
 var x63=AdfDhtmlTablePeer._getChildBySubId(x56,'d2');
 if (x63)
{
x57=AdfDhtmlTablePeer._getChildBySubId(x63,'t2');
 if (x57&&x57.rows.length)
{
x57.rows[0].style.position='absolute';
}
 if (AdfDhtmlTablePeer._isRTL())
x57.style.right="0px";
}
}
}
 else
 {
this._headerless=true;
this._cachedCHHeight=0;
}
}
AdfDhtmlTablePeer.prototype._initColumnFooter= function()
{
 var x64=AdfAgent.getAgent();
 var x65=this._getColumnFooter();
 if (x65)
{
this._synchronizeColumnRowHeights(x65,"ft","fd2","ft2");
this._cachedCFHeight=x65.offsetHeight;
}
 else
 {
this._footerless=true;
this._cachedCFHeight=0;
}
}
AdfDhtmlTablePeer.prototype.__fixPanelCollectionDimensions= function(x66)
{
 if (!this._autoHeightRows)
 return;
 var x67=this.getDomElement();
 var x68=this.GetPanelCollectionPeer();
 var x69=x68.getDomElement();
 var x70=x68.getDomElement();
 var x71=this.GetPanelCollectionComponent();
 var x72=AdfAgent.getAgent();
 var x73=x72.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 if (x68&&x71)
{
 var x74=x71.getClientId();
 var x75=x72.getElementById(
AdfRichUIPeer.CreateSubId(x74,x68.__getAutoHeightTopFacetId()));
 var x76=x72.getElementById(
AdfRichUIPeer.CreateSubId(x74,x68.__getAutoHeightBottomFacetId()));
 var x77=(x75)?x75.offsetHeight:0;
 var x78=(x76)?x76.offsetHeight:0;
 if(x68.isDetached())
{
 var x79=x67.parentNode.parentNode;
 var x80=x67.style;
 if (!x66){
 if(x70.getAttribute("_afrPreDetachW")==null)
{
x70.setAttribute("_afrPreDetachW",x80.width);
x70.setAttribute("_afrPreDetachH",x80.height);
}
}
 if(x73)
{
 var x81=x72.getComputedStyle(x67);
x67.style.width=(x79.clientWidth - parseInt(x81.borderLeftWidth) -
 parseInt(x81.borderRightWidth))+'px';
}
 else
 x72.setOuterWidth(x67,x79.clientWidth);
x72.setOuterHeight(x67,x79.clientHeight-x77-x78);
}
 else
 {
 var x82=x70.getAttribute("_afrPreDetachH");
 if (x82!=undefined)
{
x67.style.height=x82;
x67.style.width="";x70.removeAttribute("_afrPreDetachW");
x70.removeAttribute("_afrPreDetachH");
}
x69.style.height=(x67.offsetHeight + x77 + x78) +"px";
}
}
}
AdfDhtmlTablePeer.prototype._isContainerStretched= function()
{
 var x83=this.getDomElement();
 var x84=x83.style;
 return (x84.position=="absolute"&&x84.top&&x84.top.length>0&&
x84.bottom&&x84.bottom.length>0);
}
AdfDhtmlTablePeer.prototype._isPCContainerStretched= function()
{
 var x85=false;
 var x86=this.getDomElement();
 var x87=this.GetPanelCollectionPeer();
 if(x87)
{
 var x88=x87.getDomElement();
 var x89=x88.style;
x85=(x89.position=="absolute"&&x89.top&&x89.top.length>0&&
x89.bottom&&x89.bottom.length>0);
}
 return x85;
}
AdfDhtmlTablePeer.prototype.isHeightAutoSized= function()
{
 return this._autoHeightRows>0;
}
AdfDhtmlTablePeer.prototype._fixOuterHeight= function()
{
 var set=false;
 var x90=this._autoHeightRows;
 if (x90>0)
{
 var x91=AdfAgent.AGENT;
 var x92=this.getDomElement();
 var x93=x92.style;
 if (x93.height=="auto"&& !this._isContainerStretched())
{
 if(x91.getPlatform()==AdfAgent.IE_PLATFORM&&x91.getVersion()<8)
{
 if (x92.scrollWidth<=x92.offsetWidth)
{
x93.height=x92.clientHeight + 'px';
set=true;
}
}
 if (!set)
{
x91.setOuterHeight(x92,x92.offsetHeight);
set=true;
}
}
x93.overflowX="";
x93.overflowY="";
}
 return set;
}
AdfDhtmlTablePeer.prototype.BeginHandleDataBlocks= function()
{
}
AdfDhtmlTablePeer.prototype.ReplaceDomElement= function(x94,x95)
{
 var x96=x94.id;
 if(x96.indexOf(AdfDhtmlTablePeer.DW_SUB_ID)>0)
{
 var x97=AdfAgent.AGENT;
 var x98=this.GetDatabody();
this.BeginHandleDataBlocks();
 var x99=AdfDhtmlTablePeer._findFirstLevelChildrenByTagName(x94,"TABLE");
this._unavailableRowIndex=this._getUnavailableRowIndex(x94);
 var x100=false;
 if (!this._virtInitialized)
{
 if (!this._firstBlockRequested)
{
this._initColumnHeader();
this._initColumnFooter();
}
this.CancelPendingFetch();
 if (x99.length>0&&x99[0].rows.length>0)
{
this._initVirtualization(x99[0],false);
x97.elementsAdded(x99[0]);
this._processClickToEditRequestTimerId=
AdfPage.PAGE.scheduleTimer(this,this._processClickToEditRequest,false,10);
this.AdjustAutoHeight();
}
 else
 x100=true;
}
 else
 {
 if (x99.length==0)
x100=true;
 var x101=x97.getIntAttribute(x94,"_fetchId", -1);
 var x102=this._pendingFetch;
 if (x102!=undefined&&this._pendingId==x101)
{
 var x103=this._pendingRenderOnly;
this.CancelPendingFetch();
this._cleanUpDataFetchElement(x95);
 if (x97.getBooleanAttribute(x94,AdfDhtmlTablePeer.NEEDS_REFRESH_ATTRIBUTE,false))
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return;
}
 if (x97.getBooleanAttribute(x94,AdfDhtmlTablePeer.UNDO_FETCH_ATTRIBUTE,false))
{
 if (x102==AdfTableDataFetchEvent.FROM_INDEX_SUBTYPE
||x102==AdfTableDataFetchEvent.UP_TO_INDEX_SUBTYPE
||x102==AdfTableDataFetchEvent.AFTER_KEY_SUBTYPE
||x102==AdfTableDataFetchEvent.BEFORE_KEY_SUBTYPE)
{
this._undoScroll();
}
 else if (x102==AdfTableDataFetchEvent.EXPAND_SUBTYPE
||x102==AdfTableDataFetchEvent.COLLAPSE_SUBTYPE)
{
this._restoreSavedDisclosureState();
}
 else if (x102==AdfTableDataFetchEvent.CLICK_EDIT_ACTIVE_ROW)
{
this._restoreActiveRowKey();
}
AdfDhtmlTablePeer.SetCursor(x98,"");
this._hideStatus();
 return;
}
 delete this._cachedFirstVisibleRowKeyAndRow;
this._savedDisclosedState=undefined;
for(var x104=0;x104<x99.length;x104++)
{
x94.removeChild(x99[x104]);
 if (!this._pruneKeyCache)
this._pruneKeyCache=x97.getAttribute(x99[x104],"_pruneKeyCache",null);
 var x105=x97.getIntAttribute(x99[x104],"_adsCounter", -1);
 var x106=false;
 if (x104==0)
this._applyBufferedADSEvents(x105,true);
x106=this._handleDataCallback(x99[x104],x102,x103,x99.length-x104-1);
 if (x104==x99.length - 1)
{
this._applyBufferedADSEvents(x105,false);
this._resetActiveMessageBuffer();
 if (this._activeDataCount<x105)
this._activeDataCount=x105;
}
 if (!x106)
{
this._addInvalidDataBlockToFetchElement(x95,x99[x104]);
}
x97.elementsAdded(x99[x104]);
}
this._fillViewPort(x98,x98.offsetHeight,false);
this.FetchCompleted();
}
 else if (x101==AdfDhtmlTablePeer.AUTO_PPR_FETCH_ID&&x102==undefined)
{
 if(!this._handleAutoPPRDataFetch(x94,x99,x98,x100))
 return;
}
 else
 {
this._handleIrrelaventFetchBlocks(x94,x95,x99);
}
}
 if (x100)
{
 if (this._hasRefreshAutoPPRBlock(x99))
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return;
}
this._handleEmptyTextBlock(x94,x98);
this.AdjustAutoHeight();
}
}
 else
 {
AdfDhtmlTablePeer.superclass.ReplaceDomElement.call(this,x94,x95);
}
}
AdfDhtmlTablePeer.prototype._handleAutoPPRDataFetch= function(x107,x108,x109,x110)
{
 var x111=this._hasRefreshAutoPPRBlock(x108);
 var x112=AdfAgent.AGENT;
 if (x111)
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return false;
}
 if (!x110)
{
 var x113=false;
for(var x114=0;x114<x108.length;x114++)
{
x107.removeChild(x108[x114]);
 if (!this._pruneKeyCache)
this._pruneKeyCache=x112.getAttribute(x108[x114],"_pruneKeyCache",null);
 var x115=x112.getIntAttribute(x108[x114],"_autopprBlock", -1);
this._updateComponentDisclosureState(x108[x114]);
this._updateComponentSelectionState(x108[x114]);
this._updateAutoPPRActiveRowKey(x108[x114]);
this.AutoPPRBlockReceived(x108[x114]);
switch(x115)
{
default:
break;
 case AdfDhtmlTablePeer.AUTO_PPR_INSERT_BEFORE_BLOCK:
 case AdfDhtmlTablePeer.AUTO_PPR_INSERT_AFTER_BLOCK:
{
 var x116=x112.getIntAttribute(x108[x114],"insertPath",null);
 var x117=this.FindRowByKey(x116);
 if (x117)
{
 var x118=x108[x114].rows.length;
 var x119=null;
 if (x118>0)
{
 var x120=x108[x114].rows[0];
x119=x120.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
}
 if (x119&& !this.FindRowByKey(x119))
{
 var x121=x117.index;
 if(x121!=undefined&&this.IsInsertAllowed(x121))
{
 if (x115==AdfDhtmlTablePeer.AUTO_PPR_INSERT_AFTER_BLOCK)
x121++;
x112.elementsAdded(x108[x114]);
 var x122=AdfDhtmlTablePeer._getBlockRowCount(x108[x114]);
 var x123=AdfAgent.AGENT.getIntAttribute(x108[x114],"totalInserted",0);
this.InsertBlock(x108[x114],x121,x122,x123,0);
this.UpdateRange(false);
}
}
}
break;
}
 case AdfDhtmlTablePeer.AUTO_PPR_REMOVE_BLOCK:
{
x113=this.HandleAutoPPRRemove(x108[x114]);
break;
}
 case AdfDhtmlTablePeer.AUTO_PPR_UPDATE_BLOCK:
{
 var x118=x108[x114].rows.length;
 if (x118>0)
{
 var x120=x108[x114].rows[0];
 var x124=(x118>1&&this._hasDetailStamp)?x108[x114].rows[1]:null;
 var x119=x120.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
this._replaceRowByKey(x119,x120,x124);
}
break;
}
}
}
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT,true);
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE,true);
 if (x113)
this._fillViewPort(x109,x109.offsetHeight,false);
}
 return true;
}
AdfDhtmlTablePeer.prototype._handleEmptyTextBlock= function(x125,x126)
{
 if (!this._virtInitialized)
{
 var x127=x125.childNodes;
 var x128=x127.length;
for(var x129=0;x129<x128;x129++)
{
 var x130=x127[0];
x125.removeChild(x130);
x126.appendChild(x130);
}
this._updatePCState();
this._hideStatus();
this.getDomElement().style.overflow="auto";
this.IsEmpty=true;
this._stretchTheColumns();
 var x131=this._getColumnHeader();
 if(x131)
{
x131.style.border="0px";
 var x132=this.getDomElement();
 var x133=x131.offsetWidth;
 if(x133<=x132.clientWidth)
x132.style.overflow="hidden";
}
AdfDhtmlTablePeer.SetCursor(x126,"");
}
 else
 AdfLogger.LOGGER.severe("Empty data block received:" + id);
}
AdfDhtmlTablePeer.prototype._handleIrrelaventFetchBlocks= function(x134,x135,x136)
{
 var x137=AdfAgent.AGENT;
this._cleanUpDataFetchElement(x135);
for(var x138=0;x138<x136.length;x138++)
{
x134.removeChild(x136[x138]);
this._addInvalidDataBlockToFetchElement(x135,x136[x138]);
x137.elementsAdded(x136[x138]);
}
}
AdfDhtmlTablePeer.prototype._addInvalidDataBlockToFetchElement= function(x139,x140)
{
 var x141=x140.rows;
 var x142=x141.length;
 var x143=null;
for(var x144=0;x144<x142;x144++)
{
 var x145=x141[x144];
 var x146=x145.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
 if(x146!=null&&this.FindRowByKey(x146)!=null)
{
 if(!x143)
x143=[];
x143.push(x145);
}
}
 if(x143!=null)
{
x142=x143.length;
for(x144=0;x144<x142;x144++)
{
x143[x144].parentNode.removeChild(x143[x144]);
}
}
x139.appendChild(x140);
}
AdfDhtmlTablePeer.prototype._cleanUpDataFetchElement= function(x147)
{
while(x147.firstChild!=null)
{
 var x148=x147.firstChild;
this.UnregisterNode(x148);
x147.removeChild(x148);
}
}
AdfDhtmlTablePeer.prototype._hasRefreshAutoPPRBlock= function(x149)
{
 var x150=AdfAgent.AGENT;
for(var x151=0;x151<x149.length;x151++)
{
 if (x150.getBooleanAttribute(x149[x151],AdfDhtmlTablePeer.NEEDS_REFRESH_ATTRIBUTE,false))
{
 return true;
}
}
 return false;
}
AdfDhtmlTablePeer.prototype.AutoPPRBlockReceived= function(x152)
{
}
AdfDhtmlTablePeer.prototype.HandleAutoPPRRemove= function(x153)
{
 var x154=AdfAgent.AGENT;
 var x155=false;
 var x156=x154.getAttribute(x153,"_parentKey",null);
 if(x156)
{
 var x157=this.FindRowByKey(x156);
 if (x157)
{
this.DeleteBlock(x157.index,1,1,0,null);
this.UpdateRange(false);
x155=true;
}
}
 return x155;
}
AdfDhtmlTablePeer.prototype.DomReplaceNotify= function(x158)
{
 if(x158.id.indexOf(AdfDhtmlTablePeer.DW_SUB_ID)>0)
{
 return null;
}
 return x158;
}
AdfDhtmlTablePeer.prototype._getUnavailableRowIndex= function(x159)
{
 var x160= -1;
 var x161=AdfAgent.AGENT;
 if (x159)
{
 var x162=AdfDhtmlTablePeer._getChildBySubId(x159,"unAvail");
 if(x162)
{
x160=x161.getIntAttribute(x162,"_unavailableRowIndex", -1);
x159.removeChild(x162);
}
}
 return x160;
}
AdfDhtmlTablePeer.prototype._queueExpandFetchEvent= function()
{
 var x163=this._queueFetchEvent(false,AdfTableDataFetchEvent.EXPAND_SUBTYPE);
AdfDhtmlTablePeer.SetCursor(this.GetDatabody(),"wait");
 if (this._pruneKeyCache)
{
x163.setClientTokens(this._collectClientTokens(this._pruneKeyCache));
this._pruneKeyCache=null;
}
}
AdfDhtmlTablePeer.prototype._queueCollapseFetchEvent= function()
{
this._queueFetchEvent(false,AdfTableDataFetchEvent.COLLAPSE_SUBTYPE);
AdfDhtmlTablePeer.SetCursor(this.GetDatabody(),"wait");
}
AdfDhtmlTablePeer.prototype.BlockInserted= function(x164,x165,x166)
{
}
AdfDhtmlTablePeer.prototype.BlockDeleted= function()
{
}
AdfDhtmlTablePeer.prototype.DeleteBlock= function(
x167,
x168,
x169,
x170,
x171)
{
 var x172=this.GetDatabody();
 var x173=x172.childNodes;
 var x174=0,x175=0;
 var x176=0;
for(var x177=x173.length-1;x177>=0&&x176<x168;x177--)
{
 var x178=x173[x177];
x174+=x178.cachedHeight;
 var x179=Math.max(x167,x178.startRow);
 var x180=Math.min(x167 + x168 - 1,
x178.startRow + x178.numRows - 1);
 var x181=0;
 var x182=0; var x183=null;
 if (x179==x178.startRow&&x180==x178.startRow + x178.numRows - 1)
{
x182=x178.cachedHeight;
x183=x178;
x181=x178.numRows;
 if(x171)
{
x171.push(x178);
x171.totalHeight+=x178.offsetHeight;
}
}
 else
 {
for(var x184=x180;x184>=x179;x184--)
{
 var x185=x184 - x178.startRow;
 if (x185==0)
{
AdfAssert.assert(
x178.rows!=null&&x178.rows[0]!=null,
"Unable to copy cell widths when the block contains no rows!");
 var x186=x178.rows[0].cells;
 var x187=x178.rows[1].cells;
for(var x188=0;x188<x187.length;x188++)
x187[x188].style.width=x186[x188].style.width;
}
 var x189=x178.rows[x185];
 if(x171)
{
x171.push(x189);
x171.totalHeight+=x189.offsetHeight;
}
this.UnregisterNode(x189);
x189.parentNode.removeChild(x189);
x181++;
}
 if (x181>0)
{
 var x190=x178.offsetHeight;
x182=x178.cachedHeight - x190;
x178.cachedHeight=x190;
x178.numRows=x178.rows.length;
}
x175+=x178.cachedHeight;
}
 if (x181>0)
{
for(var x191=x177+1;x191<x173.length;x191++)
{
 var x192=x173[x191];
x192.startPos-=x182;
x192.startRow-=x181;
}
 if (x183)
{
this.UnregisterNode(x183);
x172.removeChild(x183);
}
}
x176+=x181;
}
 var x193;
 if (x176==x169)x193=x175 - x174;
 else
 x193= -this._averageRowHeight*x169;
this._knownRowCount-=x169;
 if (this._rowCount!= -1)
this._rowCount-=x169;
this._adjustCanvasHeight(x193,x172);
 if(x170==0)
{
this._stretchTheColumns();
this._checkForScrollableLastBlockInViewport(x172);
this.BlockDeleted();
}
}
AdfDhtmlTablePeer.prototype.FetchCompleted= function()
{
}
AdfDhtmlTablePeer.prototype.GetAssociatedComponent= function()
{
 if(this._associatedPeer!=null)
 return this._associatedPeer.getComponent();
 else
 return null;
}
AdfDhtmlTablePeer.prototype._updateInitialARK= function(x194)
{
 var x195=this.getComponent();
 var x196=x194.getAttribute("_initARK");
 if (x196)
{
this._ignoreActiveRowKeyChange=true;
try
{
x195.setProperty("_afrActiveRowKey",x196,false,AdfUIComponent.PROPAGATE_NEVER);
x195.setProperty("activeRowKey",x196,false,AdfUIComponent.PROPAGATE_NEVER);
}
finally
{
this._ignoreActiveRowKeyChange=false;
}
}
}
AdfDhtmlTablePeer.prototype._updateComponentSelectionState= function(block)
{
 var component=this.getComponent();
 var selState=block.getAttribute("_selState");
 if (selState)
{
eval('var st=' + selState + ';');
component.setProperty('selectedRowKeys',st,false,AdfUIComponent.PROPAGATE_NEVER);
}
}
AdfDhtmlTablePeer.prototype._updateAutoPPRActiveRowKey= function (x197)
{
 var x198=this.getComponent();
 var x199=AdfAgent.AGENT;
 var x200=x199.getAttribute(x197,"_autopprActiveRow",null);
 if (x200!=null)
{
this._ignoreActiveRowKeyChange=true;
try
{
x200=x200.length==0?null:x200;
x198.setProperty("_afrActiveRowKey",x200,false,AdfUIComponent.PROPAGATE_NEVER);
x198.setProperty("activeRowKey",x200,false,AdfUIComponent.PROPAGATE_NEVER);
this._processClickToEditRequestTimerId=
AdfPage.PAGE.scheduleTimer(this,this._processClickToEditRequest,false,10);
}
finally
{
this._ignoreActiveRowKeyChange=false;
}
}
}
AdfDhtmlTablePeer.prototype._updateComponentDisclosureState= function(block)
{
 var component=this.getComponent();
 var discState=block.getAttribute("_discState");
 if (discState)
{
eval('var st=' + discState + ';');
component.setProperty('disclosedRowKeys',st,false,AdfUIComponent.PROPAGATE_NEVER);
}
}
AdfDhtmlTablePeer.prototype._initVirtualization= function(x201,
x202)
{
try
{
this._hideStatus();
this._virtInitialized=true;
 var x203=AdfAgent.AGENT;
 var x204=x203.getIntAttribute(x201,"_startRow",0);
 var x205=AdfDhtmlTablePeer._getBlockRowCount(x201);
 var x206=this.getComponent();
 var x207=this.GetDatabody();
 var x208=x203.getIntAttribute(x201,"_rowCount", -1);
 var x209=this._getEstimatedRowCount(x201);
 if (x209>=0)
{
x205=x209;
x208= -1;
}
 if (this._unavailableRowIndex==0)
x208= -1;
 else if (this._unavailableRowIndex>0)
x208=this._unavailableRowIndex;
this._rowCount=x208;
this._knownRowCount=x208;
 var x210=x208;
 var x211=0;
 if (x210== -1){
x210=x205;
this._knownRowCount=x205;
}
this._updateComponentSelectionState(x201);
this._updateInitialARK(x201);
 var x212=this.getDomElement();
x212.scrollLeft=0;
 var x213=x212.clientWidth;
 var x214=x212.clientHeight;
 var x215=x203.getIntAttribute(x201,"_frWidth",0);
this._frozenWidth=x215;
this._hasDetailStamp=x203.getAttribute(x201,AdfDhtmlTablePeer._HAS_DETAIL_MARKER,false);
 if (!x202)
{
 var x216=x207.childNodes;
for( var x217=x216.length-1;x217>=0;x217--)
x207.removeChild(x216[x217]);
x207.appendChild(x201);
x213=x212.clientWidth;
x214=x212.clientHeight;
}
 var x218=x201.offsetHeight;
 var x219=AdfDhtmlTablePeer._getBlockRowCount(x201);
x201.cachedHeight=x218;
 var x220=Math.round(x218/x219);
this._averageRowHeight=x220;
 var x221;
 if (x210>x205)x221=x220*x210;
 else if(x208== -1
&&x218<(x214 - this._cachedCHHeight - this._cachedCFHeight))
{
x221=x214 - this._cachedCHHeight - this._cachedCFHeight;
}
 else
 x221=x218;
 if (x208== -1)
{
 if (x209>0)
x221+=(x220*x209);
x221+=AdfDhtmlTablePeer._FETCH_MORE_CANVAS_SPACE;
}
x201.style.position='relative';
x207.scrollTop=0;
x201.startRow=x204;
x201.numRows=x219;
 if(x204>0)
x201.startPos=x211=x220*x204;
 else
 x201.startPos=0;
 var x222=this._createAndInitializeScroller(x212,x213,
x214,x221,x215,x201);
x207.onmousewheel=AdfDhtmlTablePeer._handleMouseWheel;
 if(x203.getPlatform()!=AdfAgent.IE_PLATFORM)
x207.addEventListener("DOMMouseScroll",AdfDhtmlTablePeer._handleMouseWheel,true);
x207.onscroll=this.createCallback(this._handleDataBodyScroll);
this._touchMoveManager=
x203.createTouchMoveManager(x207,this.createCallback(this._handleTouchMovement),2);
this._innerTableScrollCallback=this.createCallback(this._handleInnerTableScroll);
this._registerInnerScrollCallback(x201);
 if (!this._headerless)
{
 var x223=this._getColumnHeader();
 if (this._lastFrozen<0)
x223.onscroll=this._innerTableScrollCallback;
 else if (this._colCount>this._lastFrozen + 1)
{
 var x224=AdfDhtmlTablePeer._getChildBySubId(x223,"d2");
x224.onscroll=this._innerTableScrollCallback;
}
}
 if (!this._footerless)
{
 var x225=this._getColumnFooter();
 if (this._lastFrozen<0)
x225.onscroll=this._innerTableScrollCallback;
 else if (this._colCount>this._lastFrozen + 1)
{
x224=AdfDhtmlTablePeer._getChildBySubId(x225,"fd2");
x224.onscroll=this._innerTableScrollCallback;
}
}
x207.onselectstart=this.createCallback(this._handleDataBodySelectStart);
 var x226=this.SizeDatabody(x207,x213,x214);
x207.style.zIndex=1;
x211=
this._computeInitialScrollTop(x206,x201,x204,x221,x226,x218);
this._initScrollLeftTop(x222,x211);
this._restoreScrollPosition();
this._synchronizeRowHeights(x201);
this._stretchTheColumns();
 if(this.isHeightAutoSized())
{
this.AdjustAutoHeight();
x211=this._computeInitialScrollTop(x206,x201,x204,x221,
x207.offsetHeight,x218);
this._currentScrollTop=x211;
 if(x211>0)
{
 if(this._footerless)
x222.scrollTop=x211;
 else
 x222[0].scrollTop=x222[1].scrollTop=x211;
}
}
this._fillViewPort(x207,x207.offsetHeight,false);
this._syncDataBodyHeights();
}
finally
{
this._updatePCState();
this.UpdateRange(true);
}
}
AdfDhtmlTablePeer.prototype._computeInitialScrollTop= function(
x227,x228,x229,x230,x231,x232)
{
 var x233=0;
 if(x229>0)
{
x233=Math.min(x228.startPos,x230 - x231);
x233=Math.max(0,x233);
}
 if("last"==x227.getDisplayRow()&&(x231<x230))
{
x233=x230 - x231;
x228.startPos=x230 - x232;
}
 return x233;
}
AdfDhtmlTablePeer.prototype._handleTouchMovement= function(x234,x235)
{
 var x236=this.__getScrollPos();
 if (x236)
{
this._setScrollLeft(x236.x - x234);
this._setScrollTop(x236.y - x235);
}
}
AdfDhtmlTablePeer.prototype._syncDataBodyHeights= function()
{
 var x237=this.getComponent();
 var x238=x237.getProperty("_afrMasterId");
 var x239=x237.getProperty("_afrSlaveId");
 if((x238||x239)&&this._footerless)
{
AdfPage.PAGE.scheduleTimer(this,this._syncDataBodyHeightsTimeout,x237,0);
}
}
AdfDhtmlTablePeer.prototype._syncDataBodyHeightsTimeout= function(x240)
{
 var x241=x240.findComponent(this._associatedId);
AdfAssert.assert(x241!=null,"There is no associated table");
 var x242=x241.getPeer();
 var x243=this.GetDatabody();
 var x244=x242.GetDatabody();
 var x245=this.GetScroller();
 var x246=x242.GetScroller();
 if(x245&&x246)
{
 var x247=x245.firstChild;
 var x248=x246.firstChild;
 if(x247&&x248)
{
 var x249=
(x245.style.overflowX=="auto"||x245.style.overflow=="auto")&&
x245.offsetHeight>x245.clientHeight;
 var x250=
(x246.style.overflowX=="auto"||x246.style.overflow=="auto")&&
x246.offsetHeight>x246.clientHeight;
 var x251=parseInt(x243.style.height);
 var x252=parseInt(x244.style.height);
 if(!isNaN(x251)&& !isNaN(x252))
{
 if(x250&& !x249)
{
x243.style.height=x252 + 'px';
x245.style.height=x246.style.height;
x245.style.overflowX="scroll";
x247.style.height=x248.style.height;
}
 else if(x249&& !x250)
{
x244.style.height=x251 + 'px';
x246.style.height=x245.style.height;
x246.style.overflowX="scroll";
x248.style.height=x247.style.height;
}
 else if(x246.style.overflowX=="auto")
{
x245.style.overflowX="auto";
x243.style.height=x252 + 'px';
x245.style.height=x246.style.height;
x247.style.height=x248.style.height;
}
 else
 {
x246.style.overflowX="auto";
x244.style.height=x251 + 'px';
x246.style.height=x245.style.height;
x248.style.height=x247.style.height;
}
}
}
}
}
AdfDhtmlTablePeer.prototype._createAndInitializeScroller= function(x253,
x254,x255,x256,x257,x258)
{
 var x259;
 if(this._footerless)
{
 var x260=AdfAgent.AGENT;
 var x261=this.getDomDocument();
x259=x261.createElement('div');
x259.tabIndex= -1;
x259.id=x253.id + '::scroller';
 var x262=x259.style;
x262.position='absolute';
 if(this._associatedId!=null)
{
 var x263=this.getComponent();
 if(x263.getProperty("_afrSlaveId")!=null)
{
x262.overflowX='auto';
x262.overflowY='hidden';
}
 else
 x262.overflow='auto';
 var x264=x263.findComponent(this._associatedId);
AdfAssert.assert(x264!=null,"There is no associated table");
this._associatedPeer=x264.getPeer();
 var x265=x264.getPeer();
 if(x265!=null&&x265._associatedPeer!=this)
x265._associatedPeer=this;
}
 else
 x262.overflow='auto';
x262.zIndex=0;
x262.width=Math.max(x254 - x257,0) + 'px';
x262.top=this._cachedCHHeight + 'px';
x262.height=Math.max(x255 - this._cachedCHHeight,0) + 'px';
 if (AdfDhtmlTablePeer._isRTL())
x262.left='0px';
 else
 x262.right='0px';
 var x266=x261.createElement('div');
 var x267=x260.getIntAttribute(x258,"_totalWidth", -1);
 if (x267== -1)
x267=x258.offsetWidth;
 if (x260.getPlatform()==AdfAgent.IE_PLATFORM)
x266.style.position="absolute";
x266.style.width=x267 - x257 + 'px';
this._canvasHeight=x256;
x266.style.height=x256 + 'px';
x266.style.visibility='hidden';
x259.appendChild(x266);
x253.appendChild(x259);
x260.elementsAdded(x259);
}
 else
 {
x259=this._createAndInitializeColumnFooterScroller(x253,
x254,x255,x256,x257,x258);
}
 return x259;
}
AdfDhtmlTablePeer.prototype._initScrollLeftTop= function(x268,x269)
{
this._currentScrollTop=x269;
 if(this._footerless)
{
 if(x269>0)
x268.scrollTop=x269;
this._currentScrollLeft=AdfDhtmlTablePeer._isRTL()?x268.scrollLeft:0;
AdfRichUIPeer.addEventHandlerToDomInstance(AdfDhtmlTablePeer,
x268,
AdfDhtmlLookAndFeel.SCROLL_EVENT_TYPE);
}
 else
 {
 if(x269>0)
x268[0].scrollTop=x268[1].scrollTop=x269;
this._currentScrollLeft=AdfDhtmlTablePeer._isRTL()?x268[0].scrollLeft:0;
AdfRichUIPeer.addEventHandlerToDomInstance(AdfDhtmlTablePeer,
x268[0],
AdfDhtmlLookAndFeel.SCROLL_EVENT_TYPE);
AdfRichUIPeer.addEventHandlerToDomInstance(AdfDhtmlTablePeer,
x268[1],
AdfDhtmlLookAndFeel.SCROLL_EVENT_TYPE);
}
}
AdfDhtmlTablePeer.prototype._createAndInitializeColumnFooterScroller= function(x270,
x271,x272,x273,x274,x275)
{
 var x276=[];
 var x277=AdfAgent.AGENT;
 var x278=this.getDomDocument();
hscroller=x278.createElement('div');
vscroller=x278.createElement('div');
hscroller.id=x270.id + '::hscroller';
vscroller.id=x270.id + '::vscroller';
hscroller.tabIndex= -1;
vscroller.tabIndex= -1;
 var x279=hscroller.style;
 var x280=vscroller.style;
x279.position=x280.position='absolute';
 if(this._associatedId!=null)
{
 var x281=this.getComponent();
 if(x281.getProperty("_afrSlaveId")!=null)
{
x280.overflowY='hidden';
x280.overflowX='hidden';
x279.overflowY='hidden';
x279.overflowX='auto';
}
 else
 {
x280.overflowY='auto';
x280.overflowX='hidden';
x279.overflowY='hidden';
x279.overflowX='auto';
}
 var x282=x281.findComponent(this._associatedId);
AdfAssert.assert(x282!=null,"There is no associated table");
this._associatedPeer=x282.getPeer();
 var x283=x282.getPeer();
 if(x283!=null&&x283._associatedPeer!=this)
x283._associatedPeer=this;
}
 else
 {
x280.overflowY='auto';
x280.overflowX='hidden';
x279.overflowY='hidden';
x279.overflowX='auto';
}
x279.zIndex=x280.zIndex=0;
x280.width=Math.max(x271 - x274,0) + 'px';
x280.top=this._cachedCHHeight + 'px';
x280.height=Math.max(x272 - this._cachedCHHeight - this._cachedCFHeight,0) + 'px';
 if (AdfDhtmlTablePeer._isRTL())
x280.left='0px';
 else
 x280.right='0px';
 var x284=x278.createElement('div');
 var x285=x278.createElement('div');
 var x286=x277.getIntAttribute(x275,"_totalWidth", -1);
 if (x286== -1)
x286=x275.offsetWidth;
 if (x277.getPlatform()==AdfAgent.IE_PLATFORM)
x284.style.position=x285.style.position="absolute";
x284.style.width=x285.style.width=x286 - x274 + 'px';
this._canvasHeight=x273;
x284.style.height=x285.style.height=x273 + 'px';
hscroller.appendChild(x284);
vscroller.appendChild(x285);
x270.appendChild(vscroller);
x277.elementsAdded(vscroller);
x279.top=this._cachedCHHeight + 'px';
x279.height=Math.max(x272 - this._cachedCHHeight,0) + 'px';
 var x287=vscroller.offsetWidth - vscroller.clientWidth;
 if (AdfDhtmlTablePeer._isRTL())
x279.left=x287 + "px";
 else
 x279.right=x287 + "px";
x279.width=Math.max(x271 - x274 - x287,0) + 'px';
x270.appendChild(hscroller);
x277.elementsAdded(hscroller);
 var x288=hscroller.offsetHeight - hscroller.clientHeight;
x280.height=Math.max(x272 - this._cachedCHHeight - this._cachedCFHeight - x288,0) + 'px';
x276[AdfDhtmlTablePeer._HSCROLLER]=hscroller;
x276[AdfDhtmlTablePeer._VSCROLLER]=vscroller;
 return x276;
}
AdfDhtmlTablePeer.prototype._updatePCState= function()
{
 var x289=this.getDomElement().getAttribute(AdfDhtmlTablePeer._PANEL_COLLECTION_ID);
 if(x289!=null)
{
 var x290=this._pcPeer=AdfPage.PAGE.findComponent(x289).getPeer();
with(x290)
{
resetState();
updateStandardMenuToolbarItems();
updateStandardStatusbarItems();
updateRowSelectionContext();
}
}
}
AdfDhtmlTablePeer.prototype.__getVisibleLeafColumns= function()
{
 if (this._visibleLeafColumns!=null)
 return this._visibleLeafColumns;
 var rootElement=this.getDomElement();
 var leafColClientIdsExpando=AdfAgent.AGENT.getAttribute(rootElement,"_leafColClientIds");
 var leafColClientIds=eval(leafColClientIdsExpando);
 var columns=[];
 if (leafColClientIds!=null)
{
 var count=leafColClientIds.length;
for(var i=0;i<count;i++)
{
 var clientId=leafColClientIds[i];
 var columnComponent=AdfPage.PAGE.findComponent(clientId);
columns.push(columnComponent);
}
}
this._visibleLeafColumns=columns;
 return columns;
}
AdfDhtmlTablePeer.__getSortOrderForColumn= function(x291)
{
 var x292=null; var x293=AdfAgent.AGENT.getElementById(
AdfRichUIPeer.CreateSubId(x291,AdfDhtmlTablePeer.__SORT_INDICATOR));
 if(x293)
{
 var x294=x293.getAttribute(AdfDhtmlTablePeer._SORTED_TYPE);
 if(x294==AdfDhtmlTablePeer._SORTED_DESCENDING)
x292=false;
 else if(x294==AdfDhtmlTablePeer._SORTED_ASCENDING)
x292=true;
}
 return x292;
}
AdfDhtmlTablePeer.prototype.HandleDomMouseMove= function(x295,x296)
{
 if (this._headerless)
 return;
 if (!this._virtInitialized)
 return;
 if(this._resizedTH)
{
 var x297=this._getParentTH(x296);
 if (x297&&(!x295.getColumnResizing||x295.getColumnResizing()=="enabled"))
{
AdfDhtmlTablePeer.SetCursor(x297,AdfAgent.AGENT.getCursor("col-resize"));
}
 return;
}
 var x298=this._mdPos;
 if(x298)
{
 var x299=AdfAgent.AGENT.getMousePosition(x296);
 if(Math.abs(x299.x - x298.x)>
AdfDhtmlTablePeer.COLUMN_RESIZE_MARGIN){
this._mdPos=null;
this._processColumnReorderAction(x296);
}
 return;
}
 if(this._reorderTH)
{
AdfDhtmlTablePeer.SetCursor(this._reorderTH,"move");
 return;
}
 var x300=this._getColumnHeaderMouseAction(x296);
 if(x300)
{
 var x301=x300.cell;
 if ("resize"==x300.type&&this._getResizedCellInfo(x300)&&(!x295.getColumnResizing||x295.getColumnResizing()=="enabled"))
AdfDhtmlTablePeer.SetCursor(x301,AdfAgent.AGENT.getCursor("col-resize"));
 else if("move"==x300.type)
AdfDhtmlTablePeer.SetCursor(x301,AdfAgent.AGENT.getCursor("move"));
 else if ("default"==x300.type)
AdfDhtmlTablePeer.SetCursor(x301,"default");
 else
 AdfDhtmlTablePeer.SetCursor(x301,"");
}
}
AdfDhtmlTablePeer.prototype.HandleComponentMouseDown= function(x302)
{
 if (!this._virtInitialized)
 return;
 if (!this._isOwnComponentEvent(x302))
 return;
 var x303=x302.getNativeEvent();
 var x304=AdfAgent.AGENT;
 var x305=x304.getEventTarget(x303);
 var x306=this.GetRowKeyAndRow(x305,this.getDomElement());
 if(x306!=null)
{
 var x307=x306[0],x308=x306[1];
 if(x307!=null)
{
 if (!this._getExpandAction(x305))
this._handleRowMouseDown(x303,x307,x308);
 return;
}
}
 if (!x304.isLeftButton(x303))
 return;
 var x309=this._getColumnHeaderMouseAction(x303);
 var x310=x309?x309.type:null;
 if(this._isTargetCellEditable(x305)&&"clearAllFilter"!=x310)
{
 if(this._cellNavMode)
this._cellNavMode=false;
 return;
}
 if(!x310)
 return;
 if("selectAll"==x310)
{
this._grabFocus();
 var x311=this.getComponent().getSelectedRowKeys();
 if(x311&&x311[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY])
{
this._selUnselectAll();
this._queueColumnSelectionEvent();
}
 else
 this._selSelectAll();
}
 else if("clearAllFilter"==x310)
{
 var x312=this.getComponent();
 var x313= new AdfQueryEvent(x312);
x313.setClearAll(true);
x312.queueEvent(x313);
}
 else if ("resize"==x310)
{
 var x314=this._getResizedCellInfo(x309);
 if(x314)
{
this._resizedTH=x314.cell;
this._resizedIndex=x314.displayIndex;
this._showColumnResizeIndicator(x314.cell,x314.displayIndex);
this._resizeColDelta=0;
 var x315=this._getColumnHeader();
x304.disableUserSelect(x315);
x302.cancel();AdfPage.PAGE.startDrag(x303,this._colResizeDragCallback,this._colResizeDropCallback);
}
}
 else if("move"==x310)
{
this._mdPos=x304.getMousePosition(x303);
this._reorderTH=x309.cell;
x302.cancel();}
 else if("select"==x310)
{
this._grabFocus();
 var x316=x309.colIndices;
 if(x316.length>0)
{
 if(!x303.shiftKey)
this._anchorColumnHeader=x309.cell;
this._doColumnSelections(x303.ctrlKey,x303.shiftKey,x303.metaKey,
x316,x309.colIds);
 if(this._isMultipleColumnSelect())
{
 if(null==this._handleColumnHeaderDragCallback)
{
this._handleColumnHeaderDragCallback=
this.createCallback(this._handleColumnHeaderDrag);
this._handleColumnHeaderDropCallback=
this.createCallback(this._handleColumnHeaderDrop);
}
 var x315=this._getColumnHeader();
x304.disableUserSelect(x315);
AdfPage.PAGE.startDrag(x303,
this._handleColumnHeaderDragCallback,null);
}
}
}
 if("resize"!=x310&&"sort"!=x310&&x309.cell!=null)
{
this.UpdateFocusManager("selectAll"==x310?
AdfDhtmlTablePeer._SELECT_ALL_FOCUS_TYPE:
AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,
null,x309.cell);
}
}
AdfDhtmlTablePeer.prototype.HandleComponentMouseUp= function(x317)
{
this._mdPos=null;
this._reorderTH=null;
 var x318=x317.getNativeEventTarget();
 if(this._cellNavMode&&(x318.nodeName=="INPUT"&&x318.type=="text"))
{
AdfPage.PAGE.scheduleTimer(this,this._selectInputOnMouseUp,x318,0);
}
}
AdfDhtmlTablePeer.prototype._selectInputOnMouseUp= function(x319)
{
 var x320;
 if (x319.selectionStart!=null)
x320=(x319.selectionEnd - x319.selectionStart)>0;
 else
 x320=this.getDomDocument().selection.createRange().text;
 if(!x320)x319.select();
}
AdfDhtmlTablePeer.prototype.HandleComponentMouseOver= function(x321)
{
 if(this._resizedTH||this._reorderTH)
 return;
 var x322=AdfAgent.AGENT;
 var x323=x321.getNativeEventTarget();
 if(x323!=null)
{
 var x324=x323.tagName;
 if((x324=="TD"||x324=="TH")&&x323.noWrap&& !x323.title)
{
 var x325=this._getOnlyTextNode(x323);
 if(x325&&this._isCellTruncated(x323))
{
x323.title=x325.nodeValue;
}
}
 if(this._hoverHighlightRow)
{
 var x326=this.GetRowKeyAndRow(x323,this.getDomElement());
 if(x326!=null)
{
 var x327=x326[1];
 if(!AdfDomUtils.containsCSSClassName(x327,AdfDhtmlTablePeer._SELECTED_CLASS))
AdfDomUtils.addCSSClassName(x327,AdfDhtmlTablePeer._HIGHLIGHTED_CLASS);
 return;}
}
}
 if (this._headerless)
 return;
 var x328=this._getParentTH(x321.getNativeEvent());
 if (x328&&x328.colSpan<2)
{
 var x329=AdfRichUIPeer.CreateSubId(x328.id,AdfDhtmlTablePeer.__SORT_INDICATOR);
 var x330=x322.getElementById(x329);
 if(x330==null)
 return;
 var x331=x330.getAttribute(AdfDhtmlTablePeer._SORTED_TYPE);
 var x332=x330.getAttribute(AdfDhtmlTablePeer._SUPPORTS_HOVER);
 if(x331==null&&x332)
{
x330.style.display="";
}
}
}
AdfDhtmlTablePeer.prototype.HandleComponentMouseOut= function(x333)
{
 if(this._resizedTH||this._reorderTH)
 return;
 var x334=AdfAgent.AGENT;
 if(this._hoverHighlightRow)
{
 var x335=this.GetRowKeyAndRow(x333.getNativeEventTarget(),this.getDomElement());
 if(x335!=null)
{
AdfDomUtils.removeCSSClassName(x335[1],AdfDhtmlTablePeer._HIGHLIGHTED_CLASS);
 return;}
}
 if (this._headerless)
 return;
 var x336=this._getParentTH(x333.getNativeEvent());
 if (x336&&x336.colSpan<2)
{
this._hideColumnSortableIndicator(x334,x336);
}
}
AdfDhtmlTablePeer.prototype.HandleComponentDblClick= function(x337)
{
 if (!this._virtInitialized)
 return;
 if (!this._isOwnComponentEvent(x337))
 return;
 if(this._isTargetCellEditable(x337.getNativeEventTarget()))
{
 if(this._cellNavMode)
this._cellNavMode=false;
this._ctePatternStart=undefined;}
}
AdfDhtmlTablePeer.prototype._getOnlyTextNode= function(x338)
{
 var x339=x338.ownerDocument;
 var x340;
 var x341=null;
 if(x339.evaluate)
{
x340=x339.evaluate(".//text()",x338,null,XPathResult.ANY_TYPE,null);
x341=x340.iterateNext();
 if(x341&&x340.iterateNext())
x341=null;
}
 else
 {
 var x342=x338.firstChild;
 if(x342&&x342.nodeType==3)
x341=x342;
x340=x338.getElementsByTagName("*");
 var x343=x340.length;
for(var x344=0;x344<x343;x344++)
{
x342=x340[x344].firstChild;
 if(x342&&x342.nodeType==3)
{
 if(x341)
{
x341=null;
break;
}
 else
 x341=x342;
}
}
}
 return x341;
}
AdfDhtmlTablePeer.prototype._isCellTruncated= function(x345)
{
 var x346=x345.cloneNode(true);
 var x347=false;
AdfAgent.AGENT.copyStyle(x345,x346);
x346.style.width="";
 var x348=x346.getElementsByTagName("input");
for(var x349=x348.length-1;x349>=0;x349--)
{
 var x350=x348[x349];
x350.id="";
x350.name="";
}
 var x351=this.getDomElement();
 var x352=x345.ownerDocument;
 var x353=x352.createElement("table");
x351.appendChild(x353);
 var x354=x353.insertRow(-1);
x354.appendChild(x346);
 if(x345.offsetWidth<x346.offsetWidth)
x347=true;
x351.removeChild(x353);
 return x347;
}
AdfDhtmlTablePeer.prototype.HandleComponentContextMenu= function(x355)
{
 var x356=x355.getNativeEvent();
 var x357=AdfAgent.AGENT;
 var x358=false
 if (x357.getPlatform()==AdfAgent.IE_PLATFORM)
{
 if (!x357.pointInElementBounds(this.getDomElement(),x355.getClientX(),x355.getClientY()))
x358=true;
}
 else if (x355.getButtons()!=AdfUIInputEvent.RIGHT_BUTTON_FLAG)
x358=true;
 if (x358)
{
this._handleKeyboardContextMenu(x356,false);
 return;
}
 var x359=this._getColumnHeader();
 if(x359)
{
 var x360=x357.getElementPosition(x359);
}
 var x361=x357.getMousePosition(x356);
 if (x359&&(x361.y - x360.y<=this._cachedCHHeight))
{
this._handleColumnContextMenu(x356);
}
 else
 {
 var x362=x357.getEventTarget(x356);
 if(!this._isTargetCellEditable(x362))
{
 var x363=this.GetRowKeyAndRow(x362,this.getDomElement());
 if(x363!=null)
{
 var x364=x363[0],x365=x363[1];
 if(x364!=null)
{
this.HandleRowContextMenu(x356,x364,x365);
 return;
}
}
this._handleBodyContextMenu(x356);
}
}
}
AdfDhtmlTablePeer.prototype._hideColumnSortableIndicator= function(x366,x367)
{
 if (x367&&x367.colSpan<2)
{
 var x368=AdfRichUIPeer.CreateSubId(x367.id,AdfDhtmlTablePeer.__SORT_INDICATOR);
 var x369=x366.getElementById(x368);
 if(x369==null)
 return;
 var x370=x369.getAttribute(AdfDhtmlTablePeer._SORTED_TYPE);
 var x371=x369.getAttribute(AdfDhtmlTablePeer._SUPPORTS_HOVER);
 if(x370==null&&x371)
{
x369.style.display="none";
}
}
}
AdfDhtmlTablePeer.prototype.HandleComponentClick= function(x372)
{
 if (!this._isOwnComponentEvent(x372))
 return;
 var x373=this.getComponent();
 var x374=AdfAgent.AGENT,x375=x372.getNativeEvent();
 var x376=x374.getEventTarget(x375);
 var x377=this.GetRowKeyAndRow(x376,this.getDomElement());
 if(x377!=null)
{
 var x378=x377[0],x379=x377[1];
 if(x378!=null)
{
 if (x372.isLeftButtonPressed())
{
 var x380=this._getExpandAction(x376);
 if ("expand"==x380)
x373.setDisclosedRowKey(x378,true);
 else if ("collapse"==x380)
x373.setDisclosedRowKey(x378,false);
 else
 this._handleRowClick(x375,x378,x379);
}
 return;
}
}
 if (!this._headerless)
{
 var x381=this._getColumnHeaderMouseAction(x375);
 if(x381&&"sort"==x381.type)
{
AdfTableUtils.queueSortEvent(x373,[x381.sortProperty],[x381.sortOrder]);
x374.eatEvent(x375);
}
}
}
AdfDhtmlTablePeer.prototype.HandleComponentValueChange= function (x382)
{
 if (x382.isCanceled())
 return;
 var x383=x382.getSource();
 var x384=x383.getPeer();
x384.bind(x383);
 var x385=x384.getDomElement();
 if(this._isTargetCellFilter(x385)&&x382.propagatesToServer())
{
this._handleFilterCellAction();
}
}
AdfDhtmlTablePeer.prototype.HandleDomScroll= function(x386,x387)
{
 var x388=this._getScrollLeft();
 var x389;
 if(this._associatedPeer!=null&&AdfAgent.AGENT.getPlatform()==AdfAgent.GECKO_PLATFORM&&
x386.getProperty("_afrSlaveId")!=null)
{
x389= -1;
}
 else
 x389=this._getScrollTop();
this.scrollToPos(x388,x389);
 if(this._associatedPeer!=null)
this._associatedPeer.scrollToPos(-1,x389);
}
AdfDhtmlTablePeer.prototype._handleInnerTableScroll= function(x390)
{
 if (!x390)
x390=AdfPage.PAGE.getDomWindow().event;
 var x391=AdfAgent.AGENT.getEventTarget(x390);
this.scrollToPos(x391.scrollLeft, -1);
}
AdfDhtmlTablePeer.prototype._handleDataBodyScroll= function()
{
 if (this._handleDataCallbackBeingProcessed===true)
{
 if (this._handleDataBodyScrollTimeout!=null)
{
window.clearTimeout(this._handleDataBodyScrollTimeout);
 delete this._handleDataBodyScrollTimeout;
}
this._handleDataBodyScrollTimeout=window.setTimeout(
this.createCallback(this._handleDataBodyScroll),0);
 return;
}
 var x392=this.GetDatabody();
 var x393=x392.firstChild;
 if (x393)
{
 var x394=x392.scrollTop + x393.startPos;
 var x395= -1;
 if (this._lastFrozen<0)
{
x395=x392.scrollLeft;
}
this.scrollToPos(x395,x394);
 if(this._associatedPeer!=null)
this._associatedPeer.scrollToPos(-1,x394);
}
}
AdfDhtmlTablePeer.prototype.__getScrollPos= function()
{
 var x396=this.GetScroller();
 if(x396!=null)
{
 return {x:this._getScrollLeft(),y:this._getScrollTop()};
}
 return null;
}
AdfDhtmlTablePeer.prototype.__restoreScrollerPositions= function(x397,x398)
{
this._setScrollTop(x398);
this._setScrollLeft(x397);
}
AdfDhtmlTablePeer.prototype.scrollToPos= function(x399,x400,x401)
{
 var x402=this.getComponent();
 if(x400!=-1&&this._currentScrollTop!=x400)
{
 delete this._cachedFirstVisibleRowKeyAndRow;
 if (!x401)
x402.setProperty("scrollTop",x400,true,AdfUIComponent.PROPAGATE_ALWAYS);
this._setScrollTop(x400);
this._handleVerticalScroll(x400);
 var x403=this.GetFirstVisibleRowKeyAndRow();
 if (x403.rowKey!=null)
x402.setProperty("scrollTopRowKey",x403.rowKey,true,AdfUIComponent.PROPAGATE_ALWAYS);
 var x404=this.GetDatabody();
 var x405=x404.childNodes;
for(var x406=x405.length-1;x406>=0;x406--)
{
 var x407=x405[x406];
this._synchronizeRowHeights(x407);
}
}
 if(x399!=-1&&this._currentScrollLeft!=x399)
{
 if (!x401)
x402.setProperty("scrollLeft",x399,true,AdfUIComponent.PROPAGATE_ALWAYS);
this._setScrollLeft(x399);
this._handleHorizontalScroll(x399);
}
}
AdfDhtmlTablePeer.prototype.HandleDomKeyDown= function(x408,x409)
{
 var x410=AdfAgent.AGENT;
 var x411=x410.getEventTarget(x409);
 var x412=x409.keyCode;
switch(x412)
{
default:
break;
 case AdfKeyStroke.ESC_KEY:
 if(this._isTargetCellEditable(x411))
{
 if(!this._cellNavMode&&undefined!=x411._afrOldValue)
{
AdfPage.PAGE.scheduleTimer(null,
AdfDhtmlTablePeer._restoreEditableValueOnEsc,x411,0);
x410.eatEvent(x409);
}
this._cellNavMode=true;
}
break;
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 case AdfKeyStroke.ARROWRIGHT_KEY:
 case AdfKeyStroke.ARROWLEFT_KEY:
 var x413=true;
 var x414=this._isTargetCellEditable(x411);
 if(x414&&this._cellNavMode)
{
x413=this._handleArrowKeyNav(x412,x411,x409);
}
 else if(this._cellNavMode&&this._isClickToEdit()&& !this._editableTableReadOnlyMode&&
this.GetFocusedRowKey()!=null&&
(x412==AdfKeyStroke.ARROWUP_KEY||x412==AdfKeyStroke.ARROWDOWN_KEY))
{
this._clickToEditActivateRow(this.GetFocusedRowKey(),
(x412==AdfKeyStroke.ARROWDOWN_KEY),this._lastCTEIndex);
x413=false;
}
 else if(!x414)
{
x410.disableUserSelect(x410.getDomDocument().body);
this._handleArrow(x412,x409);
x413=false;
}
 if(!x413)
x410.eatEvent(x409);
break;
 case AdfKeyStroke.ENTER_KEY:
 var x415=this._getParentTH(x409)
 if(x415&&x415.getAttribute("_afrFH")!=null)
{
 var x416= new AdfQueryEvent(x408);
x416.setClearAll(true);
x408.queueEvent(x416);
}
break;
}
}
AdfDhtmlTablePeer._restoreEditableValueOnEsc= function(x417)
{
x417.value=x417._afrOldValue;
 if(x417.type=="text"&& typeof(x417.select)!=undefined)
x417.select();
}
AdfDhtmlTablePeer.prototype._handleHorizontalScroll= function(x418)
{
 var x419=this.GetDatabody();
 if (this._lastFrozen<0)
{
 if (!this._headerless)
{
this._getColumnHeader().scrollLeft=x418;
}
 if (!this._footerless)
{
this._getColumnFooter().scrollLeft=x418;
}
x419.scrollLeft=x418;
}
 else
 {
 if (!this._headerless)
AdfDhtmlTablePeer._scrollColumnHeader(this._getColumnHeader(),x418);
 if (!this._footerless)
AdfDhtmlTablePeer._scrollColumnFooter(this._getColumnFooter(),x418);
 var x420=x419.childNodes;
for(var x421=0;x421<x420.length;x421++)
AdfDhtmlTablePeer._positionInnerTable(x420[x421],x418);
}
}
AdfDhtmlTablePeer.prototype._handleVerticalScroll= function(x422)
{
 if (this._pendingFetch==AdfTableDataFetchEvent.EXPAND_SUBTYPE||
this._pendingFetch==AdfTableDataFetchEvent.COLLAPSE_SUBTYPE)
 return;
 var x423=this.GetDatabody();
 var x424=x423.offsetHeight;
 var x425=this._fillViewPort(x423,x424,true,true);
 if(this._selectionRequest!=null)
{
 if (x425==AdfDhtmlTablePeer.VIEWPORT_SATISFIED)
{
this._processSelectionRequest();
}
 else if(x425!=AdfDhtmlTablePeer.MISSING_BEFORE&&
x425!=AdfDhtmlTablePeer.MISSING_AFTER)
{
 delete this._selectionRequest;
}
}
 if(this._clickEditRequest!=null&&(x425==AdfDhtmlTablePeer.VIEWPORT_SATISFIED))
this._processClickToEditActivateRequest();
}
AdfDhtmlTablePeer.prototype._fillViewPort= function(x426,
x427,
x428,
x429)
{
 var x430=AdfDhtmlTablePeer.VIEWPORT_SATISFIED;
 if (this._knownRowCount>0&&x427>0)
{
x430=this._isViewportSatisfied(x426,x427);
 if (x430==AdfDhtmlTablePeer.VIEWPORT_SATISFIED)
{
this._repositionBlocksForScroll(x426);
this._hideStatus();
AdfDhtmlTablePeer.SetCursor(x426,"");
 var x431=this._canvasHeight - x427;
 if (x431>0)
{
 if (this._currentScrollTop<x431/2)
this._checkStart(x426);
 else
 this._checkEnd(x426);
}
this.AdjustAutoHeight();
}
 else if (x430&AdfDhtmlTablePeer.MISSING_BEFORE)
this._addAbove(x426,x427,x428,x429);
 else if (x430&AdfDhtmlTablePeer.MISSING_AFTER)
this._addBelow(x426,x427,x428,x429);
 else this._handleLongJump(x426,x427,x428,x429);
}
 return x430;
}
AdfDhtmlTablePeer.prototype._isViewportSatisfied= function(x432,x433)
{
 var x434=x432.childNodes;
 var x435=x434.length;
 var x436=AdfDhtmlTablePeer.NO_BLOCKS;
 var x437=this._currentScrollTop;
 if (x435>0)
{
x436=AdfDhtmlTablePeer.VIEWPORT_SATISFIED;
 if (!this._allRowsAvailableOnClient(x434,x435))
{
 var x438=x434[0];
 var x439=x434[x435-1];
 var x440=x438.startPos - x437;
 var x441=x439.startPos + x439.cachedHeight - x437;
 if (x440>0||(x437==0&&x438.startRow>0))
x436|=AdfDhtmlTablePeer.MISSING_BEFORE;
 if ((x441<x433&&this._canvasHeight>=x433)||
(x437>=this._canvasHeight-x433&&
x439.startRow+x439.numRows<this.GetKnownRowCount()))
{
x436|=AdfDhtmlTablePeer.MISSING_AFTER;
}
 if(x436!=AdfDhtmlTablePeer.VIEWPORT_SATISFIED&&
(x440>x433||x441<0))
{
x436=AdfDhtmlTablePeer.NO_BLOCKS;
}
}
}
 return x436;
}
AdfDhtmlTablePeer.prototype._addAbove= function(x442,
x443,
x444,
x445)
{
 var x446=x442.childNodes;
 var x447=x446.length;
 var x448=x446[0];
 if (x448.startRow==0)
{
 var x449=0;
for(var x450=0;x450<x447;x450++)
{
 var x451=x446[x450];
 var x452=x451.cachedHeight;
x451.startPos=x449;
x449+=x452;
}
this._setScrollTop(0);
this._fillViewPort(x442,x443,x444);
}
 else
 {
 var x453=x448.startRow;
 var x454=this._getBlockFirstRowKey(x448);
this._startFetch(AdfTableDataFetchEvent.BEFORE_KEY_SUBTYPE,x453,x454,x444, !x445);
}
}
AdfDhtmlTablePeer.prototype._addBelow= function(x455,
x456,
x457,
x458)
{
 var x459=x455.childNodes;
 var x460=x459.length;
 var x461=x459[x460-1];
 var x462=x461.startRow + x461.numRows;
 var x463=this.GetRowCount();
 if (x463>0&&x462>=x463)
{
 var x464=this._canvasHeight - x456;
 var x465=this._canvasHeight
for(var x466=x460-1;x466>=0;x466--)
{
 var x467=x459[x466];
 var x468=x467.cachedHeight;
x465-=x468;
x467.startPos=x465;
}
this._setScrollTop(x464);
this._fillViewPort(x455,x456,x457);
}
 else
 {
 var x469=x462 - 1;
 var x470=this._getBlockLastRowKey(x461);
this._startFetch(AdfTableDataFetchEvent.AFTER_KEY_SUBTYPE,x469,x470,x457, !x458);
}
}
AdfDhtmlTablePeer.prototype._handleLongJump= function(x471,
x472,
x473,
x474)
{
 var x475;
 var x476;
 var x477;
 var x478;
 var x479;
 var x480=this.getComponent().getFetchSize();
 var x481=this._currentScrollTop;
 var x482=this.GetKnownRowCount();
 var x483=AdfPage.PAGE.getLookAndFeel();
 var x484=(this.GetRowCount()== -1)?AdfDhtmlTablePeer._FETCH_MORE_CANVAS_SPACE:0;
 if (x481>=this._canvasHeight - x484 - x472){
x477=AdfTableDataFetchEvent.UP_TO_INDEX_SUBTYPE;
x476=x482 - 1;
x475=x483.getTranslatedString("af_table.LABEL_END");
 if (this.GetRowCount()== -1)
x475=x483.getTranslatedString("af_table.LABEL_ROW",
x476 + 1);x479=x476;
x478=x479 - x480 + 1;
}
 else
 {
x477=AdfTableDataFetchEvent.FROM_INDEX_SUBTYPE;
 if (x481==0){
x475=x483.getTranslatedString("af_table.LABEL_START");
x476=0;
}
 else
 {
x476=Math.round(x481/this._averageRowHeight);
x475=x483.getTranslatedString("af_table.LABEL_ROW",
x476 + 1);AdfAssert.assert(x476<x482);
}
x478=x476;
x479=x476 + x480 - 1;
}
 var x485=x471.childNodes;
 if (x485.length>0)
{
 var x486=x485[0];
 var x487=x485[x485.length-1];
 var x488=x486.startRow;
 var x489=x487.startRow + x487.numRows;
 if (x478>=x488&&x478<x489)
{
this._addBelow(x471,x472,x473,x474);
 return;
}
 else if (x479>=x488&&x479<x489)
{
this._addAbove(x471,x472,x473,x474);
 return;
}
}
 if (x473)
this.DisplayStatus(x483.getTranslatedString("af_table.LABEL_GOING_TO",x475));
this._startFetch(x477,x476,null,x473, !x474);
}
AdfDhtmlTablePeer.prototype._deleteOffscreenBlocks= function(x490,x491,x492)
{
 var x493=x490.childNodes;
 var x494=x493.length;
 var x495=this._currentScrollTop;
for(var x496=x494-1;x496>=0;x496--)
{
 var x497=x493[x496];
 if(x497==x492)
continue;
 var x498=x497.startPos - x495;
 var x499=x498 + x497.cachedHeight;
 if (x499<0||x498>x491)
{
this.UnregisterNode(x497);
x490.removeChild(x497);
}
}
}
AdfDhtmlTablePeer.prototype.UnregisterNode= function(x500)
{
AdfPage.PAGE.removeComponentsInSubtree(x500);
AdfAgent.AGENT.elementsRemoved(x500);
}
AdfDhtmlTablePeer.prototype._repositionBlocksForScroll= function(x501)
{
 var x502=x501.firstChild;
 var x503=this._currentScrollTop;
 if (x502)
{
x501.scrollTop=x503 - x502.startPos;
}
}
AdfDhtmlTablePeer.prototype._undoScroll= function()
{
 var x504=this.GetDatabody();
 var x505=x504.firstChild;
 if (x505)
{
 var x506=x505.startPos + x504.scrollTop;
this._setScrollTop(x506);
}
}
AdfDhtmlTablePeer.prototype._restoreSavedDisclosureState= function()
{
this.getComponent().setProperty('disclosedRowKeys',this._savedDisclosedState,
false,AdfUIComponent.PROPAGATE_NEVER);
this._savedDisclosedState=undefined;
}
AdfDhtmlTablePeer.prototype._queueFetchEvent= function(x507,x508,x509,x510)
{
 var x511=this._fetchId++;
 var x512=this.getComponent();
 var x513= new AdfTableDataFetchEvent(x512,x511,x508,x509,x510);
x513.setPartial(true);
x513.setRenderOnly(x507);
 var x514=false;
 if (x507)
{
AdfPage.PAGE.queueEventToServer(x513);
}
 else
 {
x512.queueEvent(x513);
x514=x513.isCanceled();
}
 if (!x514)
{
this._pendingFetch=x508;
this._pendingId=x511;
this._fetchIndex=x509;
this._fetchKey=x510;
this._pendingRenderOnly=x507;
}
 return x514?null:x513;
}
AdfDhtmlTablePeer.prototype._startFetch= function(x515,x516,x517,x518,x519)
{
 if (x515==this._pendingFetch&&
x516==this._fetchIndex&&
x517==this._fetchKey)
 return;
 if (x518)
{
 var x520=
 new Function("var c = arguments.callee;c._self._delayedNavigate(c._sTop, c._subtype, c._index, c._key, c._renderOnly);");
x520._sTop=this._currentScrollTop;
x520._subtype=x515;
x520._index=x516;
x520._key=x517;
x520._renderOnly=x519;
x520._self=this;
setTimeout(x520,300);
this.CancelPendingFetch();
}
 else
 {
 var x521=this._queueFetchEvent(x519,x515,x516,x517);
 if (!x521)
{
this._undoScroll();
 return;
}
 var x522=AdfPage.PAGE.getLookAndFeel().getTranslatedString("af_table.LABEL_FETCHING");
this.DisplayStatus(x522);
AdfDhtmlTablePeer.SetCursor(this.GetDatabody(),"wait");
 if (this._pruneKeyCache)
{
x521.setClientTokens(this._collectClientTokens(this._pruneKeyCache));
this._pruneKeyCache=null;
}
}
}
AdfDhtmlTablePeer.prototype._delayedNavigate= function(x523,x524,x525,x526,x527)
{
 if (this._currentScrollTop==x523)
this._startFetch(x524,x525,x526,false,x527);
}
AdfDhtmlTablePeer.prototype.CancelPendingFetch= function()
{
this._pendingFetch=undefined;
this._fetchIndex=undefined;
this._fetchKey=undefined;
this._pendingId=undefined;
this._pendingRenderOnly=undefined;
}
AdfDhtmlTablePeer.prototype.IsFetchPending= function()
{
 return (this._pendingFetch!=undefined);
}
AdfDhtmlTablePeer.prototype.isDisclosureFetchPending= function()
{
 return (this._pendingFetch==AdfTableDataFetchEvent.EXPAND_SUBTYPE||
this._pendingFetch==AdfTableDataFetchEvent.COLLAPSE_SUBTYPE);
}
AdfDhtmlTablePeer.prototype.InsertBlock= function(
x528,
x529,
x530,
x531,
x532)
{
 var x533=AdfAgent.AGENT;
this._initNewBlock(x528,x529,x530);
 var x534=this.GetDatabody();
 var x535=x534.offsetHeight;
 var x536=null;
 var x537=x534.childNodes;
for(var x538=0;x538<x537.length&& !x536;x538++)
{
 var x539=x537[x538];
 if (x529>=x539.startRow&&x529<=x539.startRow + x539.numRows)
x536=x539;
}
AdfAssert.assert(x536);
 var x540=null;
 var x541=false;
this._sizeBlockForFrozenColumns(x528,x534.offsetWidth);
this._registerInnerScrollCallback(x528);
this._stretchLastBlockColumn(x528);
 if (x529==x536.startRow){
x541=true;
x534.insertBefore(x528,x536);
}
 else
 {
 if (x529<x536.startRow + x536.numRows){
 if (x530==x531){
x540=x536.cloneNode(false);
x540.numRows=x536.numRows - x529 + x536.startRow;
 var x542=AdfDomUtils.getFirstDescendentElement(x536,"TBODY");
AdfAssert.assert(x542!=null,"Illegal State: data block with no tbody");
 var x543=x542.cloneNode(false);
 var x544=x536.rows;
for(var x545=x536.numRows-1;x545>=x529-x536.startRow;x545--)
{
 var x546=x544[x545];
x542.removeChild(x546);
x543.insertBefore(x546,x543.firstChild);
}
 if (x533.getPlatform()==AdfAgent.WEBKIT_PLATFORM)
{
 var x547=AdfDomUtils.getFirstDescendentElement(x528,"COLGROUP");
 if (x547)
x540.appendChild(x547.cloneNode(true));
}
x540.appendChild(x543);
 var x548=x540.rows[0].cells;
 var x549=x536.rows[0].cells;
for(var x550=0;x550<x548.length;x550++)
x548[x550].style.width=x549[x550].style.width;
}
 else
 {
for(var x545=x536.numRows-1;x545>=x529-x536.startRow;x545--)
{
x533.elementsRemoved(x536.rows[x545]);
x536.deleteRow(x545);
}
}
 if(x540)
x533.elementsAdded(x540);
x536.numRows=x529 - x536.startRow;
x536.cachedHeight=x536.offsetHeight;
}
x534.insertBefore(x528,x536.nextSibling);
}
this.SetNewBlockScrollLeft(x528);
x528.cachedHeight=x528.offsetHeight;
 if (x541)
x528.startPos=x536.startPos;
 else
 x528.startPos=x536.startPos + x536.cachedHeight;
this._synchronizeRowHeights(x528);
 if (x540)
{
x534.insertBefore(x540,x528.nextSibling);
x540.cachedHeight=x540.offsetHeight;
this.SetNewBlockScrollLeft(x540);
}
 var x551=0;
 if (x530==x531){
 var x552=x528;
while(current=x552.nextSibling)
{
current.startRow=x552.startRow + x552.numRows;
current.startPos=x552.startPos + x552.cachedHeight;
x552=current;
}
x551=x528.cachedHeight;
}
 else
 {
 var x553=x534.lastChild;
while(x528!=x553)
{
this.UnregisterNode(x553);
x534.removeChild(x553);
x553=x534.lastChild;
}
x551=this._averageRowHeight*x531;
}
this._knownRowCount+=x531;
 if (this._rowCount!= -1)
this._rowCount+=x531;
this._adjustCanvasHeight(x551,x534);
 if (x532==0)
{
 if (!this.isHeightAutoSized())
this._deleteOffscreenBlocks(x534,x535,x528);
this._stretchTheColumns();
this._checkForScrollableLastBlockInViewport(x534);
this.BlockInserted(x528,x529,x530);
}
}
AdfDhtmlTablePeer.prototype._initNewBlock= function(x554,x555,x556)
{
x554.style.position='relative';
x554.startRow=x555;
x554.numRows=x556;
}
AdfDhtmlTablePeer.prototype.SetNewBlockScrollLeft= function(x557)
{
 var x558=this._currentScrollLeft;
 if (this._lastFrozen>=0&&x558!=0)
AdfDhtmlTablePeer._positionInnerTable(x557,x558);
}
AdfDhtmlTablePeer.prototype._adjustCanvasHeight= function(x559,
x560,
x561,
x562)
{
 if (x559!=0)
{
 var x563=this._canvasHeight;
 var x564=this._canvasHeight + x559;
 var x565=(this.GetRowCount()== -1)?AdfDhtmlTablePeer._FETCH_MORE_CANVAS_SPACE:0;
 var x566=this.GetKnownRowCount();
this._averageRowHeight=Math.round((x564 - x565)/x566);
this._canvasHeight=this._averageRowHeight*x566 + x565;
this._setFakeCanvasHeight(this._canvasHeight);
 if (x562)
{
 var x567=this._canvasHeight/x563;
 var x568=x560.firstChild;
 if (x568)
{
 var x569=x568.startPos;
x568.startPos=Math.round(x568.startPos*x567);
 var x570=x568.startPos - x569;
 var x571=x568.nextSibling;
while(x571)
{
x571.startPos+=x570;
x571=x571.nextSibling;
}
this._setScrollTop(Math.round(this._currentScrollTop*x567));
}
}
this._currentScrollTop=this._getScrollTop();
}
 if (x559!=0||x561)
{
 var x572=this.getDomElement();
this.SizeDatabody(x560,x572.clientWidth,x572.clientHeight);
}
}
AdfDhtmlTablePeer.prototype._checkForScrollableLastBlockInViewport= function(x573)
{
 var x574=x573.lastChild;
 if(x574!=null&&(this.GetRowCount()==x574.startRow + x574.numRows)&&
(x574.startPos + x574.cachedHeight>this._canvasHeight))
{
this._canvasHeight=x574.startPos + x574.cachedHeight;
this._setFakeCanvasHeight(this._canvasHeight);
 var x575=this.getDomElement();
this.SizeDatabody(x573,x575.clientWidth,x575.clientHeight);
}
}
AdfDhtmlTablePeer.prototype.SizeDatabody= function(x576,x577,x578)
{
 var x579=AdfAgent.AGENT;
 var x580=this._getScrollbarWidth();
 var x581=this._getScrollbarHeight();
 var x582=Math.max(0,x577 - x580);
x576.style.width=x582 + 'px';
 var x583=Math.max(0,x578 - this._cachedCHHeight - this._cachedCFHeight - x581);
x576.style.height=x583 + 'px';
 if (!this._headerless)
{
 var x584=this._getColumnHeader().style;
x584.width=x576.style.width;
x581>0?x584.borderRightWidth="":x584.borderRightWidth="0px";
}
 if (!this._footerless)
{
 var x585=this._getColumnFooter().style;
x585.width=x576.style.width;
x581>0?x585.borderRightWidth="":x585.borderRightWidth="0px";
}
 if (!this.IsEmpty&&this._lastFrozen>=0)
{
this._sizeRegionsForFrozenColumns(x576,x582);
}
this._databodyHeight=x583;
 return x583;
}
AdfDhtmlTablePeer.prototype._getScrollbarWidth= function()
{
 if(this.IsEmpty) return 0;
 var x586;
 var x587=this.GetScroller();
 if(this._footerless)
{
x586=x587.offsetWidth - x587.clientWidth;
}
 else
 {
 var x588=x587[AdfDhtmlTablePeer._VSCROLLER];
x586=x588.offsetWidth - x588.clientWidth;
}
 return x586;
}
AdfDhtmlTablePeer.prototype._getScrollbarHeight= function()
{
 var x589;
 if(!this.IsEmpty)
{
 var x590=this.GetScroller();
 if(this._footerless)
{
x589=x590.clientHeight>3?
x590.offsetHeight - x590.clientHeight:0;
}
 else
 {
 var x591=x590[AdfDhtmlTablePeer._HSCROLLER];
x589=x591.clientHeight>3?
x591.offsetHeight - x591.clientHeight:0;
}
}
 else
 {
 var x592=this.getDomElement();
x589=x592.offsetHeight - x592.clientHeight;
}
 return x589;
}
AdfDhtmlTablePeer.prototype._handleDataCallback= function(x593,x594,x595,x596)
{
 var x597=AdfAgent.AGENT;
 var x598=x597.getIntAttribute(x593,"_startRow",0);
 var x599=AdfDhtmlTablePeer._getBlockRowCount(x593);
 if (x594==AdfTableDataFetchEvent.EXPAND_SUBTYPE)
{
 return this.HandleExpand(x593,x599,x596);
}
 if (x594==AdfTableDataFetchEvent.COLLAPSE_SUBTYPE)
{
 return this.HandleCollapse(x593,x598,x596);
}
 if (x594==AdfTableDataFetchEvent.CLICK_EDIT_ACTIVE_ROW)
{
 return this.HandleClickToEditActiveRow(x593,x599,x596);
}
 var x600=this.GetDatabody();
 var x601=x600.offsetHeight;
 var x602=x600.childNodes;
 var x603=x602.length;
 var x604=this._currentScrollTop;
this._initNewBlock(x593,x598,x599);
 if (x599>0)
{
this._sizeBlockForFrozenColumns(x593,x600.offsetWidth);
this._registerInnerScrollCallback(x593);
this._stretchLastBlockColumn(x593);
}
this._handleDataCallbackBeingProcessed=true;
try
{
 if (x594==AdfTableDataFetchEvent.FROM_INDEX_SUBTYPE
||x594==AdfTableDataFetchEvent.UP_TO_INDEX_SUBTYPE)
{
this.RemoveAllBlocks(x600);
x600.appendChild(x593);
 var x605=x593.offsetHeight;
this._adjustRowCountFromResponse(x600,x593,x599,x605);
 var x606=0;
 if (x604>=this._canvasHeight - x601){
x606=x605 - x601;
}
x593.startPos=x604 - x606;
x593.cachedHeight=x605;
}
 else
 {
 if (x594==AdfTableDataFetchEvent.AFTER_KEY_SUBTYPE)
{
 var x607=x602[x603-1];
 if (x599==0)
{
 if(this.GetRowCount()== -1)
{
 var x608=x597.getIntAttribute(x607,"_rowCount", -1);
this._rowCount=(x608== -1?this._knownRowCount:x608);
 if(x602[0].startPos==0&&
(x607.startPos + x607.cachedHeight)<=this._canvasHeight)
{
this._canvasHeight=x607.startPos + x607.cachedHeight;
this._setFakeCanvasHeight(this._canvasHeight);
}
}
 else
 {
this._adjustRowCountFromResponse(x600,x593);
}
}
 else
 {
x593.startPos=x607.startPos + x607.cachedHeight;
x600.appendChild(x593);
x593.cachedHeight=x593.offsetHeight;
 var x609=x598 - x607.startRow - x607.numRows;
 if (x609!=0)
{
this.ShiftIndex(x607,x609,false);
}
this._adjustRowCountFromResponse(x600,x593);
 if (x609!=0&& !this.IsReceivingActiveEvents())
{
 var x610=x607;
while(x610)
{
 var x611=x610.previousSibling;
this.UnregisterNode(x610);
x600.removeChild(x610);
x610=x611;
}
}
 var x612=x598 + x599 - this.GetKnownRowCount();
 if (x612>0)
{
this._knownRowCount+=x612;
 var x613=x593.cachedHeight;
 if (x612<x599)
{
x613=0;
 var x614=x593.rows;
for(var x615=x599 - x612;x615<x599;x615++)
x613+=x614[x615].offsetHeight;
}
this._adjustCanvasHeight(x613,x600);
}
 else
 {
this._checkForScrollableLastBlockInViewport(x600);
}
}
}
 else if (x594==AdfTableDataFetchEvent.BEFORE_KEY_SUBTYPE)
{
 var x616=x602[0];
x600.insertBefore(x593,x616);
 var x617=x593.offsetHeight;
x593.startPos=x616.startPos - x617;
x593.cachedHeight=x617;
 var x609=x598 - x616.startRow + x599;
 if (x609!=0)
{
this.ShiftIndex(x616,x609,true);
}
 var x618=this._adjustRowCountFromResponse(x600,x593);
 if ((x609!=0||x618!=0)&& !this.IsReceivingActiveEvents())
{
 var x610=x616;
while(x610)
{
 var x611=x610.nextSibling;
this.UnregisterNode(x610);
x600.removeChild(x610);
x610=x611;
}
}
}
 if (!x595)
this._deleteOffscreenBlocks(x600,x601,x593);
this._repositionBlocksForScroll(x600);
this._processSelectionRequest();
 if(this._clickEditRequest!=null)
this._processClickToEditActivateRequest();
}
}
finally
{
 delete this._handleDataCallbackBeingProcessed;
}
 if (x599!=0)
{
this.SetNewBlockScrollLeft(x593);
this._synchronizeRowHeights(x593);
}
this.UpdateRange(false);
 return true;
}
AdfDhtmlTablePeer.prototype._adjustRowCountFromResponse= function(x619,x620,x621,x622)
{
 var x623=0;
 var x624=this.GetRowCount();
 if (x624!= -1)
{
 var x625=AdfAgent.AGENT.getIntAttribute(x620,"_rowCount", -1);
 if(this._unavailableRowIndex==0)
x625= -1;
 else if (this._unavailableRowIndex>0)
x625=this._unavailableRowIndex;
 if (x625!= -1)
x623=x625 - x624;
}
 if (x623!=0)
{
this._knownRowCount=x625;
this._rowCount=x625;
 var x626;
 if (x621!=undefined&&x622!=undefined&&x621==x625)
{
x626=x622 - this._averageRowHeight*x624;
}
 else
 {
x626=this._averageRowHeight*x623;
}
this._adjustCanvasHeight(x626,x619,false);
}
 return x623;
}
AdfDhtmlTablePeer.prototype.HandleExpand= function(x627,x628,x629)
{
 return this._handleExpandCollapse(x627,x629,true);
}
AdfDhtmlTablePeer.prototype.HandleCollapse= function(x630,x631,x632)
{
 return this._handleExpandCollapse(x630,x632,false);
}
AdfDhtmlTablePeer.prototype._handleExpandCollapse= function(x633,x634,x635)
{
 var x636=x633.getAttribute("_startKey");
 var x637=null;
 if (x636)
x637=this.FindRowByKey(x636);
 if (x637)
{
 var x638=AdfPage.PAGE;
 var x639=x637.tr;
 var x640=x637.block;
this._changeDetailIcon(x639,x635);
 var x641=x640.cachedHeight;
 var x642=null;
 var x643;
 if(x638.isAnimationEnabled()&& !this.isHeightAutoSized())
{
x643=
parseInt(x638.getLookAndFeel().getSkinProperty("af|table-tr-detail-animation-duration"));
}
 if (x635)
{
 var x644=x639.cells.length;
 var x645=x633.rows[0];
 if (x644>1)
x645.cells[0].colSpan=x644;
x645.parentNode.removeChild(x645);
x639.parentNode.insertBefore(x645,x639.nextSibling);
AdfAgent.AGENT.elementsAdded(x645);
 if(x643>0)
x642=x645.cells[0];
}
 else
 {
 var x646=x639.nextSibling;
 if (AdfAgent.getAgent().getAttribute(x646,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
this.UnregisterNode(x646);
 if(x643>0)
{
x646.style.display="none";
x642=x646.cells[0];
}
 else
 x646.parentNode.removeChild(x646);
}
 else
 {
AdfLogger.LOGGER.severe("Unable to locate detail row");
}
}
 var x647=x640.offsetHeight;
x640.cachedHeight=x647;
 var x648=x647 - x641;
 var x649=x640.nextSibling;
while(x649)
{
x649.startPos+=x648;
x649=x649.nextSibling;
}
 var x650=this.GetDatabody();
this._adjustCanvasHeight(x648,x650);
 if (x634==0)
{
this._stretchTheColumns();
this._checkForScrollableLastBlockInViewport(x650);
}
 if(x642!=null)
{
this._doDisclosureAnimation(x642,x643,x635);
}
 return true;
}
 else
 return false;
}
AdfDhtmlTablePeer.prototype._doDisclosureAnimation= function(x651,x652,x653)
{
 var x654=x651.ownerDocument;
 var x655=x653?x654.createElement("div"):x651.firstChild;
 var x656=x655.style;
 var x657=0;
 if(x653)
{
x656.overflow="hidden";
x656.height="1px";
x656.position="relative";
 var x658=AdfAgent.AGENT.getComputedStyle(x651);
 var x659=AdfAgent.getCSSLengthAsInt;
x657=x651.clientHeight - x659(x658.paddingTop) -
 x659(x658.paddingBottom);
 var x660=x651.firstChild;
while(x660)
{
x655.appendChild(x660);
x660=x651.firstChild;
}
x651.appendChild(x655);
}
 else x651.parentNode.style.display="";
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_SLOW_FAST_SLOW,
x652,
[
{
"element":x655,
"properties":{"height":x657}
}
],
null,
 !x653?AdfDhtmlTablePeer.CollapseAnimationComplete:null,
 !x653?{wrapper:x651.parentNode,peer:this}:null);
}
AdfDhtmlTablePeer.CollapseAnimationComplete= function(x661)
{
 var x662=x661.wrapper;
 var x663=x661.peer;
x662.parentNode.removeChild(x662);
 if (x663)
{
x663.SetAnimating(false);
x663.AdjustAutoHeight();
}
}
AdfDhtmlTablePeer.prototype.SetAnimating= function(x664)
{
this._animating=x664;
}
AdfDhtmlTablePeer.prototype.BusyAnimating= function()
{
 return this._animating;
}
AdfDhtmlTablePeer.prototype.HandleClickToEditActiveRow= function(x665,x666,x667)
{
 delete this._oldActiveRowKey;
 if(x666>0)
{
 var x668=this._columnStretching;
 if ((x668!=null)&&(x668!="none"))
{
this._sizeBlockForFrozenColumns(x665,this.GetDatabody().offsetWidth);
this._stretchLastBlockColumn(x665);
}
 var x669=AdfAgent.AGENT;
 var x670=x665.rows;
 var x671=x670[0];
 var x672=(x670.length>1&&this._hasDetailStamp)?x670[1]:null;
 var x673=x669.getAttribute(x671,AdfDhtmlTablePeer._ROW_KEY);
this._replaceRowByKey(x673,x671,x672);
 if (x667==0)
this._handleClickToEditActiveRowAfter();
 return true;
}
 else
 return false;
}
AdfDhtmlTablePeer.prototype._copyCellWidths= function(x674,x675)
{
AdfAssert.assert(x674!=null,"Unable to copy cell widths if the given source row is invalid!");
AdfAssert.assert(x675!=null,"Unable to copy cell widths if the target row is invalid!");
 var x676=null;
 var x677=null;
 var x678=x674.cells;
 var x679=x675.cells;
 var x680=x678.length;
for(var x681=0;x681<x680;x681++)
{
x676=x678[x681];
x677=x679[x681];
x677.style.width=x676.style.width;
}
 if (this._lastFrozen>=0)
{
 var x682=AdfDhtmlTablePeer._getNestedScrolledTable(x674);
 var x683=AdfDhtmlTablePeer._getNestedScrolledTable(x675);
x678=x682.rows[0].cells;
x679=x683.rows[0].cells;
x680=x678.length;
for(var x681=0;x681<x680;x681++)
{
x676=x678[x681];
x677=x679[x681];
x677.style.width=x676.style.width;
}
}
}
AdfDhtmlTablePeer.prototype._replaceRowByKey= function(x684,x685,x686)
{
 var x687=AdfAgent.AGENT;
 var x688=this.FindRowByKey(x684);
 if (x688)
{
 var x689=x688.tr;
 var x690=x688.block;
 var x691=x690.cachedHeight;
this._copyCellWidths(x689,x685);
this.UnregisterNode(x689);
x689.parentNode.replaceChild(x685,x689);
x687.elementsAdded(x685);
 if(x686)
{
x689=x685.nextSibling;
 if(x687.getAttribute(x689,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
this.UnregisterNode(x689);
x689.parentNode.replaceChild(x686,x689);
x687.elementsAdded(x686);
x686.cells[0].colSpan=x685.cells.length;
}
}
 var x692=x690.offsetHeight;
x690.cachedHeight=x692;
 var x693=x692 - x691;
 var x694=x690.nextSibling;
while(x694)
{
x694.startPos+=x693;
x694=x694.nextSibling;
}
 if (this._lastFrozen>=0)
{
cells=x685.cells;
 var x695=cells[cells.length-1];
 var x696=AdfDhtmlTablePeer.FindFirstChildByTagName(x695,"DIV");
x696.onscroll=this._innerTableScrollCallback;
}
this._adjustCanvasHeight(x693,this.GetDatabody());
}
}
AdfDhtmlTablePeer.prototype._handleClickToEditActiveRowAfter= function()
{
this._stretchTheColumns();
 var x697=this._currentScrollLeft;
 if (x697!=0)
this._handleHorizontalScroll(x697);
this._processClickToEditRequestTimerId=
AdfPage.PAGE.scheduleTimer(this,this._processClickToEditRequest,true,10);
}
AdfDhtmlTablePeer.prototype.SetFirst= function(x698)
{
 var x699=this.getComponent();
x699.setProperty("first",x698,false,AdfUIComponent.PROPAGATE_ALWAYS);
}
AdfDhtmlTablePeer.prototype.SetRows= function(x700)
{
 var x701=this.getComponent();
x701.setRows(x700);
}
AdfDhtmlTablePeer.prototype.UpdateRange= function(x702)
{
 var x703=this.getComponent();
 var x704=this.GetDatabody().childNodes;
 if (x704.length==0)
 return;
 var x705=x704[0].startRow;
 var x706=x704[x704.length-1];
 var x707=x706.startRow + x706.numRows - x705;
this.SetFirst(x705);
this.SetRows(x707);
 var x708=this.GetFirstVisibleRowKeyAndRow();
 if (x708.rowKey!=null&& !x702)
x703.setProperty("scrollTopRowKey",x708.rowKey,true,AdfUIComponent.PROPAGATE_ALWAYS);
}
AdfDhtmlTablePeer.prototype._checkStart= function(x709)
{
 var x710=x709.childNodes;
 if (x710.length<1)
 return;
 var x711=x710[0];
 if (x711.startPos<0)
{
 var x712=this._currentScrollTop - x711.startPos;
this._setScrollTop(x712);
for(var x713=0;x713<x710.length;x713++)
x710[x713].startPos-=x711.startPos;
}
}
AdfDhtmlTablePeer.prototype._checkEnd= function(x714)
{
 var x715=x714.childNodes;
 if (x715.length<1)
 return;
 var x716=x715[x715.length-1]
 var x717=x716.startPos + x716.cachedHeight - this._canvasHeight;
 if (this.GetRowCount()== -1)
x717+=AdfDhtmlTablePeer._FETCH_MORE_CANVAS_SPACE;
 if (x717>0)
{
 var x718=this._currentScrollTop - x717;
this._setScrollTop(x718);
for(var x719=0;x719<x715.length;x719++)
x715[x719].startPos-=x717;
}
 if (this.GetRowCount()== -1)
{
 var x720=x714.offsetHeight;
 var x721=this._canvasHeight - x720 - AdfDhtmlTablePeer._FETCH_MORE_CANVAS_SPACE;
 if (this._currentScrollTop>x721)
{
this._setScrollTop(x721);
}
}
}
AdfDhtmlTablePeer.prototype._processSelectionRequest= function()
{
 var x722=AdfAgent.AGENT;
 var x723=this._selectionRequest;
 var x724=null;
 if (x723==null)
{
 return;
}
 else if (x723==AdfDhtmlTablePeer._SELECT_PAGE_UP)
{
x724=this.GetFirstVisibleRowKeyAndRow();
}
 else if (x723==AdfDhtmlTablePeer._SELECT_PAGE_DOWN)
{
x724=this._getLastVisibleRowKeyAndRow();
}
 else if (x723==AdfDhtmlTablePeer._SELECT_ARROW_DOWN||
x723==AdfDhtmlTablePeer._FOCUS_RH_ARROW_DOWN||
x723==AdfDhtmlTablePeer._FOCUS_ROW_ARROW_DOWN)
{
x724=this._getNextRowKeyAndRow(this._lastRowKeyInView);
}
 else if (x723==AdfDhtmlTablePeer._SELECT_ARROW_UP||
x723==AdfDhtmlTablePeer._FOCUS_RH_ARROW_UP||
x723==AdfDhtmlTablePeer._FOCUS_ROW_ARROW_UP)
{
x724=this._getPreviousRowKeyAndRow(this._lastRowKeyInView);
}
 var x725=x724.rowKey,x726=x724.row;
 if(x725!=null)
{
 if(x723==AdfDhtmlTablePeer._FOCUS_RH_ARROW_UP||
x723==AdfDhtmlTablePeer._FOCUS_RH_ARROW_DOWN)
{
 var x727=this.GetRowHeaderCellFromRow(x726);
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,x725,x727);
}
 else
 {
 if(x723!=AdfDhtmlTablePeer._FOCUS_ROW_ARROW_UP&&
x723!=AdfDhtmlTablePeer._FOCUS_ROW_ARROW_DOWN)
{
this._selSelectRow(x725,x726);
}
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x725,x726);
}
this._unclipRow(x726);
}
 delete this._selectionRequest;
}
AdfDhtmlTablePeer.prototype.DisplayStatus= function(x728,x729)
{
 var x730=this._getStatusMessage();
x730.innerHTML=x728;
 var x731=x730.style;
 if (x731.display=='none')
{
x731.zIndex=5000;
 var x732=this.GetDatabody();
x731.visibility='hidden';
x731.display='block';
 var x733;
 if (this._virtInitialized)
x733=x732.offsetHeight;
 else
 x733=this.getDomElement().clientHeight - this._cachedCHHeight;
x731.top=this._cachedCHHeight + Math.floor((x733 - x730.offsetHeight)/2) + 'px';
 var x734='25px'
 if (x729)
{
x734=Math.floor(x732.offsetWidth/2 - x730.offsetWidth/2) + 'px';
}
 if (AdfDhtmlTablePeer._isRTL())
x731.left=x734;
 else
 x731.right=x734;
x731.visibility='visible';
}
}
AdfDhtmlTablePeer.prototype._hideStatus= function()
{
 var x735=this._getStatusMessage();
 var x736=AdfAgent.AGENT;
 var x737=this.GetScroller();
 var x738;
 var x739;
 var x740=
(x737!=null&&
x736.getPlatform()==AdfAgent.IE_PLATFORM&&
x736.getVersion()>=8);
 if (x740)
{
x738=x737.scrollTop;
x739=x737.scrollLeft;
}
x735.style.display='none';
 if (x740)
{
x737.scrollTop=x738;
x737.scrollLeft=x739;
}
}
AdfDhtmlTablePeer.prototype.GetDatabody= function(x741)
{
 return this._getElemBySubId("db",x741);
}
AdfDhtmlTablePeer.prototype._getStatusMessage= function()
{
 return this._getElemBySubId("sm");
}
AdfDhtmlTablePeer.prototype._getColumnResizeIndicator= function()
{
 return this._getElemBySubId("ri");
}
AdfDhtmlTablePeer.prototype._getColumnHeader= function()
{
 return this._getElemBySubId("ch");
}
AdfDhtmlTablePeer.prototype._getColumnFooter= function()
{
 return this._getElemBySubId("cf");
}
AdfDhtmlTablePeer.prototype._setFakeCanvasWidth= function(x742)
{
 var x743=this.GetScroller();
 if(this._footerless)
{
 var x744=AdfDhtmlTablePeer.FindFirstChildByTagName(x743,"DIV");
x744.style.width=x742 + 'px';
}
 else
 {
 var x745=AdfDhtmlTablePeer.FindFirstChildByTagName(x743[0],"DIV");
 var x746=AdfDhtmlTablePeer.FindFirstChildByTagName(x743[1],"DIV");
x746.style.width=x745.style.width=x742 + 'px';
}
}
AdfDhtmlTablePeer.prototype._setFakeCanvasHeight= function(x747)
{
 var x748=this.GetScroller();
 if(this._footerless)
{
 var x749=x748.scrollTop;
 var x750=AdfDhtmlTablePeer.FindFirstChildByTagName(x748,"DIV");
x750.style.height=x747 + 'px';
x748.scrollTop=x749;
}
 else
 {
 var x751=AdfDhtmlTablePeer.FindFirstChildByTagName(x748[0],"DIV");
 var x752=AdfDhtmlTablePeer.FindFirstChildByTagName(x748[1],"DIV");
x752.style.height=x751.style.height=x747 + 'px';
}
}
AdfDhtmlTablePeer.prototype.GetScroller= function()
{
 if(this._footerless)
{
 return this._getElemBySubId("scroller");
}
 else
 {
 var x753=[];
x753[AdfDhtmlTablePeer._HSCROLLER]=this._getElemBySubId("hscroller");
x753[AdfDhtmlTablePeer._VSCROLLER]=this._getElemBySubId("vscroller");
 return x753;
}
}
AdfDhtmlTablePeer.prototype._scrollerScrollToPos= function(x754,x755)
{
 var x756=AdfAgent.getAgent();
 var x757=(x754!=null&&AdfDhtmlTablePeer._isRTL()&&
x756.getPlatform()==AdfAgent.IE_PLATFORM&&x756.getVersion()>7);
 if(this._footerless)
{
 var x758=this.GetScroller();
 if(x757)
x754=x758.scrollWidth - x758.clientWidth - x754;
x756.scrollToPos(x758,x754,x755);
}
 else
 {
 var x758=this.GetScroller();
 var x759=x758[AdfDhtmlTablePeer._HSCROLLER];
 if(x757)
x754=x759.scrollWidth - x759.clientWidth - x754;
x756.scrollToPos(x758[AdfDhtmlTablePeer._HSCROLLER],x754,x755);
x756.scrollToPos(x758[AdfDhtmlTablePeer._VSCROLLER],x754,x755);
}
}
AdfDhtmlTablePeer.prototype._getScrollerOffsetWidth= function()
{
 var x760;
 if(this._footerless)
{
x760=this.GetScroller().offsetWidth;
}
 else
 {
 var x761=this.GetScroller();
x760=x761[0].offsetWidth;
}
 return x760;
}
AdfDhtmlTablePeer.prototype._getScrollerOffsetHeight= function()
{
 var x762;
 if(this._footerless)
{
x762=this.GetScroller().offsetHeight;
}
 else
 {
 var x763=this.GetScroller();
x762=x763[1].offsetHeight;
}
 return x762;
}
AdfDhtmlTablePeer.prototype._getScrollerClientWidth= function()
{
 var x764;
 if(this._footerless)
{
x764=this.GetScroller().clientWidth;
}
 else
 {
 var x765=this.GetScroller();
x764=x765[0].clientWidth;
}
 return x764;
}
AdfDhtmlTablePeer.prototype._getScrollerClientHeight= function()
{
 var x766;
 if(this._footerless)
{
x766=this.GetScroller().clientHeight;
}
 else
 {
 var x767=this.GetScroller();
x766=x767[1].clientHeight;
}
 return x766;
}
AdfDhtmlTablePeer.prototype._setScrollerTop= function(x768)
{
 if(this._footerless)
{
this.GetScroller().style.top=x768 + "px";
}
 else
 {
 var x769=this.GetScroller();
x769[0].style.top=x769[1].style.top=
x768 + "px";
}
}
AdfDhtmlTablePeer.prototype._setScrollerHeight= function(x770,x771,x772)
{
 if(this._footerless)
{
 var x773=(Math.max(0,x770 - x771));
this.GetScroller().style.height=x773 + "px";
}
 else
 {
 var x774=this.GetScroller();
x773=Math.max(0,x770 - x771);
x774[0].style.height=x773 + "px";
 var x775=x774[0].offsetHeight - x774[0].clientHeight;
x773=Math.max(0,x770 - x771 - x772 - x775);
x774[1].style.height=x773 + "px";
}
}
AdfDhtmlTablePeer.prototype._setScrollerWidth= function(x776,x777)
{
 if(this._footerless)
{
 var x778=Math.max(x776 - x777,0);
 var x779=this.GetScroller().style;
x779.overflowX="auto";
x779.width=x778 + "px";
}
 else
 {
 var x780=this.GetScroller();
x778=Math.max(x776 - x777,0);
x780[1].style.overflowX="hidden";
x780[1].style.width=x778 + "px";
 var x781=x780[1].offsetWidth - x780[1].clientWidth;
x778=Math.max(x776 - x777 - x781,0);
 var x782=x780[0].style;
x782.overflowX="auto";
x782.width=x778 + "px";
 if (AdfDhtmlTablePeer._isRTL())
x782.left=x781 + "px";
 else
 x782.right=x781 + "px";
}
}
AdfDhtmlTablePeer.prototype._setScrollLeft= function(x783)
{
this._currentScrollLeft=x783;
 if(this._footerless)
{
 var x784=this.GetScroller();
 if(x784.scrollLeft!=x783)
x784.scrollLeft=x783;
}
 else
 {
x784=this.GetScroller();
 if(x784[0].scrollLeft!=x783)
x784[0].scrollLeft=x783;
}
}
AdfDhtmlTablePeer.prototype._getScrollLeft= function()
{
 var x785;
 if(this._footerless)
{
x785=this.GetScroller().scrollLeft;
}
 else
 {
 var x786=this.GetScroller();
x785=x786[0].scrollLeft;
}
 return x785;
}
AdfDhtmlTablePeer.prototype._setScrollTop= function(x787)
{
this._currentScrollTop=x787;
 if(this._footerless)
{
 var x788=this.GetScroller();
 if(x788.scrollTop!=x787)
x788.scrollTop=x787;
}
 else
 {
x788=this.GetScroller();
 if(x788[1].scrollTop!=x787)
x788[1].scrollTop=x787;
}
}
AdfDhtmlTablePeer.prototype._getScrollTop= function()
{
 var x789;
 if(this._footerless)
{
x789=this.GetScroller().scrollTop;
}
 else
 {
 var x790=this.GetScroller();
x789=x790[1].scrollTop;
}
 return x789;
}
AdfDhtmlTablePeer.prototype._getScrollHeight= function()
{
 if(this._footerless)
{
 return this.GetScroller().scrollHeight;
}
 else
 {
 var x791=this.GetScroller();
 return x791[1].scrollHeight;
}
}
AdfDhtmlTablePeer.prototype._getScrollWidth= function()
{
 if(this._footerless)
{
 return this.GetScroller().scrollWidth;
}
 else
 {
 var x792=this.GetScroller();
 return x792[0].scrollWidth;
}
}
AdfDhtmlTablePeer.prototype._getElemBySubId= function(x793,x794)
{
 var x795=this.getDomElement();
 if (x795==null)
x795=x794;
 return AdfDhtmlTablePeer._getChildBySubId(x795,x793);
}
AdfDhtmlTablePeer._getChildBySubId= function(x796,x797)
{
AdfAssert.assert(
x796!=null,
"Table peer cannot get a child by sub ID if the parent is null!");
 var x798=x796.id + "::" + x797;
 var x799=x796.childNodes;
for(var x800=0;x800<x799.length;x800++)
{
 if (x798==x799[x800].id)
 return x799[x800];
}
 return null;
}
AdfDhtmlTablePeer.prototype.GetRowCount= function()
{
 return this._rowCount;
}
AdfDhtmlTablePeer.prototype.GetKnownRowCount= function()
{
 return this._knownRowCount;
}
AdfDhtmlTablePeer.prototype._synchronizeRowHeights= function(x801)
{
 if(this._lastFrozen>=0){
 var x802=x801.startPos;
 var x803=x801._lastSyncRow;
 var x804=this._databodyHeight;
 var x805=x801.rows;
 var x806=x805.length;
 var x807=this._currentScrollTop;
 if(x803!=null&&x803==x806-1)
 return;
 if(x802>(x807 + x804))
 return;
 if (x805[0].cells.length==this._lastFrozen + 1)
 return;
for(var x808=0;x808<x806;x808++)
{
 if(x803!=null&&x803>=x808)
continue;
 var x809=x805[x808];
 var x810=AdfDhtmlTablePeer._getNestedScrolledTable(x809);
 var x811=x809.offsetHeight;
 if (x810.offsetHeight!=x811)
{
 var x812=AdfAgent.AGENT;
 var x813=x812.getPlatform()==AdfAgent.IE_PLATFORM;
 var x814=x812.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 if (x813||x814)
x810.style.height='auto';
 else
 x810.rows[0].style.height='auto';
 if (x813||x814)
x810.style.height=x811 + 'px';
 else
 x810.rows[0].style.height=x811 + 'px';
}
 if(x802 + x809.offsetTop + x811>(x807 + x804))
{
x801._lastSyncRow=x808;
 return;
}
}
x801._lastSyncRow=x806 -1;
}
}
AdfDhtmlTablePeer.prototype._showColumnResizeIndicator= function(x815,x816)
{
 var x817=this._getColumnResizeIndicator();
 if (!x817) return;
 var x818= !AdfDhtmlTablePeer._isRTL();
 var x819=x817.style;
x819.display='block';
x819.zIndex=20;
x819.top='0px';
 var x820;
 var x821=this._lastFrozen;
 if(x818){
x820=x815.offsetLeft + x815.offsetWidth;
 if (x821>=0&&x816>x821)
x820+=this._frozenWidth;
 if (x821<0||x816>x821)
x820-=this._currentScrollLeft;
}
 else {
x820=x815.offsetLeft;
 if (x821>=0&&x816<=x821)
{
x820+=this.getDomElement().offsetWidth - x815.parentNode.parentNode.offsetWidth;
}
 else
 {
 var x822=x815.parentNode;
while(x822&&x822.tagName!="TABLE")
x822=x822.parentNode;
 if (x822&&x822.tagName=="TABLE")
{
 var x823=x822.offsetWidth;
 var x824=x822.offsetLeft;
while(x822&&x822.tagName!="DIV")
x822=x822.parentNode;
 if (x822&&x822.tagName=="DIV")
{
 var x825=x822.offsetWidth;
 if (x825>x823)
x820+=x824;
}
}
x820-=this._getRTLScrollAdjustment();
 if(this._getScrollHeight()>this._getScrollerOffsetHeight())
x820+=this._getScrollerOffsetWidth() - this._getScrollerClientWidth();
}
}
x819.left=x820 + 'px';
x819.height=this._cachedCHHeight + this._cachedCFHeight + + this.GetDatabody().offsetHeight + 'px';
}
AdfDhtmlTablePeer.prototype._getColumnHeaderFooterSizingCell= function(x826,
x827,x828,x829,x830)
{
 if(this._lastFrozen<0||x826<=this._lastFrozen)
{
 var x831=AdfDhtmlTablePeer._getChildBySubId(x827,x828);
 return x831.rows[0].cells[x826];
}
 else
 {
 var x832=AdfDhtmlTablePeer._getChildBySubId(x827,x829);
 var x833=AdfDhtmlTablePeer._getChildBySubId(x832,x830);
 return x833.rows[0].cells[x826-this._lastFrozen-1];
}
}
AdfDhtmlTablePeer.prototype._getResizedCellInfo= function(x834)
{
 var x835=AdfAgent.AGENT;
 var x836=x834.cell;
 var x837=AdfDhtmlTablePeer._isRTL();
 var x838=x835.getIntAttribute(x836,"_d_index", -1);
 if (x834.data=="start")
x838--;
 else x838+=(x835.getIntAttribute(x836,"colspan",1)-1);
 var x839=this._getColumnHeaderFooterSizingCell(x838,this._getColumnHeader(),"t","d2","t2");
 if (x835.getAttribute(x839,AdfDhtmlTablePeer.NO_RESIZE_MARKER,false))
{
 return null;
}
 return {cell:x839,displayIndex:x838};
}
AdfDhtmlTablePeer.prototype._getColumnHeaderLeafCell= function(x840)
{
 var x841=this._getColumnHeader();
 if (!x841)
 return null;
 var x842=AdfDhtmlTablePeer._getChildBySubId(x841,"t");
 var x843= new Array(x842);
 if(this._lastFrozen>=0)
{
 var x844=AdfDhtmlTablePeer._getChildBySubId(x841,"d2");
 var x845=AdfDhtmlTablePeer._getChildBySubId(x844,"t2");
x843.push(x845);
}
 var x846=x842.rows.length;
 var x847=AdfAgent.AGENT;
 var x848=AdfDhtmlTablePeer._LEAF_COLUMN;
 var x849=null;
for(var x850=x846-1;x850>=0&& !x849;x850--)
{
for(var x851=0;x851<x843.length;x851++)
{
 var x852=x843[x851];
 var x853=x852.rows[x850].cells;
for(var x854=0;x854<x853.length&& !x849;x854++)
{
 var x855=x853[x854];
 var x856=x855.getAttribute(x848);
 if (x856)
{
 if (x847.getIntAttribute(x855,"_d_index", -1)==x840)
{
x849=x855;
break;
}
}
}
}
}
 return x849;
}
AdfDhtmlTablePeer.prototype._synchronizeColumnRowHeights= function(x857,
x858,x859,x860)
{
 if(this._lastFrozen>=0){
 var x861=AdfAgent.AGENT;
 var x862=x861.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 var x863=AdfDhtmlTablePeer._getChildBySubId(x857,x858);
 var x864=AdfDhtmlTablePeer._getChildBySubId(x857,x859);
 var x865=AdfDhtmlTablePeer._getChildBySubId(x864,x860);
 var x866=x863.rows;
 var x867=x865.rows;
x863.style.height=x865.style.height='auto';
for(var x868=0;x868<x866.length;x868++)
{
x866[x868].style.height=x867[x868].style.height='auto';
}
for(var x868=0;x868<x866.length;x868++)
{
 var x869=x866[x868].offsetHeight;
 var x870=x867[x868].offsetHeight;
 if (x869>x870)
x861.setTableRowHeight(x867[x868],x869);
 else if (x870>x869)
x861.setTableRowHeight(x866[x868],x870);
}
 var x871=Math.max(x863.offsetHeight,x865.offsetHeight);
x865.style.height=x863.style.height=x871 + 'px';
 if(x862&&x867.length==2)
{
for(var x868=0;x868<x867[0].cells.length;x868++)
{
x867[1].cells[x868].rowSpan='10';
}
for(var x868=0;x868<x866[0].cells.length;x868++)
{
x866[1].cells[x868].rowSpan='10';
}
}
}
}
AdfDhtmlTablePeer.prototype._getInnerTableCell= function(x872,x873)
{
 var x874=AdfDhtmlTablePeer._getNestedScrolledTable(x872);
 var x875=x874.rows[0];
 return x875.cells[x873-this._lastFrozen-1];
}
AdfDhtmlTablePeer._handleMouseWheel= function(x876)
{
 if (!x876)
x876=AdfPage.PAGE.getDomWindow().event;
 var x877=AdfDhtmlTablePeer._getChildBySubId(this.parentNode,"scroller");
 if (!x877)
x877=AdfDhtmlTablePeer._getChildBySubId(this.parentNode,"vscroller");
 if(!x877)
 return;
 var x878=x876.wheelDelta!=null? -x876.wheelDelta/4:x876.detail*4;
x877.scrollTop+=Math.round(x878);
 var x879=x877.offsetHeight;
 var x880=x877.scrollHeight;
 var x881=x877.scrollTop;
 if ((x878>0&&(x880 - x881)>x879)||(x878<0&&x881>0))AdfAgent.AGENT.eatEvent(x876);
}
AdfDhtmlTablePeer._positionInnerTable= function(x882,x883)
{
 var x884=x882.rows;
 var x885=AdfDhtmlTablePeer._isRTL();
for(var x886=0;x886<x884.length;x886++)
{
 var x887=x884[x886].cells;
 var x888=x887[x887.length-1];
 var x889=AdfDhtmlTablePeer.FindFirstChildByTagName(x888,"DIV");
 if (x889)
{
x889.scrollLeft=x883;
}
}
}
AdfDhtmlTablePeer._scrollColumnHeader= function(x890,x891)
{
 var x892=AdfDhtmlTablePeer._getChildBySubId(x890,"d2");
x892.scrollLeft=x891;
}
AdfDhtmlTablePeer._scrollColumnFooter= function(x893,x894)
{
 var x895=AdfDhtmlTablePeer._getChildBySubId(x893,"fd2");
x895.scrollLeft=x894;
}
AdfDhtmlTablePeer.FindFirstChildByTagName= function(x896,x897)
{
AdfAssert.assert(
x896!=null,
"Table peer cannot find first child by tag name if the parent is null!");
 var x898=x896.childNodes;
for(var x899=0;x899<x898.length;x899++)
{
 if (x897==x898[x899].tagName)
 return x898[x899];
}
 return null;
}
AdfDhtmlTablePeer._findFirstLevelChildrenByTagName= function(x900,x901)
{
AdfAssert.assert(
x900!=null,
"Table peer cannot find first level children by tag name if the parent is null!");
 var x902=[];
 var x903=x900.childNodes;
for(var x904=0;x904<x903.length;x904++)
{
 if (x901==x903[x904].tagName)
x902.push(x903[x904]);
}
 return x902;
}
AdfDhtmlTablePeer.prototype.GetRowKeyAndRow= function(
x905,
x906)
{
AdfAssert.assertDomElement(x905);
 var x907=x905;
 var x908=AdfAgent.AGENT;
 if ((x907==null)||(x907.nodeType!=1))
{
 return null;
}
 var x909=x908.getAttribute(x907,AdfDhtmlTablePeer._ROW_KEY);
while(x909==null)
{
 if (x907==null||x907==x906)
 return null;
x907=x907.parentNode;
 if ((x907==null)||(x907.nodeType!=1))
{
 return null;
}
x909=x908.getAttribute(x907,AdfDhtmlTablePeer._ROW_KEY);
}
 return [x909,x907];
}
AdfDhtmlTablePeer.prototype._hideDragColumnFooter= function(x910,x911)
{
 var x912=AdfAgent.AGENT;
 var x913=this._lastFrozen;
 var x914=this._reorderColWidth;
 var x915=this._reorderHiddenCells;
 var x916=this._getColumnFooter();
 var x917;
 var x918=null;
 if(x913>=0&&x910>x913)
{
x918=AdfDhtmlTablePeer._getChildBySubId(x916,"fd2");
x917=AdfDhtmlTablePeer._getChildBySubId(x918,"ft2");
}
 else
 x917=AdfDhtmlTablePeer._getChildBySubId(x916,"ft");
for(var x919=0;x919<2;x919++)
{
 var x920=x917.rows[x919].cells;
 var x921;
 if (x913<0||x910<=x913)
x921=x910;
 else
 x921=(x910 - x913 - 1);
for(var x922=0;x922<x911;x922++)
{
 var x923=x920[x921++];
x915.push(x923);
x923._afrIsFooter=true;
x923.style.display="none";
}
}
 if(x912.getPlatform()==AdfAgent.WEBKIT_PLATFORM)
this._hideReorderColGroupCols(x917,x910,x913,x911);
this._adjustReorderColumnHeaderWidths(x917,x918,x910,
x913,x914);
}
AdfDhtmlTablePeer.prototype._adjustReorderColumnHeaderWidths= function(
x924,
x925,
x926,
x927,
x928)
{
 var x929=x924.style;
x929.width=(parseInt(x929.width) - x928)+"px";
 if(x927>=0)
{
 if(x926>x927)
{
x929=x925.style;
x929.width=(parseInt(x929.width) - x928)+"px";
}
 else if(x927>=0)
{
x929=x924.nextSibling.style;
 if(AdfDhtmlTablePeer._isRTL())
x929.right=(parseInt(x929.right) - x928)+"px";
 else
 x929.left=(parseInt(x929.left) - x928)+"px";
}
}
}
AdfDhtmlTablePeer.prototype._adjustReorderColumnFooterWidths= function(
x930,
x931,
x932)
{
 var x933=this._getColumnFooter();
 var x934;
 var x935=null;
 if(x931>=0&&x930>x931)
{
x935=AdfDhtmlTablePeer._getChildBySubId(x933,"fd2");
x934=AdfDhtmlTablePeer._getChildBySubId(x935,"ft2");
}
 else
 x934=AdfDhtmlTablePeer._getChildBySubId(x933,"ft");
this._adjustReorderColumnHeaderWidths(x934,x935,x930,x931,x932);
}
AdfDhtmlTablePeer.prototype._adjustReorderInnerTableWidth= function(x936,x937)
{
 var x938=x936.style;
x938.width=(parseInt(x938.width) - x937)+"px";
 var x939=x936.parentNode.parentNode;
x938=x939.style;
 var x940=x938.width;
 if(x940!="")
{
x938.width=(parseInt(x940) - x937)+"px";
}
}
AdfDhtmlTablePeer.prototype._hideReorderColGroupCols= function(
x941,
x942,
x943,
x944)
{
 var x945=AdfDhtmlTablePeer.FindFirstChildByTagName(x941,"COLGROUP");
 if(x945)
{
 var x946=this._reorderHiddenCells;
 var x947=x945.getElementsByTagName("col");
 var x948=(x943<0||x942<=x943)?
x942:(x942 - x943 -1);
for(i=x948;i<x948 +x944;i++)
{
 var x949=x947[i];
x949._afrOriginalWidth=x949.style.width;
x949.style.width="0px";
x949.style.display="none";
x946.push(x949);
}
}
}
AdfDhtmlTablePeer.prototype._adjustReorderNonFrozenCol= function(x950,x951)
{
 var x952=AdfDhtmlTablePeer.FindFirstChildByTagName(x950,"COLGROUP");
 if(x952)
{
 var x953=x952.getElementsByTagName("col");
 var x954=x953[x953.length -1];
x954.style.width=(parseInt(x954.style.width) - x951)+"px";
}
}
AdfDhtmlTablePeer.prototype._adjustReorderDataBodyNonFrozenCol= function(x955)
{
 var x956=this.GetDatabody();
 var x957=x956.childNodes;
 var x958=x957.length;
for(i=0;i<x958;i++)
{
this._adjustReorderNonFrozenCol(x957[i],x955);
}
}
AdfDhtmlTablePeer.prototype._insertEmptyDropColGroupCol= function(
x959,
x960,
x961,
x962,
x963,
x964,
x965)
{
 var x966=AdfDhtmlTablePeer.FindFirstChildByTagName(x959,"COLGROUP");
 if(x966)
{
 var x967=x966.getElementsByTagName("col");
 var x968=(x963<0||x960<=x963)?
(x960):(x960 - x963 -1);
 if(x962)
x968+=x961 -1;
 var x969=x967[x968];
 var x970=x966.ownerDocument.createElement("col");
(x962)?(
x969.nextSibling?
x966.insertBefore(x970,x969.nextSibling):
x966.appendChild(x970)
):x966.insertBefore(x970,x969);
x970.style.width=x964 +"px";
x965.push(x970);
x966.span++;
}
}
AdfDhtmlTablePeer.prototype._forceRelayoutDataBody= function()
{
 var x971=this.GetDatabody();
 var x972=x971.childNodes;
 var x973=x972.length;
 var x974=this._currentScrollLeft;
 var x975=this._lastFrozen;
for(i=0;i<x973;i++)
{
 var x976=x972[i].rows[0];
 var x977=x976.style;
x977.display="block";
 var x978=x976.offsetWidth;
x977.display="";
 if(x975>=0)
{
innerTable=AdfDhtmlTablePeer._getNestedScrolledTable(x976);
innerTable.parentNode.scrollLeft=x974;
}
}
}
AdfDhtmlTablePeer.prototype._processColumnReorderAction= function(x979)
{
 var x980=AdfAgent.AGENT;
 var x981=this._reorderTH;
 if (x981)
{
this._columnReorderTracker=this._createReorderTracker();
this._positionColumnReorderTracker(x979);
this._insertEmptyDropColumn(x979);
 if(!this._colReorderDragCallback)
{
this._colReorderDragCallback=this.createCallback(this._handleColReorderDrag);
this._colReorderDropCallback=this.createCallback(this._handleColReorderDrop);
this._colReorderAbortCallback=this.createCallback(this._handleColReorderAbort);
}
x980.disableUserSelect(this._getColumnHeader());
AdfPage.PAGE.startDrag(x979,
this._colReorderDragCallback,
this._colReorderDropCallback,
this._colReorderAbortCallback);
x980.setCursor(x981,'move');
x980.setCursor(this.getDomElement(),'move');
x980.eatEvent(x979);
}
}
AdfDhtmlTablePeer.prototype._positionColumnReorderTracker= function(x982)
{
 var x983=this._columnReorderTracker,x984=x983.style;
 var x985=this.getDomElement();
 var x986=AdfAgent.AGENT;
 var x987=x986.getMousePosition(x982),
x988=x986.getElementPosition(x985);
 var x989=Math.max(x987.x - x988.x+(AdfDhtmlTablePeer._isRTL()?-x983.offsetWidth+8:-8),0),
x990=Math.max(x987.y - x988.y-8,0);
x984.left=x989 + "px";
x984.top=x990 + "px";
}
AdfDhtmlTablePeer.prototype._autoScrollColumnsIfNecessary= function(x991)
{
 var x992=this.getDomElement();
 if(this._getScrollWidth()<=this._getScrollerOffsetWidth())
 return;
 var x993=AdfAgent.getAgent();
 var x994=x993.getMousePosition(x991),
x995=x993.getElementPosition(x992);
 var x996=Math.max(x994.x - x995.x,0);
 var x997,x998=this._getColumnHeader(),x999;
 var x1000=AdfDhtmlTablePeer._getChildBySubId(x998,"t"),x1001;
 if(this._lastFrozen>=0)
{
x999=AdfDhtmlTablePeer._getChildBySubId(x998,"d2");
x1001=AdfDhtmlTablePeer._getChildBySubId(x999,"t2");
x997=x1001;
}
 else
 x997=x1000;
 var x1002=0,x1003=AdfDhtmlTablePeer._isRTL()?this._getRTLScrollAdjustment():this._currentScrollLeft;
 var x1004=false,x1005=false;
 if(!x999||
(x996>x1000.offsetWidth))
{
 if(x999)
x1002=x1000.offsetWidth;
 if((x996 - x1002)<AdfDhtmlTablePeer._AUTOSCROLL_MARGIN&&
x1003>0)
{
x1004=true;
}
 else if((x996 - x1002)>
this._getScrollerClientWidth() - AdfDhtmlTablePeer._AUTOSCROLL_MARGIN)
{
x1005=true;
}
}
 if(x1004||x1005)
{
x1002-=x1003;
 var x1006=x1000.rows.length;
 var x1007=AdfDhtmlTablePeer._ROOT_COLUMN,
x1008=AdfDhtmlTablePeer._ROW_HEADER
for(var x1009=x1006-1;x1009>=0;x1009--)
{
 var x1010=x997.rows[x1009].cells,x1011=x1010.length;
for(var x1012=0;x1012<x1011;x1012++)
{
 var x1013=x1010[x1012];
 if (x1013.getAttribute(x1007)&&x1013.getAttribute(x1008)==null)
{
cellLeft=x1013.offsetLeft+x1002;
cellRight=cellLeft + x1013.offsetWidth;
 if(x996>=cellLeft&&x996<=cellRight)
{
 if(x1004)
{
x1003=Math.max(x1003 - x1013.offsetWidth,0);
}
 else
 {
x1003=Math.min(x1003 + x1013.offsetWidth,
this._getScrollWidth() - this._getScrollerClientWidth());
}
this._scrollerScrollToPos(x1003,null);
break;
}
}
}
}
}
}
AdfDhtmlTablePeer.prototype._handleColReorderDrag= function(x1014,x1015,x1016)
{
this._autoScrollColumnsIfNecessary(x1014);
this._positionColumnReorderTracker(x1014);
this._insertEmptyDropColumn(x1014);
}
AdfDhtmlTablePeer.prototype._handleColReorderDrop= function(x1017,x1018,x1019)
{
 var x1020=null;
 if(this._reorderTH!=this._targetReorderTH&&
this._targetReorderTH!=null)
{
x1020=this._getColReorderAnimationDuration();
this._reorderId=this._reorderTH.id;
 if(x1020>0)
this._reorderColumnComponentsWithAnimation(x1020);
 else
 this._reorderColumnComponentsWithoutAnimation();
}
 else
 {
this._handleColReorderAbort();
 return;
}
 if(x1020==0)
{
 if(this._columnReorderTracker!=null)
{
 var x1021=this.getDomElement();
x1021.removeChild(this._columnReorderTracker);
this._columnReorderTracker=null;
}
this._cleanUpAfterColumnReorder();
}
AdfAgent.AGENT.enableUserSelect(this._getColumnHeader());
}
AdfDhtmlTablePeer.prototype._getColReorderAnimationDuration= function()
{
 var x1022=this._colReorderAnimationDuration;
 if(x1022==undefined)
{
 var x1023=AdfPage.PAGE;
 if(x1023.isAnimationEnabled())
{
x1022=parseInt(x1023.getLookAndFeel()
.getSkinProperty("af|table-tr-column-reorder-animation-duration"));
}
 else
 x1022=0;
this._colScrollAnimationDuration=x1022;
}
 return x1022;
}
AdfDhtmlTablePeer.prototype._reorderColumnComponentsWithoutAnimation= function()
{
 var x1024=this._queueColumnReorderEvent();
 if(!x1024.isCanceled())
{
 var x1025=AdfPage.PAGE.getLookAndFeel();
 var x1026=x1025.getTranslatedString("af_table.LABEL_REORDERING_COLUMN");
this.DisplayStatus(x1026,true);
}
 else
 {
this._handleColReorderAbort();
}
}
AdfDhtmlTablePeer.prototype._queueColumnReorderEvent= function()
{
 var x1027=this.getComponent();
 var x1028= new AdfTableShowColumnsEvent(
x1027,
this._reorderId,
"reorderColumn");
x1028.setTargetColumnId(this._targetReorderTH.id);
x1028.setAfterTarget(this._insertColumnAfter);
x1028.queue();
 return x1028;
}
AdfDhtmlTablePeer.prototype._cleanUpAfterColumnReorder= function()
{
AdfAgent.AGENT.setCursor(this.getDomElement(),'');
this._reorderTH=null;
this._targetReorderTH=null;
 delete this._reorderId;
 delete this._reorderHiddenCells;
 delete this._insertColumnAfter;
 delete this._previousInsertColIndex;
 delete this._emptyDropCells;
 delete this._reorderEmptyCellWidth;
}
AdfDhtmlTablePeer.prototype._reorderColumnComponentsWithAnimation= function(x1029)
{
 var x1030=this._emptyDropCells[0];
 var x1031=x1030.offsetLeft;
x1031+=this._reorderDropColumnExtraX;
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_SLOW_FAST_SLOW,
x1029,
[
{
"element":this._columnReorderTracker,
"properties":{"top":0,"left":x1031}
}
],
null,
AdfDhtmlTablePeer._columnReorderAnimationComplete,
this);
}
AdfDhtmlTablePeer.prototype._createReorderTracker= function()
{
 var x1032=AdfAgent.AGENT;
 var x1033=this._reorderTH;
 var x1034=x1032.getIntAttribute(x1033,"_d_index", -1);
 var x1035=x1033.colSpan;
 var x1036=this.getDomElement();
 var x1037=x1036.ownerDocument.createElement("div");
 var x1038=x1037.style;
x1036.appendChild(x1037);
x1038.overflow="hidden";
x1038.position="absolute";
x1038.zIndex=1000;
x1032.setOpacity(x1037,85);
this._reorderHiddenCells=[];
 var x1039=this._createReorderColumnLayerHeader(x1037,x1034,x1035);
this._createReorderColumnLayerBody(x1037,x1039,x1034,x1035);
 if(!this._footerless)
this._hideDragColumnFooter(x1034,x1035);
 return x1037;
}
AdfDhtmlTablePeer.prototype._createReorderColumnLayerHeader= function(
x1040,
x1041,
x1042)
{
 var x1043=AdfAgent.AGENT;
 var x1044=this._lastFrozen;
 var x1045=this._getColumnHeader();
 var x1046;
 var x1047=null;
 if(x1044>=0&&x1041>x1044)
{
x1047=AdfDhtmlTablePeer._getChildBySubId(x1045,"d2");
x1046=AdfDhtmlTablePeer._getChildBySubId(x1047,"t2");
}
 else
 x1046=AdfDhtmlTablePeer._getChildBySubId(x1045,"t");
 var x1048=x1040.ownerDocument.createElement("table");
x1048.className=x1046.className;
x1048.cellSpacing=0;
colTableStyle=x1048.style;
colTableStyle.tableLayout="fixed";
colTableStyle.position="relative";
x1040.appendChild(x1048);
 var x1049=x1046.rows.length;
 var x1050=0;
 var x1051=this._reorderHiddenCells;
for(var x1052=0;x1052<x1049;x1052++)
{
 var x1053=x1046.rows[x1052].cells;
 var x1054=x1053.length;
 var x1055=null;
 var x1056=0;
 var x1057;
for(var x1058=0;x1058<x1054;x1058++)
{
 var x1059=x1053[x1058];
 var x1060=false;
 if(x1052>0)
{
 var x1061=x1043.getIntAttribute(x1059,"_d_index", -1);
 if(x1061>x1041)
break;
x1060=(x1061==x1041);
}
 else
 {
x1060=(x1044<0||x1041<=x1044)?
(x1058==x1041):(x1058==(x1041 - x1044 -1));
}
 if(x1060)
{
do
{
 if (x1055==null)
{
x1055=x1059;
x1057=x1048.insertRow(x1052);
 if(x1052==0)
{
 if(x1043.getPlatform()==AdfAgent.IE_PLATFORM&&x1043.getVersion()<8)
x1057.style.position="absolute";
}
}
 else
 x1055=x1053[++x1058];
x1056+=x1055.colSpan;
 var x1062=this._cloneWithSelectedOption(x1055,true);
x1043.removeIdsFromDomSubTree(x1062);
x1057.appendChild(x1062);
x1057.style.height="auto";
 if(x1052!=0)
{
x1062.rowSpan=1;
x1043.setOuterHeight(x1062,x1055.offsetHeight);
}
 else
 x1050+=x1055.offsetWidth;
x1051.push(x1055);
}while(x1056<x1042);
break;
}
}
}
for(var x1052=x1051.length -1;x1052>=0;x1052--)
x1051[x1052].style.display="none";
 if(x1043.getPlatform()==AdfAgent.WEBKIT_PLATFORM)
this._hideReorderColGroupCols(x1046,x1041,x1044,x1042);
this._reorderColWidth=x1050;
x1040.style.width=colTableStyle.width=x1050 +"px";
this._adjustReorderColumnHeaderWidths(x1046,x1047,x1041,
x1044,x1050);
x1043.setOuterHeight(x1048,x1046.offsetHeight);
 return x1048;
}
AdfDhtmlTablePeer.prototype._createReorderColumnLayerBody= function(
x1063,
x1064,
x1065,
x1066)
{
 var x1067=AdfAgent.AGENT;
 var x1068=x1067.getPlatform();
 var x1069=(x1068==AdfAgent.GECKO_PLATFORM);
 var x1070=(x1068==AdfAgent.WEBKIT_PLATFORM);
 var x1071=this._lastFrozen;
 var x1072=this._reorderColWidth;
 var x1073=this._cloneWithSelectedOption(x1064,false);
x1063.appendChild(x1073);
 var x1074=this._reorderHiddenCells;
 var x1075=this.GetDatabody();
 var x1076=x1075.childNodes;
 var x1077=x1076.length;
for(var x1078=0;x1078<x1077;x1078++)
{
 var x1079=x1076[x1078];
 var x1080=x1079.rows;
 var x1081=x1080.length;
 var x1082=0;
 if(x1078==0)
x1073.className=x1079.className;
for(var x1083=0;x1083<x1081;x1083++)
{
 var x1084=x1080[x1083];
 var x1085;
 var x1086;
 var x1087=null;
 if (x1071<0||x1065<=x1071)
{
x1086=x1065;
x1085=x1084.cells;
}
 else
 {
x1087=AdfDhtmlTablePeer._getNestedScrolledTable(x1084);
x1085=x1087.rows[0].cells;
x1086=(x1065 - x1071 - 1);
}
 if (!(this._hasDetailStamp&&AdfAgent.getAgent().getAttribute(x1084,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false)))
{
 var x1088=x1073.insertRow(x1082);
x1082++;
for(var x1089=0;x1089<x1066;x1089++)
{
 var x1090=x1085[x1086++];
cellClone=this._cloneWithSelectedOption(x1090,true);
x1067.removeIdsFromDomSubTree(cellClone);
x1088.appendChild(cellClone);
x1074.push(x1090);
x1090.style.display="none";
 if(x1069)
cellClone.style.height=x1084.offsetHeight +"px";
 else
 x1067.setOuterHeight(cellClone,x1084.offsetHeight);
 if(x1087!=null)
{
this._adjustReorderInnerTableWidth(x1087,x1072);
 if(x1070)
this._hideReorderColGroupCols(x1087,x1065,x1071,x1066);
}
}
}
}
 if(x1070)
{
 if(x1071<0||(x1065<=x1071))
this._hideReorderColGroupCols(x1079,x1065,x1071,x1066);
 if(x1071>=0&&x1065>x1071)
this._adjustReorderNonFrozenCol(x1079,x1072);
}
}
}
AdfDhtmlTablePeer.prototype._cloneWithSelectedOption= function(x1091,x1092)
{
 if (x1091==null)
 return null;
 var x1093=x1091.cloneNode(x1092);
 if (x1091.nodeType==1)
{
 if (x1092)
{
 var x1094=x1091.getElementsByTagName("SELECT");
 var x1095=x1093.getElementsByTagName("SELECT");
 var x1096=x1094.length;
 var x1097=x1095.length;
AdfAssert.assert(x1096==x1097,"Unexpected clone--different amounts of selects!");
for(var x1098=0;x1098<x1096;x1098++)
{
x1095[x1098].selectedIndex=x1094[x1098].selectedIndex;
}
}
 if (x1091.tagName=="SELECT")
{
x1093.selectedIndex=x1091.selectedIndex;
}
}
 return x1093;
}
AdfDhtmlTablePeer.prototype._insertEmptyDropColumn= function(x1099)
{
 var x1100=AdfDhtmlTablePeer._isRTL();
 var x1101=this.getDomElement();
 var x1102=AdfAgent.AGENT;
 var x1103=x1102.getMousePosition(x1099);
 var x1104=x1102.getElementPosition(x1101);
 var x1105=this._lastFrozen;
 var x1106=Math.max(x1103.x - x1104.x,0);
 var x1107=this._getColumnHeader();
 var x1108;
 var x1109=AdfDhtmlTablePeer._getChildBySubId(x1107,"t");
 var x1110;
 if(x1105>=0)
{
x1108=AdfDhtmlTablePeer._getChildBySubId(x1107,"d2");
x1110=AdfDhtmlTablePeer._getChildBySubId(x1108,"t2");
}
 var x1111;
 var x1112=0;
 if(!x1100)
{
 if(x1106<=x1109.offsetWidth)
x1111=x1109;
 else if(x1108)
{
x1112=x1109.offsetWidth;
x1112-=this._currentScrollLeft;
x1111=x1110;
}
 else x1111=x1109;
}
 else
 {
 var x1113=x1101.offsetWidth;
 var x1114=x1109.offsetWidth;
 var x1115=x1113 - x1114;
 if(x1108&&x1106<=x1115)
{
x1111=x1110;
 if(x1113>x1114 + x1110.offsetWidth)
x1112=x1113 - (x1114 + x1110.offsetWidth);
 else
 {
x1112= -this._getRTLScrollAdjustment();
 if(this._getScrollHeight()>this._getScrollerOffsetHeight())
x1112+=this._getScrollerOffsetWidth() - this._getScrollerClientWidth();
}
}
 else
 {
 if(x1101.offsetWidth>x1109.offsetWidth)
{
x1112=x1115;
}
x1111=x1109;
}
}
 var x1116;
 var x1117=null;
 if(!x1111)
 return;
 if(x1105== -1)
x1112-=x1100?this._getRTLScrollAdjustment():this._currentScrollLeft;
 var x1118=x1109.rows.length;
 var x1119=AdfDhtmlTablePeer._ROOT_COLUMN,
x1120=AdfDhtmlTablePeer._ROW_HEADER;
for(var x1121=x1118-1;x1121>=0;x1121--)
{
 var x1122=x1111.rows[x1121].cells,x1123=x1122.length;
for(var x1124=0;x1124<x1123;x1124++)
{
 var x1125=x1122[x1124];
 if (x1125.getAttribute(x1119)&&x1125.getAttribute(x1120)==null)
{
 if (x1125.style.display=="none")
continue;cellLeft=x1125.offsetLeft+x1112;
cellRight=cellLeft + x1125.offsetWidth;
 if(!x1100)
{
 if(x1106>=cellLeft&&
x1106<=(cellRight - x1125.offsetWidth/2))
{
x1117=x1125;
x1116=false;
break;
}
 else if(x1106>=cellLeft&&x1106<=cellRight)
{
x1117=x1125;
x1116=x1125.id.indexOf("_afrBlankColumn")== -1;
break;
}
}
 else
 {
 if(x1106>=cellLeft&&
x1106<=(cellRight - x1125.offsetWidth/2))
{
x1117=x1125;
x1116=x1125.id.indexOf("_afrBlankColumn")== -1;
break;
}
 else if(x1106>=cellLeft&&x1106<=cellRight)
{
x1117=x1125;
x1116=false;
break;
}
}
}
}
}
 if(x1117==null&&this._previousInsertColIndex==null)
{
for(var x1121=x1118-1;x1121>=0;x1121--)
{
 var x1122=x1111.rows[x1121].cells;
 var x1123=x1122.length;
 var x1126=x1122[x1123-1];
 if (x1126.getAttribute(x1119)&&x1126.getAttribute(x1120)==null)
{
 if(x1126==this._reorderTH&&x1126.previousSibling)
x1117=x1126.previousSibling;
 else
 x1117=x1126;
x1116=true;
break;
}
}
}
 if(x1117!=null)
{
 var x1127=x1102.getIntAttribute(x1117,"_d_index", -1);
 var x1128=x1117.colSpan;
 var x1129=x1116?(x1127 + x1128):(x1127);
 if(x1129!=this._previousInsertColIndex)
{
this._removeEmptyDropColumn(x1110,x1108);
this._targetReorderTH=x1117;
this._insertColumnAfter=x1116;
this._previousInsertColIndex=x1129;
this._reorderDropColumnExtraX=x1112;
this._targetHeaderTable=x1111;
this._insertEmptyDropColumnHeader(x1117,x1127,x1128,x1110,x1108);
 if(x1108!=null&&x1100)x1108.scrollLeft=this._currentScrollLeft;
this._insertEmptyDropColumnBody(x1127,x1128);
 if(!this._footerless)
{
this._insertEmptyDropColumnFooter(x1127,x1128);
}
 if(x1102.getPlatform()==AdfAgent.WEBKIT_PLATFORM)
this._forceRelayoutDataBody();
}
}
}
AdfDhtmlTablePeer.prototype._removeEmptyDropColumn= function(x1130,x1131)
{
 var x1132=this._emptyDropCells;
 if(x1132)
{
 var x1133=AdfAgent.AGENT;
 var x1134=(x1133.getPlatform()==AdfAgent.WEBKIT_PLATFORM);
 var x1135=x1133.getIntAttribute(this._targetReorderTH,"_d_index", -1);
 var x1136=this._lastFrozen;
 var x1137=this._reorderColWidth;
for(var x1138=x1132.length -1;x1138>=0;x1138--)
{
 var x1139=x1132[x1138];
 var x1140=x1139.tagName;
 if(x1134&&x1140=="COL")
{
 var x1141=x1139.parentNode;
x1141.span--;
}
 else if(x1140=="TD"&&(x1136>=0&&(x1135>x1136))
&& !x1139._afrIsFooter)
{
 var x1142=x1139.parentNode;
 var x1143=x1142.parentNode.parentNode;
this._adjustReorderInnerTableWidth(x1143,x1137);
}
x1139.parentNode.removeChild(x1139);
}
this._adjustReorderColumnHeaderWidths(this._targetHeaderTable,x1131,x1135,
x1136,x1137);
 if(x1134&&x1136>=0&&x1135>x1136)
this._adjustReorderDataBodyNonFrozenCol(x1137);
 if(!this._footerless)
this._adjustReorderColumnFooterWidths(x1135,x1136,x1137);
}
this._emptyDropCells=[];
}
AdfDhtmlTablePeer.prototype._insertEmptyDropColumnHeader= function(
x1144,
x1145,
x1146,
x1147,
x1148)
{
 var x1149=AdfAgent.AGENT;
 var x1150=this._insertColumnAfter;
 var x1151=this._reorderColWidth;
 var x1152=this._emptyDropCells;
 var x1153=this._lastFrozen;
 var x1154=this._targetHeaderTable;
 var x1155=this._reorderEmptyCellWidth;
 var x1156=x1144.ownerDocument;
 var x1157=this._isFilterable();
 var x1158=x1157?3:2;
for(var x1159=0;x1159<x1158;x1159++)
{
 var x1160=x1154.rows[x1159];
 var x1161=x1160.cells;
 if(x1159<x1158-1)
{
 var x1162=(x1153<0||x1145<=x1153)?
(x1145):(x1145 - x1153 -1);
 if(x1150)
x1162+=x1146 -1;
headerCell=x1161[x1162];
}
 else
 {
headerCell=x1144;
}
 var x1163=x1156.createElement("th");
(x1150)?(
headerCell.nextSibling?
x1160.insertBefore(x1163,headerCell.nextSibling):x1160.appendChild(x1163)
):x1160.insertBefore(x1163,headerCell);
 if(x1159==0)x1163.style.cssText=headerCell.style.cssText;
 else
 {
x1163.className=AdfDhtmlTablePeer._DROP_TARGET_CLASS + " " + headerCell.className;
 if(x1159==x1158-1)
x1163.rowSpan=x1154.rows.length-(x1157?2:1);
x1163.innerHTML="&nbsp;";}
 if(x1155)
x1163.style.width=x1155;
 else
 {
x1149.setOuterWidth(x1163,x1151);
x1155=this._reorderEmptyCellWidth=parseInt(x1163.style.width) +"px";
}
x1152.push(x1163);
}
this._adjustReorderColumnHeaderWidths(x1154,x1148,x1145,
x1153, -x1151);
 if(x1149.getPlatform()==AdfAgent.WEBKIT_PLATFORM)
{
this._insertEmptyDropColGroupCol(x1154,x1145,x1146,x1150,
x1153,x1151,x1152);
}
}
AdfDhtmlTablePeer.prototype._insertEmptyDropColumnBody= function(x1164,x1165)
{
 var x1166=AdfAgent.AGENT;
 var x1167=x1166.getPlatform();
 var x1168=(x1167==AdfAgent.WEBKIT_PLATFORM);
 var x1169=(x1167==AdfAgent.IE_PLATFORM);
 var x1170=AdfDhtmlTablePeer._isRTL();
 var x1171=this._lastFrozen;
 var x1172=this._insertColumnAfter;
 var x1173=this._reorderColWidth;
 var x1174=this._emptyDropCells;
 var x1175=this._reorderEmptyCellWidth;
 var x1176=this._currentScrollLeft;
 var x1177=this.GetDatabody();
 var x1178=x1177.childNodes;
 var x1179=x1178.length;
 var x1180=x1177.ownerDocument;
 var x1181=AdfDhtmlTablePeer._DROP_TARGET_CLASS;
 var x1182=this._currentScrollTop;
 var x1183;
for(var x1184=0;x1184<x1179;x1184++)
{
 var x1185=x1178[x1184];
 var x1186=x1185.rows;
 var x1187=x1186.length;
 if(x1184==0)
x1183=x1185.startPos;
for(var x1188=0;x1188<x1187;x1188++)
{
 var x1189=x1186[x1188];
 var x1190=x1189.offsetTop - (x1182 - x1183);
 if(x1190>x1177.offsetHeight)
break;
 if (!(this._hasDetailStamp&&AdfAgent.getAgent().getAttribute(x1189,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false)))
{
 var x1191;
 var x1192=null;
 var x1193=x1172?(x1164 +x1165-1):x1164;
 if (x1171<0||x1164<=x1171)
x1191=x1189.cells[x1193];
 else
 {
x1192=AdfDhtmlTablePeer._getNestedScrolledTable(x1189);
x1189=x1192.rows[0];
x1191=x1189.cells[x1193 - x1171 - 1];
}
 var x1194=x1180.createElement("td");
x1194.className=x1181 + " " + x1191.className;
(x1172)?(
x1191.nextSibling?
x1189.insertBefore(x1194,x1191.nextSibling):x1189.appendChild(x1194)
):x1189.insertBefore(x1194,x1191);
x1194.style.width=x1175;
x1194.noWrap=true;
x1194.innerHTML="&nbsp;";x1174.push(x1194);
 if(x1192!=null)
{
this._adjustReorderInnerTableWidth(x1192, -x1173);
 if(x1168)
{
this._insertEmptyDropColGroupCol(x1192,x1164,x1165,x1172,
x1171,x1173,x1174);
}
 else if(x1169)
{
 var x1195=x1192.parentNode;
 if(x1170||x1195.scrollLeft!=x1176)
{
x1195.scrollLeft=x1176;
}
}
}
}
}
x1183+=x1185.offsetHeight;
 if (x1168)
{
 if(x1171<0||(x1164<=x1171))
{
this._insertEmptyDropColGroupCol(x1185,x1164,x1165,x1172,x1171,
x1173,x1174);
}
 if(x1171>=0&&x1164>x1171)
this._adjustReorderNonFrozenCol(x1185, -x1173);
}
}
 if(x1170&&(x1171<0))x1177.scrollLeft=x1176
}
AdfDhtmlTablePeer.prototype._insertEmptyDropColumnFooter= function(
x1196,
x1197)
{
 var x1198=AdfAgent.AGENT;
 var x1199=x1198.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 var x1200=this._lastFrozen;
 var x1201=this._insertColumnAfter;
 var x1202=this._reorderColWidth;
 var x1203=this._emptyDropCells;
 var x1204=this._reorderEmptyCellWidth;
 var x1205=this._getColumnFooter();
 var x1206;
 var x1207=null;
 var x1208=x1201?(x1196 +x1197-1):x1196;
 if(x1200>=0&&x1196>x1200)
{
x1207=AdfDhtmlTablePeer._getChildBySubId(x1205,"fd2");
x1206=AdfDhtmlTablePeer._getChildBySubId(x1207,"ft2");
x1208-=(x1200 + 1);
 if(x1207.scrollLeft!=this._currentScrollLeft)
x1207.scrollLeft=this._currentScrollLeft;
}
 else
 x1206=AdfDhtmlTablePeer._getChildBySubId(x1205,"ft");
 var x1209=x1205.ownerDocument;
 var x1210;
for(var x1211=0;x1211<2;x1211++)
{
 var x1212=x1206.rows[x1211];
 var x1213=x1212.cells;
x1210=x1209.createElement(x1211==0?"th":"td");
cell=x1212.cells[x1208];
(x1201)?(
cell.nextSibling?
x1212.insertBefore(x1210,cell.nextSibling):x1212.appendChild(x1210)
):x1212.insertBefore(x1210,cell);
x1210.style.width=x1204;
 if(x1211==0)x1210.style.cssText=cell.style.cssText;
 else
 {
x1210.className=cell.className;
x1210.innerHTML="&nbsp;";x1210._afrIsFooter=true;
 if(x1199)x1210.rowSpan='10';
}
x1203.push(x1210);
}
this._adjustReorderColumnHeaderWidths(x1206,x1207,x1196,
x1200, -x1202);
 if(x1199)
{
this._insertEmptyDropColGroupCol(x1206,x1196,x1197,x1201,
x1200,x1202,x1203);
}
}
AdfDhtmlTablePeer._columnReorderAnimationComplete= function(x1214)
{
x1214._reorderColumnComponentsWithoutAnimation();
x1214._cleanUpAfterColumnReorder();
}
AdfDhtmlTablePeer.prototype._handleColReorderAbort= function()
{
 var x1215=AdfAgent.AGENT;
 var x1216=(AdfAgent.AGENT.getPlatform()==AdfAgent.WEBKIT_PLATFORM);
 var x1217=this._lastFrozen;
 var x1218=this._getColumnHeader();
 var x1219=AdfDhtmlTablePeer._getChildBySubId(x1218,"t");
 var x1220;
 var x1221;
 if(x1217>=0)
{
x1220=AdfDhtmlTablePeer._getChildBySubId(x1218,"d2");
x1221=AdfDhtmlTablePeer._getChildBySubId(x1220,"t2");
}
this._removeEmptyDropColumn(x1221,x1220);
 var x1222=x1215.getIntAttribute(this._reorderTH,"_d_index", -1);
 var x1223=this._reorderHiddenCells;
 var x1224=this._reorderColWidth;
 var x1225=x1223.length;
 var x1226,x1227;
for(var x1228=0;x1228<x1225;x1228++)
{
 var x1229=x1223[x1228];
x1229.style.display="";
 if(x1229._afrOriginalWidth)
x1229.style.width=x1229._afrOriginalWidth;
 if(x1229.tagName=="TD"&& !x1229._afrIsFooter)
{
x1226=x1229.parentNode;
 if((x1217>=0&&x1222>x1217)&&(x1226!=x1227))
{
this._adjustReorderInnerTableWidth(x1226.parentNode.parentNode, -x1224);
}
x1227=x1226;
}
}
 if(x1216&&x1217>=0&&x1222>x1217)
this._adjustReorderDataBodyNonFrozenCol(-x1224);
this._adjustReorderColumnHeaderWidths((x1217>=0&&(x1222>x1217))?x1221:x1219,
x1220,x1222,x1217, -x1224);
 if(!this._footerless)
this._adjustReorderColumnFooterWidths(x1222,x1217, -x1224);
 if(this._columnReorderTracker!=null)
{
 var x1230=this.getDomElement();
x1230.removeChild(this._columnReorderTracker);
this._columnReorderTracker=null;
}
this._cleanUpAfterColumnReorder();
x1215.enableUserSelect(this._getColumnHeader());
}
AdfDhtmlTablePeer.prototype.GetFocusManager= function()
{
 return this._focusManager;
}
AdfDhtmlTablePeer.prototype.GetFocusedRowKey= function()
{
 return this._focusManager.currency;
}
AdfDhtmlTablePeer.prototype.GetLastRowKey= function()
{
 var x1231=this._focusManager.currency;
 if(x1231==null&&this._isRowSelectionEnabled())
{
 var x1232=this.getComponent();
 var x1233=x1232.getSelectedRowKeys();
for(var x1234 in x1233)
{
 if(x1233[x1234]==AdfUITable._SELECT_ALL)
continue;
 if (x1233[x1234])
x1231=x1234;
}
}
 return x1231;
}
AdfDhtmlTablePeer.prototype.suppressSelectionEventDelivery= function(x1235)
{
this._suppressSelectionEventDelivery=x1235;
}
AdfDhtmlTablePeer.prototype.canDeliverSelectionEvent= function()
{
 return !this._suppressSelectionEventDelivery;
}
AdfDhtmlTablePeer.prototype._getTargetRowHeader= function(x1236,x1237)
{
 var x1238=AdfAgent.getAgent();
 var x1239=null;
while(null!=x1236&&x1236!=x1237)
{
 if(x1238.getNodeName(x1236)=="TD")
{
 if(x1236.getAttribute(AdfDhtmlTablePeer._ROW_HEADER)!=null)
x1239=x1236;
break;
}
x1236=x1236.parentNode;
}
 return x1239;
}
AdfDhtmlTablePeer.prototype.__getSelectedColumns= function()
{
 var x1240=this.__getVisibleLeafColumns();
 var x1241=[],x1242=x1240.length;
for(var x1243=0;x1243<x1242;x1243++)
{
 var x1244=x1240[x1243];
 if (x1244&&x1244.getSelected())
x1241.push(x1244);
}
 return x1241;
}
AdfDhtmlTablePeer.prototype.GetRowHeaderCellFromRow= function(x1245)
{
AdfAssert.assert(x1245!=null,"Unable to get row header cell from a non-valid row!");
 var x1246=AdfAgent.getAgent();
 var x1247=null,x1248,x1249=x1245.cells,x1250=x1249.length;
for(var x1251=0;x1251<x1250;x1251++)
{
x1248=x1249[x1251];
 if(x1248.getAttribute(AdfDhtmlTablePeer._ROW_HEADER)!=null)
{
x1247=x1248;
break;
}
}
 return x1247;
}
AdfDhtmlTablePeer.prototype._isTargetCellEditable= function(x1252)
{
 var x1253=AdfAgent.getAgent();
 var x1254,x1255=this.getDomElement();
 var x1256=AdfDhtmlTablePeer._INPUT_REGEXP;
while(null!=x1252&&x1252!=x1255&&
((x1254=x1253.getNodeName(x1252))!="TD"&&x1254!="TH"))
{
 var x1257=x1252.getAttribute("tabIndex",2);
 if(x1257!=null&&x1257>=0&&x1257!=32768&&x1257!=65535)
 return true;
 else if(x1254.match(x1256))
{
 if(x1257!= -1)
 return true;
}
x1252=x1252.parentNode;
}
 return false;
}
AdfDhtmlTablePeer.prototype._isTargetNavigable= function (x1258)
{
 return (x1258&&x1258.tagName=='A'&&x1258.href&&x1258.href.length>0&&x1258.getAttribute("href")!='#');
}
AdfDhtmlTablePeer.prototype._handleRowMouseDown= function(x1259,x1260,x1261)
{
 var x1262=AdfAgent.AGENT;
 var x1263=x1262.getEventTarget(x1259);
 var x1264=this._getTargetRowHeader(x1263,this.getDomElement());
 var x1265=(null!=x1264);
 var x1266=this._isTargetCellEditable(x1263);
 var x1267=(x1262.getPlatform()==AdfAgent.GECKO_PLATFORM);
 var x1268=this._isTargetNavigable(x1263);
 if(!x1266)
this._grabFocus();
 var x1269=x1262.isLeftButton(x1259);
 if(x1265)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,x1260,x1264);
}
 else if(x1269||this._contextMenuSelect)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x1260,x1261);
}
 if(this._isClickToEdit()&&this._getActiveRowKey()!=x1260)
{
this._cellNavMode=true;
this._ctePatternStart=undefined;
this._setActiveRowKey(x1260);
this._saveClickToEditRequest(x1259,x1261);
 if(x1260)
this._editableTableReadOnlyMode=false;
}
 else if(x1266)
{
 var x1270=this._getCellAndIndexForNode(x1263,x1261);
 var x1271=x1270.cellIndex;
 if(this._ctePatternStart!=x1271)
this._ctePatternStart=undefined;
this._cellNavMode=(AdfPage.PAGE.getActiveDomElement()!=x1263);
}
 if(!this._isRowSelectionEnabled())
 return;
 var x1272=this._selIsSelected(x1260);
 if ((x1269&& !(x1268&&x1267))||(this._contextMenuSelect&& !x1269))
{
 if(!x1272)
{
this._doRowSelection(x1259,x1260,x1261);
this._ignoreRowClick=true;
 if(!x1266)
x1262.eatEvent(x1259);
}
 if(!x1266&&x1269)
{
this._setFocusOnEditableElementInNode(x1262,x1263);
 if(x1265&&this._isMultipleRowSelect())
{
x1262.disableUserSelect(this.GetDatabody());
this._doRowHeaderDrag(x1259,x1260);
x1262.eatEvent(x1259);
}
}
}
}
AdfDhtmlTablePeer.prototype._handleDataBodySelectStart= function(x1273)
{
 if (!x1273)
x1273=AdfPage.PAGE.getDomWindow().event;
 var x1274=AdfAgent.AGENT;
 if(this._isRowSelectionEnabled()&&
 !this._isTargetCellEditable(AdfAgent.AGENT.getEventTarget(x1273)))
x1274.preventDefault(x1273);
}
AdfDhtmlTablePeer.prototype._doRowHeaderDrag= function(x1275,x1276)
{
this._startDragRowHeaderKey=x1276;
 if(this._handleRowHeaderDragCallback==null)
{
this._handleRowHeaderDragCallback=this.createCallback(this._handleRowHeaderDrag);
this._endRowHeaderDragCallback=this.createCallback(this._endRowHeaderDrag);
}
AdfPage.PAGE.startDrag(x1275,
this._handleRowHeaderDragCallback,
this._endRowHeaderDragCallback);
}
AdfDhtmlTablePeer.prototype._handleRowHeaderDrag= function(x1277,x1278,x1279)
{
 var x1280=AdfAgent.getAgent();
 var x1281=x1280.getEventTarget(x1277);
 var x1282=this._getTargetRowHeader(x1281,this.getDomElement());
 if(x1282!=null)
{
 var x1283=x1281.parentNode;
while(x1283&&x1280.getNodeName(x1283)!="TR")
{
x1283=x1283.parentNode;
}
 if(x1283)
{
 var x1284=x1283.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
 if(x1284!=null)
{
this._selectRowRange(this._startDragRowHeaderKey,x1284);
this._startDragRowHeaderKey=x1284;
this._autoScrollRows(x1277);
}
}
}
 else
 {
 var x1285=this.getDomElement();
 var x1283=x1281.parentNode;
while(x1283&&x1283!=x1285)
{
 if (x1280.getNodeName(x1283)=="TR"&&
x1280.getAttribute(x1283,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
this._autoScrollRows(x1277);
break;
}
x1283=x1283.parentNode;
}
}
}
AdfDhtmlTablePeer.prototype._autoScrollRows= function(x1286)
{
 var x1287=AdfAgent.AGENT;
 var x1288=this.GetDatabody();
 var x1289=this.GetScroller();
 if (this._getScrollHeight()<=this._getScrollerOffsetHeight())
 return;
 var x1290=x1287.getMousePosition(x1286);
 var x1291=x1287.getElementPosition(x1288);
 var x1292=Math.max(x1290.y - x1291.y,0);
 var x1293=x1292<AdfDhtmlTablePeer._AUTOSCROLL_MARGIN;
 var x1294=x1292>x1288.offsetHeight - AdfDhtmlTablePeer._AUTOSCROLL_MARGIN;
 if(x1293||x1294)
{
 var x1295=this._currentScrollTop +
 (x1294?this._averageRowHeight: -this._averageRowHeight);
 if(x1295>=0&&x1295<this._getScrollHeight())
{
this._scrollerScrollToPos(null,x1295);
}
}
}
AdfDhtmlTablePeer.prototype._endRowHeaderDrag= function(x1296,x1297,x1298)
{
this._startDragRowHeaderKey=null;
AdfAgent.AGENT.enableUserSelect(this.GetDatabody());
}
AdfDhtmlTablePeer.prototype._handleRowClick= function(x1299,x1300,x1301)
{
 var x1302=AdfAgent.getAgent();
 var x1303=x1302.getEventTarget(x1299);
 var x1304=this._getTargetRowHeader(x1303,this.getDomElement());
 var x1305=(null!=x1304);
 var x1306=this._isTargetNavigable(x1303);
 var x1307=(x1302.getPlatform()==AdfAgent.GECKO_PLATFORM);
 var x1308=x1302.isLeftButton(x1299);
 if (this._ignoreRowClick)
{
this._ignoreRowClick=false;
 return;
}
 if (this._isRowSelectionEnabled())
{
 if(x1305)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,x1300,x1304);
}
 else
 {
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x1300,x1301);
}
 if ((x1308&& !(x1306&&x1307))||(this._contextMenuSelect&& !x1308))
this._doRowSelection(x1299,x1300,x1301);
}
}
AdfDhtmlTablePeer.prototype._doRowSelection= function(
x1309,
x1310,
x1311)
{
 var x1312=this._isMultipleRowSelect();
 if(x1312&&AdfAgent.AGENT.isSelectionToggle(x1309))
{
this._anchorRowKey=x1310;
 if (this._selIsSelected(x1310))
this._selUnselectRow(x1310,x1311);
 else
 this._selSelectRow(x1310,x1311);
}
 else if(x1312&&x1309.shiftKey)
{
 var x1313=this._anchorRowKey;
 if(!x1313)
{
x1313=this._anchorRowKey=x1310;
}
 else if (!this.FindRowByKey(x1313))
{
 var x1314=this.getComponent();
 var x1315= new AdfSelectionEvent(x1314,x1314.getSelectedRowKeys(),null);
x1315.setSelectionRange(x1313,x1310);
x1315.queue();
 return;
}
this.suppressSelectionEventDelivery(true);
this._selUnselectAll();
this._queueColumnSelectionEvent();
this.suppressSelectionEventDelivery(false);
this._selectRowRange(x1310,x1313);
}
 else
 {
this._anchorRowKey=x1310;
 if(!this._selIsOnlySelection(x1310))
{
this.suppressSelectionEventDelivery(true);
this._selUnselectAll();
this.suppressSelectionEventDelivery(false);
this._selSelectRow(x1310,x1311);
this._queueColumnSelectionEvent();
}
}
}
AdfDhtmlTablePeer.prototype._selUnselectAll= function()
{
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT,true);
this._unSelectAllColumns();
this._updateTableSelectionState(new Object());
}
AdfDhtmlTablePeer.prototype._selSelectRow= function(x1316,x1317,x1318)
{
this._selHighlightRow(x1317);
 if(!x1318)
{
 var x1319=this.getComponent();
 var x1320={};
AdfCollections.copyInto(x1320,x1319.getSelectedRowKeys());
 var x1321=x1320[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY];
 if(x1321)
{
 delete x1320[x1316];
}
 else
 {
x1320[x1316]=true;
}
this._updateTableSelectionState(x1320);
}
}
AdfDhtmlTablePeer.prototype._selUnselectRow= function(
x1322,
x1323)
{
this._selUnhighlightRow(x1323);
 var x1324={};
AdfCollections.copyInto(x1324,this.getComponent().getSelectedRowKeys());
 var x1325=x1324[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY];
 if(x1325)
{
x1324[x1322]=true;
}
 else
 {
 delete x1324[x1322];
}
this._updateTableSelectionState(x1324);
}
AdfDhtmlTablePeer.prototype._selectRowRange= function(x1326,x1327)
{
 var x1328=this.GetDatabody();
 if(x1328==null)
 return;
 var x1329=AdfAgent.getAgent();
 var x1330=this.getComponent();
 var x1331={};
AdfCollections.copyInto(x1331,x1330.getSelectedRowKeys());
 var x1332=x1331[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY];
 var x1333=false,x1334=false;
 var x1335=x1328.childNodes,x1336=x1335.length;
for(var x1337=0;x1337<x1336&& !x1334; ++x1337)
{
 var x1338=x1335[x1337];
 var x1339=x1335[x1337].rows,x1340=x1339.length;
for(var x1341=0;x1341<x1340; ++x1341)
{
 var x1342=x1339[x1341];
 var x1343=x1329.getAttribute(x1342,AdfDhtmlTablePeer._ROW_KEY);
 if(x1343!=null)
{
 if(x1343==x1326||x1343==x1327)
{
 if(x1333||x1326==x1327)
{
x1334=true;
}
x1333=true;
}
 if(x1333)
{
this._selSelectRow(x1343,x1342,true);
 if(x1332)
 delete x1331[x1343];
 else
 x1331[x1343]=true;
}
 if(x1334)
break;
}
}
}
this._updateTableSelectionState(x1331);
}
AdfDhtmlTablePeer.prototype._selIsSelected= function(x1344)
{
 var x1345=this.getComponent().getSelectedRowKeys();
 var x1346=x1345[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY];
 return x1346? !x1345[x1344]:x1345[x1344];
}
AdfDhtmlTablePeer.prototype._selIsOnlySelection= function(x1347)
{
 var x1348=this.getComponent().getSelectedRowKeys();
 if(x1348[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY]!=null)
 return false;
 var x1349=x1348[x1347];
 if(x1349)
{
for(var x1350 in x1348)
{
 if(x1350!=x1347)
{
x1349=false;
break;
}
}
}
 return x1349;
}
AdfDhtmlTablePeer.prototype._selHighlightRow= function(x1351)
{
AdfAssert.assertDomNode(x1351);
AdfDomUtils.addCSSClassName(x1351,AdfDhtmlTablePeer._SELECTED_CLASS);
AdfDomUtils.removeCSSClassName(x1351,AdfDhtmlTablePeer._HIGHLIGHTED_CLASS);
 if(!this.isInActiveHeirarchy())
{
AdfDomUtils.addCSSClassName(x1351,AdfDhtmlTablePeer._INACTIVE_CLASS);
}
 else
 {
AdfDomUtils.removeCSSClassName(x1351,AdfDhtmlTablePeer._INACTIVE_CLASS);
}
}
AdfDhtmlTablePeer.prototype._selUnhighlightRow= function(x1352)
{
AdfAssert.assertDomNode(x1352);
AdfDomUtils.removeCSSClassName(x1352,AdfDhtmlTablePeer._INACTIVE_CLASS);
AdfDomUtils.removeCSSClassName(x1352,AdfDhtmlTablePeer._SELECTED_CLASS);
}
AdfDhtmlTablePeer.prototype._isColumnSelectionEnabled= function()
{
 var x1353=this.getComponent().getColumnSelection?
this.getComponent().getColumnSelection():null;
 return (x1353&&x1353!=AdfDhtmlTablePeer._SELECTION_NONE);
}
AdfDhtmlTablePeer.prototype._isMultipleColumnSelect= function()
{
 var x1354=this.getComponent().getColumnSelection?
this.getComponent().getColumnSelection():null;
 return (x1354&&x1354==AdfDhtmlTablePeer._SELECTION_MULTIPLE);
}
AdfDhtmlTablePeer.prototype._isRowSelectionEnabled= function(x1355)
{
 if(!x1355)
x1355=this.getComponent();
 var x1356=x1355.getRowSelection();
 return (x1356&&
x1356.toLowerCase()!=AdfDhtmlTablePeer._SELECTION_NONE);
}
AdfDhtmlTablePeer.prototype._isMultipleRowSelect= function()
{
 var x1357=this.getComponent().getRowSelection();
 return (x1357&&
x1357.toLowerCase().indexOf(AdfDhtmlTablePeer._SELECTION_MULTIPLE)!= -1);
}
AdfDhtmlTablePeer.prototype._isMultipleRowSelectNoSelectAll= function()
{
 var x1358=this.getComponent().getRowSelection();
 return (x1358&&
x1358.indexOf(AdfDhtmlTablePeer._SELECTION_MULTIPLE_NOSELECTALL)!= -1);
}
AdfDhtmlTablePeer.prototype._selUpdateAll= function(
x1359,
x1360,
x1361)
{
 if(x1361==null)
x1361=this.getComponent().getSelectedRowKeys();
 var x1362=false;
 if(x1361!=null)
x1362=x1361[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY]?true:false;
 if(x1362)
{
this._selectAllSelectionUpdate(x1359,x1360,x1361);
}
 else
 {
this._normalSelectionUpdate(x1359,x1360,x1361);
}
}
AdfDhtmlTablePeer.prototype._normalSelectionUpdate= function(
x1363,
x1364,
x1365)
{
 var x1366=this.GetDatabody();
 if(x1366==null)
 return;
 if(true==x1364)
{
this._highlightedRowKey=null;
}
 if(!x1365||AdfCollections.isEmpty(x1365))
 return;
 var x1367=x1366.childNodes,x1368=x1367.length;
 var x1369=AdfAgent.getAgent();
for(var x1370=0;x1370<x1368; ++x1370)
{
 var x1371=x1367[x1370];
 var x1372=x1371.rows;
 if(!x1372)continue;
 var x1373=x1372.length;
for(var x1374=0;x1374<x1373; ++x1374)
{
 var x1375=x1372[x1374];
 var x1376=x1369.getAttribute(x1375,AdfDhtmlTablePeer._ROW_KEY);
 if (x1376==null)
continue;
 if ((false==x1364)&&(this._highlightedRowKey==x1376))
continue;
switch(x1363)
{
default:
break;
 case AdfDhtmlTablePeer._SEL_UPDATE_ALL_SELECT:
this._selHighlightRow(x1375);
break;
 case AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT:
this._selUnhighlightRow(x1375);
break;
 case AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE:
 if(x1365[x1376])
this._selHighlightRow(x1375);
 else
 this._selUnhighlightRow(x1375);
break;
}
}
}
this._updateColumnSelection(x1363!=1);
}
AdfDhtmlTablePeer.prototype._selectAllSelectionUpdate= function(
x1377,
x1378,
x1379)
{
 var x1380=this.GetDatabody();
 if(x1380==null)
 return;
 if(true==x1378)
{
this._highlightedRowKey=null;
}
 if(!x1379||AdfCollections.isEmpty(x1379))
 return;
 var x1381=x1380.childNodes,x1382=x1381.length;
 var x1383=AdfAgent.getAgent();
for(var x1384=0;x1384<x1382; ++x1384)
{
 var x1385=x1381[x1384];
 var x1386=x1385.rows;
 if(!x1386)continue;
 var x1387=x1386.length;
for(var x1388=0;x1388<x1387; ++x1388)
{
 var x1389=x1386[x1388];
 var x1390=x1383.getAttribute(x1389,AdfDhtmlTablePeer._ROW_KEY);
 if (x1390==null)
continue;
 if ((false==x1378)&&(this._highlightedRowKey==x1390))
continue;
switch(x1377)
{
default:
break;
 case AdfDhtmlTablePeer._SEL_UPDATE_ALL_SELECT:
this._selHighlightRow(x1389);
break;
 case AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT:
this._selUnhighlightRow(x1389);
break;
 case AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE:
 if(x1379[x1390])
this._selUnhighlightRow(x1389); else
 this._selHighlightRow(x1389);
break;
}
}
}
}
AdfDhtmlTablePeer.prototype._selSelectAll= function()
{
 var x1391=this.GetDatabody();
 if(x1391==null)
 return;
 if(!this._isMultipleRowSelect())
 return;
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT,true);
 var x1392= new Object();
x1392[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY]=true;
this._updateTableSelectionState(x1392);
 var x1393=x1391.childNodes,x1394=x1393.length;
 var x1395=AdfAgent.getAgent();
for(var x1396=0;x1396<x1394; ++x1396)
{
 var x1397=x1393[x1396];
 var x1398=x1393[x1396].rows,x1399=x1398.length;
for(var x1400=0;x1400<x1399; ++x1400)
{
 var x1401=x1398[x1400];
 var x1402=x1395.getAttribute(x1401,AdfDhtmlTablePeer._ROW_KEY);
 if(x1402!=null)
this._selHighlightRow(x1401);
}
}
}
AdfDhtmlTablePeer.prototype._unhiglightAnyExistingHighlightedRow= function()
{
 var x1403=this._highlightedRowKey;
 if (x1403)
{
this._highlightedRowKey=null;
 if (!this._selIsSelected(x1403))
{
this._selUnhighlightRow(this._highlightedRow);
this._highlightedRow=null;
}
}
}
AdfDhtmlTablePeer.prototype._updateTableSelectionState= function(x1404)
{
this._ignoreSelSet=true;
AdfLogger.LOGGER.finer("Update Table selection state to:",x1404);
this.getComponent().setSelectedRowKeys(x1404);
this._ignoreSelSet=false;
}
AdfDhtmlTablePeer.prototype.ComponentSelectedRowKeysChanged= function(
x1405,
x1406,
x1407,
x1408)
{
 if (!this._ignoreSelSet)
{
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT,true,x1408);
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE,true,x1407);
}
 else
 {
 var x1409=this.GetAssociatedComponent();
 if(x1409!=null)
{
x1409.setSelectedRowKeys(x1407);
}
}
 if(this._pcPeer)
this._pcPeer.updateRowSelectionContext();
}
AdfDhtmlTablePeer.prototype._resolveColumns= function(x1410,x1411,x1412)
{
 var x1413=AdfAgent.AGENT.getIntAttribute(x1412,"_d_index", -1);
 if (x1413>=0)
{
 var x1414=x1412.colSpan;
 if(x1414!=null&&(x1414=parseInt(x1414))>1)
{
 var x1415=x1413+x1414;
while(x1413<x1415)
{
x1411.push(this._getColumnHeaderLeafCell(x1413).id);
x1410.push(x1413++);
}
}
 else
 {
x1410.push(x1413);
x1411.push(x1412.id);
}
}
}
AdfDhtmlTablePeer.prototype._handleColumnHeaderDrag= function(
x1416,
x1417,
x1418
)
{
 var x1419=this._getColumnHeaderMouseAction(x1416);
 if(x1419!=null&&"select"==x1419.type)
{
 var x1420=x1419.colIndices;
 if(x1420.length>0)
{
this._selectColumnRange(this._activeColIndices,this._activeColIds,
x1420,x1419.colIds);
this._queueColumnSelectionEvent();
}
}
this._autoScrollColumnsIfNecessary(x1416);
 if(this._pcPeer)
this._pcPeer.updateStandardMenuToolbarItems();
}
AdfDhtmlTablePeer.prototype._handleColumnHeaderDrop= function(
x1421,
x1422,
x1423
)
{
 var x1424=this._getColumnHeader();
AdfAgent.AGENT.enableUserSelect(x1424);
this._queueColumnSelectionEvent();
}
AdfDhtmlTablePeer.prototype._doColumnSelections= function(
x1425,
x1426,
x1427,
x1428,
x1429)
{
 var x1430=AdfPage.PAGE;
 if ((x1425||x1427)&&this._isMultipleColumnSelect())
{
 var x1431=this.getComponent();
this._activeColIndices=x1428;
this._activeColIds=x1429;
for(var x1432=0;x1432<x1428.length;x1432++)
{
 var x1433=x1430.findComponent(x1429[x1432]);
 if (x1433.getSelected())
this._unSelectColumn(x1428[x1432],x1433,false); else
 this._selectColumn(x1428[x1432],x1433,false);}
this._queueColumnSelectionEvent();
}
 else if(x1426&&this._isMultipleColumnSelect())
{
 if(this._activeColIndices&&this._activeColIndices.length>=0)
{
this._clearColumnSelectionEventChangedSets();
this._selUnselectAll();
this._selectColumnRange(this._activeColIndices,this._activeColIds,
x1428,x1429);
this._queueColumnSelectionEvent();
}
}
 else
 {
this._activeColIndices=x1428;
this._activeColIds=x1429;
this._clearColumnSelectionEventChangedSets();
this._selUnselectAll();
for(var x1432=0;x1432<x1428.length;x1432++)
{
 var x1433=x1430.findComponent(x1429[x1432]);
this._selectColumn(x1428[x1432],x1433,false);
}
this._queueColumnSelectionEvent();
}
 if(this._pcPeer)
this._pcPeer.updateStandardMenuToolbarItems();
}
AdfDhtmlTablePeer.prototype._selectColumn= function(x1434,x1435,x1436)
{
 if(!x1435.getSelected())
{
x1435.setProperty(AdfRichColumn.SELECTED,true,true,AdfUIComponent.PROPAGATE_NEVER);
this._highlightColumn(x1434);
 if(this._isClickToEdit()&&this._getActiveRowKey())
this._setActiveRowKey(null);
this._colSelEventSelectedColIds[x1435.getClientId()]=true;
 if (x1436)
{
this._queueColumnSelectionEvent();
}
}
}
AdfDhtmlTablePeer.prototype._unSelectColumn= function(x1437,x1438,x1439)
{
 if(x1438.getSelected())
{
x1438.setProperty(AdfRichColumn.SELECTED,false,true,AdfUIComponent.PROPAGATE_NEVER);
this._unHighlightColumn(x1437);
this._colSelEventUnselectedColIds[x1438.getClientId()]=true;
 if (x1439)
{
this._queueColumnSelectionEvent();
}
}
}
AdfDhtmlTablePeer.prototype._unSelectAllColumns= function()
{
 if(this._isColumnSelectionEnabled())
{
 var x1440=AdfPage.PAGE;
 var x1441=this._colCount;
 var x1442;
this._clearColumnSelectionEventRemovedSet();
for(var x1443=0;x1443<x1441;x1443++)
{
x1442=this._getColumnHeaderLeafCell(x1443);
 if (x1442)
this._unSelectColumn(x1443,x1440.findComponent(x1442.id),false);
}
}
 if(this._pcPeer)
this._pcPeer.updateStandardMenuToolbarItems();
}
AdfDhtmlTablePeer.prototype._updateColumnSelection= function(x1444)
{
 if (this._headerless)
 return;
 var x1445=AdfPage.PAGE;
 var x1446=this._colCount,x1447=this.getComponent();
for(var x1448=0;x1448<x1446;x1448++)
{
 var x1449=this._getColumnHeaderLeafCell(x1448);
 if (!x1449)
continue;
 var x1450=x1449.id;
 var x1451=x1445.findComponent(x1450);
 if(x1451.getSelected())
{
 if(x1444)
this._highlightColumn(x1448);
 else
 this._unHighlightColumn(x1448);
}
}
}
AdfDhtmlTablePeer.prototype._selectColumnRange= function(
x1452,
x1453,
x1454,
x1455)
{
 var x1456=AdfPage.PAGE;
for(var x1457=0;x1457<x1452.length;x1457++)
this._selectColumn(x1452[x1457],x1456.findComponent(x1453[x1457]));
 var x1458=x1454[0]>x1452[0]?1: -1;
 var x1459=x1452[0],x1460=x1453[0];
while(x1459!=x1454[0])
{
this._selectColumn(x1459,x1456.findComponent(x1460));
x1459+=x1458;
x1460=this._getColumnHeaderLeafCell(x1459).id;
}
for(var x1457=0;x1457<x1454.length;x1457++)
this._selectColumn(x1454[x1457],x1456.findComponent(x1455[x1457]));
}
AdfDhtmlTablePeer.prototype._highlightColumn= function(x1461)
{
 var x1462=this._getColumnHeaderLeafCell(x1461);
this._highlightCell(x1462,true);
 var x1463=this.GetDatabody().childNodes;
 var x1464=x1463.length;
 var x1465=null;
 var x1466=AdfAgent.getAgent();
for(var x1467=0;x1467<x1464; ++x1467)
{
 var x1468=x1463[x1467];
 var x1469=x1463[x1467].rows,x1470=x1469.length;
for(var x1471=0;x1471<x1470; ++x1471)
{
 if (!x1466.getAttribute(x1469[x1471],AdfDhtmlTablePeer._ROW_KEY,null))
continue;
 if(x1465==null)
x1465=this.isInActiveHeirarchy();
 if((this._lastFrozen>=0)&&(x1461>this._lastFrozen))
this._highlightCell(this._getInnerTableCell(x1469[x1471],x1461),x1465);
 else
 this._highlightCell(x1469[x1471].cells[x1461],x1465);
}
}
}
AdfDhtmlTablePeer.prototype._unHighlightColumn= function(x1472)
{
 var x1473=this._getColumnHeaderLeafCell(x1472);
this._unHighlightCell(x1473,true);
 var x1474=this.GetDatabody().childNodes,x1475=x1474.length;
 var x1476=AdfAgent.getAgent();
for(var x1477=0;x1477<x1475; ++x1477)
{
 var x1478=x1474[x1477];
 var x1479=x1474[x1477].rows,x1480=x1479.length;
for(var x1481=0;x1481<x1480; ++x1481)
{
 if (!x1476.getAttribute(x1479[x1481],AdfDhtmlTablePeer._ROW_KEY,null))
continue;
 if((this._lastFrozen>=0)&&(x1472>this._lastFrozen))
this._unHighlightCell(this._getInnerTableCell(x1479[x1481],x1472));
 else
 this._unHighlightCell(x1479[x1481].cells[x1472]);
}
}
}
AdfDhtmlTablePeer.prototype._highlightCell= function(
x1482,
x1483)
{
AdfDomUtils.addCSSClassName(x1482,AdfDhtmlTablePeer._SELECTED_CLASS);
}
AdfDhtmlTablePeer.prototype._unHighlightCell= function(x1484)
{
AdfDomUtils.removeCSSClassName(x1484,AdfDhtmlTablePeer._SELECTED_CLASS);
AdfDomUtils.removeCSSClassName(x1484,AdfDhtmlTablePeer._INACTIVE_CLASS);
}
AdfDhtmlTablePeer.prototype._getParentTH= function(x1485)
{
 var x1486=AdfAgent.AGENT;
 var x1487=x1486.getEventTarget(x1485);
 var x1488=null,x1489=this.getDomElement();
while(!x1488&&x1487&&x1487!=x1489&&x1487.nodeType==1)
{
 if (x1487.getAttribute("_d_index"))
x1488=x1487;
 else
 x1487=x1487.parentNode;
}
 return x1488;
}
AdfDhtmlTablePeer.prototype._getColumnHeaderCellForEvent= function(x1490)
{
 var x1491=null;
 var x1492=this._getColumnHeader();
 var x1493=AdfAgent.AGENT;
 var x1494=x1493.getElementPosition(x1492);
 var x1495=x1493.getMousePosition(x1490);
 if (x1495.y - x1494.y<=this._cachedCHHeight)
{
x1491=this._getParentTH(x1490);
}
 return x1491;
}
AdfDhtmlTablePeer.prototype._getColumnHeaderMouseAction= function(x1496)
{
 var x1497=null;
 if (!this._headerless)
{
 var x1498=AdfAgent.AGENT;
 var x1499=null;
 var x1500=this._getColumnHeader();
 var x1501=x1498.getElementPosition(x1500);
 var x1502=x1498.getMousePosition(x1496);
 if (x1502.y - x1501.y<=this._cachedCHHeight)
{
x1499=this._getParentTH(x1496);
}
 if (x1499)
{
x1497= new Object();
 var x1503=null;
 var x1504=x1498.getIntAttribute(x1499,"_d_index", -1);
 var x1505=AdfDhtmlTablePeer._isRTL();
 if(x1504!= -1)
{
 var x1506=x1498.getElementPosition(x1499);
 var x1507=x1502.x - x1506.x;
 var x1508=x1499.offsetWidth;
 var x1509=
 !(this._lastColWidthOverride!= -1&&x1504==this._colCount-1);
 if (x1507<=AdfDhtmlTablePeer.COLUMN_RESIZE_MARGIN)
{
 if(x1505)
{
 if(x1509)
x1503="end";
}
 else if(x1504>0)
x1503="start";
}
 else if (x1508-x1507<=AdfDhtmlTablePeer.COLUMN_RESIZE_MARGIN)
{
 if(x1505)
{
 if(x1504>0)
x1503="start";
}
 else if(x1509)
x1503="end";
}
}
x1497.cell=x1499;
 if (x1503)
{
x1497.type="resize";
x1497.data=x1503;
}
 else if(x1499.getAttribute(AdfDhtmlTablePeer._SELECT_ALL)!=null)
{
x1497.type="selectAll";
}
 else if(x1499.getAttribute("_afrFH")!=null)
{
x1497.type="clearAllFilter";
}
 else if(x1504==0&&this._lastFrozen>=0)
{
x1497.type="default";
}
 else
 this._getColHeaderMouseSelAction(x1496,x1497,x1499);
}
}
 return x1497;
}
AdfDhtmlTablePeer.prototype._getColHeaderMouseSelAction= function(x1510,x1511,x1512)
{
 var x1513=AdfAgent.AGENT;
 var x1514=x1513.getEventTarget(x1510);
 var x1515=this._isColumnSelectionEnabled();
 var x1516=x1514.parentNode.getAttribute(AdfDhtmlTablePeer._SORT_ASCENDING);
 if(!x1516)
x1516=x1514.parentNode.parentNode.getAttribute(AdfDhtmlTablePeer._SORT_ASCENDING);
 var x1517=x1514.parentNode.getAttribute(AdfDhtmlTablePeer._SORT_DESCENDING);
 if(!x1517)
x1517=x1514.parentNode.parentNode.getAttribute(AdfDhtmlTablePeer._SORT_DESCENDING);
 if(x1516||x1517)
{
 if(x1510.type=="click")
{
 var x1518=x1513.getElementById(
AdfRichUIPeer.CreateSubId(x1512.id,AdfDhtmlTablePeer.__SORT_INDICATOR));
 var x1519=x1518.getAttribute(AdfDhtmlTablePeer._SORTED_TYPE);
 if(x1516)
{
 if(x1519==AdfDhtmlTablePeer._SORTED_ASCENDING)
 return;
x1511.sortOrder=true;
}
 else if(x1517)
{
 if(x1519==AdfDhtmlTablePeer._SORTED_DESCENDING)
 return;
x1511.sortOrder=false;
}
x1511.type="sort";
x1511.sortProperty=AdfPage.PAGE.findComponent(x1512.id).getSortProperty();
}
}
 else if(x1512.id.indexOf("_afrBlankColumn")== -1){
 if (!x1515&&this.getComponent().getDisableColumnReordering()
&&x1512.getAttribute(AdfDhtmlTablePeer._ROW_HEADER)==null)
{
x1511.type="default";
}
 else if(!x1515&&
x1512.getAttribute(AdfDhtmlTablePeer._ROW_HEADER)==null&&
x1512.getAttribute(AdfDhtmlTablePeer._ROOT_COLUMN)!=null)
{
 var x1518=x1513.getElementById(
AdfRichUIPeer.CreateSubId(x1512.id,AdfDhtmlTablePeer.__SORT_INDICATOR));
 if(x1518!=null)
{
 if(x1510.type=="click")
{
 var x1519=x1518.getAttribute(AdfDhtmlTablePeer._SORTED_TYPE);
x1511.sortOrder=(x1519==AdfDhtmlTablePeer._SORTED_ASCENDING)?false:true;
x1511.type="sort";
x1511.sortProperty=AdfPage.PAGE.findComponent(x1512.id).getSortProperty();
}
 else x1511.type=(x1510.type=="mousemove")?"default":"move";
}
 else x1511.type="move";
}
 else if(x1512.getAttribute(AdfDhtmlTablePeer._ROW_HEADER)==null)
{
 if(this._shouldEnableColumnReorder(x1510,x1512))
{
 if(!this.getComponent().getDisableColumnReordering())
x1511.type="move";
}
 else if(x1512.id&&x1515)
{
x1511.type="select";
this._resolveColumns((x1511.colIndices=[]),
(x1511.colIds=[]),x1512);
}
 else
 x1511.type="default";
}
}
}
AdfDhtmlTablePeer.prototype._shouldEnableColumnReorder= function(x1520,x1521)
{
 var x1522=AdfPage.PAGE;
 var x1523= -1;
 var x1524=false;
 var x1525=null,x1526=null;
 var x1527=this._flattenedColumns;
 var x1528=(x1521.getAttribute(AdfDhtmlTablePeer._LEAF_COLUMN)!=null),
x1529=(x1521.getAttribute(AdfDhtmlTablePeer._ROOT_COLUMN)!=null);
 if(x1528&&x1529)
{
 if(x1521.id&&x1521.id.length>0&&x1522.findComponent(x1521.id).getSelected())
x1526=[x1521.id];
}
 else if(x1529)
{
this._resolveColumns(x1525=[],x1526=[],x1521);
 if(x1526.length==0)
x1526=null;
 else
 {
for(i=x1526.length-1;i>=0; --i)
{
 if(!x1522.findComponent(x1526[i]).getSelected())
{
x1526=null;
break;
}
}
}
}
 if(x1526)
{
x1524=true;
x1527=this.__getVisibleLeafColumns();
for(i=x1527.length-1;i>=0; --i)
{
 var x1530=x1527[i];
 if(x1530&&x1530.getSelected())
{
 var x1531=false;
for(j=x1526.length-1;j>=0; --j)
{
 if(x1530.getClientId()==x1526[j])
{
x1531=true;
break;
}
}
 if(!x1531)
{
x1524=false;
break;
}
}
}
}
 return x1524;
}
AdfDhtmlTablePeer.prototype._handleColResizeDrag= function(x1532,x1533,x1534)
{
 var x1535=this._getColumnResizeIndicator();
 var x1536=x1535.style;
 var x1537=parseInt(x1536.left);
 var x1538=this._resizedTH;
 var x1539=parseInt(x1538.style.width);
 var x1540=this._resizeColDelta + (AdfDhtmlTablePeer._isRTL()?-x1533:x1533);
 var x1541=this._getLargestMinimumWidth();
this._resizeColDelta=x1540;
 if (x1539 + x1540>=x1541)
x1536.left=x1537 + x1533 + 'px';
}
AdfDhtmlTablePeer.prototype._getLargestMinimumWidth= function()
{
 var x1542=this._resizedIndex;
 var x1543=this.__getVisibleLeafColumns();
 var x1544=x1543[x1542];
 var x1545=this._largestMinimumWidth;
 if (x1545==null)
{
x1545=0;
 var x1546=this.__getSelectedColumns();
 if (AdfCollections.indexOf(x1546,x1544)== -1)
{
x1545=x1544.getMinimumWidth();
}
 else
 {
 var x1547=x1546.length;
for(var x1548=0;x1548<x1547;x1548++)
{
 var x1549=x1546[x1548].getMinimumWidth();
x1545=Math.max(x1545,x1549);
}
}
this._largestMinimumWidth=x1545;
}
 return this._largestMinimumWidth;
}
AdfDhtmlTablePeer.prototype._handleColResizeDrop= function(x1550,x1551,x1552)
{
 var x1553=this._getColumnResizeIndicator();
 var x1554=x1553.style;
x1554.display='none';
 var x1555=this._resizeColDelta;
 var x1556=this._resizedTH;
 var x1557=x1555 + parseInt(x1556.style.width);
 var x1558=this._getLargestMinimumWidth();
x1557=Math.max(x1557,x1558);
 if(this._lastFrozen>=0)
{
 if(this._resizedIndex<=this._lastFrozen)
{
 var x1559=Math.max(this.GetDatabody().clientWidth - 10,x1558);
 if(x1556.offsetLeft + x1557>=x1559)
{
x1557=x1559 - x1556.offsetLeft;
}
}
}
AdfAssert.assert(
 !isNaN(x1557),
"Illegal width for column resize drop.  delta = " + x1555 + ", th.style.width = " + x1556.style.width);
this._doColResizesFromUser(x1557,null);
}
AdfDhtmlTablePeer.prototype._doColResizesFromUser= function(x1560,x1561)
{
this._largestMinimumWidth=null;
this._resizedTH=null;
 var x1562=this._resizedIndex;
 var x1563=this.__getVisibleLeafColumns();
 var x1564=x1563.length;
 var x1565=x1563[x1562];
 var x1566=false;
 var x1567=0;
 var x1568=this.GetDatabody();
 var x1569=this.__getSelectedColumns();
 var x1570=false;
 if (x1561==null)
{
x1570=
(AdfCollections.indexOf(x1569,x1565)!= -1);
 var x1571=1;
 if (x1570)
{
x1571=x1569.length;
}
}
 var x1572;
 if (!this.IsEmpty)
{
 var x1573=x1568.childNodes[0];
x1572=x1573.rows[0];
AdfAssert.assert(
x1572!=null,
"this.IsEmpty was " + this.IsEmpty + " but there were no rows!");
}
 var x1574=[];
 var x1575=[];
 var x1576=[];
 var x1577;
 var x1578=0;
 var x1579;
 var x1580=0;
 var x1581;
 var x1582=this._columnStretching;
 var x1583=0;
for(x1581=0;x1581<x1564;x1581++)
{
x1577=x1563[x1581];
 var x1584=this._getColumnFlex(x1577,null,x1582,x1564,x1581);
x1579=this._getColumnActualWidth(x1581,x1572);
x1583+=x1579;
 if (
(x1570&&(AdfCollections.indexOf(x1569,x1577)!= -1))||
(!x1570&&(x1581==x1562))
)
{
 if (x1561!=null)
{
x1584=this._getColumnFlex(null,x1561,x1582,x1564,x1581);
}
x1578++;
x1580+=x1579;
x1576.push(
{
"component":x1577,
"displayIndex":x1581,
"flex":x1584,
"minimumWidth":x1577.getMinimumWidth(),
"actualWidth":x1579
});
continue;
}
 if (x1584!=null)
{
 var x1585=
{
"component":x1577,
"displayIndex":x1581,
"flex":x1584,
"minimumWidth":x1577.getMinimumWidth(),
"actualWidth":x1579
};
}
}
 if (x1582!="none"&&x1582!="blank")
{
 return this._userDragStretchedColumns(
x1560,x1561,x1572,
x1576,x1563,x1582
);
}
 var x1586=x1578*x1560 - x1580;
 var x1587;
 var x1588=Math.abs(x1586);
 var x1589=x1575.length;
 var x1590=Math.floor(x1588/x1589);
 var x1591=x1588 - x1589*x1590;
 var x1592=0;
do
{
for(var x1593=0;x1593<x1589;x1593++)
{
x1587=x1575[x1593];
 if (true!=x1587["atMinimum"])
{
 var x1594=x1587["minimumWidth"];
x1579=x1587["actualWidth"];
 var x1595=x1590;
 if (x1591>0)
{
x1595+=x1591;
x1591=0;
}
 if (x1586<0)
{
x1595*= -1;
}
 var x1596=x1579 - x1595;
 var x1597=x1587["desiredWidth"];
 if (x1597!=null)
{
x1596+=x1597 - x1579;
}
 var x1598=Math.max(x1594,x1596);
 if (x1598!=x1596)
{
x1587["atMinimum"]=true;
x1592++;
}
x1591+=x1598 - x1596;
x1587["desiredWidth"]=x1598;
}
}
x1590=0;}
while((x1591!=0)&&(x1592<x1589));
 var x1599=x1574.concat(x1575);
 var x1600=x1576.length;
for(x1581=0;x1581<x1600;x1581++)
{
x1577=x1576[x1581];
 if (x1577["flex"]==null)
{
delta=x1560 - x1577["actualWidth"];
this._doResizeColumn(x1577["displayIndex"],null,x1560,delta,true);
}
 else
 {
x1577["desiredWidth"]=x1560;
x1599.push(x1577);
}
}
 var x1601=x1599.length;
 var x1602=0;
for(x1581=0;x1581<x1601;x1581++)
{
x1577=x1599[x1581];
x1598=x1577["desiredWidth"];
x1579=x1577["actualWidth"];
 if (x1598==null)
{
x1598=x1579;
x1577["desiredWidth"]=x1598
}
x1577["delta"]=x1598 - x1579;
x1602+=x1598;
}
 var x1603=[];
for(x1581=0;x1581<x1601;x1581++)
{
x1577=x1599[x1581];
x1598=x1577["desiredWidth"];
delta=x1577["delta"];
x1562=x1577["displayIndex"];
this._doResizeColumn(x1562,null,x1598,delta,false);
 var x1604=Math.round(10000*x1598/x1602) + "%";
 var x1605=x1577["component"];
this._ignoreSetColWidth=true;
x1605.setProperty(AdfRichColumn.WIDTH,x1604,true);
 delete this._ignoreSetColWidth;
x1603.push(
{
"displayIndex":x1562,
"width":x1598
});
}
this._currentColumnStretchDetails=x1603;
this._stretchTheColumns();
 var x1606=this._getColumnHeader();
AdfAgent.AGENT.enableUserSelect(x1606);
}
AdfDhtmlTablePeer.prototype._userDragStretchedColumns= function(
x1607,
x1608,
x1609,
x1610,
x1611,
x1612)
{
 var x1613=[];
 var x1614=x1610.length;
 var x1615=0;
 var x1616=0;
 var x1617;
 var x1618;
 if (x1608==null)
{
x1608=0;
for(x1618=0;x1618<x1614;x1618++)
{
x1617=x1610[x1618];
x1608+=x1617["actualWidth"];
x1617["desiredWidth"]=x1617["minimumWidth"];
x1613[x1617["displayIndex"]]=x1617;
x1615+=x1617["minimumWidth"];
x1616=Math.max(x1616,x1617["actualWidth"]);
}
}
 var x1619=0;
 var x1620=0;
 var x1621,x1622;
 var x1623;
 var x1624=false;
 var x1625;
 var x1626=[];
 var x1627;
 if (x1607>x1616)
{
x1624=true;
x1621=x1610[x1614 - 1]["displayIndex"] + 1;
for(x1623=x1621;x1623<x1611.length;x1623++)
{
x1626.push(this._createStrechColumnData(x1623,x1611[x1623],x1609));
x1622=x1626.length - 1;
x1619+=x1626[x1622]["minimumWidth"];
x1620+=x1626[x1622]["actualWidth"];
}
}
 else
 {
x1621=x1610[0]["displayIndex"] - 1;
for(x1623=x1621;x1623>=0;x1623--)
{
x1626.push(this._createStrechColumnData(x1623,x1611[x1623],x1609));
x1622=x1626.length - 1;
x1619+=x1626[x1622]["minimumWidth"];
x1620+=x1626[x1622]["actualWidth"];
}
}
x1625=x1620 - x1619;
x1627=x1607 - x1616;
 if (x1627>=0&&x1627>x1625)
{
x1607=x1625 + x1615;
x1627=x1625;
 if (x1607<=0){
 return;
}
}
x1610.sort(AdfDhtmlTablePeer.__columnSortComparator);
 var x1628=x1608 - x1615 + x1627;
while(x1628!=0)
{
 var x1629=[];
 var x1630=x1610[0]["desiredWidth"];
for(x1623=0;x1623<x1614;x1623++)
{
 var x1631=0;
x1617=x1610[x1623];
 if (!x1610[x1623+1])
{
x1630=Math.abs(x1628);
x1631=Math.abs(x1628);
}
 else
 {
x1631=x1617["desiredWidth"];
}
 if (x1631<=x1630)
{
x1629.push(x1617);
}
 else
 {
break;
}
}
 var x1632=Math.floor(x1628/x1629.length);
 if (x1632>x1630&&x1629.length<x1614)
{
x1632=x1610[x1629.length]["desiredWidth"] - x1629[x1629.length-1]["desiredWidth"];
}
for(x1623=0;x1623<x1629.length;x1623++)
{
x1629[x1623]["desiredWidth"]+=x1632;
x1628-=x1632;
}
 if (x1628/x1629.length<1)
{
x1610[x1614-1]["desiredWidth"]+=x1628;
x1628=0;
}
}
for(x1623=0;x1623<x1614;x1623++)
{
x1617=x1610[x1623];
x1617["flex"]=Math.abs(x1617["desiredWidth"]);
this._doResizeColumn(
x1617["displayIndex"],
null,
x1617["flex"],
x1617["flex"] - x1617["actualWidth"],
true
);
}
 if (!x1624)
{
 var x1633=x1610[x1614 - 1]["displayIndex"] + 1;
 if (!x1611[x1633])x1633++;
 if (x1633<x1611.length)
{
 var x1634=Math.abs(x1627);
x1626[x1633]=
{
"component":x1611[x1633],
"displayIndex":x1623,
"minimumWidth":x1611[x1633].getMinimumWidth(),
"actualWidth":this._getColumnActualWidth(x1633,x1609)
};
x1626[x1633]["actualWidth"]+=x1634;
this._doResizeColumn(x1633,null,x1626[x1633]["actualWidth"],x1634,true);
 if (x1607>=x1615)x1627=0;
}
}
 var x1635;
 var x1636;
 if (x1624)
{
 var x1637=x1627;
for(x1623=0;x1623<x1626.length;x1623++)
{
x1635=x1626[x1623];
 if (x1635.component)
{
x1636=x1635["actualWidth"] - x1635["minimumWidth"];
 if (x1637>=x1636)
{
x1635["newWidth"]=x1635["minimumWidth"];
x1635["flex"]=x1635["newWidth"];
x1613[x1635["displayIndex"]]=x1635;
this._doResizeColumn(x1635["displayIndex"],null,x1635["newWidth"],x1624? -x1636:x1636,true);
x1637-=x1636;
}
 else
 {
x1635["newWidth"]=x1635["actualWidth"] - x1627;
x1635["flex"]=x1635["newWidth"];
x1613[x1635["displayIndex"]]=x1635;
this._doResizeColumn(x1635["displayIndex"],null,x1635["newWidth"],x1624? -x1637:x1637,true);
break;
}
}
}
}
 var x1638=[];
 var x1639;
for(x1623=0;x1623<x1611.length;x1623++)
{
 if (!x1613[x1623])
{
x1639=this._getColumnFlex(x1611[x1623],null,x1612,x1611.length,x1623);
 if (x1639)
{
x1638.push(
{
"displayIndex":x1623,
"width":this._getColumnActualWidth(x1623,x1609)
});
}
}
}
this._currentColumnStretchDetails=x1638;
this._stretchTheColumns();
 var x1640=this._getColumnHeader();
AdfAgent.AGENT.enableUserSelect(x1640);
}
AdfDhtmlTablePeer.prototype._createStrechColumnData= function (x1641,x1642,x1643)
{
 var x1644=null;
 if (x1642)
{
x1644=
{
"component":x1642,
"displayIndex":x1641,
"minimumWidth":x1642.getMinimumWidth(),
"actualWidth":this._getColumnActualWidth(x1641,x1643)
};
}
 else
 {
 var x1645=this._getColumnActualWidth(x1641,x1643);
x1644=
{
"component":null,
"displayIndex":x1641,
"minimumWidth":x1645,
"actualWidth":x1645
};
}
 return x1644;
}
AdfDhtmlTablePeer.__columnSortComparator= function(x1646,x1647)
{
 return x1646["minimumWidth"] - x1647["minimumWidth"];
}
AdfDhtmlTablePeer.prototype.__getPixelWidthFromPercent= function(x1648)
{
 var x1649=parseInt(x1648);
 if (!isNaN(x1649))
{
 var x1650=this.GetDatabody();
x1649=x1650.offsetWidth*x1649/100;
 return x1649.toFixed(0);
}
 return null;
}
AdfDhtmlTablePeer.prototype.resizeColumn= function(x1651,x1652,x1653)
{
 if (this._ignoreSetColWidth)
{
 return;
}
 var x1654=x1652.toString().indexOf("%")>0;
 var x1655=x1651.getClientId();
 var x1656=this._getColumnHeader();
 var x1657=AdfAgent.AGENT;
 var x1658=x1656.getElementsByTagName("th"),x1659=x1658.length;
 var x1660,x1661;
for(var x1662=0;x1662<x1659; ++x1662)
{
 if (x1658[x1662].id==x1655)
{
x1660=x1658[x1662];
x1661=x1657.getIntAttribute(x1660,"_d_index",0);
this._resizedIndex=x1661;
break;
}
}
 if (x1660)
{
 var x1663=100;
 if (x1652!=null)
{
x1663=x1652;
 if (x1654)
{
x1663=this.__getPixelWidthFromPercent(x1652);
}
}
 if (isNaN(x1663)||x1663<=0||x1663>3200)
{
x1663=100;
}
 var x1664=this.__getSelectedColumns();
 var x1665=
(AdfCollections.indexOf(x1664,x1651)!= -1);
 if (x1665)
{
 var x1666=x1664.length;
for(var x1667=0;x1667<x1666;x1667++)
{
x1663=Math.max(x1663,x1664[x1667].getMinimumWidth());
}
}
 else
 {
x1663=Math.max(x1663,x1651.getMinimumWidth());
}
this._doColResizesFromUser(x1663,x1653);
}
}
AdfDhtmlTablePeer.prototype._doResizeColumn= function(x1668,x1669,x1670,x1671,x1672)
{
 var x1673=false;
 var x1674=false;
 var x1675=false;
 if (x1668<=this._lastFrozen)
{
this._frozenWidth+=x1671;
x1675=true;
}
 var x1676=this.GetDatabody();
 if (x1675&& !this.IsEmpty)
{
this._sizeRegionsForFrozenColumns(x1676,x1676.offsetHeight);
}
 if (!this._headerless)
{
 var x1677=this._getColumnHeader();
 if (!x1669)
x1669=this._getColumnHeaderFooterSizingCell(x1668,x1677,"t","d2","t2");
this._resizeColumnHeaderFooterColumn(x1669,x1671,x1677,x1668,"t","d2","t2");
 if (this.IsEmpty)
{
this._incrementWidth(x1677,x1671);
this._synchronizeColumnRowHeights(x1677,"t","d2","t2");
}
 else
 {
this._synchronizeColumnRowHeights(x1677,"t","d2","t2");
 var x1678=x1677.offsetHeight;
 if (x1678!=this._cachedCHHeight)
{
this._cachedCHHeight=x1678;
x1673=true;
}
}
}
 if (!this._footerless)
{
 var x1679=this._getColumnFooter();
x1669=this._getColumnHeaderFooterSizingCell(x1668,x1679,"ft","fd2","ft2");
this._resizeColumnHeaderFooterColumn(x1669,x1671,x1679,x1668,"ft","fd2","ft2");
 if (this.IsEmpty)
{
this._incrementWidth(x1679,x1671);
this._synchronizeColumnRowHeights(x1679,"ft","fd2","ft2");
}
 else
 {
this._synchronizeColumnRowHeights(x1679,"ft","fd2","ft2");
 var x1678=x1679.offsetHeight;
 if (x1678!=this._cachedCFHeight)
{
this._cachedCFHeight=x1678;
x1674=true;
}
}
}
 if (this.IsEmpty)
 return;
 var x1680=this._resizeDatabodyColumn(x1676,x1668,x1671);
 if (x1673||x1674||x1675)
{
 var x1681=this.getDomElement();
this._setScrollerTop(this._cachedCHHeight);
this._setScrollerHeight(x1681.clientHeight,this._cachedCHHeight,this._cachedCFHeight);
this._setScrollerWidth(x1681.clientWidth,this._frozenWidth);
}
 var x1682=x1676.firstChild;
 var x1683;
 if (this._lastFrozen<0)
{
x1683=parseInt(x1682.style.width);
}
 else
 {
x1683=(this._lastFrozen<this._colCount - 1)?parseInt(AdfDhtmlTablePeer._getNestedScrolledTable(x1682.rows[0]).style.width)
:0;
}
this._setFakeCanvasWidth(x1683);
 var x1684=x1680.relFactor;
 var x1685=x1680.delta;
 var x1686=(x1685!=undefined)?x1685:
Math.round((x1684 - 1.0)*this._averageRowHeight*this.GetKnownRowCount());
this._adjustCanvasHeight(x1686,x1676,true,true);
 if (x1672)
{
 var x1687=this.__getVisibleLeafColumns()[x1668];
this._ignoreSetColWidth=true;
x1687.setProperty(AdfRichColumn.WIDTH,x1670,true);
 delete this._ignoreSetColWidth;
}
 var x1688=this._getScrollLeft();
 if (this._currentScrollLeft!=x1688)
{
this._currentScrollLeft=x1688;
this._handleHorizontalScroll(x1688);
}
this._fillViewPort(x1676,x1676.offsetHeight,false);
}
AdfDhtmlTablePeer.prototype._resizeColumnHeaderFooterColumn= function(x1689,x1690,x1691,x1692,
x1693,x1694,x1695)
{
 var x1696=this._incrementWidth(x1689,x1690);
 if (this._lastFrozen>=0)
{
 if (x1692<=this._lastFrozen)
{
 var x1697=AdfDhtmlTablePeer._getChildBySubId(x1691,x1693);
 var x1698=this._incrementWidth(x1697,x1690);
 var x1699=AdfDhtmlTablePeer._getChildBySubId(x1691,x1694);
 if(AdfDhtmlTablePeer._isRTL())
x1699.style.right=x1697.style.width
 else
 x1699.style.left=x1697.style.width;
}
 else
 {
 var x1699=AdfDhtmlTablePeer._getChildBySubId(x1691,x1694);
 var x1700=AdfDhtmlTablePeer._getChildBySubId(x1699,x1695);
this._incrementWidth(x1700,x1690);
}
}
 else
 {
 var x1697=AdfDhtmlTablePeer._getChildBySubId(x1691,x1693);
this._incrementWidth(x1697,x1690);
}
 return x1696;
}
AdfDhtmlTablePeer.prototype._resizeDatabodyColumn= function(x1701,x1702,x1703)
{
 var x1704=0,x1705=0;
 var x1706=x1701.childNodes;
for(var x1707=x1706.length-1;x1707>=0;x1707--)
{
 var x1708=x1706[x1707];
x1704+=x1708.cachedHeight;
this._resizeBlockColumn(x1708,x1702,x1703);
x1708._lastSyncRow=null;
this._synchronizeRowHeights(x1708);
 var x1709=x1708.offsetHeight;
x1705+=x1709;
 if (x1709!=x1708.cachedHeight){
 var x1710=x1709 - x1708.cachedHeight;
for(var x1711=x1707+1;x1711<x1706.length;x1711++)
x1706[x1711].startPos+=x1710;
}
x1708.cachedHeight=x1709;
}
 var x1712=(x1706.length==1&&x1706[0].startRow==0&&
x1706[0].numRows==this.GetKnownRowCount());
 var x1713=x1712?x1705 - x1704:undefined;
 return {relFactor:x1705/x1704,delta:x1713};
}
AdfDhtmlTablePeer.prototype._resizeBlockColumn= function(x1714,x1715,x1716)
{
 if (this._lastFrozen<0||x1715<=this._lastFrozen)
{
 if (x1714.rows)
this._incrementWidth(x1714.rows[0].cells[x1715],x1716);
}
 else {
 var x1717=x1714.rows;
for(var x1718=0;x1718<x1717.length;x1718++)
{
 var x1719=AdfDhtmlTablePeer._getNestedScrolledTable(x1717[x1718]);
this._incrementWidth(x1719,x1716);
 var x1720=x1719.rows[0].cells[x1715 - this._lastFrozen - 1];
this._incrementWidth(x1720,x1716);
}
}
 if (this._lastFrozen<0)
this._incrementWidth(x1714,x1716);
}
AdfDhtmlTablePeer.prototype._incrementWidth= function(x1721,x1722)
{
AdfAssert.assertDomNode(x1721);
 var x1723=parseInt(x1721.style.width) + x1722;
 if (!isNaN(x1723))
{
x1721.style.width=x1723 + 'px';
}
 var x1724=AdfAgent.AGENT.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 if(x1724)
{
 if(x1721.tagName=='TH'||x1721.tagName=='TD')
{
 var x1725=this._findColGroupColumn(x1721)
 if(x1725)
{
x1723=parseInt(x1725.style.width) + x1722;
x1725.style.width=x1723 + 'px';
}
}
}
 return x1723;
}
AdfDhtmlTablePeer.prototype._findColGroupColumn= function(x1726,x1727)
{
AdfAssert.assertDomNode(x1726);
AdfAssert.assert(x1726.tagName=='TH'||x1726.tagName=='TD',
"Invalid COLGROUP tag name");
 var x1728=x1726.parentNode;
while(x1728&&x1728.tagName!="TR")
x1728=x1728.parentNode;
 if(x1728)
{
 var x1729=x1728.cells;
 var x1730=x1729.length;
for(var x1731=0;x1731<x1730;x1731++)
{
 if(x1729[x1731]==x1726)
break;
}
 if(x1731<x1730)
{
 var x1732=x1728.parentNode;
while(x1732&&x1732.tagName!="TABLE")
x1732=x1732.parentNode;
 if(x1732)
{
 var x1733=AdfDhtmlTablePeer.FindFirstChildByTagName(x1732,"COLGROUP");
 if(x1733)
{
 var x1734=x1733.childNodes;
 ++x1731;
for(var x1735=0;x1735<x1734.length;x1735++)
{
 if(x1734[x1735].tagName=="COL")
 --x1731;
 if(x1731==0)
 return x1734[x1735];
}
}
}
}
}
 return null;
}
AdfDhtmlTablePeer.SetCursor= function (x1736,x1737)
{
 if(x1736)
{
 if(x1736.style.cursor!=x1737)
{
x1736.style.cursor=x1737;
}
}
}
AdfDhtmlTablePeer.prototype._handleColumnContextMenu= function(x1738,x1739)
{
 if(!this._pcPeer)
 return;
 var x1740=x1739?x1739:this._getParentTH(x1738);
 if (x1740&&(x1740.getAttribute(AdfDhtmlTablePeer._LEAF_COLUMN)!=null))
{
 var x1741=AdfPage.PAGE.findComponent(x1740.id);
 if(!x1741.getSelected()&&this._isColumnSelectionEnabled())
{
this._selUnselectAll();
 var x1742=AdfAgent.AGENT.getIntAttribute(x1740,"_d_index", -1)
this._selectColumn(x1742,x1741,true);}
this._pcPeer.showColumnContextMenu(x1738,x1739);
}
}
AdfDhtmlTablePeer.prototype._handleBodyContextMenu= function(x1743)
{
 var x1744=this.getComponent();
 var x1745=x1744.getBodyContextMenuId?x1744.getBodyContextMenuId():null;
 if (x1745)
{
x1744.setSelectedRowKeys(new Object());
 var x1746=x1744.findComponent(x1745);
 var x1747=x1744;
 if (x1746==null)
{
x1746=AdfPage.PAGE.findComponent(x1745);
x1747=null;
}
this.showContextMenu(x1743,x1745,x1747);
 var x1748=AdfAgent.AGENT;
x1748.eatEvent(x1743);
}
}
AdfDhtmlTablePeer.prototype.GetRowContextMenuId= function(x1749)
{
 return this.getComponent().getContextMenuId();
}
AdfDhtmlTablePeer.prototype._getRowContextMenuAndContainer= function(x1750)
{
 var x1751=this.GetRowContextMenuId(x1750);
 var x1752;
 var x1753;
 if (x1751)
{
 var x1754=this.getComponent();
x1752=AdfPage.PAGE.findComponent(x1751);
x1753=null;
 if (x1752==null)
{
x1752=x1754.findComponent(x1751);
x1753=x1754;
}
 if(x1752==null)
{
AdfLogger.LOGGER.severe("Could not find context menu ",
x1751,
" from component ",
x1754);
}
}
 return {popup:x1752,menuId:x1751,menuFindContainer:x1753};
}
AdfDhtmlTablePeer.prototype.HandleRowContextMenu= function(
x1755,
x1756,
x1757,
x1758,
x1759)
{
 var x1760=this._getRowContextMenuAndContainer(x1756);
 var x1761=x1760.popup;
 var x1762=x1760.menuFindContainer;
 var x1763=x1760.menuId;
 if (x1761)
{
 if(!this._contextMenuSelect)
{
this._unhiglightAnyExistingHighlightedRow();
this._selHighlightRow(x1757);
this._highlightedRowKey=x1756;
this._highlightedRow=x1757;
}
 var x1764=this.getComponent();
 var x1765=x1764.getClientId();
AdfObject.ensureClassInitialization(AdfDhtmlCommandMenuItemPeer);
x1761[AdfMenuUtils.AFR_TARGETROWCURRENCY]=x1756;
x1761[AdfMenuUtils.AFR_TARGETCOMPONENTID]=x1765;
x1764.setProperty("_highlightedRowKey",x1756,false,AdfUIComponent.PROPAGATE_ALWAYS);
 if(!this._contextMenuClosedCallback)
this._contextMenuClosedCallback=this.createCallback(this._contextMenuClosed);
 if(!this._contextMenuOpenedCallback)
this._contextMenuOpenedCallback=this.createCallback(this._contextMenuOpened);
 if(!x1761._afrTableListenerSet)
{
x1761.addEventListener(AdfPopupOpenedEvent.POPUP_OPENED_EVENT_TYPE,
this._contextMenuOpenedCallback);
x1761.addEventListener(AdfPopupClosedEvent.POPUP_CLOSED_EVENT_TYPE,
this._contextMenuClosedCallback);
x1761._afrTableListenerSet=true;
}
 if(x1761.isPopupVisible())
{
x1761.hide();
this._ignoreContextMenuClose=true;
}
this.showContextMenu(x1755,x1763,x1762,x1758,x1759,x1765);
 var x1766=AdfAgent.AGENT;
x1766.eatEvent(x1755);
}
}
AdfDhtmlTablePeer.prototype.ContextMenuOpened= function(x1767,x1768)
{
}
AdfDhtmlTablePeer.prototype.ContextMenuClosed= function(x1769,x1770)
{
}
AdfDhtmlTablePeer.prototype._contextMenuOpened= function(x1771)
{
this._rowContextMenuVisible=true;
 var x1772=x1771.getSource();
 if(!this._contextMenuSelect)
{
 var x1773=this._getRowContextMenuAndContainer(this._highlightedRowKey);
 var x1774=x1773.popup;
 if(x1774!=null&&x1772.getClientId()==x1774.getClientId())
{
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UNSELECT,false);
}
}
this.ContextMenuOpened(x1771,x1772);
}
AdfDhtmlTablePeer.prototype._contextMenuClosed= function(x1775)
{
 if(this._ignoreContextMenuClose)
{
 delete this._ignoreContextMenuClose;
 return;
}
 delete this._rowContextMenuVisible;
 var x1776=x1775.getSource();
 if(!this._contextMenuSelect)
{
 var x1777=this._getRowContextMenuAndContainer(this._highlightedRowKey);
 var x1778=x1777.popup;
 if(x1778!=null&&x1776.getClientId()==x1778.getClientId())
{
this._grabFocus();
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE,false);
this._unhiglightAnyExistingHighlightedRow();
}
}
 delete x1776[AdfMenuUtils.AFR_TARGETROWCURRENCY];
 delete x1776[AdfMenuUtils.AFR_TARGETCOMPONENTID];
AdfPage.PAGE.scheduleTimer(null,AdfDhtmlTablePeer._clearHighlightedRowKey,
this.getComponent(),10);
this.ContextMenuClosed(x1775,x1776);
}
AdfDhtmlTablePeer._clearHighlightedRowKey= function(x1779)
{
x1779.setProperty("_highlightedRowKey",null,false,AdfUIComponent.PROPAGATE_ALWAYS);
}
AdfDhtmlTablePeer.prototype.ProcessPushData= function(payload,changeCount)
{
 if (!this._virtInitialized)
 return;
 if (this._activeDataCount>=changeCount)
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return;
}
this._activeDataCount=changeCount;
 var envelope=eval(payload);
for(var i=0;i<envelope.length;i++)
{
 var message=envelope[i];
 if (this.IsFetchPending())
{
message['id']=changeCount;
this._getActiveMessageBuffer().push(message);
}
 else
 this._processActiveMessage(message);
}
 var databody=this.GetDatabody();
this._fillViewPort(databody,databody.offsetHeight,false);
 return true;
}
AdfDhtmlTablePeer.prototype._processActiveMessage= function(x1780)
{
 var x1781=false;
 var x1782=x1780['type'];
switch(x1782)
{
 case 'update':
x1781=this.UpdateActiveRow(x1780);
break;
 case 'remove':
x1781=this.RemoveActiveRow(x1780);
break;
 case 'insertBefore':
 case 'insertAfter':
 case 'insertInside':
x1781=this.InsertActiveRow(x1780,x1782);
break;
}
 return x1781;
}
AdfDhtmlTablePeer.prototype._getActiveMessageBuffer= function()
{
 if (!this._activeMessageBuffer)
this._activeMessageBuffer= new Array();
 return this._activeMessageBuffer;
}
AdfDhtmlTablePeer.prototype._resetActiveMessageBuffer= function()
{
this._activeMessageBuffer=null;
}
AdfDhtmlTablePeer.prototype._applyBufferedADSEvents= function(x1783,x1784)
{
 if (x1783== -1)
 return;
 var x1785=this._activeMessageBuffer;
 if (x1785)
{
for(var x1786=0;x1786<x1785.length;x1786++)
{
 var x1787=x1785[x1786];
 var x1788=x1787['id'];
 var x1789=x1784?(x1788<=x1783):(x1788>x1783);
 if (x1789)
this._processActiveMessage(x1787);
}
}
}
AdfDhtmlTablePeer.prototype.IsInsertAllowed= function(x1790)
{
 var x1791=true;
 if (this._pendingFetch==AdfTableDataFetchEvent.AFTER_KEY_SUBTYPE)
{
 var x1792=this.GetDatabody().childNodes;
 var x1793=x1792[x1792.length-1];
 if (x1790==x1793.startRow + x1793.numRows)
x1791=false;
}
 else if (this._pendingFetch==AdfTableDataFetchEvent.BEFORE_KEY_SUBTYPE)
{
 var x1792=this.GetDatabody().childNodes;
 var x1794=x1792[0];
 if (x1790==x1794.startRow)
x1791=false;
}
 else if (this._pendingFetch==undefined){
 var x1792=this.GetDatabody().childNodes;
 var x1794=x1792[0];
 var x1793=x1792[x1792.length-1];
 var x1795=x1790==x1793.startRow + x1793.numRows;
 if(!x1795&&(x1790<x1794.startRow||x1790>=x1793.startRow + x1793.numRows))
x1791=false;
}
 return x1791;
}
AdfDhtmlTablePeer.prototype.InsertActiveRow= function(x1796,x1797)
{
 var x1798=(x1797=='insertBefore');
 var x1799=false;
 var x1800=null;
 if (!this.IsEmpty)
{
x1800=this.GetDatabody().childNodes;
}
 if (x1800&&x1800.length>0)
{
 var x1801= -1;
 var x1802=x1796['iKey'];
 if (x1798)
{
 if (!x1802){
 var x1803=x1800[x1800.length-1];
 var x1804=this.GetRowCount();
 if (x1804!= -1&&x1803.startRow + x1803.numRows==x1804)
x1801=x1804;
}
 else
 {
 var x1805=this.FindRowByKey(x1802);
 if (x1805)
x1801=x1805.index;
}
}
 else {
 if (!x1802){
 if (x1800[0].startRow==0)
x1801=0;
}
 else
 {
 var x1805=this.FindRowByKey(x1802);
 if (x1805)
x1801=x1805.index + 1;
}
}
 if (x1801!= -1&&this.IsInsertAllowed(x1801))
{
x1799=true;
 var x1806=x1800[0];
 var x1807=x1806.cloneNode(false); var x1808=this.getDomDocument().createElement("TBODY");
AdfAssert.assert(
x1806.rows!=null&&x1806.rows[0]!=null,
"Unable to insert active row when the block contains no rows to clone!");
 var x1809=x1806.rows[0].cloneNode(true);
AdfDomUtils.removeCSSClassName(x1809,AdfDhtmlTablePeer._SELECTED_CLASS);
AdfDomUtils.removeCSSClassName(x1809,AdfDhtmlTablePeer._HIGHLIGHTED_CLASS);
x1808.appendChild(x1809);
x1807.appendChild(x1808);
x1809.setAttribute(AdfDhtmlTablePeer._ROW_KEY,x1796['rKey']);
this._resetRow(x1809);
this.UpdateActiveRow(x1796,x1809);
this.InsertBlock(x1807,x1801,1,1,0);
}
}
 else
 AdfPage.PAGE.addPartialTargets(this.getComponent());
 return x1799;
}
AdfDhtmlTablePeer.prototype.RemoveActiveRow= function(x1810)
{
 if (this.IsEmpty)
 return false;
 var x1811=false;
 var x1812=this.FindRowByKey(x1810['rKey']);
 if (x1812)
{
this.DeleteBlock(x1812.index,1,1,0,null);
x1811=true;
}
 return x1811;
}
AdfDhtmlTablePeer.prototype.UpdateActiveRow= function(x1813,x1814)
{
 if (this.IsEmpty)
 return false;
 var x1815=false;
 if (!x1814)
{
 var x1816=this.FindRowByKey(x1813['rKey']);
 if (x1816)
x1814=x1816.tr;
}
 if (x1814)
{
x1815=true;
 var x1817=x1813['data'];
for(var x1818=0;x1818<x1817.length;x1818++)
{
 var x1819=x1817[x1818];
 var x1820=x1819['cInd'];
 var x1821=x1819['prop'];
 var x1822=x1819['val'];
this._applyActiveDataUpdate(x1814,x1820,x1821,x1822);
}
}
 return x1815;
}
AdfDhtmlTablePeer.prototype._resetRow= function(x1823)
{
for(var x1824=0;x1824<this._colCount;x1824++)
{
 var x1825=this.FindCellByIndex(x1823,x1824);
x1825.innerHTML='<span>&nbsp;</span>';
this.RemoveTwinkleTimer(x1825);
}
}
AdfDhtmlTablePeer.prototype.RemoveTwinkleTimer= function(x1826)
{
x1826.removeAttribute(AdfDhtmlTablePeer._TWINKLE_TIMER_ID_ATTR);
}
AdfDhtmlTablePeer.prototype.IsNodeStampCell= function(x1827)
{
 return false;
}
AdfDhtmlTablePeer.prototype.GetActiveUpdateNode= function(x1828)
{
 var x1829;
 if(this.IsNodeStampCell(x1828))
{
 var x1830=AdfDhtmlTablePeer.FindFirstChildByTagName(x1828,"DIV");
AdfAssert.assertDomNode(x1830);
 var x1831=AdfDhtmlTablePeer._findFirstLevelChildrenByTagName(x1830,"SPAN")[0];
AdfAssert.assertDomNode(x1831);
x1829=x1831.nextSibling;
}
 else
 {
x1829=x1828.firstChild;
}
 if (!x1829||x1829.nodeType!=1||x1829.tagName!="SPAN"||x1829.nextSibling)
{
 var x1832=x1829?x1829.parentNode:x1828;
AdfAssert.assert(
x1832!=null,
"Table peer cannot get an active update node if the parent is null!");
 var x1833=this.getDomDocument().createElement("span");
 var x1834=x1829;
while(x1834)
{
 var x1835=x1834;
x1834=x1834.nextSibling;
x1832.removeChild(x1835);
x1833.appendChild(x1835);
}
x1832.appendChild(x1833);
x1829=x1833;
}
AdfAssert.assertDomNode(x1829);
 return x1829;
}
AdfDhtmlTablePeer.prototype._applyActiveDataUpdate= function(x1836,x1837,x1838,x1839)
{
 var x1840=false;
 var x1841=this.FindCellByIndex(x1836,x1837);
 if (x1841)
{
 var x1842=AdfAgent.getAgent();
 var x1843=this.GetActiveUpdateNode(x1841);
 var x1844=x1842.getAttribute(x1836,AdfDhtmlTablePeer._ROW_KEY);
this._markAsActive(x1841,x1844,x1837);
 var x1845=x1843;
x1840=true;
switch(x1838)
{
 case 'value':
x1842.setTextContent(x1845,x1839);
break;
 case 'rawValue':
x1845.innerHTML=x1839;
break;
 case 'styleClass':
x1845.className=x1839;
break;
 case 'inlineStyle':
x1845.style.cssText=x1839;
break;
default:
x1840=false;
}
}
 return x1840;
}
AdfDhtmlTablePeer.prototype._markAsActive= function(x1846,x1847,x1848)
{
 if (x1846!=null)
{
 var x1849=AdfDhtmlTablePeer._TWINKLE_TIMER_ID_ATTR;
 var x1850=x1846.getAttribute(x1849);
 var x1851=AdfPage.PAGE;
 if (x1850!=null)
{
x1851.rescheduleTimer(x1850,1000);
}
 else
 {
AdfDomUtils.addCSSClassName(x1846,AdfDhtmlTablePeer._TWINKLE_ON_STYLE_CLASS);
AdfDomUtils.removeCSSClassName(x1846,AdfDhtmlTablePeer._TWINKLE_OFF_STYLE_CLASS);
x1850=x1851.scheduleTimer(this,this._cleanUpAdsNode,
{rowKey:x1847,colIndex:x1848},1000);
x1846.setAttribute(x1849,x1850);
}
}
}
AdfDhtmlTablePeer.prototype._cleanUpAdsNode= function(x1852)
{
 if (!this.getDomElement())
 return;
 var x1853=x1852.rowKey;
 var x1854=x1852.colIndex;
 var x1855=this.FindRowByKey(x1853);
 if (x1855)
{
 var x1856=this.FindCellByIndex(x1855.tr,x1854);
 if (x1856)
{
x1856.removeAttribute(AdfDhtmlTablePeer._TWINKLE_TIMER_ID_ATTR);
AdfDomUtils.removeCSSClassName(x1856,AdfDhtmlTablePeer._TWINKLE_ON_STYLE_CLASS);
AdfDomUtils.addCSSClassName(x1856,AdfDhtmlTablePeer._TWINKLE_OFF_STYLE_CLASS);
}
}
}
AdfDhtmlTablePeer.prototype.FindRowByKey= function(x1857)
{
 var x1858=null;
 var x1859=this.GetDatabody();
 var x1860=x1859.childNodes;
for(var x1861=0;x1861<x1860.length&& !x1858;x1861++)
{
 var x1862=x1860[x1861];
 var x1863=x1862.rows;
 if (x1863)
{
for(var x1864=0;x1864<x1863.length&& !x1858;x1864++)
{
 var x1865=x1863[x1864];
 if (x1857==x1865.getAttribute(AdfDhtmlTablePeer._ROW_KEY))
{
x1858={'tr':x1865,'index':x1862.startRow + x1864,'block':x1862};
break;
}
}
}
}
 return x1858;
}
AdfDhtmlTablePeer.prototype.FindCellByIndex= function(x1866,x1867)
{
AdfAssert.assert(x1866!=null,"Unable to find cell by index if the given row is invalid!");
 var x1868=null;
 if (this._lastFrozen<0||x1867<=this._lastFrozen)
{
x1868=x1866.cells[x1867];
}
 else
 {
 var x1869=AdfDhtmlTablePeer._getNestedScrolledTable(x1866);
x1868=x1869.rows[0].cells[x1867 - this._lastFrozen - 1];
}
 return x1868;
}
AdfDhtmlTablePeer.prototype._getColumnFlex= function(
x1870,
x1871,
x1872,
x1873,
x1874)
{
 if (!x1870)
{
 return null;
}
 if (x1872=="multiple")
{
 var x1875=x1871;
 if (x1875==null)
{
x1875="" + x1870.getWidth();
}
 var x1876=x1875.length - 1;
 if ((""+x1875).charAt(x1876)!='%')
{
 return null;
}
 return Math.abs(parseInt(x1875.substring(0,x1876)));
}
 else if (x1872=="last")
{
 var x1877=x1870.getDisplayIndex();
 if (x1877== -1)
{
x1877=x1874;
}
 if (x1877==x1873 - 1)
{
 if (!x1870.getRowHeader()&&x1877>this._lastFrozen)
{
 return 1;}
}
}
 else
 {
 var x1878=this._stretchedColumnId;
 if (x1878!=null)
{
 var x1879=x1870.getClientId();
 var x1880=x1879.substring(1 + x1879.lastIndexOf(":"));
 if (x1880==x1878)
{
 var x1877=x1870.getDisplayIndex();
 if (x1877== -1)
{
x1877=x1874;
}
 if (!x1870.getRowHeader()&&x1877>this._lastFrozen)
{
 return 1;}
}
}
}
 return null;}
AdfDhtmlTablePeer.prototype._getColumnActualWidth= function(x1881,x1882)
{
 var x1883;
 if (this.IsEmpty)
{
x1883=this._getColumnHeaderFooterSizingCell(x1881,this._getColumnHeader(),"t","d2","t2");
}
 else
 {
x1883=this.FindCellByIndex(x1882,x1881);
}
 return parseInt(x1883.style.width);
}
AdfDhtmlTablePeer.prototype._stretchTheColumns= function()
{
 var x1884=this._columnStretching;
 if ((x1884==null)||(x1884=="none"))
{
 return;
}
 if (this._nothingFlexible||(this.IsEmpty&&this._headerless))
{
 return;
}
this._stretchingTheColumns=true;
try
{
this._doColumnStretching(x1884);
}
finally
{
 delete this._stretchingTheColumns;
}
}
AdfDhtmlTablePeer.prototype._doColumnStretching= function(x1885,x1886)
{
 var x1887;
 var x1888;
 var x1889;
 var x1890;
 var x1891;
 var x1892=0;
 var x1893=this.__getVisibleLeafColumns();
x1888=x1893.length;
x1889= new Array(x1888);
x1890= new Array(x1888);
x1891= new Array(x1888);
 var x1894=true;
for(var x1895=0;x1895<x1888;x1895++)
{
 var x1896=x1893[x1895];
x1887=this._getColumnFlex(x1896,null,x1885,x1888,x1895);
 if (x1887!=null)
{
x1894=false;
x1889[x1895]=x1887;
 var x1897="" + x1896.getWidth();
 if (x1897.lastIndexOf("%")==x1897.length -1)
{
x1891[x1895]=x1897.substring(0,x1897.length - 1);
x1892+=Math.abs(parseInt(x1891[x1895]));
}
x1890[x1895]=isNaN(x1897)?
x1896.getMinimumWidth():x1897;
}
}
 if (x1894)
{
this._nothingFlexible=true;
 return;
}
 if (x1885=="multiple")
{
for(x=0;x<x1891.length;x++)
{
x1891[x]=x1891[x]/x1892;
}
}
 var x1898=this._lastFrozen;
 var x1899=this._colCount;
 var x1900=this.GetDatabody();
 var x1901=x1900.childNodes[0];
 var x1902=false;
 var x1903;
 if (!this.IsEmpty)
{
x1903=x1901.rows[0];
AdfAssert.assert(
x1903!=null,
"this.IsEmpty was " + this.IsEmpty + " but there were no rows!");
}
 var x1904;
 var x1905=0;
 if ((x1898== -1)||(x1898 + 1==x1899))
{
x1904=x1900.offsetWidth;
 var x1906;
 if (this.IsEmpty)
{
 var x1907=this._getColumnHeader().firstChild;
x1906=x1907.offsetWidth;
}
 else
 {
x1906=x1901.offsetWidth;
}
x1905=x1904 - x1906;
}
 else
 {
 var x1908;
 if (this.IsEmpty)
{
 var x1909=this._getColumnHeader();
 var x1910=AdfDhtmlTablePeer._getChildBySubId(x1909,"t");
 var x1911=AdfDhtmlTablePeer._getChildBySubId(x1909,"d2");
 var x1912=
AdfDhtmlTablePeer._getChildBySubId(x1911,"t2");
x1904=x1909.parentNode.offsetWidth;
x1905=x1904 - x1910.offsetWidth - x1912.offsetWidth - 2;
}
 else
 {
x1908=AdfDhtmlTablePeer._getNestedScrolledTable(x1903);
x1904=x1908.parentNode.offsetWidth;
x1905=x1904 - x1908.offsetWidth;
}
}
 if (x1905!=0)
{
 var x1913=[];
 var x1914=0;
for(var x1915=0;x1915<x1888;x1915++)
{
x1887=x1889[x1915];
 if (x1887!=null)
{
 var x1916=this._getColumnActualWidth(x1915,x1903);
x1914+=x1916;
x1913.push(
{
"displayIndex":x1915,
"flex":x1887,
"minimumWidth":x1890[x1915],
"width":x1916
});
}
}
 var x1917=x1914 + x1905;
 var x1918=x1913.length;
 var x1919;
 var x1920;
 var x1921;
 var x1922=false;
 var x1923=0;
while(!x1922&&(x1923<x1918))
{
 var x1924=x1917;
 var x1925=0;
for(x1919=0;x1919<x1918;x1919++)
{
x1920=x1913[x1919];
 if (x1920["atMinimum"])
{
x1921=x1920["minimumWidth"];
x1924-=x1921;
}
 else
 {
x1925+=x1920["flex"];
}
}
 var x1926=x1924;
 var x1927=0;
for(x1919=0;x1919<x1918;x1919++)
{
x1920=x1913[x1919];
 if (!x1920["atMinimum"])
{
 var x1928=(x1920["flex"]/x1925)*x1926;
x1921=Math.floor(x1928);
minimumWidth=x1920["minimumWidth"];
 if (x1921<minimumWidth)
{
x1921=minimumWidth;
x1920["atMinimum"]=true;
x1923++;
}
 else
 {
x1927+=x1928 - x1921;
}
x1920["calculatedWidth"]=x1921;
x1924-=x1921
}
}
x1927=Math.round(x1927);
 if (x1924==x1927)
{
 if (x1927>0)
{
x1920["calculatedWidth"]+=x1927;
}
x1922=true;
}
}
 var x1929=[];
for(x1919=0;x1919<x1918;x1919++)
{
x1920=x1913[x1919];
 var x1930=x1920["displayIndex"];
x1921=x1920["calculatedWidth"];
x1929.push(
{
"displayIndex":x1930,
"width":x1921
});
 var x1931=x1921 - x1920["width"];
 if (x1931!=0)
{
x1902=true;
this._doResizeColumn(x1930,null,x1921,x1931,false);
}
}
this._currentColumnStretchDetails=x1929;
}
 if (x1902)
{
 if (!x1886)
{
x1886=0;
}
 if (x1886<5)
{
this._doColumnStretching(x1885, ++x1886);
}
}
}
AdfDhtmlTablePeer.prototype._stretchLastBlockColumn= function(x1932)
{
 var x1933;
 var x1934;
 if (this._lastColWidthOverride!= -1)
{
 var x1935=this._colCount - 1;
AdfAssert.assert(
x1932.rows!=null,
"Unable to stretch the columns in the last fetched block because it contains no rows!");
x1933=this.FindCellByIndex(x1932.rows[0],x1935);
x1934=parseInt(x1933.style.width);
this._resizeBlockColumn(x1932,x1935,this._lastColWidthOverride - x1934);
}
 else if (this._currentColumnStretchDetails!=null)
{
AdfAssert.assert(
x1932.rows!=null,
"Unable to stretch the columns in the last fetched block because it contains no rows!");
 var x1936=this._currentColumnStretchDetails;
 var x1937=x1936.length;
for(var x1938=0;x1938<x1937;x1938++)
{
 var x1939=x1936[x1938];
 var x1940=x1939["displayIndex"];
x1933=this.FindCellByIndex(x1932.rows[0],x1940);
x1934=parseInt(x1933.style.width);
this._resizeBlockColumn(x1932,x1940,x1939["width"] - x1934);
}
}
}
AdfDhtmlTablePeer.prototype._collectClientTokens= function(x1941)
{
 var x1942="";
 var x1943=this.GetDatabody().childNodes;
 var x1944='_';
 var x1945=',';
for(var x1946=0;x1946<x1943.length;x1946++)
{
 var x1947=x1943[x1946].rows;
for(var x1948=0;x1948<x1947.length;x1948++)
{
 var x1949=x1947[x1948].getAttribute(AdfDhtmlTablePeer._ROW_KEY);
 if (x1941=="flat")
{
x1942+=x1949;
x1942+=x1944;
}
 else {
 var x1950=x1949.split(x1945);
 var x1951=x1950.length;
x1942+=x1950[x1951-1];
x1942+=x1944;
for(var x1952=0;x1952<x1951-1;x1952++)
{
 var x1953=x1950[x1952];
 var x1954= new RegExp('(^|_)' + x1953 + '(_|$)');
 if (!x1942.match(x1954))
{
x1942+=x1953;
x1942+=x1944;
}
}
}
}
}
 return x1942;
}
AdfDhtmlTablePeer.prototype._grabFocus= function()
{
AdfFocusUtils.focusElement(this.getDomElement());
}
AdfDhtmlTablePeer.prototype.HandleComponentFocus= function(x1955)
{
 if (!this._virtInitialized)
 return;
 if(x1955.getNativeEventTarget!=undefined)
{
 var x1956=x1955.getNativeEventTarget();
 if(x1956!=this.getDomElement()&&this._isTargetCellEditable(x1956))
{
this._unclipInputElem(x1956);
 if(undefined!=x1956.value&&
(x1956.nodeName=="TEXTAREA"||x1956.type=="text"||x1956.type=="select-one"))
x1956._afrOldValue=x1956.value;
}
}
 if(this._blurTimeout!=null)
{
clearTimeout(this._blurTimeout);
 delete this._blurTimeout;
}
 if(this._focusTimeout==null)
{
 if(this._focusTimeoutCallback==null)
this._focusTimeoutCallback=this.createCallback(this._doFocusTimeout);
this._focusTimeout=setTimeout(this._focusTimeoutCallback,10);
}
}
AdfDhtmlTablePeer.prototype.HandleComponentBlur= function(x1957)
{
 if(this._blurTimeoutCallback==null)
this._blurTimeoutCallback=this.createCallback(this._doBlurTimeout);
this._blurTimeout=setTimeout(this._blurTimeoutCallback,10);
}
AdfDhtmlTablePeer.prototype.HandleHeaderlessFocus= function()
{
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,null,null);
}
AdfDhtmlTablePeer.prototype._doFocusTimeout= function()
{
 if(this.getComponent())
{
 if(!this._rowContextMenuVisible)
{
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE,false,null);
 var x1958=this._focusManager;
 if(x1958.domElement)
this._updateFocusCellStyle(true);
 else if(x1958.objectType!=AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE)
{
 if(!this._setFirstColumnHeaderFocus(false,true))
{
this.HandleHeaderlessFocus();
}
}
}
}
 delete this._focusTimeout;
}
AdfDhtmlTablePeer.prototype._doBlurTimeout= function()
{
 if(this.getComponent())
{
 if(!this._rowContextMenuVisible)
{
this._selUpdateAll(AdfDhtmlTablePeer._SEL_UPDATE_ALL_UPDATE,false,null);
 if(!this.isInActiveHeirarchy())
{
 if(this._focusManager.domElement)
this._updateFocusCellStyle(false);
}
}
}
 delete this._blurTimeout;
}
AdfDhtmlTablePeer.prototype._handleKeyboardSort= function(x1959)
{
 var x1960=this._focusManager;
 var x1961=x1960.objectType;
 if(x1961==AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE)
{
 var x1962=x1960.domElement;
 var x1963=x1962.id;
 var x1964=AdfAgent.AGENT.getElementById(
AdfRichUIPeer.CreateSubId(x1963,AdfDhtmlTablePeer.__SORT_INDICATOR));
 if(x1964)
{
 var x1965=x1964.getAttribute(AdfDhtmlTablePeer._SORTED_TYPE);
 var x1966=AdfPage.PAGE.findComponent(x1963);
 var x1967=x1966.getSortProperty();
 var x1968=AdfDhtmlTablePeer.__getSortOrderForColumn(x1963);
 if(x1965==x1959)
 return;
 if(x1959==AdfDhtmlTablePeer._SORTED_DESCENDING)
x1968=false;
 else
 x1968=true;
AdfTableUtils.queueSortEvent(this.getComponent(),x1967,x1968);
}
}
}
AdfDhtmlTablePeer.prototype.HandleComponentKeyUp= function(x1969)
{
 if (x1969.isCanceled())
{
 return;
}
 var x1970=AdfAgent.AGENT;
x1970.enableUserSelect(x1970.getDomDocument().body);
}
AdfDhtmlTablePeer.prototype.HandleComponentKeyDown= function(x1971)
{
 if (x1971.isCanceled()|| !this._isOwnComponentEvent(x1971))
{
 return;
}
 var x1972=x1971.getNativeEvent();
 var x1973=AdfAgent.AGENT;
 var x1974=x1973.getEventTarget(x1972);
 var x1975=x1972.keyCode;
 var x1976=false;
 var x1977=this._virtInitialized;
switch(x1975)
{
default:
x1976=true;
break;
 case AdfKeyStroke.ESC_KEY:
 if(this._reorderTH||this._resizedTH)
{
x1976=true;
}
 else if(!this._rowContextMenuVisible){
 var x1978=this.GetFocusedRowKey();
 if(x1978&&x1978==this._getActiveRowKey()&&this._isClickToEdit())
{
 if(this._cellNavMode)
{
 if(undefined!=x1974._afrOldValue&&x1974.value!=x1974._afrOldValue)
{
AdfPage.PAGE.scheduleTimer(null,
AdfDhtmlTablePeer._restoreEditableValueOnEsc,x1974,0);
}
 else
 {
 if(this._lastCTEIndex==undefined)
{
 var x1979=this.GetRowKeyAndRow(x1974,this.getDomElement());
 if(x1979!=null)
{
 var x1980=x1979[0];
 if(x1980!=null)
{
 var x1981=this._getCellAndIndexForNode(x1974,x1979[1]);
this._lastCTEIndex=x1981.cellIndex;
}
}
}
this._setActiveRowKey(null);
this._editableTableReadOnlyMode=true;
this._grabFocus();
}
x1973.eatEvent(x1972);
}
 else if(!this._isTargetCellEditable(x1974))
{
this._cellNavMode=true;
x1973.eatEvent(x1972);
}
}
 else if(!this._isTargetCellEditable(x1974))
{
this._selUnselectAll();
this._queueColumnSelectionEvent();
}
}
break;
 case AdfKeyStroke.M_KEY: if(x1972.ctrlKey&&x1972.altKey&&x1977)
{
this._handleKeyboardContextMenu(x1972,true);
}
 else
 {
x1976=true;
}
break;
 case AdfKeyStroke.A_KEY: if(x1972.ctrlKey&& !x1972.altKey&&x1977)
{
this._grabFocus();
 var x1982=this._isMultipleRowSelect();
 var x1983=this._isMultipleRowSelectNoSelectAll();
 if(x1982&& !x1983&& !this.getComponent().getSelectedRowKeys()[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY])
this._selSelectAll();
}
 else
 {
x1976=true;
}
break;
 case AdfKeyStroke.END_KEY: if (!(x1976=this._isTargetCellEditable(x1974))
&&x1972.ctrlKey&&x1972.shiftKey&&x1977)
{
this._handleCtrlShiftEnd(x1972);
}
break;
 case AdfKeyStroke.PAGEUP_KEY:
 if(!(x1976=this._isTargetCellEditable(x1974)))
this._handlePageUp(x1972.altKey,x1972.ctrlKey,x1972.shiftKey);
break;
 case AdfKeyStroke.PAGEDOWN_KEY:
 if(!(x1976=this._isTargetCellEditable(x1974)))
this._handlePageDown(x1972.altKey,x1972.ctrlKey,x1972.shiftKey);
break;
 case AdfKeyStroke.SPACE_KEY:
 case 192: var x1984=x1973.getOS()==AdfAgent.MAC_OS&&x1975==192&&x1972.ctrlKey;
 if(!(x1976=this._isTargetCellEditable(x1974)))
 if(x1984||x1975==AdfKeyStroke.SPACE_KEY)
this._handleSpaceKey(x1975,x1972);
break;
 case AdfKeyStroke.ENTER_KEY:
 if(!(x1976=(x1974.tagName=="TEXTAREA"||x1974.tagName=="A")))
x1976=this._handleEnterKey(x1974,x1972);
break;
 case AdfKeyStroke.HOME_KEY:
 if(!(x1976=this._isTargetCellEditable(x1974))
&&x1972.ctrlKey&&x1977)
{
this._scrollerScrollToPos(null,0);
}
break;
 case AdfKeyStroke.F2_KEY:
this._handleF2Key(x1972);
break;
 case AdfKeyStroke.TAB_KEY:
 if(this._isTargetCellEditable(x1974))
x1976=this._handleTabKey(x1974,x1972);
 else
 x1976=true;
break;
}
 if (!x1976)
{
x1971.stopBubbling();
x1973.eatEvent(x1972);
}
}
AdfDhtmlTablePeer.prototype._handleKeyboardContextMenu= function(x1985,x1986)
{
 var x1987=AdfAgent.AGENT;
 var x1988=this._focusManager;
 var x1989=x1988.objectType;
 if(x1989==AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE)
{
this._handleColumnContextMenu(x1985,x1988.domElement);
}
 else
 {
 var x1990=x1987.getEventTarget(x1985);
 if(x1986|| !this._isTargetCellEditable(x1990))
{
 var x1991=this.ResolveContextMenuAlignElement(x1988.domElement);
 var x1992=this.GetKeyboardContextMenuAlignHint();
this.HandleRowContextMenu(x1985,x1988.currency,x1988.domElement,x1991,x1992);
}
}
}
AdfDhtmlTablePeer.prototype.GetKeyboardContextMenuAlignHint= function()
{
 return null;
}
AdfDhtmlTablePeer.prototype.ResolveContextMenuAlignElement= function(x1993)
{
 return x1993;
}
AdfDhtmlTablePeer.prototype._handleCtrlShiftEnd= function(x1994)
{
 var x1995=this._focusManager,x1996=x1995.objectType,x1997=x1995.currency;
 if(x1996==AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE||
x1996==AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE)
{
 var x1998=this.GetDatabody();
 if(x1998&&x1998.childNodes.length>0)
{
 var x1999=x1998.childNodes[0].rows[0];
 var x2000=x1999.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
 if(x2000==x1997)
{
this._grabFocus();
 if(!this.getComponent().getSelectedRowKeys()[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY])
this._selSelectAll();
}
}
}
}
AdfDhtmlTablePeer.prototype._handleF2Key= function(x2001)
{
 var x2002=AdfAgent.AGENT;
 var x2003=x2002.getEventTarget(x2001);
 if(this._isClickToEdit())
{
 var x2004=this.GetFocusedRowKey();
 var x2005=this._getActiveRowKey();
 if(!x2005||(x2004&&x2005!=x2004))
{
 var x2006=x2004?x2004:this._getFirstRowKey();
 if(x2006)
{
this._setActiveRowKey(x2006);
 if(this._editableTableReadOnlyMode)
{
 var x2007=this._lastCTEIndex;
this._editableTableReadOnlyMode=false;
 if(x2007!=undefined)
this._clickEditRequest={cellIndex:x2007};
}
}
this._cellNavMode=true;
 return;
}
}
this._cellNavMode=false;
 if(this._isTargetCellEditable(x2003))
{
 var x2008=this.GetRowKeyAndRow(x2003,this.getDomElement());
 if(x2008!=null)
{
 var x2009=x2008[1];
 var x2010=this._getCellAndIndexForNode(x2003,x2009);
 var x2011=x2010.cell;
this._setInputElementCursorAtEndInNode(x2002,x2011);
}
}
}
AdfDhtmlTablePeer._restoreSelectedItemOnArrowNav= function(x2012)
{
 var x2013=x2012.index;
 var x2014=x2012.elem;
x2014.selectedIndex=x2013;
}
AdfDhtmlTablePeer.prototype._handleArrowKeyNavLeftRight= function(
x2015,
x2016,
x2017,
x2018)
{
 var x2019=null; var x2020=AdfAgent.AGENT;
 if(x2015==AdfKeyStroke.ARROWRIGHT_KEY)
{
 var x2021=this.__getVisibleLeafColumns();
 var x2022=x2021.length;
 var x2023=x2018+1;
while(x2023<x2022)
{
 var x2024=this.FindCellByIndex(x2016,x2023);
x2019=this._setFocusOnEditableElementInNode(x2020,x2024);
 if(x2019!=null)
{
this._dismissTargetPopupsOnArrowNav(x2017);
break;
}
x2023++;}
}
 else {
 var x2023=x2018-1;
while(x2023>=0)
{
 var x2025=this.FindCellByIndex(x2016,x2023);
x2019=this._setFocusOnEditableElementInNode(x2020,x2025);
 if(x2019!=null)
{
this._dismissTargetPopupsOnArrowNav(x2017);
break;
}
x2023--;}
}
 if(x2019!=null&&x2020.getPlatform()==AdfAgent.GECKO_PLATFORM&&
x2019.nodeName=="SELECT"&&x2019.type=="select-one")
{
 var x2026={index:x2019.selectedIndex,elem:x2019};
AdfPage.PAGE.scheduleTimer(null,AdfDhtmlTablePeer._restoreSelectedItemOnArrowNav,x2026,0);
}
}
AdfDhtmlTablePeer.prototype._handleArrowKeyNav= function(x2027,x2028,x2029)
{
 var x2030=this.GetRowKeyAndRow(x2028,this.getDomElement());
 if(x2030!=null)
{
 var x2031=x2030[0];
 if(x2031!=null)
{
 var x2032=x2030[1];
 var x2033=this._getCellAndIndexForNode(x2028,x2032);
 var x2034=x2033.cell;
 var x2035=x2033.cellIndex;
this._ctePatternStart=undefined;
 if(x2027==AdfKeyStroke.ARROWUP_KEY||x2027==AdfKeyStroke.ARROWDOWN_KEY)
{
 if(this._isClickToEdit())
this._clickToEditActivateRow(x2031,x2027==AdfKeyStroke.ARROWDOWN_KEY,x2035);
 else
 this._setFocusOnEditableRowCell(x2031,x2027==AdfKeyStroke.ARROWDOWN_KEY,x2035);
}
 else
 {
this._handleArrowKeyNavLeftRight(x2027,x2032,x2028,x2035);
}
}
 return false;
}
 else
 {
 return true;
}
}
AdfDhtmlTablePeer.prototype._dismissTargetPopupsOnArrowNav= function(x2036)
{
 var x2037=AdfRichUIPeer.getFirstAncestorComponent(x2036);
 if(x2037!=this.getComponent())
{
x2037.getPeer().cancelAllPopups(x2037);
}
}
AdfDhtmlTablePeer.prototype._handleArrow= function(x2038,x2039)
{
switch(this._focusManager.objectType)
{
default:
break;
 case AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE:
this._handleRowHeaderArrow(x2038,x2039);
break;
 case AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE:
this._handleColumnHeaderArrow(x2038,x2039);
break;
 case AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE:
 if(x2038==AdfKeyStroke.ARROWUP_KEY||x2038==AdfKeyStroke.ARROWDOWN_KEY)
{
this._handleTableBodyArrowUpDown(x2038==AdfKeyStroke.ARROWUP_KEY,
x2039.ctrlKey,x2039.shiftKey);
}
 else if(x2038==AdfKeyStroke.ARROWLEFT_KEY||x2038==AdfKeyStroke.ARROWRIGHT_KEY)
{
this.HandleTableBodyArrowLeftRight(x2038==AdfKeyStroke.ARROWLEFT_KEY,
x2039.ctrlKey,x2039.shiftKey);
}
break;
 case AdfDhtmlTablePeer._SELECT_ALL_FOCUS_TYPE:
this._handleSelectAllArrow(x2038,x2039);
break;
}
}
AdfDhtmlTablePeer.prototype._handleRowHeaderArrow= function (x2040,x2041)
{
 if(x2040==AdfKeyStroke.ARROWDOWN_KEY||x2040==AdfKeyStroke.ARROWUP_KEY)
{
 var x2042=AdfAgent.AGENT;
 var x2043=x2040==AdfKeyStroke.ARROWUP_KEY;
 var x2044=this._focusManager,x2045=x2044.currency;
 delete this._lastRowKeyInView;
 var x2046=x2043?this._getPreviousRowKeyAndRow(x2045):
this._getNextRowKeyAndRow(x2045);
 if(x2046.isAtTop)
{
this._setFirstColumnHeaderFocus(true);
 return;
}
 var x2047=x2046.lastRowKeyInView;
x2045=x2046.rowKey;
 if(x2045!=null)
{
 var x2048=x2046.row;
 var x2049=this.GetRowHeaderCellFromRow(x2048);
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,x2045,x2049);
this._unclipRow(x2048);
}
 else if(x2047!=null)
{
 var x2050=this.GetScroller();
 var x2051=this._currentScrollTop +
 (x2043? -this._averageRowHeight:this._averageRowHeight);
 if(x2051>0&&x2051<this._getScrollHeight())
{
this._lastRowKeyInView=x2047;
this._selectionRequest=x2043?AdfDhtmlTablePeer._FOCUS_RH_ARROW_UP:
AdfDhtmlTablePeer._FOCUS_RH_ARROW_DOWN;
this._scrollerScrollToPos(null,x2051);
}
}
 else {
x2046=x2043?this._getLastVisibleRowKeyAndRow():
this.GetFirstVisibleRowKeyAndRow();
 if(x2046.rowKey!=null)
{
 var x2049=this.GetRowHeaderCellFromRow(x2046.row);
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,
x2046.rowKey,x2049);
this._unclipRow(x2046.row);
}
}
}
 else if(x2040==AdfKeyStroke.ARROWRIGHT_KEY&&
this._focusManager.currency!=null&&this._isRowSelectionEnabled())
{
 var x2044=this._focusManager,x2045=x2044.currency,x2048=x2044.domElement.parentNode;
this._selUnselectAll();
this._selSelectRow(x2045,x2048)
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x2045,x2048);
}
}
AdfDhtmlTablePeer.prototype._handleColumnHeaderArrow= function (x2052,x2053)
{
 var x2054=x2053.ctrlKey;
 var x2055=x2053.shiftKey;
 var x2056=this._virtInitialized;
switch(x2052)
{
default:
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
{
 var x2057=this._getNextColumnHeaderFocusElement();
 if(x2057)
{
this._unclipColumnElement(x2057);
 if(!this.getComponent().getDisableColumnReordering()&&
x2054&&x2055)
{
this._reorderColumnThroughKeyboard(false);
}
 else
 {
this.UpdateFocusManager(AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,null,x2057);
 if(x2055&&this._isMultipleColumnSelect())
{
this._shiftSelectColumnsThroughKeyboard(x2057);
}
}
}
break;
}
 case AdfKeyStroke.ARROWLEFT_KEY:
{
 var x2057=this._getPrevColumnHeaderFocusElement();
 if(x2057)
{
this._unclipColumnElement(x2057);
 if(!this.getComponent().getDisableColumnReordering()&&
x2054&&x2055)
{
this._reorderColumnThroughKeyboard(true);
}
 else
 {
 if(x2057.getAttribute(AdfDhtmlTablePeer._SELECT_ALL)!=null)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._SELECT_ALL_FOCUS_TYPE,null,x2057);
}
 else
 {
this.UpdateFocusManager(AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,
null,x2057);
 if(x2055&&this._isMultipleColumnSelect())
{
this._shiftSelectColumnsThroughKeyboard(x2057);
}
}
}
}
break;
}
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
{
 var x2058=this._focusManager.domElement;
 if (x2058)
{
 if(x2054&&x2055)
{
 if(x2056)
{
this._handleKeyboardSort(AdfKeyStroke.ARROWUP_KEY==x2052?
AdfDhtmlTablePeer._SORTED_ASCENDING:
AdfDhtmlTablePeer._SORTED_DESCENDING);
}
}
 else
 {
 if(x2058.colSpan>1)
{
 var x2057=(AdfKeyStroke.ARROWUP_KEY==x2052)?
this._resolveImmediateParentColumn(x2058):
this._resolveImmediateChildColumn(x2058);
 if (x2057)
{
this._unclipColumnElement(x2057);
this.UpdateFocusManager(AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,
null,x2057);
}
}
 else if(AdfKeyStroke.ARROWDOWN_KEY==x2052&&this._isRowSelectionEnabled())
{
attrs=this.GetFirstVisibleRowKeyAndRow();
rowKey=attrs.rowKey;
 if(rowKey!=null)
{
 var x2059=attrs.row;
this._selSelectRow(rowKey,x2059);
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,rowKey,x2059);
this._unclipRow(x2059);
}
}
}
}
break;
}
}
}
AdfDhtmlTablePeer.prototype._shiftSelectColumnsThroughKeyboard= function(x2060)
{
 if(this._anchorColumnHeader)
{
 var x2061=[],x2062=[],x2063=[],x2064=[];
this._resolveColumns(x2061,x2062,this._anchorColumnHeader);
this._resolveColumns(x2063,x2064,x2060);
this._selUnselectAll();
this._selectColumnRange(x2061,x2062,x2063,x2064);
}
}
AdfDhtmlTablePeer.prototype._reorderColumnThroughKeyboard= function(x2065)
{
 var x2066=this._focusManager.domElement;
 if(x2066&&x2066.getAttribute(AdfDhtmlTablePeer._ROOT_COLUMN)!=null)
{
 var x2067=null;
 if(x2065)
{
x2067=this._getSiblingDomNode(x2066,false);
 if(x2067==null)
{
 var x2068=AdfAgent.AGENT.getIntAttribute(x2066,"_d_index", -1);
 if(x2068>this._lastFrozen&&this._lastFrozen>=0)
{
 var x2069=AdfDhtmlTablePeer._getChildBySubId(this._getColumnHeader(),"t");
 var x2070=this._isFilterable()?2:1;
 if(x2069&&x2069.rows&&x2069.rows[x2070].cells.length>0)
{
 var x2071=x2069.rows[x2070].cells;
x2067=x2071[x2071.length-1];
}
}
}
 if(x2067.getAttribute(AdfDhtmlTablePeer._ROW_HEADER)!=null)
x2067=null;
}
 else
 {
x2067=this._getSiblingDomNode(x2066,true);
 if(x2067==null)
{
 var x2068=AdfAgent.AGENT.getIntAttribute(x2066,"_d_index", -1);
 if(x2068<=this._lastFrozen)
{
 var x2072=AdfDhtmlTablePeer._getChildBySubId(this._getColumnHeader(),"d2");
 var x2069=AdfDhtmlTablePeer._getChildBySubId(x2072,"t2");
 var x2070=this._isFilterable()?2:1;
 if(x2069&&x2069.rows&&x2069.rows[x2070].cells.length>0)
{
x2067=x2069.rows[x2070].cells[0];
}
}
}
}
 if(x2067)
{
this._reorderTH=x2066;
this._targetReorderTH=x2067;
 if(x2065)
this._insertColumnAfter=AdfDhtmlTablePeer._isRTL()?true:false;
 else
 this._insertColumnAfter=AdfDhtmlTablePeer._isRTL()?false:true;
this._reorderId=this._reorderTH.id
this._reorderColumnComponentsWithoutAnimation();
this._reorderTH=this._targetReorderTH=null;
 delete this._insertColumnAfter;
}
}
}
AdfDhtmlTablePeer.prototype._getNextColumnHeaderFocusElement= function()
{
 var x2073=AdfAgent.AGENT;
 var x2074=this._focusManager;
 var x2075=x2074.objectType;
 var x2076=x2074.domElement;
 if(x2076)
{
 if(x2076.colSpan>1)
{
 return this._resolveImmediateChildColumn(x2076);
}
 var x2077=this._getSiblingDomNode(x2076,true);
 var x2078=this._resolveImmediateParentColumn(x2076),x2079=x2078;
while(!x2077&&x2079)
{
 if((x2077=this._getSiblingDomNode(x2078,true))!=null)
x2079=this._resolveImmediateParentColumn(x2077);
 else
 x2079=null;
}
 if(x2077)
{
 var x2080=x2077?this._resolveImmediateParentColumn(x2077):null;
 if(x2080!=x2078)
{
 var x2078=this._resolveImmediateParentColumn(x2077);
 if(x2078)
 return x2078;
}
 return x2077;
}
 var x2081=x2073.getIntAttribute(x2076,"_d_index", -1);
 if(this._lastFrozen>=0&&x2081<=this._lastFrozen)
{
 var x2082=this._getColumnHeader();
 var x2083=AdfDhtmlTablePeer._getChildBySubId(x2082,"d2");
 var x2084=AdfDhtmlTablePeer._getChildBySubId(x2083,"t2");
 var x2085=this._isFilterable()?2:1;
 if(x2084&&x2084.rows&&x2084.rows[x2085].cells.length>0)
{
 return x2084.rows[x2085].cells[0];
}
}
 if(this._lastFrozen>=0&& !this.IsEmpty)
{
 var x2086=this.GetDatabody();
 if(x2086&&x2086.childNodes.length>0)
{
 var x2087=x2086.childNodes[0].rows[0];
 var x2088=this.GetRowHeaderCellFromRow(x2087);
 var x2089=x2087.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
this._scrollerScrollToPos(0,null);
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,x2089,x2088);
}
}
}
 return null;
}
AdfDhtmlTablePeer.prototype._getPrevColumnHeaderFocusElement= function()
{
 var x2090=AdfAgent.AGENT;
 var x2091=this._focusManager;
 var x2092=x2091.objectType;
 var x2093=x2091.domElement;
 if(x2093)
{
 var x2094=this._getSiblingDomNode(x2093,false);
 var x2095=this._resolveImmediateParentColumn(x2093);
 var x2096=x2094?
this._resolveImmediateParentColumn(x2094):null;
 var x2097=x2095;
while(!x2094&&x2097)
{
 if((x2094=this._getSiblingDomNode(x2095,false))!=null)
x2097=this._resolveImmediateParentColumn(x2094);
 else
 x2097=null;
}
 if(x2095!=null&&x2095!=x2096)
{
 return x2095;
}
 else if(x2094!=null)
{
 return this._resolveBotttomMostChildColumn(x2094);
}
 var x2098=x2090.getIntAttribute(x2093,"_d_index", -1);
 if(this._lastFrozen>=0&&x2098>this._lastFrozen)
{
 var x2099=this._getColumnHeader();
 var x2100=AdfDhtmlTablePeer._getChildBySubId(x2099,"t");
 if(x2100&&x2100.rows)
{
 var x2101=this._isFilterable()?2:1;
 var x2102=x2100.rows[x2101].cells,x2103=x2102.length;
 if(x2103>0)
{
 return this._resolveBotttomMostChildColumn(x2102[x2103-1]);
}
}
}
 else if(this._lastFrozen>=0)
{
this._setFirstColumnHeaderFocus(true);
}
}
 return null;
}
AdfDhtmlTablePeer.prototype._getSiblingDomNode= function(x2104,x2105)
{
 var x2106=x2105?x2104.nextSibling:x2104.previousSibling;
while(x2106&&x2106.nodeType!=1)
x2106=x2105?x2106.nextSibling:x2106.previousSibling;
 return x2106;
}
AdfDhtmlTablePeer.prototype._resolveBotttomMostChildColumn= function(x2107)
{
 var x2108=x2107;
 if(x2107.colSpan>1)
{
 var x2109=x2107;
AdfAssert.assert(
x2109!=null,
"Table peer cannot resolve the bottom-most child column if the parent is null!");
x2108=this._resolveImmediateChildColumn(x2107);
x2108=this._resolveRightMostSiblingInGroup(x2109,x2108);
 var x2110=x2108;
while(x2110!=null)
{
x2109=x2110;
 if((x2110=this._resolveImmediateChildColumn(x2110))!=null)
{
x2110=this._resolveRightMostSiblingInGroup(x2109,x2110);
x2108=x2110;
}
}
}
 return x2108;
}
AdfDhtmlTablePeer.prototype._resolveRightMostSiblingInGroup= function(x2111,x2112)
{
AdfAssert.assert(
x2111!=null,
"Table peer cannot resolve the right-most sibling in a group if the parent is null!");
 if(x2111.colSpan>1)
{
 var x2113=x2112,x2114=x2111.colSpan;
while(x2113&&x2114>x2113.colSpan)
{
x2114-=x2113.colSpan;
 if((x2113=this._getSiblingDomNode(x2113,true))!=null)
{
x2112=x2113;
}
}
}
 return x2112;
}
AdfDhtmlTablePeer.prototype.__getParentColumn= function(x2115)
{
AdfAssert.assertPrototype(x2115,AdfRichColumn);
 if(!this._headerless)
{
 var x2116=this._resolveImmediateParentColumn(x2115.getPeer().getDomElement());
 if(x2116)
 return AdfPage.PAGE.findComponent(x2116.id);
}
 return null;
}
AdfDhtmlTablePeer.prototype._resolveImmediateParentColumn= function(x2117)
{
 var x2118=x2117.parentNode,x2119=x2118.parentNode.parentNode;
 var x2120,x2121=null,x2122=x2119.rows,x2123=x2122.length;
 var x2124=AdfAgent.AGENT;
 var x2125=x2124.getIntAttribute(x2117,"_d_index", -1);
for(var x2126=0;x2126<x2123;x2126++)
{
 if(x2122[x2126]==x2118)
{
x2120=x2126-1;
break;
}
}
 if(x2120>=0)
{
for(var x2126=x2120,x2127=false;x2126>=0&& !x2127;x2126--)
{
 var x2128=x2122[x2126];
 var x2129=x2128.cells,x2130=x2129.length;
for(var x2131=x2130-1;x2131>=0;x2131--)
{
 var x2132=x2129[x2131];
 var x2133=x2124.getIntAttribute(x2132,"_d_index", -1);
 if(x2132.colSpan>=1&&
(x2133<=x2125&&
(x2133+x2132.colSpan)>=x2125))
{
x2121=x2132;
x2127=true;
break;
}
}
}
}
 return x2121;
}
AdfDhtmlTablePeer.prototype._resolveImmediateChildColumn= function(x2134)
{
 var x2135=AdfAgent.AGENT;
 var x2136=x2135.getIntAttribute(x2134,"_d_index", -1);
 var x2137=x2134.parentNode,x2138=x2137.parentNode.parentNode;
 var x2139,x2140=null,x2141=x2138.rows,x2142=x2141.length;
for(var x2143=x2142 -1;x2143>=0;x2143--)
{
 if(x2141[x2143]==x2137)
{
x2139=x2143+1;
break;
}
}
 if(x2139<x2142)
{
for(var x2143=x2139,x2144=false;x2143<x2142&& !x2144;x2143++)
{
 var x2145=x2141[x2143];
 var x2146=x2145.cells,x2147=x2146.length;
for(var x2148=0;x2148<x2147;x2148++)
{
 var x2149=x2146[x2148];
 if(x2136==x2135.getIntAttribute(x2149,"_d_index", -1))
{
x2140=x2149;
x2144=true;
break;
}
}
}
}
 return x2140;
}
AdfDhtmlTablePeer.prototype._unclipColumnElement= function(x2150)
{
 if(this.IsEmpty)
{
 var x2151=this.getDomElement();
 var x2152=0;
 if(this._lastFrozen>=0)
{
x2152=AdfDhtmlTablePeer._getChildBySubId(this._getColumnHeader(),"t").offsetWidth;
}
 if((x2150.offsetLeft + x2150.offsetWidth + x2152)>
(x2151.clientWidth + x2151.offsetLeft))
{
x2151.scrollLeft=x2150.offsetWidth + x2150.offsetLeft +
 x2152 - x2151.clientWidth;
}
 if(x2151.offsetLeft>x2150.offsetLeft + x2152)
x2151.scrollLeft=x2150.offsetLeft + x2152;
}
 else
 {
 var x2153=this.GetDatabody();
 var x2154=(x2150.offsetLeft + x2150.offsetWidth)>
(x2153.clientWidth + this._getScrollLeft() - this._frozenWidth);
 if(x2154)
{
 var x2155=x2150.offsetWidth + x2150.offsetLeft - x2153.clientWidth + this._frozenWidth;
this._scrollerScrollToPos(x2155,null);
 return;
}
 var x2156=this._getScrollLeft()>x2150.offsetLeft;
 if(x2156)
{
this._scrollerScrollToPos(x2150.offsetLeft,null);
}
}
}
AdfDhtmlTablePeer.prototype._handleSelectAllArrow= function (x2157,x2158)
{
switch(x2157)
{
default:
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
{
 var x2159=this.GetDatabody();
 var x2160=x2159.childNodes,x2161=x2160.length;
 if(x2161>0)
{
 var x2162=x2160[0].rows[0];
 if(x2162)
{
 var x2163=x2162.getAttribute(AdfDhtmlTablePeer._ROW_KEY);
 var x2164=this.GetRowHeaderCellFromRow(x2162);
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,
x2163,x2164);
this._unclipRow(x2162);
}
}
break;
}
 case AdfKeyStroke.ARROWRIGHT_KEY:
{
 var x2165=this._getColumnHeader();
 var x2166=AdfDhtmlTablePeer._getChildBySubId(x2165,"t");
AdfAssert.assertDomNode(x2166);
 var x2167=this._isFilterable()?2:1;
 if(x2166.rows&&x2166.rows[x2167].cells.length>1)
{
this.UpdateFocusManager(
AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,null,x2166.rows[x2167].cells[1]);
}
 else
 {
 var x2168=AdfDhtmlTablePeer._getChildBySubId(x2165,"d2");
 var x2166=AdfDhtmlTablePeer._getChildBySubId(x2168,"t2");
 if(x2166.rows&&x2166.rows[x2167].cells.length>1)
{
this.UpdateFocusManager(
AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,null,x2166.rows[x2167].cells[0]);
}
}
break;
}
}
}
AdfDhtmlTablePeer.prototype._setFirstColumnHeaderFocus= function(x2169,x2170)
{
 var x2171=false;
 if (this._headerless)
 return false;
 var x2172=this._selectAllElement;
 if(x2172==null)
{
 var x2173=this._getColumnHeader();
 if (x2173==null)
{
 return false;
}
 var x2174=AdfDhtmlTablePeer._getChildBySubId(x2173,"t");
 var x2175=this._isFilterable()?2:1;
 var x2176=x2174.rows[x2175].cells[0];
 if(x2176.getAttribute(AdfDhtmlTablePeer._SELECT_ALL)!=null)
x2172=this._selectAllElement=x2176;
 else if(!x2169)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE,null,x2176);
 if(!x2170)
this._unclipColumnElement(x2176);
x2171=true;
}
}
 if(x2172)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._SELECT_ALL_FOCUS_TYPE,null,x2172);
x2171=true;
}
 return x2171;
}
AdfDhtmlTablePeer.prototype._handleTableBodyArrowUpDown= function(x2177,x2178,x2179)
{
 var x2180=this._isRowSelectionEnabled();
 var x2181=this._supportsFocusRowNavigation;
 var x2182=this._currentScrollTop +
 (x2177? -this._averageRowHeight:this._averageRowHeight);
 if(!x2180&& !x2181)
{
 if (x2182>=0&&x2182<this._getScrollHeight())
this._scrollerScrollToPos(null,x2182);
 return;
}
 var x2183=this.GetLastRowKey();
 delete this._lastRowKeyInView;
 var x2184=x2177?this._getPreviousRowKeyAndRow(x2183):
this._getNextRowKeyAndRow(x2183);
 if(x2184.isAtTop)
{
this._setFirstColumnHeaderFocus(false);
 return;
}
 var x2185=this._isMultipleRowSelect();
 var x2186=x2184.lastRowKeyInView;
 var x2187=x2184.rowKey;
 if(x2187!=null)
{
 var x2188=x2184.row;
 if(x2180)
{
 if (x2179&&x2185)
{
 if (this._selIsSelected(x2187))
this._selUnselectRow(x2187,x2188);
 else
 this._selSelectRow(x2187,x2188);
}
 else if(!x2178|| !x2185|| !x2181)
{
this._selUnselectAll();
this._selSelectRow(x2187,x2188);
}
}
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x2187,x2188);
this._unclipRow(x2188);
 delete this._selectionRequest;
}
 else if(x2186!=null)
{
 if(x2182>0&&x2182<this._getScrollHeight())
{
this._lastRowKeyInView=x2186;
 if((x2178&&x2185&&x2181)||
(!x2180&&x2181))
{
this._selectionRequest=x2177?AdfDhtmlTablePeer._FOCUS_ROW_ARROW_UP:
AdfDhtmlTablePeer._FOCUS_ROW_ARROW_DOWN;
}
 else
 {
this._selectionRequest=x2177?AdfDhtmlTablePeer._SELECT_ARROW_UP:
AdfDhtmlTablePeer._SELECT_ARROW_DOWN;
}
 if((!x2179&& !x2178)|| !x2185)
{
 var x2189=false;
 if (!x2177)
{
 var x2190=this.GetRowCount();
 if (x2190>=0)
{
 var x2191=this.GetDatabody();
 var x2192=x2191.childNodes;
 var x2193=x2192.length;
 var x2194=x2192[x2193-1];
 var x2195=x2194.startRow + x2194.numRows;
x2189=x2195==x2190;
}
}
 if (!x2189)
{
this._selUnselectAll();
}
}
this._scrollerScrollToPos(null,x2182);
}
}
 else {
x2184=x2177?this._getLastVisibleRowKeyAndRow():
this.GetFirstVisibleRowKeyAndRow();
x2187=x2184.rowKey;
 if(x2187!=null)
{
 var x2188=x2184.row;
 if(x2180)
this._selSelectRow(x2187,x2188);
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x2187,x2188);
this._unclipRow(x2188);
}
}
}
AdfDhtmlTablePeer.prototype.HandleTableBodyArrowLeftRight= function(x2196,x2197,x2198)
{
 var x2199=this._getScrollLeft() + (x2196?-20:20);
 if(x2197)
{
x2199=Math.max(0,x2199);
 if (x2199<this._getScrollWidth())
this._scrollerScrollToPos(x2199,null);
}
 else if(x2196)
{
 var x2200=this._focusManager,x2201=x2200.currency;
 if(x2201)
{
 var x2202=this.FindRowByKey(x2201);
 if (x2202)
{
 var x2203=this.GetRowHeaderCellFromRow(x2202.tr);
 if(x2203)
{
this.UpdateFocusManager(AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE,x2201,x2203);
}
}
}
}
 if (this._hasDetailStamp&& !x2197)
{
 var x2204=this.GetFocusedRowKey();
 if(x2204!=null)
{
 var x2205=this.getComponent();
x2205.setDisclosedRowKey(x2204, !x2196);
}
}
}
AdfDhtmlTablePeer.prototype._hScrollPage= function(x2206)
{
 var x2207=this.IsEmpty?this.getDomElement():
(this._footerless?this.GetScroller():
this.GetScroller()[AdfDhtmlTablePeer._HSCROLLER]);
 if(x2207&&x2207.scrollWidth>x2207.offsetWidth)
{
 var x2208=x2207.scrollLeft -
 (x2206?-1:1)*(x2207.clientWidth - x2207.clientWidth/10);
x2208=x2206?Math.max(x2208,0):
Math.min(x2208,x2207.scrollWidth);
AdfAgent.AGENT.scrollToPos(x2207,x2208);
}
}
AdfDhtmlTablePeer.prototype._handlePageUp= function(x2209,x2210,x2211)
{
 if(x2209)
{
this._hScrollPage(true);
}
 else if(this._virtInitialized)
{
 var x2212=this.GetDatabody();
 var x2213=this._currentScrollTop - x2212.offsetHeight;
 var x2214=x2213>0-(x2212.offsetHeight);
x2213=(x2213<0)?0:x2213;
 var x2215=this.getComponent();
 var x2216=x2215.getSelectedRowKeys();
 var x2217=false;
for(var x2218 in x2216)
{
x2217=true;
break;
}
 if (!x2217||x2210)
{
 if (x2214)
this._scrollerScrollToPos(null,x2213);
 return;
}
 var x2219;
 var x2220=this.GetFirstVisibleRowKeyAndRow();
 if((x2219=x2220.rowKey)!=null)
{
 var x2221=x2220.row;
 var x2222=(x2216[x2219]!=null&&
x2216[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY]==null);
this._selUnselectAll();
 if(x2214&&x2222)
{
this._selectionRequest=AdfDhtmlTablePeer._SELECT_PAGE_UP;
 var x2223=x2221.offsetTop + x2221.parentNode.parentNode.startPos;
x2213=x2223 - x2212.offsetHeight;
this._scrollerScrollToPos(null,x2213);
}
 else
 {
this._selSelectRow(x2219,x2221);
this._unclipRow(x2221);
}
}
}
}
AdfDhtmlTablePeer.prototype._handlePageDown= function(x2224,x2225,x2226)
{
 if(x2224)
{
this._hScrollPage(false);
}
 else if(this._virtInitialized)
{
 var x2227=this.GetDatabody();
 var x2228=this.getComponent();
 var x2229=x2228.getSelectedRowKeys();
 var x2230=false;
for(var x2231 in x2229)
{
x2230=true;
break;
}
 if (!x2230||x2225)
{
 var x2232=this._currentScrollTop + x2227.offsetHeight;
 if (x2232<this._getScrollHeight())
this._scrollerScrollToPos(null,x2232);
 return;
}
 var x2233;
 var x2234=this._getLastVisibleRowKeyAndRow();
 if((x2233=x2234.rowKey)!=null)
{
 var x2235=x2234.row;
 var x2236=(x2229[x2233]!=null&&
x2229[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY]==null);
this._selUnselectAll();
 if(x2236)
{
this._selectionRequest=AdfDhtmlTablePeer._SELECT_PAGE_DOWN;
 var x2237=this._currentScrollTop - x2235.parentNode.parentNode.startPos;
 var x2238=(x2235.offsetTop +
 x2235.offsetHeight) - x2237;
this._scrollerScrollToPos(null,(this._currentScrollTop + x2238));
}
 else
 {
this._selSelectRow(x2233,x2235);
this._unclipRow(x2235);
}
}
}
}
AdfDhtmlTablePeer.prototype._getLastVisibleRowKeyAndRow= function()
{
 var x2239=AdfAgent.AGENT;
 var x2240=this.GetDatabody();
 var x2241=x2240.childNodes;
 var x2242=x2241.length;
 var x2243={};
for(var x2244=x2242-1;x2244>=0&& !x2243.rowKey; --x2244)
{
 var x2245=x2241[x2244],x2246=x2245.startPos;
 var x2247=x2241[x2244].rows,x2248=x2247.length;
for(var x2249=x2248-1;x2249>=0; --x2249)
{
 var x2250=x2247[x2249];
 var x2251=x2250.offsetTop - (this._currentScrollTop - x2246);
 if (x2251+AdfDhtmlTablePeer._MAXIMUM_ROW_REVEAL<x2240.offsetHeight)
{
 var x2252=x2239.getAttribute(x2250,AdfDhtmlTablePeer._ROW_KEY);
x2243.rowKey=x2252;
x2243.row=x2250;
break;
}
}
}
 return x2243;
}
AdfDhtmlTablePeer.prototype.GetFirstVisibleRowKeyAndRow= function(x2253)
{
 var x2254=this._cachedFirstVisibleRowKeyAndRow;
 if(x2254) return x2254;
 var x2255=AdfAgent.AGENT;
 var x2256=this.GetDatabody();
 var x2257=x2256.childNodes;
 var x2258=x2257.length;
x2254={};
x2253=x2253==undefined?AdfDhtmlTablePeer._MAXIMUM_ROW_REVEAL:x2253;
for(var x2259=0;x2259<x2258&& !x2254.rowKey; ++x2259)
{
 var x2260=x2257[x2259];
 var x2261=x2260.startPos;
 var x2262=x2260.rows;
 var x2263=0;
 if (x2262!=null)
x2263=x2262.length;
for(var x2264=0;x2264<x2263; ++x2264)
{
 var x2265=x2262[x2264];
 var x2266=x2265.offsetTop + x2265.offsetHeight + x2261;
 if (x2266-x2253>this._currentScrollTop)
{
 var x2267=x2255.getAttribute(x2265,AdfDhtmlTablePeer._ROW_KEY);
x2254.rowKey=x2267;
x2254.row=x2265;
break;
}
}
}
this._cachedFirstVisibleRowKeyAndRow=x2254;
 return x2254;
}
AdfDhtmlTablePeer.prototype._getNextRowKeyAndRow= function(x2268)
{
 var x2269=AdfAgent.AGENT;
 var x2270=this.GetDatabody();
 var x2271=x2270.childNodes;
 var x2272=x2271.length;
 var x2273={};
for(var x2274=0;x2274<x2272&& !x2273.rowKey; ++x2274)
{
 var x2275=x2271[x2274];
 var x2276=x2275.rows,x2277=x2276.length;
for(var x2278=0;x2278<x2277; ++x2278)
{
 var x2279=x2276[x2278];
 var x2280=x2269.getAttribute(x2279,AdfDhtmlTablePeer._ROW_KEY);
 if(x2268==null)
{
x2273.rowKey=x2280;
x2273.row=x2279;
break;
}
 else if(x2280==x2268)
{
x2273.lastRowKeyInView=x2280;
 if(x2278+1<x2277)
{
x2279=x2276[x2278+1];
 if(this._hasDetailStamp&&
AdfAgent.AGENT.getAttribute(x2279,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
 if(x2278+2<x2277)
x2279=x2276[x2278+2];
 else if(x2274+1<x2272&&x2271[x2274+1].rows.length>0)
x2279=x2271[x2274+1].rows[0];
 else
 return x2273;}
x2280=x2269.getAttribute(x2279,AdfDhtmlTablePeer._ROW_KEY);
x2273.rowKey=x2280;
x2273.row=x2279;
}
 else if(x2274+1<x2272)
{
x2276=x2271[x2274+1].rows;
 if(x2276.length>0)
{
x2279=x2276[0];
x2280=x2269.getAttribute(x2279,AdfDhtmlTablePeer._ROW_KEY);
x2273.rowKey=x2280;
x2273.row=x2279;
}
}
break;
}
}
}
 return x2273;
}
AdfDhtmlTablePeer.prototype._getPreviousRowKeyAndRow= function(x2281)
{
 var x2282=AdfAgent.AGENT;
 var x2283=this.GetDatabody();
 var x2284=x2283.childNodes;
 var x2285=x2284.length;
 var x2286={};
for(var x2287=x2285-1;x2287>=0&& !x2286.rowKey; --x2287)
{
 var x2288=x2284[x2287],x2289=x2288.startPos;
 var x2290=x2284[x2287].rows,x2291=x2290.length;
for(var x2292=x2291-1;x2292>=0; --x2292)
{
 var x2293=x2290[x2292];
 var x2294=x2282.getAttribute(x2293,AdfDhtmlTablePeer._ROW_KEY);
 if(x2281==null)
{
x2286.rowKey=x2294;
x2286.row=x2293;
break;
}
 else if(x2294==x2281)
{
x2286.lastRowKeyInView=x2294;
 if(x2292-1>=0)
{
x2293=x2290[x2292-1];
 if(this._hasDetailStamp&&
AdfAgent.AGENT.getAttribute(x2293,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
 if(x2292-2>=0)
x2293=x2290[x2292-2];
 else if(x2287-1>=0&&x2284[x2287-1].rows.length>0)
x2293=x2284[x2287-1].rows[x2284[x2287-1].rows.length-1];
 else
 return x2286;}
x2294=x2282.getAttribute(x2293,AdfDhtmlTablePeer._ROW_KEY);
x2286.rowKey=x2294;
x2286.row=x2293;
}
 else if(x2287-1>=0)
{
x2290=x2284[x2287-1].rows;
 if(x2290.length>0)
{
x2293=x2290[x2290.length-1];
x2294=x2282.getAttribute(x2293,AdfDhtmlTablePeer._ROW_KEY);
x2286.rowKey=x2294;
x2286.row=x2293;
}
}
 else if(x2282.getIntAttribute(x2288,"_startRow", -1)==0)
{
x2286.isAtTop=true;
}
break;
}
}
}
 return x2286;
}
AdfDhtmlTablePeer.prototype._handleSpaceKey= function(x2295,x2296)
{
 var x2297=AdfAgent.AGENT;
 var x2298=this._focusManager;
switch(x2298.objectType)
{
default:
break;
 case AdfDhtmlTablePeer._SELECT_ALL_FOCUS_TYPE:
{
this._grabFocus();
 if(!this.getComponent().getSelectedRowKeys()[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY])
this._selSelectAll();
break;
}
 case AdfDhtmlTablePeer._ROW_HEADER_FOCUS_TYPE:
{
 var x2299=this.GetRowKeyAndRow(x2298.domElement,this.getDomElement());
 if(x2299!=null)
{
this._grabFocus();
this._doRowSelection(x2296,x2299[0],x2299[1]);
}
break;
}
 case AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE:
{
 if(this._isColumnSelectionEnabled())
{
 var x2300=[],x2301=[],x2302=x2298.domElement;
this._anchorColumnHeader=x2302;
this._resolveColumns(x2300,x2301,x2302);
this._doColumnSelections(x2296.ctrlKey,x2296.shiftKey,x2296.metaKey,x2300,x2301);
}
break;
}
 case AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE:
{
 if(this._supportsFocusRowNavigation)
{
 var x2303=this._focusManager.currency;
 if (x2303!=null)
{
 if(!this._selIsSelected(x2303))
this._selSelectRow(x2303,this._focusManager.domElement);
 else if(x2296.ctrlKey)
this._selUnselectRow(x2303,this._focusManager.domElement);
}
}
break;
}
}
}
AdfDhtmlTablePeer.prototype._handleEnterKey= function(x2304,x2305)
{
 var x2306=AdfAgent.AGENT;
 var x2307=this._focusManager;
 if(this._isTargetCellFilter(x2304))
{
 if((x2306.getPlatform()==AdfAgent.GECKO_PLATFORM)&&this._currentScrollLeft>0)
{
AdfFocusUtils.focusElement(this.getDomElement());
}
this._handleFilterCellAction();
}
 else if(this._isTargetCellEditable(x2304))
{
 var x2308=this.GetRowKeyAndRow(x2304,this.getDomElement());
 if(x2308!=null)
{
 var x2309=x2308[0];
 if(x2309!=null)
{
 var x2310=x2308[1];
 var x2311=this._getCellAndIndexForNode(x2304,x2310);
 var x2312=x2311.cell;
 var x2313=((this._ctePatternStart!=undefined)&& !x2305.shiftKey)?
this._ctePatternStart:x2311.cellIndex;
this._cellNavMode=true;
 if(this._isClickToEdit())
this._clickToEditActivateRow(x2309, !x2305.shiftKey,x2313);
 else
 this._setFocusOnEditableRowCell(x2309, !x2305.shiftKey,x2313);
}
}
}
 else if(this._focusManager.objectType==AdfDhtmlTablePeer._COLUMN_HEADER_FOCUS_TYPE)
{
 var x2314=x2307.domElement;
 if(x2314)
{
 var x2315=x2306.getElementById(
AdfRichUIPeer.CreateSubId(x2314.id,AdfDhtmlTablePeer.__SORT_INDICATOR));
 if(x2315!=null)
{
 var x2316=AdfPage.PAGE.findComponent(x2314.id);
 var x2317=x2316.getSortProperty(),
x2318=AdfDhtmlTablePeer.__getSortOrderForColumn(x2314.id);
 if(x2318==null)
x2318=true; else
 x2318= !x2318;
AdfTableUtils.queueSortEvent(this.getComponent(),x2317,x2318);
}
}
}
 else if(this._isClickToEdit()&&this.GetFocusedRowKey()!=null)
{
 if(this._editableTableReadOnlyMode)
{
this._setActiveRowKey(this.GetFocusedRowKey());
this._editableTableReadOnlyMode=false;
x2313=this._lastCTEIndex;
 if(x2313!=undefined)
this._clickEditRequest={cellIndex:x2313};
}
 else
 this._clickToEditActivateRow(this.GetFocusedRowKey(), !x2305.shiftKey,this._lastCTEIndex);
}
 else
 {
 return true;
}
}
AdfDhtmlTablePeer.prototype._setFocusOnEditableRowCell= function(x2319,x2320,x2321)
{
 var x2322=x2320?this._getNextRowKeyAndRow(x2319):
this._getPreviousRowKeyAndRow(x2319);
 var x2323=x2322.rowKey;
 if(x2323!=null)
{
 var x2324=AdfAgent.AGENT;
 var x2325=x2322.row;
 var x2326=this.FindCellByIndex(x2325,x2321);
 var x2327=true;
 if (this._setFocusOnEditableElementInNode(x2324,x2326)==null)
{
 if(this._setFocusOnEditableElementInNode(x2324,x2325)==null)
x2327=false;
}
 if (x2327&&this._isRowSelectionEnabled()&& !this._selIsSelected(x2323))
{
this._selUnselectAll();
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x2323,x2325);
this._selSelectRow(x2323,x2325);
}
}
}
AdfDhtmlTablePeer.prototype._indexOfDomElement= function(x2328,x2329)
{
 var x2330=x2328.length;
for(var x2331=0;x2331<x2330;x2331++)
{
 if(x2328[x2331]==x2329)
 return x2331;
}
 return -1;
}
AdfDhtmlTablePeer.prototype._getFirstInputElementInNode= function(x2332,x2333)
{
 var x2334=x2332.getDomDocument();
 var x2335;
 var x2336=null;
 if(x2334.evaluate)
{
x2335=x2334.evaluate('.//input[not(@type="hidden")]|.//select|.//textarea|.//button|.//a|.//*[@tabindex>=0]',
x2333,null,XPathResult.ANY_TYPE,null);
 var x2337=x2335.iterateNext();
while(x2337)
{
 if(!x2337.disabled&&(x2337.tabIndex!=-1)&&(x2337.nodeName!="A"||x2337.href))
{
x2336=x2337;
break;
}
x2337=x2335.iterateNext();
}
}
 else
 {
x2335=x2333.getElementsByTagName("*");
 var x2338=x2335.length;
 var x2339=AdfDhtmlTablePeer._INPUT_REGEXP;
for( var x2340=0;x2340<x2338;x2340++ )
{
 var x2337=x2335[x2340];
 var x2341=x2337.getAttribute("tabIndex",2);
 if((x2341!=null&&x2341>=0&&x2341!=32768&&x2341!=65535)||x2337.tagName.match(x2339))
{
 if(!x2337.disabled&&(x2341!=-1)&&(x2337.nodeName!="A"||x2337.href))
{
x2336=x2337;
break;
}
}
}
}
 return x2336;
}
AdfDhtmlTablePeer.prototype._setFocusOnEditableElementInNode= function(x2342,x2343)
{
 var x2344=this._getFirstInputElementInNode(x2342,x2343);
 if(x2344)
{
 var x2345=(x2344.nodeName=="INPUT");
 if(x2342.getPlatform()!=AdfAgent.GECKO_PLATFORM|| !(x2345&&x2344.type=="file"))
{
 var x2346=AdfPage.PAGE.getActiveDomElement();
 if(x2346&&x2346.blur)
x2346.blur();
AdfFocusUtils.focusElement(x2344);
 if(x2345&& typeof(x2344.select)!=undefined)
x2344.select();
 return x2344;
}
}
 return null;
}
AdfDhtmlTablePeer.prototype._setInputElementCursorAtEndInNode= function(x2347,x2348)
{
 var x2349=this._getFirstInputElementInNode(x2347,x2348);
 if(x2349&&((x2349.nodeName=="INPUT"&&x2349.type=="text")
||x2349.nodeName=="TEXTAREA"))
{
 var x2350=x2349.value.length;
 if(x2349.selectionStart!=null){
x2349.setSelectionRange(x2350,x2350);
x2349.blur();
x2349.focus();
 var x2351=x2349.ownerDocument.createEvent("KeyboardEvent");
 if(x2351.initKeyEvent!=undefined)
x2351.initKeyEvent("keypress",true,true,null,false,false,false,false,27,0);
 else
 x2351.initUIEvent('keypress',true,true,window,1);
x2349.dispatchEvent(x2351);
}
 else
 {
 var x2352=x2349.createTextRange();
x2352.collapse(false);
x2352.select();
}
 return x2349;
}
 return null;
}
AdfDhtmlTablePeer.prototype._unclipRow= function(x2353)
{
AdfAssert.assert(x2353!=null,"Unable to unclipRow without a valid row being passed in!");
 var x2354=this.GetDatabody();
 var x2355=x2353.offsetTop + x2353.parentNode.parentNode.startPos;
 var x2356=(x2355<this._currentScrollTop);
 if (x2356)
{
this._scrollerScrollToPos(null,x2355);
 return;
}
 var x2357=x2353.offsetTop + x2353.offsetHeight -
 (this._currentScrollTop - x2353.parentNode.parentNode.startPos);
 var x2358=(x2357>x2354.offsetHeight);
 if (x2358)
{
this._scrollerScrollToPos(null,
(this._currentScrollTop + (x2357 - x2354.offsetHeight)));
}
}
AdfDhtmlTablePeer.prototype.UpdateFocusManager= function(x2359,x2360,x2361)
{
 var x2362=this._focusManager;
 if(x2362.domElement!=null)
this._updateFocusCellStyle(false);
x2362.objectType=x2359;
x2362.currency=x2360;
x2362.domElement=x2361;
this._updateFocusCellStyle(true);
}
AdfDhtmlTablePeer.prototype._updateFocusCellStyle= function(x2363)
{
 var x2364=this._focusManager;
 if(x2363&&x2364.domElement)
{
AdfDomUtils.addCSSClassName(x2364.domElement,AdfDhtmlTablePeer._FOCUSED_CLASS);
}
 else if(!x2363&&x2364.domElement)
{
AdfDomUtils.removeCSSClassName(x2364.domElement,AdfDhtmlTablePeer._FOCUSED_CLASS);
}
}
AdfDhtmlTablePeer.prototype._isFilterable= function()
{
 return (this.getDomElement().getAttribute(AdfDhtmlTablePeer._FILTERABLE)!=null);
}
AdfDhtmlTablePeer.prototype._isTargetCellFilter= function(x2365)
{
 var x2366=x2365,x2367=this.getDomElement();
 var x2368=AdfAgent.AGENT;
 var x2369=x2368.getAttribute(x2366,AdfDhtmlTablePeer._FILTER_COLUMN);
while(x2369==null)
{
 if (x2366==null||x2366==x2367)
 return false;
x2366=x2366.parentNode;
 if ((x2366==null)||(x2366.nodeType!=1))
{
break;
}
x2369=x2368.getAttribute(x2366,AdfDhtmlTablePeer._FILTER_COLUMN);
}
 return x2369!=null;
}
AdfDhtmlTablePeer.prototype._handleFilterCellAction= function()
{
 var x2370=this.getComponent();
x2370.queueEvent(new AdfQueryEvent(x2370));
}
AdfDhtmlTablePeer.prototype.getRowKeyForEvent= function(x2371)
{
 var x2372=x2371.getNativeEventTarget();
 var x2373=this.getDomElement();
 if(this._getTargetRowHeader(x2372,x2373)==null)
{
 var x2374=this.GetRowKeyAndRow(x2372,x2373);
 if(x2374!=null)
{
 return x2374[0];
}
}
 return null;
}
AdfDhtmlTablePeer.prototype.getDragOffsetForRowKeys= function(x2375,x2376)
{
 var x2377=x2375.getNativeEventTarget();
 var x2378=this.getDomElement();
 var x2379=this.GetRowKeyAndRow(x2377,x2378);
 var x2380=0,x2381=0;
 var x2382=AdfAgent.AGENT;
 if(x2379!=null)
{
 var x2383=x2379[0];
 var x2384=x2379[1];
for(var x2385=0;x2385<x2376.length;x2385++)
{
 if(x2376[x2385]==x2383)
{
 var x2386=x2382.getElementPosition(x2384);
 var x2387=x2382.getMousePosition(x2375.getNativeEvent());
x2380=x2387.x - x2386.x;
x2381+=(x2387.y - x2386.y);
 if(this._lastFrozen>=0)
{
x2380-=AdfDhtmlTablePeer._getChildBySubId(this._getColumnHeader(),"t").offsetWidth;
}
break;
}
 else
 {
 var x2388=this.FindRowByKey(x2376[x2385]);
AdfAssert.assert(x2388!=null);
x2381+=x2388.tr.offsetHeight;
}
}
}
 return {x:x2380,y:x2381};
}
AdfDhtmlTablePeer.prototype.getDragNodeForRowKeys= function(x2389)
{
AdfAssert.assertArray(x2389);
 var x2390=this.getDomDocument().createElement("table");
 var x2391=this.GetDatabody();
 var x2392=this._lastFrozen;
for(var x2393=0;x2393<x2389.length;x2393++)
{
 var x2394=this.FindRowByKey(x2389[x2393]);
 if (x2394)
{
 var x2395=x2394.tr;
 var x2396=x2395.parentNode.parentNode.startPos;
 var x2397=x2395.offsetTop + x2395.offsetHeight + x2396;
 if (x2397-AdfDhtmlTablePeer._MAXIMUM_ROW_REVEAL>this._currentScrollTop)
{
 var x2398=x2395.offsetTop - (this._currentScrollTop - x2396);
 if (x2398+AdfDhtmlTablePeer._MAXIMUM_ROW_REVEAL<x2391.offsetHeight)
{
 var x2399=x2392>=0?this._getInnerTableCell(x2395,x2392+1):x2395.cells[0];
 if(x2399==null)x2399=x2395.cells[0];
 var x2400=this._cloneCellForDrag(x2399);
 var x2401=x2390.insertRow(-1);
x2401.appendChild(x2400);
}
}
}
}
 return x2390;
}
AdfDhtmlTablePeer.prototype._cloneCellForDrag= function(x2402)
{
 var x2403=x2402.cloneNode(true);
 var x2404=AdfAgent.AGENT;
x2404.copyStyle(x2402,x2403);
 var x2405=x2403.style;
x2405.width="";
x2405.borderRight=x2405.borderBottom="0px";
x2404.setOpacity(x2403,50);
 return x2403;
}
AdfDhtmlTablePeer.prototype.getRowKeyAndOrientationFromHints= function(
x2406,
x2407,
x2408
)
{
AdfAssert.assertNumber(x2406);
AdfAssert.assertNumber(x2407);
AdfAssert.assert(x2408!=null);
 var x2409=x2408[AdfStampedDropTarget.HINT_LAST_ROWKEY];
 var x2410=x2408[AdfStampedDropTarget.HINT_LAST_ROWKEY_BOUNDS];
 var x2411=x2408[AdfStampedDropTarget.HINT_LAST_DROP_ORIENTATION];
 if (x2409&&x2410)
{
AdfAssert.assertString(x2409);
AdfAssert.assertObject(x2410);
 if ((x2406>=x2410.left)&&
(x2407>=x2410.top)&&
(x2406<=x2410.right)&&
(x2407<=x2410.bottom))
{
x2408[AdfStampedDropTarget.ROW_KEY]=x2409;
x2408[AdfStampedDropTarget.DROP_ORIENTATION]=x2411;
 return;
}
}
this._getRowKeyAndOrientationForPosition(x2406,x2407,x2408);
}
AdfDhtmlTablePeer.prototype._getRowKeyAndOrientationForPosition= function(x2412,x2413,x2414)
{
AdfAssert.assertNumber(x2412);
AdfAssert.assertNumber(x2413);
 var x2415=this.GetDatabody();
 var x2416=AdfDomUtils.getElementAtPoint(x2415,x2412,x2413);
 if (x2416)
{
 var x2417=this.GetRowKeyAndRow(x2416,this.getDomElement());
 if(x2417!=null)
{
x2414[AdfStampedDropTarget.ROW_KEY]=x2417[0];
x2414[AdfStampedDropTarget.DROP_ORIENTATION]=AdfDropEvent.DROP_ORIENTATION_ON;
 return;
}
}
 if(this.IsEmpty)
{
x2414[AdfStampedDropTarget.ROW_KEY]=null;
x2414[AdfStampedDropTarget.DROP_ORIENTATION]=AdfDropEvent.DROP_ORIENTATION_AFTER;
 return;
}
 else
 {
 if(AdfAgent.AGENT.pointInElementBounds(x2415,x2412,x2413))
{
x2414[AdfStampedDropTarget.ROW_KEY]=this._getLastRowKey();
x2414[AdfStampedDropTarget.DROP_ORIENTATION]=AdfDropEvent.DROP_ORIENTATION_AFTER;
 return;
}
}
x2414[AdfStampedDropTarget.ROW_KEY]=null;
x2414[AdfStampedDropTarget.DROP_ORIENTATION]=AdfDropEvent.DROP_ORIENTATION_ON;
}
AdfDhtmlTablePeer.prototype.showDragFeedback= function(
x2418,
x2419,
x2420,
x2421,
x2422,
x2423,
x2424)
{
AdfAssert.assertPrototype(x2418,AdfDnDContext);
AdfAssert.assertStringOrNull(x2419);
AdfAssert.assertNumber(x2420);
AdfAssert.assertStringOrNull(x2421);
 if (x2420==AdfDnDContext.ACTION_NONE)
{
AdfDomUtils.removeCSSClassName(this.GetDatabody(),AdfDhtmlTablePeer._DROP_TARGET_CLASS);
x2419=null;
}
 if (x2421!=x2419)
{
 if (x2421)
{
 var x2425=this.FindRowByKey(x2421);
 if (x2425)
{
AdfDomUtils.removeCSSClassName(x2425.tr,AdfDhtmlTablePeer._DROP_TARGET_CLASS);
}
}
 if (x2419)
{
 var x2425=this.FindRowByKey(x2419);
 if (x2425)
{
AdfDomUtils.addCSSClassName(x2425.tr,AdfDhtmlTablePeer._DROP_TARGET_CLASS);
AdfDomUtils.removeCSSClassName(this.GetDatabody(),AdfDhtmlTablePeer._DROP_TARGET_CLASS);
}
}
}
 if(x2419==null&&x2420!=AdfDnDContext.ACTION_NONE)
{
AdfDomUtils.addCSSClassName(this.GetDatabody(),AdfDhtmlTablePeer._DROP_TARGET_CLASS);
}
}
AdfDhtmlTablePeer.prototype.getRowKeyBounds= function(x2426)
{
 if(!x2426)
 return null;
 var x2427=this.FindRowByKey(x2426);
 if (x2427)
{
 return AdfAgent.AGENT.getElementPageBounds(x2427.tr);
}
 else
 {
 return null;
}
}
AdfDhtmlTablePeer.prototype.ShiftIndex= function(x2428,x2429,x2430)
{
 var x2431=x2428;
while(x2431)
{
x2431.startRow+=x2429;
x2431=x2430?x2431.nextSibling:x2431.previousSibling;
}
}
AdfDhtmlTablePeer.prototype.IsReceivingActiveEvents= function()
{
 return this._activeDataCount!= -1;
}
AdfDhtmlTablePeer.prototype.RemoveAllBlocks= function (x2432)
{
 var x2433=x2432.childNodes;
for(var x2434=x2433.length-1;x2434>=0;x2434--)
{
this.UnregisterNode(x2433[x2434]);
x2432.removeChild(x2433[x2434]);
}
}
AdfDhtmlTablePeer.prototype._getFirstRowKey= function()
{
 var x2435=this.GetDatabody();
 var x2436=x2435.childNodes;
 if(x2436.length>0)
 return this._getBlockFirstRowKey(x2436[0]);
 return null;
}
AdfDhtmlTablePeer.prototype._getLastRowKey= function()
{
 var x2437=this.GetDatabody();
 var x2438=x2437.childNodes;
 var x2439=x2438.length;
 if(x2439>0)
 return this._getBlockLastRowKey(x2438[x2439-1]);
 return null;
}
AdfDhtmlTablePeer.prototype._getBlockFirstRowKey= function(x2440)
{
AdfAssert.assert(
x2440.rows!=null&&x2440.rows.length>0,
"Unable to get row key by index when the block contains no rows!");
 return AdfAgent.AGENT.getAttribute(x2440.rows[0],AdfDhtmlTablePeer._ROW_KEY);
}
AdfDhtmlTablePeer.prototype._getBlockLastRowKey= function(x2441)
{
AdfAssert.assert(
x2441.rows!=null&&x2441.rows.length>0,
"Unable to get row key by index when the block contains no rows!");
 var x2442=AdfAgent.AGENT;
 var x2443=x2441.rows[x2441.rows.length-1];
 var x2444=x2442.getAttribute(x2443,AdfDhtmlTablePeer._ROW_KEY);
 if(x2444==null&&x2443.previousSibling)
x2444=x2442.getAttribute(x2443.previousSibling,AdfDhtmlTablePeer._ROW_KEY);
 return x2444;
}
AdfDhtmlTablePeer.prototype._isImmediateContentDelivery= function(x2445)
{
 var x2446=x2445.getContentDelivery();
 return (x2446=="immediate");
}
AdfDhtmlTablePeer.prototype._isInlineDataAvailable= function(x2447)
{
 var x2448=x2447.getProperty("_afrDataInline");
 return (x2448);
}
AdfDhtmlTablePeer.prototype._sizeRegionsForFrozenColumns= function(x2449,x2450)
{
 if (this._lastFrozen<0||this._colCount==this._lastFrozen + 1)
 return;
 var x2451=x2449.firstChild;
while(x2451)
{
this._sizeBlockForFrozenColumns(x2451,x2450);
x2451=x2451.nextSibling;
}
 var x2452=this._getColumnHeader();
 if (x2452!=null)
{
 var x2453=AdfDhtmlTablePeer._getChildBySubId(x2452,"d2");
x2453.style.width=Math.max(x2450 - this._frozenWidth,0) + "px";
}
 var x2454=this._getColumnFooter();
 if (x2454!=null)
{
x2453=AdfDhtmlTablePeer._getChildBySubId(x2454,"fd2");
x2453.style.width=Math.max(x2450 - this._frozenWidth,0) + "px";
}
}
AdfDhtmlTablePeer.prototype._sizeBlockForFrozenColumns= function(x2455,x2456)
{
 if (this._lastFrozen<0)
 return;
AdfAssert.assert(
x2455.rows!=null&&x2455.rows[0]!=null,
"Unable to _sizeBlockForFrozenColumns when block contains no rows!");
 var x2457=x2455.rows[0].cells;
 if (x2457.length==this._lastFrozen + 1)
 return;
 var x2458=x2457[x2457.length-1];
x2458.style.width=Math.max(x2456 - this._frozenWidth,0) + "px";
x2455.style.width=x2456 + "px";
 var x2459=AdfAgent.AGENT.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 if(x2459)
{
 var x2460=AdfDhtmlTablePeer.FindFirstChildByTagName(x2455,"COLGROUP");
 if(x2460)
{
 var x2461=x2460.childNodes[x2460.childNodes.length - 1];
while(x2461&&x2461.tagName!="COL")
x2461=x2461.previousSibling;
 if(x2461)
{
x2461.style.width=x2458.style.width;
x2458.firstChild.style.width=x2458.style.width;
}
}
}
}
AdfDhtmlTablePeer.prototype._registerInnerScrollCallback= function(x2462)
{
 if (this._lastFrozen<0)
 return;
AdfAssert.assert(
x2462.rows!=null&&x2462.rows[0]!=null,
"Unable to register inner scroll callback when the block contains no rows!");
 var x2463=x2462.rows[0].cells;
 var x2464=x2463.length;
 if (x2464==this._lastFrozen + 1)
 return;
for(var x2465=0;x2465<x2462.rows.length;x2465++)
{
x2463=x2462.rows[x2465].cells;
 var x2466=x2463[x2464-1];
 var x2467=AdfDhtmlTablePeer.FindFirstChildByTagName(x2466,"DIV");
x2467.onscroll=this._innerTableScrollCallback;
}
}
AdfDhtmlTablePeer._getNestedScrolledTable= function(x2468)
{
AdfAssert.assert(
x2468!=null,
"Unable to get the nested scrolled table without a valid row passed in!");
 var x2469=x2468.cells;
 var x2470=x2469[x2469.length-1];
 var x2471=AdfDhtmlTablePeer.FindFirstChildByTagName(x2470,"DIV");
 var x2472=AdfDhtmlTablePeer.FindFirstChildByTagName(x2471,"TABLE");
 return x2472;
}
AdfDhtmlTablePeer._isRTL= function ()
{
 return AdfPage.PAGE.getLocaleContext().isRightToLeft();
}
AdfDhtmlTablePeer.prototype._getExpandAction= function(x2473)
{
 var x2474=AdfPage.PAGE.getLookAndFeel();
 var x2475=x2474.getStyleClass(AdfDhtmlTablePeer._ICON_STYLE_EXPANDED);
 var x2476=x2473.parentNode.className;
 if (x2475==x2473.className||x2475==x2476)
 return "collapse";
 var x2477=x2474.getStyleClass(AdfDhtmlTablePeer._ICON_STYLE_COLLAPSED);
 if (x2477==x2473.className||x2477==x2476)
 return "expand";
 return null;
}
AdfDhtmlTablePeer.prototype.ComponentScrollTopChanged= function(
x2478,
x2479,
x2480,
x2481)
{
this.scrollToPos(-1,x2480,true);
 return false;
}
AdfDhtmlTablePeer.prototype.ComponentScrollLeftChanged= function(
x2482,
x2483,
x2484,
x2485)
{
this.scrollToPos(x2484, -1,true);
 return false;
}
AdfDhtmlTablePeer.prototype.ComponentDisclosedRowKeysChanged= function(
x2486,
x2487,
x2488,
x2489)
{
this._savedDisclosedState=x2489;
 var x2490=AdfCollections.removeAll(x2489,x2488);
 var x2491=AdfCollections.removeAll(x2488,x2489);
 var x2492=false;
 var x2493=false;
 if(x2490!=null&& !AdfCollections.isEmpty(x2490))
{
this.HandleComponentCollapseEvent(x2490);
x2492=true;
}
 if(x2491!=null&& !AdfCollections.isEmpty(x2491))
{
this.HandleComponentExpandEvent(x2490);
x2493=true;
}
AdfAssert.assert(!(x2492&&x2493));
}
AdfDhtmlTablePeer.prototype.HandleComponentCollapseEvent= function(x2494)
{
this._queueCollapseFetchEvent();
}
AdfDhtmlTablePeer.prototype.HandleComponentExpandEvent= function(x2495)
{
this._queueExpandFetchEvent();
}
AdfDhtmlTablePeer.prototype._changeDetailIcon= function(x2496,x2497)
{
 var x2498=AdfAgent.AGENT;
 var x2499=null;
 var x2500=x2496.cells;
for(var x2501=0;x2501<x2500.length;x2501++)
{
 if (x2498.getAttribute(x2500[x2501],AdfDhtmlTablePeer._DETAIL_COLUMN_MARKER,false))
{
x2499=x2500[x2501];
break;
}
}
 if (x2499)
{
 var x2502=AdfDhtmlTablePeer.FindFirstChildByTagName(x2499,"A");
 if (x2502)
{
 var x2503=x2497?AdfDhtmlTablePeer._ICON_STYLE_EXPANDED
:AdfDhtmlTablePeer._ICON_STYLE_COLLAPSED;
 var x2504=AdfPage.PAGE.getLookAndFeel();
 var x2505=x2504.getStyleClass(x2503);
x2502.className=x2505;
 var x2506=x2497?x2504.getTranslatedString(AdfDhtmlTablePeer._EXPANDED_NODE_KEY):
x2504.getTranslatedString(AdfDhtmlTablePeer._COLLAPSED_NODE_KEY);
x2502.title=x2506;
}
 var x2507=this._getDisclosureIcon(x2502); if(x2507)
{
 var x2508=(x2497)?AdfDhtmlTablePeer._ICON_EXPANDED:
AdfDhtmlTablePeer._ICON_COLLAPSED;
AdfDomUtils.swapIcon(x2507,x2508);
}
}
}
AdfDhtmlTablePeer.prototype._getDisclosureIcon= function(x2509)
{
 var x2510=AdfAgent.getAgent();
 if (x2509.firstChild!=null)
{
 var x2511=x2509.firstChild;
 var x2512=x2510.getNodeName(x2511).toLowerCase();
 if(x2512=="img"||x2512=="span"||x2512=="#text")
 return x2511;
}
 return null;
}
AdfDhtmlTablePeer.prototype._getEstimatedRowCount= function(x2513)
{
 var x2514=AdfAgent.getAgent();
 return x2514.getIntAttribute(x2513,"_estRowCount", -1);
}
AdfDhtmlTablePeer._getBlockRowCount= function(x2515)
{
 var x2516=0;
 var x2517=AdfAgent.getAgent();
 if (x2517.getAttribute(x2515,AdfDhtmlTablePeer._HAS_DETAIL_MARKER,false))
{
 var x2518=x2515.rows;
for(var x2519=0;x2519<x2518.length;x2519++)
{
 if (!x2517.getAttribute(x2518[x2519],AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
x2516++;
}
}
 else
 {
 return x2515.rows.length;
}
 return x2516;
}
AdfDhtmlTablePeer.prototype._isOwnComponentEvent= function(x2520)
{
 var x2521=x2520.getSource();
 var x2522=this.getComponent();
 var x2523=false;
 var x2524=(AdfPage.PAGE.getDomWindow().AdfUITree!=null);
while(!x2523&&x2521)
{
 if (x2521==x2522)
x2523=true;
 else
 {
 if (x2521 instanceof AdfUITable||
(x2524&&x2521 instanceof AdfUITree)||
x2521 instanceof AdfUIPopup)
{
break;
}
x2521=x2521.getParent();
}
}
 return x2523;
}
AdfDhtmlTablePeer.prototype._isClickToEdit= function()
{
 var x2525=this.getComponent().getEditingMode();
 return (x2525==AdfDhtmlTablePeer._EDIT_MODE_CLICKTOEDIT);
}
AdfDhtmlTablePeer.prototype._getActiveRowKey= function()
{
 return this.getComponent().getProperty("_afrActiveRowKey");
}
AdfDhtmlTablePeer.prototype.ComponentActiveRowKeyChanged= function(
x2526,
x2527,
x2528,
x2529)
{
this._setActiveRowKey(x2528);
 return false;
}
AdfDhtmlTablePeer.prototype._setActiveRowKey= function(x2530)
{
 if (AdfTableDataFetchEvent.CLICK_EDIT_ACTIVE_ROW==this._pendingFetch)
 return;
 if (this._ignoreActiveRowKeyChange)
 return;
 var x2531=null;
this._ignoreActiveRowKeyChange=true;
try
{
 var x2532=this.getComponent();
 var x2533=x2532.getProperty("_afrActiveRowKey");
x2532.setProperty("_afrActiveRowKey",x2530,false,AdfUIComponent.PROPAGATE_ALWAYS);
x2532.setProperty("activeRowKey",x2530,false,AdfUIComponent.PROPAGATE_ALWAYS);
x2531=this._queueFetchEvent(false,AdfTableDataFetchEvent.CLICK_EDIT_ACTIVE_ROW, -1,x2530);
 if(x2533&&x2531)
{
x2531.setOldClientKey(x2533);
this._oldActiveRowKey=x2533;
}
 else if (!x2531)
{
x2532.setProperty("_afrActiveRowKey",x2533,false,AdfUIComponent.PROPAGATE_ALWAYS);
x2532.setProperty("activeRowKey",x2533,false,AdfUIComponent.PROPAGATE_ALWAYS);
}
}
finally
{
this._ignoreActiveRowKeyChange=false;
}
 return x2531;
}
AdfDhtmlTablePeer.prototype._restoreActiveRowKey= function()
{
this._ignoreActiveRowKeyChange=true;
try
{
 var x2534=this.getComponent();
x2534.setProperty('_afrActiveRowKey',this._oldActiveRowKey,
false,AdfUIComponent.PROPAGATE_NEVER);
x2534.setProperty("activeRowKey",this._oldActiveRowKey,
false,AdfUIComponent.PROPAGATE_NEVER);
 delete this._oldActiveRowKey;
}
finally
{
this._ignoreActiveRowKeyChange=false;
}
}
AdfDhtmlTablePeer.prototype._getCellAndIndexForNode= function(x2535,x2536)
{
 var x2537=AdfAgent.AGENT;
 var x2538=null;
 var x2539=this.getDomElement();
 var x2540=null;
 var x2541= -1;
 var x2542=null;
while(null!=x2535&&x2535!=x2539&&x2541==-1)
{
 if(x2537.getNodeName(x2535)=="TD")
{
 var x2543=x2535.parentNode;
 if(x2543==x2536)
{
x2541=this._indexOfDomElement(x2536.cells,x2535);
x2542=x2535;
break;
}
 else if(this._lastFrozen>=0)
{
 if(x2540==null)
x2540=AdfDhtmlTablePeer._getNestedScrolledTable(x2536).rows[0];
 if(x2543==x2540)
{
x2541=this._lastFrozen + this._indexOfDomElement(x2540.cells,x2535)+1;
x2542=x2535;
break;
}
}
x2535=x2543;
}
 else
 x2535=x2535.parentNode;
}
 return {cellIndex:x2541,cell:x2542};
}
AdfDhtmlTablePeer.prototype._saveClickToEditRequest= function(x2544,x2545)
{
 var x2546=AdfAgent.AGENT;
 var x2547=this._getCellAndIndexForNode(x2546.getEventTarget(x2544),x2545);
 var x2548={};
x2548.cellIndex=x2547.cellIndex;
this._clickEditRequest=x2548;
}
AdfDhtmlTablePeer.prototype._processClickToEditRequest= function(x2549)
{
 var x2550=AdfAgent.AGENT;
 var x2551=this._clickEditRequest;
 if (!x2551)
 return;
 var x2552=this._getActiveRowKey();
this._lastCTEIndex=x2551?x2551.cellIndex:undefined;
this._grabFocus();
 if(!x2552)
 return;
 var x2553=this.FindRowByKey(x2552);
 if (!x2553)
 return;
 var x2554=x2553.tr;
AdfAssert.assertDomElement(x2554);
 if(!x2551||x2551.activateCellType)
{
 if(x2551&&x2551.activateCellType=="last")
{
 var x2555=this.__getVisibleLeafColumns().length-1;
while(x2555>=0)
{
 var x2556=this._getInputElementsInNode(this.FindCellByIndex(x2554,x2555));
 if(x2556.length>0)
{
AdfFocusUtils.focusElement(x2556[x2556.length-1]);
break;
}
x2555--;
}
}
 else
 {
this._setFocusOnEditableElementInNode(x2550,x2554);
}
}
 else
 {
 var x2557=this.FindCellByIndex(x2554,x2551.cellIndex);
AdfAssert.assertDomElement(x2557);
 if (this._setFocusOnEditableElementInNode(x2550,x2557)==null)
{
this._setFocusOnEditableElementInNode(x2550,x2554);
}
}
 if (x2549&&this._isRowSelectionEnabled()&& !this._selIsSelected(x2552))
{
this._selUnselectAll();
this.UpdateFocusManager(AdfDhtmlTablePeer._TABLE_BODY_FOCUS_TYPE,x2552,x2554);
this._selSelectRow(x2552,x2554);
}
 if (this._clickEditRequest)
 delete this._clickEditRequest;
 if (this._processClickToEditRequestTimerId)
 delete this._processClickToEditRequestTimerId;
}
AdfDhtmlTablePeer.prototype._getInputElementsInNode= function(x2558)
{
 var x2559=AdfAgent.AGENT.getDomDocument();
 var x2560=[];
 if(x2559.evaluate)
{
 var x2561=x2559.evaluate(".//input|.//select|.//textarea|.//button|.//a",
x2558,null,XPathResult.ANY_TYPE,null);
 var x2562=x2561.iterateNext();
while(x2562)
{
 if(!x2562.disabled&&(x2562.tabIndex!=-1)&&(x2562.nodeName!="A"||x2562.href))
x2560.push(x2562);
x2562=x2561.iterateNext();
}
}
 else
 {
 var x2561=x2558.getElementsByTagName("*");
 var x2563=x2561.length;
 var x2564=/^INPUT|SELECT|BUTTON|^A\b|TEXTAREA/;
for( var x2565=0;x2565<x2563;x2565++ )
{
 var x2562=x2561[x2565];
 if(x2562.tagName.match(x2564)&&
 !x2562.disabled&&(x2562.tabIndex!=-1)&&(x2562.nodeName!="A"||x2562.href))
{
x2560.push(x2562);
}
}
}
 return x2560;
}
AdfDhtmlTablePeer.prototype._handleTabKey= function(x2566,x2567)
{
 var x2568=this.GetRowKeyAndRow(x2566,this.getDomElement());
 var x2569=x2567.shiftKey;
 var x2570=true;
 if(x2568!=null)
{
 var x2571=x2568[1];
 if(x2571!=null)
{
this._cellNavMode=true;
 var x2572=this._getCellAndIndexForNode(x2566,x2571);
 var x2573=x2572.cell;
 if(x2573)
{
 var x2574=x2572.cellIndex;
 if(!this._ctePatternStart)
this._ctePatternStart=x2574;
 if(this._isClickToEdit()&&this._getActiveRowKey()!=null)
{
 var x2575=this._getInputElementsInNode(x2573);
 var x2576=x2575.length;
 if(x2576>0)
{
 if(!x2569&&AdfDomUtils.isAncestorOrSelf(x2575[x2576-1],x2566))
{
 if(this._hasDetailStamp)
{
 var x2577=x2571.nextSibling;
 if(x2577&&
AdfAgent.AGENT.getAttribute(x2577,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
x2575=this._getInputElementsInNode(x2577);
 if(x2575.length>0)
 return true;
}
}
 var x2578=this.__getVisibleLeafColumns();
 var x2579=x2578.length;
 var x2580=(x2574>=x2579-1);
 if(!x2580)
{
x2574++;
while(x2574<x2579)
{
x2575=this._getInputElementsInNode(this.FindCellByIndex(x2571,x2574));
 if(x2575.length>0)
break;
x2574++;
}
x2580=(x2574==x2579);
}
 if(x2580)
{
this._clickToEditActivateRow(x2568[0],true);
x2570=false;
}
}
 else if(x2569&&AdfDomUtils.isAncestorOrSelf(x2575[0],x2566))
{
 var x2581=(x2572.cellIndex==0);
 if(!x2581)
{
 var x2574=x2572.cellIndex-1;
while(x2574>=0)
{
x2575=this._getInputElementsInNode(this.FindCellByIndex(x2571,x2574));
 if(x2575.length>0)
break;
x2574--;
}
x2581=(x2574== -1);
}
 if(x2581)
{
this._clickToEditActivateRow(x2568[0],false);
x2570=false;
}
}
}
}
}
}
}
 else if(!x2569&&this._hasDetailStamp&&this._isClickToEdit())
{
 return this._handleTabKeyInCTEDetailRegion(x2566);
}
 return x2570;
}
AdfDhtmlTablePeer.prototype._handleTabKeyInCTEDetailRegion= function(x2582)
{
 var x2583=this.getDomElement();
 var x2584=x2582.parentNode;
 var x2585=AdfAgent.AGENT;
 var x2586=true;
while(x2584&&x2584!=x2583)
{
 if (x2585.getNodeName(x2584)=="TR"&&
x2585.getAttribute(x2584,AdfDhtmlTablePeer._DETAIL_ROW_MARKER,false))
{
elems=this._getInputElementsInNode(x2584);
 if(elems.length>0&&elems[elems.length -1]==x2582)
{
 var x2587=x2585.getAttribute(x2584.previousSibling,AdfDhtmlTablePeer._ROW_KEY);
this._clickToEditActivateRow(x2587,true);
x2586=false;
}
break;
}
x2584=x2584.parentNode;
}
 return x2586;
}
AdfDhtmlTablePeer.prototype._clickToEditActivateRow= function(x2588,x2589,x2590)
{
 delete this._lastRowKeyInView;
 var x2591=x2589?this._getNextRowKeyAndRow(x2588):
this._getPreviousRowKeyAndRow(x2588);
 if(!x2591.isAtTop)
{
 var x2592=x2591.rowKey;
 var x2593=x2591.lastRowKeyInView;
 if(x2592!=null)
{
this._setActiveRowKey(x2592);
this._unclipRow(x2591.row);
 if(x2590!=undefined)
this._clickEditRequest={cellIndex:x2590};
 else this._clickEditRequest={activateCellType: !x2589?"last":"first"};
 var x2594=AdfPage.PAGE.getActiveDomElement();
 var x2595=this.getComponent();
 var x2596=x2595.getProperty("activeRowKey");
 if (x2588!=x2596&&x2594&&x2594.blur)
x2594.blur();
}
 else if(x2593!=null)
{
 var x2597=this.GetScroller();
 if(!this._footerless)
x2597=x2597[AdfDhtmlTablePeer._VSCROLLER];
 var x2598=this._currentScrollTop +
 (x2589?this._averageRowHeight:-this._averageRowHeight);
 if(x2598>0&&x2598<this._getScrollHeight())
{
this._lastRowKeyInView=x2593;
AdfAgent.AGENT.scrollToPos(x2597,null,x2598);
this._clickEditRequest={activateRowType:((x2589)?"next":"previous")};
}
}
}
}
AdfDhtmlTablePeer.prototype._processClickToEditActivateRequest= function()
{
 var x2599=this._clickEditRequest;
 if(x2599&&x2599.activateRowType)
{
 var x2600=(x2599.activateRowType=="next");
attrs=(x2600)?this._getNextRowKeyAndRow(this._lastRowKeyInView):
this._getPreviousRowKeyAndRow(this._lastRowKeyInView);
x2599.activateCellType=(x2600)?"first":"last";
 if(attrs.rowKey)
this._setActiveRowKey(attrs.rowKey);
 delete this._lastRowKeyInView;
}
}
AdfDhtmlTablePeer.prototype._restoreScrollPosition= function()
{
 var x2601=this.getComponent();
 var x2602=x2601.getScrollLeft();
 if (x2602>=0)
this.scrollToPos(x2602, -1,true);
}
AdfDhtmlTablePeer.prototype._unclipInputElem= function(x2603)
{
 var x2604=AdfAgent.AGENT;
 var x2605=this.GetScroller();
 if(!x2605)
 return;
 if(!this._footerless)
x2605=x2605[AdfDhtmlTablePeer._HSCROLLER];
 var x2606=x2604.getElementLeft(x2603);
 var x2607=x2604.getElementLeft(x2605);
 var x2608=(x2606 + x2603.offsetWidth)>(x2607+x2605.clientWidth);
 if(x2608)
{
 var x2609=this._currentScrollLeft + (
x2603.offsetWidth + x2606 - (x2607+x2605.clientWidth));
x2604.scrollToPos(x2605,x2609,null);
 return;
}
}
AdfDhtmlTablePeer.prototype.scrollColumnIntoView= function(x2610,x2611)
{
AdfAssert.assert(x2610!=null||x2611!=null);
 var x2612=AdfAgent.AGENT;
 if(!x2611)
{
x2611=x2612.getElementById(x2610);
 if(!x2611)
 return;
}
 var x2613=x2612.getIntAttribute(x2611,"_d_index", -1);
 if(x2613<=this._lastFrozen)
 return;
 var x2614=this.GetScroller();
 if(!this._footerless)
x2614=x2614[AdfDhtmlTablePeer._HSCROLLER];
 var x2615=x2611.offsetLeft;
 if(x2615==this._currentScrollLeft)
 return;
 var x2616=this._colScrollAnimationDuration;
 if(x2616==undefined)
{
 var x2617=AdfPage.PAGE;
 if(x2617.isAnimationEnabled())
{
x2616=parseInt(x2617.getLookAndFeel()
.getSkinProperty("af|table-tr-column-scroll-animation-duration"));
}
 else
 x2616=0;
this._colScrollAnimationDuration=x2616;
}
 if(x2616>0)
{
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_SLOW_FAST_SLOW,
x2616,
[
{
"element":x2614,
"properties":{"scrollLeft":x2615}
}
],
null,
null,
null);
}
 else
 {
x2612.scrollToPos(x2614,x2615,null);
}
}
AdfDhtmlTablePeer.prototype.getRowIndex= function(x2618)
{
AdfAssert.assertString(x2618);
AdfAssert.assert(x2618!=null,"Row Key cannot be null");
 var x2619= -1;
 var x2620=this.FindRowByKey(x2618);
 if (x2620)
{
x2619=x2620.index;
}
 return x2619;
}
AdfDhtmlTablePeer.prototype.getRowKey= function(x2621)
{
AdfAssert.assertNumber(x2621);
AdfAssert.assert(x2621>=0,"index must be greater than or equal to 0");
 var x2622=null;
 var x2623=this.GetDatabody();
 var x2624=x2623.childNodes;
 var x2625=x2624.length;
for(var x2626=0;x2626<x2625;x2626++)
{
 var x2627=x2624[x2626];
 var x2628=x2627.startRow;
 if(x2621>=x2628&&(x2621<x2628 + x2627.numRows))
{
x2622=AdfAgent.AGENT.getAttribute(x2627.rows[x2621 - x2628],AdfDhtmlTablePeer._ROW_KEY);
break;
}
}
 return x2622;
}
AdfDhtmlTablePeer.prototype._clearColumnSelectionEventAddedSet= function()
{
this._colSelEventSelectedColIds={};
}
AdfDhtmlTablePeer.prototype._clearColumnSelectionEventRemovedSet= function()
{
this._colSelEventUnselectedColIds={};
}
AdfDhtmlTablePeer.prototype._clearColumnSelectionEventChangedSets= function()
{
this._colSelEventSelectedColIds={};
this._colSelEventUnselectedColIds={};
}
AdfDhtmlTablePeer.prototype._hasColumnSelectionEventChangedSets= function()
{
 return !AdfCollections.isEmpty(this._colSelEventSelectedColIds)|| !AdfCollections.isEmpty(this._colSelEventUnselectedColIds);
}
AdfDhtmlTablePeer.prototype._queueColumnSelectionEvent= function()
{
 if (this._hasColumnSelectionEventChangedSets())
{
 var x2629=this.getComponent();
AdfTableUtils.queueColumnSelectionEvent(x2629,this._colSelEventSelectedColIds,this._colSelEventUnselectedColIds);
this._clearColumnSelectionEventChangedSets();
}
}
AdfDhtmlTablePeer.prototype.ConvertClientIdToLocator= function(
x2630,
x2631,
x2632,
x2633)
{
 var x2634=x2630.getClientId();
 var x2635=AdfStrings.count(x2634,":");
AdfAssert.assert(x2632.indexOf(x2634)>=0);
 var x2636=x2632.substring(x2634.length+1);
 var x2637=x2636.indexOf(":");
 if(x2637>0)
{
 var x2638=x2636.substring(0,x2637);
 var x2639=this.FindRowByKey(x2638);
x2633.push([x2635 + 1,x2639?x2639.index:null]);
}
}
AdfDhtmlTablePeer.prototype.convertLocatorToClientId= function(x2640,x2641)
{
 var x2642=x2640.getClientId();
 var x2643=null;
 var x2644=this.GetDatabody();
 if(x2644!=null)
{
 var x2645=x2644.childNodes;
for(var x2646=0;x2646<x2645.length&& !x2643;x2646++)
{
 var x2647=x2645[x2646];
 var x2648=x2647.startRow;
 if(x2641>=x2648&&x2641<(x2648 +x2647.numRows))
{
x2643=x2647.rows[x2641 - x2648].getAttribute(AdfDhtmlTablePeer._ROW_KEY);
break;
}
}
}
 return x2643?(x2642 + ":" + x2643):null;
}
AdfDhtmlTablePeer.prototype._computeAutoHeight= function()
{
 var x2649=AdfAgent.AGENT;
 var x2650=0;
 var x2651=this._autoHeightRows;
 if (x2651>0)
{
 var x2652=(x2649.getPlatform()==AdfAgent.GECKO_PLATFORM);
 var x2653=this.GetFirstVisibleRowKeyAndRow(); var x2654=x2653.row;
 if (x2654)
{
 var x2655=this.GetDatabody();
 var x2656=x2655.childNodes;
 var x2657=x2656.length;
 var x2658=0;
for(var x2659=0;x2659<x2657&&x2658<x2651;x2659++)
{
 var x2660=x2656[x2659];
 var x2661=x2660.rows;
 var x2662=0;
 if (x2661!=null)
x2662=x2661.length;
for(var x2663=0;x2663<x2662&&x2658<x2651;x2663++)
{
 if (x2654===x2661[x2663]||x2658>0)
{
x2658++;
 var x2664;
 if (x2652)
{
 var x2665=x2649.getComputedStyle(x2661[x2663]);x2664=parseFloat(x2665.height);
}
 else
 x2664=x2661[x2663].offsetHeight;
x2650+=x2664;
}
}
}
}
}
 return x2652?Math.round(x2650):x2650;
}
AdfDhtmlTablePeer.prototype._setOuterHeightForBodyHeight= function (x2666)
{
 var x2667=this.getDomElement();
 var x2668=this._getScrollbarHeight();
 var x2669=x2666 + this._cachedCHHeight + this._cachedCFHeight + x2668;
this._sizeOuterContainer(x2667,x2669);
 if(!this.IsEmpty)
{
 var x2670=this.GetScroller();
 var x2671=AdfAgent.getAgent();
 if (x2670!=null&&x2671.getPlatform()==AdfAgent.IE_PLATFORM&&this.GetRowCount()<2)
{
 var x2672=null;
 var x2673=0;
 var x2674=x2671.getVersion();
 if (x2674>7&&x2674<9)
{
x2672=x2670;
 if (!this._footerless)
{
x2672=x2670[AdfDhtmlTablePeer._HSCROLLER];
}
 if (this._averageRowHeight!=null)
{
x2673=this._averageRowHeight;
x2672.style.minHeight=(8 + x2673) + "px";
}
}
}
this._setScrollerHeight(x2669,this._cachedCHHeight,this._cachedCFHeight);
this._setScrollerWidth(x2667.clientWidth,this._frozenWidth);
 var x2675=this._getScrollbarHeight();
 if(x2668!=x2675)
{
x2669=x2666 + this._cachedCHHeight + this._cachedCFHeight + x2675;
this._sizeOuterContainer(x2667,x2669);
this._setScrollerHeight(x2669,this._cachedCHHeight,this._cachedCFHeight);
}
this.SizeDatabody(this.GetDatabody(),x2667.clientWidth,x2667.clientHeight);
 if (x2672!=null)
{
x2672.style.minHeight=x2673 + "px";
}
}
}
AdfDhtmlTablePeer.prototype._sizeOuterContainer= function (x2676,x2677)
{
 var x2678=AdfAgent.AGENT;
 if(x2678.getBoxSizing(x2676)=="border-box")
{
 var x2679=AdfAgent.getCSSLengthAsInt;
 var x2680=x2678.getComputedStyle(x2676);
x2676.style.height=(x2677 +
 x2679(x2680.paddingTop) +
 x2679(x2680.paddingBottom) +
 x2679(x2680.marginTop) +
 x2679(x2680.marginBottom)+
 x2679(x2680.borderTopWidth) +
 x2679(x2680.borderBottomWidth))+"px";
}
 else
 x2676.style.height=x2677 + "px";
}
AdfDhtmlTablePeer.prototype.AdjustAutoHeight= function ()
{
 var x2681=this.GetPanelCollectionPeer();
 if (x2681&&x2681.isDetached())
{
 var x2682=this.getDomElement();
 var x2683=x2682.clientHeight;
this.__fixPanelCollectionDimensions(true);this.SizeDatabody(this.GetDatabody(),x2682.clientWidth,x2683);
 if(!this.IsEmpty)
this._setScrollerHeight(x2683,this._cachedCHHeight,this._cachedCFHeight);
}
 else if (this.isHeightAutoSized()&& !this.BusyAnimating())
{
 var x2684=this.GetDatabody();
 var x2685=(!this.IsEmpty)?this._computeAutoHeight():x2684.offsetHeight;
 var x2686=AdfAgent.AGENT;
 var x2687=(x2686.getPlatform()==AdfAgent.IE_PLATFORM&&x2686.getVersion()<9&&x2686.getVersion()>7);
 if (this.IsEmpty||x2685!=x2684.offsetHeight||(x2687&&this.GetRowCount()<2))
{
this._setOuterHeightForBodyHeight(x2685);
 if (x2681)
this.__fixPanelCollectionDimensions(false);
}
this._checkAutoHeightScrollbar(x2684);
 if(!this._stretchingTheColumns&& !this._desendentResizeQueued)
this._doStretch();
}
}
AdfDhtmlTablePeer.prototype._queueDescendantResize= function()
{
 if(this._desendentResizeQueued)
 return;
this._desendentResizeQueued=true;
try
{
AdfPage.PAGE.__queueDescendantResizeNotifySource(this.getComponent());
AdfPage.PAGE.__doDescendantResizeNotify();
}
finally
{
 delete this._desendentResizeQueued;
}
}
AdfDhtmlTablePeer.prototype._doStretch= function (x2688)
{
this._stretchTheColumns();
this._queueDescendantResize();
 return -1;
}
AdfDhtmlTablePeer.prototype._checkAutoHeightScrollbar= function (x2689)
{
 var x2690=x2689.childNodes;
 var x2691=this._autoHeightRows;
 var x2692=x2690.length;
 if (this._allRowsAvailableOnClient(x2690,x2692)&&this.GetRowCount()<=x2691)
{
 var x2693=this._getScrollerClientHeight();
 if (x2693!=this._canvasHeight)
{
this._canvasHeight=x2693;
this._setFakeCanvasHeight(x2693);
 var x2694=this.getDomElement();
this._setScrollerWidth(x2694.clientWidth,this._frozenWidth);
this.SizeDatabody(x2689,x2694.clientWidth,x2694.clientHeight);
}
}
}
AdfDhtmlTablePeer.prototype._getRTLScrollAdjustment= function()
{
 var x2695=AdfAgent.getAgent();
 if(x2695.getPlatform()==AdfAgent.IE_PLATFORM&&x2695.getVersion()>7)
{
 var x2696=this.GetScroller();
 if (!this._footerless)
x2696=x2696[AdfDhtmlTablePeer._HSCROLLER];
 return (x2696.scrollWidth - x2696.clientWidth - this._currentScrollLeft);
}
 else
 return this._currentScrollLeft;
}

AdfUIComponents.createComponentClass("AdfRichChooseDate",
{
componentType:"oracle.adf.RichChooseDate",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"maxValue",type:"Date",secured:true}
,{name:"minValue",type:"Date",secured:true}
,{name:"disabledDays",type:"Object",secured:true}
,{name:"disabledDaysOfWeek",type:"Object",secured:true}
,{name:"disabledMonths",type:"Object",secured:true}
],
superclass:AdfUIChoose
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlChooseDatePeer");
AdfDhtmlChooseDatePeer.prototype.handleUpdateFromInputComponent= function(
x0,
x1,
x2)
{
 if(x1==AdfDhtmlChooseDatePeer.SELECTED_DATE)
{
 if(x2==null)
{
x2= new Date();
}
this._queueEvent(x0,x2.getMonth(),x2.getFullYear());
}
}
AdfDhtmlChooseDatePeer.prototype.submitValueToInput= function(x3,x4)
{
 var x5=this._getSelectedDateTime(x3);
 if (x5!=null)
AdfDhtmlInputChooseBindingUtils.updateInputComponentProperty(x4,
null,
AdfUIValue.VALUE,
x5);
AdfDhtmlInputChooseBindingUtils.returnToInputComponent(x4,true);
}
AdfDhtmlChooseDatePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfValueChangeEvent.VALUE_CHANGE_TYPE
);
this._CURRDAY_ID_ATTR_NAME="_adfCDay";
this._CURRMONTH_ID_ATTR_NAME="_adfCMonth";
this._CURRYEAR_ID_ATTR_NAME="_adfCYear";
this._DAY_ID_ATTR_NAME="_adfDay";
this._CHOOSE_MONTH_ID="mSel";
this._CHOOSE_MONTH_ID_ATTR_NAME="_adfChooseMonthId";
this._CHOOSE_YEAR_ID_ATTR_NAME="_adfChooseYearId";
this._YEAR_SPIN_ID="ys";
this._YEAR_SPIN_ID_ATTR_NAME="_adfSpinYearId";
this._NEXT_MONTH_ID="nm";
this._PREV_MONTH_ID="pm";
this._CAL_GRID_ID="cg";
this._HOUR_SPIN_ID="hs";
this._MIN_SPIN_ID="ms";
this._SEC_SPIN_ID="ss";
this._AMPM_ID="ap";
this._TIMEZONE_ID="tz";
this._LEAD_ZERO="_adfLeadingZero";
this._PARENT_ID="par";
this.SELECTED_DATE="selectedDate";
this.TIMEZONE_SEL_DISPLAY="tzSelDisp";
this.TIMEZONE_SEL_ID="tzSelId";
this._SEL_DAY_CLASS="p_AFSelected";
this._DISABLED_STYLE_CLASS="p_AFDisabled";
}
AdfDhtmlChooseDatePeer.prototype.HandleComponentClick= function(x6)
{
 var x7=x6.getNativeEventTarget();
 var x8=x6.getSource();
 if (x6.isLeftButtonPressed())
{
 if (this._isInCalendarGrid(x7))
{
 var x9=this._getGridElement();
 var x10=x9.getAttribute(AdfDhtmlChooseDatePeer._PARENT_ID);
 var x11=x10&&this._isInDialog();
this._selectDateInGrid(x7,x8, !x11);
} else
 {
 var x12=AdfRichUIPeer.CreateSubId(x8.getClientId(),
AdfDhtmlChooseDatePeer._PREV_MONTH_ID);
 if (AdfDomUtils.isAncestorOrSelf(AdfAgent.AGENT.getElementById(x12),x7))
{
this._manipulateMonthValue(x8,false);
 return;
}
 var x13=AdfRichUIPeer.CreateSubId(x8.getClientId(),
AdfDhtmlChooseDatePeer._NEXT_MONTH_ID);
 if (AdfDomUtils.isAncestorOrSelf(AdfAgent.AGENT.getElementById(x13),x7))
{
this._manipulateMonthValue(x8,true);
 return;
}
}}}
AdfDhtmlChooseDatePeer.prototype.HandleComponentKeyDown= function(x14)
{
 var x15=x14.getNativeEvent();
 var x16=AdfAgent.AGENT.getKeyCode(x15);
 var x17=x14.getSource();
 var x18;
 if (x15.ctrlKey)
 return;
 var x19=x14.getNativeEventTarget();
switch(x16)
{
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 case AdfKeyStroke.ARROWRIGHT_KEY:
 case AdfKeyStroke.ARROWLEFT_KEY:
 if (this._isInCalendarGrid(x19))
{
x18=this._handleArrowKeys(x16,x19);
}
break;
 case AdfKeyStroke.ENTER_KEY: if (this._isInCalendarGrid(x19))
{
this._selectDateInGrid(x19,x17,true);
}
x18=true;
break;
}
 if (x18)
{
x14.cancel();
 return false;
}
}
AdfDhtmlChooseDatePeer.prototype.HandleComponentValueChange= function(x20)
{
 var x21=x20.getSource().getClientId();
 var x22=this.getComponent();
 var x23=AdfRichUIPeer.CreateSubId(x22.getClientId(),AdfDhtmlChooseDatePeer._CHOOSE_MONTH_ID);
 if (x21==x23)
{
this._handleMonthChange(x20);
}
 else
 {
 var x24=AdfRichUIPeer.CreateSubId(x22.getClientId(),AdfDhtmlChooseDatePeer._YEAR_SPIN_ID);
 if (x21==x24)
{
this._handleYearChange(x20);
}
}
}
AdfDhtmlChooseDatePeer.prototype.InitDomElement= function(x25,x26)
{
AdfDhtmlChooseDatePeer.superclass.InitDomElement.call(this,x25,x26);
 var x27=AdfRichUIPeer.CreateSubId(x25.getClientId(),AdfDhtmlChooseDatePeer._CHOOSE_MONTH_ID);
x26.setAttribute(AdfDhtmlChooseDatePeer._CHOOSE_MONTH_ID_ATTR_NAME,x27);
 var x28=AdfRichUIPeer.CreateSubId(x25.getClientId(),AdfDhtmlChooseDatePeer._YEAR_SPIN_ID);
x26.setAttribute(AdfDhtmlChooseDatePeer._YEAR_SPIN_ID_ATTR_NAME,x28);
 var x29=[
AdfRichUIPeer.CreateSubId(x25.getClientId(),AdfDhtmlChooseDatePeer._HOUR_SPIN_ID),
AdfRichUIPeer.CreateSubId(x25.getClientId(),AdfDhtmlChooseDatePeer._MIN_SPIN_ID),
AdfRichUIPeer.CreateSubId(x25.getClientId(),AdfDhtmlChooseDatePeer._SEC_SPIN_ID)
];
for(i in x29)
{
 var x30=AdfAgent.AGENT.getElementById(x29[i]);
 if (!x30)
continue;
x30.setAttribute(AdfDhtmlChooseDatePeer._LEAD_ZERO,true);
 var x31=AdfRichUIPeer.CreateSubId(x29[i],AdfDhtmlEditableValuePeer._CONTENT_ID);
 var x32=AdfAgent.AGENT.getElementById(x31);
 var x33=x32.value;
AdfAssert.assertString(x33);
 var x34=parseFloat(x33);
 if (isNaN(x34)||x34>9)
continue;
x33="0" + x34;
 var x35=(x32.tagName=="INPUT");
 if (x35)
{
x32.value=x33;
 if (!AdfPage.PAGE.isScreenReaderMode())
x32.title=x33;
}
 else
 {
AdfAgent.AGENT.setTextContent(x32,x33);
}
}
}
AdfDhtmlChooseDatePeer.prototype._getGridElement= function()
{
 var x36=this.getDomElement();
 var x37=this.getComponent();
 var x38=AdfRichUIPeer.CreateSubId(x37.getClientId(),
AdfDhtmlChooseDatePeer._CAL_GRID_ID);
 return AdfAgent.AGENT.getElementById(x38);
}
AdfDhtmlChooseDatePeer.prototype._getCurrentSelection= function (x39)
{
 var x40=this.getDomElement();
 if (x40.getAttribute(AdfDhtmlChooseDatePeer._CURRDAY_ID_ATTR_NAME))
{
 var x41=this._getGridElement();
 var x42=x41.childNodes[0].childNodes;
for(i=0;i<x42.length;i++)
{
 if (AdfAgent.AGENT.getNodeName(x42[i])=='TR')
{
 var x43=x42[i];
for(j=0;j<x43.childNodes.length;j++)
{
 var x44=x43.childNodes[j];
 if (AdfAgent.AGENT.getNodeName(x44)=='TD'&&
AdfDomUtils.containsCSSClassName(x44,AdfDhtmlChooseDatePeer._SEL_DAY_CLASS))
{
 if (x39)
{
AdfDomUtils.removeCSSClassName(x44,AdfDhtmlChooseDatePeer._SEL_DAY_CLASS);
}
 return x44;
}
}}
}}
 return null;
}
AdfDhtmlChooseDatePeer.prototype._handleArrowKeys= function (x45,x46)
{
 var x47=null;
 var x48;
switch(x45)
{
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 if (x45==AdfKeyStroke.ARROWUP_KEY)
x47=AdfDomUtils.getPreviousElement(x46.parentNode);
 else
 x47=AdfDomUtils.getNextElement(x46.parentNode);
 if (x47)
{
x48=AdfDomUtils.getElementPosition(x46);
x47=AdfDomUtils.getChildElementByPosition(x47,x46.nodeType,x48);
}
break;
 case AdfKeyStroke.ARROWRIGHT_KEY:
x47=AdfDomUtils.getNextElement(x46);
 if (!x47&&x46.parentNode!=null)
{
 var x49=AdfDomUtils.getNextElement(x46.parentNode);
 if (x49)
x47=AdfDomUtils.getFirstChildElement(x49);
}
break;
 case AdfKeyStroke.ARROWLEFT_KEY:
x47=AdfDomUtils.getPreviousElement(x46);
 if (!x47&&x46.parentNode!=null)
{
 var x50=AdfDomUtils.getPreviousElement(x46.parentNode);
 if (x50)
{
x47=AdfDomUtils.getLastChildElement(x50);
}
}
break;
default:
break;
}
 if (x47&&this._isInCalendarGrid(x47))
{
 if (x46)
x46.setAttribute("tabIndex","-1");
x47.setAttribute("tabIndex","0");
AdfFocusUtils.focusElement(x47);
 return true;
}
 return false;
}
AdfDhtmlChooseDatePeer.prototype._handleMonthChange= function(x51)
{
 var x52=x51.getSource();
 if (x52._ignoreVCE)
{
 delete x52._ignoreVCE;
 return;
}
 var x53=x52.getClientId();
 var x54=x53.substring(0,x53.lastIndexOf("::"));
 var x55=AdfPage.PAGE.findComponent(x54);
 var x56=x55.getPeer();
x56.bind(x55);
 var x57=x56._getGridElement();
 var x58=parseInt(x57.getAttribute(AdfDhtmlChooseDatePeer._CURRYEAR_ID_ATTR_NAME));
x56._queueEvent(x55,parseInt(x52.getValue()),x58);
}
AdfDhtmlChooseDatePeer.prototype._handleYearChange= function(x59)
{
 var x60=x59.getSource();
 if (x60._ignoreVCE)
{
 delete x60._ignoreVCE;
 return;
}
 var x61=x60.getClientId();
 var x62=x61.substring(0,x61.lastIndexOf("::"));
 var x63=AdfPage.PAGE.findComponent(x62);
 var x64=x63.getPeer();
x64.bind(x63);
 var x65=x64._getGridElement();
 var x66=parseInt(x65.getAttribute(AdfDhtmlChooseDatePeer._CURRMONTH_ID_ATTR_NAME));
x64._queueEvent(x63,x66,parseInt(x60.getValue()));
}
AdfDhtmlChooseDatePeer.prototype._isInDialog= function ()
{
 return (this.getComponent().getParent() instanceof AdfRichDialog);
}
AdfDhtmlChooseDatePeer.prototype._isInCalendarGrid= function (x67)
{
 if (x67)
{
 if (AdfAgent.AGENT.getNodeName(x67)=="TD")
{
 var x68=parseInt(AdfAgent.AGENT.getTextContent(x67));
 if (!isNaN(x68))
 return true;
}
}
 return false;
}
AdfDhtmlChooseDatePeer.prototype._getSelectedDateTime= function (x69)
{
 var x70=this.getComponent();
 var x71,x72,x73;
 var x74,x75,x76;
 var x77=this._getGridElement();
 if (x77.getAttribute(AdfDhtmlChooseDatePeer._CURRMONTH_ID_ATTR_NAME))
{
x72=parseInt(x77.getAttribute(AdfDhtmlChooseDatePeer._CURRMONTH_ID_ATTR_NAME));
x73=parseInt(x77.getAttribute(AdfDhtmlChooseDatePeer._CURRYEAR_ID_ATTR_NAME));
 var x78;
 if (x69)
{
x71=parseInt(AdfAgent.AGENT.getTextContent(x69));
x78=x69.getAttribute(AdfDhtmlChooseDatePeer._DAY_ID_ATTR_NAME);
}
 else
 {
 var x79=this._getCurrentSelection(false);
 if (x79)
{
x71=parseInt(AdfAgent.AGENT.getTextContent(x79));
x78=x79.getAttribute(AdfDhtmlChooseDatePeer._DAY_ID_ATTR_NAME);
}
}
 if (x78)
{
 if (x78==AdfDhtmlChooseDatePeer._PREV_MONTH_ID)
{
x72--;
 if (x72== -1)
{
x72=11;
x73--;
}
}
 else if (x78==AdfDhtmlChooseDatePeer._NEXT_MONTH_ID)
{
x72++;
 if (x72==12)
{
x72=0;
x73++;
}
}
}}
 var x80=AdfRichUIPeer.CreateSubId(x70.getClientId(),
AdfDhtmlChooseDatePeer._HOUR_SPIN_ID);
 var x81=AdfPage.PAGE.findComponent(x80);
 if (x81)
{
x74=x81.getValue();
 var x82=AdfPage.PAGE.findComponent(AdfRichUIPeer.CreateSubId(x70.getClientId(),
AdfDhtmlChooseDatePeer._MIN_SPIN_ID));
x75=x82.getValue();
 var x83=AdfPage.PAGE.findComponent(AdfRichUIPeer.CreateSubId(x70.getClientId(),
AdfDhtmlChooseDatePeer._SEC_SPIN_ID));
x76=x83.getValue();
 var x84=AdfPage.PAGE.findComponent(AdfRichUIPeer.CreateSubId(x70.getClientId(),
AdfDhtmlChooseDatePeer._AMPM_ID));
 if (x84)
{
 var x85=x84.getValue();
 if (x74==12)
{
 if (x85=="0")
x74=0;
}
 else if (x85=="1")
{
x74=(+x74) + 12;
}
}
}
 var x86;
 if (x73!=undefined&&x72!=undefined&&x71!=undefined)
{
 if (x74!=undefined&&x75!=undefined&&x76!=undefined)
x86= new Date(x73,x72,x71,x74,x75,x76);
 else
 x86= new Date(x73,x72,x71);
x86.setFullYear(x73);
}
 else
 {
x86=null;
}
 var x87=AdfRichUIPeer.CreateSubId(x70.getClientId(),
AdfDhtmlChooseDatePeer._TIMEZONE_ID);
 var x88=AdfPage.PAGE.findComponent(x87);
 if (x88)
{
 var x89=x88.getPeer();
x89.bind(x88);
 var x90=x89.getDomElement();
 var x91=AdfDhtmlEditableValuePeer.GetContentNode(x88,x90);
 var x92=x91.value;
 var x93=AdfAgent.AGENT.getTextContent(x91.options[x91.selectedIndex]);
AdfDhtmlInputChooseBindingUtils.updateInputComponentProperty(x70,
null,
AdfDhtmlChooseDatePeer.TIMEZONE_SEL_DISPLAY,
x93);
AdfDhtmlInputChooseBindingUtils.updateInputComponentProperty(x70,
null,
AdfDhtmlChooseDatePeer.TIMEZONE_SEL_ID,
x92);
}
 return (x86);
}
AdfDhtmlChooseDatePeer.prototype._manipulateMonthValue= function (x94,x95)
{
 var x96=this._getGridElement();
 var x97=parseInt(x96.getAttribute(AdfDhtmlChooseDatePeer._CURRMONTH_ID_ATTR_NAME));
 var x98=parseInt(x96.getAttribute(AdfDhtmlChooseDatePeer._CURRYEAR_ID_ATTR_NAME));
 if (x95)
x97++;
 else
 x97--;
 var x99=AdfRichUIPeer.CreateSubId(x94.getClientId(),AdfDhtmlChooseDatePeer._CHOOSE_MONTH_ID);
 var x100=AdfPage.PAGE.findComponent(x99);
 var x101=0;
 if (x97<0)
{
x97+=12;
x101= -1;
}
 else if (x97>11)
{
x97-=12;
x101=1;
}
 if (x101)
{
x98=x98 + x101;
 var x102=AdfRichUIPeer.CreateSubId(x94.getClientId(),AdfDhtmlChooseDatePeer._YEAR_SPIN_ID);
 var x103=AdfPage.PAGE.findComponent(x102);
 var x104=x103.getMaximum();
 var x105=x103.getMinimum();
 if (x105&&(x98<x105))
 return;
 if (x104&&(x98>x104))
 return;
x103._ignoreVCE=true;
x103.setProperty("value","" + x98);
}
x100._ignoreVCE=true;
x100.setProperty("value","" + ((x97 + 12)%12));
this._queueEvent(x94,x97,x98);
 return;
}
AdfDhtmlChooseDatePeer.prototype._queueEvent= function(
x106,
x107,
x108)
{
 var x109= new Object();
x109.month=x107;
x109.year=x108;
 new AdfContentFetchEvent(x106,AdfContentFetchEvent.FETCH_EVENT_TYPE,x109).queue();
}
AdfDhtmlChooseDatePeer.prototype._selectDateInGrid= function (x110,x111,x112)
{
 var x113=this.getDomElement();
 var x114=parseInt(AdfAgent.AGENT.getTextContent(x110));
 if (AdfDomUtils.containsCSSClassName(x110,AdfDhtmlChooseDatePeer._DISABLED_STYLE_CLASS))
 return;
this._getCurrentSelection(true);
AdfDomUtils.addCSSClassName(x110,AdfDhtmlChooseDatePeer._SEL_DAY_CLASS);
x113.setAttribute(AdfDhtmlChooseDatePeer._CURRDAY_ID_ATTR_NAME,x114);
 if (x112==true)
this.submitValueToInput(x110,x111);
}

AdfUIComponents.createComponentClass("AdfRichInputText",
{
componentType:"oracle.adf.RichInputText",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"editable",type:"String","default":"inherit"}
,{name:"autoTab",type:"Boolean","default":false}
,{name:"columns",type:"Number"}
,{name:"dimensionsFrom",type:"String","default":"content"}
,{name:"inlineStyle",type:"String"}
,{name:"maximumLength",type:"Number"}
,{name:"autoComplete",type:"String"}
,{name:"rows",type:"Number","default":1}
,{name:"secret",type:"Boolean","default":false,secured:true}
,{name:"styleClass",type:"String"}
,{name:"wrap",type:"String"}
],
superclass:AdfUIInput
});

AdfRichUIPeer.createPeerClass(AdfDhtmlInputBasePeer,"AdfDhtmlInputTextPeer");
AdfDhtmlInputTextPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichInputText);
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfRichInputText.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.KEY_PRESS_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichInputText.LABEL);
}
AdfDhtmlInputTextPeer.prototype.replaceTextSelection= function(x0)
{
 var x1=this.getComponent();
 if (this.WasSubmitted(x1))
{
 var x2=AdfDhtmlEditableValuePeer.GetContentNode(x1);
AdfEditingAgent.getInstance().insertHtmlAtSelection(x2,x0);
this.RunValidation(x1,x2);
}
}
AdfDhtmlInputTextPeer.prototype.needsResizeNotify= function(x3)
{
 var x4=AdfAgent.AGENT;
 var x5=x4.getPlatform()==AdfAgent.IE_PLATFORM;
 var x6=x4.getVersion();
 return (x5&&x6<8&&AdfDomUtils.containsCSSClassName(AdfRichUIPeer.getDomNodeForComponent(x3),"p_AFStretched"));
}
AdfDhtmlInputTextPeer.prototype.resizeNotify= function(
x7,
x8,
x9,
x10,
x11
)
{
 var x12=AdfAgent.AGENT;
 var x13=AdfDhtmlEditableValuePeer.GetContentNode(x7);
x12.setOuterWidth(x13,x10);
x12.setOuterHeight(x13,x11);
}
AdfDhtmlInputTextPeer.prototype.SetDisplayValue= function(
x14,
x15,
x16)
{
AdfAssert.assertString(x16);
 var x17=AdfDhtmlEditableValuePeer.GetContentNode(x14);
 if (x14.getReadOnly())
{
 if ((x14.getRows()>1)||(this.IsSecret(x14)!=true))
{
AdfAgent.AGENT.setTextContent(x17,x16);
}
}
 else
 {
 if (!(x14.getRows()>1)&& !this.IsSecret(x14))
x17.title=x16;
x17.value=x16;
}
}
AdfDhtmlInputTextPeer.prototype.IsSecret= function(
x18
)
{
 var x19=AdfDhtmlEditableValuePeer.GetContentNode(x18);
 if(x19.type=="password")
{
 return true;
}
 else
 {
 return false;
}
}
AdfDhtmlInputTextPeer.prototype.HandleComponentKeyPress= function(x20)
{
 if(x20.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x21=this.getComponent();
 var x22=x20.getNativeEventTarget();
 var x23=x20.getNativeEvent();
 var x24=AdfAgent.AGENT.getKeyCode(x23);
 if (x22.tagName=="TEXTAREA")
{
 if (this._checkLength(x21,x22))
{
 var x25=x23.keyCode;
 var x26=x23.charCode;
 if (x25==0||x25==13||x26==undefined||x25==x26){
 if (!x23.ctrlKey){
 var x27=true;
 if (x22.selectionStart!=null)
{
x27=(x22.selectionStart==x22.selectionEnd);
}
 else if (document.selection)
{
 var x28=document.selection.createRange();
x27=(x28.text=="");
}
 if (x27)
x20.cancel();
}
}
}
}
 else
 {
 if (x24==AdfKeyStroke.ENTER_KEY)
{
this.RunValidation(x21,x22);
}
}
this._nodeLength=(x22.value)?x22.value.length:0;
}
}
AdfDhtmlInputTextPeer.prototype.HandleComponentKeyUp= function(x29)
{
 if(x29.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x30=AdfAgent.AGENT.getKeyCode(x29.getNativeEvent());
 var x31=this.getComponent();
 var x32=x29.getNativeEventTarget();
 if (x30!=9)
this.AutoTab(x31,x32);
 delete this._nodeLength;
this._checkLength(x31,x32);
}
}
AdfDhtmlInputTextPeer.prototype.AutoTab= function(
x33,
x34)
{
 if(x33.getAutoTab&&x33.getAutoTab())
{
 var x35=x33.getMaximumLength();
 if (x35<1)
 return;
 var x36=(x34.value)?x34.value.length:0;
 if (x36>=x35&&x36>this._nodeLength)
{
AdfFocusUtils.focusNextTabStop(x34);
}
}
}
AdfDhtmlInputTextPeer.prototype.GetInlineEditor= function(x37)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlInputTextPeer.prototype._checkLength= function(
x38,
x39)
{
 if (x38&&x38.getMaximumLength)
{
 var x40=x38.getMaximumLength();
 if (x40<1)
 return false;
 var x41=(x39.value)?x39.value.length:0;
 if (x41>=x40)
{
 if (x41>x40)
x39.value=x39.value.substr(0,x40);
 return true;
}
}
 return false;
}

AdfUIComponents.createComponentClass("AdfRichInputDate",
{
componentType:"oracle.adf.RichInputDate",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"maxValue",type:"Date",secured:true}
,{name:"minValue",type:"Date",secured:true}
,{name:"disabledDays",type:"Object",secured:true}
,{name:"disabledDaysOfWeek",type:"Object",secured:true}
,{name:"disabledMonths",type:"Object",secured:true}
,{name:"editable",type:"String","default":"inherit"}
,{name:"chooseId",type:"String",secured:true}
,{name:"autoComplete",type:"String"}
,{name:"columns",type:"Number"}
],
superclass:AdfUISelectInput
});

AdfRichInputDate.InitSubclass= function()
{
AdfUIComponent.SetPropertyType(AdfRichInputDate,"value","Date");
}

AdfRichUIPeer.createPeerClass(AdfDhtmlInputBasePeer,"AdfDhtmlInputDatePeer");
AdfDhtmlInputDatePeer.prototype.handleReturnFromChooseComponent= function(
x0,x1)
{
 if (x1)
this._hidePopup(x0);
 var x2=AdfDhtmlEditableValuePeer.GetContentNode(x0);
AdfFocusUtils.focusElement(x2);
 var x3=this.getDomElement();
AdfAgent.AGENT.setExpandoProperty(x3,AdfDhtmlInputDatePeer._UPDATE_FROM_CHOOSEDATE_ATTR,"t");
this.Validate(x0);
AdfAgent.AGENT.setExpandoProperty(x3,AdfDhtmlInputDatePeer._UPDATE_FROM_CHOOSEDATE_ATTR,null);
this._returnedFromChooseComponent=1;
}
AdfDhtmlInputDatePeer.prototype.handleUpdateFromChooseComponent= function(
x4,
x5,
x6)
{
 if(x5==AdfUIValue.VALUE)
{
 var x7=this.getConvertedObject(x4,x6);
this.SetDisplayValue(x4,null,x7);
}
 else if (x5==AdfDhtmlChooseDatePeer.TIMEZONE_SEL_DISPLAY)
{
 var x8=AdfRichUIPeer.CreateSubId(x4.getClientId(),
AdfDhtmlInputDatePeer._TIMEZONE_DISPNAME_ID);
 var x9=AdfAgent.AGENT.getElementById(x8);
AdfAgent.AGENT.setTextContent(x9,x6);
}
 else if (x5==AdfDhtmlChooseDatePeer.TIMEZONE_SEL_ID)
{
 var x10=AdfRichUIPeer.CreateSubId(x4.getClientId(),
AdfDhtmlInputDatePeer._TIMEZONE_DISPID_ID);
 var x11=AdfAgent.AGENT.getElementById(x10);
x11.value=x6;
}
}
AdfDhtmlInputDatePeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfUIValue);
AdfObject.ensureClassInitialization(AdfRichChooseDate);
AdfObject.ensureClassInitialization(AdfRichInputDate);
AdfObject.ensureClassInitialization(AdfRichPopup);
AdfObject.ensureClassInitialization(AdfDhtmlChooseDatePeer);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfDialogEvent.EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfValueChangeEvent.VALUE_CHANGE_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfUIValue.VALUE);
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichInputDate.MIN_VALUE);
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichInputDate.MAX_VALUE);
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichInputDate.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichInputDate.LABEL);
this._CHILD_EXPANDO="child";
this._GLYPH_ID="glyph";
this._CHOOSEDATE_ID="cd";
this._POPUP_ID="pop";
this._TIMEZONE_ID="tz";
this._TIMEZONE_DISPNAME_ID="tzDispName";
this._TIMEZONE_DISPID_ID="tzDispId";
this._UPDATE_FROM_CHOOSEDATE_ATTR="ufc";
this._MIN_ATTR="_adfmin";
this._MAX_ATTR="_adfmax";
this._MIN_ISO_ATTR="_adfmnis";
this._MAX_ISO_ATTR="_adfmxis";
}
AdfDhtmlInputDatePeer.prototype.ComponentValueChanged= function(
x12,
x13,
x14,
x15)
{
AdfDhtmlInputDatePeer.superclass.ComponentValueChanged.call(this,
x12,x13,x14,x15);
 if (this._isChooserSuppressed())
{
 var x16=x12.getProperty(AdfRichInputDate.CHOOSE_ID);
 var x17=this.getDomElement();
 var x18=AdfAgent.AGENT.getExpandoProperty(x17,AdfDhtmlInputDatePeer._UPDATE_FROM_CHOOSEDATE_ATTR);
 if(x16!=null&& !x18)
{
AdfDhtmlInputChooseBindingUtils.updateChooseComponentProperty(x12,
x16,AdfUIValue.VALUE,AdfDhtmlChooseDatePeer.SELECTED_DATE);
}
}
}
AdfDhtmlInputDatePeer.prototype.HandleComponentClick= function(
x19)
{
AdfDhtmlInputDatePeer.superclass.HandleComponentClick.call(this,x19);
 var x20=x19.getSource();
 var x21=x19.getNativeEvent();
 var x22=AdfAgent.AGENT.getEventTarget(x21);
 var x23=AdfRichUIPeer.CreateSubId(
x20.getClientId(),AdfDhtmlInputDatePeer._GLYPH_ID);
 var x24=x19.getCurrentTarget();
 if(x24!=x20)
{
 return;
}
 if (this._isGlyphElement(x22,x23))
{
 var x25=this._getPopup(x24);
 if (x25!=null)
{
 if(!x25.isPopupVisible())
{
this.HideNoteWindow();
x25.show({align:AdfRichPopup.ALIGN_AFTER_START,alignId:x23,
focus:true});
}
 else
 {
x25.hide();
}
}
x19.cancel();
}
}
AdfDhtmlInputDatePeer.prototype.HandleComponentDialog= function(
x26)
{
 var x27=this.getComponent();
 var x28=x26.getOutcome();
 if(x28==AdfDialogEvent.OUTCOME_OK)
{
 var x29=this._getRuntimeChooseDateId(x27);
 var x30=AdfPage.PAGE.findComponent(x29);
 var x31=x30.getPeer();
x31.bind(x30);
x31.submitValueToInput(null,x30);
x26.cancel();
}
 else if (x28==AdfDialogEvent.OUTCOME_CANCEL)
{
this._hidePopup(x27);
 var x32=this._getGlyph(x27);
 if (x32!=null)
AdfFocusUtils.focusElement(x32);
x26.cancel();
}
}
AdfDhtmlInputDatePeer.prototype.HandleComponentFocus= function(x33)
{
AdfDhtmlInputDatePeer.superclass.HandleComponentFocus.call(this,x33);
 var x34=this.getComponent();
 var x35=AdfDhtmlInputChooseBindingUtils.getChooseId(x34);
 if (x35!=null)
{
AdfDhtmlInputChooseBindingUtils.registerBinding(true,x35,
x34.getClientId());
}
}
AdfDhtmlInputDatePeer.prototype.HandleComponentKeyDown= function(x36)
{
 var x37=x36.getNativeEvent();
 var x38=AdfAgent.AGENT.getEventTarget(x37);
 var x39=AdfAgent.AGENT.getKeyCode(x37);
 var x40=false;
 var x41=this.getComponent();
switch(x39)
{
 case AdfKeyStroke.ESC_KEY: var x42=this._getPopup(x41);
 if (x42!=null)
{
 if(x42.isPopupVisible())
{
this._hidePopup(x41);
 var x43=this._getGlyph(x41);
 if (x43!=null)
AdfFocusUtils.focusElement(x43);
x40=true;
}
}
break;
 case AdfKeyStroke.ENTER_KEY:
this.RunValidation(x41,x36.getNativeEventTarget());
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
 var x42=this._getPopup(x41);
 if (x42!=null&& !x42.isPopupVisible())
{
 var x44=AdfRichUIPeer.CreateSubId(
x41.getClientId(),AdfDhtmlInputDatePeer._GLYPH_ID);
 if (this._isGlyphElement(x38,x44))
{
this.HideNoteWindow();
x42.show({align:AdfRichPopup.ALIGN_AFTER_END,alignId:x44,focus:true});
x40=true;
}
}break;
}
 if (x40)
x36.cancel();
}
AdfDhtmlInputDatePeer.prototype.LazyInitialize= function(x45,x46)
{
AdfDhtmlInputDatePeer.superclass.LazyInitialize.call(this,x45,x46);
this._createClientSideValidators(x45,x46);
}
AdfDhtmlInputDatePeer.prototype.HandleComponentValueChange= function(x47)
{
 var x48=x47.getSource().getClientId();
 var x49=this.getComponent();
 if (!(this._isChooserSuppressed()))
 return;
 var x50=AdfRichUIPeer.CreateSubId(x49.getClientId(),
AdfDhtmlInputDatePeer._TIMEZONE_ID);
 if (x48==x50)
{
 var x51=AdfPage.PAGE.findComponent(x50);
 var x52=x51.getPeer().getDomElement();
 var x53=AdfDhtmlEditableValuePeer.GetContentNode(x51,x52);
 var x54=AdfRichUIPeer.CreateSubId(x49.getClientId(),
AdfDhtmlInputDatePeer._TIMEZONE_DISPID_ID);
 var x55=AdfAgent.AGENT.getElementById(x54);
x55.value=x53.value;
}
}
AdfDhtmlInputDatePeer.prototype.InitDomElement= function(x56,x57)
{
AdfDhtmlInputDatePeer.superclass.InitDomElement.call(this,x56,
x57);
 return AdfPage.PAGE.scheduleTimer(this,this._hookUpChooseDate,x56.getClientId(),0);
}
AdfDhtmlInputDatePeer.prototype.IsSecret= function(x58)
{
 return false;
}
AdfDhtmlInputDatePeer.prototype.SetDisplayValue= function(
x59,
x60,
x61)
{
AdfAssert.assertString(x61);
 var x62=AdfDhtmlEditableValuePeer.GetContentNode(x59,x60);
 var x63=AdfAgent.AGENT.getNodeName(x62);
 var x64=(x63=="INPUT");
 if (x59.getReadOnly())
{
AdfAgent.AGENT.setTextContent(x62,x61);
}
 else
 {
x62.title=x61;
 if(x64)
x62.value=x61;
 else
 AdfAgent.AGENT.setTextContent(x62,x61);
}
}
AdfDhtmlInputDatePeer.prototype.VetoShowNoteWindow= function(x65)
{
 if (this._isPopupVisible(x65))
 return true;
 if (!this._isChooserSuppressed())
{
 var x66=AdfDhtmlEditableValuePeer.GetContentNode(x65);
 if (AdfPage.PAGE.getActiveDomElement()!=x66)
 return true;
}
 return AdfDhtmlInputDatePeer.superclass.VetoShowNoteWindow.call(this);
}
AdfDhtmlInputDatePeer.prototype.GetComponentMinValue= function (x67,x68)
{
 var x69=AdfDhtmlEditableValuePeer.GetContentNode(x67);
 var x70=AdfAgent.AGENT.getAttribute(x69,AdfDhtmlInputDatePeer._MIN_ISO_ATTR, -1);
 if (x70)
 return AdfDhtmlInputDatePeer.ISO_STANDARD_CONVERTER.getAsObject(x70);
 return null;
}
AdfDhtmlInputDatePeer.prototype.GetComponentMaxValue= function (x71,x72)
{
 var x73=AdfDhtmlEditableValuePeer.GetContentNode(x71);
 var x74=AdfAgent.AGENT.getAttribute(x73,AdfDhtmlInputDatePeer._MAX_ISO_ATTR, -1);
 if (x74)
 return AdfDhtmlInputDatePeer.ISO_STANDARD_CONVERTER.getAsObject(x74);
 return null;
}
AdfDhtmlInputDatePeer.prototype.GetInlineEditor= function(x75)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlInputDatePeer.prototype.__trace= function(x76)
{
AdfLogger.LOGGER.severe("InputDatePeer: " + x76);
}
AdfDhtmlInputDatePeer.prototype._createClientSideValidators= function(x77,x78)
{
AdfAssert.assertDomElement(x78);
 var x79=AdfDhtmlEditableValuePeer.GetContentNode(x77);
 var x80=AdfAgent.AGENT.getAttribute(x79,AdfDhtmlInputDatePeer._MIN_ATTR, -1);
 var x81=AdfAgent.AGENT.getAttribute(x79,AdfDhtmlInputDatePeer._MAX_ATTR, -1);
 var x82=x77.getDisabledMonths();
 var x83=x77.getDisabledDaysOfWeek();
 if (x80||x81)
{
 var x84=this.GetComponentMinValue(x77,x78);
 var x85=this.GetComponentMaxValue(x77,x78);
 var x86= new TrDateTimeRangeValidator(x81,x80,null,x85,x84);
x77.addValidator(x86);
}
 if (x83||x82)
{
 var x87= new TrDateRestrictionValidator(x83,x82,null);
x77.addValidator(x87);
}
}
AdfDhtmlInputDatePeer.prototype._getGlyph= function (x88)
{
 var x89=AdfRichUIPeer.CreateSubId(
x88.getClientId(),AdfDhtmlInputDatePeer._GLYPH_ID);
 var x90=AdfAgent.AGENT.getElementById(x89);
 return x90;
}
AdfDhtmlInputDatePeer.prototype._getPopup= function(x91)
{
 var x92=this._getPopupId(x91);
 var x93=AdfPage.PAGE.findComponent(x92);
 return x93;
}
AdfDhtmlInputDatePeer.prototype._getPopupId= function(x94)
{
 return AdfRichUIPeer.CreateSubId(x94.getClientId(),
AdfDhtmlInputDatePeer._POPUP_ID);
}
AdfDhtmlInputDatePeer.prototype._getRuntimeChooseDateId= function(x95)
{
 var x96=AdfDhtmlEditableValuePeer.GetContentNode(x95);
 var x97=AdfDhtmlInputChooseBindingUtils.getChooseId(x95,
AdfRichInputDate.CHOOSE_ID);
 if(x97==null)
{
 var x98=AdfRichUIPeer.CreateSubId(x95.getClientId(),AdfDhtmlInputDatePeer._POPUP_ID);
 var x99=AdfRichUIPeer.CreateSubId;
 var x100=x99(x95.getClientId(),
AdfDhtmlInputDatePeer._POPUP_ID);
 var x101=x96.getAttribute(AdfDhtmlInputDatePeer._CHILD_EXPANDO);
 if (x101)
x100=x99(x100,x101);
 return x99(x100,AdfDhtmlInputDatePeer._CHOOSEDATE_ID);
}
 return x97;
}
AdfDhtmlInputDatePeer.prototype._hidePopup= function(x102)
{
 var x103=this._getPopup(x102);
 if (x103!=null&&x103.isPopupVisible())
x103.hide();
}
AdfDhtmlInputDatePeer.prototype._hookUpChooseDate= function(x104)
{
 var x105=AdfPage.PAGE.findComponent(x104);
 var x106=this._getRuntimeChooseDateId(x105);
 if(x106!=null)
{
AdfDhtmlInputChooseBindingUtils.registerBinding(true,
x106,x105.getClientId());
}
}
AdfDhtmlInputDatePeer.prototype._isChooserSuppressed= function()
{
 var x107=AdfDhtmlEditableValuePeer.GetContentNode(this.getComponent());
 var x108=x107.getAttribute(AdfDhtmlInputDatePeer._CHILD_EXPANDO);
 return (x108=="0");
}
AdfDhtmlInputDatePeer.prototype._isGlyphElement= function(
x109,
x110)
{
 var x111=AdfAgent.AGENT.getElementById(x110);
 if(x111==null)
{
 return false;
}
 if(x109==x111)
{
 return true;
}
 else if(x109==x111.getElementsByTagName("img")[0])
{
 return true;
}
 return false;
}
AdfDhtmlInputDatePeer.prototype._isPopupVisible= function(x112)
{
 var x113=this._getPopup(x112);
 if (x113!=null&&x113.isPopupVisible())
 return true;
 return false;
}
AdfDhtmlInputDatePeer.ISO_STANDARD_CONVERTER= new
TrDateTimeConverter("yyyy-MM-dd HH:mm:ss",null,null,null,null);
AdfUIComponents.createComponentClass("AdfRichInputNumberSpinbox",
{
componentType:"oracle.adf.RichInputNumberSpinbox",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"editable",type:"String","default":"inherit"}
,{name:"columns",type:"Number"}
,{name:"maximum",type:"Object",secured:true}
,{name:"minimum",type:"Object",secured:true}
,{name:"stepSize",type:"Object","default":1,secured:true}
],
superclass:AdfUIInput
});

AdfRichInputNumberSpinbox.InitSubclass= function()
{
AdfUIComponent.SetPropertyType(AdfRichInputNumberSpinbox,"value","Number");
}

AdfRichUIPeer.createPeerClass(AdfDhtmlInputBasePeer,"AdfDhtmlInputNumberSpinboxBasePeer");
AdfDhtmlInputNumberSpinboxBasePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfRichInputNumberSpinbox.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichInputNumberSpinbox.LABEL);
this._LEAD_ZERO="_adfLeadingZero";
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype.getLeadingZero= function()
{
 return this.getDomElement().getAttribute(AdfDhtmlInputNumberSpinboxBasePeer._LEAD_ZERO);
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype.SetDisplayValue= function(
x0,
x1,
x2)
{
AdfAssert.assertString(x2);
 var x3=this.getLeadingZero();
 if(x3)
{
 var x4=parseFloat(x2);
 if(!isNaN(x4)&&x4<10)
x2="0"+""+x4;
}
 var x5=AdfDhtmlEditableValuePeer.GetContentNode(x0);
 var x6=x5.tagName;
 var x7=(x6=="INPUT");
 if(x7)
{
x5.value=x2;
 if (!AdfPage.PAGE.isScreenReaderMode())
x5.title=x2;
}
 else
 {
AdfAgent.AGENT.setTextContent(x5,x2);
}
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype.LazyInitialize= function(x8,x9)
{
AdfDhtmlInputNumberSpinboxBasePeer.superclass.LazyInitialize.call(this,x8,x9);
 if (!this._isScreenReaderSlider(x8))
{
this._createClientSideValidator(x8,x9);
}
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype.ShouldShowHint= function(x10,x11)
{
 if (this._isScreenReaderSlider(x10))
{
 return true;
}
 return false;
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype.GetValidatorHints= function(x12)
{
 if (this._isScreenReaderSlider(x12))
{
 return AdfDhtmlInputNumberSpinboxBasePeer.superclass.GetValidatorHints(x12);
}
 return null;
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype._createClientSideValidator= function(x13,x14)
{
AdfAssert.assertDomElement(x14);
 var x15=x13.getMinimum();
 var x16=x13.getMaximum();
 var x17= new TrRangeValidator(x16,x15,null);
x13.addValidator(x17);
}
AdfDhtmlInputNumberSpinboxBasePeer.prototype._isScreenReaderSlider= function(x18)
{
 if (AdfPage.PAGE.isScreenReaderMode()&&
(x18.getParent().getPeer().getTypeName()=="AdfDhtmlInputNumberSliderPeer"
||x18.getParent().getPeer().getTypeName()=="AdfDhtmlInputRangeSliderPeer"))
{
 return true;
}
 return false;
}
AdfRichUIPeer.createPeerClass(AdfDhtmlInputNumberSpinboxBasePeer,"AdfDhtmlInputNumberSpinboxPeer");
AdfDhtmlInputNumberSpinboxPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichInputNumberSpinbox);
AdfRichUIPeer.addComponentEventHandlers(
this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,
AdfRichInputNumberSpinbox.DISABLED);
this._currentSpinMode=null;
this._timerId=null;
this._INC="increment";
this._DEC="decrement";
this._INC_ID="_adfInc";
this._DEC_ID="_adfDec";
}
AdfDhtmlInputNumberSpinboxPeer.prototype.GetStepSize= function(
x0)
{
 return x0.getStepSize();
}
AdfDhtmlInputNumberSpinboxPeer.prototype.InitDomElement= function(x1,x2)
{
AdfDhtmlInputNumberSpinboxPeer.superclass.InitDomElement.call(this,x1,x2);
 var x3=AdfDhtmlEditableValuePeer.GetContentNode(x1,x2);
 var x4=x1.getClientId();
 var x5=AdfRichUIPeer.CreateSubId(x4,AdfDhtmlInputNumberSpinboxPeer._INC);
 var x6=AdfRichUIPeer.CreateSubId(x4,AdfDhtmlInputNumberSpinboxPeer._DEC);
x2.setAttribute(AdfDhtmlInputNumberSpinboxPeer._INC_ID,x5);
x2.setAttribute(AdfDhtmlInputNumberSpinboxPeer._DEC_ID,x6);
 if(!x1.getReadOnly()&& !x1.getDisabled())
{
 var x7=AdfUIUtils.trim(x3.value);
 if (x7!="")
{
 var x8=x1.getConverter();
 if(x8)
{
try{
 var x9=x8.getAsObject(x7,null);
 if (x9===undefined)
x9=x7;
x7=parseFloat(x9);
}
catch(e)
{
}
}
 else
 {
x7=parseFloat(x7);
}
 var x10=this._getMin(x1);
 var x11=this._getMax(x1);
this._updateButtons(x2,x7>=x11,x7<=x10);
}
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.HandleComponentMouseOut= function(
x12)
{
 if(this.getComponent().getDisabled())
 return;
 var x13=this._getAnchor(AdfAgent.AGENT.getEventTarget(x12.getNativeEvent()));
 if(this._isActionButton(x13))
{
self.clearInterval(this._timerId);
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.HandleComponentMouseDown= function(
x14)
{
 if(this.getComponent().getDisabled())
 return;
 var x15=this._getAnchor(AdfAgent.AGENT.getEventTarget(x14.getNativeEvent()));
 var x16=this._isActionButton(x15);
 if(x16)
{
 var x17=this.getDomElement();
this._currentSpinMode=x16;
 var x18=self.setInterval(this.createCallback(this._initRepeat),1000);
this._timerId=x18;
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.HandleComponentClick= function(
x19)
{
 var x20=this.getComponent();
 if(x20.getDisabled())
 return;
AdfDhtmlInputNumberSpinboxPeer.superclass.HandleComponentClick.call(this,x19);
 var x21=this._getAnchor(AdfAgent.AGENT.getEventTarget(x19.getNativeEvent()));
 var x22=this._isActionButton(x21);
 if(x22)
{
 if(x22=="inc")
this._manipulateValue(true);
 else if(x22=="dec")
this._manipulateValue(false);
 var x23=AdfDhtmlEditableValuePeer.GetContentNode(x20);
this.RunValidation(x20,x23);
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.HandleComponentBlur= function(x24)
{
AdfDhtmlInputNumberSpinboxPeer.superclass.HandleComponentBlur.call(this,x24);
 var x25=this.getComponent();
 var x26=this._getSpinboxValue(x25);
 if (isNaN(x26))
{
this._updateButtons(null,true,true);
}
 else if (x26==null)
{
this._updateButtons(null,false,false);
}
 else
 {
 var x27=this._getMax(x25);
 var x28=this._getMin(x25);
this._updateButtons(null,x26>=x27,x26<=x28);
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.HandleComponentMouseUp= function(
x29)
{
 if(this.getComponent().getDisabled())
 return;
 var x30=this._getAnchor(AdfAgent.AGENT.getEventTarget(x29.getNativeEvent()));
 if(this._isActionButton(x30))
{
self.clearInterval(this._timerId);
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.HandleComponentKeyDown= function(x31)
{
 var x32=AdfAgent.AGENT.getKeyCode(x31.getNativeEvent());
 var x33=this.getComponent();
switch(x32)
{
 case AdfKeyStroke.ENTER_KEY:
this.RunValidation(x33,x31.getNativeEventTarget());
break;
 case AdfKeyStroke.ARROWUP_KEY:
this._manipulateValue(true);
this.RunValidation(x33,x31.getNativeEventTarget());
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
this._manipulateValue(false);
this.RunValidation(x33,x31.getNativeEventTarget());
break;
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype.GetInlineEditor= function(x34)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlInputNumberSpinboxPeer.prototype.ComponentDisabledChanged= function(
x35,
x36,
x37,
x38)
{
 var x39=AdfDhtmlEditableValuePeer.GetContentNode(x35,x36);
 if (x37==true)
{
AdfDomUtils.addCSSClassName(x36,AdfRichUIPeer.DISABLED_STYLECLASS);
x39.setAttribute("disabled","true");
this._updateButtons(null,true,true);
}
 else
 {
AdfDomUtils.removeCSSClassName(x36,AdfRichUIPeer.DISABLED_STYLECLASS);
this._updateButtons(null,false,false);
x39.removeAttribute("disabled");
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype._initRepeat= function()
{
this.focus(this.getComponent());
self.clearInterval(this._timerId);
 var x40=self.setInterval(this.createCallback(this._repeatSpinbox),100);
this._timerId=x40;
}
AdfDhtmlInputNumberSpinboxPeer.prototype._repeatSpinbox= function()
{
 if(this._currentSpinMode=="inc")
this._manipulateValue(true);
 else if(this._currentSpinMode=="dec")
this._manipulateValue(false);
}
AdfDhtmlInputNumberSpinboxPeer.prototype._handleButtonClicks= function(
x41,
x42,
x43)
{
AdfAssert.assertBoolean(x43);
 var x44=this._getMin(x41);
 var x45=this._getMax(x41);
 var x46=this.GetStepSize(x41);
 var x47=x45-x46;
 var x48=x44+x46;
 var x49=null;
 if(x43==true)
{
 if(x42==null)
{
 if(x41.getMinimum()!=null)
{
 if (x41.getMaximum()!=null)
{
x49=x45;
}
 else
 {
x49=x48;
}
}
 else if (x41.getMaximum()!=null)
{
x49=x45;
}
 else
 {
x49=0;
}
}
 else
 {
 if(x42>x47)
{
x49=x45;
}
 else
 {
x49=x42 + x46;
 if (x49<x44)
x49=x44;
}
}
}
 else
 {
 if(x42==null)
{
 if(x41.getMinimum()!=null)
{
x49=x44;
}
 else if (x41.getMaximum()!=null)
{
x49=x47;
}
 else
 {
x49=0;
}
}
 else
 {
 if(x42<x48)
{
x49=x44;
}
 else
 {
x49=x42 - x46;
 if (x49>x45)
x49=x45;
}
}
}
 var x50=x41.getConverter();
 if (x50 instanceof AdfMissingConverter)
x50=null;
 if(x50&&x49!=null)
{
try
{
 var x51=x50.getAsObject(x50.getAsString(x49,null),null);
 if (x51!=null)
x49=x51;
}
catch(e)
{
}
}
 return x49;
}
AdfDhtmlInputNumberSpinboxPeer.prototype._isActionButton= function(x52)
{
 if(x52)
{
 var x53=this.getDomElement();
 var x54=x53.getAttribute(AdfDhtmlInputNumberSpinboxPeer._INC_ID);
 var x55=x53.getAttribute(AdfDhtmlInputNumberSpinboxPeer._DEC_ID);
 if(x52.id==x54)
{
 return "inc";
}
 else if(x52.id==x55)
{
 return "dec";
}
 else
 {
 return null;
}
}
 else
 {
 return null;
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype._manipulateValue= function(x56)
{
AdfAssert.assertBoolean(x56)
 var x57=this.getComponent();
 var x58=this._getSpinboxValue(x57);
 if (!isNaN(x58))
{
 var x59=this._handleButtonClicks(x57,x58,x56);
this._setVisibleValue(x57,x59);
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype._getSpinboxValue= function(
x60)
{
 var x61=AdfUIUtils.trim(AdfDhtmlEditableValuePeer.GetContentNode(x60).value);
 if (x61=="")
 return null;
 var x62;
 var x63=x60.getConverter();
try
{
 if (x63)
x62=x63.getAsObject(x61,null);
 if (x62===undefined)
{
x62=parseFloat(x61);
 if (isNaN(x62))
{
AdfLogger.LOGGER.warning("inputNumberSpinbox: The value '",x61,"' could not be converted to a number.");
}
}
x61=x62;
}
catch(e)
{
this.Validate(x60,x61);
x61=NaN;
}
 return x61;
}
AdfDhtmlInputNumberSpinboxPeer.prototype._setVisibleValue= function(
x64,
x65)
{
 var x66=x64.getConverter();
 if (x66 instanceof AdfMissingConverter)
x66=null;
 var x67;
 if (x66&&x65!=null)
{
x67=x66.getAsString(x65,null);
 if (x67==null)
{
AdfLogger.LOGGER.warning("inputNumberSpinbox: The new value '",x65,"' could not be converted for display.");
 return;
}
}
 var x68=this._getMax(x64);
 var x69=this._getMin(x64);
this._updateButtons(null,x65>=x68,x65<=x69);
 if (x67!=null)
x65=x67;
 if (x65==null)
{
x65="";
}
 var x70=this.getDomElement();
this.SetDisplayValue(x64,x70,x65.toString());
}
AdfDhtmlInputNumberSpinboxPeer.prototype._getMin= function(
x71
)
{
 var x72=x71.getMinimum();
 if(x72==null)
x72= -Number.MAX_VALUE;
 return x72;
}
AdfDhtmlInputNumberSpinboxPeer.prototype._getMax= function(
x73
)
{
 var x74=x73.getMaximum();
 if(x74==null)
x74=Number.MAX_VALUE;
 return x74;
}
AdfDhtmlInputNumberSpinboxPeer.prototype._getAnchor= function(
x75)
{
 var x76=AdfAgent.AGENT;
while(x75)
{
 if(x76.getNodeName(x75)=="INPUT"||x76.getNodeName(x75)=="LABEL")
 return null;
 else if(x76.getNodeName(x75)=="A")
 return x75;
x75=x75.parentNode;
}
}
AdfDhtmlInputNumberSpinboxPeer.prototype._updateButtons= function(
x77,
x78,
x79
)
{
AdfAssert.assertDomElementOrNull(x77);
AdfAssert.assertBoolean(x78);
AdfAssert.assertBoolean(x79);
 var x80=AdfAgent.AGENT;
 var x81;
 if(x77)
x81=x77;
 else
 x81=this.getDomElement();
 var x82=x80.getElementById(x81.getAttribute(AdfDhtmlInputNumberSpinboxPeer._INC_ID));
 var x83=x80.getElementById(x81.getAttribute(AdfDhtmlInputNumberSpinboxPeer._DEC_ID));
AdfDomUtils.addOrRemoveCSSClassName(x79,x83,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.addOrRemoveCSSClassName(x78,x82,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.addOrRemoveCSSClassName(x79,x83.parentNode,AdfRichUIPeer.DISABLED_STYLECLASS);
AdfDomUtils.addOrRemoveCSSClassName(x78,x82.parentNode,AdfRichUIPeer.DISABLED_STYLECLASS);
}

AdfUIComponents.createComponentClass("AdfRichInputNumberSlider",
{
componentType:"oracle.adf.RichInputNumberSlider",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"majorIncrement",type:"Object","default":1}
,{name:"minorIncrement",type:"Object","default":-1}
,{name:"minimumIncrement",type:"Object","default":-1}
,{name:"minimum",type:"Object","default":0}
,{name:"maximum",type:"Object","default":10}
,{name:"orientation",type:"String","default":"horizontal"}
],
superclass:AdfUIInput
});

AdfRichInputNumberSlider.InitSubclass= function()
{
AdfUIComponent.SetPropertyType(AdfRichInputNumberSlider,"value","Number");
}

AdfRichUIPeer.createPeerClass(AdfDhtmlEditableValuePeer,"AdfDhtmlInputNumberSliderPeer",false);
AdfDhtmlInputNumberSliderPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichInputNumberSlider);
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfRichInputNumberSlider.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichInputNumberSlider.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE);
this._HIDDEN="hidden";
this._BAR_ELEMENT_ID_ATTR_NAME="_barElementId";
this._DECREASE_BUTCON_ID_ATTR_NAME="_decreaseButconID";
this._INCREASE_BUTCON_ID_ATTR_NAME="_increaseButconID";
this._THUMB_VALUE_ID_ATTR_NAME="_thumbValue";
this._THUMB_ELEMENT_ID_ATTR_NAME="_thumbElement";
this._THUMB_VALUE_LINE_ID_ATTR_NAME="_thumbValueLine";
this._SLIDER_TICKS_CONTAINER_ID_ATTR_NAME="_sliderTicksContainer";
this._DRAG_ELEMENT_ID_ATTR_NAME="_dragElement";
this._THUMB_VALUE2_ID_ATTR_NAME="_thumbValue2";
this._THUMB_ELEMENT2_ID_ATTR_NAME="_thumbElement2";
this._THUMB_VALUE2_LINE_ID_ATTR_NAME="_thumbValueLine2";
this._RANGE_ID_ATTR_NAME="_range";
this._OLD_VALUE=null;
this._CURRENT_POSITION=null;
this._DRAG_RECOGNIZER= new AdfInputNumberSliderDragRecognizer();
this._DEPRESSED_STYLE_CLASS="p_AFDepressed";
}
AdfDhtmlInputNumberSliderPeer.prototype.needsResizeNotify= function(x0)
{
 var x1=this.getDomElement();
 return (x1.getAttribute(AdfDhtmlInputNumberSliderPeer._HIDDEN)!=null);
}
AdfDhtmlInputNumberSliderPeer.prototype.ResizeNotify= function(
x2,
x3,
x4,
x5
)
{
 var x6=this.getDomElement();
 var x7=this.getComponent();
this._initBarElement(x7,x6);
}
AdfDhtmlInputNumberSliderPeer.prototype.init= function()
{
}
AdfDhtmlInputNumberSliderPeer.prototype.getValue= function()
{
 var x8=this.getComponent();
 var x9=x8.getValue();
 if(x9==null)
x9=x8.getProperty(AdfUIValue.VALUE);
 var x10=this.isRanged();
 if(!x9&&x10)
{
x9= new AdfRangeValue(x8.getMinimum(),x8.getMaximum());
}
 return x9;
}
AdfDhtmlInputNumberSliderPeer.prototype.isRanged= function ()
{
 return false;
}
AdfDhtmlInputNumberSliderPeer.prototype.InitDomElement= function(x11,x12)
{
AdfDhtmlInputNumberSliderPeer.superclass.InitDomElement.call(this,x11,x12);
 var x13=x11.getClientId();
 var x14=AdfRichUIPeer.CreateSubId(x13,"bar");
 var x15=AdfAgent.AGENT;
 if (x15.getElementById(x14)!=null)
{
x12.setAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME,x14);
this._initBarElement(x11,x12);
}
 if(!AdfDomUtils.isInVisibleSubtree(x12))
{
x12.setAttribute(AdfDhtmlInputNumberSliderPeer._HIDDEN,true);
}
x15.disableUserSelect(x12);
 var x16=this._addDepressedCallback;
 if (!x16)
{
x16=this._addDepressedCallback=this.createCallback(this._addDepressed);
}
 var x17=this._removeDepressedCallback;
 if (!x17)
{
x17=this._removeDepressedCallback=this.createCallback(this._removeDepressed);
}
 var x18=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME,x12);
 var x19=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME,x12);
 if (x18)
{
x15.addBubbleEventListener(x18,"mousedown",x16);
x15.addBubbleEventListener(x18,"mouseup",x17);
x15.addBubbleEventListener(x18,"mouseout",x17);
}
 if (x19)
{
x15.addBubbleEventListener(x19,"mousedown",x16);
x15.addBubbleEventListener(x19,"mouseup",x17);
x15.addBubbleEventListener(x19,"mouseout",x17);
}
}
AdfDhtmlInputNumberSliderPeer.prototype.ComponentRemoved= function(x20)
{
 var x21=AdfAgent.AGENT;
 var x22=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME);
 var x23=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME);
 var x24=this._addDepressedCallback;
 var x25=this._removeDepressedCallback;
 if (x24)
{
 if (x22)
x21.removeBubbleEventListener(x22,"mousedown",x24);
 if (x23)
x21.removeBubbleEventListener(x23,"mousedown",x24);
}
 if (x25)
{
 if (x22)
{
x21.removeBubbleEventListener(x22,"mouseup",x25);
x21.removeBubbleEventListener(x22,"mouseout",x25);
}
 if (x23)
{
x21.removeBubbleEventListener(x23,"mouseup",x25);
x21.removeBubbleEventListener(x23,"mouseout",x25);
}
}
}
AdfDhtmlInputNumberSliderPeer.prototype.HandleComponentMouseOver= function(x26)
{
this.ShowNoteWindowMouseOver(x26);
}
AdfDhtmlInputNumberSliderPeer.prototype.HandleComponentKeyDown= function(x27)
{
 var x28=x27.getKeyCode();
 var x29=x27.getCurrentTarget();
 var x30=x27.getNativeEvent();
 var x31=AdfAgent.AGENT.getEventTarget(x30);
 var x32=this.getValue();
 var x33=x29.getMinimumIncrement();
 var x34=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME);
 if (x33<=0)
{
x33=x29.getMinorIncrement();
 if (x33<=0)
{
x33=x29.getMajorIncrement();
}
}
 if (AdfPage.PAGE.getLocaleContext().isRightToLeft()&& !(x29.getOrientation()=="vertical")&&
(x28!=AdfKeyStroke.ENTER_KEY))
{
x33= -1*x33;
}
 if (this.isRanged())
{
 var x35;
 var x36=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT2_ID_ATTR_NAME);
 if ((x28==AdfKeyStroke.ARROWLEFT_KEY||
x28==AdfKeyStroke.ARROWDOWN_KEY)
&&
x31==x34)
{
x35= new AdfRangeValue(x32.getMinimum() - x33,
x32.getMaximum());
this._setComponentValue(x35,x29);
}
 else if ((x28==AdfKeyStroke.ARROWLEFT_KEY||
x28==AdfKeyStroke.ARROWDOWN_KEY)
&&
x31==x36)
{
x35= new AdfRangeValue(x32.getMinimum(),
x32.getMaximum() - x33);
this._setComponentValue(x35,x29);
}
 else if ((x28==AdfKeyStroke.ARROWRIGHT_KEY||
x28==AdfKeyStroke.ARROWUP_KEY)
&&
x31==x34)
{
x35= new AdfRangeValue(x32.getMinimum() + x33,
x32.getMaximum());
this._setComponentValue(x35,x29);
}
 else if ((x28==AdfKeyStroke.ARROWRIGHT_KEY||
x28==AdfKeyStroke.ARROWUP_KEY)
&&
x31==x36)
{
x35= new AdfRangeValue(x32.getMinimum(),
x32.getMaximum() + x33);
this._setComponentValue(x35,x29);
}
 else if (x28==AdfKeyStroke.ENTER_KEY&&
x31==this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME))
{
this._deltaComponentValue(x33);
}
 else if (x28==AdfKeyStroke.ENTER_KEY&&
x31==this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME))
{
this._deltaComponentValue(-x33);
}
}
 else
 {
 if ((x28==AdfKeyStroke.ARROWLEFT_KEY||
x28==AdfKeyStroke.ARROWDOWN_KEY)
&&
x31==x34)
{
this._deltaComponentValue(-x33);
}
 else if ((x28==AdfKeyStroke.ARROWRIGHT_KEY||
x28==AdfKeyStroke.ARROWUP_KEY)
&&
x31==x34)
{
this._deltaComponentValue(x33);
}
 else if (x28==AdfKeyStroke.ENTER_KEY&&
x31==this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME))
{
this._deltaComponentValue(x33);
}
 else if (x28==AdfKeyStroke.ENTER_KEY&&
x31==this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME))
{
this._deltaComponentValue(-x33);
}
}
this._skipDomEventForUpAndDown(x28,x27);
}
AdfDhtmlInputNumberSliderPeer.prototype.SetDisplayValue= function(
x37,
x38,
x39
)
{
 var x40=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME,
x38);
 if (!x40)
 return;
 var x41=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME,
x38);
 var x42=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE_ID_ATTR_NAME,
x38);
 var x43=x37.getOrientation()=="vertical";
 var x44=this.isRanged();
 var x45=(0.5*x41[x43?"offsetHeight":"offsetWidth"]);
 var x46=x37.getConverter();
 if (x46 instanceof AdfMissingConverter)
x46=null;
 var x47;
 var x48;
 var x49;
 var x50;
 var x51=x37.getMaximum();
 var x52=x37.getMinimum();
 var x53;
 var x54=AdfAgent.AGENT.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 if(x54)
x41.style["outline-width"]="0px";
 if (x44)
{
x47=x39.getMaximum();
 if(x47>x51)
x47=x51;
x48=x39.getMinimum();
 if(x48<x52)
x48=x52;
 if (x46)
{
x49=x46.getAsString(x48,null);
x50=x46.getAsString(x47,null);
}
 else
 {
x49=x48;
x50=x47;
}
this.UpdateDisabledButtonStyles(x48,x47,x37,x38);
}
 else
 {
 if(x39=="")
{
 if (x46)
x39=x46.getAsString(x37.getMinimum(),null);
 else
 x39=x37.getMinimum()+"";
}
 else
 {
 var x55;
 if (x46)
x55=x46.getAsObject(x39,null);
 else
 x55=x39;
 var x56=parseFloat(x55.toString());
 var x57=x56>x51;
 var x58=x56<x52;
 if(x57)
 if (x46)
x39=x46.getAsString(x51,null);
 else
 x39=x51+"";
 if(x58)
 if (x46)
x39=x46.getAsString(x52,null);
 else
 x39=x52+"";
}
x48=x39;
x49=x39;
 if (x46)
{
x48=x46.getAsObject(x48,null);
}
this.UpdateDisabledButtonStyles(x39,x39,x37,x38);
}
 var x59=this._value2offset(x37,x38,x48) - x45;
 var x60=AdfPage.PAGE.getLocaleContext().isRightToLeft();
x41.style[x43?"bottom":x60?"right":"left"]=x59 + "px";
x41.title=x49;
x42.innerHTML=x49;
 if (x44)
{
 var x53=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT2_ID_ATTR_NAME,
x38);
 var x61=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE2_ID_ATTR_NAME,
x38);
 var x62=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._RANGE_ID_ATTR_NAME,
x38);
x62.style[x43?"bottom":x60?"right":"left"]=(x59 + x45) + "px";
 var x63=this._value2offset(x37,x38,x47) - x45;
x53.style[x43?"bottom":x60?"right":"left"]=x63 + "px";
 if(x54)
x53.style["outline-width"]="0px";
x53.title=x50;
x61.innerHTML=x50;
x62.style[x43?"height":"width"]=x63 - x59 + "px";
}
 var x64=
AdfRichUIPeer.CreateSubId(x37.getClientId(),"hiddendata");
 var x65=AdfAgent.AGENT.getElementsByName(x64)[0];
 if (x65!=null)
{
 if (x44)
{
x65.value=x47 + "," + x48;
}
 else
 {
 if (x46)
x65.value=x49;
 else
 x65.value=x48;
}
}
 if(x54)
{
 var x66=this._redrawThumbTimerId;
 if(x66)
AdfPage.PAGE.cancelTimer(x66);
this._redrawThumbTimerId=AdfPage.PAGE.scheduleTimer(this,
this._redrawThumbOutlines,
[x41,x53],50);
}
}
AdfDhtmlInputNumberSliderPeer.prototype._redrawThumbOutlines= function(x67)
{
x67[0].style["outline-width"]="";
 if(x67[1])
x67[1].style["outline-width"]="";
 delete this._redrawThumbTimerId;
}
AdfDhtmlInputNumberSliderPeer.prototype.GetSubmittedValue= function(
x68,
x69)
{
AdfAssert.assertDomElement(x69);
 var x70=x68.getReadOnly();
 if (x70)
{
 var x71=AdfDhtmlEditableValuePeer.GetContentNode(x68,x69);
 return x71.innerHTML;
}
 else
 {
 var x72=
AdfRichUIPeer.CreateSubId(x68.getClientId(),"hiddendata");
 var x73=AdfAgent.AGENT.getElementsByName(x72)[0];
 var x74=null;
 if(x73)
{
x74=x73.value;
 if (this.isRanged())
{
 var x75=x73.value.split(",");
 if (x75.length==2)
{
x74= new AdfRangeValue(1*x75[0],1*x75[1]);
}
}
}
 return x74;
}
}
AdfDhtmlInputNumberSliderPeer.prototype.HandleComponentClick= function(x76)
{
 var x77=this.getComponent();
 if (!x76.isRightButtonPressed()&& !x77.getDisabled())
{
 var x78=
this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME);
 var x79=x76.getNativeEvent();
 var x80=AdfAgent.AGENT;
 var x81=x80.getEventTarget(x79);
 if (x80.getNodeName(x81)=="LABEL")
{
this.focus(x77);
}
 else if (x80.isEventInElement(x79,x78))
{
 if (!(this.isRanged()&&
x80.isEventInElement(
x79,
this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._RANGE_ID_ATTR_NAME))))
{
this._handleSingleClickPositioning(x76);
}
}
}
}
AdfDhtmlInputNumberSliderPeer.prototype.HandleComponentMouseDown= function(x82)
{
 var x83=x82.getNativeEvent();
 var x84=this.getComponent();
 var x85=AdfAgent.getAgent();
 var x86=x84.getMinimumIncrement();
 var x87=AdfAgent.AGENT.getPlatform()==AdfAgent.WEBKIT_PLATFORM;
 if (x86<=0)
{
x86=x84.getMinorIncrement();
 if (x86<=0)
{
x86=x84.getMajorIncrement();
}
}
 if (x82.getButtons()===1&& !x84.getDisabled())
{
 var x88=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME);
 var x89=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME);
 var x90=AdfAgent.AGENT.isEventInElement(x83,x89);
 var x91=this.getDomElement();
 var x92=false;
 var x93=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME);
 var x94=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME);
 if (this.isRanged())
{
thumbElement2=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT2_ID_ATTR_NAME);
x92=AdfAgent.AGENT.isEventInElement(x83,thumbElement2);
}
 if (x90||x92)
{
 if (x90)
{
x91.setAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME,
x91.getAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME));
} else
 {
x91.setAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME,
x91.getAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT2_ID_ATTR_NAME));
}
AdfPage.PAGE.startDrag(x83,
this.createCallback(this._handleDragPositioning),this.createCallback(this._finishDrag));
}
 else if (x85.isEventInElement(x83,x88))
{
 if (this.isRanged()&&
x85.isEventInElement(x83,
this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._RANGE_ID_ATTR_NAME)))
{
AdfDhtmlInputNumberSliderPeer._CURRENT_POSITION=this._getValueFromMousePos(x84,x83);
AdfPage.PAGE.startDrag(x83,
this.createCallback(this._handleDragRangePosition),this.createCallback(this._finishDrag));
x91.setAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME,"RANGE");
AdfDhtmlInputNumberSliderPeer._OLD_VALUE=this.getValue();
}
 else
 x82.cancel();
}
 else if (x85.isEventInElement(x83,x94))
{
this._deltaComponentValue(-1*x86);
 if(x87)
x94.focus();
}
 else if (x85.isEventInElement(x83,x93))
{
this._deltaComponentValue(x86);
 if(x87)
x93.focus();
}
 else
 x82.cancel();
}
}
AdfDhtmlInputNumberSliderPeer.prototype.LazyInitialize= function(x95,x96)
{
AdfDhtmlInputNumberSliderPeer.superclass.LazyInitialize.call(this,x95,x96);
this._createClientSideValidator(x95,x96);
}
AdfDhtmlInputNumberSliderPeer.prototype.GetInlineEditor= function(x97)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlInputNumberSliderPeer.prototype.getDefaultDragRecognizer= function(x98)
{
 return AdfDhtmlInputNumberSliderPeer._DRAG_RECOGNIZER;
}
AdfDhtmlInputNumberSliderPeer.prototype._skipDomEventForUpAndDown= function(x99,x100)
{
 if(x99==AdfKeyStroke.ARROWDOWN_KEY||x99==AdfKeyStroke.ARROWUP_KEY)
{
x100.cancel();
}
}
AdfDhtmlInputNumberSliderPeer.prototype._createClientSideValidator= function(x101,x102)
{
AdfAssert.assertDomElement(x102);
 var x103=x101.getMinimum();
 var x104=x101.getMaximum();
 var x105= new TrRangeValidator(x104,x103,null);
x101.addValidator(x105);
}
AdfDhtmlInputNumberSliderPeer.prototype._handleSingleClickPositioning= function(x106)
{
 if (!this.isRanged())
{
 var x107=x106.getCurrentTarget();
 var x108=x106.getNativeEvent();
 var x109=this._getValueFromMousePos(x107,x108)
this._setComponentValue(x109,x107);
}
}
AdfDhtmlInputNumberSliderPeer.prototype._handleDragRangePosition= function(x110,x111,x112)
{
 var x113=this.getComponent();
 var x114=this._getValueFromMousePos(x113,x110);
 var x115=x113.getMinimum();
 var x116=x113.getMaximum();
 var x117=AdfDhtmlInputNumberSliderPeer._OLD_VALUE.getMinimum();
 var x118=AdfDhtmlInputNumberSliderPeer._OLD_VALUE.getMaximum();
 var x119=x114 - AdfDhtmlInputNumberSliderPeer._CURRENT_POSITION;
 if (x117 + x119<x115)
x119=x115 - x117;
 if (x118 + x119>x116)
x119=x116 - x118;
 var x120= new AdfRangeValue(this._constrainValue(x117 + x119,
x113),
this._constrainValue(x118 + x119,
x113));
 if (x120.getMinimum()!=AdfDhtmlInputNumberSliderPeer._OLD_VALUE.getMinimum()&&
x120.getMaximum()!=AdfDhtmlInputNumberSliderPeer._OLD_VALUE.getMaximum())
{
AdfDhtmlInputNumberSliderPeer._OLD_VALUE=x120;
this.SetDisplayValue(x113,this.getDomElement(),x120);
AdfDhtmlInputNumberSliderPeer._CURRENT_POSITION=x114;
}
}
AdfDhtmlInputNumberSliderPeer.prototype._finishDrag= function(x121,x122,x123)
{
 var x124=this.getComponent();
 var x125=this.isRanged();
 var x126=this.getDomElement();
 var x127=x126.getAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME)
 if (!x124.getDisabled()&&x127!="EMPTY")
{
 var x128=this._getValueFromMousePos(x124,x121);
 var x129=this.getValue();
 if (x127=="RANGE")
{
x128= new AdfRangeValue(this._constrainValue(AdfDhtmlInputNumberSliderPeer._OLD_VALUE.getMinimum(),
x124),
this._constrainValue(AdfDhtmlInputNumberSliderPeer._OLD_VALUE.getMaximum(),
x124));
AdfDhtmlInputNumberSliderPeer._OLD_VALUE=null;
AdfDhtmlInputNumberSliderPeer._CURRENT_POSITION=null;
}
 else
 {
 if (x125)
{
 if (x126.getAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME)==
x127)
{
x128= new AdfRangeValue(x128,
x129.getMaximum());
} else
 {
x128= new AdfRangeValue(x129.getMinimum(),
x128);
}
}
}
x126.setAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME,"EMPTY");
this._setComponentValue(x128,x124);
}
}
AdfDhtmlInputNumberSliderPeer.prototype._handleDragPositioning= function(x130,x131,x132)
{
 var x133=this.getComponent();
 var x134=this._getValueFromMousePos(x133,x130);
 var x135=this._constrainValue(x134,x133);
 if (this.isRanged())
{
 var x136=this.getValue();
 var x137=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME);
 if (x137==
this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME))
{
x135= new AdfRangeValue(x135,x136.getMaximum());
}
 else
 {
x135= new AdfRangeValue(x136.getMinimum(),x135);
}
}
 else
 {
 var x138=x133.getConverter();
 if (x138 instanceof AdfMissingConverter)
x138=null;
 if (x138)
{
x135=x138.getAsString(x135,null);
}
}
this.SetDisplayValue(x133,this.getDomElement(),x135);
}
AdfDhtmlInputNumberSliderPeer.prototype._getValueFromMousePos= function(x139,x140)
{
 var x141=x139.getOrientation()=="vertical";
 var x142=AdfAgent.getAgent();
 var x143=x142.getMousePosition(x140);
 var x144=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME);
 var x145,x146;
 if (x141)
{
x145=x142.getElementTop(x144) + x144.offsetHeight;
x146=x145 - x143.y;
}
 else
 {
x145=x142.getElementLeft(x144);
x146=x143.x - x145;
}
 return this._offset2value(x139,x146)
}
AdfDhtmlInputNumberSliderPeer.prototype._value2offset= function(x147,x148,x149)
{
 var x150=x147.getOrientation()=="vertical";
 var x151=x147.getMinimum();
 var x152=x147.getMaximum();
 var x153=0;
 var x154=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME,x148);
 var x155
 if (x152>x151)
x153=(x149 - x151)/(x152 - x151);
 if (x150)
x155=x153*x154.offsetHeight;
 else
 x155=x153*x154.offsetWidth;
 return x155;
}
AdfDhtmlInputNumberSliderPeer.prototype._offset2value= function(x156,x157)
{
 var x158=x156.getOrientation()=="vertical";
 var x159=x156.getMinimum();
 var x160=x156.getMaximum();
 var x161=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME);
 var x162;
 if (x158)
x162=x157/x161.offsetHeight;
 else
 x162=x157/x161.offsetWidth;
 if (AdfPage.PAGE.getLocaleContext().isRightToLeft()&& !x158)
{
 return x160 - (x162*(x160 - x159));
}
 else
 {
 return (x162*(x160 - x159)) + x159;
}
}
AdfDhtmlInputNumberSliderPeer.prototype._deltaComponentValue= function(x163)
{
 var x164=this.getComponent();
 var x165=this.getValue();
 var x166;
 if (this.isRanged())
{
x166= new AdfRangeValue(x165.getMinimum() + x163,
x165.getMaximum() + x163);
}
 else
 {
x166=x163 + (1*x165);
}
this._setComponentValue(x166,x164);
}
AdfDhtmlInputNumberSliderPeer.prototype._setComponentValue= function(x167,x168)
{
 if (x168.getDisabled())
 return;
 if (this.isRanged())
{
 if (x167.getMinimum()>x167.getMaximum())
{
 if (x167.getMinimum()==this.getValue().getMinimum())
x167.setMaximum(x167.getMinimum());
 else
 x167.setMinimum(x167.getMaximum());
}
this.Validate(x168,this._constrainValue(x167,x168));
}
 else
 {
 var x169=x168.getConverter();
 if (x169 instanceof AdfMissingConverter)
x169=null;
 var x170=this._constrainValue(x167,x168);
 var x171;
 if(x169)
x171=x169.getAsString(x170,null);
 else
 x171=""+x170;
this.Validate(x168,x171);
}
}
AdfDhtmlInputNumberSliderPeer.prototype.UpdateDisabledButtonStyles= function(x172,x173,x174,x175)
{
 var x176=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME,x175);
 var x177=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME,x175);
 if (x173==x174.getMinimum())
AdfDomUtils.addCSSClassName(x177,AdfRichUIPeer.DISABLED_STYLECLASS);
 else
 {
AdfDomUtils.removeCSSClassName(x177,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x172==x174.getMaximum())
AdfDomUtils.addCSSClassName(x176,AdfRichUIPeer.DISABLED_STYLECLASS);
 else
 AdfDomUtils.removeCSSClassName(x176,AdfRichUIPeer.DISABLED_STYLECLASS);
}
}
AdfDhtmlInputNumberSliderPeer.prototype._constrainValue= function(x178,x179)
{
 var x180=x179.getMinimum();
 var x181=x179.getMaximum();
 if (x178<=x180)
 return x180;
 else if (x178>=x181)
 return x181;
 var x182=x179.getMinimumIncrement();
 if (x182<=0)
{
x182=x179.getMinorIncrement();
 if (x182<=0)
{
x182=x179.getMajorIncrement();
}
}
x178+=(x178>0?0.5: -0.5)*x182;
x178-=x178%x182;
 if (x178<x180)
 return x180;
 else if (x178>x181)
 return x181;
 else
 return x178;
}
AdfDhtmlInputNumberSliderPeer.prototype._getElementByRootAttribute= function(x183,x184)
{
 var x185;
 if(x184===undefined)
{
x185=this.getDomElement().getAttribute(x183);
}
 else
 {
x185=x184.getAttribute(x183);
}
 return AdfAgent.AGENT.getElementById(x185);
}
AdfDhtmlInputNumberSliderPeer.prototype._fixPrecision= function(x186)
{
x186= new Number(x186);
 var x187="" + x186;
 if(x187.indexOf("e")== -1&&x187.indexOf(".")!=-1)
{
x186=x186.toPrecision(13);
x186=parseFloat(""+x186);
}
 return x186;
}
AdfDhtmlInputNumberSliderPeer.prototype._initBarElement= function(x188,x189)
{
 var x190=x188.getOrientation()=="vertical";
 var x191=x188.getClientId();
 var x192=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._BAR_ELEMENT_ID_ATTR_NAME,x189);
 if (x192)
{
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"thumb"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._DECREASE_BUTCON_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"decrease"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._INCREASE_BUTCON_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"increase"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"thumbValue"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._DRAG_ELEMENT_ID_ATTR_NAME,
"EMPTY");
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE_LINE_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"thumbValueLine"));
 var x193=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE_LINE_ID_ATTR_NAME,
x189);
 if (this.isRanged())
{
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._RANGE_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"range"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT2_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"thumb2"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE2_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"thumbValue2"));
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE2_LINE_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"thumbValueLine2"));
 var x194=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._THUMB_VALUE2_LINE_ID_ATTR_NAME,
x189);
}
x189.setAttribute(AdfDhtmlInputNumberSliderPeer._SLIDER_TICKS_CONTAINER_ID_ATTR_NAME,
AdfRichUIPeer.CreateSubId(x191,"sliderTicks"));
 var x195=this._getElementByRootAttribute(AdfDhtmlInputNumberSliderPeer._SLIDER_TICKS_CONTAINER_ID_ATTR_NAME,
x189);
this._sliderTickValues=[];
 var x196=x195.getElementsByTagName("div");
for(var x197=0;x197<x196.length;x197++)
{
 var x198=x196[x197];
 if (x198.nodeType==1)
this._sliderTickValues.push(x198);
}
 if (x190)
{
 var x199=x193.offsetWidth - 2;
for(index in this._sliderTickValues)
{
 var x200=this._sliderTickValues[index];
 if (x200.offsetWidth>x199)
x199=x200.offsetWidth;
}
x199+=2;
x193.style.width=x199 + "px";
 if (this.isRanged())
{
x194.style.width=x199 + "px";
}
}
 var x201=AdfRichUIPeer.CreateSubId(x191,"hiddendata");
 var x202=AdfAgent.getAgent().getElementsByName(x201)[0];
 var x203;
 if (this.isRanged())
{
 if (x202!=null)
{
 var x204=x202.value.split(",");
 if (x204.length!=2)
{
 var x205=(x188.getMaximum() - x188.getMinimum())/4;
x203=
 new AdfRangeValue(this._constrainValue(x188.getMinimum() + x205,
x188),
this._constrainValue(x188.getMaximum() - x205,
x188));
} else
 {
x203=
 new AdfRangeValue(1*x204[0],1*x204[1]);
}
}
} else {
x203=x202.value;
}
this.SetDisplayValue(x188,x189,x203);
}
}
AdfDhtmlInputNumberSliderPeer.prototype._addDepressed= function(x206)
{
 var x207=AdfAgent.AGENT.getEventTarget(x206);
AdfDomUtils.addCSSClassName(x207,AdfDhtmlInputNumberSliderPeer._DEPRESSED_STYLE_CLASS);
}
AdfDhtmlInputNumberSliderPeer.prototype._removeDepressed= function(x208)
{
 var x209=AdfAgent.AGENT.getEventTarget(x208);
AdfDomUtils.removeCSSClassName(x209,AdfDhtmlInputNumberSliderPeer._DEPRESSED_STYLE_CLASS);
}
function AdfInputNumberSliderDragRecognizer()
{
this.Init();
}
AdfObject.createSubclass(AdfInputNumberSliderDragRecognizer,AdfDragRecognizer);
AdfInputNumberSliderDragRecognizer.prototype.prepDrag= function(
x210,x211,x212)
{
AdfAssert.assertPrototype(x211,AdfDragSource);
AdfAssert.assertPrototype(x212,AdfUIInputEvent);
 if (x212.getType()==AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE)
{
 var x213=x211.getComponent();
 var x214=x213.getPeer();
x214.bind(x213);
 var x215=x214._getElementByRootAttribute(
AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT_ID_ATTR_NAME);
 var x216=null;
 var x217=null;
 if (x214.isRanged())
{
x216=x214._getElementByRootAttribute(
AdfDhtmlInputNumberSliderPeer._THUMB_ELEMENT2_ID_ATTR_NAME);
x217=x214._getElementByRootAttribute(
AdfDhtmlInputNumberSliderPeer._RANGE_ID_ATTR_NAME);
}
 var x218=x212.getNativeEventTarget();
 if (!AdfDomUtils.isAncestorOrSelf(x215,x218)&&
 !(x216&&AdfDomUtils.isAncestorOrSelf(x216,x218))&&
 !(x217&&AdfDomUtils.isAncestorOrSelf(x217,x218)))
{
 return AdfInputNumberSliderDragRecognizer.superclass.prepDrag.apply(this,arguments);
}
}
 return null;
}

AdfUIComponents.createComponentClass("AdfRichInputRangeSlider",
{
componentType:"oracle.adf.RichInputRangeSlider",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"majorIncrement",type:"Object","default":1}
,{name:"minorIncrement",type:"Object","default":-1}
,{name:"minimumIncrement",type:"Object","default":-1}
,{name:"minimum",type:"Object","default":0}
,{name:"maximum",type:"Object","default":10}
,{name:"orientation",type:"String","default":"horizontal"}
],
superclass:AdfUIInput
});

AdfRichInputRangeSlider.InitSubclass= function()
{
AdfUIComponent.SetPropertyType(AdfRichInputRangeSlider,"value","AdfRangeValue");
}

AdfRichUIPeer.createPeerClass(AdfDhtmlInputNumberSliderPeer,"AdfDhtmlInputRangeSliderPeer",false);
AdfDhtmlInputRangeSliderPeer.InitSubclass= function()
{
}
AdfDhtmlInputRangeSliderPeer.prototype.init= function()
{
}
AdfDhtmlInputRangeSliderPeer.prototype.getConvertedValue= function(
x0,
x1)
{
 return x1;
}
AdfDhtmlInputRangeSliderPeer.prototype.getConvertedObject= function(
x2,
x3)
{
 return x3;
}
AdfDhtmlInputRangeSliderPeer.prototype.isRanged= function ()
{
 return true;
}
AdfDhtmlInputRangeSliderPeer.prototype._setComponentValue= function(x4,x5)
{
 if (x5.getDisabled())
 return;
 if (x4.getMinimum()>x4.getMaximum())
{
 if (x4.getMinimum()==this.getValue.getMinimum())
x4.setMaximum(x4.getMinimum());
 else
 x4.setMinimum(x4.getMaximum());
}
x4= new AdfRangeValue(this._constrainValue(x4.getMinimum(),x5),
this._constrainValue(x4.getMaximum(),x5));
this.Validate(x5,x4);
}
AdfUIComponents.createComponentClass("AdfUINavigationLevel",
{
componentType:"org.apache.myfaces.trinidad.NavigationLevel",
propertyKeys:["value"
,{name:"level",type:"Number","default":0,secured:true}
],
namingContainer:true,
superclass:AdfUICollection
});

AdfUIComponents.createComponentClass("AdfRichNavigationPane",
{
componentType:"oracle.adf.RichNavigationPane",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"hint",type:"String","default":"tabs"}
,{name:"title",type:"String"}
,{name:"itemRemoval",type:"String","default":"none"}
],
eventNames:["item"],
namingContainer:true,
superclass:AdfUINavigationLevel
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlNavigationPanePeer",false);
AdfDhtmlNavigationPanePeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE);
this._CHOICE_BUTTON_ID="_afrChoiceButton";
this._CHOICE_DATA_CONTAINER_ID="_afrChoiceDataContainer";
this._POPUP_ID="popupContent";
this._POPUP_PANEL_ID="_afrChoicePopupPanel";
this._POPUP_CLOSED_TIME="_afrPopupClosedTime";
this._OVERFLOW_BOTH_SIDES="both";
this._TAB_HEADER="tabh";
this._OVERFLOW_CONTENT="oc";
this._TAB_HINT="tabs";
this._BAR_HINT="bar";
AdfDhtmlNavigationPanePeer._SELECTED_STYLECLASS="p_AFSelected";
}
AdfDhtmlNavigationPanePeer.prototype.InitDomElement= function(x0,x1)
{
AdfDhtmlNavigationPanePeer.superclass.InitDomElement.call(this,x0,x1);
this._isScreenReaderMode=AdfPage.PAGE.isScreenReaderMode();
 var x2=x0.getClientId();
 var x3=AdfAgent.getAgent();
 if(!this._isScreenReaderMode)
{
 if (x0.getHint()==AdfDhtmlNavigationPanePeer._TAB_HINT)
{
 var x4=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlNavigationPanePeer._TAB_HEADER);
this._headerElement=x3.getElementById(x4);
 if (this._headerElement)
{
x4=AdfRichUIPeer.CreateSubId(x4,AdfDhtmlNavigationPanePeer._OVERFLOW_CONTENT);
this._tabOverflowContent=x3.getElementById(x4);
AdfPage.PAGE.__registerDescendantResizeNotifyComponent(x0);
}
}
 else if(x0.getHint()==AdfDhtmlNavigationPanePeer._BAR_HINT)
{
 var x5=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlNavigationPanePeer._OVERFLOW_CONTENT);
this._barOverflowContent=x3.getElementById(x5);
AdfPage.PAGE.__registerDescendantResizeNotifyComponent(x0);
}
}
}
AdfDhtmlNavigationPanePeer.prototype.needsResizeNotify= function(x6)
{
 if (!this._isScreenReaderMode&&(this._headerElement||
x6.getHint()==AdfDhtmlNavigationPanePeer._BAR_HINT))
 return true;
 else
 return false;
}
AdfDhtmlNavigationPanePeer.prototype.ResizeNotify= function(
x7,
x8,
x9,
x10)
{
 var x11=this.getComponent();
 if(this._tabOverflowContent)
{
 var x12=this._tabOverflowContent.childNodes;
 if (!this._overflowSupport)
{
 var x13=AdfRichUIPeer.CreateSubId(x11.getClientId(),
AdfDhtmlNavigationPanePeer._TAB_HEADER);
 if (!AdfOverflowSupport.needsOverflow(x13))
 return;
this._overflowSupport=this._getTabOverflowSupport(x13,x12);
}
this._overflowSupport.handleResize();
AdfDomUtils.setScrollTop(this._headerElement,0);
}
 else if(this._barOverflowContent)
{
 if (!this._overflowSupport)
{
 var x14=x11.getClientId();
 if (!AdfOverflowSupport.needsOverflow(x14))
 return;
this._overflowSupport= new AdfOverflowSupport(x14,this,
AdfDhtmlNavigationPanePeer._OVERFLOW_BOTH_SIDES);
 var x12=this._barOverflowContent.childNodes;
 var x15=this._getActiveChildIndex(x12);
 var x16;
 var x17= -1;
while(x16=x12[++x17])
{
 if (x16.nodeType==1){
 if (x16.tagName.toLowerCase()=="a"||x16.getElementsByTagName("a").length>0)
{
 if(x15== -1)
x15=x17;
this._overflowSupport.createStep();
 if (x15==x17)
{
this._overflowSupport.addElement(x16);
}
 else if(x17>x15)
{
this._addSeparators(x12,x17,true);
this._overflowSupport.addElement(x16);
}
 else
 {
this._overflowSupport.addElement(x16);
this._addSeparators(x12,x17,false);
}
 var x18=this._createBarOverflowElement(x16);
this._overflowSupport.addOverflowElement(x18);
}
}
}
}
this._overflowSupport.handleResize();
}
}
AdfDhtmlNavigationPanePeer.prototype._getTabOverflowSupport= function(x19,x20)
{
 var x21= new AdfOverflowSupport(x19,this,AdfDhtmlNavigationPanePeer._OVERFLOW_BOTH_SIDES);
 var x22;
 var x23=0;
while((x22=x20[x23++])!=null)
{
 if (x22.nodeType==1)
{
x21.createStep();
x21.addElement(x22);
 if (x22.style.display!="none")
{
 var x24=this._createTabOverflowElement(x22);
x21.addOverflowElement(x24);
}
}
}
 return x21;
}
AdfDhtmlNavigationPanePeer.prototype.ComponentRemoved= function(x25)
{
 if (this._headerElement)
{
 if (this._overflowSupport)
{
this._overflowSupport.removeOverflowSupport();
 delete this._overflowSupport;
}
 delete this._headerElement;
 delete this._tabOverflowContent;
}
 else if (this._barOverflowContent)
{
 if (this._overflowSupport)
{
this._overflowSupport.removeOverflowSupport();
 delete this._overflowSupport;
}
 delete this._barOverflowContent;
}
AdfPage.PAGE.__unregisterDescendantResizeNotifyComponent(x25);
AdfDhtmlNavigationPanePeer.superclass.ComponentRemoved.call(this,x25);
}
AdfDhtmlNavigationPanePeer.prototype.HandleComponentClick= function(x26)
{
x26.cancel();
 return false;
}
AdfDhtmlNavigationPanePeer.prototype.HandleComponentKeyUp= function(x27)
{
 var x28=this.getComponent();
 var x29=x27.getNativeEvent();
 var x30=AdfAgent.AGENT.getEventTarget(x29);
 var x31=AdfAgent.AGENT.getKeyCode(x29);
 if(this.isPopupVisible(x28,AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID))
{
 var x32=false;
 var x33=this._getPopupContentDom(x28);
switch(x31)
{
 case AdfKeyStroke.ESC_KEY: var x34=this._getChoiceDropDownElement(x28);
AdfFocusUtils.focusElement(x34);
x32=true;
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
AdfFocusUtils.focusNextTabStop(x30,x33);
cancelEvt=true;
break;
 case AdfKeyStroke.ARROWUP_KEY:
AdfFocusUtils.focusPreviousTabStop(x30,x33);
break;
} if (x32)
this.hidePopup(x28,AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID);
}
 else if(x30==this._getChoiceDropDownElement(x28)&&
x31==AdfKeyStroke.ARROWDOWN_KEY)
{
this._showChoicePopupPanel(x28);
}
 if (!x27.isCanceled())
{
 if (!((x29.ctrlKey)&&(x29.altKey)&&(x31==87))){
x27.cancel();
}
}
}
AdfDhtmlNavigationPanePeer.prototype.HandleComponentMouseDown= function(x35)
{
 var x36=x35.getNativeEvent();
 var x37=x35.getSource();
 var x38=AdfAgent.AGENT.getEventTarget(x36);
 var x39=this._getChoiceDropDownElement(x37);
 if(x38==x39||x38.parentNode==x39)
{
 var x40=this.isPopupVisible(x37,AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID);
 if(!x40)
{
this._showChoicePopupPanel(x37);
}
 else
 {
this.hidePopup(x37,AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID);
}
}
}
AdfDhtmlNavigationPanePeer.prototype.HandleComponentMouseOver= function(x41)
{
 if(this.isPopupVisible(this.getComponent(),
AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID))
{
 var x42=x41.getNativeEventTarget();
AdfFocusUtils.focusElement(x42);
}
x41.cancel();
}
AdfDhtmlNavigationPanePeer.prototype.HandleComponentKeyDown= function(x43)
{
 var x44=x43.getNativeEvent();
 var x45=AdfAgent.AGENT.getEventTarget(x44);
 var x46=x43.getSource();
 if (x45!=this._getChoiceDropDownElement(x46))
{
 return;
}
 var x47=x43.getKeyCode();
 if (x47==AdfKeyStroke.ENTER_KEY)
{
this._showChoicePopupPanel(x46);
}
}
AdfDhtmlNavigationPanePeer.prototype.GetPopupAlignmentNode= function(x48,x49)
{
 return this._getChoiceDropDownElement(x48);
}
AdfDhtmlNavigationPanePeer.prototype.PopupClosed= function(x50,x51,x52)
{
 if (x52==AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID)
{
 var x53=x50.getClientId();
 var x54=AdfRichUIPeer.CreateSubId(x53,
AdfDhtmlNavigationPanePeer._CHOICE_DATA_CONTAINER_ID);
 var x55=AdfAgent.AGENT.getElementById(x54);
x55.appendChild(x51);
}
}
AdfDhtmlNavigationPanePeer.prototype._getChoiceDropDownElement= function(x56)
{
 var x57=AdfRichUIPeer.CreateSubId(x56.getClientId(),
AdfDhtmlNavigationPanePeer._CHOICE_BUTTON_ID);
 return AdfAgent.AGENT.getElementById(x57);
}
AdfDhtmlNavigationPanePeer.prototype._showChoicePopupPanel= function(x58)
{
AdfObject.ensureClassInitialization(AdfRichPopup);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
 var x59=this._getPopupContentDom(x58);
 var x60=AdfRichUIPeer.CreateSubId(x58.getClientId(),
AdfDhtmlNavigationPanePeer._CHOICE_BUTTON_ID);
x59.parentNode.removeChild(x59);
 var x61={};
x61[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x61[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START;
x61[AdfRichPopup.HINT_ALIGN_ID]=x60;
x61[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
this.showPopup(x58,x59,x61,AdfDhtmlNavigationPanePeer._POPUP_PANEL_ID);
}
AdfDhtmlNavigationPanePeer.prototype._getPopupContentDom= function(x62)
{
 var x63=AdfRichUIPeer.CreateSubId(x62.getClientId(),
AdfDhtmlNavigationPanePeer._POPUP_ID);
 return AdfAgent.AGENT.getElementById(x63);
}
AdfDhtmlNavigationPanePeer.prototype._createTabOverflowElement= function(x64)
{
 var x65=AdfAgent.AGENT;
 var x66=x64.getAttribute("id");
 var x67=x64.getElementsByTagName("a")[0];
 var x68=x64.getElementsByTagName("a")[1];
 var x69=x64.getElementsByTagName("img")[0];
 if (x69)
{
x69=x69.cloneNode(true);
}
 if (x67&&x67.className.indexOf("p_AFDisabled")== -1)
{
x67=x67.cloneNode(true);
 var x70=AdfDhtmlNavigationPanePeer._tabOverflowElementStyleClass;
 if (x70==null)
{
 var x71=AdfPage.PAGE.getLookAndFeel();
x70=x71.getStyleClass("AFOverflowElement");
AdfDhtmlNavigationPanePeer._tabOverflowElementStyleClass=x70;
}
 if (x68)
{
x68=x68.cloneNode(true);
x68.setAttribute("_componentId",x66);
 var x72=this.createCallback(this._handleRemoveButtonClick);
AdfAgent.AGENT.addBubbleEventListener(x68,"click",x72);
}
 var x73=x64.getAttribute('href');
 var x74=AdfAgent.AGENT.getDomDocument();
 var x75=x74.location.href;
 if (x73&&x73.indexOf(x75)== -1)
{
x67.setAttribute("_href",x73);
 if(x69)
{
x69.setAttribute("_href",x73);
}
 var x76=x64.getAttribute("target");
 if (x76)
{
x67.setAttribute("_target",x76);
 if(x69)
{
x69.setAttribute("_target",x76);
}
}
}
 else
 {
x67.setAttribute("_componentId",x66);
 if(x69)
{
x69.setAttribute("_componentId",x66);
}
}
 var x77=this.createCallback(this._handleNavItemClick);
AdfAgent.AGENT.addBubbleEventListener(x67,"click",x77);
 if(x69)
{
AdfAgent.AGENT.addBubbleEventListener(x69,"click",x77);
}
}
 else {
 var x78=x67.innerHTML;
x67=x64.ownerDocument.createElement("div");
x67.innerHTML=x78;
 var x79=AdfDhtmlNavigationPanePeer._tabOverflowElementDisabledStyleClass;
 if (x79==null)
{
 var x80=AdfPage.PAGE.getLookAndFeel();
x79=x80.getStyleClass("AFOverflowElementDisabled");
AdfDhtmlNavigationPanePeer._tabOverflowElementDisabledStyleClass=x79;
}
 if (x68)
{
x68=x68.cloneNode(true);
}
}
 var x81=x64.ownerDocument.createElement("table");
x81.cellPadding=0;
x81.cellSpacing=0;
x81.style.width="100%";
 var x82=x81.insertRow(-1);
 var x83=x82.insertCell(-1);
 if (x69)
{
x83.appendChild(x69);
}
 var x84=x82.insertCell(-1);
x84.style.width="100%";
 var x85=x64.ownerDocument.createElement("div");
x85.className=x70;
x84.appendChild(x85);
x85.appendChild(x67);
 var x86=x82.insertCell(-1);
 if (x68)
{
x86.appendChild(x68);
}
 return x81;
}
AdfDhtmlNavigationPanePeer.prototype._createBarOverflowElement= function(x87)
{
 var x88=this.getComponent();
 var x89=AdfDhtmlNavigationPanePeer._barOverflowElementStyleClass;
 if (x89==null)
{
 var x90=AdfPage.PAGE.getLookAndFeel();
x89=x90.getStyleClass("AFOverflowElement");
AdfDhtmlNavigationPanePeer._barOverflowElementStyleClass=x89;
}
 var x91=x87.ownerDocument.createElement("div");
x91.className=x89;
 var x92=x87.cloneNode(true);
x92.removeAttribute("id");
x91.appendChild(x92);
 var x93=x87.id;
x88=AdfPage.PAGE.findComponent(x93);
 var x94=x88.getDisabled();
 if(!x94)
{
 var x95=x87.href;
 if(x95==undefined)
x95=x87.getAttribute('href');
 var x96=AdfAgent.AGENT.getDomDocument();
 var x97=x96.location.href;
 var x98;
 if (x95&&x95.indexOf(x97)== -1)
{
x92.setAttribute("_href",x95);
 if(x98)
x98.setAttribute("_href",x95);
 var x99=x87.getAttribute("target");
 if (x99)
{
x92.setAttribute("_target",x99);
 if(x98)
x98.setAttribute("_target",x99);
}
}
 else
 {
x92.setAttribute("_componentId",x87.getAttribute("id"));
 if(x98)
x98.setAttribute("_componentId",x87.getAttribute("id"));
}
 var x100=this.createCallback(this._handleNavItemClick);
AdfAgent.AGENT.addBubbleEventListener(x92,"click",x100);
 if(x98)
AdfAgent.AGENT.addBubbleEventListener(x98,"click",x100);
}
 return x91;
}
AdfDhtmlNavigationPanePeer.prototype._handleNavItemClick= function(x101)
{
this.hideAllPopups(this.getComponent());
 var x102=AdfAgent.AGENT.getEventTarget(x101);
 if (x102.nodeName!="A"&&x102.nodeName!="IMG")
{
x102=x102.parentNode;
}
 var x103=x102.getAttribute("_href");
 if (x103)
{
 var x104=x102.getAttribute("_target");
 if (x104)
window.open(x103,x104);
 else
 self.location=x103;
}
 else
 {
 var x105=x102.getAttribute("_componentId");
 var x106=AdfPage.PAGE.findComponent(x105);
AdfActionEvent.queue(x106,x106.getPartialSubmit());
}
}
AdfDhtmlNavigationPanePeer.prototype._handleRemoveButtonClick= function(x107)
{
this.hideAllPopups(this.getComponent());
 var x108=AdfAgent.AGENT.getEventTarget(x107);
 var x109=x108.getAttribute("_componentId");
 if (x109==null)
{
x109=x108.parentNode.getAttribute("_componentId");
}
 var x110=AdfPage.PAGE.findComponent(x109);
AdfItemEvent.queueItemRemoveEvent(x110);
}
AdfDhtmlNavigationPanePeer.prototype._addSeparators= function(x111,x112,x113)
{
 var x114=x112 + 1;
 if(x113)
x114=x112 - 1;
 var x115=true;
 var x116=x111[x114];
while(x115&&x116)
{
 if (x116.nodeType==1)
{
 if(x116.tagName.toLowerCase()=="img"||
x116.getElementsByTagName("img").length>0)
{
this._overflowSupport.addElement(x116);
x115=false;
}
 else if(x116.tagName.toLowerCase()=="span"||
x116.getElementsByTagName("span").length>0)
{
this._overflowSupport.addElement(x116);
x115=false;
}
}
 if(x113)
x114--;
 else
 x114++;
x116=x111[x114];
}
}
AdfDhtmlNavigationPanePeer.prototype._getActiveChildIndex= function(x117)
{
 var x118= -1;
 var x119;
while(x119=x117[++x118])
{
 if (AdfDomUtils.containsCSSClassName(x119,"p_AFSelected"))
{
 return x118;
}
}
 return -1;
}

AdfUIComponents.createComponentClass("AdfRichShowDetail",
{
componentType:"oracle.adf.RichShowDetail",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"persist",type:"Array"}
,{name:"dontPersist",type:"Array"}
,{name:"handleDisclosure",type:"String","default":"server"}
,{name:"disclosedText",type:"String"}
,{name:"undisclosedText",type:"String"}
,{name:"disclosedTransient",type:"Boolean","default":false}
],
superclass:AdfUIShowDetail
});

AdfRichUIPeer.createPeerClass(AdfDhtmlShowDisclosurePeer,"AdfDhtmlShowDetailPeer",false);
AdfDhtmlShowDetailPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE);
AdfDhtmlShowDetailPeer._SHOW_DETAIL_HEADER_TEXT_STYLE_CLASS="af|showDetail::header-text";
AdfDhtmlShowDetailPeer._SHOW_DETAIL_CHILD_CONTAINER_STYLE_CLASS=
"af|showDetail::child-container";
}
AdfDhtmlShowDetailPeer.ExtendPeer= function(x0)
{
x0.prototype.HandleShowDetailComponentClick=
AdfDhtmlShowDetailPeer.prototype.HandleComponentClick;
x0.prototype.HandleShowDetailComponentKeyUp=
AdfDhtmlShowDetailPeer.prototype.HandleComponentKeyUp;
x0.prototype.queueDisclosureEvent=
AdfDhtmlShowDetailPeer.prototype.queueDisclosureEvent;
x0.prototype._isEventForDisclosure=
AdfDhtmlShowDetailPeer.prototype._isEventForDisclosure;
x0.prototype._handleDisclosureEvent=
AdfDhtmlShowDetailPeer.prototype._handleDisclosureEvent;
 if (x0.prototype.DisclosurePropagatesToServer===undefined)
{
x0.prototype.DisclosurePropagatesToServer=
AdfDhtmlShowDetailPeer.prototype.DisclosurePropagatesToServer;
}
 if (x0.prototype.InitDirtyTracking===undefined)
{
x0.prototype.InitDirtyTracking=
AdfDhtmlShowDetailPeer.prototype.InitDirtyTracking;
}
 if (x0.prototype.RemoveDirtyTracking===undefined)
{
x0.prototype.RemoveDirtyTracking=
AdfDhtmlShowDetailPeer.prototype.RemoveDirtyTracking;
}
 if (x0.prototype.HandleComponentValueChange===undefined)
{
x0.prototype.HandleComponentValueChange=
AdfDhtmlShowDetailPeer.prototype.HandleComponentValueChange;
}
 if (x0.prototype.HandleComponentDisclosure===undefined)
{
x0.prototype.HandleComponentDisclosure=
AdfDhtmlShowDetailPeer.prototype.HandleComponentDisclosure;
}
 if (x0.prototype.ComponentDisclosedChanged===undefined)
{
x0.prototype.ComponentDisclosedChanged=
AdfDhtmlShowDetailPeer.prototype.ComponentDisclosedChanged;
}
}
AdfDhtmlShowDetailPeer.prototype.HandleComponentClick= function(x1)
{
 var x2=this.getComponent();
AdfRichUIPeer.CreateSubId(x2.getClientId(),"_afrDscl");
 var x3=x1.getNativeEvent();
 var x4=AdfAgent.getAgent().getEventTarget(x3);
x4=x4.tagName!="A"?x4.parentNode:x4;
 if (x1.isLeftButtonPressed()&&
this._isEventForDisclosure(x3))
{
 var x5=this._handleDisclosureEvent(x3, !x2.getDisclosed());
 if (x5)
{
x1.cancel();
 return true;
}
}
}
AdfDhtmlShowDetailPeer.prototype.HandleComponentKeyUp= function(
x6)
{
 if (!x6.isCanceled())
{
 var x7=x6.getNativeEvent();
 var x8=AdfAgent.AGENT.getKeyCode(x7);
 var x9=false;
switch(x8)
{
 case AdfKeyStroke.ARROWUP_KEY:
 if (this._isEventForDisclosure(x7)&&
this.getComponent().getDisclosed())
{
x9=this._handleDisclosureEvent(x7,false);
}
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
 if (this._isEventForDisclosure(x7)&&
 !this.getComponent().getDisclosed())
{
x9=this._handleDisclosureEvent(x7,true);
}
break;
}
 if (x9)
{
x6.cancel();
 return true;
}
}
}
AdfDhtmlShowDetailPeer.prototype.HandleClientSideDisclosure= function(
x10)
{
 var x11=AdfPage.PAGE.getLookAndFeel();
 var x12=x11.getSkinProperty(
AdfDhtmlShowDetailPeer._SHOW_DETAIL_CHILD_CONTAINER_STYLE_CLASS);
 var x13=x11.getSkinProperty(
AdfDhtmlShowDetailPeer._SHOW_DETAIL_HEADER_TEXT_STYLE_CLASS);
 var x14=this.getDomElement();
 var x15=AdfAgent.AGENT;
 var x16=this.getComponent();
 var x17=AdfDomUtils.getFirstElementMatch(x14,true,
 function (x18)
{
 return (AdfDomUtils.containsCSSClassName(x18,x12))?
x18:null;
});
 if (x17!=null)
{
 var x19=null;
for(var x20=x17;x20!=null&&x20!=x14;x20=x20.parentNode)
{
 if (x20.tagName=='TR')
{
x19=x20;
break;
}
}
 if (x19!=null)
{
x19.style.display=x10?"":"none";
}
}
 var x21=x16.getClientId();
 var x22=AdfRichUIPeer.CreateSubId(x21,"_afrDscl");
 var x23=x15.getElementById(x22);
 var x24=AdfRichUIPeer.CreateSubId(x21,"_afrHiddenDscl");
 var x25=x15.getElementById(x24);
 var x26=x25.parentNode;
 var x27=x23.parentNode;
x15.elementsRemoved(x27);
x27.removeChild(x23);
x26.appendChild(x23);
x26.removeChild(x25);
x27.appendChild(x25);
x25.setAttribute("id",x22);
x23.setAttribute("id",x24);
 var x28=x10?this._disclosedText:x16.getProperty("undisclosedText");
 if (x28!=null)
{
x17=AdfDomUtils.getFirstElementMatch(x14,true,
 function (x29)
{
 return (AdfDomUtils.containsCSSClassName(x29,x13))?
x29:null;
});
 if (x17!=null)
{
 if (x10)
{
AdfDomUtils.removeAllNodes(x17);
x17.innerHTML=x28;
}
 else
 {
this._disclosedText=x17.innerHTML;
AdfDomUtils.removeAllNodes(x17);
x17.appendChild(document.createTextNode(x28));
}
}
}
x15.elementsAdded(x27);
}
AdfDhtmlShowDetailPeer.prototype._isEventForDisclosure= function(x30)
{
 var x31=this.getComponent();
 var x32=AdfAgent.AGENT.getEventTarget(x30);
 return AdfDhtmlShowDetailPeer.isEventForDisclosure(x31,x32);
}
AdfDhtmlShowDetailPeer.isEventForDisclosure= function(x33,x34)
{
 var x35=AdfRichUIPeer.CreateSubId(x33.getClientId(),"_afrDscl");
x34=x34.tagName!="A"?x34.parentNode:x34;
 return x34.id==x35;
}
AdfDhtmlShowDetailPeer.prototype._handleDisclosureEvent= function(
x36,
x37)
{
this.queueDisclosureEvent(x37,true);
AdfAgent.getAgent().preventDefault(x36);
 return true;
}

AdfUIComponents.createComponentClass("AdfRichPanelBox",
{
componentType:"oracle.adf.RichPanelBox",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"disclosed",type:"Boolean","default":true}
,{name:"helpTopicId",type:"String"}
,"disclosureListener"
,{name:"immediate",type:"Boolean","default":false}
,{name:"persist",type:"Array"}
,{name:"dontPersist",type:"Array"}
,{name:"showDisclosure",type:"Boolean","default":true}
,{name:"handleDisclosure",type:"String","default":"server"}
,{name:"text",type:"String"}
,{name:"type",type:"String","default":"default"}
,{name:"showHeader",type:"String","default":"ifNeeded"}
,{name:"ramp",type:"String","default":"core"}
,{name:"background",type:"String","default":"default"}
,{name:"icon",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"titleHalign",type:"String","default":"start"}
],
eventNames:["disclosure"],
superclass:AdfUIPanel
});

AdfRichPanelBox.prototype.HandleEvent= function(x0)
{
 if (AdfPage.PAGE.isAnimationEnabled()&&x0.getType()==AdfDisclosureEvent.EVENT_TYPE&& !x0.isExpanded())
{
this.getPeer().animateUndisclosure(this,x0);
}
 else
 {
AdfRichPanelBox.superclass.HandleEvent.call(this,x0);
}
}
AdfRichPanelBox.prototype.UndiscloseAnimationCallback= function(x1)
{
 var x2=x1.getSource();
 if (x2&&x2.getPeer())
{
AdfRichPanelBox.superclass.HandleEvent.call(this,x1);
}
}
AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlPanelBoxPeer",false);
AdfDhtmlPanelBoxPeer.InitSubclass= function()
{
AdfDhtmlShowDetailPeer.ExtendPeer(this);
AdfObject.ensureClassInitialization(AdfRichPanelBox);
AdfRichUIPeer.addComponentPropertyChanges(this,
AdfRichPanelBox.DISCLOSED);
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.KEY_UP_EVENT_TYPE,
AdfValueChangeEvent.VALUE_CHANGE_TYPE,
AdfDisclosureEvent.EVENT_TYPE);
this._DRAG_RECOGNIZER= new AdfPanelBoxDragRecognizer();
}
AdfDhtmlPanelBoxPeer.prototype.BindToComponent= function(
x0,
x1)
{
AdfDhtmlPanelBoxPeer.superclass.BindToComponent.call(
this,x0,x1);
this.InitDirtyTracking(x0,x1);
}
AdfDhtmlPanelBoxPeer.prototype.ComponentRemoved= function(
x2)
{
AdfDhtmlPanelBoxPeer.superclass.ComponentRemoved.call(this,x2);
 var x3=this.getDomElement();
 if (x3)
{
this.RemoveDirtyTracking(x2,x3);
}
}
AdfDhtmlPanelBoxPeer.prototype.InitDomElement= function(
x4,
x5)
{
AdfDhtmlPanelBoxPeer.superclass.InitDomElement(x4,x5);
this._checkAnimateDisclosure(x4);
}
AdfDhtmlPanelBoxPeer.prototype._checkAnimateDisclosure= function(
x6)
{
 var x7=x6.getClientId();
 var x8=AdfRichUIPeer.CreateSubId(x7,"content");
 var x9=AdfAgent.AGENT.getElementById(x8);
 if (x9!=null&&x9.style.visibility=="hidden")
{
 var x10=x9.offsetHeight;
 var x11=x9.ownerDocument.createElement("div");
x11.style.overflow="hidden";
x11.style.height="1px";
x9.parentNode.replaceChild(x11,x9);
x11.appendChild(x9);
x9.style.visibility="visible";
animDuration=
parseInt(AdfPage.PAGE.getLookAndFeel().getSkinProperty(this.getAnimationDurationKey()));
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_CONSTANT_SPEED,
animDuration,
[
{
"element":x11,
"properties":
{
"height":x10
}
}
],
null,
AdfDhtmlPanelBoxPeer._handleAfterDiscloseAnimate,
[x11,x9],
x6);
}
}
AdfDhtmlPanelBoxPeer._handleAfterDiscloseAnimate= function(x12)
{
 var x13=x12[0].parentNode;
 if (x13)
{
x13.replaceChild(x12[1],x12[0]);
}
}
AdfDhtmlPanelBoxPeer.prototype.getAnimationDurationKey= function()
{
 return "af|panelBox-tr-animation-duration";
}
AdfDhtmlPanelBoxPeer.prototype.animateUndisclosure= function(x14,x15)
{
 var x16=x14.getClientId();
 var x17=AdfRichUIPeer.CreateSubId(x16,"content");
 var x18=AdfAgent.AGENT.getElementById(x17);
this._disclosedHeight=x18.style.height;
x18.style.overflow="hidden";
animDuration=
parseInt(AdfPage.PAGE.getLookAndFeel().getSkinProperty(this.getAnimationDurationKey()));
AdfDhtmlElementAnimator.animate(
AdfDhtmlElementAnimator.FRAME_METHOD_CONSTANT_SPEED,
animDuration,
[
{
"element":x18,
"properties":
{
"height":0
}
}
],
null,
AdfDhtmlPanelBoxPeer._handleAfterUndiscloseAnimate,
[x14.getClientId(),x15],
x14);
}
AdfDhtmlPanelBoxPeer._handleAfterUndiscloseAnimate= function(x19)
{
 var x20=x19[0];
 var x21=AdfRichUIPeer.CreateSubId(x20,"content");
 var x22=AdfAgent.AGENT.getElementById(x21);
 if (x22!=null)
{
x22.style.visibility="hidden";
}
 var x23=AdfPage.PAGE.findComponent(x20);
 if (x23)
{
x23.UndiscloseAnimationCallback(x19[1]);
 var x24=x23.getPeer();
 if (x24._completeClientSideDisclosure===true)
{
 delete x24._completeClientSideDisclosure;
x24._handleClientSideDisclosure(x23.getDisclosed());
 if (x22!=null)
{
x22.style.height=x24._disclosedHeight!=null?
x24._disclosedHeight:"";
}
 delete x24._disclosedHeight;
}
}
}
AdfDhtmlPanelBoxPeer.prototype.HandleComponentClick= function(x25)
{
 return this.HandleShowDetailComponentClick(x25);
}
AdfDhtmlPanelBoxPeer.prototype.HandleComponentKeyUp= function(
x26)
{
this.HandleShowDetailComponentKeyUp(x26);
}
AdfDhtmlPanelBoxPeer.prototype.getDefaultDragRecognizer= function(x27)
{
 return AdfDhtmlPanelBoxPeer._DRAG_RECOGNIZER;
}
AdfDhtmlPanelBoxPeer.prototype.HandleClientSideDisclosure= function(
x28)
{
 if (!x28&&AdfPage.PAGE.isAnimationEnabled())
{
this._completeClientSideDisclosure=true;
 return;
}
this._handleClientSideDisclosure(x28);
 return true;
}
AdfDhtmlPanelBoxPeer.prototype._handleClientSideDisclosure= function(
x29)
{
 var x30=this.getComponent();
 var x31=AdfAgent.AGENT;
 var x32=AdfPage.PAGE;
 var x33=x30.getClientId();
 var x34=AdfRichUIPeer.CreateSubId(x33,"content");
 var x35=AdfAgent.AGENT.getElementById(x34);
 var x36=x35.parentNode;
x36.style.display=x29?"":"none";
 if (x29&&x32.isAnimationEnabled())
{
x35.style.visibility='hidden';
}
 var x37=AdfRichUIPeer.CreateSubId(x33,"_afrDscl");
 var x38=x31.getElementById(x37);
 var x39=AdfRichUIPeer.CreateSubId(x33,"_afrHiddenDscl");
 var x40=x31.getElementById(x39);
 var x41=x40.parentNode;
 var x42=x38.parentNode;
x31.elementsRemoved(x42);
x42.removeChild(x38);
x41.appendChild(x38);
x41.removeChild(x40);
x42.appendChild(x40);
x40.setAttribute("id",x37);
x38.setAttribute("id",x39);
x31.elementsAdded(x42);
 var x43=this.getDomElement();
 var x44=x43.lastChild;
 var x45=(AdfAgent.AGENT.getNodeName(x44)=="DIV");
 if (x29)
{
 if (x45)
{
x44.style.top="";
}
this._checkAnimateDisclosure(x30);
}
 else
 {
 if (x45)
{
 var x46=x43.firstChild;
 var x47=x46.clientHeight;
x44.style.top=x47 + "px";
}
}
}
function AdfPanelBoxDragRecognizer()
{
this.Init();
}
AdfObject.createSubclass(AdfPanelBoxDragRecognizer,AdfDragRecognizer);
AdfPanelBoxDragRecognizer.prototype.prepDrag= function(x48,x49,x50)
{
AdfAssert.assertPrototype(x49,AdfDragSource);
AdfAssert.assertPrototype(x50,AdfUIInputEvent);
 if (x50.getType()==AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE)
{
 var x51=x49.getComponent();
AdfAssert.assertObject(x51,"Unexpected null component.");
 var x52=x50.getNativeEventTarget();
 if(!AdfDhtmlShowDetailPeer.isEventForDisclosure(x51,x52))
{
 var x53=x51.getPeer();
AdfAssert.assert(x53,"Unexpected null peer.");
x53.bind(x51);
 var x54=x53.getDomElement();
 var x55=AdfDomUtils.getFirstChildElement(x54);
 if (x55)
{
 var x56=AdfAgent.AGENT.getNodeName(x55);
 if ("TABLE"!=x56)
{
x55=AdfDomUtils.getFirstChildElement(x55);
x56=AdfAgent.AGENT.getNodeName(x55);
}
 if ("TABLE"==x56)
{
 var x57=x50.getNativeEventTarget();
 if (AdfDomUtils.isAncestorOrSelf(x55,x57))
{
 return AdfPanelBoxDragRecognizer.superclass.prepDrag.apply(this,arguments);
}
}
}
}
}
 return null;
}
AdfUIComponents.createComponentClass("AdfRichSelectBooleanCheckbox",
{
componentType:"oracle.adf.RichSelectBooleanCheckbox",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"text",type:"String"}
],
superclass:AdfUISelectBoolean
});

AdfRichUIPeer.createPeerClass(AdfDhtmlEditableValuePeer,"AdfDhtmlSelectBooleanCheckboxPeer");
AdfDhtmlSelectBooleanCheckboxPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichSelectBooleanCheckbox);
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfRichSelectBooleanCheckbox.TEXT);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectBooleanCheckbox.TEXT);
this._inlineEditor=null;
this._SELECT_BOOLEAN_VALUE_KEY="_adfSbv";
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.HandleComponentMouseOver= function(x0)
{
this.ShowNoteWindowMouseOver(x0);
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.HandleComponentClick= function(x1)
{
AdfDhtmlSelectBooleanCheckboxPeer.superclass.HandleComponentClick.call(this,x1);
 var x2=this.getComponent();
 var x3=x1.getNativeEventTarget();
 if (AdfAgent.AGENT.getNodeName(x3)=='INPUT')
{
 if (x3&&x3.checked)
this.Validate(x2,true);
 else
 this.Validate(x2,false);
}
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.GetSubmittedValue= function(
x4,
x5)
{
 var x6=AdfDhtmlEditableValuePeer.GetContentNode(x4,x5);
 if (x4.getReadOnly())
{
 return AdfAgent.AGENT.getAttribute(x6,AdfDhtmlSelectBooleanCheckboxPeer._SELECT_BOOLEAN_VALUE_KEY);
}
 if (x6!=null&&x6.checked)
 return true;
 else
 return false;
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.SetDisplayValue= function(
x7,
x8,
x9)
{
 var x10=AdfDhtmlEditableValuePeer.GetContentNode(x7,x8);
 if (x10==null)
 return;
 var x11=x7.getReadOnly();
 if (x11)
{
 if (x9=="true"||x9==true)
{
 var x12=x7.getText();
AdfAgent.AGENT.setTextContent(x10,x12);
}
 else
 {
AdfAgent.AGENT.setTextContent(x10,"");
}
}
 else
 {
 if (x9=="true"||x9==true)
{
x10.checked=true;
}
 else
 {
x10.checked=false;
}
}
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.GetInlineEditor= function(x13)
{
 var x14=AdfDhtmlSelectBooleanCheckboxPeer._inlineEditor;
 if (x14==null)
{
x14= new AdfDhtmlSelectBooleanTextEditor();
AdfDhtmlSelectBooleanCheckboxPeer._inlineEditor=x14;
}
 return x14;
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.GetComponentText= function(
x15,
x16)
{
 var x17=AdfDhtmlSelectBooleanCheckboxPeer.__getInlineEditableTextElement(x16);
 if (x17!=null)
{
 return AdfAgent.AGENT.getTextContent(x17);
}
 else
 {
 return null;
}
}
AdfDhtmlSelectBooleanCheckboxPeer.prototype.ComponentTextChanged= function(
x18,
x19,
x20,
x21)
{
 var x22=AdfDhtmlSelectBooleanCheckboxPeer.__getInlineEditableTextElement(x19);
 if (x22!=null)
{
 return AdfDomUtils.handleTextChangeWithAccessKey(x18,x22,
x20);
}
 else
 {
 return false;
}
}
AdfDhtmlSelectBooleanCheckboxPeer.__getInlineEditableTextElement= function(
x23)
{
 var x24=x23.getElementsByTagName("LABEL");
 var x25=x24.length;
for(var x26=0;x26<x25;x26++)
{
 var x27=x24[x26];
 if ((x27!=null)&&(x27.parentNode.parentNode.className=="AFContentCell"))
{
 return x27;
}
}
 return null;
}

AdfUIComponents.createComponentClass("AdfRichSelectBooleanRadio",
{
componentType:"oracle.adf.RichSelectBooleanRadio",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"group",type:"String"}
,{name:"text",type:"String"}
],
superclass:AdfUISelectBoolean
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectBooleanCheckboxPeer,"AdfDhtmlSelectBooleanRadioPeer");
AdfDhtmlSelectBooleanRadioPeer.prototype.HandleComponentClick= function(x0)
{
AdfDhtmlSelectBooleanRadioPeer.superclass.HandleComponentClick.call(this,x0);
 var x1=this.getComponent();
 var x2=x0.getNativeEventTarget();
 if (x2&&x2.checked)
this.Validate(x1,true);
 else
 this.Validate(x1,false);
this._validateUncheckedComponents(x2);
}
AdfDhtmlSelectBooleanRadioPeer.prototype._validateUncheckedComponents= function(
x3)
{
 var x4=x3.name;
 if (x4=="")
 return;
 var x5=AdfDomUtils.getFormElement(x3);
 var x6=x5.elements[x4];
 if (x6)
{
for(var x7=0;x7<x6.length; ++x7)
{
 var x8=x6[x7];
 if ((x8.type=='radio')&&(x8.checked==false))
{
 var x9=AdfRichUIPeer.getFirstAncestorComponent(x8);
 if ((x9!=null)&&
(x9.getSubmittedValue()==true||
x9.getValue()==true))
{
this.Validate(x9,false);
}
}
}
}
}

AdfUIComponents.createComponentClass("AdfRichSelectManyCheckbox",
{
componentType:"oracle.adf.RichSelectManyCheckbox",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"layout",type:"String","default":"vertical"}
],
superclass:AdfUISelectMany
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectManyPeer,"AdfDhtmlSelectManyCheckboxPeer");
AdfDhtmlSelectManyCheckboxPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectMany.SELECT_ITEMS,
AdfRichSelectManyCheckbox.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectManyCheckbox.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE);
}
AdfDhtmlSelectManyCheckboxPeer.prototype.HandleComponentClick= function(x0)
{
AdfDhtmlSelectManyCheckboxPeer.superclass.HandleComponentClick.call(this,x0);
 var x1=this.getComponent();
 var x2=x0.getNativeEventTarget();
 if (AdfAgent.AGENT.getNodeName(x2)=='INPUT')
{
 var x3=this.GetSubmittedValue(x1,x2);
this.Validate(x1,x3);
}
}
AdfDhtmlSelectManyCheckboxPeer.prototype.GetNoteWindowAlignmentNode= function(x4,x5)
{
 if (!x5)
x5=this.getDomElement();
 var x6=x5.getElementsByTagName("input")[0];
 if (x6)
{
 return x6;
}
 return AdfDhtmlSelectManyCheckboxPeer.superclass.GetNoteWindowAlignmentNode.call(this,x4,x5);
}
AdfDhtmlSelectManyCheckboxPeer.prototype.SetDisplayValue= function(
x7,
x8,
x9)
{
AdfAssert.assertDomElement(x8);
AdfAssert.assertArray(x9);
 var x10=this.GetCheckboxes(x7,x8);
 if (x10)
{
for(var x11=0;x11<x10.length;x11++)
{
 var x12=x10[x11];
 var x13=AdfCollections.indexOf(x9,x12.value);
x12.checked=(x13>=0);
}
}
}
AdfDhtmlSelectManyCheckboxPeer.prototype.GetLabelValue= function(
x14)
{
 return x14.parentNode.nextSibling.firstChild.nodeValue;}
AdfDhtmlSelectManyCheckboxPeer.prototype.GetInlineEditor= function(x15)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfUIComponents.createComponentClass("AdfRichSelectManyListbox",
{
componentType:"oracle.adf.RichSelectManyListbox",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"selectAllVisible",type:"Boolean","default":true}
,{name:"size",type:"Number","default":4}
],
superclass:AdfUISelectMany
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectManyPeer,"AdfDhtmlSelectManyListboxPeer");
AdfDhtmlSelectManyListboxPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectMany.SELECT_ITEMS,
AdfRichSelectManyListbox.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectManyListbox.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE);
this._ALL_ID="all";
this._DISABLED="disabled";
this._TABINDEX="tabIndex";
}
AdfDhtmlSelectManyListboxPeer.prototype.HandleComponentMouseDown= function(x0)
{
 var x1=x0.getNativeEventTarget();
 if (x1.tagName=="LABEL")
{
x1=AdfDomUtils.getFirstChildElement(x1);
}
 else if (x1.tagName=='LI')
{
x1=AdfDomUtils.getFirstChildElement(x1);
 if (x1)
x1=AdfDomUtils.getFirstChildElement(x1);
}
 if (x1&&x1.tagName=="INPUT"&& !x1.disabled)
{
 var x2=this.getDomElement();
 var x3=x0.getNativeEvent();
this._setCurrentTabStop(x2,x1,x3.shiftKey);
x0.cancel();
}
}
AdfDhtmlSelectManyListboxPeer.prototype.HandleComponentClick= function(x4)
{
AdfDhtmlSelectManyListboxPeer.superclass.HandleComponentClick.call(this,x4);
 var x5=x4.getNativeEventTarget();
x5=this.GetCheckboxByEventTarget(x5,x4);
 if(!x5)
 return;
 if (x5.tagName=="INPUT")
{
 var x6=x5.getAttribute("id");
 var x7=this.getComponent();
 var x8=this.getDomElement();
 if (x6)
{
this.UpdateAll(x7,x8,x5.checked,true);
}
 else
 {
 var x9=x4.getNativeEvent();
 if (x9.shiftKey)
{
x5.checked=true;
}
this.UpdateSelectedStyle(x5);
 var x10=this.GetComponentSubmittedValue(x7,x8);
this.Validate(x7,x10);
}
}
}
AdfDhtmlSelectManyListboxPeer.prototype.HandleComponentFocus= function(x11)
{
AdfDhtmlSelectManyListboxPeer.superclass.HandleComponentFocus.call(this,x11);
 var x12=this.getDomElement();
 var x13=AdfFocusUtils.getFirstTabStop(x12);
 if (x13&& !AdfDomUtils.containsCSSClassName(x13,AdfDhtmlSelectManyPeer.HIGHLIGHTED_STYLE))
{
AdfDomUtils.addCSSClassName(x13.parentNode.parentNode,AdfDhtmlSelectManyPeer.HIGHLIGHTED_STYLE);
}
}
AdfDhtmlSelectManyListboxPeer.prototype.HandleComponentBlur= function(x14)
{
 var x15=this.getDomElement();
 var x16=AdfFocusUtils.getFirstTabStop(x15);
 if (x16)
{
AdfDomUtils.removeCSSClassName(x16.parentNode.parentNode,AdfDhtmlSelectManyPeer.HIGHLIGHTED_STYLE);
}
}
AdfDhtmlSelectManyListboxPeer.prototype.HandleComponentKeyDown= function(x17)
{
 var x18=x17.getNativeEventTarget();
 var x19=x17.getNativeEvent();
 var x20=AdfAgent.AGENT.getKeyCode(x19);
 var x21=x17.getSource();
 var x22=this.getDomElement();
 if (x18.tagName=="INPUT")
{
switch(x20)
{
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 var x23=AdfFocusUtils.getFirstTabStop(x22);
 var x24;
 if (x20==AdfKeyStroke.ARROWUP_KEY)
x24=this.GetPreviousItem(x21,x22,x23);
 else
 x24=this.GetNextItem(x21,x22,x23);
 if (x24&&(x24!=x23))
{
this._setCurrentTabStop(x22,x24,x19.shiftKey);
 if (x19.shiftKey)
this.Validate(x21,this.GetComponentSubmittedValue(x21,x22));
x24.focus();
}
x17.cancel();
break;
 case AdfKeyStroke.HOME_KEY:
 case AdfKeyStroke.END_KEY:
 if (x19.shiftKey)
{
 var x25;
 if (x20==AdfKeyStroke.HOME_KEY)
x25=this.GetNextItem(x21,x22,null);
 else
 x25=this.GetPreviousItem(x21,x22,null,true);
this._setCurrentTabStop(x22,x25,true);
x25.focus();
this.Validate(x21,this.GetComponentSubmittedValue(x21,x22));
}
break;
}
}
switch(x20)
{
 case AdfKeyStroke.A_KEY:
 if (x19.ctrlKey)
{
this.UpdateAll(x21,x22,true,true);
x17.cancel();
}
break;
}
}
AdfDhtmlSelectManyListboxPeer.prototype.SetDisplayValue= function(
x26,
x27,
x28)
{
AdfAssert.assertDomElement(x27);
AdfAssert.assertArray(x28);
 var x29=x26.getReadOnly();
 if (x29)
{
 return false;
}
 else
 {
 var x30=this.GetCheckboxes(x26,x27);
 if (x30)
{
 var x31=true;
for(var x32=0;x32<x30.length;x32++)
{
 var x33=x30[x32];
 var x34=AdfCollections.indexOf(x28,x33.value);
x33.checked=(x34>=0);
this.UpdateSelectedStyle(x33);
 if (!x33.checked)
{
 if (!x33.disabled)
x31=false;
}
}
 var x35=this.GetSelectAllCheckbox(x26);
 if (x35!=null)
{
x35.checked=x31;
this.UpdateSelectedStyle(x35);
}
}
}
}
AdfDhtmlSelectManyListboxPeer.prototype.GetInlineEditor= function(x36)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlSelectManyListboxPeer.prototype._setCurrentTabStop= function(x37,x38,x39)
{
 var x40=AdfFocusUtils.getFirstTabStop(x37);
 if (x40!=x38)
{
 if (x39)
{
 var x41=this.getComponent();
this.SelectRange(x41,x37,x40,x38);
}
 if (x40)
{
x40.setAttribute(AdfDhtmlSelectManyListboxPeer._TABINDEX,"-1");
AdfDomUtils.removeCSSClassName(x40.parentNode.parentNode,AdfDhtmlSelectManyPeer.HIGHLIGHTED_STYLE);
}
x38.setAttribute(AdfDhtmlSelectManyListboxPeer._TABINDEX,"0");
}
}

AdfUIComponents.createComponentClass("AdfRichSelectManyChoice",
{
componentType:"oracle.adf.RichSelectManyChoice",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"editable",type:"String","default":"inherit"}
,{name:"lazySelectedLabels",type:"Array"}
,{name:"contentDelivery",type:"String","default":"immediate"}
,{name:"selectAllVisible",type:"Boolean","default":true}
],
superclass:AdfUISelectMany
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectManyPeer,"AdfDhtmlSelectManyChoicePeer");
AdfDhtmlSelectManyChoicePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectMany.SELECT_ITEMS,
AdfRichSelectManyChoice.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectManyChoice.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE);
 if (AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM)
{
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE);
}
this._DROPDOWN_ID="drop";
this._POPUP_ID="pop";
this._POPUP_WRAPPER_ID="popWrap";
this._SPACER_ID="sp";
this._LAZY_ID="lazy";
this._POPUP_PANEL_ID="_afrSelectManyPopupPanel";
this._ITEM_VALUE_EXPANDO="_afrItemValue";
this._ITEM_DISABLE_EXPANDO="_afrDisable";
this._SELECTED_ID_EXPANDO="_afrSelectedItemId";
this._TRUE_VALUE_ATTR="_adfTrueVal";
this._HIGHLIGHTED_STYLE="p_AFHighlighted";
this._SELECTED_STYLE_CLASS="p_AFSelected";
this._DISABLED="disabled";
this._FETCHING_POPUP_WRAPPER_ID="fetchWrap";
this._FETCHING_POPUP_ID="fetchPop";
this._FETCHING_SPACER_ID="fetchSp";
this._FETCHING_POPUP_PANEL_ID="_afrSelectManyFetchingPopupPanel";
this._LAZY_STATE_CONTENT_LOADED="contentLoaded";
this._LAZY_STATE_NO_CONTENT="noContent";
this._LAZY_STATE_FETCHING="fetching";
}
AdfDhtmlSelectManyChoicePeer.prototype.needsFocusTargetStyleClass= function()
{
 return true;
}
AdfDhtmlSelectManyChoicePeer.prototype.HandleComponentMouseDown= function(
x0)
{
 var x1=x0.getSource();
 var x2=this.getDomElement();
 var x3=x0.getNativeEventTarget();
 var x4=AdfDhtmlEditableValuePeer.GetContentNode(x1,x2);
 var x5=x3==this._getDropDownImgElement(x1);
 if(!x4.disabled&&(x5||x3==x4))
{
 if (this.isPopupVisible(x1,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID))
{
this.hidePopup(x1,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID);
}
 else if(!this.isPopupVisible(x1,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID))
{
 var x6=this._getLazyState();
 if (x6==AdfDhtmlSelectManyChoicePeer._LAZY_STATE_NO_CONTENT)
{
this._setLazyState(AdfDhtmlSelectManyChoicePeer._LAZY_STATE_FETCHING);
 new AdfContentFetchEvent(x1,AdfContentFetchEvent.FETCH_EVENT_TYPE).queue();
this._showFetchingDataPopup(x1);
 return;
}
 else if (x6==AdfDhtmlSelectManyChoicePeer._LAZY_STATE_FETCHING)
{
 return;
}
 else
 {
this._showPopupPanel(x1);
}
}
 else
 {
this.hidePopup(x1,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID);
}
}
}
AdfDhtmlSelectManyChoicePeer.prototype.HandleComponentMouseUp= function(
x7)
{
 var x8=x7.getSource();
 var x9=this.getDomElement();
 var x10=x7.getNativeEventTarget();
 var x11=AdfDhtmlEditableValuePeer.GetContentNode(x8,x9);
 var x12=x10==this._getDropDownImgElement(x8);
 if(!x11.disabled&&(x12))
{
 if(!this.isPopupVisible(x8,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID))
{
 if (x12)
{
x11.focus();
}
}
}
}
AdfDhtmlSelectManyChoicePeer.prototype.HandleComponentFocus= function(x13)
{
AdfDhtmlSelectManyChoicePeer.superclass.HandleComponentFocus.call(this,x13);
 var x14=x13.getSource();
 var x15=this.getDomElement();
 var x16=AdfDhtmlEditableValuePeer.GetContentNode(x14,x15);
AdfDomUtils.addCSSClassName(x16,AdfDhtmlSelectManyChoicePeer._SELECTED_STYLE_CLASS);
}
AdfDhtmlSelectManyChoicePeer.prototype.HandleComponentBlur= function(x17)
{
 var x18=x17.getSource();
 var x19=this.getDomElement();
 var x20=AdfDhtmlEditableValuePeer.GetContentNode(x18,x19);
AdfDomUtils.removeCSSClassName(x20,AdfDhtmlSelectManyChoicePeer._SELECTED_STYLE_CLASS);
}
AdfDhtmlSelectManyChoicePeer.prototype.HandleComponentClick= function(x21)
{
AdfDhtmlSelectManyChoicePeer.superclass.HandleComponentClick.call(this,x21);
 var x22=this.getComponent();
 var x23=this.getDomElement();
 var x24=AdfDhtmlEditableValuePeer.GetContentNode(x22,x23);
 if (!x24.disabled)
{
 var x25=x21.getNativeEventTarget();
 if (AdfAgent.AGENT.getNodeName(x25)!='INPUT')
{
x25=AdfDomUtils.getFirstChildElement(x25);
 if (x25)
x25=AdfDomUtils.getFirstChildElement(x25);
 if (x25&&AdfAgent.AGENT.getNodeName(x25)=='INPUT'&&x25.type=="checkbox")
{
 if (!x25.disabled)
{
x25.focus();
x25.click();
}
}
 else
 return;
}
 if (x25.type!="checkbox")
 return;
 var x26=x25.getAttribute("id");
 var x27=this._getCurrentItem(x22,x23);
 if (x25!=x27)
{
this._highlightNewItem(x25,x27);
 if (!x26)
{
 var x28=x21.getNativeEvent();
 if (x28.shiftKey)
{
this.SelectRange(x22,x23,x25,x27);
}
}
}
 if (x26)
{
x23=this.getDomElement();
this.UpdateAll(x22,x23,x25.checked);
}
 var x29=this.GetSubmittedValue(x22,x25);
this.SetDisplayValue(x22,x24,x29);
}
}
AdfDhtmlSelectManyChoicePeer.prototype.HandleComponentKeyDown= function(x30)
{
 var x31=x30.getNativeEventTarget();
 if (x31.tagName=="INPUT")
{
 var x32=x30.getNativeEvent();
 var x33=AdfAgent.AGENT.getKeyCode(x32);
 var x34=x30.getSource();
 if (x33==AdfKeyStroke.ESC_KEY)
{
 if(this.isPopupVisible(x34,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID))
this.hidePopup(x34,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID);
 else if (this.isPopupVisible(x34,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID))
this.hidePopup(x34,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID);
}
 else if (x31.type=="text")
{
 if ((x33==AdfKeyStroke.ARROWDOWN_KEY)||
((x33==AdfKeyStroke.ARROWDOWN_KEY)&&x32.altKey))
{
this.HandleComponentMouseDown(x30);
}
}
 else if (x31.type=="checkbox")
{
 var x35=this.getDomElement();
 var x36;
switch(x33)
{
 case AdfKeyStroke.ENTER_KEY:
 var x37=this._getCurrentItem(x34,x35);
 if (x37)
{
x36=this.GetSubmittedValue(x34,x37);
this.SetDisplayValue(x34,
AdfDhtmlEditableValuePeer.GetContentNode(x34,x35),x36);
}
this.hidePopup(x34,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID);
this.hidePopup(x34,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID);
break;
 case AdfKeyStroke.TAB_KEY:
this.hidePopup(x34,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID);
this.hidePopup(x34,AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID);
 var x38=AdfDhtmlEditableValuePeer.GetContentNode(x34,x35);
 if (x32.shiftKey)
AdfFocusUtils.focusPreviousTabStop(x38);
 else
 AdfFocusUtils.focusNextTabStop(x38);
x30.cancel();
break;
 case AdfKeyStroke.A_KEY:
 if (x32.ctrlKey)
{
this.UpdateAll(x34,x35,true);
x36=this.GetSubmittedValue(x34,x35);
this.SetDisplayValue(x34,
AdfDhtmlEditableValuePeer.GetContentNode(x34,x35),x36);
x30.cancel();
}
break;
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 var x39=this._getCurrentItem(x34,x35);
 var x40;
 if (x33==AdfKeyStroke.ARROWUP_KEY)
x40=this.GetPreviousItem(x34,x35,x39,x32.shiftKey);
 else
 x40=this.GetNextItem(x34,x35,x39);
 if (x40&&(x40!=x39))
{
this._highlightNewItem(x40,x39);
 if (x32.shiftKey)
{
x39.checked=true;
x40.checked=true;
x36=this.GetSubmittedValue(x34,x40);
this.SetDisplayValue(x34,
AdfDhtmlEditableValuePeer.GetContentNode(x34,x35),x36);
}
x40.focus();
}
x30.cancel();
break;
 case AdfKeyStroke.HOME_KEY:
 case AdfKeyStroke.END_KEY:
 if (x32.shiftKey)
{
 var x41=this._getCurrentItem(x34,x35);
 var x42;
 if (x33==AdfKeyStroke.HOME_KEY)
x42=this.GetNextItem(x34,x35,null);
 else
 x42=this.GetPreviousItem(x34,x35,null,true);
this.SelectRange(x34,x35,x41,x42);
x36=this.GetSubmittedValue(x34,x42);
this.SetDisplayValue(x34,
AdfDhtmlEditableValuePeer.GetContentNode(x34,x35),x36);
this._highlightNewItem(x42,x41);
x42.focus();
}
break;
}
}
}
}
AdfDhtmlSelectManyChoicePeer.prototype.ReplaceDomElement= function(x43,x44)
{
AdfDhtmlSelectManyChoicePeer.superclass.ReplaceDomElement.call(this,x43,x44);
 if (this._getLazyState()!=AdfDhtmlSelectManyChoicePeer._LAZY_STATE_FETCHING)
{
 return;
}
this._setLazyState(AdfDhtmlSelectManyChoicePeer._LAZY_STATE_CONTENT_LOADED);
 var x45=this.getComponent();
this.hidePopup(x45,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID);
this._showPopupPanel(x45);
}
AdfDhtmlSelectManyChoicePeer.prototype.GetSelectItemsParentDomElement= function(x46)
{
 var x47=AdfRichUIPeer.CreateSubId(x46.getClientId(),
AdfDhtmlSelectManyChoicePeer._POPUP_ID);
 return AdfAgent.AGENT.getElementById(x47);
}
AdfDhtmlSelectManyChoicePeer.prototype.SetDisplayValue= function(
x48,
x49,
x50)
{
AdfAssert.assertDomElement(x49);
AdfAssert.assertArray(x50);
this._needsDisplayUpdate=false;
 var x51=this.GetCheckboxes(x48,x49);
 if (x51)
{
 var x52=true;
 var x53=null;
 var x54=0;
for(var x55=0;x55<x51.length;x55++)
{
 var x56=x51[x55];
 var x57=AdfCollections.indexOf(x50,x56.value);
x56.checked=(x57>=0);
this.UpdateSelectedStyle(x56);
 if (x56.checked)
{
 var x58=x56.getAttribute(AdfDhtmlSelectManyChoicePeer._TRUE_VALUE_ATTR);
x54++;
 if (x53==null)
x53=x58;
 else
 x53+="; "+x58;
}
 else
 {
 if (!x56.disabled)
x52=false;
}
}
 var x59=this.GetSelectAllCheckbox(x48);
 if (x59!=null)
{
 if (x59.checked!=x52)
{
x59.checked=x52;
}
this.UpdateSelectedStyle(x59);
}
 if (x52&&x54>1)
{
 var x60=AdfPage.PAGE.getLookAndFeel();
x53=x60.getTranslatedString("af_selectManyChoice.LABEL_TIP_SELECT_ALL");
}
 var x61=AdfDhtmlEditableValuePeer.GetContentNode(x48,x49);
 if (x53===null)
x53="";
x61.value=x53;
x61.title=x53;
}
}
AdfDhtmlSelectManyChoicePeer.prototype.GetSubmittedValue= function(
x62,
x63)
{
 var x64=this._getLazyState();
 if (x64!=AdfDhtmlSelectManyChoicePeer._LAZY_STATE_CONTENT_LOADED)
{
AdfAssert.assertDomElement(x63);
 var x65=AdfPage.PAGE.getLookAndFeel();
 var x66=x65.getTranslatedString("af_selectManyChoice.LABEL_TIP_SELECT_ALL");
 var x67=AdfDhtmlEditableValuePeer.GetContentNode(x62,x63);
 if (x67.value==x66)
{
 return null;
}
}
 return AdfDhtmlSelectManyChoicePeer.superclass.GetSubmittedValue(x62,x63);
}
AdfDhtmlSelectManyChoicePeer.prototype.PopupClosed= function(x68,x69,x70)
{
 if(x70==AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID)
{
 var x71=AdfRichUIPeer.CreateSubId(x68.getClientId(),
AdfDhtmlSelectManyChoicePeer._POPUP_WRAPPER_ID);
 var x72=AdfAgent.AGENT.getElementById(x71);
x72.appendChild(x69);
 var x73=this.getDomElement();
 var x74=this.GetSubmittedValue(x68,x73);
this.Validate(x68,x74);
}
 else if(x70==AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID)
{
 var x71=AdfRichUIPeer.CreateSubId(x68.getClientId(),
AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_WRAPPER_ID);
 var x72=AdfAgent.AGENT.getElementById(x71);
x72.appendChild(x69);
}
}
AdfDhtmlSelectManyChoicePeer.prototype.GetNoteWindowAlignmentNode= function(x75,x76)
{
 var x77=AdfDhtmlEditableValuePeer.GetContentNode(x75,x76);
 if (AdfPage.PAGE.getLocaleContext().isRightToLeft()&&(AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM))
{
 return x77;
}
 else
 {
 return x77.parentNode;
}
}
AdfDhtmlSelectManyChoicePeer.prototype.GetInlineEditor= function(x78)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlSelectManyChoicePeer.prototype._showPopupPanel= function(x79)
{
AdfObject.ensureClassInitialization(AdfRichPopup);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
 var x80=x79.getClientId();
 var x81=this.getDomElement();
this._setSpacerWidth(x79,x80,x81,AdfDhtmlSelectManyChoicePeer._SPACER_ID);
 var x82=this._getCurrentItem(x79,x81);
 var x83=this.GetSelectAllCheckbox(x79);
 if (x82!=x83)
{
 if (x82&&AdfDomUtils.containsCSSClassName(x82.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE))
{
AdfDomUtils.removeCSSClassName(x82.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE);
}
}
 if (x83)
x82=x83;
 else
 x82=this._getCurrentItem(x79,x81);
 if (x82&& !AdfDomUtils.containsCSSClassName(x82.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE))
{
AdfDomUtils.addCSSClassName(x82.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE);
}
 var x84=AdfRichUIPeer.CreateSubId(x80,AdfDhtmlSelectManyChoicePeer._POPUP_ID);
 var x85=AdfAgent.AGENT.getElementById(x84);
x85.parentNode.removeChild(x85);
this.showPopup(x79,x85,this._getPopupHints(x79,true),AdfDhtmlSelectManyChoicePeer._POPUP_PANEL_ID);
}
AdfDhtmlSelectManyChoicePeer.prototype._showFetchingDataPopup= function(x86)
{
AdfObject.ensureClassInitialization(AdfRichPopup);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
 var x87=x86.getClientId();
 var x88=this.getDomElement();
this._setSpacerWidth(x86,x87,x88,AdfDhtmlSelectManyChoicePeer._FETCHING_SPACER_ID);
 var x89=AdfRichUIPeer.CreateSubId(x87,AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_ID);
 var x90=AdfAgent.AGENT.getElementById(x89);
x90.parentNode.removeChild(x90);
this.showPopup(x86,x90,this._getPopupHints(x86,false),AdfDhtmlSelectManyChoicePeer._FETCHING_POPUP_PANEL_ID);
}
AdfDhtmlSelectManyChoicePeer.prototype._setSpacerWidth= function(x91,x92,x93,x94)
{
 var x95=AdfRichUIPeer.CreateSubId(x92,x94);
 var x96=AdfAgent.AGENT.getElementById(x95);
 var x97=AdfDhtmlEditableValuePeer.GetContentNode(x91,x93);
x96.style.width=(x97.parentNode.offsetWidth - 7)+ "px";
}
AdfDhtmlSelectManyChoicePeer.prototype._getPopupHints= function(x98,x99)
{
 var x100={};
x100[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x100[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START;
x100[AdfRichPopup.HINT_ALIGN_ID]=AdfDhtmlEditableValuePeer.GetContentNodeId(x98);
x100[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
x100[AdfDhtmlPopupWindow.HINT_FOCUS]=x99;
 return x100;
}
AdfDhtmlSelectManyChoicePeer.prototype._getDropDownImgElement= function(
x101)
{
 var x102=AdfRichUIPeer.CreateSubId(x101.getClientId(),
AdfDhtmlSelectManyChoicePeer._DROPDOWN_ID);
 return AdfAgent.AGENT.getElementById(x102);
}
AdfDhtmlSelectManyChoicePeer.prototype._getCurrentItem= function(x103,x104)
{
 var x105=this.GetSelectAllCheckbox(x103);
 var x106=this.GetCheckboxes(x103,x104);
 var x107=null;
 if (x106)
{
for(var x108=0;x108<x106.length;x108++)
{
cb=x106[x108];
 if (!x107&& !cb.disabled)
x107=cb;
 if (AdfDomUtils.containsCSSClassName(cb.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE))
{
x105=cb;
break;
}
}
}
 if (x105==null)
x105=x107;
 return x105;
}
AdfDhtmlSelectManyChoicePeer.prototype._highlightNewItem= function(x109,x110)
{
 if (x110&&AdfDomUtils.containsCSSClassName(x110.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE))
AdfDomUtils.removeCSSClassName(x110.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE);
 if (x109&& !AdfDomUtils.containsCSSClassName(x109.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE))
AdfDomUtils.addCSSClassName(x109.parentNode.parentNode,AdfDhtmlSelectManyChoicePeer._HIGHLIGHTED_STYLE)
}
AdfDhtmlSelectManyChoicePeer.prototype._getLazyState= function()
{
 var x111=this.getComponent();
 if (x111._lazyState==null)
{
 var x112=AdfRichUIPeer.CreateSubId(x111.getClientId(),
AdfDhtmlSelectManyChoicePeer._LAZY_ID);
 var x113=AdfAgent.AGENT.getElementById(x112);
x111._lazyState=(x113!=null)?AdfDhtmlSelectManyChoicePeer._LAZY_STATE_NO_CONTENT:AdfDhtmlSelectManyChoicePeer._LAZY_STATE_CONTENT_LOADED;
}
 return x111._lazyState;
}
AdfDhtmlSelectManyChoicePeer.prototype._setLazyState= function(x114)
{
 var x115=this.getComponent();
x115._lazyState=x114;
}

AdfUIComponents.createComponentClass("AdfRichSelectOneListbox",
{
componentType:"oracle.adf.RichSelectOneListbox",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"unselectedLabel",type:"String"}
,{name:"size",type:"Number","default":4}
],
superclass:AdfUISelectOne
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectOneListbasePeer,"AdfDhtmlSelectOneListboxPeer");
AdfDhtmlSelectOneListboxPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectOne.SELECT_ITEMS,
AdfRichSelectOneListbox.LABEL);
AdfObject.ensureClassInitialization(AdfRichSelectOneListbox);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectOneListbox.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE,
AdfUIInputEvent.BLUR_EVENT_TYPE);
this._DISABLED_STYLE_CLASS="p_AFDisabled";
this._SELECTED_STYLE_CLASS="p_AFSelected";
this._SELECTED_ID="_afrSelectedId";
this.LIST_HOLDER_ID="listHolder";
this._TITLES_POPULATED_EXPANDO="_adfTP";
}
AdfDhtmlSelectOneListboxPeer.prototype.BindToComponent= function(x0,x1)
{
AdfDhtmlSelectOneListboxPeer.superclass.BindToComponent.call(this,
x0,
x1);
 var x2=AdfRichUIPeer.CreateSubId(x0.getClientId(),
AdfDhtmlSelectOneListboxPeer.LIST_HOLDER_ID);
 var x3=AdfAgent.AGENT;
 var x4=x3.getElementById(x2);
 if (x4){
 var x5=x4.getAttribute(AdfDhtmlSelectOneListboxPeer._TITLES_POPULATED_EXPANDO);
 if (!x5)
{
 var x6=this.GetItemElements(x0);
 var x7=x6.length;
 var x8=null;
 var x9=(x3.getPlatform()==AdfAgent.IE_PLATFORM&&
Math.floor(x3.getVersion())==7);
for(var x10=0;x10<x7;x10++)
{
x8=x6[x10];
 if (x8.title==null||x8.title=="")
x8.setAttribute("title",x8.innerHTML);
 if (x9)
x3.disableUserSelect(x8);
}
x4.setAttribute(AdfDhtmlSelectOneListboxPeer._TITLES_POPULATED_EXPANDO,true);
}
}
}
AdfDhtmlSelectOneListboxPeer.prototype.HandleComponentClick= function(
x11)
{
AdfDhtmlSelectOneListboxPeer.superclass.HandleComponentClick.call(this,x11);
 var x12=x11.getSource();
 var x13=x11.getNativeEventTarget();
 if (AdfAgent.AGENT.getNodeName(x13)=="LABEL")
{
this.focus(x12);
}
 else if(this.IsItemEnabled(x13))
{
 var x14=
x13.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 var x15=this.getDomElement();
 var x16=this._getSelectedItemElement(x12,x15);
 if(x16!=null)
{
 var x17=x11.getNativeEvent().ctrlKey;
 if (x17&&(x16==x13))
{
x14="";
}
}
this._validate(x12,x15,""+x14);
}
}
AdfDhtmlSelectOneListboxPeer.prototype.HandleComponentMouseDown= function(
x18)
{
 var x19=x18.getNativeEvent();
 if (x19.ctrlKey)
x18.cancel();
}
AdfDhtmlSelectOneListboxPeer.prototype.HandleComponentKeyDown= function(x20)
{
 var x21=x20.getNativeEvent();
 var x22=AdfAgent.AGENT.getKeyCode(x21);
 var x23=x20.getSource();
 var x24=this.getDomElement();
 var x25=this._getSelectedItemElement(x23,x24);
 var x26=x20.getNativeEventTarget();
switch(x22)
{
 case AdfKeyStroke.SPACE_KEY:
 if (x21.ctrlKey)
this._validate(x23,x24,"");
x20.cancel();
break;
 case AdfKeyStroke.ENTER_KEY:
this.ValidateIfStashedOldValue(x23,x24);
break;
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 var x27;
 if (x22==AdfKeyStroke.ARROWUP_KEY)
x27=this.GetPreviousEnabledItem(x25);
 else
 x27=this.GetNextEnabledItem(x25);
 if (!x27)
x27=this.GetFirstEnabledItem(x23);
 if (x27)
{
this.StashOldValue(x23,x24);
 var x28=x27.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
this.SetDisplayValue(x23,x24,x28);
}
x20.cancel();
break;
}
}
AdfDhtmlSelectOneListboxPeer.prototype.HandleComponentBlur= function(x29)
{
 var x30=x29.getSource();
 var x31=this.getDomElement();
this.ValidateIfStashedOldValue(x30,x31);
}
AdfDhtmlSelectOneListboxPeer.prototype.SetDisplayValue= function(
x32,
x33,
x34)
{
 var x35=AdfDhtmlEditableValuePeer.GetContentNode(x32,x33);
AdfAssert.assertString(x34);
 if(!x32.getReadOnly())
{
 var x36=this.FindItemElementWithValue(x32,x34);
 var x37=this._getSelectedItemElement(x32,x33);
this.SelectItemElement(x32,x36,x37);
x35.value=x34;
}
}
AdfDhtmlSelectOneListboxPeer.prototype.GetNoteWindowAlignmentNode= function(x38,x39)
{
 var x40=x38.getClientId();
 var x41=AdfRichUIPeer.CreateSubId(x40,
AdfDhtmlSelectOneListboxPeer.LIST_HOLDER_ID);
 return AdfAgent.AGENT.getElementById(x41);
}
AdfDhtmlSelectOneListboxPeer.prototype.GetItemElementsParent= function(x42)
{
 var x43=x42.getClientId();
 return AdfAgent.AGENT.getElementById(AdfRichUIPeer.CreateSubId(x43,AdfDhtmlSelectOneListboxPeer.LIST_HOLDER_ID));
}
AdfDhtmlSelectOneListboxPeer.prototype._getSelectedItemElement= function(
x44,
x45)
{
 var x46=this.GetSubmittedValue(x44,x45);
 return this.FindItemElementWithValue(x44,x46);
}
AdfDhtmlSelectOneListboxPeer.prototype.GetInlineEditor= function(x47)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlSelectOneListboxPeer.prototype._validate= function(x48,x49,x50)
{
this.SetDisplayValue(x48,x49,x50);
this.Validate(x48,x50);
}

AdfUIComponents.createComponentClass("AdfRichSelectOneChoice",
{
componentType:"oracle.adf.RichSelectOneChoice",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"editable",type:"String","default":"inherit"}
,{name:"unselectedLabel",type:"String"}
,{name:"mode",type:"String","default":"default"}
],
superclass:AdfUISelectOne
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectOneListbasePeer,"AdfDhtmlSelectOneChoicePeer");
AdfDhtmlSelectOneChoicePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectOne.SELECT_ITEMS,
AdfRichSelectOneChoice.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,
AdfRichSelectOneChoice.LABEL,
AdfRichSelectOneChoice.DISABLED);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE);
this._TEXT_ID="content";
this._COMPACT="compact";
this._DROPDOWN_ID="drop";
this._POPUP_ID="pop";
this._POPUP_WRAPPER_ID="popWrap";
this._SPACER_ID="sp";
this._POPUP_PANEL_ID="_afrSelectOnePopupPanel";
this._HIGHLIGHTED_STYLE_CLASS="p_AFHighlighted";
this._TEMP_OPTION_KEY="_adfTmpOpt";
}
AdfDhtmlSelectOneChoicePeer.prototype.LazyInitialize= function(x0,x1)
{
AdfDhtmlSelectOneChoicePeer.superclass.LazyInitialize.call(this,x0,x1);
 var x2=AdfDhtmlEditableValuePeer.GetContentNode(x0,x1);
 if (x2)
{
 if (!this._isCompact(x0))
{
AdfRichUIPeer.addEventHandlerToDomInstance(AdfDhtmlSelectOneChoicePeer,
x2,
AdfDhtmlLookAndFeel.CHANGE_EVENT_TYPE);
 var x3=x2.options;
 if (x3)
{
 var x4=x3.length;
for(i=0;i<x4;i++)
{
 if (x3[i].title==null||x3[i].title=="")
x3[i].title=x3[i].text;
}
}
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.HandleComponentMouseDown= function(
x5)
{
 if(x5.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x6=x5.getSource();
 if (this._isCompact(x6)&& !x6.getDisabled())
{
 var x7=x5.getNativeEvent();
 var x8=AdfAgent.AGENT.getEventTarget(x7);
 var x9=AdfRichUIPeer.getDomElementForComponent(x6);
 if (x9==x8||AdfDomUtils.isAncestor(x9,x8))
{
 if(!this.isPopupVisible(x6,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID))
{
this._showPopupPanel(x6);
}
 else
 {
this.hidePopup(x6,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID);
}
}
AdfFocusUtils.focusElement(this._getFocusElement(x6));
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.HandleComponentClick= function(
x10)
{
 if(x10.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
AdfDhtmlSelectOneChoicePeer.superclass.HandleComponentClick.call(this,x10);
 var x11=x10.getSource();
 if (this._isCompact(x11))
{
 var x12=x10.getNativeEventTarget();
 if(this.IsItemEnabled(x12))
{
 var x13=x12.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
AdfDomUtils.removeCSSClassName(x12,AdfDhtmlSelectOneChoicePeer._HIGHLIGHTED_STYLE_CLASS);
 var x14=this.getDomElement();
this.SetDisplayValue(x11,x14,x13);
this.Validate(x11,x13);
this._returnToDropDown(x11);
}
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.HandleComponentKeyDown= function(x15)
{
 if(x15.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x16=x15.getSource();
 if (this._isCompact(x16)&& !x16.getDisabled())
{
 var x17=x15.getNativeEventTarget();
 var x18=x15.getNativeEvent();
 var x19=AdfAgent.AGENT.getKeyCode(x18);
 var x20=this.getDomElement();
 var x21=this.GetSubmittedValue(x16,x20);
 var x22=this.FindItemElementWithValue(x16,x21);
switch(x19)
{
 case AdfKeyStroke.ESC_KEY:
x15.cancel();
this._returnToDropDown(x16);
break;
 case AdfKeyStroke.ENTER_KEY:
 if (this.isPopupVisible(x16,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID))
{
 var x23=AdfDhtmlEditableValuePeer.GetContentNode(x16,x20);
 var x24=x23.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 if (x24!=null)
{
x23.removeAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 var x21=this.GetSubmittedValue(x16,x20);
 if (x21!=x24){
this.Validate(x16,x21);
}
}
this._returnToDropDown(x16);
}
 else if (x19==AdfKeyStroke.ENTER_KEY)
this._showPopupPanel(x16);
break;
 case AdfKeyStroke.TAB_KEY:
 if (this.isPopupVisible(x16,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID))
{
this._returnToDropDown(x16);
}
break;
 case AdfKeyStroke.ARROWDOWN_KEY:
 if (x18.altKey)
{
this._showPopupPanel(x16);
break;
}
 case AdfKeyStroke.ARROWUP_KEY:
 if (x17.tagName=="A"&&
 !this.isPopupVisible(x16,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID))
{
this._showPopupPanel(x16);
break;
}
 var x25;
 if (x19==AdfKeyStroke.ARROWUP_KEY)
x25=this.GetPreviousEnabledItem(x22);
 else
 x25=this.GetNextEnabledItem(x22);
 if (!x25)
x25=this.GetFirstEnabledItem(x16);
 var x26=this.isPopupVisible(x16,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID);
 if (x25!=x22)
{
 var x27=""+x25.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 if (x26)
{
 var x23=AdfDhtmlEditableValuePeer.GetContentNode(x16,x20);
 if (x23.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO)==null)
x23.setAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO,""+x21);
this.SetDisplayValue(x16,x20,x27);
}
 else
 this.Validate(x16,x27);
AdfFocusUtils.focusElement(this._getFocusElement(x16));
}
 if(x26)
x15.cancel();
break;
}
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.HandleComponentMouseOver= function(x28)
{
 if(x28.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x29=x28.getSource();
 var x30=x28.getNativeEventTarget();
 if(this.IsItemEnabled(x30))
{
 if (!AdfDomUtils.containsCSSClassName(x30,AdfDhtmlSelectOneChoicePeer._HIGHLIGHTED_STYLE_CLASS))
{
AdfDomUtils.addCSSClassName(x30,AdfDhtmlSelectOneChoicePeer._HIGHLIGHTED_STYLE_CLASS);
}
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.HandleComponentMouseOut= function(x31)
{
 if(x31.getEventPhase()==AdfBaseEvent.AT_TARGET_PHASE)
{
 var x32=x31.getSource();
 var x33=x31.getNativeEventTarget();
 if(this.IsItemEnabled(x33))
{
AdfDomUtils.removeCSSClassName(x33,AdfDhtmlSelectOneChoicePeer._HIGHLIGHTED_STYLE_CLASS);
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.HandleDomChange= function(x34,x35)
{
 var x36=this.getDomElement();
this.Validate(x34,this.GetSubmittedValue(x34,x36));
}
AdfDhtmlSelectOneChoicePeer.prototype.PopupClosed= function(x37,x38,x39)
{
 if (x39==AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID)
{
 var x40=AdfRichUIPeer.CreateSubId(x37.getClientId(),
AdfDhtmlSelectOneChoicePeer._POPUP_WRAPPER_ID);
 var x41=AdfAgent.AGENT.getElementById(x40);
x41.appendChild(x38);
 var x42=AdfRichUIPeer.getDomElementForComponent(x37);
 var x43=AdfDhtmlEditableValuePeer.GetContentNode(x37,x42);
 var x44=x43.getAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
 if (x44!=null)
{
x43.removeAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO);
this.SetDisplayValue(x37,x42,x44);
}
}
}
AdfDhtmlSelectOneChoicePeer.prototype.GetNoteWindowAlignmentNode= function(x45,x46)
{
 return this._getFocusElement(x45);
}
AdfDhtmlSelectOneChoicePeer.prototype.GetComponentMode= function(
x47)
{
 return x47.getMode();
}
AdfDhtmlSelectOneChoicePeer.prototype.SetDisplayValue= function(
x48,
x49,
x50)
{
 var x51=AdfDhtmlEditableValuePeer.GetContentNode(x48,x49);
 if (x51==null)
 return;
 var x52=x48.getReadOnly();
AdfAssert.assertString(x50);
 if(!x52)
{
 var x53=this.FindItemElementWithValue(x48,x50);
 if (this._isCompact(x48))
{
 var x54=this.GetSubmittedValue(x48,x49);
 var x55=this.FindItemElementWithValue(x48,x54);
 var x56;
this.SelectItemElement(x48,x53,x55);
 if(x53==null)
{
this.AddEmptyOption(x48,x49);
}
}
 else
 {
 if (x53)
{
 var x57=AdfAgent.AGENT.getAttribute(x53,
AdfDhtmlSelectOneChoicePeer._TEMP_OPTION_KEY);
 if (!x57)
{
 var x58=AdfDomUtils.getFirstDescendentElement(x51,"OPTION");
x57=AdfAgent.AGENT.getAttribute(x58,
AdfDhtmlSelectOneChoicePeer._TEMP_OPTION_KEY);
 if (x57)
{
x51.removeChild(x58);
}
}
x51.title=x53.title;
}
}
x51.value=x50;
}
}
AdfDhtmlSelectOneChoicePeer.prototype.AddEmptyOption= function(
x59,
x60)
{
 var x61=x59.getClientId();
 var x62=AdfRichUIPeer.CreateSubId(x61,
AdfDhtmlSelectOneChoicePeer._POPUP_ID);
 var x63=AdfAgent.AGENT.getElementById(x62);
 var x64=x63.firstChild;
 var x65=x64.insertRow(0);
 var x66=selectedItem.cloneNode(true);
 var x67=x59.getUnselectedLabel();
 if(x67==null)
{
x67="";
}
x66.setAttribute(AdfDhtmlSelectOneListbasePeer._ITEM_VALUE_EXPANDO,"");
x66.firstChild.nodeValue=x67;
x65.appendChild(x66);
AdfAgent.AGENT.elementsAdded(x66);
}
AdfDhtmlSelectOneChoicePeer.prototype.GetItemElements= function(
x68)
{
 if (this._isCompact(x68))
 return AdfDhtmlSelectOneChoicePeer.superclass.GetItemElements.call(this,x68);
 var x69=this.getDomElement();
 var x70=AdfDhtmlEditableValuePeer.GetContentNode(x68,x69);
 if (x70==null)
 return null;
 return x70.options;
}
AdfDhtmlSelectOneChoicePeer.prototype.GetComponentSelectItems= function(
x71,
x72)
{
 if (this._isCompact(x71))
 return AdfDhtmlSelectOneChoicePeer.superclass.GetComponentSelectItems.call(this,x71,x72);
 var x73=AdfDhtmlEditableValuePeer.GetContentNode(x71,x72);
 if (x73==null)
 return null;
 var x74= new Array();
 var x75;
 var x76=x73.options;
 var x77=x76.length;
for(x75=0;x75<x77;x75++)
{
x74[x75]= new AdfSelectItem();
x74[x75].setValue(x76[x75].value);
x74[x75].setLabel(x76[x75].text);
x74[x75].setDisabled(x76[x75].disabled);
}
 return x74;
}
AdfDhtmlSelectOneChoicePeer.prototype.FindItemElementWithValue= function(
x78,
x79)
{
 if (this._isCompact(x78))
 return AdfDhtmlSelectOneChoicePeer.superclass.FindItemElementWithValue.call(this,x78,x79);
 var x80=this.getDomElement();
 var x81=AdfDhtmlEditableValuePeer.GetContentNode(x78,x80);
 if (x81==null)
 return null;
 var x82= new Array();
 var x83;
 var x84=x81.options;
 var x85=x84.length;
for(x83=0;x83<x85;x83++)
{
 if(x84[x83].value==x79)
 return x84[x83];
}
 return null;
}
AdfDhtmlSelectOneChoicePeer.prototype.GetInlineEditor= function(x86)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlSelectOneChoicePeer.prototype.ComponentDisabledChanged= function(
x87,
x88,
x89,
x90)
{
 var x91=AdfDhtmlEditableValuePeer.GetContentNode(x87,x88);
 if (x89==true)
{
AdfDomUtils.addCSSClassName(x88,AdfRichUIPeer.DISABLED_STYLECLASS);
x91.setAttribute("disabled","true");
}
 else
 {
AdfDomUtils.removeCSSClassName(x88,AdfRichUIPeer.DISABLED_STYLECLASS);
x91.removeAttribute("disabled");
}
}
AdfDhtmlSelectOneChoicePeer.prototype._returnToDropDown= function(
x92)
{
 var x93=x92.getClientId();
 var x94=AdfRichUIPeer.CreateSubId(x92.getClientId(),
AdfDhtmlSelectOneChoicePeer._POPUP_ID);
 var x95=AdfAgent.AGENT.getElementById(x94);
this.hidePopup(x92,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID);
AdfFocusUtils.focusElement(this._getFocusElement(x92));
}
AdfDhtmlSelectOneChoicePeer.prototype._showPopupPanel= function(
x96)
{
AdfObject.ensureClassInitialization(AdfRichPopup);
AdfObject.ensureClassInitialization(AdfDhtmlPopupWindow);
 var x97=x96.getClientId();
 var x98=AdfRichUIPeer.CreateSubId(x97,AdfDhtmlSelectOneChoicePeer._SPACER_ID);
 var x99=AdfAgent.AGENT.getElementById(x98);
 var x100=AdfRichUIPeer.CreateSubId(x97,AdfDhtmlSelectOneChoicePeer._POPUP_ID);
 var x101=AdfAgent.AGENT.getElementById(x100);
x101.parentNode.removeChild(x101);
 var x102={};
x102[AdfDhtmlPopupWindow.HINT_TYPE]=AdfDhtmlPopupWindow.HINT_TYPE_MENU;
x102[AdfDhtmlPopupWindow.HINT_AUTODISMISS]=AdfDhtmlPopupWindow.HINT_AUTODISMISS_MENU;
x102[AdfDhtmlPopupWindow.HINT_FOCUS]=false;
x102[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START;
 if (this._isCompact(x96))
x102[AdfRichPopup.HINT_ALIGN_ID]=AdfRichUIPeer.CreateSubId(x97,
AdfDhtmlSelectOneChoicePeer._DROPDOWN_ID);
 else
 x102[AdfRichPopup.HINT_ALIGN_ID]=AdfRichUIPeer.CreateSubId(x97,
AdfDhtmlSelectOneChoicePeer._TEXT_ID);
this.showPopup(x96,x101,x102,AdfDhtmlSelectOneChoicePeer._POPUP_PANEL_ID);
}
AdfDhtmlSelectOneChoicePeer.prototype._isCompact= function(x103)
{
 var x104=this.GetComponentMode(x103);
 return (x104==AdfDhtmlSelectOneChoicePeer._COMPACT)
}
AdfDhtmlSelectOneChoicePeer.prototype._getFocusElement= function(
x105)
{
 var x106;
 if(this._isCompact(x105))
x106=AdfRichUIPeer.CreateSubId(x105.getClientId(),
AdfDhtmlSelectOneChoicePeer._DROPDOWN_ID);
 else
 x106=AdfRichUIPeer.CreateSubId(x105.getClientId(),
AdfDhtmlSelectOneChoicePeer._TEXT_ID);
 return AdfAgent.AGENT.getElementById(x106);
}
AdfDhtmlSelectOneChoicePeer.prototype.GetItemElementsParent= function(x107)
{
 var x108=x107.getClientId();
 if (this._isCompact(x107))
 return AdfAgent.AGENT.getElementById(AdfRichUIPeer.CreateSubId(x108,AdfDhtmlSelectOneChoicePeer._POPUP_ID));
 else
 return AdfAgent.AGENT.getElementById(AdfRichUIPeer.CreateSubId(x108,AdfDhtmlSelectOneChoicePeer._TEXT_ID));
}

AdfUIComponents.createComponentClass("AdfUISelectOrder",
{
componentType:"org.apache.myfaces.trinidad.SelectOrder",
superclass:AdfUISelectMany
});

AdfUIComponents.createComponentClass("AdfRichSelectManyShuttle",
{
componentType:"oracle.adf.RichSelectManyShuttle",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"layout",type:"String","default":"horizontal"}
,{name:"size",type:"Number"}
,{name:"leadingHeader",type:"String"}
,{name:"trailingHeader",type:"String"}
,{name:"leadingDescShown",type:"Boolean","default":false}
,{name:"trailingDescShown",type:"Boolean","default":false}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
],
superclass:AdfUISelectMany
});

AdfRichSelectManyShuttle.SELECTION='selection';
AdfRichSelectManyShuttle.InitSubclass= function()
{
AdfUIComponent.SetDisconnectedProperty(this,AdfRichSelectManyShuttle.SELECTION);
}
AdfRichSelectManyShuttle.prototype.getSelection= function()
{
 return this.getProperty(AdfRichSelectManyShuttle.SELECTION);
}
AdfRichUIPeer.createPeerClass(AdfDhtmlSelectManyPeer,"AdfDhtmlSelectManyShuttlePeer");
AdfDhtmlSelectManyShuttlePeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.CLICK_EVENT_TYPE,
AdfUIInputEvent.DOUBLE_CLICK_EVENT_TYPE,
AdfUIInputEvent.FOCUS_EVENT_TYPE,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.KEY_DOWN_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectMany.SELECT_ITEMS);
AdfObject.ensureClassInitialization(AdfRichSelectManyShuttle);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectManyShuttle.LABEL);
this._BUTCON_KEYS={};
this._MOVE_ID_ATTR_NAME="_adfMove";
this._BUTCON_KEYS[this._MOVE_ID_ATTR_NAME]="move";
this._MOVEALL_ID_ATTR_NAME="_adfMoveall";
this._BUTCON_KEYS[this._MOVEALL_ID_ATTR_NAME]="moveall";
this._REMOVE_ID_ATTR_NAME="_adfRemove";
this._BUTCON_KEYS[this._REMOVE_ID_ATTR_NAME]="remove";
this._REMOVEALL_ID_ATTR_NAME="_adfRemoveall";
this._BUTCON_KEYS[this._REMOVEALL_ID_ATTR_NAME]="removeall";
this._TOP_ID_ATTR_NAME="_adfTop";
this._BUTCON_KEYS[this._TOP_ID_ATTR_NAME]="move-top";
this._UP_ID_ATTR_NAME="_adfUp";
this._BUTCON_KEYS[this._UP_ID_ATTR_NAME]="move-up";
this._DOWN_ID_ATTR_NAME="_adfDown";
this._BUTCON_KEYS[this._DOWN_ID_ATTR_NAME]="move-down";
this._BOTTOM_ID_ATTR_NAME="_adfBottom";
this._BUTCON_KEYS[this._BOTTOM_ID_ATTR_NAME]="move-bottom";
this._DISABLED_STYLE_CLASS="p_AFDisabled";
this._TABINDEX="tabIndex";
this._HREF="href";
this._ONCLICK="onclick";
this._RETURN_FALSE="return false;";
this._MOVE_ID="move";
this._MOVEALL_ID="moveall";
this._REMOVE_ID="remove";
this._REMOVEALL_ID="removeall";
this._TOP_ID="move-top";
this._UP_ID="move-up";
this._DOWN_ID="move-down";
this._BOTTOM_ID="move-bottom";
this._LAZY_ATTR="_adfLazy";
this._SELECT_VALUES="_adfSelectValues";
this._LEAD_ALL_ID="leadAllId";
this._LEAD_DESC="ldDesc";
this._TRAIL_DESC="trDesc";
this._LEAD_UL="leadUl";
this._TRAIL_UL="trailUl";
this._TRAIL_ITEMS="trailItems";
this._REORDER_DIV="reorderDiv";
this._MOVE_DIV="moveDiv";
this._LEAD_UL_ID_EXPANDO="_adfLeadULId";
this._TRAIL_UL_ID_EXPANDO="_adfTrailULId";
this._TRAIL_ITEMS_ID_EXPANDO="_adfTrailItems";
this._REORDER_DIV_ID_EXPANDO="_adfReorderDivId";
this._MOVE_DIV_ID_EXPANDO="_adfMoveDivId";
}
AdfDhtmlSelectManyShuttlePeer.prototype.LazyInitialize= function(x0,x1)
{
 var x2=x0.getClientId();
 var x3=AdfAgent.AGENT;
 var x4=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlSelectManyShuttlePeer._TRAIL_ITEMS);
x1.setAttribute(AdfDhtmlSelectManyShuttlePeer._TRAIL_ITEMS_ID_EXPANDO,x4);
AdfDhtmlSelectManyShuttlePeer.superclass.LazyInitialize.call(this,x0,x1);
 var x5=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlSelectManyShuttlePeer._LEAD_UL);
 var x6=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL);
 var x7=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlSelectManyShuttlePeer._REORDER_DIV);
 var x8=AdfRichUIPeer.CreateSubId(x2,AdfDhtmlSelectManyShuttlePeer._MOVE_DIV);
x1.setAttribute(AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO,x5);
x1.setAttribute(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO,x6);
x1.setAttribute(AdfDhtmlSelectManyShuttlePeer._REORDER_DIV_ID_EXPANDO,x7);
x1.setAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_DIV_ID_EXPANDO,x8);
this._initLazyLoad(x1);
 if(x0.getReadOnly()!=true)
x1.setAttribute(AdfDhtmlSelectManyShuttlePeer._SELECT_VALUES,this._saveValuesOnElement(x1));
 if (x3.getPlatform()==AdfAgent.IE_PLATFORM)
{
 var x9=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
 var x10=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
 if (x9)
x3.disableUserSelect(x9);
 if (x10)
x3.disableUserSelect(x10);
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.Focus= function()
{
 var x11=this.getDomElement();
 var x12=this.getComponent();
 var x13=AdfDhtmlEditableValuePeer.GetContentNode(x12,x11);
 var x14=AdfFocusUtils.getFirstTabStop(x13);
 if (x14!=null)
{
AdfFocusUtils.focusElement(x14);
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.HandleComponentFocus= function(x15)
{
 var x16=x15.getNativeEventTarget();
AdfDhtmlSelectManyShuttlePeer.superclass.HandleComponentFocus.call(this,x15);
 if (x16.tagName=="LI")
{
 var x17=x16.getElementsByTagName("input")[0];
 var x18=AdfAgent.AGENT.getComputedStyle(x17);
 if (x18.display!="none")
{
 var x19=this._getParentContainer(this.getDomElement(),x17);
this._setCurrentTabStop(x19,x17,null);
x17.focus();
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.HandleComponentMouseDown= function(x20)
{
 var x21=x20.getNativeEventTarget();
 if (x21.tagName=="LABEL"||x21.tagName=="LI")
{
x21=x21.getElementsByTagName("input")[0];
}
 if (x21&&x21.tagName=="INPUT"&& !x21.disabled)
{
 var x22=this.getDomElement();
 var x23=this._getParentContainer(x22,x21);
 var x24=x20.getNativeEvent();
this._setCurrentTabStop(x23,x21,x24.shiftKey);
x20.cancel();
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.HandleComponentKeyDown= function(x25)
{
 var x26=x25.getNativeEventTarget();
 if (x26.tagName=="INPUT"||x26.tagName=="LI")
{
 var x27=x25.getNativeEvent();
 var x28=AdfAgent.AGENT.getKeyCode(x27);
 var x29=this.getDomElement();
 var x30=this._getParentContainer(x29,x26);
 var x31;
 if(x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._LEAD_UL)!= -1)
{
x31=AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO;
}
 else if(x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL)!= -1)
{
x31=AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO;
}
switch(x28)
{
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 var x32=AdfFocusUtils.getFirstTabStop(x30);
 if (x32.tagName=="LI")
{
x32=x32.getElementsByTagName("input")[0];
}
 var x33;
 if (x28==AdfKeyStroke.ARROWUP_KEY)
{
x33=this.GetPreviousItem(null,x29,x32,true,x31);
}
 else
 {
x33=this.GetNextItem(null,x29,x32,x31);
}
 if (x33&&(x33!=x32))
{
this._setCurrentTabStop(x30,x33,x27.shiftKey);
 var x34=AdfAgent.AGENT.getComputedStyle(x33);
 if (x34.display=="none")
x33.parentNode.parentNode.focus();
 else
 x33.focus();
}
x25.cancel();
break;
 case AdfKeyStroke.SPACE_KEY:
 if (x26.tagName=="LI")
{
this._updateClickedCheckbox(x26,x25);
x25.cancel();}
}
}
 else if (x26.tagName=="A")
{
 var x27=x25.getNativeEvent();
 var x28=AdfAgent.AGENT.getKeyCode(x27);
 var x29=this.getDomElement();
 var x30=this._getButconParentContainer(x29,x26);
 var x31;
switch(x28)
{
 case AdfKeyStroke.ARROWUP_KEY:
 case AdfKeyStroke.ARROWDOWN_KEY:
 case AdfKeyStroke.ARROWLEFT_KEY:
 case AdfKeyStroke.ARROWRIGHT_KEY:
 var x35=AdfFocusUtils.getFirstTabStop(x30);
 var x36;
 var x37=AdfKeyStroke.ARROWUP_KEY;
 var x38=AdfKeyStroke.ARROWDOWN_KEY;
 var x39=false;
 var x40=x26;
 var x41=x40.parentNode;
 var x42=x41.parentNode;
 var x43=x42.parentNode;
 var x44=(x43.getElementsByTagName("TD").length>1);
 if (x44&&
x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._REORDER_DIV)== -1)
{
 if (AdfPage.PAGE.getLocaleContext().isRightToLeft())
{
x37=AdfKeyStroke.ARROWRIGHT_KEY;
x38=AdfKeyStroke.ARROWLEFT_KEY;
}
 else
 {
x37=AdfKeyStroke.ARROWLEFT_KEY;
x38=AdfKeyStroke.ARROWRIGHT_KEY;
}
}
 if (x28==x37)
{
 if(x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._REORDER_DIV)!= -1)
{
x31=AdfDhtmlSelectManyShuttlePeer._REORDER_DIV_ID_EXPANDO;
}
 else if(x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._MOVE_DIV)!= -1)
{
x31=AdfDhtmlSelectManyShuttlePeer._MOVE_DIV_ID_EXPANDO;
}
x36=this._getPreviousButcon(x29,x31,x35);
x39=true;
}
 else if (x28==x38)
{
 if(x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._REORDER_DIV)!= -1)
{
x31=AdfDhtmlSelectManyShuttlePeer._REORDER_DIV_ID_EXPANDO;
}
 else if(x30.id.indexOf(AdfDhtmlSelectManyShuttlePeer._MOVE_DIV)!= -1)
{
x31=AdfDhtmlSelectManyShuttlePeer._MOVE_DIV_ID_EXPANDO;
}
x36=this._getNextButcon(x29,x31,x35);
x39=true;
}
 if (x39)
{
 if (x36&&(x36!=x35))
{
this._setCurrentTabStop(x30,x36,x27.shiftKey);
x36.focus();
}
x25.cancel();
}
break;
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.HandleComponentClick= function(x45)
{
AdfDhtmlSelectManyShuttlePeer.superclass.HandleComponentClick.call(this,x45);
 var x46=this.getComponent();
 if(x46.getDisabled())
 return;
 if (x45.isLeftButtonPressed())
{
 var x47=x45.getNativeEventTarget();
 var x48=AdfAgent.AGENT;
 var x49=this._checkTask(x47);
 if(x49)
{
 if(x49.toLowerCase().indexOf("-")== -1)
this._smartMove(x49);
 else
 {
this._reorder(x49);
this._manageReorderButtons();
}
x48.preventDefault(x45.getNativeEvent());
}
 else
 {
 var x50=this.getDomElement();
 var x51=this._getParentContainer(x50,x47);
 if (AdfDomUtils.isAncestor(x51,x47))
{
this._updateClickedCheckbox(x47,x45);
 var x52=AdfFocusUtils.getFirstTabStop(x51);
 if (x52)
AdfFocusUtils.focusElement(x52);
}
 else
 {
this.focus(x46);
}
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.HandleComponentDblClick= function(x53)
{
 var x54=this.getComponent();
 if(x54.getDisabled())
 return;
 if (x53.isLeftButtonPressed())
{
 var x55=x53.getNativeEventTarget();
checkbox=this.GetCheckboxByEventTarget(x55,x53);
 if(this.IsCheckbox(checkbox))
{
 var x56=this._isReorderOnly();
 if(!x56)
{
 var x57=null;
 var x58=this.getDomElement();
 var x59=this._getParentContainer(x58,x55);
 var x60=x59.id;
 var x61=AdfAgent.AGENT.getComputedStyle(checkbox);
 if (x61.display=="none")
{
checkbox.checked=true;
}
 if(x60.indexOf(AdfDhtmlSelectManyShuttlePeer._LEAD_UL)!= -1)
x57="move";
 else if(x60.indexOf(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL)!= -1)
x57="remove";
 if (x57!=null)
{
this._smartMove(x57);
}
}
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.Validate= function(x62,x63)
{
AdfDhtmlSelectManyShuttlePeer.superclass.Validate.call(this,x62,x63);
this._disableButtons(this.getDomElement());
}
AdfDhtmlSelectManyShuttlePeer.prototype.SetDisplayValue= function(
x64,
x65,
x66)
{
AdfAssert.assertDomElement(x65);
AdfAssert.assertArrayOrNull(x66);
 if(!this._isReorderOnly())
{
boxes=this.GetCheckboxes(x64,null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
 var x67=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
for(var x68=0;x68<boxes.length;x68++)
{
 var x69=this._getElementFromContainerByValue(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO,boxes[x68].value);
x67.appendChild(x69);
}
 if(x66!=AdfCollections.EMPTY_ARRAY)
{
 var x70=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
for(var x71=0;x71<x66.length;x71++)
{
 var x69=this._getElementFromContainerByValue(AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO,x66[x71]);
 if(x69)
x70.appendChild(x69);
}
}
this._initLazyLoad(x65);
this._disableButtons(x65);
this._setCurrentTabStop(this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO),this._getFirstEnabledCheckbox(AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO),false);
this._setCurrentTabStop(this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO),this._getFirstEnabledCheckbox(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO),false);
}
this._createSubmitValueArray(false);
}
AdfDhtmlSelectManyShuttlePeer.prototype.GetSubmittedValue= function(
component,
domElement)
{
AdfAssert.assertDomElement(domElement);
 var readOnly=component.getReadOnly();
 var disabled=component.getDisabled();
 if (readOnly||disabled)
{
 var domNode=AdfDhtmlEditableValuePeer.GetContentNode(component,domElement);
 var itemValues=domNode.getAttribute(AdfDhtmlSelectManyPeer._ITEM_VALUE_EXPANDO);
 return eval(itemValues);
}
 else
 {
 var hidden=this._getHiddenField();
 var values= new Array();
 if(hidden)
{
values=hidden.value.split(";");
 if (values!="")
{
 return values;
}
 return null;
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype.GetComponentSelectItems= function(
x72,
x73)
{
AdfAssert.assertDomElement(x73);
 var x74= new Array();
 var x75=this.GetCheckboxes(x72,null,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
 var x76;
for(x76=0;x76<x75.length;x76++)
{
x74[x76]= new AdfSelectItem();
x74[x76].setValue(x75[x76].value);
x74[x76].setLabel(this.GetLabelValue(x75[x76]));
x74[x76].setDisabled(x75[x76].disabled);
}
x75=this.GetCheckboxes(x72,null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
for(var x77=0;x77<x75.length;x77++,x76++)
{
x74[x76]= new AdfSelectItem();
x74[x76].setValue(x75[x77].value);
x74[x76].setLabel(this.GetLabelValue(x75[x77]));
x74[x76].setDisabled(x75[x77].disabled);
}
 return x74;
}
AdfDhtmlSelectManyShuttlePeer.prototype.GetCheckboxes= function(x78,x79,x80)
{
AdfAssert.assertDomElementOrNull(x79);
AdfAssert.assertString(x80);
 var x81= new Array();
 var x82= new Array();
 var x83=AdfAgent.AGENT;
 var x84=this._getContainer(x79,x80);
 if(x84)
{
x82=x84.childNodes;
}
for(i=0;i<x82.length;i++)
{
 if(x82[i].nodeType==1)
{
 var x85=x82[i].getElementsByTagName("input")[0];
 if(x85)
x81.push(x85);
}
}
 return x81;
}
AdfDhtmlSelectManyShuttlePeer.prototype.GetInlineEditor= function(x86)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfDhtmlSelectManyShuttlePeer.prototype.GetNoteWindowAlignmentNode= function(x87,x88)
{
 return this._getContainer(x88,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
}
AdfDhtmlSelectManyShuttlePeer.prototype.GetCheckboxByEventTarget= function(x89,x90)
{
 var x91=this._getParentContainer(this.getDomElement(),x89);
 if(AdfDomUtils.isAncestor(x91,x89))
{
 var x92=x91.getElementsByTagName("li");
 if(x92.length>0)
{
 var x93=AdfDhtmlSelectManyShuttlePeer.superclass.GetCheckboxByEventTarget.call(this,x89,x90);
 return x93;
}
}
 return x89;
}
AdfDhtmlSelectManyShuttlePeer.prototype._updateClickedCheckbox= function(x94,x95)
{
x94=this.GetCheckboxByEventTarget(x94,x95);
 if(this.IsCheckbox(x94))
{
 var x96=x94;
this._showDesc(x96);
 var x97=this._isReorderOnly();
 var x98;
 var x99=x95.getNativeEvent();
 var x100=AdfAgent.AGENT.getComputedStyle(x96);
 if (x99.shiftKey)
{
x96.checked=true;
}
 else if (x100.display=="none"&& !x99.ctrlKey)
{
 var x101=this._getParentContainer(this.getDomElement(),x96);
this._unselectAll(x101);
x96.checked=true;
}
this.UpdateSelectedStyle(x96);
 if(!x97)
{
this._manageMoveButtons(x96);
 var x102=this._getCheckedItemValues(AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
 var x103=this._getCheckedItemValues(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
x98=x102.concat(x103);
}
 else
 {
this._manageReorderButtons();
x98=this._getCheckedItemValues(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
}
 var x104=this.getComponent();
x104.setProperty(AdfRichSelectManyShuttle.SELECTION,x98);
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._getDescSide= function(x105)
{
 var x106=AdfAgent.AGENT;
 var x107=this.getDomElement();
 var x108;
 var x109;
 var x110;
 var x111;
 var x112;
 if(!this._isReorderOnly())
{
x108=x107.getAttribute(AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
x111=x106.getElementById(x108);
}
x109=x107.getAttribute(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
x112=x106.getElementById(x109);
 if(x111&&AdfDomUtils.isAncestor(x111,x105))
{
x110=AdfDhtmlSelectManyShuttlePeer._LEAD_DESC;
}
 else if(AdfDomUtils.isAncestor(x112,x105))
{
x110=AdfDhtmlSelectManyShuttlePeer._TRAIL_DESC;
}
 return x110;
}
AdfDhtmlSelectManyShuttlePeer.prototype._manageReorderButtons= function()
{
 var x113=this.getDomElement();
 var x114=this._getContainer(x113,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
 var x115=this._getSelectItemCount(x114,true);
 var x116=false;
 var x117=false;
 if (x115>0)
{
 var x118=this._getSelectedIndices(x114);
 var x119=x114.getElementsByTagName("li");
 var x120=x119.length;
 if((x115==1)&&(x118[0]==0))
{
x116=true;
}
 else if(x115>1)
{
 if(x118[0]==0)
{
 var x121=0;
while(x118[x121]==x121)
{
x121++;
}
 if (x121==x115)
{
x116=true;
}
}
}
 if((x115==1)&&(x118[0]==x120-1))
{
x117=true;
}
 else if(x115>1)
{
 if(x118[x118.length-1]==x120-1)
{
 var x121=x120-1;
 var x122=1;
while(x118[x118.length-x122]==x121)
{
x121--;
x122++;
}
 if (x122>x115)
{
x117=true;
}
}
}
}
this._disableButcon(x116|| !(x115>0),x113.getAttribute(AdfDhtmlSelectManyShuttlePeer._TOP_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._TOP_ID_ATTR_NAME,false,false);
this._disableButcon(x116|| !(x115>0),x113.getAttribute(AdfDhtmlSelectManyShuttlePeer._UP_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._UP_ID_ATTR_NAME,false,false);
this._disableButcon(x117|| !(x115>0),x113.getAttribute(AdfDhtmlSelectManyShuttlePeer._DOWN_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._DOWN_ID_ATTR_NAME,false,false);
this._disableButcon(x117|| !(x115>0),x113.getAttribute(AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID_ATTR_NAME,false,false);
}
AdfDhtmlSelectManyShuttlePeer.prototype._manageMoveButtons= function(x123)
{
 var x124;
 var x125;
 var x126;
 var x127;
 var x128=this.getDomElement();
 var x129=this._getParentContainer(x128,x123);
 var x130=this._getSelectItemCount(x129,true);
 var x131=this._getSelectItemCount(x129,false);
 if(x129.id.indexOf(AdfDhtmlSelectManyShuttlePeer._LEAD_UL)!= -1)
{
x124=x128.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME);
x126=AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME;
x125=x128.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME);
x127=AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME;
}
 else if(x129.id.indexOf(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL)!= -1)
{
x124=x128.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME);
x126=AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME;
x125=x128.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME);
x127=AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME;
}
this._disableButcon(!(x131>0),x125,
x127,true,true);
this._disableButcon(!(x130>0),x124,
x126,true,true);
 if(this.getComponent().getReorderOnly)
this._manageReorderButtons();
}
AdfDhtmlSelectManyShuttlePeer.prototype._disableButcon= function(
x132,
x133,
x134,
x135,
x136
)
{
AdfAssert.assertBoolean(x132);
 if(x133)
{
 var x137=AdfAgent.AGENT.getElementById(x133);
 var x138=AdfDomUtils.getFirstChildElement(x137);
AdfDomUtils.addOrRemoveCSSClassName(x132,x137,AdfDhtmlSelectManyShuttlePeer._DISABLED_STYLE_CLASS);
AdfDomUtils.addOrRemoveCSSClassName(x132,x137.parentNode,AdfRichUIPeer.DISABLED_STYLECLASS);
 if (x138&& !AdfPage.PAGE.isScreenReaderMode())
{
 var x139;
 var x140;
 if (this.getComponent().getReorderOnly)
x139="af|selectOrderShuttle::"+AdfDhtmlSelectManyShuttlePeer._BUTCON_KEYS[x134];
 else
 x139="af|selectManyShuttle::"+AdfDhtmlSelectManyShuttlePeer._BUTCON_KEYS[x134];
 if (x135)
{
x140=this.getComponent().getLayout();
 if (x140=="vertical")
x139+="-vertical";
 else
 x139+="-horizontal";
}
 if (x132)
x139+="-disabled";
x139+="-icon";
 if (x136&&AdfPage.PAGE.getLocaleContext().isRightToLeft())
x139+=":rtl";
AdfDomUtils.swapIcon(x138,x139);
}
 if(x132)
{
x137.setAttribute(AdfDhtmlSelectManyShuttlePeer._TABINDEX,"-1");
x137.removeAttribute(AdfDhtmlSelectManyShuttlePeer._HREF,0);
}
 else
 {
 var x141=this.getDomElement();
 var x142=this._getButconParentContainer(x141,x137);
 if (x142!=null)
{
this._setCurrentTabStop(x142,x137,false);
}
x137.setAttribute(AdfDhtmlSelectManyShuttlePeer._HREF,"#");
x137.setAttribute(AdfDhtmlSelectManyShuttlePeer._ONCLICK,
AdfDhtmlSelectManyShuttlePeer._RETURN_FALSE);
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._getSelectItemCount= function(
x143,
x144
)
{
AdfAssert.assertBoolean(x144);
 var x145=0;
 var x146=x143.getElementsByTagName("input");
for(i=0;i<x146.length;i++)
{
 if(x146[i]&& !x146[i].disabled)
{
 if(x144)
{
 if(x146[i].checked)
x145++;
}
 else
 {
x145++;
}
}
}
 return x145;
}
AdfDhtmlSelectManyShuttlePeer.prototype._unselectAll= function(
x147
)
{
 var x148=0;
 var x149=x147.getElementsByTagName("input");
for(i=0;i<x149.length;i++)
{
 if(x149[i]&& !x149[i].disabled)
{
x149[i].checked=false;
this.UpdateSelectedStyle(x149[i]);
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._showDesc= function(x150)
{
 var x151;
 var x152=this._getDescSide(x150);
 if(x152)
x151=this._getDescBox(x152);
 if(x151)
{
 var x153=x150.parentNode.title;
 if(x153==null)
x153='';
x151.value=x153;
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._clearDescs= function()
{
this._clearDesc(AdfDhtmlSelectManyShuttlePeer._LEAD_DESC);
this._clearDesc(AdfDhtmlSelectManyShuttlePeer._TRAIL_DESC);
}
AdfDhtmlSelectManyShuttlePeer.prototype._clearDesc= function(x154)
{
 var x155=this._getDescBox(x154);
 if(x155)
x155.value='';
}
AdfDhtmlSelectManyShuttlePeer.prototype._getDescBox= function(x156)
{
 var x157=this.getComponent().getClientId();
 var x158=AdfRichUIPeer.CreateSubId(x157,x156);
 return AdfAgent.AGENT.getElementById(x158);
}
AdfDhtmlSelectManyShuttlePeer.prototype._getContainer= function(x159,x160)
{
AdfAssert.assertDomElementOrNull(x159);
AdfAssert.assertString(x160);
 var x161;
 var x162=AdfAgent.AGENT;
 if(x159==null)
{
x161=this.getDomElement().getAttribute(x160);
}
 else
 {
x161=x159.getAttribute(x160);
}
 var x163=x162.getElementById(x161);
 var x164;
 if(x163&&x163.getAttribute("_adfFieldset"))
{
 var x165=x163.childNodes;
for(i=0;i<x165.length;i++)
{
 if(x165[i].nodeType==1&&x162.getNodeName(x165[i])=='FIELDSET')
x164=x165[i];
}
}
 else
 {
x164=x163;
}
 return x164;
}
AdfDhtmlSelectManyShuttlePeer.prototype._setCurrentTabStop= function(x166,x167,x168)
{
 if (x166)
{
 if (x167)
{
 var x169=AdfAgent.AGENT.getComputedStyle(x167);
 if (x169.display=="none")
{
x167=x167.parentNode.parentNode;
}
}
 var x170=AdfFocusUtils.getFirstTabStop(x166);
 if (x170!=x167)
{
 if (x168)
{
 if (AdfAgent.AGENT.getNodeName(x167)=='INPUT'|AdfAgent.AGENT.getNodeName(x167)=="LI")
{
 var x171=this.getDomElement();
 var x172=this.getComponent();
 var x173=x170;
 var x174=AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO;
 if (x166.id!=x171.getAttribute(x174))
x174=AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO;
 if (!x170)
x173=this._getFirstEnabledCheckbox(x174)
 var x175=x173;
 var x176=x167;
 if (AdfAgent.AGENT.getNodeName(x173)=="LI")
x175=x173.getElementsByTagName("input")[0];
 if (AdfAgent.AGENT.getNodeName(x167)=="LI")
x176=x167.getElementsByTagName("input")[0];
this.SelectRange(x172,x171,x175,x176,x174);
}
}
 if (x170)
x170.setAttribute(AdfDhtmlSelectManyShuttlePeer._TABINDEX,"-1");
x167.setAttribute(AdfDhtmlSelectManyShuttlePeer._TABINDEX,"0");
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._saveValuesOnElement= function(x177)
{
AdfAssert.assertDomElement(x177);
 var x178= new Array();
 var x179=this.GetCheckboxes(null,x177,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
 var x180=this.GetCheckboxes(null,x177,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
 if (x179)
{
for(var x181=0;x181<x179.length;x181++)
{
 if(x179[x181])
x178.push(x179[x181].value);
}
}
 if (x180)
{
for(var x181=0;x181<x180.length;x181++)
{
 if(x180[x181])
x178.push(x180[x181].value);
}
}
 return x178.join(';');
}
AdfDhtmlSelectManyShuttlePeer.prototype._getClearContainer= function(x182)
{
AdfAssert.assertString(x182);
 var x183= new Array();
 var x184=this._getContainer(null,x182);
 var x185=x184.childNodes;
for(i=0;i<x185.length;i++)
{
 if(AdfAgent.AGENT.getNodeName(x185[i])!='LEGEND')
{
x184.removeChild(x185[i]);
 --i;
}
}
 return x184;
}
AdfDhtmlSelectManyShuttlePeer.prototype._getElementFromContainerByValue= function(x186,x187)
{
AdfAssert.assertString(x186);
 var x188= new Array();
 var x189=this._getContainer(null,x186);
 var x190=null;
 if(x189)
{
x188=x189.childNodes;
}
for(i=0;i<x188.length;i++)
{
 if(x188[i].nodeType==1)
{
 var x191=x188[i].getElementsByTagName("input")[0];
 if(x191.value&&x191.value==x187)
{
x190=x188[i];
break;
}
}
}
 return x190;
}
AdfDhtmlSelectManyShuttlePeer.prototype._smartMove= function(x192)
{
 var x193=x192.indexOf("all")!= -1;
 var x194=null;
 var x195=null;
 if(x192=="move"||x192=="moveall")
{
x194=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
x195=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
}
 if(x192=="remove"||x192=="removeall")
{
x194=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
x195=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
}
this._move(x194,x195,x193);
}
AdfDhtmlSelectManyShuttlePeer.prototype._move= function(x196,x197,x198)
{
AdfAssert.assertBoolean(x198);
 var x199=x196.getElementsByTagName("li");
for(i=0;i<x199.length;i++)
{
 var x200=x199[i].getElementsByTagName("input")[0];
 var x201=false;
 if(x198==true)
{
 if(!x200.disabled)
{
x201=true;
x200.checked=false;
this.UpdateSelectedStyle(x200);
}
}
 else
 {
 if(!x200.disabled&&x200.checked)
{
x201=true;
x200.checked=false;
this.UpdateSelectedStyle(x200);
}
}
 if(x201==true)
{
x200.setAttribute(AdfDhtmlSelectManyShuttlePeer._TABINDEX,"-1");
x197.appendChild(x199[i]);
 --i;
}
}
x197.scrollTop=x197.scrollHeight;
this._createSubmitValueArray(true);
this._clearDescs();
}
AdfDhtmlSelectManyShuttlePeer.prototype._getFirstEnabledCheckbox= function(
x202)
{
 var x203=this.GetCheckboxes(null,null,x202);
for(i=0;i<x203.length;i++)
{
 if(x203[i]&& !x203[i].disabled)
{
 return x203[i];
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._createSubmitValueArray= function(
x204)
{
 var x205= new Array();
 var x206=this.GetCheckboxes(null,null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
for(i=0;i<x206.length;i++)
{
 if(x206[i])
{
x205.push(x206[i].value);
}
}
 var x207=this._getHiddenField();
 if (x207)
{
x207.value=x205.join(';');
 if(x204)
this.Validate(this.getComponent(),x205);
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._getHiddenField= function()
{
 return AdfAgent.AGENT.getElementsByName(this.getDomElement().getAttribute(AdfDhtmlSelectManyShuttlePeer._TRAIL_ITEMS_ID_EXPANDO))[0];
}
AdfDhtmlSelectManyShuttlePeer.prototype._getSelectedIndices= function(x208)
{
 var x209= new Array();
 var x210=x208.getElementsByTagName("input");
for(i=0;i<x210.length;i++)
{
 var x211=x210[i];
 if(!x211.disabled&&x211.checked)
{
x209.push(i);
}
}
 return x209;
}
AdfDhtmlSelectManyShuttlePeer.prototype._getCheckedItemValues= function(x212)
{
 var x213= new Array();
 var x214=this.GetCheckboxes(null,null,x212);
for(i=0;i<x214.length;i++)
{
 if(x214[i].checked&& !x214[i].disabled)
{
x213.push(x214[i].value);
}
}
 return x213;
}
AdfDhtmlSelectManyShuttlePeer.prototype._reorder= function(x215)
{
AdfAssert.assertString(x215);
 var x216=this._getContainer(null,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
 var x217=this._getSelectedIndices(x216);
 var x218=x216.getElementsByTagName("li");
 if(x215=="move-top")
{
for(j=0;j<x217.length;j++)
{
 var x219=x218[x217[j]];
x216.insertBefore(x219,x218[j]);
}
}
 else if(x215=="move-up")
{
 if(x217.length>1)
{
 if(x217[0]==0)
{
 var x220=0;
while(x217[0]==x220)
{
AdfCollections.removeArrayValue(x217,x217[0]);
x220++;
}
}
}
for(j=0;j<x217.length;j++)
{
 var x221=x217[j];
 if(x221>0)
{
 var x219=x218[x221];
x216.insertBefore(x219,x218[x221-1]);
}
}
}
 else if(x215=="move-down")
{
 if(x217.length>1)
{
 var x222=x218.length;
 if(x217[x217.length-1]==x222-1)
{
 var x220=x222-1;
while(x217[x217.length-1]==x220)
{
AdfCollections.removeArrayValue(x217,x217[x217.length-1]);
x220--;
}
}
}
for(j=(x217.length-1);j>=0;j--)
{
 var x221=x217[j];
 if(x221<x218.length)
{
 var x219=x218[x221];
 var x223=x221+2;
 if(x223!=x218.length)
x216.insertBefore(x219,x218[x223]);
 else
 x216.appendChild(x219);
}
}
}
 else if(x215=="move-bottom")
{
for(j=0;j<x217.length;j++)
{
 var x219=x218[x217[j]-j];
x216.appendChild(x219);
}
}
this._createSubmitValueArray(true);
this._clearDescs();
}
AdfDhtmlSelectManyShuttlePeer.prototype._isReorderOnly= function()
{
 var x224=this.getComponent();
 var x225=x224.getReorderOnly;
 return (x225&&x224.getReorderOnly());
}
AdfDhtmlSelectManyShuttlePeer.prototype._disableButtons= function(x226)
{
 var x227=AdfAgent.AGENT;
 var x228=this.getComponent();
 if(!x228.getDisabled()&& !x228.getReadOnly())
{
 var x229=this._getContainer(x226,AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO);
 if (x229)
{
 var x230=this._getContainer(x226,AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO);
 var x231=this._getSelectItemCount(x229,true);
 var x232=this._getSelectItemCount(x230,true);
 var x233=this._getSelectItemCount(x229,false);
 var x234=this._getSelectItemCount(x230,false);
 var x235=x233==0;
 var x236=x234==0;
this._disableButcon(x235,x226.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME,true,true);
this._disableButcon(x236,x226.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME,true,true);
this._disableButcon(!(x231>0),x226.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME,true,true);
this._disableButcon(!(x232>0),x226.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME),
AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME,true,true);
}
 if(x228.getReorderOnly)
{
this._manageReorderButtons();
}
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._checkTask= function(
x237)
{
 var x238=this._getAnchor(x237)
 if(x238)
{
 var x239=x238.id;
 if(this._endsWith(x239,"::move"))
 return "move";
 else if(this._endsWith(x239,"::moveall"))
 return "moveall";
 else if(this._endsWith(x239,"::remove"))
 return "remove";
 else if(this._endsWith(x239,"::removeall"))
 return "removeall";
 else if(this._endsWith(x239,"move-top"))
 return "move-top";
 else if(this._endsWith(x239,"move-up"))
 return "move-up";
 else if(this._endsWith(x239,"move-down"))
 return "move-down";
 else if(this._endsWith(x239,"move-bottom"))
 return "move-bottom";
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._getParentContainer= function(
x240,
x241)
{
AdfAssert.assertDomElement(x240);
 var x242=AdfAgent.AGENT;
 var x243=x242.getElementById(x240.getAttribute(AdfDhtmlSelectManyShuttlePeer._LEAD_UL_ID_EXPANDO));
 if(AdfDomUtils.isAncestor(x243,x241))
{
 return x243;
}
 else
 {
x243=x242.getElementById(x240.getAttribute(AdfDhtmlSelectManyShuttlePeer._TRAIL_UL_ID_EXPANDO));
 return x243;
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._getButconParentContainer= function(
x244,
x245)
{
AdfAssert.assertDomElement(x244);
 var x246=AdfAgent.AGENT;
 var x247=x246.getElementById(x244.getAttribute(AdfDhtmlSelectManyShuttlePeer._REORDER_DIV_ID_EXPANDO));
 if(AdfDomUtils.isAncestor(x247,x245))
{
 return x247;
}
 else
 {
x247=x246.getElementById(x244.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_DIV_ID_EXPANDO));
 return x247;
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._getPreviousButcon= function(
x248,x249,x250)
{
AdfAssert.assertString(x249);
 var x251=this._getAnchor(x250);
 if (x251==null)
 return x250;
 var x252=x251.id;
 var x253=x251;
 var x254;
 if(x249==AdfDhtmlSelectManyShuttlePeer._REORDER_DIV_ID_EXPANDO)
{
 if (this._endsWith(x252,"move-top")||this._endsWith(x252,"move-up"))
{
x254=[x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._TOP_ID_ATTR_NAME)];
x253=this._getFirstEnabledButcon(x254,0,x251);
}
 else if (this._endsWith(x252,"move-down"))
{
x254=[x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._UP_ID_ATTR_NAME),
x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._TOP_ID_ATTR_NAME)];
x253=this._getFirstEnabledButcon(x254,0,x251);
}
 else if (this._endsWith(x252,"move-bottom"))
{
x254=[x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._DOWN_ID_ATTR_NAME),
x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._UP_ID_ATTR_NAME),
x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._TOP_ID_ATTR_NAME)];
x253=this._getFirstEnabledButcon(x254,0,x251);
}
}
 else if (x249==AdfDhtmlSelectManyShuttlePeer._MOVE_DIV_ID_EXPANDO)
{
 if (this._endsWith(x252,"::move")||this._endsWith(x252,"::moveall"))
{
x254=[x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME)];
x253=this._getFirstEnabledButcon(x254,0,x251);
}
 else if (this._endsWith(x252,"::remove"))
{
x254=[x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME),
x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME)];
x253=this._getFirstEnabledButcon(x254,0,x251);
}
 else if (this._endsWith(x252,"::removeall"))
{
x254=[x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME),
x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME),
x248.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME)];
x253=this._getFirstEnabledButcon(x254,0,x251);
}
}
 return x253;
}
AdfDhtmlSelectManyShuttlePeer.prototype._getNextButcon= function(
x255,x256,x257)
{
AdfAssert.assertString(x256);
 var x258=this._getAnchor(x257);
 if (x258==null)
 return x257;
 var x259=x258.id;
 var x260=x258;
 var x261;
 if(x256==AdfDhtmlSelectManyShuttlePeer._REORDER_DIV_ID_EXPANDO)
{
 if (this._endsWith(x259,"move-top"))
{
x261=[x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._UP_ID_ATTR_NAME),
x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._DOWN_ID_ATTR_NAME),
x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID_ATTR_NAME)];
x260=this._getFirstEnabledButcon(x261,0,x258);
}
 else if (this._endsWith(x259,"move-up"))
{
x261=[x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._DOWN_ID_ATTR_NAME),
x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID_ATTR_NAME)];
x260=this._getFirstEnabledButcon(x261,0,x258);
}
 else if (this._endsWith(x259,"move-down")||this._endsWith(x259,"move-bottom"))
{
x261=[x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID_ATTR_NAME)];
x260=this._getFirstEnabledButcon(x261,0,x258);
}
}
 else if (x256==AdfDhtmlSelectManyShuttlePeer._MOVE_DIV_ID_EXPANDO)
{
 if (this._endsWith(x259,"::move"))
{
x261=[x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME),
x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME),
x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME)];
x260=this._getFirstEnabledButcon(x261,0,x258);
}
 else if (this._endsWith(x259,"::moveall"))
{
x261=[x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME),
x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME)];
x260=this._getFirstEnabledButcon(x261,0,x258);
}
 else if (this._endsWith(x259,"::remove")||this._endsWith(x259,"::removeall"))
{
x261=[x255.getAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME)];
x260=this._getFirstEnabledButcon(x261,0,x258);
}
}
 return x260;
}
AdfDhtmlSelectManyShuttlePeer.prototype._getFirstEnabledButcon= function(
x262,x263,x264)
{
 var x265=x262[x263];
 if (this._checkButconDisabledClassName(x265))
{
 if (x263<(x262.length-1))
{
 return this._getFirstEnabledButcon(x262,x263+1);
}
 else
 {
 return x264;
}
}
 else
 {
 var x266=AdfAgent.AGENT.getElementById(x265);
 return x266;
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._checkButconDisabledClassName= function(
x267)
{
 var x268=AdfAgent.AGENT.getElementById(x267);
 if (x268)
{
 var x269=x268.className;
 var x270=x269.indexOf(AdfDhtmlSelectManyShuttlePeer._DISABLED_STYLE_CLASS);
 if (x270== -1)
{
 return false;
}
}
 return true;
}
AdfDhtmlSelectManyShuttlePeer.prototype._getAnchor= function(
x271)
{
 var x272=AdfAgent.AGENT;
 var x273=x271.getElementsByTagName("A");
 if (x273.length==1)
 return x273[0];
while(x271)
{
 if(x272.getNodeName(x271)=="INPUT"||x272.getNodeName(x271)=="LABEL")
 return null;
 else if(x272.getNodeName(x271)=="A")
 return x271;
x271=x271.parentNode;
}
}
AdfDhtmlSelectManyShuttlePeer.prototype._endsWith= function(
x274,
x275)
{
AdfAssert.assertString(x274);
AdfAssert.assertString(x275);
 var x276=x274.length - x275.length;
 if (x276<0)
 return false;
 return (x274.lastIndexOf(x275,x276)==x276);
}
AdfDhtmlSelectManyShuttlePeer.prototype._initLazyLoad= function(
x277)
{
AdfAssert.assertDomElement(x277);
 var x278=x277.getAttribute(AdfDhtmlSelectManyShuttlePeer._LAZY_ATTR);
 if(!x278)
this._lazyInitButtons();
}
AdfDhtmlSelectManyShuttlePeer.prototype._lazyInitButtons= function()
{
 var x279=AdfAgent.AGENT;
 var x280=this.getComponent().getClientId();
 var x281=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._MOVE_ID);
 var x282=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID);
 var x283=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._REMOVE_ID);
 var x284=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID);
 var x285=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._TOP_ID);
 var x286=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._UP_ID);
 var x287=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._DOWN_ID);
 var x288=AdfRichUIPeer.CreateSubId(x280,AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID);
 var x289=this.getDomElement();
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._MOVE_ID_ATTR_NAME,x281);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._MOVEALL_ID_ATTR_NAME,x282);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVE_ID_ATTR_NAME,x283);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._REMOVEALL_ID_ATTR_NAME,x284);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._TOP_ID_ATTR_NAME,x285);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._UP_ID_ATTR_NAME,x286);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._DOWN_ID_ATTR_NAME,x287);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._BOTTOM_ID_ATTR_NAME,x288);
x289.setAttribute(AdfDhtmlSelectManyShuttlePeer._LAZY_ATTR,"true");
}

AdfUIComponents.createComponentClass("AdfRichSelectOrderShuttle",
{
componentType:"oracle.adf.RichSelectOrderShuttle",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"layout",type:"String","default":"horizontal"}
,{name:"size",type:"Number"}
,{name:"leadingHeader",type:"String"}
,{name:"trailingHeader",type:"String"}
,{name:"leadingDescShown",type:"Boolean","default":false}
,{name:"trailingDescShown",type:"Boolean","default":false}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"reorderOnly",type:"Boolean","default":false}
],
superclass:AdfUISelectOrder
});

AdfRichSelectOrderShuttle.SELECTION='selection';
AdfRichSelectOrderShuttle.InitSubclass= function()
{
AdfUIComponent.SetDisconnectedProperty(this,AdfRichSelectOrderShuttle.SELECTION);
}
AdfRichSelectOrderShuttle.prototype.getSelection= function()
{
 return this.getProperty(AdfRichSelectOrderShuttle.SELECTION);
}
AdfUIComponents.createComponentClass("AdfRichSelectOneRadio",
{
componentType:"oracle.adf.RichSelectOneRadio",
propertyKeys:[{name:"changed",type:"Boolean","default":false}
,{name:"changedDesc",type:"String"}
,{name:"autoSubmit",type:"Boolean","default":false}
,{name:"accessKey",type:"String"}
,{name:"contentStyle",type:"String"}
,{name:"helpTopicId",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"label",type:"String"}
,{name:"labelStyle",type:"String"}
,{name:"readOnly",type:"Boolean","default":false,secured:true}
,{name:"showRequired",type:"Boolean","default":false}
,{name:"simple",type:"Boolean","default":false}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"valuePassThru",type:"Boolean","default":false,secured:true}
,{name:"layout",type:"String","default":"vertical"}
,{name:"unselectedLabel",type:"String"}
],
superclass:AdfUISelectOne
});

AdfRichUIPeer.createPeerClass(AdfDhtmlSelectOnePeer,"AdfDhtmlSelectOneRadioPeer");
AdfDhtmlSelectOneRadioPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,
AdfUIEditableValue.SUBMITTED_VALUE,
AdfUISelectOne.SELECT_ITEMS,
AdfRichSelectOneRadio.LABEL);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichSelectOneRadio.LABEL);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.CLICK_EVENT_TYPE);
this._ITEM_VALUE_EXPANDO="_adfIV";
}
AdfDhtmlSelectOneRadioPeer.prototype.HandleComponentClick= function(x0)
{
AdfDhtmlSelectOneRadioPeer.superclass.HandleComponentClick.call(this,x0);
 var x1=this.getComponent();
this.Validate(x1,this.GetSubmittedValue(x1,this.getDomElement()));
}
AdfDhtmlSelectOneRadioPeer.prototype.GetNoteWindowAlignmentNode= function(x2,x3)
{
 if (!x3)
x3=this.getDomElement();
 var x4=x3.getElementsByTagName("input")[0];
 if (x4)
{
 return x4;
}
 return AdfDhtmlSelectOneRadioPeer.superclass.GetNoteWindowAlignmentNode.call(this,x2,x3);
}
AdfDhtmlSelectOneRadioPeer.prototype.GetComponentSelectItems= function(
x5,
x6)
{
 var x7=AdfDhtmlEditableValuePeer.GetContentNode(x5,x6);
 if (x7==null)
 return;
 var x8=x7.getElementsByTagName("input");
 var x9= new Array();
 if (x8!=null)
{
 var x10=x8.length;
for(var x11=0;x11<x10;x11++)
{
x9[x11]= new AdfSelectItem();
x9[x11].setValue(x8[x11].value);
x9[x11].setLabel(x8[x11].text);
x9[x11].setDisabled(x8[x11].disabled);
}
}
 return x9;
}
AdfDhtmlSelectOneRadioPeer.prototype.GetSubmittedValue= function(
x12,
x13)
{
 var x14=AdfDhtmlEditableValuePeer.GetContentNode(x12,x13);
 var x15=x12.getReadOnly();
 if (x15)
 return x14.getAttribute(AdfDhtmlSelectOneRadioPeer._ITEM_VALUE_EXPANDO);
 else
 {
 var x16=x14.getElementsByTagName("input");
for(var x17=0;x17<x16.length;x17++)
{
 if (x16[x17].checked)
{
 return x16[x17].value;
}
}
}
 return null;
}
AdfDhtmlSelectOneRadioPeer.prototype.SetDisplayValue= function(
x18,
x19,
x20)
{
 var x21=AdfDhtmlEditableValuePeer.GetContentNode(x18,x19);
 if (x21==null)
 return;
 var x22=x18.getReadOnly();
AdfAssert.assertString(x20);
 if (x22)
AdfAgent.AGENT.setTextContent(x21,x20);
 else
 {
 var x23=x21.getElementsByTagName("input");
 if (x23!=null)
{
 var x24=x23.length;
for(var x25=0;x25<x24;x25++)
{
 if (x23[x25].value==x20)
{
x23[x25].checked=true;
}
}
}
}
}
AdfDhtmlSelectOneRadioPeer.prototype.GetInlineEditor= function(x26)
{
 return AdfDhtmlSimpleLabelEditor.getInlineEditor();
}
AdfUIComponents.createComponentClass("AdfRichSpacer",
{
componentType:"oracle.adf.RichSpacer",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"height",type:"String"}
,{name:"width",type:"String"}
],
superclass:AdfUIObject
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlSpacerPeer");
AdfDhtmlSpacerPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyChanges(this,
AdfRichSpacer.WIDTH,
AdfRichSpacer.HEIGHT);
}
AdfDhtmlSpacerPeer.prototype.ComponentWidthChanged= function(
x0,
x1,
x2,
x3)
{
 if (x2)
{
 var x4=AdfDhtmlSpacerPeer._getLengthInt(x2);
 if (AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM)
{
x1.width=x4;
}
 else
 {
 if (x1.nodeName=='IMG')
{
x1.width=x4;
}
 else
 {
 var x5=x1.firstChild;
 if (!x5)
{
x5=this.getDomDocument().createElement("div");
domNode.appendChild(x5);
}
x5.style.paddingLeft=x4 + "px";
}
}
}
}
AdfDhtmlSpacerPeer.prototype.ComponentHeightChanged= function(
x6,
x7,
x8,
x9)
{
 if (x8)
{
 var x10=AdfDhtmlSpacerPeer._getLengthInt(x8);
 if (AdfAgent.AGENT.getPlatform()==AdfAgent.IE_PLATFORM)
{
x7.height=x10;
}
 else
 {
 if (x7.nodeName=='IMG')
{
x7.height=x10;
}
 else
 {
 var x11=x7.firstChild;
 if (!x11)
{
x11=this.getDomDocument().createElement("div");
domNode.appendChild(x11);
}
x11.style.paddingTop=x10 + "px";
}
}
}
}
AdfDhtmlSpacerPeer._getLengthInt= function(x12)
{
 var x13=x12;
 var x14=x12.toLowerCase().indexOf('px');
 if (x14>0)
{
x13=x12.replace(/^\s*([\+\-]?\d+)\s*px\s*.*/i,"$1");
}
 var x15=1;
 if (x13)
{
x15=x13*1;
}
 if (x15<0)
x15=0;
 return x15;
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlMessagePeer");

AdfUIComponents.createComponentClass("AdfUIMessages",
{
componentType:"org.apache.myfaces.trinidad.Messages"
});

AdfUIComponents.createComponentClass("AdfRichMessages",
{
componentType:"oracle.adf.RichMessages",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"message",type:"String"}
,{name:"text",type:"String"}
,{name:"globalOnly",type:"Boolean","default":false}
,{name:"inline",type:"Boolean","default":false}
],
superclass:AdfUIMessages
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlMessagesPeer");
AdfDhtmlMessagesPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichMessages.SHORT_DESC);
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichMessages.MESSAGE);
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichMessages.TEXT);
AdfRichUIPeer.addComponentPropertyGetters(this,AdfRichMessages.GLOBAL_ONLY);
AdfDhtmlMessagesPeer._ATTRIBUTE_GLOBAL_ONLY="_afrGlobalOnly";
AdfDhtmlMessagesPeer._ATTRIBUTE_MESSAGE="_afrMessage";
AdfDhtmlMessagesPeer._ATTRIBUTE_TEXT="_afrText";
AdfDhtmlMessagesPeer._HEADER_TEXT_STYLE_CLASS="af|messages::header-text";
}
AdfDhtmlMessagesPeer.prototype.componentRemoved= function(x0)
{
AdfDhtmlMessagesPeer.superclass.componentRemoved.call(this,x0);
 var x1=AdfPage.PAGE;
 var x2=x1.getDefaultMessageHandlerComponentId();
 var x3=x1.getMessageHandlerSlaveComponentId();
 var x4=x0.getClientId();
 var x5=false;
 if (x4==x2)
{
x5=true;
 var x6;
 var x7=x0;
while(x7&& !x6)
{
x7=x7.getParent();
 if (x7&&
x7 instanceof AdfRichDocument)
{
x6=x7.getClientId();
}
}
x2=x6;
}
 if (x4==x3)
{
AdfMessageUtils.HideMessagesDialog();
x5=true;
x3=null;
}
 if (x5)
{
x1.setDefaultMessageHandlerComponentId(x2,x3);
}
}
AdfDhtmlMessagesPeer.prototype.isMessagesDialogShowable= function()
{
 return false;
}
AdfDhtmlMessagesPeer.prototype.setMessagesDialogShown= function(x8)
{
}
AdfDhtmlMessagesPeer.prototype.GetComponentShortDesc= function(
x9,
x10)
{
 return AdfAgent.AGENT.getAttribute(x10,"title");
}
AdfDhtmlMessagesPeer.prototype.GetComponentMessage= function(
x11,
x12)
{
 return AdfAgent.AGENT.getAttribute(x12,AdfDhtmlMessagesPeer._ATTRIBUTE_MESSAGE);
}
AdfDhtmlMessagesPeer.prototype.GetComponentText= function(
x13,
x14)
{
 return AdfAgent.AGENT.getAttribute(x14,AdfDhtmlMessagesPeer._ATTRIBUTE_TEXT);
}
AdfDhtmlMessagesPeer.prototype.GetComponentGlobalOnly= function(x15,x16)
{
 return AdfAgent.AGENT.getBooleanAttribute(x16,AdfDhtmlMessagesPeer._ATTRIBUTE_GLOBAL_ONLY);
}
AdfDhtmlMessagesPeer.prototype.MessageShow= function(x17,x18)
{
this._messageUpdate(x17,x18,true)
}
AdfDhtmlMessagesPeer.prototype.MessageNotify= function(x19,x20)
{
this._messageUpdate(x19,x20,false)
}
AdfDhtmlMessagesPeer.prototype._messageUpdate= function(x21,x22,x23)
{
 var x24=AdfPage.PAGE;
 var x25=this.getComponent();
 var x26=x25.getClientId();
 var x27=x24.getAllMessages();
 var x28=this.getDomElement();
 var x29=this.GetComponentGlobalOnly(x25,x28);
 var x30=x27[x26];
 var x31=0;
 if (x30!=null)
{
x31=x30.length;
}
 if (x23&& !AdfMessageUtils.isPageLevelBoxNeeded(x24,x30,x29))
{
for(var x32 in x27)
{
 var x33=x27[x32];
 if ((x33!=null)&&(x33["compId"]!=null))
{
AdfMessageUtils.messageGroupFocus(x32);
}
}
}
 if ( ! AdfMessageUtils.hasMessages(x24,x31,x29))
{
AdfDomUtils.removeAllNodes(x28);
AdfMessageUtils.HideMessagesDialog();
}
 else {
AdfDomUtils.removeAllNodes(x28);
 var x34=AdfAgent.AGENT;
 var x35=x34.getDomDocument();
 var x36=x35.createElement("table");
x36.summary="";
 var x37=x36.insertRow(-1);
 var x38=x37.insertCell(-1);
 if (x21==null)
x21=0;
 if (x29)
{
x21=x30["maxType"];
}
 else
 {
for(var x39 in x27)
{
 var x40=x27[x39]["maxType"];
 if (x40>x21)
x21=x40;
}
}
 var x41=AdfMessageUtils.getIcon(x21,true);
x38.appendChild(x41);
x38=x37.insertCell(-1);
 var x42=AdfPage.PAGE.getLookAndFeel();
AdfDomUtils.addCSSClassName(x38,
x42.getStyleClass(AdfDhtmlMessagesPeer._HEADER_TEXT_STYLE_CLASS));
 var x43=x25.getText();
 if (x43==null)
{
x34.setTextContent(x38,AdfMessageUtils.getString(x21,true));
}
 else
 {
x34.setTextContent(x38,x43);
}
x28.appendChild(x36);
 var x44=x25.getMessage();
 var x45=AdfMessageUtils.getCombinedMessagesDom(x26,x44,x29);
x28.appendChild(x45);
x28.style.display="";
}
x24.__queueDescendantResizeNotifySource(x25);
x24.__doDescendantResizeNotify();
}

function AdfStampedDragSource(x0,x1,x2)
{
 if (arguments.length)
{
this.Init(x0,x1,x2);
}
}
AdfObject.createSubclass(AdfStampedDragSource,AdfDragSource);
AdfStampedDragSource.prototype.Init= function(
x0,
x1,
x2)
{
AdfStampedDragSource.superclass.Init.call(this,x0,x1);
this._modelName=x2;
}
AdfStampedDragSource.prototype.getModelName= function()
{
 return this._modelName;
}
AdfStampedDragSource.prototype.isAvailable= function(
x3,
x4)
{
AdfAssert.assertPrototype(x3,AdfDnDContext);
AdfAssert.assertPrototype(x4,AdfUIInputEvent);
 if (AdfAssert.DEBUG)AdfDnDContext.assertUserAction(x3.getUserAction());
 var x5=this.getComponent().getPeer();
 if (this.AreDraggedRowKeysAvailable(x4))
{
 return true;
}
 else
 {
 var x6=AdfStampedDragSource.superclass.GetDragTransferable.call(this,
x4);
 return (x6!=null);
}
}
AdfStampedDragSource.prototype.getRowKeyDataFlavor= function()
{
 var x7=this.getComponent();
 if (x7)
{
 var x8=this._modelName;
 if (x8)
{
 return AdfDataFlavor.getRowKeyDataFlavor(x8);
}
}
 return null;
}
AdfStampedDragSource.prototype.GetDragTransferable= function(x9)
{
 var x10=AdfStampedDragSource.superclass.GetDragTransferable.call(this,x9);
 var x11=this.getComponent();
 var x12=this._modelName;
 if (x12&&x12.length)
{
 var x13=this._getRowKeys(x9);
AdfAssert.assertArrayOrNull(x13);
 if (x13)
{
 var x14= new Array();
 var x15= new Array();
 if (x10!=null)
{
 var x16=x10.getTransferDataFlavors();
 var x17=x16.length;
for(var x18=0;x18<x17;x18++)
{
 var x19=x16[x18];
x14.push(x19);
x15.push(x10.getTransferData(x19));
}
}
 var x20=AdfDataFlavor.getRowKeyDataFlavor(x12);
x15.push(x13);
x14.push(x20);
 return new AdfObjectTransferable(x15,x14);
}
}
 return x10;
}
AdfStampedDragSource.prototype.GetDragOffset= function(x21)
{
 var x22=this._getRowKeys(x21);
 if (x22)
{
 return this.GetDragOffsetForRowKeys(x21,x22);
}
 else
 {
 return {x:x21.getOffsetX(),y:x21.getOffsetY()};
}
}
AdfStampedDragSource.prototype.GetDragOffsetForRowKeys= function(x23,x24)
{
AdfAssert.assertArray(x24);
 return this.getComponent().getPeer().getDragOffsetForRowKeys(x23,x24);
}
AdfStampedDragSource.prototype.GetDragOverFeedback= function(x25)
{
AdfAssert.assertPrototype(x25,AdfUIInputEvent);
 var x26=this._getRowKeys(x25);
 if (x26)
{
 return this.GetDragOverFeedbackForRowKeys(x26);
}
 else
 {
 return AdfStampedDragSource.superclass.GetDragOverFeedback.call(this,x25);
}
}
AdfStampedDragSource.prototype.GetDragOverFeedbackForRowKeys= function(x27)
{
AdfAssert.assertArray(x27);
 return this.getComponent().getPeer().getDragNodeForRowKeys(x27);
}
AdfStampedDragSource.prototype.GetDraggedRowKeys= function(x28)
{
AdfAssert.assert(x28);
 return [x28];
}
AdfStampedDragSource.prototype.AreDraggedRowKeysAvailable= function(x29)
{
 return this._getRowKeys(x29)!=null;
}
AdfStampedDragSource.prototype._getRowKeys= function(x30)
{
 var x31=this.getComponent().getPeer();
 var x32=x31.getRowKeyForEvent(x30);
 if (x32)
{
 return this.GetDraggedRowKeys(x32);
}
 else
 {
 return null;
}
}

function AdfTableDragSource(x0,x1,x2)
{
 if (arguments.length)
{
this.Init(x0,x1,x2);
}
}
AdfObject.createSubclass(AdfTableDragSource,AdfStampedDragSource);
AdfTableDragSource.prototype.GetDraggedRowKeys= function(x0)
{
AdfAssert.assert(x0);
 var x1=this.getComponent();
 var x2=x1.getSelectedRowKeys();
 if (x2!=null&&
x2[AdfDhtmlTablePeer.SELECTALL_KEY_PROPERTY]==null&&
x2[x0]!=null)
{
 var x3=[];
for(var x4 in x2)
{
x3.push(x4);
}
 return x3;
}
 else
 {
 return [x0];
}
}
AdfTableDragSource.prototype.AreDraggedRowKeysAvailable= function(x5)
{
 var x6=this.getComponent().getPeer();
 var x7=x6.getRowKeyForEvent(x5);
 return (x7!=null);
}

function AdfStampedDropTarget(x0,x1)
{
 if (arguments.length)
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfStampedDropTarget,AdfDropTarget);
AdfStampedDropTarget.prototype.Init= function(x0,x1)
{
AdfStampedDropTarget.superclass.Init.call(this);
AdfAssert.assertNumber(x0);
AdfAssert.assert(x0!=AdfDnDContext.ACTION_NONE,
"allowedActions must be specified");
AdfAssert.assert((x0& ~AdfDnDContext.ACTIONS_ALL)==0,
"Invalid allowedActions:" + x0);
this._allowedActions=x0;
this._modelName=x1;
}
AdfStampedDropTarget.prototype.toDebugString= function()
{
AdfAssert.assertNumber(this._allowedActions);
 return AdfStampedDropTarget.superclass.toDebugString.call(this) +
 " allowedActions:" + this._allowedActions.toString(2);
}
AdfStampedDropTarget.prototype.dragExit= function(x2)
{
AdfLogger.LOGGER.finer("dragExit:",this);
this._cleanUpDragFeedback(x2,true);
}
AdfStampedDropTarget.prototype.drop= function(x3,x4,x5,x6)
{
AdfLogger.LOGGER.finer("drop:",this);
this._cleanUpDragFeedback(x3,false);
 var x7=this.getComponent().getPeer();
 var x8=x3.getDropTargetProperty(
AdfStampedDropTarget._ROWKEY_HINTS);
 if(x8==null)
{
x8={};
x3.setDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS,x8);
}
x7.getRowKeyAndOrientationFromHints(
x5,
x6,
x8);
 return this.DropOnRowKey(x3,
x4,
x5,x6,x8[AdfStampedDropTarget.ROW_KEY],
x8[AdfStampedDropTarget.DROP_ORIENTATION]);
}
AdfStampedDropTarget.prototype.DropOnRowKey= function(
x9,
x10,
x11,
x12,
x13,
x14)
{
AdfLogger.LOGGER.fine("Queing Drop Event with row key:",x13);
 var x15= new AdfDropEvent(this.getComponent(),
x9.getDragSource(),
x9.getTransferable(),
x10,
x11,
x12,
x14,
x13);
x15.queue();
 return x10;
}
AdfStampedDropTarget.prototype.getRowKeyDataFlavor= function()
{
 var x16=this.getComponent();
 if (x16)
{
 var x17=this._modelName;
 if (x17)
{
 return AdfDataFlavor.getRowKeyDataFlavor(x17);
}
}
 return null;
}
AdfStampedDropTarget.prototype.AcceptDrag= function(
x18,x19,x20,x21,x22)
{
 var x23=AdfDnDContext.ACTION_NONE;
 var x24=x20;
 var x25=null;
 var x26=null;
 var x27=null;
x20=AdfStampedDropTarget.superclass.AcceptDrag.call(this,
x18,x19,x20,x21,x22);
 if (x20==AdfDnDContext.ACTION_NONE)
{
x20=this.AcceptDragOverrideIfRejectedByFlavor(x18,x24);
}
 if (x20!=AdfDnDContext.ACTION_NONE)
{
 var x28=this.getComponent();
 var x29=x28.getPeer();
 var x30=x18.getDropTargetProperty(
AdfStampedDropTarget._ROWKEY_HINTS);
 if(x30==null)
{
x30={};
x18.setDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS,x30);
}
 var x31=x30.lastRowKey;
x29.getRowKeyAndOrientationFromHints(
x21,
x22,
x30);
x27=x25=x30.rowKey;
 if(x27==null)
x27=AdfStampedDropTarget._NULL_ROW_KEY;
 var x32=x30[x27];
 var x33;
 var x34=AdfStampedDropTarget._ACTION_KEYS[x20];
 if (x32==null)
{
x32= new Object();
x30[x27]=x32;
x26=x29.getRowKeyBounds(x25);
x32[AdfStampedDropTarget._BOUNDS_KEY]=x26;
x33=null;
}
 else
 {
x33=x32[x34];
x26=x32[AdfStampedDropTarget._BOUNDS_KEY];
}
 if (x33!=null)
{
x23=x33;
}
 else
 {
AdfLogger.LOGGER.finer("Check AdfStampedDropTarget rowKey:",x25);
 var x35=x18.getDragSource();
 var x36=(x35!=null)?x35.getComponent():null;
 if (x36===x28&&
this.NeedsRowKeyCollectionCheck()&&
x20==AdfDnDContext.ACTION_MOVE)
{
 var x37=x18.getTransferable();
 if (x37)
{
 var x38=x37.getTransferData(
this.getRowKeyDataFlavor());
 if (AdfCollections.indexOf(x38,x25)!= -1)
{
x20=AdfDnDContext.ACTION_NONE;
}
}
}
x23=x20;
x32[x34]=x23;
}
x29.showDragFeedback(x18,
x25,
x23,
x31,
x21,
x22,
false);
x30[AdfStampedDropTarget.HINT_LAST_ROWKEY]=x25;
x30[AdfStampedDropTarget.HINT_LAST_ROWKEY_BOUNDS]=x26;
x30[AdfStampedDropTarget.HINT_LAST_DROP_ORIENTATION]=
x30[AdfStampedDropTarget.DROP_ORIENTATION];
}
 return x23;
}
AdfStampedDropTarget.prototype.NeedsRowKeyCollectionCheck= function()
{
 return true;
}
AdfStampedDropTarget.prototype.AcceptDragOverrideIfRejectedByFlavor= function(
x39,
x40)
{
 return AdfDnDContext.ACTION_NONE;
}
AdfStampedDropTarget.prototype.GetAllowedFlavors= function(x41)
{
 var x42=null;
 var x43=this.getRowKeyDataFlavor();
 if (x43)
{
x42= new Array();
x42.push(x43);
}
 return x42;
}
AdfStampedDropTarget.prototype.GetAllowedActions= function(x44)
{
 return this._allowedActions;
}
AdfStampedDropTarget.prototype._cleanUpDragFeedback= function(x45,x46)
{
 var x47=x45.getDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS);
 var x48=x47?x47[AdfStampedDropTarget.HINT_LAST_ROWKEY]:null;
 if (x46&&x47)
{
x47[AdfStampedDropTarget.HINT_LAST_ROWKEY]=null;
}
this.getComponent().getPeer().showDragFeedback(
x45,
null,
AdfDnDContext.ACTION_NONE,
x48,
null,
null,
x46);
}
AdfStampedDropTarget._ROWKEY_HINTS="StampedDropTarget:hints";
AdfStampedDropTarget.HINT_LAST_ROWKEY="lastRowKey";
AdfStampedDropTarget.HINT_LAST_ROWKEY_BOUNDS="lastRowKeyBounds";
AdfStampedDropTarget.HINT_LAST_DROP_ORIENTATION="lastDropOrientation";
AdfStampedDropTarget.DROP_ORIENTATION="dropOrientation";
AdfStampedDropTarget.ROW_KEY="rowKey";
AdfStampedDropTarget._BOUNDS_KEY="bounds";
AdfStampedDropTarget._NULL_ROW_KEY="null_rk";
AdfStampedDropTarget._ACTION_KEYS=[null,"COPY","MOVE",null,"LINK"];

function AdfTableDropTarget(x0,x1)
{
 if (arguments.length)
this.Init(x0,x1);
}
AdfObject.createSubclass(AdfTableDropTarget,AdfStampedDropTarget);

function AdfComponentDragSource(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfComponentDragSource,AdfDragSource);
AdfComponentDragSource._UICOMPONENT_FLAVOR=AdfDataFlavor.getDataFlavorForClass(AdfUIComponent);
AdfComponentDragSource.prototype.Init= function(x0)
{
AdfComponentDragSource.superclass.Init.call(this,
AdfDnDContext.ACTION_MOVE,
AdfDnDContext.ACTION_MOVE)
this._dataFlavor=(x0)
?AdfDataFlavor.getDataFlavorForClass(AdfUIComponent,x0)
:AdfComponentDragSource._UICOMPONENT_FLAVOR;
}
AdfComponentDragSource.prototype.isAvailable= function(
x1,
x2)
{
AdfAssert.assertPrototype(x1,AdfDnDContext);
AdfAssert.assertPrototype(x2,AdfUIInputEvent);
 return (this.getComponent()!=null)
}
AdfComponentDragSource.prototype.GetDragTransferable= function(x3)
{
 var x4=null;
 var x5=this.getComponent();
 if (x5)
{
x4=AdfObjectTransferable.createSingleObjectTransferable(
x5,
this._dataFlavor);
}
 return x4;
}

function AdfBasicDropTarget(x0,x1,x2)
{
 if (!AdfCollections.isArray(x2))
{
AdfAssert.assertPrototype(x2,AdfDataFlavor);
x2=[x2];
}
this.Init(x0,x1,x2);
}
AdfObject.createSubclass(AdfBasicDropTarget,AdfDropTarget);
AdfBasicDropTarget.prototype.Init= function(
x0,x1,x2)
{
AdfBasicDropTarget.superclass.Init.call(this);
AdfAssert.assertFunctionOrNull(x0,"dropHandler function required");
AdfAssert.assertNumber(x1);
AdfAssert.assert(x1!=AdfDnDContext.ACTION_NONE,
"allowedActions must be specified");
AdfAssert.assert((x1& ~AdfDnDContext.ACTIONS_ALL)==0,
"Invalid allowedActions:" + x1);
AdfAssert.assertArray(x2,"At least one flavor must be allowed");
AdfAssert.assertPrototype(x2[0],AdfDataFlavor);
this._dropHandler=x0;
this._allowedActions=x1;
this._allowedFlavors=x2;
}
AdfBasicDropTarget.prototype.drop= function(x3,x4,x5,x6)
{
 var x7=this._dropHandler;
 var x8;
 if (x7!=null)
x8=x7.call(this,x3,x4,x5,x6);
 else
 x8=x4;
AdfAssert.assertNumber(x8);
 if (x8==AdfDnDContext.ACTION_NONE)
 return x8;
AdfAssert.assert((x8& ~AdfDnDContext.ACTIONS_ALL)==0,
"Invalid userAction:" + x8);
 return AdfBasicDropTarget.superclass.drop.call(this,x3,x8,x5,x6);
}
AdfBasicDropTarget.prototype.toDebugString= function()
{
 var x9=AdfBasicDropTarget.superclass.toDebugString.call(this);
 var x10=this._allowedActions;
 if (x10)
x9+=" allowedActions:" + x10.toString(2);
x9+=" allowedFlavors:" + this._allowedFlavors;
 return x9;
}
AdfBasicDropTarget.prototype.GetAllowedFlavors= function(x11)
{
 return this._allowedFlavors;
}
AdfBasicDropTarget.prototype.GetAllowedActions= function(x12)
{
 return this._allowedActions;
}

function AdfInsertTextBehavior(x0,x1,x2)
{
this.Init(x0,x1,x2);
}
AdfInsertTextBehavior.InitClass= function()
{
}
AdfObject.createSubclass(AdfInsertTextBehavior,AdfClientBehavior);
AdfInsertTextBehavior.prototype.Init= function(x0,x1,x2)
{
AdfInsertTextBehavior.superclass.Init.call(this);
AdfAssert.assertString(x0);
this._componentId=x0;
this._value=x1;
this._triggerType=x2;
}
AdfInsertTextBehavior.prototype.initialize= function(x3)
{
 var x4=this._triggerType;
 if (!x4)
x4=AdfActionEvent.ACTION_EVENT_TYPE
x3.addEventListener(x4,this.fire,this);
}
AdfInsertTextBehavior.prototype.fire= function(x5)
{
x5.cancel();
 var x6=x5.getSource();
 var x7=this._componentId;
 var x8=x6.findComponent(x7);
 var x9=AdfLogger.LOGGER;
 if (!x8)
{
x9.severe("Could not find component with Id: " + x7);
 return;
}
 var x10=x8.getPeer();
x10.bind(x8);
 if (x10.replaceTextSelection)
x10.replaceTextSelection(this._value);
}
function AdfEditingAgent()
{
this.Init();
}
AdfObject.createSubclass(AdfEditingAgent);
AdfEditingAgent.getInstance= function()
{
 if (AdfEditingAgent._instance==undefined)
{
 var x0=AdfAgent.AGENT.getPlatform();
switch(x0)
{
 case AdfAgent.GECKO_PLATFORM:
AdfEditingAgent._instance= new AdfGeckoEditingAgent();
break;
 case AdfAgent.IE_PLATFORM:
AdfEditingAgent._instance= new AdfIEEditingAgent();
break;
 case AdfAgent.WEBKIT_PLATFORM:
AdfEditingAgent._instance= new AdfSafariEditingAgent();
break;
default:
AdfLogger.LOGGER.severe("Rich Text Editing is not supported on this platform");
break;
}
}
 return AdfEditingAgent._instance;
}
AdfEditingAgent.prototype.toBrowserSpecificCommand= function(x1)
{
 return x1;
}
AdfEditingAgent.prototype.getContentWindow= function(x2)
{
AdfAssert.assertDomElement(x2,"IFRAME");
AdfAssert.assert(x2.contentWindow,"Unexpected null contentWindow.");
 return x2.contentWindow;
}
AdfEditingAgent.prototype.getColor= function(x3)
{
 var x4=null;
 if (x3.indexOf("#")===0)
{
x4= new TrColorConverter(["#RRGGBB"],false);
}
 else
 {
x4= new TrColorConverter(["'rgb'(r, g, b)","'rgb'(r,g,b)"],false);
}
try
{
x3=x4.getAsObject(x3);
}
catch(e)
{
x3=null;
}
 return x3;
}
AdfEditingAgent.prototype.getInlineFrameDocument= function(x5)
{
AdfAssert.assertDomElement(x5,"IFRAME");
 var x6=this.getContentWindow(x5);
AdfAssert.assert(x6,"Unexpected null contentWindow.");
AdfAssert.assert(x6.document,"Unexpected null contentWindow document.");
 return x6.document;
}
AdfEditingAgent.prototype.execCommand= function(
x7,
x8,
x9,
x10
)
{
 var x11;
 if (x9!="insert")
{
AdfAssert.assertDomElement(x8,"IFRAME");
x11=AdfEditingAgent.getInstance().getInlineFrameDocument(x8);
}
 if (x10==null)
{
switch(x9)
{
 case "createlink":
 var x12=AdfPage.PAGE.getLookAndFeel();
 var x13=x12.getTranslatedString("af_richTextEditor.LABEL_SPECIFY_THE_URL");
 var x14=this._getLinkURLForSelection(x7,x8);
x10=prompt(x13,x14);
 if ((x10==null)||(x10==""))
{
 return;
}
break;
}
}
switch(x9)
{
 case "insert":
 var x15=x10;
 if (x15==null)
{
x15="";
}
this.insertHtmlAtSelection(x8,x15);
break;
 case "moderichtext":
x7.getPeer().setCodeEditingMode(false);
break;
 case "modecode":
x7.getPeer().setCodeEditingMode(true);
break;
 case "undo":
this.ExecuteUndo(x7,x8,x11);
break;
 case "redo":
this.ExecuteRedo(x7,x8,x11);
break;
 case "createlink":
this.CreateLink(x7,x11,x10);
break;
default:
this._executeCommand(x7,x11,x9,x10);
}
}
AdfEditingAgent.prototype.queryCommandEnabled= function(x16,x17,x18)
{
AdfAssert.assertString(x18);
 var x19=false;
switch(x18)
{
 case "insert":
 case "moderichtext":
 case "modecode":
x19=true;break;
 case "undo":
x19=this.QueryUndoEnabled(x16,x17);
break;
 case "redo":
x19=this.QueryRedoEnabled(x16,x17);
break;
default:
x19=this._queryCommandEnabled(x16,x17,x18);
}
 return x19;
}
AdfEditingAgent.prototype.setInlineFrameContentEditable= function(x20)
{
AdfAssert.assertDomElement(x20,"IFRAME");
 var x21=this.getInlineFrameDocument(x20);
x21.designMode="on";
 return true;
}
AdfEditingAgent.prototype.isDesignMode= function(x22)
{
 var x23=this.getInlineFrameDocument(x22);
 var x24=x23.designMode;
 if (x24)
x24=x24.toLowerCase();
 return x24=="on";
}
AdfEditingAgent.prototype.isDesignModeReloadingFrame= function()
{
 return false;
}
AdfEditingAgent.prototype.queryCommandValue= function(x25,x26)
{
x26=this.toBrowserSpecificCommand(x26);
 var x27=false;
try
{
x27=this.getInlineFrameDocument(x25).queryCommandValue(x26);
}
catch(e)
{
AdfLogger.LOGGER.severe("queryCommandValue: command not supported (",x26,").",e);
}
 return x27;
}
AdfEditingAgent.prototype.queryCommandState= function(x28,x29)
{
AdfAssert.assertString(x29);
 if (x29=="indent"||x29=="outdent")
{
 return;
}
 if (
x29=="forecolor"||
x29=="backcolor"||
x29=="fontsize"||
x29=="fontname"
)
{
 return this.queryCommandValue(x28,x29);
}
 var x30=false;
x29=this.toBrowserSpecificCommand(x29);
try
{
x30=this.getInlineFrameDocument(x28).queryCommandState(x29);
}
catch(e)
{
AdfLogger.LOGGER.severe("queryCommandState: command not supported (",x29,").",e);
}
 return x30;
}
AdfEditingAgent.prototype.setRTL= function(x31)
{
AdfAssert.assert(x31);
 var x32=x31.body;
AdfAssert.assertDomElement(x32,"BODY");
x32.setAttribute("dir",AdfPage.PAGE.getLocaleContext().isRightToLeft()?"rtl":"ltr");
}
AdfEditingAgent.prototype.queryCommandIndeterminate= function(x33,x34)
{
x34=this.toBrowserSpecificCommand(x34);
 var x35=false;
try
{
x35=this.getInlineFrameDocument(x33).queryCommandIndeterm(x34);
}
catch(e)
{
AdfLogger.LOGGER.severe("queryCommandIndeterminate: command not supported (",x34,").",e);
}
 return x35;
}
AdfEditingAgent.prototype.getFocusBlurElement= function(x36)
{
 return x36;
}
AdfEditingAgent.prototype.getSelectionRange= function(x37)
{
 return this.getInlineFrameDocument(x37).selection.createRange();
}
AdfEditingAgent.prototype.getInlineFrameContent= function(x38,x39)
{
 return this.getInlineFrameDocument(x38).body.innerHTML;
}
AdfEditingAgent.prototype.setInlineFrameContent= function(x40,x41)
{
this.getInlineFrameDocument(x40).body.innerHTML=x41;
}
AdfEditingAgent.prototype.getDefaultContent= function()
{
 return "";
}
AdfEditingAgent.prototype.setSelectionRange= function(x42,x43)
{
x43.select();
}
AdfEditingAgent.prototype.insertHtmlAtSelection= function(x44,x45)
{
 if (x44.nodeName=="TEXTAREA"||x44.nodeName=="INPUT")
{
 var x46=x44.selectionStart+x45.length;
x44.value=x44.value.substr(0,x44.selectionStart) + x45 + x44.value.substr(x44.selectionEnd);
x44.selectionStart=x46;
x44.selectionEnd=x46;
}
 else
 {
 var x47=this.getSelectionRange(x44);
 if (x47==null)
{
AdfLogger.LOGGER.severe("Unexpected null selection for insert command.");
}
 else
 {
 if (x47.toString().length>0)
{
x47.deleteContents();
}
 var x48=x47.cloneRange();
 var x49=document.createElement("div");
x49.innerHTML=x45;
 var x50=x49.childNodes;
 var x51=x50.length;
 var x52=null;
for(var x53=x51-1;x53>=0;x53--)
{
 var x54=x50[x53];
 if (x52==null)
{
x52=x54;
}
x47.insertNode(x54);
}
 if (x52!=null)
{
x47.selectNode(x52);
x47.setStartAfter(x52);
}
}
}
}
AdfEditingAgent.prototype.handleTab= function(x55,x56)
{
}
AdfEditingAgent.prototype.updateValueHistory= function(x57,x58,x59)
{
}
AdfEditingAgent.prototype.ExecuteUndo= function(x60,x61,x62)
{
this._executeCommand(x60,x62,"undo",null);
}
AdfEditingAgent.prototype.ExecuteRedo= function(x63,x64,x65)
{
this._executeCommand(x63,x65,"redo",null);
}
AdfEditingAgent.prototype.CreateLink= function (x66,x67,x68)
{
this._executeCommand(x66,x67,"createlink",x68);
}
AdfEditingAgent.prototype.QueryUndoEnabled= function(x69,x70)
{
 return this._queryCommandEnabled(x69,x70,"undo");
}
AdfEditingAgent.prototype.QueryRedoEnabled= function(x71,x72)
{
 return this._queryCommandEnabled(x71,x72,"redo");
}
AdfEditingAgent.prototype.IsNodeWrappingRange= function(x73,x74)
{
 var x75=x74.ownerDocument.createRange();
try
{
x75.selectNode(x74);
}
catch(e)
{
AdfLogger.LOGGER.logErrorAsInfo(e,"Unable to select node in range");
 return false;
}
 var x76=
(x73.compareBoundaryPoints(Range.START_TO_START,x75)!= -1);
 var x77=
(x73.compareBoundaryPoints(Range.END_TO_END,x75)!=1);
 return (x76&&x77);
}
AdfEditingAgent.prototype._executeCommand= function(x78,x79,x80,x81)
{
 var x82=this.toBrowserSpecificCommand(x80);
try
{
x79.execCommand(x82,null,x81);
}
catch(e)
{
AdfLogger.LOGGER.severe(
"execCommand[",x80,",",x81,"] failed with the following exception: ",e);
}
}
AdfEditingAgent.prototype._queryCommandEnabled= function(x83,x84,x85)
{
 var x86=false;
 var x87=this.getInlineFrameDocument(x84);
x85=this.toBrowserSpecificCommand(x85);
try
{
x86=x87.queryCommandEnabled(x85);
}
catch(e)
{
AdfLogger.LOGGER.severe(
"queryCommandEnabled failed with the following exception: [",
x85,
"]: ",
e
);
}
 return x86;
}
AdfEditingAgent.prototype._getLinkURLForSelection= function(x88,x89)
{
AdfAssert.assertDomElement(x89,"IFRAME");
 var x90=this.getInlineFrameDocument(x89);
 var x91=x90.getElementsByTagName("a");
 var x92=x88.getPeer().getSelectionRange(x88);
 var x93="about:blank";
for(var x94=0;x94<x91.length;x94++)
{
 if (this.IsNodeWrappingRange(x92,x91[x94]))
{
x93=x91[x94].href;
break;
}
}
 return x93;
}
function AdfSafariEditingAgent()
{
this.Init();
}
AdfObject.createSubclass(AdfSafariEditingAgent,AdfEditingAgent);
AdfSafariEditingAgent.prototype.getInlineFrameContent= function(x0,x1)
{
 var x2=this.getInlineFrameDocument(x0).body;
 if (!x1)
{
 var x3=x2.childNodes;
 if (x3&&x3.length==1)
{
 var x4=x3[0];
 if (x4.nodeName=="P"&&x4.innerText=="")
{
 return "";
}
}
}
 return x2.innerHTML;
}
AdfSafariEditingAgent.prototype.getDefaultContent= function()
{
 return "<P></P>";
}
AdfSafariEditingAgent.prototype.insertHtmlAtSelection= function(x5,x6)
{
 if (x5.nodeName=="TEXTAREA"||x5.nodeName=="INPUT")
{
 var x7=x5.selectionStart+x6.length;
x5.value=
x5.value.substr(0,x5.selectionStart) +
 x6 +
 x5.value.substr(x5.selectionEnd);
x5.selectionStart=x7;
x5.selectionEnd=x7;
}
 else
 {
 var x8=this.getSelectionRange(x5);
 if (x8==null)
{
 var x9=this.getInlineFrameDocument(x5);
 var x10=x9.createElement("div");
x10.innerHTML=x6;
 var x11=x10.childNodes;
 var x12=x11.length;
 var x13=x9.body;
for(var x14=x12-1;x14>=0;x14--)
{
 var x15=x11[x14];
x13.insertBefore(x15,x13.firstChild);
}
}
 else
 {
 if (x8.toString().length>0)
{
x8.deleteContents();
}
 var x9=this.getInlineFrameDocument(x5);
 var x10=x9.createElement("div");
x10.innerHTML=x6;
 var x11=x10.childNodes;
 var x12=x11.length;
 var x16=null;
for(var x14=x12-1;x14>=0;x14--)
{
 var x15=x11[x14];
 if (x16==null)
{
x16=x15;
}
x8.insertNode(x15);
}
 if (x16!=null)
{
x8.selectNode(x16);
x8.setStartAfter(x16);
}
}
}
}
AdfSafariEditingAgent.prototype.setInlineFrameContentEditable= function(x17)
{
 if (this.isDesignMode(x17))
 return false;
 var x18=AdfSafariEditingAgent.superclass.setInlineFrameContentEditable.call(this,x17);
 if (this.isDesignMode(x17))
{
this.execCommand(null,x17,"styleWithCSS",true);
}
 return x18;
}
AdfSafariEditingAgent.prototype.getFocusBlurElement= function(x19)
{
AdfAssert.assertDomElement(x19,"IFRAME");
 var x20=this.getInlineFrameDocument(x19).body;
x20.tabIndex=0;
 return x20;
}
AdfSafariEditingAgent.prototype.getSelectionRange= function(x21)
{
AdfAssert.assertDomElement(x21,"IFRAME");
 var x22=this._getWindowSelection(x21);
 if (x22&&(x22.rangeCount>0))
{
 return x22.getRangeAt(0);
}
}
AdfSafariEditingAgent.prototype.setSelectionRange= function(x23,x24)
{
AdfAssert.assertDomElement(x23,"IFRAME");
 var x25=this._getWindowSelection(x23);
 if (x25)
{
x25.removeAllRanges();
x25.addRange(x24);
}
}
AdfSafariEditingAgent.prototype._getWindowSelection= function(x26)
{
AdfAssert.assertDomElement(x26,"IFRAME");
 return this.getInlineFrameDocument(x26).defaultView.getSelection();
}
AdfSafariEditingAgent.prototype.handleTab= function(x27,x28)
{
 if (x28.shiftKey)
{
AdfAgent.AGENT.preventDefault(x28);
AdfFocusUtils.focusPreviousTabStop(x27);
}
 else
 {
AdfAgent.AGENT.preventDefault(x28);
AdfFocusUtils.focusNextTabStop(x27,null,true);
}
}
AdfSafariEditingAgent.prototype.queryCommandValue= function(x29,x30)
{
 if (!this.isDesignMode(x29))
{
 return;
}
 return AdfSafariEditingAgent.superclass.queryCommandValue.call(this,x29,x30);
}
AdfSafariEditingAgent.prototype.queryCommandState= function(x31,x32)
{
 if (!this.isDesignMode(x31))
{
 return;
}
 return AdfSafariEditingAgent.superclass.queryCommandState.call(this,x31,x32);
}
AdfSafariEditingAgent.prototype.queryCommandIndeterminate= function(x33,x34)
{
 if (!this.isDesignMode(x33))
{
 return false;
}
 return AdfSafariEditingAgent.superclass.queryCommandIndeterminate.call(this,x33,x34);
}
AdfSafariEditingAgent.prototype.queryCommandEnabled= function(x35,x36,x37)
{
 if (!this.isDesignMode(x36))
{
 return false;
}
 return AdfSafariEditingAgent.superclass.queryCommandEnabled.call(
this,
x35,
x36,
x37);
}

AdfUIComponents.createComponentClass("AdfUINavigationPath",
{
componentType:"org.apache.myfaces.trinidad.NavigationPath",
propertyKeys:["value"
],
namingContainer:true,
superclass:AdfUICollection
});

AdfUIComponents.createComponentClass("AdfRichBreadCrumbs",
{
componentType:"oracle.adf.RichBreadCrumbs",
propertyKeys:[{name:"orientation",type:"String","default":"horizontal"}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
],
namingContainer:true,
superclass:AdfUINavigationPath
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlBreadCrumbsPeer",false);
AdfDhtmlBreadCrumbsPeer.prototype.InitDomElement= function(x0,x1)
{
AdfDhtmlBreadCrumbsPeer.superclass.InitDomElement.call(this,x0,x1);
 var x2=x0.getClientId();
 var x3=AdfRichUIPeer.CreateSubId(x2,"oc");
this._overflowContents=AdfAgent.AGENT.getElementById(x3);
AdfPage.PAGE.__registerDescendantResizeNotifyComponent(x0);
}
AdfDhtmlBreadCrumbsPeer.prototype.needsResizeNotify= function(x4)
{
 return true;
}
AdfDhtmlBreadCrumbsPeer.prototype.ResizeNotify= function(
x5,
x6,
x7,
x8
)
{
 var x9=this.getComponent();
 var x10=this.getDomElement();
 if (!this._overflowSupport)
{
 var x11=x9.getClientId();
 if (!AdfOverflowSupport.needsOverflow(x11))
 return;
this._overflowSupport= new AdfOverflowSupport(x11,this,"start","before");
 var x12=this._overflowContents.childNodes;
 var x13,x14=0;
while(x13=x12[x14++])
{
 if (x13.nodeType==1)
{
 if (x13.tagName.toLowerCase()=="a"||x13.getElementsByTagName("a").length>0)
{
this._overflowSupport.createStep();
 var x15=this._createOverflowElement(x13);
x14++;
this._overflowSupport.addOverflowElement(x15);
}
 else
 {
this._overflowSupport.createStep();
this._overflowSupport.addElement(x13);
}
}
}
}
this._overflowSupport.handleResize();
}
AdfDhtmlBreadCrumbsPeer.prototype.ComponentRemoved= function(x16)
{
 if (this._overflowSupport)
{
this._overflowSupport.removeOverflowSupport();
 delete this._overflowSupport;
}
 delete this._overflowContents;
AdfPage.PAGE.__unregisterDescendantResizeNotifyComponent(x16);
AdfDhtmlBreadCrumbsPeer.superclass.ComponentRemoved.call(this,x16);
}
AdfDhtmlBreadCrumbsPeer.prototype._createOverflowElement= function(x17)
{
 var x18=x17.ownerDocument.createElement("div");
 var x19=AdfDhtmlBreadCrumbsPeer._overflowElementStyleClass;
 if (x19==null)
{
 var x20=AdfPage.PAGE.getLookAndFeel();
x19=x20.getStyleClass("AFOverflowElement");
AdfDhtmlBreadCrumbsPeer._overflowElementStyleClass=x19;
}
x18.className=x19;
 var x21=this._overflowSupport.createSwapPosition(x17);
x18.appendChild(x21);
 return x18;
}
AdfUIComponents.createComponentClass("AdfRichGoButton",
{
componentType:"oracle.adf.RichGoButton",
propertyKeys:[{name:"text",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"accessKey",type:"String"}
,{name:"targetFrame",type:"String"}
,{name:"icon",type:"String"}
,{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
],
superclass:AdfUIGo
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlGoButtonPeer");
AdfDhtmlGoButtonPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichGoButton.TEXT);
}
AdfDhtmlGoButtonPeer.prototype.GetInlineEditor= function(x0)
{
 return AdfDhtmlButtonTextEditor.getInlineEditor();
}
AdfDhtmlGoButtonPeer.prototype.GetAccessibleName= function()
{
 var x1=this.getComponent();
 return x1.getText();
}
AdfDhtmlGoButtonPeer.prototype.ComponentTextChanged= function(
x2,
x3,
x4,
x5)
{
 var x6=AdfDhtmlButtonPeer.getInlineEditableTextElement(x2,x3);
 if (x6)
{
 return AdfDomUtils.handleTextChangeWithAccessKey(x2,x6,x4);
}
 return false;
}
AdfUIComponents.createComponentClass("AdfRichGoImageLink",
{
componentType:"oracle.adf.RichGoImageLink",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"accessKey",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"targetFrame",type:"String"}
,{name:"text",type:"String"}
,{name:"depressedIcon",type:"String"}
,{name:"disabledIcon",type:"String"}
,{name:"hoverIcon",type:"String"}
,{name:"icon",type:"String"}
,{name:"iconPosition",type:"String","default":"leading"}
],
superclass:AdfUIGo
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlGoImageLinkPeer");
AdfDhtmlGoImageLinkPeer.InitSubclass= function()
{
AdfObject.ensureClassInitialization(AdfRichGoImageLink);
AdfRichUIPeer.addComponentEventHandlers(this,
AdfUIInputEvent.MOUSE_DOWN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_UP_EVENT_TYPE,
AdfUIInputEvent.MOUSE_IN_EVENT_TYPE,
AdfUIInputEvent.MOUSE_OUT_EVENT_TYPE);
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichGoImageLink.TEXT);
this._DEPRESSED_STYLE_CLASS="p_AFDepressed";
}
AdfDhtmlGoImageLinkPeer.prototype.HandleComponentMouseOver= function(x0)
{
 if (!this.getComponent().getDisabled())
this._displayMouseOverIcon(this.getComponent());
}
AdfDhtmlGoImageLinkPeer.prototype.HandleComponentMouseOut= function(x1)
{
 var x2=this.getComponent();
 if (x2.getDisabled())
 return;
this._setDepressedStyle(x2,false);
this._displayDefaultIcon(this.getComponent());
}
AdfDhtmlGoImageLinkPeer.prototype.HandleComponentMouseUp= function(x3)
{
 var x4=this.getComponent();
 if (x4.getDisabled())
 return;
this._setDepressedStyle(x4,false);
this._displayMouseOverIcon(x4);
}
AdfDhtmlGoImageLinkPeer.prototype.HandleComponentMouseDown= function(x5)
{
 var x6=this.getComponent();
 var x7=x5.isLeftButtonPressed();
 var x8=x6.getDisabled();
 if (x8|| !x7)
 return;
this._setDepressedStyle(x6,true);
this._displayMouseDownIcon(x6);
}
AdfDhtmlGoImageLinkPeer.prototype._getIconElement= function(x9)
{
 var x10=x9.getClientId();
 var x11=AdfRichUIPeer.CreateSubId(x10,"icon");
 return AdfAgent.AGENT.getElementById(x11);
}
AdfDhtmlGoImageLinkPeer.prototype._displayDefaultIcon= function(x12)
{
 var x13=x12.getIcon();
 if (x13)
this._getIconElement(x12).src=x13;
}
AdfDhtmlGoImageLinkPeer.prototype._displayMouseDownIcon= function(x14)
{
this._displayIcon(x14,x14.getDepressedIcon());
}
AdfDhtmlGoImageLinkPeer.prototype._displayMouseOverIcon= function(x15)
{
this._displayIcon(x15,x15.getHoverIcon());
}
AdfDhtmlGoImageLinkPeer.prototype._displayDisabledIcon= function(x16)
{
this._displayIcon(x16,x16.getDisabledIcon());
}
AdfDhtmlGoImageLinkPeer.prototype._displayIcon= function(x17,x18)
{
 var x19=x17.getIcon();
 if (x19)
this._getIconElement(x17).src=x18||x19;
}
AdfDhtmlGoImageLinkPeer.prototype._setDepressedStyle= function(x20,x21)
{
 var x22=AdfRichUIPeer.getDomElementForComponent(x20);
 var x23=AdfDhtmlGoImageLinkPeer._DEPRESSED_STYLE_CLASS;
 if (x21)
AdfDomUtils.addCSSClassName(x22,x23);
 else
 AdfDomUtils.removeCSSClassName(x22,x23);
}
AdfDhtmlGoImageLinkPeer.prototype.ComponentTextChanged=
AdfDomUtils.__componentTextChanged;
AdfUIComponents.createComponentClass("AdfRichGoLink",
{
componentType:"oracle.adf.RichGoLink",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"accessKey",type:"String"}
,{name:"disabled",type:"Boolean","default":false,secured:true}
,{name:"targetFrame",type:"String"}
,{name:"text",type:"String"}
],
superclass:AdfUIGo
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlGoLinkPeer");
AdfDhtmlGoLinkPeer.InitSubclass= function()
{
AdfRichUIPeer.addComponentPropertyChanges(this,AdfRichGoLink.TEXT);
}
AdfDhtmlGoLinkPeer.prototype.GetInlineEditor= function(x0)
{
 return AdfDhtmlSimpleTextEditor.getInlineEditor();
}
AdfDhtmlGoLinkPeer.prototype.GetAccessibleName= function()
{
 var x1=this.getComponent();
 return x1.getText();
}
AdfDhtmlGoLinkPeer.prototype.ComponentTextChanged=
AdfDomUtils.__componentTextChanged;

AdfUIComponents.createComponentClass("AdfRichIcon",
{
componentType:"oracle.adf.RichIcon",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"name",type:"String"}
],
superclass:AdfUIObject
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlIconPeer");

AdfUIComponents.createComponentClass("AdfRichImage",
{
componentType:"oracle.adf.RichImage",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"visible",type:"Boolean","default":true}
,{name:"source",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"longDescURL",type:"String"}
,{name:"imageMapType",type:"String","default":"none"}
],
superclass:AdfUIObject
});

AdfRichImage.prototype.getAccessibleName= function()
{
 return this.getShortDesc();
}

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlImagePeer");
AdfDhtmlImagePeer.InitSubclass= function()
{
 var x0=AdfRichImage.SOURCE;
AdfRichUIPeer.addComponentPropertyGetters(this,x0);
AdfRichUIPeer.addComponentPropertyChanges(this,x0);
}
AdfDhtmlImagePeer.prototype.GetComponentSource= function(
x1,
x2)
{
 return AdfPage.PAGE.removeResourceURL(x2.src);
}
AdfDhtmlImagePeer.prototype.ComponentSourceChanged= function(
x3,
x4,
x5,
x6)
{
 if (x5==null)
x5="";
x4.src=AdfPage.PAGE.getResourceURL(x5);
}

function AdfRichPlainTextEditor(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfRichPlainTextEditor,AdfRichInlineEditor);
AdfRichPlainTextEditor._extraWidth=0;
AdfRichPlainTextEditor.prototype.Init= function(x0)
{
AdfAssert.assertString(x0);
AdfRichPlainTextEditor.superclass.Init.call(this);
this._propertyName=x0;
}
AdfRichPlainTextEditor.prototype.PreEdit= function()
{
 return (this.GetEditedDomElement()!=null)
}
AdfRichPlainTextEditor.prototype.getEditedProperty= function()
{
 return this._propertyName;
}
AdfRichPlainTextEditor.prototype.startEdit= function(x1,x2)
{
AdfRichPlainTextEditor.superclass.startEdit.call(this,x1,x2);
 var x3=this.GetEditedPeer();
 var x4=x3.getDomDocument();
 var x5=x4.createElement("input");
x5.type="text";
 var x6=AdfAgent.AGENT;
 var x7=x1.getProperty(this._propertyName);
x5.value=x7;
x1._orgininalEditValue=x7;
 var x8=this.GetEditedDomElement();
x6.copyStyle(x8,x5);
 var x9=x5.style;
x9.position="absolute";
 if (x9.MozBoxSizing)
x9.MozBoxSizing=null;
x9.zIndex=1;
AdfRichPlainTextEditor._textArea=x5;
AdfRichPlainTextEditor._extraWidth=(x9.textAlign=="left")
?20
:0;
 var x10=x4.body;
x10.insertBefore(x5,x10.firstChild);
this._updateTextAreaPosition(x5,x8);
x8.style.visibility="hidden";
AdfFocusUtils.focusElementDelayed(x5,1);
 var x11=AdfRichPlainTextEditor._commitEditStub;
x6.addBubbleEventListener(x5,"keyup",x11);
x6.addBubbleEventListener(x5,"keypress",x11);
x1.addEventListener("propertyChange",this._syncFromPropertyChange,this);
x6.addEventBubbles(x5,AdfRichPlainTextEditor._handleEditorEventStub);
}
AdfRichPlainTextEditor.prototype.stopEdit= function()
{
this._commitEdit();
this._finishEdit();
AdfRichPlainTextEditor.superclass.stopEdit.call(this);
}
AdfRichPlainTextEditor.prototype._handleEditorEvent= function(x12)
{
 if (x12.type=='blur')
{
AdfPage.PAGE.setEditedComponent(null,x12);
}
 else if (x12.type=='keyup')
{
 var x13=AdfAgent.AGENT.getKeyCode(x12);
switch(x13)
{
 case AdfKeyStroke.ESC_KEY:
 var x14=this.getEditedComponent();
AdfRichPlainTextEditor._textArea.value=x14._orgininalEditValue;
AdfPage.PAGE.setEditedComponent(null,x12);
break;
 case AdfKeyStroke.ENTER_KEY:
 if (x12.altKey||(!x12.ctrlKey&& !x12.shiftKey))
{
AdfPage.PAGE.setEditedComponent(null,x12);
}
break;
 case AdfKeyStroke.TAB_KEY:
AdfPage.PAGE.setEditedComponent(null,x12);
break;
}
}
}
AdfRichPlainTextEditor.prototype.GetEditedDomElement= function()
{
 return this.GetEditedPeer().getDomElement();
}
AdfRichPlainTextEditor.prototype._commitEdit= function()
{
this.getEditedComponent().setProperty(this._propertyName,
AdfRichPlainTextEditor._textArea.value,
true);
}
AdfRichPlainTextEditor.prototype._finishEdit= function()
{
 var x15=this.getEditedComponent();
x15._orgininalEditValue=null;
x15.removeEventListener("propertyChange",this._syncFromPropertyChange,this);
 var x16=AdfRichPlainTextEditor._textArea;
 var x17=AdfAgent.AGENT;
 var x18=AdfRichPlainTextEditor._commitEditStub;
x17.removeBubbleEventListener(x16,"keypress",x18);
x17.removeBubbleEventListener(x16,"keyup",x18);
x17.removeEventBubbles(x16,AdfRichPlainTextEditor._handleEditorEventStub);
 var x19=this.GetEditedDomElement();
 var x20=x19.ownerDocument;
x20.body.removeChild(x16);
x19.style.visibility="visible";
AdfRichPlainTextEditor._textArea=null;
AdfRichPlainTextEditor._extraWidth=0;
}
AdfRichPlainTextEditor._commitEditStub= function()
{
 var x21=AdfPage.PAGE.getEditedComponent();
 if (x21!=null)
{
 var x22=x21.getPeer().getInlineEditor(x21);
 if (x22!=null)
{
AdfAssert.assertPrototype(x22,AdfRichPlainTextEditor);
x22._commitEdit();
}
}
}
AdfRichPlainTextEditor._handleEditorEventStub= function(x23)
{
x23=x23?x23:window.event;
 var x24=AdfPage.PAGE.getEditedComponent();
 if (x24!=null)
{
 var x25=x24.getPeer().getInlineEditor(x24);
 if (x25!=null)
{
AdfAssert.assertPrototype(x25,AdfRichPlainTextEditor);
x25._handleEditorEvent(x23);
}
}
}
AdfRichPlainTextEditor.prototype._syncFromPropertyChange= function(x26)
{
 if (x26.getPropertyName()==this._propertyName)
{
 var x27=AdfRichPlainTextEditor._textArea;
 var x28=this.GetEditedDomElement();
this._updateTextAreaPosition(x27,x28);
 var x29=x26.getNewValue();
 if (x29==null)
x29="";
 if (x27.value!=x29)
{
x27.value=x29;
}
}
}
AdfRichPlainTextEditor.prototype._updateTextAreaPosition= function(
x30,x31)
{
 var x32=x30.style;
 var x33=AdfAgent.AGENT;
 var x34=x33.getElementPageBounds(x31);
 var x35=x34.left;
 var x36=x32.textAlign;
x32.top=x34.top + "px";
x32.left=x35 + "px";
x33.setOuterWidth(x30,x31.offsetWidth + AdfRichPlainTextEditor._extraWidth);
x33.setOuterHeight(x30,x31.offsetHeight);
}

function AdfDhtmlSimpleLabelEditor()
{
this.Init("label");
}
AdfObject.createSubclass(AdfDhtmlSimpleLabelEditor,AdfRichPlainTextEditor);
AdfDhtmlSimpleLabelEditor.getInlineEditor= function()
{
 var x0=AdfDhtmlSimpleLabelEditor._INLINE_EDITOR;
 if (x0==null)
{
x0= new AdfDhtmlSimpleLabelEditor();
AdfDhtmlSimpleLabelEditor._INLINE_EDITOR=x0;
}
 return x0;
}
AdfDhtmlSimpleLabelEditor.prototype.GetEditedDomElement= function()
{
 var x1=this.getEditedComponent();
 if (x1.getProperty("label")==undefined)
{
 return null;
}
 var x2=this.GetEditedPeer().getDomElement();
 return AdfDomUtils.getFirstDescendentElement(x2,"LABEL");
}

function AdfDhtmlSimpleTextEditor(x0)
{
this.Init(x0);
}
AdfObject.createSubclass(AdfDhtmlSimpleTextEditor,AdfRichPlainTextEditor);
AdfDhtmlSimpleTextEditor.prototype.Init= function(x0)
{
AdfDhtmlSimpleTextEditor.superclass.Init.call(this,"text");
AdfAssert.assertString(x0);
this._wrapperElementName=x0;
}
AdfDhtmlSimpleTextEditor.getInlineEditor= function()
{
 var x1=AdfDhtmlSimpleTextEditor._INLINE_EDITOR;
 if (x1==null)
{
x1= new AdfDhtmlSimpleTextEditor("span");
AdfDhtmlSimpleTextEditor._INLINE_EDITOR=x1;
}
 return x1;
}
AdfDhtmlSimpleTextEditor.getAnchorInlineEditor= function()
{
 var x2=AdfDhtmlSimpleTextEditor._ANCHOR_INLINE_EDITOR;
 if (x2==null)
{
x2= new AdfDhtmlSimpleTextEditor("a");
AdfDhtmlSimpleTextEditor._ANCHOR_INLINE_EDITOR=x2;
}
 return x2;
}
AdfDhtmlSimpleTextEditor.prototype.GetEditedDomElement= function()
{
 var x3=this.getEditedComponent();
 if (x3.getProperty("text")==undefined)
{
 return null;
}
 var x4=this.GetEditedPeer().getDomElement();
 var x5=AdfDomUtils.getFirstDescendentElement(x4,
this._wrapperElementName);
 if (x5)
{
 var x6=x3.getProperty("accessKey",null);
 if (x6!=null)
{
 var x7=AdfDomUtils.findAccessKeyDom(x4,x6);
 return x7==x5?x4:x5;
}
 return x5;
}
 return x4;
}

function AdfDhtmlButtonTextEditor(x0)
{
this.Init("text");
}
AdfObject.createSubclass(AdfDhtmlButtonTextEditor,AdfRichPlainTextEditor);
AdfDhtmlButtonTextEditor.getInlineEditor= function()
{
 var x0=AdfDhtmlButtonTextEditor._INLINE_EDITOR;
 if (x0==null)
{
x0= new AdfDhtmlButtonTextEditor();
AdfDhtmlButtonTextEditor._INLINE_EDITOR=x0;
}
 return x0;
}
AdfDhtmlButtonTextEditor.prototype.GetEditedDomElement= function()
{
 var x1=this.getEditedComponent();
 var x2=this.GetEditedPeer().getDomElement();
 return AdfDhtmlButtonPeer.getInlineEditableTextElement(x1,x2);
}
AdfDhtmlButtonTextEditor.prototype.stopEdit= function()
{
 var x3=this.getEditedComponent();
 var x4=this.GetEditedPeer().getDomElement();
AdfDhtmlButtonTextEditor.superclass.stopEdit.call(this);
AdfDhtmlButtonPeer.stopInlineEditableTextElement(x3,x4);
}

function AdfDhtmlNavigationItemTextEditor(x0)
{
this.Init("text");
}
AdfObject.createSubclass(AdfDhtmlNavigationItemTextEditor,AdfRichPlainTextEditor);
AdfDhtmlNavigationItemTextEditor.getInlineEditor= function()
{
 var x0=AdfDhtmlNavigationItemTextEditor._INLINE_EDITOR;
 if (x0==null)
{
x0= new AdfDhtmlNavigationItemTextEditor();
AdfDhtmlNavigationItemTextEditor._INLINE_EDITOR=x0;
}
 return x0;
}
AdfDhtmlNavigationItemTextEditor.prototype.GetEditedDomElement= function()
{
 var x1=this.getEditedComponent();
 if (!x1.getProperty("text"))
 return null;
 var x2=this.GetEditedPeer().getDomElement();
 return AdfDhtmlCommandNavigationItemPeer.getInlineEditableTextElement(
x1,
x2);
}

function AdfDhtmlSelectBooleanTextEditor()
{
this.Init("text");
}
AdfObject.createSubclass(AdfDhtmlSelectBooleanTextEditor,AdfRichPlainTextEditor);
AdfDhtmlSelectBooleanTextEditor.prototype.GetEditedDomElement= function()
{
 var x0=this.GetEditedPeer().getDomElement();
 return AdfDhtmlSelectBooleanCheckboxPeer.__getInlineEditableTextElement(x0);
}

AdfUIComponents.createComponentClass("AdfRichOutputText",
{
componentType:"oracle.adf.RichOutputText",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"escape",type:"Boolean","default":true}
,{name:"noWrap",type:"Boolean","default":false}
,{name:"truncateAt",type:"Number","default":0}
,{name:"description",type:"String"}
],
superclass:AdfUIOutput
});

AdfRichOutputText.prototype.getAccessibleName= function()
{
 return this.getShortDesc();
}

AdfRichUIPeer.createPeerClass(AdfDhtmlValuePeer,"AdfDhtmlTextPeer");
AdfDhtmlTextPeer.InitSubclass= function()
{
this._inlineEditor=null;
}
AdfDhtmlTextPeer.prototype.SetDisplayValue= function(
x0,
x1,
x2)
{
 if (x0.getEscape())
AdfAgent.AGENT.setTextContent(x1,x2);
 else
 x1.innerHTML=x2;
}
AdfDhtmlTextPeer.prototype.GetDisplayValue= function(
x3,
x4)
{
AdfDomUtils.stripScripts(x4);
 if (x3.getEscape())
 return AdfAgent.AGENT.getTextContent(x4);
 else
 return x4.innerHTML;
}
AdfDhtmlTextPeer.prototype.GetInlineEditor= function(x5)
{
 var x6=AdfDhtmlTextPeer._inlineEditor;
 if (x6==null)
{
x6= new AdfRichPlainTextEditor("value");
AdfDhtmlTextPeer._inlineEditor=x6;
}
 return x6;
}

AdfUIComponents.createComponentClass("AdfRichPanelGroupLayout",
{
componentType:"oracle.adf.RichPanelGroupLayout",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
,{name:"theme",type:"String"}
,{name:"layout",type:"String","default":"default"}
,{name:"valign",type:"String","default":"middle"}
,{name:"halign",type:"String","default":"start"}
,{name:"landmark",type:"String","default":"none"}
],
superclass:AdfUIPanel
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlPanelGroupLayoutPeer");
AdfDhtmlPanelGroupLayoutPeer.prototype.needsChildVisibilityChanges= function(x0)
{
 return true;
}
AdfDhtmlPanelGroupLayoutPeer.prototype.ChildVisibilityChanged= function(
x1,
x2,
x3)
{
 var x4=this.getDomElement();
 if (x2.parentNode==x4)
{
AdfPage.PAGE.addPartialTargets(this.getComponent());
 return true;
}
 else
 {
 return false;
}
}

AdfUIComponents.createComponentClass("AdfRichSeparator",
{
componentType:"oracle.adf.RichSeparator",
propertyKeys:[{name:"inlineStyle",type:"String"}
,{name:"styleClass",type:"String"}
,{name:"shortDesc",type:"String"}
,{name:"unsecure",type:"Object",secured:true}
,{name:"visible",type:"Boolean","default":true}
],
superclass:AdfUIObject
});

AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlSeparatorPeer");
