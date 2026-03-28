import { AuthForm } from "@/app/(auth)/components/AuthForm";

export default function RegisterPage() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-white">
            <div id="clerk-captcha"/>
            <AuthForm type="login" />
        </div>
    );
}