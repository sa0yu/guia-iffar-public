import { Text, Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { StyleSheet, View } from 'react-native';
import { useState } from "react";

import { supabase } from '../config/supabase';

export default function FormNovoEvento({ navigation }) {

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
            // Alert.
            alert('Evento cadastrado com sucesso!');
            navigation.navigate('Eventos');
        }
        setLoading(false);
    }

    return(
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.titulo}>Cadastrar Novo Evento</Text>

            <TextInput
                label="Título do evento"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />

            <DatePickerInput
                locale="pt"
                label="Data do evento"
                value={date}
                onChange={(d) => setDate(d)}
                inputMode="start"
                style={styles.input}
                mode="outlined"
            />

            <TextInput
                label="Local do evento"
                value={local}
                onChangeText={text => setLocal(text)}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
            />

            <TextInput
                label="Descrição do evento"
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

            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Home')}
                style={styles.button}
            >
                Voltar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
    },
    titulo: { marginBottom: 16 },
    input: { marginBottom: 15, },
    button: {
        marginVertical: 10,
    }
});