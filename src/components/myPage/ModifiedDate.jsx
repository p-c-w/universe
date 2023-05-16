import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import 'dayjs/locale/ko';
import { DatePickerInput } from '@mantine/dates';
import { Text, Flex, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import { categoryState, userState } from '../../recoil/atom';
import { formatDate } from '../../utils';
import { useUpdateModifiedAtMutation } from '../../hooks/mutations';

const EditDate = styled(Badge)`
  cursor: pointer;
`;

const offset = new Date().getTimezoneOffset() * 60000;

const ModifiedDate = ({ id, date }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  const email = useRecoilValue(userState);
  const category = useRecoilValue(categoryState);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const { mutate: updateModifiedAt } = useUpdateModifiedAtMutation();

  const handleEdit = () => {
    if (editMode) {
      const newDate = selectedDate.toISOString();

      updateModifiedAt({ email, list: 'history_list', id, value: newDate });
    }
    setEditMode(!editMode);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedDate(new Date(date));
  };

  const handleChange = e => {
    const offsetDate = new Date(e - offset);

    setSelectedDate(offsetDate);
  };

  const handleDatePicker = e => {
    e.stopPropagation();
  };

  return (
    <Flex direction={smallScreen && 'column'} align={smallScreen ? 'start' : 'center'} gap={smallScreen ? 7 : 10}>
      {editMode ? (
        <DatePickerInput
          onClick={handleDatePicker}
          size="xs"
          w={xsmallScreen ? 150 : 180}
          maw={400}
          locale="ko"
          valueFormat="YYYY. MM. DD"
          value={selectedDate}
          onChange={handleChange}
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
        />
      ) : (
        <Text size={xsmallScreen ? 'xs' : 'sm'}>{formatDate(date)}에 추가함</Text>
      )}

      {category === 'history' &&
        (editMode ? (
          <Flex gap={5}>
            <EditDate size="sm" variant="filled" onClick={handleEdit}>
              수정 완료
            </EditDate>
            <EditDate size="sm" variant="outline" onClick={handleCancel}>
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

export default ModifiedDate;
