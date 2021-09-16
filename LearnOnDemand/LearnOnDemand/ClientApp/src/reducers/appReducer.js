
export const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_IPINFO':
            return Object.assign({}, state, {
                ipinfo: action.payload
            });

        case 'SET_WEATHER':
            return Object.assign({}, state, {
                weather: action.payload
            });

        case 'SET_FORECAST':
            return Object.assign({}, state, {
                forecast: action.payload
            });
        case 'SET_NEWS':
            return Object.assign({}, state, {
                news: action.payload
            });
        case 'SET_LOADING':
            return Object.assign({}, state, {
                isLoading: action.payload
            });
        case 'SET_ERROR':
            return Object.assign({}, state, {
                error: action.payload
            });
        default:
            return state;
    }
}
