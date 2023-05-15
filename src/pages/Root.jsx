import { GlobalShell } from '../components/common';
import { Banner, Board } from '../components/rootPage';
import { useAuthenticationQuery } from '../hooks/queries';

const Root = () => {
  const { isLogin } = useAuthenticationQuery();

  return (
    <>
      <GlobalShell>
        {!isLogin && <Banner />}
        <Board />
      </GlobalShell>
    </>
  );
};

export default Root;
