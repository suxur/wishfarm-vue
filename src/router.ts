import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "*",
            redirect: "/"
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings",
            name: "settings",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Settings.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Profile.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/register",
            name: "register",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Register.vue")
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;

    if (requiresAuth && !currentUser) {
        next("/login");
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
});

export default router;
