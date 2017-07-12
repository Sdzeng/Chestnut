package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.EssayModel;

public interface EssayModelMapper {
    int deleteByPrimaryKey(Long id);

    int insert(EssayModel record);

    int insertSelective(EssayModel record);

    EssayModel selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(EssayModel record);

    int updateByPrimaryKey(EssayModel record);
}