/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import ButtonMUI from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { EditIcon, SquarePlus, Delete } from "lucide-react";
import EditModal from "./edit.modal";
import AddModal from "./add.modal";
import { toast } from "react-toastify";
import { PaginationItem } from "@mui/material";

const apiurl = process.env.NEXT_PUBLIC_API_URL;

const DanhmucPage = () => {
    const fetcher = (url: string) => fetch(url).then((e) => e.json());
    const {
        data = [],
        error,
        isLoading,
    } = useSWR(`${apiurl}/danhmuc/`, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const [showeditmodal, setshoweditmodal] = useState(false);
    const [showaddmodal, setshowaddmodal] = useState(false);
    const [danhmuc, setdanhmuc] = useState<M_danhmuc | undefined>();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleEditClick = (a: M_danhmuc) => {
        setdanhmuc(a);
        setshoweditmodal(true);
    };

    const handleDeleteClick = (a: M_danhmuc) => {
        toast.success("tính năng chưa hoàn tất");
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Tên danh mục", flex: 3 },
        { field: "desc", headerName: "Description", flex: 3 },
        { field: "_id", headerName: "Id danh mục", flex: 3 },
        { field: "count", headerName: "Count", flex: 1 },
        {
            field: "action_edit",
            headerName: "Sửa",
            type: "actions",
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
            field: "action_del",
            headerName: "Xóa",
            type: "actions",
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

    const totalPage = Math.ceil(data.length / pageSize);
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <h2 className="text-center">Danh mục</h2>

            <div className="flex gap-3 my-3">
                <div className="flex-1 bg-gray-800 rounded p-3">
                    Tổng số danh mục: {data.length}
                </div>
                <div className="flex-1 bg-gray-800 rounded p-3">
                    Trang hiện tại: {page}
                </div>
                <div className="flex-1 bg-gray-800 rounded p-3">
                    Dòng mỗi trang: {pageSize}
                </div>
            </div>

            <ButtonMUI
                variant="outlined"
                className="gap-2 mb-3"
                onClick={() => setshowaddmodal(true)}
            >
                <SquarePlus /> Add
            </ButtonMUI>

            <div className="bg-gray-800 rounded p-3">
                <div className=" relative flex justify-end items-center mb-4">
                    <Pagination
                        className="absolute left-1/2 -translate-x-1/2 "
                        color="primary"
                        count={totalPage}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                sx={{
                                    color: "white",
                                    "&.Mui-disabled": {
                                        color: "#555", // màu khi mũi tên bị vô hiệu
                                    },
                                }}
                            />
                        )}
                    />

                    <div className="flex items-center gap-2">
                        <span className="text-white">Rows per page:</span>
                        <Select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPage(1); // Reset về trang 1 khi thay đổi pageSize
                            }}
                            variant="outlined"
                            size="small"
                            sx={{ color: "white", borderColor: "white" }}
                        >
                            {[5, 10, 15].map((size) => (
                                <MenuItem key={size} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* DataGrid */}
                <DataGrid
                    hideFooter
                    rows={paginatedData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    sx={{ border: 0, width: "100%" }}
                />
            </div>

            <EditModal
                ShowUpdateModel={showeditmodal}
                setShowUpdateModel={setshoweditmodal}
                danhmuc={danhmuc}
                resetDM={()=>{setdanhmuc(undefined)}
                }
            />
            <AddModal
                ShowUpdateModel={showaddmodal}
                setShowUpdateModel={setshowaddmodal}
            />
        </>
    );
};

export default DanhmucPage;
