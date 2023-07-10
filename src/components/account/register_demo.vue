<template>
  <div>
    <div class="reg_inner_padding">
      <div class="register_title">{{ $t("label.create_mock_acc") }}</div>
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
          v-model="acc_type_selection"
          :options="acc_type"
          dropdown-icon="expand_more"
          :label="$t('label.acc_type')"
        />

        <q-select
          class="col"
          :class="{ 'col-12': $q.screen.width <= 600 }"
          v-model="acc_balance_selection"
          :options="acc_balance"
          dropdown-icon="expand_more"
          :label="$t('label.acc_type_amount')"
        />
      </div>
      <div
        class="row q-mt-md input-margin-top"
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
          v-model="platform"
          :label="$t('label.platform')"
        />
        <q-input
          filled
          disable
          class="col"
          :class="{ 'col-12': $q.screen.width <= 600 }"
          v-model="currency"
          :label="$t('label.currency')"
        />
      </div>
      <div class="row justify-center input-margin-top">
        <q-btn
          class="content_btn"
          color="primary"
          :label="$t('auth.confirm')"
          :disable="submitButtonDisabled"
          @click="submitFormMock"
        />
      </div>
    </div>
  </div>
  <q-dialog v-model="mockmodalShown" persistent>
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
      <q-card-section class="text-center justify-center dialog-card-inner">
        <q-icon
          name="eva-checkmark-circle-2-outline
"
          class="dialog_icon"
        />

        <h3 class="msg text-dark-green">
          {{ $t("auth.mock_reg_success") }}
        </h3>
        <h5 class="slogan">{{ $t("auth.mock_slogan") }}</h5>
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
              <div class="user_info">GMTK-demo1</div>
            </div>
          </div>
        </div>
        <div class="row">
          <!--pc-->
          <div class="col desktop-only">
            <div class="img_card">
              <div class="dialog_success_img">
                <img src="~assets/pcImg.png" />
                <div class="download_title">{{ $t("platform.pc_title") }}</div>
                <div class="img_card_caption">
                  {{ $t("platform.pc_dialog_caption") }}
                </div>
              </div>
              <div class="row">
                <q-btn
                  outline
                  color="primary"
                  class="success_dialog_btn btn_outlined"
                  :label="this.$t('label.download_mt4')"
                  :to="{ name: 'mt4' }"
                />
              </div>
            </div>
          </div>
          <!--webtrader-->
          <div class="col">
            <div class="img_card">
              <div class="dialog_success_img">
                <img src="~assets/webImg.png" />
                <div class="download_title">{{ $t("platform.web_title") }}</div>
                <div class="img_card_caption">
                  {{ $t("platform.web_dialog_caption") }}
                </div>
              </div>
              <div class="row">
                <q-btn
                  id="button"
                  class="success_dialog_btn desktop-only"
                  :label="this.$t('label.open_webtrader')"
                  :to="{ name: 'mt4' }"
                />
                <q-btn
                  outline
                  color="primary  mobile-only "
                  class="success_dialog_btn btn_outlined"
                  :label="this.$t('label.open_webtrader')"
                  :to="{ name: 'mt4' }"
                />
              </div>
            </div>
          </div>
          <!--mobile-->
          <div class="col mobile-only">
            <div class="img_card">
              <div class="dialog_success_img">
                <img src="~assets/mobileImg.png" />
                <div class="download_title">
                  {{ $t("platform.mobile_title") }}
                </div>
                <div class="img_card_caption">
                  {{ $t("platform.mobile_dialog_caption") }}
                </div>
              </div>
              <div class="row">
                <q-btn
                  id="button"
                  class="success_dialog_btn"
                  :label="this.$t('label.download_mobile_mt4')"
                  :to="{ name: 'mt4' }"
                />
              </div>
            </div>
          </div>
          <!--end-->
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

export default defineComponent({
  name: "register_demo",
  components: {},
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
      country: "台灣",
      nation: "台灣",
      address: "",

      invitation_code: "IB18722615",
      idtype: [
        { label: this.$t("auth.idcard"), value: "idcard" },
        { label: this.$t("auth.password"), value: "password" },
      ],
      acc_selection: "",
      acc_type_selection: "",
      acc_balance_selection: "",

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

      acc_type: ["Standard 100:1 / Prime 250:1 / Pro X 500:1"],
      deposit_acc_type: ["Standard 100:1", "Prime 250:1", "Pro X 500:1"],
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
      this.mockmodalShown = false;
      this.$router.push({ name: "accounts_demo" });
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

    submitFormMock() {
      // add your form submission logic here
      this.mockmodalShown = true;
    },
    goToMoclAccounts() {
      this.showAccInfo = true;
      this.mockmodalShown = false;
      this.$emit("mockform-submitted");
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
.register_title {
  font-size: 28px;
  text-align: center;
  line-height: 22px;
}

.remark {
  font-weight: 900;
  font-size: 12px;
  display: block;
}
.input-margin-top {
  margin-top: 40px;
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
}
@media screen and (max-width: 600px) {
  .input-margin-top {
    margin-top: 0;
  }
  .checkbox {
  }
  .dialog-card-inner {
    margin-bottom: 0px;
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
.dialog-card-inner {
  margin-bottom: 30px;
}
</style>
