export const TabAction = {
  filter: 'filter',
  promise: 'promise',
  promiseAll: 'promiseAll',
}

const recivedSuccess = 'success'
const recivedFailed = 'failed'
const recivedPending = 'pending'

const initialState = {
  filter: 'filter',
}

export const tabStateReducer = (state = initialState, action) => {
  switch (action?.type) {
    case TabAction.filter:
      return { ...state, ...action }
    case TabAction.promise:
      return { ...state, ...action }
    case TabAction.promiseAll:
      return { ...state, ...action }
    default:
      return null
  }
}
