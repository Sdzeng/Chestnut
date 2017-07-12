package com.arbor.chestnut.repository.entity;

import java.util.Date;

public class EssayTagRelationsModel extends EssayTagRelationsModelKey {
    private Integer creator;

    private Date createDate;

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