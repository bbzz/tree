import { ref, onMounted } from 'vue';
import Tree from '@/components/Tree';
import treeData from './data';
import classes from './assets/app.module.css';

export default {
  setup() {
    const container = ref(null as Element | null);
    const data = ref(treeData);
    const getDataByLocal = localStorage.getItem('__knowData');

    if (getDataByLocal) {
      const localData = JSON.parse(getDataByLocal);
      localData.editTime > treeData.editTime;
      data.value = localData;
    }

    const timer = setInterval(() => {
      console.info('自动保存到本地', Date.now());
      data.value.editTime = Date.now();
      localStorage.setItem('__knowData', JSON.stringify(data.value));
    }, 10000);

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
    onMounted(() => {
      // css module 应用
      if (container.value) {
        container.value.className = classes.container;
      }
    });

    return () => (
      <div ref={container}>
        <Tree data={data.value} />
      </div>
    );
  }
};
