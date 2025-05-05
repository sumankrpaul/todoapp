import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import TodoList from "./components/TodoList.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Todo from "./components/Todo.vue";
import Profile from "./components/Profile.vue";
import TodoPage from "./pages/TodoPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import UserPage from "./pages/UserPage.vue";
import { useAuthStore } from "./stores/auth.store";

const routes: RouteRecordRaw[] = [
    {
        path: '/todos', component: TodoPage,

        beforeEnter: authGurd,
        children: [
            {
                path: 'list',
                component: TodoList,
                name: "Todos"
            },
            {
                path: ':id',
                component: Todo
            },
            {
                path: '',
                redirect: '/todos/list'
            }
        ]
    },
    {
        path: '/auth',
        component: AuthPage,
        async beforeEnter() {
            const { userProfile, isReady } = useAuthStore();
            await isReady();
            if (userProfile.isLoggedIn) {
                return { name: 'Todos' }
            }
            return true;
        },
        children: [
            {
                path: 'login',
                component: Login,
                name: 'Auth'
            },
            {
                path: 'signup',
                component: SignUp
            },
            {
                path: '',
                redirect: '/auth/login'
            }
        ]
    },
    {
        path: '/user',
        component: UserPage,
        beforeEnter: authGurd,
        children: [
            {
                path: 'profile',
                component: Profile
            },
            {
                path: '',
                redirect: '/user/profile'
            }
        ]
    },
    {
        path: '/',
        redirect: '/todos'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


async function authGurd() {
    const { userProfile, isReady } = useAuthStore();
    await isReady();
    console.log(" Logged In ", userProfile.isLoggedIn);
    if (!userProfile.isLoggedIn) {
        return { name: 'Auth' }
    }
    return;
}

export default router;