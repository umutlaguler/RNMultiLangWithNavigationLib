import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Router from './Router';
import { persistStore, persistReducer } from 'redux-persist';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import RootReducer from './src/reducers/RootReducer';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/es/integration/react';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const store = createStore(RootReducer, {}, applyMiddleware(ReduxThunk))
    const persisStore = persistStore(store)
    return (
      <Provider store={store}>
      <PersistGate persistor={persisStore}>
        <Router/>
       </PersistGate>
     </Provider>
    );
  }
}