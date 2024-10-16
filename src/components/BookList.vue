<template>
      <div>
        <h1>Books with ISBN > 1000</h1>
        <ul>
          <li v-for="book in books" :key="book.id">
            {{ book.name }} - ISBN: {{ book.isbn }}
          </li>
        </ul>
      </div>
    </template>
    
    <script>
    import { ref } from 'vue'
    import db from '../firebase/init.js'
    import { collection, query, where, getDocs } from 'firebase/firestore'
    
    export default {
      setup() {
        const books = ref([])
    
        // Fetch books with ISBN > 1000 (Read-only, no edit or delete buttons)
        const fetchBooks = async () => {
          try {
            const q = query(collection(db, 'books'), where('isbn', '>', 1000))
            const querySnapshot = await getDocs(q)
            const booksArray = []
            querySnapshot.forEach((doc) => {
              booksArray.push({ id: doc.id, ...doc.data() })
            })
            books.value = booksArray
          } catch (error) {
            console.error('Error fetching books:', error)
          }
        }
    
        return {
          books,
          fetchBooks
        }
      },
      mounted() {
        this.fetchBooks()
      }
    }
    </script>
    