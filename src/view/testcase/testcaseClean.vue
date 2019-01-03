<template>
    <div>
        <Table class="table" border ref="selection" :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
    export default {
        name:'testcaseClean',
        data () {
            return {
                columns: [
                    {
                        title: '实体',
                        key: 'name'
                    },
                    {
                        title:'是否清理',
                        type: 'selection',
                        width: 180,
                        align: 'center'
                    },
                ],
                data: [
                    {
                        name: 'WI',
                    },
                    {
                        name: 'WQ',
                    },
                    {
                        name: 'AGV',
                    },
                    {
                        name: 'CONTAINER',
                    }
                ]
            }
        },
    }
</script>

<style scoped>
    .table {
        margin-bottom:15px;
    }
</style>
