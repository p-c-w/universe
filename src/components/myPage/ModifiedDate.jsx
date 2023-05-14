import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import 'dayjs/locale/ko';
import { DatePickerInput } from '@mantine/dates';
import { Text, Flex, Badge } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { categoryState, userState } from '../../recoil/atom';
import { formatDate } from '../../utils';
import { useUpdateModifiedAtMutation } from '../../hooks/mutations';

const EditDate = styled(Badge)`
  cursor: pointer;
`;

const offset = new Date().getTimezoneOffset() * 60000;

const ModifiedDate = ({ id, date }) => {
  const email = useRecoilValue(userState);
  const category = useRecoilValue(categoryState);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const handleChange = e => {
    const offsetDate = new Date(e - offset);

    setSelectedDate(offsetDate);
  };

  const { mutate: updateModifiedAt } = useUpdateModifiedAtMutation();

  const handleEditDateButton = () => {
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

  const handleDatePicker = e => {
    e.stopPropagation();
  };

  return (
    <Flex align="center" gap={10}>
      {editMode ? (
        <DatePickerInput
          onClick={handleDatePicker}
          size="xs"
          w={200}
          maw={400}
          locale="ko"
          valueFormat="YYYY. MM. DD"
          value={selectedDate}
          onChange={handleChange}
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
        />
      ) : (
        <Text size="sm">{formatDate(date)}에 추가함</Text>
      )}

      {category === 'history' &&
        (editMode ? (
          <Flex gap={5}>
            <EditDate size="sm" variant="filled" onClick={handleEditDateButton}>
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
