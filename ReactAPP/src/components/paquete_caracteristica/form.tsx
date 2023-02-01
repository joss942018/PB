import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { setPaquete_CaracteristicaMessage } from "redux/actions";
import { resetPaquetesToInit, setPaquetesList } from "redux/actions";

import { getPaquetes } from "services/paquetesService";

import { useAppDispatch } from "redux/store";
import { addPaquete_Caracteristica, updatePaquete_Caracteristica } from "services/paquete_caracteristicaService";
import { Constant } from "template/Constant";
import * as yup from 'yup';
type Props = {
    row?: any,
    hideShowForm: (actionName) => void;
    getData: (page, pageSize, searchKey) => void;
    action?: string
};
export const Paquete_CaracteristicaForm: React.FC<Props> = ({ row, hideShowForm, getData, action }) => {
    const dispatch = useAppDispatch();
    const iValue={id:0,paquete_id:0,caracteristica_id:0};
    const initialValue = action === 'edit' ? row : iValue;
    const paquetesData = useSelector((state: RootState) => state.paquetes);

    useEffect(() => {
if (paquetesData && paquetesData.list && paquetesData.list.length === 0) {
            dispatch(resetPaquetesToInit());
            getPaquetes(Constant.defaultPageNumber, Constant.defaultDropdownPageSize, '').then((response) => {
                if (response && response.records) {
                  dispatch(setPaquetesList({ pageNo: Constant.defaultPageNumber, pageSize: Constant.defaultDropdownPageSize, list: response.records, totalCount: response.total_count, searchKey: '' }));
                } else {
                  dispatch(setPaquete_CaracteristicaMessage("No Record Found For Paquetes"));
                }
              })
        }
})
    const formik = useFormik({
        initialValues: initialValue,
        onSubmit: async (values) => {
            if (action === 'edit') {
                const response = await updatePaquete_Caracteristica(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setPaquete_CaracteristicaMessage("Updated Successfully"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setPaquete_CaracteristicaMessage("Some error occured!"));
                }
            } else if (action === 'add') {
                const response = await addPaquete_Caracteristica(values);
                if (response && response.data && response.data.code===1) {
                    dispatch(setPaquete_CaracteristicaMessage("Añadido!"));
                    getData(Constant.defaultPageNumber, Constant.defaultPageSize, '');
                    hideShowForm('');
                } else {
                    dispatch(setPaquete_CaracteristicaMessage("Some error occured!"));
                }
            }
        },
        validationSchema: yup.object({
           paquete_id: yup.string().required('paquete_id es requerido'),

        }),
    });
    return (
        <Card className="shadow mb-4">
            <Card.Header className="py-3">
                <h6 className="m-0 font-weight-bold text-primary text-capitalize">{action} Paquete_Caracteristica
                    <Button className="btn-icon-split float-right" onClick={() => hideShowForm(false)}>
                        <span className="icon text-white-50">
                            <i className="fas fa-list"></i>
                        </span>
                        <span className="text">View Paquete_Caracteristica</span>
                    </Button>
                </h6>

            </Card.Header>
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
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

