import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { updateSubscribeList } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

/**
 * useUpdateModifiedAtMutation - 사용자의 history list item 추가 날짜를 업데이트하는데 사용되는 커스텀 훅입니다.
 *
 * @param {string} name - 변경할 사용자 이름
 */

const useUpdateModifiedAtMutation = () => {
  const email = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: updateSubscribeList,
    onMutate({ newList }) {
      return userInfo => ({ ...userInfo, subscribe_list: newList });
    },
  });
};

export default useUpdateModifiedAtMutation;
