import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-heading-lg text-blue-07">회원가입</h1>
      <Link to="/login" className="text-action-sm text-blue-07 underline">
        로그인
      </Link>
    </div>
  );
}
