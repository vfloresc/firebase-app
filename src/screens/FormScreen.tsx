import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ScreenProps } from "../navigation/typeNavigation";
import { formStyles } from "../theme/appStyles";
import { SpeciesFormValues } from "../types/species";
import { FormField } from "../components/FormField";
import { useForm } from "react-hook-form";

type Props = ScreenProps<"Form">;

export const FormScreen = ({ route, navigation }: Props) => {
  const id = route.params?.speciesId;

  const isEditMode: boolean = id !== undefined;

  const [saving, setSaving] = useState(false);

  // Form state with default initial values
  const {
    control,
    handleSubmit,
    reset,
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
          <FormField
            label="Nombre común *"
            name="commonName"
            ontrol={control}
            rules={{ required: "El nombre común es obligatorio" }}
            error={errors.commonName?.message}
            placeholder="Ej: Árbol de la quina"
          />

          <FormField
            label="Nombre científico *"
            name="scientificName"
            ontrol={control}
            rules={{ required: "El nombre científico es obligatorio" }}
            error={errors.scientificName?.message}
            placeholder="Ej: Cinchona officinalis"
            inputStyle={{ fontStyle: "italic" }}
          />

          <FormField
            label="Hábitat *"
            name="habitat"
            ontrol={control}
            rules={{ required: "El hábitat es obligatorio" }}
            error={errors.habitat?.message}
            placeholder="Ej: Bosque andino, 2000-3500 msnm"
            multiline
          />
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
