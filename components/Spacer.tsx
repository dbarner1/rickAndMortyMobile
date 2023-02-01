import { View } from 'react-native';

export default function Spacer({height}: { height: number}): JSX.Element {
  return <View style={{ height}} />
}