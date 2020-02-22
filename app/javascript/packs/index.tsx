// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../reducers'
import App from '../containers/App';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer)

document.addEventListener('DOMContentLoaded', () => {
  render
    (<Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
      document.body.appendChild(document.createElement('div')));
});
