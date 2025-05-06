import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import EventoCard from '../componentes/EventoCard';
import { supabase } from '../config/supabase';
import { useFocusEffect } from '@react-navigation/native';

export default function Eventos({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // sempre que o 'foco' estiver na tela (tela aberta/exibida), atualiza a consulta
  useFocusEffect(
    // sempre que uma dependência for alterada (um novo registro)...
    useCallback(() => {
      let ativo = true;

      async function buscarEventos() {
        setCarregando(true);
        const { data, error } = await supabase.from('eventos').select('*');

        if (ativo) {
          if (error) {
            console.log(error);
          } else {
            setEventos(data);
          }
          setCarregando(false);
        }
      }

      buscarEventos();

      return () => {
        ativo = false;
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.titulo}>Eventos do Campus</Text>

      {carregando && <ActivityIndicator animating />}
      {!carregando && eventos.length === 0 && <Text>Nenhum evento cadastrado</Text>}

      {eventos.map((eventos, index) => (
        <EventoCard key={index} {...eventos} onPress={() => navigation.navigate('DetalheEvento', eventos)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { marginBottom: 16 },
});
