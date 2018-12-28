package com.tarena.service.impl;

import java.util.List;

import javax.annotation.Resource;


import org.springframework.stereotype.Service;

import com.tarena.dao.UserMapper;
//import com.tarena.entity.Role;
import com.tarena.entity.User;
import com.tarena.service.userService;
import com.tarena.util.PageUtil;
import com.tarena.vo.Page;
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
			result.setMessage("离成佛还差一步加油");
			result.setStatus(0);
		}
		return result;
		
	}
	
	@Resource(name="pageUtil")
	private PageUtil pageUtil;
	@Override
	public Result finduserByPage(Page page) {
		Result result=new Result();
//		1.处理userKeWord的问题
		
		String usk=page.getUserKeyword();
		String userKeyword="undefined".equals(usk)?"%%":"%"+usk+"%";
		page.setUserKeyword(userKeyword);
		
		
//		2.从属性文件获取pagesize
		int pageSize=this.pageUtil.getPageSize();
		page.setPageSize(pageSize);
		
//		3.	//从数据库获取总记录数
		int totalCount =this.userMapper.getTotalCount(page);
		page.setTotalCount(totalCount);
		
//		4.//计算总页数
		int totalPage=page.getTotalCount()%page.getPageSize()==0?page.getTotalCount()%page.getPageSize():page.getTotalCount()%page.getPageSize()+1;
		page.setTotalPage(totalPage);
		//5.计算前一页
	
		if(page.getCurrentPage()==1) {
			page.setPreviousPage(1);
		}
		else {page.setPreviousPage(page.getCurrentPage()-1);}
		
		
		//6.计算下一页
		if(page.getCurrentPage()==totalPage) {
			page.setNextPage(totalPage);
		}
		else {
			page.setNextPage(page.getCurrentPage()+1);
		}
		
		//7.从数据库中获取当前的那些数据
		List<User> users=this.userMapper.getUserByPage(page);
		page.setData(users);
		
		//8.计算页面的上的分页组件条上有多少个超链接
		
		page.setNums(this.pageUtil.getFenYe_a_Num(page.getCurrentPage(), page.getPageSize(), totalCount, totalPage));
		
		
		 result.setMessage("进入服务后台了");
		 result.setStatus(1);
		System.out.println("进业务了");
		
		return result;
	}

}
