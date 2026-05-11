import { Text, TextInput, View } from "react-native";
import { formStyles } from "../theme/appStyles";
import { Controller } from "react-hook-form";

export const FormField = ({
  label,
  name,
  control,
  rules,
  error,
  placeholder,
  multiline,
  inputStyle,
}: any) => {
  return (
    <View style={formStyles.fieldGroup}>
      <Text style={formStyles.fieldLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              formStyles.input,
              multiline && formStyles.inputMultiline,
              error && formStyles.inputError,
              inputStyle,
            ]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
          />
        )}
      />
      {error && <Text style={formStyles.errorText}>{error}</Text>}
    </View>
  );
};
