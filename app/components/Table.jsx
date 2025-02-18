import { useState } from "react";

export default function Table({ columns, data, pages }) {
  const [sortField, setSortField] = useState(null); // Campo por el que se ordena
  const [sortOrder, setSortOrder] = useState("asc"); // Orden (asc o desc)
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [searchText, setSearchText] = useState(""); // Texto de búsqueda

  // Función para manejar el ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Función para ordenar los datos
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Función para filtrar los datos según el texto de búsqueda
  const filteredData = sortedData.filter((row) =>
    columns.some((column) => {
      const value = row[column.field]?.toString().toLowerCase();
      return value?.includes(searchText.toLowerCase());
    })
  );

  // Lógica de paginación
  const totalPages = Math.ceil(data.length / pages);
  const startIndex = (currentPage - 1) * pages;
  const paginatedData = data.slice(startIndex, startIndex + pages);

  // Cambiar de página
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Limpiar el campo de búsqueda
  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <div>
      {/* Campo de búsqueda */}
      <div className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Buscar..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          {searchText && (
            <button className="btn btn-outline-secondary" onClick={clearSearch}>
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Tabla con clases de Bootstrap */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index + 1} // Key única para cada th
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => handleSort(column.name)}>
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
                  <td key={colIndex}>
                    {column.cell
                      ? column.cell(row) // Si tiene cell, renderiza el contenido personalizado
                      : column.selector
                      ? column.selector(row, rowIndex) // Si tiene selector, obtén el valor
                      : null}
                  </td>
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
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-primary" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <button className="btn btn-primary" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Siguiente
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
