import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setMarcasMessage } from "redux/actions";


import { useAppDispatch } from "redux/store";
import { addMarcas, updateMarcas } from "services/marcasService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const MarcasForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,nombre:'',estado:''};
    const initialValue = action === 'edit' ? row : iValue;
    
    
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateMarcas(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setMarcasMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setMarcasMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addMarcas(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setMarcasMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setMarcasMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           nombre: yup.string().required('nombre es requerido'),
estado: yup.boolean().required('estado es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Marcas
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Marcas</span>
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
                        <Button type="submit" className="float-right" variant="primary">Save</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

