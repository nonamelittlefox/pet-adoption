import React from 'react';
import renderer from 'react-test-renderer';

import BaseButton from 'src/components/Button/BaseButton';

describe('<BaseButton />', () => {
  it('Test render', async () => {
    const tree = renderer.create(<BaseButton />).toJSON();
    console.log(tree);
  });
});
