import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import { useMessagingStore } from "~/store/messaging";

export function useScrollBehavior(containerRef: Ref<HTMLElement | null>) {
  const messagingState = useMessagingStore();

  function scrollToBottom(smooth = true) {
    const container = containerRef.value;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }

  function detectScroll() {
    const el = containerRef.value;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 65;
    messagingState.isUserAtBottom = isAtBottom;
  }

  function watchMessagesAndScroll() {
    const stop = watch(
      () => messagingState.messages,
      async (messages) => {
        if (messages.length === 0) return;
        await nextTick();
        scrollToBottom(false);
        stop(); // Run once
      },
      { immediate: true }
    );
  }

  function setupScrollListeners() {
    onMounted(() => {
      messagingState.scrollToBottom(scrollToBottom);
      containerRef.value?.addEventListener("scroll", detectScroll);
      watchMessagesAndScroll();
    });

    onBeforeMount(() => {
      messagingState.messages = [];
    });

    onBeforeUnmount(() => {
      containerRef.value?.removeEventListener("scroll", detectScroll);
    });
  }

  return {
    scrollToBottom,
    detectScroll,
    watchMessagesAndScroll,
    setupScrollListeners,
  };
}
