import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { DatePickerInput } from '@mantine/dates';
import { Text, Flex, Badge } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { categoryState } from '../../recoil/atom';
import { formatDate } from '../../utils';

const EditButton = styled(Badge)`
  cursor: pointer;
`;

const ModifiedDate = ({ date }) => {
  const category = useRecoilValue(categoryState);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const handleEditDateButton = () => {
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

      {category === 'history' &&
        (!editMode ? (
          <EditButton size="sm" variant="outline" onClick={handleEditDateButton}>
            날짜 수정
          </EditButton>
        ) : (
          <EditButton size="sm" variant="filled" onClick={handleEditDateButton}>
            수정 완료
          </EditButton>
        ))}
    </Flex>
  );
};

export default ModifiedDate;
