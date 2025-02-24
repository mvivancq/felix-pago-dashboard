import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  TextField,
  Chip,
  Box,
} from "@mui/material";
import { Row } from "../../types/dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

interface ColumnOption {
  label: string;
  value: keyof Row;
}

interface FilterTypeOption {
  label: string;
  value: string;
}

const columnFilterTypes: Record<keyof Row, string[]> = {
  transaction_id: ["text"],
  sender_whatsapp: ["text"],
  receiver_whatsapp: ["text"],
  amount_sent: ["range"],
  exchange_rate: ["range"],
  amount_received: ["range"],
  status: ["dropdown"],
  payment_method: ["dropdown"],
  date: ["date"],
  currency: ["dropdown"],
};

interface FiltersProps {
  columns: ColumnOption[];
  filterTypes: FilterTypeOption[];
  rows: Row[];
  onFilter: (filteredRows: Row[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ columns, filterTypes, rows, onFilter }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedColumn, setSelectedColumn] = useState<keyof Row | "">("");
  const [selectedFilterType, setSelectedFilterType] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<{ column: keyof Row; value: string }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilters = (filters: { column: keyof Row; value: string }[]) => {
    let filteredRows = [...rows];

    filters.forEach((filter) => {
      const { column, value } = filter;

      if (column && value.trim() !== "") {
        if (value.includes("-")) {
          const [min, max] = value.split("-").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
            filteredRows = filteredRows.filter(
              (row) => Number(row[column]) >= min && Number(row[column]) <= max
            );
          }
        } else if (value.includes(" to ")) {
          const [startDate, endDate] = value.split(" to ");
          filteredRows = filteredRows.filter(
            (row) =>
              new Date(row.date).toISOString().split("T")[0] >= startDate &&
              new Date(row.date).toISOString().split("T")[0] <= endDate
          );
        } else {
          filteredRows = filteredRows.filter((row) =>
            String(row[column]).toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    });

    onFilter(filteredRows.length > 0 ? filteredRows : rows);
  };

  const handleApplyFilter = () => {
    if (!selectedColumn || !selectedFilterType || filterValue.trim() === "") return;

    const newFilter = { column: selectedColumn, value: filterValue };
    const updatedFilters = [...appliedFilters, newFilter];
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);

    setSelectedColumn("");
    setSelectedFilterType("");
    setFilterValue("");
    handleClose();
  };

  const handleRemoveFilter = (column: keyof Row) => {
    const updatedFilters = appliedFilters.filter((filter) => filter.column !== column);
    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    setAppliedFilters([]);
    onFilter(rows);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Button startIcon={<FilterListIcon />} variant="contained" onClick={handleClick}>
        Filters
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <div style={{ padding: "16px", width: "250px" }}>
          <Typography variant="h6">Filter Column</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Column</InputLabel>
            <Select
              value={selectedColumn}
              onChange={(e) => {
                const column = e.target.value as keyof Row;
                setSelectedColumn(column);
                setSelectedFilterType("");
              }}
            >
              {columns.map((col) => (
                <MenuItem key={col.value} value={col.value}>
                  {col.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedColumn && (
            <>
              <Typography variant="h6">Filter Type</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Filter Type</InputLabel>
                <Select
                  value={selectedFilterType}
                  onChange={(e) => setSelectedFilterType(e.target.value)}
                >
                  {columnFilterTypes[selectedColumn].map((type) => (
                    <MenuItem key={type} value={type}>
                      {filterTypes.find((f) => f.value === type)?.label || type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {selectedFilterType === "text" && (
            <TextField fullWidth margin="normal" onChange={(e) => setFilterValue(e.target.value)} />
          )}

          {selectedFilterType === "range" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                placeholder="Min"
                fullWidth
                margin="normal"
                type="number"
                onChange={(e) => setFilterValue((prev) => `${e.target.value}-${prev.split("-")[1] || ""}`)}
              />
              <TextField
                placeholder="Max"
                fullWidth
                margin="normal"
                type="number"
                onChange={(e) => setFilterValue((prev) => `${prev.split("-")[0] || ""}-${e.target.value}`)}
              />
            </div>
          )}

          {selectedFilterType === "date" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                onChange={(e) => setFilterValue((prev) => `${e.target.value} to ${prev.split(" to ")[1] || ""}`)}
              />
              <TextField
                fullWidth
                margin="normal"
                type="date"
                onChange={(e) => setFilterValue((prev) => `${prev.split(" to ")[0] || ""} to ${e.target.value}`)}
              />
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
            <Button onClick={handleClearFilters} color="secondary">
              Clear Filters
            </Button>
            <Button onClick={handleApplyFilter} variant="contained" color="primary">
              Apply
            </Button>
          </div>
        </div>
      </Menu>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {appliedFilters.map((filter) => (
          <Chip
            key={filter.column}
            label={`${filter.column}: ${filter.value}`}
            onDelete={() => handleRemoveFilter(filter.column)}
            deleteIcon={<CloseIcon />}
            color="primary"
          />
        ))}
      </Box>
    </div>
  );
};

export default Filters;
