webpackJsonp([1],{"1kKg":function(t,e){},"2v1L":function(t,e){},"9lN1":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("keep-alive",[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"App"},o,!1,function(t){n("t1h5")},null,null).exports,a=n("/ocq"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"Head"},[e("div",{staticClass:"addBtn",on:{click:this.showAddDialog}}),this._v(" "),e("div",{staticClass:"deleteBtn",on:{click:this.toDelete}})])},staticRenderFns:[]};var c=n("VU/8")({data:function(){return{}},methods:{showAddDialog:function(){this.$emit("showAddDialog")},toDelete:function(){this.$emit("toDelete")}}},r,!1,function(t){n("Q/VE")},null,null).exports,u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ContentList"},t._l(t.list,function(e,i){return n("div",{key:i,class:i==t.currentIndex?"check":"uncheck",on:{click:function(n){return t.editContent(e,i)}}},[t._v("\n    "+t._s(e.name)+"\n  ")])}),0)},staticRenderFns:[]};var l=n("VU/8")({props:["list"],data:function(){return{currentPath:"",currentIndex:0}},created:function(){this.editContent(this.list[0],0)},methods:{editContent:function(t,e){this.currentPath=t.path,this.currentIndex=e,this.$emit("editContent",t)}}},u,!1,function(t){n("tFXA")},null,null).exports,d=n("mvHQ"),h=n.n(d),f=n("//Fk"),g=n.n(f),v={Base64:{_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){var e,n,i,o,s,a,r,c="",u=0;for(t=v.Base64._utf8_encode(t);u<t.length;)o=(e=t.charCodeAt(u++))>>2,s=(3&e)<<4|(n=t.charCodeAt(u++))>>4,a=(15&n)<<2|(i=t.charCodeAt(u++))>>6,r=63&i,isNaN(n)?a=r=64:isNaN(i)&&(r=64),c=c+this._keyStr.charAt(o)+this._keyStr.charAt(s)+this._keyStr.charAt(a)+this._keyStr.charAt(r);return c},decode:function(t){var e,n,i,o,s,a,r="",c=0;for(t=t.replace(/[^A-Za-z0-9+/=]/g,"");c<t.length;)e=this._keyStr.indexOf(t.charAt(c++))<<2|(o=this._keyStr.indexOf(t.charAt(c++)))>>4,n=(15&o)<<4|(s=this._keyStr.indexOf(t.charAt(c++)))>>2,i=(3&s)<<6|(a=this._keyStr.indexOf(t.charAt(c++))),r+=String.fromCharCode(e),64!==s&&(r+=String.fromCharCode(n)),64!==a&&(r+=String.fromCharCode(i));return r=v.Base64._utf8_decode(r)},_utf8_encode:function(t){t=t.replace(/rn/g,"n");for(var e="",n=0;n<t.length;n++){var i=t.charCodeAt(n);i<128?e+=String.fromCharCode(i):i>127&&i<2048?(e+=String.fromCharCode(i>>6|192),e+=String.fromCharCode(63&i|128)):(e+=String.fromCharCode(i>>12|224),e+=String.fromCharCode(i>>6&63|128),e+=String.fromCharCode(63&i|128))}return e},_utf8_decode:function(t){for(var e="",n=0,i=0,o=0,s=0;n<t.length;)(i=t.charCodeAt(n))<128?(e+=String.fromCharCode(i),n++):i>191&&i<224?(s=t.charCodeAt(n+1),e+=String.fromCharCode((31&i)<<6|63&s),n+=2):(s=t.charCodeAt(n+1),o=t.charCodeAt(n+2),e+=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o),n+=3);return e}}},m=v,p=n("mtWM"),C=n.n(p).a.create({timeout:1e4});C.interceptors.request.use(function(t){return t},function(t){return g.a.reject(t)}),C.interceptors.response.use(function(t){return t.data},function(t){return g.a.reject(t)});var _=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"post"===(t=t.toLowerCase())?C.post(e,n):"get"===t?C.get(e,{params:n}):"put"===t?C.put(e,n):"delete"===t?C.delete(e):(console.log("未知的method"),!1)},k={addToGitHub:function(t,e,n,i){var o="https://api.github.com/repos/"+t+"/"+n.substring(0,n.indexOf("/"))+"/contents/"+n.substring(n.indexOf("/")+1)+"?access_token="+e,s={};return new g.a(function(t,e){s.message="create"+i.title,s.content=m.Base64.encode(h()(i)),_("put",o,h()(s)).then(function(e){t(e)},function(t){e(t)})})},getFromGitHub:function(t,e,n){return new g.a(function(i,o){var s="https://api.github.com/repos/"+t+"/"+n.substring(0,n.indexOf("/"))+"/contents/"+n.substring(n.indexOf("/")+1)+"?access_token="+e;_("get",s).then(function(t){var e=m.Base64.decode(t.content);i(e)},function(t){o(t)})})},getListFromGitHub:function(t,e,n){return new g.a(function(i,o){var s="https://api.github.com/repos/"+t+"/"+n.substring(0,n.indexOf("/"))+"/contents/"+n.substring(n.indexOf("/")+1)+"?access_token="+e;_("get",s).then(function(t){i(t)},function(t){o(t)})})},getShaFromGitHub:function(t,e,n){return new g.a(function(i,o){var s="https://api.github.com/repos/"+t+"/"+n.substring(0,n.indexOf("/"))+"/contents/"+n.substring(n.indexOf("/")+1)+"?access_token="+e;_("get",s).then(function(o){if(console.log(o),"Not Found"==o.message)k.addToGitHub(t,e,n);else{var s=o.sha;i(s)}},function(t){o(t)})})},UpdateToGitHub:function(t,e,n,i){var o="https://api.github.com/repos/"+t+"/"+n.substring(0,n.indexOf("/"))+"/contents/"+n.substring(n.indexOf("/")+1)+"?access_token="+e,s={};return new g.a(function(a,r){k.getShaFromGitHub(t,e,n).then(function(t){s.sha=t,s.message="upload note",s.content=m.Base64.encode(h()(i)),_("put",o,h()(s)).then(function(t){a(t)},function(t){console.log(t),r(t)})},function(t){r(t)})})},DeleteFromGitHub:function(t,e,n){return new g.a(function(i,o){var s="https://api.github.com/repos/"+t+"/"+n.substring(0,n.indexOf("/"))+"/contents/"+n.substring(n.indexOf("/")+1)+"?access_token="+e,a={};k.getShaFromGitHub(t,e,n).then(function(t){a.sha=t,a.message="delete note",s+="&message="+a.message+"&sha="+a.sha,_("delete",s).then(function(t){i(t)},function(t){console.log(t),o(t)})},function(t){o(t)})})}},b=k,x={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Dialog"},[n("div",{staticClass:"cover",on:{click:t.close}}),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"content__item"},[n("span",[t._v("title:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"submit",on:{click:t.submit}},[t._v("确定")]),t._v(" "),n("div",{staticClass:"submit",on:{click:t.close}},[t._v("取消")])])])},staticRenderFns:[]};var w={props:["content"],data:function(){return{nowContent:""}},watch:{content:function(t,e){this.nowContent=JSON.parse(this.content).content}},methods:{toSave:function(){this.$emit("save",this.nowContent)}}},A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ContentEdit"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.nowContent,expression:"nowContent"}],staticClass:"textarea",attrs:{name:"",id:""},domProps:{value:t.nowContent},on:{input:function(e){e.target.composing||(t.nowContent=e.target.value)}}}),t._v(" "),n("div",{staticClass:"areaBar"},[n("div",{staticClass:"bar__areacount"},[t._v("字数："+t._s(t.nowContent.length))])]),t._v(" "),n("div",{staticClass:"save",on:{click:t.toSave}},[t._v("save")])])},staticRenderFns:[]};var S={data:function(){return{token:"",account:"zaneblbl",path:"story/test",list:[],isShowAddDialog:!1,maxId:0,content:"",loading:!1,currentTitle:"",currentId:"",currentPath:""}},components:{ContentList:l,AddDialog:n("VU/8")({data:function(){return{title:""}},methods:{submit:function(){this.$emit("addToGithub",this.title),this.$emit("close",this.title)},close:function(){this.$emit("close",this.title)}}},x,!1,function(t){n("1kKg")},null,null).exports,ContentEdit:n("VU/8")(w,A,!1,function(t){n("fl8m")},null,null).exports,Head:c},created:function(){this.token=localStorage.getItem("token"),this.getlist()},methods:{getlist:function(){var t=this;b.getListFromGitHub(this.account,this.token,""+this.path).then(function(e){t.list=e,t.maxId=e.length})},add:function(t){var e=this;this.loading=!0;var n={};n.id=this.maxId+1,n.title=t,n.content="",b.addToGitHub(this.account,this.token,this.path+"/"+t+"-"+n.id+".json",n).then(function(t){e.$message({message:"添加成功",type:"success"}),e.getlist(),e.loading=!1},function(t){e.loading=!1,e.$message.error("添加失败")})},toDelete:function(){var t=this;this.loading=!0,b.DeleteFromGitHub(this.account,this.token,""+this.currentPath).then(function(e){t.$message({message:"删除成功",type:"success"}),t.getlist(),t.loading=!1},function(e){t.loading=!1,t.$message.error("删除失败")})},getContent:function(t){var e=this;this.loading=!0,b.getFromGitHub(this.account,this.token,"story/"+t.path).then(function(n){e.content=n;var i=JSON.parse(n);e.currentTitle=i.title,e.currentId=i.id,e.currentPath="story/"+t.path,e.loading=!1})},save:function(t){var e=this;this.loading=!0;var n={};n.id=this.currentId,n.title=this.currentTitle,n.content=t,b.UpdateToGitHub(this.account,this.token,this.path+"/"+n.title+"-"+n.id+".json",n).then(function(t){e.loading=!1,e.$message({message:"保存成功",type:"success"})},function(t){e.loading=!1,e.$message.error("保存失败")})},showAddDialog:function(){this.isShowAddDialog=!this.isShowAddDialog}}},D={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"MainPage"},[n("Head",{on:{toDelete:t.toDelete,showAddDialog:t.showAddDialog}}),t._v(" "),n("div",{staticClass:"mainbox"},[t.list.length?n("ContentList",{attrs:{list:t.list},on:{editContent:t.getContent}}):t._e(),t._v(" "),n("ContentEdit",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{content:t.content,"element-loading-background":"rgba(0, 0, 0, 0.3)"},on:{save:t.save}})],1),t._v(" "),t.isShowAddDialog?n("AddDialog",{on:{addToGithub:t.add,close:t.showAddDialog}}):t._e()],1)},staticRenderFns:[]};var $=n("VU/8")(S,D,!1,function(t){n("9lN1")},null,null).exports,F={data:function(){return{tokenValue:"",loading:!1,loginText:""}},methods:{alert:function(){this.$alert(this.loginText,"登录",{confirmButtonText:"确定",center:!0,callback:function(t){}})},toLogin:function(){var t=this,e="https://api.github.com/?access_token="+this.tokenValue;this.tokenValue?(this.loading=!0,_("get",e).then(function(e){t.loading=!1,localStorage.setItem("token",t.tokenValue),t.$router.push({path:"/MainPage"})},function(e){t.loading=!1,401===e.response.status?(t.loginText="验证失败，令牌错误",t.alert()):(t.loginText="登录失败",t.alert())})):(this.loginText="令牌不能为空",this.alert())}}},H={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"Login",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[n("div",{staticClass:"contentBox"},[n("div",{staticClass:"item"},[n("span",[t._v("token: ")]),n("el-input",{staticClass:"item__input",attrs:{type:"text"},model:{value:t.tokenValue,callback:function(e){t.tokenValue=e},expression:"tokenValue"}})],1),t._v(" "),n("div",{staticClass:"login",on:{click:t.toLogin}},[t._v("login")])])])},staticRenderFns:[]};var y=n("VU/8")(F,H,!1,function(t){n("2v1L")},null,null).exports;i.default.use(a.a);var O=new a.a({routes:[{path:"/",name:"Login",component:y},{path:"/MainPage",name:"MainPage",component:$},{path:"/*",redirect:"/"}]}),T=n("zL8q"),G=n.n(T);n("tvR6");i.default.use(G.a),i.default.config.productionTip=!1,new i.default({el:"#app",router:O,components:{App:s},template:"<App/>"})},"Q/VE":function(t,e){},fl8m:function(t,e){},t1h5:function(t,e){},tFXA:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.eb87c9095d510af41566.js.map