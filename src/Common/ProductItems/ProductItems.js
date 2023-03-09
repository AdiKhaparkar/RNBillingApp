import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

const ProductItems = ({item, index, onClick}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onClick(index)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View>
        <Text style={styles.title}>
          {item.title.length > 20 ? item.title.substring(0, 20) : item.title}
        </Text>
        <Text style={styles.title}>{'₹' + item.price}</Text>
      </View>
      <Text style={[styles.title, styles.quantity]}>{'Qty:' + item.qty}</Text>
    </TouchableOpacity>
  );
};

export default ProductItems;
