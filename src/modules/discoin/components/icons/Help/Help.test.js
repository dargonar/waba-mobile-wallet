import React from 'react';
import { shallow } from 'enzyme';
import Help from './Help';

describe('<Help />', () => {
  test('renders', () => {
    const wrapper = shallow(<Help />);
    expect(wrapper).toMatchSnapshot();
  });
});
