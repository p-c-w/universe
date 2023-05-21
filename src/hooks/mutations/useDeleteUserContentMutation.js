import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { deleteUserContent } from '../../api/user';
import { useGenericMutation } from '.';
import { USER_INFO_QUERY_KEY } from '../../constants';

const useAddUserContentMutation = () => {
  const email = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: deleteUserContent,
    onMutate({ list, id }) {
      return userInfo => ({ ...userInfo, [list]: [...userInfo[list]].filter(movie => movie.id !== +id) });
    },
    suspense: true,
  });
};

export default useAddUserContentMutation;
