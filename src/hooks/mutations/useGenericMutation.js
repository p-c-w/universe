import { useQueryClient, useMutation } from '@tanstack/react-query';

const useGenericMutation = ({ queryKey, mutationFn, onMutate: expected }) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey,
    mutationFn,

    async onMutate(variables) {
      await queryClient.cancelQueries({ queryKey });
      const previousUserInfo = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, expected(variables));

      return { previousUserInfo };
    },

    onError(err, variables, context) {
      queryClient.setQueryData(queryKey, context.previousUserInfo);
    },

    onSettled() {},
  });
};

export default useGenericMutation;
