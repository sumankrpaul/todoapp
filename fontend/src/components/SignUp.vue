<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

import * as Yup from 'yup';

import { IAddNewUserValue } from '../interfaces/IUser.interfaces';
import { addNewUser } from '../api/Auth.api';

import CustomButton from './UIElements/CustomButton.vue';
import TextInput from './UIElements/TextInput.vue';

const toast = useToast();
const router = useRouter();

const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid Email Address").required("Email is a required field"),
    name: Yup.string().required("Name is a required field"),
    password: Yup.string().required("Password is a required filed").min(5, "Provide a password of minimun 5 characters")
});

const { handleSubmit, errors, isSubmitting, defineField } = useForm<IAddNewUserValue>({
    validationSchema: validationSchema
});


const [email, emailAttr] = defineField('email');
const [name, nameAttr] = defineField('name');
const [password, passwordAttr] = defineField('password');

const handleFormSubmit = handleSubmit(async (value) => {
    try {
        const resp = await addNewUser(value);
        if (resp) {
            toast.error(resp.message);
            router.push("/todos/list");
        }
    } catch (e) {
        let msg = "Something went wrong";
        if (e.error) {
            msg = e.error
        }
        toast.error(msg);
    }
})

</script>

<template>
    <form class="flex flex-col gap-y-2.5" @submit="handleFormSubmit">
        <TextInput id="signup-form-name" label="Name *" type="text" placeholder="Enter your name" v-model="name"
            v-bind="nameAttr" :error="errors.name" />
        <TextInput id="signup-form-email" label="Email *" type="text" placeholder="Enter your email" v-model="email"
            v-bind="emailAttr" :error="errors.email" />
        <TextInput id="signup-form-password" label="Password *" type="password" placeholder="Enter your password"
            v-model="password" v-bind="passwordAttr" :error="errors.password" />
        <CustomButton :isDisabled="isSubmitting">Sign Up</CustomButton>
    </form>
</template>