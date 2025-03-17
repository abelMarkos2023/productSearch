import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6 animate-fade-in">
          Join Us Today!
        </h1>
        <p className="text-white text-lg mb-8">
          Create an account and start discovering new products.
        </p>
        <AuthForm type="signup" />
      </div>
    </div>
  );
}
