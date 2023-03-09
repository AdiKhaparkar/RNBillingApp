import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';

const MainScreen = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getBills();
  }, [isFocused]);

  const getBills = async () => {
    let data = await AsyncStorage.getItem('bill');
    let json = JSON.parse(data);
    // console.log(JSON.stringify(json));
    setBills(json);
  };

  const billData = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.billItem}>
        <Text style={styles.txtStyle}>{'Bill Name ' + item.billerName}</Text>
        <Text style={styles.txtStyle}>{'Bill Date' + item.billDate}</Text>
        <Text style={styles.txtStyle}>{'Bill Total Amount' + item.total}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {bills.length > 0 ? (
        <FlatList data={bills} renderItem={billData} />
      ) : (
        <View>
          <Image
            source={require('../../Images/nodata.png')}
            style={styles.noData}
          />
          <Text>No Bill Found</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddNewBill')}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
