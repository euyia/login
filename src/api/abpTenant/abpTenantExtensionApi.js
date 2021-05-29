/**
 * 在这里写你的扩展api。尽可能的不要修改 abpTenantApi.js，如果后续接口有改动，你可以直接通过 AbpVueCli 重写生成。
 * 你也可以在这里覆盖 abpTenantApi.js 中的接口。
 *
 * export function youFunction(){
 * }
 */

import request from "@/utils/request";

export function getByDomain(subDomain) {
  return request({
    url: `/api/multi-tenancy/tenants/by-subDomain/${subDomain}`,
    method: "get"
  });
}
