import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import 'dayjs/locale/ko';
import { DatePickerInput } from '@mantine/dates';
import { Text, Flex, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import { sideNavState, userState } from '../../../recoil/atom';
import { useUpdateModifiedAtMutation } from '../../../hooks/mutations';
import { useCategory } from '../../../hooks';

const EditButton = styled(Badge)`
  cursor: pointer;
`;

const formatDate = date => date?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const timeOffset = new Date().getTimezoneOffset() * 60000;

const DateEditor = ({ id, date }) => {
  const middleScreen = useMediaQuery('(max-width: 64rem)');

  const isNavOpened = useRecoilValue(sideNavState);
  const email = useRecoilValue(userState);
  const [selectedCategory] = useCategory();
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
      direction={middleScreen && isNavOpened && 'column'}
      align={middleScreen && isNavOpened ? 'start' : 'center'}
      gap={10}>
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

      {selectedCategory === 'history' &&
        (editMode ? (
          <Flex gap={5}>
            <EditButton size="sm" variant="filled" onClick={editDate}>
              수정 완료
            </EditButton>
            <EditButton size="sm" variant="outline" onClick={cancelEditDate}>
              수정 취소
            </EditButton>
          </Flex>
        ) : (
          <EditButton
            size="sm"
            variant="outline"
            onClick={() => {
              setEditMode(true);
            }}>
            날짜 수정
          </EditButton>
        ))}
    </Flex>
  );
};

export default DateEditor;
