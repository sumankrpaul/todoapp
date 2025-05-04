<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as Yup from 'yup';

import type { IUserLogin } from '../interfaces/IUser.interfaces';
import CustomButton from './UIElements/CustomButton.vue';
import TextInput from './UIElements/TextInput.vue';


const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid Email Address").required("Email is a required field"),
    password: Yup.string().required("Password is a required filed").min(5, "Provide a password of minimun 5 characters")
})

const {handleSubmit , errors, isSubmitting, defineField } = useForm<IUserLogin>({
    validationSchema: validationSchema
});

const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');



const handleFormSubmit = handleSubmit(async (value) => {
    await new Promise<void>(resolve=> setTimeout(()=>  resolve(), 2000))
    console.log(value);
})


</script>


<template>
    <form class="flex flex-col gap-y-2.5"  @submit="handleFormSubmit">
        <TextInput id="login-form-email" label="Email" type="text" placeholder="Enter your email" v-model="email" v-bind="emailAttr" :error="errors.email " />
        <TextInput id="login-form-password" label="Password" type="password" placeholder="Enter your email" v-model="password" v-bind="passwordAttr" :error="errors.password " />
        <CustomButton :isDisabled="isSubmitting">Submit</CustomButton>
    </form>
</template>