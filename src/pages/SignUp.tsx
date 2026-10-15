import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignUpSchema } from "../Schemas/SignUpSchema";
import { authServices } from "../services/authServices";
import type { RegisterData } from "../types/RegisterData";

export default function SignUp() {
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
    const [isLoading, setisLoading] = useState(false)
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  async function signUp(values: RegisterData) {
    setErrorMsg("")
    setSuccessMsg("")
    setisLoading(true)
    
    try {
     const data=await authServices.signUp(values)
      setSuccessMsg(data.message)
      setisLoading(false)
      navigate("/signin")

    } catch (error: any) {
      setErrorMsg(error.response.data.message)
      setisLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Sign up</h1>
        </div>

        <Input
          {...register("name")}
          variant="bordered"
          type="text"
          label="Full Name"
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message as string}
        />

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

        <Input
          {...register("rePassword")}
          variant="bordered"
          type="password"
          label="Confirm Password"
          isInvalid={!!errors.rePassword?.message}
          errorMessage={errors.rePassword?.message as string}
        />

        <Input
          {...register("dateOfBirth")}
          variant="bordered"
          type="date"
          label="Birth Date"
          isInvalid={!!errors.dateOfBirth?.message}
          errorMessage={errors.dateOfBirth?.message as string}
        />

        <Select
          variant="bordered"
          label="Gender"
          {...register("gender")}
          isInvalid={!!errors.gender?.message}
          errorMessage={errors.gender?.message as string}
        >
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>
        <Button isLoading={isLoading} color="primary" variant="solid" type="submit">
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to={"/signin"}>Login now</Link>
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
