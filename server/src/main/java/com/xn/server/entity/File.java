package com.xn.server.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.enums.IdType;

import java.util.Date;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.Version;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author xinn
 * @since 2020-06-27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("tbl_file")
public class File extends Model<File> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * 文件相对路径
     */
    private String path;
    /**
     * 文件名
     */
    private String name;
    /**
     * 文件后缀
     */
    private String suffix;
    /**
     * 大小，字节B
     */
    private Integer size;
    /**
     * 用途
     */
    private String use;
    /**
     * 已上传分片
     */
    @TableField("shard_index")
    private Integer shardIndex;
    /**
     * 分片大小B
     */
    @TableField("shard_size")
    private Integer shardSize;
    /**
     * 分片总数
     */
    @TableField("shard_total")
    private Integer shardTotal;
    /**
     * 文件标识
     */
    @TableField("fileKey")
    private String fileKey;
    @TableField("create_at")
    private Date createAt;
    @TableField("update_at")
    private Date updateAt;


    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
