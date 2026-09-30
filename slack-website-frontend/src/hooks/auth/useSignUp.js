import { toast } from '@/components/ui/toast';

import { signUp } from '@/graphql/mutation/auth';

import { useMutation } from '@apollo/client/react';

export const useSignUp = () => {
  const [mutate, { data, error, loading }] = useMutation(signUp, {
    onCompleted: (data) => {
      console.log('successfully signUp', data);

      toast.add({
        title: 'Successfully signed up',
        description:
          'You will be redirected to the login page in a few seconds',
        type: 'success',
      });
    },

    onError: (error) => {
      console.log('failed to signUp', error);

      toast.add({
        title: 'Failed to sign up',
        description: error.message,
        type: 'error',
        variant: 'destructive',
      });
    },
  });

  return {
    signUpMutation: mutate,
    data,
    error,
    loading,
  };
};
