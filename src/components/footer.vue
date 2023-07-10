<template>
  <div class="row justify-between footer">
    <div class="footer col-lg-7 col-md-12">
      {{ $t("label.footer_declaimer") }}
      <div class="text-weight-bold" style="display: inline">
        {{ $t("label.footer_license") }}
      </div>
    </div>

    <div class="footer col-lg-3 col-md-12" align="right">
      {{ $t("label.copy_right") }}
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent ",
});
</script>

<style scoped>
.footer {
  color: #aeb0b7;
  font-size: 12px;
  padding: 4px 16px;
  background-color: #f8f8f8;
}

@media screen and (max-width: 1265px) {
  .footer {
    padding: 10px;
  }
}
</style>
