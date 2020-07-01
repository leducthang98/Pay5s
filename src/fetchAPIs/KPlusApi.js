import { callGetApi } from "./CommonApi"
import KPlus from "../screens/k_plus/KPlus"
import { K_PLUS_API } from "../api/Api"

export const getKPlusService = async () => {
    return await callGetApi(K_PLUS_API)
}