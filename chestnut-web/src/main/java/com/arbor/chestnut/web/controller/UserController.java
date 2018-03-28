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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.arbor.chestnut.biz.service.ICoverService;
import com.arbor.chestnut.biz.service.IMediaService;
import com.arbor.chestnut.biz.service.IUserService;
import com.arbor.chestnut.common.util.UploadUtil;
import com.arbor.chestnut.repository.entity.CoverModel;
import com.arbor.chestnut.repository.entity.MediaModel;
import com.arbor.chestnut.repository.entity.UserModel;

@RestController
@RequestMapping("/user")
public class UserController {
	private  SimpleDateFormat dateFormat;
	
	@Autowired
	private IUserService _userService;
	
	@Autowired
	private ICoverService _coverService;
	
	@Autowired
	private IMediaService _mediaService;
	
	public UserController()
	{
		 dateFormat=new SimpleDateFormat("yyyyMMdd");
	}
	
	
	/**
	 * 首页
	 * @param id
	 * @return
	 * @throws ParseException 
	 */
	@GetMapping("/{id}")
	public ModelAndView index(@PathVariable Integer id) throws ParseException {
		ModelAndView mav=new ModelAndView("user/index");
	
		UserModel userModel = _userService.getUserById(id);
		mav.addObject("userModel", userModel);
		
		List<MediaModel> mediaModelList = _mediaService.getTopMediaList(7,10);
		mav.addObject("mediaModelList",mediaModelList);

		Date today = dateFormat.parse(dateFormat.format(new Date()));
		CoverModel coverModel = _coverService.getDateCover(today);
		mav.addObject("coverModel", coverModel);
		
		return mav;

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
	
	
}
