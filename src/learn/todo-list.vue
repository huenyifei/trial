<!--<template>-->
    <!--<ul>-->
        <!--<li v-for="todo in todos">-->
            <!--<slot :todo="todo"></slot>-->
        <!--</li>-->
    <!--</ul>-->
<!--</template>-->

<script>
    export default {
        name: "todo-list",
        props:["todos"],
        render (h){
            var nodes = []
            for(var todo in this.todos){
                var item = this.todos[todo];
                nodes.push(h('li', [this.$scopedSlots.default({todo:item})]));
            }
            return h('ul', nodes)
        }
    }
</script>

<style scoped>

</style>
