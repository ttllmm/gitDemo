package com.tarena.service.impl;

import javax.annotation.Resource;


import org.springframework.stereotype.Service;

import com.tarena.dao.UserMapper;
import com.tarena.entity.User;
import com.tarena.service.userService;
import com.tarena.vo.Result;
@Service("userService")
public class userServiceimpl implements userService {
	@Resource(name="userMapper")
     private UserMapper userMapper;
	@Override
	public Result login(String loginName, String password) {
		Result result =new Result();
		User user=new User();
		user.setLoginName(loginName);
		user.setPassword(password);
		String userId=userMapper.login(user);
		if(userId!=null) {
			result.setStatus(1);
			result.setMessage("终于登录成功修仙之路正式开启");
		}
		
		else {
			result.setMessage("离成佛还差以一步加油");
			result.setStatus(0);
		}
		return result;
	}

}
