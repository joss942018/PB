import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setHistoricos_PagosMessage } from "redux/actions";
import { resetCuentas_Por_CobrarToInit, setCuentas_Por_CobrarList } from "redux/actions";

import { getCuentas_Por_Cobrar } from "services/cuentas_por_cobrarService";

import { useAppDispatch } from "redux/store";
import { addHistoricos_Pagos, updateHistoricos_Pagos } from "services/historicos_pagosService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const Historicos_PagosForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,cuentacobrar_id:0,observacion:'',valor:0,formapago_id:0,imagen:'',concepto:'',fecha:'',fecha_vencimiento:'',num_factura:''};
    const initialValue = action === 'edit' ? row : iValue;
    const cuentas_por_cobrarData = useSelector((state: RootState) => state.cuentas_por_cobrar);

    useEffect(() => {
if (cuentas_por_cobrarData && cuentas_por_cobrarData.list && cuentas_por_cobrarData.list.length === 0) {
            dispatch(resetCuentas_Por_CobrarToInit());
            getCuentas_Por_Cobrar(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setCuentas_Por_CobrarList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setHistoricos_PagosMessage("No Record Found For Cuentas_Por_Cobrar"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateHistoricos_Pagos(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setHistoricos_PagosMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setHistoricos_PagosMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addHistoricos_Pagos(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setHistoricos_PagosMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setHistoricos_PagosMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           id: yup.number().required('id es requerido'),
observacion: yup.string().required('observacion es requerido'),
valor: yup.number().required('valor es requerido'),
formapago_id: yup.number().required('formapago_id es requerido'),
imagen: yup.string().required('imagen es requerido'),
concepto: yup.string().required('concepto es requerido'),
fecha: yup.date().required('fecha es requerido'),
fecha_vencimiento: yup.date().required('fecha_vencimiento es requerido'),
num_factura: yup.string().nullable(),
cuentacobrar_id: yup.string().required('cuentacobrar_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Historicos_Pagos
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Historicos_Pagos</span>
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
<label className="form -control-label">observacion</label>
<Form.Control type="text" name="observacion" className="form-control" value={formik.values.observacion}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.observacion && !!formik.errors.observacion}
isValid ={!!formik.touched.observacion && !formik.errors.observacion}
></Form.Control>
{
    formik.errors.observacion && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.observacion}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">valor</label>
<Form.Control type="text" name="valor" className="form-control" value={formik.values.valor}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.valor && !!formik.errors.valor}
isValid ={!!formik.touched.valor && !formik.errors.valor}
></Form.Control>
{
    formik.errors.valor && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.valor}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">formapago_id</label>
<Form.Control type="text" name="formapago_id" className="form-control" value={formik.values.formapago_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.formapago_id && !!formik.errors.formapago_id}
isValid ={!!formik.touched.formapago_id && !formik.errors.formapago_id}
></Form.Control>
{
    formik.errors.formapago_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.formapago_id}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">imagen</label>
<Form.Control type="text" name="imagen" className="form-control" value={formik.values.imagen}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.imagen && !!formik.errors.imagen}
isValid ={!!formik.touched.imagen && !formik.errors.imagen}
></Form.Control>
{
    formik.errors.imagen && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.imagen}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">concepto</label>
<Form.Control type="text" name="concepto" className="form-control" value={formik.values.concepto}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.concepto && !!formik.errors.concepto}
isValid ={!!formik.touched.concepto && !formik.errors.concepto}
></Form.Control>
{
    formik.errors.concepto && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.concepto}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">fecha</label>
<Form.Control type="text" name="fecha" className="form-control" value={formik.values.fecha}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.fecha && !!formik.errors.fecha}
isValid ={!!formik.touched.fecha && !formik.errors.fecha}
></Form.Control>
{
    formik.errors.fecha && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.fecha}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">fecha_vencimiento</label>
<Form.Control type="text" name="fecha_vencimiento" className="form-control" value={formik.values.fecha_vencimiento}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.fecha_vencimiento && !!formik.errors.fecha_vencimiento}
isValid ={!!formik.touched.fecha_vencimiento && !formik.errors.fecha_vencimiento}
></Form.Control>
{
    formik.errors.fecha_vencimiento && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.fecha_vencimiento}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">num_factura</label>
<Form.Control type="text" name="num_factura" className="form-control" value={formik.values.num_factura}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.num_factura && !!formik.errors.num_factura}
isValid ={!!formik.touched.num_factura && !formik.errors.num_factura}
></Form.Control>
{
    formik.errors.num_factura && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.num_factura}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">cuentacobrar_id</label>
<Form.Control as="select"  name="cuentacobrar_id" className="form-control" value={formik.values.cuentacobrar_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.cuentacobrar_id && !!formik.errors.cuentacobrar_id}
isValid ={!!formik.touched.cuentacobrar_id && !formik.errors.cuentacobrar_id}
>
<option value={0}>Select Cuentas_Por_Cobrar </option> 
{
cuentas_por_cobrarData.list.map((item, i) => {
return <option value={item.id} key={`cuentas_por_cobrar-${i}`}>{item.concepto}</option>
})}
</Form.Control>
{
    formik.errors.cuentacobrar_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.cuentacobrar_id}
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

