import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { useUpdateModifiedAt } from '../../api';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

/**
 * useUpdateModifiedAtMutation - 사용자의 history list item 추가 날짜를 업데이트하는데 사용되는 커스텀 훅입니다.
 *
 * @param {string} list - userInfo 객체에서 수정할 배열의 이름
 * @param {number} id - 수정할 content의 id
 * @param {string} value - 수정할 값
 */

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
