import React from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../scripts/api';
import { authContext } from './AuthContext';
import login from '../scss/Login.module.scss';
import header from '../scss/HeaderMenu.module.scss';
import {
    CreateUserResult,
    SigninUserCommand,
} from '../scripts/interfaces/interfaces';

export const Login: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<SigninUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const { setToken } = React.useContext(authContext);
    const timeout = 5000;
    React.useEffect(() => {}, [result]);

    const onSubmit = async (data: SigninUserCommand) => {
        console.log('logging in');
        API.signinUser(data).then((res) => {
            if (res.token) {
                setToken!(res.token);
            }
            setResult(res);
            setTimeout(() => {
                setResult(undefined);
            }, timeout + 100);
        });
    };
    return (
        <>
            <div className={login['Login-main']}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={login['Login-form']}
                >
                    <div className="Form-group">
                        <div className={login['Form-label']}>Email</div>
                        <input
                            className="Form-input"
                            {...register('username')}
                        ></input>
                    </div>
                    <div className="Form-group">
                        <div className={login['Form-label']}>Password</div>
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
};
