<template>
  <div
    class="row tab-inner q-gutter-sm"
    :class="{ 'justify-center': $q.screen.width <= 600 }"
  >
    <account-card :account="account.standard" :server="this.server" />
    <account-card :account="account.prime" :server="this.server" />
    <account-card :account="account.pro" :server="this.server" />
  </div>
</template>

<script>
import AccountCard from "src/components/account/account_card.vue";
import { accounts } from "src/components/acc_data.js";
export default {
  components: {
    AccountCard,
  },
  name: "LiveAccount",
  data() {
    return {
      account: accounts,
      server: " GMTK-Real01",
    };
  },
};
</script>
<style scoped></style>
