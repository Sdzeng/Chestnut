package com.arbor.chestnut.biz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arbor.chestnut.biz.service.IMediaService;
import com.arbor.chestnut.repository.dao.MediaModelMapper;
import com.arbor.chestnut.repository.entity.MediaModel;

@Service
public class MediaServiceImpl implements IMediaService {

	@Autowired
	private MediaModelMapper _mediaModelMapper;

	@Override
	public List<MediaModel> getTopMediaList(int daysAgo, int topNum) {
		List<MediaModel> mediaModel = _mediaModelMapper.getTopMediaList(daysAgo, topNum);
		return mediaModel;
	}

}
