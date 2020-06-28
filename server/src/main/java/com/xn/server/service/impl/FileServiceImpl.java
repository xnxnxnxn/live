package com.xn.server.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.xn.server.pojo.ao.UploadFileAo;
import com.xn.server.entity.File;
import com.xn.server.mapper.FileMapper;
import com.xn.server.service.IFileService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xn.server.util.CopyUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinn
 * @since 2020-06-27
 */
@Service
public class FileServiceImpl extends ServiceImpl<FileMapper, File> implements IFileService {


    /**
     * 保存，id有值时更新，无值时新增
     */
    @Override
    public void save(UploadFileAo fileAo) {
        File file = CopyUtil.copy(fileAo, File.class);
        File fileDb = selectByKey(fileAo.getFileKey());
        if (fileDb == null) {
            this.insert(file);
        } else {
            fileDb.setShardIndex(fileAo.getShardIndex());
            updateById(fileDb);
        }
    }

    public File selectByKey(String key) {
        Wrapper<File> ew = new EntityWrapper<>();
        ew.eq("fileKey",key);
        return this.selectOne(ew);
    }

    /**
     * 根据文件标识查询数据库记录
     */
    @Override
    public UploadFileAo findByKey(String key) {
        return CopyUtil.copy(selectByKey(key), UploadFileAo.class);
    }

}
