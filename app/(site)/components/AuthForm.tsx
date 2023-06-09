"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";

import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("REGISTER");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

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
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-4 lg:px-20">
      <div className="flex flex-col gap-2 py-6">
        <h2 className="font-semibold tracking-tight text-2xl text-neutral-900">
          {variant === "REGISTER"
            ? "Sign up for free to start messaging."
            : "To continue, log in to Swivt."}
        </h2>
        <p className="text-xs text-neutral-400 font-medium">
          Seamlessly connected with your loved ones.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <AuthSocialButton
          icon={BsGithub}
          name="GitHub"
          onClick={() => socialAction("github")}
        />
        <AuthSocialButton
          icon={BsGoogle}
          name="Google"
          onClick={() => socialAction("google")}
        />
      </div>
      <div className="relative mt-2 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-neutral-50 px-4 text-xs text-neutral-500">
            OR
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div
            className={clsx("w-full", {
              "grid grid-cols-2 gap-4": variant === "REGISTER",
            })}
          >
            {variant === "REGISTER" && (
              <Input
                type="text"
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          </div>
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} fullWidth type="submit">
          {isLoading ? (
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : variant === "LOGIN" ? (
            "Sign in"
          ) : (
            "Register"
          )}
        </Button>
      </form>

      <div className="flex gap-2 justify-center items-center text-xs mt-6 px-2 text-neutral-500">
        <div>
          {variant === "LOGIN"
            ? "New to Messenger?"
            : "Already have an account?"}
        </div>
        <span
          onClick={toggleVariant}
          className="underline cursor-pointer text-xs"
        >
          {variant === "LOGIN" ? "Create an account" : "Login"}
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
