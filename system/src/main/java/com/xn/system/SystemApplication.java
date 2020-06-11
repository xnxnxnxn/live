package com.xn.system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.core.env.Environment;

@SpringBootApplication
@EnableEurekaClient
public class SystemApplication {

    private static final Logger LOG = LoggerFactory.getLogger(SystemApplication.class);

    public static void main(String[] args) {
//        SpringApplication.run(LiveServerApplication.class, args);
        SpringApplication app = new SpringApplication(SystemApplication.class);
        Environment environment = app.run(args).getEnvironment();
        LOG.info("System启动成功");
        LOG.info("System地址:\thttp://127.0.0.1:{}",environment.getProperty("server.port"));
    }

}