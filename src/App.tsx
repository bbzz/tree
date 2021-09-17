import { ref, onMounted } from 'vue';
import Tree from '@/components/Tree';
import img from '@/assets/logo.png';
import treeData from './components/data';
const data = ref(treeData);
const msg = ref('TS + Vue3 + Vite2');

if (localStorage.getItem('__knowData')) {
  data.value = JSON.parse(localStorage.getItem('__knowData'));
}
const timer = setInterval(() => {
  console.log(data.value);
  localStorage.setItem('__knowData', JSON.stringify(data.value));
}, 5000);

export default () => (
  <div>
    <img src={img} alt="" />
    <Tree data={data.value} />
  </div>
);
