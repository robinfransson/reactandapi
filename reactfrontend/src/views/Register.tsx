import * as React from "react";
import { useForm } from "react-hook-form";
import { API, CreateUserCommand, CreateUserResult } from "../scripts/api";
import "../scss/Register.scss";
export const Register: React.FC<{}> = () => {
  const { register, handleSubmit } = useForm<CreateUserCommand>();
  const [result, setResult] = React.useState<CreateUserResult>();

  React.useEffect(() => {}, [result]);

  const onSubmit = async (data: CreateUserCommand) => {
    API.createUser(data).then((res) => {
      setResult(res);
    });
  };
  return (
    <div className="Register-main">
      {result && (
        <Message message={result.message} status={result.status} delay={5000} />
      )}
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
interface mess {
  message: string;
  status: number;
  delay: number;
}
function Message(info: mess) {
  const [visible, setVisible] = React.useState<boolean>(true);
  console.table(info);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, info.delay);
  }, [visible]);

  return visible ? (
    <div
      className={[
        "Message",
        info.status == 0 ? "Message-success" : "Message-error",
      ].join(" ")}
    >
      {info.message}
    </div>
  ) : (
    <></>
  );
}
