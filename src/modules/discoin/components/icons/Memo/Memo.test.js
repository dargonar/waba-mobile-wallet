import React from 'react';
import { shallow } from 'enzyme';
import Memo from './Memo';

describe('<Memo />', () => {
  test('renders', () => {
    const wrapper = shallow(<Memo />);
    expect(wrapper).toMatchSnapshot();
  });
});
