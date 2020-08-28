import { characterTypes } from './actionTypes'

export function getCharacters(url) {
  return async dispatch => {
    try {
      dispatch({ type: characterTypes.GET_CHARACTERS_INIT })
      const response = await fetch(url)
      const data = await response.json()
      console.log('data >>>', data)
      if (data && data.info && data.results) {
        dispatch({
          type: characterTypes.GET_CHARACTERS_SUCCESS,
          payload: {
            lastPage: data.info.pages,
            result: data.results,
            canFetchMore: data.info.next ? true : false,
            nextPage: data.info.next,
            onRefresh: data.info.prev === null ? true : false
          }
        })
        return
      }
      dispatch({
        type: characterTypes.GET_CHARACTERS_FAILURE,
        payload: JSON.stringify(data)
      })
    } catch (error) {
      dispatch({
        type: characterTypes.GET_CHARACTERS_FAILURE,
        payload: error.message
      })
    }
  }
}

export default {
  getCharacters
}
