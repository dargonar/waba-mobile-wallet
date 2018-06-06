import React from 'react';
import { shallow } from 'enzyme';
import Bank from './Bank';

describe('<Bank />', () => {
  test('renders', () => {
    const wrapper = shallow(<Bank />);
    expect(wrapper).toMatchSnapshot();
  });
});
