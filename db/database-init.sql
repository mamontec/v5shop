/*字典类型初始数据*/
insert  into `dict_types`(`id`,`name`,`intro`,`created_at`,`updated_at`) values (1,'收费方式','安装什么单位收费。例如：个数，平米数等','2014-12-27 08:47:40','2014-12-27 08:47:40'),(2,'产品状态','产品的当前状态，上架，或者下架','2014-12-27 08:56:22','2014-12-27 08:56:22');

/*字典初始化*/
insert  into `dicts`(`id`,`name`,`dict_type_id`,`intro`,`created_at`,`updated_at`,`value`) values (1,'上架',2,'上架','2014-12-30 02:33:37','2014-12-30 02:33:37','1'),(2,'下架',2,'下架','2014-12-30 02:33:58','2014-12-30 02:33:58','0'),(3,'面积',1,'按面积收费','2014-12-30 02:35:19','2014-12-30 02:35:19','area'),(4,'个数',1,'按个数收费','2014-12-30 02:35:40','2014-12-30 02:35:40','num');