<template>
  <q-layout view="hHh lpR ffr  bg-white">
    <q-header
      class="phone-zmax bg-white text-dark float-left border full-width"
    >
      <q-toolbar class="container_auth toolbar">
        <div style="padding-right: 40px">
          <a href="/">
            <q-img class="nav-logo" src="~/assets/GMTK_logo_color.png" />
          </a>
        </div>

        <q-space />
        <q-separator dark vertical />

        <div class="row q-gutter-x-sm" style="padding: 0 0 4px 0">
          <Switcher_lang />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated  slideInRight"
        leave-active-class="animated  slideInRight"
      >
        <router-view />
      </transition>
    </q-page-container>
    <!--footer-->
    <q-footer class="bg-dark text-white" height-hint="500px">
      <div class="container_auth">
        <div class="inner-container">
          <div
            class="row sub footer-caption"
            style="margin-bottom: 60px; margin-top: 30px"
          >
            <span style="margin-bottom: 60px; color: #7d8087">
              {{ $t("label.footer_declaimer") }}
            </span>
            <span class="text-weight-bold" style="color: #7d8087">
              {{ $t("label.footer_license") }}
            </span>
          </div>
        </div>
      </div>
      <div class="copy-right q-py-md row full text-caption">
        <div
          class="container copy-right-center fit text-center justify-center row"
        >
          <p class="footer text-white">{{ $t("label.copy_right") }}</p>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import Switcher_lang from "src/components/Switcher_lang.vue";

export default {
  name: "AuthLayout",
  components: { Switcher_lang },
  data() {
    return {
      rightDrawerOpen: false,
      defaultOpenIndex: 1,
      lang: this.$t("lang.zh_TW"),
      essentialLinks: [
        {
          title: this.$t("nav.trading"),
          dropdowns: [
            {
              title: this.$t("nav.currencies"),
              link: "/discover/currencies",
            },
            {
              title: this.$t("nav.index"),
              link: "/discover/index",
            },
            {
              title: this.$t("nav.metal"),
              link: "/discover/metal",
            },
            {
              title: this.$t("nav.energy"),
              link: "/discover/energy",
            },
            {
              title: this.$t("nav.crypto"),
              link: "/discover/crypto",
            },
          ],
        },
        {
          title: this.$t("nav.account"),
          dropdowns: [
            {
              title: this.$t("nav.account_type"),
              link: "/account/account_type",
            },
            {
              title: this.$t("nav.contract"),
              link: "/account/contract",
            },
          ],
        },
        {
          title: this.$t("nav.trading_platform"),
          dropdowns: [
            {
              title: this.$t("nav.MT4"),
              link: "/trading_platform/metatrader4",
            },
          ],
        },
        {
          title: this.$t("nav.company"),
          dropdowns: [
            {
              title: this.$t("nav.why_us"),
              link: "/about/why_choose_us",
            },
            {
              title: this.$t("nav.help"),
              link: "/about/help",
            },
            {
              title: this.$t("nav.event"),
              link: "/about/hours_and_events",
            },
          ],
        },
      ],
    };
  },
  methods: {
    navigate(link) {
      this.$router.push(link);
    },
    shouldOpen(link) {
      return link === window.location.href;
    },
  },
};
</script>
<style scoped>
.q-header {
  left: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.footer-caption {
  font-size: 12px;
  line-height: 17px;
}

.hambuger {
}

.q-header {
  height: 100px;
}

.toolbar {
  margin-top: 23px;
  margin-bottom: 23px;
}

.footer-align {
  text-align: left;
}

@media screen and (max-width: 1023px) {
  .phone-zmax {
    z-index: 99999 !important;
  }
}

@media screen and (max-width: 600px) {
  .footer-align {
    text-align: center;
  }

  .footer-caption {
    padding-bottom: 30px;
  }
}

.footer-map {
  margin-bottom: 36px;
  margin-top: 80px;
}

@media screen and (max-width: 600px) {
  .footer-map {
    margin-bottom: 28px;
    margin-top: 70px;
  }
}

.q-toolbar__title {
  width: auto;
}

.q-toolbar {
  padding: 0 !important;
}

.nav-logo {
  width: 163px;
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

.q-item__label {
  margin-top: 5px;
  margin-bottom: 5px;
}

.android {
  width: 90%;
  height: auto;
}

.app {
  width: 100%;
  height: auto;
}

p.footer {
  color: #7d8087;
  font-size: 12px !important;
  margin: 0;
  padding: 0;
  text-align: left;
}

@media screen and (max-width: 600px) {
  .android {
    height: 80%;

    padding-left: -20px !important;

    height: auto;
  }

  .app {
    vertical-align: middle;
    vertical-align: middle;

    height: 100% !important;

    margin-left: auto;
    margin-right: auto;
  }

  .cente-img {
    display: flex;
    align-items: center;
    justify-content: center;
    /* optional, if you want to center horizontally */
    height: 100%;
    /* optional, if you want the column to take up the full height of the parent container */
  }

  .social-media {
    width: 40px;
  }

  p.footer {
    color: #7d8087;
    font-size: 11px;
    margin: 0;
    text-align: center;
  }

  .copy-right-center {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
}

.border {
  border-bottom: 1px solid #e0e0e0;
}

a {
  color: #fff;
}

.copy-right {
  background-color: #1f2128;

  height: 50px;
}

.social-media {
  width: 40px;
}

/*hambuger*/

.btn {
  margin-top: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

span {
  display: block;

  /* box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);*/
  border-radius: 3px;
  height: 2px;
  background: #080c18;
  transition: all 0.3s;
  position: relative;
}

.not-active span + span {
  margin-top: 5px;
}

span + span {
  margin-top: 15px;
}

.active span:nth-child(1) {
  animation: ease 0.7s top forwards;
}

.not-active span:nth-child(1) {
  animation: ease 0.7s top-2 forwards;
}

.active span:nth-child(2) {
  animation: ease 0.7s scaled forwards;
}

.not-active span:nth-child(2) {
  animation: ease 0.7s scaled-2 forwards;
}

.active span:nth-child(3) {
  animation: ease 0.7s bottom forwards;
}

.not-active span:nth-child(3) {
  animation: ease 0.7s bottom-2 forwards;
}

@keyframes top {
  0% {
    top: 0;
    transform: rotate(0);
  }

  50% {
    top: 12px;
    transform: rotate(0);
  }

  100% {
    top: 12px;
    transform: rotate(45deg);
  }
}

@keyframes top-2 {
  0% {
    top: 12px;
    transform: rotate(45deg);
  }

  50% {
    top: 12px;
    transform: rotate(0deg);
  }

  100% {
    top: 0;
    transform: rotate(0deg);
  }
}

@keyframes bottom {
  0% {
    bottom: 0;
    transform: rotate(0);
  }

  50% {
    bottom: 22px;
    transform: rotate(0);
  }

  100% {
    bottom: 22px;
    transform: rotate(135deg);
  }
}

@keyframes bottom-2 {
  0% {
    bottom: 22px;
    transform: rotate(135deg);
  }

  50% {
    bottom: 22px;
    transform: rotate(0);
  }

  100% {
    bottom: 0;
    transform: rotate(0);
  }
}

@keyframes scaled {
  50% {
    transform: scale(0);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes scaled-2 {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@media screen and (max-width: 1024px) {
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
    width: 120px !important;
  }
}
</style>
