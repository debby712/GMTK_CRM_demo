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
        <Reg_Props />
        <div class="row justify-center">
          <p class="already_client_text">
            {{ $t("auth.already_client") }}
          </p>
          <q-btn
            to="./login"
            flat
            :label="$t('auth.login_here')"
            class="text-primary"
          />
        </div>
        <!--reg-->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Reg_Props from "src/components/register_component.vue";
export default defineComponent({
  components: { Reg_Props },
  name: "RegisterPage",

});
</script>
<style scoped>

</style>
