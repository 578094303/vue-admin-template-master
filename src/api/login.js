import request from '@/utils/request'

//如果是实体类就使用  data
//如果是单个数据就使用  params
export function LoginManager(data) {
    return request({
      url: '/api/Login/LoginDR',
      method: 'post',
      data
    })
  }