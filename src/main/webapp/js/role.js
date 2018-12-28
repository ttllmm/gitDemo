//@ sourceURL=role.js


var roleId;
$(function(){
//	第一次点击没有模糊字段
	findRoleByPage(1)
//	给模糊搜索添加字段
	$("#rolePanel .row button").click(function(){
//		模糊关键框中可能有也有可能没有模糊关键字
		findRoleByPage(1)
	});
	
//	给增加角色的表单增加submit事件
	$("#addPanel form").submit(function(){
		return addRole();
		


	});
//	给修改的表单增加submit事件
	$("#editRole form button:eq(0)").click(function(){
		var newroleName=$("#newroleName").val();
		editRole(roleId,newroleName);
	});
	
//	给编辑的确定的modal框添加事件
//	$("#editRole).on('hidden.bs.modal', function (e) {});
//		  alert("哈哈,藏完了!!");
	
	$('#editRole').on('hidden.bs.modal', function (a) {
//		  alert("哈哈,修改的确定框偷偷藏起来不告诉你!!");
	});

//	给删除的modal框的确定事件添加点击事件
	
	$(".bs-example-modal-sm button:eq(1)").click(function(){
//		alert("进来了")
		deleteRole();
	});
	
	//给删除的modal框添加事件
	$('.bs-example-modal-sm').on('hidden.bs.modal', function (e) {
//		  alert("哈哈,删除的确定框偷偷藏起来不告诉你!!");
	});

})

function updateClick(rid){
	roleId=rid;
	//获取页面上的旧值
	var oldRoleName=$("#tr_"+roleId).find("td:eq(2)").text();
	//把旧值赋值给文本框
	$("#editRole form input[type=text]").val(oldRoleName);
}




//增加角色的方法
function addRole(){
	var newRole=$("#addPanel form #roleName").val();
	alert(newRole);
	$.ajax({
		url:"role/addRole/"+newRole,
		type:"post",
		dataType:"json",
		success:function(result){
			
			if(result.status==1){
				
				alert(result.message)
			}
			else {alert("进来后台了添加失败好好查后台代码")}
		},
		error:function(){
			
			alert("没进后台添加，给我滚回后台去找bug")
		}
		
		
	});
	
	return false;
}

//修改角色的方法
function editRole(rowId,newroleName){
//	alert("进来后台了qianmian添加失败好好查后台代码")
	$.ajax({
		url:"role/editRole",
		type:"post",
			dataType:"json",
				data:{
					"id":rowId,
					"name":newroleName
					
				},
				success:function(result){
					if(result.status==1){
						
						$("#tr_"+roleId).find("td:eq(2)").text(newroleName)
						$('#editRole').modal('toggle');
						alert(result.message)
					}
					
					else {alert("进来后台了添加失败好好查后台代码")}
					
				},
				
				error:function(){
					
					alert("修改失败，滚回去找bug")
				}
	
		
	})
	$('#editRole').modal('toggle');
	
	return false;
	
	
	
};





//删除角色的方法
function deleteClick(rid){
	roleId=rid;
//	alert(rid)
}
function deleteRole(){
	$.ajax({
		url:"role/deleteRole/"+roleId,
		type:"post",
		dataType:"json",
		success:function(result){
			if(result.status==1){
				$("#tr_"+roleId).remove();
				//关闭删除的modal框
				$('.bs-example-modal-sm').modal('hide');
				alert(result.message)
			}
			else{
				alert("进来后台了删除失败好好查后台代码")}
		},
		error:function(){
			
			alert("没进删除的后台，给我滚回后台去找bug")
		}
		
		
	});
	
	return false;
}




function findRoleByPage(CurrentPage){
	var roleKeyword=$("#rolePanel .row input[type=text]").val();
	if(roleKeyword==""){
		roleKeyword="undefined"
	}
	
//	alert(roleKeyword);
	$.ajax({
		
		url:"role/findRoleByPage/",
		type:"get",
		dataType:"json",
		data:{
			"CurrentPage":CurrentPage,
			
			"roleKeyword":roleKeyword
			
		},
		success:function(result){
			if(result.status==1){
				//说明,服务端的数据正确返回
				var page=result.data;
				var roles=page.data;
				
				//先清空页面上的缘由的表;格信息
//				alert(result.message)
				$("#rolePanel table tbody").html("");
				//给表格添加新的数据信息
				$(roles).each(function(index,role){
//					alert("down")
					//index:遍历到那个元素的索引下表,从0开始
					//role:遍历到的那个元素对象
					if(role.name!='超级管理员' && role.name!='讲师' && role.name!="学员"){
						var tr2='<tr id="tr_'+role.id+'">'+
			              '<td>'+(index+1)+'</td>'+
			              '<td>'+role.id+'</td>'+
			              '<td>'+role.name+'</td>'+
			              '<td>'+
			                '<a onclick="updateClick(\''+role.id+'\')" href="" data-toggle="modal" data-target="#editRole" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
			                '<a onclick="deleteClick(\''+role.id+'\')" href="" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
			              '</td>'+
			            '</tr>'
			            $("#rolePanel table tbody").append(tr2);
					}else{
						var tr1="<tr>"+
			              '<td>'+(index+1)+'</td>'+
			              '<td>'+role.id+'</td>'+
			              '<td>'+role.name+'</td>'+
			              '<td>'+
			              '</td>'+
			            '</tr>';
					
					    $("#rolePanel table tbody").append(tr1)
					}				    
				});
	
				
//				对底部分页标签进行修改
//				1.获取标签并删除
				$("#role_pagination").html("");
				 if(page.totalPage>1){
					 var previousPage= '<li>'+
			         ' <a href="javascript:findRoleByPage('+page.previousPage+')" aria-label="Previous">'+
			           ' <span aria-hidden="true">&laquo;</span>'+
			          '</a>'+
	                  '</li>';
					 $("#role_pagination").append(previousPage);
//					alert(page.nums);
					 $(page.nums).each(function(n,value){
//						 alert("进来了")
							var middle='<li><a href="javascript:findRoleByPage('+value+')">'+value+'</a></li>';
							$("#role_pagination").append(middle);
						})
//						var middle='<li><a href="#">2</a></li>';
					 
					
					 var next='<li>'+
			          '<a href="javascript:findRoleByPage('+page.nextPage+')" aria-label="Next">'+
			           ' <span aria-hidden="true">&raquo;</span>'+
			          '</a>'+
			        '</li>';
					 $("#role_pagination").append(next);
					 
					 
				 }
			}
				
			else if(result.status==0){
				alert("没有查询到数据!")
			}
		},
		error:function(){
			alert("请求失败!!");
		}
	});
}