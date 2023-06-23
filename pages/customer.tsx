import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import FeaturedCrudGrid from '../components/FeaturedCrudGrid';

const columns: GridColDef[] = [
  { field: 'id', 
    headerName: 'ID', 
    width: 50,
    disableColumnMenu: true,
    editable: false,
  },
  { field: 'numeroDocumento', 
    headerName: 'Documento', 
    width: 120,
    editable: true,
  },
  {
    field: 'tipoDocumento',
    headerName: 'Tipo',
    width: 120,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['CPF', 'RG', 'CNH'],
  },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 200,
    editable: true,
  },
  {
    field: 'logradouro',
    headerName: 'Logradrouro',
    width: 200,
    editable: true,
  },
  {
    field: 'numero',
    headerName: 'Número',
    width: 70,
    editable: true,
  },
  {
    field: 'bairro',
    headerName: 'Bairro',
    width: 200,
    editable: true,
  },
  {
    field: 'cidade',
    headerName: 'Cidade',
    width: 200,
    editable: true,
  },
  {
    field: 'uf',
    headerName: 'UF',
    width: 30,
    editable: true,
  },
];

const updatedColumns = ["id","nome","logradouro","numero","bairro","cidade","uf"];

export default function Customer () {
  const [tableData, setTableData] = useState([]);

  // useEffect(() => {
  //   // fetchData('https://api-deslocamento.herokuapp.com/api/v1/cliente').then((data) => setTableData(data));
  //   const getData = async () => {
  //     const data = await fetchData('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
  //     console.log('data:', JSON.stringify(data));
  //     setTableData(data);
  //   }    
    
  //   getData();
  // }, []);

  // const getRows = async () => {
  //   console.log('getRows');
  //   const data = await fetchData('/api/v1/cliente');
  //   return (data);
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Página Cliente</Typography>
      </Grid>
      <Grid item xs={12}>
        <FeaturedCrudGrid 
          initialColumns={columns} 
          updatedColumns={updatedColumns}
          initialRows={tableData} 
          pageSize={5} 
          url='/api/v1/Cliente'
        />
      </Grid>
    </Grid>
  );
}