<template>
  <div
    class="row tab-inner q-gutter-sm"
    :class="{ 'justify-center': $q.screen.width <= 600 }"
  >
    <account-card
      :account="account.standard"
      :server="this.server"
      :account_demo="this.account_demo"
    />
    <account-card
      :account="account.prime"
      :server="this.server"
      :account_demo="this.account_demo"
    />
    <account-card
      :account="account.pro"
      :server="this.server"
      :account_demo="this.account_demo"
    />
  </div>
</template>

<script>
import AccountCard from "src/components/account/account_card.vue";
import { mock_accounts } from "src/components/acc_data.js";
export default {
  components: {
    AccountCard,
  },
  name: "DemoAccount",
  data() {
    return {
      account: mock_accounts,
      account_demo: "mock",
      server: " GMTK-Demo01",
    };
  },
};
</script>
<style scoped></style>
