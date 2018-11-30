import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "./firebase";
import Wish from "./models/Wish";
import firebase, { UserInfo } from "firebase";

Vue.use(Vuex);

auth.onAuthStateChanged(user => {
    if (user) {
        store.commit("setUser", user);
        store.dispatch("fetchWishes");
    }
});

let state: {
    user: UserInfo,
    wishes: Wish[],
    settings: {
        [index:string]: any
    }
} = {
    user: <UserInfo>{},
    wishes: [],
    settings: {
        days_to_grow: <number>30
    }
}

const store = new Vuex.Store({
    state: state,
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
                        let wishes: Wish[] = [];
                        snapshots.forEach(function(doc) {
                            let wish = new Wish(doc.data());
                            wishes.push(wish);
                        });
                        commit("setWishes", wishes);
                    });
            }
        }
    }
});

export default store;
