<template>
  <div style="margin-top: auto; margin-bottom: auto">
    <q-btn-dropdown
      flat
      v-model="showDropdown"
      class="dropdown-btn text-my-grey phone-margin"
      :class="{ rounded: $q.screen.width <= 600 }"
      dropdown-icon="expand_more"
    >
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-avatar left class="flag lt-md">
            <img :src="selectedIconSrc" />
          </q-avatar>

          <div class="text-center gt-md text-dark">{{ selectedLanguage }}</div>
        </div>
      </template>
      <q-list>
        <q-item
          v-for="(option, index) in options"
          :key="index"
          clickable
          @click="changeLanguage(option.value)"
        >
          <q-avatar class="flag">
            <img :src="option.icon" />
          </q-avatar>
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: "Switcher_lang",

  data() {
    return {
      langs: ["zh-TW", "en-US"],
      options: [
        {
          label: this.$t("nav.lang_zh_tw"),
          value: "zh-TW",
          icon: require("../assets/taiwan.png"),
        },
        {
          label: this.$t("nav.lang_en"),
          value: "en-us",
          icon: require("../assets/USD.png"),
        },
        {
          label: this.$t("nav.lang_zh_cn"),
          value: "zh-CN",
          icon: require("../assets/CNY.png"),
        },
      ],
      selectedLanguage: this.$t("nav.lang_zh_tw"),
      selectedIconSrc: require("../assets/taiwan.png"),
      showDropdown: false,
    };
  },
  methods: {
    changeLanguage(lang) {
      const selectedOption = this.options.find(
        (option) => option.value === lang
      );
      this.selectedLanguage = selectedOption?.label || "";
      this.selectedIconSrc = selectedOption?.icon || "";
      this.$root.$i18n.locale = lang;

      // Store the selected language in local storage
      localStorage.setItem("selectedLanguage", lang);

      this.showDropdown = false;
    },
  },

  mounted() {
    // Get the selected language from local storage (if any)
    const selectedLanguage = localStorage.getItem("selectedLanguage");

    if (selectedLanguage) {
      // Set the selected language from local storage
      this.changeLanguage(selectedLanguage);
    }
  },
  computed: {
    selectedIcon() {
      return this.selectedIconSrc;
    },
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
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
