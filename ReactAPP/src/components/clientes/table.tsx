import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { resetClientesToInit, setClientesMessage } from "redux/actions";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import { Constant } from "template/Constant";
import ConfirmationModal from "template/ConfirmationModal";
import { deleteClientes } from "services/clientesService";
type Props = {
    hideShowForm: (action) => void;
    handleRowEdit: (row) => void;
    getData: (page, pageSize, searchKey) => void;
};
export const ClientesTable: React.FC<Props> = ({ hideShowForm, handleRowEdit, getData }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [rowData, setRowData] = useState(undefined);
    const rData = useSelector((state: RootState) => state.clientes);
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
            dispatch(resetClientesToInit());
            getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
        }
    },[rData.list.length])
    const handleReset = () => {
        setSearch('');
        dispatch(resetClientesToInit());
        getData(Constant.defaultPageNumber, rData.pageSize, '');
    }
    const handleServerDelete = async () => {
        if (rowData) {
            const response = await deleteClientes(rowData.id);
            if (response) {
                dispatch(resetClientesToInit());
                dispatch(setClientesMessage("Deleted Successfully"));
                getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                setShowDelete(false);
            } else {
                dispatch(setClientesMessage("Some error occured!"));
            }
        }
    }

    const handleRowSelection = (row) => {
        console.log(row); // Row Selection Functionality can be written here
    }
    const handleAddButtonClick = () => {
        dispatch(setClientesMessage(''));
        hideShowForm('add');
    }
    const navigateToAutosByUser = (clientId) => {
        navigate('/autos',{
            state:{
                clientId:clientId,
                test:0 
            }
        });
  
      };

    const columns = [
        {name: 'identificacion', selector: row => row.identificacion, sortable: true},
        {name: 'celular', selector: row => row.celular, sortable: true},
        {name: 'nombres', selector: row => row.nombres, sortable: true},
        {name: 'apellidos', selector: row => row.apellidos, sortable: true},
        {name: 'estado_civil_id', selector: row => row.estado_civil_id, sortable: true},
        {name: 'nombre', selector: row => row.estados_civil.nombre, sortable: true},
        {name: 'edad', selector: row => row.edad, sortable: true},
        {name: 'genero', selector: row => row.genero, sortable: true},
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
        {
            name: '',
            button: true,
            cell: (row) => <Button variant="link" className="btn-sm" onClick={() => navigateToAutosByUser(row.id)}>Ver Autos</Button>,
        },
    ];
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary">Clientes List ({rData.totalCount})
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

