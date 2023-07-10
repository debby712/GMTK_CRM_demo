<template>
  <div class="tab-inner">
    <div class="row justify-center items-center tabinner q-mt-lg">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <h5 class="wallet_address_title text-title text-center">
          Tron (TRC20)-{{ $t("wallet.deposit_wallet_address") }}
        </h5>
        <img class="qrcode lt-lg" src="~assets/qr-deposit-mock.png" />

        <q-card class="wallet_address-card no-shadow">
          <q-card-section horizontal class="justify-center">
            <div class="wallet_address">
              {{ wallet_address }}
            </div>

            <q-btn
              flat
              round
              color="primary"
              class="copy_btn"
              size="12px"
              icon="eva-copy-outline"
              @click="copyAddress"
            >
              <q-popup-proxy class="gt-sm">
                <q-banner class="bg-positive text-white items-center">
                  <q-icon
                    name="fa-solid fa-circle-check  "
                    color="white"
                    size="20px"
                  />

                  {{ $t("label.copied") }}
                </q-banner>
              </q-popup-proxy></q-btn
            >
          </q-card-section></q-card
        >
      </div>
      <div class="col-lg-2 col-md-12 col-sm-12">
        <img class="qrcode gt-md q-ma-md" src="~assets/qr-deposit-mock.png" />
      </div>
    </div>

    <q-card class="no-shadow my-shadow waring-card">
      <q-card-section class="row items-start">
        <q-icon
          class="text-primary col-1 q-mt-xs alert-icon"
          size="22px"
          name="eva-alert-triangle"
        />
        <div class="card-warning-text col-11" style="display: inline">
          {{ $t("wallet.deposit_trans_remark_last") }}
          <router-link :to="{ name: 'wallet_transfer' }">
            <a clickable class="text-primary">
              {{ $t("wallet.trans_now") }}</a
            ></router-link
          >
          <br />
          <br />
          {{ $t("wallet.deposit_check") }}
          <br />
          <br />
          {{ $t("wallet.history_link") }}
          <router-link :to="{ name: 'wallet_history' }">
            <a clickable class="text-primary">{{
              $t("wallet.trade_history")
            }}</a></router-link
          >
          {{ $t("wallet.history_link_behind") }}
        </div>
      </q-card-section>
    </q-card>

    <!--card-->
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { accounts } from "src/components/acc_data.js";
export default {
  components: {},
  name: "TRC_deposite",
  data() {
    return {
      wallet_address: "0x3b0946719ee0dfd8e5c3825e9071415db9e308b8",
      account: accounts,
      tab: "erc",
    };
  },
  mounted() {},
  setup() {
    const $q = useQuasar();
    return {
      triggerCopied() {
        $q.notify({
          type: "positive",
          message: this.$t("label.copied"),
          badgeClass: "  my-badge-class",
          classes: "my-notif-class",
        });
      },
    };
  },
  methods: {
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
    copyAddress() {
      const el = document.createElement("textarea");
      el.value = this.wallet_address;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.triggerCopied();
    },
  },
};
</script>
<style scoped>
.copy_btn {
  margin: 10px !important;
}

.logo {
  height: 80px;
  width: 100%;
  max-width: 80px;
  margin: 0 14px;
}

#bvac {
  max-width: 140px;
  min-width: 100px;
  margin-left: -2px;
}

@media screen and (max-width: 900px) {
  .logo {
    height: 70px;
    width: 120%;
    max-width: 140px;
    margin: 0 6px;
  }

  #bvac {
    max-width: 180px;
    min-width: 100px;
    margin-left: -2px;
  }
}

.qrcode {
  max-width: 160px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.spearator_margin {
  margin-top: 80px;
  margin-bottom: 32px;
}

@media screen and (max-width: 1024px) {
  .qrcode {
    max-width: 360px;
    width: 200px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }

  .wallet_address {
    word-break: break-all;
  }
}

.tabinner {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.waring-card {
  margin: 20px 0;
  padding: 10px 0;
  background: #f8f8f8;
  text-align: left !important;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
}

.active-tab-btn {
  filter: none !important;
}

.q-tab:not(.q-tab--active) {
  filter: grayscale(100%);
}

.wallet_address_title a {
  width: auto;
  min-width: 80px;

  margin: 0 14px;
}

.text-title {
  color: #080c18 !important;
  font-weight: bold;
  font-size: 18px;
}
</style>
