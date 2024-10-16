<template>
  <div class="about text-center container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1>About Our Library</h1>
        <p>
          Welcome to our digital library! We're dedicated to providing a vast collection of books
          and resources to our community.
        </p>
      </div>
    </div>
    <button type="button" class="btn btn-secondary" @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { setUserAccess } from '../router/index'
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  setUserAccess(false)
  router.push({ name: 'Login' })
}
</script>
