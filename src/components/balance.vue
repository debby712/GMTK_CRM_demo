<template>
  <div class="dropdown_balance">
    <div class="container_pie">
      <div class="doughnut-container small">
        <DoughNut />
      </div>
    </div>
    <div class="dropdown_margin">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="account_name" id="standard">Standard</div>
          <div class="row justify-between q-mt-xs">
            <div class="account_precentage">{{ standard_percentage }}%</div>
            <div class="account_balance">
              {{ formattedBalance(standard_balance) }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="account_name" id="prime">Prime</div>
          <div class="row justify-between q-mt-xs">
            <div class="account_precentage">{{ prime_percentage }}%</div>
            <div class="account_balance">
              {{ formattedBalance(prime_balance) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="account_name" id="pro">Pro X</div>
          <div class="row justify-between q-mt-xs">
            <div class="account_precentage">{{ pro_percentage }}%</div>
            <div class="account_balance">
              {{ formattedBalance(pro_balance) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="account_name" id="acc">{{ $t("label.my_acc") }}</div>
          <div class="row justify-between q-mt-xs">
            <div class="account_precentage">{{ acc_percentage }}%</div>
            <div class="account_balance">
              {{ formattedBalance(acc_balance) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div style="gap: 10px; margin-top: 30px" class="column">
        <q-btn
          class="dropdown_btn"
          color="primary"
          to="/wallet/deposit"
          :label="$t('label.deposit')"
        />
        <q-btn
          style="background-color: #083b8a; color: #fff"
          class="dropdown_btn"
          to="/wallet/transfer"
          :label="$t('label.transfer')"
        />
        <q-btn
          class="dropdown_btn"
          style="background-color: #389e0d; color: #fff"
          to="/wallet/withdraw"
          :label="$t('label.withdraw')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import DoughNut from "./doughnut.vue";
import { accounts } from "./acc_data.js";
export default defineComponent({
  name: "balance_component ",
  components: { DoughNut },
  data() {
    return {
      pro_balance: accounts.pro.balance.toString(),
      prime_balance: accounts.prime.balance.toString(),
      standard_balance: accounts.standard.balance.toString(),
      acc_balance: accounts.acc_balance.balance.toString(),
      pro_precentage: " ",
      prime_precentage: " ",
      standard_precentage: " ",
      acc_precentage: " ",
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
  },
  computed: {
    totalBalance() {
      return (
        parseFloat(this.pro_balance.replace(",", "")) +
        parseFloat(this.prime_balance.replace(",", "")) +
        parseFloat(this.standard_balance.replace(",", "")) +
        parseFloat(this.acc_balance.replace(",", ""))
      );
    },
    pro_percentage() {
      return (
        (parseFloat(this.pro_balance.replace(",", "")) / this.totalBalance) *
        100
      ).toFixed(0);
    },
    prime_percentage() {
      return (
        (parseFloat(this.prime_balance.replace(",", "")) / this.totalBalance) *
        100
      ).toFixed(0);
    },
    standard_percentage() {
      return (
        (parseFloat(this.standard_balance.replace(",", "")) /
          this.totalBalance) *
        100
      ).toFixed(0);
    },
    acc_percentage() {
      return (
        (parseFloat(this.acc_balance.replace(",", "")) / this.totalBalance) *
        100
      ).toFixed(0);
    },
  },
});
</script>

<style scoped>
.container_pie {
}
.doughnut-container {
  margin-bottom: -100px;
}
.doughnut-container.small {
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
.dropdown_margin {
  margin: 32px 20px;
}
.my-card {
  margin-bottom: 6px;
}
.q-card__section--vert {
  padding: 6px 15px !important;
}
.account_name {
  font-weight: bold;
  font-size: 12px;
  line-height: 17px;
}
#pro {
  color: #fe6b4b;
}
#prime {
  color: #b642d3;
}

#standard {
  color: #42d3c2;
}

#acc {
  color: #2c77bc;
  background-color: #fff !important;
}
.account_precentage {
  font-size: 12px;
  font-weight: 500;

  line-height: 17px;
  color: #080c18;
}
.account_balance {
  font-family: "Barlow";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}

.dropdown_btn {
  padding: 14px auto !important;
  font-size: 16px !important;
  transition: 0.3s;
  border-radius: 6px;
}
@media screen and(max-width:600px) {
}
</style>
