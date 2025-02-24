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
} from "@mui/material";
import { Row } from "../../types/dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers"; // Usamos correctamente DatePicker de MUI
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface FilterOption {
  label: string;
  value: keyof Row;
}

interface FiltersProps {
  columns: FilterOption[];
  rows: Row[];
  onFilter: (filteredRows: Row[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ columns, rows, onFilter }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedColumn, setSelectedColumn] = useState<keyof Row | "">("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string | { start: string; end: string }>>({});
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedColumn("");
    setFilterValue("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleApplyFilter = () => {
    if (!selectedColumn) return;

    const newFilters = { ...filters };

    if (selectedColumn === "date" && startDate && endDate) {
      newFilters[selectedColumn] = {
        start: startDate.format("YYYY-MM-DD"),
        end: endDate.format("YYYY-MM-DD"),
      };
    } else {
      newFilters[selectedColumn] = filterValue;
    }

    const filteredRows = rows.filter((row) =>
      Object.entries(newFilters).every(([key, val]) => {
        if (key === "status") return row[key] === val;
        if (key === "transaction_id") return row[key].toLowerCase().includes(val.toLowerCase());
        if (typeof row[key as keyof Row] === "number") return Number(row[key as keyof Row]) >= Number(val);
        if (key === "date") {
          const rowDate = dayjs(row.date).format("YYYY-MM-DD");
          return rowDate >= (val as { start: string; end: string }).start &&
                 rowDate <= (val as { start: string; end: string }).end;
        }
        return true;
      })
    );

    setFilters(newFilters);
    onFilter(filteredRows); // Actualiza los datos filtrados
    handleClose();
  };

  const handleRemoveFilter = (column: keyof Row) => {
    const newFilters = { ...filters };
    delete newFilters[column];

    const filteredRows = rows.filter((row) =>
      Object.entries(newFilters).every(([key, val]) => {
        if (key === "status") return row[key] === val;
        if (key === "transaction_id") return row[key].toLowerCase().includes(val.toLowerCase());
        if (typeof row[key as keyof Row] === "number") return Number(row[key as keyof Row]) >= Number(val);
        if (key === "date") {
          const rowDate = dayjs(row.date).format("YYYY-MM-DD");
          return rowDate >= (val as { start: string; end: string }).start &&
                 rowDate <= (val as { start: string; end: string }).end;
        }
        return true;
      })
    );

    setFilters(newFilters);
    onFilter(filteredRows); // Actualiza los datos filtrados
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button startIcon={<FilterListIcon />} variant="contained" onClick={handleClick}>
          Filters
        </Button>

        {/* Muestra los filtros aplicados como chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.entries(filters).map(([key, value]) => (
            <Chip
              key={key}
              label={
                key === "date"
                  ? `Date: ${(value as { start: string; end: string }).start} - ${(value as { start: string; end: string }).end}`
                  : `${columns.find((col) => col.value === key)?.label}: ${value}`
              }
              onDelete={() => handleRemoveFilter(key as keyof Row)}
              deleteIcon={<CloseIcon />}
              style={{ backgroundColor: "#e0e0e0", fontSize: "14px" }}
            />
          ))}
        </div>
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <div style={{ padding: "16px", width: "300px" }}>
          <Typography variant="h6">Select Column to Filter</Typography>

          {/* Selección de columna */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Column</InputLabel>
            <Select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value as keyof Row)}
            >
              {columns.map((col) => (
                <MenuItem key={col.value} value={col.value}>
                  {col.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Input dinámico según la columna seleccionada */}
          {selectedColumn && (
            <>
              <Typography variant="h6">Enter Filter Value</Typography>
              {selectedColumn === "status" ? (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                  </Select>
                </FormControl>
              ) : selectedColumn === "date" ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </div>
              ) : (
                <TextField
                  variant="outlined"
                  fullWidth
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  inputProps={{ autoComplete: "off" }}
                />
              )}
            </>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleApplyFilter} variant="contained" color="primary">Apply</Button>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default Filters;
