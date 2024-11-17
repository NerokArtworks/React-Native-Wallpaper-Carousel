
import { View, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { _imageWidth, _spacing } from "@/constants/carousel";
import Photo from "@/components/Photo";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import BackdropPhoto from "@/components/BackdropPhoto";
import { PEXELS_API_KEY } from "@/constants/api";

const uri = `https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait`;
const { width } = Dimensions.get('screen');

export function PexelsWallpapers() {
    const { data, isLoading } = useQuery<SearchPayload>({
        queryKey: ['wallpapers'],
        queryFn: async () => {
            const res = await fetch(uri, {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            }).then(res => res.json());
            return res;
        }
    });

    const scrollX = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
    })


    if (isLoading || !data) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={StyleSheet.absoluteFillObject}>
                {data.photos.map((photo, index) => {
                    return <BackdropPhoto photo={photo} index={index} scrollX={scrollX} key={index} />
                })}
            </View>
            <Animated.FlatList
                data={data.photos}
                keyExtractor={(item) => String(item.id)}
                horizontal={true}
                style={{ flexGrow: 0 }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={_imageWidth + _spacing}
                decelerationRate={'fast'}
                contentContainerStyle={{
                    gap: _spacing,
                    paddingHorizontal: (width - _imageWidth) / 2,
                }}
                renderItem={({ item, index }) => {
                    return <Photo item={item} index={index} scrollX={scrollX} />
                }}
                onScroll={onScroll}
                scrollEventThrottle={1000 / 60} // 16.6 ms
            />
        </View>
    )
}