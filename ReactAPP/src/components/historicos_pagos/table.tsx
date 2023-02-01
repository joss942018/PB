import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { resetHistoricos_PagosToInit, setHistoricos_PagosMessage } from "redux/actions";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import { Constant } from "template/Constant";
import ConfirmationModal from "template/ConfirmationModal";
import { deleteHistoricos_Pagos } from "services/historicos_pagosService";
type Props = {
    hideShowForm: (action) => void;
    handleRowEdit: (row) => void;
    getData: (page, pageSize, searchKey) => void;
};
export const Historicos_PagosTable: React.FC<Props> = ({ hideShowForm, handleRowEdit, getData }) => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [rowData, setRowData] = useState(undefined);
    const rData = useSelector((state: RootState) => state.historicos_pagos);
    const handleSearch = () => {
        if (search.length > 0) {
            getData(Constant.defaultPageNumber, Constant.defaultPageSize, search);
        }
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        await getData(page, newPerPage, '');
    }
    const handlePageChange = (page) => {
        getData(page, rData.pageSize, '');
    };
    const handleRowDeleteClick = (row) => {
        setRowData(row);
        setShowDelete(true);
    }
    useEffect(() => {
        if (rData && rData.list && rData.list.length === 0) {
            dispatch(resetHistoricos_PagosToInit());
            getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
        }
    },[rData.list.length])
    const handleReset = () => {
        setSearch('');
        dispatch(resetHistoricos_PagosToInit());
        getData(Constant.defaultPageNumber, rData.pageSize, '');
    }
    const handleServerDelete = async () => {
        if (rowData) {
            const response = await deleteHistoricos_Pagos(rowData.id);
            if (response) {
                dispatch(resetHistoricos_PagosToInit());
                dispatch(setHistoricos_PagosMessage("Deleted Successfully"));
                getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                setShowDelete(false);
            } else {
                dispatch(setHistoricos_PagosMessage("Some error occured!"));
            }
        }
    }

    const handleRowSelection = (row) => {
        console.log(row); // Row Selection Functionality can be written here
    }
    const handleAddButtonClick = () => {
        dispatch(setHistoricos_PagosMessage(''));
        hideShowForm('add');
    }

    const columns = [
       {name: 'id', selector: row => row.id, sortable: true},
{name: 'cuentacobrar_id', selector: row => row.cuentacobrar_id, sortable: true},
{name: 'concepto', selector: row => row.cuentas_por_cobrar.concepto, sortable: true},
{name: 'observacion', selector: row => row.observacion, sortable: true},
{name: 'valor', selector: row => row.valor, sortable: true},
{name: 'formapago_id', selector: row => row.formapago_id, sortable: true},
{name: 'imagen', selector: row => row.imagen, sortable: true},
{name: 'concepto', selector: row => row.concepto, sortable: true},
{name: 'fecha', selector: row => row.fecha, sortable: true},
{name: 'fecha_vencimiento', selector: row => row.fecha_vencimiento, sortable: true},
{name: 'num_factura', selector: row => row.num_factura, sortable: true},

       {
            name: '',
            button: true,
            cell: (row) => <Button variant="link" className="btn-sm" onClick={() => handleRowEdit(row)}>Editar</Button>,
        },
        {
            name: '',
            button: true,
            cell: (row) => <Button variant="link" className="btn-sm" onClick={() => handleRowDeleteClick(row)}>Eliminar</Button>,
        },
    ];
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary">Historicos_Pagos List ({rData.totalCount})
                    <Button variant="light" className="btn-circle btn-sm ml-2" onClick={handleReset}><i className="fa fa-refresh"></i></Button>
                    <Button className="btn-icon-split float-right" onClick={handleAddButtonClick}>
                        <span className="icon text-white-50">
                            <i className="fas fa-add"></i>
                        </span>
                        <span className="text">Nuevo</span>
                    </Button></h6>

            </Card.Header>
            <Card.Body>
                <Col className="ml-auto" md={3} xs={12} xl={3}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Buscar"
                            aria-label="Search"
                            aria-describedby="basic-search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button disabled={search.length <= 2} variant="dark" className="rounded-0 rounded-right" id="button-search" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
                <div className="table-responsive">
                    <DataTable
                        selectableRows={true}
                        onSelectedRowsChange={handleRowSelection}
                        paginationPerPage={Constant.defaultPageNumber}
                        paginationRowsPerPageOptions={Constant.paginationRowsPerPageOptions}
                        columns={columns} data={rData.list}
                        onChangeRowsPerPage={handlePerRowsChange}
                        paginationTotalRows={rData.totalCount}
                        className="table table-bordered"
                        pagination
                        paginationServer
                        onChangePage={handlePageChange}></DataTable>
                </div>
            </Card.Body>
            <ConfirmationModal buttonNegative="Cancel" buttonPositive="Delete" title="Delete Confirmation" show={showDelete} body={"Are you sure?"} onNegative={() => setShowDelete(false)} onPositive={handleServerDelete} />
        </Card>
    );
}

