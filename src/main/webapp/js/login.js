//alert("login.js");
//console.log("login.js");
$(function(){
	
//	alert("login.js");
//	console.log("login.js");
//	获取记住账号的cookies
	$(".container form #inputName").val(getCookie("loginName"));
//	给登录表单添加submit事件
	$(".container form").submit(function(){
		
		return login();
//		//false:不用html的页面的表单提交,而是是用js的submit方法提交表单
		//true:用html的页面的表单提交,而是不用js的submit方法提交表单
	});
});
//登录的js方法
	function login(){
////		获取页面表单中的文本框的内容
//		alter("login()")
		var loginName=$(".container form #inputName").val();
		var password=$(".container form #inputPassword").val();
		var remember=$(".container form input[type=checkbox]:checked").val();
//		alert(loginName+"   "+password+ "    "+remember);	
//	alert(loginName +"  "+password);
		
//		把数据异步发送给客户端
	
	$.ajax({
		url:"user/login",
		type:"get",
		dataType:"json",
		data:{
			"loginName":loginName,
			"password":password
			
		},
		success:function(result){
//			alert(result.status+"    "+result.message);
		
				if(result.status==1){
					//服务端正确返回
					//跳转页面
					
//					window.location.href="index.html"
//		    window.location.href="index.jsp"
//					alert("跳转页面上方")
			window.location.href="index.jsp";
						if(remember=="记住账号"){
							
							addCookie("loginName",loginName,5);
						}
				}
				else if(result.status==0){
					alert("登录状态为0");
				}
				
		},
		error:function(){
			alert("请求失败!");
		}		
	});
	return false;
}


//		给表单添加submit时间
//$(function(){
//	$(".container form").submit(function(){
//		return login();
//		
//	})
//	
//});
////登录js的方法
//function login() {
//// 获取登录名
//   var loginName=$(".container form #inputName").val();
//   var password=$(".container form #inputPassword").val();
//   alert("进来了")
// $.ajax({
//	 
//	 url:"user/login/"+loginName+"/"+password,
//	 type:"get",
//	 dataType:"json",
//	 success:function(result){
//		 
//		 alert(result.status+"  "+result.message)
//		 
//		 
//	 },
//	 error:function(){
//		 
//		 alert("请求失败")
//	 }
//   });
//   
//  
//	return false;
//}
		
	
//1.给container一个点击事件
//$(function(){
//	$(".container form").submit(function(){
//		return login();	
//	})
//	
//});
//	
//	
//	
//	
//
////2.创建登录js事件
// function login(){
//	 
////	 获取登录名
//	 var loginName=$(".container form #inputName").val();
//	 var password =$(".container form #inputPassword").val();
//	 
//	 
//	//  创建ajax向服务器传输数据
//	 $.ajax({
//		 
//		 url:"user/login/"+loginName +"/"+password,
//		 type:"get",
//		 dataType:"json",
//			 success:function(result){
//				 alert(result.message+""+result.status)
//			 },
//			
//		 
//		 error:function(){
//			 alert("兄dei，登录失败了哦")},
//		 
//	 });
//	 
//	 return false
//	 
// }


	
		
	