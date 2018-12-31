//@ sourceURL=user.js

$(function(){
	finduserByPage(1);
	
});

function finduserByPage(CurrentPage){
	
	var userKeyword=$("#userPanel input[type=text]").val();
	
	if(userKeyword==""){
		
		userKeyword="undefined"
	}

	$.ajax({
		url:"user/finduserByPage/",
		type:"get",
		dataType:"json",
		data:{"CurrentPage":CurrentPage,
			"userKeyword":userKeyword},
			success:function(result){
				if(result.status==1){
					var page=relsult.data;
					var users=page.data;
					alert("进来了")
					$("#user_table tbody").html("");
					
					
					$(users).each(function(index,user){
						var roles=user.roles;
						var roleNameString="";
						$(roles).each(function(n,role){
							
							roleNameString +=role.name+","
						});
						if(roleNameString.length==0){
							roleNameString=="无角色"
						                             }
						else{
							roleNameSring=roleNameString.substring(0,roleNameString.length-1)
							}
						
						
						var tr= '<tr id="tr_"'+user.id+'>'+
		                '<td>'+(index-1)+'</td>'+
		                '<td>'+user.loginName+'</td>'+
		               '<td>'+user.nickName+'</td>'+
		                '<td>'+user.loginType+'</td>'+
		                '<td>'+user.score+'</td>'+
		                '<td>2015-07-03</td>'+
		                '<td>'+user.isLoc+'</td>'+
		                '<td>'+roleNameString+'</td>'+
		                '<td>'+
		                  '<a href="" data-toggle="modal" data-target="#editUser"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
		                  '<a href="" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
		                '</td>'+
		              '</tr>'
						
		                $("#user_table tbody").append(tr);
						
						
					});
					
					
					
					
					
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				}
				
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

