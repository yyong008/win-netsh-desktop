import { createHashRouter } from 'react-router-dom'

import MainLayout from '@renderer/layout/Main'
import ExportRoute from '@renderer/router/export'
import ExportList from '@renderer/router/export/list'
import HomeRoute from '@renderer/router/home'
import ProxyRoutes from '@renderer/router/proxy'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeRoute />
      },
      {
        path: 'exports',
        element: <ExportRoute />,
        children: [
          {
            path: 'list',
            element: <ExportList />
          }
        ]
      },
      {
        path: 'exports-list',
        element: <ExportList />
      },
      {
        path: 'settings',
        element: <ProxyRoutes />
      }
    ]
  }
])
