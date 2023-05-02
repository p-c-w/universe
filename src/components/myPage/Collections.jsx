import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { CollectionButton, Collection } from './index';
import { BarLoader } from '../common';
import { useUserQuery } from '../../hooks/queries';
import { COLLECTION_BUTTON } from '../../constants';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

const ContentImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
  width: 30%;
`;

const Collections = () => {
  const [selected, setSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [category, setCategory] = useState('watch');

  const { isSuccess, data: collection } = useUserQuery({
    select: userInfo => userInfo[`${category.toLowerCase()}_list`],
  });

  return (
    <MyListContainer fluid p={0}>
      <Flex gap="0.8rem">
        {COLLECTION_BUTTON.map(button => (
          <CollectionButton
            key={button.label}
            onClick={() => {
              setCategory(`${button.label.toLowerCase()}`);
            }}
            selected={category === `${button.label.toLowerCase()}`}
            tooltip={button.description}>
            {button.label}
          </CollectionButton>
        ))}
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400}>
          <Suspense fallback={<BarLoader />}>
            {isSuccess && <Collection collection={collection} setSelected={setSelected} setImgSrc={setImgSrc} />}
          </Suspense>
        </ScrollArea>
        <Transition mounted={selected} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => <ContentImage open={selected} width={300} src={imgSrc} alt="content image" style={styles} />}
        </Transition>
      </Flex>
    </MyListContainer>
  );
};

export default Collections;
