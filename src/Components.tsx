import * as React from 'react'
import {Component} from 'react'
import {AppState, Todo} from './State'
import {Dispatcher} from './Dispatcher'
import {StyleSheet, View,ListView, Text, TextInput, Button, ListViewDataSource,TouchableHighlight } from 'react-native'

//---------------------------
// TODO 1アイテム
//---------------------------
interface TodoComponentProps{
    todo: Todo
    actions: Dispatcher
}
class TodoComponent extends Component<TodoComponentProps, {}> {
    handleClick() {
        this.props.actions.complete(this.props.todo)
    }
    render() {
        var todo = this.props.todo
        return (
            <TouchableHighlight onPress={this.handleClick.bind(this)} 
                underlayColor='#ffffff'>
                <Text style=
                    {todo.completed ?
                        TodoComponentStyles.textToggle:TodoComponentStyles.textNone} >
                    {todo.text}
                </Text>
            </TouchableHighlight>
        )
    }
}
const TodoComponentStyles = StyleSheet.create({
    textToggle:{
        textDecorationLine: 'line-through',
        fontSize: 50,
    }as React.ViewStyle,
    textNone:{
        fontSize: 50,
    }as React.ViewStyle,
});

//---------------------------
// TODOリスト
//---------------------------
interface TodoListComponentProps{
    state: AppState
    actions: Dispatcher
}
class TodoListComponent extends Component<TodoListComponentProps, {}> {
    constructor(props: TodoListComponentProps) {
        super(props)
    }
    render() {
        const ds = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2})
        const dataSource = ds.cloneWithRows(this.props.state.todos)
        return (
            <ListView
                dataSource={dataSource}
                renderRow={(todo) => 
                    <TodoComponent todo={todo} actions={this.props.actions}/>}
            />
        )
    }
}

//---------------------------
// TODOの入力フォーム
//---------------------------
interface TodoFormComponentProps{
    actions: Dispatcher
}
interface TodoFormComponentState{
    text:string
}
class TodoFormComponent extends Component<TodoFormComponentProps, TodoFormComponentState> {
    constructor(props: TodoFormComponentProps) {
        super(props)
        this.state = {
            text: '',
        }
    }
    private handleSubmit(e: React.SyntheticEvent<{}>) {
        const textValue = this.state.text
        var todo = new Todo(textValue,false)
        this.props.actions.add(todo)
        this.setState({text: ''})
    }
    render() {
        return (
            <View style={TodoFormComponentStyles.view} >
                <TextInput
                    onChangeText={(text) => {this.setState({text})}}
                    value={this.state.text}
                    style={TodoFormComponentStyles.textInput}
                />
                <Button title='追加' color='#841584' onPress={this.handleSubmit.bind(this)} />
            </View>
        )
    }
}
const TodoFormComponentStyles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        marginTop: 50
    }as React.ViewStyle,
    textInput:{
        flex: 1,
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1
    }as React.ViewStyle,
});

//---------------------------
// TODOアプリ全体
//---------------------------
interface ComponentsProps{
    state: AppState
    actions: Dispatcher
}
export class Components extends React.Component<ComponentsProps, {}> {
    render(){
        return (
            <View>
                <TodoFormComponent actions={this.props.actions}/>
                <TodoListComponent actions={this.props.actions} 
                    state={this.props.state}/>
            </View>
        )
    }
}