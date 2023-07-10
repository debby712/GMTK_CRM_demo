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
      <q-route-tab
        :to="{ name: 'reg_live_landing' }"
        name="live"
        :label="$t('label.real_account')"
      />
      <q-route-tab
        :to="{ name: 'reg_demo_landing' }"
        name="demo"
        :label="$t('label.demo_account')"
      />
    </q-tabs>
    <q-separator inset class="tab_border" />

    <div class="container-inner">
      <q-card class="no-shadow tab-container" style="overflow: hidden">
        <router-view class="animated animate__slideInRight animate__faster"
      /></q-card>
    </div>
    <!--dialog-->
    <q-dialog v-model="registerModal" persistent>
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
            class="q-ma-md dialog_icon"
          />

          <h3 class="msg text-dark-green">
            {{ $t("acc.acc_opened") }}
          </h3>
          <h5 class="slogan">{{ $t("label.thanks_for_choice") }}</h5>
          <div class="info_box mx-auto" id="reg">
            <div
              class="row justify-center"
              :class="{ 'q-gutter-y-sm': $q.screen.width <= 600 }"
            >
              <div class="col-lg-6 col-md-12 col-12 justify-center">
                <div class="remark">{{ $t("label.login_info") }}</div>
                <div class="user_info">youremail@gmail.com</div>
              </div>
              <div class="col-lg-6 col-md-12 col-12 justify-center">
                <div class="remark">{{ $t("label.login_pw") }}</div>
                <div class="user_info">0018239921</div>
              </div>
            </div>
          </div>
          <div class="row img-card-margin">
            <!--mock-->
            <div class="col-6">
              <div class="img_card">
                <div class="dialog_success_img">
                  <img src="~assets/reg_mock.png" />
                  <div class="download_title">
                    {{ $t("acc.practic_now") }}
                  </div>
                  <div class="img_card_caption" id="li">
                    <div>
                      <q-icon color="primary" name="fa-solid fa-circle-check" />
                      {{ $t("acc.mock_save") }}
                    </div>
                    <div>
                      <q-icon color="primary" name="fa-solid fa-circle-check" />
                      {{ $t("acc.trading_text") }}
                    </div>
                    <div>
                      <q-icon color="primary" name="fa-solid fa-circle-check" />
                      {{ $t("acc.no_worry") }}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <q-btn
                    outline
                    color="primary"
                    class="success_dialog_btn btn_outlined"
                    :label="this.$t('auth.reg_mock_acc')"
                    @click="to_mock"
                  />
                </div>
              </div>
            </div>
            <!--live-->
            <div class="col-6">
              <div class="img_card">
                <div class="dialog_success_img">
                  <img src="~assets/reg_live.png" />
                  <div class="download_title">
                    {{ $t("label.start_trade") }}
                  </div>
                  <div class="img_card_caption" id="li">
                    <div>
                      <q-icon color="primary" name="fa-solid fa-circle-check" />
                      {{ $t("acc.different_acctype") }}
                    </div>
                    <div>
                      <q-icon color="primary" name="fa-solid fa-circle-check" />
                      {{ $t("acc.pip") }}
                    </div>
                    <div>
                      <q-icon color="primary" name="fa-solid fa-circle-check" />
                      {{ $t("acc.small_deposit") }}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <q-btn
                    id="button"
                    class="success_dialog_btn"
                    :label="this.$t('auth.reg_live_acc')"
                    @click="to_real"
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
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import router from "src/router";
import { Ref } from "vue";
import register_live from "src/components/account/register_real.vue";
import register_demo from "src/components/account/register_demo.vue";
import LiveAccount from "src/components/account/live.vue";
import DemoAccount from "src/components/account/demo.vue";
export default defineComponent({
  name: "accountPage",
  components: {},
  data() {
    return {
      showLiveAccount: false,
      showDemoAccount: false,
      registerModal: true,
      tab: "live",
    };
  },
  methods: {
    to_mock() {
      this.registerModal = false;
      this.$router.push({ name: "accounts_demo_form" });
    },
    to_real() {
      this.registerModal = false;
      this.$router.push({ name: "accounts_real_form" });
    },
    closemodal() {
      this.registerModal = false;
    },
    onFormSubmitted() {
      this.showLiveAccount = true;
    },
    onDemoFormSubmitted() {
      this.showDemoAccount = true;
    },
  },

  setup() {
    return {
      live: "live",
      demo: "demo",
    };
  },
  created() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
    }
  },
  computed: {},
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.path.includes("live")) {
          this.tab = "live";
        } else {
          this.tab = "demo";
        }
      },
    },
  },
});
</script>
<style scoped>
.active {
}
.info_box {
}
.user_info {
  color: #080c18;
  font-weight: 500;
  font-size: 24px;
}
#li {
  font-weight: 400;
  font-size: 16px;
  text-align: left;
  display: block;
  text-indent: -14px;
  padding-left: 18px;
}
#li .q-icon {
  margin-right: -4px;
}

@media screen and (max-width: 900px) {
  #li {
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    padding-left: 24px;
    height: 100px;
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
@media screen and (max-width: 600px) {
  #reg {
    margin-top: 12px;
  }
}
</style>
