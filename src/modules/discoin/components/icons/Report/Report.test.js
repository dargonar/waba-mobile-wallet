import React from 'react';
import { shallow } from 'enzyme';
import Report from './Report';

describe('<Report />', () => {
  test('renders', () => {
    const wrapper = shallow(<Report />);
    expect(wrapper).toMatchSnapshot();
  });
});
