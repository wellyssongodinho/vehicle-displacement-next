import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import FeaturedCrudGrid from '../components/FeaturedCrudGrid';
import { fetchData } from '../utils/api';

const options = ['Option 1', 'Option 2'];

export default function Displacement() {
  const [tableData, setTableData] = useState([]);
  const [conductors, setConductors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  const columns: GridColDef[] = [
    { field: 'id', 
      headerName: 'ID', 
      width: 50,
      disableColumnMenu: true,
      editable: false,
    },
    { field: 'kmInicial', 
      headerName: 'KM Inicial', 
      width: 100,
      editable: true,
      type: 'number',
    },
    {
      field: 'kmFinal',
      headerName: 'KM Final.',
      width: 100,
      editable: true,
      type: 'number',
    },
    {
      field: 'inicioDeslocamento',
      headerName: 'Início Desl.',
      width: 180,
      editable: true,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'fimDeslocamento',
      headerName: 'Fim Desl.',
      width: 180,
      editable: true,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
    },
    { field: 'checkList', 
      headerName: 'CheckList', 
      width: 200,
      editable: true,
    },
    { field: 'motivo', 
      headerName: 'Motivo', 
      width: 200,
      editable: true,
    },
    { field: 'observacao', 
      headerName: 'Observação', 
      width: 200,
      editable: true,
    },
    {
      field: 'idCondutor',
      headerName: 'Condutor',
      width: 300,
      editable: true,
      type: 'singleSelect',
      valueOptions: conductors,
      getOptionValue: (value: any) => value.id,
      getOptionLabel: (value: any) => value.nome,
    },
    {
      field: 'idVeiculo',
      headerName: 'Veiculo',
      width: 300,
      editable: true,
      type: 'singleSelect',
      valueOptions: vehicles,
      getOptionValue: (value: any) => value.id,
      getOptionLabel: (value: any) => value.placa,
    },
    {
      field: 'idCliente',
            headerName: 'Cliente',
            width: 300,
            editable: true,
            type:'singleSelect',
            valueOptions: customers,
            getOptionValue: (value: any) => value.id,
            getOptionLabel: (value: any) => value.nome,
    }
  ];
  const updatedColumns = ["id","kmFinal","fimDeslocamento","observacao"];
  
    useEffect(() => {
      const getData = async () => {
        var data = await fetchData('/api/v1/Condutor');
        setConductors(data);
        data = await fetchData('/api/v1/Veiculo');
        setVehicles(data);
        data = await fetchData('/api/v1/Cliente');
        setCustomers(data);
      }    
      
      getData();
    }, []);

    return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Página Deslocamento</Typography>
      </Grid>
      <Grid item xs={12}>
        <FeaturedCrudGrid
          initialColumns={columns} 
          updatedColumns={updatedColumns}
          initialRows={tableData} 
          pageSize={5} 
          url='/api/v1/Deslocamento'
          urlCreate='/IniciarDeslocamento'
          urlUpdate='/EncerrarDeslocamento'
        />
      </Grid>
    </Grid>
  );
}
