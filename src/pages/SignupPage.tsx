import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { ApiError } from "../api/client";
import Button from "../components/common/Button";
import TextField from "../components/common/TextField";
import AlertModal from "../components/modal/AlertModal";
import NetworkErrorModal from "../components/modal/NetworkErrorModal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function validate(email: string, password: string) {
  if (!EMAIL_PATTERN.test(email)) return "*이메일 형식이 올바르지 않습니다";
  if (password.length < MIN_PASSWORD_LENGTH) return "*비밀번호는 8자 이상이어야 합니다";
  return null;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const canSubmit = email.trim() !== "" && password !== "" && !isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    const trimmedEmail = email.trim();
    const validationMessage = validate(trimmedEmail, password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await signup({ email: trimmedEmail, password });
      setIsSignedUp(true);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;

      if (error.status === 0) setIsNetworkError(true);
      else setErrorMessage(`*${error.message}`);
    } finally {
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
              autoComplete="email"
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
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
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
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
          <Link to="/login" className="text-body-sm text-gray-03">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </form>

      {isNetworkError && <NetworkErrorModal onConfirm={() => setIsNetworkError(false)} />}
      {isSignedUp && (
        <AlertModal
          title="회원가입이 완료되었습니다"
          description="로그인 후 이용해주세요"
          confirmLabel="확인"
          onConfirm={() => navigate("/login", { replace: true })}
        />
      )}
    </div>
  );
}
