import React from 'react';
import { shallow } from 'enzyme';
import Currency from './Currency';

describe('<Currency />', () => {
  test('renders', () => {
    const wrapper = shallow(<Currency />);
    expect(wrapper).toMatchSnapshot();
  });
});
