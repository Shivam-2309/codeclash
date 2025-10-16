import { signInAction } from "@/app/actions/auth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign in to your account
        </h1>
        <form action={signInAction} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border-gray-300 focus:border-blue-500"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border-gray-300 focus:border-blue-500"
          />
          <Button
            type="submit"
            className="mt-2 bg-blue-600 text-white hover:bg-blue-700 transition font-medium rounded-md py-2"
          >
            Sign In
          </Button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-5">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[var(--app-tint)]">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
