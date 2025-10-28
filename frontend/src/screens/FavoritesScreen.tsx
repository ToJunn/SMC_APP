// src/screens/FavoritesScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';
// import BottomMenuBar from '../components/BottomMenuBar';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

const FAVORITE_RECIPES = [
  {
    id: '1',
    title: 'Dish name',
    author: 'user',
    image: require('../assets/images/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg'),
  },
  {
    id: '2',
    title: 'Another Dish',
    author: 'user',
    image: require('../assets/images/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg'),
  },
  {
    id: '3',
    title: 'Pasta Special',
    author: 'user',
    image: require('../assets/images/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg'),
  },
  {
    id: '4',
    title: 'Healthy Salad',
    author: 'user',
    image: require('../assets/images/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg'),
  },
  {
    id: '5',
    title: 'Healthy Salad',
    author: 'user',
    image: require('../assets/images/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg'),
  },
  {
    id: '',
    title: 'Healthy Salad',
    author: 'user',
    image: require('../assets/images/how-to-make-a-simple-salad-recipe-vegan-gluten-free-lunch_260-main_img_6804-lrcc.jpg'),
  },
];

const FavoritesScreen = () => {

  return (
  <View style={styles.background}>
    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.topBackground}
        resizeMode="cover">
        <Text style={styles.title}>YOUR FAVORITE RECIPES</Text>
        <View style={styles.searchBarContainer}>
          <SearchBar placeholder="Find your recipes..." />
        </View>
      </ImageBackground>

      <View style={styles.whiteSection}>
        <FlatList
          data={FAVORITE_RECIPES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FavoriteRecipeCard
              title={item.title}
              author={item.author}
              image={item.image}
              onPress={() => console.log('Card pressed:', item.title)}
              onFavoritePress={() => console.log('Favorite pressed:', item.title)}
              isFavorite={true}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>

    </SafeAreaView>
  </View>
);

};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  topBackground: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  whiteSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'BowlbyOneSC-Regular',
  },
searchBarContainer: {
  width: '100%',
  paddingHorizontal: 20,
  marginTop: 10,
},
  listContent: {
    paddingBottom: 50,
  },
});


export default FavoritesScreen;