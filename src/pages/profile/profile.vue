<template>
  <q-page class="container">
    <h3 style="margin-bottom: 7px" class="gt-xs">
      {{ $t("label.my_acc") }}
    </h3>
    <q-tabs
      v-model="tab"
      class="text-dark"
      active-color="dark"
      active-bg-color="white"
      indicator-color="primary"
      align="start"
      narrow-indicator
    >
      <q-route-tab
        to="/profile/personal_info"
        name="personal"
        :label="$t('profile.personal_info')"
      />
      <q-route-tab
        to="/profile/edit_email"
        name="email"
        :label="$t('label.edit_email')"
      />
      <q-route-tab
        to="/profile/password"
        name="password"
        :label="$t('label.edit_password')"
      />
      <q-route-tab
        to="/profile/edit_address"
        name="address"
        :label="$t('label.edit_address')"
      />
    </q-tabs>
    <q-separator inset class="tab_border" />

    <div class="container-inner">
      <q-card class="no-shadow tab-container" style="overflow-x: hidden">
        <router-view class="animated animate__slideInRight animate__faster"
      /></q-card>

      <!-- <q-tab-panels v-model="tab" animated class="tab-container">
        <q-tab-panel name="personal">
          <PersonalComponent />
        </q-tab-panel>

        <q-tab-panel name="email">
          <EamilCompoent />
        </q-tab-panel>
        <q-tab-panel name="password">
          <PasswordComponent />
        </q-tab-panel>
        <q-tab-panel name="address">
          <AddressComponent />
        </q-tab-panel>
      </q-tab-panels>-->
    </div></q-page
  >
</template>

<script>
import { defineComponent, ref } from "vue";
import PersonalComponent from "src/components/profile/personal_info.vue";
import AddressComponent from "src/components/profile/address.vue";
import PasswordComponent from "src/components/profile/password.vue";

import EamilCompoent from "src/components/profile/edit_email.vue";
export default defineComponent({
  components: {},
  name: "profilePage",

  data() {
    return {
      tab: "personal",
    };
  },
});
</script>
<style scoped></style>
