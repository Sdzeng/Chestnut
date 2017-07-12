package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.RoleModel;

public interface RoleModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RoleModel record);

    int insertSelective(RoleModel record);

    RoleModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RoleModel record);

    int updateByPrimaryKey(RoleModel record);
}