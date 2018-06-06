import React from 'react';
import { shallow } from 'enzyme';
import Beer from './Beer';

describe('<Beer />', () => {
  test('renders', () => {
    const wrapper = shallow(<Beer />);
    expect(wrapper).toMatchSnapshot();
  });
});
