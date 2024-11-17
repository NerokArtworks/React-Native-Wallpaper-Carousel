
import { View } from "react-native";
import Animated, { SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { _imageHeight, _imageWidth } from "@/constants/carousel";

interface PhotoProps {
    item: Photo,
    index: number,
    scrollX: SharedValue<number>
}

export default function Photo({ item, index, scrollX }: PhotoProps) {
    const stylez = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        scrollX.value,
                        [index - 1, index, index + 1],
                        [1.6, 1, 1.6]
                    )
                },
                {
                    rotate: `${interpolate(
                        scrollX.value,
                        [index - 1, index, index + 1],
                        [15, 0, -15]
                    )}deg`
                }
            ]
        }
    })

    return (
        <View style={{
            width: _imageWidth,
            height: _imageHeight,
            borderRadius: 16,
            overflow: 'hidden'
        }}>
            <Animated.Image
                source={{ uri: item.src.large }}
                style={[{ flex: 1 }, stylez]}
            />
        </View>
    )
}