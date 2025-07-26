import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';

const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="flex-row items-center">
      <Text variant="medium" className="text-farm-600 text-lg">
        ← Back
      </Text>
    </TouchableOpacity>
  );
};

export default BackButton; 