import { useDispatch } from 'react-redux'

export const getTabAction = (state) => {
  return function () {
    const dispatch = useDispatch()
    dispatch({ type: state })
  }
}
