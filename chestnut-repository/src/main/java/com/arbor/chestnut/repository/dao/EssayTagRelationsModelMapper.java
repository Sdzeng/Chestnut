package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.EssayTagRelationsModel;
import com.arbor.chestnut.repository.entity.EssayTagRelationsModelKey;

public interface EssayTagRelationsModelMapper {
    int deleteByPrimaryKey(EssayTagRelationsModelKey key);

    int insert(EssayTagRelationsModel record);

    int insertSelective(EssayTagRelationsModel record);

    EssayTagRelationsModel selectByPrimaryKey(EssayTagRelationsModelKey key);

    int updateByPrimaryKeySelective(EssayTagRelationsModel record);

    int updateByPrimaryKey(EssayTagRelationsModel record);
}