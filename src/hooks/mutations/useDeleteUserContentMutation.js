import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { deleteUserContent } from '../../api/user';
import { useGenericMutation } from '.';
import { USER_INFO_QUERY_KEY } from '../../constants';

/**
 * useAddUserContentMutation - 사용자 정보를 업데이트하는데 사용되는 커스텀 훅입니다.
 *
 * @param {string} email - 사용자 이메일
 * @param {string} list - userInfo 객체에서 값을 삭제할 배열의 이름
 * @param {number} id - 삭제할 content의 id
 */
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
