import { Suspense, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { CollectionButton, Collection } from './index';
import { BarLoader } from '../common';
import { useUserQuery, useContentDetailQueries, useProviderQueries } from '../../hooks/queries';
import PROVIDERS from '../../constants/providers';

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

const getAddedDate = modifiedAt => modifiedAt.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const getCollection = (list, detailDatas, providersList) => {
  const middleCollection = list
    ?.map(item => ({
      id: item.id,
      modified_at: item.modified_at,
    }))
    ?.map(item => {
      const detailData = detailDatas?.find(data => data?.id === item.id);
      return { ...item, ...detailData };
    });

  return middleCollection?.map(item => {
    const providerById = providersList?.find(data => data?.id === item.id);

    return { ...item, ...providerById };
  });
};

const Collections = () => {
  const [selected, setSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [category, setCategory] = useState('watch');

  const { data } = useUserQuery({
    select: userInfo => userInfo[`${category.toLowerCase()}_list`],
  });
  console.log('data: ', `${category.toLowerCase()}_list`, data);

  // const { data } = useUserQuery({
  //   select: getUserInfo,
  // });
  const userCollectionList = data || [];
  console.log('userCollectionList: ', `${category.toLowerCase()}_list`, data);

  const contentQueries = useContentDetailQueries(userCollectionList, {
    enabled: !!userCollectionList.length,
    select: data => ({ id: data.id, title: data.title || data.name, posterPath: data.poster_path }),
  });
  console.log('contentQueries: ', contentQueries);

  const contentDetailDatas = [];
  contentQueries.forEach(query => {
    if (query.isSuccess) contentDetailDatas.push(query.data);
  });

  console.log('contentDetailDatas: ', contentDetailDatas);

  const providerQueries = useProviderQueries(userCollectionList, {
    enabled: !!userCollectionList.length,
    select: data => ({
      id: data.id,
      providers: data.results.KR.flatrate
        .map(provider => provider.provider_id)
        ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
    }),
  });
  // console.log('queries: ', queries);

  const providersWithContentId = [];
  providerQueries.forEach(query => {
    if (query.isSuccess) providersWithContentId.push(query.data);
  });
  console.log('providersWithContentId: ', providersWithContentId);

  // const { providers: providersWithContentId } = useProviderQueries(userCollectionList, {
  //   enabled: !!userCollectionList.length,
  //   select: data => ({ id: data.id, providers: data.results.KR.flatrate }),
  // });
  // console.log('providersWithContentId: ', providersWithContentId);

  const collection = getCollection(userCollectionList, contentDetailDatas, providersWithContentId);

  return (
    <MyListContainer fluid p={0}>
      <Flex gap="0.8rem">
        <CollectionButton
          onClick={() => {
            setCategory('watch');
          }}
          selected={category === 'watch'}
          tooltip="이번달에 보고있거나 볼 컨텐츠">
          Watch
        </CollectionButton>
        <CollectionButton
          onClick={() => {
            setCategory('like');
          }}
          selected={category === 'like'}
          tooltip="좋아요한 컨텐츠">
          Like
        </CollectionButton>
        <CollectionButton
          onClick={() => {
            setCategory('history');
          }}
          selected={category === 'history'}
          tooltip="내가 본 컨텐츠">
          History
        </CollectionButton>
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400}>
          <Suspense fallback={<BarLoader />}>
            <Collection collection={collection} setSelected={setSelected} setImgSrc={setImgSrc} />
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
