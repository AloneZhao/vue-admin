import service from "@/utils/request";
/**
 * 编辑
 */
function EditCategoryFirst(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}
/**
 * 删除信息分类
 */
function DelCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  });
}
/**
 * 添加一级分类
 */
function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}

/**
 * 获取分类
 */
function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}
export { AddFirstCategory, GetCategory, DelCategory, EditCategoryFirst };
