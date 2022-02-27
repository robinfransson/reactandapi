import React from 'react';
import { useForm } from 'react-hook-form';
import { API, CreateUserResult, SigninUserCommand } from '../scripts/api';
import { Message } from '../views/Register';
import { authContext } from './AuthContext';
import '../scss/Login.scss';

export const Login: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<SigninUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const { authorized, setToken } = React.useContext(authContext);
    const timeout = 5000;
    React.useEffect(() => {}, [result]);

    const onSubmit = async (data: SigninUserCommand) => {
        API.signinUser(data).then((res) => {
            setResult(res);
            setTimeout(() => {
                setToken!(res.token!);
                setResult(undefined);
            }, timeout + 100);
        });
    };
    if (!authorized) {
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
                        <input
                            type="password"
                            {...register('password')}
                        ></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    } else {
        return <></>;
    }
};
