package com.xn.server.controller;


import com.xn.server.pojo.ao.UploadFileAo;
import com.xn.server.service.IFileService;
import com.xn.server.util.Base64ToMultipartFile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author xinn
 * @since 2020-06-27
 */
@RestController
@RequestMapping("/file")
@Slf4j
public class FileController {

    @Value("${file.domain}")
    private String FILE_DOMAIN;

    @Value("${file.path}")
    private String FILE_PATH;

    @Autowired
    private IFileService fileService;

    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public Map upload(@RequestBody UploadFileAo uploadFileAo) throws Exception {
        Map map = new HashMap();
        String use = uploadFileAo.getUse();
        String key = uploadFileAo.getFileKey();
        String suffix = uploadFileAo.getSuffix();
        String shardBase64 = uploadFileAo.getShardBase64();
        MultipartFile shard = Base64ToMultipartFile.base64ToMultipart(shardBase64);
        //如果文件夹不存在则创建
        String dir = use.toLowerCase();
        File fullDir = new File(FILE_PATH + dir);
        if (!fullDir.exists()) {
            fullDir.mkdir();
        }

//        String path = dir + File.separator + key + "." + suffix + "." + fileDto.getShardIndex();
        String path = new StringBuffer(dir)
                .append(File.separator)
                .append(uploadFileAo.getName())
                .toString(); // course\6sfSqfOwzmik4A4icMYuUe.mp4
        String localPath = new StringBuffer(path)
                .append(".")
                .append(uploadFileAo.getShardIndex())
                .toString(); // course\6sfSqfOwzmik4A4icMYuUe.mp4.1
        String fullPath = FILE_PATH + localPath;
        File dest = new File(fullPath);
        shard.transferTo(dest);
        log.info(dest.getAbsolutePath());

        log.info("保存文件记录开始");
        uploadFileAo.setPath(path);
        fileService.save(uploadFileAo);

        uploadFileAo.setPath(FILE_DOMAIN + path);
        map.put("content",uploadFileAo);
        if (uploadFileAo.getShardIndex().equals(uploadFileAo.getShardTotal())) {
            this.merge(uploadFileAo);
        }

        return map;
    }

    public void merge(UploadFileAo uploadFileAo) throws Exception {
        log.info("合并分片开始");
        String path = uploadFileAo.getPath();
        path = path.replace(FILE_DOMAIN, "");
        Integer shardTotal = uploadFileAo.getShardTotal();
        File newFile = new File(FILE_PATH + path);
        FileOutputStream outputStream = new FileOutputStream(newFile, true);//文件追加写入
        FileInputStream fileInputStream = null;//分片文件
        byte[] byt = new byte[10 * 1024 * 1024];
        int len;

        try {
            for (int i = 0; i < shardTotal; i++) {
                // 读取第i个分片
                fileInputStream = new FileInputStream(new File(FILE_PATH + path + "." + (i + 1)));
                while ((len = fileInputStream.read(byt)) != -1) {
                    outputStream.write(byt, 0, len);
                }
            }
        } catch (IOException e) {
            log.error("分片合并异常", e);
        } finally {
            try {
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
                outputStream.close();
                log.info("IO流关闭");
            } catch (Exception e) {
                log.error("IO流关闭", e);
            }
        }
        log.info("合并分片结束");

        System.gc();
        Thread.sleep(100);

        // 删除分片
        log.info("删除分片开始");
        for (int i = 0; i < shardTotal; i++) {
            String filePath = FILE_PATH + path + "." + (i + 1);
            File file = new File(filePath);
            boolean result = file.delete();
            log.info("删除{}，{}", filePath, result ? "成功" : "失败");
        }
        log.info("删除分片结束");
    }

    @RequestMapping("/hello")
    public Map hello() {
        Map map = new HashMap();
        map.put("result","helllo");
        return map;
    }

    @GetMapping("/check/{key}")
    public Map check(@PathVariable String key) throws Exception {
        log.info("检查上传分片开始：{}", key);
        Map map = new HashMap();
        UploadFileAo uploadFileAo = fileService.findByKey(key);
        if (uploadFileAo != null) {
            uploadFileAo.setPath(FILE_DOMAIN + uploadFileAo.getPath());
//            if (StringUtils.isEmpty(fileDto.getVod())) {
//                fileDto.setPath(FILE_DOMAIN + fileDto.getPath());
//            } else {
//                DefaultAcsClient vodClient = VodUtil.initVodClient(accessKeyId, accessKeySecret);
//                GetMezzanineInfoResponse response = VodUtil.getMezzanineInfo(vodClient, fileDto.getVod());
//                System.out.println("获取视频信息, response : " + JSON.toJSONString(response));
//                String fileUrl = response.getMezzanine().getFileURL();
//                fileDto.setPath(fileUrl);
//            }
        }
//        responseDto.setContent(fileDto);
        map.put("content",uploadFileAo);
        return map;
    }

}

