import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

const { width } = Dimensions.get("window");

//TouchableOpacity = give click action and opacity transformation
//onPress = like onClick
//Component<P,S> = p is proptype, s is statetype
export default class Todo extends Component<{
  id: number;
  text: string;
  isCompleted: boolean;
  deleteAction: (id: number) => void;
  completeTodo: (id: number) => void;
  uncompletedTodo: (id: number) => void;
  editUpdateToDo: (id: number, text: string) => void;
}> {
  state = { isEditing: false, isCompleted: false, editTodo: "" };
  toggleAction = () => {
    const { isCompleted, uncompletedTodo, completeTodo, id } = this.props;
    if (isCompleted) {
      completeTodo(id);
    } else {
      uncompletedTodo(id);
    }
  };

  edittingAction = () => {
    const { text } = this.props;
    this.setState({ isEditing: true, editTodo: text });
  };
  edittingFinish = () => {
    const { editTodo } = this.state;
    const { id, editUpdateToDo } = this.props;
    editUpdateToDo(id, editTodo);
    this.setState({ isEditing: false });
  };
  reactChange = (text: string) => {
    this.setState({ editTodo: text });
  };

  render() {
    const { isEditing, editTodo } = this.state;
    const { text, id, deleteAction, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleAction}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedColor : styles.unCompColor,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                isCompleted ? styles.textAniOn : styles.textAniOff,
              ]}
              value={editTodo}
              multiline={true}
              onChangeText={this.reactChange}
              onBlur={this.edittingFinish}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.textAniOn : styles.textAniOff,
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View>
            <TouchableOpacity onPress={this.edittingFinish}>
              <View style={styles.input}>
                <Text>ok</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.action}>
            <TouchableOpacity onPress={this.edittingAction}>
              <View style={styles.actionContainer}>
                <Text>edit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteAction(id)}>
              <View style={styles.actionContainer}>
                <Text>delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 80,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
  //borderRadius always should be the half of width and height
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 8,
  },
  completedColor: {
    borderColor: "#95a5a6",
  },
  unCompColor: {
    borderColor: "#f6e58d",
  },
  textAniOn: { color: "#95a5a6", textDecorationLine: "line-through" },
  textAniOff: { color: "black" },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
  },
  action: {
    flexDirection: "row",
  },
  actionContainer: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
  input: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
});
