<template>
  <div class=" ">
    <!-- Step 1: Select one account card -->
    <div v-if="step === 1">
      <div class="row tab-big-title">
        {{ $t("wallet.choose_withdraw_acc") }}
      </div>
      <div v-for="card in cards" :key="card.id">
        <q-card
          class="transfer_card no-shadow my-shadow"
          :id="card.id"
          :class="{ disabled: card.id !== 'acc' }"
        >
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
      <div class="row">{{ $t("wallet.pay") }}{{ $t("nav.account") }}</div>
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
              flat
              :stack="$q.screen.width <= 600"
              class="edit_btn"
              size="14px"
              @click="goBackToStep1"
              icon="eva-settings-outline"
              :label="$t('label.edit')"
            />
          </q-card-action>
        </q-card-section>
      </q-card>

      <div class="row tab-big-title" style="margin: 30px 0 20px 0">
        {{ $t("wallet.input_withdraw_amount") }}
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
          @click="submitInput"
        />
      </div>
    </div>

    <!-- Step 3: Show the selected account card and input field -->
    <div v-if="step === 3">
      <div class="row">{{ $t("wallet.pay") }}{{ $t("nav.account") }}</div>
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
      <!--  <div class="row">
        {{ $t("wallet.withdraw") }}{{ $t("wallet.amount") }}
      </div>-->
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card">
            <q-card-section>
              <div class="">
                {{ $t("wallet.withdraw") }}{{ $t("wallet.amount") }}
              </div>
              <div class="balance">
                {{ formattedBalance(amount) }}
                <q-badge class="badge">USD</q-badge>
              </div>
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
      <!--2way-->
      <div class="row tab-big-title" style="margin: 30px 0 20px 0">
        {{ $t("wallet.choose_withdraw_way") }}
      </div>
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
                :content="title"
              /> </q-card-section
          ></q-radio>
        </q-card>
      </div>
    </div>
    <!--step 4-->
    <div v-if="step === 4">
      <div class="row">{{ $t("wallet.pay") }}{{ $t("nav.account") }}</div>
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
      <!--money-->
      <div>
        <q-card
          class="transfer_card no-shadow my-shadow row full-width justify-center"
        >
          <q-card-section horizontal class="justify-between edit-card">
            <q-card-section>
              <div class="">
                {{ $t("wallet.withdraw") }}{{ $t("wallet.amount") }}
              </div>
              <div class="balance">
                {{ formattedBalance(amount) }}
                <q-badge class="badge">USD</q-badge>
              </div>
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
      <!--way-->
      <div>
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
      <!--input-->
      <div class="row tab-big-title" style="margin: 30px 0 20px 0">
        {{ $t("wallet.input_wallet_address") }}
      </div>

      <q-input
        v-model="wallet_address"
        :placeholder="$t('auth.plz_enter')"
      >   <template v-slot:append><q-btn flat>  <img src="~assets/QRCODE.png"></q-btn></template></q-input>
      <div class="row justify-end">
        <q-btn
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
  <!--repassword-->
  <q-dialog v-model="password_verify">
      <q-card style="width: 90vw; min-width: 400px" class="justify-center">
        <div class="fixed">
          <q-btn
            color="grey-6"
            icon="close"
            class="no-shadow text-my-gray close-btn"
            round
            v-close-popup
          />
        </div>
        <div  >
 <div class="row tab-inner">
          <div class="edit_title q-mt-sm">{{ $t("wallet.your_pw") }}</div>
          <q-input
            :placeholder="$t('wallet.your_pw')"
            class="col-12 input-field-title-margin"
            v-model="password"
            lazy-rules
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!--re-->

          <q-input
            :placeholder="$t('profile.enter_again')"
            class="col-12 input-field-title-margin"
            v-model="re_password"
            lazy-rules
            :type="reisPwd ? 'password' : 'text'"
            :rules="[]"
          >
            <template v-slot:append>
              <q-icon
                :name="reisPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="reisPwd = !reisPwd"
              />
            </template>
          </q-input>
          <!--btn-->

        </div>
        </div>
        <q-card-section class="row justify-end full-width">

              <q-btn
                :disabled="isInvalidPassword"
                class="confrim_btn content_btn align-email-margin"
                @click="confirm"
                >{{ $t("auth.confirm") }}</q-btn
              >


        </q-card-section>
      </q-card>
       <div class="row fixed-bottom items-center full">
                <q-btn
                  color="grey-6"
                  icon="close"
                  class="no-shadow text-my-gray lt-sm mobile-close-btn"
                  round
                  v-close-popup
                />
              </div>
    </q-dialog>
</template>

<script>
import Withdraw_Waycard from "src/components/wallet/withdraw_card.vue";
import Transfer_accountCard from "src/components/wallet/account_card.vue";
import { accounts } from "src/components/acc_data.js";
import { ref } from "vue";
export default {
  components: { Transfer_accountCard, Withdraw_Waycard },
  props: {
    selected: Boolean,
  },
  name: "WithdrawFormComponent",
  data() {
    return {
      step: 1,
      amount: "",
      wallet_address: "",
      selectedCard: null,
      selectedCardId: null,
      selectedCardWay: null,
      password_verify: false,
      password: "",
        isPwd: ref(true),
      reisPwd: ref(true),
      re_password:"",
      ways: [
        {
          name: "Tron",
          label: "Tether (USDT)",
          short_name: "TRC20",
          transition_fee: "1",
        },
        {
          name: "Ethereum",
          label: "Tether (USDT)",
          short_name: "ERC20",
          transition_fee: "15",
        },
      ],
      cards: [
        accounts.standard,
        accounts.prime,
        accounts.pro,
        accounts.acc_balance,
      ],
      account: accounts,
      selection: null,
      selected_item: "selected_item",
      title: "title",
    };
  },
  computed: {
      isInvalidPassword() {
      if (!this.password || !this.re_password) {
        return true;
      }
      if (
        this.password !== this.re_password ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(this.password)
      ) {
        return true;
      }
      return false;
    },
    remainingCards() {
      return this.cards.filter((card) => card !== this.selectedCard);
    },
    disableConfirmButton() {
      return this.amount === "" || this.amount > this.selectedCard.balance;
    },
    disableSubmitButton() {
      return this.wallet_address == "";
    },
  },
  methods: {
    confirm() {
        this.$emit("withdraw_done", true);
    },
    submitInput() {
      this.step = 3;
    },
    submitForm() {
        this.password_verify= true;

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
    Show_text() {
      this.selected_item = true;
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
      this.selectedCard = null;
      this.selection = null;
    },
    goBackToStep2() {
      this.step = 2;
      this.selectedCardreceive = null;
      this.selection = null;
    },
    goBackToStep3() {
      this.step = 3;
      this.selectedCardWay = null;
      this.selection = null;
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
  },
};
</script>
<style scoped>

.mobile-close-btn {
  font-size: 18px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
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
}.close-btn {
  margin-right: -20px;
  font-size: 12px;
  color: #d9d9d9;
  right: 0;
  transform: translate(540px, -20px);
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
</style>
