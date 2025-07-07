<template>
  <nav
    class="sticky z-10 top-0 right-0 left-0 flex items-center h-16 px-4 py-1"
    :class="state.newColors ? 'bg-bg' : 'bg-mainBg dark:bg-darkMainBg'"
  >
    <BackButton
      class="max-md:hidden w-12 h-12 my-auto"
      :onClick="() => router.push('../')"
    />
    <BackButton
      class="md:hidden w-12 h-12 my-auto"
      :onClick="() => router.push('./')"
    />
    <CustomImg
      :src="contactInfo?.profileImage || '/images/placeholder-avatar.jpg'"
      class="rounded-full ml-4 mr-2 w-12 h-12"
    />
    <div class="ml-2 grid">
      <p
        :class="`text-T1TextColor dark:text-darkT1TextColor`"
        class="grid grid-cols-[1fr,auto] pr-4 text-2xl line-clamp-1"
      >
        <span>{{ `${contactInfo?.name ?? ""} ${contactInfo?.lastName ?? ""}`.trim() || contactInfo?.username || "Name" }}</span>
      </p>
      <p class="text-lg line-clamp-1 -mt-1">
        <span :class="`text-T3TextColor dark:text-darkT3TextColor`">
          Last seen {{ contactInfo?.lastOnline ? getSmartTime(contactInfo.lastOnline) : "at 33:33" }}
        </span>
      </p>
    </div>
    <div class="ml-auto flex gap-5">
      <CustomButton
        name="material-symbols:phone-enabled-sharp"
        :variant="'text'"
        :is-primary-color="'theme'"
        icon
        size="f"
        class="w-14 p-3 h-14 my-1 transform scale-x-[-1]"
        :rounded="true"
        @click="inDevelopment"
      />
      <CustomButton
        name="pepicons-pop:dots-y"
        :variant="'text'"
        :is-primary-color="'theme'"
        icon
        size="f"
        class="w-14 p-3 h-14 my-1"
        :rounded="true"
        @click="inDevelopment"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
import type { ContactType } from "~/types/messaging";
import { inDevelopment } from "~/utils/devFunctions";
const state = useGlobalSettingStore();

const router = useRouter();

const props = defineProps<{
  contactInfo: ContactType | undefined;
}>();
watch(
  () => props.contactInfo,
  (newContacts) => {}
);
</script>

<style scoped></style>
