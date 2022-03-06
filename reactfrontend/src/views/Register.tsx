import { messageTypes } from 'jest-editor-support';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { authContext } from '../components/AuthContext';
import { API, CreateUserCommand, CreateUserResult } from '../scripts/api';
import styles from '../scss/Register.module.scss';

export const Register: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<CreateUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const timeout = 5000;
    React.useEffect(() => {
        if (result) {
            const m: mess = {
                message: result!.message,
                status: result!.status,
                delay: timeout,
            };
            console.log('authorized, message?');
            message(m);
        }
    }, [result]);
    const { authorized } = React.useContext(authContext);

    const onSubmit = async (data: CreateUserCommand) => {
        API.createUser(data).then((res) => {
            setResult(res);
            setTimeout(() => {
                setResult(undefined);
            }, timeout);
        });
    };

    return (
        <>
            {authorized ? <>Authed</> : <>Not authed</>}
            <div className={styles['Register-main']}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="Register-form"
                >
                    <label>
                        Email
                        <input {...register('email')}></input>
                    </label>
                    <label>
                        Username
                        <input {...register('username')}></input>
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            {...register('password')}
                        ></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};
interface mess {
    message: string;
    status: number;
    delay: number;
}
export function message(info: mess) {
    const messageContainer = document.querySelector('[id=message-container]')!;
    const messages = info.message.split('\n');
    const message = document.createElement('div');
    message.classList.add(
        'Message',
        info.status === 0 ? 'Message--success' : 'Message--error'
    );
    messages.forEach((x) => {
        const child = document.createElement('div');
        child.classList.add('Message-text');
        child.innerHTML = x;
        message.appendChild(child);
    });

    messageContainer.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, info.delay);
}
