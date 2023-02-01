import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setEstados_CivilList, setEstados_CivilMessage } from "redux/actions";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { getEstados_Civil } from "services/estados_civilService";
import Layout from "template";
import { Constant } from "template/Constant";
import { Estados_CivilForm } from "./form";
import { Estados_CivilTable } from "./table";

export const Estados_Civil: React.FC = () => {
  const dispatch = useAppDispatch();
  const rData = useSelector((state: RootState) => state.estados_civil);
  const [row, setRow] = useState(undefined);
  const [action, setAction] = useState('');
  const getData = (page, pageSize, searchKey) => {
    getEstados_Civil(page, pageSize, searchKey).then((response) => {
      if (response && response.records) {
        dispatch(setEstados_CivilList({ pageNo: page, pageSize: pageSize, list: response.records, totalCount: response.total_count, searchKey: searchKey }));
      } else {
        dispatch(setEstados_CivilMessage("No Record Found"));
      }
    })
  }

  const handleRowEdit = (rowData) => {
    setRow(rowData);
    dispatch(setEstados_CivilMessage(''));
    setAction('edit');
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Estados_Civil</h1>
        </div>
        <div className="d-flex flex-column min-vh-100">
          {rData.message ?
            <Alert variant={Constant.defaultAlertVarient} className="alert-dismissible fade">{rData.message}
              <Button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setEstados_CivilMessage(''))}>
                <span aria-hidden="true">&times;</span>
              </Button>
            </Alert> : null}
          {action ? <Estados_CivilForm hideShowForm={setAction} action={action} row={row} getData={getData} /> :
            <Estados_CivilTable handleRowEdit={handleRowEdit} hideShowForm={setAction} getData={getData} />}
        </div>

      </div>
    </Layout >
  );
};

