import React from "react";

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

function App({ title }) {

    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    Title: {
        color: "#f2f2f2",
        fontSize: 28,
        fontWeight: 'bold'
    }
});

export default App;
