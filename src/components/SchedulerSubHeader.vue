<script>
export default {
  
}
</script>
<template>
    <nav>
        <div class="buttons">
            <router-link to="/admin/scheduler">
                <h3>UPCOMING</h3>
            </router-link>
            <router-link to="/admin/scheduler/today">
                <h3>TODAY</h3>
            </router-link>
        </div>
    </nav>
</template>

<style scoped>
nav {
    width: 100vw;
    display: flex;
    height: 100%;
}

.buttons {
    padding-left: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
}

h3 {
    color:  rgba(33, 88, 143, 0.5);;
    padding: 0 3em;
    /* text-decoration: none; */
}

a {
    text-decoration: none;
}

a.router-link-exact-active h3 {
    color: #193a6a;
    padding: 0 3em;
    /* text-decoration: none; */
}

</style>