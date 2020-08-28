import actionTypes from '../actions'

const initialState = {
  totalOfElements: 0,
  currentPage: 1,
  lastPage: 1,
  result: [],
  isLoading: false,
  isError: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.characterTypes.GET_CHARACTERS_INIT:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.characterTypes.GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        lastPage: payload.pages,
        result: payload.results,
        totalOfElements: payload.count,
        isLoading: false
      }
    case actionTypes.characterTypes.GET_CHARACTERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload
      }
    default:
      return state
  }
}
