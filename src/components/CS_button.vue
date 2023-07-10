<template>
  <q-btn
    class="cs_btn fixed-bottom-right"
    flat
    :ripple="{ color: 'white' }"
    round
  >
    <img class="circle pulse" src="~assets/CS.png" />
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CS_button ",
});
</script>

<style scoped>
.q-btn {
  margin-right: 80px;
  margin-bottom: 50px;
  z-index: 3000;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0px 0px 1px 1px #0000001a;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px hsla(170, 82%, 38%, 0.308);
  }
  100% {
    box-shadow: 0 0 0 20px hsla(0, 0%, 100%, 0.012);
  }
}

.pulse {
  animation-name: pulse-animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@media screen and (max-width: 600px) {
  .q-btn {
    margin-right: 30px;
    margin-bottom: 30px;
  }
}

.blue-text {
  color: #307ff6;
}
</style>
