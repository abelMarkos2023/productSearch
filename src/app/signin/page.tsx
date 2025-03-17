import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6 animate-fade-in">
          Welcome Back!
        </h1>
        <p className="text-white text-lg mb-8">
          Sign in to explore amazing deals and products.
        </p>
        <AuthForm type="signin" />
      </div>
    </div>
  );
}
