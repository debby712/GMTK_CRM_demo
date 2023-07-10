<template>
  <q-page class="container">
    <h3 style="margin-bottom: 7px" class="gt-xs">
      {{ $t("label.trading_account") }}
    </h3>
    <q-tabs
      v-model="tab"
      class="text-dark"
      active-color="dark"
      active-bg-color="white"
      indicator-color="primary"
      align="start"
      narrow-indicator
    >
      <q-tab name="live" :label="$t('label.real_account')" />
      <q-tab name="demo" class="tab-label" :label="$t('label.demo_account')" />
    </q-tabs>
    <q-separator inset class="tab_border" />

    <div class="container-inner">
      <q-tab-panels v-model="tab" animated class="tab-container">
        <q-tab-panel name="live">
          <!--register-->
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
                  <div class="row q-gutter-x-xl input-margin-top">
                    <q-input
                      filled
                      disable
                      class="col"
                      v-model="title"
                      :label="$t('auth.title')"
                    />
                    <q-input
                      filled
                      disable
                      class="col"
                      v-model="firstname"
                      :label="$t('auth.firstname')"
                    />
                    <q-input
                      filled
                      disable
                      class="col"
                      v-model="lastname"
                      :label="$t('auth.lastname')"
                    />
                  </div>
                  <div class="row q-gutter-x-xl input-margin-top">
                    <q-input
                      filled
                      disable
                      class="col"
                      v-model="mail_address"
                      :label="$t('auth.mail_address')"
                    />
                    <q-input
                      filled
                      disable
                      class="col"
                      v-model="contact_num"
                      :label="$t('auth.contact_num')"
                    />
                  </div>
                  <div class="row q-gutter-x-xl input-margin-top">
                    <q-select
                      class="col"
                      v-model="id_type"
                      :options="idtype"
                      dropdown-icon="expand_more"
                      :label="$t('auth.id')"
                    />
                    <q-input
                      v-model="id_no"
                      class="col"
                      :label="$t('auth.id_no')"
                    />
                    <q-input
                      filled
                      disable
                      class="col"
                      v-model="invitation_code"
                      :label="$t('auth.invitation_code')"
                    />
                  </div>

                  <q-checkbox
                    v-model="agree"
                    class="q-mt-lg text-my-grey"
                    :label="$t('auth.confirmation_reg_check')"
                  />
                  <div class="row justify-center q-mt-sm">
                    <q-btn
                      class="content_btn"
                      color="primary"
                      @click="nextStep"
                      :label="$t('auth.next')"
                      :disable="!isValidStep1"
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
                  <div class="row q-gutter-x-xl input-margin-top">
                    <q-select
                      class="col"
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
                    class="row q-gutter-x-xl input-margin-top"
                    v-model="address"
                    :label="$t('auth.address')"
                    :placeholder="$t('auth.plz_enter')"
                  />

                  <div class="row q-gutter-x-xl input-margin-top">
                    <q-input
                      class="col"
                      v-model="city"
                      :label="$t('auth.city')"
                      :placeholder="$t('auth.plz_enter')"
                    />
                    <q-input
                      class="col"
                      v-model="state"
                      :label="$t('auth.state')"
                      :placeholder="$t('auth.plz_enter')"
                    />
                    <q-input
                      class="col"
                      v-model="mail_code"
                      :label="$t('auth.mail_code')"
                      :placeholder="$t('auth.plz_enter')"
                    />
                  </div>

                  <div
                    class="row justify-center input-margin-top q-gutter-x-sm"
                  >
                    <q-btn
                      class="content_btn"
                      style="background: #7d8087; color: #fff"
                      @click="prevStep"
                      :label="$t('auth.pre')"
                    />
                    <q-btn
                      class="content_btn"
                      color="primary"
                      @click="submitForm"
                      :label="$t('auth.next')"
                      :disable="!isValidStep2"
                    />
                  </div>
                </div>
              </q-step>
            </q-stepper>
          </div>
        </q-tab-panel>

        <q-tab-panel name="demo">
          <div class="reg_inner_padding">
            <div class="register_title">{{ $t("label.create_mock_acc") }}</div>
            <div class="row full-width q-gutter-x-xl input-margin-top">
              <q-select
                class="col"
                v-model="acc_type_selection"
                :options="acc_type"
                dropdown-icon="expand_more"
                :label="$t('label.acc_type')"
              />
              <q-select
                class="col"
                v-model="acc_balance_selection"
                :options="acc_balance"
                dropdown-icon="expand_more"
                :label="$t('label.acc_type_amount')"
              />
            </div>
            <div class="row full-width q-gutter-x-xl q-mt-md input-margin-top">
              <q-input
                filled
                disable
                class="col"
                v-model="platform"
                :label="$t('label.platform')"
              />
              <q-input
                filled
                disable
                class="col"
                v-model="currency"
                :label="$t('label.currency')"
              />
            </div>
            <div class="row justify-center input-margin-top">
              <q-btn
                class="content_btn"
                color="primary"
                :label="$t('label.submit')"
                :disable="submitButtonDisabled"
                @click="submitFormMock"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-dialog v-model="modalShown" persistent :maximized="maximizedToggle">
      <div class="flex flex-center text-white text-center justify-center">
        <div class="item-center text-center">
          <div class="create_success_title">
            {{ $t("auth.live_reg_success") }}
          </div>
          <div class="create_success_sub">{{ $t("auth.live_slogan") }}</div>
        </div>
        <div class="row">
          <div class="col">
            <div class="user_info">
              GMTK-Live1
              <p class="remark">伺服器</p>
            </div>
            <div class="user_info">
              0018239921
              <p class="remark">登入密碼</p>
            </div>
          </div>
          <div class="col">
            <div class="user_info">
              {{ account.standard.no }}
              <p class="remark">MT4 Live - Standard</p>
            </div>
            <div class="user_info">
              {{ account.prime.no }}
              <p class="remark">MT4 Live - Prime</p>
            </div>
            <div class="user_info">
              {{ account.pro.no }}
              <p class="remark">MT4 Live - Pro X</p>
            </div>
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <q-card
            class="col text-center no-shadow my-shadow text-dark justify-center"
            ><q-card-section>桌面端</q-card-section
            ><q-card-section>立即存入資金，開始您的交易旅程吧！</q-card-section>
            <q-card-actions class="justify-center"
              ><q-btn color="primary" @click="goToRealAccounts"
                >立即入金</q-btn
              ></q-card-actions
            ></q-card
          >
        </div>
      </div>
    </q-dialog>

    <q-dialog v-model="mockmodalShown" persistent :maximized="maximizedToggle">
      <div class="flex flex-center text-white text-center justify-center">
        <div class="item-center text-center">
          <div class="create_success_title">
            {{ $t("auth.mock_reg_success") }}
          </div>
          <div class="create_success_sub">{{ $t("auth.mock_slogan") }}</div>
        </div>
        <div class="row">
          <div class="col">
            <div class="user_info">
              GMTK-demo1
              <p class="remark">伺服器</p>
            </div>
            <div class="user_info">
              0018239921
              <p class="remark">登入密碼</p>
            </div>
          </div>
          <div class="col">
            <div class="user_info">
              {{ mock_account.standard.no }}
              <p class="remark">MT4 Demo - Standard</p>
            </div>
            <div class="user_info">
              {{ mock_account.prime.no }}
              <p class="remark">MT4 Demo - Prime</p>
            </div>
            <div class="user_info">
              {{ mock_account.pro.no }}
              <p class="remark">MT4 Demo - Pro X</p>
            </div>
          </div>
        </div>
        <div class="row q-gutter-x-md">
          <q-card
            class="col text-center no-shadow my-shadow text-dark justify-center"
            ><q-card-section>桌面端</q-card-section
            ><q-card-section
              >將功能強大的交易平臺MT
              4下載到您的電腦上，GMTK與您一起開創交易美好未來。</q-card-section
            >
            <q-card-actions class="justify-center"
              ><q-btn color="primary">下載MetaTrader 4</q-btn></q-card-actions
            ></q-card
          >
          <q-card
            class="col text-center no-shadow my-shadow text-dark justify-center"
            ><q-card-section>桌面端</q-card-section
            ><q-card-section
              >您可以使用您的帳戶訪問常見且易於使用的網路交易平臺 MetaTrader
              4</q-card-section
            ><q-card-action
              ><q-btn color="primary">打開網頁平臺</q-btn></q-card-action
            ></q-card
          >
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import CountryCodes from "../../../public/CountryCodes.json";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Ref } from "vue";
import { accounts } from "src/components/acc_data.js";
import { mock_accounts } from "src/components/acc_data.js";

export default defineComponent({
  name: "accountRegisterPage",
  components: {},
  data() {
    return {
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
      country: "台灣",
      nation: "台灣",
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
      this.$router.push({ name: "accounts", query: { tab: "live" } });
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
.create_success_sub {
  font-size: 28px;
  text-align: center !important;
}
.create_success_title {
  font-size: 38px;
}
.user_info {
  font-family: "Barlow";
  display: inline-block;
  font-weight: 500;
  font-size: 20px;
}
.reg_inner_padding {
  padding: 40px 140px;
}
@media screen and (max-width: 1024) {
  .reg_inner_padding {
    padding: 0;
  }
}
.register_title {
  font-size: 28px;
  text-align: center;
  line-height: 22px;
}
.remark {
  font-weight: 500;
  font-size: 12px;
  display: inline-block;
}
.input-margin-top {
  margin-top: 40px;
}
</style>
