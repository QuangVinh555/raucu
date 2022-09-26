export const authReducer = (state, action) => {
    const {payload: {isAuthenticated, user}} = action;
    switch (action.type) {
        case 'SET_AUTH':
            return{
                ...state,
                isAuthLoading: false,
                isAuthenticated,
                user
            }
        default:
            return state;
    }
}