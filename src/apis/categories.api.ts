import { categoriesResponse } from '~/types/categories.type'
import { ResponseApi } from '~/types/utils.type'
import { http } from '~/utils/http'

export const getCategories = () => http.get<ResponseApi<categoriesResponse>>('/categories')
