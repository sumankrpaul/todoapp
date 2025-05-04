<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import type { IUserLogin } from '../interfaces/IUser.interfaces';
import CustomButton from './UIElements/CustomButton.vue';
import TextInput from './UIElements/TextInput.vue';
import { LogingUser } from '../api/Auth.api';
import { useRouter } from 'vue-router';


const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid Email Address").required("Email is a required field"),
    password: Yup.string().required("Password is a required filed").min(5, "Provide a password of minimun 5 characters")
})

const {handleSubmit , errors, isSubmitting, defineField } = useForm<IUserLogin>({
    validationSchema: validationSchema
});

const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');
const router = useRouter();

const handleFormSubmit = handleSubmit(async (value) => {
    try {
        await LogingUser(value);
        router.push("/todos");
    } catch (e) {
        console.log(e);
    }
    
})


</script>


<template>
    <form class="flex flex-col gap-y-2.5"  @submit="handleFormSubmit">
        <TextInput id="login-form-email" label="Email" type="text" placeholder="Enter your email" v-model="email" v-bind="emailAttr" :error="errors.email " />
        <TextInput id="login-form-password" label="Password" type="password" placeholder="Enter your password" v-model="password" v-bind="passwordAttr" :error="errors.password " />
        <CustomButton :isDisabled="isSubmitting">Submit</CustomButton>
    </form>
</template>