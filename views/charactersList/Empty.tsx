import { StyleSheet, View } from 'react-native';
import AccessibleText from '../../components/AccessibleText';

export default function Empty() {
  return (
    <View style={styles.container}>
      <AccessibleText style={styles.pullToLoad}>
        Pull to load data
      </AccessibleText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 200
  },
  pullToLoad: { 
    fontWeight: '800'
  }
})