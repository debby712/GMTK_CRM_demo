<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
      <div class="row">
        <div class="select-label">
          {{ $t("auth.title") }}
        </div>
        <q-select
          outlined
          dropdown-icon="expand_more"
          v-model="title"
          :options="titles"
          class="full-width input-field-title-margin"
          :placeholder="$t('auth.plz_choose')"
          :display-value="` ${title ? title : this.$t('auth.plz_choose')}`"
          :rules="[(val) => (val && val.length > 0) || this.require]"
        />
      </div>
      <div class="row">
        <div class="col select-label">{{ $t("auth.firstname") }}</div>
        <div class="col select-label">{{ $t("auth.lastname") }}</div>
      </div>
      <div class="row input-field-title-margin">
        <q-input
          class="col q-mr-sm"
          outlined
          v-model="firstname"
          :placeholder="$t('auth.enter') + $t('auth.firstname')"
          :rules="[(val) => (val && val.length > 0) || this.require]"
        />

        <q-input
          class="col"
          outlined
          v-model="lastname"
          :placeholder="$t('auth.enter') + $t('auth.lastname')"
          :rules="[(val) => (val && val.length > 0) || this.require]"
        />
      </div>
      <div class="row">
        <div class="col select-label">{{ $t("auth.contact_num") }}</div>
      </div>
      <div class="row input-field-title-margin">
        <q-select
          class="col-lg-4 col-md-4 col-sm-6 col-xs-6 q-mr-sm"
          outlined
          v-model="area_code"
          use-input
          hide-selected
          fill-input
          behavior="menu"
          input-debounce="0"
          @filter="filterFn"
          :options="filteredOptions"
          dropdown-icon="expand_more"
          :display-value="`${
            area_code
              ? area_code.label || area_code
              : this.$t('auth.plz_choose')
          }`"
          virtual-scroll
          @on-scroll="onSelectScroll"
          ><template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"
                >{{ $t("error.no_result") }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input
          class="col"
          outlined
          type="number"
          v-model="phone"
          style="-webkit-appearance: none"
          pattern="\d*"
          :rules="[(val) => (val && val.length > 0) || this.plz_correct_phone]"
        />
      </div>
      <div class="row">
        <div class="select-label">{{ $t("auth.mail_address") }}</div>
        <q-input
          outlined
          class="col-12 input-field-title-margin"
          v-model="email"
          type="email"
          :options="options"
          :placeholder="$t('auth.mail_address')"
        />
      </div>
      <div class=" ">
        <q-input
          class="col"
          outlined
          :placeholder="$t('auth.enter') + $t('auth.verify')"
          v-model="verify"
          bottom-slots
          lazy-rules
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
      </div>
      <div class="row">
        <div class="select-label">{{ $t("auth.password") }}</div>
        <q-input
          class="col-12 input-field-title-margin"
          outlined
          v-model="password"
          :placeholder="$t('auth.enter') + $t('auth.password')"
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (val) => !!val || this.pw_require,
            (val) =>
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(val) ||
              this.pw_require,
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="justify-center row">
        <q-btn
          class="content_btn q-mt-md"
          :label="$t('auth.confirm')"
          type="submit"
          :disabled="!isFormValid || verifyCodeMatch || verify === ''"
          color="primary"
        />
      </div>
    </q-form>
    <!--dialog-->
    <q-dialog
      v-model="showDialog"
      class="no-shadow my-shadow"
      style="border-radius: 16px"
      persistent
    >
      <q-card class="full-width q-pa-lg q-mx-lg">
        <q-card-section class=" ">
          <div class="row text-center justify-center">
            <q-icon class="text-positive" size="52px" name="check_circle" />
          </div>
        </q-card-section>
        <div class="row text-center justify-center">
          <h5 class="info_text">{{ $t("auth.successful_reg") }}</h5>
        </div>
        <q-card-section class="text-center text-dark q-py-lg q-mt-md">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 text-left mx-auto">
              <div class="text-dark info_text">
                {{ email }}
              </div>
              <div class="text-my-grey info_subtext">
                {{ $t("auth.login_acc") }}
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 text-left mx-auto">
              <div class="text-dark info_text">
                {{ password }}
              </div>
              <div class="text-my-grey info_subtext">
                {{ $t("auth.login_pw") }}
              </div>
            </div>
          </div>
          <div class="q-mt-md">
            <div>{{ $t("auth.redirect_to_login") }}</div>

            <q-btn
              v-close-popup
              class="content_btn q-mt-md"
              :label="$t('label.back')"
              color="primary"
              @click="redirectToPage"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import CountryCodes from "./CountryCodes.json";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Reg_Props",

  components: {},
  data() {
    return {
      mt4_standard: "314478451",
      mt4_prime: "314478452",
      mt4_pro: "314478453",
      checking: false,
      plz_enter: this.$t("auth.plz_enter"),
      require: this.$t("error.require"),
      pw_require: this.$t("auth.password_req"),
      plz_correct_phone: this.$t("error.phone_number"),
      title: "",
      firstname: "",
      lastname: "",
      area_code: "",
      filteredOptions: CountryCodes.map((code) => ({
        label: `${code.name} (${code.dial_code})`,
        value: code.dial_code,
      })),
      phone: "",
      isPwd: ref(true),
      email: " ",
      verify: "",
      password: "",
      model: ref(null),
      titles: [this.$t("auth.sir"), this.$t("auth.ms"), this.$t("auth.miss")],
      isVerifyBtnClicked: false,
      isErrorShowing: false,
      showDialog: false,
      vaildation_sent: false,
    };
  },

  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.filteredOptions = CountryCodes.map((code) => ({
            label: `${code.name} (${code.dial_code})`,
            value: code.dial_code,
          }));
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredOptions = CountryCodes.filter(
          (v) =>
            v.name.toLowerCase().indexOf(needle) > -1 ||
            v.dial_code.indexOf(needle) > -1
        ).map((code) => ({
          label: `${code.name} (${code.dial_code})`,
          value: code.dial_code,
        }));
      });
    },
    checkVerification() {
      this.isVerifyBtnClicked = true;
      if (!this.isValid) {
        // Handle the validation error here
      } else {
        // Handle the form submission here
        this.vaildation_sent = true;
      }
    },
    onSubmit() {
      {
        this.showDialog = true;
        // Wait for 3 seconds before navigating to success/crm
        //setTimeout(() => {
        //   this.router.push("login");
        //}, 5000);
      }
    },
    redirectToPage() {
      // Replace "https://example.com" with the URL of the page you want to redirect to
      window.location.href = "#/auth/login";
    },
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
    isFormValid() {
      // check if all required fields are filled and pass validation
      return (
        this.title &&
        this.firstname &&
        this.lastname &&
        this.area_code &&
        this.phone &&
        this.email &&
        this.password &&
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(this.password) && // password rule
        this.isValid
      );
    },
  },
});
</script>

<style scoped>
.my-selector {
  background-color: #080c18 !important;
}
p {
  font-size: 14px !important;
  text-align: left !important;
  margin-bottom: 0 !important;
  color: #080c18;
}
.info_text {
  font-weight: bold;
  font-size: 18px;
}
.info_subtext {
  font-weight: normal;
  font-size: 14px;
  text-align: left;
}
.mt4-name {
  line-height: 34px !important;
  font-weight: normal;
  font-size: 14px;
  margin-left: 16px;
  text-align: left;
}
.error_text {
  margin-top: -15px;
  margin-bottom: -3px;
  margin-left: 8px;
  font-size: 8px;
}
@media screen and (max-width: 600px) {
  .error_text {
    font-size: 12px;
  }
  .mt4-name {
    display: block !important;
  }
}
</style>
