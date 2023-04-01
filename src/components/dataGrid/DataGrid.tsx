import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { useTranslation } from "react-i18next";
import { actions } from '../../features/goods';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';

const columns: GridColDef[] = [
  { field: 'id', headerName: '', width: 20 },
  {
    field: 'title',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'details',
    width: 700,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'price',
    type: 'number',
    width: 80,
    editable: false,
  },
  {
    field: 'images',
    headerName: 'picture',
    type: 'array',
    width: 200,
    editable: true,
  },
  {
    field: 'rating',
    headerName: 'Raiting',
    type: 'string',
    width: 60,
    editable: false,
  },
  {
    field: 'stock',
    headerName: 'stock',
    type: 'string',
    width: 60,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'category',
    type: 'string',
    width: 110,
    editable: false,
  }
];

export const DataGridDemo = () => {
  const [choosenItems, SetChoosenItems] = React.useState([-1]);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useAppSelector(state => state.goods || []);

  const handleEvent = (e: any, n: any) => {
    if(choosenItems.includes(e.id)) {
      SetChoosenItems(prev => prev.filter((a) => a !== e.id))
    } else {
      SetChoosenItems([-1, e.id])
    }
  };

  const handleDelete = () => {
    dispatch(actions.setGoods(data.filter(a => ![...choosenItems].includes(Object(a).id))));

    fetch(`https://dummyjson.com/products/${+(choosenItems.filter(a => a !== -1).join(''))}`, {
      method: 'DELETE',
    })
      .then(res => res.json());

    SetChoosenItems([-1]);
  }

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      <Button
        onClick={handleDelete}
        disabled={choosenItems.length === 1}
      >{t("Delete items")}</Button>
      <DataGrid
        onCellClick={(e, n) => handleEvent(e, n)}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 30,
            },
          },
        }}
        pageSizeOptions={[10]}
      // checkboxSelection
      />
    </Box>
  );
};
