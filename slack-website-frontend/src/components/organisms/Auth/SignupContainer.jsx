import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignupCard } from './signUpCard';
import { useSignUp } from '@/hooks/auth/useSignUp';

export const SignupContainer = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [validationError, setValidationError] = useState(null);

  const {
    loading: isPending,
    error,
    data,
    signUpMutation: signupMutation,
  } = useSignUp();

  const isSuccess = !!data?.signUp?.success;

  async function onSignupFormSubmit(e) {
    e.preventDefault();

    console.log('Signup form submitted', signupForm);

    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword ||
      !signupForm.username
    ) {
      console.error('All fields are required');

      setValidationError({
        message: 'All fields are required',
      });

      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      console.error('Passwords do not match');

      setValidationError({
        message: 'Passwords do not match',
      });

      return;
    }

    setValidationError(null);

    await signupMutation({
      variables: {
        signUpInput: {
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
          username: signupForm.username,
        },
      },
    });
  }

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/auth/signIn');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <SignupCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      signupForm={signupForm}
      setSignupForm={setSignupForm}
      validationError={validationError}
      onSignupFormSubmit={onSignupFormSubmit}
    />
  );
};
