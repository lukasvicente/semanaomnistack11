import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import * as mailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';
 
import logo from '../../assets/logo.png';

import style from './style';

export default function Detail(){

    const navigation = useNavigation();
    const Route = useRoute();

    const incident = Route.params.incident;

    const message = `Olá ${incident.nome}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" no valor de ${Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency:'BRL'
    }).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendEmail() {
        mailComposer.composeAsync({
            subject: `Heroi do Caso: ${incident.title}`,
            recipients:[incident.email],
            body: message,
        })
    }

    function sendWhatsApp() {

        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }


   return (
    <View style={style.conteiner} >
        <View style={style.header}>
            <Image source={logo} />
            <TouchableOpacity
            onPress={ navigateBack }
            >
                <Feather 
                name="arrow-left" 
                size={28} 
                color="#E82041" 
                />
            </TouchableOpacity>
        </View>

        <View style={style.incident}>
            <Text style={[style.incidentProperty, {marginTop: 0}]}>ONG: </Text>
            <Text style={style.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>
            
            <Text style={style.incidentProperty}>CASO: </Text>
            <Text style={style.incidentValue}>{incident.title}</Text>
            
            <Text style={style.incidentProperty}>VALOR: </Text>
            <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency', 
                            currency:'BRL'
                        }).format(incident.value)}</Text>
            
        </View>

        <View style={style.contactBox}>
            <Text style={style.heroTitle}> Salve o dia!</Text>
            <Text style={style.heroTitle}> Seja o heroi desse caso.</Text>

            <Text style={style.heroDescription}> Entre em contato:</Text>

            <View style={style.actions}>
                <TouchableOpacity style={style.action} onPress={sendWhatsApp} >
                    <Text style={style.actionText}> WhatApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.action} onPress={sendEmail} >
                    <Text style={style.actionText}> E-Mail</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
   )
};
