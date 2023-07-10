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
          {{ $t("nav.login") }}
        </div>
      </q-card-section>

      <q-separator class="gt-md" />

      <q-card-section :class="{ 'q-ma-xl': $q.screen.width > 600 }">
        <!--login-->

        <Login_Props />
        <div class="row justify-center">
          <p class="already_client_text">
            {{ $t("auth.not_client") }}
          </p>
          <q-btn
            to="register"
            flat
            :label="$t('nav.register')"
            class="text-primary"
          />
        </div>
        <div class="row justify-center">
          <q-btn
            to="resetpassword"
            flat
            :label="$t('auth.forgot_pw') + '?'"
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
import Login_Props from "src/components/login_component.vue";
export default defineComponent({
  components: { Login_Props },
  name: "LoginPage",
});
</script>
<style scoped></style>
