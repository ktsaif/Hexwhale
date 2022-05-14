import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { screenDiagonal, CustomTextInput, CommonButton } from '../components/customcomponents'
import { colors } from '../components/stylesheetfactory'
import Toast from 'react-native-simple-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

const dgl = screenDiagonal()
const Login = ({ ...props }) => {
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();

    useEffect(() => {
        Toast.show('Welcome');
    }, []);

    const handleLogin = async () => {
        if (Username != undefined) {
            if (Password != undefined) {
                if (Username === 'admin' && Password === '12345678') {
                    props.navigation.navigate('List')
                } else {
                    Toast.show("Please enter valid username and password.")
                }
            } else {
                Toast.show("Please enter your password.")
            }
        } else {
            Toast.show("Please enter your username.")
        }
    }

    const styles = StyleSheet.create({
        mainWrap: { flex: 1, backgroundColor: colors.backgroundColor, width: '100%', alignItems: "center", marginTop: dgl * 0.18 },
        scroll: { alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: colors.backgroundColor },
        innerWrap: { backgroundColor: colors.backgroundColor },
        titleContainer: { alignItems: "center", width: "70%", marginBottom: dgl * 0.02 },
        title1: { fontFamily: 'Poppins-Bold', color: '#757575', fontSize: dgl * 0.028 },
        title2: { fontFamily: 'Poppins-Regular', color: '#262626', fontSize: dgl * 0.018, paddingVertical: dgl * 0.02, textAlign: "center" },
        text: { fontFamily: 'Poppins-SemiBold', color: '#757575', fontSize: dgl * 0.014, textAlign: "center" },
        register: { fontFamily: 'Poppins-SemiBold', color: colors.buttonColor, fontSize: dgl * 0.014, textAlign: "center" },
        recover: { flexDirection: "row", width: "83%", justifyContent: "flex-end", paddingTop: dgl * 0.02, paddingBottom: dgl * 0.03 },
        reg: { flexDirection: "row", width: "83%", paddingVertical: dgl * 0.05 }
    })

    return (
        <ScrollView style={{ backgroundColor: colors.backgroundColor }} contentContainerStyle={styles.scroll}>
            <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
            <View style={styles.mainWrap}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title1}>Hello Again!</Text>
                    <Text style={styles.title2}>Wellcome back you've been missed!</Text>
                </View>
                <CustomTextInput
                    label={'Username *'}
                    placeholder={'Username'}
                    onChangeText={(text) => setUsername(text)}
                    value={Username}
                />
                <CustomTextInput
                    label={'Password *'}
                    placeholder={'Password'}
                    onChangeText={(text) => setPassword(text)}
                    value={Password}
                />
                <TouchableOpacity style={styles.recover}>
                    <Text style={styles.text}>Recovery Password</Text>
                </TouchableOpacity>
                <CommonButton
                    onPress={handleLogin}
                    text={'Sign in'}
                />
                <TouchableOpacity style={styles.reg}>
                    <Text style={styles.text}>Not a memeber ? <Text style={styles.register}>Register now</Text></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default React.memo(Login);
