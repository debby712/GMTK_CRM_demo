<template>
  <div class="text-center">
    <div style="margin: auto; margin-top: 100px">
      <q-card class="no-shadow my-shadow waring-card q-pa-sm">
        <q-icon
          name="eva-alert-triangle
"
          class="q-ma-md"
          color="primary"
          size="70px"
        />
        <q-card-section class="row justify-center">
          <h5 v-if="content === '1'" class="card-warning-text col-11">
            {{ $t("error.1") }}
          </h5>
          <h5 v-if="content === '2'" class="card-warning-text col-11">
            {{ $t("error.90") }}
          </h5>
          <h5 v-else class="card-warning-text col-11">
            {{ $t("error.91") }}
          </h5>
          <q-btn
            :label="$t('nav.login')"
            class="content_btn confrim_btn"
            :to="{ name: 'login' }"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  name: "authError",
  components: [],
  data() {
    return {};
  },
});
</script>
<style scoped>
.waring-card {
  max-width: 600px;
  margin: auto;
}
</style>
