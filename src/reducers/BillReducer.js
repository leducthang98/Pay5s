const DEFAULT_STATE = {
   billData:null
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case 'GET_BILL_SUCCESS': {
            return {
                ...state,
                billData:action.payload.billData
            }
        }
        case 'GET_BILL_FAIL': {
            return {


            }
        }
    }
    return state;
}
