package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.TagModel;

public interface TagModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TagModel record);

    int insertSelective(TagModel record);

    TagModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TagModel record);

    int updateByPrimaryKey(TagModel record);
}