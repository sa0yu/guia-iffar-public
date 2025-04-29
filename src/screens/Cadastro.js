import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { id } from 'date-fns/locale';
import { supabase } from '../config/supabase';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigation = useNavigation();

  const cadastrar = async () =>{
    // console.log(nome, email, senha);

    setCarregando(true);
    
        const {data, error} = await supabase.auth.signUp({
          email,
          password: senha,
        });

        if (error){
          //Alert.alert('Erro no cadastro', error.message);
          alert('Erro no cadastro', error.message);
          setCarregando(false);
          return;
        }
        
        const id = data.user?.id;

        if (id){   
          const { error: erroUsuario } = await 
          supabase.from('usuarios').insert([
            { id, nome, tipo: 'aluno' }
          ]);

          if (erroUsuario) {
            //Alert.
            alert('Erro ao salvar usuário:', erroUsuario.message);
          } else {
            //Alert.alert('Conta criada com sucesso!', 'Você já pode fazer login.');
            navigation.navigate('Login');
          }
        }
        setCarregando(false);
    }
  
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>Criar Conta</Text>

      <TextInput
        label="Nome completo"
        value={nome}
        style={styles.input}
        onChangeText={setNome}
      />
      <TextInput
        label="E-mail"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        label="Senha"
        value={senha}
        secureTextEntry
        style={styles.input}
        onChangeText={setSenha}
      />

      <Button mode="contained" 
            onPress={cadastrar} 
            loading={carregando}>
        Cadastrar
      </Button>

      <Button onPress={() => navigation.navigate('Login')} style={{ marginTop: 8 }}>
        Já tenho conta
      </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  input: { marginBottom: 16 },
});