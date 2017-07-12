package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.ModuleModel;

public interface ModuleModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ModuleModel record);

    int insertSelective(ModuleModel record);

    ModuleModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ModuleModel record);

    int updateByPrimaryKey(ModuleModel record);
}