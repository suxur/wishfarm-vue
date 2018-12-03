<template>
  <el-card shadow="hover">
    <p>
      <strong>{{ wish.name }}</strong>
    </p>
    <p>Created: {{ wish.getDate() }}</p>
    <el-progress
      type="circle"
      :percentage="wish.getPercentage(settings.days_to_grow)"
      color="#8e71c7"
    ></el-progress>
  </el-card>
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

