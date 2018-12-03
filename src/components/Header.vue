<template>
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
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
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        <figure class="image is-24x24">
                            <img class="is-rounded" :src="image">
                        </figure>
                        {{ user.email }}
                    </a>
                    <div class="navbar-dropdown is-right">
                        <router-link to="/profile" class="navbar-item">Profile</router-link>
                        <router-link to="/settings" class="navbar-item">Settings</router-link>
                        <hr class="navbar-divider">
                        <div class="navbar-item">
                            <button class="button is-light is-fullwidth" @click="logout">
                                <span>Log Out</span>
                                <span class="icon">
                                    <i class="fas fa-sign-out-alt"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="navbar-item"></div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from "vuex";
import md5 from "blueimp-md5";

export default {
    data() {
        return {
            active: false
        };
    },
    computed: {
        ...mapState(["user"]),
        image() {
            return "https://gravatar.com/avatar/" + md5(this.user.email);
        }
    },
    methods: {
        toggle() {
            this.active = !this.active;
        },
        logout() {
            this.$auth
                .signOut()
                .then(() => {
                    this.$store.dispatch("clear");
                    this.$router.push("/login");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .navbar-link {
        .image {
            margin-right: 10px;
        }
    }
</style>


