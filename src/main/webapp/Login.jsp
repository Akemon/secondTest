<%--
  Created by IntelliJ IDEA.
  User: HK
  Date: 2017/10/10
  Time: 21:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="static/js/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="static/bootstrap-3.3.7-dist/css/bootstrap.css" type="text/css" />
    <script type="text/javascript" src="static/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="static/js/login.js"></script>
</head>
<style>
    body{
        background-image:url("static/img/background.jpg");
        background-size:cover;
    }
    img{
        width:80px ;
        height:40px;
    }

</style>
<body>
<div align="center" style="margin-top:20%">
    <form class="form-horizontal" style="width:350px" id="userForm" name="userForm">
        <div class="form-group">
            <div class="col-sm-11">
                <input type="text" class="form-control" id="loginName" name ="loginName"
                       placeholder="请输入用户名">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-11">
                <input type="password" class="form-control" id="loginPass" name ="loginPass"
                       placeholder="请输入密码">
            </div>
        </div>
        <!-- 验证码 -->
        <div class="form-group">
            <div class="col-sm-9">
                <input  class="form-control" id="numberCheck" name="numberCheck"
                        placeholder="请输入右边的验证码">
            </div>
            <img id="captchaImage" src="getVerifyCode" />
        </div>
        <button class="btn btn-primary btn-lg btn-block" id="loginBtn">登录</button>

    </form>
</div>
</body>
</html>
