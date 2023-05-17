import { GlobalShell } from '../components/common';
import { Banner, Board, TopButton } from '../components/rootPage';
import { BUTTON_START_Y } from '../constants';
import { useAuthenticationQuery } from '../hooks/queries';

const Root = () => {
  const { isLogin } = useAuthenticationQuery();

  return (
    <>
      <GlobalShell>
        {!isLogin && <Banner />}
        <Board />
      </GlobalShell>
      <TopButton boundary={BUTTON_START_Y} />
    </>
  );
};

export default Root;
