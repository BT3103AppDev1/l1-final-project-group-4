<script>
export default {
  
}
</script>
<template>
    <nav>
        <div id="admin">
            <h3>ADMINISTRATOR</h3>
        </div>        
        <div id="buttons">
            <router-link to="/scheduler">
                <h3>SCHEDULER</h3>
            </router-link>

            <router-link to="/manpower">
                <h3>MANPOWER</h3>
            </router-link>

            <router-link to="/leave">
                <h3>LEAVE</h3>
            </router-link>
        </div>

        <div id="logout">
            <div id="button">
                <router-link to="/">LOGOUT</router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Nunito');

#logout {
    height: 90px;
    line-height: 90px;
    margin-right: 50px;
    margin-left: auto;
}

#logout a {
    
    background-color: white;
    color: #193a6a;
    font-weight: bolder;
    padding: 0.5em 0.8em;
    border-radius: 0.5em;
    
}

#logout a:hover {
    background-color: rgb(230, 230, 230);
    color: #193a6a;
    font-weight: bolder;
    padding: 0.5em 0.8em;
    border-radius: 0.5em;
    transition: 0.2s;
    
}

nav {
    display: flex;
    font-family: 'Nunito', sans-serif;
    width: 100%;
    height: 90px;
    background-color: #193a6a;
    color: white;
}
nav a.router-link-exact-active h3 {
  border-bottom: 4px solid #64cad8;
}

#admin h3 {
    height: 90px;
    width: 180px;
    line-height: 90px;
    margin: 0 50px;
    font-weight: bold;
}

#buttons {
    display: flex;
    margin-left: 200px;
}

#buttons h3 {
    height: 90px;
    line-height: 90px;
    margin: 0 60px;
    font-weight: bold;
}

#buttons h3:hover {
    font-weight: bold;
    text-decoration: underline;
}


a {
  text-decoration: none;
  color: white;
}

@media (min-width: 1025px) {
  .drawer {
    display: none;
  }
}
@media (max-width: 1024px) {
  nav {
    display: none;
  }
}
</style>
