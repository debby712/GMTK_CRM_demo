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
          :placeholder="$t('auth.your_reg_email')"
        />
      </div>

      <div v-if="checking == true" class="animated animate__fadeInUp">
        <q-icon size="20px" name="error_outline" color="red" />
        <span class="text-red">{{ error_msg }}</span>
      </div>
      <div v-else class=" " style="height: 22px !important"></div>
      <div class="justify-center row">
        <q-btn
          :disabled="!isFormValid"
          class="content_btn q-mt-md"
          :label="$t('auth.reset_pw')"
          type="submit"
          color="primary"
          @click="handleSubmit"
        />
      </div>
    </q-form>
    <q-dialog v-model="showDialog" persistent>
      <q-card class="full-width q-py-lg">
        <q-card-section class=" ">
          <div class="row text-center justify-center">
            <q-icon class="text-positive" size="52px" name="check_circle" />
          </div>
        </q-card-section>
        <div class="row text-center justify-center">
          <h5>{{ $t("auth.email_sent") }}</h5>
        </div>
        <q-card-section class="text-center text-dark">
          <div>{{ $t("auth.use_email_pw") }}</div>
          <q-btn
            v-close-popup
            class="content_btn q-mt-md"
            :label="$t('label.back')"
            color="primary"
            @click="redirectToPage"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ResetPw_Props",

  components: {},
  data() {
    return {
      email: "",
      showDialog: false,
      checking: false,
      isPwd: ref(true),
      error_msg: this.$t("error.email_not_find"),
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
        this.checking = true;

        // Do some async operation
        setTimeout(() => {
          this.checking = true;
        }, 6000);
      } else {
        this.showDialog = true;
        // Wait for 3 seconds before navigating to success/crm
        //  setTimeout(() => {
        //   this.router.push("login");
        // }, 5000);
      }
    },
    redirectToPage() {
      // Replace "https://example.com" with the URL of the page you want to redirect to
      window.location.href = "#/auth/login";
    },
  },
  computed: {
    isFormValid() {
      return this.email.match(/^.+@.+\..+$/);
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
