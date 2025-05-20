interface M_chien_dich {
    _id: string;
    danhmuc: M_danhmuc;
    author:{
        _id: string;
        name: string;
        avatar: string;
    }
    name: string;
    desc: string;
    status: string;
    current: number;
    target: number;
    thumbnail: string;
    startDate: string;
    endDate: string;
    lication:{
        provinceId:number
        province: string;
        district: string;
        ward: string;
        detail: string;
        region: string;
        regionId: number;
    }
    createdAt: string;
    updatedAt: string;
}


interface WardOption {
    label: string;
    value: string;
}
interface DistrictOption {
    label: string;
    value: string;
    wards: WardOption[];
}
interface ProvinceOption {
    label: string;
    value: string;
    districts: DistrictOption[];
}
