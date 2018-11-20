<template>
    <div>
        <div class="container">
            <section class="section">
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input
                            class="input"
                            type="text"
                            placeholder="I wish I had..."
                            v-model="name"
                        >
                    </div>
                    <div class="control">
                        <a class="button is-info" @click="addWish">Add Wish</a>
                    </div>
                </div>
            </section>
            <section class="section">
                <div v-if="wishes.length">
                    <article v-for="wish in wishes" :key="wish.name" class="media" @click="editWish(wish)">
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{ wish.name }}</strong>
                                </p>
                                <p>Created: {{ wish.created_at.seconds | getDate }}</p>
                                <progress
                                    class="progress"
                                    :value="getPercentage(wish.created_at.seconds)"
                                    max="100"
                                >{{ getPercentage(wish.created_at.seconds) }}%</progress>
                            </div>
                        </div>
                    </article>
                </div>
                <b-modal :active.sync="is_modal_active">
                    <WishForm :wish="wish"/>
                </b-modal>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import WishForm from '../components/WishForm.vue'

export default {
    components: {
        WishForm
    },
    data() {
        return {
            name: '',
            wish: {
                name: '',
                created_at: {
                    seconds: ''
                }
            },
            is_modal_active: false
        }
    },
    computed: {
        ...mapState(['wishes', 'user', 'settings'])
    },
    methods: {
        addWish() {
            if (this.name !== '') {
                this.$db
                    .collection('wishes')
                    .add({
                        user_id: this.user.uid,
                        name: this.name,
                        harvested: false,
                        completed: false,
                        created_at: new Date()
                    })
                    .then(ref => {
                        this.name = ''
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        editWish(wish) {
            this.wish = wish;
            this.is_modal_active = true;
        },
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
