import { useColorScheme, Text } from 'react-native';

interface Props {
  children: string,
  style?: {}
}
export default function AccessibleText({ children, style }: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? 'white' : 'black';

  return (
    <Text accessible style={{ color, ...style }}>
      {children}
    </Text>
  )
}