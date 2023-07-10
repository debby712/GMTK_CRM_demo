<template>
  <q-page class="flex flex-center">
    <h5>cs</h5>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  name: "csPage",
  components: [],
  data() {
    return {
      value: ref(71),
      options: {},
      series: [44, 55, 41, 17, 15],
    };
  },
});
</script>
<style scoped></style>
