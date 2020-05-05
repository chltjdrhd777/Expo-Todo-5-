import React, { Component } from "react";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import Todo from "./Todo";

//get the scale of window's hegiht and width
const { width } = Dimensions.get("window");

interface StateType {
  newState: string;
  loadedTodos: boolean;
  toDos: {
    [x: number]: {
      id: number;
      isCompleted: boolean;
      text: any;
      createdAt: number;
    };
  };
}

export default class App extends Component {
  state: StateType = { newState: "", loadedTodos: false, toDos: {} };
  /////////////function storage///////////////////////////
  stateUpdate = (text: string) => {
    this.setState({ newState: text });
  };

  addTodo = () => {
    const { newState } = this.state;
    if (newState !== "") {
      this.setState((preState: StateType) => {
        const ID = Math.random();
        const newTodoObj = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newState,
            createdAt: Math.random(),
          },
        };
        const updatedState = {
          ...preState,
          newState: "",
          toDos: {
            ...preState.toDos,
            ...newTodoObj,
          },
        };
        return { ...updatedState };
      });
    } else if (newState === "") {
      alert("input Something");
    }
  };

  deleteTodo = (id: number) => {
    this.setState((preState: StateType) => {
      const allToDos = preState.toDos;
      delete allToDos[id];
      const updatedState = {
        ...preState,
        ...allToDos,
      };
      return { ...updatedState };
    });
  };

  completeTodo = (id: number) => {
    this.setState((preState: StateType) => {
      const updateCompleteTodo = {
        ...preState,
        toDos: {
          ...preState.toDos,
          [id]: { ...preState.toDos[id], isCompleted: false },
        },
      };
      return { ...updateCompleteTodo };
    });
  };

  uncompletedTodo = (id: number) => {
    this.setState((preState: StateType) => {
      const updateUncompleteTodo = {
        ...preState,
        toDos: {
          ...preState.toDos,
          [id]: { ...preState.toDos[id], isCompleted: true },
        },
      };
      return { ...updateUncompleteTodo };
    });
  };

  editUpdateToDo = (id: number, text: string) => {
    this.setState((preState: StateType) => {
      const updateUncompleteTodo = {
        ...preState,
        toDos: {
          ...preState.toDos,
          [id]: { ...preState.toDos[id], text: text },
        },
      };
      return { ...updateUncompleteTodo };
    });
  };
  /////////////////////////////////////////////////////

  //////////////loading action/////////////////////////
  loadTodos = () => {
    this.setState({ loadedTodos: true });
  };
  componentDidMount = () => {
    this.loadTodos();
  };
  /////////////////////////////////////////////////////

  //onSubmitEditing = like <Form onSubmit={}>
  render() {
    const { newState, loadedTodos, toDos } = this.state;

    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f6e58d" />
        <Text style={styles.title}>Todo</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.inputStyle}
            placeholder={"What I have to do now"}
            placeholderTextColor={"#f53b57"}
            autoCorrect={false}
            value={newState}
            onChangeText={this.stateUpdate}
            onSubmitEditing={this.addTodo}
          />
          <ScrollView contentContainerStyle={styles.list}>
            {Object.values(toDos).map((everyObj) => (
              <Todo
                key={everyObj.id}
                {...everyObj}
                deleteAction={this.deleteTodo}
                completeTodo={this.completeTodo}
                uncompletedTodo={this.uncompletedTodo}
                editUpdateToDo={this.editUpdateToDo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6e58d",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#ff7979",
    flex: 1,
    width: width - 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },
  inputStyle: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eb2f06",
    fontSize: 25,
  },

  title: {
    color: "#6ab04c",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  list: {
    alignItems: "center",
  },
});
