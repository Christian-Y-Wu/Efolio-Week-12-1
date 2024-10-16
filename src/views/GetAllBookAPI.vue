<template>
  <div>
    <pre>{{ books }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: null, // Data property should be 'books'
    };
  },
  mounted() {
    this.getAllBookAPI();
  },
  methods: {
    async getAllBookAPI() {
      try {
        const response = await axios.get('https://fetchallbooks-wqapoj3emq-uc.a.run.app');
        this.books = response.data; // Set 'books' to the API response
      } catch (error) {
        console.error('Error fetching all books', error);
        this.books = null;
      }
    },
  },
};
</script>
