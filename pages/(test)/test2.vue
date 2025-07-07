<template>
  <ol class="messages">
    <li class="mine"><span>Hi, babe!</span></li>
    <li class="mine"><span>I have something for you.</span></li>
    <li><span>What is it?</span></li>
    <li class="mine"><span>Just a little something.</span></li>
    <li><span>Johnny, it’s beautiful. Thank you. Can I try it on now?</span></li>
    <li class="mine"><span>Sure, it’s yours.</span></li>
    <li><span>Wait right here.</span></li>
    <li><span>I’ll try it on right now.</span></li>
  </ol>
</template>

<style scoped>
.messages {
  width: 200px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  font: 16px/1.3 sans-serif;
  overflow: auto;
  padding: 0;
  background: linear-gradient(rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%);
}

.messages:after {
  content: "";
  background: white;
  flex: 1;
  pointer-events: none;
}

.messages li {
  list-style-type: none;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  border-style: solid;
  border-color: white;
  border-width: 2px 16px 2px 8px;
  flex: 0 0 auto;
}

.messages li.mine {
  flex-direction: row;
  border-right-width: 8px;
  border-left-width: 16px;
}

.messages li:first-child {
  border-top-width: 10px;
}

.messages li:last-child {
  border-bottom-width: 10px;
}

.messages li:before {
  content: "";
  flex: 1;
  background: white;
  pointer-events: none;
}

.messages li span {
  background: #eee;
  padding: 8px;
  position: relative;
}

.messages li span:before {
  content: "";
  position: absolute;
  left: -8px;
  top: -8px;
  bottom: -8px;
  right: -8px;
  border: 8px solid white;
  border-radius: 16px;
  pointer-events: none;
}

.messages li.mine span {
  background: none;
  color: white;
}
</style>
