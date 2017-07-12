package com.arbor.chestnut.biz.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arbor.chestnut.biz.service.IUserService;
import com.arbor.chestnut.repository.dao.UserModelMapper;
import com.arbor.chestnut.repository.entity.UserModel;

@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserModelMapper userModelMapper;

	/*public UserMapper getUserMapper() {
		return userMapper;
	}

	@Autowired
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}*/

	@Override
	public UserModel getUserById(Integer id) {

		return userModelMapper.selectByPrimaryKey(id);
	}

/*	@Override
	public List<User> getAllUser() {
		
		return userMapper.getAll();
	}*/
	
	

}
