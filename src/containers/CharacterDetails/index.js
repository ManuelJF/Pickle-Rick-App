import React, { useEffect, useState } from 'react'
import { ScrollView, View, ActivityIndicator, Text } from 'react-native'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
import { createImageProgress } from 'react-native-image-progress'

const Image = createImageProgress(FastImage)

const CharacterDetails = props => {
  const { id } = props.route.params
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState(null)
  useEffect(() => {
    fetch(`${Config.API_URL}/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          setDetails(data)
          setIsLoading(false)
        }
      })
      .catch(e => setIsLoading(false))
  }, [id])
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#12b0c9' />
      </View>
    )
  }
  if (!isLoading && details === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          No se pudo cargar la información del personaje...
        </Text>
      </View>
    )
  }
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        width: '100%'
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: '#FFF',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 20,
          alignItems: 'center'
        }}
      >
        <Image
          style={{
            height: 200,
            width: 200
          }}
          indicator={() => <ActivityIndicator color='#12b0c9' />}
          source={{
            uri: details.image,
            priority: FastImage.priority.normal
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={{ backgroundColor: '#FFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingVertical: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, paddingHorizontal: 20, marginBottom: 10 }}>
          {details.name}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 20, paddingHorizontal: 20, marginBottom: 10 }}>
          Origen: {details.origin.name}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 20, paddingHorizontal: 20, marginBottom: 10 }}>
          Locación: {details.location.name}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 20, paddingHorizontal: 20, marginBottom: 10 }}>
          Estatus: {details.status}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 20, paddingHorizontal: 20, marginBottom: 10 }}>
          Especie: {details.species}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 20, paddingHorizontal: 20, marginBottom: 10 }}>
          Tipo: {details.type === "" ? "N/A" : details.type}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 20, paddingHorizontal: 20, marginBottom: 20 }}>
          Género: {details.gender}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 20, color: '#12b0c9' }}>
          Lista de Episodios:
        </Text>
        <ScrollView>
          {
            details.episode.map((scene, index) => {
              return (
                <Text key={index} style={{ paddingHorizontal: 20, paddingVertical: 10, fontWeight: 'bold', fontSize: 16 }}>
                  {scene}
                </Text>
              )
            })
          }
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default CharacterDetails
