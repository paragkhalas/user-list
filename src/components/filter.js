import React from "react";
import { Input, FormGroup } from "reactstrap";


export const Filter = ({ column }) => {
  return column.canFilter && column.render("Filter")
}

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    Header
  },
}) => {
  return (
    <FormGroup className="mt-3">
      <Input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search ${Header}...`}
      />
    </FormGroup>

  )
}