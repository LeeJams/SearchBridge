import { useNavigation } from "@react-navigation/native";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Text,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";

const MemoInputModal = forwardRef((props, ref) => {
  const [enteredMemo, setEnteredMemo] = useState("");
  const [warning, setWarning] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  function openModal() {
    setModalIsVisible(true);
  }

  function memoInputHandler(enteredText) {
    if (enteredText.length > 0) {
      setWarning(false);
    }
    setEnteredMemo(enteredText);
  }

  function addMemoHandler() {
    if (enteredMemo.length === 0) {
      setWarning(true);
      return;
    }
    props.onAddMemo(enteredMemo);
    setEnteredMemo("");
    setModalIsVisible(false);
    navigation.navigate("Main");
  }
  function modalCloseHandler() {
    setEnteredMemo("");
    setWarning(false);
    setModalIsVisible(false);
  }

  return (
    <Modal visible={modalIsVisible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView behavior="padding" style={styles.modalOverlay}>
        <Pressable
          onPress={modalCloseHandler}
          style={styles.modalPressOverlay}
        ></Pressable>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="검색어를 입력해주세요."
            onChangeText={memoInputHandler}
            value={enteredMemo}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
          />
          {warning && (
            <Text style={styles.warningText}>내용을 입력해주세요.</Text>
          )}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="취소" onPress={modalCloseHandler} />
            </View>
            <View style={styles.button}>
              <Button title="추가" onPress={addMemoHandler} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

export default MemoInputModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalPressOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    shadowOpacity: 0.25,
    paddingBottom: 50,
    elevation: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ececec",
    backgroundColor: "#ececec",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    width: 100,
    marginHorizontal: 10,
  },
  warningText: {
    alignSelf: "flex-start",
    color: "#ea4747",
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 5,
  },
});