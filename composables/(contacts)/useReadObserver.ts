import { ref, nextTick } from "vue";
import type { Ref } from "vue";
import { useMessagingStore } from "~/store/messaging";
import { useRoute } from "vue-router";

export function useReadObserver(containerRef: Ref<HTMLElement | null>) {
  const messagingState = useMessagingStore();
  const route = useRoute();
  const observer = ref<IntersectionObserver | null>(null);

  function setupObserver() {
    nextTick(() => {
      disconnect();
      observer.value = new IntersectionObserver(handleIntersections, {
        root: containerRef.value,
        threshold: 1.0,
      });
      observeUnread();
    });
  }

  function disconnect() {
    observer.value?.disconnect();
  }

  function observeUnread() {
    const unreadElements = document.querySelectorAll("[data-unread]");
    unreadElements.forEach((el) => {
      observer.value?.observe(el);
    });
  }

  async function handleIntersections(entries: IntersectionObserverEntry[]) {
    const newlyReadIds: string[] = [];

    entries.forEach((entry) => {
      const messageId = entry.target.getAttribute("id");
      const isUnread = entry.target.hasAttribute("data-unread");

      if (entry.isIntersecting && messageId && isUnread) {
        const index = messagingState.messages.findIndex((msg) => msg.$id === messageId);
        const message = messagingState.messages[index];
        if (message && message.status === "sent") {
          messagingState.messages[index].status = "read";
          newlyReadIds.push(messageId);
        }
      }
    });

    if (newlyReadIds.length > 0) {
      updateUnreadState(newlyReadIds.length);
      await markMessagesAsReadOnBackend(newlyReadIds);
    }
  }

  function updateUnreadState(count: number) {
    messagingState.unreadMessages.number -= count;
    if (messagingState.unreadMessages.number <= 0) {
      messagingState.setUnreadMessages({ number: 0, isThere: false });
    }
  }

  async function markMessagesAsReadOnBackend(readIds: string[]) {
    try {
      await fetch("/api/mark-messages-as-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactUserName: route.params.username,
          readMessageIds: readIds,
          unreadMessagesNumber: readIds.length,
        }),
      });
    } catch (error) {
      console.error("❌ Failed to mark messages as read:", error);
    }
  }
  return {
    setupObserver,
    disconnect,
  };
}
