//图片刷新
$(document).on("click","#captchaImage",function () {
    $("#captchaImage").attr("src","getVerifyCode?data=" + new Date().getTime());
})

//登录按钮点击事件
$(document).on("click","#loginBtn",function () {
    var flag =false;
    //判断表单是否为空
    $("input").each(function () {
        if($(this).val()==""){
            alert("表单信息不能为空");
            flag=true;
            return false;
        }
    })
    if(flag) return false;
    //登录
    userLogin();

})

//用户登录
function userLogin() {
    var formData =($('#userForm').serialize());
    formData = decodeURIComponent(formData,true);
    //  alert(formData);
    $.ajax({
        url:"http://localhost:8080/userLogin",
        type:"POST",
        data:formData,
        async : false,
        success:function (result) {
            // console.log(result);
            if(result.code==100){
                window.open("index2.jsp");
            }else{
                $.each(result.extend,function (index,item) {
                    alert(item);
                })
            }


        }
    })


}
