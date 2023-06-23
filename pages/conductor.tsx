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
  { field: 'nome', 
    headerName: 'Nome', 
    width: 120,
    editable: true,
  },
  { field: 'numeroHabilitacao', 
    headerName: 'Habilitação', 
    width: 120,
    editable: true,
  },
  {
    field: 'categoriaHabilitacao',
    headerName: 'Categoria',
    width: 120,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['A', 'B', 'C', 'D', 'E'],
  },
  {
    field: 'vencimentoHabilitacao',
    headerName: 'Vencimento',
    width: 200,
    editable: true,
    type: 'dateTime',
    valueGetter: ({ value }) => value && new Date(value),
  },
];

const updatedColumns = ["id","categoriaHabilitacao","vencimentoHabilitacao"];

export default function Conductor() {
  const [tableData, setTableData] = useState([]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Página Condutor</Typography>
      </Grid>
      <Grid item xs={12}>
        <FeaturedCrudGrid 
          initialColumns={columns} 
          updatedColumns={updatedColumns}
          initialRows={tableData} 
          pageSize={5} 
          url='/api/v1/Condutor'
        />
      </Grid>
    </Grid>
  );
};

