import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { updateSubscribeList } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

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
