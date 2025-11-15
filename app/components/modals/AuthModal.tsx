import { ArrowRight, Eye, EyeClosed, IdCard, KeyRound, Mail, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, Label } from 'react-aria-components';
import { Link, useFetcher } from 'react-router';
import { toast } from 'sonner';
import type Swiper from 'swiper';
// Import Swiper styles
import 'swiper/css';
import { Swiper as SwiperComp, SwiperSlide } from 'swiper/react';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@ui/InputOtp';

import { useAuthModalStore } from '@stores/authModalStore';

import { cn } from '@libs/cn';

export function AuthModal() {
  const swiperReference = useRef<Swiper | null>(null);
  const isOpen = useAuthModalStore((state) => state.isOpen);
  const setIsOpen = useAuthModalStore((state) => state.setIsOpen);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const fetcher = useFetcher();
  const signupFetcher = useFetcher();
  const otpFetcher = useFetcher();

  useEffect(() => {
    if (otpFetcher.data?.success === true && otpFetcher.state === 'idle') {
      toast.success('Account Confirmed');
      setIsOpen(false);
    }
  }, [otpFetcher]);

  useEffect(() => {
    if (signupFetcher.data?.success === true && signupFetcher.state === 'idle') {
      swiperReference.current?.slideNext();
    }
  }, [signupFetcher]);

  useEffect(() => {
    if (fetcher.data?.success === true && fetcher.state === 'idle') {
      toast.success('Successful login');
      setIsOpen(false);
    }
  }, [fetcher]);

  useEffect(() => {
    swiperReference.current?.update();
  }, [fetcher, signupFetcher, otpFetcher, isSignupOpen]);

  const [isEyeOpen, setIsEyeOpen] = useState(false);

  return (
    <div
      className={cn({
        'invisible fixed top-0 left-0 z-1000 grid h-full w-full place-items-center opacity-0 transition-all': true,
        'visible opacity-100': isOpen,
      })}
    >
      <div
        onClick={() => setIsOpen(false)}
        className="fixed top-0 left-0 z-0 h-full w-full bg-black/50"
      ></div>
      <div className="pointer-events-none relative z-10 container mx-auto flex w-full justify-center">
        <div className="pointer-events-auto w-full max-w-[520px] rounded-3xl border border-gray-200 bg-white px-5 py-4 shadow-xs">
          <div className="flex items-center justify-between gap-10">
            <div className="flex items-center gap-2">
              <div className="rounded-full border border-orange-100 bg-orange-50 p-2">
                <IdCard className="text-orange-500" />
              </div>
              <div className="text-lg font-medium">{isSignupOpen ? 'Signup' : 'Login'}</div>
            </div>
            <Button
              onPress={() => setIsOpen(false)}
              className="group hover:bg-surface rounded bg-transparent p-1 transition"
            >
              <X className="text-gray-700 group-hover:text-gray-800" />
            </Button>
          </div>
          <div className="mt-6 mb-4 text-center text-2xl font-semibold">
            {isSignupOpen ? 'Sign Up to Get Started' : 'Welcome back! Please sign in'}
          </div>
          <SwiperComp
            spaceBetween={20}
            slidesPerView={1}
            autoHeight={true}
            allowTouchMove={false}
            onSwiper={(swiper) => (swiperReference.current = swiper)}
          >
            <SwiperSlide>
              {!isSignupOpen && (
                <fetcher.Form
                  method="post"
                  action="/login"
                >
                  <div className="group mb-4 flex flex-col gap-1">
                    <Label
                      htmlFor="email"
                      className="group-has-focus:text-primary flex items-center gap-2 font-medium"
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        id="email"
                        name="email"
                        className="border-outline-variant focus:outline-primary rounded-xl border px-3 py-2"
                        placeholder="example@gmail.com"
                      />
                      {fetcher.data?.errors?.email && <div className="text-red-600">{fetcher.data.errors.email}</div>}
                    </div>
                  </div>
                  <div className="group mb-5 flex flex-col gap-1">
                    <Label
                      htmlFor="password"
                      className="group-has-focus:text-primary flex items-center gap-2 font-medium"
                    >
                      <KeyRound size={18} />
                      <span>Password</span>
                    </Label>
                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={isEyeOpen ? 'text' : 'password'}
                          className="border-outline-variant focus:outline-primary w-full rounded-xl border px-3 py-2"
                          placeholder={isEyeOpen ? 'secretpassword' : '**********'}
                        />
                        <Button
                          onPress={() => setIsEyeOpen((previous) => !previous)}
                          className="absolute top-1/2 right-4 -translate-y-1/2"
                        >
                          {isEyeOpen && (
                            <Eye
                              size={18}
                              className="text-on-surface-variant"
                            />
                          )}
                          {!isEyeOpen && (
                            <EyeClosed
                              size={18}
                              className="text-on-surface-variant"
                            />
                          )}
                        </Button>
                      </div>
                      {fetcher.data?.errors?.password && (
                        <div className="text-red-600">{fetcher.data.errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 flex justify-between">
                    <Label className="flex items-center gap-2">
                      <input
                        name="rememberMe"
                        type="checkbox"
                      />
                      <span>Remember me</span>
                    </Label>
                    <Link
                      to="#"
                      className="text-on-surface-variant hover:text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {fetcher.data?.success === false &&
                    fetcher.state === 'idle' &&
                    fetcher.data?.rawError?.data?.result?.errorMsg && (
                      <div className="mb-4 rounded-md border border-red-100 bg-red-50 py-2 text-center text-red-600">
                        {fetcher.data?.rawError?.data?.result?.errorMsg}
                      </div>
                    )}
                  {fetcher.data?.success === false &&
                    fetcher.state === 'idle' &&
                    fetcher.data?.rawError?.data?.result?.error_msg && (
                      <div className="mb-4 rounded-md border border-red-100 bg-red-50 py-2 text-center text-red-600">
                        {fetcher.data?.rawError?.data?.result?.error_msg}
                      </div>
                    )}
                  <Button
                    type="submit"
                    isDisabled={fetcher.state !== 'idle'}
                    className="bg-primary hover:bg-primary/90 disabled:bg-primary/80 mb-4 w-full rounded-2xl py-4 text-white transition"
                  >
                    Login
                  </Button>
                  <Button
                    onPress={() => setIsSignupOpen((previous) => !previous)}
                    className="group mx-auto mb-2 flex w-fit items-center gap-2 text-blue-800"
                  >
                    Don&apos;t have an account
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Button>
                </fetcher.Form>
              )}
              {isSignupOpen && (
                <signupFetcher.Form
                  method="post"
                  action="/signup"
                >
                  <input
                    type="hidden"
                    name="actionName"
                    value="credentials"
                  />
                  <div className="group mb-4 flex flex-col gap-1">
                    <Label
                      htmlFor="email"
                      className="group-has-focus:text-primary flex items-center gap-2 font-medium"
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        id="email"
                        name="email"
                        className="border-outline-variant focus:outline-primary rounded-xl border px-3 py-2"
                        placeholder="example@gmail.com"
                      />
                      {signupFetcher.data?.errors?.email && (
                        <div className="text-red-600">{signupFetcher.data.errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="group mb-5 flex flex-col gap-1">
                    <Label
                      htmlFor="password"
                      className="group-has-focus:text-primary flex items-center gap-2 font-medium"
                    >
                      <KeyRound size={18} />
                      <span>Password</span>
                    </Label>
                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={isEyeOpen ? 'text' : 'password'}
                          className="border-outline-variant focus:outline-primary w-full rounded-xl border px-3 py-2"
                          placeholder={isEyeOpen ? 'secretpassword' : '**********'}
                        />
                        <Button
                          onPress={() => setIsEyeOpen((previous) => !previous)}
                          className="absolute top-1/2 right-4 -translate-y-1/2"
                        >
                          {isEyeOpen && (
                            <Eye
                              size={18}
                              className="text-on-surface-variant"
                            />
                          )}
                          {!isEyeOpen && (
                            <EyeClosed
                              size={18}
                              className="text-on-surface-variant"
                            />
                          )}
                        </Button>
                      </div>
                      {signupFetcher.data?.errors?.password && (
                        <div className="text-red-600">{signupFetcher.data.errors.password}</div>
                      )}
                    </div>
                  </div>
                  <div className="group mb-5 flex flex-col gap-1">
                    <Label
                      htmlFor="repeat-password"
                      className="group-has-focus:text-primary flex items-center gap-2 font-medium"
                    >
                      <KeyRound size={18} />
                      <span>Confirm Password</span>
                    </Label>
                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <Input
                          id="repeat-password"
                          name="repeat-password"
                          type={isEyeOpen ? 'text' : 'password'}
                          className="border-outline-variant focus:outline-primary w-full rounded-xl border px-3 py-2"
                          placeholder={isEyeOpen ? 'secretpassword' : '**********'}
                        />
                        <Button
                          onPress={() => setIsEyeOpen((previous) => !previous)}
                          className="absolute top-1/2 right-4 -translate-y-1/2"
                        >
                          {isEyeOpen && (
                            <Eye
                              size={18}
                              className="text-on-surface-variant"
                            />
                          )}
                          {!isEyeOpen && (
                            <EyeClosed
                              size={18}
                              className="text-on-surface-variant"
                            />
                          )}
                        </Button>
                      </div>
                      {signupFetcher.data?.errors?.repeatPassword && (
                        <div className="text-red-600">{signupFetcher.data.errors.repeatPassword}</div>
                      )}
                    </div>
                  </div>
                  {signupFetcher.data?.success === false &&
                    signupFetcher.state === 'idle' &&
                    signupFetcher.data?.rawError?.data?.result?.errorMsg && (
                      <div className="mb-4 rounded-md border border-red-100 bg-red-50 py-2 text-center text-red-600">
                        {signupFetcher.data?.rawError?.data?.result?.errorMsg}
                      </div>
                    )}
                  {signupFetcher.data?.success === false &&
                    signupFetcher.state === 'idle' &&
                    signupFetcher.data?.rawError?.data?.result?.error_msg && (
                      <div className="mb-4 rounded-md border border-red-100 bg-red-50 py-2 text-center text-red-600">
                        {signupFetcher.data?.rawError?.data?.result?.error_msg}
                      </div>
                    )}
                  <Button
                    type="submit"
                    isDisabled={signupFetcher.state !== 'idle'}
                    className="bg-primary disabled:bg-primary/80 hover:bg-primary/95 mb-4 w-full rounded-2xl py-4 text-white transition"
                  >
                    Signup
                  </Button>
                  <Button
                    onPress={() => setIsSignupOpen((previous) => !previous)}
                    className="group mx-auto mb-2 flex w-fit items-center gap-2 text-blue-800"
                  >
                    Already have an account
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Button>
                </signupFetcher.Form>
              )}
            </SwiperSlide>
            <SwiperSlide>
              <otpFetcher.Form
                method="post"
                action="/signup"
              >
                <input
                  type="hidden"
                  name="actionName"
                  value="otpSubmit"
                />
                <div className="flex justify-center py-10">
                  <InputOTP
                    name="otp"
                    disabled={otpFetcher.state !== 'idle'}
                    onComplete={(otp) => {
                      const formData = new FormData();
                      formData.append('otp', otp);
                      formData.append('actionName', 'otpSubmit');
                      otpFetcher.submit(formData, {
                        method: 'post',
                        action: '/signup',
                      });
                    }}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="h-12 text-center">
                  {otpFetcher.data?.success === false && (
                    <div className="text-red-500">
                      Invalid OTP. Make sure you&apos;ve entered the latest 6-digit code received on your phone/email.
                    </div>
                  )}
                </div>
              </otpFetcher.Form>
            </SwiperSlide>
          </SwiperComp>
        </div>
      </div>
    </div>
  );
}
