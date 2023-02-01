import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setTipos_CaracteristicasList, setTipos_CaracteristicasMessage } from "redux/actions";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { getTipos_Caracteristicas } from "services/tipos_caracteristicasService";
import Layout from "template";
import { Constant } from "template/Constant";
import { Tipos_CaracteristicasForm } from "./form";
import { Tipos_CaracteristicasTable } from "./table";

export const Tipos_Caracteristicas: React.FC = () => {
  const dispatch = useAppDispatch();
  const rData = useSelector((state: RootState) => state.tipos_caracteristicas);
  const [row, setRow] = useState(undefined);
  const [action, setAction] = useState('');
  const getData = (page, pageSize, searchKey) => {
    getTipos_Caracteristicas(page, pageSize, searchKey).then((response) => {
      if (response && response.records) {
        dispatch(setTipos_CaracteristicasList({ pageNo: page, pageSize: pageSize, list: response.records, totalCount: response.total_count, searchKey: searchKey }));
      } else {
        dispatch(setTipos_CaracteristicasMessage("No Record Found"));
      }
    })
  }

  const handleRowEdit = (rowData) => {
    setRow(rowData);
    dispatch(setTipos_CaracteristicasMessage(''));
    setAction('edit');
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Tipos_Caracteristicas</h1>
        </div>
        <div className="d-flex flex-column min-vh-100">
          {rData.message ?
            <Alert variant={Constant.defaultAlertVarient} className="alert-dismissible fade">{rData.message}
              <Button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setTipos_CaracteristicasMessage(''))}>
                <span aria-hidden="true">&times;</span>
              </Button>
            </Alert> : null}
          {action ? <Tipos_CaracteristicasForm hideShowForm={setAction} action={action} row={row} getData={getData} /> :
            <Tipos_CaracteristicasTable handleRowEdit={handleRowEdit} hideShowForm={setAction} getData={getData} />}
        </div>

      </div>
    </Layout >
  );
};

