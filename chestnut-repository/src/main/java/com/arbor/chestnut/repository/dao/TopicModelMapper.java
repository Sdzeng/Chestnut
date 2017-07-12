package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.TopicModel;

public interface TopicModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TopicModel record);

    int insertSelective(TopicModel record);

    TopicModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TopicModel record);

    int updateByPrimaryKey(TopicModel record);
}