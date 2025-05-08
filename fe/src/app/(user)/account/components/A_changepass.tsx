/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image'


interface isShow {
    ShowChangepassModel: boolean;
    setShowChangepassModel: (value: boolean) => void;
}
function EditBook(props: isShow) {
    const { ShowChangepassModel, setShowChangepassModel } = props;
    const [ old, setold]     = useState<string>('');
    const [ newp, setnewp]   = useState<string>('');
    const [ newcf, setnewcf] = useState<string>('');

    const handleClose = () => {
        setShowChangepassModel(false);
    }

    const handleSubmit= async()=>{
        //doi mat khau
    }
    
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                show={ShowChangepassModel}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'var(--secondary)'}}>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                        id='form_changepass'
                        onSubmit={(e)=>{
                            e.preventDefault()
                            handleSubmit()
                        }} 
                    >

                        <div >
                            <label htmlFor="old_pass">Mật khẩu cũ</label>
                            <input type="text" id='old_pass' name="name" 
                                placeholder='Mật khẩu cũ'   
                                value={String(old)}
                                onChange={(e) => setold(e.target.value)}
                            />
                            
                            <label htmlFor="new_pass">Mật khẩu mới</label>
                            <input type="text" id='new_pass' name="name" 
                                placeholder='Mật khẩu mới'   
                                value={String(newp)}
                                onChange={(e) => setnewp(e.target.value)}
                            />

                            <label htmlFor="new_pass_cf">Xác nhận mật khẩu</label>
                            <input type="text" id='new_pass_cf' name="name" 
                                placeholder='Xác nhận mật khẩu mới'   
                                value={String(newcf)}
                                onChange={(e) => setnewcf(e.target.value)}
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

export default EditBook;
