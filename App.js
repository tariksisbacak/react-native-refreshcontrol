import {StatusBar} from 'expo-status-bar';
import {
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback, Linking
} from 'react-native';
import {useState, useEffect} from "react";

export default function App() {
    // Data from  jsonplaceholder
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_limit=3`)
            .then(res => res.json())
            .then(data => setPhotos(data));
    }, []);

    // Once the refresh method is applied, start the api request,
    // we will get the latest updated status etc etc
    // we will say get that data and update the state.

    const [refreshing, setRefreshing] = useState();
    const [photos, setPhotos] = useState();
    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
            // API Call with Refreshing
            fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_limit=4`)
                .then(res => res.json())
                .then(data => {
                    setPhotos(data)
                    setRefreshing(false);
                });

        }, 2000)

    }

    const openLink = (url) => {
        Linking.openURL(url);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{padding: 10}} refreshControl={
                <RefreshControl
                    tintColor={"red"}
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
            }
            >
                {photos && photos.map((photo, index) => (
                    <TouchableWithoutFeedback onPress={() => openLink(photo.url)}>
                        <View key={index} >
                            <View style={styles.photo}>
                                <Image style={styles.image} source={{uri: photo.thumbnailUrl}}/>
                                <Text style={styles.title}>{photo.title}</Text>
                                <Text style={styles.date}>{photo.id} day ago</Text>
                            </View>
                            <View style={styles.linkContent}>
                                <Text style={styles.linkUrl}>URL : {photo.url}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    photo: {
        backgroundColor: '#ededed',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 25,
        marginRight: 20,
    },
    title: {
        width: 180,
    },
    date: {
        marginLeft: 'auto',
        color: '#000'
    },
    linkContent: {
        backgroundColor: '#ededed',
        marginBottom: 10,
    },
    linkUrl: {
        backgroundColor: '#4caf501a',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
    }


});
