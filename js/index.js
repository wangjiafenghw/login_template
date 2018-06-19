
var data = {
    step: {
        process: '0%',
        stepNum: 0
    },
    input: {
        username: null,
        password: null,
        submit: false,
        msg: '请将信息填写完整'
    }
}
function onLoad(){
    this.init();
    
}


//监听填写进度
function stepHandler() {
    var that = window;
    var stepNum = 0;
    if(that.data.input.username){
        stepNum ++;
    }
    if(that.data.input.password){
        stepNum ++;
    }
    changeStep(stepNum, null)
}

//判断并改变进度图标
function checkChangeProcessLogo(){
    var that = this;
    if(that.data.input.username && that.data.input.password){
        $("#processLogo").attr("src", "./image/over.png")
        that.data.input.submit = true;
    }else{
        $("#processLogo").attr("src", "./image/loading.png")
    }
}

//改变step 0,1,2 => 0%, 50%, 100%
function changeStep(value){
    var el = $("#step");
    el.css({"width": value*50+"%"});
    el.attr("aria-valuenow", value*50);
    el.html(value + '/2')
}

//初始化数据
function init(){
    this.data.step = {
        process: '0%',
        stepNum: 0
    }
}


//启动动画

$(document).ready(function(){
    onLoad();
})
$("#username").on("input", function(e){
    var that = window;
    that.data.input.username = $(this)[0].value;
    if(that.data.input.password){
        that.data.input.password = null;
        $("#password")[0].value = '';
    }
    if(1){          //正则判断
        stepHandler()
        checkChangeProcessLogo();
    }

})
$("#password").on("input", function(e){
    var that = window;
    that.data.input.password = $(this)[0].value;
    if(1){             //正则判断
        stepHandler()
        checkChangeProcessLogo();
    }
})
$(".form-control").on("blur", function(e){
    checkChangeProcessLogo();
})

var submit = function(){
    var that = window;
    if(that.data.input.submit){
        checkUsernamePassword()
        
    }
    that.modal()
}

function modal(){
    var that = window;
    $('#modalContent').html(that.data.input.msg)
    $('#myModal').modal('show')
}

//测试用函数，生产环境下删除
function checkUsernamePassword(){
    var that = window;
    var sqlret = {
        username: ['admin'],
        password: ['admin']
    }
    var index = sqlret.username.indexOf(that.data.input.username)
    if(index>=0){
        if(sqlret.password[index]===that.data.input.password){
            that.data.input.msg = '登陆成功';
            console.log('登陆成功')
        }else{
            that.data.input.msg = '密码错误';
            console.log('密码错误')
        }
    }else{
        that.data.input.msg = '用户名不存在';
        console.log('用户名不存在')
    }
}
