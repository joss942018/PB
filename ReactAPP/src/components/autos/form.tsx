import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setAutosMessage } from "redux/actions";
import { resetMarcasToInit, setMarcasList } from "redux/actions";
import { resetAñoToInit, setAñoList } from "redux/actions";
import { resetClientesToInit, setClientesList } from "redux/actions";

import { getMarcas } from "services/marcasService";
import { getAño } from "services/añoService";
import { getClientes } from "services/clientesService";

import { useAppDispatch } from "redux/store";
import { addAutos, updateAutos } from "services/autosService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const AutosForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,marca_id:0,modelo_id:0,año_id:0,cliente_id:0};
    const initialValue = action === 'edit' ? row : iValue;
    const marcasData = useSelector((state: RootState) => state.marcas);
    const añoData = useSelector((state: RootState) => state.año);
    const clientesData = useSelector((state: RootState) => state.clientes);

    useEffect(() => {
    if (marcasData && marcasData.list && marcasData.list.length === 0) {
        dispatch(resetMarcasToInit());
        getMarcas(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
            if (response && response.records) {
                dispatch(setMarcasList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
            } else {
                dispatch(setAutosMessage("No Record Found For Marcas"));
            }
            })
    }
if (añoData && añoData.list && añoData.list.length === 0) {
            dispatch(resetAñoToInit());
            getAño(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setAñoList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setAutosMessage("No Record Found For Año"));
                }
              })
        }
if (clientesData && clientesData.list && clientesData.list.length === 0) {
            dispatch(resetClientesToInit());
            getClientes(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setClientesList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setAutosMessage("No Record Found For Clientes"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateAutos(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setAutosMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setAutosMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addAutos(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setAutosMessage("Added Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setAutosMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           id: yup.number().required('id is required'),
marca_id: yup.string().required('marca_id is required'),
año_id: yup.string().required('año_id is required'),
cliente_id: yup.string().required('cliente_id is required'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Autos
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Autos</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group>
<label className="form -control-label">id</label>
<Form.Control type="text" name="id" className="form-control" value={formik.values.id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.id && !!formik.errors.id}
isValid ={!!formik.touched.id && !formik.errors.id}
></Form.Control>
{
    formik.errors.id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.id}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">marca_id</label>
<Form.Control as="select"  name="marca_id" className="form-control" value={formik.values.marca_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.marca_id && !!formik.errors.marca_id}
isValid ={!!formik.touched.marca_id && !formik.errors.marca_id}
>
<option value={0}>Select Marcas </option> 
{
marcasData.list.map((item, i) => {
return <option value={item.id} key={`marcas-${i}`}>{item.nombre}</option>
})}
</Form.Control>
{
    formik.errors.marca_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.marca_id}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">año_id</label>
<Form.Control as="select"  name="año_id" className="form-control" value={formik.values.año_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.año_id && !!formik.errors.año_id}
isValid ={!!formik.touched.año_id && !formik.errors.año_id}
>
<option value={0}>Select Año </option> 
{
añoData.list.map((item, i) => {
return <option value={item.id} key={`año-${i}`}>{item.descripcion}</option>
})}
</Form.Control>
{
    formik.errors.año_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.año_id}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">cliente_id</label>
<Form.Control as="select"  name="cliente_id" className="form-control" value={formik.values.cliente_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.cliente_id && !!formik.errors.cliente_id}
isValid ={!!formik.touched.cliente_id && !formik.errors.cliente_id}
>
<option value={0}>Select Clientes </option> 
{
clientesData.list.map((item, i) => {
return <option value={item.id} key={`clientes-${i}`}>{item.identificacion}</option>
})}
</Form.Control>
{
    formik.errors.cliente_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.cliente_id}
    </Form.Control.Feedback>
)}
</Form.Group>

                    <Form.Group>
                        <Button type="submit" className="float-right" variant="primary">Save</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}
