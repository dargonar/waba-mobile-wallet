import React from 'react';
import { shallow } from 'enzyme';
import Cash from './Cash';

describe('<Cash />', () => {
  test('renders', () => {
    const wrapper = shallow(<Cash />);
    expect(wrapper).toMatchSnapshot();
  });
});
