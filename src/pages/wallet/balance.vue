<template>
  <q-page><balance_component /></q-page>
</template>
<script>
import { defineComponent, ref } from "vue";
import balance_component from "src/components/balance.vue";
export default defineComponent({
  name: "balancePage",
  components: { balance_component },
  setup() {},
});
</script>
