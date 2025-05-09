/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import dotenv from 'dotenv';
import { mutate } from 'swr';
import axios from 'axios';
dotenv.config()
const apiurl = process.env.NEXT_PUBLIC_API_URL;


interface Prop {
    ShowUpdateModel: boolean;
    setShowUpdateModel: (value: boolean) => void;
    danhmuc: M_danhmuc | undefined
}
function EditDanhmuc(props: Prop) {
    const { ShowUpdateModel, setShowUpdateModel , danhmuc } = props;

    const [ name, setname ] = useState<string | null>("");
    const [ desc, setdesc ] = useState<string | null>("");
    const [ id, setid ]     = useState<string|null>();

    useEffect(()=>{
        if(danhmuc){
            setid(danhmuc._id)
            setname(danhmuc.name)
            setdesc(danhmuc.desc)
        }
        
    },[danhmuc])

    const handleClose = () => {
        // setid(null);
        // setname(null);
        // setdesc(null)
        setShowUpdateModel(false);
    }

    const handleSubmit= async()=>{
        const dt = {
            name,desc
        }
        const jwt = localStorage.getItem('JWT')

        const fe = await axios.put(`${apiurl}/danhmuc/edit/${id}`,dt,{
            headers:{
                'authorization': `Bearer ${ jwt }`,
            }
        })        
        if(fe.status==200){
            mutate(`${apiurl}/danhmuc/`)
            toast.success('Sửa danh mục thàng công')
            handleClose()
        }else if(fe.status==400){
            toast.warning('Vui lòng nhập đủ thông tin')
        }else if(fe.status==401){
            toast.warning('Bạn không có quyền thay đổi nội dung này')
        }else{
            toast.warning('Sửa danh mục thất bại')
        }
    }
    
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                show={ShowUpdateModel}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'var(--secondary)'}}>Sửa danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                        id='form_edit_book'
                        onSubmit={(e)=>{
                            e.preventDefault()
                            handleSubmit()
                        }} 
                    >
                        <div className="">

                            <label htmlFor="edit_name">Tên sách</label>
                            <input type="text" id='edit_name' name="name" 
                                placeholder={String(name)}
                                onChange={(e) => setname(e.target.value)}
                                required    
                            />


                            <label htmlFor="edit_desc">Mô tả</label>
                            <input type="text" id='edit_desc' name="name" 
                                placeholder={String(desc)}
                                onChange={(e) => setdesc(e.target.value)}
                                required    
                            />

                        </div>                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" ><input type="submit" style={{background:'none'}}  value="Edit" form='form_edit_book' /></Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditDanhmuc;
