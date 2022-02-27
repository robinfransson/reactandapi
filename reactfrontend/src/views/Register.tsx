import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
    API,
    CreateUserCommand,
    CreateUserResult,
    SigninUserCommand,
} from '../scripts/api';
import { useAuth } from '../scripts/auth';
import '../scss/Register.scss';
export const Register: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<CreateUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const timeout = 5000;
    React.useEffect(() => {}, [result]);
    const { authed } = useAuth();

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
            {authed ? <>Authed</> : <>Not authed</>}
            <div className="Register-main">
                {result && (
                    <Message
                        message={result.message}
                        status={result.status}
                        delay={timeout}
                    />
                )}
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
function Message(info: mess) {
    const [visible, setVisible] = React.useState<boolean>(true);
    const messages = info.message.split('\n');
    React.useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, info.delay);
    });

    return visible ? (
        <div
            className={[
                'Message',
                info.status === 0 ? 'Message--success' : 'Message--error',
            ].join(' ')}
        >
            {messages.map((x) => (
                <div className="Message-text">{x}</div>
            ))}
        </div>
    ) : (
        <></>
    );
}

export const Login: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<SigninUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const timeout = 5000;
    React.useEffect(() => {}, [result]);

    const onSubmit = async (data: SigninUserCommand) => {
        API.signinUser(data).then((res) => {
            setResult(res);
            setTimeout(() => {
                setResult(undefined);
            }, timeout);
        });
    };
    return (
        <div className="Login-main">
            {result && (
                <Message
                    message={result.message}
                    status={result.status}
                    delay={timeout}
                />
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="Login-form">
                <label>
                    Email
                    <input {...register('username')}></input>
                </label>
                <label>
                    Password
                    <input type="password" {...register('password')}></input>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
