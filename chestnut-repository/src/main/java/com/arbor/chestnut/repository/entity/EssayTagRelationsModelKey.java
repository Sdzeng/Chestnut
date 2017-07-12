package com.arbor.chestnut.repository.entity;

public class EssayTagRelationsModelKey {
    private Long essayId;

    private Integer tagId;

    public Long getEssayId() {
        return essayId;
    }

    public void setEssayId(Long essayId) {
        this.essayId = essayId;
    }

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }
}