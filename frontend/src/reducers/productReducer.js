const productReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'SET_ALL_PRODUCTS':
            return {
                ...state,
                products: payload
            }

        case 'ADD_PRODUCT':
            return{
                ...state,
                products: [...state.products, payload]
            }
        default:
            return state;
    }
}

export default productReducer;