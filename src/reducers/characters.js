import actions from '../actions'

const initialState = {
  result: [],
  isLoading: false,
  isError: false,
  error: null,
  canFetchMore: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.characterTypes.GET_CHARACTERS_INIT:
      return {
        ...state,
        isLoading: true
      }
    case actions.characterTypes.GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        lastPage: payload.lastPage,
        result: payload.onRefresh ? payload.result : [...state.result, ...payload.result],
        isLoading: false,
        canFetchMore: payload.canFetchMore,
        nextPage: payload.nextPage,
        isError: false,
        error: null
      }
    case actions.characterTypes.GET_CHARACTERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload,
        canFetchMore: false,
        lastPage: 0,
        result: []
      }
    default:
      return state
  }
}
