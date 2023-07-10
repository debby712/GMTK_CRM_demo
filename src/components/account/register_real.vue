<template>
  <!--register-->
  <div>
    <div class="reg_inner_padding">
      <div class="register_title q-mb-md">
        {{ $t("label.create_real_acc") }}
      </div>

      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        header-class="my-stepper-class"
        flat
        class="no-shadow"
        active-color="white"
        done-color="white"
      >
        <q-step
          class="my-step-class"
          :name="1"
          :done="step > 1"
          :title="$t('auth.reg_step_1')"
        >
          <div>
            <div
              class="row input-margin-top"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
                'q-gutter-x-lg': $q.screen.width > 600,
              }"
            >
              <q-input
                filled
                disable
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="title"
                :label="$t('auth.title')"
              />
              <q-input
                filled
                disable
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="firstname"
                :label="$t('auth.firstname')"
              />
              <q-input
                filled
                disable
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="lastname"
                :label="$t('auth.lastname')"
              />
            </div>
            <div
              class="row input-margin-top"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
                'q-gutter-x-lg': $q.screen.width > 600,
              }"
            >
              <q-input
                filled
                disable
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="mail_address"
                :label="$t('auth.mail_address')"
              />
              <q-input
                filled
                disable
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="contact_num"
                :label="$t('auth.contact_num')"
              />
            </div>
            <div
              class="row input-margin-top"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
                'q-gutter-x-lg': $q.screen.width > 600,
              }"
            >
              <q-select
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="id_type"
                :options="idtype"
                dropdown-icon="expand_more"
                :label="$t('auth.id')"
              />
              <q-input
                v-model="id_no"
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                :label="$t('auth.id_no')"
              />

              <FileUploadBtn />
            </div>

            <div class="row">
              <q-checkbox v-model="agree" class="col-1 checkbox" size="sm" />
              <div class="text-my-grey q-mt-md checkbox-text col">
                {{ $t("auth.confirmation_reg_check") }}
                <a
                  target="_blank"
                  href="https://www.gmtk.asia/pdf/GMTK_Disclaimer.pdf"
                  >{{ $t("label.disclaimer") }}</a
                >,
                <a
                  target="_blank"
                  href="https://www.gmtk.asia/pdf/GMTK_Confidentiality_Agreement.pdf"
                  >{{ $t("label.privacy") }}</a
                >,
                <a
                  target="_blank"
                  href="https://www.gmtk.asia/pdf/GMTK_Risk_Disclosure_Statement.pdf"
                  >{{ $t("label.TnC") }}</a
                >,
                <a
                  target="_blank"
                  href="https://www.gmtk.asia/pdf/GMTK_Customer_Agreement.pdf"
                  >{{ $t("nav.client_agreement") }}</a
                >
                {{ $t("auth.confirmation_reg_check_second") }}
              </div>
            </div>
            <div class="row justify-center q-mt-sm">
              <q-btn
                class="content_btn"
                color="primary"
                @click="nextStep"
                :label="$t('auth.next')"
                :disable="!isValidStep1"
                disable-color="grey-5"
              />
            </div>
          </div>
        </q-step>

        <q-step
          class="text-primary"
          :name="2"
          :done="step > 2"
          :title="$t('auth.reg_step_2')"
        >
          <div>
            <div
              class="row input-margin-top"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
                'q-gutter-x-lg': $q.screen.width > 600,
              }"
            >
              <q-select
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="country"
                @filter="filterFn"
                :options="filteredOptions"
                use-input
                hide-selected
                fill-input
                behavior="menu"
                input-debounce="0"
                dropdown-icon="expand_more"
                :label="$t('auth.living_country')"
              />
              <q-select
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="nation"
                dropdown-icon="expand_more"
                @filter="filterFn"
                :options="filteredOptions"
                use-input
                hide-selected
                fill-input
                behavior="menu"
                input-debounce="0"
                :label="$t('auth.nation')"
              />
            </div>

            <q-input
              class="row input-margin-top"
              v-model="address"
              :label="$t('auth.address')"
              :placeholder="$t('auth.plz_enter')"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
              }"
            />

            <div
              class="row input-margin-top"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
                'q-gutter-x-lg': $q.screen.width > 600,
              }"
            >
              <q-input
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="city"
                :label="$t('auth.city')"
                :placeholder="$t('auth.plz_enter')"
              />
              <q-input
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="state"
                :label="$t('auth.state')"
                :placeholder="$t('auth.plz_enter')"
              />
              <q-input
                class="col"
                :class="{ 'col-12': $q.screen.width <= 600 }"
                v-model="mail_code"
                :label="$t('auth.mail_code')"
                :placeholder="$t('auth.plz_enter')"
              />
            </div>

            <div
              class="row justify-center input-margin-top"
              :class="{
                'q-gutter-y-lg': $q.screen.width <= 600,
                'q-gutter-x-lg': $q.screen.width > 600,
              }"
            >
              <q-btn
                class="content_btn"
                outline
                color="primary"
                @click="prevStep"
                :label="$t('auth.pre')"
              />
              <q-btn
                class="content_btn"
                color="primary"
                @click="submitForm"
                :label="$t('auth.confirm')"
                :disable="!isValidStep2"
              />
            </div>
          </div>
        </q-step>
      </q-stepper>
    </div>
  </div>
  <q-dialog v-model="modalShown" persistent :maximized="maximizedToggle">
    <q-card class="success_dialog">
      <q-card-section class="row justify-end gt-xs">
        <div class="fixed">
          <q-btn
            color="grey-6"
            icon="close"
            class="no-shadow text-my-gray close-btn"
            round
            @click="closemodal"
          /></div
      ></q-card-section>
      <q-card-section
        class="text-center items-center justify-center dialog-card-inner"
      >
        <q-icon
          name="eva-checkmark-circle-2-outline
"
          class="dialog_icon"
          size="60px"
        />

        <h3 class="msg text-dark-green">
          {{ $t("auth.live_reg_success") }}
        </h3>
        <h5 class="slogan">{{ $t("auth.live_slogan") }}</h5>
        <div class="info_box">
          <div class="row">
            <div class="col acc_info">
              <div class="acc_type"><img src="~assets/standard.svg" /></div>
              <div class="acc_id">{{ mock_account.standard.no }}</div>
            </div>
            <div class="col acc_info">
              <div class="acc_type"><img src="~assets/prime.svg" /></div>
              <div class="acc_id">{{ mock_account.prime.no }}</div>
            </div>
            <div class="col acc_info">
              <div class="acc_type"><img src="~assets/PROX.svg" /></div>
              <div class="acc_id">{{ mock_account.pro.no }}</div>
            </div>
          </div>
          <q-separator class="q-mx-lg q-my-md" />
          <div class="row">
            <div class="col">
              <div class="remark">{{ $t("acc.login_pw") }}</div>
              <div class="user_info">0018239921</div>
            </div>
            <div class="col">
              <div class="remark">{{ $t("acc.server") }}</div>
              <div class="user_info">GMTK-Live1</div>
            </div>
          </div>
        </div>
        <div class="img_card">
          <div class="dialog_success_img">
            <img src="~assets/real_reg_success.png" />
            <div class="img_card_caption nowrap-text">
              {{ $t("acc.live_reg_startnow") }}
            </div>
          </div>
          <div class="row">
            <q-btn
              id="button"
              class="success_dialog_btn"
              :label="this.$t('label.deposit_now')"
              :to="{ name: 'wallet_deposit' }"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="row fixed-bottom items-center full">
      <q-btn
        id="button"
        color="grey-6"
        icon="close"
        class="no-shadow text-my-gray lt-sm mobile-close-btn"
        round
        @click="closemodal"
      />
    </div>
  </q-dialog>
</template>

<script>
import CountryCodes from "../../../public/CountryCodes.json";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Ref } from "vue";
import { accounts } from "src/components/acc_data.js";
import { mock_accounts } from "src/components/acc_data.js";
import FileUploadBtn from "src/components/file_uploader.vue";
import imgUploadBtn from "src/components/img_upload.vue";
export default defineComponent({
  name: "register_live",
  components: { FileUploadBtn },
  data() {
    return {
      showAccInfo: false,
      showform: false,
      account: accounts,
      mock_account: mock_accounts,
      step: 1,
      title: this.$t("auth.sir"),
      firstname: "Tai Man",
      lastname: "Chan",
      filteredOptions: CountryCodes.map((code) => ({
        label: `${code.name} `,
        value: code.name,
      })),
      mail_address: "taimanChan@gmail.com",
      contact_num: "+866 12457487451",
      id_type: "",
      id_no: "",
      agree: false,
      country: "Taiwan",
      nation: "Taiwan",
      address: "",
      invitation_code: "IB18722615",
      idtype: [
        { label: this.$t("auth.idcard"), value: "idcard" },
        { label: this.$t("auth.password"), value: "password" },
      ],

      acc_type_selection: "",
      acc_balance_selection: "",
      modalShown: false,
      mockmodalShown: false,
      loading: false,
    };
  },
  setup() {
    const router = useRouter();

    return {
      router,

      tab: ref("live"),
      platform: "MetaTrader4",
      currency: "USD",

      acc_type: ["Standard 100:1", "Prime 250:1", "Pro X 500:1"],

      acc_balance: ["100,000", "50,000", "10,000", "1,000"],
    };
  },
  computed: {
    countryNames() {
      return CountryCodes.map((country) => ({
        label: country.name,
        value: country.name,
      }));
    },
    nationNames() {
      return CountryCodes.map((country) => ({
        label: country.name,
        value: country.name,
      }));
    },
    submitButtonDisabled() {
      return !this.acc_type_selection || !this.acc_balance_selection;
    },
    isValidStep1() {
      return this.id_no && this.id_type && this.agree;
    },
    isValidStep2() {
      return this.country && this.nation && this.address;
    },
  },

  methods: {
    closemodal() {
      this.modalShown = false;
      this.$router.push({ name: "accounts_live" });
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.filteredOptions = CountryCodes.map((code) => ({
            label: `${code.name} `,
            value: code.name,
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
          label: `${code.name}  `,
          value: code.name,
        }));
      });
    },
    nextStep() {
      this.step = 2;
    },
    prevStep() {
      this.step = 1;
    },
    submitForm() {
      this.modalShown = true;

      //   setTimeout(() => {
      //    this.$router.push({ name: "accounts", query: { tab: "live" } });
      // }, 3000);
    },
    goToRealAccounts() {
      this.showAccInfo = true;
      this.modalShown = false;
      this.$emit("form-submitted");

      this.$router.push({ name: "accounts_real" });
    },
    submitFormMock() {
      // add your form submission logic here
      this.mockmodalShown = true;
      setTimeout(() => {
        this.$router.push({ name: "accounts", query: { tab: "demo" } });
      }, 5000);
    },
    goToMockAccounts() {
      this.$router.push({ name: "accounts", query: { tab: "demo" } });
    },
  },
});
</script>
<style scoped>
.uploadbtn {
  border-radius: 6px;
  padding: auto 40px;
}
.uploader_card {
  border-radius: 8x;
  padding: 40px;
}
a {
  color: #045de9 !important;
}
#button {
  color: #fff !important;
}
.create_success_sub {
  font-size: 28px;
  text-align: center !important;
}
.create_success_title {
  font-size: 38px;
}

.register_title {
  font-size: 28px;
  text-align: center;
  line-height: 22px;
}
.remark {
  font-weight: 900;
  font-size: 12px;
  display: inline-block;
}
.input-margin-top {
  margin-top: 40px;
}
.checkbox-text {
  padding-left: -120px;
}
.checkbox {
  margin: 0;
}
.dialog-card-inner {
  margin-bottom: 30px;
}
.nowrap-text {
  white-space: nowrap;
}
@media screen and (max-width: 1024px) {
  .input-margin-top:first-child {
    margin-top: 20px;
  }

  .checkbox-text {
    font-size: 12px;
  }
  .checkbox {
  }
  .img_card_caption {
    height: 40px;
  }
}
@media screen and (max-width: 600px) {
  .dialog-card-inner {
    margin-bottom: 0px;
  }
  .input-margin-top {
    margin-top: 0;
  }
  .checkbox {
  }
}

.close-btn {
  margin-right: -20px;
  font-size: 12px;
  color: #d9d9d9;
  right: 0;
  transform: translate(20px, -30px);
}
.mobile-close-btn {
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}
.img_card_caption {
  height: 30px;
}

.nowrap-text {
  white-space: nowrap;
}
@media screen and (max-width: 600px) {
  .nowrap-text {
    white-space: wrap;
  }
}
</style>
