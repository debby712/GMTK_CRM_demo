<template>
  <div style="margin-top: auto; margin-bottom: auto">
    <q-select
      label="Quasar Language"
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 150px"
    />
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  name: "SwitcherL",

  setup() {
    const { locale, setLocale } = useI18n({ useScope: "global" });

    const localeOptions = [
      { value: "en-us", label: "English" },
      { value: "zh-TW", label: "cn" },
    ];

    return {
      locale,
      localeOptions,
      setLocale,
    };
  },
  watch: {
    locale(newLocale) {
      this.setLocale(newLocale);
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  .q-list {
    margin-top: 20px;
  }
  .phone-margin {
    margin-right: -20px;
    padding: 0 -40px !important;
  }
}
</style>
