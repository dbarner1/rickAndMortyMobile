import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  }
})