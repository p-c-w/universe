import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { updateUserName } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

const useUpdateUserNameMutation = () => {
  const email = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: updateUserName,
    onMutate({ name }) {
      return userInfo => ({ ...userInfo, name });
    },
  });
};

export default useUpdateUserNameMutation;
