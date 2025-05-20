/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import axios from "axios";
import Select from "react-select";

import dotenv from "dotenv";
dotenv.config();
const apiurl = process.env.NEXT_PUBLIC_API_URL;

interface Prop {
    ShowUpdateModel: boolean;
    setShowUpdateModel: (value: boolean) => void;
}

const blankImg ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAHHklEQVR4nO3VMQEAIAzAMMDM/DtExo4mCvr1zswBoOdtBwCwwwAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAgygAAogwAIMoAAKIMACDKAACiDAAg6gOmaAR1QMQasQAAAABJRU5ErkJggg==";

export default function Add(props: Prop) {
    const { ShowUpdateModel, setShowUpdateModel } = props;

    const [locationTree, setLocationTree] = useState<ProvinceOption[] | null>(
        null
    );
    const [danhmucs, setDanhmucs] = useState<M_danhmucOptions[]>([]);

    const [name, setname] = useState<string>("");
    const [desc, setdesc] = useState<string>("");
    const [target, settarget] = useState<number>(0);
    const [endDate, setendDate] = useState<string | null>("");

    const [danhmuc, setdanhmuc] = useState<string | null>("");

    const [provinceId, setprovinceId] = useState<string | null>("");
    const [province, setprovince] = useState<string | null>("");
    const [district, setdistrict] = useState<string | null>("");
    const [ward, setward] = useState<string | null>("");
    const [detail, setdetail] = useState<string | null>("");

    const [image, setimage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // State cho select địa chỉ
    const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
        null
    );
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
        null
    );
    const [selectedWard, setSelectedWard] = useState<string | null>(null);

    const handleClose = () => {
        setShowUpdateModel(false);
    };

    const handleSubmit = async () => {
        if (!selectedProvinceId || !selectedDistrict || !selectedWard) {
            toast.warning("Vui lòng chọn đầy đủ địa chỉ (tỉnh/thành phố, quận/huyện, phường/xã)");
            return;
        }
        const formData = new FormData();
        formData.append("name", name!);
        formData.append("desc", desc!);
        formData.append("danhmuc", danhmuc!);
        formData.append("target", String(target || 0));
        formData.append("endDate", endDate!);
        formData.append("provinceId", provinceId!);
        formData.append("province", province!);
        formData.append("district", district!);
        formData.append("ward", ward!);
        formData.append("detail", detail!);
        if (image) {
            formData.append("img", image)
        }else{
            toast.warning("Vui lòng chọn ảnh");
            return;
        }

        const jwt = localStorage.getItem("JWT");
        try {
            const fe = await axios.post(`${apiurl}/chiendich/add`, formData, {
                headers: {
                    authorization: `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (fe.status == 200) {
                mutate(`${apiurl}/chiendich/`);
                toast.success("Thêm chiến dịch thàng công");
                handleClose();
            } else if (fe.status == 400) {
                toast.warning("Vui lòng nhập đủ thông tin");
            } else if (fe.status == 401) {
                toast.warning("Bạn không có quyền thay đổi nội dung này");
            } else {
                toast.warning("Thêm chiến dịch thất bại");
            }
        } catch (err) {
            toast.warning("Thêm chiến dịch thất bại");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setimage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const Mount = async () => {
        const fe1 = await axios.get("/json/ABC.json");
        const feDM = await axios.get(`${apiurl}/danhmuc/`);
        
        
        setDanhmucs(feDM.data?.map((item:M_danhmuc) => {
            item.label = item.name;
            item.value = item._id;
            return item;
        }));



        setLocationTree(fe1.data);
    };

    useEffect(() => {
        if (ShowUpdateModel) {
            setname('');
            setdesc('');
            setdanhmuc(null);
            settarget(0);
            setendDate(null);
            setprovinceId(null);
            setprovince(null);
            setdistrict(null);
            setward(null);
            setdetail(null);
            setimage(null);
            setImagePreview(null);
            setSelectedProvinceId(null);
            setSelectedDistrict(null);
            setSelectedWard(null);
            setSelectedProvinceId(null);
            setSelectedDistrict(null);
            setSelectedWard(null);
        }
    }, [ShowUpdateModel]);

    useEffect(() => {
        Mount();
    }, []);

    const provinceOptions: ProvinceOption[] = locationTree ? locationTree : [];

    const selectedProvinceObj =
        provinceOptions.find(
            (p: ProvinceOption) => p.value === selectedProvinceId
        ) || null;

    const districtOptions: DistrictOption[] = selectedProvinceObj
        ? selectedProvinceObj.districts
        : [];

    const selectedDistrictObj =
        districtOptions.find(
            (d: DistrictOption) => d.value === selectedDistrict
        ) || null;

    const wardOptions: WardOption[] = selectedDistrictObj
        ? selectedDistrictObj.wards
        : [];

    const selectedWardObj =
        wardOptions.find((w: WardOption) => w.value === selectedWard) || null;

    

    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal
                show={ShowUpdateModel}
                onHide={handleClose}
                backdrop={true}
                keyboard={true}
                size="lg"
            >
                {danhmuc}
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "var(--secondary)" }}>
                        Thêm chiến dịch
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        
                        id="form_add_chiendich"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="flex gap-2 flex-col"
                    >
                        <div className="flex gap-2">
                            {/* image preview */}
                            <div className="w-50 aspect-square flex justify-center items-center row-span-3 relative">
                                <img
                                    className="w-full object-contain aspect-square rounded-md absolute top-0 left-0 z-0"
                                    src={imagePreview ? imagePreview : blankImg}
                                    alt="preview"
                                />

                                <label
                                    className="
                                        border rounded px-3 py-1 z-1 cursor-pointer text-white object-contain
                                        hover:bg-gray-700 hover:text-gray-100
                                    "
                                    htmlFor="img"
                                >
                                    Chọn ảnh
                                </label>
                                <input
                                    type="file"
                                    id="img"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </div>

                            {/* basic info */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2">
                                    <label htmlFor="add_name">
                                        Tên chiến dịch
                                    </label>
                                    <input
                                        type="text"
                                        id="add_name"
                                        placeholder="Tên chiến dịch"
                                        onChange={(e) =>
                                            setname(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="add_endDate">
                                        Thời gian kết thúc
                                    </label>
                                    <input
                                        type="date"
                                        id="add_endDate"
                                        placeholder="Thời gian kết thúc"
                                        onChange={(e) =>
                                            setendDate(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="add_danhmuc">
                                        Danh mục
                                    </label>
                                    <select 
                                        id='add_danhmuc' 
                                        required 
                                        name='danhmuc' 
                                        onChange={(e) => setdanhmuc(e.target.value)}
                                    >
                                        <option disabled selected style={{ color: "gray" }}>
                                            Chọn danh mục
                                        </option>
                                        <hr/>
                                        {danhmucs.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="add_target">
                                        Số tiền huy động
                                    </label>

                                    <input
                                        type="number"
                                        id="add_target"
                                        placeholder="Số tiền huy động"
                                        onChange={(e) =>
                                            settarget(Number(e.target.value))
                                        }
                                        min={0}
                                        required
                                    />
                                </div>

                                <div className=" col-span-3">
                                    <label htmlFor="add_desc">Mô tả</label>
                                    <textarea
                                        id="add_desc"
                                        style={{ resize: "none" }}
                                        placeholder="Mô tả danh mục"
                                        onChange={(e) =>
                                            setdesc(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* thong tin dia chi */}
                        <div className="grid grid-cols-3 gap-2">
                            {/* thanh pho  */}
                            <div className="">
                                <label htmlFor="add_province">
                                    Tỉnh/Thành phố
                                </label>
                                <Select
                                    id="add_province"
                                    options={provinceOptions}
                                    value={selectedProvinceObj}
                                    onChange={(option) => {
                                        if (option) {
                                            setSelectedProvinceId(
                                                (option as ProvinceOption).value
                                            );
                                            setprovinceId(
                                                (option as ProvinceOption).value
                                            );
                                            setprovince(
                                                (option as ProvinceOption).label
                                            );
                                        } else {
                                            setSelectedProvinceId(null);
                                            setprovinceId("");
                                            setprovince("");
                                        }
                                        setSelectedDistrict(null);
                                        setdistrict("");
                                        setSelectedWard(null);
                                        setward("");
                                    }}
                                    placeholder="Chọn tỉnh/thành phố"
                                    isClearable
                                    menuShouldScrollIntoView={false}
                                    maxMenuHeight={210}
                                />
                            </div>

                            {/* quan huyen */}
                            <div className="">
                                <label htmlFor="add_district">Quận/Huyện</label>
                                <Select
                                    id="add_district"
                                    options={districtOptions}
                                    value={selectedDistrictObj}
                                    onChange={(option) => {
                                        setSelectedDistrict(
                                            option
                                                ? (option as DistrictOption)
                                                      .value
                                                : null
                                        );
                                        setdistrict(
                                            option
                                                ? (option as DistrictOption)
                                                      .value
                                                : ""
                                        );
                                        setSelectedWard(null);
                                        setward("");
                                    }}
                                    placeholder="Chọn quận/huyện"
                                    isClearable
                                    isDisabled={!selectedProvinceId}
                                    menuShouldScrollIntoView={false}
                                    maxMenuHeight={210}
                                />
                            </div>

                            {/* phuong xa */}
                            <div className="">
                                <label htmlFor="add_ward">Phường/Xã</label>
                                <Select
                                    id="add_ward"
                                    options={wardOptions}
                                    value={selectedWardObj}
                                    onChange={(option) => {
                                        setSelectedWard(
                                            option
                                                ? (option as WardOption).value
                                                : null
                                        );
                                        setward(
                                            option
                                                ? (option as WardOption).value
                                                : ""
                                        );
                                    }}
                                    placeholder="Chọn phường/xã"
                                    isClearable
                                    isDisabled={!selectedDistrict}
                                    menuShouldScrollIntoView={false}
                                    maxMenuHeight={210}
                                />
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="add_detail">
                                    Địa chỉ chi tiết
                                </label>
                                <input
                                    type="text"
                                    id="add_detail"
                                    name="name"
                                    placeholder="Địa chỉ chi tiết"
                                    onChange={(e) => setdetail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary">
                        <input
                            type="submit"
                            style={{ background: "none" }}
                            value="Thêm"
                            form="form_add_chiendich"
                        />
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
