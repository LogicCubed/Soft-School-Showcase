import { AuthForm } from "components/AuthForm";

export default function RegisterPage() {
    return (
        <div id="clerk-captcha" className="w-full min-h-screen flex justify-center items-center bg-white">
            <AuthForm type="login" />
        </div>
    );
}