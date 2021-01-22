import { 
    INPUT_CHANGE,
    CREATE_USER,
    CREATE_USER_ERROR,
    SAME_PASS_ERROR,
    LOGIN_USER_ERROR,
} from '../constants/constants'

const inputChgangeAction = (name, value) => ({
    type: INPUT_CHANGE,
    name,
    value
})

const createUserAction = () => ({
    type: CREATE_USER
})

const createUserErrorAction = (err) => ({
    type: CREATE_USER_ERROR,
    error: err
})

const samePassErrorAction = () => ({
    type: SAME_PASS_ERROR
})

const loginUserErrorAction = (err) => ({
    type: LOGIN_USER_ERROR,
    error: err
})

export { 
    inputChgangeAction,
    createUserAction,
    createUserErrorAction,
    samePassErrorAction,
    loginUserErrorAction,
} 