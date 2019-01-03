<template>
    <Table :columns="columns" :data="data" overflow-visible ref="table">
        <template slot-scope="{ row, index }" slot="entry">
            <Dropdown v-model="editEntry" v-if="editIndex === index" ref="dropdown" />
            <span v-else>{{ row.entry }}</span>
        </template>


        <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
                <Button @click="handleSave(row, index)">保存</Button>
                <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
                <Button @click="handleNew(row, index)" :disabled="addButtonEnable">添加</Button>
                <Button @click="handleEdit(row, index)"  :disabled="changeButtonEnable">更改</Button>
                <Button @click="handleClear(row, index)" :disabled="emptyButtonEnable">清空</Button>
            </div>
        </template>
    </Table>
</template>
<script>
    // import expandRow from './table-expand.vue';
    import Dropdown from './dropdown.vue'
    import DropdownTable from './dropdownTable.vue'

    export default {
        components: {DropdownTable, Dropdown},
        data() {
            return {
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(DropdownTable, {
                                style: "margin-left:120px; border-width:0 1px",
                                props: {
                                    row: params.row,
                                },
                                on:{
                                    "enable-add-button":()=>{
                                        this.addButtonEnable = false;
                                    },
                                    "enable-empty-button":()=>{
                                        this.emptyButtonEnable = false;
                                    },
                                    "disable-empty-button":()=>{
                                        this.emptyButtonEnable = true;
                                    },
                                    "enable-change-button":()=>{
                                        this.changeButtonEnable = false;
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '实体',
                        slot: 'entry'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        entry: 'AGV',
                        attrs: [
                            {
                                attr: 'battery',
                                value: '52',
                                type: 'String',
                            },
                            {
                                attr: 'speed',
                                value: '3.2',
                                type: 'Number',
                            }
                        ]
                    },
                    {
                        entry: 'CONTAINER',
                        attrs: [
                            {
                                attr: 'container1',
                                value: 'CONT0001',
                                type: 'String',
                            },
                            {
                                attr: 'container2',
                                value: 'CONT0002',
                                type: 'String',
                            }
                        ]
                    },
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editEntry: '',
                sureChange: false,
                addButtonEnable:false,
                emptyButtonEnable:false,
                changeButtonEnable:false,
            }
        },

        methods: {
            handleEdit(row, index) {
                this.editEntry = row.entry
                this.editIndex = index
            },
            handleClear(row, index) {
                //不能操作this.data否则panel会重现渲染，panel也会收起来
                row.attrs.splice(0)
                this.emptyButtonEnable = true;
            },
            handleNew(row, index) {
                let tableComponent = this.$refs.table;

                if(!tableComponent.objData[index]._isExpanded){
                    tableComponent.toggleExpand(index);
                }

                this.addButtonEnable = true;
                this.emptyButtonEnable = true;
                this.changeButtonEnable = true;
                row.attrs.push(
                    {
                        attr: undefined,
                        value: undefined,
                        type: undefined,
                    }
                )
            },
            handleSave(row, index) {
                if(row.entry !== this.editEntry){
                    this.$Modal.confirm({
                        title:'警告',
                        content: '<p>点击“确定”将删除该实体下所有属性！</p>',
                        onOk: () => {
                            row.attrs.splice(0)
                            row.entry = this.editEntry
                            this.editIndex = -1
                            this.emptyButtonEnable = true
                        }
                    });
                } else {
                    this.editIndex = -1
                }
            },
        }
    }
</script>
<style>
</style>
