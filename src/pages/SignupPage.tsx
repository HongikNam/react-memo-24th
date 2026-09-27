import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import ModalPopup from '../components/modal/Modal_popup'; 

export default function SignupPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const isFormValid =
        email.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('모든 필드를 입력해 주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('*비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            await authApi.signup({ email, password });
            
            setIsSuccessModalOpen(true);
        } catch (err: any) {
            setError(err.message || '회원가입 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = () => {
        setIsSuccessModalOpen(false);
        navigate('/login');
    };

    return (
        <div className="min-h-screen w-full bg-blue-01 flex items-center justify-center p-4 select-none">
            <div className="w-full max-w-[420px] flex flex-col items-center">
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5 mb-6">
                    <input
                        type="email"
                        aria-label="이메일 입력창"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 px-5 bg-white rounded-2xl text-sm placeholder:text-gray-02 text-gray-04 outline-none"
                    />

                    <input
                        type="password"
                        aria-label="비밀번호 입력창"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 px-5 bg-white rounded-2xl text-sm placeholder:text-gray-02 text-gray-04 outline-none"
                    />

                    <input
                        type="password"
                        aria-label="비밀번호 재입력창"
                        placeholder="비밀번호를 한번 더 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-14 px-5 bg-white rounded-2xl text-sm placeholder:text-gray-02 text-gray-04 outline-none"
                    />

                    {error && (
                        <p className="text-alert-01 text-[10px] px-2 -mt-1">{error}</p>
                    )}

                    <button
                        type="submit"
                        aria-label="회원가입 버튼"
                        disabled={!isFormValid || isLoading}
                        className={`
                            w-full h-14 text-white font-semibold text-base rounded-2xl
                            transition-all shadow-sm flex items-center justify-center
                            mt-1
                            ${
                                isFormValid && !isLoading
                                    ? 'bg-blue-05 cursor-pointer hover:bg-[#002B80]'
                                    : 'bg-blue-03 cursor-not-allowed'
                            }
                        `}
                    >
                        {isLoading ? '처리 중...' : '회원가입'}
                    </button>
                </form>

                <div aria-label="하단 메뉴" className="flex items-center justify-center gap-4 text-xs text-gray-03 font-medium">
                    <span className="text-gray-03">이미 계정이 있으신가요?</span>
                    <Link to="/login" className="hover:text-gray-800 transition-colors font-semibold underline">
                        로그인
                    </Link>
                </div>

            </div>

            <ModalPopup
                isOpen={isSuccessModalOpen}
                type="alert"
                title="회원가입 완료"
                description="회원가입이 성공적으로 완료되었습니다. 로그인 화면으로 이동합니다."
                confirmText="로그인하러 가기"
                onConfirm={handleConfirm}
            />
        </div>
    );
}