import React, { useState, useRef } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setAutosList, setAutosMessage } from "redux/actions";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { getAutos } from "services/autosService";
import Layout from "template";
import { Constant } from "template/Constant";
import { AutosForm } from "./form";
import { AutosTable } from "./table";
import { useNavigate, useLocation } from "react-router-dom";

export const Autos: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  let clientId = 0;
  if(location.state != null){
    clientId  = (location.state as any).clientId;
  }else{
    clientId = 0;
  }

  
  const rData = useSelector((state: RootState) => state.autos);
  const [row, setRow] = useState(undefined);
  const [action, setAction] = useState('');
  const getData = (page, pageSize, searchKey) => {
    getAutos(page, pageSize, searchKey, clientId).then((response) => {
      if (response && response.records) {
        debugger;
        dispatch(setAutosList({ pageNo: page, pageSize: pageSize, list: response.records, totalCount: response.total_count, searchKey: searchKey }));
      } else {
        dispatch(setAutosMessage("No Record Found"));
      }
    })
  }

  const handleRowEdit = (rowData) => {
    setRow(rowData);
    dispatch(setAutosMessage(''));
    setAction('edit');
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Autos</h1>
        </div>
        <div className="d-flex flex-column min-vh-100">
          {rData.message ?
            <Alert variant={Constant.defaultAlertVarient} className="alert-dismissible fade">{rData.message}
              <Button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(setAutosMessage(''))}>
                <span aria-hidden="true">&times;</span>
              </Button>
            </Alert> : null}
          {action ? <AutosForm hideShowForm={setAction} action={action} row={row} getData={getData} /> :
            <AutosTable handleRowEdit={handleRowEdit} hideShowForm={setAction} getData={getData} />}
        </div>

      </div>
    </Layout >
  );
};

