<template>
  <section
    id=""
    class="grid md:grid-cols-2 mx-10 gap-6 py-6"
  >
    <div class="grid justify-between gap-6">
      <h1 class="font-semibold text-2xl md:text-5xl slideLeft">
        <span v-html="$t('YouTypeMessageHeader').replace(/\n/g, '<br />')"></span>
      </h1>
      <p class="font-semibold text-sm md:max-w-[50%] slideLeft">{{ $t("YouTypeMessageParagraph") }}</p>
      <HomeButtonFromHome class="slideLeft">Get Started</HomeButtonFromHome>
    </div>
    <div class="flex-col flex">
      <HomeRewardsCard
        :title="$t('Rewards')"
        :description="$t('RewardsDescription')"
        name="material-symbols:star-rounded"
        class="slideRight"
      />
      <HomeRewardsCard
        :title="$t('Secure')"
        :description="$t('SecureDescription')"
        name="tdesign:secured-filled"
        class="slideRight"
      />
      <HomeRewardsCard
        :title="$t('Notifications')"
        :description="$t('NotificationsDescription')"
        name="mingcute:telegram-fill"
        class="slideRight"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
