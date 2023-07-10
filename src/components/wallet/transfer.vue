<template>
  <ApplySuccess v-if="showSuccess" :content="applyContent" />
  <ApplySuccess v-if="showTransSuccess" :content="tran" />
  <div class="row tab-inner animated animate__slideInRight animate__faster">
    <div
      class="row full-width justify-between"
      v-show="!showSuccess && !showTransSuccess"
    >
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <TransferFormComponent
          @tran_acc="success_apply"
          @tran_others="success_tran"
        />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="no-shadow my-shadow waring-card card-margin-top">
          <q-card-section class="row items-start">
            <q-icon
              class="text-primary col-1 q-mt-xs alert-icon"
              size="22px"
              name="eva-alert-triangle"
            />
            <div class="card-warning-text col-11">
              {{ $t("wallet.transfer_remark") }}
              <div class="bold-text">{{ $t("wallet.mt4_acc") }}</div>
              {{ $t("wallet.tran_to") }}
              <div class="bold-text">{{ $t("wallet.my_acc") }}</div>
              {{ $t("wallet.full_stop")
              }}<router-link :to="{ name: 'wallet_transfer' }"
                ><a clickable class="text-primary">{{
                  $t("wallet.trans_now")
                }}</a></router-link
              ><br /><br />{{ $t("wallet.no_trans_charge") }}

              <br /><br />{{ $t("wallet.history_link") }}

              <router-link :to="{ name: 'wallet_history' }">
                <a clickable class="text-primary">{{
                  $t("wallet.trade_history")
                }}</a></router-link
              >
              {{ $t("wallet.history_link_behind") }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { accounts } from "src/components/acc_data.js";
import ApplySuccess from "src/components/wallet/apply_success.vue";
import TransferFormComponent from "src/components/wallet/transfer_form.vue";
import { Ref } from "vue";
export default {
  components: { TransferFormComponent, ApplySuccess },
  name: "TransferComponent",
  data() {
    return {
      showSuccess: false,
      showTransSuccess: false,
      withdrawSuccess: false,
      applyContent: "apply",
      withdrawContent: "withdraw",
      tran: "tran",

      pro_balance: accounts.pro.balance.toString(),
      prime_balance: accounts.prime.balance.toString(),
      standard_balance: accounts.standard.balance.toString(),
      acc_balance: accounts.acc_balance.balance.toString(),
      account: accounts,
      selection: " ",
      show_success: false,
    };
  },

  setup() {
    return {};
  },
  methods: {
    success_apply() {
      this.showSuccess = true;

      //  setInterval(() => {
      //    this.showSuccess = false;
      //    location.reload();
      //  }, 3000);
    },
    success_tran() {
      this.showTransSuccess = true;

      // setInterval(() => {
      //   this.showTransSuccess = false;
      //    location.reload();
      //   }, 5000);
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
    selectedAccount() {
      return this.filteredAccounts[this.selection];
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
</style>
