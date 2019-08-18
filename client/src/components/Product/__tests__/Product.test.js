import React from 'react';
import Product from '../Product';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

describe('Product', () => {
  let props;
  beforeAll(() => {
    props = {
      pid: '504815', 
      name:'Cutout stretch-jersey dress', 
      price: '1270', 
      designer: 'Donna Karan', 
      img: '//cache.net-a-porter.com/images/products/504815/504815_ou_sl.jpg'
    };
  })

  it('should match snapshot', async () => {
    const wrapper = mount(<MemoryRouter><Product {...props} /></MemoryRouter>);
    expect(wrapper.find(Product)).toMatchSnapshot();

});
  

})

