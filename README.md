这是一款简单易上手的 `html > input` 版本的脑图编辑器，Dom 相比 Canvas 操控性更强在现代浏览器中并不用担心性能问题。

快捷键：

- Enter : 当前条目**下方添加相邻**新条目
- shift + Enter : 当前条目**上方添加相邻**新条目
- Tab : 添加**子条目**
- Ctrl + s : 暂存保存到 localStorage （非组件功能）

[上手体验：https://bbzz.github.io/tree](https://bbzz.github.io/tree/)

## env

Vue3 + TSX

## install

```shell
npm i knowledge-tree -D
```

```javascript
setup() {
    const data = ref(treeData);

    // ctrl + s 保存
    window.addEventListener(
      'keydown',
      function (e: KeyboardEvent) {
        if (e.code === 'KeyS' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          data.value.editTime = Date.now();
          localStorage.setItem('__knowData', JSON.stringify(data.value));
          alert('保存成功');
        }
      },
      false
    );

    return () => (
      <Tree data={data.value} />
    );
  }
```
