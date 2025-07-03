<template>
  <CustomButton
    variant="text"
    is-primary-color="theme"
    :new-colors="true"
    icon
    name="material-symbols-light:keyboard-backspace"
    aria-label="back button"
    size="f"
    :rounded="true"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
const router = useRouter();

const props = defineProps({
  onClick: { type: Function, default: null },
});

function handleClick() {
  if (props.onClick) {
    props.onClick();
  } else {
    router.back();
  }
}
</script>
