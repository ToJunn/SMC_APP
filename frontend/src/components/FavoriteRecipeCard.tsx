
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FavoriteRecipeCardProps {
  image: any;
  title: string;
  author?: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite: boolean;
}

const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({
  image,
  title,
  author,
  onPress,
  onFavoritePress,
  isFavorite,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        {author && <Text style={styles.author}>by {author}</Text>}
      </View>

      <TouchableOpacity onPress={onFavoritePress} style={styles.iconContainer}>
        <Icon
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={28}
          color={isFavorite ? '#DD643C' : '#BDBDBD'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 110,
    height: 110,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  iconContainer: {
    padding: 5,
  },
});

export default FavoriteRecipeCard;