import { useState, useEffect } from "react";
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
  onValueChange: (value: string) => void;
  currentValue?: string;
  invalid?: boolean;
  disabled?: boolean;
};

const CodeInput = ({
  onValueChange,
  currentValue = "",
  invalid = false,
  disabled = false,
}: Props) => {
  const [value, setValue] = useState(currentValue);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={currentValue}
        onChangeText={(text) => {
          setValue(text);
          onValueChange(text);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
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
