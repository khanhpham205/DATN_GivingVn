const Chiendich = require('../models/M_chiendich')

const addChienDich = async( req, res )=>{
    const {
        danhmuc,
        name,
        desc,
        target,
        endDate,

        provinceId,
        province,
        district,
        ward,
        detail

    } = req.body;

    const location = {
        provinceId, // mã tỉnh | thành phố dùng để lọc 3 miền
        province,   // tỉnh | thành phố
        district,   // quận | huyện 
        ward,       // phường
        detail,     // số nhà, tên đường...   
    }

    if(!req.file){
        return res.status(400).json({Error:'Vui lòng tải lên ảnh bìa'})
    }

    if(!req.user){
        return res.status(401).json({Error:'Vui lòng đăng nhập'})       
    }

    if(!name || !desc || !target || !danhmuc || !location || !endDate){
        return res.status(400).json({Error:'Vui lòng nhập đủ thông tin'})
    }

    try {
        const filepath = req.file.path.replace('public', '');
        
        const newChiendich = new Chiendich({
            _id : req.body._id,
            author : req.user.userId,
            danhmuc,

            name,
            desc,
            target,
            thumbnail : filepath,

            location,

            endDate
        })
        if(req.addforce){
            // add thẳng vào ko cần chờ xác nhận ( do admin | admin khu vuc tạo )
            newChiendich.status    = 'inProcess'
            newChiendich.acceptBy  = req.user.userId
            newChiendich.startDate = new Date()
        }

        await newChiendich.save();
       
        return res.status(200).json({})
    } catch (error) {return res.status(500).json({ status: false, error })}
}
const acceptChienDich = async( req, res )=>{
    let accept = false;
    
    const chiendichID = req.params.id;
    const user        = req.user;

    if(!chiendichID){
        return res.status(400).json({Error:'Vui lòng nhập đủ thông tin'})
    }

    try {
        const chiendich = await Chiendich.findById(chiendichID);
        if(!chiendich){
            return res.status(400).json({Error:'Chiến dịch không tồn tại'})
        }
        
        if(chiendich.status !== 'pending'){
            return res.status(400).json({Error:'Chiến dịch đã được duyệt hoặc không cần duyệt'})
        }

        if(req.admin){
            accept = true;
        }else if (req.canaccept && chiendich.location.regionId == user.role.split('_zone')[1]){
            // admin khu vực 
            accept = true;
        }
        
        if(accept){
            chiendich.status    = 'inProcess';
            chiendich.acceptBy  = user.userId;
            chiendich.startDate = new Date();
            await chiendich.save();   
            return res.status(200).json({})
        }
        return res.status(401).json({Error:'Bạn không có quyền duyệt chiến dịch này'});
    } catch (error) {return res.status(500).json({ status: false, error })}
}


module.exports ={
    addChienDich,
    acceptChienDich,
}