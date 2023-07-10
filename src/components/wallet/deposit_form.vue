<template>
  <div class=" ">
    <div v-if="step === 1">
      <q-card
        v-for="acccard in acccards"
        :key="acccard.id"
        class="transfer_card no-shadow my-shadow"
        :id="account.id"
      >
        <q-radio
          left-label
          class="full-width row justify-between"
          v-model="selection"
          :value="account.id"
          @click="selectaccCard(acccard)"
        >
          <q-card-section>
            <Transfer_accountCard
              class="inner justify-between"
              :account="acccard"
              @click="selectaccCard(acccard)"
            />
          </q-card-section>
        </q-radio>
      </q-card>
    </div>
    <div v-if="step === 2">
      <div class="row">{{ $t("wallet.deposit_acc") }}</div>
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card no-wrap">
            <q-card-section>
              <Transfer_accountCard
                class="inner"
                :account="selectedaccCard"
                style="margin-bottom: 50px"
              />
            </q-card-section>
            <q-card-action>
              <q-btn
                class="edit_btn"
                flat
                :stack="$q.screen.width <= 600"
                size="14px"
                @click="goBackToStep1"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
      <!--upper selected card-->
      <div class="row tab-big-title">
        {{ $t("wallet.choose_deposit") }}
      </div>
      <div v-for="card in cards" :key="card.name">
        <q-card class="transfer_card no-shadow my-shadow">
          <q-radio
            left-label
            class="full-width row justify-between"
            v-model="selection"
            @click="selectCard(card)"
          >
            <q-card-section class="items-center row">
              <img class="way-icon" :src="card.icon" />
              <div class="balance">{{ card.name }}</div>
            </q-card-section></q-radio
          >
        </q-card>
      </div>
    </div>
    <!-- Step 3: Select the remaining account cards -->
    <div v-if="step === 3">
      <div class="row">{{ $t("wallet.deposit_acc") }}</div>
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card no-wrap">
            <q-card-section>
              <Transfer_accountCard
                class="inner"
                :account="selectedaccCard"
                style="margin-bottom: 50px"
              />
            </q-card-section>
            <q-card-action>
              <q-btn
                class="edit_btn"
                flat
                :stack="$q.screen.width <= 600"
                size="14px"
                @click="goBackToStep1"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
      <!--upper selected card-->
      <div class="row">{{ $t("wallet.deposit_type") }}</div>
      <q-card
        class="transfer_card no-shadow my-shadow row full-width justify-center"
      >
        <q-card-section horizontal class="justify-between edit-card no-wrap">
          <q-card-section>
            <div class="acc-title">{{ selectedCard.type }}</div>
            <div class="balance">{{ selectedCard.name }}</div>
          </q-card-section>
          <q-card-action>
            <q-btn
              flat
              :stack="$q.screen.width <= 600"
              class="edit_btn"
              size="14px"
              @click="goBackToStep2"
              icon="eva-settings-outline"
              :label="$t('label.edit')"
            />
          </q-card-action>
        </q-card-section>
      </q-card>

      <div class="row tab-big-title" style="margin: 30px 0 20px 0">
        {{ $t("wallet.choose_chain") }}
      </div>
      <div>
        <div v-for="way in ways" :key="way.name">
          <q-card class="transfer_card no-shadow my-shadow">
            <q-radio
              left-label
              class="full-width row justify-between"
              v-model="selectedCardWay"
              :value="way"
              @click="selectCardWay(way)"
            >
              <q-card-section class="withdraw-margin">
                <Withdraw_Waycard
                  :way="way"
                  class="inner justify-between"
                  :content="deposit"
                /> </q-card-section
            ></q-radio>
          </q-card>
        </div>
      </div>
    </div>
    <!-- Step 4: Show the selected account card and input field -->
    <div v-if="step === 4">
      <div class="row">{{ $t("wallet.deposit_acc") }}</div>
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card no-wrap">
            <q-card-section>
              <Transfer_accountCard
                class="inner"
                :account="selectedaccCard"
                style="margin-bottom: 50px"
              />
            </q-card-section>
            <q-card-action>
              <q-btn
                class="edit_btn"
                flat
                :stack="$q.screen.width <= 600"
                size="14px"
                @click="goBackToStep1"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
      <!--upper selected card-->
      <div class="row">{{ $t("wallet.deposit_type") }}</div>
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card no-wrap">
            <q-card-section>
              <div class="acc-title">{{ selectedCard.type }}</div>
              <div class="balance">{{ selectedCard.name }}</div>
            </q-card-section>
            <q-card-action>
              <q-btn
                flat
                :stack="$q.screen.width <= 600"
                class="edit_btn"
                size="14px"
                @click="goBackToStep2"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
      <!--way-->
      <div>
        <div class="row">{{ $t("wallet.choose_network") }}</div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card">
            <q-card-section>
              <Withdraw_Waycard
                class="inner"
                :way="selectedCardWay"
                :content="selected_item"
                style="margin-bottom: 50px"
              />
            </q-card-section>
            <q-card-action>
              <q-btn
                class="edit_btn"
                :stack="$q.screen.width <= 600"
                flat
                size="14px"
                @click="goBackToStep3"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
      <div class="row justify-end">
        <q-btn
          :loading="gettingWallet"
          color="positive"
          class="confrim_btn content_btn"
          type="text"
          :label="$t('auth.confirm')"
          :disable="disableSubmitButton"
          @click="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { accounts } from "src/components/acc_data.js";
import Withdraw_Waycard from "src/components/wallet/withdraw_card.vue";
import Transfer_accountCard from "src/components/wallet/account_card.vue";

export default {
  components: { Withdraw_Waycard, Transfer_accountCard },
  name: "Deposit_form_Component",
  data() {
    return {
      step: 1,
      wallet_address: "0x3b0946719ee0dfd8e5c3825e9071415db9e308b8",
      account: accounts,
      selection: null,
      selectedCard: null,
      selectedaccCard: null,

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
      acccards: [accounts.standard, accounts.prime, accounts.pro],
      cards: [
        {
          name: "USDT",
          type: "TetherUS",
          icon: require("../../assets/USDT.svg"),
        },
      ],
      gettingWallet: false,
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
    selectaccCard(card) {
      if (this.selectedCard === null) {
        this.selectedaccCard = card;
        this.selection = null;
        this.step = 2;
      } else {
        this.selectedCard = card;
        this.selection = card.name;
        this.step = 3;
        this.selection = null;
      }
    },
    selectCard(card) {
      if (this.selectedCard === null) {
        this.selectedCard = card;
        this.selection = null;
        this.step = 3;
      } else {
        this.selectedCard = card;
        this.selection = card.name;
        this.step = 4;
        this.selection = null;
      }
    },
    selectCardWay(way) {
      if (this.selectedCardWay === null) {
        this.selectedCardWay = way;
        this.selection = null;
        this.step = 3;
      } else {
        this.selectedCardWay = way;
        this.$emit("selected_way", true);
        this.step = 4;
        this.selection = null;
      }
    },
    goBackToStep1() {
      this.step = 1;
      this.selectedaccCard = null;
      this.selectedCardreceive = null;
      this.selectedCard = null;
      this.selection = null;
    },
    goBackToStep2() {
      this.step = 2;

      this.selectedCard = null;
      this.selectedCardreceive = null;
      this.selection = null;
    },
    goBackToStep3() {
      this.step = 3;
      this.selectedCardreceive = null;
      this.selection = null;
    },
    submitForm() {
      if (this.selectedCardWay.name === "Tron") {
        // Route to TRC deposit page
        this.$router.push({ name: "trc_deposit" });
      } else {
        // Route to ETH deposit page
        this.$router.push({ name: "eth_deposit" });
      }
    },
  },
};
</script>
<style scoped>
.transfer_card {
  background-color: #f8f8f8;
  margin-bottom: 20px;
}

.inner {
  padding: 4px;
  margin-bottom: 20px;
}

.q-card {
  padding: 0 10px !important;
}

.edit-card {
  width: 100%;
}

.edit_btn {
  margin-top: 10px;
}

@media screen and (max-width: 1024px) {
  .edit-card {
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .edit-card {
    width: 100%;
  }
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

.way-icon {
  display: inline-block;
  margin-bottom: -2px;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
