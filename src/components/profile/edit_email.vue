<template>
  <div
    v-if="!success"
    class="row tab-inner animated animate__slideInRight animate__faster"
    style="max-width: 550px"
  >
    <div class="edit_title">{{ $t("profile.enter_new_email") }}</div>

    <q-input
      class="col-12 input-field-title-margin"
      v-model="email"
      type="email"
      :placeholder="$t('auth.mail_address')"
    >
    </q-input>
    <!--re-->

    <q-input
      class="col-12 align-password-margin"
      :placeholder="$t('auth.enter') + $t('auth.verify')"
      v-model="verify"
      bottom-slots
      :error="!isValid && isVerifyBtnClicked"
    >
      <template v-slot:append>
        <q-btn
          color="primary"
          class="verify_btn"
          name="search"
          :label="$t('auth.verify')"
          @click="checkVerification"
        />
      </template>

      <template v-slot:error>
        <div>{{ $t("error.email_error") }}</div></template
      >
      <q-popup-proxy v-if="vaildation_sent">
        <q-banner class="bg-positive text-white text-weight-bold">
          <q-icon name="check_circle  " size="xs" class="q-mb-xs" />

          {{ $t("auth.plzcheck_email") }}
        </q-banner>
      </q-popup-proxy>
    </q-input>

    <div
      class="text-red error_text animated animate__fadeInDown"
      v-if="verifyCodeMatch"
    >
      {{ $t("error.verify_error") }}
    </div>

    <!--btn-->
    <div class="row full-width justify-end">
      <q-btn
        :disabled="!isValid || verifyCodeMatch || verify === ''"
        class="confrim_btn content_btn"
        @click="submitForm"
        >{{ $t("auth.confirm") }}</q-btn
      >
    </div>
  </div>
  <EditSuccess v-if="success" :content="success_submit" />
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import EditSuccess from "src/components/profile/edit_success.vue";

export default defineComponent({
  name: "EamilCompoent",
  props: {},
  components: { EditSuccess },

  data() {
    return {
      email: "",
      verify: "",
      success: false,
      success_submit: "email",
      vaildation_sent: false,
      isVerifyBtnClicked: false,
    };
  },
  computed: {
    verifyCodeMatch() {
      return this.verify === "wrong";
    },
    isValid() {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(this.email);
    },
  },

  methods: {
    checkVerification() {
      this.isVerifyBtnClicked = true;
      if (!this.isValid) {
        // Handle the validation error here
      } else {
        // Handle the form submission here
        this.vaildation_sent = true;
      }
    },
    submitForm() {
      // do your form submission logic here

      // set success to true to trigger the reload
      this.success = true;
    },
  },
  watch: {
    // watch for the success property to change
    success(newVal) {
      if (newVal) {
        // delay the reload by 1000 milliseconds (1 second)
        setTimeout(() => {
          this.$router.push({ name: "prorfile_personal_info" });
        }, 2000);
      }
    },
  },
});
</script>

<style scoped>
.align-password-margin {
  margin-top: 6px;
}
@media screen and (max-width: 600px) {
  .align-password-margin {
    margin-top: 0;
  }
}
</style>
