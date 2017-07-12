package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.RoleFunctionRelationsModel;
import com.arbor.chestnut.repository.entity.RoleFunctionRelationsModelKey;

public interface RoleFunctionRelationsModelMapper {
    int deleteByPrimaryKey(RoleFunctionRelationsModelKey key);

    int insert(RoleFunctionRelationsModel record);

    int insertSelective(RoleFunctionRelationsModel record);

    RoleFunctionRelationsModel selectByPrimaryKey(RoleFunctionRelationsModelKey key);

    int updateByPrimaryKeySelective(RoleFunctionRelationsModel record);

    int updateByPrimaryKey(RoleFunctionRelationsModel record);
}