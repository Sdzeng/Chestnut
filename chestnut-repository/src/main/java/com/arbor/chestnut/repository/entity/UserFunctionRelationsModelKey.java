package com.arbor.chestnut.repository.entity;

public class UserFunctionRelationsModelKey {
    private Integer userId;

    private Integer functionId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFunctionId() {
        return functionId;
    }

    public void setFunctionId(Integer functionId) {
        this.functionId = functionId;
    }
}