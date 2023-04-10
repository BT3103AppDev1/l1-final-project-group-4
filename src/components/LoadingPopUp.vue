<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div class="popup-wrapper" v-show="modelValue">
    <div class="popup" v-show="modelValue">
      <div class="popup-inner">
        <div class="popup-content">
          <img src="../assets/loading.gif" id="loadingGif" class="popup-image" />
          <!-- <audio id="loadingAudio" src="../assets/loadingAudio.mp3" autoplay></audio> -->
        </div>
        <div class="popup-text">
          <span class="loading-text">Loading</span><span class="loading-dots">...</span>
        </div>
      </div>
    </div>
  </div>
</template>

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
  padding: 30px;
  transform: translate(-50%, -50%);
}

.popup-inner {
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.popup-content {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.popup-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.popup-text {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.loading-text {
  animation: loading-animation 1s infinite;
}

.loading-dots {
  opacity: 0;
  animation: dots-animation 1s infinite;
}

@keyframes loading-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes dots-animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
