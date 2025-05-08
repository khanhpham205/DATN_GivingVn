/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image'


interface isShow {
    ShowUpdateModel: boolean;
    setShowUpdateModel: (value: boolean) => void;
    user: M_user | undefined
}
function EditBook(props: isShow) {
    const { ShowUpdateModel, setShowUpdateModel , user } = props;
    const [img, setimg] = useState<string>("");
    const [name, setname] = useState<string | null>();
    const [id, setid] = useState<string>();
    
    useEffect(()=>{
        if(user){
            console.log(user.avatar);
            
            setid(user._id)
            setname(user.name)
            setimg(user.avatar)
        }
        console.log(img);
        
    },[user])

    const handleClose = () => {
        setShowUpdateModel(false);
    }

    const changeimg = ()=>{
        const imgipt = document.getElementById('form_edit_book_img') as HTMLInputElement
        const img = document.getElementById('form_edit_book_imgpre') as HTMLImageElement
        if(imgipt.files instanceof FileList){
            img.src = URL.createObjectURL(imgipt.files[0])
        }
    }

    const handleSubmit= async()=>{

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
                    <Modal.Title style={{color:'var(--secondary)'}}>Chỉnh sửa thông tin cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                        id='form_edit_user'
                        onSubmit={(e)=>{
                            e.preventDefault()
                            handleSubmit()
                        }} 
                    >
                        <div className="imgpreview">
                            <label htmlFor="form_edit_userAvatar"
                                title='Ảnh cũ sẽ bị xóa'
                            >Ảnh bìa</label>
                            <Image width={1500} height={1500} src={img} alt='' id='form_edit_book_imgpre' />
                        </div>
                        <div className="form_edit_user">

                            <label htmlFor="edit_user_name">Họ và Tên</label>
                            <input type="text" id='edit_user_name' name="name" 
                                placeholder='Họ và Tên'
                                value={String(name)}
                                onChange={(e) => setname(e.target.value)}
                            />

                            <input onChange={changeimg} type="file" 
                                id='form_edit_userAvatar' hidden 
                                name="img" accept='image/*'
                            />
                            

                            <input type="text" hidden name="old_img"  value={user?.avatar} />
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

export default EditBook;
