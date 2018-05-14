<template>
  <div id="app" class="container">
    <div id="titlePage"><p class="h1">ToDo List</p></div>
    <TodoList/>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

#titlePage{
  margin-bottom: 30px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
