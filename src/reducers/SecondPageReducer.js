import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from 'redux-persist';
import {
    GET_PHOTOS,
    SELECT_PHOTOS,
    UPLOAD_PHOTOS
} from "../actions/SecondPageAction"

const INITIAL_STATE = {
    cameraRoll: [],
    selectedPhotos: []
}
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userData','isAuthLogin'],
    blacklist: ['authButtonSpinner', 'authSpinnerStatus']
};

const SecondPageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            console.log("action ", action.payload);
            action.payload.map((item) => {
                item.id = Math.random()
                item.selectedItem = false
            })
            return {
                ...state,
                cameraRoll: action.payload
            }
        case SELECT_PHOTOS:
            console.log("action payload", action.payload);
            state.cameraRoll.map((item) => {
                if(item.id == action.payload.id && item.selectedItem === false){
                    item.selectedItem = true
                    state.selectedPhotos = state.selectedPhotos.concat(action.payload)
                }
                else if(item.id == action.payload.id && item.selectedItem === true){
                    item.selectedItem = false
                    let index = action.payload.id
                    state.selectedPhotos.splice(index, 1)
                }
            })
            return {
                ...state,
                cameraRoll: [...state.cameraRoll]
            }
        case UPLOAD_PHOTOS:
            return {
                ...state,
            }
        default:
            return state;
    }
}
export default persistReducer(persistConfig, SecondPageReducer);