import { onMounted, onUnmounted } from 'vue';

const useEventListener = (target, event, listener, options) => {
  onMounted(() => target.addEventListener(event, listener, options))
  onUnmounted(() => target.removeEventListener(event, listener, options))
}

export { useEventListener }
