import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import {useTheme} from "react-native-paper";

type Props = {
  setCurrentIndex: (number) => void,
  data: any[]
}

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const INITIAL_INDEX = 0;

export default function ImageCarousel(props: Props) {
  const {colors} = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
    props.setCurrentIndex(index);
  }

  const styles = StyleSheet.create({
    // container: {backgroundColor: '#141518', paddingVertical: 20},
    carousel: {
      aspectRatio: 2.5,
      flexGrow: 0,
      marginBottom: 20,
      marginTop: 20
    },
    itemView: {
      backgroundColor: colors.surface,
      flex: 1,
    },
    item: {
      backgroundColor: colors.surface,
      flex: 1,
      elevation: 5,
      borderRadius: 20
    },
    image: {
      flex: 2,
      backgroundColor: colors.surface,
      borderRadius: 20,
      width: windowWidth*0.4,
      height: windowWidth*0.4
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 18,
    }
  });

  function renderItem({item, index}) {
    const {image} = item
    return (
      <View style={styles.itemView}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.item}
          onPress={() => {
            carouselRef.current.scrollToIndex(index);
          }}>
          <Image source={image} style={styles.image}/>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Carousel
        style={styles.carousel}
        data={props.data}
        renderItem={renderItem}
        itemWidth={0.4 * windowWidth}
        inActiveScale={0.7}
        inActiveOpacity={0.6}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        initialIndex={1}
        ref={carouselRef}
      />
    </View>
  );
}


