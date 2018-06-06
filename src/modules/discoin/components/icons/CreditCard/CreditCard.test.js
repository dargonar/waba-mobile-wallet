import React from 'react';
import { shallow } from 'enzyme';
import CreditCard from './CreditCard';

describe('<CreditCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreditCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
