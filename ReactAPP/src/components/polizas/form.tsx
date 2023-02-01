import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setPolizasMessage } from "redux/actions";
import { resetPaquetesToInit, setPaquetesList } from "redux/actions";

import { getPaquetes } from "services/paquetesService";

import { useAppDispatch } from "redux/store";
import { addPolizas, updatePolizas } from "services/polizasService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const PolizasForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,valor:0,fecha_vigencia:'',paquete_id:0,auto_id:0};
    const initialValue = action === 'edit' ? row : iValue;
    const paquetesData = useSelector((state: RootState) => state.paquetes);

    useEffect(() => {
        if (paquetesData && paquetesData.list && paquetesData.list.length === 0) {
                    dispatch(resetPaquetesToInit());
                    getPaquetes(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                        if (response && response.records) {
                        dispatch(setPaquetesList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                        } else {
                        dispatch(setPolizasMessage("No Record Found For Paquetes"));
                        }
                    })
                }
        })
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updatePolizas(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setPolizasMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setPolizasMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addPolizas(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setPolizasMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setPolizasMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           valor: yup.number().required('valor es requerido'),
fecha_vigencia: yup.date().required('fecha_vigencia es requerido'),
auto_id: yup.number().required('auto_id es requerido'),
paquete_id: yup.string().required('paquete_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Polizas
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Polizas</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
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
<label className="form -control-label">fecha_vigencia</label>
<Form.Control type="text" name="fecha_vigencia" className="form-control" value={formik.values.fecha_vigencia}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.fecha_vigencia && !!formik.errors.fecha_vigencia}
isValid ={!!formik.touched.fecha_vigencia && !formik.errors.fecha_vigencia}
></Form.Control>
{
    formik.errors.fecha_vigencia && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.fecha_vigencia}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">auto_id</label>
<Form.Control type="text" name="auto_id" className="form-control" value={formik.values.auto_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.auto_id && !!formik.errors.auto_id}
isValid ={!!formik.touched.auto_id && !formik.errors.auto_id}
></Form.Control>
{
    formik.errors.auto_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.auto_id}
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

