package com.tarena.service;

import com.tarena.entity.Role;
import com.tarena.vo.Page;
import com.tarena.vo.Result;

public interface userService {

	public Result login(String loginName, String password);

	public Result finduserByPage(Page page);

}
