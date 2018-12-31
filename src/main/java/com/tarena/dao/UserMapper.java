package com.tarena.dao;

import java.util.List;

import com.tarena.entity.User;
import com.tarena.vo.Page;

public interface UserMapper {

	public String login(User user);

	public int getTotalCount(Page page);

	public List<User> getUserByPage(Page page);

	//	根据用户的名称查询用户的部分关键信息

	public User findUserByUserName(String username);

	

	public List<String> findModuleNamesByLoginName(String loginName);

}
