import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isFormValid = email.trim() !== '' && password.trim() !== '';
    
    const DUMMY_USER = {
    email: 'test@example.com',
    password: 'password123',
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
        setError('이메일을 입력해 주세요.');
        return;
        }
        if (!password.trim()) {
        setError('비밀번호를 입력해 주세요.');
        return;
        }
       
        if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) {
            setError('*아이디(이메일) 또는 비밀번호가 일치하지 않습니다.');
            return;
        }
        
        setError('');

        login(email);
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full bg-blue-01 flex items-center justify-center p-4 select-none">
        <div className="w-full max-w-[420px] flex flex-col items-center">
            

            <form onSubmit={handleSubmit}className="w-full flex flex-col gap-3.5 mb-6">
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


            {error && (
                <p className="text-alert-01 text-[10px] px-2 -mt-1">{error}</p>
            )}

            <button
                type="submit"
                aria-label="로그인 버튼"
                disabled={!isFormValid}
                className={`
                w-full h-14 text-white font-semibold text-base rounded-2xl
                transition-all shadow-sm flex items-center justify-center
                mt-1
                ${
                    isFormValid
                    ? 'bg-blue-05 hover:bg-[#002B80] cursor-pointer active:scale-[0.99]'
                    : 'bg-blue-03 cursor-not-allowed'
                }
                `}
            >
                로그인
            </button>
            </form>

            <div aria-label="하단 메뉴" className="flex items-center justify-center gap-4 text-xs text-gray-03 font-medium">
            <Link to="/signup" className="hover:text-gray-07 transition-colors">
                회원가입
            </Link>
            <span className="text-gray-03 font-light">|</span>
            <button 
                type="button" 
                onClick={() => alert('기능 준비중.')}
                className="hover:text-gray-07 transition-colors cursor-pointer"
            >
                아이디 찾기
            </button>
            <span className="text-gray-03 font-light">|</span>
            <button 
                type="button" 
                onClick={() => alert('기능 준비중.')}
                className="hover:text-gray-07 transition-colors cursor-pointer"
            >
                비밀번호 찾기
            </button>
            </div>

        </div>
        </div>
    );
}