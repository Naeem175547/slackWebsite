import { SignupCard } from '@/components/organisms/Auth/signUpCard';
import React from 'react';
export default function Auth({ children }) {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-slack">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
}
