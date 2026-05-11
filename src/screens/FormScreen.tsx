import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { ScreenProps } from "../navigation/typeNavigation";
import { formStyles } from "../theme/appStyles";
import { SpeciesFormValues } from "../types/species";

type Props = ScreenProps<"Form">;

export const FormScreen = ({ route, navigation }: Props) => {
  const id = route.params?.speciesId;
  const isEditMode = id !== undefined;
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SpeciesFormValues>({
    defaultValues: {
      commonName: "",
      scientificName: "",
      habitat: "",
      imageUrl: "",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={formStyles.container}
        contentContainerStyle={formStyles.content}
      >
        {/* Imagen */}
        <TouchableOpacity style={formStyles.imagePicker} onPress={() => {}}>
          <View style={formStyles.imagePlaceholder}>
            <Text style={formStyles.imagePlaceholderIcon}>📸</Text>
            <Text style={formStyles.imagePlaceholderText}>
              Toca para agregar foto
            </Text>
          </View>
        </TouchableOpacity>

        <View style={formStyles.uploadingRow}>
          <ActivityIndicator size="small" color="#1a5c38" />
          <Text style={formStyles.uploadingText}>Subiendo imagen...</Text>
        </View>

        <View style={formStyles.form}>
          <View style={formStyles.fieldGroup}>
            <Text style={formStyles.fieldLabel}>Nombre común *</Text>
            <Controller
              control={control}
              name="commonName"
              rules={{ required: "El nombre común es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    formStyles.input,
                    errors.commonName && formStyles.inputError,
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Ej: Árbol de la quina"
                  placeholderTextColor="#aaa"
                />
              )}
            />
            {errors.commonName && (
              <Text style={formStyles.errorText}>
                {errors.commonName.message}
              </Text>
            )}
          </View>

          <View style={formStyles.fieldGroup}>
            <Text style={formStyles.fieldLabel}>Nombre científico *</Text>
            <Controller
              control={control}
              name="scientificName"
              rules={{ required: "El nombre científico es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    formStyles.input,
                    errors.scientificName && formStyles.inputError,
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Ej: Cinchona officinalis"
                  placeholderTextColor="#aaa"
                />
              )}
            />
            {errors.scientificName && (
              <Text style={formStyles.errorText}>
                {errors.scientificName.message}
              </Text>
            )}
          </View>

          <View style={formStyles.fieldGroup}>
            <Text style={formStyles.fieldLabel}>Hábitat *</Text>
            <Controller
              control={control}
              name="habitat"
              rules={{ required: "El hábitat es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    formStyles.input,
                    formStyles.inputMultiline,
                    errors.habitat && formStyles.inputError,
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Ej: Bosque andino, 2000-3500 msnm"
                  placeholderTextColor="#aaa"
                  multiline
                  numberOfLines={3}
                />
              )}
            />
            {errors.habitat && (
              <Text style={formStyles.errorText}>{errors.habitat.message}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[formStyles.saveBtn, saving && formStyles.saveBtnDisabled]}
          onPress={() => {}}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={formStyles.saveBtnText}>
              {isEditMode ? "💾  Guardar cambios" : "➕  Registrar especie"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
