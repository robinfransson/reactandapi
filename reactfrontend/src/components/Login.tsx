import React from 'react';
import { useForm } from 'react-hook-form';
import { API, CreateUserResult, SigninUserCommand } from '../scripts/api';
import { authContext } from './AuthContext';
import login from '../scss/Login.module.scss';

export const Login: React.FC<{}> = () => {
    const { register, handleSubmit } = useForm<SigninUserCommand>();
    const [result, setResult] = React.useState<CreateUserResult>();
    const { setToken } = React.useContext(authContext);
    const [visible, setVisible] = React.useState(false);
    let element: HTMLDivElement | null = null;
    const timeout = 5000;
    React.useEffect(() => {}, [result]);

    const onSubmit = async (data: SigninUserCommand) => {
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
            <div
                ref={(ref) => (element = ref)}
                className={'HeaderMenu-profile'}
                onClick={(e) => {
                    if (element === e.target) setVisible((x) => !x);
                }}
            >
                Profile
            </div>
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
