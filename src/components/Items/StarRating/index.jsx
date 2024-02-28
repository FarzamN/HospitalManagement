import React from 'react';
import {style} from './style';
import Star from 'react-native-star-rating';

const StarRating = ({
  rating,
  selectedStar,
  disable,
  size = 30,
  styles = style.starContainer,
}) => {
  return (
    <Star
      maxStars={5}
      disabled={disable}
      fullStar="star"
      rating={rating}
      iconSet="Entypo"
      emptyStar="star-outlined"
      starSize={size}
      animation="swing"
      fullStarColor="#5F78FF"
      emptyStarColor="#5F78FF"
      selectedStar={selectedStar}
      containerStyle={styles}
    />
  );
};

export default StarRating;
