import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlaceDetailScreen = () => {
    return (
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

PlaceDetailScreen.navigationOptions = navData =>{
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

export default PlaceDetailScreen