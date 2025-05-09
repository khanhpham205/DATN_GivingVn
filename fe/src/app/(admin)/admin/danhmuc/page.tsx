/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import useSWR, { Fetcher, mutate } from 'swr';
import { useEffect, useState } from 'react';
import { 
    DataGrid, 
    GridColDef,
    GridActionsCellItem
} from '@mui/x-data-grid';
import { 
    EditIcon ,
    SquarePlus ,
    Delete ,

} from 'lucide-react';
import ButtonMUI from '@mui/material/Button';


import EditModal from './edit.modal'
import AddModal from './add.modal'
import { toast } from 'react-toastify';


const apiurl = process.env.NEXT_PUBLIC_API_URL;

const DanhmucPage= ()=>{

    const fetcher: Fetcher<M_danhmuc[]> = (url:string)=>fetch(url).then(e=>e.json())
    const {data,error, isLoading} = useSWR(
        `${apiurl}/danhmuc/`,
        fetcher,
        {
        revalidateIfStale: true,
        revalidateOnFocus:false,
        revalidateOnReconnect: false,
        }
    )

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [showeditmodal,setshoweditmodal]=useState<boolean>(false);
    const [showaddmodal,setshowaddmodal]=useState<boolean>(false);
    const [danhmuc,setdanhmuc]=useState<M_danhmuc|undefined>();


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Tên danh mục', flex: 1 },
        { field: 'desc', headerName: 'Description', flex: 1 },
        { field: '_id', headerName: 'Id danh mục', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
        {
            field: 'action_edit',
            headerName: 'Sửa',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                icon={<EditIcon />}
                label="Sửa"
                onClick={() => handleEditClick(params.row)}
                showInMenu={false}
                />,
            ],
        },
        {
            field: 'action_del',
            headerName: 'Xóa',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                icon={<Delete />}
                label="Xóa"
                onClick={() => handleDeleteClick(params.row)}
                showInMenu={false}
                />,
            ],
        },
    ];


    const handleEditClick = (a:M_danhmuc)=>{
        setdanhmuc(a)
        setshoweditmodal(true);
    }
    const handleDeleteClick = (a:M_danhmuc)=>{
        toast.success('tính năng chưa hoàn tất')
    }

    useEffect(()=>{
        console.log(data);
        
    },[data])

    return(<>
        <h2 className="text-center" >Danh mục</h2>

        <div className="flex gap-3 my-3">
            <div className=" flex-1 bg-gray-800 rounded p-3">Tổng số danh mục: </div>
            <div className=" flex-1 bg-gray-800 rounded p-3">Tổng số danh mục: </div>
            <div className=" flex-1 bg-gray-800 rounded p-3">Tổng số danh mục: </div>
            
        </div>
        <ButtonMUI 
            variant="outlined" 
            className='gap-2 mb-3 ' 
            onClick={()=>{setshowaddmodal(true)}}
        ><SquarePlus/> Add</ButtonMUI>
        
        <div className="bg-gray-800 rounded p-3">
            <DataGrid 
                rows={data} 
                columns={columns}   
                getRowId={(row) => row._id}
                pagination
                pageSizeOptions={[5, 10, 15]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                // checkboxSelection
                sx={{ 
                    border: 0,
                    width: '100%', 
                    // backgroundColor: '#1E293B',
                }}

            />

        </div>
        <EditModal 
            ShowUpdateModel={showeditmodal} 
            setShowUpdateModel={setshoweditmodal} 
            danhmuc={danhmuc}
        />
        <AddModal  
            ShowUpdateModel={showaddmodal} 
            setShowUpdateModel={setshowaddmodal} 
        />
    </>)

}


export default DanhmucPage