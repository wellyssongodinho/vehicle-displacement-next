import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  DataGrid, GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer
} from '@mui/x-data-grid';
import {
  randomId
} from '@mui/x-data-grid-generator';
import * as React from 'react';
import { createData, deleteData, fetchData, updateData } from '../utils/api';
import ConfirmDialog from './ConfirmDialog';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

// const initialRows: GridRowsProp = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
// ];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  fieldFocus?: string;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, fieldFocus } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, {id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: fieldFocus },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Incluir
      </Button>
    </GridToolbarContainer>
  );
}

interface FeaturedCrudGridProps {
  url: string;
  urlCreate?: string;
  urlDelete?: string;
  urlUpdate?: string;
  initialColumns: GridColDef[];
  updatedColumns: any;
  initialRows: GridRowsProp;
  pageSize?: number;
}

export default function FeaturedCrudGrid(props: FeaturedCrudGridProps) {
  const {initialColumns, initialRows, pageSize, updatedColumns, url, urlCreate, urlDelete, urlUpdate} = props;
  const fieldFocus = initialColumns[1].field;
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState<GridRowId>(0);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async() => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async() => {
    await deleteData(`${url}/${id}`, {id});
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async(newRow: GridRowModel) => {
    var newID = newRow.id;
    var rowSaveble =  { ...newRow}
    if (typeof(newRow.id) === 'string'){
      Object.keys(rowSaveble).forEach(function(key){
        if (!(columns.find((column) => column.field===key)) || key==='id')
          delete rowSaveble[key];
      });
      // console.log('rowSaveble',rowSaveble);
      newID = await createData(url+(urlCreate ? urlCreate : '') , rowSaveble);
      // console.log('newID',newID);
    }else{
        columns.forEach(columns => {
          if (updatedColumns.indexOf(columns.field) < 0)
          {
            // Object.keys(rowSaveble).forEach(function(key){
            //   if (rowSaveble[key] === value) {
            //     delete rowSaveble[key];
            //   }
            // });
            delete rowSaveble[columns.field];
          }
        });
        await updateData(`${url}/${newRow.id}`+(urlUpdate ? urlUpdate : ''), rowSaveble);
    }
    console.log('row',JSON.stringify(rows));
    const updatedRow = { ...newRow, isNew: false, id: newID };
    console.log('updatedRow',JSON.stringify(updatedRow));
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            onClick={() => {
              setCurrent(id);
              setOpen(true);
            }}
            color="inherit"
          />,
          <ConfirmDialog
            title="Excluir?"
            open={open}
            setOpen={setOpen}
            onConfirm={handleDeleteClick(current)}
          >
            Você tem certeza que quer excluir esse registro?
          </ConfirmDialog>
        ];
      },
    },
  ];

  React.useEffect(() => {
    const getData = async () => {
      const data = await fetchData(url);
      setRows(data);
    }    
    
    getData();
  }, []);


  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, fieldFocus },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
    </Box>
  );
}