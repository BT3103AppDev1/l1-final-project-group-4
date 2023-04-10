<template>
  <div class="popup-wrapper" v-show="modelValue">
    <div class="popup" v-show="modelValue">
      <div class="popup-inner">
        <slot id="message"></slot>
        <div>
          <button class="close-popup" @click="submitOk">OK</button>
          <button class="close-popup" @click="submitCancel">Cancel</button>
        </div>
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
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    submitOk() {
      this.onSubmit();
      this.$emit('update:modelValue', false); // this just closes the popup after submitting the form
    },
    submitCancel() {
      this.$emit('update:modelValue', false); // this just closes the popup after submitting the form
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.close-popup {
  margin: 10px;
  width: 10vw;
  cursor: pointer;
  background-color: #2c5b94;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
}
#message {
  text-align: center;
}
</style>
