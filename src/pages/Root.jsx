import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { GlobalShell } from '../components/common';
import { Banner, Board } from '../components/rootPage';
import { useAuthenticationQuery } from '../hooks/queries';
import { userState } from '../recoil/atom';

const Root = () => {
  const { isSuccess, data } = useAuthenticationQuery();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (isSuccess) setUser(data.data);
    else setUser(null);
  }, [data, isSuccess, setUser]);

  return (
    <>
      <GlobalShell>
        {!user && <Banner />}
        <Board />
      </GlobalShell>
    </>
  );
};

export default Root;
