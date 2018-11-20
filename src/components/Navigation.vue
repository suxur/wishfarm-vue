<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="../assets/logo-flat.png" width="112" height="28">
            </a>
            <a
                role="button"
                class="navbar-burger burger"
                :class="{ 'is-active': active }"
                aria-label="menu"
                aria-expanded="false"
                @click="toggle"
            >
                <span aria-hidden="true"></span>
                <span aria-idden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': active }">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link to="/settings" class="navbar-item">Settings</router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button class="button is-light" @click="logout">Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            active: false
        }
    },
    methods: {
        toggle() {
            this.active = !this.active
        },
        logout() {
            this.$auth.signOut().then(() => {
               this.$store.dispatch('clear')
               this.$router.push('/login')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

