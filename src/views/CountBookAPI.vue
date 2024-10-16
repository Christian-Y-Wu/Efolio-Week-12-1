<template>
  <div>
    <pre>{{ count }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: null, // Keeping 'count' as the data property
    };
  },
  mounted() {
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-wqapoj3emq-uc.a.run.app');
        this.count = response.data; // Setting 'count' to the API response
      } catch (error) {
        console.error('Error fetching book count', error);
        this.count = null;
      }
    },
  },
};
</script>
