<template>
    <div>
        <div class="box">
            <div class="media-content">
                <div class="content">
                    <b-field label="Name">
                        <b-input :value="wish.name" autofocus="true" placeholder="Name"></b-input>
                    </b-field>
                    <p>Created: {{ wish.getDate() }}</p>
                    <progress
                        class="progress"
                        :value="wish.getPercentage(settings.days_to_grow)"
                        max="100"
                    >{{ wish.getPercentage(settings.days_to_grow) }}%</progress>
                </div>
            </div>
        </div>
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
    created() {
        this.name = this.wish.name;
    },
    data() {
        return {
            name: ''
        }
    }
}
</script>
