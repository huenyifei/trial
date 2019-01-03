<template>
    <Table :columns="columns" :data="curData">
        <template slot-scope="{ row, index }" slot="attr">
            <span v-if="isReadOnly(index)">{{ row.attr }}</span>
            <div v-else style="width:204px;" :class="{'warning': editAttr === '' && isWarning}">
                <Dropdown v-model="editAttr"/>
            </div>

        </template>

        <template slot-scope="{ row, index }" slot="value">
            <span v-if="isReadOnly(index)">{{ row.value }}</span>
            <Input v-else type="text" v-model="editValue" :class="{'warning': editValue === '' && isWarning}"/>
        </template>


        <template slot-scope="{ row, index }" slot="type">
            <span v-if="row.type===undefined">-</span>
            <span v-else>{{ row.type }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
            <div v-if="isReadOnly(index)">
                <Button @click="handleEdit(row, index)" :disabled="buttonDisable">更改</Button>
                <Button @click="handleDelete(index)" :disabled="buttonDisable">删除</Button>
            </div>
            <div v-else>
                <Button @click="handleSave(row, index)">保存</Button>
                <Button @click="handleCancel">取消</Button>
            </div>
        </template>
    </Table>
</template>
<script>
    import Dropdown from './dropdown.vue'

    export default {
        props: ['row'],
        created: function () {
            this.curData = this.row.attrs
            this.dataNum = this.curData.filter(item => {
                for (var member in item) {
                    if (item[member] !== undefined) return true
                }
                return false
            }).length
        },
        components: {Dropdown},
        data() {
            return {
                columns: [
                    {
                        title: '属性',
                        slot: 'attr'
                    },
                    {
                        title: '值',
                        slot: 'value'
                    },
                    {
                        title: '类型',
                        slot: 'type'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                curData: [],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editAttr: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 curData 分离避免重构的闪烁
                editValue: '',
                dataNum: 0,
                isWarning: false,
                buttonDisable:false,
            }
        },
        watch: {
            curData() {
                //初始化
                if (this.curData.length === 0) {
                    this.editIndex = -1
                    this.dataNum = 0
                    this.editAttr = ''
                    this.editValue = ''
                }
            }
        },
        methods: {
            handleEdit(row, index) {
                this.buttonDisable = true
                this.editAttr = row.attr
                this.editValue = row.value
                this.editIndex = index
            },
            handleSave(row, index) {
                this.isWarning = this.editAttr === '' || this.editValue === '';

                if (!this.isWarning) {
                    this.editIndex = -1
                    this.curData[index].attr = this.editAttr
                    this.curData[index].value = this.editValue
                    this.dataNum = this.curData.length
                    this.editAttr = '';
                    this.editValue = '';
                    this.buttonDisable = false;
                    this.enableButton()
                }
            },
            handleDelete(index) {
                this.editIndex = -1
                this.curData.splice(index, 1)
                this.dataNum = this.curData.length
                if (this.dataNum === 0) this.$emit("disable-empty-button")
            },
            handleCancel() {
                this.buttonDisable = false
                this.editIndex = -1
                if (this.dataNum !== this.curData.length) {
                    this.curData.pop()
                    this.enableButton()
                }
            },
            isReadOnly(index) {
                if (this.editIndex === -1 && this.dataNum !== this.curData.length) {
                    this.buttonDisable = true
                    this.editIndex = this.dataNum
                }

                return index !== this.editIndex
            },
            enableButton() {
                this.$emit('enable-add-button');
                this.$emit('enable-change-button');
                this.$emit('enable-empty-button');
            }
        },
    }
</script>

<style>
    .warning {
        border: 2px solid red;
        border-radius: 6px;
    }
</style>
