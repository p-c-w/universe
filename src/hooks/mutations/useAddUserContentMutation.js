import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { updateUserContent } from '../../api/user';
import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';

/**
 * useAddUserContentMutation - 사용자 정보를 업데이트하는데 사용되는 커스텀 훅입니다.
 *
 * @param {string} email - 사용자 이메일
 * @param {string} list - userInfo 객체에서 새로운 값을 추가할 배열의 이름
 * @param {Object} value - 추가할 객체. id, type, modified_at 프로퍼티를 포함해야 함
 */

const useAddUserContentMutation = () => {
  const { email } = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: [USER_INFO_QUERY_KEY, email],
    mutationFn: updateUserContent,
    onMutate({ email, list, value }) {
      return userInfo => ({ ...userInfo, [list]: [...userInfo[list], value] });
    },
  });
};

export default useAddUserContentMutation;
