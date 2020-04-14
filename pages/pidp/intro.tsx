import React, { FC } from 'react';

import MDXContentLoader, { MDXContentLoaderProps } from '../../docs/src/modules/components/loader/MDXContentLoader';

const Page: FC<MDXContentLoaderProps> = ({ path }) => {
  return <MDXContentLoader path={path} disableToc />;
};

Page.defaultProps = {
  path: '/pidp/intro/'
};

export default Page;
