'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/src/utils/store'

import { GetUsers, DeleteUser } from '@/src/api/api'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
} from '@mui/material'

import { Trash2 } from 'lucide-react'

export default function Page() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading } = useSelector((state: RootState) => state.counter)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [id, setId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(GetUsers())
  }, [dispatch])

  const handleDelete = (id: number) => {
    setId(id)
    setDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!id) return
    await dispatch(DeleteUser(id))
    setDeleteOpen(false)
    setId(null)
    dispatch(GetUsers())
  }

  const rows = users.map((u: any) => ({
    id: u.id,
    username: u.username,
    email: u.email,
    bio: u.bio && u.bio.trim() !== ''
      ? u.bio
      : 'Биография отсутствует',
  }))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'username', headerName: 'Username', width: 160 },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'bio',
      headerName: 'Biography',
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color={params.value === 'Биография отсутствует'
            ? 'text.secondary'
            : 'text.primary'}
          sx={{ whiteSpace: 'normal', lineHeight: 1.4 }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          <Trash2 size={18} />
        </IconButton>
      ),
    },
  ]

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Users management
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#fafafa',
            },
          }}
        />
      </Paper>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle color="error">Delete user</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить пользователя?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
