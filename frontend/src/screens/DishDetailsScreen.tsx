// src/screens/DishDetailsScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
  TouchableOpacity, ImageBackground, StatusBar
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderBar from '../components/HeaderBar';
import type { RootStackParamList } from '../navigation/types';
import type { Recipe } from '../types/recipe';

type Props = NativeStackScreenProps<RootStackParamList, 'DishDetails'>;

const DishDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipe } = route.params as { recipe: Recipe }; // nhận từ navigate('DishDetails', { recipe })

  // TODO: nếu có imageUrl trong Recipe, đổi sang { uri: recipe.imageUrl }
  const imageSource = require('../assets/images/dish2.png');

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.header}
        >
          <Image source={imageSource} style={styles.dishImage} />
        </ImageBackground>

        <View style={styles.detailsCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.dishName}>{recipe.title}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => { /* TODO: toggle favorite */ }}>
                <Icon name="favorite-border" size={30} color="#555" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { /* TODO: share */ }}>
                <Icon name="share" size={30} color="#555" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nếu có thời gian nấu trong Recipe, thêm field vào type và hiển thị ở đây */}
          {/* <View style={styles.infoContainer}>
            <Icon name="access-time" size={26} color="#888" />
            <Text style={styles.infoText}>{recipe.time ?? '—'}</Text>
          </View> */}

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.ingredientsText}>
            {recipe.ingredients?.length ? recipe.ingredients.join(', ') : '—'}
          </Text>

          <TouchableOpacity style={styles.viewStepsButton} onPress={() => {/* TODO: expand steps */}}>
            <Text style={styles.viewStepsText}>View steps</Text>
            <Icon name="play-arrow" size={26} color="#4CAF50" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Nutrition Facts</Text>
          <View style={styles.nutritionCard}>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>calories</Text>
              <Text style={styles.nutritionValue}>
                {recipe.nutrition?.calories !== undefined ? `${recipe.nutrition?.calories} kcal` : '—'}
              </Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>protein</Text>
              <Text style={styles.nutritionValue}>
                {recipe.nutrition?.protein_g !== undefined ? `${recipe.nutrition?.protein_g} g` : '—'}
              </Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>fat</Text>
              <Text style={styles.nutritionValue}>
                {recipe.nutrition?.fat_g !== undefined ? `${recipe.nutrition?.fat_g} g` : '—'}
              </Text>
            </View>
            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>carbs</Text>
              <Text style={styles.nutritionValue}>
                {recipe.nutrition?.carb_g !== undefined ? `${recipe.nutrition?.carb_g} g` : '—'}
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Steps</Text>
          {recipe.steps?.length ? (
            recipe.steps.map((s, i) => (
              <Text key={i} style={{ color: '#555', marginBottom: 8 }}>{`${i + 1}. ${s}`}</Text>
            ))
          ) : (
            <Text style={{ color: '#777' }}>—</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingTop: 100 },
  header: {
    height: 180, justifyContent: 'center', alignItems: 'center', marginTop: -100,
  },
  dishImage: {
    width: 180, height: 180, borderRadius: 90, borderWidth: 4, borderColor: '#fff',
  },
  detailsCard: {
    backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30,
    marginTop: -30, padding: 25, paddingTop: 35,
  },
  titleContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15,
  },
  dishName: { fontSize: 28, fontWeight: 'bold', color: '#4B5320' },
  iconContainer: { flexDirection: 'row' },
  infoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  infoText: { marginLeft: 8, fontSize: 18, color: '#555' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 10 },
  ingredientsText: { fontSize: 16, color: '#777', marginBottom: 20 },
  viewStepsButton: {
    backgroundColor: '#EFEFEF', borderRadius: 12, paddingVertical: 18, paddingHorizontal: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25,
  },
  viewStepsText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  nutritionCard: { backgroundColor: '#F5F5F5', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 10 },
  nutritionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
  },
  nutritionLabel: { fontSize: 17, color: '#555', textTransform: 'capitalize' },
  nutritionValue: { fontSize: 17, fontWeight: 'bold', color: '#FF6347' },
});

export default DishDetailsScreen;
