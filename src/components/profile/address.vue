<template>
  <div
    class="row tab-inner animated animate__slideInRight animate__faster"
    v-if="!success"
  >
    <div class="edit_title">{{ $t("profile.enter_new_address") }}</div>

    <div class="row full-width">
      <q-select
        class="col q-mr-md"
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
      class="row full-width input-margin-top"
      v-model="address"
      :label="$t('auth.address')"
      :placeholder="$t('auth.plz_enter')"
    />

    <div class="row full-width input-margin-top">
      <q-input
        class="col q-mr-md"
        v-model="city"
        :label="$t('auth.city')"
        :placeholder="$t('auth.plz_enter')"
      />
      <q-input
        class="col q-mr-md"
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

    <div class="row full-width justify-center input-margin-top q-gutter-x-sm">
      <q-btn
        class="confrim_btn content_btn"
        @click="submitForm"
        :disable="inVaild"
        :label="$t('auth.confirm')"
      />
    </div>
  </div>
  <EditSuccess v-if="success" :content="success_submit" />
</template>

<script>
import { defineComponent } from "vue";
import CountryCodes from "../../../public/CountryCodes.json";
import EditSuccess from "src/components/profile/edit_success.vue";

export default defineComponent({
  name: "AddressComponent",
  props: {},
  components: { EditSuccess },
  data() {
    return {
      filteredOptions: CountryCodes.map((code) => ({
        label: `${code.name} `,
        value: code.name,
      })),
      country: "Taiwan",
      nation: "Taiwan",
      address: "",
      city: "",
      state: "",
      mail_code: "",
      success: false,
      success_submit: "address",
    };
  },
  computed: {
    inVaild() {
      // check if the address input is empty
      return this.address.trim().length === 0;
    },

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
  },
  methods: {
    submitForm() {
      // do your form submission logic here

      // set success to true to trigger the reload
      this.success = true;
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
.input-margin-top {
  margin-top: 40px;
}
</style>
