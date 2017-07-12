package com.arbor.chestnut.repository.dao;

import java.util.Date;

import org.apache.ibatis.annotations.Param;

import com.arbor.chestnut.repository.entity.CoverModel;

public interface CoverModelMapper {
    int deleteByPrimaryKey(Date showDate);

    int insert(CoverModel record);

    int insertSelective(CoverModel record);

    CoverModel selectByPrimaryKey(Date showDate);

    int updateByPrimaryKeySelective(CoverModel record);

    int updateByPrimaryKey(CoverModel record);
    
    CoverModel getDateCover(Date showDate);
}