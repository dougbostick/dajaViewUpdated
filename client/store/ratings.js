import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_RATINGS = 'SET_RATINGS'
const ADD_NEW_RATING = 'ADD_NEW_RATING'

/**
 * ACTION CREATORS
 */


/**
 * THUNK CREATORS
 */

export const loadRatings = () =>{
  const token = window.localStorage.getItem(TOKEN)
  console.log(token)
  if(token){
    return async(dispatch)=>{
      const ratings = (await axios.get('/api/ratings', {
        headers: {
          authorization:token
        }
      })).data
      dispatch({
        type:SET_RATINGS,
        ratings
      })
    }
  }
}

 export const createRating = (rating, authId, mediaId)=>{
  return async(dispatch) => {
    const newRating = (await axios.post('/api/ratings', {rating, authId, mediaId})).data;
    dispatch({
      type:ADD_NEW_RATING,
      rating:newRating
    })
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_RATINGS:
      return action.ratings
    case ADD_NEW_RATING:
      return state.map(item => item.id === action.rating.id? action.rating: item)
    default:
      return state
  }
}