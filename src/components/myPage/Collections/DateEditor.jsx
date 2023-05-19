import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import 'dayjs/locale/ko';
import { DatePickerInput } from '@mantine/dates';
import { Text, Flex, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import { categoryState, sideNavState, userState } from '../../../recoil/atom';
import { useUpdateModifiedAtMutation } from '../../../hooks/mutations';

const EditDate = styled(Badge)`
  cursor: pointer;
`;

const formatDate = date => date?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const timeOffset = new Date().getTimezoneOffset() * 60000;

const DateEditor = ({ id, date }) => {
  const middleScreen = useMediaQuery('(max-width: 64rem)');
  const smallScreen = useMediaQuery('(max-width: 44rem)');

  const isNavOpened = useRecoilValue(sideNavState);
  const email = useRecoilValue(userState);
  const category = useRecoilValue(categoryState);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const { mutate: updateModifiedAt } = useUpdateModifiedAtMutation();

  const editDate = () => {
    if (editMode) {
      const newDate = selectedDate.toISOString();

      updateModifiedAt({ email, list: 'history_list', id, value: newDate });
    }
    setEditMode(!editMode);
  };

  const cancelEditDate = () => {
    setEditMode(false);
    setSelectedDate(new Date(date));
  };

  const selectDate = e => {
    const offsetDate = new Date(e - timeOffset);

    setSelectedDate(offsetDate);
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Flex
      direction={(smallScreen || (middleScreen && isNavOpened)) && 'column'}
      align={smallScreen || (middleScreen && isNavOpened) ? 'start' : 'center'}
      gap={smallScreen ? 7 : 10}>
      {editMode ? (
        <DatePickerInput
          onClick={stopPropagation}
          size="xs"
          w={180}
          maw={400}
          locale="ko"
          valueFormat="YYYY. MM. DD"
          value={selectedDate}
          onChange={selectDate}
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
        />
      ) : (
        <Text size="sm">{formatDate(date)}에 추가함</Text>
      )}

      {category === 'history' &&
        (editMode ? (
          <Flex gap={5}>
            <EditDate size="sm" variant="filled" onClick={editDate}>
              수정 완료
            </EditDate>
            <EditDate size="sm" variant="outline" onClick={cancelEditDate}>
              수정 취소
            </EditDate>
          </Flex>
        ) : (
          <EditDate
            size="sm"
            variant="outline"
            onClick={() => {
              setEditMode(true);
            }}>
            날짜 수정
          </EditDate>
        ))}
    </Flex>
  );
};

export default DateEditor;
