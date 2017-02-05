import React, { Component } from 'react';
import {StyleSheet,Text,View} from 'react-native';
import store from './Store'
import {Components} from './Components'
import {Dispatcher} from './Dispatcher'
import {Provider, connect} from 'react-redux'
import {Dispatch} from 'redux'

const TodoAppComponent = connect(
    (store: any) => {return {state: store.todo}},
    (dispatch: Dispatch<any>) => {return {actions: new Dispatcher(dispatch)}}
)(Components)

export default class App extends Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <TodoAppComponent />
            </Provider>
        )
    }
}