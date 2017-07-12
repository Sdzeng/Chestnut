package com.arbor.chestnut.web.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.arbor.chestnut.biz.service.ICoverService;
import com.arbor.chestnut.biz.service.IMediaService;
import com.arbor.chestnut.biz.service.IUserService;
import com.arbor.chestnut.common.util.UploadUtil;
import com.arbor.chestnut.repository.entity.CoverModel;
import com.arbor.chestnut.repository.entity.MediaModel;
import com.arbor.chestnut.repository.entity.UserModel;


@RestController
public class HomeController {
	@Autowired
	private IUserService _userService;
	
	@Autowired
	private ICoverService _coverService;
	
	@Autowired
	private IMediaService _mediaService;


	
	/**
	 * 首页
	 * @param id
	 * @return
	 */
	@GetMapping("/index/{id}")
	public ModelAndView index(@PathVariable Integer id) {
		ModelAndView mav=new ModelAndView("home/index");
	
		UserModel user = _userService.getUserById(id);
		mav.addObject("user", user);
		
		List<MediaModel> mediaModelList = _mediaService.getTopMediaList(7,10);
		mav.addObject("mediaModelList",mediaModelList);
		
		
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
	
	
	@RequestMapping ("/upload")  
    public String upload(Model model,HttpServletRequest request)  
    {  
        //转型为MultipartHttpRequest(重点的所在)     
                MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;     
                 //  获得第1张图片（根据前台的name名称得到上传的文件）      
                MultipartFile imgFile1  =  multipartRequest.getFile("imgFile");     
                  
                UploadUtil uploadutil = new UploadUtil();  
                String fileName = imgFile1.getOriginalFilename();  
                try {  
                uploadutil.uploadImage1(request, imgFile1, imgFile1.getContentType(), fileName);  
                } catch (IOException e) {  
                    // TODO Auto-generated catch block  
                    e.printStackTrace();  
                }  
        return "redirect:query";  
    }  
	
	

	/*@PostMapping("/getTopMediaList/{topNum}")
	@ResponseBody
	public List<MediaModel> getTopMedia(@PathVariable int topNum) throws ParseException {
		List<MediaModel> mediaModel = _mediaService.getTopMediaList(7,topNum);

		return mediaModel;

	}
	*/

}
