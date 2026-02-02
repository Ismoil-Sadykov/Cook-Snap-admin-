'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { AppDispatch, RootState } from '@/src/utils/store'
import { GetCategory, GetCountry, GetProfile, GetUsers } from '@/src/api/api'

export default function Page() {
  const dispatch = useDispatch<AppDispatch>()

  const { categories, loading, countries, profile, users } = useSelector((state: RootState) => state.counter)

  useEffect(() => {
    dispatch(GetCategory())
    dispatch(GetCountry())
    dispatch(GetProfile())
    dispatch(GetUsers())
  }, [dispatch])

  const categoryRows = categories.map((item: any) => ({
    id: item.id,
    name: item.name,
  }))

  const countryRows = countries.map((item: any) => ({
    id: item.id,
    name: item.name,
  }))

  const categoryColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Category name', flex: 1 },
  ]

  const countryColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Country name', flex: 1 },
  ]


  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="flex-1 flex flex-col">

        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="text-sm text-gray-500">
            {profile?.username} {profile?.fullname}
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">
                  Countries
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {loading ? '...' : countries.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {loading ? '...' : categories.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">
                  Users
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {loading ? '...' : users.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">
                  Recipe
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                32K
              </CardContent>
            </Card>

          </div>
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <Box sx={{ height: 400, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <DataGrid
                    rows={categoryRows}
                    columns={categoryColumns}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 }, }, }}
                    disableRowSelectionOnClick />
                </Box>
                <Box
                  sx={{ height: 400, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <DataGrid
                    rows={countryRows}
                    columns={countryColumns}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 }, }, }}
                    disableRowSelectionOnClick />
                </Box>
              </Box>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  )
}
