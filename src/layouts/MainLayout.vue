<template>
  <q-layout view="lHh LpR lff">
    <q-header bordered class="header item-center header">
      <q-toolbar class="">
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="lt-md"
          @click="toggleLeftDrawer"
        />
        <q-space class=" " />
        <h5 class="text-white phone-title text-weight-bold lt-md">
          {{ title }}
        </h5>
        <q-space class=" " />
        <!--right-->
        <div class="row">
          <q-btn-dropdown
            flat
            class="gt-xs text-my-grey"
            dropdown-icon="expand_more"
          >
            <template v-slot:label>
              <div class="row">
                <div class="total-balance">{{ $t("label.my_balance") }}</div>
                <q-icon class="dollor" name="fa-solid fa-dollar" />
                <p class="text-primary number-font balance">
                  {{ formattedBalance(totalBalance) }}
                </p>
              </div>
            </template>
            <balance_component />
          </q-btn-dropdown>
          <!--dropdown 2-->
          <q-btn-dropdown
            flat
            class="text-my-grey gt-xs"
            dropdown-icon="expand_more"
          >
            <template v-slot:label>
              <div class="row">
                <q-icon class="profile" name="eva-person-outline" />
              </div>
            </template>
            <User_Dropdown active_title="{active_title}" />
          </q-btn-dropdown>
          <Switcher_lang />
          <!--phone-->
          <q-btn-dropdown
            flat
            class="lt-md text-white self-end"
            dropdown-icon="more_vert"
          >
            <User_Dropdown />
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="240"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="drawer_width"
    >
      <!-- drawer content -->
      <q-list class="drawer">
        <a href="#/" class="logo row">
          <img class="nav-logo" src="~/assets/GMTK_logo_color.png" />
        </a>
        <div class="drawer_list">
          <li v-for="title in essentialLinks" :key="title.link">
            <q-btn
              :ripple="false"
              :to="title.link"
              align="left"
              flat
              class="mx-auto essenetialLink"
              active-class="link-active"
              :class="{ active: $route.path.includes(title.name) }"
            >
              <q-img class="icon" :src="title.icon" />
              {{ $t(title.title) }}</q-btn
            >
          </li>
          <q-separator inset style="margin-top: 20px" />

          <li v-for="title in essentialLinks_others" :key="title.link">
            <q-btn
              :ripple="false"
              :href="title.link"
              target="_blank"
              align="left"
              flat
              class="mx-auto essenetialLink"
              active-class="link-active"
            >
              <q-img class="icon" :src="title.icon" />
              {{ $t(title.title) }}</q-btn
            >
          </li>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container> <router-view /> <CS_button /> </q-page-container>
    <q-footer> <FooterComponent /></q-footer>
  </q-layout>
</template>

<script>
import SwitcherL from "src/components/Switcher_lang_new.vue";
import CS_button from "src/components/CS_button.vue";

import Switcher_lang from "src/components/Switcher_lang.vue";
import { ref } from "vue";
import User_Dropdown from "src/components/UserDropdown.vue";
import FooterComponent from "src/components/footer.vue";
import { accounts } from "src/components/acc_data.js";
import balance_component from "src/components/balance.vue";
export default {
  name: "AuthLayout",
  components: {
    balance_component,
    FooterComponent,
    User_Dropdown,
    Switcher_lang,
    CS_button,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  data() {
    return {
      active_title: "",
      defaultOpenIndex: 1,
      totalBalance: accounts.totalBalance.toString(),

      lang: this.$t("lang.zh_TW"),

      essentialLinks: [
        {
          title: this.$t("nav.trading"),
          icon: require("../assets/accounts.svg"),
          link: "/accounts",

          name: "accounts",
        },
        {
          title: this.$t("nav.wallet"),
          //caption: 'quasar.dev',
          icon: require("../assets/wallet.svg"),
          link: "/wallet",
          name: "wallet",
        },
        {
          title: this.$t("nav.trading_platform"),
          icon: require("../assets/download.svg"),
          link: "/platform",
          name: "platform",
        },
      ],
      essentialLinks_others: [
        {
          title: this.$t("nav.index"),
          icon: require("../assets/index.svg"),
          link: "https://www.gmtk.asia",
          name: "index",
        },
        {
          title: this.$t("nav.faq"),
          icon: require("../assets/faq.svg"),
          link: "https://www.gmtk.asia/#/about/help",
          name: "faq",
        },
        {
          title: this.$t("nav.contact_us"),
          icon: require("../assets/contactus.svg"),

          link: "https://www.gmtk.asia/#/about/why_choose_us",
          name: "contact",
        },
      ],
    };
  },
  computed: {
    title() {
      if (this.$route.path.includes("/profile")) {
        return this.$t("label.profile");
      }
      if (this.$route.path.includes("/balance")) {
        return this.$t("label.my_balance");
      }
      if (this.$route.path.includes("wallet")) {
        return this.$t("nav.wallet");
      }
      if (this.$route.path.includes("accounts")) {
        return this.$t("nav.trading");
      }
      if (this.$route.path.includes("/mt4")) {
        return this.$t("nav.trading_platform");
      } else {
        return this.$root.active_title;
      }
    },
    combinedLinks() {
      return [...this.essentialLinks, ...this.essentialLinks_others];
    },
  },
  mounted() {
    this.updateActiveTitle();
    this.$router.afterEach(() => {
      this.updateActiveTitle();
    });
  },
  methods: {
    navigate(link) {
      this.$router.push(link);
    },
    shouldOpen(link) {
      return link === window.location.href;
    },
    formattedBalance(balance) {
      const parsedBalance = Number(balance.replace(",", ""));
      const formatted = parsedBalance.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatted;
    },
    updateActiveTitle() {
      const activeLink = this.combinedLinks.find((link) =>
        this.$route.name.includes(link.name)
      );
      this.active_title = activeLink ? activeLink.title : "";
    },
  },
};
</script>
<style scoped>
.total-balance {
  color: #045de9;
  margin: 0 6px;
  font-size: 16px;
}
.phone-title {
  font-size: 20px !important;
  margin-right: -56px;
}
.profile-icon {
  min-width: 26px !important;
}
.user_dropdown {
  width: 100%;
}
.header {
  background-color: #fff;
  color: #045de9;
}
@media screen and (max-width: 600px) {
  .header {
    background-color: #045de9;
    color: #fff;
  }
}
.q-toolbar__title {
  width: auto;
}
.q-toolbar {
  padding: auto !important;
}
.nav-logo {
  width: 150px;
  margin: 30px 45px 60px 45px;
}
.dropdown-inner {
  padding-left: 40px;
  padding-right: 40px;
}

@media screen and (max-width: 600px) {
  .dropdown-inner {
    padding-left: 34px;

    padding-right: 40px;
  }
}

@media screen and (max-width: 600px) {
}
.border {
  border-bottom: 1px solid #e0e0e0;
}
a {
  color: #fff;
}

/*hambuger*/

.btn {
  margin-top: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

@media screen and (max-width: 1024px) {
  .drawer_list {
    padding-top: 20px;
  }
  .q-header {
    height: auto;
  }
  .toolbar {
    margin-top: 4px;
    margin-bottom: 4px;
    margin-left: 20px;
  }
  .q-header {
    height: auto;
  }
  .nav-logo {
    width: 100px !important;
    margin: auto;
    margin-top: 30px;
  }
  .logo {
    height: auto;
  }
}
.essenetialLink {
  color: #969696 !important;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0.01em;
  margin: 10px;
  width: 100%;
  max-width: 200px;
  text-align: left;
  padding: 14px 16px;
  border-radius: 6px;

  font-weight: 700;
}

.drawer {
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  width: 100%;
}

.active {
  background-color: #045de9 !important;
  color: #fff !important;
}
.active .icon {
  filter: brightness(200%);
  fill: white;
}
.icon {
  width: 20px;
  margin-right: 10px;
}
.q-header {
  height: 100px;
}
.toolbar {
  margin-top: 23px;
  margin-bottom: 23px;
}
.dollor {
  background-color: #045de9;
  border-radius: 4px;
  color: #fff;
  padding: 5px;
  font-size: 18px;
  margin-right: 6px;
}
.profile {
  background-color: #045de9;
  border-radius: 4px;
  color: #fff;
  padding: 5px;
  font-size: 18px;
}
.balance {
  font-size: 28px;

  margin: auto;
}
</style>
