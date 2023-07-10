<template>
  <div class="text-center" style="">
    <div style="padding: 150px 0">
      <q-icon
        name="eva-alert-triangle
"
        color="primary"
        size="50px"
      />
      <h3>{{ $t("label.create_live_acc_now") }}</h3>
      <q-btn
        :label="$t('label.goopenacc')"
        :to="{ name: 'accounts_real_form' }"
        class="confrim_btn"
      />
    </div>
  </div>
  <!--register-->
</template>

<script>
import CountryCodes from "../../../public/CountryCodes.json";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Ref } from "vue";
import { accounts } from "src/components/acc_data.js";
import { mock_accounts } from "src/components/acc_data.js";

export default defineComponent({
  name: "register_live",
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
  font-weight: 500;
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
a {
  color: #fff !important;
}
</style>
