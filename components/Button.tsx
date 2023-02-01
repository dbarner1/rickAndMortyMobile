import { Pressable, StyleSheet } from 'react-native';
import AccessibleText from './AccessibleText'; 

interface Props {
  title: string;
  onPress: any;
  style?: {};
}
export default function Button({ onPress, style, title }: Props) {
  return (
    <Pressable style={{ ...styles.container, ...style }} onPress={onPress}>
      <AccessibleText style={styles.title}>{title}</AccessibleText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    backgroundColor: 'blue', 
    width: 100, 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 40,
  },
  title: {
    color: 'white'
  }
})