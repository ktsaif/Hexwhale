import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from 'react-native';
import { screenDiagonal, Header } from '../components/customcomponents'
import { Middleware } from '../components/middleware'
import { colors } from '../components/stylesheetfactory'
import Toast from 'react-native-simple-toast';

const dgl = screenDiagonal()
const List = ({ ...props }) => {
    const [loading, setLoading] = useState(true);
    const [Users, setUsers] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        getSlotList();
    }, []);

    const getSlotList = async () => {
        url = 'https://randomuser.me/api/?page=1&results=10&seed=abc'
        var value = {
            url: url,
            method: 'GET',
        }
        var resultMain = await Middleware(value) || [];
        if (resultMain) {
            setUsers(resultMain.results)
            setLoading(false)
        } else {
            Toast.show('Somthing went wrong, try again later!')
            setLoading(false)
        }
    }

    const goBackFn = () => {
        props.navigation.goBack()
    }

    function capitalSentence(word) {
        let words = String(word).toLowerCase();
        let w = words.charAt(0).toUpperCase() + words.substring(1);
        return w;
    }

    const renderUsersList = ({ item, index }) => {
        let name = item.name['title'] + '. ' + item.name['first'] + ' ' + item.name['first']
        return (
            <View style={styles.centerBox}>
                <View style={styles.imageWrap}>
                    <Image source={{ uri: item.picture['large'] }} style={styles.image} />
                </View>
                <View style={{ width: '68%', padding: 10 }}>
                    <Text style={styles.centerName} numberOfLines={1}>{name} </Text>
                    <Text style={styles.centerName} numberOfLines={1}>{item.email} </Text>
                    <Text>Genger: <Text style={styles.centerName} numberOfLines={1}>{capitalSentence(item.gender)} </Text></Text>
                    <Text>City: <Text style={styles.centerName} numberOfLines={1}>{item.location['city']} </Text></Text>
                </View>
            </View>
        )
    }

    const onRefresh = () => {
        setLoading(true);
        getSlotList()
    }

    const styles = StyleSheet.create({
        list: { backgroundColor: colors.backgroundColor, width: '100%' },
        screenWrap: { flex: 1, flexDirection: 'column', justifyContent: 'space-between' },
        centerBox: { padding: dgl * 0.010, backgroundColor: colors.backgroundColor, marginVertical: 8, elevation: 2, borderWidth: dgl * 0.0008, borderColor: colors.borderColor1, flexDirection: "row" },
        centerName: { color: '#242424', fontFamily: 'Poppins-Bold', fontSize: dgl * 0.016, paddingBottom: dgl * 0.0035 },
        centerWrap: { flex: 1, backgroundColor: colors.backgroundColor, paddingHorizontal: dgl * 0.02, paddingVertical: dgl * 0.02 },
        noData: { fontFamily: 'Poppins-Regular', fontSize: dgl * 0.015 },
        imageWrap: { width: '30%', justifyContent: "center", alignItems: "center" },
        image: { width: "100%", height: 100, resizeMode: "cover" }
    })

    const NoDataView = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: 'center', padding: dgl * 0.02 }}>
                <Text style={[styles.noData, { textAlign: 'center' }]}> Somthing went wrong, Try later. </Text>
            </View>
        )
    }

    return (
        <>
            <Header menu={true} title={'Users'} goBack={goBackFn} loading={loading} />
            <View style={styles.centerWrap}>
                <View style={styles.screenWrap}>
                    <FlatList
                        data={Users}
                        keyExtractor={(item, index) => item.login['uuid']}
                        contentContainerStyle={styles.list}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderUsersList}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={() => { return (<NoDataView />) }}
                    />
                </View>
            </View>
        </>
    );
}

export default React.memo(List);
