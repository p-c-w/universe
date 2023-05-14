import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { DatePickerInput } from '@mantine/dates';
import { Text, Flex, Badge } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { categoryState, userState } from '../../recoil/atom';
import { formatDate } from '../../utils';
import { useUpdateModifiedAtMutation } from '../../hooks/mutations';

const EditDate = styled(Badge)`
  cursor: pointer;
`;

const ModifiedDate = ({ id, date }) => {
  const email = useRecoilValue(userState);
  const category = useRecoilValue(categoryState);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const { mutate: updateModifiedAt } = useUpdateModifiedAtMutation();

  const handleEditDateButton = () => {
    if (editMode) {
      const newDate = new Date(Date.parse(selectedDate) + 86400000).toISOString();

      updateModifiedAt({ email, list: 'history_list', id, value: newDate });
    }
    setEditMode(!editMode);
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
          value={selectedDate}
          onChange={setSelectedDate}
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
        />
      ) : (
        <Text size="sm">{formatDate(date)}에 추가함</Text>
      )}

      {category === 'history' && (
        <EditDate size="sm" variant={editMode ? 'filled' : 'outline'} onClick={handleEditDateButton}>
          {editMode ? '수정 완료' : '날짜 수정'}
        </EditDate>
      )}
    </Flex>
  );
};

export default ModifiedDate;
