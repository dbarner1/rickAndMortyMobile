import { StyleSheet, View } from 'react-native';
import AccessibleText from '../../components/AccessibleText';

export default function Header() {
  return (
    <View style={styles.container}>
      <AccessibleText style={styles.text}>Rick & Morty Characters</AccessibleText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center' 
  },
  text: {
    fontWeight: 800, 
    fontSize: 25, 
    paddingBottom: 20, 
    justifyContent: 'center'
  }
})