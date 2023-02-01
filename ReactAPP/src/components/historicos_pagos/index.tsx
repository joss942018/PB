import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setHistoricos_PagosList, setHistoricos_PagosMessage } from "redux/actions";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { getHistoricos_Pagos } from "services/historicos_pagosService";
import Layout from "template";
import { Constant } from "template/Constant";
import { Historicos_PagosForm } from "./form";
import { Historicos_PagosTable } from "./table";

export const Historicos_Pagos: React.FC = () => {
  const dispatch = useAppDispatch();
  const rData = useSelector((state: RootState) => state.historicos_pagos);
  const [row, setRow] = useState(undefined);
  const [action, setAction] = useState('');
  const getData = (page, pageSize, searchKey) => {
    getHistoricos_Pagos(page, pageSize, searchKey).then((response) => {
      if (response && response.records) {
        dispatch(setHistoricos_PagosList({ pageNo: page, pageSize: pageSize, list: response.records, totalCount: response.total_count, searchKey: searchKey }));
      } else {
        dispatch(setHistoricos_PagosMessage("No Record Found"));
      }
    })
  }

  const handleRowEdit = (rowData) => {
    setRow(rowData);
    dispatch(setHistoricos_PagosMessage(''));
    setAction('edit');
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Historicos_Pagos</h1>
        </div>
        <div className="d-flex flex-column min-vh-100">
          {rData.message ?
            <Alert variant={Constant.defaultAlertVarient} className="alert-dismissible fade">{rData.message}
              <Button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setHistoricos_PagosMessage(''))}>
                <span aria-hidden="true">&times;</span>
              </Button>
            </Alert> : null}
          {action ? <Historicos_PagosForm hideShowForm={setAction} action={action} row={row} getData={getData} /> :
            <Historicos_PagosTable handleRowEdit={handleRowEdit} hideShowForm={setAction} getData={getData} />}
        </div>

      </div>
    </Layout >
  );
};

