<template>
    <div id="app">
        <Navigation v-if="user"></Navigation>
        <router-view/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'

export default {
    components: { Navigation },
    computed: {
        ...mapState(['user'])
    }
}
</script>
