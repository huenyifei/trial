<template>
    <todoList :todos="todos">
        <template slot-scope="slotProps">
            <span v-if="slotProps.todo.isComplete">✓</span> {{ slotProps.todo.text }}
        </template>
    </todoList>
</template>

<script>
    import todoList from './todo-list.vue'
    export default {
        name: "todo",
        components:{todoList},
        data:function(){
            return {
                todos:{
                    a:{
                        isComplete:true,
                        text:'hello,Joanna!'
                    },
                    b:{
                        isComplete:false,
                        text:'hello,Colin!'
                    },
                    c:{
                        isComplete:true,
                        text:'hello,Jesy!'
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
