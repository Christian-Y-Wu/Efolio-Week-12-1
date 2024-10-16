<template>
  <div>
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-else>Error</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const count = ref(null);

const getBookCount = async () => {
  try {
    const response = await axios.get('https://countbooks-wqapoj3emq-uc.a.run.app');
    count.value = response.data.count;
  } catch (error) {
    count.value = null;
    console.error('Error fetching book count', error);
  }
};
</script>

<style scoped>

</style>
