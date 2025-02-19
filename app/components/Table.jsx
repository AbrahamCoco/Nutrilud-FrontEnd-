"use client";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function Table({ columns, data, nameTable }) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let newFilteredData = data;

    if (searchText) {
      newFilteredData = data.filter((row) => {
        const nombreColumn = columns.find((col) => col.name.toLowerCase() === "nombre");
        if (nombreColumn && nombreColumn.selector) {
          const value = nombreColumn.selector(row)?.toString().toLowerCase();
          return value?.includes(searchText.toLowerCase());
        }
        return false;
      });
    }

    setFilteredData(newFilteredData);
    setCurrentPage(1);
  }, [searchText, data, columns]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField]?.toString().toLowerCase() || "";
    const valueB = b[sortField]?.toString().toLowerCase() || "";
    return valueA < valueB ? (sortOrder === "asc" ? -1 : 1) : valueA > valueB ? (sortOrder === "asc" ? 1 : -1) : 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  const clearSearch = () => setSearchText("");

  return (
    <>
      <Row>
        <Col md={6}>
          <h1>{nameTable}</h1>
        </Col>
        <Col md={6}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Buscar por nombre..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {searchText && (
              <button className="btn btn-outline-secondary" onClick={clearSearch}>
                Limpiar
              </button>
            )}
          </div>
        </Col>
      </Row>

      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ cursor: "pointer" }} onClick={() => handleSort(column.name)}>
                {column.name}
                {sortField === column.name && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={row.id}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{column.cell ? column.cell(row) : column.selector ? column.selector(row) : null}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No se encontraron resultados.
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={columns.length} className="text-center">
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  <FaArrowAltCircleLeft />
                </button>

                <div className="d-flex align-items-center gap-2 mx-2">
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  <select className="form-select" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} style={{ width: "auto" }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-2 mx-2">
                  <span>
                    Mostrando {startIndex + 1} a {startIndex + paginatedData.length} de {sortedData.length} registros
                  </span>
                </div>

                <button className="btn btn-primary" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  <FaArrowAltCircleRight />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
