
<!--获取所有用户信息 -->
    $(document).ready(function () {
        //alert("进入初始化");
        toPage(1);
    })
//页面跳转
function toPage(pageNum) {
    var searchString =$("#searchString").val();
    $.ajax({
        url:"http://localhost:8080/getAllUsers",
        type:"POST",
        data:"pageNum="+pageNum+"&searchString="+searchString,
        success:function (result) {
            //成功获取数据
            if(result.code==100){
                console.log(result);
                //显示用户信息
                showUserMessages(result);
                //显示分布信息
                showSplitPageMessage(result);
                //显示页码信息
                showPagesMessage(result);
            }else{
                window.open("http://localhost:8080/Login.jsp");
            }


        }
    })
}

//显示用户信息
function showUserMessages(result) {

    $("#user_table tbody").empty();
    var users =result.extend.pageInfo.list;
    $.each(users,function (index,item) {
        //  alert(item.name);
        var checkbox =$("<th></th>").append($("<input></input>").prop("type","checkbox").addClass("check_item"));
        var id =$("<th></th>").append(item.userId);
        var name =$("<th></th>").append(item.name);
        var loginName=$("<th></th>").append(item.loginName);
        var age=$("<th></th>").append(item.age);
        var sex=$("<th></th>").append(item.sex);
        var email=$("<th></th>").append(item.email);
        var department=$("<th></th>").append(item.department.deptName);
        var edidBtn=$("<button></button>").addClass("btn btn-primary btn-sm editBtn").attr("data-toggle","modal").attr("data-target","#updateUser").attr("user_ID",item.userId)
            .append($("<span><span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
        var deleBtn =$("<button></button>").addClass("btn btn-danger btn-sm deleBtn").attr("user_ID",item.userId)
            .append($("<span><span>").addClass("glyphicon glyphicon-trash")).append("删除");
        $("<tr></tr>").append(checkbox)
            .append(id)
            .append(name)
            .append(loginName)
            .append(age)
            .append(sex)
            .append(email)
            .append(department)
            .append(edidBtn)
            .append(deleBtn)
            .appendTo("#user_table tbody");
    })
}

//显示分布信息
function showSplitPageMessage(result) {
    $("#show_page_basicInfo").empty();
    var currentPageNum = result.extend.pageInfo.pageNum;
    var allPageNum =result.extend.pageInfo.pages;
    var allDataNum =result.extend.pageInfo.total;
    var elementVal ="当前第"+currentPageNum+"页，总共"+allPageNum+"页，共有"+allDataNum+"条数据";
    $("#show_page_basicInfo").html(elementVal);
}
//显示页码信息
function showPagesMessage(result) {
    $("#show_ul_Info").empty();
    var ul =$("#show_ul_Info");
    var firstElement =$("<li></li>").append($("<a></a>").prop("href","#").append("首页"));
    var preElement =$("<li></li>").append($("<a></a>").prop("href","#").append("&laquo;"));
    //当前为第一页
    if(result.extend.pageInfo.isFirstPage){
        firstElement.addClass("disabled");
        preElement.addClass("disabled");
    }else{
        //添加点击事件
        firstElement.click(function () {
            toPage(1);
        })
        preElement.click(function () {
            toPage(result.extend.pageInfo.pageNum-1);
        })
    }
    ul.append(firstElement).append(preElement);
    $.each(result.extend.pageInfo.navigatepageNums,function (index,item) {
        var numLi =$("<li></li>").append($("<a></a>").prop("href","#").append(item));
        if(result.extend.pageInfo.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            toPage(item);
        })
        ul.append(numLi);
    })
    var nextElement =$("<li></li>").append($("<a></a>").prop("href","#").append("&raquo;"));
    var lastElement = $("<li></li>").append($("<a></a>").prop("href","#").append("末页"));
    //当前为最后一页
    if(result.extend.pageInfo.isLastPage){
        nextElement.addClass("disabled");
        lastElement.addClass("disabled");
    }else{
        //添加点击事件
        nextElement.click(function () {
            toPage(result.extend.pageInfo.pageNum+1);
        })
        lastElement.click(function () {
            toPage(result.extend.pageInfo.pages);
        })
    }
    ul.append(nextElement);
    ul.append(lastElement);
}


<!--获取所有部门-->
function  getAllDepts(ele,id) {
    //清空表单内容与样式(增加用户时)
    if(ele=='#addUser'){
        cleanAddUserForm('#addUser form');

        //发送请求获取身份
        $.ajax({
            url:"http://localhost:8080/getAllRoles",
            type:"POST",
            async : false,
            success:function (result) {
                // console.log(result);
                $(ele+' select:last').empty();
                $.each(result.extend.roles,function (index,item) {
                    //    alert(item);
                    var selectOption= $("<option></option>").append(item.roleName).attr("value",item.roleId);
                    selectOption.appendTo(ele+' select:last');
                })
            }
        })
    }
    //发送请求获取所有部门
    $.ajax({
        url:"http://localhost:8080/getAllDepts",
        type:"POST",
        async : false,
        success:function (result) {
            $(ele+' select:first').empty();
            $.each(result.extend.depts,function (index,item) {
                //    alert(item);
                var selectOption= $("<option></option>").append(item.deptName).attr("value",item.deptId);
                selectOption.appendTo(ele+' select:first');
            })
        }
    })






    //如果为编辑，需要再交次发送请求，获取取当前id的信息，填入模态框
    //  alert("id:"+id);
    if(ele=='#updateUser'){
        $.ajax({
            url:"http://localhost:8080/getUser",
            type:"POST",
            data:"id="+id,
            async:false,
            success:function (result) {
                var userData =result.extend.user;
                $("#update_userID").val(userData.userId);
                $("#update_name").val(userData.name);
                $("#update_loginName").val(userData.loginName);
                $("#update_loginPass").val(userData.loginPass);
                $("#update_age").val(userData.age);
                $("#update_email").val(userData.email);
                $("#updateUser input[name=sex]").val([userData.sex]);
                $("#updateUser select").val([userData.deptId]);
            }
        })



    }


}
<!--编辑按钮的事件-->
$(document).on("click",".editBtn",function () {

    var userID =$(this).attr("user_ID");
    //alert(userID);
    //获取所有部门信息
    getAllDepts('#updateUser',userID);
});
<!--删除按钮的事件-->
$(document).on("click",".deleBtn",function () {

    var userID =$(this).attr("user_ID");
    // alert(userID);
    //删除用户
    DeleteUser(userID);
});

<!--清空表单样式与内容-->
function  cleanAddUserForm(ele) {
    //清空内容
    $(ele)[0].reset();
    //清空样式
    $(ele).find("*").removeClass("has-error has-success");
    $(ele).find(".help-block").text("");
}

<!--添加用户-->
function  addUser() {
    var formData =($('#addUser form').serialize());
    formData = decodeURIComponent(formData,true);
    //检测数据的有效性
    if(!checkEmail('#email')||!checkAge('#age')||!checkLoginName('#loginName')||!checkPass('#loginPass')){
        alert("信息输入有误，请重新确认");
        return false;
    }
    //  alert(formData);
    $.ajax({
        url:"http://localhost:8080/addUser",
        type:"POST",
        data:formData,
        success:function (result) {
            //判断是否添加成功
            if(result.code==100){
                alert("添加成功");
                $('#addUser').modal('hide');
            }else{
                //用户名重复时
                if(!(result.extend.loginName==undefined)){
                    showValidateMessage('#loginName','不通过',result.extend.loginName);
                };
                //遍历错误字段
                $.each(result.extend.errorFields,function (index,item) {
                    var elementID ="#"+index;
                    showValidateMessage(elementID,'不通过',item);
                })
            }


        }
    })
}
<!--修改用户-->
function  updateUser() {
    var formData =($('#updateUser form').serialize());
    formData = decodeURIComponent(formData,true);
    //检测数据的有效性
    if(!checkEmail('#update_email')||!checkAge('#update_age')||!checkPass('#update_loginPass')){
        alert("信息输入有误，请重新确认");
        return false;
    }
    //  alert(formData);
    $.ajax({
        url:"http://localhost:8080/updateUser",
        type:"POST",
        data:formData,
        success:function (result) {
            console.log(result);
            //判断是否添加成功
            if(result.code==100){
                alert("更新成功");
                $('#updateUser').modal('hide');
            }else{
                //遍历错误字段
                $.each(result.extend.errorFields,function (index,item) {
                    var elementID ="#update_"+index;
                    showValidateMessage(elementID,'不通过',item);
                })
            }


        }
    })
}
<!-- 删除用户-->
function  DeleteUser(id) {
    if(confirm("确认删除吗？")){
        $.ajax({
            url:"http://localhost:8080/deleteUser",
            data:"userId="+id,
            type:"POST",
            success:function (result) {
                if(result.code==100){
                    alert("删除成功");
                }else{
                    alert("删除失败");
                }
            }
        })
    }


}

<!-- 模糊查询-->
function searchUser() {
    toPage(1);
}


function  showValidateMessage(element,status,message) {
    //   alert("进入检测 ");
    $(element).parent().removeClass("has-error has-success");
    $(element).next("span").text("");
    if(status=="通过"){
        $(element).parent().addClass("has-success");
        $(element).next("span").text(message);
    }else{
        $(element).parent().addClass("has-error");
        $(element).next("span").text(message);
    }
}
function checkAge(element) {
    var elementValue =$(element).val();
    if(elementValue>=1&&elementValue<=150){
        showValidateMessage(element,"通过","");
        return true;
    }else{
        showValidateMessage(element,"不通过","非法年龄");
        return false;
    }

}
function checkPass(element) {
    var elementValue =$(element).val();
    if(elementValue!=""){
        showValidateMessage(element,"通过","");
        return true;
    }else{
        showValidateMessage(element,"不通过","密码不能为空");
        return false;
    }

}
function checkEmail(element) {
    var elementValue =$(element).val();
    var regxEmail =/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(regxEmail.test(elementValue)){
        showValidateMessage(element,"通过","");
        return true;
    }else{
        showValidateMessage(element,"不通过","邮箱格式不正确");
        return false;
    }
}

//检查登录名是否重复
function  checkLoginName(element) {
    var elementValue =$(element).val();
    if(elementValue=="") {
        showValidateMessage('#loginName','不通过','用户名不能为空');
        return false;
    }
    // alert(elementValue);
    var flag =false;
    $.ajax({
        url:"http://localhost:8080/checkLoginName",
        data:"loginName="+elementValue,
        type:"POST",
        async : false,
        success:function (result) {
            if(result.code==100){
                showValidateMessage(element,'通过','用户名可用');
                flag =true;
            }else{
                showValidateMessage(element,'不通过','用户名已存在');
                flag =false;
            }
        }
    })
    return flag;

}

//全选按钮逻辑实现
$(document).on("click","#check_all",function () {
    //alert($(this).prop("checked"));
    $(".check_item").prop("checked",$(this).prop("checked"));
});

//check_item
$(document).on("click",".check_item",function () {
    if($(".check_item:checked").length==$(".check_item").length){
        $("#check_all").prop("checked",true);
    }else{
        $("#check_all").prop("checked",false);
    }

})

//全选删除
$(document).on("click","#delete_all_btn",function () {
    var deleteNumber =$(".check_item:checked").length;
    if(deleteNumber==0) {
        alert("请选择要删除的用户");
        return false;
    }
    if(confirm("确认删除选中的"+deleteNumber+"个用户吗")){
        $.each($(".check_item:checked"),function () {
            var id = $(this).parents("tr").find("th:eq(1)").text();
            $.ajax({
                url:"http://localhost:8080/deleteUser",
                data:"userId="+id,
                type:"POST",
                async:false,
                success:function (result) {

                }
            })
        })
        alert("删除成功");
    }


})