import React from 'react';
import { shallow } from 'enzyme';
import DebitCard from './DebitCard';

describe('<DebitCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<DebitCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
