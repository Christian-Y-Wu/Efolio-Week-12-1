<template>
  <div>
    <h1>Add or Update Book</h1>
    <form @submit.prevent="addOrUpdateBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div v-if="editing">
        <button type="submit">Update Book</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </div>
      <div v-else>
        <button type="submit">Add Book</button>
      </div>
    </form>
    <button @click="fetchAllBooks">Fetch All Books</button>
    <ul>
      <li v-for="book in allBooks" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="editBook(book)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const isbn = ref("");
const name = ref("");
const editing = ref(false);
const currentBookId = ref(null);
const allBooks = ref([]);

const addOrUpdateBook = async () => {
  if (editing.value) {
    await updateBook();
  } else {
    await addBookUsingFunction();
  }
};

const addBookUsingFunction = async () => {
  try {
    // Replace with your actual Cloud Function URL
    const response = await axios.post("https://addbook-wqapoj3emq-uc.a.run.app", {
      isbn: isbn.value,
      name: name.value,
    });
    
    if (response.status === 200) {
      alert("Book added successfully!");
    } else {
      alert("Failed to add the book.");
    }
    
    // Clear form fields after successful addition
    isbn.value = "";
    name.value = "";
  } catch (error) {
    console.error("Error adding book:", error);
    alert("Error adding book using Cloud Function.");
  }
};

const updateBook = async () => {
  try {
    alert("Update book functionality not implemented yet!");
  } catch (error) {
    console.error("Error updating book: ", error);
  }
};

// Fetch all books (dummy function for now)
const fetchAllBooks = async () => {
  try {
    alert("Fetch all books functionality not implemented yet!");
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// Edit book
const editBook = (book) => {
  isbn.value = book.isbn;
  name.value = book.name;
  editing.value = true;
  currentBookId.value = book.id;
};

// Cancel edit
const cancelEdit = () => {
  isbn.value = "";
  name.value = "";
  editing.value = false;
  currentBookId.value = null;
};
</script>

<style scoped>
/* Add custom styles here */
</style>
