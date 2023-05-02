import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { updateUserName } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

/**
 * useUpdateUserNameMutation - 사용자 이름을 업데이트하는데 사용되는 커스텀 훅입니다.
 *
 * @param {string} name - 변경할 사용자 이름
 */

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
