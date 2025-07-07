<template>
  <!-- <div class="darkBlue"></div> -->
  <div class="wrapper">
    <ul class="list">
      <li class="msg">Hello!</li>
      <li class="msg">Hello!</li>
      <li class="msg">Hello!</li>
      <li class="msg">Hello!</li>
      <li class="msg">Hello!</li>
      <li class="msg">Hello!</li>
      <li class="msg">Hello!</li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
  /* background: url(/images/profileImage.png);
  background-size: cover; */

  position: relative;
  inset: 0;
  z-index: 0;

  width: 400px;
  height: 200px;
  margin: 0 auto;
}

.list {
  background: url(/images/profileImage.png);
  background-size: cover;

  height: 100%;
  overflow: auto;
  display: grid;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.msg {
  width: 50%;
  margin-left: auto;
  background: rgb(0, 0, 0);
  color: rgb(248, 248, 248);
  padding: 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%);
  background-attachment: fixed;
}
</style>
