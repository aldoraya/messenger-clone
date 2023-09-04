import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex h-screen flex-col justify-center py-32 sm:px-6 lg:px-8 bg-gray-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
        alt="logo"
        height= "48"
        width="48"
        className="mx-auto w-auto"
        src="/images/logo.png" />
        <h2 className="text-white mt-6 text-center text-3xl font-bold tracking-tight">Sign in to your account</h2>
      </div>
      <AuthForm />
    </div>
  )
}
