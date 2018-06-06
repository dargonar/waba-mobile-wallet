import React from 'react';
import { shallow } from 'enzyme';
import Policy from './Policy';

describe('<Policy />', () => {
  test('renders', () => {
    const wrapper = shallow(<Policy />);
    expect(wrapper).toMatchSnapshot();
  });
});
