package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.FunctionModel;

public interface FunctionModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FunctionModel record);

    int insertSelective(FunctionModel record);

    FunctionModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FunctionModel record);

    int updateByPrimaryKey(FunctionModel record);
}