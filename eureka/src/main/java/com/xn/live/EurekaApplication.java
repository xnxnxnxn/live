package com.xn.live;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;

@SpringBootApplication
@EnableEurekaServer
public class EurekaApplication {

    private static final Logger LOG = LoggerFactory.getLogger(EurekaApplication.class);

    public static void main(String[] args) {
//        SpringApplication.run(LiveServerApplication.class, args);
        SpringApplication app = new SpringApplication(EurekaApplication.class);
        Environment environment = app.run(args).getEnvironment();
        LOG.info("Eureka启动成功");
        LOG.info("Eureka地址:\thttp://127.0.0.1:{}",environment.getProperty("server.port"));
    }

}
