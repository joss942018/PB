import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setAñoMessage } from "redux/actions";


import { useAppDispatch } from "redux/store";
import { addAño, updateAño } from "services/añoService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const AñoForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,descripcion:'',estado:''};
    const initialValue = action === 'edit' ? row : iValue;
    
    
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateAño(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setAñoMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setAñoMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addAño(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setAñoMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setAñoMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           descripcion: yup.string().required('descripcion es requerido'),
estado: yup.string().required('estado es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Año
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Año</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
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
                        <Button type="submit" className="float-right" variant="primary">Save</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

