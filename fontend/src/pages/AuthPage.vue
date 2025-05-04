<script setup lang="ts">
import Layout from '../components/Layout.vue';

const routeLinks = [
    { to: "/auth/login", value: "Login" },
    { to: "/auth/signup", value: "Sign Up" }
]

</script>

<template>
    <Layout title="Auth">
        <div class="flex h-full justify-center items-center">
            <div class="p-5 bg-slate-300 shadow flex flex-col gap-x-1 min-w-[500px]">
                <div class="flex border-b border-b-slate-500 pb-5">
                    <router-link v-for="route in routeLinks" :to="route.to" class="opacity-50 grow cursor-pointer hover:opacity-100 text-center" active-class="opacity-100 underline  underline-offset-4">
                        {{ route.value  }}
                    </router-link>
                </div>
                <div>
                    <router-view></router-view>
                </div>
            </div>


        </div>
    </Layout>
</template>