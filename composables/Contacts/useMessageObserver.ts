import type { MessageType } from "~/types/type";

// composables/useMessageObserver.ts
export function useMessageObserver(containerRef: Ref<HTMLElement | null>, getMessages: () => MessageType[]) {
  const observer = ref<IntersectionObserver | null>(null);

  function disconnectObserver() {
    observer.value?.disconnect();
  }

  function createObserver(callback: (readIds: string[]) => void) {
    observer.value = new IntersectionObserver(
      (entries) => {
        const readIds: string[] = [];

        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const isUnread = entry.target.hasAttribute("data-unread");
          if (entry.isIntersecting && id && isUnread) {
            readIds.push(id);
          }
        });

        if (readIds.length > 0) callback(readIds);
      },
      {
        root: containerRef.value,
        threshold: 1.0,
      }
    );
  }

  function observeUnreadMessages() {
    const unread = document.querySelectorAll("[data-unread]");
    unread.forEach((el) => observer.value?.observe(el));
  }

  return {
    setupObserver(callback: (readIds: string[]) => void) {
      nextTick(() => {
        disconnectObserver();
        createObserver(callback);
        observeUnreadMessages();
      });
    },
    disconnectObserver,
  };
}
