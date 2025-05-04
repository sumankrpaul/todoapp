<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';
import Navigation from './Navigation.vue';

const { isAuthenticated } = useAuthStore();

defineProps<{ title: string }>()

</script>

<template>
    <div class="h-screen flex flex-col bg-slate-100">
         <Navigation :name="title" v-if="isAuthenticated"  />
         <div :class="(isAuthenticated)? 'nav-height' : 'h-full'" >
             <slot/>
         </div>
    </div>
</template>

<style scoped>
    .nav-height{
        height: calc(100% - 80px);
    }
</style>