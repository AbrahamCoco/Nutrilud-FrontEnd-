import { useEffect, useState } from "react";

type TablaPacientesProps = {
  columns: any;
  data: any;
};

export default function TablaPacientes({ columns, data }: TablaPacientesProps) {
  const [sortField, setSortField] = useState<null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filteredData, setFilteredData] = useState<any>(data);

  useEffect(() => {
    let newFilteredData = data;

    if (searchText) {
      newFilteredData = data.filter((row: any) => {
        const nombreColumn = columns.find((col:any) => col.name.toLowerCase() === "nombre");
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

  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = Array.isArray(filteredData)
    ? [...filteredData].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField]?.toString().toLowerCase() || "";
        const valueB = b[sortField]?.toString().toLowerCase() || "";
        return valueA < valueB ? (sortOrder === "asc" ? -1 : 1) : valueA > valueB ? (sortOrder === "asc" ? 1 : -1) : 0;
      })
    : [];

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: any) => setCurrentPage(page);

  const clearSearch = () => setSearchText("");

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden">
      {/* Encabezado con acentos verdes */}
      <div className="p-4 bg-green-50 border-b border-green-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-xl font-bold text-green-800"></h1>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-500 text-green-900 placeholder-green-600"
            placeholder="Buscar por nombre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-green-600 transition-colors">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabla con acentos verdes */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-green-100">
          <thead className="bg-green-50">
            <tr>
              {columns.map((column: any, index: any) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider hover:bg-green-100 cursor-pointer transition-colors"
                  onClick={() => handleSort(column.name)}
                >
                  <div className="flex items-center gap-1">
                    {column.name}
                    {sortField === column.name && (
                      <span className="text-green-600">
                        {sortOrder === "asc" ? (
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 14l5-5 5 5z" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-green-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={row.id} className={`hover:bg-green-50 transition-colors ${rowIndex % 2 === 0 ? "bg-white" : "bg-green-50"}`}>
                  {columns.map((column: any, colIndex: any) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {column.cell ? column.cell(row) : column.selector ? column.selector(row) : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center">
                  <div className="text-green-600 flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 mb-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg font-medium">No se encontraron resultados</span>
                    <button onClick={clearSearch} className="mt-2 text-green-600 hover:text-green-800 text-sm flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Limpiar búsqueda
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación con estilo verde */}
      <div className="px-4 py-3 bg-green-50 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-between sm:hidden">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
              currentPage === 1 ? "border-green-200 bg-green-100 text-green-400" : "border-green-300 bg-white text-green-700 hover:bg-green-100"
            }`}
          >
            Anterior
          </button>
          <span className="text-sm text-green-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
              currentPage === totalPages ? "border-green-200 bg-green-100 text-green-400" : "border-green-300 bg-white text-green-700 hover:bg-green-100"
            }`}
          >
            Siguiente
          </button>
        </div>

        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-green-700">
              Mostrando <span className="font-medium text-green-800">{startIndex + 1}</span> a <span className="font-medium text-green-800">{startIndex + paginatedData.length}</span> de{" "}
              <span className="font-medium text-green-800">{sortedData.length}</span> registros
            </p>
            <select
              className="block w-20 pl-3 pr-10 py-2 text-base border-green-300 focus:outline-none focus:ring-green-400 focus:border-green-500 sm:text-sm rounded-md text-green-700 bg-white"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 10, 15, 20, 25, 30].map((size) => (
                <option key={size} value={size} className="text-green-700">
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? "text-green-300" : "text-green-600 hover:bg-green-100 hover:text-green-800"} transition-colors`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="text-sm text-green-700">
              Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? "text-green-300" : "text-green-600 hover:bg-green-100 hover:text-green-800"} transition-colors`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}