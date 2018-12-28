package com.tarena.dao;

import java.util.List;

import com.tarena.entity.Role;
import com.tarena.vo.Page;
import com.tarena.vo.Result;

public interface RoleMapper {

	public int getCount(Page page);

	public List<Role> getRoleByPage(Page page);

	public void addRole(Role role);

	public void deleteRoleById(String rowid);

	public void editRole(Role role);

}
