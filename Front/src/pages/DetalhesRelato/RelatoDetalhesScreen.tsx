import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
    useNavigation,
    useRoute,
} from '@react-navigation/native';

import { api } from '../../service/api';


export default function RelatoDetalhesScreen() {

    const navigation = useNavigation();

    const route = useRoute<any>();

    const { relato } = route.params;


    // ============================================================
    // RESOLVE A URL DA FOTO
    // ============================================================

    const resolverUriImagem = (): string | null => {

        if (
            !relato?.fotos ||
            !Array.isArray(relato.fotos) ||
            relato.fotos.length === 0
        ) {
            return null;
        }


        const caminho = relato.fotos[0];


        if (
            !caminho ||
            typeof caminho !== 'string'
        ) {
            return null;
        }


        // Caso o backend já envie uma URL completa
        if (
            caminho.startsWith('http://') ||
            caminho.startsWith('https://')
        ) {
            return caminho;
        }


        const baseURL =
            api.defaults.baseURL?.replace(/\/$/, '');


        if (!baseURL) {
            return null;
        }


        /*
          Exemplo:
    
          caminho:
          fotos/abc123.jpg
    
          baseURL:
          http://10.0.0.151:8080
    
          resultado:
          http://10.0.0.151:8080/uploads/fotos/abc123.jpg
        */

        return `${baseURL}/uploads/${caminho}`;
    };


    const imagemUri = resolverUriImagem();


    // ============================================================
    // DEBUG
    // ============================================================

    console.log(
        'RELATO DETALHES:',
        relato
    );

    console.log(
        'FOTOS:',
        relato?.fotos
    );

    console.log(
        'URL DA IMAGEM:',
        imagemUri
    );


    return (

        <View style={styles.container}>

            {/* ======================================================
          HEADER
      ====================================================== */}

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >

                    <Ionicons
                        name="arrow-back"
                        size={26}
                        color="#FFFFFF"
                    />

                </TouchableOpacity>


                <Text style={styles.headerTitle}>
                    Detalhes do Relato
                </Text>


                <View style={styles.headerSpacer} />

            </View>


            {/* ======================================================
          CONTEÚDO
      ====================================================== */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >


                {/* ==================================================
            FOTO
        ================================================== */}

                {imagemUri ? (

                    <Image
                        source={{
                            uri: imagemUri,
                        }}

                        style={styles.image}

                        resizeMode="cover"

                        onLoad={() => {

                            console.log(
                                'Imagem carregada com sucesso:',
                                imagemUri
                            );

                        }}

                        onError={(error) => {

                            console.log(
                                'ERRO AO CARREGAR IMAGEM:',
                                error.nativeEvent
                            );

                            console.log(
                                'URL TENTADA:',
                                imagemUri
                            );

                        }}
                    />

                ) : (

                    <View style={styles.noImage}>

                        <Ionicons
                            name="image-outline"
                            size={60}
                            color="#666666"
                        />

                        <Text style={styles.noImageText}>
                            Sem imagem
                        </Text>

                    </View>

                )}


                {/* ==================================================
            TÍTULO
        ================================================== */}

                <View style={styles.titleContainer}>

                    <Text style={styles.title}>
                        {relato?.titulo || 'Sem título'}
                    </Text>

                </View>


                {/* ==================================================
            AUTOR
        ================================================== */}

                <View style={styles.infoRow}>

                    <Ionicons
                        name="person-circle-outline"
                        size={26}
                        color="#00A3FF"
                    />

                    <View style={styles.infoContent}>

                        <Text style={styles.infoLabel}>
                            Publicado por
                        </Text>

                        <Text style={styles.infoText}>
                            {relato?.nomeAutor || 'Anônimo'}
                        </Text>

                    </View>

                </View>


                {/* ==================================================
            LOCALIZAÇÃO
        ================================================== */}

                <View style={styles.infoRow}>

                    <Ionicons
                        name="location-outline"
                        size={26}
                        color="#00A3FF"
                    />

                    <View style={styles.infoContent}>

                        <Text style={styles.infoLabel}>
                            Localização
                        </Text>

                        <Text style={styles.infoText}>
                            {relato?.enderecoTexto ||
                                'Endereço não informado'}
                        </Text>

                    </View>

                </View>


                {/* ==================================================
            DATA
        ================================================== */}

                <View style={styles.infoRow}>

                    <Ionicons
                        name="calendar-outline"
                        size={26}
                        color="#00A3FF"
                    />

                    <View style={styles.infoContent}>

                        <Text style={styles.infoLabel}>
                            Data do relato
                        </Text>

                        <Text style={styles.infoText}>
                            {relato?.data ||
                                'Data não informada'}
                        </Text>

                    </View>

                </View>


                {/* ==================================================
            STATUS
        ================================================== */}

                <View style={styles.statusContainer}>

                    <Text style={styles.statusLabel}>
                        Status
                    </Text>

                    <View style={styles.statusBadge}>

                        <Text style={styles.statusText}>
                            {relato?.status ||
                                'Em análise'}
                        </Text>

                    </View>

                </View>


                {/* ==================================================
            DESCRIÇÃO
        ================================================== */}

                <View style={styles.descriptionContainer}>

                    <Text style={styles.sectionTitle}>
                        Descrição
                    </Text>

                    <Text style={styles.description}>
                        {relato?.descricao ||
                            'Nenhuma descrição informada.'}
                    </Text>

                </View>


                {/* ==================================================
            AÇÕES
        ================================================== */}

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                    >
                        <Ionicons
                            name="thumbs-up-outline"
                            size={22}
                            color="#00A3FF"
                        />
                        <Text style={styles.actionText}>
                            {relato?.curtidas ?? 0}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                    >

                        <Ionicons
                            name="share-social-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.actionText}>
                            Compartilhar
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.reportButton}
                    >

                        <Ionicons
                            name="alert-circle-outline"
                            size={22}
                            color="#FF3B30"
                        />

                        <Text style={styles.reportText}>
                            Denunciar
                        </Text>

                    </TouchableOpacity>


                </View>


            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor: '#121212',

        paddingTop:
            Platform.OS === 'android'
                ? StatusBar.currentHeight
                : 44,
    },


    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#171717',
        borderBottomWidth: 1,
        borderBottomColor: '#2C2C2E',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 14,
        backgroundColor: '#2C2C2E',
        marginBottom: 18,
    },
    noImage: {
        width: '100%',
        height: 250,
        borderRadius: 14,
        backgroundColor: '#2C2C2E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
    noImageText: {
        color: '#666666',
        marginTop: 10,
        fontSize: 14,
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoContent: {
        flex: 1,
        marginLeft: 10,
    },
    infoLabel: {
        color: '#8E8E93',
        fontSize: 12,
        marginBottom: 2,
    },
    infoText: {
        color: '#E5E5EA',
        fontSize: 15,
    },
    statusContainer: {
        backgroundColor: '#2C2C2E',
        borderRadius: 12,
        padding: 14,
        marginTop: 5,
        marginBottom: 20,
    },
    statusLabel: {
        color: '#8E8E93',
        fontSize: 13,
        marginBottom: 8,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#3A3A3C',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },


    statusText: {
        color: '#FFFFFF',

        fontSize: 15,

        fontWeight: '600',
    },


    descriptionContainer: {
        backgroundColor: '#1C1C1E',

        borderRadius: 14,

        padding: 16,

        marginBottom: 20,
    },


    sectionTitle: {
        color: '#FFFFFF',

        fontSize: 18,

        fontWeight: 'bold',

        marginBottom: 10,
    },


    description: {
        color: '#E5E5EA',

        fontSize: 15,

        lineHeight: 23,
    },


    actionsContainer: {
        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        gap: 8,
    },


    actionButton: {
        flexDirection: 'row',

        alignItems: 'center',

        backgroundColor: '#2C2C2E',

        borderRadius: 10,

        paddingHorizontal: 12,

        paddingVertical: 10,

        gap: 6,
    },


    actionText: {
        color: '#FFFFFF',

        fontSize: 14,
    },


    reportButton: {
        flexDirection: 'row',

        alignItems: 'center',

        backgroundColor: '#2C2C2E',

        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 6,
    },
    reportText: {
        color: '#FF3B30',
        fontSize: 14,
    },
});