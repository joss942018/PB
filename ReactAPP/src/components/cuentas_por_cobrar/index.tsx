import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCuentas_Por_CobrarList, setCuentas_Por_CobrarMessage } from "redux/actions";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { getCuentas_Por_Cobrar } from "services/cuentas_por_cobrarService";
import Layout from "template";
import { Constant } from "template/Constant";
import { Cuentas_Por_CobrarForm } from "./form";
import { Cuentas_Por_CobrarTable } from "./table";

export const Cuentas_Por_Cobrar: React.FC = () => {
  const dispatch = useAppDispatch();
  const rData = useSelector((state: RootState) => state.cuentas_por_cobrar);
  const [row, setRow] = useState(undefined);
  const [action, setAction] = useState('');
  const getData = (page, pageSize, searchKey) => {
    getCuentas_Por_Cobrar(page, pageSize, searchKey).then((response) => {
      if (response && response.records) {
        dispatch(setCuentas_Por_CobrarList({ pageNo: page, pageSize: pageSize, list: response.records, totalCount: response.total_count, searchKey: searchKey }));
      } else {
        dispatch(setCuentas_Por_CobrarMessage("No Record Found"));
      }
    })
  }

  const handleRowEdit = (rowData) => {
    setRow(rowData);
    dispatch(setCuentas_Por_CobrarMessage(''));
    setAction('edit');
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Cuentas_Por_Cobrar</h1>
        </div>
        <div className="d-flex flex-column min-vh-100">
          {rData.message ?
            <Alert variant={Constant.defaultAlertVarient} className="alert-dismissible fade">{rData.message}
              <Button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setCuentas_Por_CobrarMessage(''))}>
                <span aria-hidden="true">&times;</span>
              </Button>
            </Alert> : null}
          {action ? <Cuentas_Por_CobrarForm hideShowForm={setAction} action={action} row={row} getData={getData} /> :
            <Cuentas_Por_CobrarTable handleRowEdit={handleRowEdit} hideShowForm={setAction} getData={getData} />}
        </div>

      </div>
    </Layout >
  );
};

