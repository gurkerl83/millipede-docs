import { Processor, Transformer } from 'unified';

import { Options, transform } from './transform';

const attacher = (processor: Processor, options?: Options): Transformer => {
  return transform({ minDepth: 2 });
};

export default attacher;
