"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AusthSocicalButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<variant>("REGISTER");
  const [isLoading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (variant === "REGISTER") {
      // execute axios
    }

    if (variant === "LOGIN") {
      // execite NextAuth
    }
  };

  const socialAction = (action: String) => {
    setLoading(true);

    // execute NextAuth social sign in
  };

  return (
    <div className="mt-8 mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white shadow-xl px-4 py-8 sm:px-10 sm:rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" register={register} label="Name" errors={errors} disabled={isLoading} />
          )}
          <Input
            id="email"
            register={register}
            type="email"
            label="Email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            register={register}
            label="Password"
            errors={errors}
            disabled={isLoading}
          />
          <div className="">
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
            <AusthSocicalButton
                onClick={() => socialAction('github')}
                icon={BsGithub} />
            <AusthSocicalButton
                onClick={() => socialAction('google')}
                icon={BsGoogle} />
        </div>

        <div className="flex justify-center gap-2 text-sm mt-6 px-2 text-gray-500">
            <div>{variant === 'LOGIN' ? 'New to messenger?' : 'Already have account?'}</div>
            <div>
                <button onClick={toggleVariant}
                className="underline cursor-pointer">
                    {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
