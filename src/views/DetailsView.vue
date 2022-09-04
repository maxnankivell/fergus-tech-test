<template>
  <!-- <router-link to="/">Go to Home</router-link> -->
  <div class="details-view-container">
    <h2 class="name">{{ job?.name }}</h2>
    <div class="flex">
      Status:
      <v-select
        v-if="job"
        v-model="job.status"
        class="v-select"
        :searchable="false"
        :clearable="false"
        :options="['scheduled', 'active', 'invoicing', 'to price', 'complete']"
      ></v-select>
    </div>
    <div class="email">Email: {{ job?.contactDetails.email }}</div>
    <div class="phone-number">
      Phone Number: {{ job?.contactDetails.phoneNumber }}
    </div>
    <div class="date-created">Date Created: {{ job?.dateCreated }}</div>
    <div class="notes">
      <h3 class="notes-title">Notes</h3>
      <div v-for="(note, index) in job?.notes" :key="index" class="flex">
        {{ note }}
        <div
          v-if="removingNote"
          class="button remove-button"
          :style="{ fontSize: '1.2rem', padding: '0.4rem' }"
          @click="onRemove(index)"
        >
          Remove
        </div>
      </div>
    </div>
    <input
      v-if="addingNote"
      v-model="newNote"
      class="input"
      type="text"
      placeholder="Type New Note Here"
      @keyup.enter="onDone"
    />
    <div v-if="!removingNote && !addingNote" class="flex">
      <div class="button" @click="addingNote = !addingNote">Add Note</div>
      <div class="button remove-button" @click="removingNote = !removingNote">
        Remove Note
      </div>
    </div>
    <div v-else class="button" @click="onDone">Done</div>
    <router-link to="/"><div class="button">Back Home</div></router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { useFakeDatabaseStore } from "@/fake-database-store";
import { storeToRefs } from "pinia";
import { Job } from "@/types";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const { jobArray } = storeToRefs(useFakeDatabaseStore());

interface Props {
  id: string;
}

const props = defineProps<Props>();

const removingNote = ref(false);
const addingNote = ref(false);
const newNote = ref("");

const job = computed(() =>
  jobArray.value.find((job: Job) => job.id == Number(props.id))
);

const statusColor = computed(() => {
  if (job.value?.status == "scheduled") {
    return "#29b6f6";
  } else if (job.value?.status == "active") {
    return "#ab47bc";
  } else if (job.value?.status == "invoicing") {
    return "#7e57c2";
  } else if (job.value?.status == "to price") {
    return "#ef5350e";
  } else if (job.value?.status == "complete") {
    return "#4caf50";
  } else {
    return "white";
  }
});

const onRemove = (index: number) => job?.value?.notes.splice(index, 1);
const onDone = () => {
  if (addingNote.value) {
    job?.value?.notes.push(newNote.value);
    newNote.value = "";
  }
  removingNote.value = false;
  addingNote.value = false;
};
</script>

<style scoped lang="scss">
.details-view-container {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
}

.flex {
  display: flex;
  gap: 0.8rem;
}

.v-select {
  width: 180px;
  margin: auto 0;
  font-size: 1.6rem;
}

.name {
  text-align: center;
  font-size: 4.2rem;
}

.notes-title {
  font-size: 3.2rem;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

.input {
  display: block;
  padding: 12px 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.button {
  padding: 1.2rem 2rem;
  background-color: #4fc3f7;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #81d4fa;
  }
}

.remove-button {
  background-color: #ef5350;

  &:hover {
    background-color: #e57373;
  }
}
</style>
