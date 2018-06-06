import React from 'react';
import { shallow } from 'enzyme';
import Coffee from './Coffee';

describe('<Coffee />', () => {
  test('renders', () => {
    const wrapper = shallow(<Coffee />);
    expect(wrapper).toMatchSnapshot();
  });
});
