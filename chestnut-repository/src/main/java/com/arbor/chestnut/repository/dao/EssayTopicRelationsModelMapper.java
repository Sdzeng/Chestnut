package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.EssayTopicRelationsModel;
import com.arbor.chestnut.repository.entity.EssayTopicRelationsModelKey;

public interface EssayTopicRelationsModelMapper {
    int deleteByPrimaryKey(EssayTopicRelationsModelKey key);

    int insert(EssayTopicRelationsModel record);

    int insertSelective(EssayTopicRelationsModel record);

    EssayTopicRelationsModel selectByPrimaryKey(EssayTopicRelationsModelKey key);

    int updateByPrimaryKeySelective(EssayTopicRelationsModel record);

    int updateByPrimaryKey(EssayTopicRelationsModel record);
}