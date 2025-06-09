<template>
  <div class="sticky top-20 bottom-0 min-h-[calc(100vh-5rem)] border-l-[1px] border-T3TextColor/50 dark:border-darkT4TextColor/50">
    <CustomHeads
      :heads="'h2'"
      :variant="'h2'"
      class="p-6"
      >{{ navLinksTitle ?? "On This Page" }}
    </CustomHeads>
    <nav class="grid gap-10">
      <ul class="grid gap-4">
        <li
          v-for="link in navLinks"
          :key="link.href"
          @click.self.prevent="scrollToSection(link.href)"
          class="cursor-pointer"
        >
          <CustomA
            :variant="'navigation'"
            :href="link.href"
            :class="[
              activeSection === link.href.slice(1) ? ' border-l-[1px] border-T3TextColor dark:border-darkT3TextColor font-bold' : '',
            ]"
            class="pl-10 text-sm capitalize"
          >
            {{ link.label }}
          </CustomA>
        </li>
      </ul>

      <hr class="border-T3TextColor/50 dark:border-darkT4TextColor/50" />
      <div>
        <CustomA
          class="pl-4"
          :variant="'navigation'"
          href="#top"
          @click.prevent="scrollToSection('#top')"
          v-if="activeSection !== 'top'"
        >
          <Icon name="material-symbols:arrow-upward-alt" />
          Back to top
        </CustomA>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  navLinksTitle: { type: String, required: true },
  navLinks: {
    type: Array as PropType<
      {
        href: string;
        label: string;
      }[]
    >,
    required: true,
  },
});
const activeSection = ref("");

function scrollToSection(href: string) {
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (target) {
    const offset = 100;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetTop - offset,
      behavior: "smooth",
    });
    // activeSection.value = id;
  }
}

function handleScroll() {
  const offset = 100;
  for (const link of props.navLinks) {
    const section = document.getElementById(link.href.slice(1));
    if (section) {
      const top = section.offsetTop - offset;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        activeSection.value = link.href.slice(1);
        break;
      }
    }
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
