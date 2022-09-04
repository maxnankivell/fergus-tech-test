<template>
  <div class="main-view-container">
    <h1 class="title">Job List</h1>
    <div class="search-and-filters">
      <SearchBar
        v-model="searchValue"
        class="search-bar"
        @search="onSearch"
        @clear-search="onClearSearch"
      />
      <div class="label-and-filter">
        <h2 class="v-select-label">Job Status:</h2>
        <v-select
          v-model="jobStatusFilter"
          multiple
          class="v-select"
          :searchable="false"
          :options="[
            'scheduled',
            'active',
            'invoicing',
            'to price',
            'complete',
          ]"
          @option:selected="performSearch"
          @option:deselected="performSearch"
        ></v-select>
      </div>
      <div class="label-and-filter">
        <h2 class="v-select-label">Name:</h2>
        <v-select
          v-model="nameFilter"
          class="v-select"
          :searchable="false"
          :options="['ascending', 'descending']"
          @option:selected="performSearch"
          @option:deselected="performSearch"
        ></v-select>
      </div>
    </div>
    <div class="job-list">
      <div v-for="job in filteredJobArray" :key="job.id">
        <router-link :to="'/details/' + job.id">
          <JobTile :job-details="job" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import JobTile from "@/components/JobTile.vue";
import { useFakeDatabaseStore } from "@/fake-database-store";
import { storeToRefs } from "pinia";
import { Job } from "@/types";

const { jobArray } = storeToRefs(useFakeDatabaseStore());
const filteredJobArray = ref([...jobArray.value]);

const searchValue = ref("");
const jobStatusFilter = ref<string[]>([]);
const nameFilter = ref("");

function onSearch() {
  performSearch();
}

function onClearSearch() {
  searchValue.value = "";
  performSearch();
}

function performSearch() {
  filteredJobArray.value = jobArray.value.filter(
    (job: Job) =>
      job.id
        .toString()
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      job.status.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      job.dateCreated.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      job.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      job.contactDetails.email
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      job.contactDetails.phoneNumber
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      job.notes.find((note: string) =>
        note.toLowerCase().includes(searchValue.value.toLowerCase())
      )
  );

  if (searchValue.value === "") {
    filteredJobArray.value = jobArray.value;
  }

  if (jobStatusFilter.value.length > 0) {
    filteredJobArray.value = filteredJobArray.value.filter((job: Job) =>
      jobStatusFilter.value.includes(job.status)
    );
  }

  if (nameFilter.value) {
    nameFilter.value == "ascending"
      ? filteredJobArray.value.sort((a, b) => (a.name > b.name ? 1 : -1))
      : filteredJobArray.value.sort((a, b) => (a.name > b.name ? -1 : 1));
  }
}
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 4.2rem;
  margin: 1.6rem 0;
}

.search-and-filters {
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}

.search-bar {
  width: 280px;
}

.label-and-filter {
  display: flex;
  gap: 0.8rem;
}

.v-select-label {
  margin: auto 0;
}

.v-select {
  width: 180px;
  margin: auto 0;
  font-size: 1.6rem;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin: 3.2rem 0;
}
</style>
