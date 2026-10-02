import {
  createPaginatedRowModel,
  tableFeatures,
  useTable,
  rowPaginationFeature,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import api from "../Api/Api";
import { Pencil, Recycle } from "lucide";

const Product = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ sortBy: "", sortOrder: "" });
  const [pageList, setPageList] = useState([]);

  const features = tableFeatures({});

  const pageSizeList = [10, 20, 30, 50];

  const fetchData = async () => {
    try {
      const response = await api.get("/Product", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          search: search,
          sortBy: sorting.sortBy,
          sortOrder: sorting.sortOrder,
        },
      });
      console.log(response);
      setData(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(pageSize);
    fetchData();
  }, [pageNumber, pageSize, search, sorting.sortBy, sorting.sortOrder]);

  const columns = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "price",
      header: () => <span>Price</span>,
      cell: (info) => <i>{info.getValue()}</i>,
    },
    {
      accessorKey: "quantity",
      header: () => <span>QUANTITY</span>,
    },
    {
      accessorKey: "description",
      header: () => <span>DESCRIPTION</span>,
    },
    {
      accessorKey: "isActive",
      header: () => <span>ACTIVE</span>,
    },
    // {
    //   accessorKey: "actions",
    //   header: () => <span>ACTIONS</span>,
    //   cell: ({ row }) => {
    //     return (
    //       <div>
    //         <Pencil></Pencil>
    //         <Recycle></Recycle>
    //       </div>
    //     );
    //   },
    // },
  ];

  const table = useTable({
    key: "person-table",
    features,
    columns,
    data,
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p>Inventory</p>
          <p>Manage and Track your Products in real-time</p>
        </div>
        <div>
          <input type="text"></input>
          <button className="border-2 w-28"> Search</button>
        </div>
      </div>

      <div className="w-full">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 items-center justify-center ">
        <select className="w-fit border-2 ">
          {pageSizeList.map((p) => (
            <option
              className="border-2 p-1 rounded-lg"
              onClick={() => setPageSize(p)}
              value={p}
            >
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Product;
