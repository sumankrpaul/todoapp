<script setup lang="tsx">
defineProps<{name: string}>()
</script>

<template>
    <nav class="flex p-5 bg-slate-800 text-slate-100 justify-between">
        <h1 class=" text-2xl font-semibold" >
            {{ name }}
        </h1>
        <h1> User </h1>
    </nav>
</template>