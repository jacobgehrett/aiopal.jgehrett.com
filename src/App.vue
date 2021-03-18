<template>
  <div id="app">
    <div id="brand">
      <img id="logo" src="./assets/logo.png">
    </div>
    <div id="acronym">
      <h1><strong>AI</strong> for <strong>O</strong>ptimized <strong>P</strong>lanetary <strong>A</strong>utomated <strong>L</strong>earning</h1>
    </div>
    <div id="nav">
      <div class="link">
        <router-link to="/">Home</router-link>
      </div>
      <div class="link">
        <router-link to="/horizon">Horizon Images</router-link>
      </div>
      <div class="link">
        <router-link to="/ground">Ground Images</router-link>
      </div>
    </div>
    <router-view/>
    <div class='header'>
        <p><a href='https://github.com/jacobgehrett/aiopal.jgehrett.com'>https://github.com/jacobgehrett/aiopal.jgehrett.com</a></p>
    </div>
  </div>
</template>

<style>

* {
  background-color: #000066;
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e6e6e6;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;

}

.link {
  padding: 15px;
  border: 1px solid white;
  background-color: #800080;
}

#nav a {
  font-weight: bold;
  color: #e6e6e6;
  font-size: 1.5em;
  background-color: #800080;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#logo {
  width: 34%;
  height: auto;
}

</style>
