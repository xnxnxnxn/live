import { Component, OnInit } from '@angular/core';
import {_HttpClient} from "@delon/theme";
import {UploadFile, UploadXHRArgs} from "ng-zorro-antd/upload/interface";
import {Observable, Subject, Subscription} from "rxjs";
import {Md5} from "ts-md5";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styles: [
  ]
})
export class FileComponent implements OnInit {

  // 文件上传路径
  uploadUrl = "http://127.0.0.1:9003/file/upload";
  // 文件key检查路径
  checkUrl = "http://127.0.0.1:9003/file/check";
  // 分片下标
  shardIndex = 1;
  // 每个分片大小
  shardSize = 1024 * 1024;
  // 上传完成后显示的文件地址
  filePath;
  constructor(private http:_HttpClient) { }

  ngOnInit(): void {
  }


  beforeUpload = (file: UploadFile, fileList: UploadFile[]) => {
    // 生成唯一标识码
    const key = Md5.hashStr(file.name + file.size + file.type);
    return Observable.create(observer => {
      // 检查唯一标识码是否存在
      this.http.get(this.checkUrl+'/' + key).subscribe(res => {
        const content = res.content;
        if (content) {
          // 存在则查看当前处于第几个分片
          if (content.shardIndex < content.shardTotal) {
            this.shardIndex  = content.shardIndex + 1;
            observer.next(true);
          } else {
            // 当前key已经上传过，则提示极速上传已经成功，直接返回文件路径
            this.filePath = content.path;
            console.log('以急速上传成功');
            // 不再进行后续上传操作
            observer.next(false);
          }
        } else {
          observer.next(true);
        }
        observer.complete();
      });
    });
  }


  customUpload = (item: UploadXHRArgs) => {
    // 自定义上传
    const subject = new Subject();
    this.upload(subject,item.file);
    return subject.subscribe(res => {
      item.onSuccess({}, item.file, event);
      item.file.response = event['body'];
    });
  }

  upload(subject: Subject<any>, file: UploadFile) {
    // 解析文件，分割文件
    this.do(file).then(res => {
      delete res['shareData'];
      this.http.post(this.uploadUrl,res).subscribe(uploadRes => {
        const content = uploadRes.content;
        console.log(content);
        if (content.shardIndex < content.shardTotal) {
            // 还存在分片，继续上传
            this.shardIndex++;
            this.upload(subject,file);
        } else {
          // 上传完毕，结束
          this.filePath = content.path;
          subject.next();
          subject.complete();
        }
      });
    });
  }

  read(params): Promise<any> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(params.shareData);
      reader.onload = () => {
        // reader.result 为读取成功的base64编码的字符串。
        params.shardBase64 = reader.result;
        resolve(params);
      }
    });
  }



  do(file: any): Promise<any> {
    // 文件名称
    const fileName = file.name;
    // 分片大小
    const shardSize = this.shardSize;
    // 当前分片
    const shardIndex = this.shardIndex;
    // 文件大小
    const size = file.size;
    // 分片总数
    const shardTotal = Math.ceil(size / shardSize);
    // 后缀
    const suffix = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();
    // 分片后的大小
    const shardData = this.getFileShard(file,shardIndex,shardSize) as File;
    // 文件唯一标识码
    const fileKey = Md5.hashStr(file.name + file.size + file.type);
    const params = {
      shardIndex: shardIndex,
      shardSize: shardSize,
      shardTotal: shardTotal,
      use: 'xnxnxnxn',
      name: fileName,
      suffix: suffix,
      size: size,
      fileKey: fileKey,
      shareData: shardData
    }
    return this.read(params);
  }

  getFileShard (file:any,shardIndex, shardSize) {
    //当前分片起始位置
    const start = (shardIndex - 1) * shardSize;
    //当前分片结束位置
    const end = Math.min(file.size, start + shardSize);
    //从文件中截取当前的分片数据
    return file.slice(start, end);
  }


}
