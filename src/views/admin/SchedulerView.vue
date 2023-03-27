<script>
import TheAdminHeader from '@/components/TheAdminHeader.vue'
export default {
    components: {
        TheAdminHeader
    },
    setup() {

        return { TheAdminHeader }
    }
}
</script>

<template>
    <TheAdminHeader />
    <div main="body">
        <h1>This is Scheduler Admin Page</h1>
    </div>
</template>

<style scoped>
.body {
    display: flex;
    background-color: green;
}
</style>