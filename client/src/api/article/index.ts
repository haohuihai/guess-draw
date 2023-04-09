import request from '@/config/axios'
// 获取文章列表
export const getArticleList = async (data): Promise<IResponse> => {
  return request.get({ url: `/article/articlelist?page=${data.page}` })
}
// 保存文章
export const publishArticleApi = async (data): Promise<IResponse> => {
  return request.post({ url: '/article/saveEditContent', data })
}

// 上传图片
export const uploadArticleImg = async (data): Promise<IResponse> => {
  return request.post({ url: '/upload/articleImage', data })
}

// 获取文章详情
export const getArticleDetail = async (id: string): Promise<IResponse> => {
  return request.get({ url: `/article/getArticDetail/${id}` })
}
