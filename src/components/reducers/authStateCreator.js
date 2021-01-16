import {
    INPUT_CHANGE,
    CREATE_USER,
    CREATE_USER_ERROR,
    SAME_PASS_ERROR
} from './../constants/constants'

const authStateCreator = (state, action) => {
    if(state === undefined) {
        return {
            singInEmail: '',
            singInPassword: '',
            singUpEmail: '',
            singUpPassword1: '',
            singUpPassword2: '',
            emailNotVerified: true,
            createUserWithEmailAndPassword: false,
            error: null,
          }
    }

    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state.authState,
                [action.name]: action.value
            };
        case CREATE_USER:
            return {
                ...state.authState,
                singUpEmail: '',
                singUpPassword1: '',
                singUpPassword2: '',
                createUserWithEmailAndPassword: true,
                error: null,
            }
        case CREATE_USER_ERROR:
            return {
                ...state.authState,
                singUpEmail: '',
                singUpPassword1: '',
                singUpPassword2: '',
                error: action.error
            }
        case SAME_PASS_ERROR:
            return {
                ...state.authState,
                singUpPassword1: '',
                singUpPassword2: '',
                error: { message: 'Passwords must be same' },
            }
        
        default:
            return state.authState;
    }
}

export default authStateCreator