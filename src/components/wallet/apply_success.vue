<template>
  <div class="text-center">
    <div style="padding: 120px 0">
      <q-icon
        name="eva-checkmark-circle-2-outline
"
        class="q-ma-md"
        color="positive"
        size="70px"
      />

      <h3 class="msg" v-if="content === 'apply'">
        {{ $t("wallet.apply_submit") }}
      </h3>
      <h3 class="msg" v-if="content === 'tran'">
        {{ $t("wallet.trans_submit") }}
      </h3>
      <h3 class="msg" v-if="content === 'withdraw'">
        {{ $t("wallet.withdraw_submit") }}
      </h3>
      <div v-if="content !== 'apply'">
        <q-btn
          v-if="content === 'tran'"
          :label="$t('label.gologin')"
          class="content_btn confrim_btn"
          :to="{ name: 'mt4' }"
        />
        <q-card class="no-shadow my-shadow waring-card">
          <q-card-section class="row items-start">
            <q-icon
              class="text-primary col-1 q-mt-xs alert-icon"
              size="22px"
              name="eva-alert-triangle"
            />
            <div class="card-warning-text col-11">
              {{ $t("wallet.history_link") }}
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
      <q-card
        v-if="content === 'apply'"
        class="no-shadow my-shadow waring-card"
      >
        <q-card-section class="row items-start">
          <q-icon
            class="text-primary col-1 q-mt-xs alert-icon"
            size="22px"
            name="eva-alert-triangle"
          />
          <div class="card-warning-text col-11">
            {{ $t("wallet.trans_apply") }}

            <br /><br />
               {{ $t("wallet.trans_hints") }}

            <br /><br />
            {{ $t("wallet.history_link") }}
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
</template>
<script>
import { defineComponent } from "vue";

export default {
  components: {},
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  name: "ApplySuccess",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.waring-card {
  margin: 20px 0;
  padding: 10px 0;
  background: #f8f8f8;
  text-align: left !important;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
}

.msg {
  display: inline-block;
  vertical-align: middle;
  font-weight: 500;
  font-size: 30px;
  line-height: 43px;
}
</style>
