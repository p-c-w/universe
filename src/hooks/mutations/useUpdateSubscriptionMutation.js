import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { updateSubscribeList } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

/**
 * useUpdateSubscription - 사용자의 현재 구독 정보를 업데이트하는데 사용되는 커스텀 훅입니다.
 *
 * @param {Object} newList - 수정한 새로운 구독 정보 리스트
 */

const useUpdateSubscriptionMutation = () => {
  const email = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: updateSubscribeList,
    onMutate({ newList }) {
      return userInfo => ({ ...userInfo, subscribe_list: newList });
    },
  });
};

export default useUpdateSubscriptionMutation;
