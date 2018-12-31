package com.tarena.controller;





import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.tarena.entity.Role;
import com.tarena.service.userService;
import com.tarena.vo.Page;
import com.tarena.vo.Result;


@Controller
@RequestMapping("user/")
public class UserController {
	@Resource(name="userService")
	private userService userService;
	@RequestMapping(value="login",method=RequestMethod.GET)
	@ResponseBody	
	public Result login( String loginName,String password){
		System.out.println(loginName+"   "+password);
		Result result=null;
		result=this.userService.login_shiro(loginName,password);
//		Result result=new Result();
//		result.setMessage("到控制台了");
//		result.setStatus(1);
		return result;
	}
	
	
	@RequestMapping(value="finduserByPage",method=RequestMethod.GET)
	@ResponseBody
	public Result finduserByPage(Page page) {
		System.out.println("到控制台了");
		
		Result result=null;
//		Result result=new Result();
		result=this.userService.finduserByPage(page);
		
//		
//		result.setMessage("到控制台了");
//		result.setStatus(1);
		return result;
		
		
		
		
		
		
		
	}
	
	
	
}
