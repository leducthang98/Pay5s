import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text,Dimensions } from 'react-native';
import * as COLOR from '../../constant/Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Loading(props) {
    const loading = props.isLoading
    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={COLOR.PURPLE_FONTCOLOR} />
                <Text style={styles.textLoading}>Loading</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099',
        position: 'absolute',
        elevation: 8,
    },
    loadingContainer: {
        width: width * 0.8,
        height: height / 10,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingLeft: 10,
        opacity: 1,
    },
    textLoading: {
        fontSize: 14,
        marginLeft: 10,
    },
});
