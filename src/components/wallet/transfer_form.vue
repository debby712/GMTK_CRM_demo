<template>
  <div class="">
    <!-- Step 1: Select one account card -->
    <div v-if="step === 1">
      <div class="row tab-big-title">
        {{ $t("wallet.choose_acc") }}
      </div>
      <div v-for="card in cards" :key="card.id">
        <q-card class="transfer_card no-shadow my-shadow" :id="card.id">
          <q-radio
            left-label
            class="full-width row justify-between"
            v-model="selection"
            :value="account.id"
            @click="selectCard(card)"
          >
            <q-card-section>
              <Transfer_accountCard
                class="inner justify-between"
                :account="card"
                @click="selectCard(card)"
              /> </q-card-section
          ></q-radio>
        </q-card>
      </div>
    </div>

    <!-- Step 2: Select the remaining account cards -->
    <div v-if="step === 2">
      <div class="row">{{ $t("wallet.pay") }}</div>
      <q-card
        class="transfer_card no-shadow my-shadow row full-width justify-center"
        :id="selectedCardId"
      >
        <q-card-section horizontal class="justify-between edit-card no-wrap">
          <q-card-section>
            <Transfer_accountCard
              class="inner"
              :account="selectedCard"
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

      <div class="row tab-big-title" style="margin: 30px 0 20px 0">
        {{ $t("wallet.choose_receive_acc") }}
      </div>
      <div class="row">{{ $t("wallet.mt4_acc") }}</div>
      <div v-for="card in remainingCards" :key="card.id">
        <template v-if="card.id === 'acc'">
          <div class="row">{{ $t("wallet.withdraw_acc") }}</div>

          <q-card class="transfer_card no-shadow my-shadow" :id="card.id">
            <q-radio
              left-label
              class="full-width row justify-between"
              v-model="selection"
              :value="account.id"
              @click="selectCardreceive(card)"
            >
              <q-card-section>
                <Transfer_accountCard
                  class="inner justify-between"
                  :account="card"
                  @click="selectCardreceive(card)"
                /> </q-card-section
            ></q-radio>
          </q-card>
        </template>
        <template v-else>
          <q-card class="transfer_card no-shadow my-shadow" :id="card.id">
            <q-radio
              left-label
              class="full-width row justify-between"
              v-model="selection"
              :value="account.id"
              @click="selectCardreceive(card)"
            >
              <q-card-section>
                <Transfer_accountCard
                  class="inner justify-between"
                  :account="card"
                  @click="selectCardreceive(card)"
                /> </q-card-section
            ></q-radio>
          </q-card>
        </template>
      </div>
    </div>

    <!-- Step 3: Show the selected account card and input field -->
    <div v-if="step === 3">
      <div class="row">{{ $t("wallet.pay") }}</div>
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
          :id="selectedCardId"
        >
          <q-card-section horizontal class="justify-between edit-card">
            <q-card-section>
              <Transfer_accountCard
                class="inner"
                :account="selectedCard"
                style="margin-bottom: 50px"
              />
            </q-card-section>
            <q-card-action>
              <q-btn
                class="edit_btn"
                :stack="$q.screen.width <= 600"
                flat
                size="14px"
                @click="goBackToStep1"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>
      <div class="row">{{ $t("wallet.recieve") }}</div>
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
          :id="selectedCardreceiveId"
        >
          <q-card-section horizontal class="justify-between edit-card">
            <q-card-section>
              <Transfer_accountCard
                class="inner"
                :account="selectedCardreceive"
                style="margin-bottom: 50px"
              />
            </q-card-section>
            <q-card-action>
              <q-btn
                class="edit_btn"
                :stack="$q.screen.width <= 600"
                flat
                size="14px"
                @click="goBackToStep2"
                icon="eva-settings-outline"
                :label="$t('label.edit')"
              />
            </q-card-action>
          </q-card-section>
        </q-card>
      </div>

      <q-input
        v-model="amount"
        prefix="$"
        inputmode="numeric"
        :placeholder="$t('auth.plz_enter') + $t('wallet.amount')"
        :label="$t('wallet.amount')"
      ></q-input>
      <div class="row justify-end">
        <q-btn
          color="positive"
          class="confrim_btn content_btn"
          type="text"
          :label="$t('auth.confirm')"
          :disable="disableConfirmButton"
          @click="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Transfer_accountCard from "src/components/wallet/account_card.vue";
import { accounts } from "src/components/acc_data.js";
import { Ref } from "vue";
export default {
  components: { Transfer_accountCard },
  name: "TransferFormComponent",
  data() {
    return {
      step: 1,
      amount: "",
      selectedCard: null,
      selectedCardId: null,
      selectedCardreceive: null,
      cards: [
        accounts.standard,
        accounts.prime,
        accounts.pro,
        accounts.acc_balance,
      ],
      account: accounts,
      selection: null,
    };
  },
  computed: {
    remainingCards() {
      return this.cards.filter((card) => card !== this.selectedCard);
    },
    disableConfirmButton() {
      return this.amount === "" || this.amount > this.selectedCard.balance;
    },
  },
  methods: {
    submitForm() {
      if (this.selectedCardreceiveId === "acc") {
        this.$emit("tran_acc", true);
      } else {
        // otherwise, redirect to a different route
        this.$emit("tran_others", true);
      }
    },
    selectCard(card) {
      if (this.selectedCard === null) {
        this.selectedCard = card;

        this.selectedCardId = card.id;

        this.selection = null;
        this.step = 2;
      } else {
        this.selectedCard = card;
        this.selection = card.account.id;
        this.step = 3;
        this.selection = null;
      }
    },
    selectCardreceive(card) {
      if (this.selectedCardreceive === null) {
        this.selectedCardreceive = card;
        this.selectedCardreceiveId = card.id;
        this.step = 3;
      } else {
        this.selectedCardreceive = card;
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
  },
};
</script>
<style scoped>
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
.q-card {
  padding: 0 10px !important;
}
.selected-inner {
}
#acc {
  background-color: #fffff1 !important;
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
  margin-bottom: 20px;
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

@media screen and (max-width: 600px) {
}
</style>
