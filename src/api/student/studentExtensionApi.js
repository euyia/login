/**
 * 在这里写你的扩展api。尽可能的不要修改 studentApi.js，如果后续接口有改动，你可以直接通过 AbpVueCli 重写生成。
 * 你也可以在这里覆盖 studentApi.js 中的接口。
 *
 * export function youFunction(){
 * }
 */
import request from '@/utils/request'

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-09 19:23:48
 * @version V1.0.0
 */
export function postImport(body) {
  return request({
    url: `/api/app/student/import`,
    method: 'post',
    data: body,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
