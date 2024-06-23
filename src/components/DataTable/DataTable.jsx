import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Grid,
  Column,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  TableToolbarSearch,
  DataTable,
} from '@carbon/react';
import {
  ChevronDown,
  ChevronUp,
  Close,
  Renew,
  Add,
  SettingsAdjust,
  FlagFilled,
  Receipt,
} from '@carbon/icons-react';
import './DataTable.css';

const headerData = [
  { header: 'Name', key: 'name' },
  { header: 'Type', key: 'type' },
  { header: 'Status', key: 'status' },
  { header: 'Level', key: 'level' },
];

const rowData = [
  { id: 1, name: 'Item 1', type: 'Type A', status: 'Active', level: 'Low' },
  {
    id: 2,
    name: 'Item 2',
    type: 'Type B',
    status: 'Inactive',
    level: 'Medium',
  },
  { id: 3, name: 'Item 3', type: 'Type A', status: 'Active', level: 'High' },
  { id: 4, name: 'Item 4', type: 'Type C', status: 'Active', level: 'Low' },
  { id: 5, name: 'Item 5', type: 'Type B', status: 'Inactive', level: 'High' },
  { id: 6, name: 'Item 6', type: 'Type A', status: 'Active', level: 'Medium' },
  { id: 7, name: 'Item 7', type: 'Type C', status: 'Inactive', level: 'Low' },
  { id: 8, name: 'Item 8', type: 'Type B', status: 'Active', level: 'High' },
];

function DataTables() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    name: [],
    type: [],
    status: [],
    level: [],
  });
  const [tempFilters, setTempFilters] = useState({
    name: [],
    type: [],
    status: [],
    level: [],
  });
  const [expandedFilter, setExpandedFilter] = useState({
    name: false,
    type: false,
    status: false,
    level: false,
  });
  const [sort, setSort] = useState({ key: 'name', direction: 'ASC' });
  const [search, setSearch] = useState('');
  const [selectedFiltersText, setSelectedFiltersText] = useState('');
  const [showFiltersText, setShowFiltersText] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handlePageChange = (e) => {
    setCurrentPage(e.page);
    setPageSize(e.pageSize);
  };

  const handleExpandFilter = (filterKey) => {
    setExpandedFilter((prevExpanded) => ({
      ...prevExpanded,
      [filterKey]: !prevExpanded[filterKey],
    }));
  };

  const applyFilters = () => {
    toggleFilter();
    setFilters(tempFilters);
    updateSelectedFiltersText(tempFilters);
    setShowFiltersText(true);

    // Update filteredRows with the current filters and search
    const updatedFilteredRows = filterData(rowData, tempFilters, search);
    setFilteredRows(updatedFilteredRows);

    // Reset pagination to first page after applying filters
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      name: [],
      type: [],
      status: [],
      level: [],
    });
    setTempFilters({
      name: [],
      type: [],
      status: [],
      level: [],
    });
    setSelectedFiltersText('');
    setSearch('');
    setShowFiltersText(false);
    setFilteredRows(rowData); // Reset to all data
    setCurrentPage(1); // Reset to first page after clearing filters
  };

  const updateSelectedFiltersText = (filters) => {
    let selectedText = '';
    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        selectedText += `${filters[key].join(', ')} `;
      }
    });
    if (selectedText !== '') {
      selectedText += ' ';
    }
    setSelectedFiltersText(selectedText);
  };

  const filterData = useCallback((rows, filters, search) => {
    return rows.filter((row) => {
      return (
        Object.keys(filters).every((filterKey) => {
          return (
            filters[filterKey].length === 0 ||
            filters[filterKey].includes(row[filterKey])
          );
        }) &&
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    });
  }, []);

  const sortData = (rows) => {
    const sortedRows = [...rows].sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.direction === 'ASC' ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.direction === 'ASC' ? 1 : -1;
      return 0;
    });
    return sortedRows;
  };

  const displayedRows = useMemo(
    () =>
      sortData(filteredRows).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ),
    [filteredRows, sort, currentPage, pageSize]
  );

  const getUniqueValues = (key) => {
    return [...new Set(rowData.map((row) => row[key]))];
  };

  const handleSort = (key) => {
    const direction =
      sort.key === key && sort.direction === 'ASC' ? 'DESC' : 'ASC';
    setSort({ key, direction });
  };

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...tempFilters,
      [filterKey]: tempFilters[filterKey].includes(value)
        ? tempFilters[filterKey].filter((item) => item !== value)
        : [...tempFilters[filterKey], value],
    };
    setTempFilters(updatedFilters);
  };

  useEffect(() => {
    setFilteredRows(rowData);
  }, []);

  useEffect(() => {
    const updatedFilteredRows = filterData(rowData, filters, search);
    setFilteredRows(updatedFilteredRows);
  }, [filters, search, filterData]);

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Low':
        return <FlagFilled size={16} fill='green' />;
      case 'Medium':
        return <FlagFilled size={16} fill='orange' />;
      case 'High':
        return <FlagFilled size={16} fill='red' />;
      default:
        return <FlagFilled size={16} fill='grey' />;
    }
  };

  return (
    <Grid>
      {isFilterOpen && (
        <Column lg={4} className='filter-sidebar'>
          <div className='filter-content'>
            <Button
              kind='ghost'
              renderIcon={Close}
              iconDescription='Close'
              onClick={toggleFilter}
              className='close-button'
            >
              Filters
            </Button>
            {headerData.map((header) => (
              <div className='filter-section' key={header.key}>
                <div
                  className='filter-header'
                  onClick={() => handleExpandFilter(header.key)}
                >
                  {header.header}
                  {expandedFilter[header.key] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedFilter[header.key] && (
                  <div className='filter-options'>
                    {getUniqueValues(header.key).map((value) => (
                      <label key={value}>
                        <input
                          type='checkbox'
                          checked={tempFilters[header.key].includes(value)}
                          onChange={() => handleFilterChange(header.key, value)}
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className='apply-filters-container'>
              <Button onClick={applyFilters} className='apply-filters-button'>
                Apply Filters
              </Button>
            </div>
          </div>
        </Column>
      )}
      <Column
        lg={isFilterOpen ? 12 : 16}
        className={`main-content ${
          isFilterOpen ? 'shift-right' : 'full-width'
        }`}
      >
        <TableContainer title='Risk Definitions'>
          <div className='filters-and-textbox'>
            <Button
              kind='primary'
              renderIcon={SettingsAdjust}
              iconDescription='Filters'
              onClick={toggleFilter}
              className='filter-button'
              style={{ backgroundColor: 'light-grey', color: 'black' }}
            >
              Filters
            </Button>
            {showFiltersText && (
              <div className='selected-filters-text'>
                {selectedFiltersText}
                <span className='clear-filters-text' onClick={clearFilters}>
                  Clear All Filters
                </span>
              </div>
            )}
          </div>
          <div className='search-toolbar'>
            <TableToolbarSearch
              persistent
              placeHolderText='Search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Renew
              className='refresh-icon'
              size={20}
              onClick={() => window.location.reload()}
            />
            <Button kind='primary' renderIcon={Add}>
              Add Risk
            </Button>
          </div>
          <DataTable rows={displayedRows} headers={headerData}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
            }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({
                          header,
                          onClick: () => handleSort(header.key),
                        })}
                        isSortHeader={sort.key === header.key}
                        sortDirection={sort.direction.toLowerCase()}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.info.header === 'name' ? (
                            <>
                              <Receipt style={{ verticalAlign: 'middle' }} />{' '}
                              {cell.value}
                            </>
                          ) : cell.info.header === 'level' ? (
                            <>{getLevelIcon(cell.value)}</>
                          ) : (
                            cell.value
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
          <Pagination
            totalItems={filteredRows.length}
            pageSize={pageSize}
            pageSizes={[10, 20, 30]}
            page={currentPage}
            onChange={handlePageChange}
          />
        </TableContainer>
      </Column>
    </Grid>
  );
}

export default DataTables;
