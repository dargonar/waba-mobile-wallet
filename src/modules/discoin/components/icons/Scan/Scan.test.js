import React from 'react';
import { shallow } from 'enzyme';
import Scan from './Scan';

describe('<Scan />', () => {
  test('renders', () => {
    const wrapper = shallow(<Scan />);
    expect(wrapper).toMatchSnapshot();
  });
});
