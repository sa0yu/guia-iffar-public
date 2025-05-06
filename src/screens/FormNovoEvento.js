import { Text, Card, useTheme, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useState } from "react";

import { supabase } from '../config/supabase';

export default function FormNovoEvento({navigation}) {

    const theme = useTheme();

    const [name, setName] = useState('');
    const [date, setDate] = useState(undefined);
    const [local, setLocal] = useState('');
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);

    const registerEvent = async () =>{
        // console.log(name, date, local, description);
    
        setLoading(true);
        const {data, error} = await supabase.from('eventos').insert([
            {data: date, local, descricao: description, titulo: name}
        ]);

        if (error){
            //Alert.alert('Erro no cadastro', error.message);
            alert('Erro no cadastro', error.message);
            setLoading(false);
            return;
        }
        else{
            // Alert.alert('Evento cadastrado com sucesso!');
            navigation.navigate('Eventos');
        }
        setLoading(false);
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                label="Nome"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />

            <DatePickerInput
                locale="pt"
                label="Data"
                value={date}
                onChange={(d) => setDate(d)}
                inputMode="start"
            />

            <TextInput
                label="Local"
                value={local}
                onChangeText={text => setLocal(text)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />

            <TextInput
                label="Descrição"
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />

            <Button
                style={styles.button}
                mode="contained"
                onPress={registerEvent}
                loading={loading}
            >
                Cadastrar
            </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    card: { marginBottom: 16 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        color: '#fff',
        paddingHorizontal: 10,
        fontSize: 12,
    },
    divisor: { marginVertical: 12 },
    subtitulo: { marginBottom: 4 },
    descricao: { marginTop: 8, lineHeight: 20 },
    botaoVoltar: { marginTop: 10 },
});