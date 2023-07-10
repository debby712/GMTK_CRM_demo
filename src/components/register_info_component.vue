<template>
  <div>
    <q-form @submit="onSubmit" class="q-gutter-y-md">
      <div class="row">
        <div class="select-label">
          {{ $t("auth.title") }}
        </div>
        <q-select
          outlined
          dropdown-icon="expand_more"
          v-model="title.value"
          :options="title.options"
          class="full-width input-field-title-margin"
          :display-value="title.value?.label ?? $t('auth.plz_choose')"
          :rules="[
            (val) => (val && val.label?.length > 0) || $t('error.require'),
          ]"
        />
      </div>
      <!-- 名字、姓氏、出生日期 -->
      <div class="row">
        <div class="col select-label">{{ $t("auth.firstname") }}</div>
        <div class="col select-label">{{ $t("auth.lastname") }}</div>
        <div class="col select-label">{{ $t("auth.bday") }}</div>
      </div>
      <div class="row input-field-title-margin">
        <q-input
          class="col q-mr-sm"
          outlined
          v-model="firstname"
          :placeholder="$t('auth.enter') + $t('auth.firstname')"
          :rules="[(val) => (val && val.length > 0) || $t('error.require')]"
        />

        <q-input
          class="col q-mr-sm"
          outlined
          v-model="lastname"
          :placeholder="$t('auth.enter') + $t('auth.lastname')"
          :rules="[(val) => (val && val.length > 0) || $t('error.require')]"
        />
        <q-input
          class="col"
          lazy-rules
          outlined
          mask="##/##/####"
          v-model="bday"
          placeholder="dd/mm/yyyy"
          :rules="[(val) => (val && val.length > 9) || $t('error.require')]"
        />
      </div>
      <!--  -->
      <div class="row">
        <div class="col select-label">{{ $t("auth.contact_num") }}</div>
      </div>
      <div class="row input-field-title-margin">
        <q-select
          class="col-lg-4 col-md-4 col-sm-6 col-xs-6 q-mr-sm"
          outlined
          v-model="area_code.value"
          use-input
          hide-selected
          fill-input
          behavior="menu"
          input-debounce="0"
          @filter="onFilter"
          :options="this.area_code.options"
          :placeholder="$t('auth.plz_choose')"
          dropdown-icon="expand_more"
          :display-value="area_code.value?.label ?? ''"
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
          :rules="[
            (val) => (val && val.length > 0) || $t('error.phone_number'),
          ]"
        />
      </div>

      <div class="justify-center row">
        <q-btn
          :loading="sending"
          class="content_btn q-mt-md"
          :label="$t('auth.confirm')"
          type="submit"
          :disabled="!isFormValid"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CountryCodes from "./CountryCodes.json";

const codeOptions = CountryCodes.map((code) => ({
  label: `${code.name} (${code.dial_code})`,
  value: code.dial_code,
}));
export default defineComponent({
  name: "Reg_info_Props",

  components: {},
  data() {
    return {
      title: {
        value: null, // {label: title, value: 1}
        options: [
          { label: this.$t("auth.sir"), value: 0 },
          { value: 1, label: this.$t("auth.ms") },
          { value: 2, label: this.$t("auth.miss") },
        ],
      },
      firstname: "",
      lastname: "",
      bday: "",
      area_code: {
        value: null, // {label: `code`, value: "+886"}
        options: null, // 使用onfilter的回調，統一設定。
      },
      phone: null,
      sending: false,
    };
  },

  methods: {
    onFilter(val, doneFn) {
      if (val?.length > 0) {
        doneFn(() => {
          this.area_code.options = codeOptions.filter((code) =>
            code.label?.toLowerCase()?.includes(val?.toLowerCase())
          );
        });
        return;
      } else {
        doneFn(() => {
          this.area_code.options = codeOptions;
        });
      }
    },
    onSubmit() {
      this.sending = true;
      AxiosProvider.post("/Req_ClientDataSubmit.aspx", {
        Mode: 1,
        ClientName: this.firstname + this.lastname,
        Title: this.title.value.value,
        FirstName: this.firstname,
        LastName: this.lastname,
        Birthday: this.bday,
        Country: this.area_code?.value.label.split("(")[0],
        PhoneCountry: this.area_code?.value.value?.match(/\d+/g).join(""), // 挑出數字,
        PhoneNumber: /^0(.*)$/.test(this.phone)
          ? this.phone?.slice(1)
          : this.phone, // 移除開頭為0,
        Password: useStorage().getStorageSync("password"),
      })
        .then(() => {
          const login_session = useStorage().getStorageSync("login_session");
          const production_href = `https://crm.gmtk.asia/#/accounts/register_live_account?nothing=${login_session}`;
          const development_href = `http://192.168.62.88:8087/#/accounts/register_live_account?nothing=${login_session}`;
          window.location.href = process.env.DEV
            ? development_href
            : production_href;
        })
        .catch((e) => {
          const useCode = e.response.data?.code;
          this.$q.notify({
            type: "negative",
            message: this.$t(`error.${useCode ?? 0}`),
            timeout: 1500,
            position: "bottom",
          });
          if (["13", "14"].includes(useCode)) {
            this.form?.reset();
          } else if (["90", "91"].includes(useCode)) {
            this.$router.push("/auth/login");
          }
        })
        .finally(() => {
          this.sending = false;
        });
    },
  },
  computed: {
    isFormValid() {
      const [day, month, year] = this.bday?.split("/");
      // check if all required fields are filled and pass validation
      return (
        this.title.value &&
        this.firstname &&
        this.lastname &&
        this.area_code.value &&
        this.phone &&
        this.bday &&
        this.bday.length === 10 &&
        day <= 31 &&
        month <= 12 &&
        year >= 1900
      );
    },
  },
  mounted() {
    if (process.env.DEV) {
      this.title.value = { label: this.$t("auth.sir"), value: 0 };
      this.firstname = " ";
      this.lastname = " ";
      this.bday = " ";
      this.area_code.value = codeOptions.find((code) =>
        code?.label?.includes("886")
      );
      this.phone = " ";
    } else {
      AxiosProvider.post("/Req_ClientDataSubmit.aspx", { Mode: 1 })
        .then(({ data: resData }) => {
          const { User_Status } = resData.data || {};
          if (User_Status > 0) {
            const login_session = useStorage().getStorageSync("login_session");
            window.location.href = `https://www.gmtk.asia/crm/#/accounts/register_live_account?nothing=${login_session}`;
          }
        })
        .catch((e) => {
          const useCode = e.response.data?.code;
          this.$q.notify({
            message: this.$t(`error.${useCode}`),
            type: "",
            timeout: 3000,
            position: "top-right",
          });
          if (["90", "91"].includes(useCode)) {
            this.$router.push("/auth/login");
          }
        });
    }
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
