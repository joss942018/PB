import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setUsuariosMessage } from "redux/actions";


import { useAppDispatch } from "redux/store";
import { addUsuarios, updateUsuarios } from "services/usuariosService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const UsuariosForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,email:'',contrasena:'',rol:'',es_activo:''};
    const initialValue = action === 'edit' ? row : iValue;
    
    
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateUsuarios(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setUsuariosMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setUsuariosMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addUsuarios(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setUsuariosMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setUsuariosMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           email: yup.string().required('email es requerido'),
contrasena: yup.string().required('contrasena es requerido'),
rol: yup.string().required('rol es requerido'),
es_activo: yup.boolean().required('es_activo es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Usuarios
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Usuarios</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group>
<label className="form -control-label">email</label>
<Form.Control type="text" name="email" className="form-control" value={formik.values.email}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.email && !!formik.errors.email}
isValid ={!!formik.touched.email && !formik.errors.email}
></Form.Control>
{
    formik.errors.email && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.email}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">contrasena</label>
<Form.Control type="text" name="contrasena" className="form-control" value={formik.values.contrasena}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.contrasena && !!formik.errors.contrasena}
isValid ={!!formik.touched.contrasena && !formik.errors.contrasena}
></Form.Control>
{
    formik.errors.contrasena && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.contrasena}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">rol</label>
<Form.Control type="text" name="rol" className="form-control" value={formik.values.rol}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.rol && !!formik.errors.rol}
isValid ={!!formik.touched.rol && !formik.errors.rol}
></Form.Control>
{
    formik.errors.rol && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.rol}
    </Form.Control.Feedback>
)}
</Form.Group>
<Form.Group>
<label className="form -control-label">es_activo</label>
<Form.Control type="text" name="es_activo" className="form-control" value={formik.values.es_activo}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.es_activo && !!formik.errors.es_activo}
isValid ={!!formik.touched.es_activo && !formik.errors.es_activo}
></Form.Control>
{
    formik.errors.es_activo && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.es_activo}
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

