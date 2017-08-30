var requirejs,require,define;
(function(global){var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.11",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!!(typeof window!=="undefined"&&typeof navigator!=="undefined"&&window.document),isWebWorker=!isBrowser&&typeof importScripts!=="undefined",readyRegExp=isBrowser&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera=typeof opera!=="undefined"&&opera.toString()==="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=false;
function isFunction(it){return ostring.call(it)==="[object Function]"
}function isArray(it){return ostring.call(it)==="[object Array]"
}function each(ary,func){if(ary){var i;
for(i=0;
i<ary.length;
i+=1){if(ary[i]&&func(ary[i],i,ary)){break
}}}}function eachReverse(ary,func){if(ary){var i;
for(i=ary.length-1;
i>-1;
i-=1){if(ary[i]&&func(ary[i],i,ary)){break
}}}}function hasProp(obj,prop){return hasOwn.call(obj,prop)
}function getOwn(obj,prop){return hasProp(obj,prop)&&obj[prop]
}function eachProp(obj,func){var prop;
for(prop in obj){if(hasProp(obj,prop)){if(func(obj[prop],prop)){break
}}}}function mixin(target,source,force,deepStringMixin){if(source){eachProp(source,function(value,prop){if(force||!hasProp(target,prop)){if(deepStringMixin&&typeof value==="object"&&value&&!isArray(value)&&!isFunction(value)&&!(value instanceof RegExp)){if(!target[prop]){target[prop]={}
}mixin(target[prop],value,force,deepStringMixin)
}else{target[prop]=value
}}})
}return target
}function bind(obj,fn){return function(){return fn.apply(obj,arguments)
}
}function scripts(){return document.getElementsByTagName("script")
}function defaultOnError(err){throw err
}function getGlobal(value){if(!value){return value
}var g=global;
each(value.split("."),function(part){g=g[part]
});
return g
}function makeError(id,msg,err,requireModules){var e=new Error(msg+"\nhttp://requirejs.org/docs/errors.html#"+id);
e.requireType=id;
e.requireModules=requireModules;
if(err){e.originalError=err
}return e
}if(typeof define!=="undefined"){return
}if(typeof requirejs!=="undefined"){if(isFunction(requirejs)){return
}cfg=requirejs;
requirejs=undefined
}if(typeof require!=="undefined"&&!isFunction(require)){cfg=require;
require=undefined
}function newContext(contextName){var inCheckLoaded,Module,context,handlers,checkLoadedTimeoutId,config={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},registry={},enabledRegistry={},undefEvents={},defQueue=[],defined={},urlFetched={},bundlesMap={},requireCounter=1,unnormalizedCounter=1;
function trimDots(ary){var i,part,length=ary.length;
for(i=0;
i<length;
i++){part=ary[i];
if(part==="."){ary.splice(i,1);
i-=1
}else{if(part===".."){if(i===1&&(ary[2]===".."||ary[0]==="..")){break
}else{if(i>0){ary.splice(i-1,2);
i-=2
}}}}}}function normalize(name,baseName,applyMap){var pkgMain,mapValue,nameParts,i,j,nameSegment,lastIndex,foundMap,foundI,foundStarMap,starI,baseParts=baseName&&baseName.split("/"),normalizedBaseParts=baseParts,map=config.map,starMap=map&&map["*"];
if(name&&name.charAt(0)==="."){if(baseName){normalizedBaseParts=baseParts.slice(0,baseParts.length-1);
name=name.split("/");
lastIndex=name.length-1;
if(config.nodeIdCompat&&jsSuffixRegExp.test(name[lastIndex])){name[lastIndex]=name[lastIndex].replace(jsSuffixRegExp,"")
}name=normalizedBaseParts.concat(name);
trimDots(name);
name=name.join("/")
}else{if(name.indexOf("./")===0){name=name.substring(2)
}}}if(applyMap&&map&&(baseParts||starMap)){nameParts=name.split("/");
outerLoop:for(i=nameParts.length;
i>0;
i-=1){nameSegment=nameParts.slice(0,i).join("/");
if(baseParts){for(j=baseParts.length;
j>0;
j-=1){mapValue=getOwn(map,baseParts.slice(0,j).join("/"));
if(mapValue){mapValue=getOwn(mapValue,nameSegment);
if(mapValue){foundMap=mapValue;
foundI=i;
break outerLoop
}}}}if(!foundStarMap&&starMap&&getOwn(starMap,nameSegment)){foundStarMap=getOwn(starMap,nameSegment);
starI=i
}}if(!foundMap&&foundStarMap){foundMap=foundStarMap;
foundI=starI
}if(foundMap){nameParts.splice(0,foundI,foundMap);
name=nameParts.join("/")
}}pkgMain=getOwn(config.pkgs,name);
return pkgMain?pkgMain:name
}function removeScript(name){if(isBrowser){each(scripts(),function(scriptNode){if(scriptNode.getAttribute("data-requiremodule")===name&&scriptNode.getAttribute("data-requirecontext")===context.contextName){scriptNode.parentNode.removeChild(scriptNode);
return true
}})
}}function hasPathFallback(id){var pathConfig=getOwn(config.paths,id);
if(pathConfig&&isArray(pathConfig)&&pathConfig.length>1){pathConfig.shift();
context.require.undef(id);
context.require([id]);
return true
}}function splitPrefix(name){var prefix,index=name?name.indexOf("!"):-1;
if(index>-1){prefix=name.substring(0,index);
name=name.substring(index+1,name.length)
}return[prefix,name]
}function makeModuleMap(name,parentModuleMap,isNormalized,applyMap){var url,pluginModule,suffix,nameParts,prefix=null,parentName=parentModuleMap?parentModuleMap.name:null,originalName=name,isDefine=true,normalizedName="";
if(!name){isDefine=false;
name="_@r"+(requireCounter+=1)
}nameParts=splitPrefix(name);
prefix=nameParts[0];
name=nameParts[1];
if(prefix){prefix=normalize(prefix,parentName,applyMap);
pluginModule=getOwn(defined,prefix)
}if(name){if(prefix){if(pluginModule&&pluginModule.normalize){normalizedName=pluginModule.normalize(name,function(name){return normalize(name,parentName,applyMap)
})
}else{normalizedName=normalize(name,parentName,applyMap)
}}else{normalizedName=normalize(name,parentName,applyMap);
nameParts=splitPrefix(normalizedName);
prefix=nameParts[0];
normalizedName=nameParts[1];
isNormalized=true;
url=context.nameToUrl(normalizedName)
}}suffix=prefix&&!pluginModule&&!isNormalized?"_unnormalized"+(unnormalizedCounter+=1):"";
return{prefix:prefix,name:normalizedName,parentMap:parentModuleMap,unnormalized:!!suffix,url:url,originalName:originalName,isDefine:isDefine,id:(prefix?prefix+"!"+normalizedName:normalizedName)+suffix}
}function getModule(depMap){var id=depMap.id,mod=getOwn(registry,id);
if(!mod){mod=registry[id]=new context.Module(depMap)
}return mod
}function on(depMap,name,fn){var id=depMap.id,mod=getOwn(registry,id);
if(hasProp(defined,id)&&(!mod||mod.defineEmitComplete)){if(name==="defined"){fn(defined[id])
}}else{mod=getModule(depMap);
if(mod.error&&name==="error"){fn(mod.error)
}else{mod.on(name,fn)
}}}function onError(err,errback){var ids=err.requireModules,notified=false;
if(errback){errback(err)
}else{each(ids,function(id){var mod=getOwn(registry,id);
if(mod){mod.error=err;
if(mod.events.error){notified=true;
mod.emit("error",err)
}}});
if(!notified){req.onError(err)
}}}function takeGlobalQueue(){if(globalDefQueue.length){apsp.apply(defQueue,[defQueue.length,0].concat(globalDefQueue));
globalDefQueue=[]
}}handlers={require:function(mod){if(mod.require){return mod.require
}else{return(mod.require=context.makeRequire(mod.map))
}},exports:function(mod){mod.usingExports=true;
if(mod.map.isDefine){if(mod.exports){return(defined[mod.map.id]=mod.exports)
}else{return(mod.exports=defined[mod.map.id]={})
}}},module:function(mod){if(mod.module){return mod.module
}else{return(mod.module={id:mod.map.id,uri:mod.map.url,config:function(){return getOwn(config.config,mod.map.id)||{}
},exports:mod.exports||(mod.exports={})})
}}};
function cleanRegistry(id){delete registry[id];
delete enabledRegistry[id]
}function breakCycle(mod,traced,processed){var id=mod.map.id;
if(mod.error){mod.emit("error",mod.error)
}else{traced[id]=true;
each(mod.depMaps,function(depMap,i){var depId=depMap.id,dep=getOwn(registry,depId);
if(dep&&!mod.depMatched[i]&&!processed[depId]){if(getOwn(traced,depId)){mod.defineDep(i,defined[depId]);
mod.check()
}else{breakCycle(dep,traced,processed)
}}});
processed[id]=true
}}function checkLoaded(){var err,usingPathFallback,waitInterval=config.waitSeconds*1000,expired=waitInterval&&(context.startTime+waitInterval)<new Date().getTime(),noLoads=[],reqCalls=[],stillLoading=false,needCycleCheck=true;
if(inCheckLoaded){return
}inCheckLoaded=true;
eachProp(enabledRegistry,function(mod){var map=mod.map,modId=map.id;
if(!mod.enabled){return
}if(!map.isDefine){reqCalls.push(mod)
}if(!mod.error){if(!mod.inited&&expired){if(hasPathFallback(modId)){usingPathFallback=true;
stillLoading=true
}else{noLoads.push(modId);
removeScript(modId)
}}else{if(!mod.inited&&mod.fetched&&map.isDefine){stillLoading=true;
if(!map.prefix){return(needCycleCheck=false)
}}}}});
if(expired&&noLoads.length){err=makeError("timeout","Load timeout for modules: "+noLoads,null,noLoads);
err.contextName=context.contextName;
return onError(err)
}if(needCycleCheck){each(reqCalls,function(mod){breakCycle(mod,{},{})
})
}if((!expired||usingPathFallback)&&stillLoading){if((isBrowser||isWebWorker)&&!checkLoadedTimeoutId){checkLoadedTimeoutId=setTimeout(function(){checkLoadedTimeoutId=0;
checkLoaded()
},50)
}}inCheckLoaded=false
}Module=function(map){this.events=getOwn(undefEvents,map.id)||{};
this.map=map;
this.shim=getOwn(config.shim,map.id);
this.depExports=[];
this.depMaps=[];
this.depMatched=[];
this.pluginMaps={};
this.depCount=0
};
Module.prototype={init:function(depMaps,factory,errback,options){options=options||{};
if(this.inited){return
}this.factory=factory;
if(errback){this.on("error",errback)
}else{if(this.events.error){errback=bind(this,function(err){this.emit("error",err)
})
}}this.depMaps=depMaps&&depMaps.slice(0);
this.errback=errback;
this.inited=true;
this.ignore=options.ignore;
if(options.enabled||this.enabled){this.enable()
}else{this.check()
}},defineDep:function(i,depExports){if(!this.depMatched[i]){this.depMatched[i]=true;
this.depCount-=1;
this.depExports[i]=depExports
}},fetch:function(){if(this.fetched){return
}this.fetched=true;
context.startTime=(new Date()).getTime();
var map=this.map;
if(this.shim){context.makeRequire(this.map,{enableBuildCallback:true})(this.shim.deps||[],bind(this,function(){return map.prefix?this.callPlugin():this.load()
}))
}else{return map.prefix?this.callPlugin():this.load()
}},load:function(){var url=this.map.url;
if(!urlFetched[url]){urlFetched[url]=true;
context.load(this.map.id,url)
}},check:function(){if(!this.enabled||this.enabling){return
}var err,cjsModule,id=this.map.id,depExports=this.depExports,exports=this.exports,factory=this.factory;
if(!this.inited){this.fetch()
}else{if(this.error){this.emit("error",this.error)
}else{if(!this.defining){this.defining=true;
if(this.depCount<1&&!this.defined){if(isFunction(factory)){if((this.events.error&&this.map.isDefine)||req.onError!==defaultOnError){try{exports=context.execCb(id,factory,depExports,exports)
}catch(e){err=e
}}else{exports=context.execCb(id,factory,depExports,exports)
}if(this.map.isDefine&&exports===undefined){cjsModule=this.module;
if(cjsModule){exports=cjsModule.exports
}else{if(this.usingExports){exports=this.exports
}}}if(err){err.requireMap=this.map;
err.requireModules=this.map.isDefine?[this.map.id]:null;
err.requireType=this.map.isDefine?"define":"require";
return onError((this.error=err))
}}else{exports=factory
}this.exports=exports;
if(this.map.isDefine&&!this.ignore){defined[id]=exports;
if(req.onResourceLoad){req.onResourceLoad(context,this.map,this.depMaps)
}}cleanRegistry(id);
this.defined=true
}this.defining=false;
if(this.defined&&!this.defineEmitted){this.defineEmitted=true;
this.emit("defined",this.exports);
this.defineEmitComplete=true
}}}}},callPlugin:function(){var map=this.map,id=map.id,pluginMap=makeModuleMap(map.prefix);
this.depMaps.push(pluginMap);
on(pluginMap,"defined",bind(this,function(plugin){var load,normalizedMap,normalizedMod,bundleId=getOwn(bundlesMap,this.map.id),name=this.map.name,parentName=this.map.parentMap?this.map.parentMap.name:null,localRequire=context.makeRequire(map.parentMap,{enableBuildCallback:true});
if(this.map.unnormalized){if(plugin.normalize){name=plugin.normalize(name,function(name){return normalize(name,parentName,true)
})||""
}normalizedMap=makeModuleMap(map.prefix+"!"+name,this.map.parentMap);
on(normalizedMap,"defined",bind(this,function(value){this.init([],function(){return value
},null,{enabled:true,ignore:true})
}));
normalizedMod=getOwn(registry,normalizedMap.id);
if(normalizedMod){this.depMaps.push(normalizedMap);
if(this.events.error){normalizedMod.on("error",bind(this,function(err){this.emit("error",err)
}))
}normalizedMod.enable()
}return
}if(bundleId){this.map.url=context.nameToUrl(bundleId);
this.load();
return
}load=bind(this,function(value){this.init([],function(){return value
},null,{enabled:true})
});
load.error=bind(this,function(err){this.inited=true;
this.error=err;
err.requireModules=[id];
eachProp(registry,function(mod){if(mod.map.id.indexOf(id+"_unnormalized")===0){cleanRegistry(mod.map.id)
}});
onError(err)
});
load.fromText=bind(this,function(text,textAlt){var moduleName=map.name,moduleMap=makeModuleMap(moduleName),hasInteractive=useInteractive;
if(textAlt){text=textAlt
}if(hasInteractive){useInteractive=false
}getModule(moduleMap);
if(hasProp(config.config,id)){config.config[moduleName]=config.config[id]
}try{req.exec(text)
}catch(e){return onError(makeError("fromtexteval","fromText eval for "+id+" failed: "+e,e,[id]))
}if(hasInteractive){useInteractive=true
}this.depMaps.push(moduleMap);
context.completeLoad(moduleName);
localRequire([moduleName],load)
});
plugin.load(map.name,localRequire,load,config)
}));
context.enable(pluginMap,this);
this.pluginMaps[pluginMap.id]=pluginMap
},enable:function(){enabledRegistry[this.map.id]=this;
this.enabled=true;
this.enabling=true;
each(this.depMaps,bind(this,function(depMap,i){var id,mod,handler;
if(typeof depMap==="string"){depMap=makeModuleMap(depMap,(this.map.isDefine?this.map:this.map.parentMap),false,!this.skipMap);
this.depMaps[i]=depMap;
handler=getOwn(handlers,depMap.id);
if(handler){this.depExports[i]=handler(this);
return
}this.depCount+=1;
on(depMap,"defined",bind(this,function(depExports){this.defineDep(i,depExports);
this.check()
}));
if(this.errback){on(depMap,"error",bind(this,this.errback))
}}id=depMap.id;
mod=registry[id];
if(!hasProp(handlers,id)&&mod&&!mod.enabled){context.enable(depMap,this)
}}));
eachProp(this.pluginMaps,bind(this,function(pluginMap){var mod=getOwn(registry,pluginMap.id);
if(mod&&!mod.enabled){context.enable(pluginMap,this)
}}));
this.enabling=false;
this.check()
},on:function(name,cb){var cbs=this.events[name];
if(!cbs){cbs=this.events[name]=[]
}cbs.push(cb)
},emit:function(name,evt){each(this.events[name],function(cb){cb(evt)
});
if(name==="error"){delete this.events[name]
}}};
function callGetModule(args){if(!hasProp(defined,args[0])){getModule(makeModuleMap(args[0],null,true)).init(args[1],args[2])
}}function removeListener(node,func,name,ieName){if(node.detachEvent&&!isOpera){if(ieName){node.detachEvent(ieName,func)
}}else{node.removeEventListener(name,func,false)
}}function getScriptData(evt){var node=evt.currentTarget||evt.srcElement;
removeListener(node,context.onScriptLoad,"load","onreadystatechange");
removeListener(node,context.onScriptError,"error");
return{node:node,id:node&&node.getAttribute("data-requiremodule")}
}function intakeDefines(){var args;
takeGlobalQueue();
while(defQueue.length){args=defQueue.shift();
if(args[0]===null){return onError(makeError("mismatch","Mismatched anonymous define() module: "+args[args.length-1]))
}else{callGetModule(args)
}}}context={config:config,contextName:contextName,registry:registry,defined:defined,urlFetched:urlFetched,defQueue:defQueue,Module:Module,makeModuleMap:makeModuleMap,nextTick:req.nextTick,onError:onError,configure:function(cfg){if(cfg.baseUrl){if(cfg.baseUrl.charAt(cfg.baseUrl.length-1)!=="/"){cfg.baseUrl+="/"
}}var shim=config.shim,objs={paths:true,bundles:true,config:true,map:true};
eachProp(cfg,function(value,prop){if(objs[prop]){if(!config[prop]){config[prop]={}
}mixin(config[prop],value,true,true)
}else{config[prop]=value
}});
if(cfg.bundles){eachProp(cfg.bundles,function(value,prop){each(value,function(v){if(v!==prop){bundlesMap[v]=prop
}})
})
}if(cfg.shim){eachProp(cfg.shim,function(value,id){if(isArray(value)){value={deps:value}
}if((value.exports||value.init)&&!value.exportsFn){value.exportsFn=context.makeShimExports(value)
}shim[id]=value
});
config.shim=shim
}if(cfg.packages){each(cfg.packages,function(pkgObj){var location,name;
pkgObj=typeof pkgObj==="string"?{name:pkgObj}:pkgObj;
name=pkgObj.name;
location=pkgObj.location;
if(location){config.paths[name]=pkgObj.location
}config.pkgs[name]=pkgObj.name+"/"+(pkgObj.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")
})
}eachProp(registry,function(mod,id){if(!mod.inited&&!mod.map.unnormalized){mod.map=makeModuleMap(id)
}});
if(cfg.deps||cfg.callback){context.require(cfg.deps||[],cfg.callback)
}},makeShimExports:function(value){function fn(){var ret;
if(value.init){ret=value.init.apply(global,arguments)
}return ret||(value.exports&&getGlobal(value.exports))
}return fn
},makeRequire:function(relMap,options){options=options||{};
function localRequire(deps,callback,errback){var id,map,requireMod;
if(options.enableBuildCallback&&callback&&isFunction(callback)){callback.__requireJsBuild=true
}if(typeof deps==="string"){if(isFunction(callback)){return onError(makeError("requireargs","Invalid require call"),errback)
}if(relMap&&hasProp(handlers,deps)){return handlers[deps](registry[relMap.id])
}if(req.get){return req.get(context,deps,relMap,localRequire)
}map=makeModuleMap(deps,relMap,false,true);
id=map.id;
if(!hasProp(defined,id)){return onError(makeError("notloaded",'Module name "'+id+'" has not been loaded yet for context: '+contextName+(relMap?"":". Use require([])")))
}return defined[id]
}intakeDefines();
context.nextTick(function(){intakeDefines();
requireMod=getModule(makeModuleMap(null,relMap));
requireMod.skipMap=options.skipMap;
requireMod.init(deps,callback,errback,{enabled:true});
checkLoaded()
});
return localRequire
}mixin(localRequire,{isBrowser:isBrowser,toUrl:function(moduleNamePlusExt){var ext,index=moduleNamePlusExt.lastIndexOf("."),segment=moduleNamePlusExt.split("/")[0],isRelative=segment==="."||segment==="..";
if(index!==-1&&(!isRelative||index>1)){ext=moduleNamePlusExt.substring(index,moduleNamePlusExt.length);
moduleNamePlusExt=moduleNamePlusExt.substring(0,index)
}return context.nameToUrl(normalize(moduleNamePlusExt,relMap&&relMap.id,true),ext,true)
},defined:function(id){return hasProp(defined,makeModuleMap(id,relMap,false,true).id)
},specified:function(id){id=makeModuleMap(id,relMap,false,true).id;
return hasProp(defined,id)||hasProp(registry,id)
}});
if(!relMap){localRequire.undef=function(id){takeGlobalQueue();
var map=makeModuleMap(id,relMap,true),mod=getOwn(registry,id);
removeScript(id);
delete defined[id];
delete urlFetched[map.url];
delete undefEvents[id];
eachReverse(defQueue,function(args,i){if(args[0]===id){defQueue.splice(i,1)
}});
if(mod){if(mod.events.defined){undefEvents[id]=mod.events
}cleanRegistry(id)
}}
}return localRequire
},enable:function(depMap){var mod=getOwn(registry,depMap.id);
if(mod){getModule(depMap).enable()
}},completeLoad:function(moduleName){var found,args,mod,shim=getOwn(config.shim,moduleName)||{},shExports=shim.exports;
takeGlobalQueue();
while(defQueue.length){args=defQueue.shift();
if(args[0]===null){args[0]=moduleName;
if(found){break
}found=true
}else{if(args[0]===moduleName){found=true
}}callGetModule(args)
}mod=getOwn(registry,moduleName);
if(!found&&!hasProp(defined,moduleName)&&mod&&!mod.inited){if(config.enforceDefine&&(!shExports||!getGlobal(shExports))){if(hasPathFallback(moduleName)){return
}else{return onError(makeError("nodefine","No define call for "+moduleName,null,[moduleName]))
}}else{callGetModule([moduleName,(shim.deps||[]),shim.exportsFn])
}}checkLoaded()
},nameToUrl:function(moduleName,ext,skipExt){var paths,syms,i,parentModule,url,parentPath,bundleId,pkgMain=getOwn(config.pkgs,moduleName);
if(pkgMain){moduleName=pkgMain
}bundleId=getOwn(bundlesMap,moduleName);
if(bundleId){return context.nameToUrl(bundleId,ext,skipExt)
}if(req.jsExtRegExp.test(moduleName)){url=moduleName+(ext||"")
}else{paths=config.paths;
syms=moduleName.split("/");
for(i=syms.length;
i>0;
i-=1){parentModule=syms.slice(0,i).join("/");
parentPath=getOwn(paths,parentModule);
if(parentPath){if(isArray(parentPath)){parentPath=parentPath[0]
}syms.splice(0,i,parentPath);
break
}}url=syms.join("/");
url+=(ext||(/^data\:|\?/.test(url)||skipExt?"":".js"));
url=(url.charAt(0)==="/"||url.match(/^[\w\+\.\-]+:/)?"":config.baseUrl)+url
}return config.urlArgs?url+((url.indexOf("?")===-1?"?":"&")+config.urlArgs):url
},load:function(id,url){req.load(context,id,url)
},execCb:function(name,callback,args,exports){return callback.apply(exports,args)
},onScriptLoad:function(evt){if(evt.type==="load"||(readyRegExp.test((evt.currentTarget||evt.srcElement).readyState))){interactiveScript=null;
var data=getScriptData(evt);
context.completeLoad(data.id)
}},onScriptError:function(evt){var data=getScriptData(evt);
if(!hasPathFallback(data.id)){return onError(makeError("scripterror","Script error for: "+data.id,evt,[data.id]))
}}};
context.require=context.makeRequire();
return context
}req=requirejs=function(deps,callback,errback,optional){var context,config,contextName=defContextName;
if(!isArray(deps)&&typeof deps!=="string"){config=deps;
if(isArray(callback)){deps=callback;
callback=errback;
errback=optional
}else{deps=[]
}}if(config&&config.context){contextName=config.context
}context=getOwn(contexts,contextName);
if(!context){context=contexts[contextName]=req.s.newContext(contextName)
}if(config){context.configure(config)
}return context.require(deps,callback,errback)
};
req.config=function(config){return req(config)
};
req.nextTick=typeof setTimeout!=="undefined"?function(fn){setTimeout(fn,4)
}:function(fn){fn()
};
if(!require){require=req
}req.version=version;
req.jsExtRegExp=/^\/|:|\?|\.js$/;
req.isBrowser=isBrowser;
s=req.s={contexts:contexts,newContext:newContext};
req({});
each(["toUrl","undef","defined","specified"],function(prop){req[prop]=function(){var ctx=contexts[defContextName];
return ctx.require[prop].apply(ctx,arguments)
}
});
if(isBrowser){head=s.head=document.getElementsByTagName("head")[0];
baseElement=document.getElementsByTagName("base")[0];
if(baseElement){head=s.head=baseElement.parentNode
}}req.onError=defaultOnError;
req.createNode=function(config,moduleName,url){var node=config.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");
node.type=config.scriptType||"text/javascript";
node.charset="utf-8";
node.async=true;
return node
};
req.load=function(context,moduleName,url){var config=(context&&context.config)||{},node;
if(isBrowser){node=req.createNode(config,moduleName,url);
node.setAttribute("data-requirecontext",context.contextName);
node.setAttribute("data-requiremodule",moduleName);
if(node.attachEvent&&!(node.attachEvent.toString&&node.attachEvent.toString().indexOf("[native code")<0)&&!isOpera){useInteractive=true;
node.attachEvent("onreadystatechange",context.onScriptLoad)
}else{node.addEventListener("load",context.onScriptLoad,false);
node.addEventListener("error",context.onScriptError,false)
}node.src=url;
currentlyAddingScript=node;
if(baseElement){head.insertBefore(node,baseElement)
}else{head.appendChild(node)
}currentlyAddingScript=null;
return node
}else{if(isWebWorker){try{importScripts(url);
context.completeLoad(moduleName)
}catch(e){context.onError(makeError("importscripts","importScripts failed for "+moduleName+" at "+url,e,[moduleName]))
}}}};
function getInteractiveScript(){if(interactiveScript&&interactiveScript.readyState==="interactive"){return interactiveScript
}eachReverse(scripts(),function(script){if(script.readyState==="interactive"){return(interactiveScript=script)
}});
return interactiveScript
}if(isBrowser&&!cfg.skipDataMain){eachReverse(scripts(),function(script){if(!head){head=script.parentNode
}dataMain=script.getAttribute("data-main");
if(dataMain){mainScript=dataMain;
if(!cfg.baseUrl){src=mainScript.split("/");
mainScript=src.pop();
subPath=src.length?src.join("/")+"/":"./";
cfg.baseUrl=subPath
}mainScript=mainScript.replace(jsSuffixRegExp,"");
if(req.jsExtRegExp.test(mainScript)){mainScript=dataMain
}cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript];
return true
}})
}define=function(name,deps,callback){var node,context;
if(typeof name!=="string"){callback=deps;
deps=name;
name=null
}if(!isArray(deps)){callback=deps;
deps=null
}if(!deps&&isFunction(callback)){deps=[];
if(callback.length){callback.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(match,dep){deps.push(dep)
});
deps=(callback.length===1?["require"]:["require","exports","module"]).concat(deps)
}}if(useInteractive){node=currentlyAddingScript||getInteractiveScript();
if(node){if(!name){name=node.getAttribute("data-requiremodule")
}context=contexts[node.getAttribute("data-requirecontext")]
}}(context?context.defQueue:globalDefQueue).push([name,deps,callback])
};
define.amd={jQuery:true};
req.exec=function(text){return eval(text)
};
req(cfg)
}(this));
var packedDefine,finishPackedDefine;
(function(d){var b=define;
var e=Object.prototype.toString;
function a(f){return e.call(f)==="[object Array]"
}var c=[];
finishPackedDefine=function(){var f;
define=b;
while(f=c.shift()){if(f.freeJS){define(f.name,[],{})
}else{define(f,[],{})
}}};
packedDefine=function(g){if(c.length>0){finishDefine()
}if(!a(g)){g=[g]
}c=c.concat(g);
var f=define=function(h,n,o){define=b;
if(typeof h=="string"){}else{o=n;
n=h;
h=c.shift();
while(h&&typeof h!=="string"&&h.freeJS){define(h.name,[],{});
h=c.shift()
}}var m="";
if(h.indexOf("/")>0){m=h.substr(0,h.lastIndexOf("/"))
}var k=[];
for(var j=0;
j<n.length;
j++){var l=n[j];
if(l.indexOf("./")==0){l=m+l.substr(1)
}k.push(l)
}define(h,k,o);
if(c.length>0){define=f
}};
define.amd=b.amd
}
}(this));
packedDefine(["knockout"]);
/*!
 * Knockout JavaScript library v3.2.0
 * (c) Steven Sanderson - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
(function(){var DEBUG=true;
(function(undefined){var window=this||(0,eval)("this"),document=window.document,navigator=window.navigator,jQueryInstance=window.jQuery,JSON=window.JSON;
(function(factory){if(typeof require==="function"&&typeof exports==="object"&&typeof module==="object"){var target=module.exports||exports;
factory(target,require)
}else{if(typeof define==="function"&&define.amd){define(["exports","jquery","require"],function(exports,$,require){jQuery=$;
return factory(exports)
})
}else{factory(window.ko={})
}}}(function(koExports,require){var ko=typeof koExports!=="undefined"?koExports:{};
ko.exportSymbol=function(koPath,object){var tokens=koPath.split(".");
var target=ko;
for(var i=0;
i<tokens.length-1;
i++){target=target[tokens[i]]
}target[tokens[tokens.length-1]]=object
};
ko.exportProperty=function(owner,publicName,object){owner[publicName]=object
};
ko.version="3.2.0";
ko.exportSymbol("version",ko.version);
ko.utils=(function(){function objectForEach(obj,action){for(var prop in obj){if(obj.hasOwnProperty(prop)){action(prop,obj[prop])
}}}function extend(target,source){if(source){for(var prop in source){if(source.hasOwnProperty(prop)){target[prop]=source[prop]
}}}return target
}function setPrototypeOf(obj,proto){obj.__proto__=proto;
return obj
}var canSetPrototype=({__proto__:[]} instanceof Array);
var knownEvents={},knownEventTypesByEventName={};
var keyEventTypeName=(navigator&&/Firefox\/2/i.test(navigator.userAgent))?"KeyboardEvent":"UIEvents";
knownEvents[keyEventTypeName]=["keyup","keydown","keypress"];
knownEvents.MouseEvents=["click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","mouseenter","mouseleave"];
objectForEach(knownEvents,function(eventType,knownEventsForType){if(knownEventsForType.length){for(var i=0,j=knownEventsForType.length;
i<j;
i++){knownEventTypesByEventName[knownEventsForType[i]]=eventType
}}});
var eventsThatMustBeRegisteredUsingAttachEvent={propertychange:true};
var ieVersion=document&&(function(){var version=3,div=document.createElement("div"),iElems=div.getElementsByTagName("i");
while(div.innerHTML="<!--[if gt IE "+(++version)+"]><i></i><![endif]-->",iElems[0]){}return version>4?version:undefined
}());
var isIe6=ieVersion===6,isIe7=ieVersion===7;
function isClickOnCheckableElement(element,eventType){if((ko.utils.tagNameLower(element)!=="input")||!element.type){return false
}if(eventType.toLowerCase()!="click"){return false
}var inputType=element.type;
return(inputType=="checkbox")||(inputType=="radio")
}return{fieldsIncludedWithJsonPost:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],arrayForEach:function(array,action){for(var i=0,j=array.length;
i<j;
i++){action(array[i],i)
}},arrayIndexOf:function(array,item){if(typeof Array.prototype.indexOf=="function"){return Array.prototype.indexOf.call(array,item)
}for(var i=0,j=array.length;
i<j;
i++){if(array[i]===item){return i
}}return -1
},arrayFirst:function(array,predicate,predicateOwner){for(var i=0,j=array.length;
i<j;
i++){if(predicate.call(predicateOwner,array[i],i)){return array[i]
}}return null
},arrayRemoveItem:function(array,itemToRemove){var index=ko.utils.arrayIndexOf(array,itemToRemove);
if(index>0){array.splice(index,1)
}else{if(index===0){array.shift()
}}},arrayGetDistinctValues:function(array){array=array||[];
var result=[];
for(var i=0,j=array.length;
i<j;
i++){if(ko.utils.arrayIndexOf(result,array[i])<0){result.push(array[i])
}}return result
},arrayMap:function(array,mapping){array=array||[];
var result=[];
for(var i=0,j=array.length;
i<j;
i++){result.push(mapping(array[i],i))
}return result
},arrayFilter:function(array,predicate){array=array||[];
var result=[];
for(var i=0,j=array.length;
i<j;
i++){if(predicate(array[i],i)){result.push(array[i])
}}return result
},arrayPushAll:function(array,valuesToPush){if(valuesToPush instanceof Array){array.push.apply(array,valuesToPush)
}else{for(var i=0,j=valuesToPush.length;
i<j;
i++){array.push(valuesToPush[i])
}}return array
},addOrRemoveItem:function(array,value,included){var existingEntryIndex=ko.utils.arrayIndexOf(ko.utils.peekObservable(array),value);
if(existingEntryIndex<0){if(included){array.push(value)
}}else{if(!included){array.splice(existingEntryIndex,1)
}}},canSetPrototype:canSetPrototype,extend:extend,setPrototypeOf:setPrototypeOf,setPrototypeOfOrExtend:canSetPrototype?setPrototypeOf:extend,objectForEach:objectForEach,objectMap:function(source,mapping){if(!source){return source
}var target={};
for(var prop in source){if(source.hasOwnProperty(prop)){target[prop]=mapping(source[prop],prop,source)
}}return target
},emptyDomNode:function(domNode){while(domNode.firstChild){ko.removeNode(domNode.firstChild)
}},moveCleanedNodesToContainerElement:function(nodes){var nodesArray=ko.utils.makeArray(nodes);
var container=document.createElement("div");
for(var i=0,j=nodesArray.length;
i<j;
i++){container.appendChild(ko.cleanNode(nodesArray[i]))
}return container
},cloneNodes:function(nodesArray,shouldCleanNodes){for(var i=0,j=nodesArray.length,newNodesArray=[];
i<j;
i++){var clonedNode=nodesArray[i].cloneNode(true);
newNodesArray.push(shouldCleanNodes?ko.cleanNode(clonedNode):clonedNode)
}return newNodesArray
},setDomNodeChildren:function(domNode,childNodes){ko.utils.emptyDomNode(domNode);
if(childNodes){for(var i=0,j=childNodes.length;
i<j;
i++){domNode.appendChild(childNodes[i])
}}},replaceDomNodes:function(nodeToReplaceOrNodeArray,newNodesArray){var nodesToReplaceArray=nodeToReplaceOrNodeArray.nodeType?[nodeToReplaceOrNodeArray]:nodeToReplaceOrNodeArray;
if(nodesToReplaceArray.length>0){var insertionPoint=nodesToReplaceArray[0];
var parent=insertionPoint.parentNode;
for(var i=0,j=newNodesArray.length;
i<j;
i++){parent.insertBefore(newNodesArray[i],insertionPoint)
}for(var i=0,j=nodesToReplaceArray.length;
i<j;
i++){ko.removeNode(nodesToReplaceArray[i])
}}},fixUpContinuousNodeArray:function(continuousNodeArray,parentNode){if(continuousNodeArray.length){parentNode=(parentNode.nodeType===8&&parentNode.parentNode)||parentNode;
while(continuousNodeArray.length&&continuousNodeArray[0].parentNode!==parentNode){continuousNodeArray.shift()
}if(continuousNodeArray.length>1){var current=continuousNodeArray[0],last=continuousNodeArray[continuousNodeArray.length-1];
continuousNodeArray.length=0;
while(current!==last){continuousNodeArray.push(current);
current=current.nextSibling;
if(!current){return
}}continuousNodeArray.push(last)
}}return continuousNodeArray
},setOptionNodeSelectionState:function(optionNode,isSelected){if(ieVersion<7){optionNode.setAttribute("selected",isSelected)
}else{optionNode.selected=isSelected
}},stringTrim:function(string){return string===null||string===undefined?"":string.trim?string.trim():string.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")
},stringStartsWith:function(string,startsWith){string=string||"";
if(startsWith.length>string.length){return false
}return string.substring(0,startsWith.length)===startsWith
},domNodeIsContainedBy:function(node,containedByNode){if(node===containedByNode){return true
}if(node.nodeType===11){return false
}if(containedByNode.contains){return containedByNode.contains(node.nodeType===3?node.parentNode:node)
}if(containedByNode.compareDocumentPosition){return(containedByNode.compareDocumentPosition(node)&16)==16
}while(node&&node!=containedByNode){node=node.parentNode
}return !!node
},domNodeIsAttachedToDocument:function(node){return ko.utils.domNodeIsContainedBy(node,node.ownerDocument.documentElement)
},anyDomNodeIsAttachedToDocument:function(nodes){return !!ko.utils.arrayFirst(nodes,ko.utils.domNodeIsAttachedToDocument)
},tagNameLower:function(element){return element&&element.tagName&&element.tagName.toLowerCase()
},registerEventHandler:function(element,eventType,handler){var mustUseAttachEvent=ieVersion&&eventsThatMustBeRegisteredUsingAttachEvent[eventType];
if(!mustUseAttachEvent&&jQueryInstance){jQueryInstance(element)["bind"](eventType,handler)
}else{if(!mustUseAttachEvent&&typeof element.addEventListener=="function"){element.addEventListener(eventType,handler,false)
}else{if(typeof element.attachEvent!="undefined"){var attachEventHandler=function(event){handler.call(element,event)
},attachEventName="on"+eventType;
element.attachEvent(attachEventName,attachEventHandler);
ko.utils.domNodeDisposal.addDisposeCallback(element,function(){element.detachEvent(attachEventName,attachEventHandler)
})
}else{throw new Error("Browser doesn't support addEventListener or attachEvent")
}}}},triggerEvent:function(element,eventType){if(!(element&&element.nodeType)){throw new Error("element must be a DOM node when calling triggerEvent")
}var useClickWorkaround=isClickOnCheckableElement(element,eventType);
if(jQueryInstance&&!useClickWorkaround){jQueryInstance(element)["trigger"](eventType)
}else{if(typeof document.createEvent=="function"){if(typeof element.dispatchEvent=="function"){var eventCategory=knownEventTypesByEventName[eventType]||"HTMLEvents";
var event=document.createEvent(eventCategory);
event.initEvent(eventType,true,true,window,0,0,0,0,0,false,false,false,false,0,element);
element.dispatchEvent(event)
}else{throw new Error("The supplied element doesn't support dispatchEvent")
}}else{if(useClickWorkaround&&element.click){element.click()
}else{if(typeof element.fireEvent!="undefined"){element.fireEvent("on"+eventType)
}else{throw new Error("Browser doesn't support triggering events")
}}}}},unwrapObservable:function(value){return ko.isObservable(value)?value():value
},peekObservable:function(value){return ko.isObservable(value)?value.peek():value
},toggleDomNodeCssClass:function(node,classNames,shouldHaveClass){if(classNames){var cssClassNameRegex=/\S+/g,currentClassNames=node.className.match(cssClassNameRegex)||[];
ko.utils.arrayForEach(classNames.match(cssClassNameRegex),function(className){ko.utils.addOrRemoveItem(currentClassNames,className,shouldHaveClass)
});
node.className=currentClassNames.join(" ")
}},setTextContent:function(element,textContent){var value=ko.utils.unwrapObservable(textContent);
if((value===null)||(value===undefined)){value=""
}var innerTextNode=ko.virtualElements.firstChild(element);
if(!innerTextNode||innerTextNode.nodeType!=3||ko.virtualElements.nextSibling(innerTextNode)){ko.virtualElements.setDomNodeChildren(element,[element.ownerDocument.createTextNode(value)])
}else{innerTextNode.data=value
}ko.utils.forceRefresh(element)
},setElementName:function(element,name){element.name=name;
if(ieVersion<=7){try{element.mergeAttributes(document.createElement("<input name='"+element.name+"'/>"),false)
}catch(e){}}},forceRefresh:function(node){if(ieVersion>=9){var elem=node.nodeType==1?node:node.parentNode;
if(elem.style){elem.style.zoom=elem.style.zoom
}}},ensureSelectElementIsRenderedCorrectly:function(selectElement){if(ieVersion){var originalWidth=selectElement.style.width;
selectElement.style.width=0;
selectElement.style.width=originalWidth
}},range:function(min,max){min=ko.utils.unwrapObservable(min);
max=ko.utils.unwrapObservable(max);
var result=[];
for(var i=min;
i<=max;
i++){result.push(i)
}return result
},makeArray:function(arrayLikeObject){var result=[];
for(var i=0,j=arrayLikeObject.length;
i<j;
i++){result.push(arrayLikeObject[i])
}return result
},isIe6:isIe6,isIe7:isIe7,ieVersion:ieVersion,getFormFields:function(form,fieldName){var fields=ko.utils.makeArray(form.getElementsByTagName("input")).concat(ko.utils.makeArray(form.getElementsByTagName("textarea")));
var isMatchingField=(typeof fieldName=="string")?function(field){return field.name===fieldName
}:function(field){return fieldName.test(field.name)
};
var matches=[];
for(var i=fields.length-1;
i>=0;
i--){if(isMatchingField(fields[i])){matches.push(fields[i])
}}return matches
},parseJson:function(jsonString){if(typeof jsonString=="string"){jsonString=ko.utils.stringTrim(jsonString);
if(jsonString){if(JSON&&JSON.parse){return JSON.parse(jsonString)
}return(new Function("return "+jsonString))()
}}return null
},stringifyJson:function(data,replacer,space){if(!JSON||!JSON.stringify){throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")
}return JSON.stringify(ko.utils.unwrapObservable(data),replacer,space)
},postJson:function(urlOrForm,data,options){options=options||{};
var params=options.params||{};
var includeFields=options.includeFields||this.fieldsIncludedWithJsonPost;
var url=urlOrForm;
if((typeof urlOrForm=="object")&&(ko.utils.tagNameLower(urlOrForm)==="form")){var originalForm=urlOrForm;
url=originalForm.action;
for(var i=includeFields.length-1;
i>=0;
i--){var fields=ko.utils.getFormFields(originalForm,includeFields[i]);
for(var j=fields.length-1;
j>=0;
j--){params[fields[j].name]=fields[j].value
}}}data=ko.utils.unwrapObservable(data);
var form=document.createElement("form");
form.style.display="none";
form.action=url;
form.method="post";
for(var key in data){var input=document.createElement("input");
input.type="hidden";
input.name=key;
input.value=ko.utils.stringifyJson(ko.utils.unwrapObservable(data[key]));
form.appendChild(input)
}objectForEach(params,function(key,value){var input=document.createElement("input");
input.type="hidden";
input.name=key;
input.value=value;
form.appendChild(input)
});
document.body.appendChild(form);
options.submitter?options.submitter(form):form.submit();
setTimeout(function(){form.parentNode.removeChild(form)
},0)
}}
}());
ko.exportSymbol("utils",ko.utils);
ko.exportSymbol("utils.arrayForEach",ko.utils.arrayForEach);
ko.exportSymbol("utils.arrayFirst",ko.utils.arrayFirst);
ko.exportSymbol("utils.arrayFilter",ko.utils.arrayFilter);
ko.exportSymbol("utils.arrayGetDistinctValues",ko.utils.arrayGetDistinctValues);
ko.exportSymbol("utils.arrayIndexOf",ko.utils.arrayIndexOf);
ko.exportSymbol("utils.arrayMap",ko.utils.arrayMap);
ko.exportSymbol("utils.arrayPushAll",ko.utils.arrayPushAll);
ko.exportSymbol("utils.arrayRemoveItem",ko.utils.arrayRemoveItem);
ko.exportSymbol("utils.extend",ko.utils.extend);
ko.exportSymbol("utils.fieldsIncludedWithJsonPost",ko.utils.fieldsIncludedWithJsonPost);
ko.exportSymbol("utils.getFormFields",ko.utils.getFormFields);
ko.exportSymbol("utils.peekObservable",ko.utils.peekObservable);
ko.exportSymbol("utils.postJson",ko.utils.postJson);
ko.exportSymbol("utils.parseJson",ko.utils.parseJson);
ko.exportSymbol("utils.registerEventHandler",ko.utils.registerEventHandler);
ko.exportSymbol("utils.stringifyJson",ko.utils.stringifyJson);
ko.exportSymbol("utils.range",ko.utils.range);
ko.exportSymbol("utils.toggleDomNodeCssClass",ko.utils.toggleDomNodeCssClass);
ko.exportSymbol("utils.triggerEvent",ko.utils.triggerEvent);
ko.exportSymbol("utils.unwrapObservable",ko.utils.unwrapObservable);
ko.exportSymbol("utils.objectForEach",ko.utils.objectForEach);
ko.exportSymbol("utils.addOrRemoveItem",ko.utils.addOrRemoveItem);
ko.exportSymbol("unwrap",ko.utils.unwrapObservable);
if(!Function.prototype.bind){Function.prototype.bind=function(object){var originalFunction=this,args=Array.prototype.slice.call(arguments),object=args.shift();
return function(){return originalFunction.apply(object,args.concat(Array.prototype.slice.call(arguments)))
}
}
}ko.utils.domData=new (function(){var uniqueId=0;
var dataStoreKeyExpandoPropertyName="__ko__"+(new Date).getTime();
var dataStore={};
function getAll(node,createIfNotFound){var dataStoreKey=node[dataStoreKeyExpandoPropertyName];
var hasExistingDataStore=dataStoreKey&&(dataStoreKey!=="null")&&dataStore[dataStoreKey];
if(!hasExistingDataStore){if(!createIfNotFound){return undefined
}dataStoreKey=node[dataStoreKeyExpandoPropertyName]="ko"+uniqueId++;
dataStore[dataStoreKey]={}
}return dataStore[dataStoreKey]
}return{get:function(node,key){var allDataForNode=getAll(node,false);
return allDataForNode===undefined?undefined:allDataForNode[key]
},set:function(node,key,value){if(value===undefined){if(getAll(node,false)===undefined){return
}}var allDataForNode=getAll(node,true);
allDataForNode[key]=value
},clear:function(node){var dataStoreKey=node[dataStoreKeyExpandoPropertyName];
if(dataStoreKey){delete dataStore[dataStoreKey];
node[dataStoreKeyExpandoPropertyName]=null;
return true
}return false
},nextKey:function(){return(uniqueId++)+dataStoreKeyExpandoPropertyName
}}
})();
ko.exportSymbol("utils.domData",ko.utils.domData);
ko.exportSymbol("utils.domData.clear",ko.utils.domData.clear);
ko.utils.domNodeDisposal=new (function(){var domDataKey=ko.utils.domData.nextKey();
var cleanableNodeTypes={1:true,8:true,9:true};
var cleanableNodeTypesWithDescendants={1:true,9:true};
function getDisposeCallbacksCollection(node,createIfNotFound){var allDisposeCallbacks=ko.utils.domData.get(node,domDataKey);
if((allDisposeCallbacks===undefined)&&createIfNotFound){allDisposeCallbacks=[];
ko.utils.domData.set(node,domDataKey,allDisposeCallbacks)
}return allDisposeCallbacks
}function destroyCallbacksCollection(node){ko.utils.domData.set(node,domDataKey,undefined)
}function cleanSingleNode(node){var callbacks=getDisposeCallbacksCollection(node,false);
if(callbacks){callbacks=callbacks.slice(0);
for(var i=0;
i<callbacks.length;
i++){callbacks[i](node)
}}ko.utils.domData.clear(node);
ko.utils.domNodeDisposal.cleanExternalData(node);
if(cleanableNodeTypesWithDescendants[node.nodeType]){cleanImmediateCommentTypeChildren(node)
}}function cleanImmediateCommentTypeChildren(nodeWithChildren){var child,nextChild=nodeWithChildren.firstChild;
while(child=nextChild){nextChild=child.nextSibling;
if(child.nodeType===8){cleanSingleNode(child)
}}}return{addDisposeCallback:function(node,callback){if(typeof callback!="function"){throw new Error("Callback must be a function")
}getDisposeCallbacksCollection(node,true).push(callback)
},removeDisposeCallback:function(node,callback){var callbacksCollection=getDisposeCallbacksCollection(node,false);
if(callbacksCollection){ko.utils.arrayRemoveItem(callbacksCollection,callback);
if(callbacksCollection.length==0){destroyCallbacksCollection(node)
}}},cleanNode:function(node){if(cleanableNodeTypes[node.nodeType]){cleanSingleNode(node);
if(cleanableNodeTypesWithDescendants[node.nodeType]){var descendants=[];
ko.utils.arrayPushAll(descendants,node.getElementsByTagName("*"));
for(var i=0,j=descendants.length;
i<j;
i++){cleanSingleNode(descendants[i])
}}}return node
},removeNode:function(node){ko.cleanNode(node);
if(node.parentNode){node.parentNode.removeChild(node)
}},cleanExternalData:function(node){if(jQueryInstance&&(typeof jQueryInstance.cleanData=="function")){jQueryInstance.cleanData([node])
}}}
})();
ko.cleanNode=ko.utils.domNodeDisposal.cleanNode;
ko.removeNode=ko.utils.domNodeDisposal.removeNode;
ko.exportSymbol("cleanNode",ko.cleanNode);
ko.exportSymbol("removeNode",ko.removeNode);
ko.exportSymbol("utils.domNodeDisposal",ko.utils.domNodeDisposal);
ko.exportSymbol("utils.domNodeDisposal.addDisposeCallback",ko.utils.domNodeDisposal.addDisposeCallback);
ko.exportSymbol("utils.domNodeDisposal.removeDisposeCallback",ko.utils.domNodeDisposal.removeDisposeCallback);
(function(){var leadingCommentRegex=/^(\s*)<!--(.*?)-->/;
function simpleHtmlParse(html){var tags=ko.utils.stringTrim(html).toLowerCase(),div=document.createElement("div");
var wrap=tags.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];
var markup="ignored<div>"+wrap[1]+html+wrap[2]+"</div>";
if(typeof window.innerShiv=="function"){div.appendChild(window.innerShiv(markup))
}else{div.innerHTML=markup
}while(wrap[0]--){div=div.lastChild
}return ko.utils.makeArray(div.lastChild.childNodes)
}function jQueryHtmlParse(html){if(jQueryInstance.parseHTML){return jQueryInstance.parseHTML(html)||[]
}else{var elems=jQueryInstance.clean([html]);
if(elems&&elems[0]){var elem=elems[0];
while(elem.parentNode&&elem.parentNode.nodeType!==11){elem=elem.parentNode
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}return elems
}}ko.utils.parseHtmlFragment=function(html){return jQueryInstance?jQueryHtmlParse(html):simpleHtmlParse(html)
};
ko.utils.setHtml=function(node,html){ko.utils.emptyDomNode(node);
html=ko.utils.unwrapObservable(html);
if((html!==null)&&(html!==undefined)){if(typeof html!="string"){html=html.toString()
}if(jQueryInstance){jQueryInstance(node)["html"](html)
}else{var parsedNodes=ko.utils.parseHtmlFragment(html);
for(var i=0;
i<parsedNodes.length;
i++){node.appendChild(parsedNodes[i])
}}}}
})();
ko.exportSymbol("utils.parseHtmlFragment",ko.utils.parseHtmlFragment);
ko.exportSymbol("utils.setHtml",ko.utils.setHtml);
ko.memoization=(function(){var memos={};
function randomMax8HexChars(){return(((1+Math.random())*4294967296)|0).toString(16).substring(1)
}function generateRandomId(){return randomMax8HexChars()+randomMax8HexChars()
}function findMemoNodes(rootNode,appendToArray){if(!rootNode){return
}if(rootNode.nodeType==8){var memoId=ko.memoization.parseMemoText(rootNode.nodeValue);
if(memoId!=null){appendToArray.push({domNode:rootNode,memoId:memoId})
}}else{if(rootNode.nodeType==1){for(var i=0,childNodes=rootNode.childNodes,j=childNodes.length;
i<j;
i++){findMemoNodes(childNodes[i],appendToArray)
}}}}return{memoize:function(callback){if(typeof callback!="function"){throw new Error("You can only pass a function to ko.memoization.memoize()")
}var memoId=generateRandomId();
memos[memoId]=callback;
return"<!--[ko_memo:"+memoId+"]-->"
},unmemoize:function(memoId,callbackParams){var callback=memos[memoId];
if(callback===undefined){throw new Error("Couldn't find any memo with ID "+memoId+". Perhaps it's already been unmemoized.")
}try{callback.apply(null,callbackParams||[]);
return true
}finally{delete memos[memoId]
}},unmemoizeDomNodeAndDescendants:function(domNode,extraCallbackParamsArray){var memos=[];
findMemoNodes(domNode,memos);
for(var i=0,j=memos.length;
i<j;
i++){var node=memos[i].domNode;
var combinedParams=[node];
if(extraCallbackParamsArray){ko.utils.arrayPushAll(combinedParams,extraCallbackParamsArray)
}ko.memoization.unmemoize(memos[i].memoId,combinedParams);
node.nodeValue="";
if(node.parentNode){node.parentNode.removeChild(node)
}}},parseMemoText:function(memoText){var match=memoText.match(/^\[ko_memo\:(.*?)\]$/);
return match?match[1]:null
}}
})();
ko.exportSymbol("memoization",ko.memoization);
ko.exportSymbol("memoization.memoize",ko.memoization.memoize);
ko.exportSymbol("memoization.unmemoize",ko.memoization.unmemoize);
ko.exportSymbol("memoization.parseMemoText",ko.memoization.parseMemoText);
ko.exportSymbol("memoization.unmemoizeDomNodeAndDescendants",ko.memoization.unmemoizeDomNodeAndDescendants);
ko.extenders={throttle:function(target,timeout){target.throttleEvaluation=timeout;
var writeTimeoutInstance=null;
return ko.dependentObservable({read:target,write:function(value){clearTimeout(writeTimeoutInstance);
writeTimeoutInstance=setTimeout(function(){target(value)
},timeout)
}})
},rateLimit:function(target,options){var timeout,method,limitFunction;
if(typeof options=="number"){timeout=options
}else{timeout=options.timeout;
method=options.method
}limitFunction=method=="notifyWhenChangesStop"?debounce:throttle;
target.limit(function(callback){return limitFunction(callback,timeout)
})
},notify:function(target,notifyWhen){target.equalityComparer=notifyWhen=="always"?null:valuesArePrimitiveAndEqual
}};
var primitiveTypes={"undefined":1,"boolean":1,number:1,string:1};
function valuesArePrimitiveAndEqual(a,b){var oldValueIsPrimitive=(a===null)||(typeof(a) in primitiveTypes);
return oldValueIsPrimitive?(a===b):false
}function throttle(callback,timeout){var timeoutInstance;
return function(){if(!timeoutInstance){timeoutInstance=setTimeout(function(){timeoutInstance=undefined;
callback()
},timeout)
}}
}function debounce(callback,timeout){var timeoutInstance;
return function(){clearTimeout(timeoutInstance);
timeoutInstance=setTimeout(callback,timeout)
}
}function applyExtenders(requestedExtenders){var target=this;
if(requestedExtenders){ko.utils.objectForEach(requestedExtenders,function(key,value){var extenderHandler=ko.extenders[key];
if(typeof extenderHandler=="function"){target=extenderHandler(target,value)||target
}})
}return target
}ko.exportSymbol("extenders",ko.extenders);
ko.subscription=function(target,callback,disposeCallback){this.target=target;
this.callback=callback;
this.disposeCallback=disposeCallback;
this.isDisposed=false;
ko.exportProperty(this,"dispose",this.dispose)
};
ko.subscription.prototype.dispose=function(){this.isDisposed=true;
this.disposeCallback()
};
ko.subscribable=function(){ko.utils.setPrototypeOfOrExtend(this,ko.subscribable.fn);
this._subscriptions={}
};
var defaultEvent="change";
var ko_subscribable_fn={subscribe:function(callback,callbackTarget,event){var self=this;
event=event||defaultEvent;
var boundCallback=callbackTarget?callback.bind(callbackTarget):callback;
var subscription=new ko.subscription(self,boundCallback,function(){ko.utils.arrayRemoveItem(self._subscriptions[event],subscription);
if(self.afterSubscriptionRemove){self.afterSubscriptionRemove(event)
}});
if(self.beforeSubscriptionAdd){self.beforeSubscriptionAdd(event)
}if(!self._subscriptions[event]){self._subscriptions[event]=[]
}self._subscriptions[event].push(subscription);
return subscription
},notifySubscribers:function(valueToNotify,event){event=event||defaultEvent;
if(this.hasSubscriptionsForEvent(event)){try{ko.dependencyDetection.begin();
for(var a=this._subscriptions[event].slice(0),i=0,subscription;
subscription=a[i];
++i){if(!subscription.isDisposed){subscription.callback(valueToNotify)
}}}finally{ko.dependencyDetection.end()
}}},limit:function(limitFunction){var self=this,selfIsObservable=ko.isObservable(self),isPending,previousValue,pendingValue,beforeChange="beforeChange";
if(!self._origNotifySubscribers){self._origNotifySubscribers=self.notifySubscribers;
self.notifySubscribers=function(value,event){if(!event||event===defaultEvent){self._rateLimitedChange(value)
}else{if(event===beforeChange){self._rateLimitedBeforeChange(value)
}else{self._origNotifySubscribers(value,event)
}}}
}var finish=limitFunction(function(){if(selfIsObservable&&pendingValue===self){pendingValue=self()
}isPending=false;
if(self.isDifferent(previousValue,pendingValue)){self._origNotifySubscribers(previousValue=pendingValue)
}});
self._rateLimitedChange=function(value){isPending=true;
pendingValue=value;
finish()
};
self._rateLimitedBeforeChange=function(value){if(!isPending){previousValue=value;
self._origNotifySubscribers(value,beforeChange)
}}
},hasSubscriptionsForEvent:function(event){return this._subscriptions[event]&&this._subscriptions[event].length
},getSubscriptionsCount:function(){var total=0;
ko.utils.objectForEach(this._subscriptions,function(eventName,subscriptions){total+=subscriptions.length
});
return total
},isDifferent:function(oldValue,newValue){return !this["equalityComparer"]||!this["equalityComparer"](oldValue,newValue)
},extend:applyExtenders};
ko.exportProperty(ko_subscribable_fn,"subscribe",ko_subscribable_fn.subscribe);
ko.exportProperty(ko_subscribable_fn,"extend",ko_subscribable_fn.extend);
ko.exportProperty(ko_subscribable_fn,"getSubscriptionsCount",ko_subscribable_fn.getSubscriptionsCount);
if(ko.utils.canSetPrototype){ko.utils.setPrototypeOf(ko_subscribable_fn,Function.prototype)
}ko.subscribable.fn=ko_subscribable_fn;
ko.isSubscribable=function(instance){return instance!=null&&typeof instance.subscribe=="function"&&typeof instance.notifySubscribers=="function"
};
ko.exportSymbol("subscribable",ko.subscribable);
ko.exportSymbol("isSubscribable",ko.isSubscribable);
ko.computedContext=ko.dependencyDetection=(function(){var outerFrames=[],currentFrame,lastId=0;
function getId(){return ++lastId
}function begin(options){outerFrames.push(currentFrame);
currentFrame=options
}function end(){currentFrame=outerFrames.pop()
}return{begin:begin,end:end,registerDependency:function(subscribable){if(currentFrame){if(!ko.isSubscribable(subscribable)){throw new Error("Only subscribable things can act as dependencies")
}currentFrame.callback(subscribable,subscribable._id||(subscribable._id=getId()))
}},ignore:function(callback,callbackTarget,callbackArgs){try{begin();
return callback.apply(callbackTarget,callbackArgs||[])
}finally{end()
}},getDependenciesCount:function(){if(currentFrame){return currentFrame.computed.getDependenciesCount()
}},isInitial:function(){if(currentFrame){return currentFrame.isInitial
}}}
})();
ko.exportSymbol("computedContext",ko.computedContext);
ko.exportSymbol("computedContext.getDependenciesCount",ko.computedContext.getDependenciesCount);
ko.exportSymbol("computedContext.isInitial",ko.computedContext.isInitial);
ko.exportSymbol("computedContext.isSleeping",ko.computedContext.isSleeping);
ko.observable=function(initialValue){var _latestValue=initialValue;
function observable(){if(arguments.length>0){if(observable.isDifferent(_latestValue,arguments[0])){observable.valueWillMutate();
_latestValue=arguments[0];
if(DEBUG){observable._latestValue=_latestValue
}observable.valueHasMutated()
}return this
}else{ko.dependencyDetection.registerDependency(observable);
return _latestValue
}}ko.subscribable.call(observable);
ko.utils.setPrototypeOfOrExtend(observable,ko.observable.fn);
if(DEBUG){observable._latestValue=_latestValue
}observable.peek=function(){return _latestValue
};
observable.valueHasMutated=function(){observable.notifySubscribers(_latestValue)
};
observable.valueWillMutate=function(){observable.notifySubscribers(_latestValue,"beforeChange")
};
ko.exportProperty(observable,"peek",observable.peek);
ko.exportProperty(observable,"valueHasMutated",observable.valueHasMutated);
ko.exportProperty(observable,"valueWillMutate",observable.valueWillMutate);
return observable
};
ko.observable.fn={equalityComparer:valuesArePrimitiveAndEqual};
var protoProperty=ko.observable.protoProperty="__ko_proto__";
ko.observable.fn[protoProperty]=ko.observable;
if(ko.utils.canSetPrototype){ko.utils.setPrototypeOf(ko.observable.fn,ko.subscribable.fn)
}ko.hasPrototype=function(instance,prototype){if((instance===null)||(instance===undefined)||(instance[protoProperty]===undefined)){return false
}if(instance[protoProperty]===prototype){return true
}return ko.hasPrototype(instance[protoProperty],prototype)
};
ko.isObservable=function(instance){return ko.hasPrototype(instance,ko.observable)
};
ko.isWriteableObservable=function(instance){if((typeof instance=="function")&&instance[protoProperty]===ko.observable){return true
}if((typeof instance=="function")&&(instance[protoProperty]===ko.dependentObservable)&&(instance.hasWriteFunction)){return true
}return false
};
ko.exportSymbol("observable",ko.observable);
ko.exportSymbol("isObservable",ko.isObservable);
ko.exportSymbol("isWriteableObservable",ko.isWriteableObservable);
ko.exportSymbol("isWritableObservable",ko.isWriteableObservable);
ko.observableArray=function(initialValues){initialValues=initialValues||[];
if(typeof initialValues!="object"||!("length" in initialValues)){throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.")
}var result=ko.observable(initialValues);
ko.utils.setPrototypeOfOrExtend(result,ko.observableArray.fn);
return result.extend({trackArrayChanges:true})
};
ko.observableArray.fn={remove:function(valueOrPredicate){var underlyingArray=this.peek();
var removedValues=[];
var predicate=typeof valueOrPredicate=="function"&&!ko.isObservable(valueOrPredicate)?valueOrPredicate:function(value){return value===valueOrPredicate
};
for(var i=0;
i<underlyingArray.length;
i++){var value=underlyingArray[i];
if(predicate(value)){if(removedValues.length===0){this.valueWillMutate()
}removedValues.push(value);
underlyingArray.splice(i,1);
i--
}}if(removedValues.length){this.valueHasMutated()
}return removedValues
},removeAll:function(arrayOfValues){if(arrayOfValues===undefined){var underlyingArray=this.peek();
var allValues=underlyingArray.slice(0);
this.valueWillMutate();
underlyingArray.splice(0,underlyingArray.length);
this.valueHasMutated();
return allValues
}if(!arrayOfValues){return[]
}return this["remove"](function(value){return ko.utils.arrayIndexOf(arrayOfValues,value)>=0
})
},destroy:function(valueOrPredicate){var underlyingArray=this.peek();
var predicate=typeof valueOrPredicate=="function"&&!ko.isObservable(valueOrPredicate)?valueOrPredicate:function(value){return value===valueOrPredicate
};
this.valueWillMutate();
for(var i=underlyingArray.length-1;
i>=0;
i--){var value=underlyingArray[i];
if(predicate(value)){underlyingArray[i]["_destroy"]=true
}}this.valueHasMutated()
},destroyAll:function(arrayOfValues){if(arrayOfValues===undefined){return this["destroy"](function(){return true
})
}if(!arrayOfValues){return[]
}return this["destroy"](function(value){return ko.utils.arrayIndexOf(arrayOfValues,value)>=0
})
},indexOf:function(item){var underlyingArray=this();
return ko.utils.arrayIndexOf(underlyingArray,item)
},replace:function(oldItem,newItem){var index=this["indexOf"](oldItem);
if(index>=0){this.valueWillMutate();
this.peek()[index]=newItem;
this.valueHasMutated()
}}};
ko.utils.arrayForEach(["pop","push","reverse","shift","sort","splice","unshift"],function(methodName){ko.observableArray.fn[methodName]=function(){var underlyingArray=this.peek();
this.valueWillMutate();
this.cacheDiffForKnownOperation(underlyingArray,methodName,arguments);
var methodCallResult=underlyingArray[methodName].apply(underlyingArray,arguments);
this.valueHasMutated();
return methodCallResult
}
});
ko.utils.arrayForEach(["slice"],function(methodName){ko.observableArray.fn[methodName]=function(){var underlyingArray=this();
return underlyingArray[methodName].apply(underlyingArray,arguments)
}
});
if(ko.utils.canSetPrototype){ko.utils.setPrototypeOf(ko.observableArray.fn,ko.observable.fn)
}ko.exportSymbol("observableArray",ko.observableArray);
var arrayChangeEventName="arrayChange";
ko.extenders.trackArrayChanges=function(target){if(target.cacheDiffForKnownOperation){return
}var trackingChanges=false,cachedDiff=null,pendingNotifications=0,underlyingSubscribeFunction=target.subscribe;
target.subscribe=target.subscribe=function(callback,callbackTarget,event){if(event===arrayChangeEventName){trackChanges()
}return underlyingSubscribeFunction.apply(this,arguments)
};
function trackChanges(){if(trackingChanges){return
}trackingChanges=true;
var underlyingNotifySubscribersFunction=target.notifySubscribers;
target.notifySubscribers=function(valueToNotify,event){if(!event||event===defaultEvent){++pendingNotifications
}return underlyingNotifySubscribersFunction.apply(this,arguments)
};
var previousContents=[].concat(target.peek()||[]);
cachedDiff=null;
target.subscribe(function(currentContents){currentContents=[].concat(currentContents||[]);
if(target.hasSubscriptionsForEvent(arrayChangeEventName)){var changes=getChanges(previousContents,currentContents);
if(changes.length){target.notifySubscribers(changes,arrayChangeEventName)
}}previousContents=currentContents;
cachedDiff=null;
pendingNotifications=0
})
}function getChanges(previousContents,currentContents){if(!cachedDiff||pendingNotifications>1){cachedDiff=ko.utils.compareArrays(previousContents,currentContents,{sparse:true})
}return cachedDiff
}target.cacheDiffForKnownOperation=function(rawArray,operationName,args){if(!trackingChanges||pendingNotifications){return
}var diff=[],arrayLength=rawArray.length,argsLength=args.length,offset=0;
function pushDiff(status,value,index){return diff[diff.length]={status:status,value:value,index:index}
}switch(operationName){case"push":offset=arrayLength;
case"unshift":for(var index=0;
index<argsLength;
index++){pushDiff("added",args[index],offset+index)
}break;
case"pop":offset=arrayLength-1;
case"shift":if(arrayLength){pushDiff("deleted",rawArray[offset],offset)
}break;
case"splice":var startIndex=Math.min(Math.max(0,args[0]<0?arrayLength+args[0]:args[0]),arrayLength),endDeleteIndex=argsLength===1?arrayLength:Math.min(startIndex+(args[1]||0),arrayLength),endAddIndex=startIndex+argsLength-2,endIndex=Math.max(endDeleteIndex,endAddIndex),additions=[],deletions=[];
for(var index=startIndex,argsIndex=2;
index<endIndex;
++index,++argsIndex){if(index<endDeleteIndex){deletions.push(pushDiff("deleted",rawArray[index],index))
}if(index<endAddIndex){additions.push(pushDiff("added",args[argsIndex],index))
}}ko.utils.findMovesInArrayComparison(deletions,additions);
break;
default:return
}cachedDiff=diff
}
};
ko.computed=ko.dependentObservable=function(evaluatorFunctionOrOptions,evaluatorFunctionTarget,options){var _latestValue,_needsEvaluation=true,_isBeingEvaluated=false,_suppressDisposalUntilDisposeWhenReturnsFalse=false,_isDisposed=false,readFunction=evaluatorFunctionOrOptions,pure=false,isSleeping=false;
if(readFunction&&typeof readFunction=="object"){options=readFunction;
readFunction=options.read
}else{options=options||{};
if(!readFunction){readFunction=options.read
}}if(typeof readFunction!="function"){throw new Error("Pass a function that returns the value of the ko.computed")
}function addSubscriptionToDependency(subscribable,id){if(!_subscriptionsToDependencies[id]){_subscriptionsToDependencies[id]=subscribable.subscribe(evaluatePossiblyAsync);
++_dependenciesCount
}}function disposeAllSubscriptionsToDependencies(){ko.utils.objectForEach(_subscriptionsToDependencies,function(id,subscription){subscription.dispose()
});
_subscriptionsToDependencies={}
}function disposeComputed(){disposeAllSubscriptionsToDependencies();
_dependenciesCount=0;
_isDisposed=true;
_needsEvaluation=false
}function evaluatePossiblyAsync(){var throttleEvaluationTimeout=dependentObservable.throttleEvaluation;
if(throttleEvaluationTimeout&&throttleEvaluationTimeout>=0){clearTimeout(evaluationTimeoutInstance);
evaluationTimeoutInstance=setTimeout(evaluateImmediate,throttleEvaluationTimeout)
}else{if(dependentObservable._evalRateLimited){dependentObservable._evalRateLimited()
}else{evaluateImmediate()
}}}function evaluateImmediate(suppressChangeNotification){if(_isBeingEvaluated){if(pure){throw Error("A 'pure' computed must not be called recursively")
}return
}if(_isDisposed){return
}if(disposeWhen&&disposeWhen()){if(!_suppressDisposalUntilDisposeWhenReturnsFalse){dispose();
return
}}else{_suppressDisposalUntilDisposeWhenReturnsFalse=false
}_isBeingEvaluated=true;
if(isSleeping){try{var dependencyTracking={};
ko.dependencyDetection.begin({callback:function(subscribable,id){if(!dependencyTracking[id]){dependencyTracking[id]=1;
++_dependenciesCount
}},computed:dependentObservable,isInitial:undefined});
_dependenciesCount=0;
_latestValue=readFunction.call(evaluatorFunctionTarget)
}finally{ko.dependencyDetection.end();
_isBeingEvaluated=false
}}else{try{var disposalCandidates=_subscriptionsToDependencies,disposalCount=_dependenciesCount;
ko.dependencyDetection.begin({callback:function(subscribable,id){if(!_isDisposed){if(disposalCount&&disposalCandidates[id]){_subscriptionsToDependencies[id]=disposalCandidates[id];
++_dependenciesCount;
delete disposalCandidates[id];
--disposalCount
}else{addSubscriptionToDependency(subscribable,id)
}}},computed:dependentObservable,isInitial:pure?undefined:!_dependenciesCount});
_subscriptionsToDependencies={};
_dependenciesCount=0;
try{var newValue=evaluatorFunctionTarget?readFunction.call(evaluatorFunctionTarget):readFunction()
}finally{ko.dependencyDetection.end();
if(disposalCount){ko.utils.objectForEach(disposalCandidates,function(id,toDispose){toDispose.dispose()
})
}_needsEvaluation=false
}if(dependentObservable.isDifferent(_latestValue,newValue)){dependentObservable.notifySubscribers(_latestValue,"beforeChange");
_latestValue=newValue;
if(DEBUG){dependentObservable._latestValue=_latestValue
}if(suppressChangeNotification!==true){dependentObservable.notifySubscribers(_latestValue)
}}}finally{_isBeingEvaluated=false
}}if(!_dependenciesCount){dispose()
}}function dependentObservable(){if(arguments.length>0){if(typeof writeFunction==="function"){writeFunction.apply(evaluatorFunctionTarget,arguments)
}else{throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")
}return this
}else{ko.dependencyDetection.registerDependency(dependentObservable);
if(_needsEvaluation){evaluateImmediate(true)
}return _latestValue
}}function peek(){if(_needsEvaluation&&!_dependenciesCount){evaluateImmediate(true)
}return _latestValue
}function isActive(){return _needsEvaluation||_dependenciesCount>0
}var writeFunction=options.write,disposeWhenNodeIsRemoved=options.disposeWhenNodeIsRemoved||options.disposeWhenNodeIsRemoved||null,disposeWhenOption=options.disposeWhen||options.disposeWhen,disposeWhen=disposeWhenOption,dispose=disposeComputed,_subscriptionsToDependencies={},_dependenciesCount=0,evaluationTimeoutInstance=null;
if(!evaluatorFunctionTarget){evaluatorFunctionTarget=options.owner
}ko.subscribable.call(dependentObservable);
ko.utils.setPrototypeOfOrExtend(dependentObservable,ko.dependentObservable.fn);
dependentObservable.peek=peek;
dependentObservable.getDependenciesCount=function(){return _dependenciesCount
};
dependentObservable.hasWriteFunction=typeof options.write==="function";
dependentObservable.dispose=function(){dispose()
};
dependentObservable.isActive=isActive;
var originalLimit=dependentObservable.limit;
dependentObservable.limit=function(limitFunction){originalLimit.call(dependentObservable,limitFunction);
dependentObservable._evalRateLimited=function(){dependentObservable._rateLimitedBeforeChange(_latestValue);
_needsEvaluation=true;
dependentObservable._rateLimitedChange(dependentObservable)
}
};
if(options.pure){pure=true;
isSleeping=true;
dependentObservable.beforeSubscriptionAdd=function(){if(isSleeping){isSleeping=false;
evaluateImmediate(true)
}};
dependentObservable.afterSubscriptionRemove=function(){if(!dependentObservable.getSubscriptionsCount()){disposeAllSubscriptionsToDependencies();
isSleeping=_needsEvaluation=true
}}
}else{if(options.deferEvaluation){dependentObservable.beforeSubscriptionAdd=function(){peek();
delete dependentObservable.beforeSubscriptionAdd
}
}}ko.exportProperty(dependentObservable,"peek",dependentObservable.peek);
ko.exportProperty(dependentObservable,"dispose",dependentObservable.dispose);
ko.exportProperty(dependentObservable,"isActive",dependentObservable.isActive);
ko.exportProperty(dependentObservable,"getDependenciesCount",dependentObservable.getDependenciesCount);
if(disposeWhenNodeIsRemoved){_suppressDisposalUntilDisposeWhenReturnsFalse=true;
if(disposeWhenNodeIsRemoved.nodeType){disposeWhen=function(){return !ko.utils.domNodeIsAttachedToDocument(disposeWhenNodeIsRemoved)||(disposeWhenOption&&disposeWhenOption())
}
}}if(!isSleeping&&!options.deferEvaluation){evaluateImmediate()
}if(disposeWhenNodeIsRemoved&&isActive()&&disposeWhenNodeIsRemoved.nodeType){dispose=function(){ko.utils.domNodeDisposal.removeDisposeCallback(disposeWhenNodeIsRemoved,dispose);
disposeComputed()
};
ko.utils.domNodeDisposal.addDisposeCallback(disposeWhenNodeIsRemoved,dispose)
}return dependentObservable
};
ko.isComputed=function(instance){return ko.hasPrototype(instance,ko.dependentObservable)
};
var protoProp=ko.observable.protoProperty;
ko.dependentObservable[protoProp]=ko.observable;
ko.dependentObservable.fn={equalityComparer:valuesArePrimitiveAndEqual};
ko.dependentObservable.fn[protoProp]=ko.dependentObservable;
if(ko.utils.canSetPrototype){ko.utils.setPrototypeOf(ko.dependentObservable.fn,ko.subscribable.fn)
}ko.exportSymbol("dependentObservable",ko.dependentObservable);
ko.exportSymbol("computed",ko.dependentObservable);
ko.exportSymbol("isComputed",ko.isComputed);
ko.pureComputed=function(evaluatorFunctionOrOptions,evaluatorFunctionTarget){if(typeof evaluatorFunctionOrOptions==="function"){return ko.computed(evaluatorFunctionOrOptions,evaluatorFunctionTarget,{pure:true})
}else{evaluatorFunctionOrOptions=ko.utils.extend({},evaluatorFunctionOrOptions);
evaluatorFunctionOrOptions.pure=true;
return ko.computed(evaluatorFunctionOrOptions,evaluatorFunctionTarget)
}};
ko.exportSymbol("pureComputed",ko.pureComputed);
(function(){var maxNestedObservableDepth=10;
ko.toJS=function(rootObject){if(arguments.length==0){throw new Error("When calling ko.toJS, pass the object you want to convert.")
}return mapJsObjectGraph(rootObject,function(valueToMap){for(var i=0;
ko.isObservable(valueToMap)&&(i<maxNestedObservableDepth);
i++){valueToMap=valueToMap()
}return valueToMap
})
};
ko.toJSON=function(rootObject,replacer,space){var plainJavaScriptObject=ko.toJS(rootObject);
return ko.utils.stringifyJson(plainJavaScriptObject,replacer,space)
};
function mapJsObjectGraph(rootObject,mapInputCallback,visitedObjects){visitedObjects=visitedObjects||new objectLookup();
rootObject=mapInputCallback(rootObject);
var canHaveProperties=(typeof rootObject=="object")&&(rootObject!==null)&&(rootObject!==undefined)&&(!(rootObject instanceof Date))&&(!(rootObject instanceof String))&&(!(rootObject instanceof Number))&&(!(rootObject instanceof Boolean));
if(!canHaveProperties){return rootObject
}var outputProperties=rootObject instanceof Array?[]:{};
visitedObjects.save(rootObject,outputProperties);
visitPropertiesOrArrayEntries(rootObject,function(indexer){var propertyValue=mapInputCallback(rootObject[indexer]);
switch(typeof propertyValue){case"boolean":case"number":case"string":case"function":outputProperties[indexer]=propertyValue;
break;
case"object":case"undefined":var previouslyMappedValue=visitedObjects.get(propertyValue);
outputProperties[indexer]=(previouslyMappedValue!==undefined)?previouslyMappedValue:mapJsObjectGraph(propertyValue,mapInputCallback,visitedObjects);
break
}});
return outputProperties
}function visitPropertiesOrArrayEntries(rootObject,visitorCallback){if(rootObject instanceof Array){for(var i=0;
i<rootObject.length;
i++){visitorCallback(i)
}if(typeof rootObject.toJSON=="function"){visitorCallback("toJSON")
}}else{for(var propertyName in rootObject){visitorCallback(propertyName)
}}}function objectLookup(){this.keys=[];
this.values=[]
}objectLookup.prototype={constructor:objectLookup,save:function(key,value){var existingIndex=ko.utils.arrayIndexOf(this.keys,key);
if(existingIndex>=0){this.values[existingIndex]=value
}else{this.keys.push(key);
this.values.push(value)
}},get:function(key){var existingIndex=ko.utils.arrayIndexOf(this.keys,key);
return(existingIndex>=0)?this.values[existingIndex]:undefined
}}
})();
ko.exportSymbol("toJS",ko.toJS);
ko.exportSymbol("toJSON",ko.toJSON);
(function(){var hasDomDataExpandoProperty="__ko__hasDomDataOptionValue__";
ko.selectExtensions={readValue:function(element){switch(ko.utils.tagNameLower(element)){case"option":if(element[hasDomDataExpandoProperty]===true){return ko.utils.domData.get(element,ko.bindingHandlers.options.optionValueDomDataKey)
}return ko.utils.ieVersion<=7?(element.getAttributeNode("value")&&element.getAttributeNode("value").specified?element.value:element.text):element.value;
case"select":return element.selectedIndex>=0?ko.selectExtensions.readValue(element.options[element.selectedIndex]):undefined;
default:return element.value
}},writeValue:function(element,value,allowUnset){switch(ko.utils.tagNameLower(element)){case"option":switch(typeof value){case"string":ko.utils.domData.set(element,ko.bindingHandlers.options.optionValueDomDataKey,undefined);
if(hasDomDataExpandoProperty in element){delete element[hasDomDataExpandoProperty]
}element.value=value;
break;
default:ko.utils.domData.set(element,ko.bindingHandlers.options.optionValueDomDataKey,value);
element[hasDomDataExpandoProperty]=true;
element.value=typeof value==="number"?value:"";
break
}break;
case"select":if(value===""||value===null){value=undefined
}var selection=-1;
for(var i=0,n=element.options.length,optionValue;
i<n;
++i){optionValue=ko.selectExtensions.readValue(element.options[i]);
if(optionValue==value||(optionValue==""&&value===undefined)){selection=i;
break
}}if(allowUnset||selection>=0||(value===undefined&&element.size>1)){element.selectedIndex=selection
}break;
default:if((value===null)||(value===undefined)){value=""
}element.value=value;
break
}}}
})();
ko.exportSymbol("selectExtensions",ko.selectExtensions);
ko.exportSymbol("selectExtensions.readValue",ko.selectExtensions.readValue);
ko.exportSymbol("selectExtensions.writeValue",ko.selectExtensions.writeValue);
ko.expressionRewriting=(function(){var javaScriptReservedWords=["true","false","null","undefined"];
var javaScriptAssignmentTarget=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
function getWriteableValue(expression){if(ko.utils.arrayIndexOf(javaScriptReservedWords,expression)>=0){return false
}var match=expression.match(javaScriptAssignmentTarget);
return match===null?false:match[1]?("Object("+match[1]+")"+match[2]):expression
}var stringDouble='"(?:[^"\\\\]|\\\\.)*"',stringSingle="'(?:[^'\\\\]|\\\\.)*'",stringRegexp="/(?:[^/\\\\]|\\\\.)*/w*",specials=",\"'{}()/:[\\]",everyThingElse="[^\\s:,/][^"+specials+"]*[^\\s"+specials+"]",oneNotSpace="[^\\s]",bindingToken=RegExp(stringDouble+"|"+stringSingle+"|"+stringRegexp+"|"+everyThingElse+"|"+oneNotSpace,"g"),divisionLookBehind=/[\])"'A-Za-z0-9_$]+$/,keywordRegexLookBehind={"in":1,"return":1,"typeof":1};
function parseObjectLiteral(objectLiteralString){var str=ko.utils.stringTrim(objectLiteralString);
if(str.charCodeAt(0)===123){str=str.slice(1,-1)
}var result=[],toks=str.match(bindingToken),key,values,depth=0;
if(toks){toks.push(",");
for(var i=0,tok;
tok=toks[i];
++i){var c=tok.charCodeAt(0);
if(c===44){if(depth<=0){if(key){result.push(values?{key:key,value:values.join("")}:{unknown:key})
}key=values=depth=0;
continue
}}else{if(c===58){if(!values){continue
}}else{if(c===47&&i&&tok.length>1){var match=toks[i-1].match(divisionLookBehind);
if(match&&!keywordRegexLookBehind[match[0]]){str=str.substr(str.indexOf(tok)+1);
toks=str.match(bindingToken);
toks.push(",");
i=-1;
tok="/"
}}else{if(c===40||c===123||c===91){++depth
}else{if(c===41||c===125||c===93){--depth
}else{if(!key&&!values){key=(c===34||c===39)?tok.slice(1,-1):tok;
continue
}}}}}}if(values){values.push(tok)
}else{values=[tok]
}}}return result
}var twoWayBindings={};
function preProcessBindings(bindingsStringOrKeyValueArray,bindingOptions){bindingOptions=bindingOptions||{};
function processKeyValue(key,val){var writableVal;
function callPreprocessHook(obj){return(obj&&obj.preprocess)?(val=obj.preprocess(val,key,processKeyValue)):true
}if(!bindingParams){if(!callPreprocessHook(ko.getBindingHandler(key))){return
}if(twoWayBindings[key]&&(writableVal=getWriteableValue(val))){propertyAccessorResultStrings.push("'"+key+"':function(_z){"+writableVal+"=_z}")
}}if(makeValueAccessors){val="function(){return "+val+" }"
}resultStrings.push("'"+key+"':"+val)
}var resultStrings=[],propertyAccessorResultStrings=[],makeValueAccessors=bindingOptions.valueAccessors,bindingParams=bindingOptions.bindingParams,keyValueArray=typeof bindingsStringOrKeyValueArray==="string"?parseObjectLiteral(bindingsStringOrKeyValueArray):bindingsStringOrKeyValueArray;
ko.utils.arrayForEach(keyValueArray,function(keyValue){processKeyValue(keyValue.key||keyValue.unknown,keyValue.value)
});
if(propertyAccessorResultStrings.length){processKeyValue("_ko_property_writers","{"+propertyAccessorResultStrings.join(",")+" }")
}return resultStrings.join(",")
}return{bindingRewriteValidators:[],twoWayBindings:twoWayBindings,parseObjectLiteral:parseObjectLiteral,preProcessBindings:preProcessBindings,keyValueArrayContainsKey:function(keyValueArray,key){for(var i=0;
i<keyValueArray.length;
i++){if(keyValueArray[i]["key"]==key){return true
}}return false
},writeValueToProperty:function(property,allBindings,key,value,checkIfDifferent){if(!property||!ko.isObservable(property)){var propWriters=allBindings.get("_ko_property_writers");
if(propWriters&&propWriters[key]){propWriters[key](value)
}}else{if(ko.isWriteableObservable(property)&&(!checkIfDifferent||property.peek()!==value)){property(value)
}}}}
})();
ko.exportSymbol("expressionRewriting",ko.expressionRewriting);
ko.exportSymbol("expressionRewriting.bindingRewriteValidators",ko.expressionRewriting.bindingRewriteValidators);
ko.exportSymbol("expressionRewriting.parseObjectLiteral",ko.expressionRewriting.parseObjectLiteral);
ko.exportSymbol("expressionRewriting.preProcessBindings",ko.expressionRewriting.preProcessBindings);
ko.exportSymbol("expressionRewriting._twoWayBindings",ko.expressionRewriting.twoWayBindings);
ko.exportSymbol("jsonExpressionRewriting",ko.expressionRewriting);
ko.exportSymbol("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",ko.expressionRewriting.preProcessBindings);
(function(){var commentNodesHaveTextProperty=document&&document.createComment("test").text==="<!--test-->";
var startCommentRegex=commentNodesHaveTextProperty?/^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/;
var endCommentRegex=commentNodesHaveTextProperty?/^<!--\s*\/ko\s*-->$/:/^\s*\/ko\s*$/;
var htmlTagsWithOptionallyClosingChildren={ul:true,ol:true};
function isStartComment(node){return(node.nodeType==8)&&startCommentRegex.test(commentNodesHaveTextProperty?node.text:node.nodeValue)
}function isEndComment(node){return(node.nodeType==8)&&endCommentRegex.test(commentNodesHaveTextProperty?node.text:node.nodeValue)
}function getVirtualChildren(startComment,allowUnbalanced){var currentNode=startComment;
var depth=1;
var children=[];
while(currentNode=currentNode.nextSibling){if(isEndComment(currentNode)){depth--;
if(depth===0){return children
}}children.push(currentNode);
if(isStartComment(currentNode)){depth++
}}if(!allowUnbalanced){throw new Error("Cannot find closing comment tag to match: "+startComment.nodeValue)
}return null
}function getMatchingEndComment(startComment,allowUnbalanced){var allVirtualChildren=getVirtualChildren(startComment,allowUnbalanced);
if(allVirtualChildren){if(allVirtualChildren.length>0){return allVirtualChildren[allVirtualChildren.length-1].nextSibling
}return startComment.nextSibling
}else{return null
}}function getUnbalancedChildTags(node){var childNode=node.firstChild,captureRemaining=null;
if(childNode){do{if(captureRemaining){captureRemaining.push(childNode)
}else{if(isStartComment(childNode)){var matchingEndComment=getMatchingEndComment(childNode,true);
if(matchingEndComment){childNode=matchingEndComment
}else{captureRemaining=[childNode]
}}else{if(isEndComment(childNode)){captureRemaining=[childNode]
}}}}while(childNode=childNode.nextSibling)
}return captureRemaining
}ko.virtualElements={allowedBindings:{},childNodes:function(node){return isStartComment(node)?getVirtualChildren(node):node.childNodes
},emptyNode:function(node){if(!isStartComment(node)){ko.utils.emptyDomNode(node)
}else{var virtualChildren=ko.virtualElements.childNodes(node);
for(var i=0,j=virtualChildren.length;
i<j;
i++){ko.removeNode(virtualChildren[i])
}}},setDomNodeChildren:function(node,childNodes){if(!isStartComment(node)){ko.utils.setDomNodeChildren(node,childNodes)
}else{ko.virtualElements.emptyNode(node);
var endCommentNode=node.nextSibling;
for(var i=0,j=childNodes.length;
i<j;
i++){endCommentNode.parentNode.insertBefore(childNodes[i],endCommentNode)
}}},prepend:function(containerNode,nodeToPrepend){if(!isStartComment(containerNode)){if(containerNode.firstChild){containerNode.insertBefore(nodeToPrepend,containerNode.firstChild)
}else{containerNode.appendChild(nodeToPrepend)
}}else{containerNode.parentNode.insertBefore(nodeToPrepend,containerNode.nextSibling)
}},insertAfter:function(containerNode,nodeToInsert,insertAfterNode){if(!insertAfterNode){ko.virtualElements.prepend(containerNode,nodeToInsert)
}else{if(!isStartComment(containerNode)){if(insertAfterNode.nextSibling){containerNode.insertBefore(nodeToInsert,insertAfterNode.nextSibling)
}else{containerNode.appendChild(nodeToInsert)
}}else{containerNode.parentNode.insertBefore(nodeToInsert,insertAfterNode.nextSibling)
}}},firstChild:function(node){if(!isStartComment(node)){return node.firstChild
}if(!node.nextSibling||isEndComment(node.nextSibling)){return null
}return node.nextSibling
},nextSibling:function(node){if(isStartComment(node)){node=getMatchingEndComment(node)
}if(node.nextSibling&&isEndComment(node.nextSibling)){return null
}return node.nextSibling
},hasBindingValue:isStartComment,virtualNodeBindingValue:function(node){var regexMatch=(commentNodesHaveTextProperty?node.text:node.nodeValue).match(startCommentRegex);
return regexMatch?regexMatch[1]:null
},normaliseVirtualElementDomStructure:function(elementVerified){if(!htmlTagsWithOptionallyClosingChildren[ko.utils.tagNameLower(elementVerified)]){return
}var childNode=elementVerified.firstChild;
if(childNode){do{if(childNode.nodeType===1){var unbalancedTags=getUnbalancedChildTags(childNode);
if(unbalancedTags){var nodeToInsertBefore=childNode.nextSibling;
for(var i=0;
i<unbalancedTags.length;
i++){if(nodeToInsertBefore){elementVerified.insertBefore(unbalancedTags[i],nodeToInsertBefore)
}else{elementVerified.appendChild(unbalancedTags[i])
}}}}}while(childNode=childNode.nextSibling)
}}}
})();
ko.exportSymbol("virtualElements",ko.virtualElements);
ko.exportSymbol("virtualElements.allowedBindings",ko.virtualElements.allowedBindings);
ko.exportSymbol("virtualElements.emptyNode",ko.virtualElements.emptyNode);
ko.exportSymbol("virtualElements.insertAfter",ko.virtualElements.insertAfter);
ko.exportSymbol("virtualElements.prepend",ko.virtualElements.prepend);
ko.exportSymbol("virtualElements.setDomNodeChildren",ko.virtualElements.setDomNodeChildren);
(function(){var defaultBindingAttributeName="data-bind";
ko.bindingProvider=function(){this.bindingCache={}
};
ko.utils.extend(ko.bindingProvider.prototype,{nodeHasBindings:function(node){switch(node.nodeType){case 1:return node.getAttribute(defaultBindingAttributeName)!=null||ko.components.getComponentNameForNode(node);
case 8:return ko.virtualElements.hasBindingValue(node);
default:return false
}},getBindings:function(node,bindingContext){var bindingsString=this["getBindingsString"](node,bindingContext),parsedBindings=bindingsString?this["parseBindingsString"](bindingsString,bindingContext,node):null;
return ko.components.addBindingsForCustomElement(parsedBindings,node,bindingContext,false)
},getBindingAccessors:function(node,bindingContext){var bindingsString=this["getBindingsString"](node,bindingContext),parsedBindings=bindingsString?this["parseBindingsString"](bindingsString,bindingContext,node,{valueAccessors:true}):null;
return ko.components.addBindingsForCustomElement(parsedBindings,node,bindingContext,true)
},getBindingsString:function(node,bindingContext){switch(node.nodeType){case 1:return node.getAttribute(defaultBindingAttributeName);
case 8:return ko.virtualElements.virtualNodeBindingValue(node);
default:return null
}},parseBindingsString:function(bindingsString,bindingContext,node,options){try{var bindingFunction=createBindingsStringEvaluatorViaCache(bindingsString,this.bindingCache,options);
return bindingFunction(bindingContext,node)
}catch(ex){ex.message="Unable to parse bindings.\nBindings value: "+bindingsString+"\nMessage: "+ex.message;
throw ex
}}});
ko.bindingProvider.instance=new ko.bindingProvider();
function createBindingsStringEvaluatorViaCache(bindingsString,cache,options){var cacheKey=bindingsString+(options&&options.valueAccessors||"");
return cache[cacheKey]||(cache[cacheKey]=createBindingsStringEvaluator(bindingsString,options))
}function createBindingsStringEvaluator(bindingsString,options){var rewrittenBindings=ko.expressionRewriting.preProcessBindings(bindingsString,options),functionBody="with($context){with($data||{}){return{"+rewrittenBindings+"}}}";
return new Function("$context","$element",functionBody)
}})();
ko.exportSymbol("bindingProvider",ko.bindingProvider);
(function(){ko.bindingHandlers={};
var bindingDoesNotRecurseIntoElementTypes={script:true};
ko.getBindingHandler=function(bindingKey){return ko.bindingHandlers[bindingKey]
};
ko.bindingContext=function(dataItemOrAccessor,parentContext,dataItemAlias,extendCallback){function updateContext(){var dataItemOrObservable=isFunc?dataItemOrAccessor():dataItemOrAccessor,dataItem=ko.utils.unwrapObservable(dataItemOrObservable);
if(parentContext){if(parentContext._subscribable){parentContext._subscribable()
}ko.utils.extend(self,parentContext);
if(subscribable){self._subscribable=subscribable
}}else{self["$parents"]=[];
self["$root"]=dataItem;
self.ko=ko
}self["$rawData"]=dataItemOrObservable;
self["$data"]=dataItem;
if(dataItemAlias){self[dataItemAlias]=dataItem
}if(extendCallback){extendCallback(self,parentContext,dataItem)
}return self["$data"]
}function disposeWhen(){return nodes&&!ko.utils.anyDomNodeIsAttachedToDocument(nodes)
}var self=this,isFunc=typeof(dataItemOrAccessor)=="function"&&!ko.isObservable(dataItemOrAccessor),nodes,subscribable=ko.dependentObservable(updateContext,null,{disposeWhen:disposeWhen,disposeWhenNodeIsRemoved:true});
if(subscribable.isActive()){self._subscribable=subscribable;
subscribable.equalityComparer=null;
nodes=[];
subscribable._addNode=function(node){nodes.push(node);
ko.utils.domNodeDisposal.addDisposeCallback(node,function(node){ko.utils.arrayRemoveItem(nodes,node);
if(!nodes.length){subscribable.dispose();
self._subscribable=subscribable=undefined
}})
}
}};
ko.bindingContext.prototype.createChildContext=function(dataItemOrAccessor,dataItemAlias,extendCallback){return new ko.bindingContext(dataItemOrAccessor,this,dataItemAlias,function(self,parentContext){self["$parentContext"]=parentContext;
self["$parent"]=parentContext["$data"];
self["$parents"]=(parentContext["$parents"]||[]).slice(0);
self["$parents"].unshift(self["$parent"]);
if(extendCallback){extendCallback(self)
}})
};
ko.bindingContext.prototype.extend=function(properties){return new ko.bindingContext(this._subscribable||this["$data"],this,null,function(self,parentContext){self["$rawData"]=parentContext["$rawData"];
ko.utils.extend(self,typeof(properties)=="function"?properties():properties)
})
};
function makeValueAccessor(value){return function(){return value
}
}function evaluateValueAccessor(valueAccessor){return valueAccessor()
}function makeAccessorsFromFunction(callback){return ko.utils.objectMap(ko.dependencyDetection.ignore(callback),function(value,key){return function(){return callback()[key]
}
})
}function makeBindingAccessors(bindings,context,node){if(typeof bindings==="function"){return makeAccessorsFromFunction(bindings.bind(null,context,node))
}else{return ko.utils.objectMap(bindings,makeValueAccessor)
}}function getBindingsAndMakeAccessors(node,context){return makeAccessorsFromFunction(this["getBindings"].bind(this,node,context))
}function validateThatBindingIsAllowedForVirtualElements(bindingName){var validator=ko.virtualElements.allowedBindings[bindingName];
if(!validator){throw new Error("The binding '"+bindingName+"' cannot be used with virtual elements")
}}function applyBindingsToDescendantsInternal(bindingContext,elementOrVirtualElement,bindingContextsMayDifferFromDomParentElement){var currentChild,nextInQueue=ko.virtualElements.firstChild(elementOrVirtualElement),provider=ko.bindingProvider.instance,preprocessNode=provider.preprocessNode;
if(preprocessNode){while(currentChild=nextInQueue){nextInQueue=ko.virtualElements.nextSibling(currentChild);
preprocessNode.call(provider,currentChild)
}nextInQueue=ko.virtualElements.firstChild(elementOrVirtualElement)
}while(currentChild=nextInQueue){nextInQueue=ko.virtualElements.nextSibling(currentChild);
applyBindingsToNodeAndDescendantsInternal(bindingContext,currentChild,bindingContextsMayDifferFromDomParentElement)
}}function applyBindingsToNodeAndDescendantsInternal(bindingContext,nodeVerified,bindingContextMayDifferFromDomParentElement){var shouldBindDescendants=true;
var isElement=(nodeVerified.nodeType===1);
if(isElement){ko.virtualElements.normaliseVirtualElementDomStructure(nodeVerified)
}var shouldApplyBindings=(isElement&&bindingContextMayDifferFromDomParentElement)||ko.bindingProvider.instance["nodeHasBindings"](nodeVerified);
if(shouldApplyBindings){shouldBindDescendants=applyBindingsToNodeInternal(nodeVerified,null,bindingContext,bindingContextMayDifferFromDomParentElement)["shouldBindDescendants"]
}if(shouldBindDescendants&&!bindingDoesNotRecurseIntoElementTypes[ko.utils.tagNameLower(nodeVerified)]){applyBindingsToDescendantsInternal(bindingContext,nodeVerified,!isElement)
}}var boundElementDomDataKey=ko.utils.domData.nextKey();
function topologicalSortBindings(bindings){var result=[],bindingsConsidered={},cyclicDependencyStack=[];
ko.utils.objectForEach(bindings,function pushBinding(bindingKey){if(!bindingsConsidered[bindingKey]){var binding=ko.getBindingHandler(bindingKey);
if(binding){if(binding.after){cyclicDependencyStack.push(bindingKey);
ko.utils.arrayForEach(binding.after,function(bindingDependencyKey){if(bindings[bindingDependencyKey]){if(ko.utils.arrayIndexOf(cyclicDependencyStack,bindingDependencyKey)!==-1){throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+cyclicDependencyStack.join(", "))
}else{pushBinding(bindingDependencyKey)
}}});
cyclicDependencyStack.length--
}result.push({key:bindingKey,handler:binding})
}bindingsConsidered[bindingKey]=true
}});
return result
}function applyBindingsToNodeInternal(node,sourceBindings,bindingContext,bindingContextMayDifferFromDomParentElement){var alreadyBound=ko.utils.domData.get(node,boundElementDomDataKey);
if(!sourceBindings){if(alreadyBound){throw Error("You cannot apply bindings multiple times to the same element.")
}ko.utils.domData.set(node,boundElementDomDataKey,true)
}if(!alreadyBound&&bindingContextMayDifferFromDomParentElement){ko.storedBindingContextForNode(node,bindingContext)
}var bindings;
if(sourceBindings&&typeof sourceBindings!=="function"){bindings=sourceBindings
}else{var provider=ko.bindingProvider.instance,getBindings=provider.getBindingAccessors||getBindingsAndMakeAccessors;
var bindingsUpdater=ko.dependentObservable(function(){bindings=sourceBindings?sourceBindings(bindingContext,node):getBindings.call(provider,node,bindingContext);
if(bindings&&bindingContext._subscribable){bindingContext._subscribable()
}return bindings
},null,{disposeWhenNodeIsRemoved:node});
if(!bindings||!bindingsUpdater.isActive()){bindingsUpdater=null
}}var bindingHandlerThatControlsDescendantBindings;
if(bindings){var getValueAccessor=bindingsUpdater?function(bindingKey){return function(){return evaluateValueAccessor(bindingsUpdater()[bindingKey])
}
}:function(bindingKey){return bindings[bindingKey]
};
function allBindings(){return ko.utils.objectMap(bindingsUpdater?bindingsUpdater():bindings,evaluateValueAccessor)
}allBindings.get=function(key){return bindings[key]&&evaluateValueAccessor(getValueAccessor(key))
};
allBindings.has=function(key){return key in bindings
};
var orderedBindings=topologicalSortBindings(bindings);
ko.utils.arrayForEach(orderedBindings,function(bindingKeyAndHandler){var handlerInitFn=bindingKeyAndHandler.handler.init,handlerUpdateFn=bindingKeyAndHandler.handler.update,bindingKey=bindingKeyAndHandler.key;
if(node.nodeType===8){validateThatBindingIsAllowedForVirtualElements(bindingKey)
}try{if(typeof handlerInitFn=="function"){ko.dependencyDetection.ignore(function(){var initResult=handlerInitFn(node,getValueAccessor(bindingKey),allBindings,bindingContext["$data"],bindingContext);
if(initResult&&initResult.controlsDescendantBindings){if(bindingHandlerThatControlsDescendantBindings!==undefined){throw new Error("Multiple bindings ("+bindingHandlerThatControlsDescendantBindings+" and "+bindingKey+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")
}bindingHandlerThatControlsDescendantBindings=bindingKey
}})
}if(typeof handlerUpdateFn=="function"){ko.dependentObservable(function(){handlerUpdateFn(node,getValueAccessor(bindingKey),allBindings,bindingContext["$data"],bindingContext)
},null,{disposeWhenNodeIsRemoved:node})
}}catch(ex){ex.message='Unable to process binding "'+bindingKey+": "+bindings[bindingKey]+'"\nMessage: '+ex.message;
throw ex
}})
}return{shouldBindDescendants:bindingHandlerThatControlsDescendantBindings===undefined}
}var storedBindingContextDomDataKey=ko.utils.domData.nextKey();
ko.storedBindingContextForNode=function(node,bindingContext){if(arguments.length==2){ko.utils.domData.set(node,storedBindingContextDomDataKey,bindingContext);
if(bindingContext._subscribable){bindingContext._subscribable._addNode(node)
}}else{return ko.utils.domData.get(node,storedBindingContextDomDataKey)
}};
function getBindingContext(viewModelOrBindingContext){return viewModelOrBindingContext&&(viewModelOrBindingContext instanceof ko.bindingContext)?viewModelOrBindingContext:new ko.bindingContext(viewModelOrBindingContext)
}ko.applyBindingAccessorsToNode=function(node,bindings,viewModelOrBindingContext){if(node.nodeType===1){ko.virtualElements.normaliseVirtualElementDomStructure(node)
}return applyBindingsToNodeInternal(node,bindings,getBindingContext(viewModelOrBindingContext),true)
};
ko.applyBindingsToNode=function(node,bindings,viewModelOrBindingContext){var context=getBindingContext(viewModelOrBindingContext);
return ko.applyBindingAccessorsToNode(node,makeBindingAccessors(bindings,context,node),context)
};
ko.applyBindingsToDescendants=function(viewModelOrBindingContext,rootNode){if(rootNode.nodeType===1||rootNode.nodeType===8){applyBindingsToDescendantsInternal(getBindingContext(viewModelOrBindingContext),rootNode,true)
}};
ko.applyBindings=function(viewModelOrBindingContext,rootNode){if(!jQueryInstance&&window.jQuery){jQueryInstance=window.jQuery
}if(rootNode&&(rootNode.nodeType!==1)&&(rootNode.nodeType!==8)){throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")
}rootNode=rootNode||window.document.body;
applyBindingsToNodeAndDescendantsInternal(getBindingContext(viewModelOrBindingContext),rootNode,true)
};
ko.contextFor=function(node){switch(node.nodeType){case 1:case 8:var context=ko.storedBindingContextForNode(node);
if(context){return context
}if(node.parentNode){return ko.contextFor(node.parentNode)
}break
}return undefined
};
ko.dataFor=function(node){var context=ko.contextFor(node);
return context?context["$data"]:undefined
};
ko.exportSymbol("bindingHandlers",ko.bindingHandlers);
ko.exportSymbol("applyBindings",ko.applyBindings);
ko.exportSymbol("applyBindingsToDescendants",ko.applyBindingsToDescendants);
ko.exportSymbol("applyBindingAccessorsToNode",ko.applyBindingAccessorsToNode);
ko.exportSymbol("applyBindingsToNode",ko.applyBindingsToNode);
ko.exportSymbol("contextFor",ko.contextFor);
ko.exportSymbol("dataFor",ko.dataFor)
})();
(function(undefined){var loadingSubscribablesCache={},loadedDefinitionsCache={};
ko.components={get:function(componentName,callback){var cachedDefinition=getObjectOwnProperty(loadedDefinitionsCache,componentName);
if(cachedDefinition){setTimeout(function(){callback(cachedDefinition)
},0)
}else{loadComponentAndNotify(componentName,callback)
}},clearCachedDefinition:function(componentName){delete loadedDefinitionsCache[componentName]
},_getFirstResultFromLoaders:getFirstResultFromLoaders};
function getObjectOwnProperty(obj,propName){return obj.hasOwnProperty(propName)?obj[propName]:undefined
}function loadComponentAndNotify(componentName,callback){var subscribable=getObjectOwnProperty(loadingSubscribablesCache,componentName),completedAsync;
if(!subscribable){subscribable=loadingSubscribablesCache[componentName]=new ko.subscribable();
beginLoadingComponent(componentName,function(definition){loadedDefinitionsCache[componentName]=definition;
delete loadingSubscribablesCache[componentName];
if(completedAsync){subscribable.notifySubscribers(definition)
}else{setTimeout(function(){subscribable.notifySubscribers(definition)
},0)
}});
completedAsync=true
}subscribable.subscribe(callback)
}function beginLoadingComponent(componentName,callback){getFirstResultFromLoaders("getConfig",[componentName],function(config){if(config){getFirstResultFromLoaders("loadComponent",[componentName,config],function(definition){callback(definition)
})
}else{callback(null)
}})
}function getFirstResultFromLoaders(methodName,argsExceptCallback,callback,candidateLoaders){if(!candidateLoaders){candidateLoaders=ko.components.loaders.slice(0)
}var currentCandidateLoader=candidateLoaders.shift();
if(currentCandidateLoader){var methodInstance=currentCandidateLoader[methodName];
if(methodInstance){var wasAborted=false,synchronousReturnValue=methodInstance.apply(currentCandidateLoader,argsExceptCallback.concat(function(result){if(wasAborted){callback(null)
}else{if(result!==null){callback(result)
}else{getFirstResultFromLoaders(methodName,argsExceptCallback,callback,candidateLoaders)
}}}));
if(synchronousReturnValue!==undefined){wasAborted=true;
if(!currentCandidateLoader.suppressLoaderExceptions){throw new Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.")
}}}else{getFirstResultFromLoaders(methodName,argsExceptCallback,callback,candidateLoaders)
}}else{callback(null)
}}ko.components.loaders=[];
ko.exportSymbol("components",ko.components);
ko.exportSymbol("components.get",ko.components.get);
ko.exportSymbol("components.clearCachedDefinition",ko.components.clearCachedDefinition)
})();
(function(undefined){var defaultConfigRegistry={};
ko.components.register=function(componentName,config){if(!config){throw new Error("Invalid configuration for "+componentName)
}if(ko.components.isRegistered(componentName)){throw new Error("Component "+componentName+" is already registered")
}defaultConfigRegistry[componentName]=config
};
ko.components.isRegistered=function(componentName){return componentName in defaultConfigRegistry
};
ko.components.unregister=function(componentName){delete defaultConfigRegistry[componentName];
ko.components.clearCachedDefinition(componentName)
};
ko.components.defaultLoader={getConfig:function(componentName,callback){var result=defaultConfigRegistry.hasOwnProperty(componentName)?defaultConfigRegistry[componentName]:null;
callback(result)
},loadComponent:function(componentName,config,callback){var errorCallback=makeErrorCallback(componentName);
possiblyGetConfigFromAmd(errorCallback,config,function(loadedConfig){resolveConfig(componentName,errorCallback,loadedConfig,callback)
})
},loadTemplate:function(componentName,templateConfig,callback){resolveTemplate(makeErrorCallback(componentName),templateConfig,callback)
},loadViewModel:function(componentName,viewModelConfig,callback){resolveViewModel(makeErrorCallback(componentName),viewModelConfig,callback)
}};
var createViewModelKey="createViewModel";
function resolveConfig(componentName,errorCallback,config,callback){var result={},makeCallBackWhenZero=2,tryIssueCallback=function(){if(--makeCallBackWhenZero===0){callback(result)
}},templateConfig=config.template,viewModelConfig=config.viewModel;
if(templateConfig){possiblyGetConfigFromAmd(errorCallback,templateConfig,function(loadedConfig){ko.components._getFirstResultFromLoaders("loadTemplate",[componentName,loadedConfig],function(resolvedTemplate){result.template=resolvedTemplate;
tryIssueCallback()
})
})
}else{tryIssueCallback()
}if(viewModelConfig){possiblyGetConfigFromAmd(errorCallback,viewModelConfig,function(loadedConfig){ko.components._getFirstResultFromLoaders("loadViewModel",[componentName,loadedConfig],function(resolvedViewModel){result[createViewModelKey]=resolvedViewModel;
tryIssueCallback()
})
})
}else{tryIssueCallback()
}}function resolveTemplate(errorCallback,templateConfig,callback){if(typeof templateConfig==="string"){callback(ko.utils.parseHtmlFragment(templateConfig))
}else{if(templateConfig instanceof Array){callback(templateConfig)
}else{if(isDocumentFragment(templateConfig)){callback(ko.utils.makeArray(templateConfig.childNodes))
}else{if(templateConfig.element){var element=templateConfig.element;
if(isDomElement(element)){callback(cloneNodesFromTemplateSourceElement(element))
}else{if(typeof element==="string"){var elemInstance=document.getElementById(element);
if(elemInstance){callback(cloneNodesFromTemplateSourceElement(elemInstance))
}else{errorCallback("Cannot find element with ID "+element)
}}else{errorCallback("Unknown element type: "+element)
}}}else{errorCallback("Unknown template value: "+templateConfig)
}}}}}function resolveViewModel(errorCallback,viewModelConfig,callback){if(typeof viewModelConfig==="function"){callback(function(params){return new viewModelConfig(params)
})
}else{if(typeof viewModelConfig[createViewModelKey]==="function"){callback(viewModelConfig[createViewModelKey])
}else{if("instance" in viewModelConfig){var fixedInstance=viewModelConfig.instance;
callback(function(params,componentInfo){return fixedInstance
})
}else{if("viewModel" in viewModelConfig){resolveViewModel(errorCallback,viewModelConfig.viewModel,callback)
}else{errorCallback("Unknown viewModel value: "+viewModelConfig)
}}}}}function cloneNodesFromTemplateSourceElement(elemInstance){switch(ko.utils.tagNameLower(elemInstance)){case"script":return ko.utils.parseHtmlFragment(elemInstance.text);
case"textarea":return ko.utils.parseHtmlFragment(elemInstance.value);
case"template":if(isDocumentFragment(elemInstance.content)){return ko.utils.cloneNodes(elemInstance.content.childNodes)
}}return ko.utils.cloneNodes(elemInstance.childNodes)
}function isDomElement(obj){if(window.HTMLElement){return obj instanceof HTMLElement
}else{return obj&&obj.tagName&&obj.nodeType===1
}}function isDocumentFragment(obj){if(window.DocumentFragment){return obj instanceof DocumentFragment
}else{return obj&&obj.nodeType===11
}}function possiblyGetConfigFromAmd(errorCallback,config,callback){if(typeof config.require==="string"){if(require||window.require){(require||window.require)([config.require],callback)
}else{errorCallback("Uses require, but no AMD loader is present")
}}else{callback(config)
}}function makeErrorCallback(componentName){return function(message){throw new Error("Component '"+componentName+"': "+message)
}
}ko.exportSymbol("components.register",ko.components.register);
ko.exportSymbol("components.isRegistered",ko.components.isRegistered);
ko.exportSymbol("components.unregister",ko.components.unregister);
ko.exportSymbol("components.defaultLoader",ko.components.defaultLoader);
ko.components.loaders.push(ko.components.defaultLoader);
ko.components._allRegisteredComponents=defaultConfigRegistry
})();
(function(undefined){ko.components.getComponentNameForNode=function(node){var tagNameLower=ko.utils.tagNameLower(node);
return ko.components.isRegistered(tagNameLower)&&tagNameLower
};
ko.components.addBindingsForCustomElement=function(allBindings,node,bindingContext,valueAccessors){if(node.nodeType===1){var componentName=ko.components.getComponentNameForNode(node);
if(componentName){allBindings=allBindings||{};
if(allBindings.component){throw new Error('Cannot use the "component" binding on a custom element matching a component')
}var componentBindingValue={name:componentName,params:getComponentParamsFromCustomElement(node,bindingContext)};
allBindings.component=valueAccessors?function(){return componentBindingValue
}:componentBindingValue
}}return allBindings
};
var nativeBindingProviderInstance=new ko.bindingProvider();
function getComponentParamsFromCustomElement(elem,bindingContext){var paramsAttribute=elem.getAttribute("params");
if(paramsAttribute){var params=nativeBindingProviderInstance.parseBindingsString(paramsAttribute,bindingContext,elem,{valueAccessors:true,bindingParams:true}),rawParamComputedValues=ko.utils.objectMap(params,function(paramValue,paramName){return ko.computed(paramValue,null,{disposeWhenNodeIsRemoved:elem})
}),result=ko.utils.objectMap(rawParamComputedValues,function(paramValueComputed,paramName){if(!paramValueComputed.isActive()){return paramValueComputed.peek()
}else{return ko.computed(function(){return ko.utils.unwrapObservable(paramValueComputed())
},null,{disposeWhenNodeIsRemoved:elem})
}});
if(!result.hasOwnProperty("$raw")){result["$raw"]=rawParamComputedValues
}return result
}else{return{"$raw":{}}
}}if(ko.utils.ieVersion<9){ko.components.register=(function(originalFunction){return function(componentName){document.createElement(componentName);
return originalFunction.apply(this,arguments)
}
})(ko.components.register);
document.createDocumentFragment=(function(originalFunction){return function(){var newDocFrag=originalFunction(),allComponents=ko.components._allRegisteredComponents;
for(var componentName in allComponents){if(allComponents.hasOwnProperty(componentName)){newDocFrag.createElement(componentName)
}}return newDocFrag
}
})(document.createDocumentFragment)
}})();
(function(undefined){var componentLoadingOperationUniqueId=0;
ko.bindingHandlers.component={init:function(element,valueAccessor,ignored1,ignored2,bindingContext){var currentViewModel,currentLoadingOperationId,disposeAssociatedComponentViewModel=function(){var currentViewModelDispose=currentViewModel&&currentViewModel.dispose;
if(typeof currentViewModelDispose==="function"){currentViewModelDispose.call(currentViewModel)
}currentLoadingOperationId=null
};
ko.utils.domNodeDisposal.addDisposeCallback(element,disposeAssociatedComponentViewModel);
ko.computed(function(){var value=ko.utils.unwrapObservable(valueAccessor()),componentName,componentParams;
if(typeof value==="string"){componentName=value
}else{componentName=ko.utils.unwrapObservable(value.name);
componentParams=ko.utils.unwrapObservable(value.params)
}if(!componentName){throw new Error("No component name specified")
}var loadingOperationId=currentLoadingOperationId=++componentLoadingOperationUniqueId;
ko.components.get(componentName,function(componentDefinition){if(currentLoadingOperationId!==loadingOperationId){return
}disposeAssociatedComponentViewModel();
if(!componentDefinition){throw new Error("Unknown component '"+componentName+"'")
}cloneTemplateIntoElement(componentName,componentDefinition,element);
var componentViewModel=createViewModel(componentDefinition,element,componentParams),childBindingContext=bindingContext.createChildContext(componentViewModel);
currentViewModel=componentViewModel;
ko.applyBindingsToDescendants(childBindingContext,element)
})
},null,{disposeWhenNodeIsRemoved:element});
return{controlsDescendantBindings:true}
}};
ko.virtualElements.allowedBindings.component=true;
function cloneTemplateIntoElement(componentName,componentDefinition,element){var template=componentDefinition.template;
if(!template){throw new Error("Component '"+componentName+"' has no template")
}var clonedNodesArray=ko.utils.cloneNodes(template);
ko.virtualElements.setDomNodeChildren(element,clonedNodesArray)
}function createViewModel(componentDefinition,element,componentParams){var componentViewModelFactory=componentDefinition.createViewModel;
return componentViewModelFactory?componentViewModelFactory.call(componentDefinition,componentParams,{element:element}):componentParams
}})();
var attrHtmlToJavascriptMap={"class":"className","for":"htmlFor"};
ko.bindingHandlers.attr={update:function(element,valueAccessor,allBindings){var value=ko.utils.unwrapObservable(valueAccessor())||{};
ko.utils.objectForEach(value,function(attrName,attrValue){attrValue=ko.utils.unwrapObservable(attrValue);
var toRemove=(attrValue===false)||(attrValue===null)||(attrValue===undefined);
if(toRemove){element.removeAttribute(attrName)
}if(ko.utils.ieVersion<=8&&attrName in attrHtmlToJavascriptMap){attrName=attrHtmlToJavascriptMap[attrName];
if(toRemove){element.removeAttribute(attrName)
}else{element[attrName]=attrValue
}}else{if(!toRemove){element.setAttribute(attrName,attrValue.toString())
}}if(attrName==="name"){ko.utils.setElementName(element,toRemove?"":attrValue.toString())
}})
}};
(function(){ko.bindingHandlers.checked={after:["value","attr"],init:function(element,valueAccessor,allBindings){var checkedValue=ko.pureComputed(function(){if(allBindings.has("checkedValue")){return ko.utils.unwrapObservable(allBindings.get("checkedValue"))
}else{if(allBindings.has("value")){return ko.utils.unwrapObservable(allBindings.get("value"))
}}return element.value
});
function updateModel(){var isChecked=element.checked,elemValue=useCheckedValue?checkedValue():isChecked;
if(ko.computedContext.isInitial()){return
}if(isRadio&&!isChecked){return
}var modelValue=ko.dependencyDetection.ignore(valueAccessor);
if(isValueArray){if(oldElemValue!==elemValue){if(isChecked){ko.utils.addOrRemoveItem(modelValue,elemValue,true);
ko.utils.addOrRemoveItem(modelValue,oldElemValue,false)
}oldElemValue=elemValue
}else{ko.utils.addOrRemoveItem(modelValue,elemValue,isChecked)
}}else{ko.expressionRewriting.writeValueToProperty(modelValue,allBindings,"checked",elemValue,true)
}}function updateView(){var modelValue=ko.utils.unwrapObservable(valueAccessor());
if(isValueArray){element.checked=ko.utils.arrayIndexOf(modelValue,checkedValue())>=0
}else{if(isCheckbox){element.checked=modelValue
}else{element.checked=(checkedValue()===modelValue)
}}}var isCheckbox=element.type=="checkbox",isRadio=element.type=="radio";
if(!isCheckbox&&!isRadio){return
}var isValueArray=isCheckbox&&(ko.utils.unwrapObservable(valueAccessor()) instanceof Array),oldElemValue=isValueArray?checkedValue():undefined,useCheckedValue=isRadio||isValueArray;
if(isRadio&&!element.name){ko.bindingHandlers.uniqueName["init"](element,function(){return true
})
}ko.computed(updateModel,null,{disposeWhenNodeIsRemoved:element});
ko.utils.registerEventHandler(element,"click",updateModel);
ko.computed(updateView,null,{disposeWhenNodeIsRemoved:element})
}};
ko.expressionRewriting.twoWayBindings.checked=true;
ko.bindingHandlers.checkedValue={update:function(element,valueAccessor){element.value=ko.utils.unwrapObservable(valueAccessor())
}}
})();
var classesWrittenByBindingKey="__ko__cssValue";
ko.bindingHandlers.css={update:function(element,valueAccessor){var value=ko.utils.unwrapObservable(valueAccessor());
if(typeof value=="object"){ko.utils.objectForEach(value,function(className,shouldHaveClass){shouldHaveClass=ko.utils.unwrapObservable(shouldHaveClass);
ko.utils.toggleDomNodeCssClass(element,className,shouldHaveClass)
})
}else{value=String(value||"");
ko.utils.toggleDomNodeCssClass(element,element[classesWrittenByBindingKey],false);
element[classesWrittenByBindingKey]=value;
ko.utils.toggleDomNodeCssClass(element,value,true)
}}};
ko.bindingHandlers.enable={update:function(element,valueAccessor){var value=ko.utils.unwrapObservable(valueAccessor());
if(value&&element.disabled){element.removeAttribute("disabled")
}else{if((!value)&&(!element.disabled)){element.disabled=true
}}}};
ko.bindingHandlers.disable={update:function(element,valueAccessor){ko.bindingHandlers.enable["update"](element,function(){return !ko.utils.unwrapObservable(valueAccessor())
})
}};
function makeEventHandlerShortcut(eventName){ko.bindingHandlers[eventName]={init:function(element,valueAccessor,allBindings,viewModel,bindingContext){var newValueAccessor=function(){var result={};
result[eventName]=valueAccessor();
return result
};
return ko.bindingHandlers.event["init"].call(this,element,newValueAccessor,allBindings,viewModel,bindingContext)
}}
}ko.bindingHandlers.event={init:function(element,valueAccessor,allBindings,viewModel,bindingContext){var eventsToHandle=valueAccessor()||{};
ko.utils.objectForEach(eventsToHandle,function(eventName){if(typeof eventName=="string"){ko.utils.registerEventHandler(element,eventName,function(event){var handlerReturnValue;
var handlerFunction=valueAccessor()[eventName];
if(!handlerFunction){return
}try{var argsForHandler=ko.utils.makeArray(arguments);
viewModel=bindingContext["$data"];
argsForHandler.unshift(viewModel);
handlerReturnValue=handlerFunction.apply(viewModel,argsForHandler)
}finally{if(handlerReturnValue!==true){if(event.preventDefault){event.preventDefault()
}else{event.returnValue=false
}}}var bubble=allBindings.get(eventName+"Bubble")!==false;
if(!bubble){event.cancelBubble=true;
if(event.stopPropagation){event.stopPropagation()
}}})
}})
}};
ko.bindingHandlers.foreach={makeTemplateValueAccessor:function(valueAccessor){return function(){var modelValue=valueAccessor(),unwrappedValue=ko.utils.peekObservable(modelValue);
if((!unwrappedValue)||typeof unwrappedValue.length=="number"){return{foreach:modelValue,templateEngine:ko.nativeTemplateEngine.instance}
}ko.utils.unwrapObservable(modelValue);
return{foreach:unwrappedValue.data,as:unwrappedValue.as,includeDestroyed:unwrappedValue.includeDestroyed,afterAdd:unwrappedValue.afterAdd,beforeRemove:unwrappedValue.beforeRemove,afterRender:unwrappedValue.afterRender,beforeMove:unwrappedValue.beforeMove,afterMove:unwrappedValue.afterMove,templateEngine:ko.nativeTemplateEngine.instance}
}
},init:function(element,valueAccessor,allBindings,viewModel,bindingContext){return ko.bindingHandlers.template["init"](element,ko.bindingHandlers.foreach.makeTemplateValueAccessor(valueAccessor))
},update:function(element,valueAccessor,allBindings,viewModel,bindingContext){return ko.bindingHandlers.template["update"](element,ko.bindingHandlers.foreach.makeTemplateValueAccessor(valueAccessor),allBindings,viewModel,bindingContext)
}};
ko.expressionRewriting.bindingRewriteValidators.foreach=false;
ko.virtualElements.allowedBindings.foreach=true;
var hasfocusUpdatingProperty="__ko_hasfocusUpdating";
var hasfocusLastValue="__ko_hasfocusLastValue";
ko.bindingHandlers.hasfocus={init:function(element,valueAccessor,allBindings){var handleElementFocusChange=function(isFocused){element[hasfocusUpdatingProperty]=true;
var ownerDoc=element.ownerDocument;
if("activeElement" in ownerDoc){var active;
try{active=ownerDoc.activeElement
}catch(e){active=ownerDoc.body
}isFocused=(active===element)
}var modelValue=valueAccessor();
ko.expressionRewriting.writeValueToProperty(modelValue,allBindings,"hasfocus",isFocused,true);
element[hasfocusLastValue]=isFocused;
element[hasfocusUpdatingProperty]=false
};
var handleElementFocusIn=handleElementFocusChange.bind(null,true);
var handleElementFocusOut=handleElementFocusChange.bind(null,false);
ko.utils.registerEventHandler(element,"focus",handleElementFocusIn);
ko.utils.registerEventHandler(element,"focusin",handleElementFocusIn);
ko.utils.registerEventHandler(element,"blur",handleElementFocusOut);
ko.utils.registerEventHandler(element,"focusout",handleElementFocusOut)
},update:function(element,valueAccessor){var value=!!ko.utils.unwrapObservable(valueAccessor());
if(!element[hasfocusUpdatingProperty]&&element[hasfocusLastValue]!==value){value?element.focus():element.blur();
ko.dependencyDetection.ignore(ko.utils.triggerEvent,null,[element,value?"focusin":"focusout"])
}}};
ko.expressionRewriting.twoWayBindings.hasfocus=true;
ko.bindingHandlers.hasFocus=ko.bindingHandlers.hasfocus;
ko.expressionRewriting.twoWayBindings.hasFocus=true;
ko.bindingHandlers.html={init:function(){return{controlsDescendantBindings:true}
},update:function(element,valueAccessor){ko.utils.setHtml(element,valueAccessor())
}};
function makeWithIfBinding(bindingKey,isWith,isNot,makeContextCallback){ko.bindingHandlers[bindingKey]={init:function(element,valueAccessor,allBindings,viewModel,bindingContext){var didDisplayOnLastUpdate,savedNodes;
ko.computed(function(){var dataValue=ko.utils.unwrapObservable(valueAccessor()),shouldDisplay=!isNot!==!dataValue,isFirstRender=!savedNodes,needsRefresh=isFirstRender||isWith||(shouldDisplay!==didDisplayOnLastUpdate);
if(needsRefresh){if(isFirstRender&&ko.computedContext.getDependenciesCount()){savedNodes=ko.utils.cloneNodes(ko.virtualElements.childNodes(element),true)
}if(shouldDisplay){if(!isFirstRender){ko.virtualElements.setDomNodeChildren(element,ko.utils.cloneNodes(savedNodes))
}ko.applyBindingsToDescendants(makeContextCallback?makeContextCallback(bindingContext,dataValue):bindingContext,element)
}else{ko.virtualElements.emptyNode(element)
}didDisplayOnLastUpdate=shouldDisplay
}},null,{disposeWhenNodeIsRemoved:element});
return{controlsDescendantBindings:true}
}};
ko.expressionRewriting.bindingRewriteValidators[bindingKey]=false;
ko.virtualElements.allowedBindings[bindingKey]=true
}makeWithIfBinding("if");
makeWithIfBinding("ifnot",false,true);
makeWithIfBinding("with",true,false,function(bindingContext,dataValue){return bindingContext.createChildContext(dataValue)
});
var captionPlaceholder={};
ko.bindingHandlers.options={init:function(element){if(ko.utils.tagNameLower(element)!=="select"){throw new Error("options binding applies only to SELECT elements")
}while(element.length>0){element.remove(0)
}return{controlsDescendantBindings:true}
},update:function(element,valueAccessor,allBindings){function selectedOptions(){return ko.utils.arrayFilter(element.options,function(node){return node.selected
})
}var selectWasPreviouslyEmpty=element.length==0;
var previousScrollTop=(!selectWasPreviouslyEmpty&&element.multiple)?element.scrollTop:null;
var unwrappedArray=ko.utils.unwrapObservable(valueAccessor());
var includeDestroyed=allBindings.get("optionsIncludeDestroyed");
var arrayToDomNodeChildrenOptions={};
var captionValue;
var filteredArray;
var previousSelectedValues;
if(element.multiple){previousSelectedValues=ko.utils.arrayMap(selectedOptions(),ko.selectExtensions.readValue)
}else{previousSelectedValues=element.selectedIndex>=0?[ko.selectExtensions.readValue(element.options[element.selectedIndex])]:[]
}if(unwrappedArray){if(typeof unwrappedArray.length=="undefined"){unwrappedArray=[unwrappedArray]
}filteredArray=ko.utils.arrayFilter(unwrappedArray,function(item){return includeDestroyed||item===undefined||item===null||!ko.utils.unwrapObservable(item._destroy)
});
if(allBindings.has("optionsCaption")){captionValue=ko.utils.unwrapObservable(allBindings.get("optionsCaption"));
if(captionValue!==null&&captionValue!==undefined){filteredArray.unshift(captionPlaceholder)
}}}else{}function applyToObject(object,predicate,defaultValue){var predicateType=typeof predicate;
if(predicateType=="function"){return predicate(object)
}else{if(predicateType=="string"){return object[predicate]
}else{return defaultValue
}}}var itemUpdate=false;
function optionForArrayItem(arrayEntry,index,oldOptions){if(oldOptions.length){previousSelectedValues=oldOptions[0].selected?[ko.selectExtensions.readValue(oldOptions[0])]:[];
itemUpdate=true
}var option=element.ownerDocument.createElement("option");
if(arrayEntry===captionPlaceholder){ko.utils.setTextContent(option,allBindings.get("optionsCaption"));
ko.selectExtensions.writeValue(option,undefined)
}else{var optionValue=applyToObject(arrayEntry,allBindings.get("optionsValue"),arrayEntry);
ko.selectExtensions.writeValue(option,ko.utils.unwrapObservable(optionValue));
var optionText=applyToObject(arrayEntry,allBindings.get("optionsText"),optionValue);
ko.utils.setTextContent(option,optionText)
}return[option]
}arrayToDomNodeChildrenOptions.beforeRemove=function(option){element.removeChild(option)
};
function setSelectionCallback(arrayEntry,newOptions){if(previousSelectedValues.length){var isSelected=ko.utils.arrayIndexOf(previousSelectedValues,ko.selectExtensions.readValue(newOptions[0]))>=0;
ko.utils.setOptionNodeSelectionState(newOptions[0],isSelected);
if(itemUpdate&&!isSelected){ko.dependencyDetection.ignore(ko.utils.triggerEvent,null,[element,"change"])
}}}var callback=setSelectionCallback;
if(allBindings.has("optionsAfterRender")){callback=function(arrayEntry,newOptions){setSelectionCallback(arrayEntry,newOptions);
ko.dependencyDetection.ignore(allBindings.get("optionsAfterRender"),null,[newOptions[0],arrayEntry!==captionPlaceholder?arrayEntry:undefined])
}
}ko.utils.setDomNodeChildrenFromArrayMapping(element,filteredArray,optionForArrayItem,arrayToDomNodeChildrenOptions,callback);
ko.dependencyDetection.ignore(function(){if(allBindings.get("valueAllowUnset")&&allBindings.has("value")){ko.selectExtensions.writeValue(element,ko.utils.unwrapObservable(allBindings.get("value")),true)
}else{var selectionChanged;
if(element.multiple){selectionChanged=previousSelectedValues.length&&selectedOptions().length<previousSelectedValues.length
}else{selectionChanged=(previousSelectedValues.length&&element.selectedIndex>=0)?(ko.selectExtensions.readValue(element.options[element.selectedIndex])!==previousSelectedValues[0]):(previousSelectedValues.length||element.selectedIndex>=0)
}if(selectionChanged){ko.utils.triggerEvent(element,"change")
}}});
ko.utils.ensureSelectElementIsRenderedCorrectly(element);
if(previousScrollTop&&Math.abs(previousScrollTop-element.scrollTop)>20){element.scrollTop=previousScrollTop
}}};
ko.bindingHandlers.options.optionValueDomDataKey=ko.utils.domData.nextKey();
ko.bindingHandlers.selectedOptions={after:["options","foreach"],init:function(element,valueAccessor,allBindings){ko.utils.registerEventHandler(element,"change",function(){var value=valueAccessor(),valueToWrite=[];
ko.utils.arrayForEach(element.getElementsByTagName("option"),function(node){if(node.selected){valueToWrite.push(ko.selectExtensions.readValue(node))
}});
ko.expressionRewriting.writeValueToProperty(value,allBindings,"selectedOptions",valueToWrite)
})
},update:function(element,valueAccessor){if(ko.utils.tagNameLower(element)!="select"){throw new Error("values binding applies only to SELECT elements")
}var newValue=ko.utils.unwrapObservable(valueAccessor());
if(newValue&&typeof newValue.length=="number"){ko.utils.arrayForEach(element.getElementsByTagName("option"),function(node){var isSelected=ko.utils.arrayIndexOf(newValue,ko.selectExtensions.readValue(node))>=0;
ko.utils.setOptionNodeSelectionState(node,isSelected)
})
}}};
ko.expressionRewriting.twoWayBindings.selectedOptions=true;
ko.bindingHandlers.style={update:function(element,valueAccessor){var value=ko.utils.unwrapObservable(valueAccessor()||{});
ko.utils.objectForEach(value,function(styleName,styleValue){styleValue=ko.utils.unwrapObservable(styleValue);
if(styleValue===null||styleValue===undefined||styleValue===false){styleValue=""
}element.style[styleName]=styleValue
})
}};
ko.bindingHandlers.submit={init:function(element,valueAccessor,allBindings,viewModel,bindingContext){if(typeof valueAccessor()!="function"){throw new Error("The value for a submit binding must be a function")
}ko.utils.registerEventHandler(element,"submit",function(event){var handlerReturnValue;
var value=valueAccessor();
try{handlerReturnValue=value.call(bindingContext["$data"],element)
}finally{if(handlerReturnValue!==true){if(event.preventDefault){event.preventDefault()
}else{event.returnValue=false
}}}})
}};
ko.bindingHandlers.text={init:function(){return{controlsDescendantBindings:true}
},update:function(element,valueAccessor){ko.utils.setTextContent(element,valueAccessor())
}};
ko.virtualElements.allowedBindings.text=true;
(function(){if(window&&window.navigator){var parseVersion=function(matches){if(matches){return parseFloat(matches[1])
}};
var operaVersion=window.opera&&window.opera.version&&parseInt(window.opera.version()),userAgent=window.navigator.userAgent,safariVersion=parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),firefoxVersion=parseVersion(userAgent.match(/Firefox\/([^ ]*)/))
}if(ko.utils.ieVersion<10){var selectionChangeRegisteredName=ko.utils.domData.nextKey(),selectionChangeHandlerName=ko.utils.domData.nextKey();
var selectionChangeHandler=function(event){var target=this.activeElement,handler=target&&ko.utils.domData.get(target,selectionChangeHandlerName);
if(handler){handler(event)
}};
var registerForSelectionChangeEvent=function(element,handler){var ownerDoc=element.ownerDocument;
if(!ko.utils.domData.get(ownerDoc,selectionChangeRegisteredName)){ko.utils.domData.set(ownerDoc,selectionChangeRegisteredName,true);
ko.utils.registerEventHandler(ownerDoc,"selectionchange",selectionChangeHandler)
}ko.utils.domData.set(element,selectionChangeHandlerName,handler)
}
}ko.bindingHandlers.textInput={init:function(element,valueAccessor,allBindings){var previousElementValue=element.value,timeoutHandle,elementValueBeforeEvent;
var updateModel=function(event){clearTimeout(timeoutHandle);
elementValueBeforeEvent=timeoutHandle=undefined;
var elementValue=element.value;
if(previousElementValue!==elementValue){if(DEBUG&&event){element._ko_textInputProcessedEvent=event.type
}previousElementValue=elementValue;
ko.expressionRewriting.writeValueToProperty(valueAccessor(),allBindings,"textInput",elementValue)
}};
var deferUpdateModel=function(event){if(!timeoutHandle){elementValueBeforeEvent=element.value;
var handler=DEBUG?updateModel.bind(element,{type:event.type}):updateModel;
timeoutHandle=setTimeout(handler,4)
}};
var updateView=function(){var modelValue=ko.utils.unwrapObservable(valueAccessor());
if(modelValue===null||modelValue===undefined){modelValue=""
}if(elementValueBeforeEvent!==undefined&&modelValue===elementValueBeforeEvent){setTimeout(updateView,4);
return
}if(element.value!==modelValue){previousElementValue=modelValue;
element.value=modelValue
}};
var onEvent=function(event,handler){ko.utils.registerEventHandler(element,event,handler)
};
if(DEBUG&&ko.bindingHandlers.textInput["_forceUpdateOn"]){ko.utils.arrayForEach(ko.bindingHandlers.textInput["_forceUpdateOn"],function(eventName){if(eventName.slice(0,5)=="after"){onEvent(eventName.slice(5),deferUpdateModel)
}else{onEvent(eventName,updateModel)
}})
}else{if(ko.utils.ieVersion<10){onEvent("propertychange",function(event){if(event.propertyName==="value"){updateModel(event)
}});
if(ko.utils.ieVersion==8){onEvent("keyup",updateModel);
onEvent("keydown",updateModel)
}if(ko.utils.ieVersion>=8){registerForSelectionChangeEvent(element,updateModel);
onEvent("dragend",deferUpdateModel)
}}else{onEvent("input",updateModel);
if(safariVersion<5&&ko.utils.tagNameLower(element)==="textarea"){onEvent("keydown",deferUpdateModel);
onEvent("paste",deferUpdateModel);
onEvent("cut",deferUpdateModel)
}else{if(operaVersion<11){onEvent("keydown",deferUpdateModel)
}else{if(firefoxVersion<4){onEvent("DOMAutoComplete",updateModel);
onEvent("dragdrop",updateModel);
onEvent("drop",updateModel)
}}}}}onEvent("change",updateModel);
ko.computed(updateView,null,{disposeWhenNodeIsRemoved:element})
}};
ko.expressionRewriting.twoWayBindings.textInput=true;
ko.bindingHandlers.textinput={preprocess:function(value,name,addBinding){addBinding("textInput",value)
}}
})();
ko.bindingHandlers.uniqueName={init:function(element,valueAccessor){if(valueAccessor()){var name="ko_unique_"+(++ko.bindingHandlers.uniqueName.currentIndex);
ko.utils.setElementName(element,name)
}}};
ko.bindingHandlers.uniqueName.currentIndex=0;
ko.bindingHandlers.value={after:["options","foreach"],init:function(element,valueAccessor,allBindings){if(element.tagName.toLowerCase()=="input"&&(element.type=="checkbox"||element.type=="radio")){ko.applyBindingAccessorsToNode(element,{checkedValue:valueAccessor});
return
}var eventsToCatch=["change"];
var requestedEventsToCatch=allBindings.get("valueUpdate");
var propertyChangedFired=false;
var elementValueBeforeEvent=null;
if(requestedEventsToCatch){if(typeof requestedEventsToCatch=="string"){requestedEventsToCatch=[requestedEventsToCatch]
}ko.utils.arrayPushAll(eventsToCatch,requestedEventsToCatch);
eventsToCatch=ko.utils.arrayGetDistinctValues(eventsToCatch)
}var valueUpdateHandler=function(){elementValueBeforeEvent=null;
propertyChangedFired=false;
var modelValue=valueAccessor();
var elementValue=ko.selectExtensions.readValue(element);
ko.expressionRewriting.writeValueToProperty(modelValue,allBindings,"value",elementValue)
};
var ieAutoCompleteHackNeeded=ko.utils.ieVersion&&element.tagName.toLowerCase()=="input"&&element.type=="text"&&element.autocomplete!="off"&&(!element.form||element.form.autocomplete!="off");
if(ieAutoCompleteHackNeeded&&ko.utils.arrayIndexOf(eventsToCatch,"propertychange")==-1){ko.utils.registerEventHandler(element,"propertychange",function(){propertyChangedFired=true
});
ko.utils.registerEventHandler(element,"focus",function(){propertyChangedFired=false
});
ko.utils.registerEventHandler(element,"blur",function(){if(propertyChangedFired){valueUpdateHandler()
}})
}ko.utils.arrayForEach(eventsToCatch,function(eventName){var handler=valueUpdateHandler;
if(ko.utils.stringStartsWith(eventName,"after")){handler=function(){elementValueBeforeEvent=ko.selectExtensions.readValue(element);
setTimeout(valueUpdateHandler,0)
};
eventName=eventName.substring("after".length)
}ko.utils.registerEventHandler(element,eventName,handler)
});
var updateFromModel=function(){var newValue=ko.utils.unwrapObservable(valueAccessor());
var elementValue=ko.selectExtensions.readValue(element);
if(elementValueBeforeEvent!==null&&newValue===elementValueBeforeEvent){setTimeout(updateFromModel,0);
return
}var valueHasChanged=(newValue!==elementValue);
if(valueHasChanged){if(ko.utils.tagNameLower(element)==="select"){var allowUnset=allBindings.get("valueAllowUnset");
var applyValueAction=function(){ko.selectExtensions.writeValue(element,newValue,allowUnset)
};
applyValueAction();
if(!allowUnset&&newValue!==ko.selectExtensions.readValue(element)){ko.dependencyDetection.ignore(ko.utils.triggerEvent,null,[element,"change"])
}else{setTimeout(applyValueAction,0)
}}else{ko.selectExtensions.writeValue(element,newValue)
}}};
ko.computed(updateFromModel,null,{disposeWhenNodeIsRemoved:element})
},update:function(){}};
ko.expressionRewriting.twoWayBindings.value=true;
ko.bindingHandlers.visible={update:function(element,valueAccessor){var value=ko.utils.unwrapObservable(valueAccessor());
var isCurrentlyVisible=!(element.style.display=="none");
if(value&&!isCurrentlyVisible){element.style.display=""
}else{if((!value)&&isCurrentlyVisible){element.style.display="none"
}}}};
makeEventHandlerShortcut("click");
ko.templateEngine=function(){};
ko.templateEngine.prototype.renderTemplateSource=function(templateSource,bindingContext,options){throw new Error("Override renderTemplateSource")
};
ko.templateEngine.prototype.createJavaScriptEvaluatorBlock=function(script){throw new Error("Override createJavaScriptEvaluatorBlock")
};
ko.templateEngine.prototype.makeTemplateSource=function(template,templateDocument){if(typeof template=="string"){templateDocument=templateDocument||document;
var elem=templateDocument.getElementById(template);
if(!elem){throw new Error("Cannot find template with ID "+template)
}return new ko.templateSources.domElement(elem)
}else{if((template.nodeType==1)||(template.nodeType==8)){return new ko.templateSources.anonymousTemplate(template)
}else{throw new Error("Unknown template type: "+template)
}}};
ko.templateEngine.prototype.renderTemplate=function(template,bindingContext,options,templateDocument){var templateSource=this["makeTemplateSource"](template,templateDocument);
return this["renderTemplateSource"](templateSource,bindingContext,options)
};
ko.templateEngine.prototype.isTemplateRewritten=function(template,templateDocument){if(this["allowTemplateRewriting"]===false){return true
}return this["makeTemplateSource"](template,templateDocument)["data"]("isRewritten")
};
ko.templateEngine.prototype.rewriteTemplate=function(template,rewriterCallback,templateDocument){var templateSource=this["makeTemplateSource"](template,templateDocument);
var rewritten=rewriterCallback(templateSource.text());
templateSource.text(rewritten);
templateSource.data("isRewritten",true)
};
ko.exportSymbol("templateEngine",ko.templateEngine);
ko.templateRewriting=(function(){var memoizeDataBindingAttributeSyntaxRegex=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi;
var memoizeVirtualContainerBindingSyntaxRegex=/<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;
function validateDataBindValuesForRewriting(keyValueArray){var allValidators=ko.expressionRewriting.bindingRewriteValidators;
for(var i=0;
i<keyValueArray.length;
i++){var key=keyValueArray[i]["key"];
if(allValidators.hasOwnProperty(key)){var validator=allValidators[key];
if(typeof validator==="function"){var possibleErrorMessage=validator(keyValueArray[i]["value"]);
if(possibleErrorMessage){throw new Error(possibleErrorMessage)
}}else{if(!validator){throw new Error("This template engine does not support the '"+key+"' binding within its templates")
}}}}}function constructMemoizedTagReplacement(dataBindAttributeValue,tagToRetain,nodeName,templateEngine){var dataBindKeyValueArray=ko.expressionRewriting.parseObjectLiteral(dataBindAttributeValue);
validateDataBindValuesForRewriting(dataBindKeyValueArray);
var rewrittenDataBindAttributeValue=ko.expressionRewriting.preProcessBindings(dataBindKeyValueArray,{valueAccessors:true});
var applyBindingsToNextSiblingScript="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+rewrittenDataBindAttributeValue+" } })()},'"+nodeName.toLowerCase()+"')";
return templateEngine.createJavaScriptEvaluatorBlock(applyBindingsToNextSiblingScript)+tagToRetain
}return{ensureTemplateIsRewritten:function(template,templateEngine,templateDocument){if(!templateEngine.isTemplateRewritten(template,templateDocument)){templateEngine.rewriteTemplate(template,function(htmlString){return ko.templateRewriting.memoizeBindingAttributeSyntax(htmlString,templateEngine)
},templateDocument)
}},memoizeBindingAttributeSyntax:function(htmlString,templateEngine){return htmlString.replace(memoizeDataBindingAttributeSyntaxRegex,function(){return constructMemoizedTagReplacement(arguments[4],arguments[1],arguments[2],templateEngine)
}).replace(memoizeVirtualContainerBindingSyntaxRegex,function(){return constructMemoizedTagReplacement(arguments[1],"<!-- ko -->","#comment",templateEngine)
})
},applyMemoizedBindingsToNextSibling:function(bindings,nodeName){return ko.memoization.memoize(function(domNode,bindingContext){var nodeToBind=domNode.nextSibling;
if(nodeToBind&&nodeToBind.nodeName.toLowerCase()===nodeName){ko.applyBindingAccessorsToNode(nodeToBind,bindings,bindingContext)
}})
}}
})();
ko.exportSymbol("__tr_ambtns",ko.templateRewriting.applyMemoizedBindingsToNextSibling);
(function(){ko.templateSources={};
ko.templateSources.domElement=function(element){this.domElement=element
};
ko.templateSources.domElement.prototype.text=function(){var tagNameLower=ko.utils.tagNameLower(this.domElement),elemContentsProperty=tagNameLower==="script"?"text":tagNameLower==="textarea"?"value":"innerHTML";
if(arguments.length==0){return this.domElement[elemContentsProperty]
}else{var valueToWrite=arguments[0];
if(elemContentsProperty==="innerHTML"){ko.utils.setHtml(this.domElement,valueToWrite)
}else{this.domElement[elemContentsProperty]=valueToWrite
}}};
var dataDomDataPrefix=ko.utils.domData.nextKey()+"_";
ko.templateSources.domElement.prototype.data=function(key){if(arguments.length===1){return ko.utils.domData.get(this.domElement,dataDomDataPrefix+key)
}else{ko.utils.domData.set(this.domElement,dataDomDataPrefix+key,arguments[1])
}};
var anonymousTemplatesDomDataKey=ko.utils.domData.nextKey();
ko.templateSources.anonymousTemplate=function(element){this.domElement=element
};
ko.templateSources.anonymousTemplate.prototype=new ko.templateSources.domElement();
ko.templateSources.anonymousTemplate.prototype.constructor=ko.templateSources.anonymousTemplate;
ko.templateSources.anonymousTemplate.prototype.text=function(){if(arguments.length==0){var templateData=ko.utils.domData.get(this.domElement,anonymousTemplatesDomDataKey)||{};
if(templateData.textData===undefined&&templateData.containerData){templateData.textData=templateData.containerData.innerHTML
}return templateData.textData
}else{var valueToWrite=arguments[0];
ko.utils.domData.set(this.domElement,anonymousTemplatesDomDataKey,{textData:valueToWrite})
}};
ko.templateSources.domElement.prototype.nodes=function(){if(arguments.length==0){var templateData=ko.utils.domData.get(this.domElement,anonymousTemplatesDomDataKey)||{};
return templateData.containerData
}else{var valueToWrite=arguments[0];
ko.utils.domData.set(this.domElement,anonymousTemplatesDomDataKey,{containerData:valueToWrite})
}};
ko.exportSymbol("templateSources",ko.templateSources);
ko.exportSymbol("templateSources.domElement",ko.templateSources.domElement);
ko.exportSymbol("templateSources.anonymousTemplate",ko.templateSources.anonymousTemplate)
})();
(function(){var _templateEngine;
ko.setTemplateEngine=function(templateEngine){if((templateEngine!=undefined)&&!(templateEngine instanceof ko.templateEngine)){throw new Error("templateEngine must inherit from ko.templateEngine")
}_templateEngine=templateEngine
};
function invokeForEachNodeInContinuousRange(firstNode,lastNode,action){var node,nextInQueue=firstNode,firstOutOfRangeNode=ko.virtualElements.nextSibling(lastNode);
while(nextInQueue&&((node=nextInQueue)!==firstOutOfRangeNode)){nextInQueue=ko.virtualElements.nextSibling(node);
action(node,nextInQueue)
}}function activateBindingsOnContinuousNodeArray(continuousNodeArray,bindingContext){if(continuousNodeArray.length){var firstNode=continuousNodeArray[0],lastNode=continuousNodeArray[continuousNodeArray.length-1],parentNode=firstNode.parentNode,provider=ko.bindingProvider.instance,preprocessNode=provider.preprocessNode;
if(preprocessNode){invokeForEachNodeInContinuousRange(firstNode,lastNode,function(node,nextNodeInRange){var nodePreviousSibling=node.previousSibling;
var newNodes=preprocessNode.call(provider,node);
if(newNodes){if(node===firstNode){firstNode=newNodes[0]||nextNodeInRange
}if(node===lastNode){lastNode=newNodes[newNodes.length-1]||nodePreviousSibling
}}});
continuousNodeArray.length=0;
if(!firstNode){return
}if(firstNode===lastNode){continuousNodeArray.push(firstNode)
}else{continuousNodeArray.push(firstNode,lastNode);
ko.utils.fixUpContinuousNodeArray(continuousNodeArray,parentNode)
}}invokeForEachNodeInContinuousRange(firstNode,lastNode,function(node){if(node.nodeType===1||node.nodeType===8){ko.applyBindings(bindingContext,node)
}});
invokeForEachNodeInContinuousRange(firstNode,lastNode,function(node){if(node.nodeType===1||node.nodeType===8){ko.memoization.unmemoizeDomNodeAndDescendants(node,[bindingContext])
}});
ko.utils.fixUpContinuousNodeArray(continuousNodeArray,parentNode)
}}function getFirstNodeFromPossibleArray(nodeOrNodeArray){return nodeOrNodeArray.nodeType?nodeOrNodeArray:nodeOrNodeArray.length>0?nodeOrNodeArray[0]:null
}function executeTemplate(targetNodeOrNodeArray,renderMode,template,bindingContext,options){options=options||{};
var firstTargetNode=targetNodeOrNodeArray&&getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
var templateDocument=firstTargetNode&&firstTargetNode.ownerDocument;
var templateEngineToUse=(options.templateEngine||_templateEngine);
ko.templateRewriting.ensureTemplateIsRewritten(template,templateEngineToUse,templateDocument);
var renderedNodesArray=templateEngineToUse.renderTemplate(template,bindingContext,options,templateDocument);
if((typeof renderedNodesArray.length!="number")||(renderedNodesArray.length>0&&typeof renderedNodesArray[0].nodeType!="number")){throw new Error("Template engine must return an array of DOM nodes")
}var haveAddedNodesToParent=false;
switch(renderMode){case"replaceChildren":ko.virtualElements.setDomNodeChildren(targetNodeOrNodeArray,renderedNodesArray);
haveAddedNodesToParent=true;
break;
case"replaceNode":ko.utils.replaceDomNodes(targetNodeOrNodeArray,renderedNodesArray);
haveAddedNodesToParent=true;
break;
case"ignoreTargetNode":break;
default:throw new Error("Unknown renderMode: "+renderMode)
}if(haveAddedNodesToParent){activateBindingsOnContinuousNodeArray(renderedNodesArray,bindingContext);
if(options.afterRender){ko.dependencyDetection.ignore(options.afterRender,null,[renderedNodesArray,bindingContext["$data"]])
}}return renderedNodesArray
}function resolveTemplateName(template,data,context){if(ko.isObservable(template)){return template()
}else{if(typeof template==="function"){return template(data,context)
}else{return template
}}}ko.renderTemplate=function(template,dataOrBindingContext,options,targetNodeOrNodeArray,renderMode){options=options||{};
if((options.templateEngine||_templateEngine)==undefined){throw new Error("Set a template engine before calling renderTemplate")
}renderMode=renderMode||"replaceChildren";
if(targetNodeOrNodeArray){var firstTargetNode=getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
var whenToDispose=function(){return(!firstTargetNode)||!ko.utils.domNodeIsAttachedToDocument(firstTargetNode)
};
var activelyDisposeWhenNodeIsRemoved=(firstTargetNode&&renderMode=="replaceNode")?firstTargetNode.parentNode:firstTargetNode;
return ko.dependentObservable(function(){var bindingContext=(dataOrBindingContext&&(dataOrBindingContext instanceof ko.bindingContext))?dataOrBindingContext:new ko.bindingContext(ko.utils.unwrapObservable(dataOrBindingContext));
var templateName=resolveTemplateName(template,bindingContext["$data"],bindingContext),renderedNodesArray=executeTemplate(targetNodeOrNodeArray,renderMode,templateName,bindingContext,options);
if(renderMode=="replaceNode"){targetNodeOrNodeArray=renderedNodesArray;
firstTargetNode=getFirstNodeFromPossibleArray(targetNodeOrNodeArray)
}},null,{disposeWhen:whenToDispose,disposeWhenNodeIsRemoved:activelyDisposeWhenNodeIsRemoved})
}else{return ko.memoization.memoize(function(domNode){ko.renderTemplate(template,dataOrBindingContext,options,domNode,"replaceNode")
})
}};
ko.renderTemplateForEach=function(template,arrayOrObservableArray,options,targetNode,parentBindingContext){var arrayItemContext;
var executeTemplateForArrayItem=function(arrayValue,index){arrayItemContext=parentBindingContext.createChildContext(arrayValue,options.as,function(context){context["$index"]=index
});
var templateName=resolveTemplateName(template,arrayValue,arrayItemContext);
return executeTemplate(null,"ignoreTargetNode",templateName,arrayItemContext,options)
};
var activateBindingsCallback=function(arrayValue,addedNodesArray,index){activateBindingsOnContinuousNodeArray(addedNodesArray,arrayItemContext);
if(options.afterRender){options.afterRender(addedNodesArray,arrayValue)
}};
return ko.dependentObservable(function(){var unwrappedArray=ko.utils.unwrapObservable(arrayOrObservableArray)||[];
if(typeof unwrappedArray.length=="undefined"){unwrappedArray=[unwrappedArray]
}var filteredArray=ko.utils.arrayFilter(unwrappedArray,function(item){return options.includeDestroyed||item===undefined||item===null||!ko.utils.unwrapObservable(item._destroy)
});
ko.dependencyDetection.ignore(ko.utils.setDomNodeChildrenFromArrayMapping,null,[targetNode,filteredArray,executeTemplateForArrayItem,options,activateBindingsCallback])
},null,{disposeWhenNodeIsRemoved:targetNode})
};
var templateComputedDomDataKey=ko.utils.domData.nextKey();
function disposeOldComputedAndStoreNewOne(element,newComputed){var oldComputed=ko.utils.domData.get(element,templateComputedDomDataKey);
if(oldComputed&&(typeof(oldComputed.dispose)=="function")){oldComputed.dispose()
}ko.utils.domData.set(element,templateComputedDomDataKey,(newComputed&&newComputed.isActive())?newComputed:undefined)
}ko.bindingHandlers.template={init:function(element,valueAccessor){var bindingValue=ko.utils.unwrapObservable(valueAccessor());
if(typeof bindingValue=="string"||bindingValue.name){ko.virtualElements.emptyNode(element)
}else{var templateNodes=ko.virtualElements.childNodes(element),container=ko.utils.moveCleanedNodesToContainerElement(templateNodes);
new ko.templateSources.anonymousTemplate(element)["nodes"](container)
}return{controlsDescendantBindings:true}
},update:function(element,valueAccessor,allBindings,viewModel,bindingContext){var value=valueAccessor(),dataValue,options=ko.utils.unwrapObservable(value),shouldDisplay=true,templateComputed=null,templateName;
if(typeof options=="string"){templateName=value;
options={}
}else{templateName=options.name;
if("if" in options){shouldDisplay=ko.utils.unwrapObservable(options["if"])
}if(shouldDisplay&&"ifnot" in options){shouldDisplay=!ko.utils.unwrapObservable(options.ifnot)
}dataValue=ko.utils.unwrapObservable(options.data)
}if("foreach" in options){var dataArray=(shouldDisplay&&options.foreach)||[];
templateComputed=ko.renderTemplateForEach(templateName||element,dataArray,options,element,bindingContext)
}else{if(!shouldDisplay){ko.virtualElements.emptyNode(element)
}else{var innerBindingContext=("data" in options)?bindingContext.createChildContext(dataValue,options.as):bindingContext;
templateComputed=ko.renderTemplate(templateName||element,innerBindingContext,options,element)
}}disposeOldComputedAndStoreNewOne(element,templateComputed)
}};
ko.expressionRewriting.bindingRewriteValidators.template=function(bindingValue){var parsedBindingValue=ko.expressionRewriting.parseObjectLiteral(bindingValue);
if((parsedBindingValue.length==1)&&parsedBindingValue[0]["unknown"]){return null
}if(ko.expressionRewriting.keyValueArrayContainsKey(parsedBindingValue,"name")){return null
}return"This template engine does not support anonymous templates nested within its templates"
};
ko.virtualElements.allowedBindings.template=true
})();
ko.exportSymbol("setTemplateEngine",ko.setTemplateEngine);
ko.exportSymbol("renderTemplate",ko.renderTemplate);
ko.utils.findMovesInArrayComparison=function(left,right,limitFailedCompares){if(left.length&&right.length){var failedCompares,l,r,leftItem,rightItem;
for(failedCompares=l=0;
(!limitFailedCompares||failedCompares<limitFailedCompares)&&(leftItem=left[l]);
++l){for(r=0;
rightItem=right[r];
++r){if(leftItem.value===rightItem.value){leftItem.moved=rightItem.index;
rightItem.moved=leftItem.index;
right.splice(r,1);
failedCompares=r=0;
break
}}failedCompares+=r
}}};
ko.utils.compareArrays=(function(){var statusNotInOld="added",statusNotInNew="deleted";
function compareArrays(oldArray,newArray,options){options=(typeof options==="boolean")?{dontLimitMoves:options}:(options||{});
oldArray=oldArray||[];
newArray=newArray||[];
if(oldArray.length<=newArray.length){return compareSmallArrayToBigArray(oldArray,newArray,statusNotInOld,statusNotInNew,options)
}else{return compareSmallArrayToBigArray(newArray,oldArray,statusNotInNew,statusNotInOld,options)
}}function compareSmallArrayToBigArray(smlArray,bigArray,statusNotInSml,statusNotInBig,options){var myMin=Math.min,myMax=Math.max,editDistanceMatrix=[],smlIndex,smlIndexMax=smlArray.length,bigIndex,bigIndexMax=bigArray.length,compareRange=(bigIndexMax-smlIndexMax)||1,maxDistance=smlIndexMax+bigIndexMax+1,thisRow,lastRow,bigIndexMaxForRow,bigIndexMinForRow;
for(smlIndex=0;
smlIndex<=smlIndexMax;
smlIndex++){lastRow=thisRow;
editDistanceMatrix.push(thisRow=[]);
bigIndexMaxForRow=myMin(bigIndexMax,smlIndex+compareRange);
bigIndexMinForRow=myMax(0,smlIndex-1);
for(bigIndex=bigIndexMinForRow;
bigIndex<=bigIndexMaxForRow;
bigIndex++){if(!bigIndex){thisRow[bigIndex]=smlIndex+1
}else{if(!smlIndex){thisRow[bigIndex]=bigIndex+1
}else{if(smlArray[smlIndex-1]===bigArray[bigIndex-1]){thisRow[bigIndex]=lastRow[bigIndex-1]
}else{var northDistance=lastRow[bigIndex]||maxDistance;
var westDistance=thisRow[bigIndex-1]||maxDistance;
thisRow[bigIndex]=myMin(northDistance,westDistance)+1
}}}}}var editScript=[],meMinusOne,notInSml=[],notInBig=[];
for(smlIndex=smlIndexMax,bigIndex=bigIndexMax;
smlIndex||bigIndex;
){meMinusOne=editDistanceMatrix[smlIndex][bigIndex]-1;
if(bigIndex&&meMinusOne===editDistanceMatrix[smlIndex][bigIndex-1]){notInSml.push(editScript[editScript.length]={status:statusNotInSml,value:bigArray[--bigIndex],index:bigIndex})
}else{if(smlIndex&&meMinusOne===editDistanceMatrix[smlIndex-1][bigIndex]){notInBig.push(editScript[editScript.length]={status:statusNotInBig,value:smlArray[--smlIndex],index:smlIndex})
}else{--bigIndex;
--smlIndex;
if(!options.sparse){editScript.push({status:"retained",value:bigArray[bigIndex]})
}}}}ko.utils.findMovesInArrayComparison(notInSml,notInBig,smlIndexMax*10);
return editScript.reverse()
}return compareArrays
})();
ko.exportSymbol("utils.compareArrays",ko.utils.compareArrays);
(function(){function mapNodeAndRefreshWhenChanged(containerNode,mapping,valueToMap,callbackAfterAddingNodes,index){var mappedNodes=[];
var dependentObservable=ko.dependentObservable(function(){var newMappedNodes=mapping(valueToMap,index,ko.utils.fixUpContinuousNodeArray(mappedNodes,containerNode))||[];
if(mappedNodes.length>0){ko.utils.replaceDomNodes(mappedNodes,newMappedNodes);
if(callbackAfterAddingNodes){ko.dependencyDetection.ignore(callbackAfterAddingNodes,null,[valueToMap,newMappedNodes,index])
}}mappedNodes.length=0;
ko.utils.arrayPushAll(mappedNodes,newMappedNodes)
},null,{disposeWhenNodeIsRemoved:containerNode,disposeWhen:function(){return !ko.utils.anyDomNodeIsAttachedToDocument(mappedNodes)
}});
return{mappedNodes:mappedNodes,dependentObservable:(dependentObservable.isActive()?dependentObservable:undefined)}
}var lastMappingResultDomDataKey=ko.utils.domData.nextKey();
ko.utils.setDomNodeChildrenFromArrayMapping=function(domNode,array,mapping,options,callbackAfterAddingNodes){array=array||[];
options=options||{};
var isFirstExecution=ko.utils.domData.get(domNode,lastMappingResultDomDataKey)===undefined;
var lastMappingResult=ko.utils.domData.get(domNode,lastMappingResultDomDataKey)||[];
var lastArray=ko.utils.arrayMap(lastMappingResult,function(x){return x.arrayEntry
});
var editScript=ko.utils.compareArrays(lastArray,array,options.dontLimitMoves);
var newMappingResult=[];
var lastMappingResultIndex=0;
var newMappingResultIndex=0;
var nodesToDelete=[];
var itemsToProcess=[];
var itemsForBeforeRemoveCallbacks=[];
var itemsForMoveCallbacks=[];
var itemsForAfterAddCallbacks=[];
var mapData;
function itemMovedOrRetained(editScriptIndex,oldPosition){mapData=lastMappingResult[oldPosition];
if(newMappingResultIndex!==oldPosition){itemsForMoveCallbacks[editScriptIndex]=mapData
}mapData.indexObservable(newMappingResultIndex++);
ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes,domNode);
newMappingResult.push(mapData);
itemsToProcess.push(mapData)
}function callCallback(callback,items){if(callback){for(var i=0,n=items.length;
i<n;
i++){if(items[i]){ko.utils.arrayForEach(items[i].mappedNodes,function(node){callback(node,i,items[i].arrayEntry)
})
}}}}for(var i=0,editScriptItem,movedIndex;
editScriptItem=editScript[i];
i++){movedIndex=editScriptItem.moved;
switch(editScriptItem.status){case"deleted":if(movedIndex===undefined){mapData=lastMappingResult[lastMappingResultIndex];
if(mapData.dependentObservable){mapData.dependentObservable.dispose()
}nodesToDelete.push.apply(nodesToDelete,ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes,domNode));
if(options.beforeRemove){itemsForBeforeRemoveCallbacks[i]=mapData;
itemsToProcess.push(mapData)
}}lastMappingResultIndex++;
break;
case"retained":itemMovedOrRetained(i,lastMappingResultIndex++);
break;
case"added":if(movedIndex!==undefined){itemMovedOrRetained(i,movedIndex)
}else{mapData={arrayEntry:editScriptItem.value,indexObservable:ko.observable(newMappingResultIndex++)};
newMappingResult.push(mapData);
itemsToProcess.push(mapData);
if(!isFirstExecution){itemsForAfterAddCallbacks[i]=mapData
}}break
}}callCallback(options.beforeMove,itemsForMoveCallbacks);
ko.utils.arrayForEach(nodesToDelete,options.beforeRemove?ko.cleanNode:ko.removeNode);
for(var i=0,nextNode=ko.virtualElements.firstChild(domNode),lastNode,node;
mapData=itemsToProcess[i];
i++){if(!mapData.mappedNodes){ko.utils.extend(mapData,mapNodeAndRefreshWhenChanged(domNode,mapping,mapData.arrayEntry,callbackAfterAddingNodes,mapData.indexObservable))
}for(var j=0;
node=mapData.mappedNodes[j];
nextNode=node.nextSibling,lastNode=node,j++){if(node!==nextNode){ko.virtualElements.insertAfter(domNode,node,lastNode)
}}if(!mapData.initialized&&callbackAfterAddingNodes){callbackAfterAddingNodes(mapData.arrayEntry,mapData.mappedNodes,mapData.indexObservable);
mapData.initialized=true
}}callCallback(options.beforeRemove,itemsForBeforeRemoveCallbacks);
callCallback(options.afterMove,itemsForMoveCallbacks);
callCallback(options.afterAdd,itemsForAfterAddCallbacks);
ko.utils.domData.set(domNode,lastMappingResultDomDataKey,newMappingResult)
}
})();
ko.exportSymbol("utils.setDomNodeChildrenFromArrayMapping",ko.utils.setDomNodeChildrenFromArrayMapping);
ko.nativeTemplateEngine=function(){this["allowTemplateRewriting"]=false
};
ko.nativeTemplateEngine.prototype=new ko.templateEngine();
ko.nativeTemplateEngine.prototype.constructor=ko.nativeTemplateEngine;
ko.nativeTemplateEngine.prototype.renderTemplateSource=function(templateSource,bindingContext,options){var useNodesIfAvailable=!(ko.utils.ieVersion<9),templateNodesFunc=useNodesIfAvailable?templateSource.nodes:null,templateNodes=templateNodesFunc?templateSource.nodes():null;
if(templateNodes){return ko.utils.makeArray(templateNodes.cloneNode(true).childNodes)
}else{var templateText=templateSource.text();
return ko.utils.parseHtmlFragment(templateText)
}};
ko.nativeTemplateEngine.instance=new ko.nativeTemplateEngine();
ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
ko.exportSymbol("nativeTemplateEngine",ko.nativeTemplateEngine);
(function(){ko.jqueryTmplTemplateEngine=function(){var jQueryTmplVersion=this.jQueryTmplVersion=(function(){if(!jQueryInstance||!(jQueryInstance.tmpl)){return 0
}try{if(jQueryInstance.tmpl["tag"]["tmpl"]["open"].toString().indexOf("__")>=0){return 2
}}catch(ex){}return 1
})();
function ensureHasReferencedJQueryTemplates(){if(jQueryTmplVersion<2){throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")
}}function executeTemplate(compiledTemplate,data,jQueryTemplateOptions){return jQueryInstance.tmpl(compiledTemplate,data,jQueryTemplateOptions)
}this["renderTemplateSource"]=function(templateSource,bindingContext,options){options=options||{};
ensureHasReferencedJQueryTemplates();
var precompiled=templateSource.data("precompiled");
if(!precompiled){var templateText=templateSource.text()||"";
templateText="{{ko_with $item.koBindingContext}}"+templateText+"{{/ko_with}}";
precompiled=jQueryInstance.template(null,templateText);
templateSource.data("precompiled",precompiled)
}var data=[bindingContext["$data"]];
var jQueryTemplateOptions=jQueryInstance.extend({koBindingContext:bindingContext},options.templateOptions);
var resultNodes=executeTemplate(precompiled,data,jQueryTemplateOptions);
resultNodes.appendTo(document.createElement("div"));
jQueryInstance.fragments={};
return resultNodes
};
this["createJavaScriptEvaluatorBlock"]=function(script){return"{{ko_code ((function() { return "+script+" })()) }}"
};
this["addTemplate"]=function(templateName,templateMarkup){document.write("<script type='text/html' id='"+templateName+"'>"+templateMarkup+"<\/script>")
};
if(jQueryTmplVersion>0){jQueryInstance.tmpl["tag"]["ko_code"]={open:"__.push($1 || '');"};
jQueryInstance.tmpl["tag"]["ko_with"]={open:"with($1) {",close:"} "}
}};
ko.jqueryTmplTemplateEngine.prototype=new ko.templateEngine();
ko.jqueryTmplTemplateEngine.prototype.constructor=ko.jqueryTmplTemplateEngine;
var jqueryTmplTemplateEngineInstance=new ko.jqueryTmplTemplateEngine();
if(jqueryTmplTemplateEngineInstance.jQueryTmplVersion>0){ko.setTemplateEngine(jqueryTmplTemplateEngineInstance)
}ko.exportSymbol("jqueryTmplTemplateEngine",ko.jqueryTmplTemplateEngine)
})()
}))
}())
})();
if(typeof finishPackedDefine==="function"){finishPackedDefine()
}if(typeof define==="function"&&define.amd){if(typeof jQuery!="undefined"){define("jquery",[],function(){return jQuery
});
if(jQuery.ui&&jQuery.ui.version&&jQuery.ui.resizable){define("jqueryui",["jquery"],function(){return jQuery
})
}}}(function(c,b){var a=function(g,d,e){var h;
return function f(){var k=this,j=arguments;
function i(){if(!e){g.apply(k,j)
}h=null
}if(h){clearTimeout(h)
}else{if(e){g.apply(k,j)
}}h=setTimeout(i,d||200)
}
};
jQuery.fn[b]=function(d){return d?this.bind("resize",a(d)):this.trigger(b)
}
}(jQuery,"smartresize"));
(function(a){a.fn.extend({acsData:function(b,c){if(arguments.length===0){var d={};
a(this).each(function(){a.each(this.attributes,function(){if(this.specified&&this.name.match(/acs\-.*/)){d[this.name.replace(/acs\-(.*)/,"$1")]=this.value
}})
});
return d
}else{if(arguments.length===1){var e=null;
a(this).each(function(){a.each(this.attributes,function(){var f=new RegExp("acs\\-"+b);
if(this.specified&&this.name.match(f)){e=this.value
}})
});
return e
}else{if(arguments.length===2){a(this).attr("acs-"+b,c)
}}}}})
}(jQuery));
(function(a){a.extend(a.expr[":"],{acsAttribute:function(d,c,f){if(f.length===4&&f[3]!==undefined){var e=f[3].split(","),b;
if(e.length>1){b="acs-"+e[0];
return a(d).attr(b)===e[1]
}else{b="acs-"+f[3];
return a(d).attr(b)!==undefined
}}return false
}})
}(jQuery));
(function(a){a.fn.equals=function(b){if(!b||this.length!==b.length){return false
}var c;
for(c=0;
c<this.length;
c+=1){if(this[c]!==b[c]){return false
}}return true
}
}(jQuery));
var pagination={};
pagination.activePagerLink=function(b){var a=$("#"+b);
if(a.length===0){a=$("[id*='"+b+"']")
}a.parent().parent().find(".border-blue").attr("class","m-r-5 af_commandLink");
a.attr("class","m-r-5 p-l-5 p-r-5 border-blue b-c-blue l-h-16 c-f")
};
pagination.disActivePagerLink=function(b){var a=$("#"+b);
if(a.length===0){a=$("[id*='"+b+"']")
}a.attr("class","m-r-5 af_commandLink")
};
pagination.setPagerLinkClass=function(c,b){var a=$("#"+c);
if(a.length===0){a=$("[id*='"+c+"']")
}a.attr("class",b)
};
pagination.otherPagerLink=function(b){var a=$("#"+b);
if(a.attr("id").indexOf("_BeforeDots")>-1){a.parent().parent().find(".m-r-5").each(function(){if($.isNumeric($(this).text())){var c=parseInt($(this).text(),10);
c=c-5;
$(this).text(c)
}})
}if(a.attr("id").indexOf("_AfterDots")>-1){a.parent().parent().find(".m-r-5").each(function(){if($.isNumeric($(this).text())){var c=parseInt($(this).text(),10);
c=c+5;
$(this).text(c)
}})
}};
pagination.hidePagination=function(b){var a=$("#"+b);
if(a.length===0){a=$("[id*='"+b+"']")
}a.hide()
};
var dataTableSort={};
dataTableSort.afterSort=function(b,a){if($("#"+b).parent().is("th")){if(a==="asc"){$("#"+b).find("i").attr("class","icon-angle-up p-t-5 p-a r-0 t-0")
}else{if(a==="desc"){$("#"+b).find("i").attr("class","icon-angle-down p-t-5 p-a r-0 t-0")
}}}};
var ACS={};
ITSP=ACS;
ACS.activeSubMenu=function(){$("li.mega").hover(function(){var b=$(this).find(".flipLeft"),c,a;
if(b.length===0){return
}b.show();
c=$(document).scrollLeft();
a=window.innerWidth+c;
if((b.offset().left+b.width())>a){b.offset({left:(a-b.width()-3)})
}},function(){$(this).find(".flipLeft").hide()
})
};
ACS.indicateSubMenu=function(a){$(".sub-navi li."+a).addClass("active")
};
ACS.activeSubMenuFocus=function(){$("a.sub").focus(function(){$(this).parents(".mega").find(".flipLeft").show()
})
};
ACS.activeSubMenuBlur=function(){$("a.sub").blur(function(){if($(this).parents(".mega").find(".flipLeft").find("a")===null){$(this).parents(".mega").find(".flipLeft").hide()
}})
};
ACS.activeThirdMenuFocus=function(){$("a.dropItemTitle").focus(function(){$(this).parents(".mega").find(".flipLeft").show()
})
};
ACS.activeThirdMenuBlur=function(){$("a.dropItemTitle").blur(function(){var a=$(this).parents(".flipLeft").find("a:last")[0];
if($(this)[0]===a){$(this).parents(".mega").find(".flipLeft").hide()
}})
};
ACS.registClickSkipContent=function(){$("#skipToContentId").click(function(){$("#contentInfo").focus()
})
};
ACS.activeGlobalSearch=function(){$("#grayBtnId").click(function(){$("#dropUlId").show()
});
$("#grayBtnId").focus(function(){$("#dropUlId").removeAttr("style")
})
};
ACS.goBack=function(){window.history.back()
};
ACS.activeLinkInFrame=function(){$('form a:not([target]):not([href~="#"])').attr("target","_parent")
};
ACS.resizeIframeAppHeight=function(b){var a=document.getElementById("mainFrame");
if(b){a.height=b
}else{if(a.contentDocument&&a.contentDocument.documentElement&&a.contentDocument.documentElement.scrollHeight){a.height=a.contentDocument.documentElement.scrollHeight+5
}else{a.height=a.contentWindow.document.body.scrollHeight+5
}}};
ACS.showSpinnerForPagination=function(b){var a=$("#"+b);
if(a.length===0){a=$("[id*='"+b+"']")
}if(!a.hasClass("p_AFDisabled")){ACS.spinner_show("Searching",true)
}};
ACS.spinner_show=function(b,a){jQuery("#itsp-spinner-message").text(b||"Loading...");
if(a){var c=jQuery("<a>.</a>").click(this.spinner_hide);
jQuery("<div id='itsp-spinner-mask'/>").addClass("spinner-mask").append(c).prependTo("#itsp-spinner");
ACS.center_spinner();
jQuery(window).resize(ACS.center_spinner)
}else{jQuery(".spinner").css("top","5px")
}if(ACS.spinner_ref_count>0){ACS.spinner_ref_count=ACS.spinner_ref_count+1
}else{ACS.spinner_ref_count=1;
jQuery("#itsp-spinner").show()
}};
ACS.spinner_hide=function(){if(ACS.spinner_ref_count>1){ACS.spinner_ref_count=ACS.spinner_ref_count-1
}else{ACS.spinner_ref_count=0;
jQuery("#itsp-spinner").hide();
jQuery("#itsp-spinner-mask").remove();
jQuery(window).unbind("resize",ACS.center_spinner)
}};
ACS.center_spinner=function(){var a=jQuery(window).height()/2;
jQuery(".spinner").css("top",a+"px")
};
ACS.waitForComplete=function(a){if(a.status==="begin"){ACS.spinner_show(null,a.source.className&&a.source.className.indexOf("acs_modal_spinner")!==-1)
}else{if(a.status==="complete"||a.status==="success"){ACS.spinner_hide()
}}};
ACS.justHide=function(a){if(a.status==="begin"){$("#dropUlId").hide()
}else{if(a.status==="complete"){$("#dropUlId").removeAttr("style")
}}};
ACS.adjustContentHeight=function(){var a=$("#main-body").height();
a=a>700?a:700;
$("#main-body").css("height",a+"px")
};
ACS.regLogout=function(a,b){$("#logout").click(function(){ACS.ajaxLogout(a,function(){ACS.ajaxLogout(b,function(){window.location.assign("/logout.xhtml")
})
})
})
};
ACS.ajaxLogout=function(a,b){if(a.length===0){b()
}$.ajax({url:a,dataType:"jsonp",xhrFields:{withCredentials:true},timeout:1000,complete:function(d,c){b()
}})
};
ACS.regCollapseExpendAction=function(){$(".collapseCon").click(function(){var a=$(this).parent().parent().parent().parent().next().find(".content");
if(a.hasClass("displayN")){$(this).addClass("caret3");
$(this).removeClass("caretRight1");
a.removeClass("displayN")
}else{$(this).removeClass("caret3");
$(this).addClass("caretRight1");
a.addClass("displayN")
}})
};
ACS.titlePanelNameClick=function(c){var a=$(c).parent().parent().find(".titleIconSpan"),b=$(c).parent().parent().parent().parent().next().find("div.titleContent");
if(a.hasClass("caret3")){a.removeClass("caret3");
a.addClass("caretRight1");
b.addClass("displayN")
}else{a.removeClass("caretRight1");
a.addClass("caret3");
b.removeClass("displayN")
}};
ACS.globalSearchSwitch=function(a,b){$("#grayBtnId > i")[0].className=b;
$("#globalSearchName")[0].value=a;
ACS.justHide({status:"complete"})
};
ACS.globalSearchShowDropdown=function(){var a=$("#globalSearchDropDown > ul > li");
if(a.length>0){$("#globalLink").dropdown("toggle")
}else{$.ajax({cache:false,url:"/infra/globalsearch.xhtml?_adf.disable-loopback",dataType:"html"}).done(function(b){$($("#globalSearchDropDown > ul")[0]).html(b);
$("#globalLink").dropdown("toggle")
})
}};
ACS.select={init:function(c,a){var b=c+":input";
$(document).ready(function(){ACS.select.initInput(c,a)
});
$(document).on("click","#"+acs.util.escapeQuoteId(b),function(d){ACS.select.clearValue(c,a,d)
});
$(document).on("keyup","#"+acs.util.escapeQuoteId(b),function(d){ACS.select.showMenu(c,a,d)
});
$(document).on("dblclick","#"+acs.util.escapeQuoteId(b),function(d){ACS.select.onChange(c)
});
$(document).on("change","#"+acs.util.escapeQuoteId(b),function(d){ACS.select.onChange(c)
});
$(document).on("click","#"+acs.util.escapeQuoteId(c+":menu")+" > .dropdown-menu > .pt > .start",function(d){ACS.select.setValue(c,"");
d.preventDefault();
d.stopPropagation()
});
$(document).on("click","#"+acs.util.escapeQuoteId(c+":menu")+" > .dropdown-menu > .pt > .contain",function(d){ACS.select.setValue(c,"*");
d.preventDefault();
d.stopPropagation()
})
},mst:{},ajaxAddHandler:function(b,a){return function(d){ACS.waitForComplete(d);
if(d.status==="success"){if(ACS.select.mst){var c=ACS.select.mst[b.replace(/:/g,"_")+"_onadd"];
if(c){c(d)
}}ACS.select.initInput(b,a)
}}
},ajaxLoadHandler:function(b,a){return function(c){ACS.waitForComplete(c);
if(c.status==="success"){ACS.select.initInput(b,a);
$(document.getElementById(b+":drop")).dropdown("toggle")
}}
},initInput:function(c,a){var b=c+":input";
if(ACS.select.hasPlaceholderSupport){document.getElementById(b).setAttribute("placeholder",a);
if(document.getElementById(b).value===a){document.getElementById(b).value=""
}}},hasPlaceholderSupport:(function(){return"placeholder" in document.createElement("input")
})(),clearValue:function(d,a,b){var c=document.getElementById(d+":input").value;
if(!c||a===c){document.getElementById(d+":input").value=""
}else{if(b){stopPropagation(b)
}window.setTimeout(function(){$(document.getElementById(d+":input")).select()
},10)
}ACS.select.showMenu(d,a,b)
},hideMenu:function(a){$(document.getElementById(a+":menu")).removeClass("open")
},showMenu:function(f,a,b){if(b){if(b.keyCode===13){ACS.select.onChange(f)
}else{if(b.keyCode===9){return
}}stopPropagation(b)
}var d=$("#"+(f+":menu").replace(/(:|\.|\[|\])/g,"\\$1")+" > ul > li"),c;
if(d.length>1||$(document.getElementById(f+":panel")).hasClass("loaded")){c=document.getElementById(f+":input").value;
var e=null;
if($(document.getElementById(f+":panel")).hasClass("multiselect")||!ACS.select.hasSelectedItem(f,d,c.toLowerCase())){if(!c||"*"===c||a===c){ACS.select.showAllItem(f,d)
}else{ACS.select.filterItem(f,d,c.toLowerCase())
}}else{e=ACS.select.showAllItem(f,d,c.toLowerCase())
}if(ACS.select.submitTimesamp===undefined||!c||c===""||a===c||(new Date().getTime()-ACS.select.submitTimesamp)>1000){$(document.getElementById(f+":drop")).dropdown("toggle");
if(e){$(e.parentNode).animate({scrollTop:e.offsetTop},100)
}}}else{if(!$(document.getElementById(f+":panel")).hasClass("loading")){$(document.getElementById(f+":panel")).addClass("loading");
$(document.getElementById(f+":load")).trigger("click")
}}},getAddedItems:function(d){var a=[],c=$("#"+(d+":selected").replace(/(:|\.|\[|\])/g,"\\$1")+" > div"),b;
for(b=0;
b<c.length;
b+=1){a.push($.trim($(c[b]).text()))
}return a
},showAllItem:function(a,c,h){var d=ACS.select.getAddedItems(a),e,j;
var b=0;
var g=0;
var f=null;
for(e=0;
e<c.length;
e+=1){j=$.trim($(c[e]).text());
if($.inArray($.trim(j),d)!==-1){c[e].style.display="none";
g++
}else{c[e].style.display="block";
b++
}if(j.toLowerCase()===h){f=c[e]
}}if(g>0&&b==0){$(document.getElementById(a+":menu")).addClass("notmatched")
}else{$(document.getElementById(a+":menu")).removeClass("notmatched")
}return f
},filterItem:function(h,g,f){var d=ACS.select.getAddedItems(h),c,e;
var a=0;
var b=0;
for(c=0;
c<g.length;
c+=1){e=$.trim($(g[c]).text());
if($.inArray(e,d)!==-1){g[c].style.display="none";
b++
}else{if(e.toLowerCase().indexOf(f)===1||new RegExp("^"+f.replace(/\*/g,".*")).test(e.toLowerCase())){g[c].style.display="block";
a++
}else{g[c].style.display="none";
b++
}}}if(b>0&&a==0){$(document.getElementById(h+":menu")).addClass("notmatched")
}else{$(document.getElementById(h+":menu")).removeClass("notmatched")
}},trigger:function(a){if(!$(document.getElementById(a+":panel")).hasClass("noajax")){document.getElementById(a+":input").setAttribute("processing",true);
$(document.getElementById(a+":select")).trigger("click")
}},setValue:function(d,b){var a=document.getElementById(d+":input");
a.value=b;
try{a.focus()
}catch(c){}},multiSelectAdd:function(b,a){ACS.select.submitTimesamp=new Date().getTime();
document.getElementById(b+":input").value=a;
ACS.select.trigger(b)
},pendingChanges:{},onChange:function(a){if(document.getElementById(a+":input").hasAttribute("processing")||!document.getElementById(a+":input").value||"*"==document.getElementById(a+":input").value){return
}ACS.select.pendingChanges[a]=1;
setTimeout(function(){if(document.getElementById(a+":input").hasAttribute("processing")||!document.getElementById(a+":input").value||"*"==document.getElementById(a+":input").value){return
}var c=ACS.select.pendingChanges[a];
ACS.select.pendingChanges[a]=0;
if(c){var b=document.getElementById(a+":input").value;
if(!$(document.getElementById(a+":menu")).hasClass("open")||!ACS.select.hasVisibleItem(a,$("#"+(a+":menu").replace(/(:|\.|\[|\])/g,"\\$1")+" > ul > li"),b.toLowerCase())){ACS.select.trigger(a)
}}},400)
},hasVisibleItem:function(e,d,c){var a,b;
for(a=0;
a<d.length;
a+=1){b=$.trim($(d[a]).text());
if(b.toLowerCase().indexOf(c)===1||new RegExp("^"+c.replace(/\*/g,".*")).test(b.toLowerCase())){return true
}}return false
},hasSelectedItem:function(f,e,d){var b=ACS.select.getAddedItems(f),a,c;
for(a=0;
a<e.length;
a+=1){c=$.trim($(e[a]).text());
if($.inArray(c,b)!==-1){return true
}else{if(c.toLowerCase()===d){return true
}}}return false
}};
ACS.tableOrder={init:function(b,a){$(document).on("click","#"+acs.util.escapeQuoteId(a),function(c){ACS.tableOrder.updateStatus(b,a,c)
});
ACS.tableOrder.updateStatus(b,a)
},ajaxHandler:function(b,a){return function(c){ACS.waitForComplete(c);
if(c.status==="success"){ACS.tableOrder.updateStatus(b,a)
}}
},updateStatus:function(a,b){var g=$(document.getElementById(a+":first"));
var f=$(document.getElementById(a+":up"));
var h=$(document.getElementById(a+":down"));
var i=$(document.getElementById(a+":last"));
var c="OraLinkDisabled";
var l=AdfPage.PAGE.findComponentByAbsoluteId(b);
if(!l){return
}var j=l.getSelectedRowKeys();
var e;
for(var d in j){if(j[d]){e=l.getPeer().FindRowByKey(parseInt(d)).index;
break
}}if(typeof e!="undefined"){if(e===0){g.addClass(c);
f.addClass(c)
}else{g.removeClass(c);
f.removeClass(c)
}if(l.getPeer().GetRowCount()===(e+1)){h.addClass(c);
i.addClass(c)
}else{h.removeClass(c);
i.removeClass(c)
}}}};
var global={};
global.query=function(){var a=$("#grayBtnId").html(),c=$("#globalSearchQuery").val()||"",b="Invalid id for quick search. Please enter a valid id";
if(a.indexOf("Select")!==-1){alert("Please choose your search item");
return false
}else{if(a.indexOf("Incident")!==-1){if(c.match(/^IT\d+$/)||c.match(/^\d+$/)){return true
}alert(b);
return false
}else{if(a.indexOf("Change")!==-1){if(c.match(/^CM\d+$/)||c.match(/^\d+$/)){return true
}alert(b);
return false
}else{if(c.match(/^\d+$/)){return true
}alert(b);
return false
}}}};
global.showBrowserUncertifiedMsg=function(){var a=$("#browser_uncertified_msg");
a.css({left:($(window).width()-a.width())/2,top:0,"z-index":1000,position:"absolute"}).slideDown().delay(30000).slideUp()
};
global.browserIsUncertified=function(){var a=$(location).attr("pathname");
return($.browser.safari&&navigator.userAgent.indexOf("Chrome")===-1&&a!=="/"&&a!=="/index.xhtml"&&a.match(/^\/acscloud\/myservices/)===null)
};
global.config=function(){if(global.browserIsUncertified()){global.showBrowserUncertifiedMsg()
}};
$(function(){ACS.activeSubMenu();
ACS.activeSubMenuFocus();
ACS.activeSubMenuBlur();
ACS.activeThirdMenuFocus();
ACS.activeThirdMenuBlur();
ACS.registClickSkipContent();
ACS.activeGlobalSearch();
ACS.regCollapseExpendAction()
});
function afShowPopup(f){f.cancel();
f.stopBubbling();
var e=f.getSource();
var b=e.getProperty("pop_id");
var d;
if(!b){var c=document.getElementById(e.getClientId());
b=c.nextSibling.getAttribute("id");
if(e.getProperty("align_previous")==="true"){if(c.previousSibling){d=c.previousSibling.getAttribute("id")
}else{if(c.parentNode&&c.parentNode.parentNode&&c.parentNode.parentNode.parentNode&&c.parentNode.parentNode.parentNode.parentNode&&c.parentNode.parentNode.parentNode.parentNode.parentNode&&c.parentNode.parentNode.parentNode.parentNode.parentNode.className.indexOf("af_panelGroupLayout")!==-1){d=c.parentNode.parentNode.previousSibling.firstChild.getAttribute("id")
}}}}d=d||e.getProperty("align_id")||e.getClientId();
var a=e.findComponent(b);
var g=e.getProperty("direction");
var h=AdfRichPopup.ALIGN_END_BEFORE;
if(g==="left-top"){h=AdfRichPopup.ALIGN_START_AFTER
}else{if(g==="right-top"){h=AdfRichPopup.ALIGN_BEFORE_START
}else{if(g==="right-bottom"){h=AdfRichPopup.ALIGN_END_AFTER
}else{if(g&&g.indexOf("_")!==-1){h=g
}}}}a.show({align:h,alignId:d})
}function afHidePopup(d){d.cancel();
var c=d.getSource();
var b=c.getProperty("pop_id");
var a=c.findComponent(b);
if(a.isPopupVisible()){a.hide()
}}function showTooltip(b){var a=AdfPage.PAGE.findComponent(b.nextSibling.getAttribute("id"));
var c={align:"end_after",alignId:b.getAttribute("id")};
a.show(c)
}function afSubmitMainForm(){document.getElementById("mainForm").submit()
}function afCloseExportDlg(a){afSubmitMainForm()
}function afHidePopupById(b){if(b&&b.substr(-9)==="::content"){b=b.substr(0,b.length-9)
}var a=AdfPage.PAGE.findComponentByAbsoluteId(b);
if(a.isPopupVisible()){a.hide()
}}function afCancelPopupById(b){if(b&&b.substr(-9)==="::content"){b=b.substr(0,b.length-9)
}var a=AdfPage.PAGE.findComponentByAbsoluteId(b);
if(a.isPopupVisible()){a.cancel()
}}function afShowPopupById(b,c,e){var a=AdfPage.PAGE.findComponentByAbsoluteId(b);
if(a&&!a.isPopupVisible()){var d={};
if(c){d.alignId=c
}if(e){d.align=e
}a.show(d)
}}function stopPropagation(a){if(!a){a=window.event
}if(a.cancel){a.cancel()
}if(a.stopBubbling){a.stopBubbling()
}if(a.cancelBubble!==undefined){a.cancelBubble=true
}if(a.stopPropagation){a.stopPropagation()
}}function submitOnEnter(a){var b=a.getKeyCode();
if(b===AdfKeyStroke.ENTER_KEY){stopPropagation(a);
submit()
}}function popupFeedbackWindow(){var c="";
$(".tabs > ul > li > a").each(function(d){if($(this).css("background-color")==="rgb(228, 0, 0)"){c=$(this).attr("id")
}});
var a="height=300,width=600,toolbar=no,titlebar=no,status=no,directories=no,menubar=no,scrollbars=no,top=200,left=400,location=no,resizable=no";
var b=window.open("/feedback.xhtml?tabs="+c,"Feedback",a);
b.focus()
}function comboBoxPopupValueSelection(a,b){return function(d){d.cancel();
var c=d.getSource().findComponent(a);
var g=d.getSource().findComponent(b);
var f=d.getSource();
var e=f.getProperty("rowValue");
c.hide();
g.setValue(e)
}
}function afInputBoxSelectAllOnFocus(a){a.cancel();
a.stopBubbling();
var b=document.getElementById(a.getSource().getClientId());
if(b){if(b.tagName!=="INPUT"){b=b.getElementsByTagName("INPUT")[0]
}if(b){b.focus();
b.select()
}}}function hideParentTooltip(a){while(a&&a.parentNode&&a!==a.parentNode&&(!a.className||a.className.indexOf("af_noteWindow")===-1)){a=a.parentNode
}if(a&&a.parentNode&&a.parentNode.getAttribute("id")){afHidePopupById(a.parentNode.getAttribute("id"))
}}function submitDefaultAjaxButton(f){f.cancel();
var b=$("#globalSearchHiddenFlag").val();
if(b==="focus"){var d=$("#globalSearchQryBtn");
d.click();
return
}var e=document.getElementsByTagName("a");
var c;
for(c=0;
c<e.length;
c+=1){var a=e[c].className;
if(a.indexOf("defaultButton")!==-1){$(e[c]).focus();
$(e[c]).trigger("click");
break
}}}function setGlobalSearchHiddenFlag(a){$("#globalSearchHiddenFlag").val(a)
}function adfWaitForComplete(a){var b=function(c){if(c.isBusy()){ACS.spinner_show()
}else{ACS.spinner_hide()
}};
AdfPage.PAGE.addBusyStateListener(null,b);
a.preventUserInput()
}AdfDataTransferService._alertError=function(){var b=AdfPage.PAGE.getFailedConnectionText();
if(!b){var a=AdfPage.PAGE.getLookAndFeel();
b=a.getTranslatedString("af_document.MSG_FAILED_CONNECTION")
}};
if(typeof OpenAjax!=="undefined"&&typeof OpenAjax.hub.registerLibrary!=="undefined"){OpenAjax.hub.registerLibrary("jsf","www.sun.com","2.0",null)
}if(!((jsf&&jsf.specversion&&jsf.specversion>=20000)&&(jsf.implversion&&jsf.implversion>=3))){var jsf={};
jsf.ajax=function(){var eventListeners=[];
var errorListeners=[];
var isIE=function isIE(){if(typeof isIECache!=="undefined"){return isIECache
}isIECache=document.all&&window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1;
return isIECache
};
var isIECache;
var isAutoExec=function isAutoExec(){try{if(typeof isAutoExecCache!=="undefined"){return isAutoExecCache
}var autoExecTestString="<script>var mojarra = mojarra || {};mojarra.autoExecTest = true;<\/script>";
var tempElement=document.createElement("span");
tempElement.innerHTML=autoExecTestString;
var body=document.getElementsByTagName("body")[0];
var tempNode=body.appendChild(tempElement);
if(mojarra&&mojarra.autoExecTest){isAutoExecCache=true;
delete mojarra.autoExecTest
}else{isAutoExecCache=false
}deleteNode(tempNode);
return isAutoExecCache
}catch(ex){if(typeof isAutoExecCache==="undefined"){isAutoExecCache=false
}return isAutoExecCache
}};
var isAutoExecCache;
var getTransport=function getTransport(){var methods=[function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
}];
var returnVal;
for(var i=0,len=methods.length;
i<len;
i++){try{returnVal=methods[i]()
}catch(e){continue
}return returnVal
}throw new Error("Could not create an XHR object.")
};
var $=function $(){var results=[],element;
for(var i=0;
i<arguments.length;
i++){element=arguments[i];
if(typeof element=="string"){element=document.getElementById(element)
}results.push(element)
}return results.length>1?results:results[0]
};
var getForm=function getForm(element){if(element){var form=$(element);
while(form){if(form.nodeName&&(form.nodeName.toLowerCase()=="form")){return form
}if(form.form){return form.form
}if(form.parentNode){form=form.parentNode
}else{form=null
}}return document.forms[0]
}return null
};
var isInArray=function isInArray(array,value){for(var i=0;
i<array.length;
i++){if(array[i]===value){return true
}}return false
};
var globalEval=function globalEval(src){if(window.execScript){window.execScript(src);
return
}var fn=function(){window.eval.call(window,src)
};
fn()
};
var stripScripts=function stripScripts(str){var findscripts=/<script[^>]*>([\S\s]*?)<\/script>/igm;
var findscript=/<script([^>]*)>([\S\s]*?)<\/script>/im;
var stripStart=/^\s*(<!--)*\s*(\/\/)*\s*(\/\*)*\s*(<!\[CDATA\[)*/;
var findsrc=/src="([\S]*?)"/im;
var initialnodes=[];
var scripts=[];
initialnodes=str.match(findscripts);
while(!!initialnodes&&initialnodes.length>0){var scriptStr=[];
scriptStr=initialnodes.shift().match(findscript);
var src=[];
src=scriptStr[1].match(findsrc);
var script;
if(!!src&&src[1]){var url=src[1];
if(/\/javax.faces.resource\/jsf.js\?ln=javax\.faces/.test(url)){script=false
}else{script=loadScript(url)
}}else{if(!!scriptStr&&scriptStr[2]){script=scriptStr[2].replace(stripStart,"")
}else{script=false
}}if(!!script){scripts.push(script)
}}return scripts
};
var loadScript=function loadScript(url){var xhr=getTransport();
if(xhr===null){return""
}xhr.open("GET",url,false);
xhr.setRequestHeader("Content-Type","application/x-javascript");
xhr.send(null);
if(xhr.readyState==4&&xhr.status==200){return xhr.responseText
}return""
};
var runScripts=function runScripts(scripts){if(!scripts||scripts.length===0){return
}var head=document.getElementsByTagName("head")[0]||document.documentElement;
while(scripts.length){var scriptNode=document.createElement("script");
scriptNode.type="text/javascript";
scriptNode.text=scripts.shift();
head.appendChild(scriptNode);
head.removeChild(scriptNode)
}};
var elementReplaceStr=function elementReplaceStr(element,tempTagName,src){var temp=document.createElement(tempTagName);
if(element.id){temp.id=element.id
}if(element.nodeName.toLowerCase()==="head"){throw new Error("Attempted to replace a head element - this is not allowed.")
}else{var scripts=[];
if(isAutoExec()){temp.innerHTML=src
}else{scripts=stripScripts(src);
src=src.replace(/<script[^>]*>([\S\s]*?)<\/script>/igm,"");
temp.innerHTML=src
}}replaceNode(temp,element);
runScripts(scripts)
};
var getText=function getText(oNode,deep){var Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
var s="";
var nodes=oNode.childNodes;
for(var i=0;
i<nodes.length;
i++){var node=nodes[i];
var nodeType=node.nodeType;
if(nodeType==Node.TEXT_NODE||nodeType==Node.CDATA_SECTION_NODE){s+=node.data
}else{if(deep===true&&(nodeType==Node.ELEMENT_NODE||nodeType==Node.DOCUMENT_NODE||nodeType==Node.DOCUMENT_FRAGMENT_NODE)){s+=getText(node,true)
}}}return s
};
var PARSED_OK="Document contains no parsing errors";
var PARSED_EMPTY="Document is empty";
var PARSED_UNKNOWN_ERROR="Not well-formed or other error";
var getParseErrorText;
if(isIE()){getParseErrorText=function(oDoc){var parseErrorText=PARSED_OK;
if(oDoc&&oDoc.parseError&&oDoc.parseError.errorCode&&oDoc.parseError.errorCode!==0){parseErrorText="XML Parsing Error: "+oDoc.parseError.reason+"\nLocation: "+oDoc.parseError.url+"\nLine Number "+oDoc.parseError.line+", Column "+oDoc.parseError.linepos+":\n"+oDoc.parseError.srcText+"\n";
for(var i=0;
i<oDoc.parseError.linepos;
i++){parseErrorText+="-"
}parseErrorText+="^\n"
}else{if(oDoc.documentElement===null){parseErrorText=PARSED_EMPTY
}}return parseErrorText
}
}else{getParseErrorText=function(oDoc){var parseErrorText=PARSED_OK;
if((!oDoc)||(!oDoc.documentElement)){parseErrorText=PARSED_EMPTY
}else{if(oDoc.documentElement.tagName=="parsererror"){parseErrorText=oDoc.documentElement.firstChild.data;
parseErrorText+="\n"+oDoc.documentElement.firstChild.nextSibling.firstChild.data
}else{if(oDoc.getElementsByTagName("parsererror").length>0){var parsererror=oDoc.getElementsByTagName("parsererror")[0];
parseErrorText=getText(parsererror,true)+"\n"
}else{if(oDoc.parseError&&oDoc.parseError.errorCode!==0){parseErrorText=PARSED_UNKNOWN_ERROR
}}}}return parseErrorText
}
}if((typeof(document.importNode)=="undefined")&&isIE()){try{document.importNode=function(oNode,bChildren){var tmp;
if(oNode.nodeName=="#text"){return document.createTextNode(oNode.data)
}else{if(oNode.nodeName=="tbody"||oNode.nodeName=="tr"){tmp=document.createElement("table")
}else{if(oNode.nodeName=="td"){tmp=document.createElement("tr")
}else{if(oNode.nodeName=="option"){tmp=document.createElement("select")
}else{tmp=document.createElement("div")
}}}if(bChildren){tmp.innerHTML=oNode.xml?oNode.xml:oNode.outerHTML
}else{tmp.innerHTML=oNode.xml?oNode.cloneNode(false).xml:oNode.cloneNode(false).outerHTML
}return tmp.getElementsByTagName("*")[0]
}}
}catch(e){}}var Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
var clearEvents=function clearEvents(node){if(!node){return
}if(node.nodeType==Node.TEXT_NODE||node.nodeType==Node.COMMENT_NODE){return
}var events=["abort","blur","change","error","focus","load","reset","resize","scroll","select","submit","unload","keydown","keypress","keyup","click","mousedown","mousemove","mouseout","mouseover","mouseup","dblclick"];
try{for(var e in events){if(events.hasOwnProperty(e)){node[e]=null
}}}catch(ex){}};
var deleteNode=function deleteNode(node){if(!node){return
}if(!node.parentNode){return
}if(!isIE()){node.parentNode.removeChild(node);
return
}if(node.nodeName.toLowerCase()==="body"){deleteChildren(node);
try{node.outerHTML=""
}catch(ex){}return
}var temp=node.ownerDocument.createElement("div");
var parent=node.parentNode;
temp.appendChild(parent.removeChild(node));
try{temp.outerHTML=""
}catch(ex){}};
var deleteChildren=function deleteChildren(node){if(!node){return
}for(var x=node.childNodes.length-1;
x>=0;
x--){var childNode=node.childNodes[x];
deleteNode(childNode)
}};
var copyChildNodes=function copyChildNodes(nodeFrom,nodeTo){if((!nodeFrom)||(!nodeTo)){throw"Both source and destination nodes must be provided"
}deleteChildren(nodeTo);
var nodes=nodeFrom.childNodes;
if(nodeFrom.ownerDocument==nodeTo.ownerDocument){while(nodeFrom.firstChild){nodeTo.appendChild(nodeFrom.firstChild)
}}else{var ownerDoc=nodeTo.nodeType==Node.DOCUMENT_NODE?nodeTo:nodeTo.ownerDocument;
var i;
if(typeof(ownerDoc.importNode)!="undefined"){for(i=0;
i<nodes.length;
i++){nodeTo.appendChild(ownerDoc.importNode(nodes[i],true))
}}else{for(i=0;
i<nodes.length;
i++){nodeTo.appendChild(nodes[i].cloneNode(true))
}}}};
var replaceNode=function replaceNode(newNode,node){if(isIE()){node.parentNode.insertBefore(newNode,node);
deleteNode(node)
}else{node.parentNode.replaceChild(newNode,node)
}};
var cloneAttributes=function cloneAttributes(target,source){var coreElementAttributes=["className","title","lang","xml:lang"];
var inputElementAttributes=["name","value","checked","disabled","readOnly","size","maxLength","src","alt","useMap","isMap","tabIndex","accessKey","accept","type"];
var listenerNames=["onclick","ondblclick","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup","onkeydown","onkeypress","onkeyup","onhelp","onblur","onfocus","onchange","onload","onunload","onabort","onreset","onselect","onsubmit"];
var iIndex,iLength;
var attributeName;
var newValue,oldValue;
for(iIndex=0,iLength=coreElementAttributes.length;
iIndex<iLength;
iIndex++){attributeName=coreElementAttributes[iIndex];
newValue=source[attributeName];
oldValue=target[attributeName];
if(oldValue!=newValue){target[attributeName]=newValue
}}if(target.nodeName.toLowerCase()==="input"){for(iIndex=0,iLength=inputElementAttributes.length;
iIndex<iLength;
iIndex++){attributeName=inputElementAttributes[iIndex];
newValue=source[attributeName];
oldValue=target[attributeName];
if(oldValue!=newValue){target[attributeName]=newValue
}}}var newStyle=source.getAttribute("style");
var oldStyle=target.getAttribute("style");
if(newStyle!=oldStyle){if(isIE()){target.style.setAttribute("cssText",newStyle,0)
}else{target.setAttribute("style",newStyle)
}}for(var lIndex=0,lLength=listenerNames.length;
lIndex<lLength;
lIndex++){var name=listenerNames[lIndex];
target[name]=source[name]?source[name]:null;
if(source[name]){source[name]=null
}}if(!isIE()&&source.dir!=target.dir){target.dir=source.dir?source.dir:null
}};
var elementReplace=function elementReplace(newElement,origElement){copyChildNodes(newElement,origElement);
origElement.innerHTML=origElement.innerHTML;
try{cloneAttributes(origElement,newElement)
}catch(ex){if(jsf.getProjectStage()=="Development"){throw new Error("Error updating attributes")
}}deleteNode(newElement)
};
var getBodyElement=function getBodyElement(docStr){var doc;
var body;
if(typeof DOMParser!=="undefined"){doc=(new DOMParser()).parseFromString(docStr,"text/xml")
}else{if(typeof ActiveXObject!=="undefined"){doc=new ActiveXObject("MSXML2.DOMDocument");
doc.loadXML(docStr)
}else{throw new Error("You don't seem to be running a supported browser")
}}if(getParseErrorText(doc)!==PARSED_OK){throw new Error(getParseErrorText(doc))
}body=doc.getElementsByTagName("body")[0];
if(!body){throw new Error("Can't find body tag in returned document.")
}return body
};
var doUpdate=function doUpdate(element,context){var id,content,markup,state;
var stateForm;
var scripts=[];
id=element.getAttribute("id");
if(id==="javax.faces.ViewState"){state=element.firstChild;
stateForm=document.getElementById(context.formid);
if(!stateForm||!stateForm.elements){return
}var field=stateForm.elements["javax.faces.ViewState"];
if(typeof field=="undefined"){field=document.createElement("input");
field.type="hidden";
field.name="javax.faces.ViewState";
stateForm.appendChild(field)
}field.value=state.nodeValue;
if(typeof context.render!=="undefined"&&context.render!==null){var temp=context.render.split(" ");
for(var i=0;
i<temp.length;
i++){if(temp.hasOwnProperty(i)){var f=document.forms[temp[i]];
if(typeof f!=="undefined"&&f!==null&&f.id!==context.formid){field=f.elements["javax.faces.ViewState"];
if(typeof field==="undefined"){field=document.createElement("input");
field.type="hidden";
field.name="javax.faces.ViewState";
f.appendChild(field)
}field.value=state.nodeValue
}}}}return
}markup="";
for(var j=0;
j<element.childNodes.length;
j++){content=element.childNodes[j];
markup+=content.nodeValue
}var src=markup;
if(id==="javax.faces.ViewRoot"||id==="javax.faces.ViewBody"){var bodyStartEx=new RegExp("< *body[^>]*>","gi");
var bodyEndEx=new RegExp("< */ *body[^>]*>","gi");
var newsrc;
var docBody=document.getElementsByTagName("body")[0];
var bodyStart=bodyStartEx.exec(src);
if(bodyStart!==null){try{scripts=stripScripts(src);
newsrc=src.replace(/<script[^>]*>([\S\s]*?)<\/script>/igm,"");
elementReplace(getBodyElement(newsrc),docBody);
runScripts(scripts)
}catch(e){var srcBody,bodyEnd;
bodyEnd=bodyEndEx.exec(src);
if(bodyEnd!==null){srcBody=src.substring(bodyStartEx.lastIndex,bodyEnd.index)
}else{srcBody=src.substring(bodyStartEx.lastIndex)
}elementReplaceStr(docBody,"body",srcBody)
}}else{elementReplaceStr(docBody,"body",src)
}}else{if(id==="javax.faces.ViewHead"){throw new Error("javax.faces.ViewHead not supported - browsers cannot reliably replace the head's contents")
}else{var d=$(id);
if(!d){throw new Error("During update: "+id+" not found")
}var parent=d.parentNode;
var html=src.replace(/^\s+/g,"").replace(/\s+$/g,"");
var parserElement=document.createElement("div");
var tag=d.nodeName.toLowerCase();
var tableElements=["td","th","tr","tbody","thead","tfoot"];
var isInTable=false;
for(var tei=0,tel=tableElements.length;
tei<tel;
tei++){if(tableElements[tei]==tag){isInTable=true;
break
}}if(isInTable){if(isAutoExec()){parserElement.innerHTML="<table>"+html+"</table>"
}else{scripts=stripScripts(html);
html=html.replace(/<script[^>]*>([\S\s]*?)<\/script>/igm,"");
parserElement.innerHTML="<table>"+html+"</table>"
}var newElement=parserElement.firstChild;
while((null!==newElement)&&(id!==newElement.id)){newElement=newElement.firstChild
}parent.replaceChild(newElement,d);
runScripts(scripts)
}else{if(d.nodeName.toLowerCase()==="input"){parserElement=document.createElement("div");
parserElement.innerHTML=html;
newElement=parserElement.firstChild;
cloneAttributes(d,newElement);
deleteNode(parserElement)
}else{if(html.length>0){if(isAutoExec()){parserElement.innerHTML=html
}else{scripts=stripScripts(html);
html=html.replace(/<script[^>]*>([\S\s]*?)<\/script>/igm,"");
parserElement.innerHTML=html
}replaceNode(parserElement.firstChild,d);
deleteNode(parserElement);
runScripts(scripts)
}}}}}};
var doDelete=function doDelete(element){var id=element.getAttribute("id");
var target=$(id);
deleteNode(target)
};
var doInsert=function doInsert(element){var tablePattern=new RegExp("<\\s*(td|th|tr|tbody|thead|tfoot)","i");
var scripts=[];
var target=$(element.firstChild.getAttribute("id"));
var parent=target.parentNode;
var html=element.firstChild.firstChild.nodeValue;
var isInTable=tablePattern.test(html);
if(!isAutoExec()){scripts=stripScripts(html);
html=html.replace(/<script[^>]*>([\S\s]*?)<\/script>/igm,"")
}var tempElement=document.createElement("div");
var newElement=null;
if(isInTable){tempElement.innerHTML="<table>"+html+"</table>";
newElement=tempElement.firstChild;
while((null!==newElement)&&(""==newElement.id)){newElement=newElement.firstChild
}}else{tempElement.innerHTML=html;
newElement=tempElement.firstChild
}if(element.firstChild.nodeName==="after"){target=target.nextSibling
}if(!!tempElement.innerHTML){parent.insertBefore(newElement,target)
}runScripts(scripts);
deleteNode(tempElement)
};
var doAttributes=function doAttributes(element){var id=element.getAttribute("id");
var target=$(id);
if(!target){throw new Error("The specified id: "+id+" was not found in the page.")
}var nodes=element.childNodes;
for(var i=0;
i<nodes.length;
i++){var name=nodes[i].getAttribute("name");
var value=nodes[i].getAttribute("value");
if(!isIE()){target.setAttribute(name,value)
}else{if(name==="class"){name="className";
target.setAttribute(name,value,0)
}else{if(name==="for"){name="htmlFor";
target.setAttribute(name,value,0)
}else{if(name==="style"){target.style.setAttribute("cssText",value,0)
}else{if(name.substring(0,2)==="on"){var fn=function(value){return function(){window.execScript(value)
}
}(value);
target.setAttribute(name,fn,0)
}else{if(name==="dir"){if(jsf.getProjectStage()=="Development"){throw new Error("Cannot set 'dir' attribute in IE")
}}else{target.setAttribute(name,value,0)
}}}}}}}};
var doEval=function doEval(element){var evalText=element.firstChild.nodeValue;
globalEval(evalText)
};
var Queue=new function Queue(){var queue=[];
var queueSpace=0;
this.getSize=function getSize(){return queue.length-queueSpace
};
this.isEmpty=function isEmpty(){return(queue.length===0)
};
this.enqueue=function enqueue(element){queue.push(element)
};
this.dequeue=function dequeue(){var element=undefined;
if(queue.length){element=queue[queueSpace];
if(++queueSpace*2>=queue.length){queue=queue.slice(queueSpace);
queueSpace=0
}}try{return element
}finally{element=null
}};
this.getOldestElement=function getOldestElement(){var element=undefined;
if(queue.length){element=queue[queueSpace]
}try{return element
}finally{element=null
}}
}();
var AjaxEngine=function AjaxEngine(){var req={};
req.url=null;
req.context={};
req.context.sourceid=null;
req.context.onerror=null;
req.context.onevent=null;
req.context.formid=null;
req.xmlReq=null;
req.async=true;
req.parameters={};
req.queryString=null;
req.method=null;
req.status=null;
req.fromQueue=false;
req.que=Queue;
req.xmlReq=getTransport();
if(req.xmlReq===null){return null
}function noop(){}req.xmlReq.onreadystatechange=function(){if(req.xmlReq.readyState===4){req.onComplete();
req.xmlReq.onreadystatechange=noop;
req.xmlReq=null
}};
req.onComplete=function onComplete(){if(req.xmlReq.status&&(req.xmlReq.status>=200&&req.xmlReq.status<300)){sendEvent(req.xmlReq,req.context,"complete");
jsf.ajax.response(req.xmlReq,req.context)
}else{sendEvent(req.xmlReq,req.context,"complete");
sendError(req.xmlReq,req.context,"httpError")
}var nextReq=req.que.getOldestElement();
if(nextReq===null||typeof nextReq==="undefined"){return
}while((typeof nextReq.xmlReq!=="undefined"&&nextReq.xmlReq!==null)&&nextReq.xmlReq.readyState===4){req.que.dequeue();
nextReq=req.que.getOldestElement();
if(nextReq===null||typeof nextReq==="undefined"){break
}}if(nextReq===null||typeof nextReq==="undefined"){return
}if((typeof nextReq.xmlReq!=="undefined"&&nextReq.xmlReq!==null)&&nextReq.xmlReq.readyState===0){nextReq.fromQueue=true;
nextReq.sendRequest()
}};
req.setupArguments=function(args){for(var i in args){if(args.hasOwnProperty(i)){if(typeof req[i]==="undefined"){req.parameters[i]=args[i]
}else{req[i]=args[i]
}}}};
req.sendRequest=function(){if(req.xmlReq!==null){if(!req.que.isEmpty()){if(!req.fromQueue){req.que.enqueue(req);
return
}}if(!req.fromQueue){req.que.enqueue(req)
}if(req.generateUniqueUrl&&req.method=="GET"){req.parameters.AjaxRequestUniqueId=new Date().getTime()+""+req.requestIndex
}var content=null;
for(var i in req.parameters){if(req.parameters.hasOwnProperty(i)){if(req.queryString.length>0){req.queryString+="&"
}req.queryString+=encodeURIComponent(i)+"="+encodeURIComponent(req.parameters[i])
}}if(req.method==="GET"){if(req.queryString.length>0){req.url+=((req.url.indexOf("?")>-1)?"&":"?")+req.queryString
}}req.xmlReq.open(req.method,req.url,req.async);
if(req.method==="POST"){if(typeof req.xmlReq.setRequestHeader!=="undefined"){req.xmlReq.setRequestHeader("Faces-Request","partial/ajax");
req.xmlReq.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8")
}content=req.queryString
}if(!req.async){req.xmlReq.onreadystatechange=null
}sendEvent(req.xmlReq,req.context,"begin");
req.xmlReq.send(content);
if(!req.async){req.onComplete()
}}};
return req
};
var sendError=function sendError(request,context,status,description,serverErrorName,serverErrorMessage){var sent=false;
var data={};
data.type="error";
data.status=status;
data.source=context.sourceid;
data.responseCode=request.status;
data.responseXML=request.responseXML;
data.responseText=request.responseText;
if(typeof data.source==="string"){data.source=document.getElementById(data.source)
}if(description){data.description=description
}else{if(status=="httpError"){if(data.responseCode===0){data.description="The Http Transport returned a 0 status code.  This is usually the result of mixing ajax and full requests.  This is usually undesired, for both performance and data integrity reasons."
}else{data.description="There was an error communicating with the server, status: "+data.responseCode
}}else{if(status=="serverError"){data.description=serverErrorMessage
}else{if(status=="emptyResponse"){data.description="An empty response was received from the server.  Check server error logs."
}else{if(status=="malformedXML"){if(getParseErrorText(data.responseXML)!==PARSED_OK){data.description=getParseErrorText(data.responseXML)
}else{data.description="An invalid XML response was received from the server."
}}}}}}if(status=="serverError"){data.errorName=serverErrorName;
data.errorMessage=serverErrorMessage
}if(context.onerror){context.onerror.call(null,data);
sent=true
}for(var i in errorListeners){if(errorListeners.hasOwnProperty(i)){errorListeners[i].call(null,data);
sent=true
}}if(!sent&&jsf.getProjectStage()==="Development"){if(status=="serverError"){alert("serverError: "+serverErrorName+" "+serverErrorMessage)
}else{alert(status+": "+data.description)
}}};
var sendEvent=function sendEvent(request,context,status){var data={};
data.type="event";
data.status=status;
data.source=context.sourceid;
if(typeof data.source==="string"){data.source=document.getElementById(data.source)
}if(status!=="begin"){data.responseCode=request.status;
data.responseXML=request.responseXML;
data.responseText=request.responseText
}if(context.onevent){context.onevent.call(null,data)
}for(var i in eventListeners){if(eventListeners.hasOwnProperty(i)){eventListeners[i].call(null,data)
}}};
return{addOnError:function addOnError(callback){if(typeof callback==="function"){errorListeners[errorListeners.length]=callback
}else{throw new Error("jsf.ajax.addOnError:  Added a callback that was not a function.")
}},addOnEvent:function addOnEvent(callback){if(typeof callback==="function"){eventListeners[eventListeners.length]=callback
}else{throw new Error("jsf.ajax.addOnEvent: Added a callback that was not a function")
}},request:function request(source,event,options){var element,form;
var all,none;
if(typeof source==="undefined"||source===null){throw new Error("jsf.ajax.request: source not set")
}if(typeof source==="string"){element=document.getElementById(source)
}else{if(typeof source==="object"){element=source
}else{throw new Error("jsf.request: source must be object or string")
}}if(!element.name){element.name=element.id
}if(typeof(options)==="undefined"||options===null){options={}
}var onerror=false;
if(options.onerror&&typeof options.onerror==="function"){onerror=options.onerror
}else{if(options.onerror&&typeof options.onerror!=="function"){throw new Error("jsf.ajax.request: Added an onerror callback that was not a function")
}}var onevent=false;
if(options.onevent&&typeof options.onevent==="function"){onevent=options.onevent
}else{if(options.onevent&&typeof options.onevent!=="function"){throw new Error("jsf.ajax.request: Added an onevent callback that was not a function")
}}form=getForm(element);
if(!form){throw new Error("jsf.ajax.request: Method must be called within a form")
}var viewState=jsf.getViewState(form);
var args={};
args["javax.faces.source"]=element.id;
if(event&&!!event.type){args["javax.faces.partial.event"]=event.type
}if(options.execute){none=options.execute.search(/@none/);
if(none<0){all=options.execute.search(/@all/);
if(all<0){options.execute=options.execute.replace("@this",element.id);
options.execute=options.execute.replace("@form",form.id);
var temp=options.execute.split(" ");
if(!isInArray(temp,element.name)){options.execute=element.name+" "+options.execute
}}else{options.execute="@all"
}args["javax.faces.partial.execute"]=options.execute
}}else{options.execute=element.name+" "+element.id;
args["javax.faces.partial.execute"]=options.execute
}if(options.render){none=options.render.search(/@none/);
if(none<0){all=options.render.search(/@all/);
if(all<0){options.render=options.render.replace("@this",element.id);
options.render=options.render.replace("@form",form.id)
}else{options.render="@all"
}args["javax.faces.partial.render"]=options.render
}}delete options.execute;
delete options.render;
delete options.onerror;
delete options.onevent;
for(var property in options){if(options.hasOwnProperty(property)){args[property]=options[property]
}}args["javax.faces.partial.ajax"]="true";
args.method="POST";
var encodedUrlField=form.elements["javax.faces.encodedURL"];
if(typeof encodedUrlField=="undefined"){args.url=form.action
}else{args.url=encodedUrlField.value
}var ajaxEngine=new AjaxEngine();
ajaxEngine.setupArguments(args);
ajaxEngine.queryString=viewState;
ajaxEngine.context.onevent=onevent;
ajaxEngine.context.onerror=onerror;
ajaxEngine.context.sourceid=element.id;
ajaxEngine.context.formid=form.id;
ajaxEngine.context.render=args["javax.faces.partial.render"];
ajaxEngine.sendRequest();
element=null;
form=null
},response:function response(request,context){if(!request){throw new Error("jsf.ajax.response: Request parameter is unset")
}if(typeof context.sourceid==="string"){context.sourceid=document.getElementById(context.sourceid)
}var xml=request.responseXML;
if(xml===null){sendError(request,context,"emptyResponse");
return
}if(getParseErrorText(xml)!==PARSED_OK){sendError(request,context,"malformedXML");
return
}var responseType=xml.getElementsByTagName("partial-response")[0].firstChild;
if(responseType.nodeName==="error"){var errorName=responseType.firstChild.firstChild.nodeValue;
var errorMessage=responseType.firstChild.nextSibling.firstChild.nodeValue;
sendError(request,context,"serverError",null,errorName,errorMessage);
sendEvent(request,context,"success");
return
}if(responseType.nodeName==="redirect"){window.location=responseType.getAttribute("url");
return
}if(responseType.nodeName!=="changes"){sendError(request,context,"malformedXML","Top level node must be one of: changes, redirect, error, received: "+responseType.nodeName+" instead.");
return
}var changes=responseType.childNodes;
try{for(var i=0;
i<changes.length;
i++){switch(changes[i].nodeName){case"update":doUpdate(changes[i],context);
break;
case"delete":doDelete(changes[i]);
break;
case"insert":doInsert(changes[i]);
break;
case"attributes":doAttributes(changes[i]);
break;
case"eval":doEval(changes[i]);
break;
case"extension":break;
default:sendError(request,context,"malformedXML","Changes allowed are: update, delete, insert, attributes, eval, extension.  Received "+changes[i].nodeName+" instead.");
return
}}}catch(ex){sendError(request,context,"malformedXML",ex.message);
return
}sendEvent(request,context,"success")
}}
}();
jsf.getProjectStage=function(){if(typeof mojarra!=="undefined"&&typeof mojarra.projectStageCache!=="undefined"){return mojarra.projectStageCache
}var a=document.getElementsByTagName("script");
var b;
var e=0;
var d;
var c;
while(e<a.length){if(typeof a[e].src==="string"&&a[e].src.match("/javax.faces.resource/jsf.js?.*ln=javax.faces")){b=a[e].src;
break
}e++
}if(typeof b=="string"){c=b.match("stage=(.*)");
if(c){d=c[1]
}}if(typeof d==="undefined"||!d){d="Production"
}mojarra=mojarra||{};
mojarra.projectStageCache=d;
return mojarra.projectStageCache
};
jsf.getViewState=function(g){if(!g){throw new Error("jsf.getViewState:  form must be set")
}var e=g.elements;
var a=e.length;
var b=[];
var h=function(j,k){var i="";
if(b.length>0){i="&"
}i+=encodeURIComponent(j)+"="+encodeURIComponent(k);
b.push(i)
};
for(var d=0;
d<a;
d++){var f=e[d];
if(!f.disabled){switch(f.type){case"text":case"password":case"hidden":case"textarea":h(f.name,f.value);
break;
case"select-one":if(f.selectedIndex>=0){h(f.name,f.options[f.selectedIndex].value)
}break;
case"select-multiple":for(var c=0;
c<f.options.length;
c++){if(f.options[c].selected){h(f.name,f.options[c].value)
}}break;
case"checkbox":case"radio":if(f.checked){h(f.name,f.value||"on")
}break
}}}return b.join("")
};
jsf.util={};
jsf.util.chain=function(g,d){if(arguments.length<3){return true
}var a=(typeof g==="object")?g:null;
for(var b=2;
b<arguments.length;
b++){var e=new Function("event",arguments[b]);
var c=e.call(a,d);
if(c===false){return false
}}return true
};
jsf.specversion=20000;
jsf.implversion=3
}if(typeof OpenAjax!=="undefined"&&typeof OpenAjax.hub.registerLibrary!=="undefined"){OpenAjax.hub.registerLibrary("mojarra","www.sun.com","1.0",null)
}var mojarra=mojarra||{};
mojarra.dpf=function dpf(c){var b=c.adp;
if(b!==null){for(var a=0;
a<b.length;
a++){c.removeChild(b[a])
}}};
mojarra.apf=function apf(e,c){var d=new Array();
e.adp=d;
var b=0;
for(var a in c){if(c.hasOwnProperty(a)){var g=document.createElement("input");
g.type="hidden";
g.name=a;
g.value=c[a];
e.appendChild(g);
d[b++]=g
}}};
mojarra.jsfcljs=function jsfcljs(c,b,a){mojarra.apf(c,b);
var d=c.target;
if(a){c.target=a
}c.submit();
c.target=d;
mojarra.dpf(c)
};
mojarra.jsfcbk=function jsfcbk(b,a,c){return b.call(a,c)
};
mojarra.ab=function ab(c,d,g,a,b,f){if(!f){f={}
}if(g){f["javax.faces.behavior.event"]=g
}if(a){f.execute=a
}if(b){f.render=b
}jsf.ajax.request(c,d,f)
};
var acs=acs||{};
if(!acs.widget){acs.widget={resizeContent:function(b,g,d){if(g){acs.widget.resizeIframeHeight(d);
return
}var f=$("."+b+" #noResizeInWidget");
if(f&&f.val()){return
}var e=$("."+b);
var a=$("."+b+" .widget-content");
var c=$("."+b+" .widget-head");
if(a.css("overflow-x")==="hidden"){a.outerHeight(e.height()-c.height())
}else{a.outerHeight(e.height()-c.height()-8)
}},removeWidget:function(a){if(confirm("Are you sure to remove this widget?")){$("."+a).slideUp(function(){$(this).remove()
})
}},toggleWidget:function(b,c){var a=$("."+b+" .widget-content");
if(a.css("display")==="none"){a.slideDown(function(){$("."+b+" .icon-resize-full:first").addClass("icon-resize-small").removeClass("icon-resize-full").attr("title","Collapse")
});
if(c){$("[id$='refresh_"+b+"']").show()
}}else{a.slideUp(function(){$("."+b+" .icon-resize-small:first").addClass("icon-resize-full").removeClass("icon-resize-small").attr("title","Expand")
});
if(c){$("[id$='refresh_"+b+"']").hide()
}}},showPopup:function(b){var c=b+":customizePopup";
var a=AdfPage.PAGE.findComponentByAbsoluteId(c);
var d={};
a.show(d)
},resizeIframeHeight:function(a){$("#"+a+"_loading").hide();
CLOUD.resizeIframeHeight(a,20)
},refreshContent:function(b,a){if(a&&a>0&&b){setInterval(function(){if($("."+b+" .autoRefreshBtn")){$("."+b+" .autoRefreshBtn").click()
}},a*1000)
}}}
};
var CLOUD={};
CLOUD.resizeIframeHeight=function(b,c){var a=document.getElementById(b);
if(acs.util.isIE9()){a.height="380px";
return
}if(a.contentDocument&&a.contentDocument.documentElement&&a.contentDocument.documentElement.scrollHeight){a.height=a.contentDocument.documentElement.scrollHeight+c
}else{a.height=a.contentWindow.document.body.scrollHeight+c
}};
CLOUD.setIframeMinHeight=function(c,d){var b=document.getElementById(c),a;
if(acs.util.isIE9()){b.height="380px";
return
}if(b.contentDocument&&b.contentDocument.documentElement&&b.contentDocument.documentElement.scrollHeight){a=b.contentDocument.documentElement.scrollHeight
}else{a=b.contentWindow.document.body.scrollHeight
}if(a<d){b.height=d
}};
CLOUD.freeTableIconToggle=function(a){if(a.find("td:first-child i").hasClass("icon-plus")){a.find("td:first-child i").removeClass("icon-plus");
a.find("td:first-child i").addClass("icon-minus")
}else{a.find("td:first-child i").removeClass("icon-minus");
a.find("td:first-child i").addClass("icon-plus")
}};
CLOUD.iframeResize=function(a){var b=a.next().find("iframe[autosize=true]"),c=b.attr("id");
if(c!==undefined){if(b.attr("src")===undefined){b.attr("src",b.attr("url"));
b.load(function(){document.getElementById(c).contentWindow.setDivMargin();
document.getElementById(c).contentWindow.autoResize();
CLOUD.resizeIframeHeight(c,0)
})
}}};
CLOUD.enbaleFreeTableShowDetail=function(){var b=$(".free-table tr[showDetail=true]"),a=$(".free-table");
b.parent().parent().children("thead").children("tr").prepend('<th class="w-10"></th>');
b.prepend('<td><a><i class="icon-plus"></i></a></td>');
a.each(function(){var d,c=$(this),e=c.find("tr[showDetail=true]:first td").size();
c.find("tr[showDetail=true]").next().find(":first-child").attr("colspan",e);
c.find("tr[showDetail=true]").on("dblclick",function(){$(this).next().toggle();
CLOUD.iframeResize($(this));
CLOUD.freeTableIconToggle($(this))
});
c.find("tr[showDetail=true] td:first-child a:has(i)").on("click",function(){d=$(this).parent().parent();
d.next().toggle();
CLOUD.iframeResize(d);
CLOUD.freeTableIconToggle(d)
});
c.find("tr[showDetail=true] td a.showDetailLink").on("click",function(){d=$(this).parent().parent();
d.next().toggle();
CLOUD.iframeResize(d);
CLOUD.freeTableIconToggle(d)
})
})
};
$(document).ready(function(){$(window).scroll(function(){return window.scrollY>200?$("#a_scrollup").show():$("#a_scrollup").hide()
});
$("#header-icon-show").on("click",function(){$(".jumbotron").toggleClass("height-auto")
});
$(".sn-close:visible").unbind("click").bind("click",function(){$(".sub-navi>div>ul").slideToggle("fast");
$(".sn-close>i").toggleClass("icon-double-angle-down")
});
$(".collapse").on({shown:function(a){$(this).siblings().find("a > i.icon-collapse-flag").attr("class","icon-collapse-flag icon-minus-sign pull-right f-20");
a.stopPropagation()
},hidden:function(a){$(this).siblings().find("a > i.icon-collapse-flag").attr("class","icon-collapse-flag icon-plus-sign pull-right f-20");
a.stopPropagation()
}});
if($(window).smartresize){$(window).smartresize(acs.responsive.detectResponsive)
}});
var acs=acs||{};
acs.component=acs.component||{};
acs.component.modal={_startX:0,_startY:0,_offsetX:0,_offsetY:0,$dragElement:null,initDragDrop:function(){$(document).mousedown(function(a){acs.component.modal.onMouseDown(a)
});
$(document).mouseup(function(a){acs.component.modal.onMouseUp(a)
})
},initModal:function(a,b){acs.component.modal._startX=b.clientX;
acs.component.modal._startY=b.clientY;
acs.component.modal._offsetX=acs.component.modal.extractNumber(a.parent().css("left"),$(window).width());
acs.component.modal._offsetY=acs.component.modal.extractNumber(a.parent().css("top"),$(window).height());
acs.component.modal.$dragElement=a;
$(document).mousemove(function(c){acs.component.modal.onMouseMove(c)
});
b.stopPropagation();
b.preventDefault()
},onMouseDown:function(b){var a=$(b.target);
if(a!=null&&a.equals&&a.equals($(document))){return false
}if(a.acsData("drag")=="true"){acs.component.modal.initModal(a,b)
}else{var a=$(b.target).parent();
if(a!=null&&a.equals($(document))){return false
}if(a.acsData("drag")=="true"){acs.component.modal.initModal(a,b)
}}return false
},onMouseMove:function(a){acs.component.modal.$dragElement.parent().css({top:acs.component.modal._offsetY+a.clientY-acs.component.modal._startY+"px",left:acs.component.modal._offsetX+a.clientX-acs.component.modal._startX+"px"});
a.stopPropagation();
a.preventDefault()
},onMouseUp:function(a){if(acs.component.modal.$dragElement!=null){$(document).unbind("mousemove");
acs.component.modal.$dragElement=null;
a.stopPropagation();
a.preventDefault()
}},extractNumber:function(d,c){var b=new RegExp("([0-9]+)%");
var a=(d+"").match(b);
if(a){return parseInt((a[1])*c/100)
}var e=parseInt(d);
return e==null||isNaN(e)?0:e
}};
acs.component.tabContainer={responsive:function(b){var a=$("div#"+b);
a.on({"responsive-phone":function(){var c=acs.component.tabContainer.tabsNumber(a);
a.data("responsive-icon","false");
acs.component.tabContainer.revert(a.find("ul.nav-tabs"));
acs.component.tabContainer.hideNumberTabs(a,c,2)
},"responsive-tablet":function(){var c=acs.component.tabContainer.tabsNumber(a);
a.data("responsive-icon","false");
acs.component.tabContainer.revert(a.find("ul.nav-tabs"));
acs.component.tabContainer.hideNumberTabs(a,c,4)
},"responsive-desktop":function(){var c=acs.component.tabContainer.tabsNumber(a);
a.data("responsive-icon","false");
acs.component.tabContainer.revert(a.find("ul.nav-tabs"));
acs.component.tabContainer.hideNumberTabs(a,c,5)
}});
acs.responsive.detectResponsive()
},tabsNumber:function(b){var a=b.find("ul.nav-tabs>li[flag!=true]");
if(a!=undefined){return a.length
}return null
},showIcon:function(a){if(a.data("responsive-icon")!=="true"){acs.component.tabContainer.addIcon(a.find("ul.nav-tabs"));
a.data("responsive-icon","true")
}else{a.find("li[flag=true]").show()
}},hideNumberTabs:function(a,d,b){if(d!=null&&d>b){for(var c=b;
c<d;
c++){acs.component.tabContainer.hideTab(a)
}acs.component.tabContainer.showIcon(a)
}},responsiveTab:function(b){var e=$("#"+b).find(".nav");
acs.component.tabContainer.revert(e);
var f=27*2+180;
var c=acs.component.tabContainer.calculateWidth(b,"li");
var d=e.width();
var a=c+f>d;
while(c+f>d&&e.find("li[flag!=true]:visible").length>1){acs.component.tabContainer.hideTab(e);
c=acs.component.tabContainer.calculateWidth(b,"li:visible")
}if(a){if(e.find("li:first").attr("flag")!="true"){acs.component.tabContainer.addIcon(e);
acs.component.tabContainer.detectIconTabs(e)
}}},revert:function(a){a.find("li:hidden").show();
a.find("li[flag=true]").remove()
},detectIconTabs:function(a){if(a.find("li[flag!=true]:first").is(":visible")){a.find("li:first[flag=true]").hide()
}else{a.find("li:first[flag=true]").show()
}if(a.find("li[flag!=true]:last").is(":visible")){a.find("li:last[flag=true]").hide()
}else{a.find("li:last[flag=true]").show()
}},addIcon:function(c){$('<li flag="true"><a href="#" style="padding-left:7px; padding-right:3px; padding-top:3px;margin-top:2px; margin-right:-1px;-moz-border-radius-topright: 0px;-webkit-border-top-right-radius: 0px;border-top-right-radius: 0px;"><i class="icon-angle-left icon-large"/>&nbsp;</a></li>').prependTo(c);
$('<li flag="true"><a href="#" style="padding-left:7px; padding-right:3px; padding-top:3px;margin-top:2px; margin-left:-3px;-moz-border-radius-topleft: 0px;-webkit-border-top-left-radius: 0px;border-top-left-radius: 0px;"><i class="icon-angle-right icon-large"/>&nbsp;</a></li>').appendTo(c);
var d=c.find("li[flag!=true]:visible:first").index()+1;
var b=c.find("li[flag!=true]:visible:last").index()+1;
var a=c.find("li").length;
c.find("a:first").click(function(){if(d!=2){d-=1;
c.find("li:nth-child("+d+")").show();
c.find("li:nth-child("+b+")").hide();
b-=1;
acs.component.tabContainer.detectIconTabs(c)
}});
c.find("a:last").click(function(){if(b!=a-1){b+=1;
c.find("li:nth-child("+d+")").hide();
c.find("li:nth-child("+b+")").show();
d+=1;
acs.component.tabContainer.detectIconTabs(c)
}})
},calculateWidth:function(a,b){var e=$("#"+a);
var c=0;
var d=e.find(".nav").find(b);
d.each(function(f){c+=$(this).width()
});
return c
},hideTab:function(a){if(a.find("li[flag!=true]:visible:first").attr("class")=="active"){a.find("li[flag!=true]:visible:last").hide()
}else{a.find("li[flag!=true]:visible:first").hide()
}}};
acs.component.layout={counter:0,from:0,enableAlign:function(a){acs.component.layout.counter=0;
$("#"+a+" > div").each(function(c){var e=$(this).attr("class");
var d=new RegExp("span([0-9]+)");
var b=e.match(d);
if(b){if(acs.component.layout.counter+parseInt(b[1])>12){$(this).css("margin-left","0px");
acs.component.layout.counter=parseInt(b[1])
}else{acs.component.layout.counter+=parseInt(b[1])
}}})
},enableAutoHeight:function(a){acs.component.layout.counter=0;
$("#"+a+" > div").each(function(c){var e=$(this).attr("class");
var d=new RegExp("span([0-9]+)");
var b=e.match(d);
if(b){if(acs.component.layout.counter+parseInt(b[1])>12){acs.component.layout._setSameHeight(a,parseInt(acs.component.layout.from),parseInt(c));
acs.component.layout.counter=parseInt(b[1]);
acs.component.layout.from=c
}else{acs.component.layout.counter+=parseInt(b[1])
}}})
},_setSameHeight:function(d,c,b){var a=0;
$("#"+d+" > div").each(function(f){if(f>=b){return false
}if(f>=c){var e=parseInt($(this).height());
if(e>a){a=e
}}});
if(a>0){$("#"+d+" > div").each(function(e){if(e>=b){return false
}if(e>=c){$(this).height(a)
}})
}}};
acs.component.datatable={iframeInDetail:function(b){if(b==null){return
}var c=b.acsData("src");
if(c!=null&&c!=""){b.attr("src",c);
if(b.contentWindow){b.contentWindow.location.reload()
}b.acsData("src","")
}var a=b.acsData("autoheight");
if(a=="true"){b.load(function(){var d=b.attr("id");
if(d!=null){CLOUD.resizeIframeHeight(d,10)
}})
}},showDetailToggle:function(a){a.next().stop().toggle();
var b=a.find("i[class~=show-detail-icon]");
if(b.hasClass("icon-plus")){b.removeClass("icon-plus").addClass("icon-minus");
acs.component.datatable.iframeInDetail(a.next().find("iframe"))
}else{if(b.hasClass("icon-minus")){b.removeClass("icon-minus").addClass("icon-plus")
}}},tableShowDetail:function(d){var b=$("#"+d);
if(b.find("th:acsAttribute(showDetailCol,true)").length==0){var a=b.find("thead th:first-child");
a.before('<th acs-showDetailCol="true" class="w-10"></th>');
var c=b.find("tr.expand td:first-child");
c.before('<td acs-showDetailCol="true"><a onclick="return false;" style="cursor: pointer"><i class="icon-plus show-detail-icon"/></a></td>');
b.find("tbody tr:acsAttribute(showDetail,true) i[class~=show-detail-icon]").click(function(){var f=b.find("thead th").size()-b.find("thead th:hidden").size();
if(!$(this).parents("tr").next().find("td.detailTd").is(":empty")){$(this).parents("tr").next().find("td.detailTd").attr("colspan",f);
$(this).parents("tr").next().stop().toggle();
var e=$(this);
if(e.hasClass("icon-plus")){e.removeClass("icon-plus").addClass("icon-minus");
acs.component.datatable.iframeInDetail($(this).parents("tr").next().find("iframe"))
}else{if(e.hasClass("icon-minus")){e.removeClass("icon-minus").addClass("icon-plus")
}}}});
b.find("tbody tr:acsAttribute(showDetail,true)").dblclick(function(f){var i=b.find("thead th").size()-b.find("thead th:hidden").size();
var g=$(this).next();
if(!g.find("td.detailTd").is(":empty")){g.find("td.detailTd").attr("colspan",i);
g.stop().toggle();
var h=$(this).find("i[class~=show-detail-icon]");
if(h.hasClass("icon-plus")){h.removeClass("icon-plus").addClass("icon-minus");
acs.component.datatable.iframeInDetail($(this).next().find("iframe"))
}else{if(h.hasClass("icon-minus")){h.removeClass("icon-minus").addClass("icon-plus")
}}}})
}if(!(b.acsData("showdetail")=="true")){b.find("th:acsAttribute(showDetailCol,true)").hide();
b.find("td:acsAttribute(showDetailCol,true)").hide()
}},funcResponse:function(c,b){var a=c.find("thead th").filter(".hide-"+b);
c.find("tbody tr[class='detail']").each(function(){if($(this).find(".resShowDiv-"+b+"").length==0){var d=$(this);
var e=d.find("td[class='detailTd']");
$(this).prev().find(".hide-"+b+"").each(function(f){acs.component.datatable.insertShowDetailCon(e,$(this),a.eq(f),b)
})
}});
$(".hide-"+b+"").hide()
},insertShowDetailCon:function(g,f,c,d){var e=g.find("div.show-detail-con");
if(e==null||e==NaN||e.length==0){g.prepend("<div acs-index='"+f.acsData("index")+"' class='resShowDiv-"+d+" row-fluid show-detail-con'><label class='i-b m-l-20 p-l-2 f-i c-666'>"+c.text()+": </label> "+f.html()+"</div>")
}else{if(parseInt(e.first().acsData("index"))>parseInt(f.acsData("index"))){g.prepend("<div acs-index='"+f.acsData("index")+"' class='resShowDiv-"+d+" row-fluid show-detail-con'><label class='i-b m-l-20 p-l-2 f-i c-666'>"+c.text()+": </label> "+f.html()+"</div>")
}else{var a=false;
e.each(function(h){if(parseInt(e.eq(h).acsData("index"))>parseInt(f.acsData("index"))){e.eq(h).before("<div acs-index='"+f.acsData("index")+"' class='resShowDiv-"+d+" row-fluid show-detail-con'><label class='i-b m-l-20 p-l-2 f-i c-666'>"+c.text()+": </label> "+f.html()+"</div>");
a=true;
return false
}});
if(!a){var b=e.last();
if(b!=null&&b!=NaN){b.after("<div acs-index='"+f.acsData("index")+"' class='resShowDiv-"+d+" row-fluid show-detail-con'><label class='i-b m-l-20 p-l-2 f-i c-666'>"+c.text()+": </label> "+f.html()+"</div>")
}}}}},enableResponsiveDataTable:function(a){acs.component.datatable.tableResponsive(a);
acs.responsive.detectResponsive()
},addResponsiveClassForDataTable:function(f){var b=f.acsData("tabresponsivecols");
if(b!=null){var d=b.split(",");
acs.component.datatable.flagWithClass(f.find("thead tr[class!=detail] th"),d,"hide-tablet");
f.find("tbody tr[class!=detail]").each(function(g){acs.component.datatable.flagWithClass($(this).find("td"),d,"hide-tablet")
})
}var a=f.acsData("phoneresponsivecols");
if(a!=null){var e=a.split(",");
acs.component.datatable.flagWithClass(f.find("thead tr[class!=detail] th"),e,"hide-phone");
f.find("tbody tr[class!=detail]").each(function(g){acs.component.datatable.flagWithClass($(this).find("td"),e,"hide-phone")
})
}var c=f.acsData("desktopresponsivecols");
if(c!=null){var d=c.split(",");
acs.component.datatable.flagWithClass(f.find("thead tr[class!=detail] th"),d,"hide-desktop");
f.find("tbody tr[class!=detail]").each(function(g){acs.component.datatable.flagWithClass($(this).find("td"),d,"hide-desktop")
})
}},flagWithClass:function(b,a,c){b.each(function(d){if(acs.util.arrayContains(a,d)){$(this).attr("class",c+" "+$(this).attr("class"));
$(this).acsData("index",d)
}})
},tableResponsive:function(b){var a=$("#"+b);
if(a.length==0){a=$("[id*='"+b+"']")
}acs.component.datatable.addResponsiveClassForDataTable(a);
a.on({"responsive-phone":function(){acs.component.datatable.funcResponse($(this),"phone");
acs.component.datatable.funcResponse($(this),"tablet");
acs.component.datatable.funcResponse($(this),"desktop");
if($(this).find(".resShowDiv-phone").length==0&&!$(this).is(":acsAttribute(showdetail,true)")){$(this).find("th:acsAttribute(showDetailCol,true)").hide();
$(this).find("td:acsAttribute(showDetailCol,true)").hide()
}else{$(this).find("th:acsAttribute(showDetailCol,true)").show();
$(this).find("td:acsAttribute(showDetailCol,true)").show()
}if($(this).acsData("disableautodetails")=="true"){$(this).find("td.detailTd > div.resShowDiv-desktop").hide();
$(this).find("td.detailTd > div.resShowDiv-tablet").hide();
$(this).find("td.detailTd > div.resShowDiv-phone").hide()
}},"responsive-tablet":function(){$(this).find(".resShowDiv-phone").remove();
acs.component.datatable.funcResponse($(this),"tablet");
acs.component.datatable.funcResponse($(this),"desktop");
$(this).find(".hide-phone").show();
if($(this).find(".resShowDiv-tablet").length==0&&!$(this).is(":acsAttribute(showdetail,true)")){$(this).find("th:acsAttribute(showDetailCol,true)").hide();
$(this).find("td:acsAttribute(showDetailCol,true)").hide()
}else{$(this).find("th:acsAttribute(showDetailCol,true)").show();
$(this).find("td:acsAttribute(showDetailCol,true)").show()
}if($(this).acsData("disableautodetails")=="true"){$(this).find("td.detailTd > div.resShowDiv-desktop").hide();
$(this).find("td.detailTd > div.resShowDiv-tablet").hide();
$(this).find("td.detailTd > div.resShowDiv-phone").hide()
}},"responsive-desktop":function(){$(this).find(".resShowDiv-tablet").remove();
$(this).find(".resShowDiv-phone").remove();
acs.component.datatable.funcResponse($(this),"desktop");
$(this).find(".hide-tablet").show();
$(this).find(".hide-phone").show();
var c=$(this).find("tbody td[class='detailTd']");
if(c.is(":empty")){var d=$(this).find(".show-detail-icon");
if($(this).is(":acsAttribute(showdetail,true)")){$(this).find("th:acsAttribute(showDetailCol,true)").show();
$(this).find("td:acsAttribute(showDetailCol,true)").show()
}else{$(this).find("th:acsAttribute(showDetailCol,true)").hide();
$(this).find("td:acsAttribute(showDetailCol,true)").hide()
}if(d.hasClass("icon-minus")){d.removeClass("icon-minus").addClass("icon-plus")
}c.parent().hide()
}else{$(this).find("th:acsAttribute(showDetailCol,true)").show();
$(this).find("td:acsAttribute(showDetailCol,true)").show()
}if($(this).acsData("disableautodetails")=="true"){$(this).find("td.detailTd > div.resShowDiv-desktop").hide();
$(this).find("td.detailTd > div.resShowDiv-tablet").hide();
$(this).find("td.detailTd > div.resShowDiv-phone").hide()
}}})
}};
acs.component.formContainer={enablePlaceHolder:function(a){if(navigator.appName=="Microsoft Internet Explorer"||acs.util.isFirefox3_6()){$("#"+a).find("[placeholder]").each(function(){var d=$(this);
d.focus(function(){$(this).next("label").remove()
}).blur(function(){if($(this).attr("value")==""){$(this).next("label").remove();
var h=$("<label style='position: relative;color: #c9c9c9;display: inline'>"+$(this).attr("placeholder")+"</label>");
h.insertAfter($(this));
var j=$(this).css("width");
var g;
if(g=j.match(new RegExp("([0-9]*)px"))){h.css("left","-"+(parseInt(g[1])+12)+"px");
h.css("top","3px")
}var k=acs.util.escapeQuoteId($(this).attr("id"));
var i=$("#"+k).next("label");
i.css("margin-right","-"+i.css("width"))
}});
if(d.attr("value")==""){$(this).next("label").remove();
var c=$("<label style='position: relative;color: #c9c9c9;display: inline'>"+$(this).attr("placeholder")+"</label>");
c.insertAfter($(this));
var e=$(this).css("width");
var b;
if(b=e.match(new RegExp("([0-9]*)px"))){c.css("left","-"+(parseInt(b[1])+12)+"px");
c.css("top","3px")
}var f=acs.util.escapeQuoteId($(this).attr("id"));
setTimeout(function(){var g=$("#"+f).next("label");
g.css("margin-right","-"+g.css("width"))
},300)
}})
}}};
acs.util={escapeQuoteId:function(a){return a.replace(/:/g,"\\:")
},isIE8:function(){var d=new RegExp("MSIE ([0-9]*)\\.([0-9]*)");
var a=(navigator.userAgent+"").match(d);
if(a){var c=a[1];
var b=a[2];
if(c==8){return true
}}return false
},isIE9:function(){var d=new RegExp("MSIE ([0-9]*)\\.([0-9]*)");
var a=(navigator.userAgent+"").match(d);
if(a){var c=a[1];
var b=a[2];
if(c==9){return true
}}return false
},isFirefox3_6:function(){var d=new RegExp("Firefox/([0-9]*)\\.([0-9]*)");
var a=(navigator.userAgent+"").match(d);
if(a){var c=a[1];
var b=a[2];
if(c==3&&b==6){return true
}}return false
},arrayContains:function(a,c){if(a!=null&&a.length!=null){for(var b=0;
b<a.length;
b++){if(a[b]==c){return true
}}}return false
},rebindAccordion:function(a){if(a!=null&&a!=undefined){$("#"+a).bind("click",function(){var b=$(this).find("i.icon-collapse-flag");
if(b.hasClass("icon-minus-sign")){b.removeClass("icon-minus-sign");
b.addClass("icon-plus-sign")
}else{if(b.hasClass("icon-plus-sign")){b.removeClass("icon-plus-sign");
b.addClass("icon-minus-sign")
}}})
}}};
acs.responsive={addCssForPhoneFlag:false,addCssForPhone:function(){if(!acs.responsive.addCssForPhoneFlag&&!acs.util.isIE8()){var a=document.createElement("style");
a.type="text/css";
a.innerHTML='table .p-w-a[class*="w-"] { width: auto; word-break:break-all; white-space:normal;}';
document.body.appendChild(a);
acs.responsive.addCssForPhoneFlag=true
}},detectResponsive:function(){var b=true;
var a;
var c=$(window).width();
if(c<600){a="responsive-phone";
acs.responsive.addCssForPhone()
}if(600<=c&&c<=979){a="responsive-tablet"
}if(979<c){a="responsive-desktop"
}if($(window).data("responsive-flag")!==a){$("table:acsAttribute(responsive,true)").trigger(a)
}$(window).data("responsive-flag",b)
},detectTableResponsive:function(b){var c=true;
var a;
var d=$(window).width();
if(d<600){a="responsive-phone";
acs.responsive.addCssForPhone()
}if(600<=d&&d<=979){a="responsive-tablet"
}if(979<d){a="responsive-desktop"
}if($(window).data("responsive-flag")!==a){$("[id*='"+b+"']").trigger(a)
}$(window).data("responsive-flag",c)
}};
acs.component.commonSearch={showOrClose:function(a){$("."+a+"_display").toggleClass("displayN");
$("#AS_icon"+a).toggleClass("icon-double-angle-up");
$("#AS_icon"+a).toggleClass("icon-double-angle-down")
}};
!function(a){a(function(){a.support.transition=(function(){var b=(function(){var e=document.createElement("bootstrap"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;
for(c in d){if(e.style[c]!==undefined){return d[c]
}}}());
return b&&{end:b}
})()
})
}(window.jQuery);
!function(d){var c='[data-dismiss="alert"]',b=function(e){d(e).on("click",c,this.close)
};
b.prototype.close=function(j){var i=d(this),g=i.attr("data-target"),h;
if(!g){g=i.attr("href");
g=g&&g.replace(/.*(?=#[^\s]*$)/,"")
}h=d(g);
j&&j.preventDefault();
h.length||(h=i.hasClass("alert")?i:i.parent());
h.trigger(j=d.Event("close"));
if(j.isDefaultPrevented()){return
}h.removeClass("in");
function f(){h.trigger("closed").remove()
}d.support.transition&&h.hasClass("fade")?h.on(d.support.transition.end,f):f()
};
var a=d.fn.alert;
d.fn.alert=function(e){return this.each(function(){var g=d(this),f=g.data("alert");
if(!f){g.data("alert",(f=new b(this)))
}if(typeof e=="string"){f[e].call(g)
}})
};
d.fn.alert.Constructor=b;
d.fn.alert.noConflict=function(){d.fn.alert=a;
return this
};
d(document).on("click.alert.data-api",c,b.prototype.close)
}(window.jQuery);
!function(c){var b=function(e,d){this.$element=c(e);
this.options=c.extend({},c.fn.button.defaults,d)
};
b.prototype.setState=function(g){var i="disabled",e=this.$element,f=e.data(),h=e.is("input")?"val":"html";
g=g+"Text";
f.resetText||e.data("resetText",e[h]());
e[h](f[g]||this.options[g]);
setTimeout(function(){g=="loadingText"?e.addClass(i).attr(i,i):e.removeClass(i).removeAttr(i)
},0)
};
b.prototype.toggle=function(){var d=this.$element.closest('[data-toggle="buttons-radio"]');
d&&d.find(".active").removeClass("active");
this.$element.toggleClass("active")
};
var a=c.fn.button;
c.fn.button=function(d){return this.each(function(){var g=c(this),f=g.data("button"),e=typeof d=="object"&&d;
if(!f){g.data("button",(f=new b(this,e)))
}if(d=="toggle"){f.toggle()
}else{if(d){f.setState(d)
}}})
};
c.fn.button.defaults={loadingText:"loading..."};
c.fn.button.Constructor=b;
c.fn.button.noConflict=function(){c.fn.button=a;
return this
};
c(document).on("click.button.data-api","[data-toggle^=button]",function(f){var d=c(f.target);
if(!d.hasClass("btn")){d=d.closest(".btn")
}d.button("toggle")
})
}(window.jQuery);
!function(b){var c=function(e,d){this.$element=b(e);
this.options=d;
this.options.pause=="hover"&&this.$element.on("mouseenter",b.proxy(this.pause,this)).on("mouseleave",b.proxy(this.cycle,this))
};
c.prototype={cycle:function(d){if(!d){this.paused=false
}this.options.interval&&!this.paused&&(this.interval=setInterval(b.proxy(this.next,this),this.options.interval));
return this
},to:function(h){var d=this.$element.find(".item.active"),e=d.parent().children(),f=e.index(d),g=this;
if(h>(e.length-1)||h<0){return
}if(this.sliding){return this.$element.one("slid",function(){g.to(h)
})
}if(f==h){return this.pause().cycle()
}return this.slide(h>f?"next":"prev",b(e[h]))
},pause:function(d){if(!d){this.paused=true
}if(this.$element.find(".next, .prev").length&&b.support.transition.end){this.$element.trigger(b.support.transition.end);
this.cycle()
}clearInterval(this.interval);
this.interval=null;
return this
},next:function(){if(this.sliding){return
}return this.slide("next")
},prev:function(){if(this.sliding){return
}return this.slide("prev")
},slide:function(k,f){var m=this.$element.find(".item.active"),d=f||m[k](),j=this.interval,l=k=="next"?"left":"right",g=k=="next"?"first":"last",h=this,i;
this.sliding=true;
j&&this.pause();
d=d.length?d:this.$element.find(".item")[g]();
i=b.Event("slide",{relatedTarget:d[0]});
if(d.hasClass("active")){return
}if(b.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(i);
if(i.isDefaultPrevented()){return
}d.addClass(k);
d[0].offsetWidth;
m.addClass(l);
d.addClass(l);
this.$element.one(b.support.transition.end,function(){d.removeClass([k,l].join(" ")).addClass("active");
m.removeClass(["active",l].join(" "));
h.sliding=false;
setTimeout(function(){h.$element.trigger("slid")
},0)
})
}else{this.$element.trigger(i);
if(i.isDefaultPrevented()){return
}m.removeClass("active");
d.addClass("active");
this.sliding=false;
this.$element.trigger("slid")
}j&&this.cycle();
return this
}};
var a=b.fn.carousel;
b.fn.carousel=function(d){return this.each(function(){var h=b(this),g=h.data("carousel"),e=b.extend({},b.fn.carousel.defaults,typeof d=="object"&&d),f=typeof d=="string"?d:e.slide;
if(!g){h.data("carousel",(g=new c(this,e)))
}if(typeof d=="number"){g.to(d)
}else{if(f){g[f]()
}else{if(e.interval){g.cycle()
}}}})
};
b.fn.carousel.defaults={interval:5000,pause:"hover"};
b.fn.carousel.Constructor=c;
b.fn.carousel.noConflict=function(){b.fn.carousel=a;
return this
};
b(document).on("click.carousel.data-api","[data-slide]",function(i){var h=b(this),f,d=b(h.attr("data-target")||(f=h.attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")),g=b.extend({},d.data(),h.data());
d.carousel(g);
i.preventDefault()
})
}(window.jQuery);
!function(b){var c=function(e,d){this.$element=b(e);
this.options=b.extend({},b.fn.collapse.defaults,d);
if(this.options.parent){this.$parent=b(this.options.parent)
}this.options.toggle&&this.toggle()
};
c.prototype={constructor:c,dimension:function(){var d=this.$element.hasClass("width");
return d?"width":"height"
},show:function(){var g,d,f,e;
if(this.transitioning){return
}g=this.dimension();
d=b.camelCase(["scroll",g].join("-"));
f=this.$parent&&this.$parent.find("> .accordion-group > .in");
if(f&&f.length){e=f.data("collapse");
if(e&&e.transitioning){return
}f.collapse("hide");
e||f.data("collapse",null)
}this.$element[g](0);
this.transition("addClass",b.Event("show"),"shown");
b.support.transition&&this.$element[g](this.$element[0][d])
},hide:function(){var d;
if(this.transitioning){return
}d=this.dimension();
this.reset(this.$element[d]());
this.transition("removeClass",b.Event("hide"),"hidden");
this.$element[d](0)
},reset:function(d){var e=this.dimension();
this.$element.removeClass("collapse")[e](d||"auto")[0].offsetWidth;
this.$element[d!==null?"addClass":"removeClass"]("collapse");
return this
},transition:function(h,e,f){var g=this,d=function(){if(e.type=="show"){g.reset()
}g.transitioning=0;
g.$element.trigger(f)
};
this.$element.trigger(e);
if(e.isDefaultPrevented()){return
}this.transitioning=1;
this.$element[h]("in");
b.support.transition&&this.$element.hasClass("collapse")?this.$element.one(b.support.transition.end,d):d()
},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()
}};
var a=b.fn.collapse;
b.fn.collapse=function(d){return this.each(function(){var g=b(this),f=g.data("collapse"),e=typeof d=="object"&&d;
if(!f){g.data("collapse",(f=new c(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
b.fn.collapse.defaults={toggle:true};
b.fn.collapse.Constructor=c;
b.fn.collapse.noConflict=function(){b.fn.collapse=a;
return this
};
b(document).on("click.collapse.data-api","[data-toggle=collapse]",function(i){var h=b(this),d,g=h.attr("data-target")||i.preventDefault()||(d=h.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=b(g).data("collapse")?"toggle":h.data();
h[b(g).hasClass("in")?"addClass":"removeClass"]("collapsed");
b(g).collapse(f)
})
}(window.jQuery);
!function(f){var b="[data-toggle=dropdown]",a=function(h){var g=f(h).on("click.dropdown.data-api",this.toggle);
f("html").on("click.dropdown.data-api",function(){g.parent().removeClass("open")
})
};
a.prototype={constructor:a,toggle:function(j){var i=f(this),h,g;
if(i.is(".disabled, :disabled")){return
}h=e(i);
g=h.hasClass("open");
d();
if(!g){h.toggleClass("open")
}i.focus();
return false
},keydown:function(l){var k,m,g,j,i,h;
if(!/(38|40|27)/.test(l.keyCode)){return
}k=f(this);
l.preventDefault();
l.stopPropagation();
if(k.is(".disabled, :disabled")){return
}j=e(k);
i=j.hasClass("open");
if(!i||(i&&l.keyCode==27)){return k.click()
}m=f("[role=menu] li:not(.divider):visible a",j);
if(!m.length){return
}h=m.index(m.filter(":focus"));
if(l.keyCode==38&&h>0){h--
}if(l.keyCode==40&&h<m.length-1){h++
}if(!~h){h=0
}m.eq(h).focus()
}};
function d(){f(b).each(function(){e(f(this)).removeClass("open")
})
}function e(i){var g=i.attr("data-target"),h;
if(!g){g=i.attr("href");
g=g&&/#/.test(g)&&g.replace(/.*(?=#[^\s]*$)/,"")
}h=f(g);
h.length||(h=i.parent());
return h
}var c=f.fn.dropdown;
f.fn.dropdown=function(g){return this.each(function(){var i=f(this),h=i.data("dropdown");
if(!h){i.data("dropdown",(h=new a(this)))
}if(typeof g=="string"){h[g].call(i)
}})
};
f.fn.dropdown.Constructor=a;
f.fn.dropdown.noConflict=function(){f.fn.dropdown=c;
return this
};
f(document).on("click.dropdown.data-api touchstart.dropdown.data-api",d).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(g){g.stopPropagation()
}).on("touchstart.dropdown.data-api",".dropdown-menu",function(g){g.stopPropagation()
}).on("click.dropdown.data-api touchstart.dropdown.data-api",b,a.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",b+", [role=menu]",a.prototype.keydown)
}(window.jQuery);
!function(c){var b=function(e,d){this.options=d;
this.$element=c(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",c.proxy(this.hide,this));
this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)
};
b.prototype={constructor:b,toggle:function(){return this[!this.isShown?"show":"hide"]()
},show:function(){var d=this,f=c.Event("show");
this.$element.trigger(f);
if(this.isShown||f.isDefaultPrevented()){return
}this.isShown=true;
this.escape();
this.backdrop(function(){var e=c.support.transition&&d.$element.hasClass("fade");
if(!d.$element.parent().length){d.$element.appendTo(document.body)
}d.$element.show();
if(e){d.$element[0].offsetWidth
}d.$element.addClass("in").attr("aria-hidden",false);
d.enforceFocus();
e?d.$element.one(c.support.transition.end,function(){d.$element.focus().trigger("shown")
}):d.$element.focus().trigger("shown")
})
},hide:function(f){f&&f.preventDefault();
var d=this;
f=c.Event("hide");
this.$element.trigger(f);
if(!this.isShown||f.isDefaultPrevented()){return
}this.isShown=false;
this.escape();
c(document).off("focusin.modal");
this.$element.removeClass("in").attr("aria-hidden",true);
c.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()
},enforceFocus:function(){var d=this;
c(document).on("focusin.modal",function(f){if(d.$element[0]!==f.target&&!d.$element.has(f.target).length){d.$element.focus()
}})
},escape:function(){var d=this;
if(this.isShown&&this.options.keyboard){this.$element.on("keyup.dismiss.modal",function(f){f.which==27&&d.hide()
})
}else{if(!this.isShown){this.$element.off("keyup.dismiss.modal")
}}},hideWithTransition:function(){var d=this,e=setTimeout(function(){d.$element.off(c.support.transition.end);
d.hideModal()
},500);
this.$element.one(c.support.transition.end,function(){clearTimeout(e);
d.hideModal()
})
},hideModal:function(d){this.$element.hide().trigger("hidden");
this.backdrop()
},removeBackdrop:function(){this.$backdrop.remove();
this.$backdrop=null
},backdrop:function(g){var f=this,e=this.$element.hasClass("fade")?"fade":"";
if(this.isShown&&this.options.backdrop){var d=c.support.transition&&e;
this.$backdrop=c('<div class="modal-backdrop '+e+'" />').appendTo(document.body);
this.$backdrop.click(this.options.backdrop=="static"?c.proxy(this.$element[0].focus,this.$element[0]):c.proxy(this.hide,this));
if(d){this.$backdrop[0].offsetWidth
}this.$backdrop.addClass("in");
d?this.$backdrop.one(c.support.transition.end,g):g()
}else{if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");
c.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(c.support.transition.end,c.proxy(this.removeBackdrop,this)):this.removeBackdrop()
}else{if(g){g()
}}}}};
var a=c.fn.modal;
c.fn.modal=function(d){return this.each(function(){var g=c(this),f=g.data("modal"),e=c.extend({},c.fn.modal.defaults,g.data(),typeof d=="object"&&d);
if(!f){g.data("modal",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}else{if(e.show){f.show()
}}})
};
c.fn.modal.defaults={backdrop:true,keyboard:true,show:true};
c.fn.modal.Constructor=b;
c.fn.modal.noConflict=function(){c.fn.modal=a;
return this
};
c(document).on("click.modal.data-api",'[data-toggle="modal"]',function(i){var h=c(this),f=h.attr("href"),d=c(h.attr("data-target")||(f&&f.replace(/.*(?=#[^\s]+$)/,""))),g=d.data("modal")?"toggle":c.extend({remote:!/#/.test(f)&&f},d.data(),h.data());
i.preventDefault();
d.modal(g).one("hide",function(){h.focus()
})
})
}(window.jQuery);
!function(c){var b=function(e,d){this.init("tooltip",e,d)
};
b.prototype={constructor:b,init:function(g,f,e){var h,d;
this.type=g;
this.$element=c(f);
this.options=this.getOptions(e);
this.enabled=true;
if(this.options.trigger=="click"){this.$element.on("click."+this.type,this.options.selector,c.proxy(this.toggle,this))
}else{if(this.options.trigger!="manual"){h=this.options.trigger=="hover"?"mouseenter":"focus";
d=this.options.trigger=="hover"?"mouseleave":"blur";
this.$element.on(h+"."+this.type,this.options.selector,c.proxy(this.enter,this));
this.$element.on(d+"."+this.type,this.options.selector,c.proxy(this.leave,this))
}}this.options.selector?(this._options=c.extend({},this.options,{trigger:"manual",selector:""})):this.fixTitle()
},getOptions:function(d){d=c.extend({},c.fn[this.type].defaults,d,this.$element.data());
if(d.delay&&typeof d.delay=="number"){d.delay={show:d.delay,hide:d.delay}
}return d
},enter:function(f){var d=c(f.currentTarget)[this.type](this._options).data(this.type);
if(!d.options.delay||!d.options.delay.show){return d.show()
}clearTimeout(this.timeout);
d.hoverState="in";
this.timeout=setTimeout(function(){if(d.hoverState=="in"){d.show()
}},d.options.delay.show)
},leave:function(f){var d=c(f.currentTarget)[this.type](this._options).data(this.type);
if(this.timeout){clearTimeout(this.timeout)
}if(!d.options.delay||!d.options.delay.hide){return d.hide()
}d.hoverState="out";
this.timeout=setTimeout(function(){if(d.hoverState=="out"){d.hide()
}},d.options.delay.hide)
},show:function(){var h,d,j,f,i,e,g;
if(this.hasContent()&&this.enabled){h=this.tip();
this.setContent();
if(this.options.animation){h.addClass("fade")
}e=typeof this.options.placement=="function"?this.options.placement.call(this,h[0],this.$element[0]):this.options.placement;
d=/in/.test(e);
h.detach().css({top:0,left:0,display:"block"}).insertAfter(this.$element);
j=this.getPosition(d);
f=h[0].offsetWidth;
i=h[0].offsetHeight;
switch(d?e.split(" ")[1]:e){case"bottom":g={top:j.top+j.height,left:j.left+j.width/2-f/2};
break;
case"top":g={top:j.top-i,left:j.left+j.width/2-f/2};
break;
case"left":g={top:j.top+j.height/2-i/2,left:j.left-f};
break;
case"right":g={top:j.top+j.height/2-i/2,left:j.left+j.width};
break
}h.offset(g).addClass(e).addClass("in")
}},setContent:function(){var e=this.tip(),d=this.getTitle();
e.find(".tooltip-inner")[this.options.html?"html":"text"](d);
e.removeClass("fade in top bottom left right")
},hide:function(){var d=this,e=this.tip();
e.removeClass("in");
function f(){var g=setTimeout(function(){e.off(c.support.transition.end).detach()
},500);
e.one(c.support.transition.end,function(){clearTimeout(g);
e.detach()
})
}c.support.transition&&this.$tip.hasClass("fade")?f():e.detach();
return this
},fixTitle:function(){var d=this.$element;
if(d.attr("title")||typeof(d.attr("data-original-title"))!="string"){d.attr("data-original-title",d.attr("title")||"").removeAttr("title")
}},hasContent:function(){return this.getTitle()
},getPosition:function(d){return c.extend({},(d?{top:0,left:0}:this.$element.offset()),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})
},getTitle:function(){var f,d=this.$element,e=this.options;
f=d.attr("data-original-title")||(typeof e.title=="function"?e.title.call(d[0]):e.title);
return f
},tip:function(){return this.$tip=this.$tip||c(this.options.template)
},validate:function(){if(!this.$element[0].parentNode){this.hide();
this.$element=null;
this.options=null
}},enable:function(){this.enabled=true
},disable:function(){this.enabled=false
},toggleEnabled:function(){this.enabled=!this.enabled
},toggle:function(f){var d=c(f.currentTarget)[this.type](this._options).data(this.type);
d[d.tip().hasClass("in")?"hide":"show"]()
},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)
}};
var a=c.fn.tooltip;
c.fn.tooltip=function(d){return this.each(function(){var g=c(this),f=g.data("tooltip"),e=typeof d=="object"&&d;
if(!f){g.data("tooltip",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
c.fn.tooltip.Constructor=b;
c.fn.tooltip.defaults={animation:true,placement:"top",selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:false};
c.fn.tooltip.noConflict=function(){c.fn.tooltip=a;
return this
}
}(window.jQuery);
!function(c){var b=function(e,d){this.init("popover",e,d)
};
b.prototype=c.extend({},c.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var f=this.tip(),e=this.getTitle(),d=this.getContent();
f.find(".popover-title")[this.options.html?"html":"text"](e);
f.find(".popover-content")[this.options.html?"html":"text"](d);
f.removeClass("fade top bottom left right in")
},hasContent:function(){return this.getTitle()||this.getContent()
},getContent:function(){var e,d=this.$element,f=this.options;
e=d.attr("data-content")||(typeof f.content=="function"?f.content.call(d[0]):f.content);
return e
},tip:function(){if(!this.$tip){this.$tip=c(this.options.template)
}return this.$tip
},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)
}});
var a=c.fn.popover;
c.fn.popover=function(d){return this.each(function(){var g=c(this),f=g.data("popover"),e=typeof d=="object"&&d;
if(!f){g.data("popover",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
c.fn.popover.Constructor=b;
c.fn.popover.defaults=c.extend({},c.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'});
c.fn.popover.noConflict=function(){c.fn.popover=a;
return this
}
}(window.jQuery);
!function(c){function b(g,f){var h=c.proxy(this.process,this),d=c(g).is("body")?c(window):c(g),e;
this.options=c.extend({},c.fn.scrollspy.defaults,f);
this.$scrollElement=d.on("scroll.scroll-spy.data-api",h);
this.selector=(this.options.target||((e=c(g).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,""))||"")+" .nav li > a";
this.$body=c("body");
this.refresh();
this.process()
}b.prototype={constructor:b,refresh:function(){var d=this,e;
this.offsets=c([]);
this.targets=c([]);
e=this.$body.find(this.selector).map(function(){var g=c(this),f=g.data("target")||g.attr("href"),h=/^#\w/.test(f)&&c(f);
return(h&&h.length&&[[h.position().top+d.$scrollElement.scrollTop(),f]])||null
}).sort(function(g,f){return g[0]-f[0]
}).each(function(){d.offsets.push(this[0]);
d.targets.push(this[1])
})
},process:function(){var j=this.$scrollElement.scrollTop()+this.options.offset,f=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,h=f-this.$scrollElement.height(),g=this.offsets,d=this.targets,k=this.activeTarget,e;
if(j>=h){return k!=(e=d.last()[0])&&this.activate(e)
}for(e=g.length;
e--;
){k!=d[e]&&j>=g[e]&&(!g[e+1]||j<=g[e+1])&&this.activate(d[e])
}},activate:function(f){var e,d;
this.activeTarget=f;
c(this.selector).parent(".active").removeClass("active");
d=this.selector+'[data-target="'+f+'"],'+this.selector+'[href="'+f+'"]';
e=c(d).parent("li").addClass("active");
if(e.parent(".dropdown-menu").length){e=e.closest("li.dropdown").addClass("active")
}e.trigger("activate")
}};
var a=c.fn.scrollspy;
c.fn.scrollspy=function(d){return this.each(function(){var g=c(this),f=g.data("scrollspy"),e=typeof d=="object"&&d;
if(!f){g.data("scrollspy",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
c.fn.scrollspy.Constructor=b;
c.fn.scrollspy.defaults={offset:10};
c.fn.scrollspy.noConflict=function(){c.fn.scrollspy=a;
return this
};
c(window).on("load",function(){c('[data-spy="scroll"]').each(function(){var d=c(this);
d.scrollspy(d.data())
})
})
}(window.jQuery);
!function(c){var b=function(d){this.element=c(d)
};
b.prototype={constructor:b,show:function(){var j=this.element,g=j.closest("ul:not(.dropdown-menu)"),f=j.attr("data-target"),h,d,i;
if(!f){f=j.attr("href");
f=f&&f.replace(/.*(?=#[^\s]*$)/,"")
}if(j.parent("li").hasClass("active")){return
}h=g.find(".active:last a")[0];
i=c.Event("show",{relatedTarget:h});
j.trigger(i);
if(i.isDefaultPrevented()){return
}d=c(f);
this.activate(j.parent("li"),g);
this.activate(d,d.parent(),function(){j.trigger({type:"shown",relatedTarget:h})
})
},activate:function(f,e,i){var d=e.find("> .active"),h=i&&c.support.transition&&d.hasClass("fade");
function g(){d.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
f.addClass("active");
if(h){f[0].offsetWidth;
f.addClass("in")
}else{f.removeClass("fade")
}if(f.parent(".dropdown-menu")){f.closest("li.dropdown").addClass("active")
}i&&i()
}h?d.one(c.support.transition.end,g):g();
d.removeClass("in")
}};
var a=c.fn.tab;
c.fn.tab=function(d){return this.each(function(){var f=c(this),e=f.data("tab");
if(!e){f.data("tab",(e=new b(this)))
}if(typeof d=="string"){e[d]()
}})
};
c.fn.tab.Constructor=b;
c.fn.tab.noConflict=function(){c.fn.tab=a;
return this
};
c(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(d){d.preventDefault();
c(this).tab("show")
})
}(window.jQuery);
!function(b){var c=function(e,d){this.$element=b(e);
this.options=b.extend({},b.fn.typeahead.defaults,d);
this.matcher=this.options.matcher||this.matcher;
this.sorter=this.options.sorter||this.sorter;
this.highlighter=this.options.highlighter||this.highlighter;
this.updater=this.options.updater||this.updater;
this.source=this.options.source;
this.$menu=b(this.options.menu);
this.shown=false;
this.listen()
};
c.prototype={constructor:c,select:function(){var d=this.$menu.find(".active").attr("data-value");
this.$element.val(this.updater(d)).change();
return this.hide()
},updater:function(d){return d
},show:function(){var d=b.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});
this.$menu.insertAfter(this.$element).css({top:d.top+d.height,left:d.left}).show();
this.shown=true;
return this
},hide:function(){this.$menu.hide();
this.shown=false;
return this
},lookup:function(e){var d;
this.query=this.$element.val();
if(!this.query||this.query.length<this.options.minLength){return this.shown?this.hide():this
}d=b.isFunction(this.source)?this.source(this.query,b.proxy(this.process,this)):this.source;
return d?this.process(d):this
},process:function(d){var e=this;
d=b.grep(d,function(f){return e.matcher(f)
});
d=this.sorter(d);
if(!d.length){return this.shown?this.hide():this
}return this.render(d.slice(0,this.options.items)).show()
},matcher:function(d){return ~d.toLowerCase().indexOf(this.query.toLowerCase())
},sorter:function(f){var g=[],e=[],d=[],h;
while(h=f.shift()){if(!h.toLowerCase().indexOf(this.query.toLowerCase())){g.push(h)
}else{if(~h.indexOf(this.query)){e.push(h)
}else{d.push(h)
}}}return g.concat(e,d)
},highlighter:function(d){var e=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");
return d.replace(new RegExp("("+e+")","ig"),function(f,g){return"<strong>"+g+"</strong>"
})
},render:function(d){var e=this;
d=b(d).map(function(f,g){f=b(e.options.item).attr("data-value",g);
f.find("a").html(e.highlighter(g));
return f[0]
});
d.first().addClass("active");
this.$menu.html(d);
return this
},next:function(e){var f=this.$menu.find(".active").removeClass("active"),d=f.next();
if(!d.length){d=b(this.$menu.find("li")[0])
}d.addClass("active")
},prev:function(e){var f=this.$menu.find(".active").removeClass("active"),d=f.prev();
if(!d.length){d=this.$menu.find("li").last()
}d.addClass("active")
},listen:function(){this.$element.on("blur",b.proxy(this.blur,this)).on("keypress",b.proxy(this.keypress,this)).on("keyup",b.proxy(this.keyup,this));
if(this.eventSupported("keydown")){this.$element.on("keydown",b.proxy(this.keydown,this))
}this.$menu.on("click",b.proxy(this.click,this)).on("mouseenter","li",b.proxy(this.mouseenter,this))
},eventSupported:function(d){var e=d in this.$element;
if(!e){this.$element.setAttribute(d,"return;");
e=typeof this.$element[d]==="function"
}return e
},move:function(d){if(!this.shown){return
}switch(d.keyCode){case 9:case 13:case 27:d.preventDefault();
break;
case 38:d.preventDefault();
this.prev();
break;
case 40:d.preventDefault();
this.next();
break
}d.stopPropagation()
},keydown:function(d){this.suppressKeyPressRepeat=~b.inArray(d.keyCode,[40,38,9,13,27]);
this.move(d)
},keypress:function(d){if(this.suppressKeyPressRepeat){return
}this.move(d)
},keyup:function(d){switch(d.keyCode){case 40:case 38:case 16:case 17:case 18:break;
case 9:case 13:if(!this.shown){return
}this.select();
break;
case 27:if(!this.shown){return
}this.hide();
break;
default:this.lookup()
}d.stopPropagation();
d.preventDefault()
},blur:function(f){var d=this;
setTimeout(function(){d.hide()
},150)
},click:function(d){d.stopPropagation();
d.preventDefault();
this.select()
},mouseenter:function(d){this.$menu.find(".active").removeClass("active");
b(d.currentTarget).addClass("active")
}};
var a=b.fn.typeahead;
b.fn.typeahead=function(d){return this.each(function(){var g=b(this),f=g.data("typeahead"),e=typeof d=="object"&&d;
if(!f){g.data("typeahead",(f=new c(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
b.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1};
b.fn.typeahead.Constructor=c;
b.fn.typeahead.noConflict=function(){b.fn.typeahead=a;
return this
};
b(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(f){var d=b(this);
if(d.data("typeahead")){return
}f.preventDefault();
d.typeahead(d.data())
})
}(window.jQuery);
!function(c){var b=function(e,d){this.options=c.extend({},c.fn.affix.defaults,d);
this.$window=c(window).on("scroll.affix.data-api",c.proxy(this.checkPosition,this)).on("click.affix.data-api",c.proxy(function(){setTimeout(c.proxy(this.checkPosition,this),1)
},this));
this.$element=c(e);
this.checkPosition()
};
b.prototype.checkPosition=function(){if(!this.$element.is(":visible")){return
}var h=c(document).height(),j=this.$window.scrollTop(),d=this.$element.offset(),k=this.options.offset,f=k.bottom,g=k.top,i="affix affix-top affix-bottom",e;
if(typeof k!="object"){f=g=k
}if(typeof g=="function"){g=k.top()
}if(typeof f=="function"){f=k.bottom()
}e=this.unpin!=null&&(j+this.unpin<=d.top)?false:f!=null&&(d.top+this.$element.height()>=h-f)?"bottom":g!=null&&j<=g?"top":false;
if(this.affixed===e){return
}this.affixed=e;
this.unpin=e=="bottom"?d.top-j:null;
this.$element.removeClass(i).addClass("affix"+(e?"-"+e:""))
};
var a=c.fn.affix;
c.fn.affix=function(d){return this.each(function(){var g=c(this),f=g.data("affix"),e=typeof d=="object"&&d;
if(!f){g.data("affix",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}})
};
c.fn.affix.Constructor=b;
c.fn.affix.defaults={offset:0};
c.fn.affix.noConflict=function(){c.fn.affix=a;
return this
};
c(window).on("load",function(){c('[data-spy="affix"]').each(function(){var e=c(this),d=e.data();
d.offset=d.offset||{};
d.offsetBottom&&(d.offset.bottom=d.offsetBottom);
d.offsetTop&&(d.offset.top=d.offsetTop);
e.affix(d)
})
})
}(window.jQuery);
acs.component.CustomerSwitcher=function(a){this.isCustomer=a
};
acs.component.CustomerSwitcher.prototype.activate=function(a){itemsCount=0;
customerSwitcherRef=this;
$("#custswitcher_id").autocomplete({minLength:0,source:function(c,b){$.ajax({url:"/rpc/CustomerFilterService/customers?viewId="+escape(a.viewId)+"&url="+escape(a.currentUrl),dataType:"json",data:{term:c.term},success:function(e){itemsCount=e.matches;
if(itemsCount===0){var d=[{name:"__NO_CUSTOMER__"}];
b(d)
}else{b($.map(e.itemArray,function(f){return{name:f.name,partyId:f.partyId,country:f.country,value:f.value,status:f.status}
}))
}}})
},open:function(b,d){var c;
if(customerSwitcherRef.isCustomer){if(itemsCount>1){c='<li class="l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+" Results. </li>"
}else{if(itemsCount===1){c='<li class="l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+" Result. </li>"
}else{c='<li class="l-h-30 p-t-5 o-80 p-l-15 c-000"> No Result Found. </li>'
}}}else{if(itemsCount>50){c='<li class="l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List First 50 of '+itemsCount+' Results. <div class="f-i f-11 i-b c-444 p-l-5"> <span class="visible-desktop">( Input more keywords or try</span> <a class="blue" id="btn-adv-search" href="#"><span class="t-d-u">Advanced Search</span></a><span class="visible-desktop">. )</span></div></li>'
}else{if(itemsCount>1){c='<li class="l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+' Results. <div class="f-i f-11 i-b c-444 p-l-5"> <span class="visible-desktop">( Input other keywords or try</span> <a class="blue" id="btn-adv-search" href="#"><span class="t-d-u">Advanced Search</span></a><span class="visible-desktop">. )</span></div></li>'
}else{if(itemsCount===1){c='<li class="l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+' Result. <div class="f-i f-11 i-b c-444 p-l-5"> <span class="visible-desktop">( Input other keywords or try</span> <a class="blue" id="btn-adv-search" href="#"><span class="t-d-u">Advanced Search</span></a><span class="visible-desktop">. )</span></div></li>'
}else{c='<li class="l-h-30 p-t-5 o-80 p-l-15 c-000"> No Result Found. <div class="f-i f-11 i-b c-444 p-l-5"> <span class="visible-desktop">( Input other keywords or try</span> <a class="blue" id="btn-adv-search" href="#"><span class="t-d-u">Advanced Search</span></a><span class="visible-desktop">. )</span></div></li>'
}}}}$(".custswitcher .dropdown-menu").prepend(c);
$("#btn-adv-search").bind("click",function(){$("#showMoreCustomerInCS").trigger("click")
})
},close:function(b,c){$("#custswitcher_id").val($("#custswitcher_hidden_name").val())
},position:{using:function(){$(".ui-autocomplete").insertAfter($("#custswitcher_id")).removeClass().addClass("dropdown-menu w-p-100").attr("style","display: block;").attr("style","max-height:384px; overflow:auto; padding-top:0;")
}},focus:function(b,c){$("#custswitcher_id").val(customerSwitcherRef.getUniqueCustomerName(c.item.name,c.item.country,c.item.partyId));
$("#custswitcher_hidden_id").val(c.item.value);
return false
},select:function(b,c){$("#custswitcher_id").val(customerSwitcherRef.getUniqueCustomerName(c.item.name,c.item.country,c.item.partyId));
$("#custswitcher_hidden_name").val(customerSwitcherRef.getUniqueCustomerName(c.item.name,c.item.country,c.item.partyId));
$("#custswitcher_hidden_id").val(c.item.value);
$("#selectCustomerInCS").trigger("click");
return false
}}).data("ui-autocomplete")._renderItem=function(e,f){var c="";
if(f.status==="Inactive"){c="Inactive"
}var b='<a style="border-top:1px solid transparent; border-bottom:1px dotted #dadada;"><div class="f-b l-h-20 o-h ">'+f.name+'</div><div class="o-80 f-11 p-r"><div class="i-b ">'+f.country+' - ( </div><div class="i-b"><div class="visible-desktop" style="display:inline-block;">GCS Party:&nbsp;</div></div>'+f.partyId+')<div class="p-a r-0 m-r-1 i-b">'+c+"</div></div></a>";
var g='<a style="border-top:1px solid transparent; border-bottom:1px dotted #dadada;"><div class="f-b l-h-20 o-h ">'+f.name+'</div><div class="o-80 f-11 p-r"><div class="i-b ">'+f.country+'</div><div class="i-b"><div class="visible-desktop" style="display:inline-block;"></div></div><div class="p-a r-0 m-r-1 i-b">'+c+"</div></div></a>";
var h='<a><div class="f-b l-h-20 o-h">'+f.name+'</div><div class="p-a r-0 m-r-1 i-b">'+c+"</div></a>";
var d="";
if(f.name==="__NO_CUSTOMER__"){}else{if(customerSwitcherRef.isCustomer){d=h
}else{if(f.partyId===null||typeof(f.partyId)=="undefined"){d=g
}else{d=b
}}}return $('<li class=""></li>').data("item.autocomplete",f).append(d).appendTo(e)
};
$("#custswitcher_id").autocomplete("search","")
};
acs.component.CustomerSwitcher.prototype.search=function(){$("#custswitcher_id").focus();
$("#custswitcher_id").autocomplete("search","")
};
acs.component.CustomerSwitcher.prototype.clickSearchCS=function(a){if(a.keyCode===13){$(".jsForCSQuickSearch").trigger("click")
}};
acs.component.CustomerSwitcher.prototype.selectAll=function(){$("#custswitcher_id").select()
};
acs.component.CustomerSwitcher.prototype.isCustomerUser=function(){return this.isCustomer
};
acs.component.CustomerSwitcher.prototype.getUniqueCustomerName=function(c,d,b){if(this.isCustomerUser()){return c
}var a="";
a+=c;
if(d){a+=" - "+d
}if(b){a+=" (GCS Party: "+b+")"
}return a
};
acs.component.CustomerSelector=function(e,g,a,d,f,b,c){this.isCustomer=e;
this.customerSelectorId=g;
this.customerClientId=a;
this.limitNum=b;
this.specialFilter=d;
this.needAdvanced=!f;
this.needPleaseSelected=c
};
acs.component.CustomerSelector.prototype.isNeedPleaseSelected=function(){return this.needPleaseSelected
};
acs.component.CustomerSelector.prototype.isNeedAdvanced=function(){return this.needAdvanced
};
acs.component.CustomerSelector.prototype.isCustomerUser=function(){return this.isCustomer
};
acs.component.CustomerSelector.prototype.getLimitNum=function(){return this.limitNum
};
acs.component.CustomerSelector.prototype.getCustomerSelectorId=function(){return this.customerSelectorId
};
acs.component.CustomerSelector.prototype.getSpecialFilter=function(){return this.specialFilter
};
acs.component.CustomerSelector.prototype.search=function(c,a){var b=acs.util.escapeQuoteId("#"+a+":"+c+"_id");
$(b).focus();
$(b).autocomplete("search","")
};
acs.component.CustomerSelector.prototype.getUniqueCustomerName=function(c,d,b){if(this.isCustomerUser()){return c
}var a="";
a+=c;
if(d){a+=" - "+d
}if(b){a+=" (GCS Party: "+b+")"
}return a
};
acs.component.CustomerSelector.showAdvancedDialog=function(a){var b=a.id.replace("-adv-search","");
$("."+b+"_advS").trigger("click")
};
acs.component.CustomerSelector.prototype.activate=function(config){var customerSelectorRef=this;
var customerId=acs.util.escapeQuoteId("#"+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_id");
var customerHiddenId=acs.util.escapeQuoteId("#"+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_hidden_id");
var customerHiddenName=acs.util.escapeQuoteId("#"+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_hidden_name");
var specialFilter=customerSelectorRef.getSpecialFilter();
var limitNumParam=customerSelectorRef.getLimitNum();
var needPleaseSelectedParam=customerSelectorRef.isNeedPleaseSelected();
if(typeof(customerSelectorRef.getLimitNum())=="undefined"){limitNumParam=0
}var advancedSearch=customerSelectorRef.isNeedAdvanced();
var itemsCount;
$(customerId).autocomplete({minLength:0,source:function(request,response){var keyForCustomerSelector;
var timeForCustomerSelector=new Date();
var timeForCustomerSelectorNum=(timeForCustomerSelector.getMinutes()%10)*60000+timeForCustomerSelector.getSeconds()*1000+timeForCustomerSelector.getMilliseconds();
keyForCustomerSelector=timeForCustomerSelectorNum;
var customerKeyId=acs.util.escapeQuoteId("#"+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_key");
$(customerKeyId).val(keyForCustomerSelector);
var customerQueryConditionId=acs.util.escapeQuoteId("#"+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_hidden_queryCondition");
$(customerQueryConditionId).val(request.term);
jsf.ajax.request(customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_csChangeSource",null,{"javax.faces.event.ActionEvent":"actionListener",execute:customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_key "+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_hidden_queryCondition",render:"@this",onevent:function(dataObject){if(dataObject.status==="complete"){$.ajax({url:"/rpc/CustomerFilterService/customerSelector?_adf.disable-loopback=true&key="+keyForCustomerSelector+"&specialFilter"+specialFilter+"&limit="+limitNumParam+"&needPleaseSelected="+needPleaseSelectedParam,dataType:"json",data:{term:request.term},success:function(data){itemsCount=data.matches;
if(itemsCount===0){var emptyResult=[{name:"__NO_CUSTOMER__"}];
response(emptyResult)
}else{response($.map(data.itemArray,function(item){return{name:item.name,partyId:item.partyId,country:item.country,value:item.value}
}))
}}})
}}})
},open:function(event,ui){$(".onlyForCCSS").remove();
var countHtml;
if(itemsCount>limitNumParam){countHtml='<li class="onlyForCCSS l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List First '+limitNumParam+" of "+itemsCount+" Results. "
}else{if(itemsCount>1){countHtml='<li class="onlyForCCSS l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+" Results. "
}else{if(itemsCount===1){countHtml='<li class="onlyForCCSS l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+" Result."
}else{countHtml='<li class="onlyForCCSS l-h-30 p-t-5 o-80 p-l-15 c-000"> No Result Found. '
}}}if(customerSelectorRef.isNeedAdvanced()){countHtml+='<div class="f-i f-11 i-b c-444 p-l-5"> <span class="visible-desktop"> <a class="blue " onclick="acs.component.CustomerSelector.showAdvancedDialog(this);" id="'+customerSelectorRef.customerSelectorId+'-adv-search" href="#">Advanced Search</a><span class="visible-desktop"></span></div>'
}countHtml+="</li>";
eval("$('."+customerSelectorRef.customerSelectorId+"_css .dropdown-menu')").prepend(countHtml)
},close:function(event,ui){$(customerId).val($(customerHiddenName).val());
$(".objectSelectorC").attr("style","display:none;")
},position:{using:function(){$(".ui-autocomplete").insertAfter($(customerId)).removeClass().addClass("objectSelectorC dropdown-menu w-500").attr("style","display: block;");
$(".objectSelectorC").insertAfter($(customerId))
}},focus:function(event,ui){$(customerId).val(customerSelectorRef.getUniqueCustomerName(ui.item.name,ui.item.country,ui.item.partyId));
$(customerHiddenId).val(ui.item.value);
return false
},select:function(event,ui){$(customerId).val(customerSelectorRef.getUniqueCustomerName(ui.item.name,ui.item.country,ui.item.partyId));
$(customerHiddenName).val(customerSelectorRef.getUniqueCustomerName(ui.item.name,ui.item.country,ui.item.partyId));
$(customerHiddenId).val(ui.item.value);
var customerButtonId=acs.util.escapeQuoteId("#"+customerSelectorRef.customerClientId+":"+customerSelectorRef.customerSelectorId+"_selectCustomerInCS");
$(customerButtonId).trigger("click");
$(".objectSelectorC").attr("style","display:none;");
return false
}}).data("ui-autocomplete")._renderItem=function(ul,item){var status="";
if(item.status==="Inactive"){status="Inactive"
}var htmlWithPartyId='<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada; width:480px;"><div class="f-b l-h-20 o-h">'+item.name+'</div><div class="o-80 f-11"><div class="i-b">'+item.country+' - ( </div><div class="i-b"><div class="visible-desktop" style="display:inline-block;">GCS Party:&nbsp;</div></div>'+item.partyId+") (CID:&nbsp;"+item.value+')<div class="p-a r-0 m-r-1 i-b">'+status+"</div></div></a>";
var htmlWithoutPartyId='<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada; width:480px;"><div class="f-b l-h-20 o-h">'+item.name+'</div><div class="o-80 f-11"><div class="i-b">'+item.country+"</div>(CID:&nbsp;"+item.value+')<div class="i-b"><div class="visible-desktop" style="display:inline-block;"></div></div> <div class="p-a r-0 m-r-1 i-b">'+status+"</div></div></a>";
var htmlForCustomerUser='<a style=" width:480px;"><div class="f-b l-h-20 o-h">'+item.name+"</div>(CID:&nbsp;"+item.value+')<div class="p-a r-0 m-r-1 i-b">'+status+"</div></a>";
var htmlForPleaseSelect='<a style=" width:480px;"><div class="f-b l-h-20 o-h">'+item.name+"</div></a>";
var html="";
if(item.name==="__NO_CUSTOMER__"){}else{if(item.value==0){html=htmlForPleaseSelect
}else{if(customerSelectorRef.isCustomerUser()){html=htmlForCustomerUser
}else{if(!item.partyId||typeof(item.partyId)=="undefined"){html=htmlWithoutPartyId
}else{html=htmlWithPartyId
}}}}return $('<li class=""></li>').data("item.autocomplete",item).append(html).appendTo(ul)
}
};
function LazyDropdownArray(){Array.call(this)
}LazyDropdownArray.prototype=new Array();
LazyDropdownArray.prototype.constructor=LazyDropdownArray;
LazyDropdownArray.prototype.indexOf=function(b){for(var a=0;
a<this.length;
a++){if(this[a]==b){return a
}}return -1
};
LazyDropdownArray.prototype.remove=function(b){var a=this.indexOf(b);
if(a>-1){this.splice(a,1)
}};
acs.component.LazyDropdown=function(){this.initialize.apply(this,arguments)
};
acs.component.LazyDropdown.prototype={_con_searchAll:"dumpAll",_con_noMatchedItem:"Please Select",_con_singleMode:"single",_con_multipleMode:"multiple",initialize:function(params){this.clientId=params.clientId;
if($("#"+this.clientId).length==0){return
}this.url=params.url;
this.cascadeClientId=params.cascadeClientId;
this.loadIfNoCascadeTerm=(typeof params.loadIfNoCascadeTerm=="undefined")?false:params.loadIfNoCascadeTerm;
this.browserCache=(typeof params.browserCache=="undefined")?true:params.browserCache;
this.cacheable=(typeof params.cacheable=="undefined")?true:params.cacheable;
this.needRefreshBtn=(typeof params.needRefreshBtn=="undefined")?params.cacheable:params.needRefreshBtn;
this.cacheObject=((typeof window.localStorage!="undefined")&&"local"==params.cacheScope?window.localStorage:(typeof sessionStorage!="undefined")?sessionStorage:undefined);
this.cacheMin=(typeof params.cacheMin=="undefined")?60*24:params.cacheMin;
this.previousCascadeTerm="_init_empty";
this.selectionMode=params.selectionMode==this._con_singleMode?this._con_singleMode:this._con_multipleMode;
this.width=params.width?params.width:"200px";
this.dropdownMenuStyle=params.dropdownMenuStyle;
this.selectedItems=new LazyDropdownArray();
this.matchedItems=new Array();
this.autocompletecache=null;
this.currentSearchTerm="";
this.postSelect=(typeof params.postSelect=="undefined")?function(){}:params.postSelect;
this.initializeHtml();
this.term="";
this.cacheKeyPrefix=(typeof params.cacheKeyPrefix!=="undefined")?params.cacheKeyPrefix:this.getUserHash();
this.hashCode=function(str){var hashNumber=0,indexNumber,character;
if(str.length==0){return hashNumber
}for(indexNumber=0;
indexNumber<str.length;
indexNumber++){character=str.charCodeAt(indexNumber);
hashNumber=((hashNumber<<5)-hashNumber)+character;
hashNumber=hashNumber&hashNumber
}return hashNumber
};
var Me=this;
Me.processing=false;
with(this){$("#"+this.autoDropdownId).autocomplete({autoFocus:true,delay:500,source:function(request,response){$("#"+dropArrowId).addClass("hidden");
Me.term=$.trim(request.term)===""?_con_searchAll:request.term;
var cascadeTerm;
if(cascadeClientId){cascadeTerm=$.trim($("#"+cascadeClientId+"_hidden").val());
if(cascadeTerm!=previousCascadeTerm){if(cascadeTerm==""){if(loadIfNoCascadeTerm){autocompletecache=null
}else{autocompletecache=new Array();
autocompletecache.push({key:_con_noMatchedItem,value:_con_noMatchedItem})
}}else{autocompletecache=null
}previousCascadeTerm=cascadeTerm
}}if(cacheable&&autocompletecache){cookResponse();
return
}currentSearchTerm=cascadeClientId?cascadeTerm:term;
var processed=false;
function processData(data){autocompletecache=data;
Me.processing=false;
if(autocompletecache){autocompletecache.unshift({key:_con_noMatchedItem,value:_con_noMatchedItem})
}cookResponse()
}getCache(function(data){processData(data);
processed=true
});
if(!processed&&!Me.processing){Me.processing=true;
$.ajax({url:url,dataType:"json",cache:cacheable,type:"get",data:{term:cascadeClientId?cascadeTerm:term},success:function(data){setCache(data);
processData(data)
},error:function(){Me.processing=false;
matchedItems=new Array();
processData(matchedItems)
}})
}else{if(Me.processing){matchedItems=new Array();
response(matchedItems)
}}function cookResponse(){var lowercaseTerm=term.toLowerCase();
if(term!==_con_searchAll&&selectionMode==_con_singleMode){var processed=false;
$.each(autocompletecache,function(i,item){if(item.value.toLowerCase()===lowercaseTerm&&selectedItems.indexOf(item.key)>=0){response(autocompletecache);
$("#"+dropArrowId).removeClass("hidden");
processed=true;
return false
}});
if(processed){return
}}if(term==_con_searchAll){matchedItems.length=0;
$.each(autocompletecache,function(i,item){if(item.key!==_con_noMatchedItem&&(selectionMode==_con_singleMode||selectedItems.indexOf(item.key)==-1)){matchedItems.push(item)
}});
matchedItems.unshift({key:_con_noMatchedItem,value:_con_noMatchedItem});
response(matchedItems)
}else{matchedItems.length=0;
$.each(autocompletecache,function(i,item){if(item&&item.value.toLowerCase().indexOf(term.toLowerCase())>=0&&item.key!==_con_noMatchedItem&&(selectionMode==_con_singleMode||selectedItems.indexOf(item.key)==-1)){matchedItems.push(item)
}});
matchedItems.unshift({key:_con_noMatchedItem,value:_con_noMatchedItem});
response(matchedItems)
}$("#"+dropArrowId).removeClass("hidden")
}},select:function(event,ui){function dotOverflow(val,length){var len=30;
if(typeof length!="undefined"){len=length
}if(val.length<=len){return val
}var ret=val.substring(0,len)+"......";
return ret
}var specialKey=Me.hashCode(ui.item.key);
var _removeArrowId=clientId+specialKey+"_removeArrow";
var selectedItemHtml=$('<div style="white-space:nowrap;"><a id="'+_removeArrowId+'" href="#" title="'+ui.item.value+'"><i class="icon-remove-sign colorBlue f-13 m-r-5"></i></a></div>');
var selectedValue=document.createTextNode(dotOverflow(ui.item.value));
selectedItemHtml.find('a[id="'+_removeArrowId+'"]').append(selectedValue);
if(selectionMode==_con_singleMode){if(ui.item.value==_con_noMatchedItem){this.value="";
selectedItems.length=0;
setSelectedValue()
}else{this.value=ui.item.value;
selectedItems.length=0;
selectedItems.push(ui.item.key);
setSelectedValue();
$("#"+selectedConId).addClass("hidden").append(selectedItemHtml);
bindClickForRemoveArrow()
}}else{this.value="";
if(ui.item.value!=_con_noMatchedItem){var containsSelectedItem=false;
if(selectedItems.length>0){$.each(selectedItems,function(i,k){if(k&&k==ui.item.key){containsSelectedItem=true;
return
}})
}if(!containsSelectedItem){selectedItems.push(ui.item.key);
setSelectedValue();
$("#"+selectedConId).append(selectedItemHtml);
bindClickForRemoveArrow()
}}}function bindClickForRemoveArrow(){$("#"+_removeArrowId).click(function(){selectedItems.remove(ui.item.key);
$(this).parent().detach();
setSelectedValue()
})
}$("#"+autoDropdownId).trigger("change");
postSelect(ui.item);
return false
}}).data("ui-autocomplete")._renderMenu=function(ul,items){ul.attr("clientId",clientId);
ul.addClass("acs-lazy-dropdown");
if(dropdownMenuStyle){ul.css("max-height",dropdownMenuStyle.max_height);
ul.css("max-width",dropdownMenuStyle.max_width);
ul.css("overflow-y",dropdownMenuStyle.overflow_y);
ul.css("overflow-x",dropdownMenuStyle.overflow_x)
}var that=this;
$.each(items,function(index,item){var li=that._renderItemData(ul,item);
li.attr("clientId",item.key);
if(item.key==_con_noMatchedItem){li.children().first().attr("clientId",item.key)
}if(item.value.toLowerCase()==Me.term.toLowerCase()){$(li).attr("autofocus","true");
that.menu.active=$(li).prev()
}if((browserCache||cacheable||needRefreshBtn)&&item.key==_con_noMatchedItem){li.children().first().css("display","inline");
$("<a id='"+clientId+"_refresh' title='Reload List'><i class='icon-refresh'></i></a>").css("float","right").css("display","inline").appendTo(li);
$("#"+clientId+"_refresh").click(function(event){Me.removeCache();
event.preventDefault();
event.stopPropagation();
that.close(event);
$("#"+dropArrowId).trigger("click")
})
}})
};
$("#"+this.autoDropdownId).autocomplete("option","autoFocus",true)
}},initializeHtml:function(){this.autoDropdownId=this.clientId+"_auto_dropdown";
this.selectedConId=this.clientId+"_selectedCon";
this.dropArrowId=this.clientId+"_dropArrow";
var autoDropdownCon=$('<div id="'+this.clientId+'_auto_dropdown_con" ></div>');
var autoDropdownInput=$('<input id="'+this.autoDropdownId+'" type="text" style="width: '+this.width+'; padding:0;padding-right:20px;" placeholder="'+this._con_noMatchedItem+'"/>');
var autoDropdownArrow=$('<a id="'+this.dropArrowId+'" class="p-r c-p v-a-m b-c-ff z-3"><i class="f-14 icon-sort-down" style="margin-left: -14px;"></i></a>');
var autoDropdownSelectedCon=$('<div id="'+this.selectedConId+'" style="float:left; clear:left;" />');
$("#"+this.clientId).attr("selectionMode",this.selectionMode).append(autoDropdownCon.append(autoDropdownInput).append(autoDropdownArrow)).append(autoDropdownSelectedCon);
function placeholder(input){if(!("placeholder" in document.createElement("input"))){$('<div style="margin-left:4px;height:20px;">'+input.attr("placeholder")+"</div>").insertBefore(input);
input.css("position","relative");
input.css("top","-20px");
function recheckPlaceholder(){if(input.val()==""){input.css("filter","alpha(opacity=80)")
}else{input.css("filter","")
}}input.change(recheckPlaceholder);
input.keyup(recheckPlaceholder);
recheckPlaceholder();
input.next().css("position","relative");
input.next().css("top","-20px")
}}with(this){placeholder($("#"+autoDropdownId));
$("#"+dropArrowId).click(function(){$("#"+autoDropdownId).focus();
var searchTerm=$("#"+autoDropdownId).val();
if(!searchTerm||$.trim(searchTerm)===""){searchTerm=_con_searchAll
}$("#"+autoDropdownId).autocomplete("search",searchTerm)
});
if(cascadeClientId){$("#"+cascadeClientId+"_hidden").change(function(){$("#"+autoDropdownId).val("");
clickAllRemoveArrow()
})
}if(_con_singleMode==selectionMode){$("#"+autoDropdownId).blur(function(){var that=$(this);
var selectedItemKey=$("#"+clientId+"_hidden").val();
if(selectedItemKey==""){that.val("")
}else{if(autocompletecache){$.each(autocompletecache,function(i,item){if(item&&item.key==selectedItemKey){that.val(item.value);
return
}})
}else{that.val("")
}}})
}}},setSelectedValue:function(){var a=this.selectedItems.join();
$("#"+this.clientId+"_hidden").val(a).trigger("change")
},clickAllRemoveArrow:function(){$("#"+this.selectedConId).find("a[id^='"+this.clientId+"'][id$='_removeArrow']").trigger("click")
},getUserHash:function(){function b(g){var e=0;
if(g.length==0){return e
}for(var d=0;
d<g.length;
d++){var f=g.charCodeAt(d);
e=((e<<5)-e)+f;
e=e&e
}return e
}try{var a=$($(".icon-user")[0]).parent().text().trim();
return"x"+b(a)
}catch(c){return"x"
}},getCache:function(callback){with(this){if(browserCache&&(typeof cacheObject!="undefined")){var str=cacheObject.getItem("lazy_"+cacheKeyPrefix+url+"/"+currentSearchTerm);
if(str){var data=JSON.parse(str);
if(data&&new Date().getTime()-data.cacheTime<1000*60*cacheMin){callback(data.cache)
}else{removeCache()
}}}}},setCache:function(data){with(this){if(browserCache&&(typeof cacheObject!="undefined")){cacheObject.setItem("lazy_"+cacheKeyPrefix+url+"/"+currentSearchTerm,JSON.stringify({cacheTime:new Date().getTime(),cache:data}))
}}},removeCache:function(){with(this){if(browserCache&&(typeof cacheObject!="undefined")){cacheObject.removeItem("lazy_"+cacheKeyPrefix+url+"/"+currentSearchTerm)
}autocompletecache=null
}}};
$(function(){function a(){function b(h,g){var f=[];
for(var e=0,c=h.length;
e<c;
e++){var d=h.key(e);
if(d.indexOf(g)==0){f.push(d)
}}for(var d in f){h.removeItem(f[d])
}}if(typeof localStorage!="undefined"){b(localStorage,"lazy_")
}if(typeof sessionStorage!="undefined"){b(sessionStorage,"lazy_")
}}$(".clear-lazy-cache").click(a);
if(document.referrer&&(document.referrer.indexOf("login.xhtml")>0)){a()
}});
acs.component.message={isSender:false,messageTime:0,strHtml:"",renderHeader:function(a){acs.component.message.isSender=a;
acs.component.message.strHtml='<div id="messagePopup" style="z-index:1000;" class="row-fluid w-300 o-95 t-10 b-c-gray b- b-r-6 p-l-10 p-t-10 p-b-10 p-r-10 p-a r-0 b-s-20"><div class="span1 t-a-r visible-desktop"><i class="icon-envelope-alt f-16 o-80"/></div><div class="span11"><div id="messageSubject" class="fontB"></div></div></div>';
$(document).ready(function(){acs.component.message.getUnreadMessageNum();
var d=new Date();
var c=(d.getMinutes()%10)*60000+d.getSeconds()*1000+d.getMilliseconds();
var b=600000-c;
setTimeout(acs.component.message.messageReminderPoll,b)
})
},messageReminderPoll:function(){intervalForMessage=window.setInterval(acs.component.message.getUnreadMessageNumAndReminder,600000);
acs.component.message.getUnreadMessageNumAndReminder()
},getUnreadMessageNum:function(){$.ajax({cache:false,url:"/NotificationServlet/detail?mode=fetchNew",dataType:"json"}).done(function(a){if(a.unreadCount!==0){if(acs.component.message.isSender===true){$("#messageSendHeader").attr("class","i-b p-a b-c-red b-r-8 t-a-c l-h-14 f-10 m-w-10 p-l-2 p-r-2 c-f t-2 l-10 m-l-1");
$("#messageSendHeader").text(a.unreadCount);
$("#messageSendHeaderView").attr("class","i-b b-c-red b-r-8 t-a-c l-h-14 f-10 m-w-10 p-l-2 p-r-2 c-f");
$("#messageSendHeaderView").text(a.unreadCount)
}else{$("#notificationMessagesHeaderShow").attr("class","i-b p-a b-c-red b-r-8 t-a-c l-h-14 f-10 m-w-10 p-l-2 p-r-2 c-f t-2 r-0");
$("#notificationMessagesHeaderShow").text(a.unreadCount)
}if(acs.component.message.messageTime===0){acs.component.message.messageTime=a.requestTime
}}else{if(acs.component.message.isSender===true){$("#messageSendHeader").removeAttr("class");
$("#messageSendHeader").html("");
$("#messageSendHeaderView").removeAttr("class");
$("#messageSendHeaderView").html("")
}else{$("#notificationMessagesHeaderShow").removeAttr("class");
$("#notificationMessagesHeaderShow").html("")
}}})
},getUnreadMessageNumAndReminder:function(){$.ajax({cache:false,url:"/NotificationServlet/detail?mode=fetchNew",dataType:"json"}).done(function(a){messageCurrentURL=window.location.pathname;
if(messageCurrentURL.indexOf("message/messageList.xhtml")!==-1){$(".HiddenRenderButton").trigger("click")
}if(a.unreadCount!==0){if(acs.component.message.isSender===true){$("#messageSendHeader").attr("class","i-b p-a b-c-red b-r-8 t-a-c l-h-14 f-10 m-w-10 p-l-2 p-r-2 c-f t-2 l-10 m-l-1");
$("#messageSendHeader").text(a.unreadCount);
$("#messageSendHeaderView").attr("class","i-b b-c-red b-r-8 t-a-c l-h-14 f-10 m-w-10 p-l-2 p-r-2 c-f");
$("#messageSendHeaderView").text(a.unreadCount)
}else{$("#notificationMessagesHeaderShow").attr("class","i-b p-a b-c-red b-r-8 t-a-c l-h-14 f-10 m-w-10 p-l-2 p-r-2 c-f t-2 r-0");
$("#notificationMessagesHeaderShow").text(a.unreadCount)
}if(acs.component.message.messageTime===0){acs.component.message.messageTime=a.requestTime
}if(a.lastTime>acs.component.message.messageTime){acs.component.message.messageTime=a.lastTime;
if(acs.component.message.isSender===true){$("#messageContainerSend").html(acs.component.message.strHtml)
}else{$("#messageContainerView").html(acs.component.message.strHtml)
}$("#messageSubject").text(a.latestSummary);
$("#messagePopup").slideDown(2000,function(){setTimeout(acs.component.message.slideUpPopup,10000)
})
}}else{if(acs.component.message.isSenders===true){$("#messageSendHeader").removeAttr("class");
$("#messageSendHeader").html("");
$("#messageSendHeaderView").removeAttr("class");
$("#messageSendHeaderView").html("")
}else{$("#notificationMessagesHeaderShow").removeAttr("class");
$("#notificationMessagesHeaderShow").html("")
}}})
},slideUpPopup:function(){$("#messagePopup").slideUp()
}};
acs.component.ObjectSelector=function(e,a,c,f,g,d,b){this.objectSelectorId=e;
this.objectClientId=a;
this.skinType=c;
this.type=f;
this.userName=g;
this.specialFilter=d;
this.limitNum=b
};
acs.component.ObjectSelector.prototype.getSpecialFilter=function(){return this.specialFilter
};
acs.component.ObjectSelector.prototype.getObjectSelectorId=function(){return this.objectSelectorId
};
acs.component.ObjectSelector.prototype.getLimitNum=function(){return this.limitNum
};
acs.component.ObjectSelector.prototype.search=function(b,c){var a=acs.util.escapeQuoteId("#"+c+":"+b+"_id");
$(a).focus();
$(a).autocomplete("search","")
};
acs.component.ObjectSelector.prototype.getObjectSelectorSkin=function(b,a){if(a=="RoleSwitcher"){return'<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada;"><span class="f-b l-h-20 o-h">'+b.name+'</span><span style="float:right;" class="f-b l-h-20 o-h ">'+b.serviceName+"</span></a>"
}if(a=="TerrtiorySelector"){return'<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada;width:400px;"><span class="f-b l-h-20 o-h">'+b.name+'</span><span style="float:right;" class="f-b l-h-20 o-h "></span></a>'
}if(a=="ContractSelector"){if(typeof(b.nameWarp)=="undefined"){b.nameWarp=""
}return'<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada; width:500px;"><span class="f-b l-h-20 o-h w-500 nowrap">'+b.name+'</span><span class="o-80 f-11"><span class="f-b nowrap">'+b.nameWarp+'</span></span><span style="float:right;" class="f-b l-h-20 o-h "></span></a>'
}if(a=="CustomerGroupSelector"){return'<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada;"><span class="f-b l-h-20 o-h">'+b.name+'</span><span style="float:right;" class="f-b l-h-20 o-h "></span></a>'
}return'<a style="border-top:1px solid #fff; border-bottom:1px dotted #dadada;"><div class="f-b l-h-20 o-h">'+b.name+'</div><div class="o-80 f-11"><div class="i-b">'+b.country+' - ( </div><div class="i-b"><div class="visible-desktop" style="display:inline-block;">GCS Party:&nbsp;</div></div>'+b.partyId+')<div class="p-a r-0 m-r-1 i-b"></div></div></a>'
};
acs.component.ObjectSelector.prototype.activate=function(config){var objectSelectorRef=this;
var objectId=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_id");
var objectHiddenId=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_hidden_id");
var objectHiddenName=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_hidden_name");
var objectHiddenSourceFlag=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_hidden_data_version");
var specialFilter=objectSelectorRef.getSpecialFilter();
var sourceFlag=$(objectHiddenSourceFlag).val();
var limitNumParam=objectSelectorRef.getLimitNum();
if(typeof(objectSelectorRef.getLimitNum())=="undefined"){limitNumParam=0
}var itemsCount;
$(objectId).autocomplete({minLength:0,source:function(request,response){var keyForObjectSelector;
var timeForObjectSelector=new Date();
var timeForObjectSelectorMilliseconds=(timeForObjectSelector.getMinutes()%10)*60000+timeForObjectSelector.getSeconds()*1000+timeForObjectSelector.getMilliseconds();
keyForObjectSelector=timeForObjectSelectorMilliseconds;
var objectKeyId=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_key");
var objectHiddenQueryConditionId=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_hidden_queryCondition");
$(objectKeyId).val(keyForObjectSelector);
$(objectHiddenQueryConditionId).val(request.term);
jsf.ajax.request(objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_csChangeSource",null,{"javax.faces.event.ActionEvent":"actionListener",execute:objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_key "+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_hidden_queryCondition",render:"@this",onevent:function(dataObject){if(dataObject.status==="complete"){$.ajax({url:"/rpc/ObjectFilterService/objectSelector?_adf.disable-loopback=true&key="+keyForObjectSelector+"&specialFilter="+specialFilter+"&type="+objectSelectorRef.type+"&limit="+limitNumParam,dataType:"json",data:{term:request.term},success:function(data){itemsCount=data.matches;
if(itemsCount===0){var emptyResult=[{name:"__NO_RESULT__"}];
response(emptyResult)
}else{response(data.itemArray)
}}})
}}})
},open:function(event,ui){$(".onlyForCCSS").remove();
var countHtml;
if(itemsCount>limitNumParam){countHtml='<li class="onlyForCCSS  l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List First '+limitNumParam+" of "+itemsCount+" Results. </li>"
}else{if(itemsCount>1){countHtml='<li class="onlyForCCSS  l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+" Results. </li>"
}else{if(itemsCount===1){countHtml='<li class="onlyForCCSS  l-h-30 p-t-5 b-b-da b-c-ec o-80 p-l-15 c-000"> List '+itemsCount+" Result.</li>"
}else{countHtml='<li class="onlyForCCSS  l-h-30 p-t-5 o-80 p-l-15 c-000"> No Result Found. </li>'
}}}eval("$('."+objectSelectorRef.objectSelectorId+"_css .dropdown-menu')").prepend(countHtml)
},close:function(event,ui){$(objectId).val($(objectHiddenName).val());
$(".objectSelectorC").attr("style","display:none;")
},position:{using:function(){$(".ui-autocomplete").insertAfter($(objectId)).removeClass().addClass("objectSelectorC dropdown-menu  w-500");
$(".objectSelectorC").insertAfter($(objectId))
}},focus:function(event,ui){$(objectId).val(ui.item.name);
$(objectHiddenId).val(ui.item.value);
return false
},select:function(event,ui){$(objectId).val(ui.item.name);
$(objectHiddenName).val(ui.item.name);
$(objectHiddenId).val(ui.item.value);
var objectButtonId=acs.util.escapeQuoteId("#"+objectSelectorRef.objectClientId+":"+objectSelectorRef.objectSelectorId+"_selectObjectInCS");
$(objectButtonId).trigger("click");
return false
}}).data("ui-autocomplete")._renderItem=function(ul,item){var showRecord;
if(item.name==="__NO_RESULT__"){showRecord=""
}else{showRecord=objectSelectorRef.getObjectSelectorSkin(item,objectSelectorRef.skinType)
}return $('<li class=""></li>').data("item.autocomplete",item).append(showRecord).appendTo(ul)
}
};
acs.component.RoleSwitcher=function(a){this.userName=a
};
acs.component.RoleSwitcher.prototype.search=function(){$("#role_switcher_id").focus();
$("#role_switcher_id").autocomplete("search","")
};
acs.component.RoleSwitcher.prototype.selectAll=function(){$("#role_switcher_id").select()
};
acs.component.RoleSwitcher.prototype.confirmChange=function(){$("#role_switcher_id").val($("#role_switcher_hidden_name__confirm").val());
$("#role_switcher_hidden_name").val($("#role_switcher_hidden_name__confirm").val());
$("#role_switcher_hidden_id").val($("#role_switcher_hidden_id__confirm").val())
};
acs.component.RoleSwitcher.prototype.activate=function(c){var b=this;
var f=acs.util.escapeQuoteId("#role_switcher_id");
var d=acs.util.escapeQuoteId("#role_switcher_hidden_id");
var e=acs.util.escapeQuoteId("#role_switcher_hidden_name");
var a;
$(f).autocomplete({minLength:0,source:function(l,h){var g;
var k=new Date();
var i=(k.getMinutes()%10)*60000+k.getSeconds()*1000+k.getMilliseconds();
g=i;
var j=acs.util.escapeQuoteId("#role_switcher_key");
$(j).val(g);
jsf.ajax.request("role_switcher_csChangeSource",null,{"javax.faces.event.ActionEvent":"actionListener",execute:"role_switcher_key",render:"@this",onevent:function(m){if(m.status==="complete"){$.ajax({url:"/rpc/ObjectFilterService/objectSelector?_adf.disable-loopback=true&key="+g+"&type=RoleSwitcher",dataType:"json",data:{term:l.term},success:function(o){a=o.matches;
if(a===0){var n=[{name:"__NO_RESULT__"}];
h(n)
}else{h(o.itemArray)
}}})
}}})
},open:function(g,h){$(".roleSwitcherListCss").css({width:"311.66666662693024px",display:"block","padding-top":"0","margin-top":"0",border:"0","-webkit-border-radius":"0 0 6px 6px","-moz-border-radius":"0 0 6px 6px","border-radius":"0 0 6px 6px"})
},close:function(g,h){$("#roleSwitcherSpan").css("display","none");
$(f).val($(e).val())
},position:{using:function(){$(".ui-autocomplete").insertAfter($(f)).removeClass().addClass("objectSelectorC dropdown-menu").css({width:"311.66666662693024px",display:"block","padding-top":"0","margin-top":"0",border:"0","-webkit-border-radius":"0 0 6px 6px","-moz-border-radius":"0 0 6px 6px","border-radius":"0 0 6px 6px"});
$(".objectSelectorC").insertAfter($(f))
}},focus:function(g,h){$(f).val(h.item.name);
$(d).val(h.item.value);
return false
},select:function(g,h){$("#role_switcher_hidden_name__confirm").val(h.item.name);
$("#role_switcher_hidden_id__confirm").val(h.item.value);
$("#roleSwitcherSpan").css("display","none");
$("#changeRoleRSDialog").modal("show");
return false
}})
};
$(document).ready(function(){});
function htmlEncode(a){return $("<div/>").text(a).html()
}function htmlDecode(a){return $("<div/>").html(a).text()
}function initToolbar(){$("#asm_toolbar_resizerBtnMin").click(function(){minimizeToolbar()
});
$("#asm_toolbar_resizerBtnRestore").click(function(){maximizeToolbar()
});
maximizeToolbar()
}function showToolbar(){$("#asm_toolbar").show();
$("#mainForm").css({"margin-right":"25%"});
$("#mainDocument").css({"overflow-y":"hidden"});
$("#asm_global_spotlight_mask").attr("class","spotlight_mask translucent animated");
initToolbar()
}function hideToolbar(){$("#asm_toolbar").hide();
$("#mainForm").css({"margin-right":"0"});
$("#mainDocument").css({"overflow-y":"scroll"});
$("#asm_global_spotlight_mask").attr("class","spotlight_mask animated")
}function minimizeToolbar(a){$("#asm_toolbar").removeClass("asm_toolbar_large").addClass("asm_toolbar_small");
viewMatrix.set("asm_toolbar_resizerBtnMin","hide");
viewMatrix.set("asm_toolbar_resizerBtnRestore","show")
}function maximizeToolbar(a){$("#asm_toolbar").removeClass("asm_toolbar_small").addClass("asm_toolbar_large");
viewMatrix.set("asm_toolbar_resizerBtnMin","show");
viewMatrix.set("asm_toolbar_resizerBtnRestore","hide")
}function restoreToolbar(a){$("#asm_toolbar").css({width:oldWidth});
viewMatrix.set("asm_toolbar_resizerBtnMin","show");
viewMatrix.set("asm_toolbar_resizerBtnRestore","hide")
}$(document).mousedown(function(a){if(a.target.id=="asm_toolbar_resizer"){$(document).bind("mousemove",ToolbarMouseMove)
}});
$(document).mouseup(function(a){$(document).unbind("mousemove");
if(a.target.tagName=="TD"){alink=$(a.target.parentElement).find('a[id$="viewUser"]');
if(alink.length!=0&&!$(a.target.parentElement).hasClass("asm_toolbar_selected")){alink.click();
$(a.target.parentElement.parentElement.children).removeClass("asm_toolbar_selected");
$(a.target.parentElement).addClass("asm_toolbar_selected");
$("#asm_toolbar_addUser").show()
}}});
var ToolbarMouseMove=function(a){};
var Filter=function(c,a,b){this.columnName=a;
this.columnIndex=b;
this.tableSelector=c
};
Filter.prototype={onTextChange:function(a){pattern=a.target.value+"%";
pattern=pattern.replace(/%/g,".*");
reg=new RegExp(pattern,"i");
index=this.columnIndex;
$("#"+this.tableSelector+" tbody td:nth-child("+index+")").each(function(){if($(this).text().search(reg)!=0){$(this.parentElement).addClass("asm_filter_hide_by_col"+index)
}else{$(this.parentElement).removeClass("asm_filter_hide_by_col"+index)
}})
},genCode:function(){if($("#"+this.tableSelector+" thead th:nth-child("+this.columnIndex+") input.asm_toolbar_filter").length==0){var a=$("#"+this.tableSelector+" thead th:nth-child("+this.columnIndex+")").append("<input class='asm_toolbar_filter' placeholder='"+this.columnName+"'></input>")
}$(a).keyup($.proxy(this.onTextChange,this))
}};
var ViewMatrix=function(d,c,b,a){this.set("asm_toolbar_roles",d);
this.set("asm_toolbar_users",c);
this.set("asm_toolbar_userSelector",b);
this.set("asm_toolbar_roleSelector",a)
};
ViewMatrix.prototype={onChange:function(c,a,b){if(b=="hide"){$("#"+c).hide()
}else{if(b=="show"){$("#"+c).show()
}else{if(a!=null){$("#"+c).removeClass(a)
}if(b!=null){$("#"+c).addClass(b);
this[c]=b
}}}},set:function(b,a){this.onChange(b,this[b],a)
}};
viewMatrix=new ViewMatrix("show","show","hide","hide");
function switchView(a){maximizeToolbar();
$("#asm_toolbar_content").attr("class","row-fluid "+a)
}function addUser(){maximizeToolbar();
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_user")
}function addUserGroup(){maximizeToolbar();
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_user_group")
}function addCustomer(){maximizeToolbar();
$("#asm_res_selectone").attr("disabled","disabled");
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_customer")
}function copyAsm(){maximizeToolbar();
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_copy_asm")
}function addCustomerGroup(){maximizeToolbar();
$("#asm_res_selectone").attr("disabled","disabled");
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_customer_group")
}function addContract(){maximizeToolbar();
$("#asm_res_selectone").attr("disabled","disabled");
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_contract")
}function addTerritory(){maximizeToolbar();
$("#asm_res_selectone").attr("disabled","disabled");
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_territory")
}function addRole(){maximizeToolbar();
$("#asm_toolbar_content").attr("class","row-fluid asm_toolbar_add_role")
}function viewUser(){switchView("")
}function setSelectedRes(a,b){if(!$(a.parentElement).hasClass("active")){$("#"+b).click()
}}function addMessage(a){removeMessage();
$("#asm_toolbar_addRole").append("<div class='asm_warn'>"+a+"</div>")
}function removeMessage(){if($("#asm_toolbar_addRole .asm_warn")!=null){$("#asm_toolbar_addRole .asm_warn").remove()
}};
var required='<span class="required">*</span>';
$(document).ready(function(){$("li.admin:has(li)").show()
});
function buildAddressHtml(a){return'<div class="resShowDiv-desktop row-fluid show-detail-con" acs-index="10"><label class="i-b m-l-20 p-l-2 f-i c-666">Address: </label>'+a+" </div>"
}function buildCSIHtml(a){return'<div class="resShowDiv-desktop row-fluid show-detail-con" acs-index="10"><label class="i-b m-l-20 p-l-2 f-i c-666">CSI: </label>'+a+" </div>"
}function removeMe(b){var d=$(b).attr("id");
var a=d.split("_")[d.split("_").length-1];
$("div[id$=addressArea_"+(a)+"]").remove();
if(currentAddressNum>(a-1)){a=parseInt(a);
for(var c=a+1;
c<=currentAddressNum;
c++){d=$("div[id$=addressArea_"+(c)+"]").attr("id");
$("div[id$=addressArea_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=addressId_"+(c)+"]").attr("id");
$("input[id$=addressId_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("select[id$=addressType_"+(c)+"]").attr("id");
$("select[id$=addressType_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("select[id$=addressRegion_"+(c)+"]").attr("id");
$("select[id$=addressRegion_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("select[id$=customerCountry_"+(c)+"]").attr("id");
$("select[id$=customerCountry_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=address1_"+(c)+"]").attr("id");
$("input[id$=address1_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=address2_"+(c)+"]").attr("id");
$("input[id$=address2_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=address3_"+(c)+"]").attr("id");
$("input[id$=address3_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=address4_"+(c)+"]").attr("id");
$("input[id$=address4_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=city_"+(c)+"]").attr("id");
$("input[id$=city_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=province_"+(c)+"]").attr("id");
$("input[id$=province_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=postalcode_"+(c)+"]").attr("id");
$("input[id$=postalcode_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_removeAddress_"+(c)+"]").attr("id");
$("a[id$=btnajax_removeAddress_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_addAddress_"+(c)+"]").attr("id");
$("a[id$=btnajax_addAddress_"+c+"]").attr("id",d.replace(c,(c-1)))
}}currentAddressNum=currentAddressNum-1;
adjustAddressButton()
}function removeMeCSI(b){var d=$(b).attr("id");
var a=d.split("_")[d.split("_").length-1];
$("div[id$=customerCSIArea_"+(a)+"]").remove();
if(currentCSINum>(a-1)){a=parseInt(a);
for(var c=a+1;
c<=currentCSINum;
c++){d=$("div[id$=customerCSIArea_"+(c)+"]").attr("id");
$("div[id$=customerCSIArea_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=id_"+(c)+"]").attr("id");
$("input[id$=id_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=csiId_"+(c)+"]").attr("id");
$("input[id$=csiId_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("select[id$=csiCountry_"+(c)+"]").attr("id");
$("select[id$=csiCountry_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_removeCSI_"+(c)+"]").attr("id");
$("a[id$=btnajax_removeCSI_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_addCSI_"+(c)+"]").attr("id");
$("a[id$=btnajax_addCSI_"+c+"]").attr("id",d.replace(c,(c-1)))
}}currentCSINum=currentCSINum-1;
adjustCSIButton()
}function removePhone(b){var d=$(b).attr("id");
var a=d.split("_")[d.split("_").length-1];
$("div[id$=phoneArea_"+(a)+"]").remove();
if(currentPhoneNum>(a-1)){a=parseInt(a);
for(var c=a+1;
c<=currentPhoneNum;
c++){d=$("div[id$=phoneArea_"+(c)+"]").attr("id");
$("div[id$=phoneArea_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=phone_"+(c)+"]").attr("id");
$("input[id$=phone_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("select[id$=phoneType"+(c)+"]").attr("id");
$("select[id$=phoneType"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_removePhone_"+(c)+"]").attr("id");
$("a[id$=btnajax_removePhone_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_addPhone_"+(c)+"]").attr("id");
$("a[id$=btnajax_addPhone_"+c+"]").attr("id",d.replace(c,(c-1)))
}}currentPhoneNum=currentPhoneNum-1;
adjustPhoneButton();
controlAddPhoneButton()
}function removeEmail(b){var d=$(b).attr("id");
var a=d.split("_")[d.split("_").length-1];
$("div[id$=emailArea_"+(a)+"]").remove();
if(currentEmailNum>(a-1)){a=parseInt(a);
for(var c=a+1;
c<=currentEmailNum;
c++){d=$("div[id$=emailArea_"+(c)+"]").attr("id");
$("div[id$=emailArea_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("input[id$=email_"+(c)+"]").attr("id");
$("input[id$=email_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_removeEmail_"+(c)+"]").attr("id");
$("a[id$=btnajax_removeEmail_"+c+"]").attr("id",d.replace(c,(c-1)));
d=$("a[id$=btnajax_addEmail_"+(c)+"]").attr("id");
$("a[id$=btnajax_addEmail_"+c+"]").attr("id",d.replace(c,(c-1)))
}}currentEmailNum=currentEmailNum-1;
adjustEmailButton()
}function saveToPassForUser(){var c=[];
for(var a=1;
a<=currentAddressNum;
a++){c[a-1]={addressId:$("input[id$=addressId_"+a+"]").val()||0,orgId:0,addressTypeId:$("select[id$=addressType_"+a+"]").val()||0,streetAddress1:$("input[id$=address_"+a+"]").val(),streetAddress2:"",streetAddress3:"",stateOrProvince:$("input[id$=state_"+a+"]").val(),countryId:$("select[id$=country_"+a+"]").val()||0,postalCode:$("input[id$=zip_"+a+"]").val(),city:$("input[id$=city_"+a+"]").val()}
}$("input[id$='addressJson']").val(JSON.stringify(c));
var b=[];
for(var a=1;
a<=currentEmailNum;
a++){b[a-1]={emailAddress:$("input[id$=email_"+a+"]").val(),emailType:""}
}$("input[id$='emailJson']").val(JSON.stringify(b));
var d=[];
for(var a=1;
a<=currentPhoneNum;
a++){d[a-1]={phoneNumber:$("input[id$=phone_"+a+"]").val(),phoneType:$("select[id$=phoneType_"+a+"]").val()||0}
}$("input[id$='phoneJson']").val(JSON.stringify(d))
}function saveToPass(){var b=[];
for(var a=1;
a<=currentAddressNum;
a++){b[a-1]={id:$("input[id$=addressId_"+a+"]").val()||0,orgId:0,addressType:$("select[id$=addressType_"+a+"]").val()||0,countryId:$("select[id$=customerCountry_"+a+"]").val()||0,geoId:$("select[id$=addressRegion_"+a+"]").val()||0,streeAddress1:$("input[id$=address1_"+a+"]").val(),streeAddress2:$("input[id$=address2_"+a+"]").val(),streeAddress3:$("input[id$=address3_"+a+"]").val(),streeAddress4:$("input[id$=address4_"+a+"]").val(),city:$("input[id$=city_"+a+"]").val(),postalCode:$("input[id$=postalcode_"+a+"]").val(),stateOrProvince:$("input[id$=province_"+a+"]").val()}
}$("input[id$='addressJson']").val(JSON.stringify(b));
var c=[];
for(var a=1;
a<=currentCSINum;
a++){c[a-1]={id:$("input[id$=id_"+a+"]").val()||0,csi:$("input[id$=csiId_"+a+"]").val(),territoryId:$("select[id$=csiCountry_"+a+"]").val()||0}
}$("input[id$='csiJson']").val(JSON.stringify(c))
}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length){if(b&&b.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")
}return
}var c=a.data(this[0],"validator");
if(c){return c
}this.attr("novalidate","novalidate");
c=new a.validator(b,this[0]);
a.data(this[0],"validator",c);
if(c.settings.onsubmit){this.validateDelegate(":submit","click",function(d){if(c.settings.submitHandler){c.submitButton=d.target
}if(a(d.target).hasClass("cancel")){c.cancelSubmit=true
}if(a(d.target).attr("formnovalidate")!==undefined){c.cancelSubmit=true
}});
this.submit(function(d){if(c.settings.debug){d.preventDefault()
}function e(){var f;
if(c.settings.submitHandler){if(c.submitButton){f=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)
}c.settings.submitHandler.call(c,c.currentForm,d);
if(c.submitButton){f.remove()
}return false
}return true
}if(c.cancelSubmit){c.cancelSubmit=false;
return e()
}if(c.form()){if(c.pendingRequest){c.formSubmitted=true;
return false
}return e()
}else{c.focusInvalid();
return false
}})
}return c
},valid:function(){if(a(this[0]).is("form")){return this.validate().form()
}else{var c=true;
var b=a(this[0].form).validate();
this.each(function(){c=c&&b.element(this)
});
return c
}},removeAttrs:function(d){var b={},c=this;
a.each(d.split(/\s/),function(e,f){b[f]=c.attr(f);
c.removeAttr(f)
});
return b
},rules:function(e,b){var g=this[0];
if(e){var d=a.data(g.form,"validator").settings;
var i=d.rules;
var j=a.validator.staticRules(g);
switch(e){case"add":a.extend(j,a.validator.normalizeRule(b));
delete j.messages;
i[g.name]=j;
if(b.messages){d.messages[g.name]=a.extend(d.messages[g.name],b.messages)
}break;
case"remove":if(!b){delete i[g.name];
return j
}var h={};
a.each(b.split(/\s/),function(k,l){h[l]=j[l];
delete j[l]
});
return h
}}var f=a.validator.normalizeRules(a.extend({},a.validator.classRules(g),a.validator.attributeRules(g),a.validator.dataRules(g),a.validator.staticRules(g)),g);
if(f.required){var c=f.required;
delete f.required;
f=a.extend({required:c},f)
}return f
}});
a.extend(a.expr[":"],{blank:function(b){return !a.trim(""+a(b).val())
},filled:function(b){return !!a.trim(""+a(b).val())
},unchecked:function(b){return !a(b).prop("checked")
}});
a.validator=function(b,c){this.settings=a.extend(true,{},a.validator.defaults,b);
this.currentForm=c;
this.init()
};
a.validator.format=function(b,c){if(arguments.length===1){return function(){var d=a.makeArray(arguments);
d.unshift(b);
return a.validator.format.apply(this,d)
}
}if(arguments.length>2&&c.constructor!==Array){c=a.makeArray(arguments).slice(1)
}if(c.constructor!==Array){c=[c]
}a.each(c,function(d,e){b=b.replace(new RegExp("\\{"+d+"\\}","g"),function(){return e
})
});
return b
};
a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"errors",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(b,c){this.lastActive=b;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,b,this.settings.errorClass,this.settings.validClass)
}this.addWrapper(this.errorsFor(b)).hide()
}},onfocusout:function(b,c){if(!this.checkable(b)&&(b.name in this.submitted||!this.optional(b))){this.element(b)
}},onkeyup:function(b,c){if(c.which===9&&this.elementValue(b)===""){return
}else{if(b.name in this.submitted||b===this.lastElement){this.element(b)
}}},onclick:function(b,c){if(b.name in this.submitted){this.element(b)
}else{if(b.parentNode.name in this.submitted){this.element(b.parentNode)
}}},highlight:function(d,b,c){if(d.type==="radio"){this.findByName(d.name).addClass(b).removeClass(c)
}else{a(d).addClass(b).removeClass(c)
}},unhighlight:function(d,b,c){if(d.type==="radio"){this.findByName(d.name).removeClass(b).addClass(c)
}else{a(d).removeClass(b).addClass(c)
}}},setDefaults:function(b){a.extend(a.validator.defaults,b)
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=a(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm);
this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted={};
this.valueCache={};
this.pendingRequest=0;
this.pending={};
this.invalid={};
this.reset();
var b=(this.groups={});
a.each(this.settings.groups,function(e,f){if(typeof f==="string"){f=f.split(/\s/)
}a.each(f,function(h,g){b[g]=e
})
});
var d=this.settings.rules;
a.each(d,function(e,f){d[e]=a.validator.normalizeRule(f)
});
function c(g){var f=a.data(this[0].form,"validator"),e="on"+g.type.replace(/^validate/,"");
if(f.settings[e]){f.settings[e].call(f,this[0],g)
}}a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",c).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",c);
if(this.settings.invalidHandler){a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)
}},form:function(){this.checkForm();
a.extend(this.submitted,this.errorMap);
this.invalid=a.extend({},this.errorMap);
if(!this.valid()){a(this.currentForm).triggerHandler("invalid-form",[this])
}this.showErrors();
return this.valid()
},checkForm:function(){this.prepareForm();
for(var b=0,c=(this.currentElements=this.elements());
c[b];
b++){this.check(c[b])
}return this.valid()
},element:function(c){c=this.validationTargetFor(this.clean(c));
this.lastElement=c;
this.prepareElement(c);
this.currentElements=a(c);
var b=this.check(c)!==false;
if(b){delete this.invalid[c.name]
}else{this.invalid[c.name]=true
}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)
}return b
},showErrors:function(c){if(c){a.extend(this.errorMap,c);
this.errorList=[];
for(var b in c){this.errorList.push({message:c[b],element:this.findByName(b)[0]})
}this.successList=a.grep(this.successList,function(d){return !(d.name in c)
})
}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)
}else{this.defaultShowErrors()
}},resetForm:function(){if(a.fn.resetForm){a(this.currentForm).resetForm()
}this.submitted={};
this.lastElement=null;
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
},numberOfInvalids:function(){return this.objectLength(this.invalid)
},objectLength:function(d){var c=0;
for(var b in d){c++
}return c
},hideErrors:function(){this.addWrapper(this.toHide).hide()
},valid:function(){return this.size()===0
},size:function(){return this.errorList.length
},focusInvalid:function(){if(this.settings.focusInvalid){try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")
}catch(b){}}},findLastActive:function(){var b=this.lastActive;
return b&&a.grep(this.errorList,function(c){return c.element.name===b.name
}).length===1&&b
},elements:function(){var c=this,b={};
return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&c.settings.debug&&window.console){console.error("%o has no name assigned",this)
}if(this.name in b||!c.objectLength(a(this).rules())){return false
}b[this.name]=true;
return true
})
},clean:function(b){return a(b)[0]
},errors:function(){var b=this.settings.errorClass.replace(" ",".");
return a(this.settings.errorElement+"."+b,this.errorContext)
},reset:function(){this.successList=[];
this.errorList=[];
this.errorMap={};
this.toShow=a([]);
this.toHide=a([]);
this.currentElements=a([])
},prepareForm:function(){this.reset();
this.toHide=this.errors().add(this.containers)
},prepareElement:function(b){this.reset();
this.toHide=this.errorsFor(b)
},elementValue:function(b){var c=a(b).attr("type"),d=a(b).val();
if(c==="radio"||c==="checkbox"){return a("input[name='"+a(b).attr("name")+"']:checked").val()
}if(typeof d==="string"){return d.replace(/\r/g,"")
}return d
},check:function(c){c=this.validationTargetFor(this.clean(c));
var i=a(c).rules();
var d=false;
var h=this.elementValue(c);
var b;
for(var j in i){var g={method:j,parameters:i[j]};
try{b=a.validator.methods[j].call(this,h,c,g.parameters);
if(b==="dependency-mismatch"){d=true;
continue
}d=false;
if(b==="pending"){this.toHide=this.toHide.not(this.errorsFor(c));
return
}if(!b){this.formatAndAdd(c,g);
return false
}}catch(f){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+c.id+", check the '"+g.method+"' method.",f)
}throw f
}}if(d){return
}if(this.objectLength(i)){this.successList.push(c)
}return true
},customDataMessage:function(b,c){return a(b).data("msg-"+c.toLowerCase())||(b.attributes&&a(b).attr("data-msg-"+c.toLowerCase()))
},customMessage:function(c,d){var b=this.settings.messages[c];
return b&&(b.constructor===String?b:b[d])
},findDefined:function(){for(var b=0;
b<arguments.length;
b++){if(arguments[b]!==undefined){return arguments[b]
}}return undefined
},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||undefined,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")
},formatAndAdd:function(c,e){var d=this.defaultMessage(c,e.method),b=/\$?\{(\d+)\}/g;
if(typeof d==="function"){d=d.call(this,e.parameters,c)
}else{if(b.test(d)){d=a.validator.format(d.replace(b,"{$1}"),e.parameters)
}}this.errorList.push({message:d,element:c});
this.errorMap[c.name]=d;
this.submitted[c.name]=d
},addWrapper:function(b){if(this.settings.wrapper){b=b.add(b.parent(this.settings.wrapper))
}return b
},defaultShowErrors:function(){var c,d;
for(c=0;
this.errorList[c];
c++){var b=this.errorList[c];
if(this.settings.highlight){this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass)
}}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)
}if(this.settings.success){for(c=0;
this.successList[c];
c++){}}if(this.settings.unhighlight){for(c=0,d=this.validElements();
d[c];
c++){this.settings.unhighlight.call(this,d[c],this.settings.errorClass,this.settings.validClass)
}}this.toHide=this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show()
},validElements:function(){return this.currentElements.not(this.invalidElements())
},invalidElements:function(){return a(this.errorList).map(function(){return this.element
})
},showLabel:function(c,d){var b=this.errorsFor(c);
if(b.length){b.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
b.html(d)
}else{b=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(c)).addClass(this.settings.errorClass).html(d||"");
if(this.settings.wrapper){b=b.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()
}if(!this.labelContainer.append(b).length){if(this.settings.errorPlacement){this.settings.errorPlacement(d,a(c))
}else{b.insertAfter(c)
}}}if(!d&&this.settings.success){b.text("");
if(typeof this.settings.success==="string"){b.addClass(this.settings.success)
}else{this.settings.success(b,c)
}}this.toShow=this.toShow.add(b)
},errorsFor:function(c){var b=this.idOrName(c);
return this.errors().filter(function(){return a(this).attr("for")===b
})
},idOrName:function(b){return this.groups[b.name]||(this.checkable(b)?b.name:b.id||b.name)
},validationTargetFor:function(b){if(this.checkable(b)){b=this.findByName(b.name).not(this.settings.ignore)[0]
}return b
},checkable:function(b){return(/radio|checkbox/i).test(b.type)
},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")
},getLength:function(c,b){switch(b.nodeName.toLowerCase()){case"select":return a("option:selected",b).length;
case"input":if(this.checkable(b)){return this.findByName(b.name).filter(":checked").length
}}return c.length
},depend:function(c,b){return this.dependTypes[typeof c]?this.dependTypes[typeof c](c,b):true
},dependTypes:{"boolean":function(c,b){return c
},string:function(c,b){return !!a(c,b.form).length
},"function":function(c,b){return c(b)
}},optional:function(b){var c=this.elementValue(b);
return !a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"
},startRequest:function(b){if(!this.pending[b.name]){this.pendingRequest++;
this.pending[b.name]=true
}},stopRequest:function(b,c){this.pendingRequest--;
if(this.pendingRequest<0){this.pendingRequest=0
}delete this.pending[b.name];
if(c&&this.pendingRequest===0&&this.formSubmitted&&this.form()){a(this.currentForm).submit();
this.formSubmitted=false
}else{if(!c&&this.pendingRequest===0&&this.formSubmitted){a(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false
}}},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:true,message:this.defaultMessage(b,"remote")})
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(b,c){if(b.constructor===String){this.classRuleSettings[b]=c
}else{a.extend(this.classRuleSettings,b)
}},classRules:function(c){var d={};
var b=a(c).attr("class");
if(b){a.each(b.split(" "),function(){if(this in a.validator.classRuleSettings){a.extend(d,a.validator.classRuleSettings[this])
}})
}return d
},attributeRules:function(c){var f={};
var b=a(c);
var d=b[0].getAttribute("type");
for(var g in a.validator.methods){var e;
if(g==="required"){e=b.get(0).getAttribute(g);
if(e===""){e=true
}e=!!e
}else{e=b.attr(g)
}if(/min|max/.test(g)&&(d===null||/number|range|text/.test(d))){e=Number(e)
}if(e){f[g]=e
}else{if(d===g&&d!=="range"){f[g]=true
}}}if(f.maxlength&&/-1|2147483647|524288/.test(f.maxlength)){delete f.maxlength
}return f
},dataRules:function(c){var f,d,e={},b=a(c);
for(f in a.validator.methods){d=b.data("rule-"+f.toLowerCase());
if(d!==undefined){e[f]=d
}}return e
},staticRules:function(c){var d={};
var b=a.data(c.form,"validator");
if(b.settings.rules){d=a.validator.normalizeRule(b.settings.rules[c.name])||{}
}return d
},normalizeRules:function(c,b){a.each(c,function(f,e){if(e===false){delete c[f];
return
}if(e.param||e.depends){var d=true;
switch(typeof e.depends){case"string":d=!!a(e.depends,b.form).length;
break;
case"function":d=e.depends.call(b,b);
break
}if(d){c[f]=e.param!==undefined?e.param:true
}else{delete c[f]
}}});
a.each(c,function(d,e){c[d]=a.isFunction(e)?e(b):e
});
a.each(["minlength","maxlength"],function(){if(c[this]){c[this]=Number(c[this])
}});
a.each(["rangelength","range"],function(){var d;
if(c[this]){if(a.isArray(c[this])){c[this]=[Number(c[this][0]),Number(c[this][1])]
}else{if(typeof c[this]==="string"){d=c[this].split(/[\s,]+/);
c[this]=[Number(d[0]),Number(d[1])]
}}}});
if(a.validator.autoCreateRanges){if(c.min&&c.max){c.range=[c.min,c.max];
delete c.min;
delete c.max
}if(c.minlength&&c.maxlength){c.rangelength=[c.minlength,c.maxlength];
delete c.minlength;
delete c.maxlength
}}return c
},normalizeRule:function(c){if(typeof c==="string"){var b={};
a.each(c.split(/\s/),function(){b[this]=true
});
c=b
}return c
},addMethod:function(b,d,c){a.validator.methods[b]=d;
a.validator.messages[b]=c!==undefined?c:a.validator.messages[b];
if(d.length<3){a.validator.addClassRules(b,a.validator.normalizeRule(b))
}},methods:{required:function(c,b,e){if(!this.depend(e,b)){return"dependency-mismatch"
}if(b.nodeName.toLowerCase()==="select"){var d=a(b).val();
if(d==-1){return false
}return d&&d.length>0
}if(this.checkable(b)){return this.getLength(c,b)>0
}return a.trim(c).length>0
},email:function(c,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(c)
},url:function(c,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)
},date:function(c,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(c).toString())
},dateISO:function(c,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(c)
},number:function(c,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(c)
},digits:function(c,b){return this.optional(b)||/^\d+$/.test(c)
},creditcard:function(f,c){if(this.optional(c)){return"dependency-mismatch"
}if(/[^0-9 \-]+/.test(f)){return false
}var g=0,e=0,b=false;
f=f.replace(/\D/g,"");
for(var h=f.length-1;
h>=0;
h--){var d=f.charAt(h);
e=parseInt(d,10);
if(b){if((e*=2)>9){e-=9
}}g+=e;
b=!b
}return(g%10)===0
},minlength:function(d,b,e){var c=a.isArray(d)?d.length:this.getLength(a.trim(d),b);
return this.optional(b)||c>=e
},maxlength:function(d,b,e){var c=a.isArray(d)?d.length:this.getLength(a.trim(d),b);
return this.optional(b)||c<=e
},rangelength:function(d,b,e){var c=a.isArray(d)?d.length:this.getLength(a.trim(d),b);
return this.optional(b)||(c>=e[0]&&c<=e[1])
},min:function(c,b,d){return this.optional(b)||c>=d
},max:function(c,b,d){return this.optional(b)||c<=d
},range:function(c,b,d){return this.optional(b)||(c>=d[0]&&c<=d[1])
},equalTo:function(c,b,e){var d=a(e);
if(this.settings.onfocusout){d.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(b).valid()
})
}return c===d.val()
},remote:function(f,c,g){if(this.optional(c)){return"dependency-mismatch"
}var d=this.previousValue(c);
if(!this.settings.messages[c.name]){this.settings.messages[c.name]={}
}d.originalMessage=this.settings.messages[c.name].remote;
this.settings.messages[c.name].remote=d.message;
g=typeof g==="string"&&{url:g}||g;
if(d.old===f){return d.valid
}d.old=f;
var b=this;
this.startRequest(c);
var e={};
e[c.name]=f;
a.ajax(a.extend(true,{url:g,mode:"abort",port:"validate"+c.name,dataType:"json",data:e,success:function(i){b.settings.messages[c.name].remote=d.originalMessage;
var k=i===true||i==="true";
if(k){var h=b.formSubmitted;
b.prepareElement(c);
b.formSubmitted=h;
b.successList.push(c);
delete b.invalid[c.name];
b.showErrors()
}else{var l={};
var j=i||b.defaultMessage(c,"remote");
l[c.name]=d.message=a.isFunction(j)?j(f):j;
b.invalid[c.name]=true;
b.showErrors(l)
}d.valid=k;
b.stopRequest(c,k)
}},g));
return"pending"
}}});
a.format=a.validator.format
}(jQuery));
(function(c){var a={};
if(c.ajaxPrefilter){c.ajaxPrefilter(function(f,e,g){var d=f.port;
if(f.mode==="abort"){if(a[d]){a[d].abort()
}a[d]=g
}})
}else{var b=c.ajax;
c.ajax=function(e){var f=("mode" in e?e:c.ajaxSettings).mode,d=("port" in e?e:c.ajaxSettings).port;
if(f==="abort"){if(a[d]){a[d].abort()
}a[d]=b.apply(this,arguments);
return a[d]
}return b.apply(this,arguments)
}
}}(jQuery));
(function(a){a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(e){var f=a(e.target);
if(f.is(d)){return b.apply(f,arguments)
}})
}})
}(jQuery));
function getMoreErrMessage(){return""
}function validation(){$("#mainForm").validate({showErrors:function(c,e){$("#errorMesTable").children().remove();
$("#globalMsg").children().remove();
$("#globalMsg").hide();
if(getMoreErrMessage()!=""){e.push({message:getMoreErrMessage(),element:""})
}for(var b=e.length;
b>0;
b--){$("#errorMesTable").append("<tr><td><div ></div></td></tr>")
}$("#errorMesTable").find("div").addClass("af_messages_detail");
if(e.length>0){$(".af_messages_detail").each(function(f){if(e[f]){$(this).append(e[f].message)
}});
var d=$("#error_message").children().clone();
$(d).find("*").each(function(f,g){if(g.id){g.id=g.id+"_clone"
}});
$("#globalMsg").html(d);
$("#globalMsg").show();
refreshCamMessage()
}this.defaultShowErrors()
}});
var a=" Value is required!";
$(".required").each(function(c){var b=$(this).parent().text().replace("*","").replace(":","");
$(this).parent().siblings("div").children().rules("add",{required:true,messages:{required:b+a}})
})
}(function(a){a.fn.addOption=function(){var h=function(m,u,x,r,s){var q=document.createElement("option");
q.value=u,q.text=x;
var l=m.options;
var k=l.length;
if(!m.cache){m.cache={};
for(var p=0;
p<k;
p++){m.cache[l[p].value]=p
}}if(s||s==0){var j=q;
for(var w=s;
w<=k;
w++){var n=m.options[w];
m.options[w]=j;
l[w]=j;
m.cache[l[w].value]=w;
j=n
}}if(typeof m.cache[u]=="undefined"){m.cache[u]=k
}m.options[m.cache[u]]=q;
if(r){q.selected=true
}};
var c=arguments;
if(c.length==0){return this
}var g=true;
var b=false;
var e,d,f;
if(typeof(c[0])=="object"){b=true;
e=c[0]
}if(c.length>=2){if(typeof(c[1])=="boolean"){g=c[1];
startindex=c[2]
}else{if(typeof(c[2])=="boolean"){g=c[2];
startindex=c[1]
}else{startindex=c[1]
}}if(!b){d=c[0];
f=c[1]
}}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return
}if(b){for(var i in e){h(this,i,e[i],g,startindex);
startindex+=1
}}else{h(this,d,f,g,startindex)
}});
return this
};
a.fn.ajaxAddOption=function(d,f,b,e,c){if(typeof(d)!="string"){return this
}if(typeof(f)!="object"){f={}
}if(typeof(b)!="boolean"){b=true
}this.each(function(){var g=this;
a.getJSON(d,f,function(h){a(g).addOption(h,b);
if(typeof e=="function"){if(typeof c=="object"){e.apply(g,c)
}else{e.call(g)
}}})
});
return this
};
a.fn.removeOption=function(){var c=arguments;
if(c.length==0){return this
}var e=typeof(c[0]);
var d,f;
if(e=="string"||e=="object"||e=="function"){d=c[0];
if(d.constructor==Array){var b=d.length;
for(var g=0;
g<b;
g++){this.removeOption(d[g],c[1])
}return this
}}else{if(e=="number"){f=c[0]
}else{return this
}}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return
}if(this.cache){this.cache=null
}var h=false;
var l=this.options;
if(!!d){var j=l.length;
for(var k=j-1;
k>=0;
k--){if(d.constructor==RegExp){if(l[k].value.match(d)){h=true
}}else{if(l[k].value==d){h=true
}}if(h&&c[1]===true){h=l[k].selected
}if(h){l[k]=null
}h=false
}}else{if(c[1]===true){h=l[f].selected
}else{h=true
}if(h){this.remove(f)
}}});
return this
};
a.fn.sortOptions=function(c){var d=a(this).selectedValues();
var b=typeof(c)=="undefined"?true:!!c;
this.each(function(){if(this.nodeName.toLowerCase()!="select"){return
}var g=this.options;
var e=g.length;
var h=[];
for(var f=0;
f<e;
f++){h[f]={v:g[f].value,t:g[f].text}
}h.sort(function(j,i){o1t=j.t.toLowerCase(),o2t=i.t.toLowerCase();
if(o1t==o2t){return 0
}if(b){return o1t<o2t?-1:1
}else{return o1t>o2t?-1:1
}});
for(var f=0;
f<e;
f++){g[f].text=h[f].t;
g[f].value=h[f].v
}}).selectOptions(d,true);
return this
};
a.fn.selectOptions=function(e,b){var d=e;
var g=typeof(e);
if(g=="object"&&d.constructor==Array){var f=this;
a.each(d,function(){f.selectOptions(this,b)
})
}var h=b||false;
if(g!="string"&&g!="function"&&g!="object"){return this
}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return this
}var k=this.options;
var c=k.length;
for(var j=0;
j<c;
j++){if(d.constructor==RegExp){if(k[j].value.match(d)){k[j].selected=true
}else{if(h){k[j].selected=false
}}}else{if(k[j].value==d){k[j].selected=true
}else{if(h){k[j].selected=false
}}}}});
return this
};
a.fn.copyOptions=function(d,c){var b=c||"selected";
if(a(d).size()==0){return this
}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return this
}var g=this.options;
var e=g.length;
for(var f=0;
f<e;
f++){if(b=="all"||(b=="selected"&&g[f].selected)){a(d).addOption(g[f].value,g[f].text)
}}});
return this
};
a.fn.containsOption=function(e,c){var d=false;
var b=e;
var f=typeof(b);
var g=typeof(c);
if(f!="string"&&f!="function"&&f!="object"){return g=="function"?this:d
}this.each(function(){if(this.nodeName.toLowerCase()!="select"){return this
}if(d&&g!="function"){return false
}var k=this.options;
var h=k.length;
for(var j=0;
j<h;
j++){if(b.constructor==RegExp){if(k[j].value.match(b)){d=true;
if(g=="function"){c.call(k[j],j)
}}}else{if(k[j].value==b){d=true;
if(g=="function"){c.call(k[j],j)
}}}}});
return g=="function"?this:d
};
a.fn.selectedValues=function(){var b=[];
this.selectedOptions().each(function(){b[b.length]=this.value
});
return b
};
a.fn.selectedTexts=function(){var b=[];
this.selectedOptions().each(function(){b[b.length]=this.text
});
return b
};
a.fn.selectedOptions=function(){return this.find("option:selected")
}
})(jQuery);
function validateEmail(a){var b=/^(([^&lt;&gt;()[\]\\.,;:\s@\"]+(\.[^&lt;&gt;()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return b.test(a)
};
(function($){var uuid=0;
var iframeOptions={resizeMaxTry:4,resizeWaitTime:50,minimumHeight:200,defaultHeight:3000,heightOffset:0,exceptPages:"",debugMode:false,visibilitybeforeload:false,blockCrossDomain:false,externalHeightName:"bodyHeight",onMessageFunctionName:"getHeight",domainName:"*",watcher:false,watcherTime:400};
$.iframeHeight=function(el,options){var base=this;
$.iframeHeight.resizeTimeout=null;
$.iframeHeight.resizeCount=0;
base.$el=$(el);
base.el=el;
base.$el.before("<div id='iframeHeight-Container' style='padding: 0; margin: 0; border: none; background-color: transparent;'></div>");
base.$el.appendTo("#iframeHeight-Container");
base.$container=$("#iframeHeight-Container");
base.$el.data("iframeHeight",base);
base.watcher=null;
base.debug={FirstTime:true,Init:function(){if(!("console" in window)){console={}
}"log info warn error dir clear".replace(/\w+/g,function(f){if(!(f in console)){console[f]=console.log||new Function
}})
},Log:function(message){if(this.FirstTime&&this.FirstTime===true){this.Init();
this.FirstTime=false
}if(base.options.debugMode&&base.options.debugMode===true&&window.console&&message){window.console.log("Iframe Plugin : "+message)
}},GetBrowserInfo:(function(pub){var matched,browserObj;
var uaMatch=function(ua){ua=ua.toLowerCase();
if(
/*@cc_on/*@if(@_jscript_version<=5.6)1@else@*/
0
/*@end@*/
){ua="msie 6.0"
}var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];
return{browserObj:match[1]||"",version:match[2]||"0"}
};
matched=uaMatch(navigator.userAgent);
browserObj={chrome:false,safari:false,mozilla:false,msie:false,webkit:false};
if(matched.browserObj){browserObj[matched.browserObj]=true;
browserObj.version=matched.version
}if(browserObj.chrome){browserObj.webkit=true
}else{if(browserObj.webkit){browserObj.safari=true
}}pub=browserObj;
return pub
}(this.GetBrowserInfo||{}))};
var isThisCDI=function(){try{var contentHtml;
if(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0"){contentHtml=base.$el.get(0).contentWindow.location.href
}else{contentHtml=base.$el.get(0).contentDocument.location.href
}base.debug.Log("This page is non-Cross Domain - "+contentHtml);
return false
}catch(err){base.debug.Log("This page is Cross Domain");
return true
}};
base.resetIframe=function(){if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0")){base.$el.css("visibility","hidden")
}base.debug.Log("Old Height is "+base.$el.height()+"px");
base.$el.css("height","").removeAttr("height");
base.debug.Log("Reset iframe");
base.debug.Log("Height is "+base.$el.height()+"px after reset")
};
base.resizeFromOutside=function(event){if(base.options.blockCrossDomain){base.debug.Log("Blocked cross domain fix");
return false
}if(typeof event==="undefined"||typeof event.data!=="number"){return false
}if(typeof parseInt(event.data)!=="number"){return false
}var frameHeightPx=(parseInt(event.data)+base.options.heightOffset)+"px";
base.resetIframe();
base.$el.height(frameHeightPx);
if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0")){base.$el.css("visibility","visible")
}base.debug.Log("Got height from outside. Height is "+(parseInt(event.data)+base.options.heightOffset)+"px");
return true
};
base.checkMessageEvent=function(){if(base.options.blockCrossDomain||(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0")){base.debug.Log("Blocked cross domain fix");
return false
}base.resetIframe();
if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0")){base.$el.css("visibility","visible")
}if(window.addEventListener){window.addEventListener("message",base.resizeFromOutside,false)
}else{if(window.attachEvent){window.attachEvent("onmessage",base.resizeFromOutside)
}}if(!base.$el.id){base.$el.id="iframe-id-"+(++uuid)
}var frame=document.getElementById(base.$el.attr("id"));
var message=base.options.onMessageFunctionName;
if(frame.contentWindow.postMessage){frame.contentWindow.postMessage(message,"*")
}else{base.debug.Log("Your browser does not support the postMessage method!");
return false
}base.debug.Log("Cross Domain Iframe started");
return true
};
var tryFixIframe=function(){if($.iframeHeight.resizeCount<=base.options.resizeMaxTry){$.iframeHeight.resizeCount++;
$.iframeHeight.resizeTimeout=setTimeout($.iframeHeight.resizeIframe,base.options.resizeWaitTime);
base.debug.Log($.iframeHeight.resizeCount+" time(s) tried")
}else{clearTimeout($.iframeHeight.resizeTimeout);
$.iframeHeight.resizeCount=0;
base.debug.Log("set default height for iframe");
base.setIframeHeight(base.options.defaultHeight+base.options.heightOffset)
}};
base.sendInfotoTop=function(){if(top.length>0&&typeof JSON!=="undefined"){var data={};
data[base.options.externalHeightName].value=$(document).height();
var domain="*";
data=JSON.stringify(data);
top.postMessage(data,domain);
base.debug.Log("sent info to top page");
return false
}return true
};
base.setIframeHeight=function(_height){base.$el.height(_height).css("height",_height);
if(base.$el.data("iframeheight")===_height){base.$container.height(_height).css("height",_height)
}if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0")){base.$el.css("visibility","visible")
}base.debug.Log("Now iframe height is "+_height+"px");
base.$el.data("iframeheight",_height)
};
$.iframeHeight.resizeIframe=function(){base.resetIframe();
if(isThisCDI()){base.$el.height(base.options.defaultHeight+base.options.heightOffset).css("height",base.options.defaultHeight+base.options.heightOffset);
if(base.options.visibilitybeforeload&&!(base.debug.GetBrowserInfo.msie&&base.debug.GetBrowserInfo.version==="7.0")){base.$el.css("visibility","visible")
}base.checkMessageEvent()
}else{if(base.$el.css("height")===base.options.minimumHeight+"px"){base.resetIframe()
}if(base.$el.get(0).contentWindow.document.body!==null){base.debug.Log("This page has body info");
var _pageHeight=$(base.$el.get(0).contentWindow.document).height();
var _pageName=base.$el.get(0).contentWindow.document.location.pathname.substring(base.$el.get(0).contentWindow.document.location.pathname.lastIndexOf("/")+1).toLowerCase();
base.debug.Log("page height : "+_pageHeight+"px || page name : "+_pageName);
if((_pageHeight<=base.options.minimumHeight&&base.options.exceptPages.indexOf(_pageName)===-1)){tryFixIframe()
}else{if(_pageHeight>base.options.minimumHeight&&base.options.exceptPages.indexOf(_pageName)===-1){base.setIframeHeight(_pageHeight+base.options.heightOffset)
}}}else{base.debug.Log("This page has not body info");
tryFixIframe()
}}};
this.$el.bind("updateIframe",function(){$.iframeHeight.resizeIframe();
base.debug.Log("Updated Iframe Manually")
});
this.$el.bind("killWatcher",function(){window.clearInterval(base.watcher);
base.debug.Log("Killed Watcher")
});
base.init=function(){base.options=$.extend({},$.iframeHeight.defaultOptions,options);
if(base.options.watcher===true){base.options.blockCrossDomain=true
}base.debug.Log(base.options);
if(base.$el.get(0).tagName===undefined||base.$el.get(0).tagName.toLowerCase()!=="iframe"){base.debug.Log("This element is not iframe!");
return false
}$.iframeHeight.resizeIframe();
base.$el.load(function(){$.iframeHeight.resizeIframe()
});
if(base.options.watcher){base.watcher=setInterval(function(){$.iframeHeight.resizeIframe();
base.debug.Log("Checked Iframe")
},base.options.watcherTime)
}return true
};
base.init()
};
$.iframeHeight.defaultOptions=iframeOptions;
$.fn.iframeHeight=function(options){return this.each(function(){(new $.iframeHeight(this,options))
})
};
$.iframeHeightExternal=function(){if(arguments.length===1){if($.isPlainObject(arguments[0])){iframeOptions=arguments[0]
}}if(window.addEventListener){window.addEventListener("message",OnMessage,false)
}else{if(window.attachEvent){window.attachEvent("onmessage",OnMessage)
}}function OnMessage(event){var _domain;
if("domain" in event){_domain=event.domain
}if("origin" in event){_domain=event.origin
}if(iframeOptions.domainName!=="*"){if(_domain!==iframeOptions.domainName){$.iframeHeight.debug.Log("It's not same domain. Blocked!");
return
}}if(event.data==iframeOptions.onMessageFunctionName){var message=$(document).height();
event.source.postMessage(message,event.origin)
}}}
})(jQuery);
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};
if(j===null){j="";
m.expires=-1
}var e="";
if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;
if(typeof m.expires=="number"){f=new Date();
f.setTime(f.getTime()+(m.expires*24*60*60*1000))
}else{f=m.expires
}e="; expires="+f.toUTCString()
}var l=m.path?"; path="+(m.path):"";
var g=m.domain?"; domain="+(m.domain):"";
var a=m.secure?"; secure":"";
document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")
}else{var d=null;
if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");
for(var h=0;
h<k.length;
h++){var c=jQuery.trim(k[h]);
if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));
break
}}}return d
}};
(function(b){b.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",191:"/",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"}};
function a(d){if(typeof d.data!=="string"){return
}var c=d.handler,e=d.data.toLowerCase().split(" ");
d.handler=function(n){if(this!==n.target&&(/textarea|select/i.test(n.target.nodeName)||n.target.type==="text")){return
}var h=n.type!=="keypress"&&b.hotkeys.specialKeys[n.which],o=String.fromCharCode(n.which).toLowerCase(),k,m="",g={};
if(n.altKey&&h!=="alt"){m+="alt+"
}if(n.ctrlKey&&h!=="ctrl"){m+="ctrl+"
}if(n.metaKey&&!n.ctrlKey&&h!=="meta"){m+="meta+"
}if(n.shiftKey&&h!=="shift"){m+="shift+"
}if(h){g[m+h]=true
}else{g[m+o]=true;
g[m+b.hotkeys.shiftNums[o]]=true;
if(m==="shift+"){g[b.hotkeys.shiftNums[o]]=true
}}for(var j=0,f=e.length;
j<f;
j++){if(g[e[j]]){return c.apply(this,arguments)
}}}
}b.each(["keydown","keyup","keypress"],function(){b.event.special[this]={add:a}
})
})(jQuery);
"use strict";
(function(){if(jQuery&&jQuery.jstree){return
}var c=false,b=false,a=false;
(function(g){g.vakata={};
g.vakata.css={get_css:function(n,k,l){n=n.toLowerCase();
var m=l.cssRules||l.rules,i=0;
do{if(m.length&&i>m.length+5){return false
}if(m[i].selectorText&&m[i].selectorText.toLowerCase()==n){if(k===true){if(l.removeRule){l.removeRule(i)
}if(l.deleteRule){l.deleteRule(i)
}return true
}else{return m[i]
}}}while(m[++i]);
return false
},add_css:function(j,i){if(g.jstree.css.get_css(j,false,i)){return false
}if(i.insertRule){i.insertRule(j+" { }",0)
}else{i.addRule(j,null,0)
}return g.vakata.css.get_css(j)
},remove_css:function(j,i){return g.vakata.css.get_css(j,true,i)
},add_sheet:function(j){var i=false,l=true;
if(j.str){if(j.title){i=g("style[id='"+j.title+"-stylesheet']")[0]
}if(i){l=false
}else{i=document.createElement("style");
i.setAttribute("type","text/css");
if(j.title){i.setAttribute("id",j.title+"-stylesheet")
}}if(i.styleSheet){if(l){document.getElementsByTagName("head")[0].appendChild(i);
i.styleSheet.cssText=j.str
}else{i.styleSheet.cssText=i.styleSheet.cssText+" "+j.str
}}else{i.appendChild(document.createTextNode(j.str));
document.getElementsByTagName("head")[0].appendChild(i)
}return i.sheet||i.styleSheet
}if(j.url){if(document.createStyleSheet){try{i=document.createStyleSheet(j.url)
}catch(k){}}else{i=document.createElement("link");
i.rel="stylesheet";
i.type="text/css";
i.media="all";
i.href=j.url;
document.getElementsByTagName("head")[0].appendChild(i);
return i.styleSheet
}}}};
var h=[],f=-1,e={},d={};
g.fn.jstree=function(l){var i=(typeof l=="string"),j=Array.prototype.slice.call(arguments,1),k=this;
if(i){if(l.substring(0,1)=="_"){return k
}this.each(function(){var m=h[g.data(this,"jstree_instance_id")],n=(m&&g.isFunction(m[l]))?m[l].apply(m,j):m;
if(typeof n!=="undefined"&&(l.indexOf("is_")===0||(n!==true&&n!==false))){k=n;
return false
}})
}else{this.each(function(){var q=g.data(this,"jstree_instance_id"),n=[],m=l?g.extend({},true,l):{},r=g(this),p=false,o=[];
n=n.concat(j);
if(r.data("jstree")){n.push(r.data("jstree"))
}m=n.length?g.extend.apply(null,[true,m].concat(n)):m;
if(typeof q!=="undefined"&&h[q]){h[q].destroy()
}q=parseInt(h.push({}),10)-1;
g.data(this,"jstree_instance_id",q);
m.plugins=g.isArray(m.plugins)?m.plugins:g.jstree.defaults.plugins.slice();
m.plugins.unshift("core");
m.plugins=m.plugins.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(",");
p=g.extend(true,{},g.jstree.defaults,m);
p.plugins=m.plugins;
g.each(e,function(s,t){if(g.inArray(s,p.plugins)===-1){p[s]=null;
delete p[s]
}else{o.push(s)
}});
p.plugins=o;
h[q]=new g.jstree._instance(q,g(this).addClass("jstree jstree-"+q),p);
g.each(h[q]._get_settings().plugins,function(s,t){h[q].data[t]={}
});
g.each(h[q]._get_settings().plugins,function(s,t){if(e[t]){e[t].__init.apply(h[q])
}});
setTimeout(function(){if(h[q]){h[q].init()
}},0)
})
}return k
};
g.jstree={defaults:{plugins:[]},_focused:function(){return h[f]||null
},_reference:function(i){if(h[i]){return h[i]
}var j=g(i);
if(!j.length&&typeof i==="string"){j=g("#"+i)
}if(!j.length){return null
}return h[j.closest(".jstree").data("jstree_instance_id")]||null
},_instance:function(j,i,k){this.data={core:{}};
this.get_settings=function(){return g.extend(true,{},k)
};
this._get_settings=function(){return k
};
this.get_index=function(){return j
};
this.get_container=function(){return i
};
this.get_container_ul=function(){return i.children("ul:eq(0)")
};
this._set_settings=function(l){k=g.extend(true,{},k,l)
}
},_fn:{},plugin:function(i,j){j=g.extend({},{__init:g.noop,__destroy:g.noop,_fn:{},defaults:false},j);
e[i]=j;
g.jstree.defaults[i]=j.defaults;
g.each(j._fn,function(k,l){l.plugin=i;
l.old=g.jstree._fn[k];
g.jstree._fn[k]=function(){var m,o=l,n=Array.prototype.slice.call(arguments),q=new g.Event("before.jstree"),p=false;
if(this.data.core.locked===true&&k!=="unlock"&&k!=="is_locked"){return
}do{if(o&&o.plugin&&g.inArray(o.plugin,this._get_settings().plugins)!==-1){break
}o=o.old
}while(o);
if(!o){return
}if(k.indexOf("_")===0){m=o.apply(this,n)
}else{m=this.get_container().triggerHandler(q,{func:k,inst:this,args:n,plugin:o.plugin});
if(m===false){return
}if(typeof m!=="undefined"){n=m
}m=o.apply(g.extend({},this,{__callback:function(r){this.get_container().triggerHandler(k+".jstree",{inst:this,args:n,rslt:r,rlbk:p})
},__rollback:function(){p=this.get_rollback();
return p
},__call_old:function(r){return o.old.apply(this,(r?Array.prototype.slice.call(arguments,1):n))
}}),n)
}return m
};
g.jstree._fn[k].old=l.old;
g.jstree._fn[k].plugin=i
})
},rollback:function(i){if(i){if(!g.isArray(i)){i=[i]
}g.each(i,function(j,k){h[k.i].set_rollback(k.h,k.d)
})
}}};
g.jstree._fn=g.jstree._instance.prototype={};
g(function(){var k=navigator.userAgent.toLowerCase(),j=(k.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],i=".jstree ul, .jstree li { display:block; margin:0 0 0 0; padding:0 0 0 0; list-style-type:none; } .jstree li { display:block; min-height:18px; line-height:18px; white-space:nowrap; margin-left:18px; min-width:18px; } .jstree-rtl li { margin-left:0; margin-right:18px; } .jstree > ul > li { margin-left:0px; } .jstree-rtl > ul > li { margin-right:0px; } .jstree ins { display:inline-block; text-decoration:none; width:18px; height:18px; margin:0 0 0 0; padding:0; } .jstree a { display:inline-block; line-height:16px; height:16px; color:black; white-space:nowrap; text-decoration:none; padding:1px 2px; margin:0; } .jstree a:focus { outline: none; } .jstree a > ins { height:16px; width:16px; } .jstree a > .jstree-icon { margin-right:3px; } .jstree-rtl a > .jstree-icon { margin-left:3px; margin-right:0; } li.jstree-open > ul { display:block; } li.jstree-closed > ul { display:none; } ";
if(/msie/.test(k)&&parseInt(j,10)==6){c=true;
try{document.execCommand("BackgroundImageCache",false,true)
}catch(l){}i+=".jstree li { height:18px; margin-left:0; margin-right:0; } .jstree li li { margin-left:18px; } .jstree-rtl li li { margin-left:0px; margin-right:18px; } li.jstree-open ul { display:block; } li.jstree-closed ul { display:none !important; } .jstree li a { display:inline; border-width:0 !important; padding:0px 2px !important; } .jstree li a ins { height:16px; width:16px; margin-right:3px; } .jstree-rtl li a ins { margin-right:0px; margin-left:3px; } "
}if(/msie/.test(k)&&parseInt(j,10)==7){b=true;
i+=".jstree li a { border-width:0 !important; padding:0px 2px !important; } "
}if(!/compatible/.test(k)&&/mozilla/.test(k)&&parseFloat(j,10)<1.9){a=true;
i+=".jstree ins { display:-moz-inline-box; } .jstree li { line-height:12px; } .jstree a { display:-moz-inline-box; } .jstree .jstree-no-icons .jstree-checkbox { display:-moz-inline-stack !important; } "
}g.vakata.css.add_sheet({str:i,title:"jstree"})
});
g.jstree.plugin("core",{__init:function(){this.data.core.locked=false;
this.data.core.to_open=this.get_settings().core.initially_open;
this.data.core.to_load=this.get_settings().core.initially_load
},defaults:{html_titles:false,animation:500,initially_open:[],initially_load:[],open_parents:true,notify_plugins:true,rtl:false,load_open:false,strings:{loading:"Loading ...",new_node:"New node",multiple_selection:"Multiple selection"}},_fn:{init:function(){this.set_focus();
if(this._get_settings().core.rtl){this.get_container().addClass("jstree-rtl").css("direction","rtl")
}this.get_container().html("<ul><li class='jstree-last jstree-leaf'><ins>&#160;</ins><a class='jstree-loading' href='#'><ins class='jstree-icon'>&#160;</ins>"+this._get_string("loading")+"</a></li></ul>");
this.data.core.li_height=this.get_container_ul().find("li.jstree-closed, li.jstree-leaf").eq(0).height()||18;
this.get_container().delegate("li > ins","click.jstree",g.proxy(function(j){var i=g(j.target);
this.toggle_node(i)
},this)).bind("mousedown.jstree",g.proxy(function(){this.set_focus()
},this)).bind("dblclick.jstree",function(j){var k;
if(document.selection&&document.selection.empty){document.selection.empty()
}else{if(window.getSelection){k=window.getSelection();
try{k.removeAllRanges();
k.collapse()
}catch(i){}}}});
if(this._get_settings().core.notify_plugins){this.get_container().bind("load_node.jstree",g.proxy(function(k,j){var l=this._get_node(j.rslt.obj),i=this;
if(l===-1){l=this.get_container_ul()
}if(!l.length){return
}l.find("li").each(function(){var m=g(this);
if(m.data("jstree")){g.each(m.data("jstree"),function(o,n){if(i.data[o]&&g.isFunction(i["_"+o+"_notify"])){i["_"+o+"_notify"].call(i,m,n)
}})
}})
},this))
}if(this._get_settings().core.load_open){this.get_container().bind("load_node.jstree",g.proxy(function(k,j){var l=this._get_node(j.rslt.obj),i=this;
if(l===-1){l=this.get_container_ul()
}if(!l.length){return
}l.find("li.jstree-open:not(:has(ul))").each(function(){i.load_node(this,g.noop,g.noop)
})
},this))
}this.__callback();
this.load_node(-1,function(){this.loaded();
this.reload_nodes()
})
},destroy:function(){var j,m=this.get_index(),k=this._get_settings(),l=this;
g.each(k.plugins,function(n,p){try{e[p].__destroy.apply(l)
}catch(o){}});
this.__callback();
if(this.is_focused()){for(j in h){if(h.hasOwnProperty(j)&&j!=m){h[j].set_focus();
break
}}}if(m===f){f=-1
}this.get_container().unbind(".jstree").undelegate(".jstree").removeData("jstree_instance_id").find("[class^='jstree']").addBack().attr("class",function(){return this.className.replace(/jstree[^ ]*|$/ig,"")
});
g(document).unbind(".jstree-"+m).undelegate(".jstree-"+m);
h[m]=null;
delete h[m]
},_core_notify:function(j,i){if(i.opened){this.open_node(j,false,true)
}},lock:function(){this.data.core.locked=true;
this.get_container().children("ul").addClass("jstree-locked").css("opacity","0.7");
this.__callback({})
},unlock:function(){this.data.core.locked=false;
this.get_container().children("ul").removeClass("jstree-locked").css("opacity","1");
this.__callback({})
},is_locked:function(){return this.data.core.locked
},save_opened:function(){var i=this;
this.data.core.to_open=[];
this.get_container_ul().find("li.jstree-open").each(function(){if(this.id){i.data.core.to_open.push("#"+this.id.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:"))
}});
this.__callback(i.data.core.to_open)
},save_loaded:function(){},reload_nodes:function(j){var m=this,i=true,l=[],k=[];
if(!j){this.data.core.reopen=false;
this.data.core.refreshing=true;
this.data.core.to_open=g.map(g.makeArray(this.data.core.to_open),function(o){return"#"+o.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:")
});
this.data.core.to_load=g.map(g.makeArray(this.data.core.to_load),function(o){return"#"+o.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:")
});
if(this.data.core.to_open.length){this.data.core.to_load=this.data.core.to_load.concat(this.data.core.to_open)
}}if(this.data.core.to_load.length){g.each(this.data.core.to_load,function(n,o){if(o=="#"){return true
}if(g(o).length){l.push(o)
}else{k.push(o)
}});
if(l.length){this.data.core.to_load=k;
g.each(l,function(n,o){if(!m._is_loaded(o)){m.load_node(o,function(){m.reload_nodes(true)
},function(){m.reload_nodes(true)
});
i=false
}})
}}if(this.data.core.to_open.length){g.each(this.data.core.to_open,function(n,o){m.open_node(o,false,true)
})
}if(i){if(this.data.core.reopen){clearTimeout(this.data.core.reopen)
}this.data.core.reopen=setTimeout(function(){m.__callback({},m)
},50);
this.data.core.refreshing=false;
this.reopen()
}},reopen:function(){var i=this;
if(this.data.core.to_open.length){g.each(this.data.core.to_open,function(j,k){i.open_node(k,false,true)
})
}this.__callback({})
},refresh:function(i){var j=this;
this.save_opened();
if(!i){i=-1
}i=this._get_node(i);
if(!i){i=-1
}if(i!==-1){i.children("UL").remove()
}else{this.get_container_ul().empty()
}this.load_node(i,function(){j.__callback({obj:i});
j.reload_nodes()
})
},loaded:function(){this.__callback()
},set_focus:function(){if(this.is_focused()){return
}var i=g.jstree._focused();
if(i){i.unset_focus()
}this.get_container().addClass("jstree-focused");
f=this.get_index();
this.__callback()
},is_focused:function(){return f==this.get_index()
},unset_focus:function(){if(this.is_focused()){this.get_container().removeClass("jstree-focused");
f=-1
}this.__callback()
},_get_node:function(i){var j=g(i,this.get_container());
if(j.is(".jstree")||i==-1){return -1
}j=j.closest("li",this.get_container());
return j.length?j:false
},_get_next:function(j,i){j=this._get_node(j);
if(j===-1){return this.get_container().find("> ul > li:first-child")
}if(!j.length){return false
}if(i){return(j.nextAll("li").size()>0)?j.nextAll("li:eq(0)"):false
}if(j.hasClass("jstree-open")){return j.find("li:eq(0)")
}else{if(j.nextAll("li").size()>0){return j.nextAll("li:eq(0)")
}else{return j.parentsUntil(".jstree","li").next("li").eq(0)
}}},_get_prev:function(j,i){j=this._get_node(j);
if(j===-1){return this.get_container().find("> ul > li:last-child")
}if(!j.length){return false
}if(i){return(j.prevAll("li").length>0)?j.prevAll("li:eq(0)"):false
}if(j.prev("li").length){j=j.prev("li").eq(0);
while(j.hasClass("jstree-open")){j=j.children("ul:eq(0)").children("li:last")
}return j
}else{var k=j.parentsUntil(".jstree","li:eq(0)");
return k.length?k:false
}},_get_parent:function(i){i=this._get_node(i);
if(i==-1||!i.length){return false
}var j=i.parentsUntil(".jstree","li:eq(0)");
return j.length?j:-1
},_get_children:function(i){i=this._get_node(i);
if(i===-1){return this.get_container().children("ul:eq(0)").children("li")
}if(!i.length){return false
}return i.children("ul:eq(0)").children("li")
},get_path:function(k,i){var j=[],l=this;
k=this._get_node(k);
if(k===-1||!k||!k.length){return false
}k.parentsUntil(".jstree","li").each(function(){j.push(i?this.id:l.get_text(this))
});
j.reverse();
j.push(i?k.attr("id"):this.get_text(k));
return j
},_get_string:function(i){return this._get_settings().core.strings[i]||i
},is_open:function(i){i=this._get_node(i);
return i&&i!==-1&&i.hasClass("jstree-open")
},is_closed:function(i){i=this._get_node(i);
return i&&i!==-1&&i.hasClass("jstree-closed")
},is_leaf:function(i){i=this._get_node(i);
return i&&i!==-1&&i.hasClass("jstree-leaf")
},correct_state:function(i){i=this._get_node(i);
if(!i||i===-1){return false
}i.removeClass("jstree-closed jstree-open").addClass("jstree-leaf").children("ul").remove();
this.__callback({obj:i})
},open_node:function(l,m,j){l=this._get_node(l);
if(!l.length){return false
}if(!l.hasClass("jstree-closed")){if(m){m.call()
}return false
}var k=j||c?0:this._get_settings().core.animation,i=this;
if(!this._is_loaded(l)){l.children("a").addClass("jstree-loading");
this.load_node(l,function(){i.open_node(l,m,j)
},m)
}else{if(this._get_settings().core.open_parents){l.parentsUntil(".jstree",".jstree-closed").each(function(){i.open_node(this,false,true)
})
}if(k){l.children("ul").css("display","none")
}l.removeClass("jstree-closed").addClass("jstree-open").children("a").removeClass("jstree-loading");
if(k){l.children("ul").stop(true,true).slideDown(k,function(){this.style.display="";
i.after_open(l)
})
}else{i.after_open(l)
}this.__callback({obj:l});
if(m){m.call()
}}},after_open:function(i){this.__callback({obj:i})
},close_node:function(l,j){l=this._get_node(l);
var k=j||c?0:this._get_settings().core.animation,i=this;
if(!l.length||!l.hasClass("jstree-open")){return false
}if(k){l.children("ul").attr("style","display:block !important")
}l.removeClass("jstree-open").addClass("jstree-closed");
if(k){l.children("ul").stop(true,true).slideUp(k,function(){this.style.display="";
i.after_close(l)
})
}else{i.after_close(l)
}this.__callback({obj:l})
},after_close:function(i){this.__callback({obj:i})
},toggle_node:function(i){i=this._get_node(i);
if(i.hasClass("jstree-closed")){return this.open_node(i)
}if(i.hasClass("jstree-open")){return this.close_node(i)
}},open_all:function(k,j,i){k=k?this._get_node(k):-1;
if(!k||k===-1){k=this.get_container_ul()
}if(i){k=k.find("li.jstree-closed")
}else{i=k;
if(k.is(".jstree-closed")){k=k.find("li.jstree-closed").addBack()
}else{k=k.find("li.jstree-closed")
}}var l=this;
k.each(function(){var m=this;
if(!l._is_loaded(this)){l.open_node(this,function(){l.open_all(m,j,i)
},!j)
}else{l.open_node(this,false,!j)
}});
if(i.find("li.jstree-closed").length===0){this.__callback({obj:i})
}},close_all:function(j,i){var k=this;
j=j?this._get_node(j):this.get_container();
if(!j||j===-1){j=this.get_container_ul()
}j.find("li.jstree-open").addBack().each(function(){k.close_node(this,!i)
});
this.__callback({obj:j})
},clean_node:function(i){i=i&&i!=-1?g(i):this.get_container_ul();
i=i.is("li")?i.find("li").addBack():i.find("li");
i.removeClass("jstree-last").filter("li:last-child").addClass("jstree-last").end().filter(":has(li)").not(".jstree-open").removeClass("jstree-leaf").addClass("jstree-closed");
i.not(".jstree-open, .jstree-closed").addClass("jstree-leaf").children("ul").remove();
this.__callback({obj:i})
},get_rollback:function(){this.__callback();
return{i:this.get_index(),h:this.get_container().children("ul").clone(true),d:this.data}
},set_rollback:function(i,j){this.get_container().empty().append(i);
this.data=j;
this.__callback()
},load_node:function(k,i,j){this.__callback({obj:k})
},_is_loaded:function(i){return true
},create_node:function(n,i,m,p,j){n=this._get_node(n);
i=typeof i==="undefined"?"last":i;
var o=g("<li />"),l=this._get_settings().core,k;
if(n!==-1&&!n.length){return false
}if(!j&&!this._is_loaded(n)){this.load_node(n,function(){this.create_node(n,i,m,p,true)
});
return false
}this.__rollback();
if(typeof m==="string"){m={data:m}
}if(!m){m={}
}if(m.attr){o.attr(m.attr)
}if(m.metadata){o.data(m.metadata)
}if(m.state){o.addClass("jstree-"+m.state)
}if(!m.data){m.data=this._get_string("new_node")
}if(!g.isArray(m.data)){k=m.data;
m.data=[];
m.data.push(k)
}g.each(m.data,function(r,q){k=g("<a />");
if(g.isFunction(q)){q=q.call(this,m)
}if(typeof q=="string"){k.attr("href","#")[l.html_titles?"html":"text"](q)
}else{if(!q.attr){q.attr={}
}if(!q.attr.href){q.attr.href="#"
}k.attr(q.attr)[l.html_titles?"html":"text"](q.title);
if(q.language){k.addClass(q.language)
}}k.prepend("<ins class='jstree-icon'>&#160;</ins>");
if(!q.icon&&m.icon){q.icon=m.icon
}if(q.icon){if(q.icon.indexOf("/")===-1){k.children("ins").addClass(q.icon)
}else{k.children("ins").css("background","url('"+q.icon+"') center center no-repeat")
}}o.append(k)
});
o.prepend("<ins class='jstree-icon'>&#160;</ins>");
if(n===-1){n=this.get_container();
if(i==="before"){i="first"
}if(i==="after"){i="last"
}}switch(i){case"before":n.before(o);
k=this._get_parent(n);
break;
case"after":n.after(o);
k=this._get_parent(n);
break;
case"inside":case"first":if(!n.children("ul").length){n.append("<ul />")
}n.children("ul").prepend(o);
k=n;
break;
case"last":if(!n.children("ul").length){n.append("<ul />")
}n.children("ul").append(o);
k=n;
break;
default:if(!n.children("ul").length){n.append("<ul />")
}if(!i){i=0
}k=n.children("ul").children("li").eq(i);
if(k.length){k.before(o)
}else{n.children("ul").append(o)
}k=n;
break
}if(k===-1||k.get(0)===this.get_container().get(0)){k=-1
}this.clean_node(k);
this.__callback({obj:o,parent:k});
if(p){p.call(this,o)
}return o
},get_text:function(j){j=this._get_node(j);
if(!j.length){return false
}var i=this._get_settings().core.html_titles;
j=j.children("a:eq(0)");
if(i){j=j.clone();
j.children("INS").remove();
return j.html()
}else{j=j.contents().filter(function(){return this.nodeType==3
})[0];
return j.nodeValue
}},set_text:function(j,k){j=this._get_node(j);
if(!j.length){return false
}j=j.children("a:eq(0)");
if(this._get_settings().core.html_titles){var i=j.children("INS").clone();
j.html(k).prepend(i);
this.__callback({obj:j,name:k});
return true
}else{j=j.contents().filter(function(){return this.nodeType==3
})[0];
this.__callback({obj:j,name:k});
return(j.nodeValue=k)
}},rename_node:function(i,j){i=this._get_node(i);
this.__rollback();
if(i&&i.length&&this.set_text.apply(this,Array.prototype.slice.call(arguments))){this.__callback({obj:i,name:j})
}},delete_node:function(l){l=this._get_node(l);
if(!l.length){return false
}this.__rollback();
var k=this._get_parent(l),j=g([]),i=this;
l.each(function(){j=j.add(i._get_prev(this))
});
l=l.detach();
if(k!==-1&&k.find("> ul > li").length===0){k.removeClass("jstree-open jstree-closed").addClass("jstree-leaf")
}this.clean_node(k);
this.__callback({obj:l,prev:j,parent:k});
return l
},prepare_move:function(m,k,n,i,j){var l={};
l.ot=g.jstree._reference(m)||this;
l.o=l.ot._get_node(m);
l.r=k===-1?-1:this._get_node(k);
l.p=(typeof n==="undefined"||n===false)?"last":n;
if(!j&&d.o&&d.o[0]===l.o[0]&&d.r[0]===l.r[0]&&d.p===l.p){this.__callback(d);
if(i){i.call(this,d)
}return
}l.ot=g.jstree._reference(l.o)||this;
l.rt=g.jstree._reference(l.r)||this;
if(l.r===-1||!l.r){l.cr=-1;
switch(l.p){case"first":case"before":case"inside":l.cp=0;
break;
case"after":case"last":l.cp=l.rt.get_container().find(" > ul > li").length;
break;
default:l.cp=l.p;
break
}}else{if(!/^(before|after)$/.test(l.p)&&!this._is_loaded(l.r)){return this.load_node(l.r,function(){this.prepare_move(m,k,n,i,true)
})
}switch(l.p){case"before":l.cp=l.r.index();
l.cr=l.rt._get_parent(l.r);
break;
case"after":l.cp=l.r.index()+1;
l.cr=l.rt._get_parent(l.r);
break;
case"inside":case"first":l.cp=0;
l.cr=l.r;
break;
case"last":l.cp=l.r.find(" > ul > li").length;
l.cr=l.r;
break;
default:l.cp=l.p;
l.cr=l.r;
break
}}l.np=l.cr==-1?l.rt.get_container():l.cr;
l.op=l.ot._get_parent(l.o);
l.cop=l.o.index();
if(l.op===-1){l.op=l.ot?l.ot.get_container():this.get_container()
}if(!/^(before|after)$/.test(l.p)&&l.op&&l.np&&l.op[0]===l.np[0]&&l.o.index()<l.cp){l.cp++
}l.or=l.np.find(" > ul > li:nth-child("+(l.cp+1)+")");
d=l;
this.__callback(d);
if(i){i.call(this,d)
}},check_move:function(){var k=d,i=true,j=k.r===-1?this.get_container():k.r;
if(!k||!k.o||k.or[0]===k.o[0]){return false
}if(!k.cy){if(k.op&&k.np&&k.op[0]===k.np[0]&&k.cp-1===k.o.index()){return false
}k.o.each(function(){if(j.parentsUntil(".jstree","li").addBack().index(this)!==-1){i=false;
return false
}})
}return i
},move_node:function(p,l,i,k,j,n){if(!j){return this.prepare_move(p,l,i,function(o){this.move_node(o,false,false,k,true,n)
})
}if(k){d.cy=true
}if(!n&&!this.check_move()){return false
}this.__rollback();
var q=false;
if(k){q=p.o.clone(true);
q.find("*[id]").addBack().each(function(){if(this.id){this.id="copy_"+this.id
}})
}else{q=p.o
}if(p.or.length){p.or.before(q)
}else{if(!p.np.children("ul").length){g("<ul />").appendTo(p.np)
}p.np.children("ul:eq(0)").append(q)
}try{p.ot.clean_node(p.op);
p.rt.clean_node(p.np);
if(!p.op.find("> ul > li").length){p.op.removeClass("jstree-open jstree-closed").addClass("jstree-leaf").children("ul").remove()
}}catch(m){}if(k){d.cy=true;
d.oc=q
}this.__callback(d);
return d
},_get_move:function(){return d
}}})
})(jQuery);
(function(d){var g,f,e;
d(function(){if(/msie/.test(navigator.userAgent.toLowerCase())){f=d('<textarea cols="10" rows="2"></textarea>').css({position:"absolute",top:-1000,left:0}).appendTo("body");
e=d('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position:"absolute",top:-1000,left:0}).appendTo("body");
g=f.width()-e.width();
f.add(e).remove()
}else{f=d("<div />").css({width:100,height:100,overflow:"auto",position:"absolute",top:-1000,left:0}).prependTo("body").append("<div />").find("div").css({width:"100%",height:200});
g=100-f.width();
f.parent().remove()
}});
d.jstree.plugin("ui",{__init:function(){this.data.ui.selected=d();
this.data.ui.last_selected=false;
this.data.ui.hovered=null;
this.data.ui.to_select=this.get_settings().ui.initially_select;
this.get_container().delegate("a","click.jstree",d.proxy(function(h){h.preventDefault();
h.currentTarget.blur();
if(!d(h.currentTarget).hasClass("jstree-loading")){this.select_node(h.currentTarget,true,h)
}},this)).delegate("a","mouseenter.jstree",d.proxy(function(h){if(!d(h.currentTarget).hasClass("jstree-loading")){this.hover_node(h.target)
}},this)).delegate("a","mouseleave.jstree",d.proxy(function(h){if(!d(h.currentTarget).hasClass("jstree-loading")){this.dehover_node(h.target)
}},this)).bind("reopen.jstree",d.proxy(function(){this.reselect()
},this)).bind("get_rollback.jstree",d.proxy(function(){this.dehover_node();
this.save_selected()
},this)).bind("set_rollback.jstree",d.proxy(function(){this.reselect()
},this)).bind("close_node.jstree",d.proxy(function(i,j){var h=this._get_settings().ui,k=this._get_node(j.rslt.obj),l=(k&&k.length)?k.children("ul").find("a.jstree-clicked"):d(),m=this;
if(h.selected_parent_close===false||!l.length){return
}l.each(function(){m.deselect_node(this);
if(h.selected_parent_close==="select_parent"){m.select_node(k)
}})
},this)).bind("delete_node.jstree",d.proxy(function(i,j){var h=this._get_settings().ui.select_prev_on_delete,k=this._get_node(j.rslt.obj),l=(k&&k.length)?k.find("a.jstree-clicked"):[],m=this;
l.each(function(){m.deselect_node(this)
});
if(h&&l.length){j.rslt.prev.each(function(){if(this.parentNode){m.select_node(this);
return false
}})
}},this)).bind("move_node.jstree",d.proxy(function(h,i){if(i.rslt.cy){i.rslt.oc.find("a.jstree-clicked").removeClass("jstree-clicked")
}},this))
},defaults:{select_limit:-1,select_multiple_modifier:"ctrl",select_range_modifier:"shift",selected_parent_close:"select_parent",selected_parent_open:true,select_prev_on_delete:true,disable_selecting_children:false,initially_select:[]},_fn:{_get_node:function(h,i){if(typeof h==="undefined"||h===null){return i?this.data.ui.selected:this.data.ui.last_selected
}var j=d(h,this.get_container());
if(j.is(".jstree")||h==-1){return -1
}j=j.closest("li",this.get_container());
return j.length?j:false
},_ui_notify:function(i,h){if(h.selected){this.select_node(i,false)
}},save_selected:function(){var h=this;
this.data.ui.to_select=[];
this.data.ui.selected.each(function(){if(this.id){h.data.ui.to_select.push("#"+this.id.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:"))
}});
this.__callback(this.data.ui.to_select)
},reselect:function(){var i=this,h=this.data.ui.to_select;
h=d.map(d.makeArray(h),function(j){return"#"+j.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:")
});
d.each(h,function(j,k){if(k&&k!=="#"){i.select_node(k)
}});
this.data.ui.selected=this.data.ui.selected.filter(function(){return this.parentNode
});
this.__callback()
},refresh:function(h){this.save_selected();
return this.__call_old()
},hover_node:function(h){h=this._get_node(h);
if(!h.length){return false
}if(!h.hasClass("jstree-hovered")){this.dehover_node()
}this.data.ui.hovered=h.children("a").addClass("jstree-hovered").parent();
this._fix_scroll(h);
this.__callback({obj:h})
},dehover_node:function(){var i=this.data.ui.hovered,h;
if(!i||!i.length){return false
}h=i.children("a").removeClass("jstree-hovered").parent();
if(this.data.ui.hovered[0]===h[0]){this.data.ui.hovered=null
}this.__callback({obj:i})
},select_node:function(k,h,l){k=this._get_node(k);
if(k==-1||!k||!k.length){return false
}var p=this._get_settings().ui,n=(p.select_multiple_modifier=="on"||(p.select_multiple_modifier!==false&&l&&l[p.select_multiple_modifier+"Key"])),i=(p.select_range_modifier!==false&&l&&l[p.select_range_modifier+"Key"]&&this.data.ui.last_selected&&this.data.ui.last_selected[0]!==k[0]&&this.data.ui.last_selected.parent()[0]===k.parent()[0]),j=this.is_selected(k),m=true,o=this;
if(h){if(p.disable_selecting_children&&n&&((k.parentsUntil(".jstree","li").children("a.jstree-clicked").length)||(k.children("ul").find("a.jstree-clicked:eq(0)").length))){return false
}m=false;
switch(!0){case (i):this.data.ui.last_selected.addClass("jstree-last-selected");
k=k[k.index()<this.data.ui.last_selected.index()?"nextUntil":"prevUntil"](".jstree-last-selected").addBack();
if(p.select_limit==-1||k.length<p.select_limit){this.data.ui.last_selected.removeClass("jstree-last-selected");
this.data.ui.selected.each(function(){if(this!==o.data.ui.last_selected[0]){o.deselect_node(this)
}});
j=false;
m=true
}else{m=false
}break;
case (j&&!n):this.deselect_all();
j=false;
m=true;
break;
case (!j&&!n):if(p.select_limit==-1||p.select_limit>0){this.deselect_all();
m=true
}break;
case (j&&n):this.deselect_node(k);
break;
case (!j&&n):if(p.select_limit==-1||this.data.ui.selected.length+1<=p.select_limit){m=true
}break
}}if(m&&!j){if(!i){this.data.ui.last_selected=k
}k.children("a").addClass("jstree-clicked");
k.children("a").css("width","95%");
if(p.selected_parent_open){k.parents(".jstree-closed").each(function(){o.open_node(this,false,true)
})
}this.data.ui.selected=this.data.ui.selected.add(k);
this._fix_scroll(k.eq(0));
this.__callback({obj:k,e:l})
}},_fix_scroll:function(i){var j=this.get_container()[0],h;
if(j.scrollHeight>j.offsetHeight){i=this._get_node(i);
if(!i||i===-1||!i.length||!i.is(":visible")){return
}h=i.offset().top-this.get_container().offset().top;
if(h<0){j.scrollTop=j.scrollTop+h-1
}if(h+this.data.core.li_height+(j.scrollWidth>j.offsetWidth?g:0)>j.offsetHeight){j.scrollTop=j.scrollTop+(h-j.offsetHeight+this.data.core.li_height+1+(j.scrollWidth>j.offsetWidth?g:0))
}}},deselect_node:function(h){h=this._get_node(h);
if(!h.length){return false
}if(this.is_selected(h)){h.children("a").removeClass("jstree-clicked");
this.data.ui.selected=this.data.ui.selected.not(h);
if(this.data.ui.last_selected.get(0)===h.get(0)){this.data.ui.last_selected=this.data.ui.selected.eq(0)
}this.__callback({obj:h})
}},toggle_select:function(h){h=this._get_node(h);
if(!h.length){return false
}if(this.is_selected(h)){this.deselect_node(h)
}else{this.select_node(h)
}},is_selected:function(h){return this.data.ui.selected.index(this._get_node(h))>=0
},get_selected:function(h){return h?d(h).find("a.jstree-clicked").parent():this.data.ui.selected
},deselect_all:function(i){var h=i?d(i).find("a.jstree-clicked").parent():this.get_container().find("a.jstree-clicked").parent();
h.children("a.jstree-clicked").removeClass("jstree-clicked");
this.data.ui.selected=d([]);
this.data.ui.last_selected=false;
this.__callback({obj:h})
}}});
d.jstree.defaults.plugins.push("ui")
})(jQuery);
(function(d){d.jstree.plugin("crrm",{__init:function(){this.get_container().bind("move_node.jstree",d.proxy(function(h,g){if(this._get_settings().crrm.move.open_onmove){var f=this;
g.rslt.np.parentsUntil(".jstree").addBack().filter(".jstree-closed").each(function(){f.open_node(this,false,true)
})
}},this))
},defaults:{input_width_limit:200,move:{always_copy:false,open_onmove:true,default_position:"last",check_move:function(e){return true
}}},_fn:{_show_input:function(e,l){e=this._get_node(e);
var j=this._get_settings().core.rtl,k=this._get_settings().crrm.input_width_limit,g=e.children("ins").width(),f=e.find("> a:visible > ins").width()*e.find("> a:visible > ins").length,m=this.get_text(e),i=d("<div />",{css:{position:"absolute",top:"-200px",left:(j?"0px":"-1000px"),visibility:"hidden"}}).appendTo("body"),h=e.css("position","relative").append(d("<input />",{value:m,"class":"jstree-rename-input",css:{padding:"0",border:"1px solid silver",position:"absolute",left:(j?"auto":(g+f+4)+"px"),right:(j?(g+f+4)+"px":"auto"),top:"0px",height:(this.data.core.li_height-2)+"px",lineHeight:(this.data.core.li_height-2)+"px",width:"150px"},blur:d.proxy(function(){var o=e.children(".jstree-rename-input"),n=o.val();
if(n===""){n=m
}i.remove();
o.remove();
this.set_text(e,m);
this.rename_node(e,n);
l.call(this,e,n,m);
e.css("position","")
},this),keyup:function(o){var n=o.keyCode||o.which;
if(n==27){this.value=m;
this.blur();
return
}else{if(n==13){this.blur();
return
}else{h.width(Math.min(i.text("pW"+this.value).width(),k))
}}},keypress:function(o){var n=o.keyCode||o.which;
if(n==13){return false
}}})).children(".jstree-rename-input");
this.set_text(e,"");
i.css({fontFamily:h.css("fontFamily")||"",fontSize:h.css("fontSize")||"",fontWeight:h.css("fontWeight")||"",fontStyle:h.css("fontStyle")||"",fontStretch:h.css("fontStretch")||"",fontVariant:h.css("fontVariant")||"",letterSpacing:h.css("letterSpacing")||"",wordSpacing:h.css("wordSpacing")||""});
h.width(Math.min(i.text("pW"+h[0].value).width(),k))[0].select()
},rename:function(g){g=this._get_node(g);
this.__rollback();
var e=this.__callback;
this._show_input(g,function(i,h,f){e.call(this,{obj:i,new_name:h,old_name:f})
})
},create:function(i,f,h,k,e){var g,j=this;
i=this._get_node(i);
if(!i){i=-1
}this.__rollback();
g=this.create_node(i,f,h,function(l){var m=this._get_parent(l),n=d(l).index();
if(k){k.call(this,l)
}if(m.length&&m.hasClass("jstree-closed")){this.open_node(m,false,true)
}if(!e){this._show_input(l,function(q,p,o){j.__callback({obj:q,name:p,parent:m,position:n})
})
}else{j.__callback({obj:l,name:this.get_text(l),parent:m,position:n})
}});
return g
},remove:function(g){g=this._get_node(g,true);
var f=this._get_parent(g),e=this._get_prev(g);
this.__rollback();
g=this.delete_node(g);
if(g!==false){this.__callback({obj:g,prev:e,parent:f})
}},check_move:function(){if(!this.__call_old()){return false
}var e=this._get_settings().crrm.move;
if(!e.check_move.call(this,this._get_move())){return false
}return true
},move_node:function(k,i,e,g,f,j){var h=this._get_settings().crrm.move;
if(!f){if(typeof e==="undefined"){e=h.default_position
}if(e==="inside"&&!h.default_position.match(/^(before|after)$/)){e=h.default_position
}return this.__call_old(true,k,i,e,g,false,j)
}if(h.always_copy===true||(h.always_copy==="multitree"&&k.rt.get_index()!==k.ot.get_index())){g=true
}this.__call_old(true,k,i,e,g,true,j)
},cut:function(e){e=this._get_node(e,true);
if(!e||!e.length){return false
}this.data.crrm.cp_nodes=false;
this.data.crrm.ct_nodes=e;
this.__callback({obj:e})
},copy:function(e){e=this._get_node(e,true);
if(!e||!e.length){return false
}this.data.crrm.ct_nodes=false;
this.data.crrm.cp_nodes=e;
this.__callback({obj:e})
},paste:function(f){f=this._get_node(f);
if(!f||!f.length){return false
}var e=this.data.crrm.ct_nodes?this.data.crrm.ct_nodes:this.data.crrm.cp_nodes;
if(!this.data.crrm.ct_nodes&&!this.data.crrm.cp_nodes){return false
}if(this.data.crrm.ct_nodes){this.move_node(this.data.crrm.ct_nodes,f);
this.data.crrm.ct_nodes=false
}if(this.data.crrm.cp_nodes){this.move_node(this.data.crrm.cp_nodes,f,false,true)
}this.__callback({obj:f,nodes:e})
}}})
})(jQuery);
(function(d){var e=[];
d.jstree._themes=false;
d.jstree.plugin("themes",{__init:function(){this.get_container().bind("init.jstree",d.proxy(function(){var f=this._get_settings().themes;
this.data.themes.dots=f.dots;
this.data.themes.icons=f.icons;
this.set_theme(f.theme,f.url)
},this)).bind("loaded.jstree",d.proxy(function(){if(!this.data.themes.dots){this.hide_dots()
}else{this.show_dots()
}if(!this.data.themes.icons){this.hide_icons()
}else{this.show_icons()
}},this))
},defaults:{theme:"default",url:false,dots:true,icons:true},_fn:{set_theme:function(g,f){if(!g){return false
}if(!f){f="/static/css/jsTree/themes/"+g+"/style.css"
}if(d.inArray(f,e)==-1){d.vakata.css.add_sheet({url:f});
e.push(f)
}if(this.data.themes.theme!=g){this.get_container().removeClass("jstree-"+this.data.themes.theme);
this.data.themes.theme=g
}this.get_container().addClass("jstree-"+g);
if(!this.data.themes.dots){this.hide_dots()
}else{this.show_dots()
}if(!this.data.themes.icons){this.hide_icons()
}else{this.show_icons()
}this.__callback()
},get_theme:function(){return this.data.themes.theme
},show_dots:function(){this.data.themes.dots=true;
this.get_container().children("ul").removeClass("jstree-no-dots")
},hide_dots:function(){this.data.themes.dots=false;
this.get_container().children("ul").addClass("jstree-no-dots")
},toggle_dots:function(){if(this.data.themes.dots){this.hide_dots()
}else{this.show_dots()
}},show_icons:function(){this.data.themes.icons=true;
this.get_container().children("ul").removeClass("jstree-no-icons")
},hide_icons:function(){this.data.themes.icons=false;
this.get_container().children("ul").addClass("jstree-no-icons")
},toggle_icons:function(){if(this.data.themes.icons){this.hide_icons()
}else{this.show_icons()
}}}});
d(function(){if(d.jstree._themes===false){d("script").each(function(){if(this.src.toString().match(/jquery\.jstree[^\/]*?\.js(\?.*)?$/)){d.jstree._themes=this.src.toString().replace(/jquery\.jstree[^\/]*?\.js(\?.*)?$/,"")+"themes/";
return false
}})
}if(d.jstree._themes===false){d.jstree._themes="themes/"
}});
d.jstree.defaults.plugins.push("themes")
})(jQuery);
(function(f){var e=[];
function d(h,j){var k=f.jstree._focused(),g;
if(k&&k.data&&k.data.hotkeys&&k.data.hotkeys.enabled){g=k._get_settings().hotkeys[h];
if(g){return g.call(k,j)
}}}f.jstree.plugin("hotkeys",{__init:function(){if(typeof f.hotkeys==="undefined"){throw"jsTree hotkeys: jQuery hotkeys plugin not included."
}if(!this.data.ui){throw"jsTree hotkeys: jsTree UI plugin not included."
}f.each(this._get_settings().hotkeys,function(h,g){if(g!==false&&f.inArray(h,e)==-1){f(document).bind("keydown",h,function(i){return d(h,i)
});
e.push(h)
}});
this.get_container().bind("lock.jstree",f.proxy(function(){if(this.data.hotkeys.enabled){this.data.hotkeys.enabled=false;
this.data.hotkeys.revert=true
}},this)).bind("unlock.jstree",f.proxy(function(){if(this.data.hotkeys.revert){this.data.hotkeys.enabled=true
}},this));
this.enable_hotkeys()
},defaults:{up:function(){var g=this.data.ui.hovered||this.data.ui.last_selected||-1;
this.hover_node(this._get_prev(g));
return false
},"ctrl+up":function(){var g=this.data.ui.hovered||this.data.ui.last_selected||-1;
this.hover_node(this._get_prev(g));
return false
},"shift+up":function(){var g=this.data.ui.hovered||this.data.ui.last_selected||-1;
this.hover_node(this._get_prev(g));
return false
},down:function(){var g=this.data.ui.hovered||this.data.ui.last_selected||-1;
this.hover_node(this._get_next(g));
return false
},"ctrl+down":function(){var g=this.data.ui.hovered||this.data.ui.last_selected||-1;
this.hover_node(this._get_next(g));
return false
},"shift+down":function(){var g=this.data.ui.hovered||this.data.ui.last_selected||-1;
this.hover_node(this._get_next(g));
return false
},left:function(){var g=this.data.ui.hovered||this.data.ui.last_selected;
if(g){if(g.hasClass("jstree-open")){this.close_node(g)
}else{this.hover_node(this._get_prev(g))
}}return false
},"ctrl+left":function(){var g=this.data.ui.hovered||this.data.ui.last_selected;
if(g){if(g.hasClass("jstree-open")){this.close_node(g)
}else{this.hover_node(this._get_prev(g))
}}return false
},"shift+left":function(){var g=this.data.ui.hovered||this.data.ui.last_selected;
if(g){if(g.hasClass("jstree-open")){this.close_node(g)
}else{this.hover_node(this._get_prev(g))
}}return false
},right:function(){var g=this.data.ui.hovered||this.data.ui.last_selected;
if(g&&g.length){if(g.hasClass("jstree-closed")){this.open_node(g)
}else{this.hover_node(this._get_next(g))
}}return false
},"ctrl+right":function(){var g=this.data.ui.hovered||this.data.ui.last_selected;
if(g&&g.length){if(g.hasClass("jstree-closed")){this.open_node(g)
}else{this.hover_node(this._get_next(g))
}}return false
},"shift+right":function(){var g=this.data.ui.hovered||this.data.ui.last_selected;
if(g&&g.length){if(g.hasClass("jstree-closed")){this.open_node(g)
}else{this.hover_node(this._get_next(g))
}}return false
},space:function(){if(this.data.ui.hovered){this.data.ui.hovered.children("a:eq(0)").click()
}return false
},"ctrl+space":function(g){g.type="click";
if(this.data.ui.hovered){this.data.ui.hovered.children("a:eq(0)").trigger(g)
}return false
},"shift+space":function(g){g.type="click";
if(this.data.ui.hovered){this.data.ui.hovered.children("a:eq(0)").trigger(g)
}return false
},f2:function(){this.rename(this.data.ui.hovered||this.data.ui.last_selected)
},del:function(){this.remove(this.data.ui.hovered||this._get_node(null))
}},_fn:{enable_hotkeys:function(){this.data.hotkeys.enabled=true
},disable_hotkeys:function(){this.data.hotkeys.enabled=false
}}})
})(jQuery);
(function(d){d.jstree.plugin("json_data",{__init:function(){var e=this._get_settings().json_data;
if(e.progressive_unload){this.get_container().bind("after_close.jstree",function(g,f){f.rslt.obj.children("ul").remove()
})
}},defaults:{data:false,ajax:false,correct_state:true,progressive_render:false,progressive_unload:false},_fn:{load_node:function(g,e,f){var h=this;
this.load_node_json(g,function(){h.__callback({obj:h._get_node(g)});
e.call(this)
},f)
},_is_loaded:function(f){var e=this._get_settings().json_data;
f=this._get_node(f);
return f==-1||!f||(!e.ajax&&!e.progressive_render&&!d.isFunction(e.data))||f.is(".jstree-open, .jstree-leaf")||f.children("ul").children("li").length>0
},refresh:function(f){f=this._get_node(f);
var e=this._get_settings().json_data;
if(f&&f!==-1&&e.progressive_unload&&(d.isFunction(e.data)||!!e.ajax)){f.removeData("jstree_children")
}return this.__call_old()
},load_node_json:function(i,e,g){var h=this.get_settings().json_data,k,f=function(){},j=function(){};
i=this._get_node(i);
if(i&&i!==-1&&(h.progressive_render||h.progressive_unload)&&!i.is(".jstree-open, .jstree-leaf")&&i.children("ul").children("li").length===0&&i.data("jstree_children")){k=this._parse_json(i.data("jstree_children"),i);
if(k){i.append(k);
if(!h.progressive_unload){i.removeData("jstree_children")
}}this.clean_node(i);
if(e){e.call(this)
}return
}if(i&&i!==-1){if(i.data("jstree_is_loading")){return
}else{i.data("jstree_is_loading",true)
}}switch(!0){case (!h.data&&!h.ajax):throw"Neither data nor ajax settings supplied.";
case (d.isFunction(h.data)):h.data.call(this,i,d.proxy(function(l){l=this._parse_json(l,i);
if(!l){if(i===-1||!i){if(h.correct_state){this.get_container().children("ul").empty()
}}else{i.children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading");
if(h.correct_state){this.correct_state(i)
}}if(g){g.call(this)
}}else{if(i===-1||!i){this.get_container().children("ul").empty().append(l.children())
}else{i.append(l).children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading")
}this.clean_node(i);
if(e){e.call(this)
}}},this));
break;
case (!!h.data&&!h.ajax)||(!!h.data&&!!h.ajax&&(!i||i===-1)):if(!i||i==-1){k=this._parse_json(h.data,i);
if(k){this.get_container().children("ul").empty().append(k.children());
this.clean_node()
}else{if(h.correct_state){this.get_container().children("ul").empty()
}}}if(e){e.call(this)
}break;
case (!h.data&&!!h.ajax)||(!!h.data&&!!h.ajax&&i&&i!==-1):f=function(m,n,o){var l=this.get_settings().json_data.ajax.error;
if(l){l.call(this,m,n,o)
}if(i!=-1&&i.length){i.children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading");
if(n==="success"&&h.correct_state){this.correct_state(i)
}}else{if(n==="success"&&h.correct_state){this.get_container().children("ul").empty()
}}if(g){g.call(this)
}};
j=function(o,m,l){var n=this.get_settings().json_data.ajax.success;
if(n){o=n.call(this,o,m,l)||o
}if(o===""||(o&&o.toString&&o.toString().replace(/^[\s\n]+$/,"")==="")||(!d.isArray(o)&&!d.isPlainObject(o))){return f.call(this,l,m,"")
}o=this._parse_json(o,i);
if(o){if(i===-1||!i){this.get_container().children("ul").empty().append(o.children())
}else{i.append(o).children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading")
}this.clean_node(i);
if(e){e.call(this)
}}else{if(i===-1||!i){if(h.correct_state){this.get_container().children("ul").empty();
if(e){e.call(this)
}}}else{i.children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading");
if(h.correct_state){this.correct_state(i);
if(e){e.call(this)
}}}}};
h.ajax.context=this;
h.ajax.error=f;
h.ajax.success=j;
if(!h.ajax.dataType){h.ajax.dataType="json"
}if(d.isFunction(h.ajax.url)){h.ajax.url=h.ajax.url.call(this,i)
}if(d.isFunction(h.ajax.data)){h.ajax.data=h.ajax.data.call(this,i)
}d.ajax(h.ajax);
break
}},_parse_json:function(e,k,q){var m=false,f=this._get_settings(),u=f.json_data,r=f.core.html_titles,l,h,g,o,n;
if(!e){return m
}if(u.progressive_unload&&k&&k!==-1){k.data("jstree_children",m)
}if(d.isArray(e)){m=d("<ul>");
if(!e.length){return false
}for(h=0,g=e.length;
h<g;
h++){l=this._parse_json(e[h],k,true);
if(l.length){m=m.append(l)
}}m=m.children()
}else{if(typeof e=="string"){e={data:e}
}if(!e.data&&e.data!==""){return m
}m=d("<li />");
if(e.attr){m.attr(e.attr)
}if(e.metadata){m.data(e.metadata)
}if(e.state){m.addClass("jstree-"+e.state)
}if(!d.isArray(e.data)){l=e.data;
e.data=[];
e.data.push(l)
}d.each(e.data,function(p,j){l=d("<a />");
if(d.isFunction(j)){j=j.call(this,e)
}if(typeof j=="string"){l.attr("href","#")[r?"html":"text"](j)
}else{if(!j.attr){j.attr={}
}if(!j.attr.href){j.attr.href="#"
}l.attr(j.attr)[r?"html":"text"](j.title);
if(j.language){l.addClass(j.language)
}}l.prepend("<ins class='jstree-icon'>&#160;</ins>");
if(!j.icon&&e.icon){j.icon=e.icon
}if(j.icon){if(j.icon.indexOf("/")===-1){l.children("ins").addClass(j.icon)
}else{l.children("ins").css("background","url('"+j.icon+"') center center no-repeat")
}}m.append(l)
});
m.prepend("<ins class='jstree-icon'>&#160;</ins>");
if(e.children){if(u.progressive_render&&e.state!=="open"){m.addClass("jstree-closed").data("jstree_children",e.children)
}else{if(u.progressive_unload){m.data("jstree_children",e.children)
}if(d.isArray(e.children)&&e.children.length){l=this._parse_json(e.children,k,true);
if(l.length){n=d("<ul />");
n.append(l);
m.append(n)
}}}}}if(!q){o=d("<ul />");
o.append(m);
m=o
}return m
},get_json:function(j,g,e,n){var q=[],p=this._get_settings(),k=this,i,h,m,l,o,f;
j=this._get_node(j);
if(!j||j===-1){j=this.get_container().find("> ul > li")
}g=d.isArray(g)?g:["id","class"];
if(!n&&this.data.types){g.push(p.types.type_attr)
}e=d.isArray(e)?e:[];
j.each(function(){m=d(this);
i={data:[]};
if(g.length){i.attr={}
}d.each(g,function(s,r){h=m.attr(r);
if(h&&h.length&&h.replace(/jstree[^ ]*/ig,"").length){i.attr[r]=(" "+h).replace(/ jstree[^ ]*/ig,"").replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"")
}});
if(m.hasClass("jstree-open")){i.state="open"
}if(m.hasClass("jstree-closed")){i.state="closed"
}if(m.data()){i.metadata=m.data()
}l=m.children("a");
l.each(function(){o=d(this);
if(e.length||d.inArray("languages",p.plugins)!==-1||o.children("ins").get(0).style.backgroundImage.length||(o.children("ins").get(0).className&&o.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").length)){f=false;
if(d.inArray("languages",p.plugins)!==-1&&d.isArray(p.languages)&&p.languages.length){d.each(p.languages,function(r,s){if(o.hasClass(s)){f=s;
return false
}})
}h={attr:{},title:k.get_text(o,f)};
d.each(e,function(r,s){h.attr[s]=(" "+(o.attr(s)||"")).replace(/ jstree[^ ]*/ig,"").replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"")
});
if(d.inArray("languages",p.plugins)!==-1&&d.isArray(p.languages)&&p.languages.length){d.each(p.languages,function(r,s){if(o.hasClass(s)){h.language=s;
return true
}})
}if(o.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"").length){h.icon=o.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"")
}if(o.children("ins").get(0).style.backgroundImage.length){h.icon=o.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")
}}else{h=k.get_text(o)
}if(l.length>1){i.data.push(h)
}else{i.data=h
}});
m=m.find("> ul > li");
if(m.length){i.children=k.get_json(m,g,e,true)
}q.push(i)
});
return q
}}})
})(jQuery);
(function(e){var d=false;
e.jstree.plugin("languages",{__init:function(){this._load_css()
},defaults:[],_fn:{set_lang:function(h){var j=this._get_settings().languages,g=false,f=".jstree-"+this.get_index()+" a";
if(!e.isArray(j)||j.length===0){return false
}if(e.inArray(h,j)==-1){if(!!j[h]){h=j[h]
}else{return false
}}if(h==this.data.languages.current_language){return true
}g=e.vakata.css.get_css(f+"."+this.data.languages.current_language,false,d);
if(g!==false){g.style.display="none"
}g=e.vakata.css.get_css(f+"."+h,false,d);
if(g!==false){g.style.display=""
}this.data.languages.current_language=h;
this.__callback(h);
return true
},get_lang:function(){return this.data.languages.current_language
},_get_string:function(f,i){var h=this._get_settings().languages,g=this._get_settings().core.strings;
if(e.isArray(h)&&h.length){i=(i&&e.inArray(i,h)!=-1)?i:this.data.languages.current_language
}if(g[i]&&g[i][f]){return g[i][f]
}if(g[f]){return g[f]
}return f
},get_text:function(h,i){h=this._get_node(h)||this.data.ui.last_selected;
if(!h.size()){return false
}var g=this._get_settings().languages,f=this._get_settings().core.html_titles;
if(e.isArray(g)&&g.length){i=(i&&e.inArray(i,g)!=-1)?i:this.data.languages.current_language;
h=h.children("a."+i)
}else{h=h.children("a:eq(0)")
}if(f){h=h.clone();
h.children("INS").remove();
return h.html()
}else{h=h.contents().filter(function(){return this.nodeType==3
})[0];
return h.nodeValue
}},set_text:function(i,k,j){i=this._get_node(i)||this.data.ui.last_selected;
if(!i.size()){return false
}var h=this._get_settings().languages,g=this._get_settings().core.html_titles,f;
if(e.isArray(h)&&h.length){j=(j&&e.inArray(j,h)!=-1)?j:this.data.languages.current_language;
i=i.children("a."+j)
}else{i=i.children("a:eq(0)")
}if(g){f=i.children("INS").clone();
i.html(k).prepend(f);
this.__callback({obj:i,name:k,lang:j});
return true
}else{i=i.contents().filter(function(){return this.nodeType==3
})[0];
this.__callback({obj:i,name:k,lang:j});
return(i.nodeValue=k)
}},_load_css:function(){var h=this._get_settings().languages,i="/* languages css */",f=".jstree-"+this.get_index()+" a",g;
if(e.isArray(h)&&h.length){this.data.languages.current_language=h[0];
for(g=0;
g<h.length;
g++){i+=f+"."+h[g]+" {";
if(h[g]!=this.data.languages.current_language){i+=" display:none; "
}i+=" } "
}d=e.vakata.css.add_sheet({str:i,title:"jstree-languages"})
}},create_node:function(i,f,h,j){var g=this.__call_old(true,i,f,h,function(l){var n=this._get_settings().languages,k=l.children("a"),m;
if(e.isArray(n)&&n.length){for(m=0;
m<n.length;
m++){if(!k.is("."+n[m])){l.append(k.eq(0).clone().removeClass(n.join(" ")).addClass(n[m]))
}}k.not("."+n.join(", .")).remove()
}if(j){j.call(this,l)
}});
return g
}}})
})(jQuery);
(function(d){d.jstree.plugin("cookies",{__init:function(){if(typeof d.cookie==="undefined"){throw"jsTree cookie: jQuery cookie plugin not included."
}var f=this._get_settings().cookies,e;
if(!!f.save_loaded){e=d.cookie(f.save_loaded);
if(e&&e.length){this.data.core.to_load=e.split(",")
}}if(!!f.save_opened){e=d.cookie(f.save_opened);
if(e&&e.length){this.data.core.to_open=e.split(",")
}}if(!!f.save_selected){e=d.cookie(f.save_selected);
if(e&&e.length&&this.data.ui){this.data.ui.to_select=e.split(",")
}}this.get_container().one((this.data.ui?"reselect":"reopen")+".jstree",d.proxy(function(){this.get_container().bind("open_node.jstree close_node.jstree select_node.jstree deselect_node.jstree",d.proxy(function(g){if(this._get_settings().cookies.auto_save){this.save_cookie((g.handleObj.namespace+g.handleObj.type).replace("jstree",""))
}},this))
},this))
},defaults:{save_loaded:"jstree_load",save_opened:"jstree_open",save_selected:"jstree_select",auto_save:true,cookie_options:{}},_fn:{save_cookie:function(f){if(this.data.core.refreshing){return
}var e=this._get_settings().cookies;
if(!f){if(e.save_loaded){this.save_loaded();
d.cookie(e.save_loaded,this.data.core.to_load.join(","),e.cookie_options)
}if(e.save_opened){this.save_opened();
d.cookie(e.save_opened,this.data.core.to_open.join(","),e.cookie_options)
}if(e.save_selected&&this.data.ui){this.save_selected();
d.cookie(e.save_selected,this.data.ui.to_select.join(","),e.cookie_options)
}return
}switch(f){case"open_node":case"close_node":if(!!e.save_opened){this.save_opened();
d.cookie(e.save_opened,this.data.core.to_open.join(","),e.cookie_options)
}if(!!e.save_loaded){this.save_loaded();
d.cookie(e.save_loaded,this.data.core.to_load.join(","),e.cookie_options)
}break;
case"select_node":case"deselect_node":if(!!e.save_selected&&this.data.ui){this.save_selected();
d.cookie(e.save_selected,this.data.ui.to_select.join(","),e.cookie_options)
}break
}}}})
})(jQuery);
(function(d){d.jstree.plugin("sort",{__init:function(){this.get_container().bind("load_node.jstree",d.proxy(function(h,f){var g=this._get_node(f.rslt.obj);
g=g===-1?this.get_container().children("ul"):g.children("ul");
this.sort(g)
},this)).bind("rename_node.jstree create_node.jstree create.jstree",d.proxy(function(g,f){this.sort(f.rslt.obj.parent())
},this)).bind("move_node.jstree",d.proxy(function(h,g){var f=g.rslt.np==-1?this.get_container():g.rslt.np;
this.sort(f.children("ul"))
},this))
},defaults:function(f,e){return this.get_text(f)>this.get_text(e)?1:-1
},_fn:{sort:function(g){var f=this._get_settings().sort,e=this;
g.append(d.makeArray(g.children("li")).sort(d.proxy(f,e)));
g.find("> li > ul").each(function(){e.sort(d(this))
});
this.clean_node(g)
}}})
})(jQuery);
(function(j){var f=false,d=false,g=false,h=false,k=false,e=false,n=false,l=false,i=false;
j.vakata.dnd={is_down:false,is_drag:false,helper:false,scroll_spd:10,init_x:0,init_y:0,threshold:5,helper_left:5,helper_top:10,user_data:{},drag_start:function(q,p,m){if(j.vakata.dnd.is_drag){j.vakata.drag_stop({})
}try{q.currentTarget.unselectable="on";
q.currentTarget.onselectstart=function(){return false
};
if(q.currentTarget.style){q.currentTarget.style.MozUserSelect="none"
}}catch(o){}j.vakata.dnd.init_x=q.pageX;
j.vakata.dnd.init_y=q.pageY;
j.vakata.dnd.user_data=p;
j.vakata.dnd.is_down=true;
j.vakata.dnd.helper=j("<div id='vakata-dragged' />").html(m);
j(document).bind("mousemove",j.vakata.dnd.drag);
j(document).bind("mouseup",j.vakata.dnd.drag_stop);
return false
},drag:function(p){if(!j.vakata.dnd.is_down){return
}if(!j.vakata.dnd.is_drag){if(Math.abs(p.pageX-j.vakata.dnd.init_x)>5||Math.abs(p.pageY-j.vakata.dnd.init_y)>5){j.vakata.dnd.helper.appendTo("body");
j.vakata.dnd.is_drag=true;
j(document).triggerHandler("drag_start.vakata",{event:p,data:j.vakata.dnd.user_data})
}else{return
}}if(p.type==="mousemove"){var q=j(document),o=q.scrollTop(),m=q.scrollLeft();
if(p.pageY-o<20){if(e&&n==="down"){clearInterval(e);
e=false
}if(!e){n="up";
e=setInterval(function(){j(document).scrollTop(j(document).scrollTop()-j.vakata.dnd.scroll_spd)
},150)
}}else{if(e&&n==="up"){clearInterval(e);
e=false
}}if(j(window).height()-(p.pageY-o)<20){if(e&&n==="up"){clearInterval(e);
e=false
}if(!e){n="down";
e=setInterval(function(){j(document).scrollTop(j(document).scrollTop()+j.vakata.dnd.scroll_spd)
},150)
}}else{if(e&&n==="down"){clearInterval(e);
e=false
}}if(p.pageX-m<20){if(k&&l==="right"){clearInterval(k);
k=false
}if(!k){l="left";
k=setInterval(function(){j(document).scrollLeft(j(document).scrollLeft()-j.vakata.dnd.scroll_spd)
},150)
}}else{if(k&&l==="left"){clearInterval(k);
k=false
}}if(j(window).width()-(p.pageX-m)<20){if(k&&l==="left"){clearInterval(k);
k=false
}if(!k){l="right";
k=setInterval(function(){j(document).scrollLeft(j(document).scrollLeft()+j.vakata.dnd.scroll_spd)
},150)
}}else{if(k&&l==="right"){clearInterval(k);
k=false
}}}j.vakata.dnd.helper.css({left:(p.pageX+j.vakata.dnd.helper_left)+"px",top:(p.pageY+j.vakata.dnd.helper_top)+"px"});
j(document).triggerHandler("drag.vakata",{event:p,data:j.vakata.dnd.user_data})
},drag_stop:function(m){if(k){clearInterval(k)
}if(e){clearInterval(e)
}j(document).unbind("mousemove",j.vakata.dnd.drag);
j(document).unbind("mouseup",j.vakata.dnd.drag_stop);
j(document).triggerHandler("drag_stop.vakata",{event:m,data:j.vakata.dnd.user_data});
j.vakata.dnd.helper.remove();
j.vakata.dnd.init_x=0;
j.vakata.dnd.init_y=0;
j.vakata.dnd.user_data={};
j.vakata.dnd.is_down=false;
j.vakata.dnd.is_drag=false
}};
j(function(){var m="#vakata-dragged { display:block; margin:0 0 0 0; padding:4px 4px 4px 24px; position:absolute; top:-2000px; line-height:16px; z-index:10000; } ";
j.vakata.css.add_sheet({str:m,title:"vakata"})
});
j.jstree.plugin("dnd",{__init:function(){this.data.dnd={active:false,after:false,inside:false,before:false,off:false,prepared:false,w:0,to1:false,to2:false,cof:false,cw:false,ch:false,i1:false,i2:false,mto:false};
this.get_container().bind("mouseenter.jstree",j.proxy(function(q){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){if(this.data.themes){g.attr("class","jstree-"+this.data.themes.theme);
if(h){h.attr("class","jstree-"+this.data.themes.theme)
}j.vakata.dnd.helper.attr("class","jstree-dnd-helper jstree-"+this.data.themes.theme)
}if(q.currentTarget===q.target&&j.vakata.dnd.user_data.obj&&j(j.vakata.dnd.user_data.obj).length&&j(j.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0]!==q.target){var p=j.jstree._reference(q.target),o;
if(p.data.dnd.foreign){o=p._get_settings().dnd.drag_check.call(this,{o:f,r:p.get_container(),is_root:true});
if(o===true||o.inside===true||o.before===true||o.after===true){j.vakata.dnd.helper.children("ins").attr("class","jstree-ok")
}}else{p.prepare_move(f,p.get_container(),"last");
if(p.check_move()){j.vakata.dnd.helper.children("ins").attr("class","jstree-ok")
}}}}},this)).bind("mouseup.jstree",j.proxy(function(q){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree&&q.currentTarget===q.target&&j.vakata.dnd.user_data.obj&&j(j.vakata.dnd.user_data.obj).length&&j(j.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0]!==q.target){var p=j.jstree._reference(q.currentTarget),o;
if(p.data.dnd.foreign){o=p._get_settings().dnd.drag_check.call(this,{o:f,r:p.get_container(),is_root:true});
if(o===true||o.inside===true||o.before===true||o.after===true){p._get_settings().dnd.drag_finish.call(this,{o:f,r:p.get_container(),is_root:true})
}}else{p.move_node(f,p.get_container(),"last",q[p._get_settings().dnd.copy_modifier+"Key"])
}}},this)).bind("mouseleave.jstree",j.proxy(function(o){if(o.relatedTarget&&o.relatedTarget.id&&o.relatedTarget.id==="jstree-marker-line"){return false
}if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){if(this.data.dnd.i1){clearInterval(this.data.dnd.i1)
}if(this.data.dnd.i2){clearInterval(this.data.dnd.i2)
}if(this.data.dnd.to1){clearTimeout(this.data.dnd.to1)
}if(this.data.dnd.to2){clearTimeout(this.data.dnd.to2)
}if(j.vakata.dnd.helper.children("ins").hasClass("jstree-ok")){j.vakata.dnd.helper.children("ins").attr("class","jstree-invalid")
}}},this)).bind("mousemove.jstree",j.proxy(function(p){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){var o=this.get_container()[0];
if(p.pageX+24>this.data.dnd.cof.left+this.data.dnd.cw){if(this.data.dnd.i1){clearInterval(this.data.dnd.i1)
}this.data.dnd.i1=setInterval(j.proxy(function(){this.scrollLeft+=j.vakata.dnd.scroll_spd
},o),100)
}else{if(p.pageX-24<this.data.dnd.cof.left){if(this.data.dnd.i1){clearInterval(this.data.dnd.i1)
}this.data.dnd.i1=setInterval(j.proxy(function(){this.scrollLeft-=j.vakata.dnd.scroll_spd
},o),100)
}else{if(this.data.dnd.i1){clearInterval(this.data.dnd.i1)
}}}if(p.pageY+24>this.data.dnd.cof.top+this.data.dnd.ch){if(this.data.dnd.i2){clearInterval(this.data.dnd.i2)
}this.data.dnd.i2=setInterval(j.proxy(function(){this.scrollTop+=j.vakata.dnd.scroll_spd
},o),100)
}else{if(p.pageY-24<this.data.dnd.cof.top){if(this.data.dnd.i2){clearInterval(this.data.dnd.i2)
}this.data.dnd.i2=setInterval(j.proxy(function(){this.scrollTop-=j.vakata.dnd.scroll_spd
},o),100)
}else{if(this.data.dnd.i2){clearInterval(this.data.dnd.i2)
}}}}},this)).bind("scroll.jstree",j.proxy(function(o){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree&&g&&h){g.hide();
h.hide()
}},this)).delegate("a","mousedown.jstree",j.proxy(function(o){if(o.which===1){this.start_drag(o.currentTarget,o);
return false
}},this)).delegate("a","mouseenter.jstree",j.proxy(function(o){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){this.dnd_enter(o.currentTarget)
}},this)).delegate("a","mousemove.jstree",j.proxy(function(o){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){if(!d||!d.length||d.children("a")[0]!==o.currentTarget){this.dnd_enter(o.currentTarget)
}if(typeof this.data.dnd.off.top==="undefined"){this.data.dnd.off=j(o.target).offset()
}this.data.dnd.w=(o.pageY-(this.data.dnd.off.top||0))%this.data.core.li_height;
if(this.data.dnd.w<0){this.data.dnd.w+=this.data.core.li_height
}this.dnd_show()
}},this)).delegate("a","mouseleave.jstree",j.proxy(function(o){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){if(o.relatedTarget&&o.relatedTarget.id&&o.relatedTarget.id==="jstree-marker-line"){return false
}if(g){g.hide()
}if(h){h.hide()
}this.data.dnd.mto=setTimeout((function(p){return function(){p.dnd_leave(o)
}
})(this),0)
}},this)).delegate("a","mouseup.jstree",j.proxy(function(o){if(j.vakata.dnd.is_drag&&j.vakata.dnd.user_data.jstree){this.dnd_finish(o)
}},this));
j(document).bind("drag_stop.vakata",j.proxy(function(){if(this.data.dnd.to1){clearTimeout(this.data.dnd.to1)
}if(this.data.dnd.to2){clearTimeout(this.data.dnd.to2)
}if(this.data.dnd.i1){clearInterval(this.data.dnd.i1)
}if(this.data.dnd.i2){clearInterval(this.data.dnd.i2)
}this.data.dnd.after=false;
this.data.dnd.before=false;
this.data.dnd.inside=false;
this.data.dnd.off=false;
this.data.dnd.prepared=false;
this.data.dnd.w=false;
this.data.dnd.to1=false;
this.data.dnd.to2=false;
this.data.dnd.i1=false;
this.data.dnd.i2=false;
this.data.dnd.active=false;
this.data.dnd.foreign=false;
if(g){g.css({top:"-2000px"})
}if(h){h.css({top:"-2000px"})
}},this)).bind("drag_start.vakata",j.proxy(function(q,o){if(o.data.jstree){var p=j(o.event.target);
if(p.closest(".jstree").hasClass("jstree-"+this.get_index())){this.dnd_enter(p)
}}},this));
var m=this._get_settings().dnd;
if(m.drag_target){j(document).delegate(m.drag_target,"mousedown.jstree-"+this.get_index(),j.proxy(function(p){f=p.target;
j.vakata.dnd.drag_start(p,{jstree:true,obj:p.target},"<ins class='jstree-icon'></ins>"+j(p.target).text());
if(this.data.themes){if(g){g.attr("class","jstree-"+this.data.themes.theme)
}if(h){h.attr("class","jstree-"+this.data.themes.theme)
}j.vakata.dnd.helper.attr("class","jstree-dnd-helper jstree-"+this.data.themes.theme)
}j.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
var o=this.get_container();
this.data.dnd.cof=o.offset();
this.data.dnd.cw=parseInt(o.width(),10);
this.data.dnd.ch=parseInt(o.height(),10);
this.data.dnd.foreign=true;
p.preventDefault()
},this))
}if(m.drop_target){j(document).delegate(m.drop_target,"mouseenter.jstree-"+this.get_index(),j.proxy(function(o){if(this.data.dnd.active&&this._get_settings().dnd.drop_check.call(this,{o:f,r:j(o.target),e:o})){j.vakata.dnd.helper.children("ins").attr("class","jstree-ok")
}},this)).delegate(m.drop_target,"mouseleave.jstree-"+this.get_index(),j.proxy(function(o){if(this.data.dnd.active){j.vakata.dnd.helper.children("ins").attr("class","jstree-invalid")
}},this)).delegate(m.drop_target,"mouseup.jstree-"+this.get_index(),j.proxy(function(o){if(this.data.dnd.active&&j.vakata.dnd.helper.children("ins").hasClass("jstree-ok")){this._get_settings().dnd.drop_finish.call(this,{o:f,r:j(o.target),e:o})
}},this))
}},defaults:{copy_modifier:"ctrl",check_timeout:100,open_timeout:500,drop_target:".jstree-drop",drop_check:function(m){return true
},drop_finish:j.noop,drag_target:".jstree-draggable",drag_finish:j.noop,drag_check:function(m){return{after:false,before:false,inside:true}
}},_fn:{dnd_prepare:function(){if(!d||!d.length){return
}this.data.dnd.off=d.offset();
if(this._get_settings().core.rtl){this.data.dnd.off.right=this.data.dnd.off.left+d.width()
}if(this.data.dnd.foreign){var m=this._get_settings().dnd.drag_check.call(this,{o:f,r:d});
this.data.dnd.after=m.after;
this.data.dnd.before=m.before;
this.data.dnd.inside=m.inside;
this.data.dnd.prepared=true;
return this.dnd_show()
}this.prepare_move(f,d,"before");
this.data.dnd.before=this.check_move();
this.prepare_move(f,d,"after");
this.data.dnd.after=this.check_move();
if(this._is_loaded(d)){this.prepare_move(f,d,"inside");
this.data.dnd.inside=this.check_move()
}else{this.data.dnd.inside=false
}this.data.dnd.prepared=true;
return this.dnd_show()
},dnd_show:function(){if(!this.data.dnd.prepared){return
}var q=["before","inside","after"],m=false,p=this._get_settings().core.rtl,s;
if(this.data.dnd.w<this.data.core.li_height/3){q=["before","inside","after"]
}else{if(this.data.dnd.w<=this.data.core.li_height*2/3){q=this.data.dnd.w<this.data.core.li_height/2?["inside","before","after"]:["inside","after","before"]
}else{q=["after","inside","before"]
}}j.each(q,j.proxy(function(o,r){if(this.data.dnd[r]){j.vakata.dnd.helper.children("ins").attr("class","jstree-ok");
m=r;
return false
}},this));
if(m===false){j.vakata.dnd.helper.children("ins").attr("class","jstree-invalid")
}s=p?(this.data.dnd.off.right-18):(this.data.dnd.off.left+10);
switch(m){case"before":g.css({left:s+"px",top:(this.data.dnd.off.top-6)+"px"}).show();
if(h){h.css({left:(s+8)+"px",top:(this.data.dnd.off.top-1)+"px"}).show()
}break;
case"after":g.css({left:s+"px",top:(this.data.dnd.off.top+this.data.core.li_height-6)+"px"}).show();
if(h){h.css({left:(s+8)+"px",top:(this.data.dnd.off.top+this.data.core.li_height-1)+"px"}).show()
}break;
case"inside":g.css({left:s+(p?-4:4)+"px",top:(this.data.dnd.off.top+this.data.core.li_height/2-5)+"px"}).show();
if(h){h.hide()
}break;
default:g.hide();
if(h){h.hide()
}break
}i=m;
return m
},dnd_open:function(){this.data.dnd.to2=false;
this.open_node(d,j.proxy(this.dnd_prepare,this),true)
},dnd_finish:function(m){if(this.data.dnd.foreign){if(this.data.dnd.after||this.data.dnd.before||this.data.dnd.inside){this._get_settings().dnd.drag_finish.call(this,{o:f,r:d,p:i})
}}else{this.dnd_prepare();
this.move_node(f,d,i,m[this._get_settings().dnd.copy_modifier+"Key"])
}f=false;
d=false;
g.hide();
if(h){h.hide()
}},dnd_enter:function(o){if(this.data.dnd.mto){clearTimeout(this.data.dnd.mto);
this.data.dnd.mto=false
}var m=this._get_settings().dnd;
this.data.dnd.prepared=false;
d=this._get_node(o);
if(m.check_timeout){if(this.data.dnd.to1){clearTimeout(this.data.dnd.to1)
}this.data.dnd.to1=setTimeout(j.proxy(this.dnd_prepare,this),m.check_timeout)
}else{this.dnd_prepare()
}if(m.open_timeout){if(this.data.dnd.to2){clearTimeout(this.data.dnd.to2)
}if(d&&d.length&&d.hasClass("jstree-closed")){this.data.dnd.to2=setTimeout(j.proxy(this.dnd_open,this),m.open_timeout)
}}else{if(d&&d.length&&d.hasClass("jstree-closed")){this.dnd_open()
}}},dnd_leave:function(m){this.data.dnd.after=false;
this.data.dnd.before=false;
this.data.dnd.inside=false;
j.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
g.hide();
if(h){h.hide()
}if(d&&d[0]===m.target.parentNode){if(this.data.dnd.to1){clearTimeout(this.data.dnd.to1);
this.data.dnd.to1=false
}if(this.data.dnd.to2){clearTimeout(this.data.dnd.to2);
this.data.dnd.to2=false
}}},start_drag:function(q,p){f=this._get_node(q);
if(this.data.ui&&this.is_selected(f)){f=this._get_node(null,true)
}var o=f.length>1?this._get_string("multiple_selection"):this.get_text(f),m=this.get_container();
if(!this._get_settings().core.html_titles){o=o.replace(/</ig,"&lt;").replace(/>/ig,"&gt;")
}j.vakata.dnd.drag_start(p,{jstree:true,obj:f},"<ins class='jstree-icon'></ins>"+o);
if(this.data.themes){if(g){g.attr("class","jstree-"+this.data.themes.theme)
}if(h){h.attr("class","jstree-"+this.data.themes.theme)
}j.vakata.dnd.helper.attr("class","jstree-dnd-helper jstree-"+this.data.themes.theme)
}this.data.dnd.cof=m.offset();
this.data.dnd.cw=parseInt(m.width(),10);
this.data.dnd.ch=parseInt(m.height(),10);
this.data.dnd.active=true
}}});
j(function(){var m="#vakata-dragged ins { display:block; text-decoration:none; width:16px; height:16px; margin:0 0 0 0; padding:0; position:absolute; top:4px; left:4px;  -moz-border-radius:4px; border-radius:4px; -webkit-border-radius:4px; } #vakata-dragged .jstree-ok { background:green; } #vakata-dragged .jstree-invalid { background:red; } #jstree-marker { padding:0; margin:0; font-size:12px; overflow:hidden; height:12px; width:8px; position:absolute; top:-30px; z-index:10001; background-repeat:no-repeat; display:none; background-color:transparent; text-shadow:1px 1px 1px white; color:black; line-height:10px; } #jstree-marker-line { padding:0; margin:0; line-height:0%; font-size:1px; overflow:hidden; height:1px; width:100px; position:absolute; top:-30px; z-index:10000; background-repeat:no-repeat; display:none; background-color:#456c43;  cursor:pointer; border:1px solid #eeeeee; border-left:0; -moz-box-shadow: 0px 0px 2px #666; -webkit-box-shadow: 0px 0px 2px #666; box-shadow: 0px 0px 2px #666;  -moz-border-radius:1px; border-radius:1px; -webkit-border-radius:1px; }";
j.vakata.css.add_sheet({str:m,title:"jstree"});
g=j("<div />").attr({id:"jstree-marker"}).hide().html("&raquo;").bind("mouseleave mouseenter",function(o){g.hide();
h.hide();
o.preventDefault();
o.stopImmediatePropagation();
return false
}).appendTo("body");
h=j("<div />").attr({id:"jstree-marker-line"}).hide().bind("mouseup",function(o){if(d&&d.length){d.children("a").trigger(o);
o.preventDefault();
o.stopImmediatePropagation();
return false
}}).bind("mouseleave",function(p){var o=j(p.relatedTarget);
if(o.is(".jstree")||o.closest(".jstree").length===0){if(d&&d.length){d.children("a").trigger(p);
g.hide();
h.hide();
p.preventDefault();
p.stopImmediatePropagation();
return false
}}}).appendTo("body");
j(document).bind("drag_start.vakata",function(p,o){if(o.data.jstree){g.show();
if(h){h.show()
}}});
j(document).bind("drag_stop.vakata",function(p,o){if(o.data.jstree){g.hide();
if(h){h.hide()
}}})
})
})(jQuery);
(function(d){d.jstree.plugin("checkbox",{__init:function(){this.data.checkbox.noui=this._get_settings().checkbox.override_ui;
if(this.data.ui&&this.data.checkbox.noui){this.select_node=this.deselect_node=this.deselect_all=d.noop;
this.get_selected=this.get_checked
}this.get_container().bind("open_node.jstree create_node.jstree clean_node.jstree refresh.jstree",d.proxy(function(g,f){this._prepare_checkboxes(f.rslt.obj)
},this)).bind("loaded.jstree",d.proxy(function(f){this._prepare_checkboxes()
},this)).delegate((this.data.ui&&this.data.checkbox.noui?"a":"ins.jstree-checkbox"),"click.jstree",d.proxy(function(f){f.preventDefault();
if(this._get_node(f.target).hasClass("jstree-checked")){this.uncheck_node(f.target)
}else{this.check_node(f.target)
}if(this.data.ui&&this.data.checkbox.noui){this.save_selected();
if(this.data.cookies){this.save_cookie("select_node")
}}else{f.stopImmediatePropagation();
return false
}},this))
},defaults:{override_ui:false,two_state:false,real_checkboxes:false,checked_parent_open:true,real_checkboxes_names:function(e){return[("check_"+(e[0].id||Math.ceil(Math.random()*10000))),1]
}},__destroy:function(){this.get_container().find("input.jstree-real-checkbox").removeClass("jstree-real-checkbox").end().find("ins.jstree-checkbox").remove()
},_fn:{_checkbox_notify:function(f,e){if(e.checked){this.check_node(f,false)
}},_prepare_checkboxes:function(i){i=!i||i==-1?this.get_container().find("> ul > li"):this._get_node(i);
if(i===false){return
}var k,j=this,e,g=this._get_settings().checkbox.two_state,h=this._get_settings().checkbox.real_checkboxes,f=this._get_settings().checkbox.real_checkboxes_names;
i.each(function(){e=d(this);
k=e.is("li")&&(e.hasClass("jstree-checked")||(h&&e.children(":checked").length))?"jstree-checked":"jstree-unchecked";
e.find("li").addBack().each(function(){var m=d(this),l;
m.children("a"+(j.data.languages?"":":eq(0)")).not(":has(.jstree-checkbox)").prepend("<ins class='jstree-checkbox'>&#160;</ins>").parent().not(".jstree-checked, .jstree-unchecked").addClass(g?"jstree-unchecked":k);
if(h){if(!m.children(":checkbox").length){l=f.call(j,m);
m.prepend("<input type='checkbox' class='jstree-real-checkbox' id='"+l[0]+"' name='"+l[0]+"' value='"+l[1]+"' />")
}else{m.children(":checkbox").addClass("jstree-real-checkbox")
}}if(!g){if(k==="jstree-checked"||m.hasClass("jstree-checked")||m.children(":checked").length){m.find("li").addBack().addClass("jstree-checked").children(":checkbox").prop("checked",true)
}}else{if(m.hasClass("jstree-checked")||m.children(":checked").length){m.addClass("jstree-checked").children(":checkbox").prop("checked",true)
}}})
});
if(!g){i.find(".jstree-checked").parent().parent().each(function(){j._repair_state(this)
})
}},change_state:function(h,g){h=this._get_node(h);
var e=false,f=this._get_settings().checkbox.real_checkboxes;
if(!h||h===-1){return false
}g=(g===false||g===true)?g:h.hasClass("jstree-checked");
if(this._get_settings().checkbox.two_state){if(g){h.removeClass("jstree-checked").addClass("jstree-unchecked");
if(f){h.children(":checkbox").prop("checked",false)
}}else{h.removeClass("jstree-unchecked").addClass("jstree-checked");
if(f){h.children(":checkbox").prop("checked",true)
}}}else{if(g){e=h.find("li").addBack();
if(!e.filter(".jstree-checked, .jstree-undetermined").length){return false
}e.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
if(f){e.children(":checkbox").prop("checked",false)
}}else{e=h.find("li").addBack();
if(!e.filter(".jstree-unchecked, .jstree-undetermined").length){return false
}e.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
if(f){e.children(":checkbox").prop("checked",true)
}if(this.data.ui){this.data.ui.last_selected=h
}this.data.checkbox.last_selected=h
}h.parentsUntil(".jstree","li").each(function(){var i=d(this);
if(g){if(i.children("ul").children("li.jstree-checked, li.jstree-undetermined").length){i.parentsUntil(".jstree","li").addBack().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
if(f){i.parentsUntil(".jstree","li").addBack().children(":checkbox").prop("checked",false)
}return false
}else{i.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
if(f){i.children(":checkbox").prop("checked",false)
}}}else{if(i.children("ul").children("li.jstree-unchecked, li.jstree-undetermined").length){i.parentsUntil(".jstree","li").addBack().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
if(f){i.parentsUntil(".jstree","li").addBack().children(":checkbox").prop("checked",false)
}return false
}else{i.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
if(f){i.children(":checkbox").prop("checked",true)
}}}})
}if(this.data.ui&&this.data.checkbox.noui){this.data.ui.selected=this.get_checked()
}this.__callback(h);
return true
},check_node:function(f){if(this.change_state(f,false)){f=this._get_node(f);
if(this._get_settings().checkbox.checked_parent_open){var e=this;
f.parents(".jstree-closed").each(function(){e.open_node(this,false,true)
})
}this.__callback({obj:f})
}},uncheck_node:function(e){if(this.change_state(e,true)){this.__callback({obj:this._get_node(e)})
}},check_all:function(){var f=this,e=this._get_settings().checkbox.two_state?this.get_container_ul().find("li"):this.get_container_ul().children("li");
e.each(function(){f.change_state(this,false)
});
this.__callback()
},uncheck_all:function(){var f=this,e=this._get_settings().checkbox.two_state?this.get_container_ul().find("li"):this.get_container_ul().children("li");
e.each(function(){f.change_state(this,true)
});
this.__callback()
},is_checked:function(e){e=this._get_node(e);
return e.length?e.is(".jstree-checked"):false
},get_checked:function(f,e){f=!f||f===-1?this.get_container():this._get_node(f);
return e||this._get_settings().checkbox.two_state?f.find(".jstree-checked"):f.find("> ul > .jstree-checked, .jstree-undetermined > ul > .jstree-checked")
},get_unchecked:function(f,e){f=!f||f===-1?this.get_container():this._get_node(f);
return e||this._get_settings().checkbox.two_state?f.find(".jstree-unchecked"):f.find("> ul > .jstree-unchecked, .jstree-undetermined > ul > .jstree-unchecked")
},show_checkboxes:function(){this.get_container().children("ul").removeClass("jstree-no-checkboxes")
},hide_checkboxes:function(){this.get_container().children("ul").addClass("jstree-no-checkboxes")
},_repair_state:function(h){h=this._get_node(h);
if(!h.length){return
}if(this._get_settings().checkbox.two_state){h.find("li").addBack().not(".jstree-checked").removeClass("jstree-undetermined").addClass("jstree-unchecked").children(":checkbox").prop("checked",true);
return
}var g=this._get_settings().checkbox.real_checkboxes,f=h.find("> ul > .jstree-checked").length,e=h.find("> ul > .jstree-undetermined").length,i=h.find("> ul > li").length;
if(i===0){if(h.hasClass("jstree-undetermined")){this.change_state(h,false)
}}else{if(f===0&&e===0){this.change_state(h,true)
}else{if(f===i){this.change_state(h,false)
}else{h.parentsUntil(".jstree","li").addBack().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
if(g){h.parentsUntil(".jstree","li").addBack().children(":checkbox").prop("checked",false)
}}}}},reselect:function(){if(this.data.ui&&this.data.checkbox.noui){var f=this,e=this.data.ui.to_select;
e=d.map(d.makeArray(e),function(g){return"#"+g.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:")
});
this.deselect_all();
d.each(e,function(g,h){f.check_node(h)
});
this.__callback()
}else{this.__call_old()
}},save_loaded:function(){var e=this;
this.data.core.to_load=[];
this.get_container_ul().find("li.jstree-closed.jstree-undetermined").each(function(){if(this.id){e.data.core.to_load.push("#"+this.id)
}})
}}});
d(function(){var e=".jstree .jstree-real-checkbox { display:none; } ";
d.vakata.css.add_sheet({str:e,title:"jstree"})
})
})(jQuery);
(function(f){f.vakata.xslt=function(g,h,n){var j=false,m,k,i;
if(j===false&&(window.ActiveXObject||"ActiveXObject" in window)){try{j=new ActiveXObject("Msxml2.XSLTemplate");
k=new ActiveXObject("Msxml2.DOMDocument");
k.loadXML(g);
i=new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
i.loadXML(h);
j.stylesheet=i;
m=j.createProcessor();
m.input=k;
m.transform();
j=m.output
}catch(l){}}g=f.parseXML(g);
h=f.parseXML(h);
if(j===false&&typeof(XSLTProcessor)!=="undefined"){m=new XSLTProcessor();
m.importStylesheet(h);
j=m.transformToFragment(g,document);
j=f("<div />").append(j).html()
}if(j===false&&typeof(g.transformNode)!=="undefined"){j=g.transformNode(h)
}n.call(null,j)
};
var e={nest:'<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ><xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/html" /><xsl:template match="/">	<xsl:call-template name="nodes">		<xsl:with-param name="node" select="/root" />	</xsl:call-template></xsl:template><xsl:template name="nodes">	<xsl:param name="node" />	<ul>	<xsl:for-each select="$node/item">		<xsl:variable name="children" select="count(./item) &gt; 0" />		<li>			<xsl:attribute name="class">				<xsl:if test="position() = last()">jstree-last </xsl:if>				<xsl:choose>					<xsl:when test="@state = \'open\'">jstree-open </xsl:when>					<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>					<xsl:otherwise>jstree-leaf </xsl:otherwise>				</xsl:choose>				<xsl:value-of select="@class" />			</xsl:attribute>			<xsl:for-each select="@*">				<xsl:if test="name() != \'class\' and name() != \'state\' and name() != \'hasChildren\'">					<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>				</xsl:if>			</xsl:for-each>	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>			<xsl:for-each select="content/name">				<a>				<xsl:attribute name="href">					<xsl:choose>					<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>					<xsl:otherwise>#</xsl:otherwise>					</xsl:choose>				</xsl:attribute>				<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>				<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>				<xsl:for-each select="@*">					<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">						<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>					</xsl:if>				</xsl:for-each>					<ins>						<xsl:attribute name="class">jstree-icon 							<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>						</xsl:attribute>						<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>						<xsl:text>&#xa0;</xsl:text>					</ins>					<xsl:copy-of select="./child::node()" />				</a>			</xsl:for-each>			<xsl:if test="$children or @hasChildren"><xsl:call-template name="nodes"><xsl:with-param name="node" select="current()" /></xsl:call-template></xsl:if>		</li>	</xsl:for-each>	</ul></xsl:template></xsl:stylesheet>',flat:'<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ><xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/xml" /><xsl:template match="/">	<ul>	<xsl:for-each select="//item[not(@parent_id) or @parent_id=0 or not(@parent_id = //item/@id)]">		<xsl:call-template name="nodes">			<xsl:with-param name="node" select="." />			<xsl:with-param name="is_last" select="number(position() = last())" />		</xsl:call-template>	</xsl:for-each>	</ul></xsl:template><xsl:template name="nodes">	<xsl:param name="node" />	<xsl:param name="is_last" />	<xsl:variable name="children" select="count(//item[@parent_id=$node/attribute::id]) &gt; 0" />	<li>	<xsl:attribute name="class">		<xsl:if test="$is_last = true()">jstree-last </xsl:if>		<xsl:choose>			<xsl:when test="@state = \'open\'">jstree-open </xsl:when>			<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>			<xsl:otherwise>jstree-leaf </xsl:otherwise>		</xsl:choose>		<xsl:value-of select="@class" />	</xsl:attribute>	<xsl:for-each select="@*">		<xsl:if test="name() != \'parent_id\' and name() != \'hasChildren\' and name() != \'class\' and name() != \'state\'">		<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>		</xsl:if>	</xsl:for-each>	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>	<xsl:for-each select="content/name">		<a>		<xsl:attribute name="href">			<xsl:choose>			<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>			<xsl:otherwise>#</xsl:otherwise>			</xsl:choose>		</xsl:attribute>		<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>		<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>		<xsl:for-each select="@*">			<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">				<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>			</xsl:if>		</xsl:for-each>			<ins>				<xsl:attribute name="class">jstree-icon 					<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>				</xsl:attribute>				<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>				<xsl:text>&#xa0;</xsl:text>			</ins>			<xsl:copy-of select="./child::node()" />		</a>	</xsl:for-each>	<xsl:if test="$children">		<ul>		<xsl:for-each select="//item[@parent_id=$node/attribute::id]">			<xsl:call-template name="nodes">				<xsl:with-param name="node" select="." />				<xsl:with-param name="is_last" select="number(position() = last())" />			</xsl:call-template>		</xsl:for-each>		</ul>	</xsl:if>	</li></xsl:template></xsl:stylesheet>'},d=function(g){return g.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")
};
f.jstree.plugin("xml_data",{defaults:{data:false,ajax:false,xsl:"flat",clean_node:false,correct_state:true,get_skip_empty:false,get_include_preamble:true},_fn:{load_node:function(i,g,h){var j=this;
this.load_node_xml(i,function(){j.__callback({obj:j._get_node(i)});
g.call(this)
},h)
},_is_loaded:function(h){var g=this._get_settings().xml_data;
h=this._get_node(h);
return h==-1||!h||(!g.ajax&&!f.isFunction(g.data))||h.is(".jstree-open, .jstree-leaf")||h.children("ul").children("li").size()>0
},load_node_xml:function(k,g,i){var j=this.get_settings().xml_data,h=function(){},l=function(){};
k=this._get_node(k);
if(k&&k!==-1){if(k.data("jstree_is_loading")){return
}else{k.data("jstree_is_loading",true)
}}switch(!0){case (!j.data&&!j.ajax):throw"Neither data nor ajax settings supplied.";
case (f.isFunction(j.data)):j.data.call(this,k,f.proxy(function(m){this.parse_xml(m,f.proxy(function(n){if(n){n=n.replace(/ ?xmlns="[^"]*"/ig,"");
if(n.length>10){n=f(n);
if(k===-1||!k){this.get_container().children("ul").empty().append(n.children())
}else{k.children("a.jstree-loading").removeClass("jstree-loading");
k.append(n);
k.removeData("jstree_is_loading")
}if(j.clean_node){this.clean_node(k)
}if(g){g.call(this)
}}else{if(k&&k!==-1){k.children("a.jstree-loading").removeClass("jstree-loading");
k.removeData("jstree_is_loading");
if(j.correct_state){this.correct_state(k);
if(g){g.call(this)
}}}else{if(j.correct_state){this.get_container().children("ul").empty();
if(g){g.call(this)
}}}}}},this))
},this));
break;
case (!!j.data&&!j.ajax)||(!!j.data&&!!j.ajax&&(!k||k===-1)):if(!k||k==-1){this.parse_xml(j.data,f.proxy(function(m){if(m){m=m.replace(/ ?xmlns="[^"]*"/ig,"");
if(m.length>10){m=f(m);
this.get_container().children("ul").empty().append(m.children());
if(j.clean_node){this.clean_node(k)
}if(g){g.call(this)
}}}else{if(j.correct_state){this.get_container().children("ul").empty();
if(g){g.call(this)
}}}},this))
}break;
case (!j.data&&!!j.ajax)||(!!j.data&&!!j.ajax&&k&&k!==-1):h=function(n,o,p){var m=this.get_settings().xml_data.ajax.error;
if(m){m.call(this,n,o,p)
}if(k!==-1&&k.length){k.children("a.jstree-loading").removeClass("jstree-loading");
k.removeData("jstree_is_loading");
if(o==="success"&&j.correct_state){this.correct_state(k)
}}else{if(o==="success"&&j.correct_state){this.get_container().children("ul").empty()
}}if(i){i.call(this)
}};
l=function(p,n,m){p=m.responseText;
var o=this.get_settings().xml_data.ajax.success;
if(o){p=o.call(this,p,n,m)||p
}if(p===""||(p&&p.toString&&p.toString().replace(/^[\s\n]+$/,"")==="")){return h.call(this,m,n,"")
}this.parse_xml(p,f.proxy(function(q){if(q){q=q.replace(/ ?xmlns="[^"]*"/ig,"");
if(q.length>10){q=f(q);
if(k===-1||!k){this.get_container().children("ul").empty().append(q.children())
}else{k.children("a.jstree-loading").removeClass("jstree-loading");
k.append(q);
k.removeData("jstree_is_loading")
}if(j.clean_node){this.clean_node(k)
}if(g){g.call(this)
}}else{if(k&&k!==-1){k.children("a.jstree-loading").removeClass("jstree-loading");
k.removeData("jstree_is_loading");
if(j.correct_state){this.correct_state(k);
if(g){g.call(this)
}}}else{if(j.correct_state){this.get_container().children("ul").empty();
if(g){g.call(this)
}}}}}},this))
};
j.ajax.context=this;
j.ajax.error=h;
j.ajax.success=l;
if(!j.ajax.dataType){j.ajax.dataType="xml"
}if(f.isFunction(j.ajax.url)){j.ajax.url=j.ajax.url.call(this,k)
}if(f.isFunction(j.ajax.data)){j.ajax.data=j.ajax.data.call(this,k)
}f.ajax(j.ajax);
break
}},parse_xml:function(g,i){var h=this._get_settings().xml_data;
f.vakata.xslt(g,e[h.xsl],i)
},get_xml:function(o,l,i,g,q){var t="",r=this._get_settings(),m=this,k,j,p,n,h;
if(!o){o="flat"
}if(!q){q=0
}l=this._get_node(l);
if(!l||l===-1){l=this.get_container().find("> ul > li")
}i=f.isArray(i)?i:["id","class"];
if(!q&&this.data.types&&f.inArray(r.types.type_attr,i)===-1){i.push(r.types.type_attr)
}g=f.isArray(g)?g:[];
if(!q){if(r.xml_data.get_include_preamble){t+='<?xml version="1.0" encoding="UTF-8"?>'
}t+="<root>"
}l.each(function(){t+="<item";
p=f(this);
f.each(i,function(w,s){var u=p.attr(s);
if(!r.xml_data.get_skip_empty||typeof u!=="undefined"){t+=" "+s+'="'+d((" "+(u||"")).replace(/ jstree[^ ]*/ig,"").replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,""))+'"'
}});
if(p.hasClass("jstree-open")){t+=' state="open"'
}if(p.hasClass("jstree-closed")){t+=' state="closed"'
}if(o==="flat"){t+=' parent_id="'+d(q)+'"'
}t+=">";
t+="<content>";
n=p.children("a");
n.each(function(){k=f(this);
h=false;
t+="<name";
if(f.inArray("languages",r.plugins)!==-1){f.each(r.languages,function(s,u){if(k.hasClass(u)){t+=' lang="'+d(u)+'"';
h=u;
return false
}})
}if(g.length){f.each(g,function(s,v){var u=k.attr(v);
if(!r.xml_data.get_skip_empty||typeof u!=="undefined"){t+=" "+v+'="'+d((" "+u||"").replace(/ jstree[^ ]*/ig,"").replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,""))+'"'
}})
}if(k.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"").length){t+=' icon="'+d(k.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,""))+'"'
}if(k.children("ins").get(0).style.backgroundImage.length){t+=' icon="'+d(k.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","").replace(/'/ig,"").replace(/"/ig,""))+'"'
}t+=">";
t+="<![CDATA["+m.get_text(k,h)+"]]>";
t+="</name>"
});
t+="</content>";
j=p[0].id||true;
p=p.find("> ul > li");
if(p.length){j=m.get_xml(o,p,i,g,j)
}else{j=""
}if(o=="nest"){t+=j
}t+="</item>";
if(o=="flat"){t+=j
}});
if(!q){t+="</root>"
}return t
}}})
})(jQuery);
(function(d){if(d().jquery.split(".")[1]>=8){d.expr[":"].jstree_contains=d.expr.createPseudo(function(e){return function(f){return(f.textContent||f.innerText||"").toLowerCase().indexOf(e.toLowerCase())>=0
}
});
d.expr[":"].jstree_title_contains=d.expr.createPseudo(function(e){return function(f){return(f.getAttribute("title")||"").toLowerCase().indexOf(e.toLowerCase())>=0
}
})
}else{d.expr[":"].jstree_contains=function(f,g,e){return(f.textContent||f.innerText||"").toLowerCase().indexOf(e[3].toLowerCase())>=0
};
d.expr[":"].jstree_title_contains=function(f,g,e){return(f.getAttribute("title")||"").toLowerCase().indexOf(e[3].toLowerCase())>=0
}
}d.jstree.plugin("search",{__init:function(){this.data.search.str="";
this.data.search.result=d();
if(this._get_settings().search.show_only_matches){this.get_container().bind("search.jstree",function(g,f){d(this).children("ul").find("li").hide().removeClass("jstree-last");
f.rslt.nodes.parentsUntil(".jstree").addBack().show().filter("ul").each(function(){d(this).children("li:visible").eq(-1).addClass("jstree-last")
})
}).bind("clear_search.jstree",function(){d(this).children("ul").find("li").css("display","").end().end().jstree("clean_node",-1)
})
}},defaults:{ajax:false,search_method:"jstree_contains",show_only_matches:false},_fn:{search:function(j,e){if(d.trim(j)===""){this.clear_search();
return
}var h=this.get_settings().search,g=this,f=function(){},i=function(){};
this.data.search.str=j;
if(!e&&h.ajax!==false&&this.get_container_ul().find("li.jstree-closed:not(:has(ul)):eq(0)").length>0){this.search.supress_callback=true;
f=function(){};
i=function(n,l,k){var m=this.get_settings().search.ajax.success;
if(m){n=m.call(this,n,l,k)||n
}this.data.search.to_open=n;
this._search_open()
};
h.ajax.context=this;
h.ajax.error=f;
h.ajax.success=i;
if(d.isFunction(h.ajax.url)){h.ajax.url=h.ajax.url.call(this,j)
}if(d.isFunction(h.ajax.data)){h.ajax.data=h.ajax.data.call(this,j)
}if(!h.ajax.data){h.ajax.data={search_string:j}
}if(!h.ajax.dataType||/^json/.exec(h.ajax.dataType)){h.ajax.dataType="json"
}d.ajax(h.ajax);
return
}if(this.data.search.result.length){this.clear_search()
}this.data.search.result=this.get_container().find("a"+(this.data.languages?"."+this.get_lang():"")+":"+(h.search_method)+"("+this.data.search.str+")");
this.data.search.result.css("width","95%");
this.data.search.result.addClass("jstree-search").parent().parents(".jstree-closed").each(function(){g.open_node(this,false,true)
});
this.__callback({nodes:this.data.search.result,str:j})
},clear_search:function(e){this.data.search.result.removeClass("jstree-search");
this.__callback(this.data.search.result);
this.data.search.result=d()
},_search_open:function(f){var i=this,e=true,h=[],g=[];
if(this.data.search.to_open.length){d.each(this.data.search.to_open,function(j,k){if(k=="#"){return true
}if(d(k).length&&d(k).is(".jstree-closed")){h.push(k)
}else{g.push(k)
}});
if(h.length){this.data.search.to_open=g;
d.each(h,function(j,k){i.open_node(k,function(){i._search_open(true)
})
});
e=false
}}if(e){this.search(this.data.search.str,true)
}}}})
})(jQuery);
(function(d){d.vakata.context={hide_on_mouseleave:false,cnt:d("<div id='vakata-contextmenu' />"),vis:false,tgt:false,par:false,func:false,data:false,rtl:false,show:function(o,n,l,j,i,e,k){d.vakata.context.rtl=!!k;
var g=d.vakata.context.parse(o),f,m;
if(!g){return
}d.vakata.context.vis=true;
d.vakata.context.tgt=n;
d.vakata.context.par=e||n||null;
d.vakata.context.data=i||null;
d.vakata.context.cnt.html(g).css({visibility:"hidden",display:"block",left:0,top:0});
if(d.vakata.context.hide_on_mouseleave){d.vakata.context.cnt.one("mouseleave",function(h){d.vakata.context.hide()
})
}f=d.vakata.context.cnt.height();
m=d.vakata.context.cnt.width();
if(l+m>d(document).width()){l=d(document).width()-(m+5);
d.vakata.context.cnt.find("li > ul").addClass("right")
}if(j+f>d(document).height()){j=j-(f+n[0].offsetHeight);
d.vakata.context.cnt.find("li > ul").addClass("bottom")
}d.vakata.context.cnt.css({left:l,top:j}).find("li:has(ul)").bind("mouseenter",function(s){var p=d(document).width(),r=d(document).height(),q=d(this).children("ul").show();
if(p!==d(document).width()){q.toggleClass("right")
}if(r!==d(document).height()){q.toggleClass("bottom")
}}).bind("mouseleave",function(h){d(this).children("ul").hide()
}).end().css({visibility:"visible"}).show();
d(document).triggerHandler("context_show.vakata")
},hide:function(){d.vakata.context.vis=false;
d.vakata.context.cnt.attr("class","").css({visibility:"hidden"});
d(document).triggerHandler("context_hide.vakata")
},parse:function(h,g){if(!h){return false
}var i="",f=false,e=true;
if(!g){d.vakata.context.func={}
}i+="<ul>";
d.each(h,function(j,k){if(!k){return true
}d.vakata.context.func[j]=k.action;
if(!e&&k.separator_before){i+="<li class='vakata-separator vakata-separator-before'></li>"
}e=false;
i+="<li class='"+(k._class||"")+(k._disabled?" jstree-contextmenu-disabled ":"")+"'><ins ";
if(k.icon&&k.icon.indexOf("/")===-1){i+=" class='"+k.icon+"' "
}if(k.icon&&k.icon.indexOf("/")!==-1){i+=" style='background:url("+k.icon+") center center no-repeat;' "
}i+=">&#160;</ins><a href='#' rel='"+j+"'>";
if(k.submenu){i+="<span style='float:"+(d.vakata.context.rtl?"left":"right")+";'>&raquo;</span>"
}i+=k.label+"</a>";
if(k.submenu){f=d.vakata.context.parse(k.submenu,true);
if(f){i+=f
}}i+="</li>";
if(k.separator_after){i+="<li class='vakata-separator vakata-separator-after'></li>";
e=true
}});
i=i.replace(/<li class\='vakata-separator vakata-separator-after'\><\/li\>$/,"");
i+="</ul>";
d(document).triggerHandler("context_parse.vakata");
return i.length>10?i:false
},exec:function(e){if(d.isFunction(d.vakata.context.func[e])){d.vakata.context.func[e].call(d.vakata.context.data,d.vakata.context.par);
return true
}else{return false
}}};
d(function(){var e="#vakata-contextmenu { display:block; visibility:hidden; left:0; top:-200px; position:absolute; margin:0; padding:0; min-width:180px; background:#ebebeb; border:1px solid silver; z-index:10000; *width:180px; } #vakata-contextmenu ul { min-width:180px; *width:180px; } #vakata-contextmenu ul, #vakata-contextmenu li { margin:0; padding:0; list-style-type:none; display:block; } #vakata-contextmenu li { line-height:20px; min-height:20px; position:relative; padding:0px; } #vakata-contextmenu li a { padding:1px 6px; line-height:17px; display:block; text-decoration:none; margin:1px 1px 0 1px; } #vakata-contextmenu li ins { float:left; width:16px; height:16px; text-decoration:none; margin-right:2px; } #vakata-contextmenu li a:hover, #vakata-contextmenu li.vakata-hover > a { background:gray; color:white; } #vakata-contextmenu li ul { display:none; position:absolute; top:-2px; left:100%; background:#ebebeb; border:1px solid gray; } #vakata-contextmenu .right { right:100%; left:auto; } #vakata-contextmenu .bottom { bottom:-1px; top:auto; } #vakata-contextmenu li.vakata-separator { min-height:0; height:1px; line-height:1px; font-size:1px; overflow:hidden; margin:0 2px; background:silver; /* border-top:1px solid #fefefe; */ padding:0; } ";
d.vakata.css.add_sheet({str:e,title:"vakata"});
d.vakata.context.cnt.delegate("a","click",function(f){f.preventDefault()
}).delegate("a","mouseup",function(f){if(!d(this).parent().hasClass("jstree-contextmenu-disabled")&&d.vakata.context.exec(d(this).attr("rel"))){d.vakata.context.hide()
}else{d(this).blur()
}}).delegate("a","mouseover",function(){d.vakata.context.cnt.find(".vakata-hover").removeClass("vakata-hover")
}).appendTo("body");
d(document).bind("mousedown",function(f){if(d.vakata.context.vis&&!d.contains(d.vakata.context.cnt[0],f.target)){d.vakata.context.hide()
}});
if(typeof d.hotkeys!=="undefined"){d(document).bind("keydown","up",function(f){if(d.vakata.context.vis){var g=d.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").prevAll("li:not(.vakata-separator)").first();
if(!g.length){g=d.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").last()
}g.addClass("vakata-hover");
f.stopImmediatePropagation();
f.preventDefault()
}}).bind("keydown","down",function(f){if(d.vakata.context.vis){var g=d.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").nextAll("li:not(.vakata-separator)").first();
if(!g.length){g=d.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").first()
}g.addClass("vakata-hover");
f.stopImmediatePropagation();
f.preventDefault()
}}).bind("keydown","right",function(f){if(d.vakata.context.vis){d.vakata.context.cnt.find(".vakata-hover").children("ul").show().children("li:not(.vakata-separator)").removeClass("vakata-hover").first().addClass("vakata-hover");
f.stopImmediatePropagation();
f.preventDefault()
}}).bind("keydown","left",function(f){if(d.vakata.context.vis){d.vakata.context.cnt.find(".vakata-hover").children("ul").hide().children(".vakata-separator").removeClass("vakata-hover");
f.stopImmediatePropagation();
f.preventDefault()
}}).bind("keydown","esc",function(f){d.vakata.context.hide();
f.preventDefault()
}).bind("keydown","space",function(f){d.vakata.context.cnt.find(".vakata-hover").last().children("a").click();
f.preventDefault()
})
}});
d.jstree.plugin("contextmenu",{__init:function(){this.get_container().delegate("a","contextmenu.jstree",d.proxy(function(f){f.preventDefault();
if(!d(f.currentTarget).hasClass("jstree-loading")){this.show_contextmenu(f.currentTarget,f.pageX,f.pageY)
}},this)).delegate("a","click.jstree",d.proxy(function(f){if(this.data.contextmenu){d.vakata.context.hide()
}},this)).bind("destroy.jstree",d.proxy(function(){if(this.data.contextmenu){d.vakata.context.hide()
}},this));
d(document).bind("context_hide.vakata",d.proxy(function(){this.data.contextmenu=false
},this))
},defaults:{select_node:false,show_at_node:true,items:{create:{separator_before:false,separator_after:true,label:"Create",action:function(e){this.create(e)
}},rename:{separator_before:false,separator_after:false,label:"Rename",action:function(e){this.rename(e)
}},remove:{separator_before:false,icon:false,separator_after:false,label:"Delete",action:function(e){if(this.is_selected(e)){this.remove()
}else{this.remove(e)
}}},ccp:{separator_before:true,icon:false,separator_after:false,label:"Edit",action:false,submenu:{cut:{separator_before:false,separator_after:false,label:"Cut",action:function(e){this.cut(e)
}},copy:{separator_before:false,icon:false,separator_after:false,label:"Copy",action:function(e){this.copy(e)
}},paste:{separator_before:false,icon:false,separator_after:false,label:"Paste",action:function(e){this.paste(e)
}}}}}},_fn:{show_contextmenu:function(j,e,l){j=this._get_node(j);
var h=this.get_settings().contextmenu,f=j.children("a:visible:eq(0)"),k=false,g=false;
if(h.select_node&&this.data.ui&&!this.is_selected(j)){this.deselect_all();
this.select_node(j,true)
}if(h.show_at_node||typeof e==="undefined"||typeof l==="undefined"){k=f.offset();
e=k.left;
l=k.top+this.data.core.li_height
}g=j.data("jstree")&&j.data("jstree").contextmenu?j.data("jstree").contextmenu:h.items;
if(d.isFunction(g)){g=g.call(this,j)
}this.data.contextmenu=true;
d.vakata.context.show(g,f,e,l,this,j,this._get_settings().core.rtl);
if(this.data.themes){d.vakata.context.cnt.attr("class","jstree-"+this.data.themes.theme+"-context")
}}}})
})(jQuery);
(function(d){d.jstree.plugin("types",{__init:function(){var e=this._get_settings().types;
this.data.types.attach_to=[];
this.get_container().bind("init.jstree",d.proxy(function(){var h=e.types,g=e.type_attr,f="",i=this;
d.each(h,function(j,k){d.each(k,function(m,l){if(!/^(max_depth|max_children|icon|valid_children)$/.test(m)){i.data.types.attach_to.push(m)
}});
if(!k.icon){return true
}if(k.icon.image||k.icon.position){if(j=="default"){f+=".jstree-"+i.get_index()+" a > .jstree-icon { "
}else{f+=".jstree-"+i.get_index()+" li["+g+'="'+j+'"] > a > .jstree-icon { '
}if(k.icon.image){f+=" background-image:url("+k.icon.image+"); "
}if(k.icon.position){f+=" background-position:"+k.icon.position+"; "
}else{f+=" background-position:0 0; "
}f+="} "
}});
if(f!==""){d.vakata.css.add_sheet({str:f,title:"jstree-types"})
}},this)).bind("before.jstree",d.proxy(function(i,h){var g,f,k=this._get_settings().types.use_data?this._get_node(h.args[0]):false,j=k&&k!==-1&&k.length?k.data("jstree"):false;
if(j&&j.types&&j.types[h.func]===false){i.stopImmediatePropagation();
return false
}if(d.inArray(h.func,this.data.types.attach_to)!==-1){if(!h.args[0]||(!h.args[0].tagName&&!h.args[0].jquery)){return
}g=this._get_settings().types.types;
f=this._get_type(h.args[0]);
if(((g[f]&&typeof g[f][h.func]!=="undefined")||(g["default"]&&typeof g["default"][h.func]!=="undefined"))&&this._check(h.func,h.args[0])===false){i.stopImmediatePropagation();
return false
}}},this));
if(c){this.get_container().bind("load_node.jstree set_type.jstree",d.proxy(function(i,h){var g=h&&h.rslt&&h.rslt.obj&&h.rslt.obj!==-1?this._get_node(h.rslt.obj).parent():this.get_container_ul(),j=false,f=this._get_settings().types;
d.each(f.types,function(k,l){if(l.icon&&(l.icon.image||l.icon.position)){j=k==="default"?g.find("li > a > .jstree-icon"):g.find("li["+f.type_attr+"='"+k+"'] > a > .jstree-icon");
if(l.icon.image){j.css("backgroundImage","url("+l.icon.image+")")
}j.css("backgroundPosition",l.icon.position||"0 0")
}})
},this))
}},defaults:{max_children:-1,max_depth:-1,valid_children:"all",use_data:false,type_attr:"rel",types:{"default":{max_children:-1,max_depth:-1,valid_children:"all"}}},_fn:{_types_notify:function(f,e){if(e.type&&this._get_settings().types.use_data){this.set_type(e.type,f)
}},_get_type:function(e){e=this._get_node(e);
return(!e||!e.length)?false:e.attr(this._get_settings().types.type_attr)||"default"
},set_type:function(g,f){f=this._get_node(f);
var e=(!f.length||!g)?false:f.attr(this._get_settings().types.type_attr,g);
if(e){this.__callback({obj:f,type:g})
}return e
},_check:function(j,g,e){g=this._get_node(g);
var k=false,l=this._get_type(g),i=0,h=this,m=this._get_settings().types,f=false;
if(g===-1){if(!!m[j]){k=m[j]
}else{return
}}else{if(l===false){return
}f=m.use_data?g.data("jstree"):false;
if(f&&f.types&&typeof f.types[j]!=="undefined"){k=f.types[j]
}else{if(!!m.types[l]&&typeof m.types[l][j]!=="undefined"){k=m.types[l][j]
}else{if(!!m.types["default"]&&typeof m.types["default"][j]!=="undefined"){k=m.types["default"][j]
}}}}if(d.isFunction(k)){k=k.call(this,g)
}if(j==="max_depth"&&g!==-1&&e!==false&&m.max_depth!==-2&&k!==0){g.children("a:eq(0)").parentsUntil(".jstree","li").each(function(n){if(m.max_depth!==-1&&m.max_depth-(n+1)<=0){k=0;
return false
}i=(n===0)?k:h._check(j,this,false);
if(i!==-1&&i-(n+1)<=0){k=0;
return false
}if(i>=0&&(i-(n+1)<k||k<0)){k=i-(n+1)
}if(m.max_depth>=0&&(m.max_depth-(n+1)<k||k<0)){k=m.max_depth-(n+1)
}})
}return k
},check_move:function(){if(!this.__call_old()){return false
}var e=this._get_move(),i=e.rt._get_settings().types,k=e.rt._check("max_children",e.cr),j=e.rt._check("max_depth",e.cr),g=e.rt._check("valid_children",e.cr),h=0,l=1,f;
if(g==="none"){return false
}if(d.isArray(g)&&e.ot&&e.ot._get_type){e.o.each(function(){if(d.inArray(e.ot._get_type(this),g)===-1){l=false;
return false
}});
if(l===false){return false
}}if(i.max_children!==-2&&k!==-1){h=e.cr===-1?this.get_container().find("> ul > li").not(e.o).length:e.cr.find("> ul > li").not(e.o).length;
if(h+e.o.length>k){return false
}}if(i.max_depth!==-2&&j!==-1){l=0;
if(j===0){return false
}if(typeof e.o.d==="undefined"){f=e.o;
while(f.length>0){f=f.find("> ul > li");
l++
}e.o.d=l
}if(j-e.o.d<0){return false
}}return true
},create_node:function(h,i,f,o,k,n){if(!n&&(k||this._is_loaded(h))){var g=(typeof i=="string"&&i.match(/^before|after$/i)&&h!==-1)?this._get_parent(h):this._get_node(h),q=this._get_settings().types,m=this._check("max_children",g),l=this._check("max_depth",g),j=this._check("valid_children",g),e;
if(typeof f==="string"){f={data:f}
}if(!f){f={}
}if(j==="none"){return false
}if(d.isArray(j)){if(!f.attr||!f.attr[q.type_attr]){if(!f.attr){f.attr={}
}f.attr[q.type_attr]=j[0]
}else{if(d.inArray(f.attr[q.type_attr],j)===-1){return false
}}}if(q.max_children!==-2&&m!==-1){e=g===-1?this.get_container().find("> ul > li").length:g.find("> ul > li").length;
if(e+1>m){return false
}}if(q.max_depth!==-2&&l!==-1&&(l-1)<0){return false
}}return this.__call_old(true,h,i,f,o,k,n)
}}})
})(jQuery);
(function(d){d.jstree.plugin("html_data",{__init:function(){this.data.html_data.original_container_html=this.get_container().find(" > ul > li").clone(true);
this.data.html_data.original_container_html.find("li").addBack().contents().filter(function(){return this.nodeType==3
}).remove()
},defaults:{data:false,ajax:false,correct_state:true},_fn:{load_node:function(g,e,f){var h=this;
this.load_node_html(g,function(){h.__callback({obj:h._get_node(g)});
e.call(this)
},f)
},_is_loaded:function(e){e=this._get_node(e);
return e==-1||!e||(!this._get_settings().html_data.ajax&&!d.isFunction(this._get_settings().html_data.data))||e.is(".jstree-open, .jstree-leaf")||e.children("ul").children("li").size()>0
},load_node_html:function(i,e,g){var k,h=this.get_settings().html_data,f=function(){},j=function(){};
i=this._get_node(i);
if(i&&i!==-1){if(i.data("jstree_is_loading")){return
}else{i.data("jstree_is_loading",true)
}}switch(!0){case (d.isFunction(h.data)):h.data.call(this,i,d.proxy(function(l){if(l&&l!==""&&l.toString&&l.toString().replace(/^[\s\n]+$/,"")!==""){l=d(l);
if(!l.is("ul")){l=d("<ul />").append(l)
}if(i==-1||!i){this.get_container().children("ul").empty().append(l.children()).find("li, a").filter(function(){return !this.firstChild||!this.firstChild.tagName||this.firstChild.tagName!=="INS"
}).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon")
}else{i.children("a.jstree-loading").removeClass("jstree-loading");
i.append(l).children("ul").find("li, a").filter(function(){return !this.firstChild||!this.firstChild.tagName||this.firstChild.tagName!=="INS"
}).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
i.removeData("jstree_is_loading")
}this.clean_node(i);
if(e){e.call(this)
}}else{if(i&&i!==-1){i.children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading");
if(h.correct_state){this.correct_state(i);
if(e){e.call(this)
}}}else{if(h.correct_state){this.get_container().children("ul").empty();
if(e){e.call(this)
}}}}},this));
break;
case (!h.data&&!h.ajax):if(!i||i==-1){this.get_container().children("ul").empty().append(this.data.html_data.original_container_html).find("li, a").filter(function(){return !this.firstChild||!this.firstChild.tagName||this.firstChild.tagName!=="INS"
}).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
this.clean_node()
}if(e){e.call(this)
}break;
case (!!h.data&&!h.ajax)||(!!h.data&&!!h.ajax&&(!i||i===-1)):if(!i||i==-1){k=d(h.data);
if(!k.is("ul")){k=d("<ul />").append(k)
}this.get_container().children("ul").empty().append(k.children()).find("li, a").filter(function(){return !this.firstChild||!this.firstChild.tagName||this.firstChild.tagName!=="INS"
}).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
this.clean_node()
}if(e){e.call(this)
}break;
case (!h.data&&!!h.ajax)||(!!h.data&&!!h.ajax&&i&&i!==-1):i=this._get_node(i);
f=function(m,n,o){var l=this.get_settings().html_data.ajax.error;
if(l){l.call(this,m,n,o)
}if(i!=-1&&i.length){i.children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading");
if(n==="success"&&h.correct_state){this.correct_state(i)
}}else{if(n==="success"&&h.correct_state){this.get_container().children("ul").empty()
}}if(g){g.call(this)
}};
j=function(o,m,l){var n=this.get_settings().html_data.ajax.success;
if(n){o=n.call(this,o,m,l)||o
}if(o===""||(o&&o.toString&&o.toString().replace(/^[\s\n]+$/,"")==="")){return f.call(this,l,m,"")
}if(o){o=d(o);
if(!o.is("ul")){o=d("<ul />").append(o)
}if(i==-1||!i){this.get_container().children("ul").empty().append(o.children()).find("li, a").filter(function(){return !this.firstChild||!this.firstChild.tagName||this.firstChild.tagName!=="INS"
}).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon")
}else{i.children("a.jstree-loading").removeClass("jstree-loading");
i.append(o).children("ul").find("li, a").filter(function(){return !this.firstChild||!this.firstChild.tagName||this.firstChild.tagName!=="INS"
}).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
i.removeData("jstree_is_loading")
}this.clean_node(i);
if(e){e.call(this)
}}else{if(i&&i!==-1){i.children("a.jstree-loading").removeClass("jstree-loading");
i.removeData("jstree_is_loading");
if(h.correct_state){this.correct_state(i);
if(e){e.call(this)
}}}else{if(h.correct_state){this.get_container().children("ul").empty();
if(e){e.call(this)
}}}}};
h.ajax.context=this;
h.ajax.error=f;
h.ajax.success=j;
if(!h.ajax.dataType){h.ajax.dataType="html"
}if(d.isFunction(h.ajax.url)){h.ajax.url=h.ajax.url.call(this,i)
}if(d.isFunction(h.ajax.data)){h.ajax.data=h.ajax.data.call(this,i)
}d.ajax(h.ajax);
break
}}}});
d.jstree.defaults.plugins.push("html_data")
})(jQuery);
(function(d){d.jstree.plugin("themeroller",{__init:function(){var e=this._get_settings().themeroller;
this.get_container().addClass("ui-widget-content").addClass("jstree-themeroller").delegate("a","mouseenter.jstree",function(f){if(!d(f.currentTarget).hasClass("jstree-loading")){d(this).addClass(e.item_h)
}}).delegate("a","mouseleave.jstree",function(){d(this).removeClass(e.item_h)
}).bind("init.jstree",d.proxy(function(g,f){f.inst.get_container().find("> ul > li > .jstree-loading > ins").addClass("ui-icon-refresh");
this._themeroller(f.inst.get_container().find("> ul > li"))
},this)).bind("open_node.jstree create_node.jstree",d.proxy(function(g,f){this._themeroller(f.rslt.obj)
},this)).bind("loaded.jstree refresh.jstree",d.proxy(function(f){this._themeroller()
},this)).bind("close_node.jstree",d.proxy(function(g,f){this._themeroller(f.rslt.obj)
},this)).bind("delete_node.jstree",d.proxy(function(g,f){this._themeroller(f.rslt.parent)
},this)).bind("correct_state.jstree",d.proxy(function(g,f){f.rslt.obj.children("ins.jstree-icon").removeClass(e.opened+" "+e.closed+" ui-icon").end().find("> a > ins.ui-icon").filter(function(){return this.className.toString().replace(e.item_clsd,"").replace(e.item_open,"").replace(e.item_leaf,"").indexOf("ui-icon-")===-1
}).removeClass(e.item_open+" "+e.item_clsd).addClass(e.item_leaf||"jstree-no-icon")
},this)).bind("select_node.jstree",d.proxy(function(g,f){f.rslt.obj.children("a").addClass(e.item_a)
},this)).bind("deselect_node.jstree deselect_all.jstree",d.proxy(function(g,f){this.get_container().find("a."+e.item_a).removeClass(e.item_a).end().find("a.jstree-clicked").addClass(e.item_a)
},this)).bind("dehover_node.jstree",d.proxy(function(g,f){f.rslt.obj.children("a").removeClass(e.item_h)
},this)).bind("hover_node.jstree",d.proxy(function(g,f){this.get_container().find("a."+e.item_h).not(f.rslt.obj).removeClass(e.item_h);
f.rslt.obj.children("a").addClass(e.item_h)
},this)).bind("move_node.jstree",d.proxy(function(g,f){this._themeroller(f.rslt.o);
this._themeroller(f.rslt.op)
},this))
},__destroy:function(){var e=this._get_settings().themeroller,f=["ui-icon"];
d.each(e,function(h,g){g=g.split(" ");
if(g.length){f=f.concat(g)
}});
this.get_container().removeClass("ui-widget-content").find("."+f.join(", .")).removeClass(f.join(" "))
},_fn:{_themeroller:function(f){var e=this._get_settings().themeroller;
f=(!f||f==-1)?this.get_container_ul():this._get_node(f);
f=(!f||f==-1)?this.get_container_ul():f.parent();
f.find("li.jstree-closed").children("ins.jstree-icon").removeClass(e.opened).addClass("ui-icon "+e.closed).end().children("a").addClass(e.item).children("ins.jstree-icon").addClass("ui-icon").filter(function(){return this.className.toString().replace(e.item_clsd,"").replace(e.item_open,"").replace(e.item_leaf,"").indexOf("ui-icon-")===-1
}).removeClass(e.item_leaf+" "+e.item_open).addClass(e.item_clsd||"jstree-no-icon").end().end().end().end().find("li.jstree-open").children("ins.jstree-icon").removeClass(e.closed).addClass("ui-icon "+e.opened).end().children("a").addClass(e.item).children("ins.jstree-icon").addClass("ui-icon").filter(function(){return this.className.toString().replace(e.item_clsd,"").replace(e.item_open,"").replace(e.item_leaf,"").indexOf("ui-icon-")===-1
}).removeClass(e.item_leaf+" "+e.item_clsd).addClass(e.item_open||"jstree-no-icon").end().end().end().end().find("li.jstree-leaf").children("ins.jstree-icon").removeClass(e.closed+" ui-icon "+e.opened).end().children("a").addClass(e.item).children("ins.jstree-icon").addClass("ui-icon").filter(function(){return this.className.toString().replace(e.item_clsd,"").replace(e.item_open,"").replace(e.item_leaf,"").indexOf("ui-icon-")===-1
}).removeClass(e.item_clsd+" "+e.item_open).addClass(e.item_leaf||"jstree-no-icon")
}},defaults:{opened:"ui-icon-triangle-1-se",closed:"ui-icon-triangle-1-e",item:"ui-state-default",item_h:"ui-state-hover",item_a:"ui-state-active",item_open:"ui-icon-folder-open",item_clsd:"ui-icon-folder-collapsed",item_leaf:"ui-icon-document"}});
d(function(){var e=".jstree-themeroller .ui-icon { overflow:visible; } .jstree-themeroller a { padding:0 2px; } .jstree-themeroller .jstree-no-icon { display:none; }";
d.vakata.css.add_sheet({str:e,title:"jstree"})
})
})(jQuery);
(function(d){d.jstree.plugin("unique",{__init:function(){this.get_container().bind("before.jstree",d.proxy(function(k,i){var f=[],h=true,j,g;
if(i.func=="move_node"){if(i.args[4]===true){if(i.args[0].o&&i.args[0].o.length){i.args[0].o.children("a").each(function(){f.push(d(this).text().replace(/^\s+/g,""))
});
h=this._check_unique(f,i.args[0].np.find("> ul > li").not(i.args[0].o),"move_node")
}}}if(i.func=="create_node"){if(i.args[4]||this._is_loaded(i.args[0])){j=this._get_node(i.args[0]);
if(i.args[1]&&(i.args[1]==="before"||i.args[1]==="after")){j=this._get_parent(i.args[0]);
if(!j||j===-1){j=this.get_container()
}}if(typeof i.args[2]==="string"){f.push(i.args[2])
}else{if(!i.args[2]||!i.args[2].data){f.push(this._get_string("new_node"))
}else{f.push(i.args[2].data)
}}h=this._check_unique(f,j.find("> ul > li"),"create_node")
}}if(i.func=="rename_node"){f.push(i.args[1]);
g=this._get_node(i.args[0]);
j=this._get_parent(g);
if(!j||j===-1){j=this.get_container()
}h=this._check_unique(f,j.find("> ul > li").not(g),"rename_node")
}if(!h){k.stopPropagation();
return false
}},this))
},defaults:{error_callback:d.noop},_fn:{_check_unique:function(f,i,h){var e=[],g=true;
i.children("a").each(function(){e.push(d(this).text().replace(/^\s+/g,""))
});
if(!e.length||!f.length){return true
}d.each(f,function(k,j){if(d.inArray(j,e)!==-1){g=false;
return false
}});
if(!g){this._get_settings().unique.error_callback.call(null,f,i,h)
}return g
},check_move:function(){if(!this.__call_old()){return false
}var f=this._get_move(),e=[];
if(f.o&&f.o.length){f.o.children("a").each(function(){e.push(d(this).text().replace(/^\s+/g,""))
});
return this._check_unique(e,f.np.find("> ul > li").not(f.o),"check_move")
}return true
}}})
})(jQuery);
(function(d){d.jstree.plugin("wholerow",{__init:function(){if(!this.data.ui){throw"jsTree wholerow: jsTree UI plugin not included."
}this.data.wholerow.html=false;
this.data.wholerow.to=false;
this.get_container().bind("init.jstree",d.proxy(function(g,f){this._get_settings().core.animation=0
},this)).bind("open_node.jstree create_node.jstree clean_node.jstree loaded.jstree",d.proxy(function(g,f){this._prepare_wholerow_span(f&&f.rslt&&f.rslt.obj?f.rslt.obj:-1)
},this)).bind("search.jstree clear_search.jstree reopen.jstree after_open.jstree after_close.jstree create_node.jstree delete_node.jstree clean_node.jstree",d.proxy(function(g,f){if(this.data.to){clearTimeout(this.data.to)
}this.data.to=setTimeout((function(e,h){return function(){e._prepare_wholerow_ul(h)
}
})(this,f&&f.rslt&&f.rslt.obj?f.rslt.obj:-1),0)
},this)).bind("deselect_all.jstree",d.proxy(function(g,f){this.get_container().find(" > .jstree-wholerow .jstree-clicked").removeClass("jstree-clicked "+(this.data.themeroller?this._get_settings().themeroller.item_a:""))
},this)).bind("select_node.jstree deselect_node.jstree ",d.proxy(function(g,f){f.rslt.obj.each(function(){var e=f.inst.get_container().find(" > .jstree-wholerow li:visible:eq("+(parseInt(((d(this).offset().top-f.inst.get_container().offset().top+f.inst.get_container()[0].scrollTop)/f.inst.data.core.li_height),10))+")");
e.children("a").attr("class",f.rslt.obj.children("a").attr("class"))
})
},this)).bind("hover_node.jstree dehover_node.jstree",d.proxy(function(h,g){this.get_container().find(" > .jstree-wholerow .jstree-hovered").removeClass("jstree-hovered "+(this.data.themeroller?this._get_settings().themeroller.item_h:""));
if(h.type==="hover_node"){var f=this.get_container().find(" > .jstree-wholerow li:visible:eq("+(parseInt(((g.rslt.obj.offset().top-this.get_container().offset().top+this.get_container()[0].scrollTop)/this.data.core.li_height),10))+")");
f.children("a").attr("class",g.rslt.obj.children(".jstree-hovered").attr("class"))
}},this)).delegate(".jstree-wholerow-span, ins.jstree-icon, li","click.jstree",function(f){var g=d(f.currentTarget);
if(f.target.tagName==="A"||(f.target.tagName==="INS"&&g.closest("li").is(".jstree-open, .jstree-closed"))){return
}g.closest("li").children("a:visible:eq(0)").click();
f.stopImmediatePropagation()
}).delegate("li","mouseover.jstree",d.proxy(function(f){f.stopImmediatePropagation();
if(d(f.currentTarget).children(".jstree-hovered, .jstree-clicked").length){return false
}this.hover_node(f.currentTarget);
return false
},this)).delegate("li","mouseleave.jstree",d.proxy(function(f){if(d(f.currentTarget).children("a").hasClass("jstree-hovered").length){return
}this.dehover_node(f.currentTarget)
},this));
if(b||c){d.vakata.css.add_sheet({str:".jstree-"+this.get_index()+" { position:relative; } ",title:"jstree"})
}},defaults:{},__destroy:function(){this.get_container().children(".jstree-wholerow").remove();
this.get_container().find(".jstree-wholerow-span").remove()
},_fn:{_prepare_wholerow_span:function(e){e=!e||e==-1?this.get_container().find("> ul > li"):this._get_node(e);
if(e===false){return
}e.each(function(){d(this).find("li").addBack().each(function(){var f=d(this);
if(f.children(".jstree-wholerow-span").length){return true
}f.prepend("<span class='jstree-wholerow-span' style='width:"+(f.parentsUntil(".jstree","li").length*18)+"px;'>&#160;</span>")
})
})
},_prepare_wholerow_ul:function(){var f=this.get_container().children("ul").eq(0),e=f.html();
f.addClass("jstree-wholerow-real");
if(this.data.wholerow.last_html!==e){this.data.wholerow.last_html=e;
this.get_container().children(".jstree-wholerow").remove();
this.get_container().append(f.clone().removeClass("jstree-wholerow-real").wrapAll("<div class='jstree-wholerow' />").parent().width(f.parent()[0].scrollWidth).css("top",(f.height()+(b?5:0))*-1).find("li[id]").each(function(){this.removeAttribute("id")
}).end())
}}}});
d(function(){var e=".jstree .jstree-wholerow-real { position:relative; z-index:1; } .jstree .jstree-wholerow-real li { cursor:pointer; } .jstree .jstree-wholerow-real a { border-left-color:transparent !important; border-right-color:transparent !important; } .jstree .jstree-wholerow { position:relative; z-index:0; height:0; } .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { width:100%; } .jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li, .jstree .jstree-wholerow a { margin:0 !important; padding:0 !important; } .jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { background:transparent !important; }.jstree .jstree-wholerow ins, .jstree .jstree-wholerow span, .jstree .jstree-wholerow input { display:none !important; }.jstree .jstree-wholerow a, .jstree .jstree-wholerow a:hover { text-indent:-9999px; !important; width:100%; padding:0 !important; border-right-width:0px !important; border-left-width:0px !important; } .jstree .jstree-wholerow-span { position:absolute; left:0; margin:0px; padding:0; height:18px; border-width:0; padding:0; z-index:0; }";
if(a){e+=".jstree .jstree-wholerow a { display:block; height:18px; margin:0; padding:0; border:0; } .jstree .jstree-wholerow-real a { border-color:transparent !important; } "
}if(b||c){e+=".jstree .jstree-wholerow, .jstree .jstree-wholerow li, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow a { margin:0; padding:0; line-height:18px; } .jstree .jstree-wholerow a { display:block; height:18px; line-height:18px; overflow:hidden; } "
}d.vakata.css.add_sheet({str:e,title:"jstree"})
})
})(jQuery);
(function(d){var e=["getChildren","getChildrenCount","getAttr","getName","getProps"],f=function(i,g){var h=true;
i=i||{};
g=[].concat(g);
d.each(g,function(k,j){if(!d.isFunction(i[j])){h=false;
return false
}});
return h
};
d.jstree.plugin("model",{__init:function(){if(!this.data.json_data){throw"jsTree model: jsTree json_data plugin not included."
}this._get_settings().json_data.data=function(i,g){var h=(i==-1)?this._get_settings().model.object:i.data("jstree_model");
if(!f(h,e)){return g.call(null,false)
}if(this._get_settings().model.async){h.getChildren(d.proxy(function(j){this.model_done(j,g)
},this))
}else{this.model_done(h.getChildren(),g)
}}
},defaults:{object:false,id_prefix:false,async:false},_fn:{model_done:function(i,k){var g=[],h=this._get_settings(),j=this;
if(!d.isArray(i)){i=[i]
}d.each(i,function(l,n){var m=n.getProps()||{};
m.attr=n.getAttr()||{};
if(n.getChildrenCount()){m.state="closed"
}m.data=n.getName();
if(!d.isArray(m.data)){m.data=[m.data]
}if(j.data.types&&d.isFunction(n.getType)){m.attr[h.types.type_attr]=n.getType()
}if(m.attr.id&&h.model.id_prefix){m.attr.id=h.model.id_prefix+m.attr.id
}if(!m.metadata){m.metadata={}
}m.metadata.jstree_model=n;
g.push(m)
});
k.call(null,g)
}}})
})(jQuery)
})();
/**
 *
 */


requirejs.config({
    //15.0.0 and 492 will be replaced at build
    urlArgs: '_acs.version=15.0.0_492',
    // Path mappings for the logical module names
    paths: {
        'knockout': '/static/scripts/oraclejet/js/libs/knockout/knockout-3.2.0.debug',
        'jquery': '/static/scripts/jquery.min',
//        'jquery': '/static/scripts/oraclejet/js/libs/jquery/jquery-2.1.0',
        'jqueryui-amd': '/static/scripts/oraclejet/js/libs/jquery/jqueryui-amd-1.11.1.min',
//        'jqueryui': '/events/scripts/jquery-ui',
        'ojs': '/static/scripts/oraclejet/js/libs/oj/v1.1.0/debug',
        'ojL10n': '/static/scripts/oraclejet/js/libs/oj/v1.1.0/debug/ojL10n',
        'ojtranslations': '/static/scripts/oraclejet/js/libs/oj/v1.1.0/resources',
        'promise':'/static/scripts/oraclejet/js/libs/es6-promise/promise-1.0.0',
        'acsjet': '/static/scripts/acsjet',
        'ojcore-packed': '/static/scripts/ojcore.packed',
        'text': '/static/scripts/oraclejet/js/libs/require/text',
        'colorpicker': '/static/scripts/colorpicker/jquery.colorPicker.min',
        'bootstrap': '/static/scripts/bootstrap',
        'moment': '/static/scripts/moment.min',
        'datatables': '/static/scripts/datatables-1.10.5/js/jquery.dataTables.min',
        'datetime-moment': '/static/scripts/datatables-1.10.5/js/datetime-moment',
        'jdateformatparser' : '/static/scripts/moment-jdateformatparser.min',
        'numbro' : '/static/scripts/numbro.min'
    },
    // Shim configurations for modules that do not expose AMD
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
//        'jquery.acs': {
//            deps: ['jquery']
//        },
//        'acs.adf': {
//            deps: ['jquery']
//        },
//        'acs.cloud': {
//            deps: ['jquery']
//        },
//        'acs.component': {
//            deps: ['jquery']
//        },
//        'acs.cam': {
//            deps: ['jquery']
//        },
//        'ojs' : {
//            deps: ['jquery.acs', 'acs.adf', 'acs.cloud', 'acs.component', 'acs.cam']
//        },
//        'ojL10n' : {
//            deps: ['jquery.acs', 'acs.adf', 'acs.cloud', 'acs.component', 'acs.cam']
//        },
//        'ojtranslations' : {
//            deps: ['jquery.acs', 'acs.adf', 'acs.cloud', 'acs.component', 'acs.cam']
//        },
        'colorpicker' : {
            deps: ['jquery']
        },
        'datetime-moment' : {
            deps: ['datatables', 'moment']
        },
        'jdateformatparser' : {
            deps: ['jquery', 'moment']
        }
    }
//    map: {
//        'ojs': { 'jquery': 'jquery' },
//        'ojL10n': { 'jquery': 'jquery' },
//        'ojtranslations': { 'jquery': 'jquery' }
//    }
});



