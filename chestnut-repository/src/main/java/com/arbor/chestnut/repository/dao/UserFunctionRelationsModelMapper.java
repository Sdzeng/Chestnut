package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.UserFunctionRelationsModel;
import com.arbor.chestnut.repository.entity.UserFunctionRelationsModelKey;

public interface UserFunctionRelationsModelMapper {
    int deleteByPrimaryKey(UserFunctionRelationsModelKey key);

    int insert(UserFunctionRelationsModel record);

    int insertSelective(UserFunctionRelationsModel record);

    UserFunctionRelationsModel selectByPrimaryKey(UserFunctionRelationsModelKey key);

    int updateByPrimaryKeySelective(UserFunctionRelationsModel record);

    int updateByPrimaryKey(UserFunctionRelationsModel record);
}