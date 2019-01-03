<template>
    <Table :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="name">
            <Input type="text" v-model="editName" v-if="editIndex === index" />
            <span v-else>{{ row.name }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
                <Button @click="handleSave(index)">保存</Button>
                <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
                <Button @click="handleEdit(row, index)">操作</Button>
            </div>
        </template>
    </Table>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '姓名',
                        slot: 'name'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        name: '王小明',
                    },
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editAge: '',  // 第二列输入框
                editBirthday: '',  // 第三列输入框
                editAddress: '',  // 第四列输入框
            }
        },
        methods: {
            handleEdit (row, index) {
                this.editName = row.name;
                this.editIndex = index;
            },
            handleSave (index) {
                this.data[index].name = this.editName;
                this.editIndex = -1;
            },
        }
    }
</script>
