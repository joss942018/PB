import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setPaquetesMessage } from "redux/actions";
import { resetAseguradorasToInit, setAseguradorasList } from "redux/actions";

import { getAseguradoras } from "services/aseguradorasService";

import { useAppDispatch } from "redux/store";
import { addPaquetes, updatePaquetes } from "services/paquetesService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const PaquetesForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,nombre:'',descripcion:'',aseguradora_id:0,estado:''};
    const initialValue = action === 'edit' ? row : iValue;
    const aseguradorasData = useSelector((state: RootState) => state.aseguradoras);

    useEffect(() => {
if (aseguradorasData && aseguradorasData.list && aseguradorasData.list.length === 0) {
            dispatch(resetAseguradorasToInit());
            getAseguradoras(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setAseguradorasList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setPaquetesMessage("No Record Found For Aseguradoras"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updatePaquetes(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setPaquetesMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setPaquetesMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addPaquetes(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setPaquetesMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setPaquetesMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           nombre: yup.string().required('nombre es requerido'),
descripcion: yup.string().required('descripcion es requerido'),
estado: yup.boolean().required('estado es requerido'),
aseguradora_id: yup.number().required('aseguradora_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Paquetes
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Paquetes</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group>
<label className="form -control-label">nombre</label>
<Form.Control type="text" name="nombre" className="form-control" value={formik.values.nombre}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.nombre && !!formik.errors.nombre}
isValid ={!!formik.touched.nombre && !formik.errors.nombre}
></Form.Control>
{
    formik.errors.nombre && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.nombre}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">descripcion</label>
<Form.Control type="text" name="descripcion" className="form-control" value={formik.values.descripcion}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.descripcion && !!formik.errors.descripcion}
isValid ={!!formik.touched.descripcion && !formik.errors.descripcion}
></Form.Control>
{
    formik.errors.descripcion && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.descripcion}
    </Form.Control.Feedback>
)}
</Form.Group>
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
<label className="form -control-label">aseguradora_id</label>
<Form.Control as="select"  name="aseguradora_id" className="form-control" value={formik.values.aseguradora_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.aseguradora_id && !!formik.errors.aseguradora_id}
isValid ={!!formik.touched.aseguradora_id && !formik.errors.aseguradora_id}
>
<option value={0}>Select Aseguradoras </option> 
{
aseguradorasData.list.map((item, i) => {
return <option value={item.id} key={`aseguradoras-${i}`}>{item.nombre}</option>
})}
</Form.Control>
{
    formik.errors.aseguradora_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.aseguradora_id}
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

