<template>
  <q-page class=" ">this is home </q-page>
</template>

<script>
import { defineComponent } from "vue";

import { ref } from "vue";

export default defineComponent({
  components: {},
  name: "HomePage",
  data() {
    return {};
  },
  computed: {},
  setup() {},
  methods: {
    fadeInLeft(element) {
      //在这个例子中，当`<div>`出现时，
      //我们使它弹跳2秒

      // 我们添加Quasar的CSS辅助类`animate-bounce`
      element.classList.add("animate__fadeInLeft");
      setTimeout(() => {
        //我们确保节点仍然在DOM中
        //（渲染我们的<div>`时
        //用户尚未从Vue组件离开）
        //以使我们不会产生错误
        if (document.body.contains(element)) {
          //然后移除辅助类
          //停止弹跳
          element.classList.remove("animated");
        }
      }, 2000);
    },
  },
});
</script>
<style scoped></style>
