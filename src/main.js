import Vue from 'vue';
import App from './App.vue';
import tableSlot from './learn/tableSlot.vue'
import Expand from './learn/expand.vue'
import DropdownTable from './view/testcase/dropdownTable.vue'
import TestcaseStep from './view/testcase/testcaseStep.vue'
import TestcaseEvent from './view/testcase/testcaseEvent.vue'
import TestcaseInit from './view/testcase/testcaseInit.vue'
import Example from './view/testcase/treeTable.vue'
import TreeTable from 'tree-table-vue'
import TestcaseTaskInput from './view/testcase/testcaseTaskInput.vue'
import iView from 'iview';
import Directive from '@/view/directive/directive.vue';
import importDirective from '@/directive';
import 'iview/dist/styles/iview.css';

Vue.use(iView)
Vue.use(TreeTable);

/**
 * 注册指令
 */
importDirective(Vue)

new Vue({
    el: '#app',
    // render: h => h(App),
    render: h => h(TestcaseEvent),
})
