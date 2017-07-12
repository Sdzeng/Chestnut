package com.arbor.chestnut.repository.entity;

import java.util.Date;

public class MediaModel {
    private Long id;

    private Long essayId;

    private String path;
    
    private Long heartNum;

    private Integer creator;

    private Date createDate;
    
    
    private EssayModel essayModel;
    
    private UserModel userModel;
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEssayId() {
        return essayId;
    }

    public void setEssayId(Long essayId) {
        this.essayId = essayId;
    }

    public String getPath() {
        return path;
    }
    
    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }
    
    public Long getHeartNum() {
        return heartNum;
    }
    
    public void getHeartNum(Long heartNum) {
       this.heartNum=heartNum;
    }



    public Integer getCreator() {
        return creator;
    }

    public void setCreator(Integer creator) {
        this.creator = creator;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    
    
    
    
    //extends

     public EssayModel getEssayModel() {
         return essayModel;
     }

     public void setEssayModel(EssayModel essayModel) {
         this.essayModel = essayModel;
     }
     
     public UserModel getUserModel() {
         return userModel;
     }

     public void setUserModel(UserModel userModel) {
         this.userModel = userModel;
     }
}