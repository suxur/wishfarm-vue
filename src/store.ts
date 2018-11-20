import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "./firebase";
import Wish from "./models/Wish";

Vue.use(Vuex);

auth.onAuthStateChanged(user => {
    if (user) {
        store.commit("setUser", user);
        store.dispatch("fetchWishes");
    }
});

const store = new Vuex.Store({
    state: {
        user: null,
        wishes: [],
        settings: {
            days_to_grow: <number>30
        }
    },
    mutations: {
        setUser(state, val) {
            state.user = val;
        },
        setWishes(state, val) {
            state.wishes = val;
        },
        updateSettings(state, setting) {
            state.settings[setting.name] = setting.value;
        }
    },
    actions: {
        clear({ commit }) {
            commit("setUser", null);
            commit("setWishes", []);
        },
        fetchWishes({ commit, state }) {
            if (state.user != null) {
                db.collection("wishes")
                    .where("user_id", "==", state.user.uid)
                    .where("harvested", "==", false)
                    .orderBy("created_at")
                    .onSnapshot(snapshots => {
                        let wishes = [];
                        snapshots.forEach(function(doc) {
                            wishes.push(doc.data());
                        });
                        commit("setWishes", wishes);
                    });
            }
        }
    }
});

export default store;
