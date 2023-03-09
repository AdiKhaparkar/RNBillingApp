import {StyleSheet, Dimensions} from 'react-native';
import {THEME_COLOR} from '../../Common/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
  },
  noData: {
    width: 100,
    height: 100,
  },
  billItem: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginTop: 20,
    height: 100,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  txtStyle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 2,
  },
});
