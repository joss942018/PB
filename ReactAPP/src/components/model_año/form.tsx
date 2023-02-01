import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setModel_AñoMessage } from "redux/actions";
import { resetAñoToInit, setAñoList } from "redux/actions";
import { resetModelosToInit, setModelosList } from "redux/actions";

import { getAño } from "services/añoService";
import { getModelos } from "services/modelosService";

import { useAppDispatch } from "redux/store";
import { addModel_Año, updateModel_Año } from "services/model_añoService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const Model_AñoForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,año_id:0,modelo_id:0,estado:''};
    const initialValue = action === 'edit' ? row : iValue;
    const añoData = useSelector((state: RootState) => state.año);
const modelosData = useSelector((state: RootState) => state.modelos);

    useEffect(() => {
if (añoData && añoData.list && añoData.list.length === 0) {
            dispatch(resetAñoToInit());
            getAño(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setAñoList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setModel_AñoMessage("No Record Found For Año"));
                }
              })
        }
if (modelosData && modelosData.list && modelosData.list.length === 0) {
            dispatch(resetModelosToInit());
            getModelos(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setModelosList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setModel_AñoMessage("No Record Found For Modelos"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateModel_Año(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setModel_AñoMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setModel_AñoMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addModel_Año(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setModel_AñoMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setModel_AñoMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           estado: yup.boolean().required('estado es requerido'),
año_id: yup.string().required('año_id es requerido'),
modelo_id: yup.string().required('modelo_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Model_Año
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Model_Año</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group>
<label className="form -control-label">estado</label>
<Form.Control type="text" name="estado" className="form-control" value={formik.values.estado}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.estado && !!formik.errors.estado}
isValid ={!!formik.touched.estado && !formik.errors.estado}
></Form.Control>
{
    formik.errors.estado && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.estado}
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
<label className="form -control-label">modelo_id</label>
<Form.Control as="select"  name="modelo_id" className="form-control" value={formik.values.modelo_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.modelo_id && !!formik.errors.modelo_id}
isValid ={!!formik.touched.modelo_id && !formik.errors.modelo_id}
>
<option value={0}>Select Modelos </option> 
{
modelosData.list.map((item, i) => {
return <option value={item.id} key={`modelos-${i}`}>{item.nombre}</option>
})}
</Form.Control>
{
    formik.errors.modelo_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.modelo_id}
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

