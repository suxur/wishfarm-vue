<template>
    <div id="app">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Navigation v-if="user"></Navigation>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'

export default {
    components: { Header, Navigation },
    computed: {
        ...mapState(['user'])
    }
}
</script>
