package com.arbor.chestnut.biz.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arbor.chestnut.biz.service.ICoverService;
import com.arbor.chestnut.repository.dao.CoverModelMapper;
import com.arbor.chestnut.repository.entity.CoverModel;

@Service
public class CoverServiceImpl implements ICoverService {

	@Autowired
	private CoverModelMapper _coverModelMapper;
	
	
	
	@Override
	public CoverModel getDateCover(Date showDate) {
		// TODO Auto-generated method stub
		//CoverModel coverModel=coverModelMapper.getDateCover(showDate);
		CoverModel coverModel=_coverModelMapper.getDateCover(showDate);
		/*if(coverModel.getMediaModel().getPath()=="")*/
		return coverModel;
	}

}
