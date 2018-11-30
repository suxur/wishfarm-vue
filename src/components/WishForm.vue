<template>
    <div>
        <el-input v-model="wish.name"></el-input>
        <!-- <div class="box">
            <div class="media-content">
                <div class="content">
                    <div class="field">
                        <label for="name" class="label">Name</label>
                        <div class="control">
                            <input
                                class="input"
                                type="name"
                                placeholder="Name"
                                autofocus="true"
                                v-model="wish.name"
                            >
                        </div>
                    </div>
                    <p>Created: {{ wish.created_at.seconds | getDate }}</p>
                    <progress
                        class="progress"
                        :value="getPercentage(wish.created_at.seconds)"
                        max="100"
                    >{{ getPercentage(wish.created_at.seconds) }}%</progress>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    props: {
        wish: Object
    },
        computed: {
        ...mapState(['wishes', 'user', 'settings'])
    },
    methods: {
                getPercentage(val) {

            let created = moment.unix(val)
            let now = new moment()

            let days = moment.duration(now.diff(created)).asDays()

            return (days / this.settings.days_to_grow) * 100;
        }
    },
    filters: {
        getDate(val) {
           return moment.unix(val).fromNow()
        }
    }
}
</script>
