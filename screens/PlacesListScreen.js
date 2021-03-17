import React from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'

const PlacesListScreen = ({ navigation }) => {
    const places  = useSelector(state => state.places.places)

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={ItemData => (
                <PlaceItem 
                    image={ItemData.item.imageUri}
                    title={ItemData.item.title}
                    address={null}
                    onSelect={ () => {
                        navigation.navigate('PlaceDetail', {
                            placeTitle: ItemData.item.title,
                            placeId: ItemData.item.id
                        })
                    }}

                />
            )}
        />
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