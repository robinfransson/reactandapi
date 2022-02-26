import * as React from "react";
import { useForm } from "react-hook-form";
import { API, CreateUserCommand, CreateUserResult } from "../scripts/api";
export const Register: React.FC<{}> = () => {
  const { register, handleSubmit } = useForm<CreateUserCommand>();
  const [result, setResult] = React.useState<CreateUserResult>();
  const onSubmit = async (data: CreateUserCommand) => {
    API.createUser(data).then((res) => setResult(res));
  };
  return (
    <div className="Register-main">
      <>{result && <div>{result}</div>}</>
      <form onSubmit={handleSubmit(onSubmit)} className="Register-form">
        <label>
          Email
          <input {...register("email")}></input>
        </label>
        <label>
          Username
          <input {...register("username")}></input>
        </label>
        <label>
          Password
          <input {...register("password")}></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
