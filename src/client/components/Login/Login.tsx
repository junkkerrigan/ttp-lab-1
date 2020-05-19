import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface LoginFields {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}

export const Login: FC = () => {
    const { register, control, handleSubmit, errors } = useForm<LoginFields>();
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(console.log)}>
            <Controller as={<Input type='text' />} control={control} name='name' rules={{ required: true }} defaultValue='' />
            <Controller as={<Input type='text' />} control={control} name='surname' rules={{ required: true }} defaultValue='' />
            <Controller as={<Input type='email' />} control={control} name='email' rules={{ required: true }} defaultValue='' />
            <Controller as={<Input type='text' />} control={control} name='username' rules={{ required: true }} defaultValue='' />
            <Controller as={<Input type='password' />} control={control} name='password' rules={{ required: true }} defaultValue='' />

            <button type='submit'>Submit</button>
        </form>
    );
}