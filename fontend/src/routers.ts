import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import TodoList from "./components/TodoList.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Todo from "./components/Todo.vue";
import Profile from "./components/Profile.vue";
import TodoPage from "./pages/TodoPage.vue";
import AuthPage from "./pages/AuthPage.vue";
import UserPage from "./pages/UserPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/todos', component: TodoPage,
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router;