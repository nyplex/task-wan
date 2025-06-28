import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#006EE9",
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  cellText: {
    color: "#006EE9",
    fontSize: 24,
    textAlign: "center",
  },
  invalidCellText: {
    color: "#FF0000",
    fontSize: 24,
    textAlign: "center",
  },
  invalidCellRoot: {
    borderBottomColor: "#FF0000",
  },
  focusCell: {
    borderBottomColor: "#006EE9",
    borderBottomWidth: 2,
  },
});

const CELL_COUNT = 6;

type Props = {
  onCodeFilled: (code: string) => void;
  invalid?: boolean;
  disabled?: boolean;
};

const CodeInput = ({ onCodeFilled, invalid = false, disabled = false }: Props) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  React.useEffect(() => {
    if (value.length === CELL_COUNT) {
      onCodeFilled(value);
    }
  }, [value, onCodeFilled]);

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles.cellRoot,
              isFocused && styles.focusCell,
              invalid && styles.invalidCellRoot,
            ]}>
            <Text style={!invalid ? styles.cellText : styles.invalidCellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
        editable={!disabled}
      />
    </View>
  );
};

export default CodeInput;
