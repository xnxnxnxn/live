package com.xn.server.service.impl;

import com.xn.server.entity.User;
import com.xn.server.mapper.UserMapper;
import com.xn.server.service.IUserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinn
 * @since 2020-06-13
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {


}
