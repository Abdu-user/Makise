<template>
  <nav
    class="top-0 left-0 flex items-center h-16 px-4 py-1"
    :class="state.newColors ? 'bg-bg' : 'bg-mainBg dark:bg-darkMainBg'"
  >
    <div>
      <BackButton
        class="max-md:hidden w-10 h-10 my-auto"
        :onClick="() => router.push('../')"
        :size="'md'"
      />
      <BackButton
        class="md:hidden w-10 h-10 my-auto"
        :onClick="() => router.push('./')"
        :size="'md'"
      />
    </div>
    <CustomImg
      :src="contactInfo?.profileImage || '/images/placeholder-avatar.jpg'"
      class="rounded-full ml-4 mr-2 w-10 h-10"
    />
    <div class="ml-2 grid">
      <p class="text-text text-base pr-4 truncate">
        <span>
          {{ `${contactInfo?.name ?? ""} ${contactInfo?.lastName ?? ""}`.trim() || contactInfo?.username || "Name" }}
        </span>
      </p>

      <p class="text-xs -mt-1 truncate text-muted">
        <span> Last seen {{ contactInfo?.lastOnline ? getSmartTime(contactInfo.lastOnline) : "at 33:33" }} </span>
      </p>
    </div>

    <!-- <div class="ml-auto flex gap-5">
      <CustomButton
        name="material-symbols:phone-enabled-sharp"
        :variant="'text'"
        :is-primary-color="'theme'"
        icon
        size="md"
        class="w-10 h-10 my-1 transform scale-x-[-1]"
        :rounded="true"
        @click="inDevelopment"
      />// TODO
      <CustomButton
        name="pepicons-pop:dots-y"
        :variant="'text'"
        :is-primary-color="'theme'"
        icon
        size="md"
        class="w-10 h-10 my-1"
        :rounded="true"
        @click="inDevelopment"
      />
    </div> -->
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
