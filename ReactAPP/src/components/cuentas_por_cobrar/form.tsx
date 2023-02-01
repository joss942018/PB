import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setCuentas_Por_CobrarMessage } from "redux/actions";
import { resetClientesToInit, setClientesList } from "redux/actions";
import { resetPaquetesToInit, setPaquetesList } from "redux/actions";

import { getClientes } from "services/clientesService";
import { getPaquetes } from "services/paquetesService";

import { useAppDispatch } from "redux/store";
import { addCuentas_Por_Cobrar, updateCuentas_Por_Cobrar } from "services/cuentas_por_cobrarService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const Cuentas_Por_CobrarForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,concepto:'',saldo:0,cliente_id:0,credito:0,debito:0,comprobante_id:0,fecha_vencimiento:'',fecha_emision:'',status:0,valor_comprobante:0,comprobante_img:'',fecha_comprobante:'',num_factura:'',paquete_id:0};
    const initialValue = action === 'edit' ? row : iValue;
    const clientesData = useSelector((state: RootState) => state.clientes);
const paquetesData = useSelector((state: RootState) => state.paquetes);

    useEffect(() => {
if (clientesData && clientesData.list && clientesData.list.length === 0) {
            dispatch(resetClientesToInit());
            getClientes(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setClientesList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setCuentas_Por_CobrarMessage("No Record Found For Clientes"));
                }
              })
        }
if (paquetesData && paquetesData.list && paquetesData.list.length === 0) {
            dispatch(resetPaquetesToInit());
            getPaquetes(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setPaquetesList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setCuentas_Por_CobrarMessage("No Record Found For Paquetes"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateCuentas_Por_Cobrar(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setCuentas_Por_CobrarMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setCuentas_Por_CobrarMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addCuentas_Por_Cobrar(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setCuentas_Por_CobrarMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setCuentas_Por_CobrarMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           concepto: yup.string().required('concepto es requerido'),
saldo: yup.number().required('saldo es requerido'),
credito: yup.number().required('credito es requerido'),
debito: yup.number().required('debito es requerido'),
comprobante_id: yup.number().required('comprobante_id es requerido'),
fecha_vencimiento: yup.date().nullable(),
fecha_emision: yup.date().nullable(),
status: yup.number().nullable(),
valor_comprobante: yup.number().nullable(),
comprobante_img: yup.string().nullable(),
fecha_comprobante: yup.date().nullable(),
num_factura: yup.string().nullable(),
cliente_id: yup.string().required('cliente_id es requerido'),
paquete_id: yup.string().required('paquete_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Cuentas_Por_Cobrar
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Cuentas_Por_Cobrar</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
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
<label className="form -control-label">saldo</label>
<Form.Control type="text" name="saldo" className="form-control" value={formik.values.saldo}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.saldo && !!formik.errors.saldo}
isValid ={!!formik.touched.saldo && !formik.errors.saldo}
></Form.Control>
{
    formik.errors.saldo && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.saldo}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">credito</label>
<Form.Control type="text" name="credito" className="form-control" value={formik.values.credito}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.credito && !!formik.errors.credito}
isValid ={!!formik.touched.credito && !formik.errors.credito}
></Form.Control>
{
    formik.errors.credito && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.credito}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">debito</label>
<Form.Control type="text" name="debito" className="form-control" value={formik.values.debito}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.debito && !!formik.errors.debito}
isValid ={!!formik.touched.debito && !formik.errors.debito}
></Form.Control>
{
    formik.errors.debito && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.debito}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">comprobante_id</label>
<Form.Control type="text" name="comprobante_id" className="form-control" value={formik.values.comprobante_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.comprobante_id && !!formik.errors.comprobante_id}
isValid ={!!formik.touched.comprobante_id && !formik.errors.comprobante_id}
></Form.Control>
{
    formik.errors.comprobante_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.comprobante_id}
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
<label className="form -control-label">fecha_emision</label>
<Form.Control type="text" name="fecha_emision" className="form-control" value={formik.values.fecha_emision}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.fecha_emision && !!formik.errors.fecha_emision}
isValid ={!!formik.touched.fecha_emision && !formik.errors.fecha_emision}
></Form.Control>
{
    formik.errors.fecha_emision && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.fecha_emision}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">status</label>
<Form.Control type="text" name="status" className="form-control" value={formik.values.status}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.status && !!formik.errors.status}
isValid ={!!formik.touched.status && !formik.errors.status}
></Form.Control>
{
    formik.errors.status && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.status}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">valor_comprobante</label>
<Form.Control type="text" name="valor_comprobante" className="form-control" value={formik.values.valor_comprobante}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.valor_comprobante && !!formik.errors.valor_comprobante}
isValid ={!!formik.touched.valor_comprobante && !formik.errors.valor_comprobante}
></Form.Control>
{
    formik.errors.valor_comprobante && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.valor_comprobante}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">comprobante_img</label>
<Form.Control type="text" name="comprobante_img" className="form-control" value={formik.values.comprobante_img}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.comprobante_img && !!formik.errors.comprobante_img}
isValid ={!!formik.touched.comprobante_img && !formik.errors.comprobante_img}
></Form.Control>
{
    formik.errors.comprobante_img && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.comprobante_img}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">fecha_comprobante</label>
<Form.Control type="text" name="fecha_comprobante" className="form-control" value={formik.values.fecha_comprobante}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.fecha_comprobante && !!formik.errors.fecha_comprobante}
isValid ={!!formik.touched.fecha_comprobante && !formik.errors.fecha_comprobante}
></Form.Control>
{
    formik.errors.fecha_comprobante && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.fecha_comprobante}
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
<label className="form -control-label">paquete_id</label>
<Form.Control as="select"  name="paquete_id" className="form-control" value={formik.values.paquete_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.paquete_id && !!formik.errors.paquete_id}
isValid ={!!formik.touched.paquete_id && !formik.errors.paquete_id}
>
<option value={0}>Select Paquetes </option> 
{
paquetesData.list.map((item, i) => {
return <option value={item.id} key={`paquetes-${i}`}>{item.nombre}</option>
})}
</Form.Control>
{
    formik.errors.paquete_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.paquete_id}
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

