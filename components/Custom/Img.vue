<template>
  <img :src="srcCache" />
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from "~/store/globalSetting";

const state = useGlobalSettingStore();
const props = defineProps({
  src: { type: String, required: true },
  defaultImgSrc: { type: String, default: "" },
  disabledImageSrc: { type: String, default: "" },
  watch: { type: Array, default: [] },
});
const srcCache = ref(props.defaultImgSrc);

const getImgUrl = () => {
  if (state.disabledExpensiveUrlFetch) return (srcCache.value = props.disabledImageSrc);

  if (props.src) {
    fetchWithCache(props.src).then((res) => {
      return (srcCache.value = res);
    });
  }
};
watch(() => props.src, getImgUrl);
if (props.watch.length !== 0) watch(() => props.watch, getImgUrl);

onMounted(getImgUrl);
</script>

<style scoped></style>
