<template>
  <div class="popup-wrapper" v-show="modelValue">
    <div class="popup" v-show="modelValue">
      <div class="popup-inner">
        <slot></slot>
        <button class="close-popup" @click="closePopup">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePopup() {
      // Emit the update event to close the popup
      this.$emit('update:modelValue', false);

      // Navigate to "/bookappointments" route
      this.$router.push('/myappointments');
    }
  }
};
</script>

<style scoped>
.popup-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
}

.popup {
  position: absolute;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding: 30px 50px;
  transform: translate(-50%, -50%);
}
.popup-inner {
  width: 330px;
}

.close-popup {
  margin-top: 10px;
  margin-left: 130px;
  cursor: pointer;
  background-color: #2c5b94;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
}
</style>
