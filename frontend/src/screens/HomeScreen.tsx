// src/screens/HomeScreen.tsx - AI RECIPE GENERATOR (cleaned)
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS, Spacing, Radius, FontSize, Shadow } from '../ui/theme';
import { suggest } from '../api/recipes';
import type { AppTabParamList, RootStackParamList } from '../navigation/types';
import type { Recipe } from '../types/recipe';

// Navigation type: Tab (Home) + có thể đi tới Stack (DishDetails)
type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Split ingredients từ text
  const ingredients = useMemo(() => {
    return Array.from(
      new Set(
        text
          .split(/[,\n]/g)
          .map((x) => x.trim())
          .filter(Boolean)
      )
    );
  }, [text]);

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0 || loading) return;

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const res = await suggest(ingredients);
      // giả định API trả { recipe: Recipe }
      setRecipe(res.recipe as Recipe);
    } catch (err: any) {
      setError(err?.message || 'Cannot generate recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = () => {
    if (recipe) {
      navigation.navigate('DishDetails', { recipe });
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.topBackground}
          resizeMode="cover"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon name="account-circle" size={50} color={COLORS.accent} />
            </TouchableOpacity>
            <Text style={styles.greeting}>SmartChef AI 🍳</Text>
          </View>

          {/* Input ingredients */}
          <View style={styles.searchContainer}>
            <Icon name="restaurant" size={24} color={COLORS.primary} style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter ingredients (egg, beef, tomato...)"
              placeholderTextColor={COLORS.primary}
              value={text}
              onChangeText={(v) => {
                setText(v);
                if (error) setError(null);
              }}
              multiline
            />
          </View>

          {/* Ingredient chips */}
          {ingredients.length > 0 && (
            <View style={styles.chipsContainer}>
              {ingredients.map((ing) => (
                <View key={ing} style={styles.chip}>
                  <Text style={styles.chipText}>{ing}</Text>
                </View>
              ))}
            </View>
          )}
        </ImageBackground>

        {/* Generate button & Results */}
        <ScrollView
          style={styles.whiteSection}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[
              styles.generateButton,
              (ingredients.length === 0 || loading) && { opacity: 0.6 },
            ]}
            onPress={handleGenerateRecipe}
            disabled={ingredients.length === 0 || loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Icon name="auto-awesome" size={24} color={COLORS.white} />
                <Text style={styles.generateButtonText}>Generate Recipe</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Loading */}
          {loading && (
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>AI is cooking up something delicious...</Text>
            </View>
          )}

          {/* Error */}
          {!!error && !loading && (
            <View style={styles.errorCard}>
              <Icon name="error-outline" size={40} color={COLORS.error} />
              <Text style={styles.errorTitle}>Oops!</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Result */}
          {recipe && !loading && !error && (
            <View style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients:</Text>
                {recipe.ingredients?.map((ing, idx) => (
                  <Text key={`${ing}-${idx}`} style={styles.ingredientText}>
                    • {ing}
                  </Text>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Steps:</Text>
                {recipe.steps?.map((step, idx) => (
                  <Text key={`${idx}`} style={styles.stepText}>
                    {idx + 1}. {step}
                  </Text>
                ))}
              </View>

              <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetails}>
                <Text style={styles.viewDetailsText}>View Full Details</Text>
                <Icon name="arrow-forward" size={24} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>
          )}

          {/* Empty */}
          {!recipe && !loading && !error && ingredients.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="restaurant-menu" size={80} color={COLORS.lightGray} />
              <Text style={styles.emptyTitle}>Ready to Cook?</Text>
              <Text style={styles.emptyText}>
                Enter ingredients you have and let AI suggest amazing recipes!
              </Text>
            </View>
          )}
        </ScrollView>

        {/* ❌ Loại BottomMenuBar: đã có TabBar của AppTabs */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1 },
  topBackground: { paddingHorizontal: 20, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, marginLeft: 15 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: Radius.xlarge,
    paddingHorizontal: 15,
    ...Shadow.small,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, minHeight: 50, fontSize: FontSize.medium, color: COLORS.text },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: {
    backgroundColor: COLORS.white,
    borderRadius: Radius.round,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  chipText: { color: COLORS.accent, fontSize: FontSize.regular, fontWeight: '500' },
  whiteSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: Radius.xlarge,
    borderTopRightRadius: Radius.xlarge,
    marginTop: -20,
  },
  scrollContent: { padding: 20, paddingBottom: 100 },
  generateButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: Radius.large,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...Shadow.medium,
  },
  generateButtonText: { color: COLORS.white, fontSize: FontSize.large, fontWeight: 'bold' },
  loadingCard: { marginTop: 30, alignItems: 'center', padding: 30 },
  loadingText: { marginTop: 15, color: COLORS.textSecondary, fontSize: FontSize.medium, textAlign: 'center' },
  errorCard: {
    marginTop: 30,
    backgroundColor: '#FFF0F0',
    borderRadius: Radius.large,
    padding: 20,
    alignItems: 'center',
  },
  errorTitle: { fontSize: FontSize.heading, fontWeight: 'bold', color: COLORS.error, marginTop: 10 },
  errorText: { marginTop: 5, color: COLORS.error, fontSize: FontSize.regular, textAlign: 'center' },
  recipeCard: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: Radius.large,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  recipeTitle: { fontSize: FontSize.heading, fontWeight: 'bold', color: COLORS.accent, marginBottom: 15 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: FontSize.large, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  ingredientText: { fontSize: FontSize.regular, color: COLORS.textSecondary, marginBottom: 5 },
  stepText: { fontSize: FontSize.regular, color: COLORS.textSecondary, marginBottom: 8, lineHeight: 22 },
  viewDetailsButton: {
    backgroundColor: COLORS.lightGray,
    borderRadius: Radius.medium,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  viewDetailsText: { fontSize: FontSize.medium, fontWeight: 'bold', color: COLORS.text },
  emptyState: { marginTop: 60, alignItems: 'center', paddingHorizontal: 30 },
  emptyTitle: { fontSize: FontSize.heading, fontWeight: 'bold', color: COLORS.text, marginTop: 20 },
  emptyText: { fontSize: FontSize.medium, color: COLORS.textSecondary, textAlign: 'center', marginTop: 10, lineHeight: 22 },
});

export default HomeScreen;
