<template>
        <div class="container">
            <section class="section">
    <b-field>
        <b-input
            placeholder="I wish I had..."
            :value="name"
            @keyup.enter.native="addWish"
        ></b-input>
        <p class="control">
            <button class="button">Add Wish</button>
        </p>
    </b-field>
          <div v-if="wishes.length">
            <article v-for="wish in wishes" :key="wish.name" @click="editWish(wish)">
              <Wish :wish="wish"></Wish>
            </article>
          </div>
          <el-dialog title="Edit Wish" :visible.sync="is_modal_active">
            <WishForm :wish="wish"/>
          </el-dialog>
</section>
        </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Wish from "../components/Wish.vue";
import WishForm from "../components/WishForm.vue";

export default {
  components: {
    Wish,
    WishForm
  },
  data() {
    return {
      name: "",
      wish: {
        name: "",
        created_at: {
          seconds: ""
        }
      },
      is_modal_active: false
    };
  },
  computed: {
    ...mapState(["wishes", "user", "settings"])
  },
  methods: {
    addWish() {
      if (this.name !== "") {
        this.$db
          .collection("wishes")
          .add({
            user_id: this.user.uid,
            name: this.name,
            harvested: false,
            completed: false,
            created_at: new Date()
          })
          .then(ref => {
            this.name = "";
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    editWish(wish) {
      this.wish = wish;
      this.is_modal_active = true;
    }
  }
};
</script>
