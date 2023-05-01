import { useState, useEffect, useRef } from 'react';
import { Text, Accordion } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { AccordionLabel } from './index';
import userState from '../../recoil/atom/userState';
import { useContentDetailQueries, useProviderQueries, useUserQuery } from '../../hooks/queries';

const getAddedDate = modifiedAt => modifiedAt.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const getCollection = (list, detailDatas, providersList) => {
  const middleCollection = list
    .map(item => ({
      id: item.id,
      modified_at: item.modified_at,
    }))
    .map(item => {
      const detailData = detailDatas.find(data => data.id === item.id);
      return { ...item, ...detailData };
    });

  return middleCollection.map(item => {
    const providerById = providersList?.find(data => data.id === item.id);

    return { ...item, ...providerById };
  });
};

const Collection = ({ collection, setSelected, setImgSrc }) => {
  console.log('collection22222: ', collection);
  // const { userInfo: userCollectionList } = useUserQuery({
  //   select: userInfo => userInfo[`${category.toLowerCase()}_list`],
  // });
  // console.log('collectionList: ', `${category.toLowerCase()}_list`, userCollectionList);

  // const [userCollectionList, setUserCollectionList] = useState(collectionList);

  // useEffect(() => {
  //   setUserCollectionList(collectionList);
  // }, [collectionList]);

  // const { contentDetailDatas } = useContentDetailQueries(userCollectionList, {
  //   enabled: !!userCollectionList,
  //   // select: data => ({ id: data.id, title: data.title || data.name, posterPath: data.poster_path }),
  // });
  // console.log('contentDetailDatas: ', contentDetailDatas);
  // const { providers: providersWithContentId } = useProviderQueries(userCollectionList, {
  //   enabled: !!userCollectionList,
  //   select: data => ({ id: data.id, providers: data.results.KR.flatrate }),
  // });

  // const collection = getCollection(userCollectionList, contentDetailDatas, providersWithContentId);

  const itemRef = useRef(null);

  const items = collection?.map(item => (
    <Accordion.Item value={item.title} key={item.id}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{getAddedDate(item.modified_at)}에 추가함</Text>
        <Text href="#" c="dimmed" fz="xs">
          상세페이지로
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  const handleChange = e => {
    itemRef.current = e;
    setSelected(itemRef.current !== null);
    setImgSrc(
      itemRef.current && `https://image.tmdb.org/t/p/w300${collection.find(item => item.title === e)?.posterPath}`
    );
  };

  return (
    <Accordion chevronPosition="right" variant="separated" sx={{ width: '100%' }} onChange={handleChange}>
      {items}
    </Accordion>
  );
};

export default Collection;
