import React, { useState } from 'react';
import {
  SideNav,
  SideNavItems,
  SideNavLink,
  Button,
  Checkbox,
} from 'carbon-components-react';
import './FilterPanel.css'; // Import the custom CSS

const FilterPanel = ({ headers, rows, applyFilters, clearFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (header, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (!newFilters[header]) {
        newFilters[header] = new Set();
      }
      if (newFilters[header].has(value)) {
        newFilters[header].delete(value);
      } else {
        newFilters[header].add(value);
      }
      return newFilters;
    });
  };

  const handleApplyFilters = () => {
    applyFilters(selectedFilters);
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    clearFilters();
  };

  const getFilterCounts = (headerKey) => {
    const counts = {};
    rows.forEach((row) => {
      const value = row[headerKey];
      if (!counts[value]) {
        counts[value] = 0;
      }
      counts[value] += 1;
    });
    return counts;
  };

  return (
    <SideNav
      isFixedNav
      expanded
      isChildOfHeader={false}
      aria-label='Side navigation'
      className='filter-panel'
    >
      <SideNavItems>
        {headers.map((header) => (
          <div key={header.key} className='filter-option'>
            <SideNavLink>{header.header}</SideNavLink>
            {Object.entries(getFilterCounts(header.key)).map(
              ([value, count]) => (
                <Checkbox
                  key={value}
                  labelText={`${value} (${count})`}
                  id={`${header.key}-${value}`}
                  checked={selectedFilters[header.key]?.has(value)}
                  onChange={() => handleFilterChange(header.key, value)}
                />
              )
            )}
          </div>
        ))}
        <div className='filter-actions'>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
          <Button kind='secondary' onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </SideNavItems>
    </SideNav>
  );
};

export default FilterPanel;
