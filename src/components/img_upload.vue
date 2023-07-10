<template>
  <q-input
    @click="getFile"
    v-model="file"
    ref="myFileInput"
    class="col-3"
    style="cursor: pointer"
    :class="{ 'col-12': $q.screen.width <= 600 }"
    :placeholder="$t('auth.upload_id')"
  >
    <q-input
      class="col-3"
      :class="{ 'col-12': $q.screen.width <= 600 }"
      ref="myFileInput"
      style="display: none"
      v-model="file"
      accept="image/*"
      type="file"
      :label="$t('auth.upload_id')"
    />
    <template v-slot:append>
      <q-btn
        @click="getFile"
        class="uploadbtn"
        color="primary"
        :label="$t('auth.browse')"
    /></template>
  </q-input>
  <q-dialog v-model="diagShow">
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
      <div style="max-width: 300px; min-height: 200px; margin: 20px auto">
        <q-uploader
          url="http://localhost:4444/upload"
          style="max-width: 300px"
        />
      </div>
      <q-card-section class="row justify-center">
        <q-btn
          style="
            background-color: #7d8087;
            border-radius: 6px;
            color: #fff;
            margin: 2px;
          "
          class="no-shadow col"
          :label="$t('auth.reupload')"
          @click="getFile"
        />
        <q-btn
          :label="$t('auth.confirm')"
          style="border-radius: 6px; color: #fff; margin: 2px"
          class="no-shadow col"
          color="primary"
          @click="uploadFile"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped>
.round-dash-border {
  border-style: dashed;
  border-color: darkgrey;
  border-width: 2px;
  border-radius: 0px;
}
.close-btn {
  margin-right: -20px;
  font-size: 12px;
  color: #d9d9d9;
  right: 0;
  transform: translate(540px, -20px);
}
</style>
<script>
import { ref } from "vue";

export default {
  name: "imgUploadBtn",
  components: {},

  data() {
    return {
      file: null,
      showPreview: false,
      diagShow: false,
    };
  },

  computed: {},

  methods: {
    getFile() {},

    uploadFile() {},
  },
};
</script>
