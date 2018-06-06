import React from 'react';
import { shallow } from 'enzyme';
import Wallet from './Wallet';

describe('<Wallet />', () => {
  test('renders', () => {
    const wrapper = shallow(<Wallet />);
    expect(wrapper).toMatchSnapshot();
  });
});
