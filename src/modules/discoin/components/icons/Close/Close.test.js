import React from 'react';
import { shallow } from 'enzyme';
import Close from './Close';

describe('<Close />', () => {
  test('renders', () => {
    const wrapper = shallow(<Close />);
    expect(wrapper).toMatchSnapshot();
  });
});
