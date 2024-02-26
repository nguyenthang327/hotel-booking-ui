import http from '@/utils/http'

const PATH = 'user/'

// export const list = (params = {}) => http.get(PATH + 'all', { params });

export const listPaginate = (params = {}) => http.get(PATH + '', { params })

export const detail = (id) => http.get(PATH + 'detail/' + id)

export const update = (params = {}, id) => http.put(PATH + 'edit/' + id,  params)

export const remove = (id) => http.remove(PATH + 'delete/' + id)
