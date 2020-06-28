package com.xn.server.service;

import com.xn.server.entity.File;
import com.baomidou.mybatisplus.service.IService;
import com.xn.server.pojo.ao.UploadFileAo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinn
 * @since 2020-06-27
 */
public interface IFileService extends IService<File> {

    void save(UploadFileAo uploadFileAo);

    UploadFileAo findByKey(String key);
}
