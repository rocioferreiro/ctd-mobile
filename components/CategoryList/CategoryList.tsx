import React from 'react';
import {View, Text} from "../Themed";
import {onuLogos, ONUObjectives} from "../ONUObjectives";
import {Card} from "react-native-paper";
import {Dimensions, Image, StyleSheet} from "react-native";

const CategoryList = () => {

    const styles = StyleSheet.create({
        container: {
          backgroundColor: 'rgba(0,0,0,0)'
        },
        card: {
            display: 'flex',
            borderRadius: 5,
            width: Dimensions.get('window').width * 0.8,
            height: Dimensions.get('window').height * 0.15,
            marginBottom: 10,
            marginTop: 10
        },
    });

    return (
        <View style={styles.container}>
            {Object.values(ONUObjectives).map((v, i) => {
                return (
                    <Card style={styles.card} key={i}>
                        <View>
                            <Text>{i}</Text>
                            <Image style={styles.image} source={onuLogos[i].image}/>
                        </View>
                    </Card>
                )
            })}
        </View>
    );
}
export default CategoryList;
