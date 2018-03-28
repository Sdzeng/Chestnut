package com.arbor.chestnut.web.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.arbor.chestnut.biz.service.ICoverService;
import com.arbor.chestnut.biz.service.IMediaService;
import com.arbor.chestnut.biz.service.IUserService;
import com.arbor.chestnut.repository.entity.CoverModel;
import com.arbor.chestnut.repository.entity.MediaModel;
import com.arbor.chestnut.repository.entity.UserModel;


@RestController
public class HomeController {
	private  SimpleDateFormat dateFormat;
	

	@Autowired
	private IUserService _userService;
	
	@Autowired
	private ICoverService _coverService;
	
	@Autowired
	private IMediaService _mediaService;


	public HomeController()
	{
		 dateFormat=new SimpleDateFormat("yyyyMMdd");
	}
	
	/**
	 * 首页
	 * @param id
	 * @return
	 * @throws ParseException 
	 */
	@GetMapping("/index/{id}")
	public ModelAndView index(@PathVariable Integer id) throws ParseException {
		ModelAndView mav=new ModelAndView("home/index");
	
		UserModel userModel = _userService.getUserById(id);
		mav.addObject("userModel", userModel);
		
		List<MediaModel> mediaModelList = _mediaService.getTopMediaList(7,10);
		mav.addObject("mediaModelList",mediaModelList);

		Date today = dateFormat.parse(dateFormat.format(new Date()));
		CoverModel coverModel = _coverService.getDateCover(today);
		mav.addObject("coverModel", coverModel);
		
		return mav;

	}
	
	@RequestMapping(value = "/index_backup/{id}", method = RequestMethod.GET)
	public ModelAndView index_backup(@PathVariable String id) {
		ModelAndView mav=new ModelAndView("home/index_backup");
		Integer iii=Integer.parseInt(id);
		UserModel user = _userService.getUserById(iii);
		mav.addObject("user", user);
		return mav;

	}
	
 
	
	@RequestMapping(value = "/function", method = RequestMethod.GET)
	public MappingJackson2JsonView function() {
		MappingJackson2JsonView mav=new MappingJackson2JsonView();
		mav.addStaticAttribute("rot", "ertr");
		return mav;

	}
	

	/**
	 * 获取一周最佳作为封面
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping(value = "/getTodayCover/", method = RequestMethod.POST)
	@ResponseBody
	public CoverModel getTodayCover() throws ParseException {
  
	    SimpleDateFormat dateFormat=new SimpleDateFormat("yyyyMMdd");
	    Date today=dateFormat.parse(dateFormat.format(new Date()));
		CoverModel coverModel = _coverService.getDateCover(today);
	
		return coverModel;

	}
	
	

	

	/*@PostMapping("/getTopMediaList/{topNum}")
	@ResponseBody
	public List<MediaModel> getTopMedia(@PathVariable int topNum) throws ParseException {
		List<MediaModel> mediaModel = _mediaService.getTopMediaList(7,topNum);

		return mediaModel;

	}
	*/

}
