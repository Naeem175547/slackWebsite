import { signIn } from '@/graphqlApi/mutation/auth';
import { useMutation } from '@apollo/client/react';
import { toast } from '@/components/ui/toast';
import { useAuth } from '../context/useAuth';

export const useSignIn = () => {
  const { setAuth } = useAuth();
  const [mutate, { error, loading, data }] = useMutation(signIn, {
    onCompleted: (data) => {
      console.log('successfully signUp', data);
      const userObject = data.signIn.data;
      localStorage.setItem('user', JSON.stringify(userObject.user));
      localStorage.setItem('token', userObject.accessToken);
      setAuth({
        user: userObject.user,
        token: userObject.accessToken,
        isLoading: false,
      });
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
        title: 'Failed to sign In',
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
