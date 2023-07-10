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
          {{ $t("auth.forgot_pw") }}
        </div>
      </q-card-section>

      <q-separator class="gt-md" />

      <q-card-section :class="{ 'q-ma-xl': $q.screen.width > 600 }">
        <!--login-->
        <ResetPw_Props />
        <div class="row justify-center">
          <q-btn
            to="login"
            flat
            :label="$t('label.back')"
            class="text-primary"
          />
        </div>
        <!--login-->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ResetPw_Props from "src/components/reset_pw_component.vue";

export default defineComponent({
  components: { ResetPw_Props },
  name: "ResetPwPage",
});
</script>
<style scoped></style>
