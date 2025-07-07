<template>
  <div class="messages-container">
    <ol class="messages">
      <li
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="{ mine: msg.mine }"
      >
        {{ msg.text }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
const messages = [
  { text: "Hi, babe!", mine: true },
  { text: "I have something for you.", mine: true },
  { text: "What is it?", mine: false },
  { text: "Just a little something.", mine: true },
  { text: "Johnny, it’s beautiful. Thank you. Can I try it on now?", mine: false },
  { text: "Sure, it’s yours.", mine: true },
  { text: "Wait right here.", mine: false },
  { text: "I’ll try it on right now.", mine: false },
];
</script>

<style scoped>
.messages-container {
  position: relative;
  width: 200px;
  height: 300px;
  border: 1px solid black;
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  background: url(/images/profileImage.png);
}

.messages {
  padding: 8px;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  overflow: auto;
  font: 16px/1.3 sans-serif;
  background: url(/images/profileImage.png);
  background-size: cover;
}

.messages li {
  list-style-type: none;
  margin: 2px 8px 2px 0;
  float: left;
  border-radius: 8px;
  padding: 8px;
  color: black;
  position: relative;
  z-index: 1;
  background: #eee;
}

.messages li.mine {
  margin: 2px 0 2px 8px;
  align-self: flex-end;
  z-index: 0;
  background: cyan;
  color: white;
}

@supports (mix-blend-mode: screen) {
  .messages-container:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%);
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .messages li.mine {
    background: black;
  }
}
</style>
