import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import Layout from "template";
import { PolizasTable } from "./table";

export const Polizas: React.FC = () => {
  const [autos, setAutos] = useState([])

  const token = localStorage.getItem('token');
  const userProfile = useSelector((state: RootState) => state.template.userProfile);


  const getData = async () => {
    const autosData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/polizasByUser`, {
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!autosData.ok) {
      const polizas = await autosData.json()
      return alert(JSON.stringify(polizas, null, 2))
    }
    const autos = await autosData.json();   
  
    setAutos(Object.values(autos));
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Polizas</h1>
        </div>
        <div className="d-flex flex-column min-vh-100">
          <PolizasTable autos={autos} />
        </div>
      </div>
    </Layout>
  );
};

