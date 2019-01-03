<template>
    <div>
        <Row>
            <Col :xs="{span:2, offset:0}" :lg="{span:2, offset:0}">
                <span>实体</span>
            </Col>
            <Col :xs="{span:2, offset:0}" :lg="{span:4, offset:0}">
                <Dropdown :class="['dropdown-margin']"></Dropdown>
            </Col>
            <Col :xs="{span:2, offset:4}" :lg="{span:2, offset:2}">
                <span >属性</span>
            </Col>
            <Col :xs="{span:2, offset:0}" :lg="{span:4, offset:0}">
                <Dropdown :class="['dropdown-margin']"></Dropdown>
            </Col>
            <Col :xs="{span:2, offset:4}" :lg="{span:2, offset:2}">
                <span >行为</span>
            </Col>
            <Col :xs="{span:2, offset:0}" :lg="{span:4, offset:0}">
                <Dropdown :class="['dropdown-margin']"></Dropdown>
            </Col>
        </Row>
        <br>
        <Row>
        </Row>
        <Row>
            <Col  :xs="{span:24, offset:0}" :lg="{span:24, offset:0}">
                <div class="jsoneditor-vue"></div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import Dropdown from './dropdown.vue'
    import JSONEditor from 'jsoneditor'

    export default {
        name: "testcaseTaskInput",
        components: {Dropdown},

        mounted () {
            // create the editor
            let container = this.$el.querySelector('.jsoneditor-vue');
            let options = {mode:'view', modes:['tree', 'code', 'form', 'text', 'view']};
            let editor = new JSONEditor(container, options);

            // set json
            let json = {
                "Array": [1, 2, 3],
                "Boolean": true,
                "Null": null,
                "Number": 123,
                "Object": {"a": "b", "c": "d"},
                "String": "Hello World"
            };
            editor.set(json);

            // get json
            // let json = editor.get();
        }
    }
</script>

<style scoped>
    span {
        margin:3px 6px;
        float:right;
        font-size: 2.4em;
    }

    .dropdown-margin {
        margin:10px 15px;
    }

    @media screen and (max-width: 768px) {
        span {
            margin-top: 16px;
            margin-right: 0px;
            font-size: 1.2em;
        }
        .dropdown-margin {
            margin-left:12px;
        }
    }
</style>
