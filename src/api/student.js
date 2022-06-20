import request from '@/utils/request'

//如果是实体类就使用  data
//如果是单个数据就使用  params
export function StudentManager(data) {
    return request({
      url: '/api/Student/GetSearch',
      method: 'post',
      data
    })
  }


export function DeleteData(params) {
  return request({
    url: '/api/Student/DeleteData',
    method: 'post',
    params
  })
}