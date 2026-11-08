import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSignIn } from '@/hooks/auth/useSignIn';

import { SigninCard } from './signInCard';

export const SigninContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Page the user tried to open before being sent to sign-in (only same-site paths)
  const from = location.state?.from;
  const redirectTo =
    typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
      ? from
      : '/home';

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
        navigate(redirectTo, { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate, redirectTo]);

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
