import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from './Styles';
import Icons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductItems from '../../Common/ProductItems/ProductItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
// import { Modal } from 'react-native/Libraries/Modal/Modal';

const AddNewBill = () => {
  let navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState('false');
  const [addedItem, setAddedItem] = useState([]);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        json.map(item => {
          item.qty = 1;
        });
        setProducts(json);
      });
  }, []);

  const addItems = ind => {
    let temData = addedItem;
    // console.log(temData)
    if (temData.length > 0) {
      let isOld = false;
      temData.map(item => {
        if (item.id === products[ind].id) {
          item.qty = item.qty + 1;
          isOld = true;
          // console.log(item.qty);
        }
      });
      if (!isOld) {
        temData.push(products[ind]);
      }
    } else {
      temData.push(products[ind]);
    }

    let temp = [];
    temData.map(item => {
      temp.push(item);
    });
    setAddedItem(temp);
  };

  const ListData = ({item, index}) => {
    return (
      <ProductItems
        item={item}
        index={index}
        onClick={ind => {
          inputRef.current.clear();
          setSearch('');
          setModalVisible(false);
          addItems(ind);
        }}
      />
    );
  };

  const getTotal = () => {
    let total = 0;
    let tempData = addedItem;
    tempData.map(item => {
      // console.log(item)
      total = total + item.price * item.qty;
      // console.log(total)
    });
    return total.toFixed(2);
  };

  const filterItems = txt => {
    let tempData = products;
    let newData = tempData.filter(item => {
      return item.title.toLowerCase().includes(txt.toLowerCase());
    });
    if (newData.length > 0) {
      setProducts(newData);
    } else {
      setProducts(tempData);
    }
  };

  const saveBill = async () => {
    let data = [];

    let data2 = await AsyncStorage.getItem('bill');
    let json = JSON.parse(data2);
    data = json;

    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    // console.log(day + ' ', month + ' ', year + ' ');
    data.push({
      data: addedItem,
      billerName: name,
      billDate: ' ' + day + '/' + month + '/ ' + year,

      total: getTotal(),
    });
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem('bill', jsonData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icons
            name="arrow-back"
            size={24}
            color="black"
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icons
            name="add-circle-outline"
            size={24}
            color="black"
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>

      {addedItem.length > 0 ? (
        <FlatList
          data={addedItem}
          renderItem={({item, index}) => {
            return <ProductItems item={item} index={index} />;
          }}
        />
      ) : (
        <View style={styles.noitems}>
          <Text>No data Found</Text>
        </View>
      )}

      {addedItem.length > 0 && (
        <View style={styles.bottomView}>
          <Text style={styles.total}>{'Total:' + getTotal()}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setNameModalVisible(true)}>
            <Text style={styles.txt}>Submit Bill</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal transparent visible={modalVisible}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icons
              name="arrow-back"
              size={24}
              color="black"
              style={styles.icons}
            />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <AntDesign name="search1" size={24} color="black" />
            <TextInput
              placeholder="Search Item by Code"
              style={styles.input}
              value={search}
              ref={inputRef}
              onChangeText={txt => {
                setSearch(txt);
                filterItems(txt);
              }}
            />
          </View>
          <FlatList data={products} renderItem={ListData} />
        </View>
      </Modal>
      <Modal visible={nameModalVisible} transparent>
        <View style={styles.nameModalView}>
          <View style={styles.nameView}>
            <TextInput
              placeholder="Biller Name"
              value={name}
              onChangeText={txt => setName(txt)}
              style={styles.input2}
            />
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setNameModalVisible(false)}>
                <Text style={styles.cancelBtnTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  setNameModalVisible(false);
                  saveBill();
                }}>
                <Text style={styles.confirmBtnTxt}>Confirm Bill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddNewBill;
