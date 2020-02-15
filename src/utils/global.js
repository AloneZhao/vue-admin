import { MessageBox, Message } from "element-ui";
export default {
  install(Vue) {
    Vue.prototype.confirm = parames => {
      MessageBox.confirm(parames.content, parames.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          parames.callback && parames.callback(parames.id);
          // if (parames.callback) {
          //   parames.callback();
          // }
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    };
  }
};
