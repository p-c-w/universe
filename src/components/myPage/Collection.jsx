import { useRef } from 'react';
import { Group, Text, Accordion } from '@mantine/core';
import { useQueries } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Badge, CollectionButtons } from '../index';
import { fetchMediaContentDetails, fetchProvider } from '../../api';
import userState from '../../recoil/atom/userState';
import { PROVIDERS } from '../../constants';

const getAddedDate = modifiedAt => modifiedAt.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const AccordionLabel = ({ title, providers }) => {
  const getProvidersImgPath = providerIds =>
    providerIds.map(providerId => PROVIDERS.find(PROVIDER => PROVIDER.id === providerId)?.providerImgPath);

  return (
    <Group noWrap>
      <Badge src={getProvidersImgPath(providers)[0]} />
      <div>
        <Text>{title}</Text>
        <CollectionButtons />
      </div>
    </Group>
  );
};

const Collection = ({ category, setSelected, setImgSrc }) => {
  const user = useRecoilValue(userState);
  const userCollectionList = user[`${category.toLowerCase()}_list`];

  const detailQueries = userCollectionList?.map(item => ({
    queryKey: ['@collection', item],
    queryFn: () => fetchMediaContentDetails(item.type, item.id),
    select: item => ({ id: item.id, title: item.title || item.name, posterPath: item.poster_path }),
    suspense: true,
  }));

  const detailDatas = useQueries({
    queries: detailQueries,
  }).map(query => query.data);

  let collection = userCollectionList
    .map(item => ({
      id: item.id,
      modified_at: item.modified_at,
    }))
    .map(item => {
      const detailData = detailDatas.find(data => data.id === item.id);
      return { ...item, ...detailData };
    });

  const providerQueries = userCollectionList?.map(item => ({
    queryKey: ['@provider', item],
    queryFn: () => fetchProvider(item.type, item.id),
    select: item => ({ id: item.id, providers: item.results.KR.flatrate }),
    suspense: true,
  }));

  const providerDatas = useQueries({
    queries: providerQueries,
  }).map(query => query.data);

  const providers = providerDatas.map(data => ({
    ...data,
    providers: data.providers
      ?.map(provider => provider.provider_id)
      ?.filter(id => PROVIDERS.find(PROVIDER => PROVIDER.id === id)),
  }));

  collection = collection.map(item => {
    const providerById = providers.find(data => data.id === item.id);
    return { ...item, ...providerById };
  });

  const itemRef = useRef(null);

  const items = collection.map(item => (
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
