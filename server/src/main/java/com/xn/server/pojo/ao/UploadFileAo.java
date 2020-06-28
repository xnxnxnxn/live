package com.xn.server.pojo.ao;

import lombok.Data;

@Data
public class UploadFileAo {
    private String path;
    private Integer shardIndex;
    private Integer shardSize;
    private Integer shardTotal;
    private String use;
    private String name;
    private String suffix;
    private Integer size;
    private String fileKey;
    private String shardBase64;
    private String filePath;
}
