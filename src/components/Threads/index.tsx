import React, { useState, useEffect, useReducer, useMemo, InputHTMLAttributes, useCallback, useRef } from 'react';
import { generate } from 'short-uuid'
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
  SortingState,
} from '@tanstack/react-table'

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'

import { Container, Process, Processes, TableContainer, tableCss, Text, Title } from './styles'
import { IProcess } from '../../../electron/utils'

export const generateKey = (pre: any) => {
  return `${pre}_${new Date().getTime()}`;
}

export function Threads() {
  const [processes, setProcesses] = useState<IProcess[]>([])
  const [isFetching, toggleFetching] = useState<boolean>(true)

  // useEffect(() => {
  //   (async () => {
  //     setProcesses(await window.Main.getProcesses());
  //   })();
  // }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setProcesses(await window.Main.getProcesses());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<IProcess>[]>(
    () => [
      {
        accessorKey: 'user',
        cell: info => info.getValue(),
        footer: props => props.column.id,
        size: 1
        ,
      },
      {
        accessorKey: 'pid',
        header: () => 'pid',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'ppid',
        header: () => 'ppid',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'pri',
        header: () => 'pri',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'pcpu',
        header: () => '%CPU',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'pmem',
        header: () => '%MEM',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: () => 'status',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'time',
        header: () => 'tempo',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'command',
        header: () => 'comando',
        footer: props => props.column.id,
      },
    ],
    []
  )

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  const table = useReactTable({
    data: processes,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    pageCount: 10,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'user') {
      if (table.getState().sorting[0]?.id !== 'user') {
        table.setSorting([{ id: 'user', desc: false }])
      }
    }
    table.setPageSize(10000)
    toggleFetching(false)
  }, [table.getState().columnFilters[0]?.id])

  return (
    <>
      <style>
        {tableCss}
      </style>

      <Container >
        <div className="p-2">
          <div className="h-2" />
          <TableContainer>
            <table>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : '',
                                  onClick: header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: ' 🔼',
                                  desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter column={header.column} table={table} />
                                </div>
                              ) : null}
                            </>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </TableContainer>
          <div>{table.getRowModel().rows.length} Processos</div>
        </div>
      </Container>
    </>
  )
}


function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ''
            }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ''
            }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}