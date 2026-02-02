'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/src/utils/store'

import { CreateCategory, DeleteCategory, GetCategory, UpdateCategory } from '@/src/api/api'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'
import { Pencil, Trash2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Page() {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading } = useSelector((state: RootState) => state.counter)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)


  useEffect(() => {
    dispatch(GetCategory())
  }, [dispatch])

  const handleAdd = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error('Введите название категории')
      return
    }

    dispatch(CreateCategory(name))
    setName('')
    setOpen(false)
  }


  const handleEdit = (id: number) => {
    const category = categories.find((c: any) => c.id === id)

    if (!category) return

    setEditId(id)
    setEditName(category.name)
    setEditOpen(true)
  }

  const handleEditSubmit = () => {
    if (!editName.trim() || editId === null) {
      toast.error('Введите название категории')
      return
    }

    dispatch(UpdateCategory({ id: editId, name: editName }))
    setEditOpen(false)
  }


  const handleDelete = (id: number) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteId === null) return

    dispatch(DeleteCategory(deleteId))
    setDeleteOpen(false)
    setDeleteId(null)
  }


  const rows = categories.map((item: any) => ({
    id: item.id,
    name: item.name,
  }))

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Category name',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            <Pencil size={18} />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ height: 500, width: '100%', p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <h1 className="text-xl font-semibold">Categories</h1>

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={handleAdd}
        >
          Add Category
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        disableRowSelectionOnClick
      />
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Category</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Category</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category name"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Удалить категорию</DialogTitle>

        <DialogContent>
          <p className="text-sm text-gray-600">
            Вы уверены, что хотите удалить эту категорию?
            <br />
            Это действие нельзя отменить.
          </p>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>
            Отмена
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  )
}
