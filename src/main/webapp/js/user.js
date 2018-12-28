//@ sourceURL=user.js

$(function(){
	finduserByPage(1);
	
});

function finduserByPage(CurrentPage){
	
	var userKeyword=$("#userPanel input[type=text]").val();
	
	if(userKeyword==""){
		
		userKeyword="undefined"
	}
	alert(userKeyword)
	$.ajax({
		url:"user/finduserByPage/",
		type:"get",
		dataType:"json",
		data:{"CurrentPage":CurrentPage,
			"userKeyword":userKeyword},
			success:function(result){
				if(result.status==1){
					alert(result.message);}
				
				else{
					
					alert("查找用户失败，滚去找bug")
				}
				
			},
			error:function(){
				
			
				
			}
			
			
			,
		
			
		
	});
	
	
	
	return false;
	
	
}

