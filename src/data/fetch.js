
function getEntryInfo(){
    return {
        AGV:{
            required:true,
            type: "agv"
        },
        CONTAINER:{
            required: true,
            type: "container"
        },
        WQ:{
            required:true,
            type:"wq"
        },
        WI:{
            required:true,
            type:"wi"
        },
        TASK:{
            required:true,
            type:"task"
        },
        LANE:{
            required: true,
            type: "lane"
        },
        RACK:{
            required:true,
            type:"rack"
        }
    }
}

function getActionInfo(){
    return {
        CREATE:{
            required:"true",
            type:"string"
        },
        DELETE:{
            required:"true",
            type:"string"
        },
        OLD:{
            required:"true",
            type:"string"
        },
        NEW:{
            required:"true",
            type:"string"
        },
        MATCH:{
            required:"true",
            type:"string"
        },
        NOMATCH:{
            required:"true",
            type:"string"
        },
        IN:{
            required:"true",
            type:"string"
        },
        INCREASE:{
            required:"true",
            type:"string"
        },
        DECREASE:{
            required:"true",
            type:"string"
        },
    }
}

function getAttrInfo(entryName){
    if(entryName === "number" ||
        entryName === "string" ||
        entryName === null ||
        entryName === undefined)
        return undefined;
    return require('./'+ entryName.toLowerCase() + '_attr.json');
}

function getAttrDes(entryName, attrName){
    entryName = entryName.toLowerCase();
    attrName = attrName.toLowerCase();
    let entryDes = require('./'+entryName + '_attr.json');
    let attrClass = entryDes[attrName] && entryDes[attrName].type;
    return getAttrInfo(attrClass)
}

exports.getEntryInfo = getEntryInfo;
exports.getAttrInfo = getAttrInfo;
exports.getActionInfo = getActionInfo;
exports.getAttrDes = getAttrDes;
