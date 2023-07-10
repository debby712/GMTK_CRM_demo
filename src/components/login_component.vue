<template>
  <div>
    <q-form
      @submit.prevent.stop="onSubmit"
      @submit="onSubmit"
      class="q-gutter-y-md"
      ref="loginForm"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <div class="row">
        <div class="select-label">{{ $t("auth.mail_address") }}</div>
        <q-input
          outlined
          class="col-12 input-field-title-margin"
          v-model="email"
          :options="options"
          :placeholder="$t('auth.mail_address')"
          lazy-rules
          :rules="[
            (val) => (val && val.match(/^.+@.+\..+$/)) || this.error_email,
          ]"
        />
      </div>

      <div class="row">
        <div class="select-label">{{ $t("auth.password") }}</div>
        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          class="col-12 input-field-title-margin"
          outlined
          :rules="[(val) => (val && val.length > 0) || this.plz_enter]"
          lazy-rules
          :placeholder="$t('auth.enter') + $t('auth.password')"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            /> </template
        ></q-input>
      </div>

      <div v-if="checking == true" class="animated animate__fadeInUp">
        <q-icon size="20px" name="error_outline" color="red" />
        <span class="text-red">{{ error_msg }}</span>
      </div>
      <div v-else class=" " style="height: 22px !important"></div>
      <div class="justify-center row">
        <q-btn
          :disabled="!isFormValid"
          class="content_btn q-mt-m"
          :label="$t('auth.confirm')"
          type="submit"
          color="primary"
          @click="handleSubmit"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login_Props",

  components: {},
  data() {
    return {
      email: "",
      password: "",
      checking: false,
      error_email: this.$t("error.email_error"),
      isPwd: ref(true),
      error_msg: this.$t("error.email_pw_error"),
      plz_enter: this.$t("error.require"),
    };
  },
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },

  methods: {
    handleSubmit() {
      if (this.email === "wrong@gmail.com") {
        // Do some async operation
        setTimeout(() => {
          this.checking = true;
        }, 0);
      } else {
        this.router.push("success/crm");
      }
    },
  },
  computed: {
    isFormValid() {
      return this.email.match(/^.+@.+\..+$/) && this.password.length > 0;
    },
  },
});
</script>

<style scoped>
p {
  font-size: 14px !important;

  text-align: left !important;
  margin-bottom: 0 !important;
  color: #080c18;
}
</style>
