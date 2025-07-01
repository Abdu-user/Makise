<template>
  <div
    class="grid md:grid-cols-[minmax(auto,18rem),1fr] min-h-screen max-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 bg-[url('/images/tg-background.jpg')] object-cover"
    style="scrollbar-width: thin; scrollbar-color: #848484 transparent; scrollbar-track-color: #000"
  >
    <CustomContainer
      :variant="'mainContainer'"
      :class="`max-md:hidden sticky top-0 right-0 left-0 h-screen
      border-r-[1px] border-gray-500/20  overflow-y-scroll 
      `"
      style="scrollbar-width: thin; scrollbar-color: #848484 transparent; scrollbar-track-color: #000"
    >
      <CustomContainer
        :variant="'mainContainer'"
        class="flex items-center bg-mainT2Bg dark:bg-darkMainT2Bg h-14 gap-2 pl-2"
      >
        <CustomButton
          name="material-symbols:menu-rounded"
          icon
          :variant="'text'"
          :is-primary-color="'theme'"
          class="w-12 h-12 my-auto p-1"
        />
        <div class="relative mr-2">
          <CustomInput
            class="rounded-full border-none p-1 px-6"
            placeholder="Search "
            @click="changeLeftSideState('search')"
          />
          <CustomButton
            v-if="leftSideState === 'search'"
            name="material-symbols:close-small-outline"
            icon
            :variant="'text'"
            :is-primary-color="'theme'"
            class="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 p-1"
            @click="changeLeftSideState('contacts')"
          ></CustomButton>
        </div>
      </CustomContainer>

      <ContactsNavLinks
        class=""
        v-if="leftSideState === 'contacts'"
      />
    </CustomContainer>
    <div class="justify-center relative text-T2TextColor dark:text-darkT2TextColor">
      <nav class="sticky top-0 right-0 left-0 flex items-center h-16 px-4 py-1 bg-mainBg dark:bg-darkMainBg">
        <BackButton class="w-12 h-12 my-auto" />
        <CustomImg
          :src="contactImg || '/images/placeholder-avatar.jpg'"
          class="rounded-full ml-4 mr-2 w-12 h-12"
        />
        <div class="ml-2 grid">
          <p
            :class="`text-T1TextColor dark:text-darkT1TextColor`"
            class="grid grid-cols-[1fr,auto] pr-4 text-2xl line-clamp-1"
          >
            <span>{{ name || "Name" }}</span>
          </p>
          <p class="text-lg line-clamp-1 -mt-1">
            <span :class="`text-T3TextColor dark:text-darkT3TextColor`"> Last seen {{ lastActive || "at 03:48" }} </span>
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
          />
          <CustomButton
            name="pepicons-pop:dots-y"
            :variant="'text'"
            :is-primary-color="'theme'"
            icon
            size="f"
            class="w-14 p-3 h-14 my-1"
            :rounded="true"
          />
        </div>
      </nav>
      <div class="grid items-center max-h-full p-4">
        rr lorem()
        {{ "lorem ".repeat(2000) }}
        end
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const contactImg = ref("");
const lastActive = ref("");
const name = ref("");
console.log(route.params?.username);
const leftSideState = ref("contacts");
function changeLeftSideState(state: "contacts" | "search") {
  leftSideState.value = state;
}

// definePageMeta({
//   // middleware: "auth",
// });
// definePageMeta({
//   layout: "main",
// });
</script>

<style scoped></style>
