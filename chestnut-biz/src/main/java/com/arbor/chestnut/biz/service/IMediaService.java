package com.arbor.chestnut.biz.service;


import java.util.List;

import com.arbor.chestnut.repository.entity.MediaModel;

public interface IMediaService {
	public  List<MediaModel> getTopMediaList(int daysAgo,int topNum);
}
