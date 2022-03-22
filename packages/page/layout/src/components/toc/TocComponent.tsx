import { styled } from '@mui/material/styles';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { TocLink } from './TocLink';

interface TocComponentProps {
  toc: Array<
    Omit<TocEntry, 'children'> & {
      isParent?: boolean;
    }
  >;
}

const TocList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0
});

export const TocComponent: FC<TocComponentProps> = ({ toc }) => {
  const { query, pathname } = useRouter();

  return (
    <TocList>
      {toc.map(tocItem => {
        return (
          <li key={tocItem.id}>
            <TocLink pathname={pathname} query={query} href={tocItem.id}>
              {tocItem.value}
            </TocLink>
          </li>
        );
      })}
    </TocList>
  );
};
