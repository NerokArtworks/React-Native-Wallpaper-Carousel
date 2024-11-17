import { StyleSheet } from "react-native";
import Animated, { SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";

interface BackdropPhotoProps {
    photo: Photo,
    index: number,
    scrollX: SharedValue<number>
}

export default function BackdropPhoto({ photo, index, scrollX }: BackdropPhotoProps) {
    const stylez = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0])
        }
    });

    return <Animated.Image
        source={{ uri: photo.src.large }} style={[StyleSheet.absoluteFillObject, stylez]} blurRadius={50}
    />
}