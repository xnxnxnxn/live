package com.xn.system.controller;


import com.xn.server.entity.User;
import com.xn.server.service.IUserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class TestController {

    @Resource
    private IUserService iUserService;

    @RequestMapping("/test")
    public String test() {
        User user = iUserService.selectById(1L);
        System.out.println(user.getName());

        return "Hello";
    }



}
