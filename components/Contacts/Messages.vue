<template>
  <div class="flex flex-col gap-4 p-4">
    <button
      v-for="message in messages"
      :key="message.id"
      class="flex items-start gap-3"
      :class="{
        'justify-end': message.sender === 'user',
        'justify-start': message.sender === 'contact',
      }"
    >
      <div
        class="max-w-xs p-3 rounded-lg text-sm relative z-0"
        :class="` bg-bg-light
        ${isSmallMessage(message.text) ? '' : 'pb-5'}
        `"
      >
        <span class="mr-2">
          {{ message.text }}
        </span>
        <span
          class="text-xs text-text-muted mt-1 whitespace-nowrap"
          :class="isSmallMessage(message.text) ? 'relative -bottom-1' : 'absolute bottom-1 right-2'"
          >{{ new Date(message.timestamp).toLocaleTimeString() }}</span
        >
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const isSmallMessage = (text: string) => {
  return text.length <= 8;
};
const rawMessages = ref([
  {
    id: 1,
    text: "Start",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },

  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    text: "I'm fine, thanks! And you?",
    sender: "contact",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    id: 3,
    text: "Doing well, just working on some projects.",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },
  {
    id: 3,
    text: "END",
    sender: "user",
    timestamp: "2023-10-01T12:02:00Z",
  },
]);
const messages = computed(() => {
  return rawMessages.value.filter((_, id) => id < 3 || true);
});
</script>

<style scoped></style>
