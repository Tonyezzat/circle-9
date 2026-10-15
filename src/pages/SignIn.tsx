import { Alert, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignInSchema } from "../Schemas/SignInSchema";
import { authServices } from "../services/authServices";
import type { LoginData } from "../types/LoginData";
import { authContext } from "../contexts/authContext";

export default function SignIn() {
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const{setisLoggedIn}=useContext(authContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  async function signIn(values: LoginData) {
    setErrorMsg("");
    setSuccessMsg("");
    setisLoading(true);    
    try {
      const data = await authServices.signIn(values);
      setisLoggedIn(true);
      localStorage.setItem("token",data.data.token)
      setSuccessMsg(data.message);
      setisLoading(false);
      // navigate("/");
      
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
      setisLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Sign in</h1>
        </div>

        <Input
          {...register("email")}
          variant="bordered"
          type="email"
          label="Email"
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message as string}
        />
        <Input
          {...register("password")}
          variant="bordered"
          type="password"
          label="Password"
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message as string}
        />

        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign In
        </Button>
        <p>
          you dont hava an account register now{" "}
          <Link to={"/signup"}>Register now</Link>
        </p>
        {ErrorMsg && (
          <Alert
            hideIcon
            color="danger"
            title={ErrorMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
        {SuccessMsg && (
          <Alert
            hideIcon
            color="success"
            title={SuccessMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
      </div>
    </form>
  );
}
