export const TabAction = {
  filter: 'filter',
  promise: 'promise',
  promiseAll: 'promiseAll',
  JSONP: 'JSONP',
  curry: 'curry',
  eventEmitter: 'eventEmitter',
  solidSingle: 'solidSingle',
  interfaceSegeration: 'interfaceSegeration',
  openClose: 'openClose',
  lspPriceple: 'lspPriceple',
  dependencyInversion: 'dependencyInversion',
  promisify: 'promisify',
}

const recivedSuccess = 'success'
const recivedFailed = 'failed'
const recivedPending = 'pending'

const initialState = {
  filter: 'filter',
}

export const tabStateReducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case TabAction.filter:
      return { ...state, ...action }
    case TabAction.promise:
      return { ...state, ...action }
    case TabAction.promiseAll:
      return { ...state, ...action }
    case TabAction.JSONP:
      return { ...state, ...action }
    case TabAction.curry:
      return { ...state, ...action }
    case TabAction.eventEmitter:
      return { ...state, ...action }
    case TabAction.solidSingle:
      return { ...state, ...action }
    case TabAction.interfaceSegeration:
      return { ...state, ...action }
    case TabAction.openClose:
      return { ...state, ...action }
    case TabAction.lspPriceple:
      return { ...state, ...action }
    case TabAction.dependencyInversion:
      return { ...state, ...action }
    case TabAction.promisify:
      return { ...state, ...action }
    default:
      return null
  }
}
