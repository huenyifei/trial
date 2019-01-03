<template>
    <div>
        <tree-table
                overflow-visible
                ref="table"
                :data="data"
                :columns="columns"
                :border=true
                :show-header=true
                :show-row-hover=true
                :tree-type=true
                :is-fold=false
                :expand-type=true
        >

            <template slot="$expand" slot-scope="scope">
                <tree-table
                        overflow-visible
                        :data="attrDesData[scope.rowIndex]"
                        :columns="attrColumns"
                        :border=true
                        :is-fold=false
                        :show-index=true
                        :show-header=true
                        :show-row-hover=false
                        :expand-type=false
                >
                    <template slot="attrMember" slot-scope="scope">
                        <Select v-if="Object.keys(curAttrMemberEnums).length !== 0 &&
                            scope.rowIndex===curAttrDesIndex"
                                @on-change="changeAttrDesMember($event, scope.rowIndex)"
                                :value="scope.row.attrMember"
                        >
                            <Option v-for="(item, index) in Object.keys(curAttrMemberEnums)" :key="index"
                                    :value="item">
                                {{item}}
                            </Option>
                        </Select>

                        <span v-else>{{scope.row.attrMember}}</span>
                    </template>
                    <template slot="attrValue" slot-scope="scope">
                        <Input
                                v-if="(['number', 'string'].includes(scope.row.attrType))&&
                                    scope.rowIndex===curAttrDesIndex"
                                type="text"
                                :value="scope.row.attrValue"
                                @input="changeAttrDesValue($event, scope.rowIndex)">
                        </Input>
                        <Select v-else-if="scope.row.attrType === 'enum' && scope.rowIndex===curAttrDesIndex"
                                @on-change="changeAttrDesValue($event, scope.rowIndex)"
                                :value="scope.row.attrValue"
                        >
                            <Option v-for="(item, index) in curAttrValueEnums" :key="index" :value="item">{{item}}
                            </Option>
                        </Select>
                        <span v-else>{{scope.row.attrValue}}</span>
                    </template>
                    <template slot="operate" slot-scope="scope">

                        <Button size="small" v-show="!['', 'string', 'number', 'enum'].includes(scope.row.attrType)"
                                @click="addSubDescription(scope.rowIndex)"
                        >+子描述
                        </Button>
                    </template>
                </tree-table>
            </template>
            <template slot="id" slot-scope="scope">
                {{dataShadow[scope.rowIndex].id}}
            </template>
            <template slot="father" slot-scope="scope">
                {{dataShadow[scope.rowIndex].father}}
            </template>
            <template slot="entry" slot-scope="scope">
                <Select v-if="editIndex === scope.rowIndex" @on-change="entryDropdownChange"
                        :value="dataShadow[scope.rowIndex].entry">
                    <Option v-for="(item,index) in Object.keys(entryEnums)" :key="index" :value="item">{{item}}</Option>
                </Select>
                <div v-else>{{dataShadow[scope.rowIndex].entry}}</div>
            </template>
            <template slot="attribute" slot-scope="scope">
                <Select v-if="editIndex === scope.rowIndex" @on-change="attrDropdownChange"
                        :value="dataShadow[scope.rowIndex].attr">
                    <Option v-for="(item, index) in Object.keys(attrEnums)" :key="index" :value="item">{{item}}</Option>
                </Select>
                <div v-else>{{dataShadow[scope.rowIndex].attr}}</div>
            </template>
            <template slot="action" slot-scope="scope">
                <Select v-if="editIndex === scope.rowIndex" @on-change="actionDropdownChange"
                        :value="dataShadow[scope.rowIndex].action">
                    <Option v-for="(item, index) in Object.keys(actionEnums)" :key="index" :value="item">{{item}}
                    </Option>
                </Select>
                <div v-else>{{dataShadow[scope.rowIndex].action}}</div>
            </template>
            <template slot="operate" slot-scope="scope">
                <Button size="small" @click="addSubEvent(scope.rowIndex)">+子事件</Button>
                <Button size="small" @click="addAttrDescription(scope.row, scope.rowIndex)">+描述</Button>
            </template>
        </tree-table>
        <Button type="primary" @click="addEvent">新增</Button>
    </div>
</template>

<script>
    import {getEntryInfo, getAttrInfo, getActionInfo, getAttrDes} from "../../data/fetch"

    export default {
        name: "testcaseEvent",

        computed: {
            //只读，这是this.attrDesData的引用
            curDesSet: {
                get() {
                    return this.attrDesData[this.editIndex];
                }
            },
            //只读，这是this.attrDesDataShadow的引用
            curDesList: {
                get() {
                    return this.attrDesDataShadow[this.editIndex];
                }
            },
        },

        methods: {
            getAttr(){
                return this.dataShadow[this.editIndex].attr
            },
            setAttr(value){
                this.dataShadow[this.editIndex].attr = value
            },
            getEntry(){
                return this.dataShadow[this.editIndex].entry;
            },
            setEntry(value){
                this.dataShadow[this.editIndex].entry = value;
            },
            getAction(){
                return this.dataShadow[this.editIndex].action
            },
            setAction(value){
                this.dataShadow[this.editIndex].action = value;
            },
            //计算该节点下子节点个数
            computedChildrenNum(node) {
                if (node.children === undefined || node.children.length === 0) return 0;
                let sum = 0;
                for (let item of node.children) {
                    sum += this.computedChildrenNum(item) + 1;
                }
                return sum;
            },

            //新增按钮click事件
            addEvent() {
                //获取“实体下拉框数据”以及“行为下拉框数据”
                if (Object.keys(this.entryEnums).length === 0) {
                    this.entryEnums = Object.assign({}, getEntryInfo());
                    this.actionEnums = Object.assign({}, getActionInfo());
                }
                let newEvent = {
                    id: this.curEventID++,
                    father: 0,
                    entry: '',
                    attribute: '',
                    action: '',
                    children:[],
                }
                this.data.push(newEvent);
                this.dataShadow.push(newEvent);

                //重置操作
                this.curAttrMemberEnums = {};
                this.curAttrValueEnums = [];

                this.editIndex = this.dataShadow.length - 1;
                this.curAttrDesIndex = -1;

                //新增操作
                this.attrDesData.push([]);
                this.attrDesDataShadow.push([]);
            },
            //实体下拉框on-change事件
            entryDropdownChange(value) {
                this.setEntry(value === undefined ? '' : value);
                //动态改变属性下拉框枚举值
                this.attrEnums = Object.assign({}, getAttrInfo(value));

                //清除该实体下全部属性描述
                this.curDesSet.splice(0);
                this.curDesList.splice(0);
                this.curAttrMemberEnums = {};
                this.curAttrValueEnums.splice(0);
            },
            //属性下拉框on-change事件
            attrDropdownChange(value) {
                this.setAttr(value === undefined ? '' : value)

                this.curDesSet.splice(0);
                this.curDesList.splice(0);
                this.curAttrMemberEnums = {};
                this.curAttrValueEnums.splice(0);
            },
            //行为下拉框改变事件
            actionDropdownChange(value) {
                this.setAction(value === undefined ? '' : value)
            },
            // //编辑按钮click事件
            // editEvent(index) {
            //     this.editIndex = index
            // },
            addSubEvent(index){
                let newEvent = {
                    id: this.curEventID++,
                    father: this.dataShadow[index].id,
                    entry: '',
                    attribute: '',
                    action: '',
                    children:[],
                };
                this.dataShadow[index].children.push(newEvent);

                //计算当前索引
                this.editIndex = index + this.computedChildrenNum(this.dataShadow[index]);

                this.dataShadow.splice(this.editIndex, 0, newEvent);

                //重置操作
                this.curAttrMemberEnums = {};
                this.curAttrValueEnums = [];

                //新增操作
                this.attrDesData.splice(this.editIndex, 0, []);
                this.attrDesDataShadow.splice(this.editIndex, 0, []);

                this.curAttrDesIndex = -1;
            },
            //添加属性描述click事件
            addAttrDescription(row, index) {
                this.editIndex = index;

                //更新“属性描述”成员下拉信息
                this.curAttrMemberEnums = Object.assign({}, getAttrDes(this.getEntry(), this.getAttr()));
                if (this.curAttrValueEnums.length !== 0) this.curAttrValueEnums.splice(0);

                let newAttrDes = {
                    attrType:
                        Object.keys(this.curAttrMemberEnums).length !== 0 ?
                            '' :
                            this.attrEnums[this.getAttr()].type,
                    attrMember: '',
                    attrValue: '',
                    parent: undefined,
                    children: []
                };
                this.curDesSet.push(newAttrDes);
                this.curDesList.push(newAttrDes);

                this.curAttrDesIndex = this.curDesList.length - 1;

                this.$refs.table.$refs['table-body'].toggleStatus('Expanded', row, index, true);
            },
            //“属性描述表”成员下拉框change事件
            changeAttrDesMember(value, index) {
                if(value !== undefined && value !== ''){
                    this.curDesList[index].attrMember = value;
                    this.curDesList[index].attrType = this.curAttrMemberEnums[value].type;
                    this.curAttrValueEnums = Object.assign([], this.curAttrMemberEnums[value].value);
                }
            },
            //“添加子属性”按钮click事件
            addSubDescription(index) {

                let newAttrDes = {
                    attrType: '',
                    attrMember: '',
                    attrValue: '',
                    parent: this.curDesList[index],
                    children: []
                };
                this.curDesList[index].children.push(newAttrDes);

                //更新线性结构假定index就是线性结构中的索引
                let childrenNum = this.computedChildrenNum(this.curDesList[index]);
                this.curDesList.splice(index + childrenNum, 0, newAttrDes);
                this.curAttrDesIndex = index + childrenNum;
                this.curAttrMemberEnums = Object.assign({}, getAttrInfo(this.curDesList[index].attrMember));
                this.curAttrValueEnums = [];
            },
            changeAttrDesValue(value, index) {
                if (this.curDesList[index].attrType === "number") {
                    this.curDesList[index].attrValue = Number(value);
                } else {
                    this.curDesList[index].attrValue = value;
                }

            },
        },
        data() {
            return {
                //当前“事件表”的编辑索引,每个方法都要确保editIndex数据的正确
                editIndex: -1,
                //当前“事件表”的编辑事件ID
                curEventID: 1,
                //当前实体下拉列表的可选项
                entryEnums: {},
                //当前属性的下拉列表可选项
                attrEnums: {},
                //当前行为的下拉列表可选项
                actionEnums: {},
                //当前“属性描述表”的成员下拉枚举
                curAttrMemberEnums: {},
                //当前“属性描述表的值下拉枚举
                curAttrValueEnums: [],

                curAttrDesIndex: -1,

                //“事件表”数据结构
                // id       事件ID
                // father   父事件ID
                // entry    实体
                // attr     属性
                // action   行为
                // children 子事件
                //层次结构
                data: [],
                //线性结构，同步this.data
                dataShadow: [],

                //“属性描述表”数据，层次结构
                // {
                //     attrType     //属性类型
                //     attrMember   //属性成员列表
                //     attrValue    //属性值
                //     parent       //父成员引用，默认undefined
                //     children     //子成员列表，默认[]
                // }
                attrDesData: [],
                //与attrDesData同步，线性结构
                //attrDesData与attrDesDataShadow第一级索引与事件的线性结构保持一致
                attrDesDataShadow: [],

                //“属性描述表”的列头
                attrColumns: [
                    {
                        title: '类型',
                        key: 'attrType',
                        type: 'template',
                        template: 'attrType'
                    },
                    {
                        title: '成员',
                        key: 'attrMember',
                        type: 'template',
                        template: 'attrMember'
                    },
                    {
                        title: '值',
                        key: 'attrValue',
                        type: 'template',
                        template: 'attrValue'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        type: 'template',
                        template: 'operate'
                    }
                ],
                //“事件表”的列头
                columns: [
                    {
                        title: 'EventID',
                        key: 'id',
                        maxWidth: '160px',
                        type: 'template',
                        template: 'id',
                    },
                    {
                        title: '父事件ID',
                        key: 'father',
                        maxWidth: '160px',
                        type: 'template',
                        template: 'father',
                    },
                    {
                        title: '实体',
                        key: 'entry',
                        maxWidth: '240px',
                        type: 'template',
                        template: 'entry',
                    },
                    {
                        title: '属性',
                        key: 'attribute',
                        type: 'template',
                        template: 'attribute',
                    },
                    {
                        title: '行为',
                        key: 'action',
                        type: 'template',
                        template: 'action',
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        type: 'template',
                        template: 'operate',
                    },
                ],
            };
        }
    }
</script>

<style scoped>

</style>
