<template>
  <div
    ref="messagesContainerRef"
    class="grid md:grid-cols-[minmax(auto,18rem),1fr] min-h-screen max-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 bg-[url('/images/tg-background.jpg')] object-cover"
    style="scrollbar-width: thin; scrollbar-color: gray transparent; scrollbar-track-color: #000"
  >
    <ContactsNavLinksForPC />
    <div class="relative flex flex-col justify-center items-center">
      <CustomHeads
        :variant="'h1'"
        :heads="'h1'"
        class="text-center text-6xl font-semibold backdrop-blur-lg"
      >
        Contact is not
        <span class="text-primary text-7xl">found!</span>
      </CustomHeads>
      <NuxtLink
        class="text-primary underline"
        to="/contacts"
        >Back to Contacts</NuxtLink
      >
    </div>
  </div>
</template>
