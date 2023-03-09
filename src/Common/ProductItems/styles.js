import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    backgroundColor: '#fff',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  quantity: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
});
