<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';

const { logout } = useAuthStore()

</script>

<template>
    <button @click="logout"> Log Out </button>
</template>