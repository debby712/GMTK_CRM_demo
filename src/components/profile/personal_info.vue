<template>
  <div class="row tab-inner">
    <div class="edit_title">{{ $t("profile.enter_new_address") }}</div>
    <div class="row full-width justify-between">
      <q-input
        :class="{ 'col-3': $q.screen.width <= 600 }"
        readonly
        class="col"
        v-model="title"
        :label="$t('auth.title')"
      />
      <q-input
        readonly
        class="col"
        :class="{ 'col-3': $q.screen.width <= 600 }"
        v-model="firstname"
        :label="$t('auth.firstname')"
      />
      <q-input
        readonly
        class="col"
        :class="{ 'col-3': $q.screen.width <= 600 }"
        v-model="lastname"
        :label="$t('auth.lastname')"
      />
      <q-input
        :class="{ 'col-12': $q.screen.width <= 600 }"
        v-model="id_no"
        class="col"
        readonly
        :label="$t('auth.id_no')"
      />
      <!--<q-input
        readonly
        class=" "
        style="overflow: auto"
        v-model="invitation_code"
        :label="$t('auth.invitation_code')"
      />-->
    </div>

    <q-separator class="full-width separator" inset />

    <!--email-->
    <div class="row full-width input-margin-top">
      <q-input
        readonly
        class="col-lg-4 col-md-4 col-12"
        v-model="mail_address"
        :label="$t('auth.mail_address')"
      />
      <q-input
        readonly
        class="col-lg-8 col-md-8 col-12"
        v-model="contact_num"
        :label="$t('auth.contact_num')"
      />
    </div>
    <q-separator class="separator full-width" inset />
    <!--address-->
    <div class="row full-width input-margin-top">
      <q-select
        class="col-lg-2 col-md-2 col-sm-2 col-6"
        v-model="country"
        use-input
        hide-selected
        hide-dropdown-icon
        fill-input
        readonly
        :label="$t('auth.living_country')"
      />

      <q-select
        class="col-lg-2 col-md-2 col-sm-2 col-6"
        v-model="nation"
        dropdown-icon="expand_more"
        hide-dropdown-icon
        readonly
        :label="$t('auth.nation')"
      />
      <q-input
        class="col-lg-8 col-md-8 col-sm-12 col-12"
        v-model="address"
        readonly
        :label="$t('auth.address')"
        :placeholder="$t('auth.plz_enter')"
      />
    </div>

    <div class="row full-width input-margin-top">
      <q-input
        class="col-2"
        v-model="city"
        readonly
        :label="$t('auth.city')"
        :placeholder="$t('auth.plz_enter')"
      />
      <q-input
        class="col-2"
        v-model="state"
        readonly
        :label="$t('auth.state')"
        :placeholder="$t('auth.plz_enter')"
      />
      <q-input
        class="col"
        v-model="mail_code"
        readonly
        :label="$t('auth.mail_code')"
        :placeholder="$t('auth.plz_enter')"
      />
    </div>
    <q-separator class="full-width separator" inset />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PersonalComponent",
  props: {},

  data() {
    return {
      title: this.$t("auth.sir"),
      firstname: "Tai Man",
      lastname: "Wong",
      id_no: "護照 A123456789(Z)",
      country: "Taiwan",
      nation: "Taiwan",
      address: "大里區福德路33巷5號",
      invitation_code: "IB18722615",
      mail_address: "taimanwong@gmail.com",
      contact_num: "+866 12457487451",
      city: "-",
      state: "台中市",
      mail_code: "412",
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped>
.separator {
  background: #ebebeb;
}
.input-margin-top {
  margin-top: 40px;
}
</style>
