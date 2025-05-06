import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../contexto/UsuarioContexto';

export default function Home({ navigation }) {
    const theme = useTheme();

    const {user, profile, logout, isAdm} = useUser();

    const home_logout = async() => {
        await logout();

        navigation.navigate('Login');
    }

    // console.log(isAdm());

    return (
        <LinearGradient colors={['#DFF5EB', '#FFFFFF']} style={styles.container}>
            <View style={styles.centered}>
                <Image
                    source={require('../../assets/marca_pb.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Guia Acadêmico</Text>
                <Text variant="titleMedium" style={styles.username}>Olá, {profile?.nome + "!" || " Visitante"}</Text>

                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Cursos')}
                    style={styles.botao}
                >
                    Ver Cursos
                </Button>

                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Eventos')}
                    style={styles.botao}
                >
                    Ver Eventos
                </Button>

                {user && isAdm() === true && 
                    (<Button
                        mode="contained-tonal"
                        buttonColor={theme.colors.third}
                        textColor='#ffffff'
                        onPress={() => navigation.navigate('FormNovoEvento')}
                        style={styles.botao}
                    > 
                        Novo evento 
                    </Button>)
                }

                <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('Sobre')}
                    style={styles.botao}
                >
                    Sobre o App
                </Button>

                {user && (<Button mode="outlined" onPress={home_logout} style={styles.botao}> Sair </Button>)}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        marginBottom: 30,
        textAlign: 'center',
    },
    botao: {
        width: '100%',
        marginVertical: 8,
    },
    username: { 
        marginBottom: 10,
     }
});
