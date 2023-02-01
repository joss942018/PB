import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setAdministradoresMessage } from "redux/actions";
import { resetUsuariosToInit, setUsuariosList } from "redux/actions";

import { getUsuarios } from "services/usuariosService";

import { useAppDispatch } from "redux/store";
import { addAdministradores, updateAdministradores } from "services/administradoresService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const AdministradoresForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,nombre:0,apellido:0,usuario_id:0,estado:''};
    const initialValue = action === 'edit' ? row : iValue;
    const usuariosData = useSelector((state: RootState) => state.usuarios);

    useEffect(() => {
if (usuariosData && usuariosData.list && usuariosData.list.length === 0) {
            dispatch(resetUsuariosToInit());
            getUsuarios(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setUsuariosList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setAdministradoresMessage("No Record Found For Usuarios"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateAdministradores(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setAdministradoresMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setAdministradoresMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addAdministradores(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setAdministradoresMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setAdministradoresMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           nombre: yup.number().required('nombre es requerido'),
apellido: yup.number().required('apellido es requerido'),
estado: yup.boolean().required('estado es requerido'),
usuario_id: yup.string().required('usuario_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Administradores
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Administradores</span>
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
<label className="form -control-label">apellido</label>
<Form.Control type="text" name="apellido" className="form-control" value={formik.values.apellido}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.apellido && !!formik.errors.apellido}
isValid ={!!formik.touched.apellido && !formik.errors.apellido}
></Form.Control>
{
    formik.errors.apellido && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.apellido}
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
<label className="form -control-label">usuario_id</label>
<Form.Control as="select"  name="usuario_id" className="form-control" value={formik.values.usuario_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.usuario_id && !!formik.errors.usuario_id}
isValid ={!!formik.touched.usuario_id && !formik.errors.usuario_id}
>
<option value={0}>Select Usuarios </option> 
{
usuariosData.list.map((item, i) => {
return <option value={item.id} key={`usuarios-${i}`}>{item.email}</option>
})}
</Form.Control>
{
    formik.errors.usuario_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.usuario_id}
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

