import { Button, Text, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { supabase } from '../config/supabase';
import { useUser } from "../contexto/UsuarioContexto";


export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const {setUser, setProfile} = useUser();

    const login = async () =>{
        setCarregando(true);
            
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error){
            // Alert.alert('Erro no login', error.message);
            console.log(error.message)
            
            setCarregando(false);
            return;
        }

        const user = data.user;
        
        if(user){
            const{data: PerfilUsuario, error: errorPerfil} = await supabase.from('usuarios').select('*').eq('id', user.id).single();

            if(errorPerfil){
                // Alert.
                alert('Erro ao buscar perfil do usuário');
                setCarregando(false);
                return ;
            }
            setUser(user);
            setProfile(PerfilUsuario);

            navigation.navigate('Home');
        }
        setCarregando(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Bem-vindo(a) ao Guia Acadêmico IFFar Panambi
            </Text>

            <TextInput
                label="E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />

            <TextInput
                label="Senha"
                value={senha}
                onChangeText={text => setSenha(text)}
                style={styles.input}
                mode="outlined"
                secureTextEntry
            />

            <Button
                style={styles.button}
                mode="contained"
                onPress={login}
                loading={carregando}
            >
                Entrar
            </Button>

            <Button
                style={styles.button}
                mode="outlined"
                onPress={() => {
                    // tela de cadastro
                    navigation.navigate('Cadastro');
                }}
            >
                Criar conta
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginVertical: 10,
    }
});
