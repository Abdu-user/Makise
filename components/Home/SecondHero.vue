<template>
  <section
    id=""
    class="px-5 md:px-10 py-6 w-screen"
  >
    <div class="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <div class="grid justify-between gap-6">
        <h1 class="font-semibold text-2xl md:text-5xl slideLeft break-words">
          <span v-html="$t('YouTypeMessageHeader').replace(/\n/g, '<br />')"></span>
        </h1>
        <p class="font-semibold text-sm slideLeft">{{ $t("YouTypeMessageParagraph") }}</p>
        <HomeButtonFromHome class="slideLeft h-fit w-full md:w-fit">{{ $t("getStarted") }}</HomeButtonFromHome>
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
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
