<template>
    <div>
        <div class="container">
            <section class="section">
                <form>
                    <div class="field">
                        <label for="days_to_grow" class="label">Days to Grow</label>
                        <div class="control">
                        <el-input-number v-model="days_to_grow" :step="1"></el-input-number>
                            <!-- <input
                                class="input"
                                type="number"
                                placeholder="Days to Grow"
                                autofocus
                                v-model="days_to_grow"
                            > -->
                        </div>
                    </div>
                    <button
                        type="button"
                        class="button is-block is-info"
                        @click="save"
                    >Save</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
    data() {
        return {
            days_to_grow: null
        };
    },
    created() {
        this.days_to_grow = this.settings.days_to_grow;
    },
    computed: {
        ...mapState(["settings", "user"])
        // days_to_grow: {
        //     get () {
        //         return this.settings.days_to_grow;
        //     },
        //     set (val) {
        // this.$store.commit('updateSettings', {name: 'days_to_grow', value: val})
        //     }
        // }
    },
    methods: {
        save() {
            this.$store.commit("updateSettings", {
                name: "days_to_grow",
                value: this.days_to_grow
            });
        }
    }
};
</script>
