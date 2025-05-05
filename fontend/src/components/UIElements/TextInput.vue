<script setup lang="ts">
const model = defineModel<string>()
const props = defineProps<{ id: string, label: string, type: string, placeholder?:string,error?:string, disabled?: boolean }>()

</script>

<template>
    <div>
        <label :for="id"> {{ label }} </label>
        <input :type="type" :id="id" :disabled="disabled" class="w-full p-3 border border-slate-500 focus:border-slate-800 text-slate-900 placeholder:text-slate-600 disabled:opacity-60" :placeholder="placeholder" v-model="model" v-bind="$attrs"  />
        <div class=" text-red-600 font-semibold" > {{  error }} </div>
    </div>
</template>