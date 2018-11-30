<template>
    <section class="section">
        <div class="container">
            <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey">WishFarm</h3>
                <div class="box">
                    <form>
                        <div class="field">
                            <label for="email" class="label">E-Mail</label>
                            <div class="control">
                                <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="email">
                            </div>
                        </div>
                        <div class="field">
                            <label for="password" class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="Your Password" v-model="password">
                            </div>
                        </div>
                        <div class="field">
                            <label class="checkbox">
                                <input type="checkbox">
                                Remember me
                            </label>
                        </div>
                        <button type="button" class="button is-block is-info is-fullwidth" @click="login">Login</button>
                    </form>
                </div>
                <p class="has-text-grey has-text-centered">
                    <router-link to="/register">Sign Up</router-link> &nbsp;·&nbsp;
                    <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                    <a href="../">Need Help?</a>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        login() {
            if (this.email !== "" && this.password !== "") {
                this.$auth
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                        // TODO save user information in Vuex/Session data
                        this.$store.commit("setUser", user.user);
                        this.$store.dispatch("fetchWishes");
                        this.$router.push("/");
                    })
                    .catch(error => {
                        // TODO display login error
                        console.log(error);
                    });
            }
        }
    }
};
</script>
