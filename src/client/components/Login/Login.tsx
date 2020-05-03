import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFields {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}

export const Login: FC = () => {
    const { register, handleSubmit, errors } = useForm<LoginFields>();
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(console.log)}>
            <input
                ref={register({
                    required: true
                })}
                name='name'
                type='text'
            />
            <input ref={register} name='surname' type='text' />
            <input ref={register} name='email' type='email' />
            <input ref={register} name='username' type='text' />
            <input ref={register} name='password' type='password' />

            <button type='submit'>Submit</button>
        </form>
    );
}