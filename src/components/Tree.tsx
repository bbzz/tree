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
    }
  },
  emits: ['enter'],
  setup(props, { emit }) {
    const handleDelet = (item, e) => {
      console.log(item, e.key);
      if (e.key === 'Enter') {
        // 添加子元素
        console.log('Enter');
        emit('enter');
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

    const handleEnter = () => {
      props.data.children?.push({
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
          <input v-model={props.data.title} onKeydown={() => handleDelet(props.data, event)} />
          {/* <div {...{ onKeyup_enter: handleDelet, onClick: handleDelet }}>{props.data.title}</div> */}
        </div>
        {props.data.children && props.data.children.length ? (
          <ul class="leaf">
            {props.data.children?.map((item) => (
              <li>
                <treeNode data={item} onEnter={handleEnter} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
});

export default treeNode;
