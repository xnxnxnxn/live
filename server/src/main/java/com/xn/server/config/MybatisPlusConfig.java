package com.xn.server.config;

import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.plugins.PerformanceInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * @author mason
 */
@Configuration
@MapperScan({"com.xn.server.mapper*"})
public class MybatisPlusConfig {

    /**
     * mybatis-plus SQL执行效率插件
     */
    @Profile({"dev", "staging"})
    @Bean
    public PerformanceInterceptor performanceInterceptor() {
        PerformanceInterceptor interceptor = new PerformanceInterceptor();
//        interceptor.setMaxTime(200);
        interceptor.setFormat(false);
        return interceptor;
    }

    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }

}
