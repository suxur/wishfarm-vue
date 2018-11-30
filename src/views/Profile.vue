<template>
    <div>
        <div class="container">
            <section class="section">
                <figure class="image is-64x64">
                    <img class="is-rounded" :src="image">
                </figure>
                <div class="field">
                    <label class="label" for="">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Email" :value="user.email" readonly>
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span v-if="!user.emailVerified" class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        <span v-else class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                </div>
                <div v-if="!user.emailVerified" class="field">
                    <div class="control">
                        <a class="button is-link" href="" @click.prevent="sendEmailVerificationLink">Verify Email</a>
                    </div>
                </div>
                <!-- TODO: Reset Password? -->
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import md5 from 'blueimp-md5';

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState(["user"]),
        image() {
            return 'https://gravatar.com/avatar/' + md5(this.user.email);
        }
    },
    methods: {
        sendEmailVerificationLink() {
            let vm = this;

            this.user.sendEmailVerification().then(function () {
               vm.$toast.open({
                   message: 'Email verification has been sent!',
                   type: 'is-success'
               });
            }).catch(error => {
                vm.$toast.open({
                    message: 'Unable to send email verification!',
                    type: 'is-danger'
                });
            })
       }
    }
};
</script>
