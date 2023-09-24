import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { SearchSchema, searchSchema } from '~/utils/rulesForm'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'

function useSearchProduct() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SearchSchema>({
    resolver: yupResolver(searchSchema)
  })
  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmit }
}

export default useSearchProduct
