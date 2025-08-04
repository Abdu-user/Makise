export function useCloseNotFocused(
  htmlElements: globalThis.Ref<HTMLElement | undefined, HTMLElement | undefined>[],
  closeFunction: () => void
) {
  function isElementInTheEvent(e: Event) {
    const target = e.target as Node;

    const elementFound = htmlElements.find((htmlElement) => {
      // console.log("Element found in the event:", htmlElement?.value);
      // console.log(htmlElement?.value?.contains(target));
      if (htmlElement?.value && htmlElement?.value?.contains(target)) {
        return true;
      }
    });
    if (!elementFound) {
      closeFunction();
    }
  }

  onMounted(() => {
    document.addEventListener("click", isElementInTheEvent);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("click", isElementInTheEvent);
  });
}
