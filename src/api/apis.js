import axios from 'axios'
import Axios from 'axios'

axios.defaults.baseURL="http://127.0.0.1:5000"
 //图片上传地址
  export const imgs_Upload = axios.defaults.baseURL + "/goods/goods_img_upload"
  //商品图片更新地址
  export const  get_Img = axios.defaults.baseURL + "/upload/imgs/goods_img/"
  //店铺图片上传
  export const  shop_Img = axios.defaults.baseURL + "/shop/upload"
  //
  export const  getShop_Img = axios.defaults.baseURL + "/upload/shop/"
//登录接口
//account  账户
//password 登录密码

export var Login = (account,password)=>axios.post("/users/checkLogin",{account,password})

//token是否过期
export var checktoken = (token)=>axios.get("/users/checktoken",{params:{token}})

//添加账号
//account  账户
//password 密码
// userGroup 用户组
export var adduser = (account,password,userGroup)=>Axios.post('/users/add',{account,password,userGroup})
//账户列表
//currentPage 当前页码
//pageSize  每页条数
export var acclist = (currentPage,pageSize)=>Axios.get("/users/list",{params:{currentPage,pageSize}})
// 验证旧密码是否正确
// oldPwd 旧密码
//id
export var SurePwd = (oldPwd,id)=>Axios.get("/users/checkoldpwd",{params:{oldPwd,id}})

//修改密码
//新密码
//id
export var ModifyPwd = (newPwd,id)=>Axios.post('/users/editpwd',{newPwd,id})
//删除账号
export var reuser = (id)=>axios.get("/users/del",{params:{id}})
///users/edit
export var userEdit = (params)=>Axios.post('/users/edit',params)


//批量删除
export var batchdel = (ids)=>axios.get("/users/batchdel",{params:{ids}})

//个人中心
export var personal = (id)=>axios.get("/users/accountinfo",{params:{id}})

//  -----------------------------商品管理 ---------------------------
//获取分类
export var getClass = (currentPage,pageSize)=>axios.get("/goods/catelist",{params:{currentPage,pageSize}})

//添加分类
export var addClass = (cateName,state)=>Axios.post('/goods/addcate',{cateName,state})

//删除分类
export var delcate = (id)=>axios.get("/goods/delcate",{params:{id}})

//修改分类
export var editcate = (params)=>Axios.post('/goods/editcate',params)
//查询分类
export var categories = ()=>axios.get("/goods/categories",{params:{}})

//头像上传
export var upload = (id)=>Axios.post('/users/avatar_upload',{id})

//商品图像上传
export var img_upload = () =>axios.post("/goods/goods_img_upload",{})

//商品添加
export var goodAdd = (name,category,price,imgUrl,goodsDesc)=>axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc})

//获取商品列表
export var goodList = (currentPage,pageSize)=>axios.get("/goods/list",{params:{currentPage,pageSize}})
//删除商品
export var delGoods = (id)=>axios.get("/goods/del",{params:{id}})

//修改商品
export var goodEdit = (params) =>axios.post("/goods/edit",params)


//获取订单列表
export var OrderList = (params)=>axios.get("/order/list",{params:params})
//查询
export var OrderSearch = (params)=>axios.get("/order/search",{params:params})
//获取订单详情
export var OrderDetail = (id)=>axios.get("/order/detail",{params:{id}})
//修改订单
export var orderEdit = (params) =>axios.post("/order/edit",params)
// 获取店铺详情
export var shopInfo = ()=>axios.get("/shop/info")
//店铺管理修改
export var shopEdit = (params) =>axios.post("/shop/edit",params)

//首页报表
export var totalData = (params)=>axios.get("/order/totaldata",{params})

//订单报表
export var orderTotal = (date)=>axios.get("/order/ordertotal",{params:{date}})





