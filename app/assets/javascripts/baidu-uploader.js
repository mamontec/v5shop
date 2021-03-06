// 图片上传demo
jQuery(function() {
    var $ = jQuery,
        $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,

        // Web Uploader实例
        swf_path,
        swf_path = $("uploader_swf_path").val(),
        authenticity_token = $('meta[name=csrf-token]').attr('content');
    function initWebUploader(params){
        var options = $.extend({
            server:'/admin/product/picture/upload',
            pick: '#filePicker',
            startUploadBtn:'start_upload',
            uploadUrl:'product_picture',
            multiUpload:false
        },params);
        // 初始化Web Uploader
        var uploader = WebUploader.create({

            // 自动上传。
            //auto: false,

            // swf文件路径
            swf: swf_path,

            // 文件接收服务端。
            server: options.server,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: options.pick,

            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            formData:{authenticity_token: authenticity_token}
        });

        $("#"+options.startUploadBtn).on("click",function(){
            uploader.upload();
        });

        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="info">' + file.name + '</div>' +
                    '</div>'
                    ),
                $img = $li.find('img');

            $list.append( $li );

            // 创建缩略图
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr( 'src', src );
            }, thumbnailWidth, thumbnailHeight );
            var $remove = $li.find('div.remove');
            // 避免重复创建
            if ( !$remove.length ) {
                $remove = $('<div class="remove"></div>').appendTo( $li );
            }

            $remove.html('<i class="fa fa-trash-o"></i>');

            $remove.on('click',function() {
                var $li = $( '#'+file.id );
                $li.detach();
                uploader.removeFile( file);
            })
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<p class="progress"><span></span></p>')
                        .appendTo( $li )
                        .find('span');
            }

            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file,response) {
            var files = $("#"+options.uploadUrl).val();
            if(options.multiUpload && files !== ''){
                $("#"+options.uploadUrl).val(files + ',' + response.img_path);
            }else{
                $("#"+options.uploadUrl).val(response.img_path);
            }
            
            $( '#'+file.id ).addClass('upload-state-done');
        });

        // 文件上传失败，现实上传出错。
        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');

            // 避免重复创建
            if ( !$error.length ) {
                $error = $('<div class="error"></div>').appendTo( $li );
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress').remove();
        });
    }


    //添加媒体文件或者附件
    function initUploadVide(params){
        var options = $.extend({
            server:'',
            pick: '#fileVideo',
            startUploadBtn:'start_upload',
            uploadUrl:'content_cattas',
            multiUpload:false
        },params),
        $cattasList = $("#cattasList"),
        fileExts = ['mp4','zip','rar','pdf']

        var uploader = WebUploader.create({
            swf: swf_path,
            server: options.server,
            pick: options.pick,

            // 只允许选择文件，可选。
            accept: {
                title: '媒体文件',
                extensions: fileExts.join(','),
                mimeTypes: 'video/*,application/zip,application/x-rar-compressed,application/pdf'
            },
            formData:{authenticity_token: authenticity_token}
        });
        $("#"+options.startUploadBtn).on("click",function(){
            uploader.upload();
        });
        uploader.on('beforeFileQueued',function(file){
            if($.inArray(file.ext,fileExts) === -1){
                toastr.error("目前只支持："+fileExts.join(',')+"格式上传。");
            }
        });
        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="info">' + file.name + '</div>' +
                    '</div>'
                    ),
                $img = $li.find('img');

            $cattasList.append( $li );

            // 创建缩略图
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr( 'src', src );
            }, thumbnailWidth, thumbnailHeight );
            var $remove = $li.find('div.remove');
            // 避免重复创建
            if ( !$remove.length ) {
                $remove = $('<div class="remove"></div>').appendTo( $li );
            }

            $remove.html('<i class="fa fa-trash-o"></i>');

            $remove.on('click',function() {
                var $li = $( '#'+file.id );
                $li.detach();
                uploader.removeFile( file);
            })
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<p class="progress"><span></span></p>')
                        .appendTo( $li )
                        .find('span');
            }

            $percent.css( 'width', percentage * 100 + '%' );
        });
        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file,response) {
            var files = $("#"+options.uploadUrl).val();
            if(options.multiUpload && files !== ''){
                $("#"+options.uploadUrl).val(files + ',' + response.img_path);
            }else{
                $("#"+options.uploadUrl).val(response.img_path);
            }
            
            $( '#'+file.id ).addClass('upload-state-done');
        });

        // 文件上传失败，现实上传出错。
        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');

            // 避免重复创建
            if ( !$error.length ) {
                $error = $('<div class="error"></div>').appendTo( $li );
            }

            $error.text('上传失败');
        });
    }
    window.initWebUploader = initWebUploader;
    window.initUploadVide = initUploadVide;
});