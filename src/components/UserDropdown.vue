<template>
  <div class="q-py-md">
    <q-list class="user_dropdown justify-center">
      <q-item class="lt-md text-left" clickable to="/wallet/balance">
        <q-item-section avatar>
          <q-img size="22px">
            <img src="~assets/crm_balance.svg" />
          </q-img>
        </q-item-section>
        <q-item-section>
          {{ $t("label.my_balance") }}
        </q-item-section>
      </q-item>
      <q-separator inset class="lt-md" />
      <q-item clickable class="text-left" to="/profile/personal_info">
        <q-item-section avatar>
          <q-img size="22px">
            <img src="~assets/crm_info.svg" />
          </q-img>
        </q-item-section>
        <q-item-section> {{ $t("label.profile") }} </q-item-section>
      </q-item>

      <q-separator class="" inset />
      <q-item clickable class="text-left" to="/profile/password">
        <q-item-section avatar>
          <q-img size="22px">
            <img src="~assets/crm_pw.svg" />
          </q-img>
        </q-item-section>
        <q-item-section> {{ $t("label.edit_password") }} </q-item-section>
      </q-item>
      <q-separator class="" inset />
      <q-item clickable class="text-left" to="/profile/edit_address">
        <q-item-section avatar>
          <q-img size="22px">
            <img src="~assets/crm_address.svg" />
          </q-img>
        </q-item-section>
        <q-item-section> {{ $t("label.edit_address") }} </q-item-section>
      </q-item>

      <!--  <q-item class="text-left" clickable>
        <q-item-section avatar>
          <q-icon class="profile-icon" name="eva-inbox-outline"
        /></q-item-section>
        <q-item-section>
          {{ $t("label.inbox") }}
        </q-item-section>
      </q-item>-->

      <q-separator inset />
      <a href="https://www.gmtk.asia/#/auth/login">
        <q-item clickable>
          <q-item-section avatar>
            <q-img size="22px"> <img src="~assets/crm_logout.svg" /> </q-img
          ></q-item-section>
          <q-item-section>
            {{ $t("label.logout") }}
          </q-item-section>
        </q-item></a
      >
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "User_Dropdown ",
  components: {},
  props: {
    active_title: {
      type: String,
      required: true,
    },
  },
  data() {},

  methods: {},
});
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: #000000;
}
</style>
