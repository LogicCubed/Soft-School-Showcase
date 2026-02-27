import { AuthForm } from "components/AuthForm";

export default function RegisterPage() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-white">
            <AuthForm type="login" />
        </div>
    );
}