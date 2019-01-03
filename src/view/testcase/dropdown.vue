
<script>
    export default {
        render:function(h){
            let optionList = []
            let options = []
            for (let item of this.cityList) {
                optionList.push(h('Option', {
                    props: {
                        value: item.value,
                        key: item.value,
                    }
                }, [
                    item.label,
                ]))
            }

            return h('div',[
                h('Select', {
                    'class':{
                        Select:true,
                    },
                    props:{
                        value:this.curValue,
                    },
                    on:{
                        'on-change':this.change,
                    }
                }, optionList)
            ])
        },
        props:{
            value:{
                type: String,
            }
        },
        computed: {
            widthStyle(){
                return `width:${this.width}px`;
            }
        },
        data () {
            return {
                cityList:[
                    {
                        label:'@test',
                        value:'test'
                    },
                    {
                        label:'@test1',
                        value:'test1'
                    }
                ],
                data: [
                    "UNKNOWN",
                    {
                        Test:{
                            label:"@test",
                            value:"test"
                        }
                    },
                    {
                        AGV:{
                            label:"@AGV",
                            value:"AGV",
                            agvid:{
                                label:"AGVID",
                                value:"agvid",
                                type:String,
                                required:true,
                            },
                            cont1:{
                                type: String,
                                required:false,
                                default:""
                            },
                            cont2:{
                                type: String,
                                required:false,
                                default:""
                            },
                            enable:{
                                type:Boolean,
                                required:false,
                                default:true
                            },
                            lane:{
                                type:Number,
                                required:false,
                            }
                        }
                    },
                    {
                        Container:{
                            name:{
                                type:Number,
                                required:true
                            }
                        }
                    },
                    {
                        Lane:{
                            id:{
                                type:Number,
                                required: false
                            },
                            name:{
                                type:String,
                                required: false
                            },
                            type:{
                                type:String,
                                required: false
                            },
                            eqid:{
                                type:Number,
                                required: false
                            },
                            attr:{
                                type:Number,
                                required: false
                            }
                        }
                    }
                ],
                curValue: this.value
            }
        },
        methods:{
            change(value){
                this.curValue = value
                this.$emit('input',this.curValue)
            }
        }
    }
</script>

<style scoped>
    .Select{
        width:200px;
    }

    @media screen and (max-width: 768px) {
        .Select{
            width:100px;
        }
    }
</style>
