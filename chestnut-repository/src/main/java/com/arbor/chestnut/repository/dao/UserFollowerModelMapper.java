package com.arbor.chestnut.repository.dao;

import com.arbor.chestnut.repository.entity.UserFollowerModel;
import com.arbor.chestnut.repository.entity.UserFollowerModelKey;

public interface UserFollowerModelMapper {
    int deleteByPrimaryKey(UserFollowerModelKey key);

    int insert(UserFollowerModel record);

    int insertSelective(UserFollowerModel record);

    UserFollowerModel selectByPrimaryKey(UserFollowerModelKey key);

    int updateByPrimaryKeySelective(UserFollowerModel record);

    int updateByPrimaryKey(UserFollowerModel record);
}