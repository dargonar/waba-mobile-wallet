import React from 'react';
import { shallow } from 'enzyme';
import Transactions from './Transactions';

describe('<Transactions />', () => {
  test('renders', () => {
    const wrapper = shallow(<Transactions />);
    expect(wrapper).toMatchSnapshot();
  });
});
