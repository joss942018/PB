import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setClientesMessage } from "redux/actions";
import { resetEstados_CivilToInit, setEstados_CivilList } from "redux/actions";

import { getEstados_Civil } from "services/estados_civilService";

import { useAppDispatch } from "redux/store";
import { addClientes, updateClientes } from "services/clientesService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const ClientesForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,identificacion:'',celular:'',nombres:'',apellidos:'',estado_civil_id:0,ciudad_id:0,edad:0,genero:'',terminos_condiciones:''};
    const initialValue = action === 'edit' ? row : iValue;
    const estados_civilData = useSelector((state: RootState) => state.estados_civil);

    useEffect(() => {
    if (estados_civilData && estados_civilData.list && estados_civilData.list.length === 0) {
                dispatch(resetEstados_CivilToInit());
                getEstados_Civil(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                    if (response && response.records) {
                    dispatch(setEstados_CivilList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                    } else {
                    dispatch(setClientesMessage("No Record Found For Estados_Civil"));
                    }
                })
            }
    });
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateClientes(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setClientesMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setClientesMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addClientes(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setClientesMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setClientesMessage("Some error occured!"));
                }
            }
        },
            validationSchema: yup.object({
            identificacion: yup.string().required('identificacion es requerido'),
            celular: yup.string().required('celular es requerido'),
            nombres: yup.string().required('nombres es requerido'),
            apellidos: yup.string().required('apellidos es requerido'),
            edad: yup.number().required('edad es requerido'),
            genero: yup.string().required('genero es requerido'),
            terminos_condiciones: yup.boolean().required('terminos_condiciones es requerido'),
            estado_civil_id: yup.string().required('estado_civil_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Clientes
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Clientes</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group>
<label className="form -control-label">identificacion</label>
<Form.Control type="text" name="identificacion" className="form-control" value={formik.values.identificacion}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.identificacion && !!formik.errors.identificacion}
isValid ={!!formik.touched.identificacion && !formik.errors.identificacion}
></Form.Control>
{
    formik.errors.identificacion && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.identificacion}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">celular</label>
<Form.Control type="text" name="celular" className="form-control" value={formik.values.celular}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.celular && !!formik.errors.celular}
isValid ={!!formik.touched.celular && !formik.errors.celular}
></Form.Control>
{
    formik.errors.celular && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.celular}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">nombres</label>
<Form.Control type="text" name="nombres" className="form-control" value={formik.values.nombres}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.nombres && !!formik.errors.nombres}
isValid ={!!formik.touched.nombres && !formik.errors.nombres}
></Form.Control>
{
    formik.errors.nombres && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.nombres}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">apellidos</label>
<Form.Control type="text" name="apellidos" className="form-control" value={formik.values.apellidos}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.apellidos && !!formik.errors.apellidos}
isValid ={!!formik.touched.apellidos && !formik.errors.apellidos}
></Form.Control>
{
    formik.errors.apellidos && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.apellidos}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">edad</label>
<Form.Control type="text" name="edad" className="form-control" value={formik.values.edad}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.edad && !!formik.errors.edad}
isValid ={!!formik.touched.edad && !formik.errors.edad}
></Form.Control>
{
    formik.errors.edad && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.edad}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">genero</label>
<Form.Control type="text" name="genero" className="form-control" value={formik.values.genero}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.genero && !!formik.errors.genero}
isValid ={!!formik.touched.genero && !formik.errors.genero}
></Form.Control>
{
    formik.errors.genero && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.genero}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">terminos_condiciones</label>
<Form.Control type="text" name="terminos_condiciones" className="form-control" value={formik.values.terminos_condiciones}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.terminos_condiciones && !!formik.errors.terminos_condiciones}
isValid ={!!formik.touched.terminos_condiciones && !formik.errors.terminos_condiciones}
></Form.Control>
{
    formik.errors.terminos_condiciones && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.terminos_condiciones}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">estado_civil_id</label>
<Form.Control as="select"  name="estado_civil_id" className="form-control" value={formik.values.estado_civil_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.estado_civil_id && !!formik.errors.estado_civil_id}
isValid ={!!formik.touched.estado_civil_id && !formik.errors.estado_civil_id}
>
<option value={0}>Select Estados_Civil </option> 
{
estados_civilData.list.map((item, i) => {
return <option value={item.id} key={`estados_civil-${i}`}>{item.nombre}</option>
})}
</Form.Control>
{
    formik.errors.estado_civil_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.estado_civil_id}
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

