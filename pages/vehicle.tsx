import { Grid, Typography } from '@mui/material';
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
  { field: 'placa', 
    headerName: 'Placa', 
    width: 100,
    editable: true,
  },
  { field: 'marcaModelo', 
    headerName: 'Marca/Modelo', 
    width: 200,
    editable: true,
  },
  { field: 'anoFabricacao', 
    headerName: 'Ano Fabricação', 
    width: 100,
    editable: true,
    type: 'number',
  },
  {
    field: 'kmAtual',
    headerName: 'KM Atual',
    width: 100,
    editable: true,
    type: 'number',
  },
];

const updatedColumns = ["id","marcaModelo","anoFabricacao","kmAtual"];

export default function Vehicle () {
  const [tableData, setTableData] = useState([]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Página Veículo</Typography>
      </Grid>
      <Grid item xs={12}>
        <FeaturedCrudGrid 
          initialColumns={columns} 
          updatedColumns={updatedColumns}
          initialRows={tableData} 
          pageSize={5} 
          url='/api/v1/Veiculo'
        />
      </Grid>
    </Grid>
  );
};