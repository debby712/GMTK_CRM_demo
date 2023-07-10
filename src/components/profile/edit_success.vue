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

      <h3 class="msg" v-if="content === 'email'">
        {{ $t("profile.email_submit_success") }}
      </h3>
      <h3 class="msg" v-if="content === 'password'">
        {{ $t("profile.pw_submit_success") }}
      </h3>
      <h3 class="msg" v-if="content === 'address'">
        {{ $t("profile.address_submit_success") }}
      </h3>
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
  name: "EditSuccess",
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
