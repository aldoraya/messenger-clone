"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import AuthSocialButton from "./AuthSocialButton";
import { useRouter } from "next/navigation";

type variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<variant>("REGISTER");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router])

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
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post('api/register', data)
      .then(() => signIn('credentials', data))
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false))
    }

    if (variant === "LOGIN") {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!')
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false))
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.error) {
        toast.error('Invalid credentials')
      }

      if (callback?.ok && !callback?.error) {
        toast.success('Logged in!')
        router.push('/users');
      }
    })
    .finally(() => setIsLoading(false))
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
            <AuthSocialButton
                onClick={() => socialAction('github')}
                icon={BsGithub} />
            <AuthSocialButton
                onClick={() => socialAction('google')}
                icon={BsGoogle} />
        </div>

        <div className="flex justify-center gap-2 text-sm mt-6 px-2 text-gray-500">
            <div>{variant === 'LOGIN' ? 'New to messenger?' : 'Already have account?'}</div>
            <div>
                <button onClick={toggleVariant}
                className="underline cursor-pointer">
                    {variant === 'LOGIN' ? 'Create an account' : 'Sign In'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
