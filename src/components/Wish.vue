<template>
  <div class="box">
    <p class="title is-5">{{ wish.name }}</p>
    <p>Created: {{ wish.getDate() }}</p>
    <progress class="progress is-primary" :value="wish.getPercentage(settings.days_to_grow)" max="100"></progress>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["wish"],
  computed: {
    ...mapState(["settings"])
  }
};
</script>

<style lang="sass" scoped>
    .box
        margin-bottom: 15px
</style>


