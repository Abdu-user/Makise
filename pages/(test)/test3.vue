<template>
  <div class="messages-container">
    <ol class="messages">
      <div v-for="(msg, idx) in messages">
        <li
          :key="idx"
          :class="{ mine: msg.mine }"
        >
          <div
            class="empty1"
            v-if="msg.mine"
          ></div>
          <span>
            {{ msg.text }}
          </span>
          <div
            class="empty1"
            v-if="!msg.mine"
          ></div>
        </li>
        <div class="gap"></div>
      </div>
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
  { text: "Sure, it’s yours.", mine: true },
  { text: "Wait right here.", mine: false },
  { text: "I’ll try it on right now.", mine: false },
];
</script>
<style scoped>
.messages-container {
  overflow: hidden;
  position: relative;
  width: 400px;
  height: 200px;
  margin: 0 auto;
}
.messages {
  display: grid;
  /* background: linear-gradient(180deg, red, yellow, blue); */
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

/* Example: style the scrollbar for visibility */
/* Scrollbars do not support z-index directly. 
  They are rendered above the content but below overlays/pseudo-elements with higher stacking context.
  You can style their appearance, but not their stacking order. */
.messages::-webkit-scrollbar {
  width: 8px;
  background: rgba(0, 0, 0, 0.1);
}
.messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
ol > div {
  z-index: 2;
  position: relative;
}
li {
  display: grid;
  grid-template-columns: minmax(auto, 40%) 1fr;
  width: 100%;
}
li .empty1,
.gap {
  background: #000;
}
li span {
  background-color: purple;
}
li.mine span {
  background-color: transparent;
  padding: 4px 8px;
  border-radius: 8px;
  position: relative;
}
li.mine span::after {
  content: "";
  position: absolute;
  top: -4px;
  bottom: -4px;
  left: -2px;
  /* width: 10%;
  height: 100%; */
  right: -2px;
  border: 5px solid #000;
  border-radius: 5px;
}
li.mine {
  margin-right: 0;
  background-color: transparent;
  z-index: 2;
  grid-template-columns: 1fr auto;
}

.gap {
  height: 10px;
  width: 100%;
}
</style>
