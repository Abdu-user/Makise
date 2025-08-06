<template>
  <section
    id="Skills"
    class="grid md:grid-cols-2 mx-10 gap-10 py-6"
  >
    <div class="purpleBlur absolute left-0 -translate-x-full"></div>
    <div>
      <p
        class="slideLeft"
        v-html="
          $t('aboutMeParagraph')
            .replace(/\n/g, '<br />')
            .replace(/SS\$/g, '<span class=\'text-primary  font-bold\'>')
            .replace(/\$SS/g, '</span>')
            .replaceAll('GG$', '<span class=\'text-[var(--success)] font-bold\'>')
            .replaceAll('BB$', '<span class=\'text-blue-400 font-bold\'>')
            .replaceAll('RR$', '<span class=\'text-[#fd366e] font-bold\'>')
            .replaceAll('VV$', '<span class=\'text-[#9c84d2] font-bold\'>')
            .replaceAll('FF$', '<span class=\'text-[#ff7237] font-bold\'>')
        "
      ></p>
    </div>
    <div class="flex items-center justify-center">
      <img
        src="/images/my-image.png"
        alt=""
        class="slideRight"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
