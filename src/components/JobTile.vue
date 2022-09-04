<template>
  <div class="job-tile-container">
    <h3 class="name">{{ jobDetails.name }}</h3>
    <div class="status">
      <span class="status-span" :style="{ 'background-color': statusColor }">{{
        jobDetails.status
      }}</span>
    </div>
    <div class="email">Email: {{ jobDetails.contactDetails.email }}</div>
    <div class="phone-number">
      Phone Number: {{ jobDetails.contactDetails.phoneNumber }}
    </div>
    <div class="date-created">{{ jobDetails.dateCreated }}</div>
  </div>
</template>

<script setup lang="ts">
import { Job } from "@/types";
import { defineProps, computed } from "vue";

interface Props {
  jobDetails: Job;
}
const props = defineProps<Props>();

const statusColor = computed(() => {
  if (props.jobDetails.status == "scheduled") {
    return "#29b6f6";
  } else if (props.jobDetails.status == "active") {
    return "#ab47bc";
  } else if (props.jobDetails.status == "invoicing") {
    return "#7e57c2";
  } else if (props.jobDetails.status == "to price") {
    return "#ef5350e";
  } else if (props.jobDetails.status == "complete") {
    return "#4caf50";
  } else {
    return "white";
  }
});
</script>

<style scoped lang="scss">
.job-tile-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 0.4rem;
  column-gap: 0.8rem;
  max-width: 75%;
  margin: 0 auto;
  padding: 1.6rem;
  border-radius: 1.6rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  background-color: #fafafa;
}

.name {
  grid-area: 1/1/2/3;
  font-size: 3.2rem;
}

.status {
  grid-area: 1/3/2/4;
  font-size: 1.6rem;
}

.status-span {
  padding: 0.8rem;
  border-radius: 0.8rem;
}

.email {
  grid-area: 2/1/3/2;
  font-size: 1.6rem;
}

.phone-number {
  grid-area: 2/2/3/3;
  font-size: 1.6rem;
}

.date-created {
  grid-area: 3/3/4/4;
  font-size: 1.6rem;
}
</style>
