import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex h-full p-10 gap-10 bg-neutral-50">
      <div className="w-1/2 flex flex-col">
        <h1 className="tracking-tighter font-bold text-sky-800 text-lg">SWIVT.</h1>
        <AuthForm />
      </div>
      <div className="relative w-1/2 rounded-tl-3xl rounded-br-3xl overflow-hidden">
        <Image
          src='https://images.unsplash.com/photo-1569144157581-984dea473e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=100'
          alt='hero-image'
          width={1000}
          height={1000}
          placeholder="blur"
          blurDataURL="https://images.unsplash.com/photo-1569144157581-984dea473e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          priority
          className="h-full object-center object-cover"
        />
        <div className="absolute w-full px-10 bottom-12 flex flex-col gap-1 text-4xl text-white font-bold">
          <span>Secure</span>
          <span>Reliable.</span>
          <span>Lightning-fast.</span>
        </div>
      </div>
    </div>
  )
}
