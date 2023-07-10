<template>
  <div class="row tab-inner">
    <div
      class="row full-width q-gutter-sm"
      :class="{ 'justify-center': $q.screen.width <= 600 }"
    >
      <q-card
        class="platform-card no-shadow my-shadow card-margin col-lg-4 col-md-4 col-sm-12"
      >
        <q-card-section class="bg-primary text-white title"
          >{{ $t("platform.web_title") }}
        </q-card-section>
        <img src="~assets/webtrader.png" class="" />

        <q-card-section class="bg-white text-dark caption">
          {{ $t("platform.web_caption") }}</q-card-section
        >
        <q-separator />
        <q-card-actions align="right"
          ><q-btn
            icon="fa-brands fa-chrome"
            :label="$t('platform.web')"
            class="platform_btn"
          />
        </q-card-actions>
      </q-card>
      <!--pc-->
      <q-card
        style="max-width: 300px"
        class="platform-card no-shadow my-shadow card-margin col-lg-4 col-md-4 col-sm-12"
      >
        <q-card-section class="bg-primary text-white title"
          >{{ $t("platform.pc_title") }}
        </q-card-section>
        <img src="~assets/pc.png" class="" />

        <q-card-section class="bg-white text-dark caption">
          {{ $t("platform.pc_caption") }}</q-card-section
        >
        <q-separator />
        <q-card-actions align="right"
          ><q-btn
            icon="fa-brands fa-windows"
            :label="$t('platform.pc')"
            class="platform_btn"
          />
          <q-btn
            icon="fa-brands fa-apple"
            :label="$t('platform.mac')"
            class="platform_btn"
          />
        </q-card-actions>
      </q-card>
      <!--mobile-->
      <q-card
        class="platform-card no-shadow my-shadow card-margin col-lg-4 col-md-4 col-sm-12"
      >
        <q-card-section class="bg-primary text-white title"
          >{{ $t("platform.mobile_title") }}
        </q-card-section>
        <img src="~assets/mobile.png" class="" />

        <q-card-section class="bg-white text-dark caption">
          {{ $t("platform.mobile_caption") }}</q-card-section
        >
        <q-separator />
        <q-card-actions align="right"
          ><q-btn
            icon="fa-brands fa-google-play"
            :label="$t('platform.android')"
            class="platform_btn"
          />
          <q-btn
            icon="fa-brands fa-apple"
            :label="$t('platform.ios')"
            class="platform_btn"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddressComponent",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {
    // watch for the success property to change
    success(newVal) {
      if (newVal) {
        // delay the reload by 1000 milliseconds (1 second)
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    },
  },
});
</script>

<style scoped>
.platform-card {
  border-radius: 16px;

  max-width: 300px;
  border: 1px solid #ebebeb;
}
.title {
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
}
.platform_btn {
  font-size: 16px;
  background: #389e0d !important;
  border-radius: 6px;
  font-weight: 500;
  color: #fff;
}
.caption {
  margin: 0 20px;
  height: 150px;
}
img {
  max-height: 120px;
}
</style>
