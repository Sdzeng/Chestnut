package com.arbor.chestnut.biz.service;

import java.util.Date;

import com.arbor.chestnut.repository.entity.CoverModel;

public interface ICoverService {
	public CoverModel getDateCover(Date showDate);
}
