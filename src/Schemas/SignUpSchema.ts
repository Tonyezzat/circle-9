import * as zod from "zod";
import {regex} from "../utils/regex";
import { getAge } from "../utils/helper";
export  const SignUpSchema = zod
    .object({
      name: zod
        .string()
        .nonempty("Name is required ")
        .min(3, "Name must be at least 3 chracters")
        .max(20, "Name must be at most 20 chracters"),
      email: zod
        .string()
        .nonempty("Email is required")
        .regex(regex.email, "Enter valid email"),
      password: zod
        .string()
        .nonempty("Password is required")
        .regex(
          regex.password,
          "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
        ),
      rePassword: zod.string().nonempty("Confirm password is required"),
      dateOfBirth: zod
        .string()
        .nonempty("Birth date is required")
        .refine((date) => getAge(date) >= 18, "Age must be at least 18 "),
      gender: zod
        .string()
        .nonempty("Gender is required")
        .regex(regex.gender, "Gender must be male or female"),
    })
    .refine((data) => data.password==data.rePassword,{
      message:"Confirm password must match password",
      path:["rePassword"],
    });