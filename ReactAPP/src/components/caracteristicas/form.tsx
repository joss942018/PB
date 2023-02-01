import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setCaracteristicasMessage } from "redux/actions";
import { resetTipos_CaracteristicasToInit, setTipos_CaracteristicasList } from "redux/actions";

import { getTipos_Caracteristicas } from "services/tipos_caracteristicasService";

import { useAppDispatch } from "redux/store";
import { addCaracteristicas, updateCaracteristicas } from "services/caracteristicasService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const CaracteristicasForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,nombre:'',tipo_id:0,estado:''};
    const initialValue = action === 'edit' ? row : iValue;
    const tipos_caracteristicasData = useSelector((state: RootState) => state.tipos_caracteristicas);

    useEffect(() => {
if (tipos_caracteristicasData && tipos_caracteristicasData.list && tipos_caracteristicasData.list.length === 0) {
            dispatch(resetTipos_CaracteristicasToInit());
            getTipos_Caracteristicas(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setTipos_CaracteristicasList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setCaracteristicasMessage("No Record Found For Tipos_Caracteristicas"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updateCaracteristicas(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setCaracteristicasMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setCaracteristicasMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addCaracteristicas(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setCaracteristicasMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setCaracteristicasMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           nombre: yup.string().required('nombre es requerido'),
estado: yup.boolean().required('estado es requerido'),
tipo_id: yup.string().required('tipo_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Caracteristicas
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Caracteristicas</span>
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
<label className="form -control-label">tipo_id</label>
<Form.Control as="select"  name="tipo_id" className="form-control" value={formik.values.tipo_id}
onChange={formik.handleChange}
onBlur ={formik.handleBlur}
isInvalid ={!!formik.touched.tipo_id && !!formik.errors.tipo_id}
isValid ={!!formik.touched.tipo_id && !formik.errors.tipo_id}
>
<option value={0}>Select Tipos_Caracteristicas </option> 
{
tipos_caracteristicasData.list.map((item, i) => {
return <option value={item.id} key={`tipos_caracteristicas-${i}`}>{item.nombre}</option>
})}
</Form.Control>
{
    formik.errors.tipo_id && (
    <Form.Control.Feedback type="invalid">
        {formik.errors.tipo_id}
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

