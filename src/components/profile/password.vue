<template>
  <div
    class="row animated animate__slideInRight animate__faster"
    v-if="!success"
  >
    <div class="col-lg-6 col-md-6 col-12">
      <div class="row tab-inner">
        <div class="edit_title">{{ $t("profile.enter_new_pw") }}</div>
        <q-input
          :placeholder="$t('profile.enter_new_pw')"
          class="col-12 input-field-title-margin"
          v-model="password"
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <!--re-->

        <q-input
          :placeholder="$t('profile.enter_again')"
          class="col-12 input-field-title-margin"
          v-model="re_password"
          lazy-rules
          :type="reisPwd ? 'password' : 'text'"
          :rules="[]"
        >
          <template v-slot:append>
            <q-icon
              :name="reisPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="reisPwd = !reisPwd"
            />
          </template>
        </q-input>
        <!--btn-->
        <div class="row full-width justify-end">
          <q-btn
            :disabled="isInvalidPassword"
            class="confrim_btn content_btn align-email-margin"
            @click="submitForm"
            >{{ $t("auth.confirm") }}</q-btn
          >
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-6 col-12">
      <q-card class="no-shadow my-shadow waring-card">
        <q-card-section class="row items-start items-start">
          <q-icon
            class="text-primary col-1 q-mt-xs alert-icon"
            size="22px"
            name="eva-alert-triangle"
          />
          <div class="card-warning-text col-11">
            {{ $t("auth.password_req") }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <EditSuccess v-if="success" :content="success_submit" />
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import EditSuccess from "src/components/profile/edit_success.vue";
export default defineComponent({
  name: "PasswordCompoent",
  props: {},
  components: { EditSuccess },
  data() {
    return {
      pw_require: this.$t("auth.password_req"),
      password: "",
      re_password: "",
      isPwd: ref(true),
      reisPwd: ref(true),
      success: false,
      success_submit: "password",
    };
  },
  computed: {
    isInvalidPassword() {
      if (!this.password || !this.re_password) {
        return true;
      }
      if (
        this.password !== this.re_password ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(this.password)
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
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
.waring-card {
  margin-top: 100px;
}
@media screen and (max-width: 600px) {
  .waring-card {
    margin: 0 10px;
  }
}
.align-email-margin {
  margin-top: 50px;
}
@media screen and (max-width: 600px) {
  .align-email-margin {
    margin-top: 44px;
  }
}
</style>
