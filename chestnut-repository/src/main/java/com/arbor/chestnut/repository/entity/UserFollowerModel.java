package com.arbor.chestnut.repository.entity;

import java.util.Date;

public class UserFollowerModel extends UserFollowerModelKey {
    private String followType;

    private Integer creator;

    private Date createDate;

    public String getFollowType() {
        return followType;
    }

    public void setFollowType(String followType) {
        this.followType = followType == null ? null : followType.trim();
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
}