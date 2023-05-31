import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';

const showNotification = (boolean, title, message = '알 수 없는 오류가 발생했습니다.') => {
  const icon = boolean ? <IconCheck /> : <IconX />;
  const color = boolean ? 'green' : 'red';

  notifications.show({
    withCloseButton: true,
    autoClose: 2000,
    title: `${title} ${boolean ? '성공' : '실패'}`,
    message,
    color,
    icon,
    loading: false,
  });
};

export default showNotification;
