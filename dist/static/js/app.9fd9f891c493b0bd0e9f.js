webpackJsonp([1],{DFiN:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("kxiW"),n=Object(a.initializeApp)({apiKey:"AIzaSyCeb2oai1mjYDcV5rm7uRa9HB9zKO7FcDA",authDomain:"todo-6ddda.firebaseapp.com",databaseURL:"https://todo-6ddda.firebaseio.com",projectId:"todo-6ddda",storageBucket:"todo-6ddda.appspot.com",messagingSenderId:"710556968906"}),s=n.database().ref("tasks"),o=n.auth(),r=n.storage(),l=i("7+uW"),c={name:"TodoList",data:function(){return{newTodo:"",todos:[],txtEmail:"",txtPassword:"",logged:!1,gifUrl:""}},created:function(){window.addEventListener("beforeunload",this.handler)},firebase:{todos:s},methods:{addTodo:function(){0!=this.newTodo.trim().length&&(s.push({title:this.newTodo,completed:!1,fileUrl:"",fileName:""}),this.newTodo="")},removeTodo:function(t){s.child(t).remove()},setCompleted:function(t,e){s.child(t).update({completed:e}),e&&$.getJSON("http://api.giphy.com/v1/gifs/random?&api_key=Qkp6Q5KeA8sHbBV8U7nJdeQYPrOZOhTB",this.gotData)},gotData:function(t){var e=t.data.images.fixed_width.url;console.log(e),this.gifUrl=e},funcLogin:function(){var t=this,e=this.txtEmail,i=this.txtPassword,a=o;if(0!=e.trim().length&&0!=i.trim().length){var n=a.signInWithEmailAndPassword(e,i);n.catch(function(t){return alert(t.message)}),n.then(function(e){var i=a.currentUser;t.logged=null!=i})}},funcSignUp:function(){var t=this.txtEmail,e=this.txtPassword,i=o;0!=t.trim().length&&0!=e.trim().length&&i.createUserWithEmailAndPassword(t,e).then(function(t){return alert("Account created!")}).catch(function(t){return alert(t.message)})},funcLogOut:function(){o.signOut(),this.logged=!1},fileUp:function(t,e){var i=t.target.files[0],a=r.ref("filesTodo/"+i.name);a.put(i).then(function(t){a.getDownloadURL().then(function(t){console.log(t),s.child(e).update({fileUrl:t}),s.child(e).update({fileName:i.name})}).catch(function(t){return console.log(t.message)})})},handler:function(t){o.signOut(),this.logged=!1}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[this.logged?t._e():i("div",{staticStyle:{width:"600px",display:"inline-block"}},[i("div",{staticClass:"input-group mb-3"},[t._m(0),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.txtEmail,expression:"txtEmail"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Email","aria-label":"Email","aria-describedby":"basic-addon1"},domProps:{value:t.txtEmail},on:{input:function(e){e.target.composing||(t.txtEmail=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"input-group mb-3"},[t._m(1),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.txtPassword,expression:"txtPassword"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Password","aria-label":"Password","aria-describedby":"basic-addon1"},domProps:{value:t.txtPassword},on:{input:function(e){e.target.composing||(t.txtPassword=e.target.value)}}})]),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button",id:"btnLogin"},on:{click:function(e){t.funcLogin()}}},[t._v("Log in")]),t._v(" "),i("button",{staticClass:"btn btn-secondary",attrs:{type:"button",id:"btnSignUp"},on:{click:function(e){t.funcSignUp()}}},[t._v("Sign Up")])]),t._v(" "),this.logged?i("div",[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-9"},[i("div",{staticClass:"input-group mb-3"},[t._m(2),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],staticClass:"form-control",attrs:{type:"text","aria-label":"Default","aria-describedby":"inputGroup-sizing-default",placeholder:"Write a task."},domProps:{value:t.newTodo},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.addTodo(e):null},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}})]),t._v(" "),i("ul",{staticClass:"list-group"},[i("transition-group",{attrs:{name:"fade","enter-active-class":"animated fadeInUp","leave-active-class":"animated fadeOutDown"}},t._l(t.todos,function(e){return i("div",{key:e[".key"],staticClass:"todoItem"},[i("li",{staticClass:"list-group-item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.completed,expression:"todo.completed"}],staticClass:"check-item",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.completed)?t._i(e.completed,null)>-1:e.completed},on:{change:[function(i){var a=e.completed,n=i.target,s=!!n.checked;if(Array.isArray(a)){var o=t._i(a,null);n.checked?o<0&&t.$set(e,"completed",a.concat([null])):o>-1&&t.$set(e,"completed",a.slice(0,o).concat(a.slice(o+1)))}else t.$set(e,"completed",s)},function(i){t.setCompleted(e[".key"],e.completed)}]}}),t._v(" "),i("div",{class:{completed:e.completed}},[t._v(" "+t._s(e.title))]),t._v(" "),i("div",[i("i",{staticClass:"fas fa-file"}),t._v(" "),""==e.fileUrl?i("input",{attrs:{type:"file",value:"upload"},on:{change:function(i){t.fileUp(i,e[".key"])}}}):i("a",{attrs:{href:e.fileUrl,target:"_blank"}},[t._v(t._s(e.fileName))])]),t._v(" "),i("div",{staticClass:"remove-item",on:{click:function(i){t.removeTodo(e[".key"])}}},[t._v("\n                                    ×\n                                ")])])])}))],1)]),t._v(" "),i("div",{staticClass:"col"},[i("button",{staticClass:"btn btn-primary",staticStyle:{float:"right"},attrs:{type:"button"},on:{click:function(e){t.funcLogOut()}}},[t._v("Log Out")]),t._v(" "),i("img",{staticStyle:{"margin-top":"30px"},attrs:{src:this.gifUrl}})])])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[this._v("Email")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[this._v("Password")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("span",{staticClass:"input-group-text",attrs:{id:"inputGroup-sizing-default"}},[this._v("ToDo")])])}]};var u={name:"App",components:{TodoList:i("VU/8")(c,d,!1,function(t){i("Q5Q9")},null,null).exports}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container",attrs:{id:"app"}},[this._m(0),this._v(" "),e("TodoList")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"titlePage"}},[e("p",{staticClass:"h1"},[this._v("ToDo List")])])}]};var m=i("VU/8")(u,p,!1,function(t){i("DFiN")},null,null).exports,f=i("1mcD"),v=i.n(f);l.a.use(v.a),l.a.config.productionTip=!1,new l.a({el:"#app",components:{App:m},template:"<App/>"})},Q5Q9:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9fd9f891c493b0bd0e9f.js.map