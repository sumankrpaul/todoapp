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
        name: "Todos",
        beforeEnter: authGurd,
        children: [
            {
                path: 'list',
                component: TodoList
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
        path: '/auth', component: AuthPage,
        name: 'Auth',
        beforeEnter() {
            const { isAuthenticated } = useAuthStore();
            console.log("From Auth", { isAuthenticated })
            if (isAuthenticated) {
                return { name: 'Todos' }
            }
            return true;
        },
        children: [
            {
                path: 'login',
                component: Login
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


function authGurd() {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return { name: 'Auth' }
    }
    return;
}

export default router;