<template>
  <div
    ref="parent"
    class="relative"
  >
    <div
      class="flex items-center justify-center h-12 w-12 rounded-full"
      ref="profileImg"
    >
      <Icon
        v-if="state.loading"
        name="material-symbols-light:forward-circle"
        class="w-full h-full animate-spin"
        aria-label="loading"
      />

      <template v-else>
        <NuxtLink
          v-if="!state.user"
          to="/sign-in"
          @click="setRoutePath"
          class="flex items-center justify-center border border-primary bg-accent hover:bg-active/5 w-[90%] h-[90%] hover:text-secondary text-textHeader font-semibold rounded-full"
          >Login</NuxtLink
        >
        <template v-else>
          <NuxtLink
            :to="state.isInProfilePage ? '' : '/profile'"
            class="w-full h-full flex cursor-pointer"
            @click="openDropdown"
            @keydown.enter="openDropdown"
            role="button"
            tabindex="0"
            :class="'focus:outline focus:outline-primary focus:outline-2 outline-none active:animate-spin flex items-center rounded-full '"
          >
            <Icon
              v-if="state.isInProfilePage"
              name="meteor-icons:gear"
              class="w-full h-full m-2"
              aria-label="settings"
            />
            <CustomImg
              v-else-if="state.userData?.profileImage"
              :src="state.userData?.profileImage"
              class="w-full h-full object-cover rounded-full"
            />
            <Icon
              v-else
              name="material-symbols-light:account-circle-outline"
              class="w-full h-full text-primary"
            />
          </NuxtLink>
        </template>
      </template>
    </div>
    <CustomContainer
      ref="dropdownWrapper"
      v-if="state.isInProfilePage && state.isLoginButtonDropdownOpen"
      :variant="'UIContainer'"
      class="absolute top-16 -right-3 p-3"
    >
      <CustomParagraph
        :variant="'noMargin'"
        class="px-3 md:px-3 mb-2"
      >
        {{ state.user?.email }}
      </CustomParagraph>
      <CustomNuxtLink
        to="/profile/account"
        :variant="'navigation'"
        class="flex text-base md:p-1 text-start justify-between"
      >
        Account
        <Icon name="material-symbols:person"></Icon>
      </CustomNuxtLink>
      <CustomButton
        :is-primary-color="'primary'"
        :variant="'navigation'"
        name="material-symbols:exit-to-app"
        :icon-position="'right'"
        :block="true"
        class="w-full justify-between"
        :size="'sm'"
        @click="logout()"
      >
        Sign out
      </CustomButton>
      <ThemeToggleButton
        class="mt-2"
        :text="'Theme'"
      />
      <LanguageContainer class="mx-3 flex justify-between mt-1" />
    </CustomContainer>
  </div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";
const state = useGlobalSettingStore();

const auth = useAuth();

import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { deletePrivateKey } from "~/composables/useKeyPair";
import LanguageContainer from "./LanguageContainer.vue";

const [parent] = useAutoAnimate({
  duration: 150,
});

const route = useRoute();
const router = useRouter();

const setRoutePath = () => {
  state.setFromPage(route.path);
};
// const isInProfilePage = ref(false);

onMounted(() => {
  state.isInProfilePage = route.fullPath.includes("/profile");
});

const logout = () => {
  confirm("Are you sure you want to sign out?") &&
    auth.logout().then(() => {
      state.isLoginButtonDropdownOpen = false;
      state.setFromPage("/profile");
      deletePrivateKey();
      router.push("/sign-in");
    });
};

const openDropdown = () => {
  if (state.isInProfilePage) {
    state.isLoginButtonDropdownOpen = !state.isLoginButtonDropdownOpen;
    state.isNavOpen = false;
  }
};
const dropdownWrapper = ref<HTMLElement>();
const profileImg = ref<HTMLElement>();

const onClickOutside = (e: MouseEvent) => {
  // @ts-ignore CustomContainer returns  sectionRef
  if (!dropdownWrapper.value?.sectionRef?.contains(e.target as Node)) {
    if (profileImg.value?.contains(e.target as Node)) return;

    state.isLoginButtonDropdownOpen = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>
