<template>
  <q-page class="flex flex-center">
    <q-card
      class="full-width auth-card no-shadow"
      :class="{
        ' my-shadow ': $q.screen.width > 600,
        ' q-my-lg ': $q.screen.width > 600,
      }"
      style="max-width: 760px"
    >
      <q-card-section
        class="auth-card-header bg-primary text-white jusitfy-content-center"
      >
        <div
          class="card-title"
          :class="{ ' text-center ': $q.screen.width > 600 }"
        >
          {{ $t("nav.register") }}
        </div>
      </q-card-section>

      <q-separator class="gt-md" />

      <q-card-section :class="{ 'q-ma-xl': $q.screen.width > 600 }">
        <!--reg-->
        <Reg_Info_Props />

        <!--reg-->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Reg_Info_Props from "src/components/register_info_component.vue";
export default defineComponent({
  components: { Reg_Info_Props },
  name: "RegisterInfoPage",
});
</script>
<style scoped>

</style>
