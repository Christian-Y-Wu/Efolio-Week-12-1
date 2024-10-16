/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({
  origin: true,
});

admin.initializeApp();

// countBooks Function - Already existing in your code
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// New addBook Function with updated format
exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send(
          "Only POST requests are accepted"
        );
      }

      const { isbn, name } = req.body;

      if (!isbn || !name || isNaN(Number(isbn))) {
        return res.status(400).send(
          "Invalid request data. ISBN must be a valid number and name " +
          "must be provided."
        );
      }

      const booksCollection = admin.firestore().collection("books");
      await booksCollection.add({ isbn: Number(isbn), name });

      res.status(200).send("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});

// Function to fetch all books
exports.fetchAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      if (snapshot.empty) {
        return res.status(404).send("No books found.");
      }

      const books = [];
      snapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).send({ books });
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});


// Uncomment this block if you want to use the helloWorld function:
// exports.helloWorld = onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
