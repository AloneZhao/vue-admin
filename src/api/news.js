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
 * 添加子级
 */
function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data
  });
}

/**
 * 获取无子级分类
 */
function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}

/**
 * 获取有子级分类
 */
function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/ ",
    data
  });
}

/**
 * 新增信息
 */
function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  });
}

/**
 * 获取信息列表
 */
function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}

/**
 * 删除信息
 */
function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  });
}

/**
 * 修改信息
 */
function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  });
}

export {
  AddFirstCategory,
  GetCategory,
  DelCategory,
  AddChildrenCategory,
  EditCategoryFirst,
  AddInfo,
  GetList,
  DeleteInfo,
  EditInfo,
  GetCategoryAll
};
