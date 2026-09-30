import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignIn } from '@/hooks/auth/useSignIn';

import { SigninCard } from './signInCard';

export const SigninContainer = () => {
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(null);

  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
  });

  const { data, loading, error, signInMutation } = useSignIn();

  const isSuccess = !!data;

  const onSigninFormSubmit = async (e) => {
    e.preventDefault();

    if (!signinForm.email || !signinForm.password) {
      console.log('Please fill all the fields');

      setValidationError({
        message: 'Please fill all the fields',
      });

      return;
    }

    setValidationError(null);

    await signInMutation({
      variables: {
        email: signinForm.email,
        password: signinForm.password,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <SigninCard
      onSigninFormSubmit={onSigninFormSubmit}
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={loading}
    />
  );
};
