import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { GlobalShell, ThemeButton } from '../components/common';
import { Banner, Board } from '../components/rootPage';
import { useAuthenticationQuery } from '../hooks/queries';
import { isLoginState } from '../recoil/atom';

const Root = () => {
  const { isSuccess } = useAuthenticationQuery();
  const setIsLogin = useSetRecoilState(isLoginState);

  useEffect(() => {
    if (!isSuccess) setIsLogin(true);
  }, [isSuccess, setIsLogin]);

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
