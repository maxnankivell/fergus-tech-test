<template>
  <div class="input-container">
    <ph-magnifying-glass
      class="search-icon"
      :size="24"
      @click="emit('search')"
    />
    <input
      v-model="modelValue"
      class="input"
      type="text"
      placeholder="Search for jobs"
      @keyup.enter="emit('search')"
    />
    <ph-x class="x-icon" :size="24" @click="emit('clear-search')" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, computed } from "vue";
import { PhX, PhMagnifyingGlass } from "phosphor-vue";

interface Props {
  modelValue: string;
}

const emit = defineEmits<{
  (emit: "update:modelValue", newValue: string): void;
  (emit: "search"): void;
  (emit: "clear-search"): void;
}>();

const props = defineProps<Props>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss">
.input-container {
  display: grid;
}

.input {
  display: block;
  grid-area: 1/1/2/2;
  padding: 12px 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.search-icon {
  grid-area: 1/1/2/2;
  margin: auto auto auto 8px;
  cursor: pointer;
  z-index: 5;
}

.x-icon {
  grid-area: 1/1/2/2;
  margin: auto 8px auto auto;
  cursor: pointer;
  z-index: 5;
}
</style>
