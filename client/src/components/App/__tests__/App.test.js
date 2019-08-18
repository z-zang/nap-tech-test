import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

let wrapper;
beforeEach(() => {
  wrapper = mount(
      <App />
    );
});

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.hydrate(wrapper , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot', async () => {
    expect(wrapper.find(App)).toMatchSnapshot();
  })
})
