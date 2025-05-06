/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAuth } from "@/Authcontext";
import { useEffect } from "react";
import { Table } from 'react-bootstrap';


export default function Account_ownpjList() {
    const { user } = useAuth();
    useEffect(()=>{
        //call api cac thong tin tu thien cua nguoi dung
    },[])
   
    return(<div className="fullcol"  style={{userSelect:'none'}}>
        <h1>Chiến dịch của bạn </h1>
        <Table striped bordered hover size="sm" >
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên chiến dịch</th>
                    <th>Số tiền</th>
                    <th>Ngày</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
            </tbody>
        </Table>
    </div>)
}