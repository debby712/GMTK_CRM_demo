<template>
  <q-page class="container">
    <div class="gt-xs" style="display: inline">
      <h3 style="margin-bottom: 7px; display: inline-block; margin-right: 10px">
        {{ $t("nav.wallet") }}
      </h3>
    </div>
    <q-tabs
      v-model="tab"
      class="text-dark"
      active-color="dark"
      active-bg-color="white"
      indicator-color="primary"
      align="start"
      narrow-indicator
    >
      <q-route-tab to="/wallet/deposit" :label="$t('wallet.deposit')" />
      <q-route-tab to="/wallet/transfer" :label="$t('wallet.transfer')" />
      <q-route-tab to="/wallet/withdraw" :label="$t('wallet.withdraw')" />
      <q-route-tab to="/wallet/history" :label="$t('wallet.history')" />
    </q-tabs>
    <q-separator inset class="tab_border" />

    <div class="container-inner">
      <q-card class="no-shadow tab-container" style="overflow-x: hidden">
        <router-view class="animated animate__slideInRight animate__faster"
      /></q-card>

      <!--  <q-tab-panels v-model="tab" animated class="">
        <q-tab-panel name="deposit"> <DepositComponent /></q-tab-panel>

        <q-tab-panel name="transfer">
          <ApplySuccess v-if="showSuccess" :content="applyContent" />
          <ApplySuccess v-if="showTransSuccess" :content="tran" />
          <div
            class="row justify-between"
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
                    class="text-primary col-1 q-mt-xs"
                    size="22px"
                    name="eva-alert-triangle"
                  />
                  <div class="card-warning-text col-11">
                    {{ $t("wallet.transfer_remark") }}
                    {{ $t("wallet.withdraw_remark") }} <br /><br />
                    {{ $t("wallet.history_link") }}
                    <a clickable class="text-primary" to="">{{
                      $t("wallet.trade_history")
                    }}</a>
                    {{ $t("wallet.history_link_behind") }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="withdraw">
          <ApplySuccess v-if="withdrawSuccess" :content="withdrawContent" />
          <div class="row justify-between">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <WithdrawFormComponent
                v-if="!withdrawSuccess"
                @withdraw_done="success_withdraw"
              />
            </div>
            <div
              v-if="!withdrawSuccess"
              class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            >
              <q-card class="no-shadow my-shadow waring-card card-margin-top">
                <q-card-section class="row items-start">
                  <q-icon
                    class="text-primary col-1 q-mt-xs"
                    size="22px"
                    name="eva-alert-triangle"
                  />
                  <div class="card-warning-text col-11">
                    {{ $t("wallet.transfer_remark") }}
                    {{ $t("wallet.withdraw_remark") }} <br /><br />
                    {{ $t("wallet.history_link") }}
                    <a clickable class="text-primary" to="">{{
                      $t("wallet.trade_history")
                    }}</a>
                    {{ $t("wallet.history_link_behind") }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="history"> <HistoryComponent /></q-tab-panel>
      </q-tab-panels>-->
    </div>
  </q-page>
</template>

<script>
import HistoryComponent from "src/components/wallet/historytable.vue";
//import ApplySuccess from "src/components/wallet/apply_success.vue";
import { defineComponent, ref } from "vue";
//import WithdrawFormComponent from "src/components/wallet/withdraw_form.vue";

//import TransferFormComponent from "src/components/wallet/transfer_form.vue";
//import DepositComponent from "src/components/wallet/deposit.vue";
import { Ref } from "vue";

export default defineComponent({
  name: "walletPage",

  components: {
    // TransferFormComponent,
    // DepositComponent,
    // ApplySuccess,
    // WithdrawFormComponent,
    //HistoryComponent,
  },
  data() {
    return {
      tab: "deposit",
      showSuccess: false,
      showTransSuccess: false,
      withdrawSuccess: false,
      applyContent: "apply",
      withdrawContent: "withdraw",
      tran: "tran",
    };
  },
  methods: {
    success_apply() {
      this.showSuccess = true;

      setInterval(() => {
        this.showSuccess = false;
        location.reload();
      }, 3000);
    },
    success_tran() {
      this.showTransSuccess = true;

      // setInterval(() => {
      //   this.showTransSuccess = false;
      //    location.reload();
      //   }, 5000);
    },
    success_withdraw() {
      this.withdrawSuccess = true;

      setInterval(() => {
        this.withdrawSuccess = false;
        location.reload();
      }, 3000);
    },
    handleTranAcc(value) {
      if (value) {
        this.showSuccess = true;
      }
    },
  },
});
</script>
<style scoped>
.padding {
}
.card-margin-top {
  margin-top: 50px;
}
</style>
