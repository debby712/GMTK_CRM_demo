<template>
  <div>
    <div class="acc-title" v-if="content === 'title'">
      {{ way.label }}
    </div>
    <div class="acc-title" v-if="content === 'selected_item'">
      {{ $t("wallet.withdraw_way") }}
    </div>
  </div>
  <div v-if="content === 'title'" class="balance">
    <span class="way-icon" :class="[way.name.toLowerCase()]"></span
    >{{ way.short_name }}
  </div>
  <div v-if="content !== 'title'" class="balance">
    Tether (USDT {{ way.short_name }})
  </div>
  <div class=" ">{{ $t("wallet.handle_fee") }}{{ way.transition_fee }}USDT</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Withdraw_Waycard ",
  props: {
    way: {
      type: Object,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
  computed: {},
  methods: {
    selected_card() {},
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
    goBackToStep1() {
      this.$emit("back-to-step-1");
    },
  },
});
</script>

<style scoped>
.way-icon {
  display: inline-block;
  margin-bottom: -2px;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: contain;
}
.tron {
  background-image: url("assets/trc20_card.svg");
}
.ethereum {
  background-image: url("assets/erc20_card.svg");
}
.account-card-no {
  font-family: "Barlow" !important;

  font-size: 22px;
}

.usd_badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0px, 6px, 0px, 6px;
  border-radius: 12px;
  font-size: 14px;
}
.account-card-sub {
  color: #ffffff;
  font-size: 14px;
  opacity: 0.5;
}
.account_deposit_btn {
  background: #09c6f9;
  border-radius: 6px;
  font-size: 16px;
}
.account-card-section-title {
  color: #7d8087;

  font-size: 18px;
}
.account-card-section-sub {
  color: #7d8087;
  font-size: 14px;
  color: #aeb0b7;
}
.account-card-row-margin {
  margin-bottom: 10px;
}
.account-card-action-btn {
  background: #389e0d;
  border-radius: 6px;
  font-size: 16px;
  color: #ffffff;
  padding: 8px 20px;
}
.account-card-top {
  padding-right: 6px;
}
.account_card_btn .q-btn {
  width: 20px;
  margin-right: -10px;
  height: 20px;
}

.acc-title {
  font-family: "Barlow";
  font-weight: 500;
  font-size: 14px;
}
.waring-card {
  margin: 0px 20px;
}
@media screen and (max-width: 1024px) {
  .waring-card {
    margin: 0px 0px;
  }
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

.badge-use {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border-radius: 12px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, #16c098, #16c098);
}

.badge-hold {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border-radius: 12px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
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
</style>
