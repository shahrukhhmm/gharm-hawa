import menus from "../models/menu.model.js";

async function getmenu(req,res){
    try {
        const menu=await menus.find();
        res.status(200).send(menu.map(item=>({
          name:item.name,
          description:item.description,
          price:item.price,
           path:`http://localhost:3000/${item.path}`,
           categories:item.categories
        })));
    } catch (error) {
       return(res.status(500).json({success:false,msg:error.message}));
    }
}

async function postmenu(req,res){
    try {
         const{name,description,price,categories}=req.body;
         const path=req.file.path;
    const menu=await menus.create(
        {
          name,
          description,
          price,
          path,
          categories
        }
    )
   await menu.save();
    res.status(200).send(menu);
    } catch (error) {
        return(res.status(500).json({success:false,msg:error.message}));
    }
   
}

async function updatemenu(req,res){
    try {
        const menu=await menus.findByIdAndUpdate(req.body._id,{img:req.body.Buffer,path:req.file.path,name:req.body.name,description:req.body.description,price:req.body.price,categories});
    
    menu.save();
    res.status(200).send(menu);
    } catch (error) {
        return(res.status(500).json({success:false,msg:error.message}));
    }
    



}

async function deletemenu(req,res){
    try {
        const menu=await menus.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success:true,
            msg:"the menu was deleted succesfully"
        });
    } catch (error) {
        return(res.status(500).json({success:false,msg:error.message}));
    }
}

export default {getmenu,postmenu,updatemenu,deletemenu};