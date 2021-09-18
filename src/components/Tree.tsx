import { gTreeNode } from './utils';
import { ref, defineComponent, onMounted, PropType } from 'vue';
import className from '@/assets/app.module.css';
import './index.css';
interface ITreeData {
  id: string;
  title: string;
  editTime: number;
  children?: Array<ITreeData>;
}
const treeNode = defineComponent({
  name: 'Tree',
  props: {
    data: {
      type: Object as PropType<ITreeData>,
      default: {
        title: '',
        children: []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus();
      }
    }
  },
  emits: ['enter'],
  setup(props, { emit }) {
    const handleAction = (e: any, item: ITreeData, index: number) => {
      if (e.key === 'Enter') {
        // 添加子元素
        emit('enter', index, e.shiftKey);
      }
      if (e.key === 'Tab') {
        e.target.blur();
        console.log('Tab');
        if (!item.children) {
          item.children = [];
        }
        item.children.push(gTreeNode());
        e.preventDefault();
        return false;
      }
    };

    const handleEnter = (index: number, before: boolean) => {
      props.data.children?.splice(before ? index : index + 1, 0, gTreeNode());
    };

    onMounted(() => {
      const vm = document.getElementById('title');
      if (vm) {
        vm.className = className['color-theme'];
      }
    });

    return () => (
      <div class="node">
        <div class="root">
          <input v-model={props.data.title} onKeydown={() => handleAction(event, props.data, props.index)} v-focus />
        </div>
        {props.data.children && props.data.children.length ? (
          <ul class={['leaf', { one: props.data.children.length === 1 }]}>
            {props.data.children?.map((item: ITreeData, index: number) => (
              <li key={item.id}>
                <treeNode data={item} index={index} onEnter={handleEnter} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
});

export default treeNode;
