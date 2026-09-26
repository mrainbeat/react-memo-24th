import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { login } from "../api/auth";
import { ApiError } from "../api/client";
import dividerVertical from "../assets/icons/divider-vertical.svg";
import Button from "../components/common/Button";
import TextField from "../components/common/TextField";
import NetworkErrorModal from "../components/modal/NetworkErrorModal";
import { useAuthStore } from "../stores/authStore";

const INVALID_CREDENTIALS_MESSAGE = "*이메일 또는 비밀번호가 옳지 않습니다";

function Divider() {
  return (
    <span className="relative h-[21.5px] w-0 shrink-0">
      <span className="absolute inset-x-[-0.5px] inset-y-[-2.33%]">
        <img alt="" src={dividerVertical} className="block size-full max-w-none" />
      </span>
    </span>
  );
}

export default function LoginPage() {
  const setToken = useAuthStore((s) => s.setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNetworkError, setIsNetworkError] = useState(false);

  const canSubmit = email.trim() !== "" && password !== "" && !isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { accessToken } = await login({ email: email.trim(), password });
      setToken(accessToken);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;

      if (error.status === 0) setIsNetworkError(true);
      else if (error.status === 401) setErrorMessage(INVALID_CREDENTIALS_MESSAGE);
      else setErrorMessage(`*${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="flex w-full max-w-[560px] flex-col gap-4">
        <div className="flex min-h-[152px] flex-col gap-1">
          <div className="flex flex-col gap-4">
            <TextField
              type="text"
              name="email"
              inputMode="email"
              autoComplete="username"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(null);
              }}
            />
            <TextField
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(null);
              }}
            />
          </div>
          {errorMessage && (
            <p role="alert" className="text-body-sm text-point-01">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-7">
          <Button type="submit" disabled={!canSubmit}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
          <div className="flex items-center justify-center gap-8 text-body-sm text-gray-03">
            <Link to="/signup">회원가입</Link>
            <Divider />
            <span>이메일 찾기</span>
            <Divider />
            <span>비밀번호 찾기</span>
          </div>
        </div>
      </form>

      {isNetworkError && <NetworkErrorModal onConfirm={() => setIsNetworkError(false)} />}
    </div>
  );
}
