<template>
  <q-card
    class="account-card no-shadow my-shadow card-margin col-lg-4 col-md-4 col-sm-12"
    style="min-width: 300px; width: auto"
  >
    <q-card-section class="text-white account-card-top" :id="account.id">
      <div class="row justify-between account-card-row-margin">
        <div class="col-10">
          <div class="account-card-no">{{ acc_no }}</div>
          <div class="account-card-sub">
            {{ $t("label.trading_account") }}
          </div>
        </div>
        <div class="col">
          <!-- <q-btn
            icon="eva-settings-outline"
            flat
            rounded
            class="account_card_btn"
          />-->
        </div>
      </div>
      <div class="row justify-between">
        <div class="col-auto">
          <div class="account-card-no row">
            {{ formattedBalance(acc_balance) }}
            <q-badge class="usd_badge"> USD </q-badge>
          </div>
          <div class="account-card-sub">{{ $t("label.balance") }}</div>
        </div>
        <div class="col-auto" style="margin-left: 10px">
          <q-btn
            :to="{ name: 'wallet_deposit' }"
            :label="$t('label.deposit_now')"
            class="account_deposit_btn"
            flat
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <div class="account-card-row-margin">
        <div class="account-card-section-title">{{ acc_type }}</div>
        <div class="account-card-section-sub">{{ $t("label.acc_type") }}</div>
      </div>
      <div class="row account-card-row-margin">
        <div class="col-3">
          <div class="account-card-section-title">MT4</div>
          <div class="account-card-section-sub">
            {{ $t("label.platform") }}
          </div>
        </div>
        <div class="col">
          <div class="account-card-section-title">{{ server }}</div>
          <div class="account-card-section-sub">{{ $t("label.server") }}</div>
        </div>
      </div>
      <div class="account-card-row-margin">
        <div class="account-card-section-title">{{ acc_leverage }}</div>
        <div class="account-card-section-sub">{{ $t("label.leverage") }}</div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right" class="q-px-md">
      <q-btn :to="{ name: 'mt4' }" class="account-card-action-btn" flat>{{
        $t("label.start_trade")
      }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountCard ",
  props: {
    account: {
      type: Object,
      required: true,
    },
    server: {
      type: Object,
      required: true,
    },
    account_demo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },
  computed: {
    acc_no() {
      return this.account.no;
    },
    acc_balance() {
      return this.account.balance.toString();
    },
    acc_type() {
      return this.account.type;
    },

    acc_leverage() {
      return this.account.leverage;
    },
    isMockServe() {
      return this.account_demo === "mock"; // replace with your serve variable and value
    },
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
  },
});
</script>

<style scoped>
#standard_real {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, #045de9, #045de9);
}
#prime_real {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    linear-gradient(0deg, #045de9, #045de9);
}
#pro_real {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    linear-gradient(0deg, #045de9, #045de9);
}

#standard_mock {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, #7b91b4, #7b91b4);
}
#prime_mock {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
    linear-gradient(0deg, #516f9c, #516f9c);
}
#pro_mock {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
    linear-gradient(0deg, #3c67a8, #3c67a8);
}

.account-card-no {
  font-family: "Barlow" !important;

  font-size: 22px;
}

.usd_badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0px 6px;

  font-size: 14px;
  width: 41px;
  height: 20px;
  border-radius: 12px;
  flex-direction: row;
  justify-content: center;
  margin-top: 7px;
  margin-left: 2px;
  display: flex;
  flex-direction: row;
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
</style>
