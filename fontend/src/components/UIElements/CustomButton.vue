
<script setup lang="ts">
    defineProps<{ isDisabled: boolean }>()
</script>

<template>
    <button class="flex justify-center items-center px-5 py-3 cursor-pointer text-gray-100 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 transition-all" type="submit" :disabled="isDisabled"> 
        <div className='w-5 h-5 border animate-spin border-white border-t-[transparent] rounded-full mr-2' v-if="isDisabled"></div>
        <slot/> 
    </button>
</template>