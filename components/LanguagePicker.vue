<template>
  <div
    class="relative w-10 text-text"
    ref="langDiv"
  >
    <button
      ref="langButton"
      @click="isLangOpen = !isLangOpen"
      class="uppercase font-semibold"
      v-show="!isLangOpen"
    >
      {{ locale }}
    </button>
    <div
      class="grid absolute top-0"
      v-show="isLangOpen"
    >
      <button
        class="uppercase"
        v-for="locale in locales"
        @click="(setLocale(locale.code), (isLangOpen = false))"
      >
        {{ locale.code }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();

const isLangOpen = ref(false);
const langButton = ref<HTMLButtonElement>();
const langDiv = ref<HTMLDivElement>();

const isNavOpenHome = ref(false);
const navButton = ref<{ button: HTMLButtonElement }>();
const navDiv = ref<HTMLDivElement>();
const el = ref<HTMLElement>();
function isLangContain(e: Event) {
  const target = e.target as Node;

  const containsNavButton = (navButton.value?.button as Node)?.contains(target);
  const containsNavDiv = (navDiv.value as Node)?.contains(target);
  if (containsNavButton || containsNavDiv) {
  } else {
    isNavOpenHome.value = false;
  }

  const containsButton = (langButton.value as Node)?.contains(target);
  const containsDiv = (langDiv.value as Node)?.contains(target);
  if (containsButton || containsDiv) return;
  isLangOpen.value = false;
}
onMounted(() => {
  document.addEventListener("click", isLangContain);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", isLangContain);
});
</script>

<style scoped></style>
