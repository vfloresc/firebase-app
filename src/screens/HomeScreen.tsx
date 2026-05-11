import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { ScreenProps } from '../navigation/typeNavigation';
import { Species } from '../types/species';
import { homeStyles } from '../theme/appStyles';

type Props = ScreenProps<"Home">;

export const HomeScreen =({navigation}:Props)=> {

  // ── Render de cada tarjeta ────────────────────────────────────────────────
  const renderItem = ({commonName, habitat, imageUrl, scientificName}: Species ) => (
    <TouchableOpacity
      style={homeStyles.card}
      onPress={() => navigation.navigate('Detail', {speciesId: ''})}
      activeOpacity={0.85}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={homeStyles.thumbnail} />
      ) : (
        <View style={[homeStyles.thumbnail, homeStyles.placeholder]}>
          <Text style={homeStyles.placeholderText}>🌿</Text>
        </View>
      )}

      <View style={homeStyles.cardInfo}>
        <Text style={homeStyles.commonName}>{commonName}</Text>
        <Text style={homeStyles.scientificName}>{scientificName}</Text>
        <Text style={homeStyles.habitat}>{habitat}</Text>
      </View>

      <View style={homeStyles.cardActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Form', {})}
          style={homeStyles.editBtn}
        >
          <Text style={homeStyles.editBtnText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={homeStyles.deleteBtnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={homeStyles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item) => item}
        renderItem={({ item })=>item}
        contentContainerStyle={homeStyles.list}
        ListEmptyComponent={
          <View style={homeStyles.center}>
            <Text style={homeStyles.emptyText}>
              No hay especies registradas.
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={homeStyles.fab}
        onPress={() => navigation.navigate('Form', {})}
      >
        <Text style={homeStyles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

