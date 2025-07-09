// composables/useScrollWatcher.ts
export function useScrollWatcher(
  containerRef: Ref<HTMLElement | null>,
  onScrollBottom: (isAtBottom: boolean) => void // ✅ Fix here
) {
  function detectScroll() {
    const el = containerRef.value;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 65;
    onScrollBottom(isAtBottom); // ✅ No more TypeScript error
  }

  function setupScrollListener() {
    containerRef.value?.addEventListener("scroll", detectScroll);
  }

  function cleanupScrollListener() {
    containerRef.value?.removeEventListener("scroll", detectScroll);
  }

  return {
    setupScrollListener,
    cleanupScrollListener,
  };
}
