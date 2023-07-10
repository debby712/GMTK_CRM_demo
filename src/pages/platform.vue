<template>
  <q-page class="container">
    <div class="gt-xs" style="display: inline">
      <h3 style="margin-bottom: 7px; display: inline-block; margin-right: 10px">
        {{ $t("platform.platform") }}
      </h3>
    </div>
    <q-tabs
      v-model="tab"
      class="text-dark"
      active-color="dark"
      active-bg-color="white"
      indicator-color="primary"
      align="start"
      narrow-indicator
    >
      <q-route-tab name="accounts" to="/platform/mt4" label="METATRADER 4" />
    </q-tabs>
    <q-separator inset class="tab_border" />

    <div class="container-inner">
      <q-card class="no-shadow tab-container"> <router-view class="" /></q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  name: "downloadPage",
  components: [],
  data() {
    return {
      tab: "accounts",
      value: ref(71),
      options: {},
      series: [44, 55, 41, 17, 15],
    };
  },
});
</script>
<style scoped></style>
