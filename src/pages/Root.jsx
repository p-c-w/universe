import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { GlobalShell, ThemeButton } from '../components/common';
import { Banner, Board } from '../components/rootPage';
import { useAuthenticationQuery } from '../hooks/queries';
import { userState } from '../recoil/atom';

const Root = () => {
  const { isSuccess, data } = useAuthenticationQuery();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (isSuccess) setUser(data.data);
    else setUser(null);
  }, [data, isSuccess, setUser]);

  return (
    <>
      <GlobalShell>
        <Banner />
        <Board />
      </GlobalShell>
      <ThemeButton />
    </>
  );
};

export default Root;
