import axios from 'axios'

export async function getUsers(params) {
  const { skip, take, sortField, sortOrder } = params
  const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
    params: {
      _start: skip,
      _limit: take,
      _sort: sortField,
      _order: sortOrder,
    },
  })
  return response.data
}
