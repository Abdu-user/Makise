<template>
  <NuxtLink :to="to">
    <div
      class="grid grid-cols-[72px,1fr] gap-2 pt-2 h-[96px] px-2"
      :class="state.newColors ? `bg-bg hover:bg-bg-light text-text-muted` : `dark:hover:bg-darkMainT2Bg`"
    >
      <CustomImg
        :src="profileImgSrc || '/images/placeholder-avatar.jpg'"
        class="w-16 h-16 m-2 rounded-full"
      />
      <div class="pb-2 pl-2 grid border-b-[2px] border-gray-300 dark:border-darkMainT3Bg">
        <p
          :class="state.newColors ? 'text-text' : `text-T1TextColor dark:text-darkT1TextColor`"
          class="grid grid-cols-[1fr,auto] gap-2 pt-2 text-lg line-clamp-1"
        >
          <span class="line-clamp-1">{{ name || "Name" }}</span>
          <span class="flex items-start gap-1 text-sm">
            <span class="text-success">
              <span v-if="myLastMessageStatus === 'sending'">
                <Icon name="svg-spinners:clock" />
              </span>
              <span v-else-if="myLastMessageStatus === 'sent'">✓</span>
              <span v-else-if="myLastMessageStatus === 'read'"
                ><Icon
                  name="quill:checkmark-double"
                  class="w-7 h-7 inline-block mt-0"
              /></span>
              <span v-else="myLastMessageStatus === 'read'"
                ><Icon
                  name="quill:checkmark-double"
                  class="w-7 h-7 inline-block"
              /></span>
            </span>
            <span :class="state.newColors ? 'text-text-muted ' : `text-T3TextColor dark:text-darkT3TextColor`">
              {{ lastActive || "03:48" }}
            </span>
          </span>
        </p>
        <p class="text-lg line-clamp-1 pb-2">
          {{ lastMessage || "No messages yet" }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

const state = useGlobalSettingStore();
defineProps({
  profileImgSrc: { type: String, required: true },
  name: { type: String, required: true },
  lastActive: { type: String, required: true },
  myLastMessageStatus: { type: String as PropType<"sending" | "sent" | "read">, required: true },
  lastMessage: { type: String, required: true },
  to: { type: [String, Object], required: true, default: "/" },
});
</script>

<style scoped></style>
