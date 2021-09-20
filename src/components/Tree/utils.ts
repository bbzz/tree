// 基于base62编码生成14位的ID字符串
// 优点：短/按时间序/双击可全选/唯一性足够安全
export function guid() {
  let ret = '';
  let ms = new Date().getTime();
  ret += base62encode(ms, 8); // 6923年循环一次
  ret += base62encode(Math.ceil(Math.random() * 62 ** 6), 6); // 冲突概率为每毫秒568亿分之一
  return ret;
}
let codeStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
function base62encode(v: number, n: number) {
  let ret = '';
  for (let i = 0; i < n; i++) {
    ret = codeStr[v % codeStr.length] + ret;
    v = Math.floor(v / codeStr.length);
  }
  return ret;
}

export function gTreeNode() {
  return {
    id: guid(),
    title: '',
    editTime: Date.now(),
    children: []
  };
}
