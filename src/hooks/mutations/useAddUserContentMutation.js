import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { updateUserContent } from '../../api/user';
import { useGenericMutation } from '.';
import { USER_INFO_QUERY_KEY } from '../../constants';

const useAddUserContentMutation = () => {
  const email = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: updateUserContent,
    onMutate({ list, value }) {
      return userInfo => ({ ...userInfo, [list]: [...userInfo[list], value] });
    },
    suspense: true,
  });
};

export default useAddUserContentMutation;
