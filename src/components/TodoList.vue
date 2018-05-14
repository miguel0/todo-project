<template>
    <div>

        <div v-if="!this.logged" style="width: 600px; display: inline-block">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                </div>
                <input type="email" v-model="txtEmail" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                </div>
                <input type="password" v-model="txtPassword" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
            </div>
            <button type="button" id="btnLogin" class="btn btn-primary" @click="funcLogin()">Log in</button>
            <button type="button" id="btnSignUp" class="btn btn-secondary" @click="funcSignUp()">Sign Up</button>
        </div>

        <div v-if="this.logged">
            <div class="container">
                <div class="row">
                    
                    <div class="col-9">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">ToDo</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" 
                        placeholder="Write a task." v-model="newTodo" @keyup.enter="addTodo">
                        </div>
                        <ul class="list-group">
                        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                            <div v-for="todo in todos" v-bind:key="todo['.key']" class="todoItem">
                                <li class="list-group-item">
                                    <input class="check-item" type="checkbox" v-model="todo.completed"  v-on:change="setCompleted(todo['.key'], todo.completed)">
                                    <div :class="{ completed: todo.completed}"> {{ todo.title }}</div>
                                    <div>
                                        <i class="fas fa-file"></i>
                                        <input type="file" value="upload" v-on:change="fileUp($event, todo['.key'])" v-if="todo.fileUrl == ''"/>
                                        <a v-bind:href=todo.fileUrl target="_blank" v-else>{{ todo.fileName }}</a> 
                                    </div>
                                    <div class="remove-item" @click="removeTodo(todo['.key'])">
                                        &times;
                                    </div>
                                </li>
                            </div>
                        </transition-group>
                        </ul>
                    </div>

                    <div class="col">
                        <button type="button" class="btn btn-primary" style="float: right" @click="funcLogOut()">Log Out</button>
                        <img v-bind:src="this.gifUrl" style="margin-top: 30px">
                    </div>  

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { todosRef } from '../firebase';
import { authJS } from '../firebase';
import { store } from '../firebase';

export default {
name: 'TodoList',

data () {
    return {
    newTodo: '',
    todos: [],
    txtEmail: '',
    txtPassword: '',
    logged: false,
    gifUrl: ''
    };
},
created() {
    window.addEventListener('beforeunload', this.handler)
},
firebase: {
    todos: todosRef,
},
methods: {
    addTodo() {
        if (this.newTodo.trim().length == 0){
            return
        }
        
        todosRef.push({
            title: this.newTodo,
            completed: false,
            fileUrl: '',
            fileName: ''
        });
        this.newTodo = '';
    },
    removeTodo (key){
        todosRef.child(key).remove();
    },
    setCompleted (key, statusCompleted){
        todosRef.child(key).update({ completed: statusCompleted });
        if (statusCompleted){
            $.getJSON('http://api.giphy.com/v1/gifs/random?&api_key=Qkp6Q5KeA8sHbBV8U7nJdeQYPrOZOhTB', this.gotData);
        }
    },
    gotData(data){
        let gifTemp = data.data.images.fixed_width.url;
        console.log(gifTemp);
        this.gifUrl = gifTemp;  
    },
    funcLogin(){
            const email = this.txtEmail;
            const pass = this.txtPassword;
            const auth = authJS;
            if (email.trim().length !=0 && pass.trim().length !=0){
                const promise = auth.signInWithEmailAndPassword(email, pass);
                promise.catch(e => alert(e.message));
                promise.then((a) => {
                    const user = auth.currentUser;
                    if(user == null){
                        this.logged=false;
                    } else{
                        this.logged=true;
                    }
                });
                
            }
    },
    funcSignUp(){
        const email = this.txtEmail;
        const pass = this.txtPassword;
        const auth = authJS;
        if (email.trim().length !=0 && pass.trim().length !=0){
            const promise1 = auth.createUserWithEmailAndPassword(email, pass);
            promise1
            .then(user => alert('Account created!'))
            .catch(e => alert(e.message));
        }
    },
    funcLogOut(){
        const auth = authJS;
        auth.signOut();
        this.logged = false;
    },
    fileUp(event, key){
            let urlUp = '';
            let file = event.target.files[0];
            let storageRef = store.ref('filesTodo/'+file.name);
            storageRef.put(file).then((a) => {
                storageRef.getDownloadURL().then(function(url){
                    console.log(url);
                    todosRef.child(key).update({ fileUrl: url});
                    todosRef.child(key).update({ fileName: file.name});
                })
                .catch(e => console.log(e.message));
            });
    },
    handler: function handler(event) {
        const auth = authJS;
        auth.signOut();
        this.logged = false;
    }
}
}
</script>

<style>
    @import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css);
    
    .remove-item{
        cursor: pointer;
        float: right;
        margin-left: 14px;
        font-size: 24px;
        margin-top: -30px;
    }
    .check-item{
        cursor: pointer;
        float: left;
        margin-right: 14px;
        font-size: 24px;
        margin-top: 6px;
    }
    .completed{
        text-decoration: line-through;
        color: gray;
    }
    .todoItem{
        animation-duration: 0.25s;
    }
</style>