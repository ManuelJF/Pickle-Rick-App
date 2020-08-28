import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import { FlatGrid } from 'react-native-super-grid'
import FastImage from 'react-native-fast-image'
import { createImageProgress } from 'react-native-image-progress'
import { SearchBar } from 'react-native-elements'
import { RectButton } from 'react-native-gesture-handler'
import _ from 'lodash'
import actions from '../../actions'

const Image = createImageProgress(FastImage)

const {
  API_URL
} = Config

const { width } = Dimensions.get('window')

const {
  characterActions: {
    getCharacters
  }
} = actions

const Characters = ({
  characters,
  isLoading,
  isError,
  error,
  getCharacters,
  canFetchMore,
  nextPage,
  navigation
}) => {
  const [page, setPage] = useState(`${API_URL}`)
  const [search, setSearch] = useState(null)
  useEffect(() => {
    var endpoint = search ? `${API_URL}/?name=${search}` : page
    getCharacters(endpoint)
  }, [page, search])
  function handleMorePickleRick() {
    if (canFetchMore) {
      setPage(nextPage)
    }
  }
  function renderFooter() {
    if (!canFetchMore) return null
    return (
      <View
        style={{
          width: width,
          height: 150,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10
        }}
      >
        <ActivityIndicator animating size='large' color='#12b0c9' />
      </View>
    )
  }
  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: '#12b0c9' }}>
          No se encontraron personajes en ningun universo con el nombre de "{search}"
        </Text>
      </View>
    )
  }
  const flatRef = useRef(null)
  return (
    <>
      <SearchBar
        placeholder='Busca un personaje aquī'
        onChangeText={search => {
          if (!_.isEmpty(search)) {
            setSearch(search)
            if (flatRef.current) {
              flatRef.current.scrollToOffset(true, { x: 0, y: 0 })
            }
          } else {
            setSearch(null)
            setPage(`${API_URL}`)
            if (flatRef.current) {
              flatRef.current.scrollToOffset(true, { x: 0, y: 0 })
            }
          }
        }}
        value={search}
        platform='ios'
        containerStyle={{
          marginBottom: 10
        }}
      />
      <FlatGrid
        itemDimension={130}
        data={characters}
        style={{
          flex: 1,
          paddingTop: 0
        }}
        ref={flatRef}
        spacing={10}
        renderItem={({ item }) => {
          return (
            <RectButton onPress={() => navigation.navigate('Details', { id: item.id })} style={{ borderRadius: 6, backgroundColor: '#FFF' }}>
              <View accessible style={{ padding: 10 }}>
                <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <Image
                    style={{
                      height: 150
                    }}
                    indicator={() => <ActivityIndicator color='#12b0c9' />}
                    source={{
                      uri: item.image,
                      priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
                <View style={{ paddingVertical: 5 }}>
                  <Text
                    style={{
                      width: '100%',
                      fontWeight: 'bold',
                      fontSize: 18
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 12
                    }}
                  >
                    {item.origin.name}
                  </Text>
                </View>
              </View>
            </RectButton>
          )
        }}
        onEndReached={handleMorePickleRick}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
      />
    </>
  )
}

function mapStateToProps(state) {
  return {
    currentPage: state.characters.currentPage,
    characters: state.characters.result,
    isLoading: state.characters.isLoading,
    isError: state.characters.isError,
    error: state.characters.error,
    canFetchMore: state.characters.canFetchMore,
    nextPage: state.characters.nextPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCharacters: (url) => dispatch(getCharacters(url))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Characters)
