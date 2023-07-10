<template>
  <div class="row tab-inner animated animate__slideInRight animate__faster">
    <div class="row full-width justify-between">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <Deposit_form_Component />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="no-shadow my-shadow waring-card card-margin-top">
          <q-card-section class="row items-start">
            <q-icon class="text-primary col-1 q-mt-xs alert-icon" size="22px" name="eva-alert-triangle" />
            <div class="card-warning-text col-11">
              {{ $t("wallet.only_usdt") }}

              <br /><br />{{ $t("wallet.becareful_trx_eth") }}

              <br /><br />{{ $t("wallet.go_below_buy") }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { accounts } from "src/components/acc_data.js";
import Deposit_form_Component from "src/components/wallet/deposit_form.vue";

export default {
  components: { Deposit_form_Component },
  name: "DepositComponent",
  data() {
    return {
      step: 1,
      wallet_address: "0x3b0946719ee0dfd8e5c3825e9071415db9e308b8",
      account: accounts,
      selection: null,
      selectedCard: null,
      selectedCardId: null,
      selectedCardWay: null,
      selected_item: "selected_deposit",
      tab: "erc",
      deposit: "deposit",
      ways: [
        {
          name: "Tron",
          label: "Tron (Trc20)",
          short_name: "TRX",
          transition_fee: "1",
        },
        {
          name: "Ethereum",
          label: "Ethereum (ERC20)",
          short_name: "ETH",
          transition_fee: "15",
        },
      ],

      cards: [{ name: "USDT", icon: require("../../assets/USDT.svg") }],
    };
  },
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
    selectCard(card) {
      if (this.selectedCard === null) {
        this.selectedCard = card;
        this.selection = null;
        this.step = 2;
      } else {
        this.selectedCard = card;
        this.selection = card.name;
        this.step = 3;
        this.selection = null;
      }
    },
    selectCardWay(way) {
      if (this.selectedCardWay === null) {
        this.selectedCardWay = way;

        this.selection = null;
        this.step = 2;
      } else {
        this.selectedCardWay = way;
        this.$emit("selected_way", true);
        this.step = 3;
        this.selection = null;
      }
    },
    goBackToStep1() {
      this.step = 1;
      this.selectedCard = null;
      this.selection = null;
    },
    goBackToStep2() {
      this.step = 2;
      this.selectedCardreceive = null;
      this.selection = null;
    },
    submitForm() {
      if (
        this.selectedCardWay !== null &&
        this.selectedCardWay.short_name === "TRX"
      ) {
        this.$router.push({ name: "trc_deposit" });
      } else if (
        this.selectedCardWay !== null &&
        this.selectedCardWay.short_name === "ETH"
      ) {
        this.$router.push({ name: "eth_deposit" });
      } else {
        // Handle other selectedCardWay.short_name values here
      }
    },
  },
};
</script>
<style scoped>
.acc-title {
  font-family: "Barlow";
  font-weight: 500;
  font-size: 14px;
}

.card-warning-text {
  white-space: pre-wrap;
}

.transfer_card {
  background-color: #f8f8f8;
}

#acc {
  background-color: #fffff1;
}

.button {
  margin-top: auto;
  margin-bottom: auto;
}

.inner {
  padding: 4px;
  margin-bottom: 20px;
}

.badge {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border-radius: 12px;
}

.badge-start {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border-radius: 12px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, #045de9, #045de9);
}

.balance {
  color: #080c18;
  font-family: "Barlow";
  font-weight: 700;
  font-size: 20px;
}

.balance-none {
  color: #969696 !important;
}

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
