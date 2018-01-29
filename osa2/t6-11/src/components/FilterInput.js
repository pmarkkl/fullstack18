import React from 'react'

const FilterInput = ({ value, handleFilterChange, text }) => {
    return (
      <div>
        {text} <input value={value} onChange={handleFilterChange} />
      </div>
    )
  }

export default FilterInput