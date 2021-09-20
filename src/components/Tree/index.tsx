import { gTreeNode } from './utils';
import { defineComponent, PropType } from 'vue';
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
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ['insertSiblingNode'],
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus();
      }
    }
  },

  setup(props, { emit }) {
    const handleKeyDown = (e: KeyboardEvent, item: ITreeData, index: number) => {
      if (e.key === 'Enter') {
        const before = e.shiftKey;
        emit('insertSiblingNode', index, before);
      }
      if (e.key === 'Tab') {
        (e.target as HTMLInputElement).blur();
        if (!item.children) {
          item.children = [];
        }
        item.children.push(gTreeNode());
        e.preventDefault();
        return false;
      }
    };

    const insertSiblingNode = (index: number, before: boolean) => {
      props.data.children?.splice(before ? index : index + 1, 0, gTreeNode());
    };

    return () => (
      <div class="node">
        <div class="root">
          <input v-model={props.data.title} onKeydown={(event) => handleKeyDown(event, props.data, props.index)} v-focus />
        </div>
        {props.data.children && props.data.children.length ? (
          <ul class={['leaf', { one: props.data.children.length === 1 }]}>
            {props.data.children?.map((item: ITreeData, index) => (
              <li key={item.id}>
                <treeNode data={item} index={index} onInsertSiblingNode={insertSiblingNode} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
});

export default treeNode;
