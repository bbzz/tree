import { ref, defineComponent, onMounted, watch } from 'vue';
import className from '@/assets/app.module.css';
import './index.css';

const treeNode = defineComponent({
  name: 'TreeName',
  props: {
    data: {
      type: Object,
      default: {
        title: '',
        children: [{}]
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ['enter'],
  setup(props, { emit }) {
    const handleDelet = (e, item, index) => {
      console.log(e, e.key);
      if (e.key === 'Enter') {
        // 添加子元素
        emit('enter', index, e.shiftKey);
      }
      if (e.key === 'Tab') {
        console.log('Tab');
        if (!item.children) {
          item.children = [];
        }
        item.children.push({
          title: '',
          children: []
        });
        e.preventDefault();
        return false;
      }
    };

    const handleEnter = (index, before) => {
      props.data.children?.splice(before ? index : index + 1, 0, {
        title: '',
        children: []
      });
    };

    onMounted(() => {
      const vm = document.getElementById('title');
      console.log(vm, 'vm');
      if (vm) {
        vm.className = className['color-theme'];
      }
    });
    return () => (
      <div class="node">
        <div class="root">
          <input v-model={props.data.title} onKeydown={() => handleDelet(event, props.data, props.index)} />
        </div>
        {props.data.children && props.data.children.length ? (
          <ul class="leaf">
            {props.data.children?.map((item, index: number) => (
              <li>
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
