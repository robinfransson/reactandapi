import React from 'react';
import { useForm } from 'react-hook-form';
import { API, CreateUserResult, SigninUserCommand } from '../scripts/api';
import { message } from '../views/Register';
import { authContext } from './AuthContext';
import login from '../scss/Login.module.scss';

export const Login: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<SigninUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const { authorized, setToken } = React.useContext(authContext);
    const timeout = 5000;
    React.useEffect(() => {}, [result]);

    const onSubmit = async (data: SigninUserCommand) => {
        API.signinUser(data).then((res) => {
            setResult(res);
            setToken!(res.token ?? undefined);
            setTimeout(() => {
                setResult(undefined);
            }, timeout + 100);
        });
    };
    if (!authorized) {
        return (
            <>
                <div className="Login-main">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="Login-form"
                    >
                        <div className="Form-group">
                            <div className="Form-label">Email</div>
                            <input
                                className="Form-input"
                                {...register('username')}
                            ></input>
                        </div>
                        <div className="Form-group">
                            <div className="Form-label">Password</div>
                            <input
                                className="Form-input"
                                type="password"
                                {...register('password')}
                            ></input>
                        </div>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};
