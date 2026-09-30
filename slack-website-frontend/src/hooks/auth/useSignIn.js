import { signIn } from '@/graphql/mutation/auth';
import { useMutation } from '@apollo/client/react';
import { toast } from '@/components/ui/toast';

export const useSignIn = () => {
  const [mutate, { error, loading, data }] = useMutation(signIn, {
    onCompleted: (data) => {
      console.log('successfully signUp', data);
      const userObject = data.signIn.data;
      localStorage.setItem('user', JSON.stringify(userObject.user));
      localStorage.setItem('token', userObject.accessToken);
      toast.add({
        title: 'Successfully signed In',
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
    signInMutation: mutate,
    data,
    error,
    loading,
  };
};
