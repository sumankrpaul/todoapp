<script setup lang="tsx">
import { useAuthStore } from '../stores/auth.store';

defineProps<{ name: string }>()
const { userProfile } = useAuthStore()
</script>

<template>
    <nav class="flex p-5 bg-slate-800 text-slate-100 justify-between">
        <h1 class=" text-2xl font-semibold" >
            {{ name }}
        </h1>
        <h1> {{  userProfile? userProfile.name: "" }} </h1>
    </nav>
</template>