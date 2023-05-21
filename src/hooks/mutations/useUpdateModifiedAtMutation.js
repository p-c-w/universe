import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { useUpdateModifiedAt } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

const useUpdateModifiedAtMutation = () => {
  const email = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: useUpdateModifiedAt,
    onMutate({ list, id, value }) {
      return userInfo => ({
        ...userInfo,
        [list]: userInfo[list].map(item => (item.id === id ? { ...item, modified_at: value } : item)),
      });
    },
  });
};

export default useUpdateModifiedAtMutation;
