package com.arbor.chestnut.repository.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.arbor.chestnut.repository.entity.MediaModel;

public interface MediaModelMapper {
    int deleteByPrimaryKey(Long id);

    int insert(MediaModel record);

    int insertSelective(MediaModel record);

    MediaModel selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(MediaModel record);

    int updateByPrimaryKey(MediaModel record);
    
    List<MediaModel> getTopMediaList(@Param("daysAgo") Integer daysAgo,@Param("topNum") Integer topNum);
}