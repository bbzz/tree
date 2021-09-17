import { ref, onMounted } from 'vue';
import Tree from '@/components/Tree';
import img from '@/assets/logo.png';
import treeData from './components/data';
const data = ref(treeData);
const msg = ref('TS + Vue3 + Vite2');

if (localStorage.getItem('__knowData')) {
  const localData = JSON.parse(localStorage.getItem('__knowData'));
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
    if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      data.value.editTime = Date.now();
      localStorage.setItem('__knowData', JSON.stringify(data.value));
      // Process event...
      alert('保存成功');
    }
  },
  false
);

export default () => (
  <div>
    <img src={img} alt="" />
    <Tree data={data.value} />
  </div>
);
