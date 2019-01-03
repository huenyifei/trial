<template>
    <div>
        <Row>
            <i-col>
                <Steps :current="currentStep" class="steps">
                    <Step title="清理" content="测试用例执行前的数据清空操作" icon="ios-leaf"></Step>
                    <Step title="设置" content="测试用例执行前的状态设置" icon="ios-construct"></Step>
                    <Step title="任务" content="测试用例发送给系统的任务" icon="md-subway"></Step>
                    <Step title="事件" content="测试用例执行过程预期发生的事件" icon="ios-thunderstorm"></Step>
                    <Step title="完成" content="测试用例信息描述" icon="md-checkmark-circle"></Step>
                </Steps>
            </i-col>
        </Row>
        <Row class="content">
            <i-col>
                <Clean ref="clean" v-show="currentStep === 0"></Clean>
                <Init ref="init" v-show="currentStep === 1"></Init>
                <Task ref="task" v-show="currentStep === 2"></Task>
            </i-col>
        </Row>
        <div class="action">
            <Button type="primary" @click="prev">上一步</Button>
            <Button type="primary" @click="next">下一步</Button>
        </div>

    </div>
</template>

<script>
    import Clean from './testcaseClean.vue';
    import Init from './testcaseInit.vue';
    import Task from './testcaseTaskInput.vue';
    export default {
        components: { Clean, Init ,Task},
        name: "testcaseStep",
        data: function(){
            return {
                currentStep: 0,
            }
        },
        methods: {
            prev () {
                if (this.currentStep !== 0) {
                    this.currentStep -= 1;
                }
            },
            next () {
                if (this.currentStep !== 4) {
                    this.currentStep += 1;
                }
            }
        }
    }
</script>

<style scoped>
    .steps {
        margin-bottom:40px;
    }
    .action{
        float: right;
        /*margin-right:5px;*/
        /*margin-top:-32px;*/
        /*margin-bottom:32px;*/
    }
    .buttonPlacehold{
        height:32px;
    }
</style>
