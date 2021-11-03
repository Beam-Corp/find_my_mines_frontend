import getConfig from 'next/config'

import Axios from 'axios'

const { publicRuntimeConfig } = getConfig()

export const client = Axios.create({
  baseURL: publicRuntimeConfig.apiUrl || 'http://localhost:8000',
  withCredentials: true,
})
