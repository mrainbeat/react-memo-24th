import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-heading-lg text-blue-07">로그인</h1>
      <Link to="/signup" className="text-action-sm text-blue-07 underline">
        회원가입
      </Link>
    </div>
  );
}
