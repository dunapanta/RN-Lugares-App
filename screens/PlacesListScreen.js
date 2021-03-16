import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton'

const PlacesListScreen = () => {
    return (
        <View>
            <Text>PlacesListScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Todos los Lugares',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Add Place"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={ () => {
                        navData.navigation.navigate('NewPlace')
                    }}
                />
            </HeaderButtons>
        )

    }
}

export default PlacesListScreen